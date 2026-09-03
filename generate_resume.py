"""
Generate resume PDF mirroring the LaTeX Jake's Resume template.
Matches resume.tex exactly: scshape section headers with rule, tabular alignment,
proper indentation, ATS-clean output.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib import colors
import os

W, H = letter

BLACK   = colors.HexColor('#000000')
DARKGRY = colors.HexColor('#222222')
MIDGRY  = colors.HexColor('#444444')
BLUE    = colors.HexColor('#0B51C1')

def build_pdf(path: str):
    doc = SimpleDocTemplate(
        path,
        pagesize=letter,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch,
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch,
    )

    styles = getSampleStyleSheet()

    def add(name, **kw):
        styles.add(ParagraphStyle(name=name, **kw))

    # ── Header ───────────────────────────────────────────────────────────────
    add('Name',
        fontName='Helvetica-Bold', fontSize=18, leading=22,
        alignment=TA_CENTER, spaceAfter=2)

    add('Contact',
        fontName='Helvetica', fontSize=9, leading=11,
        alignment=TA_CENTER, spaceAfter=2, textColor=DARKGRY)

    add('RoleTag',
        fontName='Helvetica', fontSize=9, leading=11,
        alignment=TA_CENTER, spaceAfter=4, textColor=MIDGRY)

    # ── Section titles ──────────────────────────────────────────────────────
    add('SecHead',
        fontName='Helvetica-Bold', fontSize=11, leading=13,
        spaceBefore=9, spaceAfter=0,
        textColor=BLACK)

    # ── Entry rows ─────────────────────────────────────────────────────────────
    add('EntryOrg',
        fontName='Helvetica-Bold', fontSize=10, leading=12, textColor=BLACK)

    add('EntryOrgR',
        fontName='Helvetica-Bold', fontSize=10, leading=12,
        alignment=TA_RIGHT, textColor=BLACK)

    add('EntrySub',
        fontName='Helvetica-Oblique', fontSize=9, leading=11, textColor=DARKGRY)

    add('EntrySubR',
        fontName='Helvetica-Oblique', fontSize=9, leading=11,
        alignment=TA_RIGHT, textColor=DARKGRY)

    # ── Bullets ───────────────────────────────────────────────────────────────
    add('BulletItem',
        fontName='Helvetica', fontSize=9, leading=11,
        leftIndent=12, firstLineIndent=0,
        spaceAfter=2, textColor=DARKGRY)

    # ── Skills / plain ─────────────────────────────────────────────────────────
    add('Plain',
        fontName='Helvetica', fontSize=9, leading=11,
        leftIndent=0, textColor=DARKGRY)

    # ── Layout ───────────────────────────────────────────────────────────────
    usable = W - 1.0 * inch
    col_l  = usable * 0.68   # wider left for project names + tech
    col_r  = usable * 0.32   # right: links / dates

    story = []

    def section(title: str):
        story.append(Spacer(1, 4))
        story.append(Paragraph(title.upper(), styles['SecHead']))
        story.append(HRFlowable(
            width='100%', thickness=0.5,
            color=BLACK, spaceAfter=5))

    def two_col(left_para, right_para, l_style='EntryOrg', r_style='EntryOrgR'):
        t = Table(
            [[Paragraph(left_para, styles[l_style]),
              Paragraph(right_para, styles[r_style])]],
            colWidths=[col_l, col_r]
        )
        t.setStyle(TableStyle([
            ('ALIGN',        (0, 0), (0, 0), 'LEFT'),
            ('ALIGN',        (1, 0), (1, 0), 'RIGHT'),
            ('VALIGN',       (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING',  (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING',   (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING',(0, 0), (-1, -1), 0),
        ]))
        story.append(t)

    def sub_row(left, right=''):
        if right:
            two_col(left, right, 'EntrySub', 'EntrySubR')
        else:
            story.append(Paragraph(left, styles['EntrySub']))

    def bullet(text):
        story.append(Paragraph(f'- {text}', styles['BulletItem']))

    def gap(n=4):
        story.append(Spacer(1, n))

    # HEADER
    story.append(Paragraph('MANAN RASTOGI', styles['Name']))
    story.append(Paragraph(
        '+91 9548594935  |  '
        '<a href="mailto:mananrastogi2k8.210@gmail.com">'
        '<u><font color="#0B51C1">mananrastogi2k8.210@gmail.com</font></u></a>  |  '
        '<a href="https://linkedin.com/in/manan-rastogi-402697288">'
        '<u><font color="#0B51C1">linkedin.com/in/manan-rastogi</font></u></a>  |  '
        '<a href="https://github.com/xmananrastogi">'
        '<u><font color="#0B51C1">github.com/xmananrastogi</font></u></a>',
        styles['Contact']
    ))
    story.append(Paragraph(
        'ECE undergrad (VIT)  ·  IIT Madras DS&amp;A  ·  Applied AI  ·  Full-Stack  ·  Computer Vision',
        styles['RoleTag']
    ))

    # EDUCATION
    section('Education')

    two_col('Vellore Institute of Technology (VIT)  —  Vellore, India', '2024 – Present')
    sub_row('B.Tech in ECE (Biomedical Specialization)  |  CGPA: 7.53')
    gap(6)

    two_col('IIT Madras  —  Online, India', '2025 – Present')
    sub_row('BS in Data Science &amp; Applications')
    gap(6)

    two_col('Delhi Public School  —  Bareilly, India', 'Graduated 2022')
    sub_row('Class XII — 80%  |  Class X — 80%')

    # EXPERIENCE
    section('Experience')

    two_col('<b>Summer Intern — Retail Automation</b>', 'May 2026 – Jun 2026')
    sub_row('Indian Oil Corporation', 'Bareilly, India')
    gap(4)
    bullet('Built <b>ComplaintGuard</b> \u2014 a Streamlit + Python app that replaced the team\'s manual Excel SLA review. A batch that used to take hours now runs in about <b>30 seconds</b>.')
    bullet('Reads IOCL\'s vendor complaint exports, works out whether each ticket was Early, On Time, or late against its SLA (24h or 48h), and totals up <b>INR 1,000/day</b> penalties — results go out as a formatted Excel sheet.')
    bullet('Also catches auto-closed tickets and flags equipment visited twice within 30 days \u2014 things the old VBA macro couldn\'t handle (and which broke entirely on Mac).')

    # PROJECTS
    section('Projects')

    # WoundTrack
    two_col(
        '<b>WoundTrack AI</b>  |  <i>Python, OpenCV, Flask, SciPy, SQLite</i>',
        '<a href="https://xmananrastogi-woundtrackai.hf.space/"><u><font color="#0B51C1">Live Demo</font></u></a>  |  '
        '<a href="https://github.com/xmananrastogi/WoundTrack-AI"><u><font color="#0B51C1">GitHub</font></u></a>')
    gap(4)
    bullet('Tracks <b>441 cells</b> across <b>800+ frames</b> in under 10 minutes on a regular laptop — <b>28% more accurate</b> than the lab\'s ImageJ workflow, which needed manual annotation per frame.')
    bullet('Detection uses LoG blob-finding then a LAP gap-closing tracker with Kalman-filter predictions, so trajectories survive occlusions without fragmenting mid-sequence.')
    bullet('Researchers upload an experiment on the Flask dashboard and get kinetic curves, MSD breakdowns, and one-click exports — no more copy-pasting between spreadsheets.')
    gap(7)

    # VITalize
    two_col(
        '<b>VITalize AI</b>  |  <i>Next.js 15, TypeScript, MongoDB, LLM APIs, Tesseract OCR</i>',
        '<a href="https://vitalize-vit.vercel.app/"><u><font color="#0B51C1">Live Demo</font></u></a>')
    gap(4)
    bullet('Academic platform for VIT students — <b>9,103 past papers</b> searchable by subject, AI-generated solutions (LLaMA 3.1 + OCR) with KaTeX math rendering, <b>2,439 courses</b> and <b>2,587 calendar events</b> tracked.')
    bullet('The FFCS solver finds clash-free schedules across <b>2,400+ combinations</b> in under a second using backtracking with constraint pruning for faculty, time gaps, and slot clashes.')
    bullet('Chrome extension (Manifest V3) pulls live data from VIT\'s VTOP portal directly into the platform. Deployed serverless on Vercel with MongoDB Atlas.')
    gap(7)

    # Portfolio
    two_col(
        '<b>3D Engineering Portfolio</b>  |  <i>React, TypeScript, Three.js (R3F), Tailwind CSS</i>',
        '<a href="https://xmananrastogi.github.io/portfolio/"><u><font color="#0B51C1">Live Demo</font></u></a>  |  '
        '<a href="https://github.com/xmananrastogi/portfolio"><u><font color="#0B51C1">GitHub</font></u></a>')
    gap(4)
    bullet('Personal site with interactive Three.js 3D scenes, lazy-loaded bundle splitting, and sub-1s initial load on mobile — built as a real engineering project, not just a design exercise.')
    bullet('Full WCAG pass: keyboard navigation, ARIA labels, skip-to-content, reduced-motion fallbacks. Lighthouse: <b>100 SEO, 97 accessibility, 100 best practices</b>.')

    # CERTIFICATIONS
    section('Certifications')
    two_col(
        '<b>Designing Cisco Security Infrastructure (SDSI)</b>  |  <i>Credly Badge</i>',
        'Jul 2026')

    # TECHNICAL SKILLS
    section('Technical Skills')
    skills = [
        ('<b>Languages</b>', 'Python, TypeScript, JavaScript'),
        ('<b>AI/ML &amp; CV</b>', 'OpenCV, NumPy, SciPy, LLM APIs, Tesseract OCR'),
        ('<b>Web</b>', 'React, Next.js, Three.js, Flask, Streamlit, Tailwind CSS, REST APIs, JWT'),
        ('<b>Databases</b>', 'MongoDB, SQLite, SQL'),
        ('<b>Tools</b>', 'Git, GitHub, Vercel, VS Code'),
    ]
    for label, value in skills:
        story.append(Paragraph(f'{label}: {value}', styles['Plain']))

    doc.build(story)


if __name__ == '__main__':
    out = '/Users/mananrastogi/helloworld/portfolio/public/resume.pdf'
    build_pdf(out)
    size = os.path.getsize(out)
    print(f'Generated {out} ({size / 1024:.0f} KB)')
