
// EXAMPLE 1 BinaryFormatter
[ApiController]
public class StateController : ControllerBase
{
    [HttpPost("/load")]
    public IActionResult Load()
    {
        using var ms = new MemoryStream(Request.Body.ReadAllBytes());

        var bf = new BinaryFormatter();

        // ❌ Insecure Deserialization
        // ruleid: csharp-tainted-097-Insecure-Deserialization
        var obj = bf.Deserialize(ms);

        return Ok();
    }
}

// EXAMPLE 2: NetDataContractSerializer
[HttpPost("/load")]
public IActionResult Load([FromBody] byte[] data)
{
    var serializer = new NetDataContractSerializer();

    using var ms = new MemoryStream(data);

    // ❌ Insecure deserialization
    // ruleid: csharp-tainted-097-Insecure-Deserialization
    var obj = serializer.Deserialize(ms);

    return Ok();
}

// EXAMPLE 3: LosFormatter
public void LoadState(string base64Data)
{
    var bytes = Convert.FromBase64String(base64Data);

    var formatter = new LosFormatter();

    // ❌ Insecure deserialization
    // ruleid: csharp-tainted-097-Insecure-Deserialization
    var obj = formatter.Deserialize(base64Data);
}

// EXAMPLE 4: SoapFormatter
public void LoadState(string stream)
{
    var formatter = new SoapFormatter();

    // ❌ Insecure deserialization
    // ruleid: csharp-tainted-097-Insecure-Deserialization
    var obj = formatter.Deserialize(stream);
}

// EXAMPLE 5: JavaScriptSerializer
public void foo(string user_input){
    using System.Web.Script.Serialization;

    var serializer = new JavaScriptSerializer(new SimpleTypeResolver());

    // ❌ Insecure deserialization
    // ruleid: csharp-tainted-097-Insecure-Deserialization
    var obj = serializer.Deserialize<object>(user_input);

}


// EXAMPLE 6: DataContractSerializer
public void foo(string user_input){
    var serializer = new DataContractSerializer(typeof(object));

    // ❌ Riesgo de deserialización peligrosa dependiendo de configuración
    // ruleid: csharp-tainted-097-Insecure-Deserialization
    var obj = serializer.ReadObject(user_input);
}

// EXAMPLE 7:XmlSerializer
[HttpPost("/load")]
public IActionResult LoadXml([FromBody] string xml, string typeName)
{
    var type = Type.GetType(typeName); // user-controlled

    // ruleid: csharp-tainted-097-Insecure-Deserialization
    var serializer = new XmlSerializer(type);

    // ❌ riesgo si typeName es controlado por usuario
    var obj = serializer.Deserialize(new StringReader(xml));

    return Ok();
}

// EXAMPLE 8: Newtonsoft.Json (Json.NET) con TypeNameHandling
public class ApiController : Controller
{
    [HttpPost("/api/import")]
    public IActionResult Import([FromBody] string json)
    {
        var settings = new JsonSerializerSettings
        {
            TypeNameHandling = TypeNameHandling.All
        };

        // ❌ Insecure deserialization
        // ruleid: csharp-tainted-097-Insecure-Deserialization
        var obj = JsonConvert.DeserializeObject<object>(json, settings);

        return Ok();
    }
}
