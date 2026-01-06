// EXAMPLE 1:
function handleRequest(req) {
  // SOURCE: input externo controlado
  const input = JSON.parse(req.body);

  // POLLUTION
  const user = {};
  Object.assign(user, input);
}