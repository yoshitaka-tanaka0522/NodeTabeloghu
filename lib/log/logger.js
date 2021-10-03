const log4js = require("log4js");
const config = require("../../config/log4js.config.js")
let console,application,access;
//logのオプションを受け取る
//appenders→出力方法、categories→カテゴリ
log4js.configure(config)

console = log4js.getLogger();

//ApplicationLogger
application = log4js.getLogger("application")

//ApplicationLogger
access = log4js.getLogger("access")
module.exports = {
  console,
  application,
  access,
}

