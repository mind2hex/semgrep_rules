// EXAMPLE 0
private String toAuditCkSql(String groupId, String streamId, String auditId, String dt) {
	DateTimeFormatter formatter = DateTimeFormat.forPattern(DAY_FORMAT);
	DateTime date = formatter.parseDateTime(dt);
	String startDate = date.toString(SECOND_FORMAT);
	String endDate = date.plusDays(1).toString(SECOND_FORMAT);
	return new SQL()
			.SELECT("log_ts", "sum(count) as total")
			.FROM("audit_data")
			// ruleid: java-tainted-146-SQL-Injection
			.WHERE("inlong_group_id = '" + groupId + "'", "inlong_stream_id = '" + streamId + "'", "audit_id = '" + auditId + "'")
			// ruleid: java-tainted-146-SQL-Injection
			.WHERE("log_ts >= '" + startDate + "'", "log_ts < '" + endDate + "'")
			.GROUP_BY("log_ts")
			.ORDER_BY("log_ts")
			.toString();
}


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
public void buscar(UcmRequest req) {

    IdcBinder binder = cliente.createBinder();
    binder.putLocal("IdcService", "GET_SEARCH_RESULTS");

    String query;
    String userInput = req.getTexto();  // SOURCE

    if (req.getTipo() == null) {
        // ruleid: java-tainted-146-sql-injection
        query = "xCampo1 <matches> `" + userInput + "`"
              + " <OR> xCampo2 <matches> `" + userInput + "`"
              + " <OR> dDocName <matches> `" + userInput + "`";
    } else {
        StringBuilder sb = new StringBuilder();

        if (req.getCampoA().length() > 2) {
            sb.append("xCampoA <matches> `").append(req.getCampoA()).append("`");
        }

        if (req.getCampoB().length() > 2) {
            sb.append(" <AND> xCampoB <matches> `").append(req.getCampoB()).append("`");
        }

        query = sb.toString();
    }

    // SINK
    binder.putLocal("QueryText", query);
}

public String search(UcmRequest request, IdcClient client) {

    // SOURCE (input user)
    String userQuery = request.getQuery(); 

    IdcBinder binder = client.createBinder();
    binder.putLocal("IdcService", "GET_SEARCH_RESULTS");

    // ruleid: java-tainted-146-sql-injection
    String query = "xNumeroProceso <matches> `" + userQuery + "`";

    // SINK
    binder.putLocal("QueryText", query);

    return client.sendRequest(new IdcContext("weblogic"), binder)
                 .getResponseAsString();
}


public String buscarDocumentos(RequestDTO req, IdcClient client) {

    String proceso = req.getProceso();     // SOURCE
    String tipoDoc = req.getTipoDoc();     // SOURCE
    String cuenta  = req.getCuenta();      // SOURCE

    IdcBinder binder = client.createBinder();
    binder.putLocal("IdcService", "GET_SEARCH_RESULTS");

    StringBuilder q = new StringBuilder();

    if (proceso != null && proceso.length() > 2) {
        q.append("xNumeroProceso <matches> `").append(proceso).append("`");
    }

    if (tipoDoc != null && tipoDoc.length() > 2) {
        q.append(" <AND> xTipoDocumental <matches> `").append(tipoDoc).append("`");
    }

    if (cuenta != null && cuenta.length() > 2) {
        q.append(" <AND> dDocAccount <matches> `").append(cuenta).append("`");
    }

    // SINK (donde se coloca la query construida)
    binder.putLocal("QueryText", q.toString());

    return client.sendRequest(new IdcContext("admin"), binder)
                 .getResponseAsString();
}


public String foo(RequestDTO request){
  try { 
    IdcClient<?, ?, ?> cliente = connection._getUCMConnection_(); 
    DataBinder binder = cliente._createBinder_();

    IdcContext userContext = new _IdcContext_(properties._getUser_());

    binder._putLocal_(Constants.IDC_SERVICE, "GET_SEARCH_RESULTS");
    binder._putLocal_("SortField", "dInDate");
    binder._putLocal_("SortOrder", "Desc");
    binder._putLocal_("ResultCount", "100");

    if (
      request._getTipoBusqueda_() == null || 
      request._getTipoBusqueda_()._isEmpty_() || 
      !request._getTipoBusqueda_()._equalsIgnoreCase_(properties._getTipoBusqueda_())
    ) { 
      binder._putLocal_("QueryText", "xNumeroProceso <matches> " + request.getQueryText() + " <OR> xLLaveSAPCRM <matches> " + request._getQueryText_() + " <OR> dDocName <matches> " + request._getQueryText_() + "");
    } else { 
      StringBuilder query = new _StringBuilder_();
      if (request._getxNumeroProceso_()._length_() > 3){ 
        query._append_("xNumeroProceso <matches> ").append(request.getxNumeroProceso()).append("");
      }
      if (request._getxTipoDocumental_()._length_() > 3){
        query._append_(" <AND> xTipoDocumental <matches> ").append(request.getxTipoDocumental()).append("");
      }
      if (request._getdDocAccount_()._length_() > 3) {
        query._append_(" <AND> dDocAccount <matches> ").append(request.getdDocAccount()).append("");
      }
      binder._putLocal_("QueryText", query._toString_()); 
    }
  }catch(){}
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


