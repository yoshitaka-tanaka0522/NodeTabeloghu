const path = require("path");
//引数にオブジェクトを取って、rootプロパティにどこのフォルダ以下のsqlファイルを読み込むという設定を行う
const { sql } = require("@garafu/mysql-fileloader")({ root: path.join(__dirname, "./sql") });
const pool = require("./pool.js");

const MySQLClient = {
  executeQuery: async function (query, values) {
    var results = await pool.executeQuery(query, values);
    return results;
  }
};

module.exports = {
  MySQLClient,
  sql
};

