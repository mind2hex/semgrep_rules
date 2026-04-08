function guard(req, res, next) {
    const apikey = req.headers['apikey'];
    const fuentes = foo();

    // ruleid: javascript-pattern-006-prototype-property-access
    if (!fuentes[apikey]) {
        return res.status(401).json({});
    }

    // ruleid: javascript-pattern-006-prototype-property-access
    if (fuentes[apikey] == undefined){
        console.warn('[ApiKeyGuard] API Key inválida -', req.ip);
        return res.status(401).json({
            status: 401,
            message: 'API Key inválida',
            reason: 'Error'
        });
    }

    // ruleid: javascript-pattern-006-prototype-property-access
    if (!!fuentes[apikey]) {
        next();
    } else {
        return res.sendStatus(401);
    }

    // ruleid: javascript-pattern-006-prototype-property-access
    if (fuentes[apikey]) {
        req.fuenteCaptura = fuentes[apikey];
        return next();
    }

    // ruleid: javascript-pattern-006-prototype-property-access
    if (fuentes[apikey] != null) {
        req.fuenteCaptura = fuentes[apikey];
        return next();
    }

    // ruleid: javascript-pattern-006-prototype-property-access
    if (fuentes[apikey] !== undefined) next();
    else res.sendStatus(401);

    // ruleid: javascript-pattern-006-prototype-property-access
    if (typeof fuentes[apikey] !== "undefined") next();
    else res.sendStatus(401);

    // ruleid: javascript-pattern-006-prototype-property-access
    if (!(apikey in fuentes)) return res.sendStatus(401);
    req.fuenteCaptura = fuentes[apikey];
    next();

    // ruleid: javascript-pattern-006-prototype-property-access
    return fuentes[apikey] ? next() : res.sendStatus(401);
}
