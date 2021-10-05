const roundTo = require("round-to");

let padding = function(value) {
  //数値出ない場合、-を返す
  if(isNaN(parseFloat(value))) {
    return "-";
  }
  //少数第2位になるように第3位を四捨五入、結果を0で埋めて返す
  return roundTo(value,2).toPrecision(3);
}

let round = function(value) {
  //第2位で丸め込み
  return roundTo(value,2)
}
module.exports = {
  padding,
  round
}