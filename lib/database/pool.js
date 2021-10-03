const { promisify } = require("util");
const config = require("../../config/mysql.config.js");
const mysql = require("mysql");
const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: config.CONNECTION_LIMIT,
  queueLimit: config.QUEUE_LIMIT
});

module.exports = {
  //ユーザーが検索するたびに毎回sqlに接続するとパフォーマンス低下するので
  //コネクションプールを使用して接続を使いまわす
  //promisify(con.connect)の実装だけだとプロトタイプ(オブジェクトの元)が変更されて処理が動かないため
  //接続設定をbindする  
  pool,
  getConnection: promisify(pool.getConnection).bind(pool),
  executeQuery: promisify(pool.query).bind(pool),
  releaseConnection: function (connection) {
    connection.release();
  },
  end: promisify(pool.end).bind(pool)
};