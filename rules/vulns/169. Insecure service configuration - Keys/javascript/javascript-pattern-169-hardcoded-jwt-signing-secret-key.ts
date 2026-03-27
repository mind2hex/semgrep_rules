export const signToken = (secretKey: string): string => {
    const payload = {};
    // ruleid: javascript-pattern-169-hardcoded-jwt-signing-secret-key
    const token = jwt.sign(payload, "secret_string", { algorithm: 'HS256' });
    return token;
};