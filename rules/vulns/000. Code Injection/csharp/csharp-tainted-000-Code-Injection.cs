// EXAMPLE 1
using Microsoft.CSharp;
using System.CodeDom.Compiler;

public class DynamicCompiler{
    public object CompileAndExecute(string userCode)
    {
        // Source: código C# del usuario
        string code = @"
            using System;
            public class DynamicClass
            {
                public static object Execute()
                {
                    " + userCode + @"
                }
            }";
        
        // Sink: Compilación y ejecución de código arbitrario
        CSharpCodeProvider provider = new CSharpCodeProvider();
        CompilerParameters parameters = new CompilerParameters();
        parameters.GenerateInMemory = true;
        parameters.GenerateExecutable = false;
        // ruleid: csharp-tainted-000-Code-Injection
        CompilerResults results = provider.CompileAssemblyFromSource(parameters, code);
        
        var assembly = results.CompiledAssembly;
        var type = assembly.GetType("DynamicClass");
        var method = type.GetMethod("Execute");
        
        return method.Invoke(null, null);
    }
}

// EXAMPLE 2
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;

public class ScriptEvaluator{
    public async Task<object> EvaluateScript(string userScript)
    {
        // Source: script C# del usuario
        string script = userScript;
        
        // Sink: Roslyn evalúa código C# arbitrario
        var options = ScriptOptions.Default
            .AddReferences(typeof(System.Linq.Enumerable).Assembly)
            .AddImports("System", "System.Linq", "System.IO");
        // ruleid: csharp-tainted-000-Code-Injection       
        var result = await CSharpScript.EvaluateAsync(script, options);
        return result;
    }
}

// EXAMPLE 3
using IronPython.Hosting;
using Microsoft.Scripting.Hosting;

public class PythonScriptEngine
{
    public object ExecutePython(string userScript)
    {
        // Source: script Python del usuario
        string pythonCode = userScript;
        
        // Sink: IronPython ejecuta código Python con acceso a .NET
        ScriptEngine engine = Python.CreateEngine();
        ScriptScope scope = engine.CreateScope();
        
        // Exponer tipos .NET al script
        scope.SetVariable("clr", engine.GetClrModule());
        // ruleid: csharp-tainted-000-Code-Injection      
        var result = engine.Execute(pythonCode, scope);
        return result;
    }
}


// EXAMPLE 5
public class ObjectFactory
{
    public object CreateObject(string typeName, object[] constructorArgs)
    {
        // Source: nombre del tipo y argumentos del usuario
        string userTypeName = typeName;
        
        // Sink: Crear instancia de cualquier tipo
        Type type = Type.GetType(userTypeName);
        
        if (type != null)
        {
            // Vulnerable: instancia cualquier tipo con cualquier constructor
            // ruleid: csharp-tainted-000-Code-Injection  
            return Activator.CreateInstance(type, constructorArgs);
        }
        
        return null;
    }
}