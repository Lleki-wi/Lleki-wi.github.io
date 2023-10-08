/*
LICENCE : MIT

Copyright © 2023 Ll_e_ki

https://opensource.org/license/mit/
*/

const sleep = ms => new Promise(res => setTimeout(res, ms))

function one_roll(n) {
    return Math.floor(Math.random() * n) + 1
}

function write_log(s, res_a, res_n) {
    let date = new Date()
    let write_date = date.getDate()+'日' + date.getHours()+'時' + date.getMinutes()+'分' + date.getSeconds()+'秒' + date.getMilliseconds()

    let log = document.getElementById("logs")
    let new_log = write_date + " : " + s + " : " + res_a + " : " + res_n + '\n'
    log.textContent = new_log + log.textContent
}

function parser(s) {
    let res = []
    s = s.replace(/ /g, "")
    s = s.replace(/%/g, 'd')
    s = s.replace(/@/g, 'd')
    s = s.replace(/D/g, 'd')
    s = s.replace(/-/g, "+-")
    if (s[0] != '+') {
        s = '+'+s
    }
    s = s.split('+').slice(1)
    let const_n = 0

    for (var i = 0; i < s.length; i++) {
        let si = s[i]
        si = si.split('d')
        if (si.length != 2) {
            if (si.length == 1) {
                n = Math.floor(Number(si[0]))
                if (isNaN(n)) {
                    return false
                }
                const_n += n
                continue
            } else {
                return false
            }
        }
        n = Math.floor(Number(si[0]))
        m = Math.floor(Number(si[1]))
        if (isNaN(n) || isNaN(m)) {
            return false
        }
        if (n != 0 && m > 1) {
            res.push([n, m])
        } else {
            return false
        }
    }

    res.push([const_n, 1])
    return res
}

async function rolldef(n, m, def_n) {
    let exect = document.getElementById("de"+def_n)
    let result = document.getElementById("dr"+def_n)
    let res_a = ""
    let res_n = 0
    
    exect.disabled = true
    result.defaultValue = "rolling..."
    await sleep(750)
    for (var i = 0; i < n; i++) {
        rand_m = one_roll(m)
        res_a += rand_m.toString()+", "
        res_n += rand_m
    }
    res_a = res_a.slice(0, -2)
    if (n > 1) {
        document.getElementById("drr"+def_n).textContent = res_a
    }
    result.defaultValue = res_n
    
    write_log(n+'D'+m, res_a, res_n)
    exect.disabled = false
    
    return
}

async function roll(roll_n) {
    let exect = document.getElementById("e"+roll_n)
    let roll_results = document.getElementById("rr"+roll_n)
    let result = document.getElementById('r'+roll_n)
    let res_a = ""
    let res_n = 0
    const s = document.getElementById('s'+roll_n).value
    if (s == "") {
        return
    }
    
    let parsed_s = parser(s)

    if (!parsed_s) {
        return
    }
    exect.disabled = true
    roll_results.defaultValue = "rolling..."
    result.defaultValue = "rolling..."
    await sleep(750)
    let log_s = ""
    for (var i = 0; i < parsed_s.length; i++) {
        let n = parsed_s[i][0]
        let m = parsed_s[i][1]
        let sign = 1
        if (i > 0 && n > 0) {
            log_s += '+'
        }
        if (m == 1) {
            if (n == 0) {
                continue
            }
            log_s += n
            res_n += n
            continue
        }
        log_s += n+'D'+m
        
        if (n < 0) {
            sign = -1
            n *= -1
        }
        for (var j = 0; j < n; j++) {
            rand_m = one_roll(m)
            res_a += (sign * rand_m).toString()+", "
            res_n += sign * rand_m
        }
    }

    res_a = res_a.slice(0, -2)

    exect.disabled = false

    if (isNaN(res_n)) {
        return
    }
    roll_results.defaultValue = res_a
    result.defaultValue = res_n
    if (res_n != "") {
        write_log(log_s, res_a, res_n)
    }
 
    return
}