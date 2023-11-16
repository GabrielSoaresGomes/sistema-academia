const responseStatusCode = Object.freeze({
    'OK': 200,
    'CREATED': 201,
    'ACCEPTED': 202,
    'NO_CONTENT': 204,
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,
    'FORBIDDEN': 403,
    'INTERNAL_SERVER_ERROR': 500,
});

module.exports = responseStatusCode;