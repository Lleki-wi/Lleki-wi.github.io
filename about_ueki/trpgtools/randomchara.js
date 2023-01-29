const INIT_SKILLS = {
    "居合": 1, "言いくるめ": 5, "医学": 5, "運転（任意）": 20, "応急手当": 30, "オカルト": 5, "回避": "DEX*2", "化学": 1, "鍵開け": 1, "隠す": 15, "隠れる": 10, "かばう": "DEX*3", "外国語（英語）": "EDU*2", "外国語（任意）": 1, "機械修理": 20, "聞き耳": 25, "キック": 25, "組み付き": 25, "芸術（任意）": 5, "経理": 10, "拳銃": 20, "考古学": 1, "こぶし": 50,  "コンピュータ": 1, "サバイバル（任意）": 10, "サブマシンガン": 15, "忍び歩き": 10, "写真術": 10, "ショットガン": 30, "信用": 15, "心理学": 5, "重機械操作": 1, "乗馬": 5, "人類学": 1, "水泳": 25, "頭突き": 10, "製作（任意）": 5, "精神分析": 1, "生物学": 1, "説得": 15, "操縦（任意）": 1, "地質学": 1, "跳躍": 25, "追跡": 10, "杖": 25, "天文学": 1, "電気修理": 10, "電子工学": 1, "投擲": 25, "登攀": 40, "図書館": 25, "ナイフ": 25, "ナビゲート": 10, "日本刀": 15, "値切り": 5, "博物学": 10, "物理学": 1, "変装": 1, "法律": 5, "母国語": "EDU*5", "棒": 25, "マーシャルアーツ": 1, "マシンガン": 15, "目星": 25, "薬学": 1, "弓": 10, "ライフル": 25, "歴史": 20,
}
let SKILLS = {}
 
const TENDENCYKIT = {
    "回復系": [
        ["医学", "精神分析", "心理学"],
        ["医学", "図書館", "薬学"],
        ["薬学", "化学", "図書館"],
        ["応急手当", "博物学"]
    ],

    "戦闘系": [
        ["キック", "マーシャルアーツ", "回避"],
        ["組み付き", "棒", "かばう"],
        ["ナイフ", "拳銃", "応急手当", "かばう"],
        ["投擲", "こぶし", "マーシャルアーツ"],
        ["日本刀", "居合"]
    ],

    "対人系": [
        ["言いくるめ", "信用", "心理学"],
        ["説得", "心理学", "精神分析", "人類学"],
        ["外国語（英語）", "信用", "変装"],
    ],

    "探索系": [
        ["目星", "聞き耳", "図書館"],
        ["目星", "言いくるめ", "応急手当"],
        ["目星", "聞き耳", "鍵開け", "写真術"],
        ["オカルト", "図書館", "隠れる"],
        ["博物学", "追跡", "目星", "忍び歩き"]
    ],

    "ソロ探索者": [
        ["目星", "こぶし", "心理学", "応急手当", "回避"],
        ["目星", "聞き耳", "こぶし", "信用", "精神分析"],
        ["目星", "図書館", "オカルト", "組み付き", "応急手当"],
        ["目星", "拳銃", "回避"],
        ["目星", "聞き耳", "図書館", "キック", "説得"]
    ]
}
let TENDENCYTYPE = ["なし"]; for (var k in TENDENCYKIT) { TENDENCYTYPE.push(k) }
const STATUS_ROLL = {
    "STR": "3D6",
    "CON": "3D6",
    "DEX": "3D6",
    "APP": "3D6",
    "POW": "3D6",
    "SIZ": "2D6+6",
    "INT": "2D6+6",
    "EDU": "3D6+3",
    "INC": "3D6"
}
const DEPEND_STATUS = {
    "HP": "(CON+SIZ+0.5)//2",
    "MP": "POW*1",
    "SAN": "POW*5",
    "DB": "set_db(STR+SIZ)",
    "幸運": "POW*5",
    "アイディア": "INT*5",
    "知識": "EDU*5"
}
const DBTABLE = [
    [1, "生きてない！！！"],
    [12, "-1D6"],
    [16, "-1D4"],
    [24, "0"],
    [32, "+1D4"],
    [40, "+1D6"],
    [56, "+2D6"],
    [72, "+3D6"]
]
const INCTABLE = {
    3: 150,
    4: 200,
    5: 250,
    6: 300,
    7: 350,
    8: 400,
    9: 450,
    10: 500,
    11: 600,
    12: 700,
    13: 800,
    14: 900,
    15: 1000,
    16: 2000,
    17: 3000,
    18: 5000,
}
const OCCUPATIONS = {
    "医者": ["医学 応急手当 経理 信用 生物学 説得 薬学 外国語（英語/ラテン語/ドイツ語）"],
    "エンジニア": ["機械修理 コンピュータ 重機械操作 電気修理 図書館 物理学 外国語（英語）", 1, "化学 地質学 電子工学"],
    "狂信者": ["隠す 隠れる 心理学 説得 図書館 外国語（英語/任意）", 2, "化学 こぶし ショットガン 電気修理 法律 薬学 ライフル"],
    "警察官": ["言いくるめ 聞き耳 心理学 説得 追跡 法律 目星", 1, "組み付き 拳銃 杖 日本刀 マーシャルアーツ"],
    "芸術家": ["言いくるめ 芸術（任意） コンピュータ 写真術 心理学 製作（任意） 目星 歴史"],
    "古物研究家": ["芸術（任意） 製作（古物修復） 図書館 値切り 外国語（英語/漢文/ラテン語） 目星 歴史", 1, "コンピュータ 母国語"],
    "作家": ["オカルト 芸術（文学） 心理学 説得 図書館 母国語 歴史", 1, "外国語（任意） 博物学"],
    "自衛官": ["運転（自動車） 応急手当 機械修理 重機械操作 操縦（任意） ナビゲート", 2, "回避 外国語（英語） 隠れる 聞き耳 キック 組み付き 経理 拳銃 こぶし サブマシンガン 忍び歩き 信用 説得 値切り 法律 マーシャルアーツ ライフル"],
    "ジャーナリスト": ["言いくるめ 写真術 心理学 説得 図書館 母国語 外国語（英語） 歴史"],
    "宗教家": ["オカルト 聞き耳 経理 心理学 説得 図書館 歴史", 1, "言いくるめ 外国語（漢文/ラテン語） 信用"],
    "心理学者": ["言いくるめ 医学 信用 心理学 人類学 説得 図書館", 1, "値切り 目星"],
    "スポーツ選手": ["回避 芸術（任意のスポーツ） 跳躍 投擲 登攀", 3, "応急手当 キック こぶし 拳銃 ショットガン 乗馬 水泳 杖 日本刀 弓 ライフル"],
    "探偵": ["言いくるめ 鍵開け 心理学 追跡 図書館 法律 目星", 1, "聞き耳 こぶし 写真術 値切り"],
    "大学教授": ["心理学 説得 図書館 値切り 外国語（任意）", 2, "医学 化学 外国語（任意） 考古学 人類学 生物学 地質学 天文学 電子工学 博物学 物理学 法律 歴史"],
    "超心理学者": ["オカルト 人類学 写真術 心理学 精神分析 図書館 外国語（英語/ラテン語/任意） 歴史"],
    "放浪者": ["言いくるめ 隠れる 聞き耳 忍び歩き 心理学 値切り 目星", 1, "運転（自動車/二輪車） 外国語（英語） 芸術（任意）"],
    "暴力団組員": ["言いくるめ 隠す 心理学 値切り 目星", 3, "隠れる キック 組み付き 拳銃 こぶし ナイフ 日本刀 マーシャルアーツ"],
    "メンタルセラピスト": ["言いくるめ 外国語（英語） 芸術（任意）信用 心理学 精神分析 説得 法律"]
}
const BIASES = {
    "弱い":
    [[
        [1, 20, 1],
        [2, 0, true],
    ],[
        1, 1, 0, false
    ],[
        [1, 2, 5],
        [1, 5, 5, true],
        [2, 2, false],
        [1, 1, 10],
        [2, 0, true]
    ],[
        2, 1, 0, true
    ]],

    "普通":
    [[
        [1, 2, 20],
        [2, 1.5, false],
        [1, 2, 10],
        [2, 5, false],
        [1, 1, 5],
        [2, 8, true],
    ],[
        1, 1, 0, true
    ],[
        [1, 1, 20],
        [1, 1, 20, true],
        [2, 2, true],
        [1, 1, 7],
        [2, 0, true],
    ],[
        1, 1, 0, false
    ]],

    "強い":
    [[
        [1, 1, 40],
        [2, 2, false],
        [1, 1, 30],
        [2, 0, false],
        [1, 1, 1],
        [2, 0, false],
    ],[ 
        1, 1, 0, false
    ],[
        [1, 1, 40],
        [1, 1, 40, true],
        [2, 0, false],
        [1, 1, 30],
        [1, 1, 30, true],
        [2, 0, true],
        [1, 1, 1, true],
        [2, 0, false],
        [1, 1, 1],
        [2, 0, false]
    ],[
        1, 1, 0, false
    ]]
}
let BIASESTYPE = []; for (var k in BIASES) { BIASESTYPE.push(k) }

let global_retracted_skill = {
    "回避": "DEX*2", "かばう": "DEX*3"
}
let global_status = {
    "STR": 0,
    "CON": 0,
    "DEX": 0,
    "APP": 0,
    "POW": 0,
    "SIZ": 0,
    "INT": 0,
    "EDU": 0,
    "INC": 0,
    "年収": 0,
    "財産": 0
}
let global_depend_skill = {
    "HP": 0,
    "MP": 0,
    "SAN": 0,
    "DB": 0,
    "幸運": 0,
    "アイディア": 0,
    "知識": 0
}
let global_number = 1
let global_priority = {}
function init() {
    SKILLS = Object.assign({}, INIT_SKILLS)
    let recommend_box = document.getElementById("recommend")
    for (var k in SKILLS) {
        var element = document.createElement("option")
        element.value = k
        element.textContent = k
        recommend_box.appendChild(element)
    }
    document.getElementById("append_rec").disabled = false
    let semirecommend_box = document.getElementById("semirecommend")
    for (var k in SKILLS) {
        var element = document.createElement("option")
        element.value = k
        element.textContent = k
        semirecommend_box.appendChild(element)
    }
    document.getElementById("append_semirec").disabled = false

    able_skill("かばう", false)

    let occu_list = document.getElementById("occupation")
    for (var k in OCCUPATIONS) {
        var element = document.createElement("option")
        element.value = k
        element.textContent = k
        occu_list.appendChild(element)
    }
    var tmp_list = document.getElementById("acqskill_listblock")
    tmp_list.appendChild(document.createTextNode("職業技能"))
    var br = document.createElement("br")
    br.className = "widebr"
    tmp_list.appendChild(br)
    tmp_list.appendChild(document.createTextNode("趣味技能"))
    for (var i = 0; i < 16; i++) {
        var br = document.createElement("br")
        br.className = "morenarrowbr"
        tmp_list.appendChild(br)
        var element = document.createElement("input")
        element.type = "text"
        element.className = "widebox"
        element.disabled = true
        element.value = "-"
        tmp_list.appendChild(element)
        tmp_list.appendChild(document.createTextNode(" "))
        var point_element = document.createElement("input")
        point_element.type = "text"
        point_element.className = "input_max"
        point_element.disabled = true
        point_element.value = "-"
        tmp_list.appendChild(point_element)
        tmp_list.appendChild(document.createTextNode("　"))
        for (var j = 0; j < 3; j++) {
            var formula_element = document.createElement("input")
            formula_element.type = "text"
            formula_element.className = "formula_elem"
            formula_element.disabled = true
            formula_element.value = "-"
            tmp_list.appendChild(formula_element)
            tmp_list.appendChild(document.createTextNode(" "))
        }
    }
    document.getElementById("generate").disabled = false
}
init()

/* ジェネラル便利関数 */
function getrandom(n = 1) {
    return Math.floor(Math.random() * n)
}

function random_per(a, n = false) {
    if (n == false || n > a.length) {
        n = a.length
    }
    let indexlist = []
    let result = []
    for (var i = 0; i < a.length; i++) {
        indexlist.push(i)
    }
    for (var i = 0; i < n; i++) {
        tmp_random = getrandom(indexlist.length)
        tmp = indexlist[tmp_random]
        indexlist[tmp_random] = indexlist[indexlist.length - 1]
        indexlist[indexlist.length - 1] = tmp
        result.push(a[indexlist.pop()])
    }

    return result
}

function allremove(a, s, t = []) {
    let end_i = a.length - 1
    let scount = 0
    for (var i = 0; i <= end_i; i++) {
        if (a[i] == s) {
            tmp = a[end_i]
            a[end_i] = a[i]
            a[i] = tmp
            end_i--
            i--
            scount++
        }
    }
    for (var i = 0; i < scount; i++) {
        t.push(a.pop())
    }

    return
}

function printmap(a, s) {
    console.log("↓" + s)
    for (var k in a) {
        console.log(k, a[k])
    }
    console.log("↑" + s)
}

/* スペシャル便利関数 */
function calc_dependstatus(s, ex_flag = false) {
    if (isNaN(Number(s))) {
        var tmp_list = s.split("*")
        tmp_list.push(1)
        if (isNaN(Number(tmp_list[1]))) {
            var tmp = tmp_list[0]
            tmp_list[0] = tmp_list[1]
            tmp_list[1] = tmp
        }
        if (tmp_list[0] == "年収" || tmp_list[0] == "財産") {
            return NaN
        }
        var n = tmp_list[0].toUpperCase()
        var m = Number(tmp_list[1])
        if (ex_flag == true) {
            if (isNaN(global_status[n] * m) == false) {
                return n + "*" + m
            } else {
                return NaN
            }
        }
        return global_status[n] * m
    }

    return Number(s)
}

function diceroll(s) {
    let roll = s.split("+")[0]
    let n = Number(roll.split("D")[0])
    let m = Number(roll.split("D")[1])
    let result = 0
    if (s.split("+").length == 2) {
        result += Number(s.split("+")[1])
    }
    for (var i = 0; i < n; i++) {
        result += getrandom(m) + 1
    }

    return result
}

function get_init(s) {
    if (global_exskill[s] == true) {
        return calc_dependstatus(SKILLS[s])
    }
    if (s.split("（").length == 2) {
        tmp_list = s.split("（")
        if (tmp_list[0] == "外国語") {
            if (tmp_list[1].slice(0, -1) == "英語") {
                return calc_dependstatus(SKILLS[s])
            } else {
                return 1
            }
        } else {
            return calc_dependstatus(SKILLS[tmp_list[0] + "（任意）"])
        }
    } else {
        return calc_dependstatus(SKILLS[s])
    }
}

/* 初期設定関数 */
function reset_globalvals() {
    global_eng_flag = false
    global_priority = {}
    global_dup_map = {}
    global_number_map = {}
    global_occupation_skill = {}
}

function set_tendency(s) {
    if (s == "ランダム") {
        s = TENDENCYTYPE[getrandom(TENDENCYTYPE.length)]
    }
    if (s == "なし") {
        return ""
    }
    for (var i of TENDENCYKIT[s][getrandom(TENDENCYKIT[s].length)]) {
        global_priority[i] = 1
    }
    return s
}

function set_db(n) {
    for (var i of DBTABLE) {
        if (n <= i[0]) {
            global_status["DB"] = i[1]
        }
    }
    global_status["DB"] = "X"
}

function set_incpro() {
    var tmp = INCTABLE[global_status.INC]
    if (tmp == undefined) {
        global_status["年収"] = "X"
        global_status["財産"] = "X"
    } else {
        if (tmp == 150) {
            global_status["年収"] = "150万円以下"
            global_status["財産"] = "750万円以下"
        } else if (tmp == 5000) {
            global_status["年収"] = "5000万円以上"
            global_status["財産"] = "2億5000万円以上"
        } else {
            global_status["年収"] = tmp + "万円"
            var tmp_hi = Math.floor(tmp * 5 / 10000)
            var tmp_lo = tmp * 5 % 10000
            if (tmp_hi == 0) {
                tmp_hi = ""
            } else {
                tmp_hi += "億"
            }
            if (tmp_lo == 0) {
                tmp_lo = ""
            } else {
                tmp_lo += "万"
            }
            global_status["財産"] = tmp_hi + tmp_lo + "円"
        }
    }
}

/* 設定用関数 */
let global_recommend_skill = {}
function append_rec() {
    var new_rec = document.getElementById("recommend").value
    if (global_recommend_skill[new_rec] == true) {
        return
    }
    if (global_semirecommend_skill[new_rec] == true) {
        alert("この技能は準推奨技能に設定されているため、追加できません")
        return
    }
    global_recommend_skill[new_rec] = true
    let rec_list = document.getElementById("rec_list")
    var tmp_block = document.createElement("div")
    tmp_block.id = "_rec_" + new_rec
    var br = document.createElement("br")
    br.className = "narrowbr"
    tmp_block.appendChild(br)
    var element = document.createElement("input")
    element.type = "text"
    element.className = "widebox"
    element.disabled = true
    element.value = new_rec
    tmp_block.appendChild(element)
    tmp_block.appendChild(document.createTextNode("　"))
    var delelement = document.createElement("button")
    delelement.id = "recdel_" + new_rec
    delelement.className = "control"
    delelement.setAttribute("onclick", "delete_rec(this)")
    delelement.textContent = "削除"
    tmp_block.appendChild(delelement)
    rec_list.appendChild(tmp_block)
}

function delete_rec(element) {
    var recskill = element.id.slice(7)
    document.getElementById("_rec_" + recskill).remove()
    global_recommend_skill[recskill] = false
}

let global_semirecommend_skill = {}
function append_semirec() {
    var new_rec = document.getElementById("semirecommend").value
    if (global_semirecommend_skill[new_rec] == true) {
        return
    }
    if (global_recommend_skill[new_rec] == true) {
        alert("この技能は推奨技能に設定されているため、追加できません")
        return
    }
    global_semirecommend_skill[new_rec] = true
    let rec_list = document.getElementById("semirec_list")
    var tmp_block = document.createElement("div")
    tmp_block.id = "_semirec_" + new_rec
    var br = document.createElement("br")
    br.className = "narrowbr"
    tmp_block.appendChild(br)
    var element = document.createElement("input")
    element.type = "text"
    element.className = "widebox"
    element.disabled = true
    element.value = new_rec
    tmp_block.appendChild(element)
    tmp_block.appendChild(document.createTextNode("　"))
    var delelement = document.createElement("button")
    delelement.id = "semirecdel_" + new_rec
    delelement.className = "control"
    delelement.setAttribute("onclick", "delete_semirec(this)")
    delelement.textContent = "削除"
    tmp_block.appendChild(delelement)
    rec_list.appendChild(tmp_block)
}

function delete_semirec(element) {
    var recskill = element.id.slice(11)
    document.getElementById("_semirec_" + recskill).remove()
    global_semirecommend_skill[recskill] = false
}

function set_recommend() {
    for (var k in global_recommend_skill) {
        global_priority[k] = 2
    }
    for (var k in global_semirecommend_skill) {
        global_priority[k] = 1
    }
}

let global_exskill = {}
function append_exskill() {
    var new_ex = document.getElementById("exskill").value
    var init_probab = document.getElementById("exskill_init").value
    if (new_ex == "" || init_probab == "") {
        return
    }
    new_ex = new_ex.replace(/\(/g, "（").replace(/\)/g, "）").replace(/　/g, " ").replace(/＿/g, " ")
    var tmp_errormessage = ""
    if (new_ex.match(" ") || new_ex.match("_")) {
        tmp_errormessage += "技能名に "
        if (new_ex.match(" ")) {
            tmp_errormessage += "スペース"
            if (new_ex.match("_")) {
                tmp_errormessage += ", "
            }
        }
        if (new_ex.match("_")) {
            tmp_errormessage += "アンダーバー"
        }
        tmp_errormessage += " は使用できません"
    }
    var tmp_pare_flag = 0
    for (var i of new_ex) {
        if (i == "（") {
            if (tmp_pare_flag == 0) {
                tmp_pare_flag = 1
            } else {
                tmp_pare_flag = 3
                break
            }
        } else if (i == "）") {
            if (tmp_pare_flag == 1) {
                tmp_pare_flag = 2
            } else {
                tmp_pare_flag = 3
                break
            }
        }
    }
    if (tmp_pare_flag == 1 || tmp_pare_flag == 3) {
        if (tmp_errormessage != "") {
            tmp_errormessage += "\n\n"
        }
        tmp_errormessage += "括弧を使う場合、1組のみかつ正しく閉じて下さい"
    }
    if (SKILLS[new_ex] != undefined || global_exskill[new_ex] == true) {
        alert("既に " + new_ex + " 技能は存在します")
        return
    }
    var tmp = Number(init_probab)
    if (isNaN(calc_dependstatus(init_probab)) || tmp < 1 || tmp > 99) {
        if (tmp_errormessage != "") {
            tmp_errormessage += "\n\n"
        }
        tmp_errormessage += "初期値が不正です\n1〜99の半角数字または\nステータスと定数を乗算する式を入力して下さい"
    }
    if (isNaN(Number(init_probab)) == false) {
        init_probab = Number(init_probab)
    } else {
        init_probab = calc_dependstatus(init_probab, ex_flag = true)
    }

    if (tmp_errormessage != "") {
        alert(tmp_errormessage)
        return
    }
    global_exskill[new_ex] = true
    let exskill_list = document.getElementById("exskill_list")
    var tmp_block = document.createElement("div")
    tmp_block.id = "_exskill_" + new_ex
    var br = document.createElement("br")
    br.className = "narrowbr"
    tmp_block.appendChild(br)
    var element = document.createElement("input")
    element.type = "text"
    element.className = "widebox"
    element.disabled = true
    element.value = new_ex
    tmp_block.appendChild(element)
    tmp_block.appendChild(document.createTextNode(" "))
    var initp_element = document.createElement("input")
    initp_element.type = "text"
    initp_element.id = "exskillip_" + new_ex
    initp_element.className = "input_max"
    initp_element.value = init_probab
    initp_element.setAttribute("onChange", "change_exinit(this)")
    tmp_block.appendChild(initp_element)
    tmp_block.appendChild(document.createTextNode(" "))
    var delelement = document.createElement("button")
    delelement.id = "exskilldel_" + new_ex
    delelement.className = "control"
    delelement.setAttribute("onclick", "delete_exskill(this)")
    delelement.textContent = "削除"
    tmp_block.appendChild(delelement)
    exskill_list.appendChild(tmp_block)
    SKILLS[new_ex] = init_probab
    document.getElementById("exskill").value = ""
    document.getElementById("exskill_init").value = ""

    let recommend_box = document.getElementById("recommend")
    var element = document.createElement("option")
    element.id = "exrec_" + new_ex
    element.value = new_ex
    element.textContent = new_ex
    recommend_box.appendChild(element)
    let semirecommend_box = document.getElementById("semirecommend")
    var element = document.createElement("option")
    element.id = "exsemirec_" + new_ex
    element.value = new_ex
    element.textContent = new_ex
    semirecommend_box.appendChild(element)
}

function delete_exskill(element) {
    var exskill = element.id.slice(11)
    if (global_recommend_skill[exskill] == true) {
        alert("この技能は推奨技能に設定されているため、削除できません")
        return
    }
    if (global_semirecommend_skill[exskill] == true) {
        alert("この技能は準推奨技能に設定されているため、削除できません")
        return
    }
    document.getElementById("_exskill_" + exskill).remove()
    global_exskill[exskill] = false
    document.getElementById("exrec_" + exskill).remove()
    document.getElementById("exsemirec_" + exskill).remove()
    delete SKILLS[exskill]
}

function change_exinit(element) {
    var exskill = element.id.slice(10)
    var init_probab = element.value
    var tmp = Number(init_probab)
    if (isNaN(calc_dependstatus(init_probab)) || tmp < 1 || tmp > 99) {
        alert("初期値が不正です\n1〜99の半角数字または\nステータスと定数を乗算する式を入力して下さい")
        element.value = SKILLS[exskill]
        return
    }
    if (isNaN(Number(init_probab)) == false) {
        init_probab = Number(init_probab)
    } else {
        init_probab = calc_dependstatus(init_probab, ex_flag = true)
    }
    SKILLS[exskill] = element.value
}

function able_skill(skill, flag) {
    if (SKILLS[skill] == undefined) {
        return
    }
    if (global_retracted_skill[skill] == undefined) {
        global_retracted_skill[skill] = SKILLS[skill]
    }

    if (flag == true) {
        SKILLS[skill] = global_retracted_skill[skill]
    } else {
        SKILLS[skill] = 100
    }
}

/* 生成用関数 */
function max_sieve(s, max_point) {
    for (var i = 0; i < s.length; i++) {
        if (get_init(s[i]) >= max_point) {
            var tmp = s[i]
            s[i] = s[s.length - 1]
            s[s.length - 1] = s[i]
            i--
            s.pop()
        }
    }
}

let global_eng_flag = false
function english_alloc(s, max_point) {
    if (global_eng_flag == true) {
        return
    }
    if (max_point <= global_status.EDU * 2) {
        return
    }
    for (var i of s) {
        if (i == "外国語（英語）") {
            global_eng_flag = true
            return
        }
    }

    for (var i = 0; i < s.length; i++) {
        if (s[i] == "外国語（任意）" && getrandom(3) == 0) {
            global_eng_flag = true
            s[i] = "外国語（英語）"
            return
        }
    }
    return
}

let global_dup_map = {}
let global_number_map = {}
function dup_numbering(a, hobbyflag = false) {
    for (var i = 0; i < a.length; i++) {
        if (global_dup_map[a[i]] == undefined) {
            global_dup_map[a[i]] = 1
            global_number_map[a[i]] = 0
        } else {
            global_dup_map[a[i]] = 2
        }
    }
    for (var i = 0; i < a.length; i++) {
        if ((hobbyflag == false && global_dup_map[a[i]] == 2) || a[i].slice(-4) == "（任意）") {
            global_number_map[a[i]] += 1
            a[i] += "_" + global_number_map[a[i]]
        }
    }
}

function slash_parser(s) {
    let select = s.split("（")
    let result = [select[0]]
    if (select.length == 1) {
        return result
    }
    select[1] = select[1].slice(0, -1).split("/")
    result.push([])
    for (var i of select[1]) {
        result[1].push(select[0] + "（" + i + "）")
    }

    return result
}

function skill_parser(s, max_point, hobbyflag = false) {
    let choices = []
    let basic_skill = s[0].split(" ")
    if (s[0] != "") {
        for (var i of basic_skill) {
            parsed_skill = slash_parser(i)
            if (parsed_skill.length == 1) {
                choices.push(parsed_skill[0])
            } else {
                for (var j of parsed_skill[1]) {
                    choices.push(j)
                }
            }
        }
    }
    if (s.length == 1) {
        english_alloc(choices, max_point)
        max_sieve(choices, max_point)
        dup_numbering(choices)
        return choices
    } else {
        let unbasic_choices = []
        let unbasic_skill = s[2].split(" ")
        for (var i of unbasic_skill) {
            parsed_skill = slash_parser(i)
            if (parsed_skill.length == 1) {
                unbasic_choices.push(parsed_skill[0])
            } else {
                for (var j of parsed_skill[1]) {
                    unbasic_choices.push(j)
                }
            }
        }
        let choice_index = []
        for (var i = 0; i < unbasic_choices.length; i++) {
            choice_index.push(i)
            if (hobbyflag == true && global_priority[unbasic_choices[i]] != undefined) {
                for (var j = 0; j < global_priority[unbasic_choices[i]] * unbasic_choices.length; j++) {
                    choice_index.push(i)
                }
            }
        }
        for (var i = 0; i < s[1]; i++) {
            if (choice_index.length == 0) {
                break
            }
            var tmp_random = getrandom(choice_index.length)
            if (global_occupation_skill[unbasic_choices[choice_index[tmp_random]]] == true) {
                if (get_init(unbasic_choices[choice_index[tmp_random]]) >= global_occupation_max_point) {
                    allremove(choice_index, choice_index[tmp_random])
                    i--
                    continue
                }
            } else {
                if (get_init(unbasic_choices[choice_index[tmp_random]]) >= max_point) {
                    allremove(choice_index, choice_index[tmp_random])
                    i--
                    continue
                }
            }
            if (unbasic_choices[choice_index[tmp_random]].slice(-4) == "（任意）") {
                choices.push(unbasic_choices[choice_index[tmp_random]])
            } else {
                choices.push(unbasic_choices[choice_index[tmp_random]])
                allremove(choice_index, choice_index[tmp_random])
            }
        }
        english_alloc(choices, max_point)
        max_sieve(choices, max_point)
        dup_numbering(choices, hobbyflag)
        return choices
    }
}

/* 生成！関数 */
let global_occupation_skill = {}
let global_occupation_max_point = 0
let global_hobby_max_point = 0
function generation() {
    console.log("")
    reset_globalvals()
    let result_area = document.getElementById("result")
    let occupation = document.getElementById("occupation").value
    if (occupation == "ランダム") {
        var tmp_len = 0
        for (var k in OCCUPATIONS) {
            tmp_len++
        }
        var tmp_random = getrandom(tmp_len)
        var i = 0
        for (var k in OCCUPATIONS) {
            if (i == tmp_random) {
                occupation = k
                break
            }
            i++
        }
    }
    let tendency = document.getElementById("tendency").value
    tendency = set_tendency(tendency)
    set_recommend()
    for (var k in STATUS_ROLL) {
        global_status[k] = diceroll(STATUS_ROLL[k])
    }
    set_incpro()
    for (var k in DEPEND_STATUS) {
        if (k.match("DB")) {
            set_db(global_status.STR + global_status.SIZ)
        } else if (k.match("HP")) {
            global_depend_skill[k] = Math.floor((global_status.CON + global_status.SIZ) / 2 + 0.5)
        } else {
            global_depend_skill[k] = calc_dependstatus(DEPEND_STATUS[k])
        }
    }
    let hobby_p = global_status.INT * 10
    let init_hobby_p = hobby_p
    let occupation_p = global_status.EDU * 20
    let init_occupation_p = occupation_p
    let occupation_max_point = document.getElementById("occu_max").value
    var tmp_errormessage = ""
    if (occupation_max_point == "") {
        occupation_max_point = 85
    }
    if (isNaN(Number(occupation_max_point)) || Number(occupation_max_point) < 1 || Number(occupation_max_point) > 99) {
        tmp_errormessage += "最大職業技能値"
    }
    let hobby_max_point = document.getElementById("hobby_max").value
    if (hobby_max_point == "") {
        hobby_max_point = 70
    }
    if (isNaN(Number(hobby_max_point)) || Number(hobby_max_point) < 1 || Number(hobby_max_point) > 99) {
        if (tmp_errormessage != "") {
            tmp_errormessage += "・"
        }
        tmp_errormessage += "最大趣味技能値"
    }
    if (tmp_errormessage != "") {
        alert(tmp_errormessage + "が不正です\n1〜99の半角数字を入力して下さい")
        return
    }
    let biasname = document.getElementById("bias").value
    if (biasname == "ランダム") {
        biasname = BIASESTYPE[getrandom(BIASESTYPE.length)]
    }
    let bias = BIASES[biasname]
    global_occupation_max_point = occupation_max_point
    global_hobby_max_point = hobby_max_point
    let raw_occupation_skill = skill_parser(OCCUPATIONS[occupation], occupation_max_point)
    let skill = {}
    let init_skill = {}

    function tmp_parser(skill_list) {
        for (var i of skill_list) {
            var number = ""
            if (i.split("_").length == 2) {
                number = "_" + i.split("_")[1]
                i = i.split("_")[0]
            }
            if (skill[i + number] == undefined) {
                skill[i + number] = get_init(i)
                init_skill[i + number] = skill[i + number]
            }
        }
    }
    tmp_parser(raw_occupation_skill)
    for (var k in skill) {
        global_occupation_skill[k] = true
    }
    /* 職業技能ポイントの振り分け */
    var tmp_list = []
    for (var i = 0; i < raw_occupation_skill.length; i++) { tmp_list.push(i) }
    let occupation_skill = []
    let occupation_priority = []
    if (raw_occupation_skill.length > 0) {
        occupation_priority = random_per(tmp_list, tmp_list.length)
        function dist_occu() {
            var tmp_count = -1
            function tmp_pusher(n, m) {
                for (var i = 0; i < n; i++) {
                    tmp_count++
                    tmp_count %= occupation_priority.length
                    for (var j = 0; j < m; j++) {
                        occupation_skill.push(raw_occupation_skill[occupation_priority[tmp_count]])
                    }
                }
            }
            function tmp_disto(n, round_flag = false) {
                var tmp_dist
                var tmp_random
                var tmp_skill
                if (n == 0) {
                    var to = 0
                } else {
                    var to = Math.floor(init_occupation_p / n + 1)
                }
                for (false; to < occupation_p; occupation_p--) {
                    if (occupation_skill.length == 0) {
                        break
                    }
                    if (tmp_prioritized_skill.length == 0 || getrandom(2) == 0) {
                        tmp_random = getrandom(occupation_skill.length)
                        tmp_skill = occupation_skill[tmp_random]
                        if (round_flag == true) {
                            tmp_dist = 5 - skill[tmp_skill] % 5
                            if (getrandom(3) != 0) {
                                tmp_dist = getrandom(5) + 1
                            }
                            if (tmp_dist > occupation_p) {
                                tmp_dist = 1
                            }
                        } else {
                            tmp_dist = 1
                        }
                        skill[tmp_skill] += tmp_dist
                        occupation_p -= (tmp_dist - 1)
                        if (skill[tmp_skill] > occupation_max_point) {
                            var tmp_diff = skill[tmp_skill] - occupation_max_point
                            skill[tmp_skill] -= tmp_diff
                            occupation_p += tmp_diff
                            allremove(occupation_skill, tmp_skill)
                        }
                        if (occupation_p <= to) {
                            var tmp_ex = Math.abs(occupation_p - to - 1)
                            skill[tmp_skill] -= tmp_ex
                            occupation_p = to + 1
                        }
                    } else {
                        tmp_random = getrandom(tmp_prioritized_skill.length)
                        tmp_skill = tmp_prioritized_skill[tmp_random]
                        if (round_flag == true) {
                            tmp_dist = 5 - skill[tmp_skill] % 5
                            if (getrandom(3) != 0) {
                                tmp_dist = getrandom(5) + 1
                            }
                            if (tmp_dist > occupation_p) {
                                tmp_dist = 1
                            }
                        } else {
                            tmp_dist = 1
                        }
                        skill[tmp_skill] += tmp_dist
                        occupation_p -= (tmp_dist - 1)
                        if (skill[tmp_skill] > occupation_max_point) {
                            var tmp_diff = skill[tmp_skill] - occupation_max_point
                            skill[tmp_skill] -= tmp_diff
                            occupation_p += tmp_diff
                            allremove(occupation_skill, tmp_skill)
                            allremove(tmp_prioritized_skill, tmp_skill)
                        }
                        if (occupation_p <= to) {
                            var tmp_ex = Math.abs(occupation_p - to - 1)
                            skill[tmp_skill] -= tmp_ex
                            occupation_p = to + 1
                        }
                    }
                }
            }
            var tmp_prioritized_skill = []
            for (var k in global_priority) {
                if (global_occupation_skill[k] == true) {
                    for (var i = 0; i < global_priority[k]; i++) {
                        if (k.slice(-4) == "（任意）") {
                            tmp_prioritized_skill.push(k + "_1")
                        } else {
                            tmp_prioritized_skill.push(k)
                        }
                    }
                }
            }
            for (var i of bias[0]) {
                if (i[0] == 1) {
                    tmp_pusher(i[1], i[2])
                } else if (i[0] == 2) {
                    tmp_disto(i[1], i[2])
                }
            }
            for (var i = 0; i < occupation_priority.length; i++) {
                tmp_pusher(bias[1][0], bias[1][1])
                tmp_disto(bias[1][2], bias[1][3])
            }
        }
        dist_occu()
    }
    var tmp = 0
    let dist_occupationpoint = {}
    for (var k in init_skill) {
        tmp += skill[k] - init_skill[k]
        dist_occupationpoint[k] = skill[k] - init_skill[k]
    }

    /* 趣味技能ポイントの振り分け */
    let skills_str = ""
    let hobby_skill = []
    for (var k in SKILLS) {
        if ((k.slice(-4) == "（任意）" || global_occupation_skill[k] == undefined) && SKILLS[k] < hobby_max_point && global_priority[k] == undefined && (skill[k + "_1"] == undefined || skill[k + "_1"] < hobby_max_point)) {
            skills_str += k + " "
        }
    }
    var tmp_point
    for (var k in global_priority) {
        tmp_point = skill[k]
        if (tmp_point == undefined) {
            tmp_point = get_init(k)
        }
        if (tmp_point >= global_hobby_max_point) {
            delete global_priority[k]
        }
    }

    var tmp_threshold = 2
    var tmp_count = 0
    for (var i = 0; i < occupation_priority.length; i++) {
        if (skill[raw_occupation_skill[occupation_priority[i]]] < occupation_max_point) {
            for (var j = 0; j < 20; j++) {
                hobby_skill.push(raw_occupation_skill[occupation_priority[i]])
            }
            tmp_count++
            if (tmp_count == tmp_threshold) {
                break
            }
        }
    }
    for (var i = i; i < occupation_priority.length; i++) {
        if (skill[raw_occupation_skill[occupation_priority[i]]] < occupation_max_point) {
            skills_str += raw_occupation_skill[occupation_priority[i]] + " "
        }
    }
    skills_str = skills_str.slice(0, -1)
    global_dup_map = {}
    global_number_map = {}
    if (global_hobby_max_point > 1) {
        let raw_hobby_skill = skill_parser(["", hobby_p, skills_str], hobby_max_point, true)
        tmp_parser(raw_hobby_skill)
        function dist_hob() {
            var tmp_count = [-1, -1]
            function tmp_pusher(n, m, occu_flag = false) {
                if (occu_flag == true) {
                    if (raw_occupation_skill.length == 0) {
                        return
                    }
                    for (var i = 0; i < n; i++) {
                        tmp_count[1]++
                        tmp_count[1] %= raw_occupation_skill.length
                        for (var j = 0; j < m; j++) {
                            hobby_skill.push(raw_occupation_skill[occupation_priority[tmp_count[1]]])
                        }
                    }
                } else {
                    for (var i = 0; i < n; i++) {
                        tmp_count[0]++
                        for (var j = 0; j < m; j++) {
                            hobby_skill.push(raw_hobby_skill[tmp_count[0]])
                        }
                    }
                }
            }
            function tmp_disth(n, round_flag = false) {
                var tmp_dist
                var tmp_random
                var tmp_skill
                if (n == 0) {
                    var to = 0
                } else {
                    var to = Math.floor(init_hobby_p / n + 1)
                }
                for (false; to < hobby_p; hobby_p--) {
                    if (hobby_skill.length + tmp_prioritized_skill.length == 0) {
                        break
                    }
                    if (hobby_skill.length >= 1 && (tmp_prioritized_skill.length == 0 || getrandom(3) == 0)) {
                        tmp_random = getrandom(hobby_skill.length)
                        tmp_skill = hobby_skill[tmp_random]
                        if (round_flag == true) {
                            tmp_dist = 5 - skill[tmp_skill] % 5
                            if (getrandom(3) != 0) {
                                tmp_dist = getrandom(5) + 1
                            }
                            if (tmp_dist > hobby_p) {
                                tmp_dist = 1
                            }
                        } else {
                            tmp_dist = 1
                        }
                        if (skill[tmp_skill] == undefined) {
                        }
                        skill[tmp_skill] += tmp_dist
                        hobby_p -= (tmp_dist - 1)
                        if (global_occupation_skill[tmp_skill] == true && skill[tmp_skill] > occupation_max_point) {
                            var tmp_diff = skill[tmp_skill] - occupation_max_point
                            skill[tmp_skill] -= tmp_diff
                            hobby_p += tmp_diff
                            allremove(hobby_skill, tmp_skill)
                        } else if (global_occupation_skill[tmp_skill] == undefined && skill[tmp_skill] > hobby_max_point) {
                            var tmp_diff = skill[tmp_skill] - hobby_max_point
                            skill[tmp_skill] -= tmp_diff
                            hobby_p += tmp_diff
                            allremove(hobby_skill, tmp_skill)
                        }
                        if (hobby_p <= to) {
                            var tmp_ex = Math.abs(hobby_p - to - 1)
                            skill[tmp_skill] -= tmp_ex
                            hobby_p = to + 1
                        }
                    } else {
                        tmp_random = getrandom(tmp_prioritized_skill.length)
                        tmp_skill = tmp_prioritized_skill[tmp_random]
                        if (round_flag == true) {
                            tmp_dist = 5 - skill[tmp_skill] % 5
                            if (getrandom(3) != 0) {
                                tmp_dist = getrandom(5) + 1
                            }
                            if (tmp_dist > hobby_p) {
                                tmp_dist = 1
                            }
                        } else {
                            tmp_dist = 1
                        }
                        skill[tmp_skill] += tmp_dist
                        hobby_p -= (tmp_dist - 1)
                        if (global_occupation_skill[tmp_skill] == true && skill[tmp_skill] > occupation_max_point) {
                            var tmp_diff = skill[tmp_skill] - occupation_max_point
                            skill[tmp_skill] -= tmp_diff
                            hobby_p += tmp_diff
                            allremove(hobby_skill, tmp_skill)
                            allremove(tmp_prioritized_skill, tmp_skill)
                        } else if (global_occupation_skill[tmp_skill] == undefined && skill[tmp_skill] > hobby_max_point) {
                            var tmp_diff = skill[tmp_skill] - hobby_max_point
                            skill[tmp_skill] -= tmp_diff
                            hobby_p += tmp_diff
                            allremove(hobby_skill, tmp_skill)
                            allremove(tmp_prioritized_skill, tmp_skill)
                        }
                        if (hobby_p <= to) {
                            var tmp_ex = Math.abs(hobby_p - to - 1)
                            skill[tmp_skill] -= tmp_ex
                            hobby_p = to + 1
                        }
                    }
                }
            }
            var tmp_prioritized_skill = []
            for (var k in global_priority) {
                var tmp_name = k
                if (k.slice(-4) == "（任意）") {
                    tmp_name += "_1"
                }
                if (skill[tmp_name] == undefined) {
                    skill[tmp_name] = get_init(tmp_name)
                    init_skill[tmp_name] = get_init(tmp_name)
                }
                for (var i = 0; i < global_priority[k]; i++) {
                    if ((global_occupation_skill[tmp_name] == true && skill[tmp_name] < global_occupation_max_point) || (global_occupation_skill[tmp_name] != true && skill[tmp_name] < global_hobby_max_point)) {
                        tmp_prioritized_skill.push(tmp_name)
                    }
                }
            }
            for (var i of bias[2]) {
                if (i[0] == 1) {
                    if (i.length == 3) {
                        tmp_pusher(i[1], i[2], false)
                    } else {
                        tmp_pusher(i[1], i[2], i[3])
                    }
                } else if (i[0] == 2) {
                    tmp_disth(i[1], i[2])
                }
            }
            while (hobby_p > 0) {
                tmp_pusher(bias[3][0], bias[3][1])
                tmp_disth(bias[3][2], bias[3][3])
            }
        }
        dist_hob()
    }

    let dist_hobby = {}
    for (var k in init_skill) {
        if (dist_occupationpoint[k] == undefined) {
            dist_occupationpoint[k] = 0
        }
        dist_hobby[k] = skill[k] - (init_skill[k] + dist_occupationpoint[k])
    }

    /* 出力の前準備 */
    var hoge = 0
    var fuga = 0
    let output_occupation_skill = []
    let output_hobby_skill = []
    for (var k in skill) {
        if (skill[k] != init_skill[k]) {
            hoge += dist_hobby[k]
            fuga += dist_occupationpoint[k]
            if (global_occupation_skill[k] == true) {
                output_occupation_skill.push([k.split("_")[0], skill[k], "：" + skill[k] + " ・・・ " + init_skill[k] + "+" + dist_occupationpoint[k] + "+" + dist_hobby[k], init_skill[k], dist_occupationpoint[k], dist_hobby[k], true])
            } else {
                output_hobby_skill.push([k.split("_")[0], skill[k], "：" + skill[k] + " ・・・ " + init_skill[k] + "+" + dist_hobby[k], init_skill[k], dist_hobby[k], false])
            }
        }
    }
    output_occupation_skill.sort()
    output_occupation_skill.sort((a, b) => { return (b[1] - a[1]) })
    for (var i of output_occupation_skill) {
        var tmp = i[0]
        i[0] = i[1]
        i[1] = tmp
    }
    output_hobby_skill.sort()
    output_hobby_skill.sort((a, b) => { return (b[1] - a[1]) })
    for (var i of output_hobby_skill) {
        var tmp = i[0]
        i[0] = i[1]
        i[1] = tmp
    }

    let output_skill = []
    for (var i of output_occupation_skill) {
        if (global_exskill[i[1]]) {
            i[1] = "＊" + i[1]
        }
        output_skill.push(i)
    }
    for (var i of output_hobby_skill) {
        if (global_exskill[i[1]]) {
            i[1] = "＊" + i[1]
        }
        output_skill.push(i)
    }
    let forsortdup_map = {}
    let forsortnumber_map = {}
    for (var i of output_skill) {
        var tmp_str = i[1]
        if (forsortdup_map[tmp_str] == undefined) {
            forsortdup_map[tmp_str] = 1
            forsortnumber_map[tmp_str] = 0
        } else {
            forsortdup_map[tmp_str] = 2
        }
    }
    for (var i of output_skill) {
        var tmp_str = i[1]
        if (forsortdup_map[tmp_str] == 2) {
            forsortnumber_map[tmp_str] += 1
            i[1] += forsortnumber_map[tmp_str]
        }
    }

    /* ブロック出力 */
    document.getElementById("overview_setting").textContent = "No. " + global_number + "　" + occupation + "　" + tendency
    document.getElementById("max_ocp").textContent = "最大職業技能値：" + global_occupation_max_point
    document.getElementById("max_hbp").textContent = "最大趣味技能値：" + global_hobby_max_point
    document.getElementById("bias_name").textContent = "配分の偏り：" + biasname
    for (var k in global_status) {
        if (k == "INC") {
            break
        }
        document.getElementById(k + "_box").value = global_status[k]
    }
    document.getElementById("INC_box").value = global_status["年収"] + "/" + global_status["財産"]
    for (var k in global_depend_skill) {
        if (k == "幸運") {
            break
        }
        document.getElementById(k + "_box").value = global_depend_skill[k]
    }
    document.getElementById("LUCK_box").value = global_depend_skill["幸運"]
    document.getElementById("IDEA_box").value = global_depend_skill["アイディア"]
    document.getElementById("KNOWLEDGE_box").value = global_depend_skill["知識"]

    document.getElementById("acqskill_listblock").remove()
    var block_element = document.createElement("div")
    block_element.id = "acqskill_listblock"
    document.getElementById("acqskill_list").appendChild(block_element)

    var tmp_hobby_flag = false
    var tmp_occu_flag = false
    var tmp_list = document.getElementById("acqskill_listblock")
    tmp_list.appendChild(document.createTextNode("職業技能"))
    for (var i of output_skill) {
        if (i.length == 6 && tmp_hobby_flag == false) {
            if (tmp_occu_flag == false) {
                tmp_list.appendChild(document.createTextNode(" なし"))
            }
            var br = document.createElement("br")
            br.className = "widebr"
            tmp_list.appendChild(br)
            tmp_list.appendChild(document.createTextNode("趣味技能"))
            tmp_hobby_flag = true
        }
        tmp_occu_flag = true
        var br = document.createElement("br")
        br.className = "morenarrowbr"
        tmp_list.appendChild(br)
        var element = document.createElement("input")
        element.type = "text"
        element.className = "widebox"
        element.disabled = true
        element.value = i[1]
        tmp_list.appendChild(element)
        tmp_list.appendChild(document.createTextNode(" "))
        var point_element = document.createElement("input")
        point_element.type = "text"
        point_element.className = "input_max"
        point_element.disabled = true
        point_element.value = i[0]
        tmp_list.appendChild(point_element)
        tmp_list.appendChild(document.createTextNode("　"))
        for (var j = 3; j < i.length - 1; j++) {
            var formula_element = document.createElement("input")
            formula_element.type = "text"
            formula_element.className = "formula_elem"
            formula_element.disabled = true
            formula_element.value = i[j]
            tmp_list.appendChild(formula_element)
            tmp_list.appendChild(document.createTextNode(" "))
            if (j == 3 && i.length == 6) {
                var formula_element = document.createElement("input")
                formula_element.type = "text"
                formula_element.className = "formula_elem"
                formula_element.disabled = true
                formula_element.value = "-"
                tmp_list.appendChild(formula_element)
                tmp_list.appendChild(document.createTextNode(" "))
            }
        }
    }
    if (tmp_hobby_flag == false) {
        
        if (tmp_occu_flag == false) {
            tmp_list.appendChild(document.createTextNode(" なし"))
        }
        var br = document.createElement("br")
        br.className = "widebr"
        tmp_list.appendChild(br)
        tmp_list.appendChild(document.createTextNode("趣味技能 なし"))
    }
    for (var i = 0; i < 16 - output_skill.length; i++) {
        var br = document.createElement("br")
        br.className = "morenarrowbr"
        tmp_list.appendChild(br)
        var element = document.createElement("input")
        element.type = "text"
        element.className = "widebox"
        element.disabled = true
        element.value = "-"
        tmp_list.appendChild(element)
        tmp_list.appendChild(document.createTextNode(" "))
        var point_element = document.createElement("input")
        point_element.type = "text"
        point_element.className = "input_max"
        point_element.disabled = true
        point_element.value = "-"
        tmp_list.appendChild(point_element)
        tmp_list.appendChild(document.createTextNode("　"))
        for (var j = 0; j < 3; j++) {
            var formula_element = document.createElement("input")
            formula_element.type = "text"
            formula_element.className = "formula_elem"
            formula_element.disabled = true
            formula_element.value = "-"
            tmp_list.appendChild(formula_element)
            tmp_list.appendChild(document.createTextNode(" "))
        }
    }

    /* テキスト出力 */
    var appendtext = ""

    appendtext += "No. " + global_number + "  " + occupation + " " + tendency + "\n職max：" + occupation_max_point + " 趣max：" + hobby_max_point + " 偏：" + biasname + "\n\n"
    global_number += 1
    for (var k in global_status) {
        appendtext += k + "：" + global_status[k]
        if (k == "POW") {
            appendtext += "\n"
        } else if (k == "EDU") {
            appendtext += "\n"
            break
        } else {
            appendtext += "   "
            if (global_status[k] <= 9) {
                appendtext += " "
            }
        }
    }
    appendtext += "年収/財産：" + global_status["年収"] + "/" + global_status["財産"]
    appendtext += "\n\n"
    var i = 1
    for (var k in global_depend_skill) {
        appendtext += k + "：" + global_depend_skill[k]
        if (i == 4) {
            i = 0
            appendtext += "\n"
        } else {
            appendtext += "   "
            if (global_depend_skill[k] <= 9) {
                appendtext += " "
            }
        }
        i++
    }
    appendtext += "\n\n"

    appendtext += "職業技能\n"
    var tmp_count = 0
    for (var i of output_skill) {
        if (i[i.length - 1] == false) {
            break
        }
        appendtext += i[1] + i[2] + "\n"
        tmp_count++
    }
    if (tmp_count == 0) {
        appendtext += "なし\n"
    }
    appendtext += "\n趣味技能\n"
    var tmp_count = 0
    for (var i of output_skill) {
        if (i[i.length - 1] == true) {
            continue
        }
        appendtext += i[1] + i[2] + "\n"
        tmp_count++
    }
    if (tmp_count == 0) {
        appendtext += "なし\n"
    }
    appendtext += "\n\n\n"
    result_area.textContent = appendtext + result_area.textContent
    console.log(occupation_p, hobby_p, "趣" + (global_status.INT * 10 - hoge), "職:" + (global_status.EDU * 20 - fuga))
}
