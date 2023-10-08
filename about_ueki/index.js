/*
LICENCE : MIT

Copyright © 2023 Ll_e_ki

https://opensource.org/license/mit/
*/

const SPACE = document.createTextNode(" ")
const UNDER = document.createTextNode("_")
const DELAY_SCALE = 0.6
const ONEWEEK = 1000*60*60*24*7*1

function cookieparse() {
    let cookie = document.cookie
    if (cookie == "") {
        return {}
    }
    cookie = cookie.split("; ")
    ret = {}
    for (var i of cookie) { 
        k = i.split("=")[0]
        v = i.split("=")[1]
        ret[k] = v
    }

    return ret
}

async function typing(a, ms) {
    await new Promise(s => setTimeout(s, ms * DELAY_SCALE))
    if (a == "\n") {
        shell.append(document.createElement("br"))
    } else {
        elem = document.createTextNode(a)
        shell.appendChild(elem)
    }
    shell.appendChild(UNDER)
}

async function paste(a, ms, f) {
    await new Promise(s => setTimeout(s, ms * DELAY_SCALE))
    elem = document.createTextNode(a)
    shell.appendChild(elem)
    if (f == true) {
        shell.append(document.createElement("br"))
    }
    shell.appendChild(UNDER)
}

async function paste_link(a, ms) {
    await new Promise(s => setTimeout(s, ms * DELAY_SCALE))
    for (var i = 0; i < a.length; i += 2) {
        if (a[i+1] == 0) {
            elem = document.createTextNode(a[i])
            shell.appendChild(elem)
            continue
        } else if (a[i+1] == 10) {
            shell.appendChild(document.createElement("br"))
            if (i < a.length - 2) {
                shell.appendChild(document.createTextNode("| "))
            }
            continue
        }
        elem = document.createElement("a")
        elem.href = a[i+1]
        // elem.target = "_blank"
        // elem.rel = "noopener noreferrer"
        elem.textContent = a[i]
        shell.appendChild(elem)
    }
    shell.appendChild(UNDER)
}

async function typeabout() {
    var time = 0
    for (var i = 0; i < texts.length; i++) {
        a = texts[i][0]
        var mode = texts[i][1]
        if (mode == 1) {
            for (var j = 0; j < a.length; j++) {
                time += 50+Math.random()*150
                if (a[j] == "\n") {
                    time += Math.random()*500
                }
                typing(a[j], time)
            }
        } else if (mode == 0) {
            paste(a, time, false)
        } else if (mode == 2) {
            paste("| " + a, time, true)
        } else if (mode == 3) {
            time += (a + Math.random()*(1000-a))
            typing("", time)
        } else if (mode == 4) {
            paste("| ", time, false)
            paste_link(texts[i].slice(2), time)
        } else if (mode == 5) {
            paste("| ", time, true)
        } else if (mode == 6) {
            paste(a, time, true)
        } else if (mode == 7) {
            time += a
            typing("", time)
        }
    }
}

function instant() {
    for (var i = 0; i < texts.length; i++) {
        a = texts[i][0]
        var mode = texts[i][1]
        if (mode == 1) {
            for (var j = 0; j < a.length; j++) {
                typing(a[j], 0)
            }
        } else if (mode == 0) {
            paste(a, 0, false)
        } else if (mode == 2) {
            paste("| " + a, 0, true)
        } else if (mode == 3) {
            typing("", 0)
        } else if (mode == 4) {
            paste("| ", 0, false)
            paste_link(texts[i].slice(2), 0)
        } else if (mode == 5) {
            paste("| ", 0, true)
        }
    }
}

let texts = [
    ["$ ", 0],
    [300, 3],
    ["notes\n", 1],
    ["本ページの演出は無害なはずです！", 2],
    ["\n", 5],

    ["$ ", 0],
    [3500, 7],
    [350, 3],
    ["whoami\n", 1],
    ["Ll_e_ki", 2],
    ["\n", 5],

    ["$ ", 0],
    [2500, 7],
    [500, 3],
    ["groups\n", 1],
    ["Hechima", 4,
    "Hechima", "../", "\n", 0x0a
    ],
    ["\n", 5],

    ["$ ", 0],
    [2500, 7],
    [750, 3],
    ["favorite\n", 1],
    ["Programming Language : Python", 2],
    ["CTF : pwn", 2],
    ["\n", 5],

    ["$ ", 0],
    [4500, 7],
    [550, 3],
    ["contact\n", 1],
    ["X/Twitter : https://twitter.com/Ll_e_ki\nGitHub : https://github.com/Lleki-wi", 4,
    "X/Twitter : ", 0, "https://twitter.com/Ll_e_ki", "https://twitter.com/Ll_e_ki", "\n", 0x0a,
    "GitHub : ", 0, "https://github.com/Lleki-wi", "https://github.com/Lleki-wi", "\n", 0x0a,
    "E-mail : ", 0, "uekiwi.desu@gmail.com", "mailto:uekiwi.desu@gmail.com", "\n", 0x0a,
    ],
    ["\n", 5],

    ["$ ", 0],
    [5000, 7],
    [525, 3],
    ["works\n", 1],
    ["index TRPGtools webtools trade training\nQiita Greasy Fork GitHub AtCoder", 4,
    "index", "works", "\n", 0x0a, "webtools", "webtools", " ", 0, "TRPGtools", "trpgtools", " ", 0, "trade training", "trade_training/training", "\n", 0x0a,
    "Qiita", "https://qiita.com/Ll_e_ki", " ", 0, "Greasy Fork", "https://greasyfork.org/ja/users/796821-ll-e-ki", " ", 0, "GitHub", "https://github.com/Lleki-wi?tab=repositories", " ", 0, "AtCoder", "https://atcoder.jp/users/Ll_e_ki", "\n", 0x0a
    ],
    ["\n", 5],

    ["$ ", 0],
    [9000, 7],
    [525, 3],
    ["postscript\n", 1],
    ["一部表示が現実的でないですがゆるしてください...", 2],
    ["\n", 5],

    ["$ ", 0],
    [3000, 7],
    [750, 3],
    ["exit\n", 1]
]
let shell = document.getElementById("terminal")
shell.textContent = ""

let parsedcookie = cookieparse()
let last_access = 0
if (parsedcookie["last_access"] != undefined) {
        last_access = parsedcookie["last_access"]
}

try {
    last_access = Number(last_access)
    if (Date.now() - last_access >= ONEWEEK || last_access <= 0) {
        typeabout()
    } else {
        instant()
    }
} catch (error) {
    typeabout()
}
document.cookie = "last_access=" + Date.now()
