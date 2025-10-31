// EXAMPLE 1
public class VulnerableStmt {
    public void getUser(Connection conn, String username) throws SQLException {
        Statement stmt = conn.createStatement();
        String sql = "SELECT * FROM users WHERE username = '" + username + "'";
        ResultSet rs = stmt.executeQuery(sql);
        
        // FP
        String sql = "SELECT * FROM hola mundo";
    }
}

// EXAMPLE 2
public class MultiConcat {
    public void search(Connection conn, String name, String city) throws SQLException {
        String sql = String.format("SELECT * FROM clients WHERE name='%s' AND city='%s'", name, city);
        Statement st = conn.createStatement();
        st.executeQuery(sql); // vulnerable

        String 
    }
}

// EXAMPLE 3
private void foo(RequestDTO params, List<QueryWhereParametro> parametros) {

    if (params.getFechaInicio() != null && params.getFechaFin() != null) {
        
        String fechaQuery = String.format(" AND s.svlfe_fecha_creacion_solicitud BETWEEN %s " +
                " AND %s ", "'" + params.getFechaInicio() + "'::::TIMESTAMP WITHOUT TIME ZONE ", "'" + params.getFechaFin() + "'::::TIMESTAMP WITHOUT TIME ZONE ");
        parametros.add(new QueryWhereParametro(fechaQuery, null, null));

        // FP 1
        String lol = String.format(" asdasdasd" + "asdasd", asdasd);
        String adasdas = String.format(" AND SELECT",);
        
    }
}


// EXAMPLE 4
import java.sql.*;

public class UpdateVuln {
    public void updateEmail(Connection conn, int userId, String newEmail) throws SQLException {
        Statement s = conn.createStatement();
        String q = "UPDATE users SET email = '" + newEmail + "' WHERE id = " + userId;
        s.executeUpdate(q); // vulnerable
    }
}
