const SPACE = document.createTextNode(" ")
const UNDER = document.createTextNode("_")
const THREEDAY = 1000*60*60*24*3

window.addEventListener('touchmove', function(event) {
    event.preventDefault();
});

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
    await new Promise(s => setTimeout(s, ms))
    if (a == "\n") {
        shell.append(document.createElement("br"))
    } else {
        elem = document.createTextNode(a)
        shell.appendChild(elem)
    }
    shell.appendChild(UNDER)
}

async function paste(a, ms, f) {
    await new Promise(s => setTimeout(s, ms))
    elem = document.createTextNode(a)
    shell.appendChild(elem)
    if (f == true) {
        shell.append(document.createElement("br"))
    }
    shell.appendChild(UNDER)
}

async function paste_link(a, ms) {
    await new Promise(s => setTimeout(s, ms))
    for (var i = 0; i < a.length; i += 2) {
        if (a[i+1] == 0) {
            elem = document.createTextNode(a[i])
            shell.appendChild(elem)
            continue
        } else if (a[i+1] == 10) {
            shell.appendChild(document.createElement("br"))
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
                typing(a[j], time)
            }
        } else if (mode == 0) {
            paste(a, time, false)
        } else if (mode == 2) {
            paste(a, time, true)
        } else if (mode == 3) {
            time += ((1000 - a) + Math.random()*a)
            typing("", time)
        } else if (mode == 4) {
            paste_link(texts[i].slice(2), time)
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
            paste(a, 0, true)
        } else if (mode == 3) {
            typing("", 0)
        } else if (mode == 4) {
            paste_link(texts[i].slice(2), 0)
        }
    }
}

let texts = [
    ["$ ", 0],
    [200, 3],
    ["whoami\n", 1],
    ["Ll_e_ki", 2],

    ["$ ", 0],
    [200, 3],
    ["groups\n", 1],
    ["Hechima", 4,
    "Hechima", "../", "\n", 0x0a
    ],

    ["$ ", 0],
    [300, 3],
    ["ls\n", 1],
    ["contact.txt	favorite.txt	hoge.txt	works", 2],

    ["$ ", 0],
    [400, 3],
    ["cat ", 1],
    [600, 3],
    ["favorite.txt\n", 1],
    ["Programming Language : Python", 2],
    ["CTF : pwn", 2],

    ["$ ", 0],
    [350, 3],
    ["cat ", 1],
    [450, 3],
    ["contact.txt\n", 1],
    ["Twitter : https://twitter.com/Ll_e_ki\nGitHub : https://github.com/Lleki-wi", 4,
    "Twitter : ", 0, "https://twitter.com/Ll_e_ki", "https://twitter.com/Ll_e_ki", "\n", 0x0a,
    "GitHub : ", 0, "https://github.com/Lleki-wi", "https://github.com/Lleki-wi", "\n", 0x0a
    ],

    ["$ ", 0],
    [400, 3],
    ["ls ", 1],
    [250, 3],
    ["works\n", 1],
    ["index TRPGtools webtools trade training\nQiita Greasy Fork GitHub AtCoder", 4,
    "index", "works", "\n", 0x0a, "webtools", "webtools", " ", 0, "TRPGtools", "trpgtools", " ", 0, "trade training", "trade_training/training", "\n", 0x0a,
    "Qiita", "https://qiita.com/Ll_e_ki", " ", 0, "Greasy Fork", "https://greasyfork.org/ja/users/796821-ll-e-ki", " ", 0, "GitHub", "https://github.com/Lleki-wi?tab=repositories", " ", 0, "AtCoder", "https://atcoder.jp/users/Ll_e_ki", "\n", 0x0a
    ],

    ["$ ", 0],
    [250, 3],
    ["cat ", 1],
    [250, 3],
    ["hoge.txt\n", 1],
    ["一部表示が現実的でないですがゆるしてください...", 2],

    ["$ ", 0],
    [300, 3],
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
    if (Date.now() - last_access >= THREEDAY || last_access <= 0) {
        typeabout()
    } else {
        instant()
    }
} catch (error) {
    typeabout()
}
document.cookie = "last_access=" + Date.now()