// EXAMPLE 1
public List<Usuario> buscarUsuarios(String nombre) {
    List<Usuario> usuarios = new ArrayList<>();
    
    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
        // ruleid: java-tainted-146-SQL-Injection
        String consulta = "SELECT * FROM usuarios WHERE nombre = '" + nombre + "'";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(consulta);
        
        while (rs.next()) {
            Usuario usuario = new Usuario();
            usuario.setId(rs.getInt("id"));
            usuario.setNombre(rs.getString("nombre"));
            usuarios.add(usuario);
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    
    return usuarios;
}

// EXAMPLE 2
public void actualizarEmail(String nuevoEmail, int userId) {
    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
        // ruleid: java-tainted-146-SQL-Injection
        String consulta = "UPDATE usuarios SET email = '" + nuevoEmail + "' WHERE id = ?";
        PreparedStatement pstmt = conn.prepareStatement(consulta);
        pstmt.setInt(1, userId);
        pstmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
    }
}

// EXAMPLE 3
@GetMapping("/buscar")
public String buscarProductos(@RequestParam("termino") String termino, Model model) {
    // ruleid: java-tainted-146-SQL-Injection
    String consulta = "SELECT * FROM productos WHERE nombre LIKE '%" + termino + "%'";
    List<Producto> productos = jdbcTemplate.query(consulta, new ProductoMapper());
    model.addAttribute("productos", productos);
    return "resultados";
}

// EXAMPLE 4
public class MultiConcat {
    public void search(Connection conn, String name, String city) throws SQLException {
        // ruleid: java-tainted-146-SQL-Injection
        String sql = String.format("SELECT * FROM clients WHERE name='%s' AND city='%s'", name, city);
        Statement st = conn.createStatement();
        st.executeQuery(sql); // vulnerable
        String 
    }
}


// EXAMPLE 5
private void foo(RequestDTO params, List<QueryWhereParametro> parametros) {

    if (params.getFechaInicio() != null && params.getFechaFin() != null) {
        // ruleid: java-tainted-146-SQL-Injection
        String fechaQuery = String.format(" AND s.svlfe_fecha_creacion_solicitud BETWEEN %s " +
                " AND %s ", "'" + params.getFechaInicio() + "'::::TIMESTAMP WITHOUT TIME ZONE ", "'" + params.getFechaFin() + "'::::TIMESTAMP WITHOUT TIME ZONE ");
        parametros.add(new QueryWhereParametro(fechaQuery, null, null));
        
    }
}

// EXAMPLE 6
public class UpdateVuln {
    public void updateEmail(Connection conn, int userId, String newEmail) throws SQLException {
        Statement s = conn.createStatement();
        // ruleid: java-tainted-146-SQL-Injection
        String q = "UPDATE users SET email = '" + newEmail + "' WHERE id = " + userId;
        s.executeUpdate(q); // vulnerable
    }
}

// EXAMPLE 7
public int Ffoo(String param1, Object param2, long param3) {
    // ruleid: java-tainted-146-SQL-Injection
    NativeQuery<Formulario> query = this.currentSession().createNativeQuery("UPDATE FORMULARIOS SET param1 = :param2 WHERE FORMULARIOS.ID = :bar".replace("param1", param1), Object.class);
    query.setParameter("bar", param3);
    query.setParameter("param2", param2);
    int result = -1;
    currentSession().flush(); 
    result = query.executeUpdate();
    return result;
}

// FP EXAMPLE 1
public List<Prerequisito> foo(final String source) {
    // OK: java-tainted-146-SQL-Injection
    final String jpql = "SELECT p FROM table p WHERE p.source = :source AND p.estado.valor = :state " + "AND p.tipo = :type";
    final Query<Prerequisito> query = currentSession().createQuery(jpql, Prerequisito.class);
    query.setParameter("source", source);
    // ...
    return list(query);
}