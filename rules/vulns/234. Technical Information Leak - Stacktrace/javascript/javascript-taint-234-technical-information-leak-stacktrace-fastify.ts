const ErrResp = (error: FastifyError) => {
    return {
        // ruleid: javascript-taint-234-technical-information-leak-stacktrace-fastify
        cause: cause ?? error.stack
    };
};

const ErrResp = (error: FastifyError) => {
    return {
        // ruleid: javascript-taint-234-technical-information-leak-stacktrace-fastify
        cause: error.stack
    };
};