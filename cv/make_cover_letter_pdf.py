"""Render <application dir>/cover_letter.md to cover_letter.pdf in the CV's font.

Usage: python make_cover_letter_pdf.py <application dir>
Needs the python packages `typst` and `rendercv-fonts`, `ruamel.yaml` (all installed with rendercv[full]).
"""
import sys
import tempfile
from pathlib import Path

import rendercv_fonts
import typst
from ruamel.yaml import YAML


def escape(text):
    for ch in ("\\", "#", "$", "@", "*", "_", "`", "<", ">"):
        text = text.replace(ch, "\\" + ch)
    return text


def main(app_dir):
    app_dir = Path(app_dir)
    cv = YAML(typ="safe").load(next(app_dir.glob("*_CV.yaml")).read_text())["cv"]
    paragraphs = (app_dir / "cover_letter.md").read_text().strip().split("\n\n")
    contact = [cv["location"], cv["email"], cv["website"].replace("https://", "")]
    header = " \\\n".join(escape(line) for line in contact)
    body = "\n\n".join(escape(p) for p in paragraphs)
    source = f'''#set page(paper: "a4", margin: (x: 2.5cm, y: 2.5cm))
#set text(font: "Source Sans 3", size: 11pt)
#set par(justify: false, leading: 0.75em, spacing: 1.2em)
#text(size: 16pt, weight: "bold")[{escape(cv["name"])}] \\
{header}

#v(1em)

{body}
'''
    fonts = Path(rendercv_fonts.__file__).parent
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / "cover_letter.typ"
        src.write_text(source)
        typst.compile(str(src), output=str(app_dir / "cover_letter.pdf"), font_paths=[str(fonts)])


if __name__ == "__main__":
    main(sys.argv[1])
