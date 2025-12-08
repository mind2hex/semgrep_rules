async function fun1(data){
    const skucorregido=data.sku.padStart(18, '0')
    const query =
    `SELECT ${tabla_imagenes}.material as sku, `+
    `COALESCE(${tabla_imagenes}.ean, '') as gtin, `+
    `FROM "${awsConfig_pim_acuerdos.dbGlue}"."${tabla_imagenes}" `+
    // ruleid: javascript-insecure-sqlstring.escape-implementation
    `WHERE ${tabla_imagenes}.material = '${SqlString.escape(skucorregido)}' `+
    `GROUP BY '${fp}'`;
  
    return query
};

async function fun2(data){
    // ruleid: javascript-insecure-sqlstring.escape-implementation
    const opEnvioLake = data.inicioLake && data.finLake ? `OR ${tabla_generales}.fecha_envio_dataLake BETWEEN date '${SqlString.escape(data.inicioLake)}' AND date '${SqlString.escape(data.finLake)}' ` : ""
    return query
}

async function fun3(data){
    const query =
    `SELECT material AS sku,  
    COALESCE(CAST(${tabla_imagenes}.fecha_modificacion_trasera AS VARCHAR) , '') as fecha_modificacion_trasera `+
    `FROM "${awsConfig_pim_acuerdos.dbGlue}"."${tabla_imagenes}" `+
    `WHERE ${opInSku}`+
    `(fecha_modificacion_frontal BETWEEN date ${SqlString.escape(data.inicio)} AND date ${SqlString.escape(data.fin)};`
    return query
};
  
fun4 = async (campo, valor, constancia = false) => {
    try {
        // ruleid: javascript-insecure-sqlstring.escape-implementation
        const query2 = `SELECT * FROM ${esquema}.${vista} WHERE ${campo} = '${SqlString.escape(valor)}'`;
        const data = await sequelize.query(query2, {
        type: Sequelize.QueryTypes.SELECT,
        });
        return data[0];
    } catch (error) {
        console.log(error);
        return error;
    }
};
  
class class1 {
    clasfun1 = async (campo, valor, constancia = false) => {
      try {
        // todoruleid: javascript-insecure-sqlstring.escape-implementation
        const query2 = `SELECT * FROM ${esquema}.${vista} WHERE ${campo} = '${SqlString.escape(valor)}'`;
        const data = await sequelize.query(query2, {
          type: Sequelize.QueryTypes.SELECT,
        });
        return data[0];
      } catch (error) {
        console.log("------- MENSAJE DE ERROR EN QUERY -------");
        console.log(error);
        return error;
      }
    };

    async classfun3(data){
      const skucorregido=data.sku.padStart(18, '0')
      const query =
      `SELECT ${tabla_imagenes}.material as sku, `+
      `COALESCE(${tabla_imagenes}.ean, '') as gtin, `+
      `FROM "${awsConfig_pim_acuerdos.dbGlue}"."${tabla_imagenes}" `+
      // ruleid: javascript-insecure-sqlstring.escape-implementation
      `WHERE ${tabla_imagenes}.material = '${SqlString.escape(skucorregido)}' `+
      `GROUP BY '${fp}'`;
  
      return query
    };
}
  
  
  