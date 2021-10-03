//アプリーケーションログ設定情報を取得する
const logger = require("./logger.js").application;
//エラーをハンドリングするミドルウェアを返却する
module.exports = function(options) {
  return function (err, req, res, next) {
    logger.error(err.message);
    next(err);
  };
};