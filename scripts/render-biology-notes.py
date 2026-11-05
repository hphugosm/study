"""Render the reviewed notes payload without adding educational content.

Requires reportlab. Pass --font-dir with NotoSans-Regular.ttf and
NotoSans-Bold.ttf. The web notes and the PDF use the same data.json.
"""

import argparse
import html
import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate,
    Paragraph, Spacer, Table, TableStyle,
)


def main():
    root = Path(__file__).resolve().parent.parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--font-dir', type=Path, required=True)
    parser.add_argument('--output', type=Path,
                        default=root / 'modules/biology/assets/kosterni-soustava-prehled.pdf')
    args = parser.parse_args()
    notes = json.loads((root / 'modules/biology/data.json').read_text())['notes']
    sections = {section['id']: section for section in notes['sections']}
    pdfmetrics.registerFont(TTFont('Notes', str(args.font_dir / 'NotoSans-Regular.ttf')))
    pdfmetrics.registerFont(TTFont('NotesBold', str(args.font_dir / 'NotoSans-Bold.ttf')))
    pdfmetrics.registerFontFamily('Notes', normal='Notes', bold='NotesBold')

    width, height = A4
    margin = 40
    ink = colors.HexColor('#26382d')
    accent = colors.HexColor('#315d49')
    muted = colors.HexColor('#627369')
    styles = {
        'kicker': ParagraphStyle('kicker', fontName='NotesBold', fontSize=9,
                                leading=12, textColor=accent, spaceAfter=10),
        'title': ParagraphStyle('title', fontName='NotesBold', fontSize=27,
                               leading=33, textColor=ink, spaceAfter=18),
        'heading': ParagraphStyle('heading', fontName='NotesBold', fontSize=15,
                                 leading=20, textColor=accent, spaceBefore=10,
                                 spaceAfter=8),
        'summary': ParagraphStyle('summary', fontName='Notes', fontSize=10,
                                 leading=14, textColor=muted, spaceAfter=10),
        'body': ParagraphStyle('body', fontName='Notes', fontSize=10,
                              leading=14.5, textColor=ink, spaceAfter=8,
                              leftIndent=10, bulletIndent=0),
        'source': ParagraphStyle('source', fontName='Notes', fontSize=8,
                                leading=11, textColor=muted, spaceAfter=12),
        'glossary': ParagraphStyle('glossary', fontName='Notes', fontSize=9,
                                  leading=12, textColor=ink, spaceAfter=5),
    }

    def paragraph(text, style='body'):
        return Paragraph(text, styles[style])

    def source(slides):
        return 'Snímky ' + ', '.join(map(str, slides))

    def section(key, heading=True):
        item = sections[key]
        output = [KeepTogether([
            *([paragraph(html.escape(item['title']), 'heading')] if heading else []),
            paragraph(html.escape(item['summary']), 'summary'),
        ])]
        for text, slides in zip(item['items'], item['itemSlides'], strict=True):
            output.append(paragraph(
                html.escape(text) + ' <font color="#627369" size="7.5">[' +
                html.escape(', '.join(map(str, slides))) + ']</font>'))
        output.append(paragraph('Zdroj: snímky ' + html.escape(item['slideRange']), 'source'))
        return output

    def background(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(colors.HexColor('#f8faf7'))
        canvas.rect(0, 0, width, height, fill=1, stroke=0)
        canvas.setFillColor(accent)
        canvas.rect(0, height - 8, width, 8, fill=1, stroke=0)
        canvas.setFont('NotesBold', 8)
        canvas.drawString(margin, height - 30, 'BIOLOGIE / KOSTERNÍ SOUSTAVA')
        canvas.setFillColor(muted)
        canvas.setFont('Notes', 7.5)
        canvas.drawRightString(width - margin, height - 30, 'Výpisky z původní prezentace')
        canvas.setStrokeColor(colors.HexColor('#dce6dd'))
        canvas.line(margin, 40, width - margin, 40)
        canvas.setFont('Notes', 7)
        canvas.drawString(margin, 25, 'Jediný zdroj: původní prezentace Kosterní soustava, 63 snímků.')
        canvas.drawRightString(width - margin, 25, str(doc.page))
        canvas.restoreState()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    document = BaseDocTemplate(
        str(args.output), pagesize=A4, leftMargin=margin, rightMargin=margin,
        topMargin=56, bottomMargin=53, title='Kosterní soustava - výpisky z prezentace',
        author='study lo', invariant=1,
    )
    document.addPageTemplates(PageTemplate(
        id='notes', frames=Frame(margin, 53, width - 2 * margin, height - 109,
                                leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0),
        onPage=background,
    ))
    pages = [
        ('Základy a růst kostí', ['zaklady', 'rust']),
        ('Stavba a spojení kostí', ['stavba', 'spojeni']),
        ('Páteř a hrudník', ['pater', 'hrudnik']),
        ('Horní končetina', ['horni']),
        ('Dolní končetina', ['dolni']),
        ('Lebka a onemocnění', ['lebka', 'vyvoj-lebky', 'nemoci']),
        ('Slovníček pojmů', []),
    ]
    story = []
    for index, (title, keys) in enumerate(pages):
        if index:
            story.append(PageBreak())
        story.extend([
            paragraph(f'{index + 1:02d} / VÝPISKY', 'kicker'),
            paragraph(html.escape(title), 'title'),
        ])
        for key in keys:
            story.extend(section(key, heading=len(keys) > 1))
        if not keys:
            terms = sorted(notes['glossary'], key=lambda term: term['term'])
            half = (len(terms) + 1) // 2

            def term_cell(term):
                return paragraph(
                    '<b>' + html.escape(term['term']) + '</b><br/>' +
                    html.escape(term['definition']) + '<br/>' +
                    '<font color="#627369" size="7.5">' + source(term['slides']) + '</font>',
                    'glossary',
                )

            rows = [[term_cell(terms[i]), term_cell(terms[i + half])
                     if i + half < len(terms) else ''] for i in range(half)]
            table = Table(rows, colWidths=[(width - 2 * margin) / 2] * 2)
            table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (0, -1), 0),
                ('RIGHTPADDING', (0, 0), (0, -1), 16),
                ('LEFTPADDING', (1, 0), (1, -1), 16),
                ('RIGHTPADDING', (1, 0), (1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
            ]))
            story.extend([table, Spacer(1, 12), paragraph(
                'Zdroj všech výpisků a definic: původní prezentace Kosterní soustava '
                '(63 snímků), včetně čitelných popisků obrázků. Čísla v hranatých '
                'závorkách odkazují na příslušné snímky.', 'source')])
    document.build(story)
    print(f'Rendered {document.page} pages: {args.output}')


if __name__ == '__main__':
    main()
