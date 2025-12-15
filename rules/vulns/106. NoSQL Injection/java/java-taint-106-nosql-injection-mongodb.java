// EXAMPLE 1
@Service
public class UserService {
    public boolean loginUser(String username, String password) throws MongoQueryException {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        BasicDBObject query = new BasicDBObject();
        // ruleid: java-taint-106-nosql-injection-mongodb
        query.put("$where", String.format("this.username == \"" + user.getUsername() + "\" && this.password == \"" + user.getPassword() + "\""));

        MongoCursor<Document> cursor = collection.find(query).iterator();

        return cursor.hasNext();
    }
}

// EXAMPLE 2 Operadores Mongo inyectables ($ne) vía parámetro
public Document findUser(HttpServletRequest req, MongoCollection<Document> col) {
    String user = req.getParameter("user");   // SOURCE
    String pass = req.getParameter("pass");   // SOURCE
    // ruleid: java-taint-106-nosql-injection-mongodb
    String json = "{ \"user\": \"" + user + "\", \"pass\": \"" + pass + "\" }";
    // ruleid: java-taint-106-nosql-injection-mongodb
    return col.find(Document.parse(json)).first(); // SINK
}

// EXAMPLE 3: Body JSON parseado sin validación
public List<Document> search(HttpServletRequest req, MongoCollection<Document> col)
        throws IOException {

    String body = req.getReader().lines().collect(Collectors.joining()); // SOURCE
    // ruleid: java-taint-106-nosql-injection-mongodb
    Document query = Document.parse(body);

    return col.find(query).into(new ArrayList<>()); // SINK
}

// EXAMPLE 4: 4️⃣ $where con concatenación (EJECUCIÓN JS)
public Document findWithWhere(HttpServletRequest req, MongoCollection<Document> col) {
    String user = req.getParameter("user"); // SOURCE

    // ruleid: java-taint-106-nosql-injection-mongodb
    Document query = new Document("$where",
        "this.user == '" + user + "'");

    return col.find(query).first(); // SINK
}

// EXAMPLE 5: MERGE INSEGURO
public List<Document> findActive(HttpServletRequest req, MongoCollection<Document> col) {
    String filter = req.getParameter("filter"); // SOURCE

    Document query = new Document("active", true);
    // ruleid: java-taint-106-nosql-injection-mongodb
    query.putAll(Document.parse(filter));

    return col.find(query).into(new ArrayList<>()); // SINK
}


public Document login(HttpServletRequest req, MongoCollection<Document> col) {
    String email = req.getParameter("email"); // SOURCE
    // ruleid: java-taint-106-nosql-injection-mongodb
    String json = "{ \"$or\": [ { \"email\": \"" + email + "\" } ] }";
    // ruleid: java-taint-106-nosql-injection-mongodb
    return col.find(Document.parse(json)).first(); // SINK
}


public Document findByEmail(HttpServletRequest req, MongoCollection<Document> col) {
    String email = req.getParameter("email"); // SOURCE

    String q = String.format("{ \"email\": \"%s\" }", email);
    // ruleid: java-taint-106-nosql-injection-mongodb
    return col.find(Document.parse(q)).first(); // SINK
}



public List<Document> list(HttpServletRequest req, MongoCollection<Document> col) {
    String q = req.getParameter("q"); // SOURCE

    Document base = new Document("deleted", false);
    // ruleid: java-taint-106-nosql-injection-mongodb
    base.putAll(Document.parse(q));

    return col.find(base).into(new ArrayList<>()); // SINK
}

