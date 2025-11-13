// Example 1
// ruleid: javascript-tainted-sql-injection
const sql = "SELECT * FROM users WHERE username = '" + req.query.user + "'";
db.query(sql, (err, rows) => { 
  //
});

// EXAMPLE 2
app.get("/user", (req, res) => {
  // ruleid: javascript-tainted-sql-injection
  const sql = `SELECT * FROM users WHERE id = ${req.query.id}`; // ⚠️ detecta flujo req.query → sql → query()
  db.query(sql);
});

// EXAMPLE 3
function findUser(userInput) {
  // ruleid: javascript-tainted-sql-injection
  const q = `SELECT * FROM users WHERE name = '${userInput}'`; // ⚠️ param directo
  connection.query(q);
}

// EXAMPLE 4
function runQuery(data) {
  const cond = data.condition;
  // ruleid: javascript-tainted-sql-injection
  const sql = `SELECT * FROM table WHERE ${cond}`; // ⚠️ detecta data → sql → query
  db.execute(sql);
}

// EXAMPLE 5
function foo(){
    const where = "id=" + req.query.id;
    // ruleid: javascript-tainted-sql-injection
    const sql = "SELECT * FROM users WHERE " + where; // ⚠️ concatenación → query
    sequelize.query(sql);
}

// EXAMPLE 6
function foo(){
    // ruleid: javascript-tainted-sql-injection
    await sequelize.query(`SELECT * FROM orders WHERE status = '${req.query.status}'`); // ⚠️ interpolación
}

// EXAMPLE 7
function buildQuery(filter) {
  // ruleid: javascript-tainted-sql-injection
  return `SELECT * FROM t WHERE x = '${filter}'`; // ⚠️ source indirecto
}

// EXAMPLE 8
export class SqlBuilder{
  withPagination(paginaBusqueda: number, registrosPorPagina: number): SqlBuilder {
      // ruleid: javascript-tainted-sql-injection
      this.pagination = ` LIMIT ${registrosPorPagina} OFFSET ${paginaBusqueda}`;
      return this;
  }
}

// FP EXAMPLE 1
// ok: javascript-tainted-sql-injection
const sql = 'SELECT * FROM users WHERE username = ? AND status = ?';
const [rows] = await connection.execute(sql, [req.body.user, req.body.status]);

// FP EXAMPLE 2
// ok: javascript-tainted-sql-injection
await sequelize.query(
  'SELECT * FROM users WHERE id = :id',
  { replacements: { id: req.params.id }, type: QueryTypes.SELECT }
);

// FP EXAMPLE 3
// ok: javascript-tainted-sql-injection
await knex('users').where('id', req.query.id).select();

// FP EXAMPLE 4
// ok: javascript-tainted-sql-injection
const q = `WHERE fecha = ${SqlString.escape(userInput)}`; // escape used, no surrounding quotes

// FP EXAMPLE 5
// ok: javascript-tainted-sql-injection
if (!/^\d{4}-\d{2}-\d{2}$/.test(req.body.date)) throw Error('bad');
const q = `SELECT * FROM t WHERE date = ${SqlString.escape(req.body.date)}`;

// FP EXAMPLE 6
// ok: javascript-tainted-sql-injection
const html = `<div>${req.user.name}</div>`; // not SQL

// FP EXAMPLE 7
const ORDER_BY = 'name';
// ok: javascript-tainted-sql-injection
const q = `SELECT * FROM users ORDER BY ${ORDER_BY}` // constant

// FP EXAMPLE 8
function safeFormat(x) { return SqlString.escape(x); }
// ok: javascript-tainted-sql-injection
const q = `WHERE name = ${safeFormat(req.query)}`;

// FP EXAMPLE 9
export const functionfpexample9 = (datos: IRespuestaDatosCruce) => {

    const {
        valorTotalRecaudoConComision
    } = datos;

    if (condition) {
        // ok: javascript-tainted-sql-injection
        MENSAJE_DESCUENTO_COMISION_MANUAL_VALOR_TOTAL =
            'Los cortes identificados con un asterisco (*) corresponden a aquellos que su comisión ha sido descontada previamente, valor total recaudado: $' +
            valorTotalRecaudoConComision?.toLocaleString();
    }
};

// FP EXAMPLE 10
const queryInterlocutor = function () {
  const fechaFormateada = `${year}-${month}-${day}`;
  // ok: javascript-tainted-sql-injection
  return `SELECT Id FROM ${asdasd} asdasd Where asdasd = 'asdas' and LastModifiedDate < ${fechaFormateada}T00:00:00.000Z`
}

// FP EXAMPLE 11
const function_name = async (parameter) =>{
  const query = 
    `SELECT * `+
    // ok: javascript-tainted-sql-injection
    `FROM "${db}"."${table}" `+
    // ok: javascript-tainted-sql-injection
    `WHERE ${column}.material = ${SqlString.escape(parameter)}`
    return query
}

// FP EXAMPLE 12
function foo(data){
    // ok: javascript-tainted-sql-injection
    const encabezado = await t.one(
        `INSERT INTO table (...)
                VALUES ($<val1>, $<val2>, ${GLOBAL.FOO})
                RETURNING asd`,
        {
            data
        },
    );

    // ok: javascript-tainted-sql-injection
    await t.none(
        `UPDATE foo SET asd = $1, estado = ${asd.FOO}
            WHERE asd = $2`,
        [data],
    );
}

