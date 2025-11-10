// Example 1
import java.io.IOException;

public class RuntimeExecVuln {
    public static void runUserCommand(String userInput) throws IOException {
        // VULNERABLE: ejecuta exactamente la cadena en un shell/subprocess
        // Si userInput proviene del usuario, puede inyectarse.
        Runtime.getRuntime().exec(userInput);
    }

    public static void main(String[] args) throws Exception {
        // prueba benign: imprime "INJECTED" (en UNIX sería: echo INJECTED)
        // ruleid: java-os-command-injection
        runUserCommand("echo INJECTED");
    }
}

// Example 2
import java.io.IOException;

public class RuntimeExecArray {
    public static void safeish(String arg) throws IOException {
        // Mejor: pasar el comando y args como array evita que la shell interprete metacaracteres.
        // Aún así, el contenido de 'arg' puede ser peligroso si el programa invocado interpreta argumentos.
        String[] cmd = { "ping", "-c", "1", arg };
        Runtime.getRuntime().exec(cmd);
    }
}

// Example 3
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

public class ProcessBuilderSafe {
    public static String runPing(String host) throws Exception {
        // Recomendado: pasar args en lista, sin shell.
        ProcessBuilder pb = new ProcessBuilder(List.of("ping","-c","1", host));
        Process p = pb.start();
        try (BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()))) {
            StringBuilder out = new StringBuilder();
            String line;
            while ((line = r.readLine()) != null) out.append(line).append("\n");
            p.waitFor();
            return out.toString();
        }
    }
}


// Example 4
// File: ApacheCommonsExecVuln.java
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;

public class ApacheCommonsExecVuln {
    public static void run(String userInput) throws Exception {
        // Si construyes CommandLine desde un string que contiene input del usuario, hay riesgo.
        CommandLine cmdLine = CommandLine.parse("sh -c " + userInput);
        new DefaultExecutor().execute(cmdLine);
    }
}
