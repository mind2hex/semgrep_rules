// EJEMPLO 1: Concatenación simple con +
app.post('/login1', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = '(&(objectClass=user)(uid=' + username + '))';
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 2: Template literal (backticks)
app.post('/login2', (req, res) => {
    const username = req.body.username;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(&(objectClass=person)(cn=${username}))`;
    client.search('ou=users,dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 3: String.format o similar
app.post('/login3', (req, res) => {
    const email = req.body.email;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    const util = require('util');
    // ruleid: javascript-107-LDAP-Injection
    const filter = util.format('(mail=%s)', email);
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 4: String.replace para "templates"
app.post('/search1', (req, res) => {
    const searchTerm = req.body.term;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    const filterTemplate = '(cn={{SEARCH}})';
    // ruleid: javascript-107-LDAP-Injection
    const filter = filterTemplate.replace('{{SEARCH}}', searchTerm);
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 5: Array.join para construir filtro complejo
app.post('/search2', (req, res) => {
    const { name, dept, location } = req.body;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const conditions = [
        `(cn=${name})`,
        `(ou=${dept})`,
        `(l=${location})`
    ];
    const filter = '(&' + conditions.join('') + ')';
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 6: Interpolación con concat()
app.post('/search3', (req, res) => {
    const uid = req.body.uid;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = '(uid='.concat(uid).concat(')');
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 7: Construcción condicional de filtro
app.post('/search4', (req, res) => {
    const { username, role } = req.body;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    let filter = '(&(objectClass=person)';
    if (username) {
        // ruleid: javascript-107-LDAP-Injection
        filter += `(uid=${username})`;
    }
    if (role) {
        // ruleid: javascript-107-LDAP-Injection
        filter += `(role=${role})`;
    }
    filter += ')';
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 8: Construcción con ternario
app.post('/search5', (req, res) => {
    const { name, wildcard } = req.body;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = wildcard 
        ? `(cn=${name}*)` 
        : `(cn=${name})`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 9: Filtros con operadores lógicos AND
app.post('/complex1', (req, res) => {
    const { firstName, lastName, department } = req.body;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(&(givenName=${firstName})(sn=${lastName})(ou=${department}))`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 10: Filtros con operadores lógicos OR
app.post('/complex2', (req, res) => {
    const { email, phone } = req.body;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(|(mail=${email})(telephoneNumber=${phone}))`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 11: Filtros con NOT
app.post('/complex3', (req, res) => {
    const department = req.body.dept;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(&(objectClass=person)(!(ou=${department})))`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 12: Filtros con wildcards
app.post('/complex4', (req, res) => {
    const searchTerm = req.body.search;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(cn=*${searchTerm}*)`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 13: Filtros anidados complejos
app.post('/complex5', (req, res) => {
    const { name, minAge, dept } = req.body;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(&(|(cn=${name})(displayName=${name}))(age>=${minAge})(ou=${dept}))`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 14: Filtros con comparadores
app.post('/complex6', (req, res) => {
    const maxSalary = req.body.maxSalary;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(salary<=${maxSalary})`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 15: Filtros con aproximación
app.post('/complex7', (req, res) => {
    const name = req.body.name;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const filter = `(cn~=${name})`;
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});


// EJEMPLO 16: DN con concatenación simple
app.post('/bind1', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const dn = 'cn=' + username + ',ou=users,dc=example,dc=com';
    client.bind(dn, password, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 17: DN con template literal
app.post('/bind2', (req, res) => {
    const uid = req.body.uid;
    const password = req.body.password;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // ruleid: javascript-107-LDAP-Injection
    const dn = `uid=${uid},ou=people,dc=example,dc=com`;
    
    client.bind(dn, password, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 18: DN construido por partes
app.post('/bind3', (req, res) => {
    const { cn, ou, dc1, dc2 } = req.body;
    const password = req.body.password;
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    // ruleid: javascript-107-LDAP-Injection
    const dnParts = [`cn=${cn}`, `ou=${ou}`, `dc=${dc1}`, `dc=${dc2}`];
    const dn = dnParts.join(',');
    client.bind(dn, password, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 19: DN con array destructuring
app.post('/bind4', (req, res) => {
    const [username, orgUnit] = [req.body.user, req.body.ou];
    const password = req.body.password;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // ruleid: javascript-107-LDAP-Injection
    const dn = `cn=${username},ou=${orgUnit},dc=example,dc=com`;
    
    client.bind(dn, password, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 20: ADD con DN vulnerable
app.post('/add-user', (req, res) => {
    const username = req.body.username;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // ruleid: javascript-107-LDAP-Injection
    const dn = `cn=${username},ou=users,dc=example,dc=com`;
    
    const entry = {
        objectClass: ['person', 'top'],
        cn: username,
        sn: req.body.surname
    };
    
    client.add(dn, entry, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 21: MODIFY con DN vulnerable
app.post('/modify-user', (req, res) => {
    const uid = req.body.uid;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // ruleid: javascript-107-LDAP-Injection
    const dn = `uid=${uid},ou=people,dc=example,dc=com`;
    
    const change = new ldap.Change({
        operation: 'replace',
        modification: {
            mail: req.body.newEmail
        }
    });
    
    client.modify(dn, change, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 22: DELETE con DN vulnerable
app.delete('/delete-user', (req, res) => {
    const username = req.body.username;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // ruleid: javascript-107-LDAP-Injection
    const dn = `cn=${username},ou=users,dc=example,dc=com`;
    
    client.del(dn, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 23: MODIFY DN (rename)
app.post('/rename-user', (req, res) => {
    const oldName = req.body.oldName;
    const newName = req.body.newName;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // ruleid: javascript-107-LDAP-Injection
    const dn = `cn=${oldName},ou=users,dc=example,dc=com`;
    const newDN = `cn=${newName}`;
    
    client.modifyDN(dn, newDN, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 24: COMPARE con DN vulnerable
app.post('/compare', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: DN en operación compare
    const dn = `cn=${username},ou=users,dc=example,dc=com`;
    
    client.compare(dn, 'userPassword', password, (err, matched) => {
        res.json({ matched: matched });
    });
});

// ============================================
// CATEGORÍA 5: ACTIVEDIRECTORY SINKS
// ============================================

// EJEMPLO 5.1: findUser con concatenación
app.get('/ad-user1', (req, res) => {
    const username = req.query.user;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: findUser con input directo
    ad.findUser(username, (err, user) => {
        res.json(user);
    });
});

// EJEMPLO 5.2: findUsers con query object
app.post('/ad-users', (req, res) => {
    const dept = req.body.department;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: findUsers con filtro construido
    const query = `department=${dept}`;
    
    ad.findUsers(query, (err, users) => {
        res.json(users);
    });
});

// EJEMPLO 5.3: findGroup vulnerable
app.get('/ad-group', (req, res) => {
    const groupName = req.query.group;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: findGroup con input directo
    ad.findGroup(groupName, (err, group) => {
        res.json(group);
    });
});

// EJEMPLO 5.4: authenticate vulnerable
app.post('/ad-auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: authenticate con username vulnerable
    ad.authenticate(username, password, (err, auth) => {
        res.json({ authenticated: auth });
    });
});

// EJEMPLO 5.5: isUserMemberOf vulnerable
app.post('/ad-membership', (req, res) => {
    const username = req.body.username;
    const groupName = req.body.group;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: isUserMemberOf con DOBLE INYECCIÓN
    ad.isUserMemberOf(username, groupName, (err, isMember) => {
        res.json({ isMember: isMember });
    });
});

// EJEMPLO 5.6: getUsersForGroup vulnerable
app.get('/ad-group-members', (req, res) => {
    const group = req.query.groupName;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: getUsersForGroup con input directo
    ad.getUsersForGroup(group, (err, users) => {
        res.json(users);
    });
});

// EJEMPLO 5.7: getGroupMembershipForUser vulnerable
app.get('/ad-user-groups', (req, res) => {
    const username = req.query.user;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: getGroupMembershipForUser con input directo
    ad.getGroupMembershipForUser(username, (err, groups) => {
        res.json(groups);
    });
});

// EJEMPLO 5.8: find con query personalizado
app.post('/ad-find', (req, res) => {
    const { attribute, value } = req.body;
    
    const ad = new ActiveDirectory({
        url: 'ldap://dc.example.com',
        baseDN: 'dc=example,dc=com'
    });
    
    // SINK: find con query construido
    const query = `(${attribute}=${value})`;
    
    ad.find(query, (err, results) => {
        res.json(results);
    });
});

// ============================================
// CATEGORÍA 6: OPCIONES DE BÚSQUEDA VULNERABLES
// ============================================

// EJEMPLO 6.1: Opción filter en objeto
app.post('/opts1', (req, res) => {
    const name = req.body.name;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: filter en objeto options
    const opts = {
        filter: `(cn=${name})`,
        scope: 'sub',
        attributes: ['dn', 'cn', 'mail']
    };
    
    client.search('dc=example,dc=com', opts, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 6.2: Scope dinámico (menos común pero posible)
app.post('/opts2', (req, res) => {
    const searchBase = req.body.base;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    const opts = {
        filter: '(objectClass=person)',
        scope: 'sub'
    };
    
    // SINK: baseDN vulnerable
    client.search(searchBase, opts, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 6.3: Attributes array con input
app.post('/opts3', (req, res) => {
    const attrs = req.body.attributes; // ['cn', 'mail', ...]
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: attributes puede ser manipulado
    const opts = {
        filter: '(objectClass=person)',
        scope: 'sub',
        attributes: attrs  // Potencialmente peligroso
    };
    
    client.search('dc=example,dc=com', opts, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 6.4: SizeLimit y TimeLimit controlados
app.post('/opts4', (req, res) => {
    const limit = req.body.limit;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: sizeLimit controlado por usuario (DoS potencial)
    const opts = {
        filter: '(objectClass=person)',
        scope: 'sub',
        sizeLimit: parseInt(limit)  // Potencial DoS
    };
    
    client.search('dc=example,dc=com', opts, (err, result) => {
        res.json(result);
    });
});

// ============================================
// CATEGORÍA 7: CONSTRUCCIÓN CON FUNCIONES HELPER
// ============================================

// EJEMPLO 7.1: Función helper vulnerable
function buildUserFilter(username, department) {
    // SINK: Función helper que construye filtro vulnerable
    return `(&(uid=${username})(ou=${department}))`;
}

app.post('/helper1', (req, res) => {
    const { user, dept } = req.body;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    const filter = buildUserFilter(user, dept);
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 7.2: Función que retorna DN
function getUserDN(username, organizationalUnit) {
    // SINK: Función que retorna DN vulnerable
    return `cn=${username},ou=${organizationalUnit},dc=example,dc=com`;
}

app.post('/helper2', (req, res) => {
    const { username, password, ou } = req.body;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    const dn = getUserDN(username, ou);
    
    client.bind(dn, password, (err) => {
        res.json({ success: !err });
    });
});

// EJEMPLO 7.3: Clase con método vulnerable
class LDAPQueryBuilder {
    constructor(baseDN) {
        this.baseDN = baseDN;
    }
    
    // SINK: Método que construye filtro vulnerable
    buildEqualityFilter(attribute, value) {
        return `(${attribute}=${value})`;
    }
    
    // SINK: Método que construye DN vulnerable
    buildUserDN(username) {
        return `cn=${username},${this.baseDN}`;
    }
}

app.post('/class1', (req, res) => {
    const username = req.body.username;
    
    const builder = new LDAPQueryBuilder('ou=users,dc=example,dc=com');
    const filter = builder.buildEqualityFilter('uid', username);
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    client.search(builder.baseDN, { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// ============================================
// CATEGORÍA 8: CONSTRUCCIÓN CON MAP/REDUCE
// ============================================

// EJEMPLO 8.1: Array.map para múltiples condiciones
app.post('/map1', (req, res) => {
    const filters = req.body.filters; // [{ attr: 'cn', value: 'john' }, ...]
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: map que construye condiciones vulnerables
    const conditions = filters.map(f => `(${f.attr}=${f.value})`).join('');
    const filter = `(&${conditions})`;
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 8.2: Array.reduce para filtro complejo
app.post('/reduce1', (req, res) => {
    const criteria = req.body.criteria; // { cn: 'john', ou: 'IT', ... }
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: reduce que construye filtro vulnerable
    const filter = Object.entries(criteria).reduce((acc, [key, value]) => {
        return acc + `(${key}=${value})`;
    }, '(&') + ')';
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 8.3: Filter + map para construcción condicional
app.post('/filter-map', (req, res) => {
    const searchCriteria = req.body.criteria;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: filter + map para construir query
    const conditions = Object.entries(searchCriteria)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => `(${key}=${value})`);
    
    const filter = conditions.length > 1 
        ? `(&${conditions.join('')})` 
        : conditions[0];
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// ============================================
// CATEGORÍA 9: ASYNC/AWAIT Y PROMESAS
// ============================================

// EJEMPLO 9.1: Async/await con ldapjs
app.post('/async1', async (req, res) => {
    const username = req.body.username;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: Filtro vulnerable en contexto async
    const filter = `(uid=${username})`;
    
    const results = await new Promise((resolve, reject) => {
        client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
            if (err) reject(err);
            
            const entries = [];
            result.on('searchEntry', entry => entries.push(entry));
            result.on('end', () => resolve(entries));
        });
    });
    
    res.json(results);
});

// EJEMPLO 9.2: Promise.all con múltiples búsquedas
app.post('/async2', async (req, res) => {
    const usernames = req.body.usernames; // ['user1', 'user2', ...]
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: Múltiples filtros vulnerables
    const searches = usernames.map(username => {
        const filter = `(cn=${username})`;
        return new Promise((resolve, reject) => {
            client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
                if (err) reject(err);
                const entries = [];
                result.on('searchEntry', entry => entries.push(entry));
                result.on('end', () => resolve(entries));
            });
        });
    });
    
    const results = await Promise.all(searches);
    res.json(results);
});

// ============================================
// CATEGORÍA 10: EDGE CASES Y CASOS ESPECIALES
// ============================================

// EJEMPLO 10.1: Encoded input (pero sin sanitizar)
app.post('/encoded', (req, res) => {
    const encoded = req.body.encodedUsername;
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: Input decodificado pero no sanitizado
    const filter = `(uid=${decoded})`;
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 10.2: JSON.parse de input
app.post('/json-parse', (req, res) => {
    const jsonString = req.body.filterConfig;
    const config = JSON.parse(jsonString);
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: Valores del JSON sin sanitizar
    const filter = `(&(cn=${config.name})(ou=${config.department}))`;
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 10.3: Eval-like construction (muy peligroso)
app.post('/dynamic-filter', (req, res) => {
    const operator = req.body.operator; // '&' o '|'
    const { attr1, val1, attr2, val2 } = req.body;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: Operador dinámico - extremadamente vulnerable
    const filter = `(${operator}(${attr1}=${val1})(${attr2}=${val2}))`;
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 10.4: Spread operator con object merge
app.post('/spread', (req, res) => {
    const baseFilter = { attribute: 'objectClass', value: 'person' };
    const userFilter = { attribute: req.body.attr, value: req.body.value };
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // SINK: Merge de filtros con spread
    const merged = { ...baseFilter, ...userFilter };
    const filter = `(&(${baseFilter.attribute}=${baseFilter.value})(${merged.attribute}=${merged.value}))`;
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

// EJEMPLO 10.5: Tagged template literal (ES6)
function ldapFilter(strings, ...values) {
    // SINK: Tagged template que NO escapa valores
    return strings.reduce((acc, str, i) => {
        return acc + str + (values[i] || '');
    }, '');
}

app.post('/tagged-template', (req, res) => {
    const username = req.body.username;
    
    const client = ldap.createClient({ url: 'ldap://localhost:389' });
    
    // Uso de tagged template vulnerable
    const filter = ldapFilter`(uid=${username})`;
    
    client.search('dc=example,dc=com', { filter: filter }, (err, result) => {
        res.json(result);
    });
});

module.exports = app;