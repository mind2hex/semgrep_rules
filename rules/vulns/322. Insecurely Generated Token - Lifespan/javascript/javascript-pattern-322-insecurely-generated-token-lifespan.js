export const signToken = (secretKey: string): string => {
    const user = { username: 'asdasd', role: 'asdadsas' };
    // ruleid: javascript-pattern-322-insecurely-generated-token-lifespan
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    return token;
};