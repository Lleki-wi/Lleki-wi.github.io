/*
LICENCE : MIT

Copyright © 2023 Ll_e_ki

https://opensource.org/license/mit/
*/

const STARTMENU = 0
const TRAINING = 1

function show_start() {
    document.getElementById("training_html").style = "display: none"
    document.getElementById("start_html").style = "display: block"
    nowpage = STARTMENU
    // document.getElementById("meta").content = "width=device-width, initial-scale=1.0"
}

function show_training() {
    document.getElementById("start_html").style = "display: none"
    document.getElementById("training_html").style = "display: block"
    nowpage = TRAINING
    // document.getElementById("meta").content = ""
}

show_start()

const sleep = ms => new Promise(res => setTimeout(res, ms))



/* start.js */
let filedata = document.getElementById("filedata")
let filereader = new FileReader();
let global_csvdata, global_csvvalues
let start = document.getElementById("start")


let datalen = -1

function search_str(s, a) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].match(s[0])) {
            return i
        }
    }
    for (var i = 0; i < a.length; i++) {
        if (a[i].match(s[1])) {
            return i
        }
    }
    cs = s[1].toUpperCase()
    for (var i = 0; i < a.length; i++) {
        if (a[i].match(cs)) {
            return i
        }
    }
    return -1
}

function check_csv(csvdata) {
    document.getElementById("start").disabled = true
    /*
    0. 致命的な問題は検出されなかった
    1. ファイルが小さすぎる
    2. 形式がおかしい
    3. データがおかしい
    */
    if (csvdata.length <= 15+1) {
        return 1
    }

    let head = csvdata[0].split(",")
    let code = search_str(["コード", "code"], head)
    let incname = search_str(["名", "name"], head)
    let date = search_str(["日", "date"], head)
    let open = search_str(["始", "open"], head)
    let close = search_str(["終", "close"], head)
    let low = search_str(["安", "low"], head)
    let high = search_str(["高", "high"], head)

    let becode, beincname, bedate
    if (("prefix"+code+incname+date+open+close+low+high).match("-1")) {
        return 2
    }
    var tmprow = csvdata[1].split(",")
    if (tmprow.length != head.length) {
        return 2
    } else {
        becode = tmprow[code]
        beincname = tmprow[incname]
        bedate = -1
    }
    for (var i = 1; i < csvdata.length; i++) {
        datarow = csvdata[i].split(",")
        if (datarow.length != head.length) {
            return 2
        }
        newcode = datarow[code]
        newincname = datarow[incname]
        newdate = datarow[date]
        if (newcode != becode || newincname != beincname || newdate == bedate) {
            return 3
        }
        if (("prefix"+Number(datarow[open])+Number(datarow[close])+Number(datarow[low])+Number(datarow[high])).match("NaN")) {
            return 3
        }
        becode = newcode
        beincname = newincname
        bedate = newdate
    }
    document.getElementById("start").disabled = false
    return {
        "code" : code,
        "incname" : incname,
        "date" : date,
        "open" : open,
        "close" : close,
        "low" : low,
        "high" : high
    }
}

function check_since(since) {
    let since_error = document.getElementById("since_error")
    if (since == "") {
        numsince = -1
    } else {
        numsince = Number(since)
    }
    if (isNaN(numsince)) {
        since_error.textContent = "半角数字で入力してください"
        return 1
    }
    if ((numsince != -1 && numsince < 15) || numsince > datalen - 1) {
        since_error.textContent = "入力がデータの範囲外です（15〜" + (datalen - 1) + "）"
        return 1
    }
    since_error.textContent = "　"
    return 0
}

function change_since() {
    document.getElementById("start").disabled = true
    let since = document.getElementById("since_input").value
    
    if (check_since(since) == 1) {
        return 1
    }
    document.getElementById("start").disabled = false
}

filedata.onchange = () => {
    document.getElementById("start").disabled = true

    let file = filedata.files[0]
    let csv_error = document.getElementById("csv_error")
    if (file == undefined) {
        csv_error.textContent = "　"
        document.getElementById("since_input").disabled = true
        document.getElementById("start").disabled = true
        return
    }
    if (file.name.slice(-4) != ".csv") {
        document.getElementById("since_input").disabled = true
        document.getElementById("start").disabled = true
        csv_error.textContent = "csvファイルのみ使用可能です"
    } else {
        filereader.readAsText(file, "utf-8")
    }
}

filereader.onload = () => {
    let csvdata = filereader.result.split('\r\n')
    let csv_error = document.getElementById("csv_error")
    var res = check_csv(csvdata)
    if (res == 1) {
        csv_error.textContent = "ファイルが小さすぎるか、ファイルの形式に問題があります"
        document.getElementById("since_input").disabled = true
    } else if (res == 2) {
        csv_error.textContent = "内容の形式に問題があります"
        document.getElementById("since_input").disabled = true
    } else if (res == 3) {
        csv_error.textContent = "内容の値に問題があります"
        document.getElementById("since_input").disabled = true
    } else {
        document.getElementById("since_input").disabled = false
        csv_error.textContent = "　"
        datalen = csvdata.length - 1
        global_csvdata = csvdata
        global_csvvalues = res
        let since = document.getElementById("since_input")
        if (check_since(since.value) == 1) {
            since.value = ""
        }
    }
}

filereader.onerror = () => {
    let csv_error = document.getElementById("csv_error")
    csv_error.textContent = "ファイルの読み込みに失敗しました"
}

start.addEventListener("click", (event) => {
    let local_since = document.getElementById("since_input").value
    event.preventDefault()
    if (confirm("練習を開始します") == true) {
        if (local_since == "" || local_since == -1) {
            if (datalen <= 15) {
                local_since = Math.floor(Math.random() * (datalen - 14)) + 14+1
            } else if (datalen <= 100) {
                local_since = Math.floor(Math.random() * (datalen - 70)) + 21
            } else if (datalen <= 400) {
                local_since = Math.floor(Math.random() * (datalen - 100)) + 121
            } else {
                local_since = Math.floor(Math.random() * (datalen - 500)) + 401
            }
        }
        let writedata = []
        for (var row of global_csvdata.slice(1)) {
            var tmpdata = []
            row = row.split(",")
            tmpdata.push(row[global_csvvalues.date])
            tmpdata.push(Number(row[global_csvvalues.open]))
            tmpdata.push(Number(row[global_csvvalues.high]))
            tmpdata.push(Number(row[global_csvvalues.low]))
            tmpdata.push(Number(row[global_csvvalues.close]))
            writedata.push(tmpdata)
        }
        let local_code = global_csvdata[1].split(",")[global_csvvalues.code]
        let local_incname = global_csvdata[1].split(",")[global_csvvalues.incname]
        if (local_code.length == 5 && local_code[local_code.length-1] == "0") {
            code = local_code.slice(0, -1)
        } else {
            code = local_code
        }
        data[code] = writedata
        incname[code] = local_incname
        since = local_since
        show_training()
        train()
    }
})

/* training.js */
const DATE = 0
const OPEN = 1
const HIGH = 2
const LOW = 3
const CLOSE = 4
const WIDTH = 850
const HEIGHT = 600
const START_CASH = 2000000
const START_PERIOD = 59
const START_CANDLE_WIDTH = 8
const TOP_MARGIN = 50
const BOTTOM_MARGIN = 50


let canvas = document.getElementById("canvas")
let c = canvas.getContext("2d")
canvas.width = WIDTH
canvas.height = HEIGHT
let log_text = document.getElementById("log_text")
let since_text = document.getElementById("since_text")
let date_text = document.getElementById("date_text")
let buysell_text = document.getElementById("buysell_sum")
let market_text = document.getElementById("market_text")
let unrealized_text = document.getElementById("unrealized_text")
let cash_text = document.getElementById("cash_text")
let profit_text = document.getElementById("profit_text")
let holding_text = document.getElementById("holding_text")
let tradelog_area = document.getElementById("tradelog_area")

let global_min_low = -1
let global_scale = -1
let global_HLtradetag_flag = false

/* 便利関数 */
function getParam(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return NaN;
    if (!results[2]) return NaN;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function lcm(a, b) {
    var r
    var c = a * b
    while (1) {
        r = a % b
        a = b
        b = r
        if (r == 0) {
            break
        }
    }
    return c / a 
}

/* 座標計算関数 */
function calc_x(i, since, notcandle) {
    return (i-since)*(candle_width+candle_width/2) + notcandle*candle_width/2 + candle_width/2+2.5 // 2.5は最低保証マージン
}

function calc_tradelogy(value) {
    return (HEIGHT - ((value - global_min_low) * global_scale + BOTTOM_MARGIN) - 20)*global_HLtradetag_flag + 20*!global_HLtradetag_flag
}

/* 指標の生成 */
function gen_average(data, n, average_map) {
    if (n > data.length || isNaN(average_map[n]) == false) {
        return 1
    }

    let result = []
    let tmp_sum = 0
    for (var i = 0; i < n-1; i++) {
        result.push(0)
    }
    for (var i = 0; i < n; i++) {
        tmp_sum += data[i][CLOSE]
    }
    result.push(tmp_sum/n)
    for (var i = 0; i < data.length - n; i++) {
        tmp_sum -= data[i][CLOSE]
        tmp_sum += data[i+n][CLOSE]
        result.push(tmp_sum/n)
    }
    average_map[n] = result

    return 0
}

function gen_bollinger_bands(data, n, bollinger_bands_map) {
    if (n > data.length) {
        return 1
    }
    function tmp_calc(n, _2sum, _sum2) {
        return Math.sqrt((n * _2sum - _sum2) / (n * (n - 1)))
    }
    for (var i = -3; i < 4; i++) {
        if (i == 0) {
            continue
        }
        bollinger_bands_map[i] = []
    }
    let deviation = []
    let average = []
    let tmp_sum = 0
    let tmp_2sum = 0
    
    tmp_2sum += data[0][CLOSE]**2
    tmp_sum += data[0][CLOSE]
    for (var i = 1; i < n; i++) {
        for (var j = -3; j < 4; j++) {
            if (j == 0) {
                continue
            }
            bollinger_bands_map[j].push(0)
        }
        average.push(0)
        tmp_2sum += data[i][CLOSE]**2
        tmp_sum += data[i][CLOSE]
    }
    deviation.push(tmp_calc(n, tmp_2sum, tmp_sum**2))
    average.push(tmp_sum/n)
    for (var i = 0; i < data.length - n; i++) {
        tmp_2sum -= data[i][CLOSE]**2
        tmp_2sum += data[i+n][CLOSE]**2
        tmp_sum -= data[i][CLOSE]
        tmp_sum += data[i+n][CLOSE]
        deviation.push(tmp_calc(n, tmp_2sum, tmp_sum**2))
        average.push(tmp_sum/n)
    }
    for (var i = n-1; i < data.length; i++) {
        for (var j = -3; j <= 3; j++) {
            if (j == 0) {
                continue
            }
            bollinger_bands_map[j].push(average[i] + j * deviation[i-n+1])
        }
    }
    return 0
}

/* キャンバスのリセット */
function clear_canvas() {
    c.clearRect(0, 0, WIDTH, HEIGHT)
    return
}

/* ローソク足・指標の描画 */
function draw_candle(x, open, close, high, low) {
    if (open > close) {
        c.strokeStyle = "blue"
        c.fillStyle = "blue"
    } else if (open < close) {
        c.strokeStyle = "red"
        c.fillStyle = "red"
    } else {
        c.strokeStyle = "black"
        c.fillStyle = "black"
    }
    open = HEIGHT - open
    close = HEIGHT - close
    high = HEIGHT - high
    low = HEIGHT - low
    if (open > close) {
        tmp = close
        close = open
        open = tmp
    }
    c.beginPath()

    c.lineWidth = 1
    c.fillRect(x, open, candle_width, (close-open))
    c.fillRect(x+candle_width/2.2, low, candle_width/7, (high-low))
    c.fill()

    c.stroke()
    return
}

function draw_number(n, x, y, fontcolor="black", bg=0, bgmargin=0) {
    n = n.toLocaleString("ja")
    if (bg != 0) {
        c.beginPath()
        c.strokeStyle = bg
        c.fillStyle = bg
        c.lineWidth = 2
        c.fillRect(x+bgmargin, y+bgmargin, -8 * n.length - 2 * bgmargin, -10 - 2 * bgmargin)
        c.stroke()
    }
    c.strokeStyle = "black"
    if (fontcolor != 0) {
        c.strokeStyle = fontcolor
    }
    c.beginPath()
    c.lineWidth = 1
    for (var i = n.length - 1; i > -1; i--) {
        if (n[i] == "0") {
            c.moveTo(x, y)
            c.lineTo(x-5, y)
            c.lineTo(x-5, y-10)
            c.lineTo(x, y-10)
            c.lineTo(x, y)
        } else if (n[i] == "1") {
            c.moveTo(x, y)
            c.lineTo(x, y-10)
        } else if (n[i] == "2") {
            c.moveTo(x, y)
            c.lineTo(x-5, y)
            c.lineTo(x-5, y-5)
            c.lineTo(x, y-5)
            c.lineTo(x, y-10)
            c.lineTo(x-5, y-10)
        } else if (n[i] == "3") {
            c.moveTo(x, y)
            c.lineTo(x, y-10)
            c.lineTo(x-5, y-10)
            c.moveTo(x, y-5)
            c.lineTo(x-5, y-5)
            c.moveTo(x, y)
            c.lineTo(x-5, y)
        } else if (n[i] == "4") {
            c.moveTo(x, y)
            c.lineTo(x, y-10)
            c.moveTo(x, y-5)
            c.lineTo(x-5, y-5)
            c.lineTo(x-5, y-10)
        } else if (n[i] == "5") {
            c.moveTo(x-5, y)
            c.lineTo(x, y)
            c.lineTo(x, y-5)
            c.lineTo(x-5, y-5)
            c.lineTo(x-5, y-10)
            c.lineTo(x, y-10)
        } else if (n[i] == "6") {
            c.moveTo(x, y-10)
            c.lineTo(x-5, y-10)
            c.lineTo(x-5, y)
            c.lineTo(x, y)
            c.lineTo(x, y-5)
            c.lineTo(x-5, y-5)
        } else if (n[i] == "7") {
            c.moveTo(x, y)
            c.lineTo(x, y-10)
            c.lineTo(x-5, y-10)
        } else if (n[i] == "8") {
            c.moveTo(x, y)
            c.lineTo(x-5, y)
            c.lineTo(x-5, y-10)
            c.lineTo(x, y-10)
            c.lineTo(x, y)
            c.moveTo(x, y-5)
            c.lineTo(x-5, y-5)
        } else if (n[i] == "9") {
            c.moveTo(x-5, y)
            c.lineTo(x, y)
            c.lineTo(x, y-10)
            c.lineTo(x-5, y-10)
            c.lineTo(x-5, y-5)
            c.lineTo(x, y-5)
        } else if (n[i] == ",") {
            c.moveTo(x-4, y+1)
            c.lineTo(x-3, y-3)
            c.lineTo(x-5, y-3)
        } else if (n[i] == "/") {
            c.moveTo(x-4, y)
            c.lineTo(x-1, y-10)
        } else if (n[i] == ".") {
            c.moveTo(x-5, y)
            c.lineTo(x-5, y-1)
            c.lineTo(x-4, y-1)
            c.lineTo(x-4, y)
            c.lineTo(x-5, y)
        }
        x -= 8
    }
    c.stroke()

    return
}

/* 描画に関する総合的な関数 */
function plot(data, since, until, option_code) {
    /* 指標の設定 */
    /* 移動平均線 */
    let average_map = average[option_code]
    let drawaverage_list = averageday[option_code]
    let averagecolor_list = averagecolor[option_code]
    /* ボリンジャーバンド */
    let bollinger_bands = bollinger_bands_map[option_code]
    let bollinger_bands_color_list = bollinger_bands_color[option_code]

    let min_low = 1 << 60
    let max_high = -1
    let diff = 0
    let scale = 0
    let strdiff = ""

    /* 前処理 */
    function preprocessing() {
        /* 価格 */
        for (var i = since; i < until+1; i++) {
            high = data[i][HIGH]
            low = data[i][LOW]
            max_high = Math.max(max_high, high)
            min_low = Math.min(min_low, low)
        }
        /* 移動平均線 */
        for (var i = 0; i < drawaverage_list.length; i++) {
            if (average_flag == false || average_flags[drawaverage_list[i]] == false) {
                continue
            }
            tmp_list = average_map[drawaverage_list[i]]
            for (var j = since; j < until+1; j++) {
                v = tmp_list[j]
                if (v == 0) {
                    continue
                }
                max_high = Math.max(max_high, v)
                min_low = Math.min(min_low, v)
            }
        }
        /* ボリンジャーバンド */
        for (var j = 1; j <= 3; j++) {
            if (bollinger_bands_flag == false || bollinger_bands_flags[j] == false) {
                continue
            }
            for (var i = since; i < until+1; i++) {
                if (bollinger_bands[j][i] == 0) {
                    continue
                }
                if (i == until && bollinger_bands[j][i-1] == 0) {
                    break
                }
                max_high = Math.max(max_high, bollinger_bands[j][i])
                min_low = Math.min(min_low, bollinger_bands[-j][i])
            }
        }
        diff = max_high - min_low
        scale = 500 / diff
        strdiff = Math.floor(diff).toString()
        global_min_low = min_low
        global_scale = scale
    }
    preprocessing()
    /* 価格目盛りの描画 */
    function plot_pricescale() {
        let price_scale
        let price_margin
        if (Number(strdiff[0]) < 2) {
                price_scale = 10 * 10**(strdiff.length - 3)
                price_margin = 0
        } else {
            price_scale = 10 * 10**(strdiff.length - 2)
            price_margin = 0
        }

        for (var i = 0; i < 20; i++) {
            var tmp_price = Math.floor((price_scale * i + min_low) / price_scale) * price_scale + price_margin
            var y = HEIGHT - ((tmp_price - min_low) * scale + TOP_MARGIN)
            draw_number(tmp_price, WIDTH-10, y-10, 0, 0)
            c.strokeStyle = "black"
            if (tmp_price / price_scale % 5 == 0) {
                c.lineWidth = 0.6
            } else {
                c.lineWidth = 0.25
            }
            c.beginPath()
            c.moveTo(0, y)
            c.lineTo(WIDTH, y)
            c.stroke()
            if (y < 0) {
                break
            }
        }
        var y = HEIGHT - ((data[now][CLOSE] - min_low) * scale + TOP_MARGIN)
        draw_number(data[now][CLOSE], WIDTH-10, y-5, "red", "white", 4)
        c.strokeStyle = "red"
        c.lineWidth = 1
        c.beginPath()
        c.moveTo(0, y)
        c.lineTo(WIDTH, y)
        c.stroke()
    }
    plot_pricescale()

    /* 年月日目盛りの描画 */
    function plot_datescale() {
        let strperiod = (until+1 - since).toString()
        let date_scale

        if (Number(strperiod[0]) >= 8) {
            date_scale = 5 * 10**(strperiod.length - 1)
        } else if(Number(strperiod[0]) <= 3) {
            date_scale = 5 * 10**(strperiod.length - 2)
        } else {
            date_scale = 10 * 10**(strperiod.length - 2)
        }

        for (var i = since - date_scale; i < until+1; i++) {
            if (i < 0) {
                continue
            }
            if ((i - start_now) % date_scale == 0) {
                if (i == now) {
                    var x = calc_x(i, since, 1)
                    var tmp_date = data[i][DATE]
                    draw_number(tmp_date, x+30, HEIGHT - 10, 0, "white", 2)
                    continue
                }
                var x = calc_x(i, since, 1)
                c.strokeStyle = "black"
                c.lineWidth = 0.25
                c.beginPath()
                c.moveTo(x, 0)
                c.lineTo(x, HEIGHT)
                c.stroke()
                var tmp_date = data[i][DATE]
                draw_number(tmp_date, x+30, HEIGHT - 10, 0, "white", 2)
            }
        }
    }
    plot_datescale()

    /* nowの年月日表示 */
    function plot_nowdate() {
        if (until == now) {
            var x = calc_x(now, since, 1)
            c.strokeStyle = "green"
            c.lineWidth = 1
            c.beginPath()
            c.moveTo(x, 0)
            c.lineTo(x, HEIGHT)
            c.stroke()
            var tmp_date = data[now][DATE]
            draw_number(tmp_date, x+30, HEIGHT - 25 , "green", "white", 2)
        }
    }
    plot_nowdate()
    
    /* ボリンジャーバンドの描画 */
    function plot_bollinger_bands() {
        if (bollinger_bands_flag == false || bollinger_bands[1][until] == 0) {
            return
        }
        c.lineWidth = 0.5
        for (var i = 3; i >= 1; i--) {
            if (bollinger_bands_flags[i] == false) {
                continue
            }
            
            var drawlist = bollinger_bands[i]
            for (var j = since; j < until+1 && drawlist[j] == 0; j++) {}
            if (j == until) {
                break
            }
            c.strokeStyle = bollinger_bands_color_list[i-1]
            c.fillStyle = bollinger_bands_color_list[i-1]
            
            c.beginPath()
            c.moveTo(calc_x(j, since, 1), HEIGHT - ((bollinger_bands[-i][j]-min_low) * scale + TOP_MARGIN)) //
            c.lineTo(calc_x(j, since, 1), HEIGHT - ((drawlist[j]-min_low) * scale + TOP_MARGIN)) //
            for (var j = j; j < until+1; j++) {
                c.lineTo(calc_x(j, since, 1), HEIGHT - ((drawlist[j]-min_low) * scale + TOP_MARGIN))
            }
            j--
            var drawlist = bollinger_bands[-i]
            c.lineTo(calc_x(j, since, 1), HEIGHT - ((drawlist[j]-min_low) * scale + TOP_MARGIN))
            for (var j = j; j >= since && drawlist[j] != 0; j--) {
                c.lineTo(calc_x(j, since, 1), HEIGHT - ((drawlist[j]-min_low) * scale + TOP_MARGIN))
            }
            //c.lineTo(calc_x(j-1, since, 1), HEIGHT - ((bollinger_bands[i][j]-min_low) * scale + TOP_MARGIN)) //
            c.fill()
            c.stroke()
        }
    }
    plot_bollinger_bands()

    /* 売買タグの描画 */
    function plot_tradetag() {
        let ALPH = 0.35
        for (var i = since; i < until+1; i++) {
            if (tradelog[data[i][DATE]] != undefined) {
                if (tradelog[data[i][DATE]][0] > 0) {
                    c.strokeStyle = "rgba(" + [0, 127, 127, ALPH] + ")"
                    c.fillStyle = "rgba(" + [0, 127, 127, ALPH*2] + ")"
                } else {
                    c.strokeStyle = "rgba(" + [127, 0, 127, ALPH] + ")"
                    c.fillStyle = "rgba(" + [127, 0, 127, ALPH*2] + ")"
                }
                c.lineWidth = 1
                c.beginPath()
                var x = calc_x(i, since, 0)
                c.fillRect(x, 0, candle_width, calc_tradelogy(data[i][HIGH]))
                if (tradelog[data[i][DATE]][2] == -1) {
                    tradelog[data[i][DATE]][2] = data[i][HIGH]
                }
                c.stroke()
            }
        }
    }
    plot_tradetag()

    /* ローソク足の描画 */
    function plot_candle() {
        let open, close
        for (var i = since; i < until+1; i++) {
            open = (data[i][OPEN] - min_low) * scale + BOTTOM_MARGIN
            close = (data[i][CLOSE] - min_low) * scale + BOTTOM_MARGIN
            high = (data[i][HIGH] - min_low) * scale + BOTTOM_MARGIN
            low = (data[i][LOW] - min_low) * scale + BOTTOM_MARGIN
            draw_candle(calc_x(i, since, 0), open, close, high, low)
        }
    }
    plot_candle()

    /* 移動平均線の描画 */
    function plot_average() {
        if (average_flag == false) {
            return
        }
        c.lineWidth = 1
        for (var i = 0; i < drawaverage_list.length; i++) {
            if (average_flags[drawaverage_list[i]] == false) {
                continue
            }
            var drawlist = average_map[drawaverage_list[i]]
            for (var j = since; j < until+1 && drawlist[j] == 0; j++) {}
            c.strokeStyle = averagecolor_list[i]
            c.beginPath()

            c.moveTo(calc_x(j, since, 1), HEIGHT - ((drawlist[j]-min_low) * scale + TOP_MARGIN))
            for (var j = j; j < until+1; j++) {
                c.lineTo(calc_x(j, since, 1), HEIGHT - ((drawlist[j]-min_low) * scale + TOP_MARGIN))
            }
            c.stroke()
        }
    }
    plot_average()
}

/* トレードに関する操作 */
function trade_set(n) {
    buysell += n
    buysell_text.value = (buysell).toLocaleString("ja")
}

/* 設定の変更 */
function change_HLtradetagflag() {
    global_HLtradetag_flag = document.getElementById("change_HLtradetag").checked
    resize(0)
}

function changemoving(n) {
    if (n == "root") {
        average_flag = document.getElementById("movingroot").checked
    } else {
        average_flags[n] = document.getElementById("moving"+n).checked
    }
    resize(0)
}

function changebollinger(n) {
    if (n == "root") {
        bollinger_bands_flag = document.getElementById("bollingerroot").checked
    } else {
        bollinger_bands_flags[n] = document.getElementById("bollinger"+n).checked
    }
    resize(0)
}

/* 左右移動・拡大縮小 */
function moveplot(code, n) {
    clear_canvas()
    since += n
    if (since+period > now) {
        since = now-period
    } else if (since < 0) {
        since = 0
    }
    plot(data[code], since, since+period, "default")    
}

function resize(n) {
    if (since == 0) {
        if (n < 0) {
            period -= n
            if (since + period > now) {
                period = now - since
            }
        } else {
            period -= n
            since += n
        }
    } else {
        if (period - n < 14) {
            n = period - 14
        }
        if (since + n < 0) {
            n = -since
        }

        period -= n
        since += n
    }
    candle_width = START_PERIOD / period * START_CANDLE_WIDTH
    /*if (since == be_since && period == be_period) {
        return
    }*/
    clear_canvas()
    plot(data[code], since, since+period, "default")
}

/* 日数を進める */
async function next(code) {
    clear_canvas()
    now += 1
    since = now-period

    openvalue = data[code][now][OPEN]
    closevalue = data[code][now][CLOSE]
    if (buysell > 0 && buysell * openvalue > cash) {
        buysell = Math.floor(cash / openvalue / 100) * 100
    } else if (buysell < 0 && buysell < -holding) {
        buysell = -holding
    }
    if (buysell != 0) {
        tradelog[data[code][now][DATE]] = [buysell, openvalue, -1]
        var logmessage = data[code][now][DATE] + "（" + (now - start_now + 1) + "日目）\n"
        if (buysell > 0) {
            purchase_price += buysell * openvalue
            logmessage += "　買：" + buysell + "　価格：" + openvalue + "円\n"
        } else {
            purchase_price = (holding + buysell) * purchase_price/holding
            logmessage += "　売：" + Math.abs(buysell) + "　価格：" + openvalue + "円\n"
            if (holding + buysell == 0) {
                purchase_price = 0
            }
        }
        tradelog_area.textContent = logmessage + tradelog_area.textContent
    }
    date_text.textContent = (now - start_now + 1) + "日目 " + data[code][now][DATE]
    holding += buysell
    market = holding * closevalue
    cash -= buysell * closevalue
    if (purchase_price == 0) {
        unrealized_yen = 0
        unrealized_per = 0
    } else {
        unrealized_yen = market - purchase_price
        unrealized_per = Math.floor(10000 * unrealized_yen / purchase_price + 0.5) / 100
    }
    profit_yen = cash - START_CASH
    profit_per = Math.floor(10000 * (profit_yen) / START_CASH + 0.5) / 100 
    buysell = 0
    market_text.textContent = "時価　　：" + market.toLocaleString("ja")+"円"
    unrealized_text.textContent = "含み損益：" + unrealized_yen.toLocaleString("ja")+"円（" + unrealized_per+"%）"
    cash_text.textContent = "現金残高：" + cash.toLocaleString("ja")+"円"
    profit_text.textContent = "損益　　：" + profit_yen.toLocaleString("ja") + "円（" + profit_per+"％）"
    holding_text.textContent = "保有株数：" + holding.toLocaleString("ja")
    buysell_text.value = 0

    plot(data[code], since, now, "default")

    if (now == data[code].length - 1) {
        document.getElementById("next").disabled = true
        final_status = 1
        end()
    }
}

/* 練習を終了する */
function end() {
    if (final_status != 1) {
        let confirm_message
        if (final_status == 0) {
            confirm_message = "練習を終了し、最終結果を表示します"
        } else {
            confirm_message = "最終結果を表示します"
        }
        if (window.confirm(confirm_message) == 1) {
            let url = "result?"
            let param = [
                "code", code,
                "incname", incname[code],
                "since", data[code][start_now][DATE] + "（" + (start_now+1) + "日目）",
                "elapsed", now - start_now,
                "market", market.toLocaleString("ja"),
                "unrealized_yen", unrealized_yen.toLocaleString("ja"),
                "unrealized_per", unrealized_per,
                "cash", cash.toLocaleString("ja"),
                "profit_yen", profit_yen.toLocaleString("ja"),
                "profit_per", profit_per,
                "holding", holding
            ]
            for (var i = 0; i < param.length; i += 2) {
                url += param[i] + "=" + param[i+1].toString() + "&"
            }
            nowpage = 2
            url = url.slice(0, -1)
            window.location.href = url
        }
    } else if (final_status == 1) {
        alert("データの末尾に到達したため、練習を終了します")
        let end_button = document.getElementById("end")
        let next_button = document.getElementById("next")
        let buy_button = document.getElementById("buy")
        let sell_button = document.getElementById("sell")
        end_button.textContent = "結果表示"
        next_button.disabled = true
        buy_button.disabled = true
        sell_button.disabled = true
        final_status = 2
        nowpage = 2
    }
}

/* マウス操作の設定 */
const wheel_threshold = 15
let zoom = 0
canvas.addEventListener("wheel", ()=>{
    event.preventDefault()
    zoom += event.deltaY
    abs_zoom = Math.abs(zoom)
    if (abs_zoom > wheel_threshold) {
        let resizevalue = 0
        if (zoom > 0) {
            resizevalue = Math.floor(zoom/wheel_threshold)
        } else {
            resizevalue = -Math.floor(abs_zoom/wheel_threshold)
        }
        zoom = 0
        resize(resizevalue)
    }
}, false)
let mmove = 0
canvas.addEventListener("mousemove", function (event) {
    
    var p = getmousep(event)
    var x = p.x - (candle_width/2+2.5)
    var y = p.y
    log_text.textContent = "　"
    focus_candle = Math.floor(x / (candle_width+candle_width/2))
    if (focus_candle * (candle_width+candle_width/2) + candle_width > x-1) { // 描画のズレってキライ！-1してるのはそれに対する応急処置です！
        if (since+focus_candle >= 0 && since+focus_candle < data[code].length) {
            tmp_date = data[code][since+focus_candle][DATE]
            tmp_log = tradelog[tmp_date]
            if (tmp_log != undefined && y-3 <= calc_tradelogy(tradelog[data[code][since + focus_candle][DATE]][2])) { // ここの-3も！！！！
                let logmessage = tmp_date
                if (tmp_log[0] > 0) {
                    logmessage += "　買：" + tmp_log[0]
                } else {
                    logmessage += "　売：" + -tmp_log[0]
                }
                logmessage += "　価格：" + tmp_log[1].toLocaleString("ja") + "円"
                log_text.textContent = logmessage
            }
        }
    }
    if (drag == false || event.buttons == 0) {
        drag = false
        return
    }
    deltax = (p.x - start_mousex)/(candle_width+candle_width/2)
    if (Math.abs(deltax) >= 1) {
        if (deltax > 0) {
            start_mousex += Math.floor(deltax*candle_width*1.5)
            // start_mousex = p.x - (Math.abs(deltax) - 1)
            moveplot(code, -Math.floor(Math.abs(deltax)))
        } else {
            start_mousex += -Math.floor(Math.abs(deltax*candle_width*1.5))
            // start_mousex = p.x + (Math.abs(deltax) - 1)
            moveplot(code, Math.floor(Math.abs(deltax)))
        }
    }
    
}, false)
const pinch_threshold = 5000 
let bepinch = -1
let pinch_value = -1
let double_flag = false
canvas.addEventListener("touchmove", function (event) {
    
    if (event.touches.length == 1 && double_flag == false) { 
        var p = gettouchp(event)
        if (drag == false || event.buttons == 0) {
            drag = false
            return
        }
        deltax = (p.x - start_mousex)/(candle_width+candle_width/2)
        if (Math.abs(deltax) >= 1) {
            if (deltax > 0) {
                start_mousex += Math.floor(deltax*candle_width*1.5)
                // start_mousex = p.x - (Math.abs(deltax) - 1)
                moveplot(code, -Math.floor(Math.abs(deltax)))
            } else {
                start_mousex += -Math.floor(Math.abs(deltax*candle_width*1.5))
                // start_mousex = p.x + (Math.abs(deltax) - 1)
                moveplot(code, Math.floor(Math.abs(deltax)))
            }
        }
    } else if (event.touches.length == 2) {
        event.preventDefault()
        pinch_value = getpinchs(event)
        if (bepinch == -1) {
            double_flag = true
            bepinch = pinch_value
            return
        } else {
            deltapinch = pinch_value - bepinch

            zoom += deltapinch
            bepinch = pinch_value
            abs_zoom = Math.abs(zoom)
            if (abs_zoom > pinch_threshold) {
                let resizevalue = 0
                if (zoom > 0) {
                    resizevalue = Math.floor(zoom/pinch_threshold)
                } else {
                    resizevalue = -Math.floor(abs_zoom/pinch_threshold)
                }
                zoom = 0
                resize(resizevalue)
            }
        }
    }
}, false)
let drag = false
let start_mousex
canvas.addEventListener("mousedown", function(event) {
    start_mousex = getmousep(event).x
    drag = true
}, false)
canvas.addEventListener("touchstart", function(event) {
    start_mousex = gettouchp(event).x
    bepinch = -1
    double_flag = false
    drag = true
    var p = gettouchp(event)
    var x = p.x - (candle_width/2+2.5)
    var y = p.y
    log_text.textContent = "　"
    focus_candle = Math.floor(x / (candle_width+candle_width/2))
    if (focus_candle * (candle_width+candle_width/2) + candle_width > x-1) { // 描画のズレってキライ！-1してるのはそれに対する応急処置です！
        if (since+focus_candle >= 0 && since+focus_candle < data[code].length) {
            tmp_date = data[code][since+focus_candle][DATE]
            tmp_log = tradelog[tmp_date]
            if (tmp_log != undefined && y-3 <= calc_tradelogy(tradelog[data[code][since + focus_candle][DATE]][2])) { // ここの-3も！！！！
                let logmessage = tmp_date
                if (tmp_log[0] > 0) {
                    logmessage += "　買：" + tmp_log[0]
                } else {
                    logmessage += "　売：" + -tmp_log[0]
                }
                logmessage += "　価格：" + tmp_log[1].toLocaleString("ja") + "円"
                log_text.textContent = logmessage
            }
        }
    }
}, false)
function getmousep(event) {
    var rect = canvas.getBoundingClientRect()
    x = event.clientX - rect.left
    y = event.clientY - rect.top
    return {
        x: x,
        y: y
    }
}
function gettouchp(event) {
    var rect = canvas.getBoundingClientRect()
    x = event.touches[0].pageX - rect.left
    y = event.touches[0].pageY - rect.top 
    return {
        x: x,
        y: y
    }
}
function getpinchs(event) {
    var rect = canvas.getBoundingClientRect()
    x1 = event.touches[0].pageX - rect.left
    y1 = event.touches[0].pageY - rect.top 
    x2 = event.touches[1].pageX - rect.left
    y2 = event.touches[1].pageY - rect.left
    return Math.abs(x1 - x2) * Math.abs(y1 - y2)
}

window.onbeforeunload = function(event){
    if (nowpage == TRAINING){
      event.returnValue = "ページを移動すると練習中のデータは破棄されます。よろしいですか？"
    }
}


/* 使用データの設定 */
const data = {}
const incname = {}
let average = {
    "default" : {},
}
const averageday = {
    "default" : [5, 20, 60, 100, 300],
}
const averagecolor = {
    "default" : ["red", "blue", "green", "orange", "black"],
}
let average_flag = true
let average_flags = {
    5 : true,
    20 : true,
    60 : true,
    100 : false,
    300 : false,
}
let bollinger_bands_map = {
    "default" : {},
}
const bollinger_bands_color = {
    "default" : ["rgba(0, 255, 127, 0.25)", "rgba(244, 164, 96, 0.25)", "rgba(135, 206, 235, 0.25)"]
    // springgreen, sandybrown, skyblue
}
let bollinger_bands_flag = true
let bollinger_bands_flags = {
    1 : true,
    2 : true,
    3 : false,
}
let start_now
let since
let period = START_PERIOD
let now
let buysell = 0
let holding = 0
let market = 0
let cash = START_CASH
let code = 0
let candle_width = START_CANDLE_WIDTH
let purchase_price = 0
let unrealized_yen = 0
let unrealized_per = 0
let profit_yen = 0
let profit_per = 0
let final_status = 0
let tradelog = {}
let error_message = ""

function train() {
    start_now = since
    try {
        start_now = Number(start_now)-1
    } catch (error) {
        start_now = NaN
    }
    now = start_now
    since = start_now - START_PERIOD
    if (0 > since) {
        since = 0
    }
    
    /* 指標の設定 */
    /* 移動平均線 */
    for (var i = 0; i < averageday["default"].length; i++) {
        gen_average(data[code], averageday["default"][i], average["default"])
    }

    /* ボリンジャーバンド */
    gen_bollinger_bands(data[code], 20, bollinger_bands_map["default"])
    if (period + since > now) {
        period = now - since
        resize(period - START_PERIOD)
    }
    inc_text.textContent = code + " " + incname[code] + " " + data[code][start_now][DATE] + "（" + start_now + "日目）" + "〜"
    date_text.textContent = 1 + "日目 " + data[code][now][DATE]
    cash_text.textContent = "現金残高：" + cash.toLocaleString("ja")+"円"
    plot(data[code], since, since+60, "default")
}