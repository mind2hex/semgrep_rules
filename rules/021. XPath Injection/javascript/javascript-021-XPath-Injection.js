// EJEMPLO 1: Concatenación simple con +
app.post('/xpath1', (req, res) => {
    const employeeId = req.body.id;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // ruleid: javascript-021-XPath-Injection
    const query = '//employee[@id=' + employeeId + ']';
    const result = xpath.select(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 2: Template literal básico
app.post('/xpath2', (req, res) => {
    const name = req.body.name;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // ruleid: javascript-021-XPath-Injection
    const query = `//employee[name='${name}']`;
    const result = xpath.select(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 3: concat() method
app.post('/xpath3', (req, res) => {
    const role = req.body.role;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // ruleid: javascript-021-XPath-Injection
    const query = '//employee[role='.concat("'", role, "']");
    const result = xpath.select(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 4: Array.join para construcción
app.post('/xpath4', (req, res) => {
    const id = req.body.id;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // ruleid: javascript-021-XPath-Injection
    const parts = ['//employee[@id=', id, ']'];
    const query = parts.join('');
    const result = xpath.select(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 5: String.replace para placeholders
app.post('/xpath5', (req, res) => {
    const salary = req.body.minSalary;
    const xmlDoc = new dom().parseFromString(sampleXML);
    const template = '//employee[salary > {{SALARY}}]';
    // ruleid: javascript-021-XPath-Injection
    const query = template.replace('{{SALARY}}', salary);
    const result = xpath.select(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 6: Formato con util.format
app.post('/xpath6', (req, res) => {
    const name = req.body.name;
    const xmlDoc = new dom().parseFromString(sampleXML);
    const util = require('util');
    // ruleid: javascript-021-XPath-Injection
    const query = util.format("//employee[name='%s']", name);
    const result = xpath.select(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 7: Construcción condicional
app.post('/xpath7', (req, res) => {
    const { name, role, minSalary } = req.body;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // todoruleid: javascript-021-XPath-Injection
    let query = '//employee';
    let conditions = [];
    
    if (name) conditions.push(`name='${name}'`);
    if (role) conditions.push(`role='${role}'`);
    if (minSalary) conditions.push(`salary>${minSalary}`);
    
    if (conditions.length > 0) {
        query += '[' + conditions.join(' and ') + ']';
    }
    // ruleid: javascript-021-XPath-Injection
    const result = xpath.select(query, xmlDoc);
    res.json(result);
});

// EJEMPLO 8: Operador ternario
app.post('/xpath8', (req, res) => {
    const { searchTerm, exactMatch } = req.body;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    
    const query = exactMatch 
        ? `//employee[name='${searchTerm}']`
        : `//employee[contains(name, '${searchTerm}')]`;
    
    const result = xpath.select(query, xmlDoc);
    res.json(result);
});

// EJEMPLO 9: select1 con concatenación
app.post('/xpath-select1-1', (req, res) => {
    const id = req.body.employeeId;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // ruleid: javascript-021-XPath-Injection
    const query = '//employee[@id="' + id + '"]';
    const result = xpath.select1(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 10: select1 con template literal
app.post('/xpath-select1-2', (req, res) => {
    const name = req.body.employeeName;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // ruleid: javascript-021-XPath-Injection
    const query = `//employee[name="${name}"]`;
    const result = xpath.select1(query, xmlDoc);
    
    res.json(result);
});

// EJEMPLO 11: select1 con interpolación múltiple
app.post('/xpath-select1-3', (req, res) => {
    const { firstName, lastName } = req.body;
    const xmlDoc = new dom().parseFromString(sampleXML);
    
    // ruleid: javascript-021-XPath-Injection
    const query = `//employee[contains(name, '${firstName}') and contains(name, '${lastName}')]`;
    const result = select1(query, xmlDoc);
    
    res.json(result);
});

