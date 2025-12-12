# EXAMPLE 1 FLASK CONTROLLER
@app.route('/buscar')
def buscar():
    termino = request.args.get('termino')
    # ruleid: python-tainted-146-SQL-Injection
    query = f"SELECT * FROM productos WHERE nombre LIKE '%{termino}%'"
    resultados = db.execute(query)
    return resultados

# EXAMPLE 2 DJANGO CONTROLLER
def buscar_usuarios(request):
    nombre = request.GET.get('nombre')
    
    with connection.cursor() as cursor:
        # ruleid: python-tainted-146-SQL-Injection
        cursor.execute(f"SELECT * FROM auth_user WHERE first_name = '{nombre}'")
        usuarios = cursor.fetchall()
    
    return usuarios

# EXAMPLE 3 PSYCOPG
def login(usuario, password):
    conn = psycopg2.connect(...)
    cur = conn.cursor()
    # ruleid: python-tainted-146-SQL-Injection
    query = "SELECT * FROM usuarios WHERE usuario = '" + usuario + "' AND password = '" + password + "'"
    cur.execute(query)
    
    return cur.fetchall()

# EXAMPLE 4 MULTI LINE query
def buscar_productos(categoria):
    query = "SELECT nombre, precio FROM productos "
    # ruleid: python-tainted-146-SQL-Injection
    query += "WHERE categoria = '" + categoria + "' "
    query += "ORDER BY precio DESC"
    
    cursor.execute(query)
    return cursor.fetchall()

# EXAMPLE 5
def buscar_usuario(session, username):
    # ruleid: python-tainted-146-SQL-Injection
    consulta = text("SELECT * FROM usuarios WHERE username = '" + username + "'")
    return session.execute(consulta).fetchall()

# EXAMPLE 6
def autenticar(usuario, contrasena):
    # ruleid: python-tainted-146-SQL-Injection
    consulta = "SELECT * FROM usuarios WHERE usuario = '%s' AND contrasena = '%s'" % (usuario, contrasena)
    cursor.execute(consulta)
    return cursor.fetchone() is not None

# FP EXAMPLE 1 PARAMETRIZED QUERY
def buscar_usuario(username):
    # ok: python-tainted-146-SQL-Injection
    consulta = "SELECT * FROM usuarios WHERE username = %s"
    cursor.execute(consulta, (username,))
    return cursor.fetchone()

# FP EXAMPLE 2 ORM USAGE
def obtener_producto(session, producto_id):
    # ok: python-tainted-146-SQL-Injection
    stmt = select(Producto).where(Producto.id == producto_id)
    return session.execute(stmt).scalars().one()

# FP EXAMPLE 3 HARDCODED QUERY
def obtener_total_ventas():
    # ok: python-tainted-146-SQL-Injection
    consulta = "SELECT SUM(total) FROM ventas WHERE estado = 'completado'"
    cursor.execute(consulta)
    return cursor.fetchone()[0]

# FP EXAMPLE 4 SQLALCHEMY SANITIZER
def buscar_usuario(session, username):
    # ok: python-tainted-146-SQL-Injection
    consulta = text("SELECT * FROM usuarios WHERE username = :username")
    consulta = consulta.bindparams(username=username)
    return session.execute(consulta).fetchall()

# FP EXAMPLE 5 DJANGO SANITIZER
def buscar_productos(categoria):
    with connection.cursor() as cursor:
        # ok: python-tainted-146-SQL-Injection
        consulta = "SELECT * FROM productos WHERE categoria = %s"
        cursor.execute(consulta, [categoria])
        return cursor.fetchall()

# FP EXAMPLE 6 
def buscar_ordenes(cliente):
    conn = pymysql.connect(...)
    cliente = pymysql.escape_string(cliente)
    # ok: python-tainted-146-SQL-Injection
    consulta = f"SELECT * FROM ordenes WHERE cliente = '{cliente}'"
    with conn.cursor() as cur:
        cur.execute(consulta)
        return cur.fetchall()

