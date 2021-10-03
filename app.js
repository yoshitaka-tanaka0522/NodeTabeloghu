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
app.use("/test", async (req, res, next) => {
  const { MySQLClient, sql } = require("./lib/database/client.js");
  var data;

  try {
    //connectもqueryもコールバックなのでコードが見づらいので
    //避けるために非同期に書き変えたい→promisfyで非同期化する
    //第二引数に渡す値はサニタイズ化されてsqlに渡されるのでsqlインジェクション対策になる    
    data = await MySQLClient.executeQuery(await sql("SELECT_SHOP_BASIC_BY_ID"),[1]);
    console.log(data);
  } catch (err) {
    next(err);
  }

  res.end("OK");
});

//setApplicationlog→処理の最後に記載することで全ての処理のアプリログが出力できる
app.use(applicationlogger());
app.listen(PORT,()=> {
  logger.application.info(`Application listening at ${PORT}`)
});