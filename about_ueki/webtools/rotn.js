/*
LICENCE : MIT

Copyright © 2023 Ll_e_ki

https://opensource.org/license/mit/
*/

function changesentence() {
    let sentence = document.getElementById("sentence").value
    let n = Number(document.getElementById("n").value)
    let result_area = document.getElementById("result")
    let res = ""
    let offset = 0

    for (var i = 0; i < sentence.length; i++) {
        offset = 0
        unicode = sentence.charCodeAt(i)
        if (97 <= unicode && unicode <= 122) {
            offset = 32
            unicode -= 32
        }
        if (!(65 <= unicode && unicode <= 90)) {
            res += sentence[i]
            continue
        }
        unicode -= 65
        unicode = (unicode + n) % 26
        if (unicode < 0) {
            unicode += 26
        }
        unicode += 65 + offset

        res += String.fromCharCode(unicode)
    }

    result_area.textContent = res
}