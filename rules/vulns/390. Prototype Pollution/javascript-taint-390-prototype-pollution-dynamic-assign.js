// EXAMPLE 4:
function normalizeUser(req) {
  // SOURCE
  const input = req.body;

  // POLLUTION
  const user = {};
  for (const key in input) {
    user[key] = input[key];
  }
  
  // SINK
  if (user.role === 'admin') {
    promoteUser();
  }
}