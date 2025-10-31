// EXAMPLE 1: direct prototype pollution
function vulnerableMerge(target, source) {
    for (let key in source) {
        // ruleid: javascript-tainted-prototype-pollution
        target[key] = source[key];
    }
    return target;
}

// EXAMPLE 2: Direct merge
function deepMerge(target, source) {
    for (let key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (!(key in target)) {
                target[key] = {};
            }
            deepMerge(target[key], source[key]);
        } else {
            // ruleid: javascript-tainted-prototype-pollution
            target[key] = source[key];
        }
    }
    return target;
}

// EXAMPLE 3: Path based 
// Vulnerable: Setting nested properties by path
function setByPath(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

// EXAMPLE 4:
function parseQuery(query) {
    const params = {};
    const pairs = query.split('&');
    
    for (let pair of pairs) {
        const [key, value] = pair.split('=');
        const keys = key.split('.');
        let current = params;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = decodeURIComponent(value);
    }
    
    return params;
}

// EXAMPLE 5: Object cloning
function clone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    
    const cloned = {};
    for (let key in obj) {
        // ruleid: javascript-tainted-prototype-pollution
        cloned[key] = clone(obj[key]);
    }
    
    return cloned;
}

// EXAMPLE 6: Lodash-like set implementation
function set(object, path, value) {
    const pathArray = Array.isArray(path) ? path : path.split('.');
    let index = 0;
    const length = pathArray.length;
    
    while (object != null && index < length - 1) {
        const key = pathArray[index++];
        if (!(key in object)) {
            object[key] = {};
        }
        object = object[key];
    }
    
    if (object != null) {
        // ruleid: javascript-tainted-prototype-pollution
        object[pathArray[index]] = value;
    }
    
    return object;
}

// EXAMPLE 7: 
app.post('/api/settings', (req, res) => {
    const userSettings = req.body; // Source: User controlled input
    const defaultSettings = {
        theme: 'light',
        notifications: true
    };
    
    // ruleid: javascript-tainted-prototype-pollution
    const finalSettings = _.merge(defaultSettings, userSettings);
    
    res.json({ success: true, settings: finalSettings });
});

// EXAMPLE 8:
// Another vulnerable endpoint
app.put('/api/user/:id', (req, res) => {
    const updates = req.body; // Taint source
    const user = getUser(req.params.id);
    
    // ruleid: javascript-tainted-prototype-pollution
    _.defaultsDeep(user, updates);
    
    saveUser(user);
    res.json(user);
});