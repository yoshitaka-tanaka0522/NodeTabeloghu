const PORT = process.env.PORT;
const path = require("path");
const logger = require("./lib/log/logger")
const applicationlogger = require("./lib/log/applicationlogger.js")
const accesslogger = require("./lib/log/accesslogger.js")
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

app.set("view engine","ejs");
app.disable("x-powered-by");


//favicon
app.use(favicon(path.join(__dirname,"/public/favicon.ico")));

//staticResource
//第一引数に配信肢体静的ファイルが配置してあるフォルダのルートパス
//dirnameは今実装しているファイルが配置されてるフォルダのパス
//例えば↓の場合c:\Projects\talstylogになる
app.use("/public",express.static(path.join(__dirname,"/public")));

//静的コンテンツでログを出す必要はないので静的コンテンツ設定の下にいれる
app.use(accesslogger());

//DynamicResource
app.use("/", require("./routes/index.js"))
app.use("/", require("./routes/index.js"))
//非同期でデータを取得するのでasyncを使う
app.use("/test", async (req, res, next) => {
  //関数を非同期化するモジュール
  const { promisify } = require("util");
  const path = require("path");
    //引数にオブジェクトを取って、rootプロパティにどこのフォルダ以下のsqlファイルを読み込むという設定を行う
  const { sql } = require("@garafu/mysql-fileloader")({ root: path.join(__dirname, "./lib/database/sql") });
  const config = require("./config/mysql.config.js");
  const mysql = require("mysql");
  const con = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
  });
  const client = {
    //promisify(con.connect)の実装だけだとプロトタイプ(オブジェクトの元)が変更されて処理が動かないため
    //接続設定をbindする    
    connect: promisify(con.connect).bind(con),
    query: promisify(con.query).bind(con),
    end: promisify(con.end).bind(con)
  };
  var data;

  try {
    //connectもqueryもコールバックなのでコードが見づらいので
    //避けるために非同期に書き変えたい→promisfyで非同期化する    
    await client.connect();
    //rootフォルダ配下にある、↓のファイル名を取って実行する
    data = await client.query(await sql("SELECT_SHOP_BASIC_BY_ID"));
    console.log(data);
  } catch (err) {
    next(err);
  } finally {
    await client.end();
  }

  res.end("OK");
});

//setApplicationlog→処理の最後に記載することで全ての処理のアプリログが出力できる
app.use(applicationlogger());
app.listen(PORT,()=> {
  logger.application.info(`Application listening at ${PORT}`)
});