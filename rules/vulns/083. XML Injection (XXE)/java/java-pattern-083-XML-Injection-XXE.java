// EXAMPLE 1: insecure XMLReaderFactory.createXMLReader();
public class SourceType extends AegisType {
    protected DocumentBuilder getDocumentBuilder()
        throws ServletException {
        DocumentBuilder documentBuilder = null;
        DocumentBuilderFactory documentBuilderFactory = null;
        try {
            documentBuilderFactory = DocumentBuilderFactory.newInstance();
            documentBuilderFactory.setNamespaceAware(true);

            // SECURE MODE
            // documentBuilderFactory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);

            // Deshabilitar DOCTYPE completamente (mitiga XXE y Billion Laughs)
            // documentBuilderFactory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);

            // 3. Deshabilitar entidades externas (general y parameter)
            // documentBuilderFactory.setFeature("http://xml.org/sax/features/external-general-entities", false);
            // documentBuilderFactory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);

            // 4. No cargar DTD externas
            // documentBuilderFactory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);

            // 6. Restringir acceso a recursos externos por atributo (Java 7+)
            // documentBuilderFactory.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            // documentBuilderFactory.setAttribute(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
            
            // ruleid: java-pattern-083-XML-Injection-XXE
            documentBuilder = documentBuilderFactory.newDocumentBuilder();
        } catch(ParserConfigurationException e) {
            throw new ServletException
                (sm.getString("webdavservlet.jaxpfailed"));
        }
        return documentBuilder;
    }

}
