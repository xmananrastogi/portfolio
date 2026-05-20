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
        topMargin=0.5*inch, bottomMargin=0.45*inch,
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
        fontName='Helvetica', fontSize=9, leading=11.5,
        leftIndent=15, bulletIndent=0, spaceAfter=1))

    s.add(ParagraphStyle('BulletLbl', parent=s['Normal'],
        fontName='Helvetica', fontSize=9, leading=11.5,
        leftIndent=15, bulletIndent=0, spaceAfter=1))

    s.add(ParagraphStyle('ProjHead', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=9.5, leading=12.5))

    s.add(ParagraphStyle('ProjTech', parent=s['Normal'],
        fontName='Helvetica-Oblique', fontSize=9, leading=11.5))

    s.add(ParagraphStyle('ProjLink', parent=s['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=11,
        alignment=TA_RIGHT, textColor=colors.HexColor('#0B51C1')))

    story = []

    def hr():
        story.append(Spacer(1, 1))
        story.append(Paragraph('<hr width="100%" size="0.5" color="#CCCCCC"/>', s['Normal']))
        story.append(Spacer(1, 2))

    def section(title):
        story.append(Spacer(1, 6))
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
        'AI Product Engineer | Applied CV, LLM Evaluation, Full-Stack Systems',
        s['Title']))
    story.append(Paragraph(
        '+91 9548594935 &nbsp;|&nbsp; mananrastogi2k8.210@gmail.com &nbsp;|&nbsp; '
        'linkedin.com/in/manan-rastogi-402697288 &nbsp;|&nbsp; github.com/xmananrastogi',
        s['Contact']))

    # ===== EDUCATION =====
    section('EDUCATION')

    entry_header('Vellore Institute of Technology (VIT), Vellore, India',
                 '2024 -- PRESENT')
    entry_sub('B.Tech in Electronics &amp; Communication Engineering (Biomedical Specialization)')
    bullet('<b>Core:</b> Digital Signal Processing, Biomedical Imaging, Neural Networks, Embedded Systems.')

    story.append(Spacer(1, 3))

    entry_header('IIT Madras, Online, India', '2025 -- PRESENT')
    entry_sub('BS in Data Science &amp; Applications')
    bullet('<b>Core:</b> Machine Learning Foundations, Statistical Modeling, Algorithmic Design.')

    # ===== TECHNICAL EXPERTISE =====
    section('TECHNICAL EXPERTISE')

    expertise_items = [
        ('<b>Applied AI &amp; Evaluation</b>',
         'Python 3.12, LLM APIs (NVIDIA LLaMA 3.1), prompt engineering, RAG pipelines, '
         'rule-based validation, OpenCV, scikit-image, TrackPy, SciPy, NumPy.'),
        ('<b>Web &amp; Full-Stack</b>',
         'TypeScript, React.js, Next.js, Node.js, Three.js (R3F), Framer Motion, '
         'Flask, RESTful APIs, Tailwind CSS, MongoDB, Vite.'),
        ('<b>Systems &amp; Tooling</b>',
         'Git, Docker, Vercel, MongoDB Atlas, SQLite, Tesseract OCR, CI/CD, Linux Bash.'),
        ('<b>ECE &amp; Embedded</b>',
         'Verilog, C++, digital logic, DSP fundamentals, embedded systems, microcontrollers.'),
    ]
    for label, detail in expertise_items:
        story.append(Paragraph(f'<b>{label}:</b> {detail}', s['BulletLbl']))

    # ===== TECHNICAL PROJECT DEPLOYMENTS =====
    section('TECHNICAL PROJECT DEPLOYMENTS')

    # Project 1 - WoundTrack
    entry_header(
        'WoundTrack AI: Applied Computer Vision Pipeline',
        '2024 -- PRESENT')
    entry_sub(
        'Python, OpenCV, Flask, SciPy, SQLite',
        '<a href="https://xmananrastogi-woundtrackai.hf.space/" color="#0B51C1">[Live Demo]</a> '
        '<a href="https://github.com/xmananrastogi/WoundTrack-AI" color="#0B51C1">[Source]</a>')
    bullet(
        'Engineered a research-grade CV pipeline tracking <b>441 cells</b> across '
        '<b>800+ frames</b> in <b>&lt;10 min</b> on consumer hardware, achieving '
        '<b>28% higher precision</b> than manual ImageJ workflows.')
    bullet(
        'Implemented LoG blob detection + LAP gap-closing tracker with Kalman prediction '
        'for explainable cell localization and trajectory continuity through missed frames.')
    bullet(
        'Designed custom evaluation metrics (MSD exponents, wavefront roughness, '
        'fractal-dimension analysis) to validate output against biological movement patterns.')
    bullet(
        'Built Flask + SQLite dashboard for batch processing, kinetic visualization, '
        'and automated report generation.')

    story.append(Spacer(1, 4))

    # Project 2 - VITalize
    entry_header(
        'VITalize AI: Full-Stack Academic Platform',
        '2025 -- PRESENT')
    entry_sub(
        'Next.js 15, TypeScript, MongoDB, NVIDIA LLaMA 3.1, Tesseract OCR',
        '<a href="https://vitalize-vit.vercel.app/" color="#0B51C1">[Live Demo]</a> '
        '<a href="https://github.com/xmananrastogi/vitalize-fullstack" color="#0B51C1">[Source]</a>')
    bullet(
        'Built a unified academic platform indexing <b>3,000+</b> past exam papers with '
        'full-text search, subject-level filters, and bulk download &mdash; replacing scattered '
        'Telegram groups and Google Drive folders for VIT&rsquo;s student body.')
    bullet(
        'Integrated <b>NVIDIA LLaMA 3.1</b> API with Tesseract OCR fallback pipeline to extract '
        'text from scanned PDFs and generate unit-wise, mark-weighted AI solutions with KaTeX rendering.')
    bullet(
        'Engineered constraint-based <b>FFCS timetable solver</b> with clash elimination, '
        'faculty prioritization, gap minimization, and ICS calendar export.')
    bullet(
        'Deployed on <b>Vercel</b> with <b>MongoDB Atlas</b>; built a Chrome extension for '
        'VTOP data sync; open-source with community funding.')

    story.append(Spacer(1, 4))

    # Project 3 - Portfolio
    entry_header(
        'Interactive 3D Engineering Portfolio',
        '2024 -- PRESENT')
    entry_sub(
        'TypeScript, React, Three.js (R3F), Framer Motion, Tailwind CSS',
        '<a href="https://xmananrastogi.github.io/portfolio/" color="#0B51C1">[Live Demo]</a> '
        '<a href="https://github.com/xmananrastogi/portfolio" color="#0B51C1">[Source]</a>')
    bullet(
        'Built a portfolio with <b>React Three Fiber</b> 3D background scene and '
        '<b>Framer Motion</b> scroll-triggered section reveals.')
    bullet(
        'Achieved <b>WCAG accessibility</b> with skip navigation, ARIA labels, '
        'keyboard-dismissible intro, and reduced-motion support.')
    bullet(
        'Responsive design with lazy-loaded 3D scene, chunk-split bundling, '
        'and scroll progress indicator.')

    story.append(Spacer(1, 4))

    # Project 4 - GSSoC
    entry_header(
        'Editron &mdash; Open Source Contributor (GSSoC \'26)',
        '2026')
    entry_sub('JavaScript, Git, Open Source Workflow')
    bullet(
        'Contributing code-quality improvements to Editron, an open-source code editor, '
        'through GirlScript Summer of Code 2026.')
    bullet(
        'Following standard open-source workflow: issue triage, fork, feature branch, '
        'and pull request.')

    doc.build(story)

if __name__ == '__main__':
    out = '/Users/mananrastogi/helloworld/portfolio/public/resume.pdf'
    build_pdf(out)
    size = os.path.getsize(out)
    print(f'Generated {out} ({size/1024:.0f} KB)')
