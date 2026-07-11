"""Generate resume.pdf from resume.tex content using reportlab."""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
import os

W, H = letter

def build_pdf(path):
    doc = SimpleDocTemplate(
        path, pagesize=letter,
        topMargin=0.4*inch, bottomMargin=0.4*inch,
        leftMargin=0.45*inch, rightMargin=0.45*inch,
    )

    s = getSampleStyleSheet()

    s.add(ParagraphStyle('Name', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=22, leading=26,
        alignment=TA_CENTER, spaceAfter=2))

    s.add(ParagraphStyle('RoleTitle', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=10, leading=13,
        alignment=TA_CENTER, textColor=colors.HexColor('#333333'),
        spaceAfter=4))

    s.add(ParagraphStyle('Contact', parent=s['Normal'],
        fontName='Helvetica', fontSize=9, leading=12,
        alignment=TA_CENTER, spaceAfter=6))

    s.add(ParagraphStyle('SecTitle', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=11, leading=14,
        spaceBefore=8, spaceAfter=3,
        borderPadding=(0, 0, 2, 0)))

    s.add(ParagraphStyle('EntryHead', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=10, leading=13))

    s.add(ParagraphStyle('EntrySubt', parent=s['Normal'],
        fontName='Helvetica-Oblique', fontSize=9.5, leading=12))

    s.add(ParagraphStyle('DateRight', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=9.5, leading=12,
        alignment=TA_RIGHT))

    s.add(ParagraphStyle('BulletItem', parent=s['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=10.5,
        leftIndent=15, bulletIndent=0, spaceAfter=0.5))

    s.add(ParagraphStyle('BulletLbl', parent=s['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=10.5,
        leftIndent=15, bulletIndent=0, spaceAfter=0.5))

    s.add(ParagraphStyle('ProjHead', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=9.5, leading=12.5))

    s.add(ParagraphStyle('ProjTech', parent=s['Normal'],
        fontName='Helvetica-Oblique', fontSize=9, leading=11.5))

    s.add(ParagraphStyle('ProjLink', parent=s['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=11,
        alignment=TA_RIGHT, textColor=colors.HexColor('#0B51C1')))

    story = []

    def section(title):
        story.append(Spacer(1, 4))
        story.append(Paragraph(f'<b>{title}</b>', s['SecTitle']))
        story.append(Paragraph('<hr width="100%" size="0.5" color="#333333"/>', s['Normal']))
        story.append(Spacer(1, 2))

    def entry_header(left, right):
        data = [[
            Paragraph(f'<b>{left}</b>', s['EntryHead']),
            Paragraph(f'<b>{right}</b>', s['DateRight']),
        ]]
        t = Table(data, colWidths=[4.2*inch, 2.8*inch])
        t.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ]))
        story.append(t)

    def entry_sub(left, right=''):
        if right:
            data = [[
                Paragraph(f'<i>{left}</i>', s['EntrySubt']),
                Paragraph(f'<b>{right}</b>', s['ProjLink']),
            ]]
            t = Table(data, colWidths=[4.2*inch, 2.8*inch])
            t.setStyle(TableStyle([
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ]))
            story.append(t)
        else:
            story.append(Paragraph(f'<i>{left}</i>', s['EntrySubt']))

    def bullet(text):
        story.append(Paragraph(f'<bullet>&bull;</bullet> {text}', s['BulletItem']))

    # ===== HEADER =====
    story.append(Paragraph('MANAN RASTOGI', s['Name']))
    story.append(Paragraph(
        'Applied AI Engineer | Computer Vision, Full-Stack Systems, LLM Integration',
        s['Title']))
    story.append(Paragraph(
        '+91 9548594935 &nbsp;|&nbsp; mananrastogi2k8.210@gmail.com &nbsp;|&nbsp; '
        'linkedin.com/in/manan-rastogi-402697288 &nbsp;|&nbsp; github.com/xmananrastogi',
        s['Contact']))

    # ===== EDUCATION =====
    section('EDUCATION')

    entry_header('Vellore Institute of Technology (VIT), Vellore, India',
                 '2024 – Present')
    entry_sub('B.Tech in Electronics &amp; Communication Engineering (Biomedical Specialization)')

    story.append(Spacer(1, 3))

    entry_header('IIT Madras, Online, India', '2025 – Present')
    entry_sub('BS in Data Science &amp; Applications')

    # ===== TECHNICAL EXPERTISE =====
    section('TECHNICAL SKILLS')

    story.append(Paragraph(
        '<b>Languages:</b> Python, TypeScript, JavaScript.',
        s['BulletLbl']))
    story.append(Paragraph(
        '<b>AI/ML &amp; CV:</b> OpenCV, SciPy, NumPy, TrackPy, OCR, LLM APIs (NVIDIA LLaMA 3.1).',
        s['BulletLbl']))
    story.append(Paragraph(
        '<b>Frontend:</b> React, Next.js, Three.js, Tailwind CSS, Framer Motion.',
        s['BulletLbl']))
    story.append(Paragraph(
        '<b>Backend &amp; Databases:</b> Flask, Node.js, REST APIs, JWT, MongoDB, SQLite, SQL.',
        s['BulletLbl']))
    story.append(Paragraph(
        '<b>Infrastructure &amp; Tools:</b> Docker, CI/CD, Vercel, MongoDB Atlas, Git, GitHub, VS Code.',
        s['BulletLbl']))

    # ===== PROJECTS =====
    section('PROJECTS')

    # Project 1 - WoundTrack
    entry_header(
        'WoundTrack AI: Applied Computer Vision Pipeline',
        '2024 – Present')
    entry_sub(
        'Python, OpenCV, Flask, SciPy, SQLite',
        '<a href="https://xmananrastogi-woundtrackai.hf.space/" color="#0B51C1">Live Demo</a> | '
        '<a href="https://github.com/xmananrastogi/WoundTrack-AI" color="#0B51C1">GitHub</a>')
    bullet(
        'Engineered a CV pipeline tracking <b>441 cells</b> across '
        '<b>800+ frames</b> in <b>&lt;10 min</b> on consumer hardware, achieving '
        '<b>28% higher precision</b> than manual ImageJ workflows.')
    bullet(
        'Implemented LoG blob detection + LAP gap-closing tracker with Kalman prediction '
        'for explainable cell localization and trajectory continuity through missed frames.')
    bullet(
        'Designed automated quantitative evaluation pipeline computing MSD exponents, '
        'velocity distributions and fractal metrics across five experimental datasets.')
    bullet(
        'Shipped Flask + SQLite dashboard auto-generating per-experiment reports with '
        'kinetic curves and one-click trajectory exports, replacing manual spreadsheet analysis.')

    story.append(Spacer(1, 2))

    # Project 2 - VITalize
    entry_header(
        'VITalize AI: Full-Stack Academic Platform',
        '2025 – Present')
    entry_sub(
        'Next.js 15, TypeScript, MongoDB, REST APIs, JWT, NVIDIA LLaMA 3.1, Tesseract OCR',
        '<a href="https://vitalize-vit.vercel.app/" color="#0B51C1">Live Demo</a>')
    bullet(
        'Developed a unified academic platform indexing <b>8,800+</b> past exam papers with '
        'full-text search and subject-level filtering, serving <b>890+</b> page views across '
        'FFCS planner, paper vault, and exam generator.')
    bullet(
        'Integrated <b>NVIDIA LLaMA 3.1</b> API with Tesseract OCR fallback pipeline to extract '
        'text from scanned PDFs and generate unit-wise, mark-weighted AI solutions with KaTeX rendering.')
    bullet(
        'Engineered constraint-based <b>FFCS timetable solver</b> using backtracking algorithm '
        'with optimized pruning for clash elimination, faculty prioritization, gap minimization, '
        'and ICS calendar export.')
    bullet(
        'Deployed on <b>Vercel</b> with <b>MongoDB Atlas</b>; serverless architecture handling '
        'concurrent academic workloads.')
    bullet(
        'Built Chrome extension (Manifest V3) auto-syncing academic data from VIT\'s VTOP portal.')

    story.append(Spacer(1, 2))

    # Project 3 - Portfolio
    entry_header(
        'Interactive 3D Engineering Portfolio',
        '2024 – Present')
    entry_sub(
        'TypeScript, React, Three.js (R3F), Framer Motion, Tailwind CSS',
        '<a href="https://xmananrastogi.github.io/portfolio/" color="#0B51C1">Live Demo</a> | '
        '<a href="https://github.com/xmananrastogi/portfolio" color="#0B51C1">GitHub</a>')
    bullet(
        'Architected a React + TypeScript portfolio with lazy-loaded bundle splitting, '
        'sub-1s initial load, and responsive accessibility-first layout.')
    bullet(
        'Implemented WCAG accessibility: keyboard navigation, ARIA labels, '
        'skip-to-content, reduced-motion support, and focus management '
        '(Lighthouse: 100 SEO, 97 accessibility, 100 best practices).')
    bullet(
        'Reduced layout shift and animation overhead by implementing Framer Motion with '
        'CSS-based reduced-motion fallbacks while maintaining 60 FPS on mobile devices.')

    doc.build(story)

if __name__ == '__main__':
    out = '/Users/mananrastogi/helloworld/portfolio/public/resume.pdf'
    build_pdf(out)
    size = os.path.getsize(out)
    print(f'Generated {out} ({size/1024:.0f} KB)')
