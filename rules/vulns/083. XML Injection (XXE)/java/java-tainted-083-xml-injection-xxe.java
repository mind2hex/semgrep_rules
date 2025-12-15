// EXAMPLE 1: XXE básico - DocumentBuilderFactory sin defensas
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.xml.sax.InputSource;
import org.w3c.dom.Document;
import java.io.StringReader;

public class XXEVulnerable1 {
    public Document parseXml(String xmlInput) {
        try {
            // SOURCE: xmlInput (entrada no confiable)
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            // PATCH: dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            // PATCH: dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            DocumentBuilder db = dbf.newDocumentBuilder();
            // SINK: parse() procesa el XML sin validaciones
            // ruleid: java-tainted-083-xml-injection-xxe
            Document doc = db.parse(new InputSource(new StringReader(xmlInput)));
            return doc;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 2: XXE con SAXParser
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.helpers.DefaultHandler;

public class XXEVulnerable2 {
    public void parseSax(String xmlInput) {
        try {
            // SOURCE: xmlInput
            SAXParserFactory spf = SAXPasrerFactory.newInstance();
            // PATCH: spf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            // PATCH: spf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // PATCH: spf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            // PATCH: spf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            SAXParser parser = spf.newSAXParser();
            // SINK: parse() sin protección XXE
            // ruleid: java-tainted-083-xml-injection-xxe
            parser.parse(new InputSource(new StringReader(xmlInput)), new DefaultHandler());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 3: XXE con XMLInputFactory (StAX)
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import java.io.StringReader;

public class XXEVulnerable3 {
    public XMLStreamReader parseStax(String xmlInput) {
        try {
            // SOURCE: xmlInput
            XMLInputFactory factory = XMLInputFactory.newInstance();
            // PATCH: factory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            // PATCH: factory.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
            // PATCH: factory.setProperty("com.ctc.wstx.disallowDocTypeDecl", true);
            // SINK: createXMLStreamReader() sin validaciones
            // ruleid: java-tainted-083-xml-injection-xxe
            XMLStreamReader reader = factory.createXMLStreamReader(new StringReader(xmlInput));
            return reader;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 4: XXE con Transformer (XSLT)
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.stream.StreamSource;
import javax.xml.transform.stream.StreamResult;
import java.io.StringReader;
import java.io.StringWriter;

public class XXEVulnerable4 {
    public String transformXml(String xmlInput, String xsltInput) {
        try {
            // SOURCE: xmlInput y xsltInput
            TransformerFactory tf = TransformerFactory.newInstance();
            // PATCH: tf.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            // PATCH: tf.setAttribute(XMLConstants.ACCESS_EXTERNAL_STYLESHEET, "");
            Transformer transformer = tf.newTransformer(new StreamSource(new StringReader(xsltInput)));
            StringWriter output = new StringWriter();
            // SINK: transform() sin protección
            // ruleid: java-tainted-083-xml-injection-xxe
            transformer.transform(new StreamSource(new StringReader(xmlInput)), new StreamResult(output));
            return output.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 5: XXE con SchemaFactory (XSD validation)
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Schema;
import javax.xml.validation.Validator;
import org.xml.sax.SAXException;
import java.io.StringReader;

public class XXEVulnerable5 {
    public void validateXml(String xmlInput, String xsdSchema) {
        try {
            // SOURCE: xmlInput y xsdSchema
            SchemaFactory sf = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
            // PATCH: sf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            // PATCH: sf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // PATCH: sf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            // PATCH: sf.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            // PATCH: sf.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
            Schema schema = sf.newSchema(new StreamSource(new StringReader(xsdSchema)));
            Validator validator = schema.newValidator();
            // SINK: validate() sin protección XXE
            // ruleid: java-tainted-083-xml-injection-xxe
            validator.validate(new StreamSource(new StringReader(xmlInput)));
        } catch (SAXException e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 6: XXE con XMLConstants (falsa seguridad)
import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilderFactory;

public class XXEVulnerable6 {
    public Document parseXmlPartial(String xmlInput) {
        try {
            // SOURCE: xmlInput
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            // Solo deshabilita FEATURE_SECURE_PROCESSING pero no XXE específicamente
            dbf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            // PATCH: dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            // PATCH: dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            DocumentBuilder db = dbf.newDocumentBuilder();
            // SINK: sigue siendo vulnerable
            // ruleid: java-tainted-083-xml-injection-xxe
            Document doc = db.parse(new InputSource(new StringReader(xmlInput)));
            return doc;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 7: XXE con XPATH
import javax.xml.xpath.XPathFactory;
import javax.xml.xpath.XPath;
import org.xml.sax.InputSource;
import java.io.StringReader;

public class XXEVulnerable7 {
    public String evaluateXpath(String xmlInput, String xpathQuery) {
        try {
            // SOURCE: xmlInput
            XPathFactory xpf = XPathFactory.newInstance();
            // PATCH: xpf.setFeature(XMLConstants.ACCESS_EXTERNAL_DTD, false);
            // PATCH: xpf.setFeature(XMLConstants.ACCESS_EXTERNAL_STYLESHEET, false);
            XPath xpath = xpf.newXPath();
            InputSource is = new InputSource(new StringReader(xmlInput));
            // SINK: evaluate() procesa XXE
            // ruleid: java-tainted-083-xml-injection-xxe
            String result = xpath.evaluate(xpathQuery, is);
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 8: XXE Blind - información no visible pero procesada
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;

public class XXEBlindVulnerable {
    public void parseFromUrl(String urlInput) {
        try {
            // SOURCE: urlInput - podría contener XXE payload
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            // PATCH: dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            // PATCH: dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            // PATCH: dbf.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            DocumentBuilder db = dbf.newDocumentBuilder();
            // SINK: parse desde URL externa
            // ruleid: java-tainted-083-xml-injection-xxe
            db.parse(new URL(urlInput).openStream());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 9: XXE con variable mal sanitizada
import javax.xml.parsers.DocumentBuilderFactory;

public class XXEVulnerable9 {
    public Document parseUserData(String userName, String userData) {
        try {
            // SOURCE: userData controlado por usuario
            String xml = "<user><name>" + userName + "</name><data>" + userData + "</data></user>";
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            // PATCH: dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            // PATCH: dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            DocumentBuilder db = dbf.newDocumentBuilder();
            // SINK: parse() procesa la concatenación
            // ruleid: java-tainted-083-xml-injection-xxe
            Document doc = db.parse(new InputSource(new StringReader(xml)));
            return doc;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 10: XXE a través de InputStream (source más oculto)
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;

public class XXEVulnerable10 {
    public Document parseInputStream(InputStream xmlStream) {
        try {
            // SOURCE: xmlStream - podría venir de request HTTP, socket, etc.
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            // PATCH: dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // PATCH: dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            // PATCH: dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            // PATCH: dbf.setXIncludeAware(false);
            // PATCH: dbf.setExpandEntityReferences(false);
            DocumentBuilder db = dbf.newDocumentBuilder();
            // SINK: parse() sin validación
            // ruleid: java-tainted-083-xml-injection-xxe
            Document doc = db.parse(xmlStream);
            return doc;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// EXAMPLE 11: XXE con SAXBuilder
import org.jdom2.input.SAXBuilder;
public class XXEVulnerable11 {
    public Document convertXmlToString(String xmlStr) {
        SAXBuilder sax = new SAXBuilder();

        try {
            // ruleid: java-tainted-083-xml-injection-xxe
            Document doc = sax.build(new StringReader(xmlStr));
            System.out.print(doc.getRootElement().getValue());
            return doc;

        } catch (JDOMException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}