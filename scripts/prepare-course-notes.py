"""Bind reviewed notes to approved sources and prepared immutable learning assets."""
import argparse
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
ENGINE = ROOT / 'modules/course-notes'
PREFIX = 'https://github.com/hphugosm/study/releases/download/studylo-learning-v1/'

def read(path):
    return json.loads(path.read_text())

def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix+'.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')
    temporary.replace(path)

def digest(data):
    return hashlib.sha256(data).hexdigest()

def refs(value):
    if isinstance(value, dict):
        yield from value.get('source_refs', [])
        for key, child in value.items():
            if key != 'source_refs':
                yield from refs(child)
    elif isinstance(value, list):
        for child in value:
            yield from refs(child)

def preserve_solutions(files, approved, prepared_hashes):
    """Retain only exact, previously reviewed derivatives; never infer approval."""
    manifest_path = ENGINE/'learning-assets.json'
    previous = read(manifest_path) if manifest_path.exists() else {'schema': 1, 'release': 'studylo-learning-v1', 'assets': []}
    assert previous.get('schema') == 1 and previous.get('release') == 'studylo-learning-v1'
    assert isinstance(previous.get('assets'), list), 'Invalid previous learning assets'
    old = {}
    for asset in previous['assets']:
        if asset.get('kind') != 'solution':
            continue
        assert isinstance(asset.get('sha256'), str) and re.fullmatch(r'[a-f0-9]{64}', asset['sha256']), 'Invalid solution hash'
        assert asset.get('format') in {'xlsx', 'png', 'docx'}, 'Invalid solution format'
        keys = {'kind', 'format', 'name', 'sha256', 'size', 'source_sha256s'}
        if asset['format'] == 'png':
            keys |= {'width', 'height'}
        assert set(asset) == keys, 'Unexpected solution asset metadata'
        assert asset.get('name') == asset['sha256']+'.'+asset['format'], 'Noncanonical solution name'
        assert type(asset.get('size')) is int and 1 <= asset['size'] <= 25000000, 'Invalid solution size'
        hashes = asset.get('source_sha256s')
        assert isinstance(hashes, list) and hashes and all(isinstance(h, str) and h in prepared_hashes for h in hashes), 'Solution requires approved full source extraction'
        assert len(set(hashes)) == len(hashes), 'Duplicate solution provenance'
        if asset['format'] == 'png':
            assert all(type(asset.get(key)) is int and 1 <= asset[key] <= 4096 for key in ('width', 'height')), 'Invalid solution dimensions'
        assert asset['name'] not in old, 'Duplicate solution asset'
        old[asset['name']] = asset
    kept, count = {}, 0
    for path in files:
        content = read(path)
        ids = {source['id'] for source in content['sources']}
        for lesson in content['lessons']:
            solutions = lesson.get('solutions', [])
            assert isinstance(solutions, list), 'Invalid lesson solutions'
            for solution in solutions:
                assert isinstance(solution, dict) and solution.get('format') in {'xlsx', 'png', 'docx'}, 'Invalid solution format'
                sha = solution.get('sha256')
                assert isinstance(sha, str) and re.fullmatch(r'[a-f0-9]{64}', sha), 'Invalid solution hash'
                name = sha+'.'+solution['format']
                assert solution.get('url') == PREFIX+name, 'Noncanonical solution URL'
                assert name in old, 'Solution lacks previous reviewed manifest approval'
                asset = old[name]
                assert type(solution.get('size')) is int and solution['size'] == asset['size'], 'Solution size differs'
                refs_ = solution.get('source_refs')
                assert isinstance(refs_, list) and refs_ and all(isinstance(ref, dict) and ref.get('id') in ids
                    and approved[ref['id']]['sha256'] == ref.get('sha256') and ref['sha256'] in prepared_hashes for ref in refs_), 'Solution provenance not approved in this topic'
                assert {ref['sha256'] for ref in refs_} == set(asset['source_sha256s']), 'Solution provenance differs'
                if solution['format'] == 'png':
                    assert solution.get('width') == asset['width'] and solution.get('height') == asset['height'], 'Solution dimensions differ'
                kept[name] = asset
                count += 1
    assert set(old) == set(kept), 'Orphan solution asset'
    assert previous.get('counts', {}).get('solutions', 0) == count, 'Solution count differs'
    return kept, count

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--prepared', type=Path, required=True)
    parser.add_argument('--extractions', type=Path, required=True)
    args = parser.parse_args()
    prepared = args.prepared.resolve()
    # Announcements and assignments may also appear in the approved feed;
    # only file entries can have document extraction or source-backed notes.
    feed = [entry for entry in read(ROOT/'modules/moodle-sync/feed.json')['entries'] if entry.get('kind') == 'file']
    approved = {entry['id']:entry for entry in feed}
    approved_hashes = {entry['sha256'] for entry in feed}
    expected = {(entry['subject'],entry['topic']) for entry in feed}
    files = sorted((ENGINE/'content').glob('*/*.json'))
    actual = {(path.parent.name,path.stem) for path in files}
    assert actual <= expected, 'Reviewed content must belong to an approved source-bearing topic'
    raw = read(prepared/'manifest.json')
    assert raw['approved_source_set_verified'] and raw['held_sources_included'] == 0
    prepared_hashes = {item['source_sha256'] for item in raw['sources']}
    assert len(prepared_hashes) == len(raw['sources']), 'Duplicate extraction source'
    assert prepared_hashes <= approved_hashes, 'Extraction includes an unapproved or stale source'
    # A newly approved topic may remain source-only while editorial work is
    # pending. Existing authored topics still require their complete exact set.
    for path in files:
        data = read(path)
        assert (data['subject'], data['topic']) == (path.parent.name, path.stem)
        ids = {entry['id'] for entry in feed if (entry['subject'], entry['topic']) == (data['subject'], data['topic'])}
        assert {source['id'] for source in data['sources']} == ids, 'Missing or extra source in reviewed topic'
        for source in data['sources']:
            original = approved[source['id']]
            assert source['sha256'] == original['sha256'] and source['url'] == original['url'], 'Stale reviewed source'
            assert source['sha256'] in prepared_hashes, 'Reviewed notes require complete source extraction'
    # Preflight all existing solutions before any extracted text or notes are written.
    preserved_solutions, solution_count = preserve_solutions(files, approved, prepared_hashes)
    images = read(prepared/'imagemap.json')
    assets = dict(preserved_solutions)
    texts = []
    for item in raw['sources']:
        source_hash = item['source_sha256']
        assert item['name'] == source_hash+'.zip', 'Noncanonical extraction archive name'
        bundle = prepared/'bundles'/item['name']
        assert not bundle.is_symlink() and bundle.stat().st_size == item['bytes']
        assert digest(bundle.read_bytes()) == item['sha256']
        assets[item['name']] = {'name':item['name'],'sha256':item['sha256'],'size':item['bytes'],
                                'kind':'extraction','source_sha256':source_hash}
        text_file = prepared/'text'/f'{source_hash}.json'
        text_data = read(text_file)
        assert text_data['sha256'] == source_hash and isinstance(text_data['units'],list)
        target = ENGINE/'extracted'/f'{source_hash}.json'
        write(target,text_data)
        data = target.read_bytes()
        texts.append({'source_sha256':source_hash,'path':f'extracted/{source_hash}.json',
                      'sha256':digest(data),'size':len(data),'units':len(text_data['units'])})
    totals = {'topics':0,'lessons':0,'questions':0,'flashcards':0,'figures':0,'steps':0,'solutions':solution_count}
    for path in files:
        data = read(path)
        assert (data['subject'],data['topic']) == (path.parent.name,path.stem)
        ids = {entry['id'] for entry in feed if (entry['subject'],entry['topic']) == (data['subject'],data['topic'])}
        assert {source['id'] for source in data['sources']} == ids, 'Missing or extra source in reviewed topic'
        for source in data['sources']:
            original = approved[source['id']]
            assert source['sha256'] == original['sha256'] and source['url'] == original['url']
            source['extraction_url'] = f'./extracted/{source["sha256"]}.json'
            source['archive_url'] = PREFIX+source['sha256']+'.zip'
        for ref in refs(data):
            assert ref['id'] in ids and approved[ref['id']]['sha256'] == ref['sha256']
            if 'page' in ref:
                extraction = read(args.extractions/'sources'/ref['sha256']/'source.json')
                assert type(ref['page']) is int and 1 <= ref['page'] <= len(extraction['units']), 'Source locator outside actual extraction'
        for lesson in data['lessons']:
            for image in lesson.get('images',[]):
                origin = image.get('source_media',image['src'])
                assert re.fullmatch(r'extracted/[a-f0-9]{64}/media/[a-zA-Z0-9._-]+',origin), 'Unbound teaching image'
                record = images[origin]
                assert record['source_sha256'] in {ref['sha256'] for ref in image['source_refs']}
                file = Path(record['path'])
                assert file.resolve().parent == (prepared/'images').resolve() and not file.is_symlink()
                body = file.read_bytes()
                assert digest(body) == record['sha256'] and record['name'] == record['sha256']+'.webp'
                image['source_media'] = origin
                image['src'] = PREFIX+record['name']
                image['width'],image['height'] = record['width'],record['height']
                if record.get('fallback_preview'):
                    suffix = ' (náhled celé původní strany nebo snímku)'
                    if not image.get('caption','').endswith(suffix):
                        image['caption'] = image.get('caption',image['alt'])+suffix
                existing = assets.setdefault(record['name'],{'name':record['name'],'sha256':record['sha256'],
                    'size':len(body),'kind':'figure','width':record['width'],'height':record['height'],'source_sha256s':[]})
                if record['source_sha256'] not in existing['source_sha256s']:
                    existing['source_sha256s'].append(record['source_sha256'])
                totals['figures'] += 1
            totals['steps'] += len(lesson.get('steps',[]))
        write(path,data)
        # The existing provenance catalog keeps an immutable content copy beside its source index.
        topic_dir = ROOT/'modules/moodle-sync/data/subjects'/data['subject']/'topics'/data['topic']
        artifact = topic_dir/'derived/course-notes-v1/notes.json'
        write(artifact,data)
        index_path = topic_dir/'derived/index.json'
        index = read(index_path)
        index['artifacts'] = [entry for entry in index['artifacts'] if entry['id'] != 'course-notes-v1']
        index['artifacts'].append({'id':'course-notes-v1','title':data['title'],'kind':'notes',
            'path':str(artifact.relative_to(ROOT/'modules/moodle-sync')),'sha256':digest(artifact.read_bytes()),
            'source_refs':[{'id':source['id'],'sha256':source['sha256']} for source in data['sources']],
            'review_status':'approved'})
        write(index_path,index)
        totals['topics'] += 1
        for key in ('lessons','questions','flashcards'):
            totals[key] += len(data.get(key,[]))
    ordered = [assets[name] for name in sorted(assets)]
    for asset in ordered:
        if 'source_sha256s' in asset:
            asset['source_sha256s'].sort()
    assert len(ordered) <= 1000 and sum(asset['size'] for asset in ordered) <= 500000000
    write(ENGINE/'learning-assets.json',{'schema':1,'release':'studylo-learning-v1','assets':ordered,
        'source_texts':sorted(texts,key=lambda item:item['source_sha256']),'counts':totals,
        'extraction':{'approved_unique_sources':len(approved_hashes),'approved_entries':len(feed),
                      'prepared_unique_sources':len(prepared_hashes),
                      'pending_unique_sources':len(approved_hashes-prepared_hashes),
                      'pending_topics':len(expected-actual),
                      'privacy_scope':'approved_public_sources_only','ocr':'fallible_transcription'}})
    print(json.dumps({**totals,'release_assets':len(ordered),'release_bytes':sum(asset['size'] for asset in ordered)}))

if __name__ == '__main__':
    main()
