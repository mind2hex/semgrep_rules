# EXAMPLE 1: 
def convert_possible_tags_to_header(self, html_content: str) -> str:
    if self.xslt_path is None:
        return html_content

    try:
        from lxml import etree
    except ImportError as e:
        raise ImportError(
            "Unable to import lxml, please install with `pip install lxml`."
        ) from e
    # use lxml library to parse html document and return xml ElementTree
    parser = etree.HTMLParser()
    # ruleid: python-taint-083-xml-injection-xxe
    tree = etree.parse(StringIO(html_content), parser)

    xslt_tree = etree.parse(self.xslt_path)
    transform = etree.XSLT(xslt_tree)
    result = transform(tree)
    return str(result)

# EXAMPLE 2
from flask import request
def parse_xml():
    from lxml import etree
    xml = request.get_json()["xml"]          # SOURCE (user-controlled)
    # ruleid: python-taint-083-xml-injection-xxe
    root = etree.fromstring(xml.encode())    # SINK (XXE possible w/ unsafe parser config)
    return root.tag

# EXAMPLE 3:
from flask import request
def import_feed():
    from lxml import etree
    from io import BytesIO
    xml = request.form["xml"]                           # SOURCE
    parser = etree.XMLParser(resolve_entities=True)     # (enables entity resolution)
    # ruleid: python-taint-083-xml-injection-xxe
    doc = etree.parse(BytesIO(xml.encode()), parser)    # SINK
    return doc.getroot().tag

# EXAMPLE 4:
from django.http import HttpRequest
def api_xml(request: HttpRequest):
    import xml.etree.ElementTree as ET
    xml = request.body                     # SOURCE
    # ruleid: python-taint-083-xml-injection-xxe
    root = ET.fromstring(xml)              # SINK (XML parsing of untrusted input)
    return root.tag

# EXAMPLE 5:
from django.http import HttpRequest
def preview(request: HttpRequest):
    from xml.dom import minidom
    xml = request.GET.get("xml", "")       # SOURCE
    # ruleid: python-taint-083-xml-injection-xxe
    dom = minidom.parseString(xml)         # SINK
    return dom.documentElement.tagName

# EXAMPLE 6:
import tornado.web
class UploadHandler(tornado.web.RequestHandler):
    def post(self):
        from lxml import etree
        from io import StringIO
        xml = self.get_argument("xml")     # SOURCE
        parser = etree.XMLParser()
        # ruleid: python-taint-083-xml-injection-xxe
        doc = etree.parse(StringIO(xml), parser)   # SINK
        self.write(doc.getroot().tag)

# EXAMPLE 7
from fastapi import FastAPI, Request
app = FastAPI()
@app.post("/xml")
async def xml_endpoint(request: Request):
    from lxml import etree
    xml = await request.body()             # SOURCE
    # ruleid: python-taint-083-xml-injection-xxe
    root = etree.XML(xml)                  # SINK (alias de fromstring)
    return {"tag": root.tag}

# EXAMPLE 8
def transform(xml_content: str, xslt_path: str) -> str:
    from io import StringIO
    from lxml import etree
    # SOURCE: xml_content (taint por parámetro)
    parser = etree.XMLParser()
    # ruleid: python-taint-083-xml-injection-xxe
    tree = etree.parse(StringIO(xml_content), parser)  # SINK
    xslt_tree = etree.parse(xslt_path)
    return str(etree.XSLT(xslt_tree)(tree))
