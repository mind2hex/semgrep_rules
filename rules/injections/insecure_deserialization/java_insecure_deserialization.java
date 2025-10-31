// EXAMPLE 1
import java.io.*;

public class InsecureObjectInputStream {
    public static void main(String[] args) throws Exception {
        byte[] serializedData = getDataFromNetwork();
        ByteArrayInputStream bais = new ByteArrayInputStream(serializedData);
        ObjectInputStream ois = new ObjectInputStream(bais);
        Object obj = ois.readObject(); // ❌ Vulnerable: datos no confiables
        System.out.println(obj);
    }

    private static byte[] getDataFromNetwork() {
        // Simula datos desde una fuente externa
        return new byte[]{};
    }
}

// EXAMPLE 2
import java.beans.XMLDecoder;
import java.io.ByteArrayInputStream;

public class InsecureXMLDecoder {
    public static void main(String[] args) {
        String xml = getXmlFromUser();
        XMLDecoder d = new XMLDecoder(new ByteArrayInputStream(xml.getBytes()));
        Object result = d.readObject(); // ❌ Vulnerable
        System.out.println(result);
    }

    private static String getXmlFromUser() {
        // Simula input remoto
        return "<java><object class='java.lang.ProcessBuilder'><array class='java.lang.String' length='1'><void index='0'><string>calc.exe</string></void></array><void method='start'/></object></java>";
    }
}


// EXAMPLE 3
// ruleid: java-insecure-deserialization
import com.thoughtworks.xstream.XStream;

public class InsecureXStream {
    public static void main(String[] args) {
        String xml = getDataFromRequest();
        XStream xstream = new XStream();
        Object obj = xstream.fromXML(xml); // ❌ Deserialización insegura
        System.out.println(obj);
    }

    private static String getDataFromRequest() {
        return "<java>...</java>";
    }
}

// EXAMPLE 4
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;

public class InsecureJackson {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        // ❌ Activa deserialización polimórfica insegura
        mapper.activateDefaultTyping(
            LaissezFaireSubTypeValidator.instance,
            ObjectMapper.DefaultTyping.NON_FINAL
        );
        String json = getJsonFromNetwork();
        Object obj = mapper.readValue(json, Object.class);
    }

    private static String getJsonFromNetwork() {
        return "{\"@class\":\"java.lang.ProcessBuilder\",\"command\":[\"calc.exe\"]}";
    }
}


// EXAMPLE 5
// ruleid: java-insecure-deserialization
import org.apache.commons.lang3.SerializationUtils;

public class InsecureCommons {
    public static void main(String[] args) {
        byte[] input = getUntrustedData();
        Object obj = SerializationUtils.deserialize(input); // ❌
        System.out.println(obj);
    }

    private static byte[] getUntrustedData() {
        return new byte[]{};
    }
}
