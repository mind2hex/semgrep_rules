// EXAMPLE 1: Concatenación directa
public User GetUser(string username, string password){
    // ruleid: csharp-taint-146-sql-injection
    string query = "SELECT * FROM Users WHERE Username = '" + username + 
                   "' AND Password = '" + password + "'";
    
    using (SqlCommand cmd = new SqlCommand(query, connection))
    {
        // Ejecuta la consulta vulnerable
        return ExecuteQuery(cmd);
    }
}


// VULNERABLE: Uso de String.Format
public List<Product> SearchProducts(string searchTerm){
    // ruleid: csharp-taint-146-sql-injection
    string query = String.Format(
        "SELECT * FROM Products WHERE Name LIKE '%{0}%' OR Description LIKE '%{0}%'", 
        searchTerm
    );
    
    using (SqlCommand cmd = new SqlCommand(query, connection))
    {
        return ExecuteQuery(cmd);
    }
}

// VULNERABLE: String interpolation
public Order GetOrderById(int orderId, string customerEmail){
    // ruleid: csharp-taint-146-sql-injection
    string query = $"SELECT * FROM Orders WHERE OrderId = {orderId} " + $"AND CustomerEmail = '{customerEmail}'";
    
    using (SqlCommand cmd = new SqlCommand(query, connection))
    {
        return ExecuteQuery(cmd);
    }
}

// VULNERABLE: StringBuilder
public DataTable GetFilteredData(string tableName, string whereClause){
    StringBuilder queryBuilder = new StringBuilder();
    // todoruleid: csharp-taint-146-sql-injection
    queryBuilder.Append("SELECT * FROM ");
    queryBuilder.Append(tableName);
    
    if (!string.IsNullOrEmpty(whereClause))
    {
        queryBuilder.Append(" WHERE ");
        // todoruleid: csharp-taint-146-sql-injection
        queryBuilder.Append(whereClause);
    }
    
    using (SqlCommand cmd = new SqlCommand(queryBuilder.ToString(), connection))
    {
        return ExecuteQuery(cmd);
    }
}

// VULNERABLE: Stored procedure con EXEC dinámico
public void UpdateUserRole(string username, string newRole){
    // ruleid: csharp-taint-146-sql-injection
    string query = "EXEC sp_UpdateRole @sql = 'UPDATE Users SET Role = ''" + 
                   newRole + "'' WHERE Username = ''" + username + "'''";
    
    using (SqlCommand cmd = new SqlCommand(query, connection))
    {
        cmd.ExecuteNonQuery();
    }
}

// VULNERABLE: LINQ con ExecuteQuery
public IEnumerable<Customer> SearchCustomers(string city)
{
    using (var context = new DataContext(connectionString))
    {   // ruleid: csharp-taint-146-sql-injection
        string query = "SELECT * FROM Customers WHERE City = '" + city + "'";
        return context.ExecuteQuery<Customer>(query);
    }
}

public void DisplayGreeting(userInput)
{
    try {
        SqlConnection sql= new SqlConnection(
            @"data source=localhost;" +
            "user id=sa;password=pAs$w0rd;"
        );
        sql.Open();
        // ruleid: csharp-taint-146-sql-injection
        string sqlstring="SELECT ccnum" +
        " FROM cust WHERE id=" + userInput;
        SqlCommand cmd = new SqlCommand(sqlstring,sql);
        ccnum = (string)cmd.ExecuteScalar();
    } catch (SqlException se) {
        status = sqlstring + " failed\n\r";
        foreach (SqlError e in se.Errors) {
            status += e.Message + "\n\r";
        }
    }

    string sqlstring="SELECT ccnum" + " FROM cust WHERE id=REPL";
    // ruleid: csharp-taint-146-sql-injection
    string sqlstring2 = sqlstring.Replace("REPL",userInput);
}