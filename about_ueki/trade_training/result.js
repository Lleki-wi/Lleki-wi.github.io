/*
LICENCE : MIT

Copyright © 2023 Ll_e_ki

https://opensource.org/license/mit/
*/

function getParam(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function jump_start() {
    if (confirm("スタート画面に戻ります") == true) {
        window.location.href = "training"
    }
}

const url = window.location.href
let inc = (getParam("code").toString()) + " " + getParam("incname")
let since = "開始年月日　：" + getParam("since")
let elapsed = "経過日数　　：" + getParam("elapsed") + "日"
let market = "最終時価　　：" + getParam("market") + "円"
let unrealized = "最終含み損益：" + getParam("unrealized_yen") + "円（" + getParam("unrealized_per") + "%）"
let cash = "最終現金残高：" + getParam("cash") + "円（初期残高2,000,000円）"
let profit = "最終損益　　：" + getParam("profit_yen") +"円（" + getParam("profit_per") + "%）"
let holding = "最終保有株数：" + getParam("holding")
inc_text.textContent = inc
since_text.textContent = since
elapsed_text.textContent = elapsed
market_text.textContent = market
unrealized_text.textContent = unrealized
cash_text.textContent = cash
profit_text.textContent = profit
holding_text.textContent = holding
tweet.href = ("https://twitter.com/intent/tweet?text=" + "テクニカル分析練習結果" + "\n" + inc + "\n" + since + "\n" + elapsed + "\n" + market + "\n" + unrealized + "\n" + cash + "\n" + profit + "\n" + holding + "\n#Ueki_Technical_Analysis").replace(/%/g, "%25").replace(/\n/g, "%0a").replace(/#/g, "%23")