const test = require('node:test');
const assert = require('node:assert/strict');

const id = 'a'.repeat(64);
const file = {id,kind:'file',subject:'mathematics',title:'Schválený pracovní list',summary:'Veřejná studijní pomůcka',path:`files/${id}.pdf`,sha256:id,size:100};
const validate = async entries => (await import('../modules/moodle-sync/view.js')).validateFeed({schema:1,entries});

test('Moodle overview accepts empty and reviewed feeds',async()=>{
  assert.deepEqual(await validate([]),[]);
  assert.equal((await validate([file]))[0].path,file.path);
});
test('Moodle overview rejects external URLs, traversal and mismatched hashes',async()=>{
  for(const path of ['https://example.com/a.pdf','../../private.pdf',`files/${'b'.repeat(64)}.pdf`]){
    await assert.rejects(()=>validate([{...file,path}]));
  }
});
test('Moodle overview rejects personal addresses, HTML and duplicate IDs',async()=>{
  for(const title of ['student@example.com','<img src=x>','token=secret']) await assert.rejects(()=>validate([{...file,title}]));
  await assert.rejects(()=>validate([file,file]));
});
