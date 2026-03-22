export const middlewares = (application: FastifyInstance): void => {
    // ruleid: javascript-pattern-134-insecure-cors-config
    application.register(cors);
};