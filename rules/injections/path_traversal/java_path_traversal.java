// EXAMPLE 1
public static String getNameFile(String filename) {
    String safe_filename = ROUTE.concat(filename);
    if(filename.contains("csv")) {
        return safe_filename;
    }
    return safe_filename.concat(".csv");
}

// EXAMPLE 2
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DownloadServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String filename = req.getParameter("file"); // controllable by user
        File file = new File("/var/app/data/" + filename); // vulnerable
        try (FileInputStream fis = new FileInputStream(file)) {
            byte[] buf = fis.readAllBytes();
            resp.getOutputStream().write(buf);
        }
    }
}


// EXAMPLE 3
import java.io.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;

@MultipartConfig
public class UploadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Part p = req.getPart("file");
        String name = p.getSubmittedFileName(); // attacker-controlled
        File out = new File("/var/www/uploads/" + name); // vulnerable: path traversal & overwrite
        try (InputStream in = p.getInputStream(); FileOutputStream fos = new FileOutputStream(out)) {
            in.transferTo(fos);
        }
    }
}
