const path = require("path");
//環境変数で外から与えられるようにすることでリリース時に
//環境に合わせて値を変更することができる
//環境変数がなければlogsというフォルダを作ってそこにログを出力するようにする。
const LOG_ROOT_DIR = process.env.LOG_ROOT_DIR || path.join(__dirname,"../logs")

module.exports = {
  //appenders出力方法
  appenders: {
    ConsoleLogAppender: {
      type: "console"
    },
    ApplicationLogAppender: {
      //日付のローテーションを表示できる
      //例→systemlog.20210529.log
      type: "dateFile",
      //出力ファイル名→LOG_ROOT_DIRにapplication.logのファイル名で出力する。
      filename: path.join(LOG_ROOT_DIR,"./application.log"),
      //日付パターン
      pattern: "yyyyMMdd",
      //何日分のログを保持するか
      daysTokeep: 7
    },
    AccessLogAppender: {
      type: "dateFile",
      filename: path.join(LOG_ROOT_DIR,"./access.log"),
      pattern: "yyyyMMdd",
      daysTokeep: 7
    }
  },
  categories: {
  //appenderで指定した文字列を利用する
  //ログ出力を分類するためのカテゴリ、分類毎にどこへ出力するか(アペンダー)を指定する
    "default": {
      //ログ出力方法
      appenders: ["ConsoleLogAppender"],
      //ログのレベル
      level: "ALL"
    },
    "application": {
      appenders: [
        "ApplicationLogAppender",
        "ConsoleLogAppender"
      ],
      level: "INFO"
    },
    "access": {
      appenders: [
        "AccessLogAppender",
        "ConsoleLogAppender"
      ],
      level: "INFO"
    }
  }
};