// Example 1 simple concatenation with the use of +
// ruleid: javascript-tainted-146-sql-injection
const sql = "SELECT * FROM users WHERE username = '" + req.query.user + "'";

// EXAMPLE 2 Template Literals
// ruleid: javascript-tainted-146-sql-injection
const sql = `SELECT * FROM users WHERE id = ${req.query.id}`; 
// ruleid: javascript-tainted-146-sql-injection
const q = `SELECT * FROM users WHERE name = '${req.query.id}'`; 

// EXAMPLE 3 indirect injection
function foo(foo){
    const where = "id=" + foo;
    // ruleid: javascript-tainted-146-sql-injection
    const sql = "SELECT * FROM users WHERE " + where; // ⚠️ concatenación → query
    sequelize.query(sql);
}

// EXAMPLE 4 INJECTION WITH CONCAT
function deleteUser(userId) {
    const base = "DELETE FROM users WHERE id = ";
    // ruleid: javascript-tainted-146-sql-injection
    const query = base.concat(userId);
    return db.execute(query);
}

// EXAMPLE 5 INJECTION WITH JOIN
function buildQuery(parts) {
    // ruleid: javascript-tainted-146-sql-injection
    const query1 = ["SELECT * FROM users WHERE id = ", parts.userId].join("");
    // todoruleid: javascript-tainted-146-sql-injection
    const query2 = ["SELECT", parts, "FROM", parts, "WHERE", parts].join(" ");
    // ruleid: javascript-tainted-146-sql-injection
    const query3 = [
        "SELECT * FROM orders WHERE user_id = ",
        parts,
        " AND (",
        parts.join(" OR "),
        ")"
    ];
} 

// EXAMPLE 6 USING FORMATTING LIBRARIES
function foo(input){
    const format = require('string-format');
    // ruleid: javascript-tainted-146-sql-injection
    const query = format("SELECT * FROM users WHERE id = {0}", input);

    const sprintf = require('sprintf-js').sprintf;
    // ruleid: javascript-tainted-146-sql-injection
    const query = sprintf("SELECT * FROM users WHERE name = '%s'", input);

    const util = require('util');
    // ruleid: javascript-tainted-146-sql-injection
    const query = util.format("SELECT * FROM users WHERE name = '%s'", input);
}

// FP EXAMPLE 1
// ok: javascript-tainted-146-sql-injection
const sql = 'SELECT * FROM users WHERE username = ? AND status = ?';
const [rows] = await connection.execute(sql, [req.body.user, req.body.status]);

// FP EXAMPLE 2
// ok: javascript-tainted-146-sql-injection
await sequelize.query(
  'SELECT * FROM users WHERE id = :id',
  { replacements: { id: req.params.id }, type: QueryTypes.SELECT }
);

// FP EXAMPLE 3
// ok: javascript-tainted-146-sql-injection
await knex('users').where('id', req.query.id).select();

// FP EXAMPLE 4
// ok: javascript-tainted-146-sql-injection
const q = `WHERE fecha = ${SqlString.escape(userInput)}`; // escape used, no surrounding quotes

// FP EXAMPLE 5
// ok: javascript-tainted-146-sql-injection
if (!/^\d{4}-\d{2}-\d{2}$/.test(req.body.date)) throw Error('bad');
const q = `SELECT * FROM t WHERE date = ${SqlString.escape(req.body.date)}`;

// FP EXAMPLE 6
// ok: javascript-tainted-146-sql-injection
const html = `<div>${req.user.name}</div>`; // not SQL

// FP EXAMPLE 7
const ORDER_BY = 'name';
// ok: javascript-tainted-146-sql-injection
const q = `SELECT * FROM users ORDER BY ${ORDER_BY}` // constant

// FP EXAMPLE 8
function safeFormat(x) { return SqlString.escape(x); }
// ok: javascript-tainted-146-sql-injection
const q = `WHERE name = ${safeFormat(req.query)}`;

// FP EXAMPLE 9
export const functionfpexample9 = (datos: IRespuestaDatosCruce) => {

    const {
        valorTotalRecaudoConComision
    } = datos;

    if (condition) {
        // ok: javascript-tainted-146-sql-injection
        MENSAJE_DESCUENTO_COMISION_MANUAL_VALOR_TOTAL =
            'Los cortes identificados con un asterisco (*) corresponden a aquellos que su comisión ha sido descontada previamente, valor total recaudado: $' +
            valorTotalRecaudoConComision?.toLocaleString();
    }
};

// FP EXAMPLE 10
const queryInterlocutor = function () {
  const fechaFormateada = `${year}-${month}-${day}`;
  // ok: javascript-tainted-146-sql-injection
  return `SELECT Id FROM ${asdasd} asdasd Where asdasd = 'asdas' and LastModifiedDate < ${fechaFormateada}T00:00:00.000Z`
}

// FP EXAMPLE 11
const function_name = async (parameter) =>{
  const query = 
    `SELECT * `+
    // ok: javascript-tainted-146-sql-injection
    `FROM "${db}"."${table}" `+
    // ok: javascript-tainted-146-sql-injection
    `WHERE ${column}.material = ${SqlString.escape(parameter)}`
    return query
}

// FP EXAMPLE 12
function foo(data){
    // ok: javascript-tainted-146-sql-injection
    const encabezado = await t.one(
        `INSERT INTO table (...)
                VALUES ($<val1>, $<val2>, ${GLOBAL.FOO})
                RETURNING asd`,
        {
            data
        },
    );

    // ok: javascript-tainted-146-sql-injection
    await t.none(
        `UPDATE foo SET asd = $1, estado = ${asd.FOO}
            WHERE asd = $2`,
        [data],
    );
}

// FP EXAMPLE 13
function foo(transactionId){
  // ok: javascript-tainted-146-sql-injection
  Logger.logDebug(`UploadChargesChannelUse - uploadCharges - ${transactionId}`, '',`INSERT INTO ${transactionId.TABLE_DETECTID_IMAGE_FAKE}`);

  // ok: javascript-tainted-146-sql-injection
  console.log('delete action '+transactionId);

  // ok: javascript-tainted-146-sql-injection
  this.log.info(`Offset calculado: ${transactionId}`);
}