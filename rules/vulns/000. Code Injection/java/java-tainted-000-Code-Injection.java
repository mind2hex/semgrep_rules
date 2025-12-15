// EXAMPLE 1: ScriptEngine permite ejecutar código JavaScript (Nashorn/GraalVM) o Groovy dentro de la JVM.
import javax.script.*;

public class ScriptEvaluator {
    public String evaluateExpression(String userExpression) throws ScriptException {
        // Source: expresión del usuario
        String expression = userExpression;
        
        // Sink: ScriptEngine evalúa código arbitrario
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");
        // ruleid: java-tainted-000-Code-Injection
        Object result = engine.eval(expression);
        return result.toString();
    }
}

// EXAMPLE 2: 
import groovy.lang.GroovyShell;
import groovy.lang.Binding;

public class GroovyExecutor {
    public Object executeGroovyCode(String userCode) {
        // Source: código Groovy del usuario
        String groovyCode = userCode;
        
        // Sink: GroovyShell evalúa código Groovy arbitrario
        Binding binding = new Binding();
        binding.setVariable("data", sensitiveData);
        
        GroovyShell shell = new GroovyShell(binding);
        // ruleid: java-tainted-000-Code-Injection
        return shell.evaluate(groovyCode);
    }
}

// EXAMPLE 3:
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;

@RestController
public class PaymentController {
    @PostMapping("/calculate")
    public double calculatePrice(@RequestParam String formula) {
        // Source: fórmula del usuario
        String priceFormula = formula;
        
        // Sink: SpEL parser evalúa expresiones arbitrarias
        ExpressionParser parser = new SpelExpressionParser();
        // ruleid: java-tainted-000-Code-Injection
        Expression exp = parser.parseExpression(priceFormula);
        
        StandardEvaluationContext context = new StandardEvaluationContext();
        return exp.getValue(context, Double.class);
    }
}

// EXAMPLE 5:
import ognl.Ognl;
import ognl.OgnlContext;

public class OgnlEvaluator {
    public Object evaluateOgnl(String userExpression, Map<String, Object> data) 
            throws OgnlException {
        // Source: expresión OGNL del usuario
        String ognlExpression = userExpression;
        
        // Sink: OGNL evalúa expresiones con acceso a objetos Java
        OgnlContext context = new OgnlContext();
        // ruleid: java-tainted-000-Code-Injection
        context.putAll(data);
        
        return Ognl.getValue(ognlExpression, context);
    }
}

// EXAMPLE 6:
import org.apache.commons.jexl3.*;

public class JexlCalculator {
    public Object calculate(String userExpression) {
        // Source: expresión matemática del usuario
        String expression = userExpression;
        
        // Sink: JEXL engine evalúa expresiones
        JexlEngine jexl = new JexlBuilder().create();
        // ruleid: java-tainted-000-Code-Injection
        JexlExpression e = jexl.createExpression(expression);
        
        JexlContext context = new MapContext();
        return e.evaluate(context);
    }
}

// EXAMPLE 7
import bsh.Interpreter;
import bsh.EvalError;

public class BeanShellExecutor {
    public Object executeBeanShell(String userScript) throws EvalError {
        // Source: script del usuario
        String script = userScript;
        
        // Sink: BeanShell interpreta código Java-like
        Interpreter interpreter = new Interpreter();
        interpreter.set("application", this);
        // ruleid: java-tainted-000-Code-Injection
        return interpreter.eval(script);
    }
}

// EXAMPLE 8
public class DynamicClassLoader {
    public Object createInstance(String className, String methodName, 
                               String[] paramTypes, Object[] args) 
            throws Exception {
        // Source: nombre de clase y método del usuario
        String userClassName = className;
        String userMethodName = methodName;
        
        // Sink: Reflection permite instanciar cualquier clase
        // ruleid: java-tainted-000-Code-Injection
        Class<?> clazz = Class.forName(userClassName);
        Object instance = clazz.newInstance();
        
        // Buscar y ejecutar método
        Class<?>[] paramClasses = new Class[paramTypes.length];
        for (int i = 0; i < paramTypes.length; i++) {
            // ruleid: java-tainted-000-Code-Injection
            paramClasses[i] = Class.forName(paramTypes[i]);
        }
        
        Method method = clazz.getMethod(userMethodName, paramClasses);
        return method.invoke(instance, args);
    }
}


// EXAMPLE 9
import javax.el.*;

public class ELEvaluator {
    public Object evaluateEL(String userExpression) {
        // Source: expresión EL del usuario
        String expression = userExpression;
        
        // Sink: EL processor evalúa expresiones
        ExpressionFactory factory = ExpressionFactory.newInstance();
        ELContext context = new StandardELContext(factory);
        // ruleid: java-tainted-000-Code-Injection
        ValueExpression ve = factory.createValueExpression(
            context, "${" + expression + "}", Object.class);
        
        return ve.getValue(context);
    }
}

// EXAMPLE 10
import ognl.Ognl;
import ognl.OgnlContext;
import ognl.OgnlException;

public class foo {
  public String runOgnl(String expression) throws OgnlException {
      String newStr = '"' + expression + '"';
      OgnlContext ctx = new OgnlContext();
      // ruleid: java-tainted-000-Code-Injection
      Object expr = Ognl.parseExpression(newStr);
      Object root = new Object();
      Object res = Ognl.getValue(expr, ctx, root);

      return res.toString();
  }
}