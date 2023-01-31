const morse_alph = {"._": 'a', "_...": 'b', "_._.": 'c', "_..": 'd', ".": 'e', ".._.": 'f', "__.": 'g', "....": 'h', "..": 'i', ".___": 'j', "_._": 'k', "._..": 'l', "__": 'm', "_.": 'n', "___": 'o', ".__.": 'p', "__._": 'q', "._.": 'r', "...": 's', "_": 't', ".._": 'u', "..._": 'v', ".__": 'w', "_.._": 'x', "_.__": 'y', "__..": 'z',
                    "._._._": '.', "__..__": ',', ".____.": '\'', "_...._": '-', "_._.__": '!', "..__._": '_'}
const Cmorse_alph = {"._": 'A', "_...": 'B', "_._.": 'C', "_..": 'D', ".": 'E', ".._.": 'F', "__.": 'G', "....": 'H', "..": 'I', ".___": 'J', "_._": 'K', "._..": 'L', "__": 'M', "_.": 'N', "___": 'O', ".__.": 'P', "__._": 'Q', "._.": 'R', "...": 'S', "_": 'T', ".._": 'U', "..._": 'V', ".__": 'W', "_.._": 'X', "_.__": 'Y', "__..": 'Z',
                     "._._._": '.', "__..__": ',', ".____.": '\'', "_...._": '-', "_._.__": '!', "..__._": '_'}
const morse_kana = {"__.__": 'あ', "._": 'い', ".._": 'う', "_.___": 'え', "._...": 'お', "._..": 'か', "_._..": 'き', "..._": 'く', "_.__": 'け', "____": 'こ', "_._._": 'さ', "__._.": 'し', "___._": 'す', ".___.": 'せ', "___.": 'そ', "_.": 'た', ".._.": 'ち', ".__.": 'つ', "._.__": 'て', ".._..": 'と', "._.": 'な', "_._.": 'に', "....": 'ぬ', "__._": 'ね', "..__": 'の', "_...": 'は', "__.._": 'ひ', "__..": 'ふ', ".": 'へ', "_..": 'ほ', "_.._": 'ま', ".._._": 'み', "_": 'む', "_..._": 'め', "_.._.": 'も', ".__": 'や', "_..__": 'ゆ', "__": 'よ', "...": 'ら', "__.": 'り', "_.__.": 'る', "___": 'れ', "._._": 'ろ', "_._": 'わ', ".___": 'を', "._._.": 'ん',
                    "..": '゛', "..__.": '゜', ".__._": 'ー', "._._._": '、', "_._.__": '！', "..__._": '＿'}
const Cmorse_kana = {"__.__": 'ア', "._": 'イ', ".._": 'ウ', "_.___": 'エ', "._...": 'オ', "._..": 'カ', "_._..": 'キ', "..._": 'ク', "_.__": 'ケ', "____": 'コ', "_._._": 'サ', "__._.": 'シ', "___._": 'ス', ".___.": 'セ', "___.": 'ソ', "_.": 'タ', ".._.": 'チ', ".__.": 'ツ', "._.__": 'テ', ".._..": 'ト', "._.": 'ナ', "_._.": 'ニ', "....": 'ヌ', "__._": 'ネ', "..__": 'ノ', "_...": 'ハ', "__.._": 'ヒ', "__..": 'フ', ".": 'ヘ', "_..": 'ホ', "_.._": 'マ', ".._._": 'ミ', "_": 'ム', "_..._": 'メ', "_.._.": 'モ', ".__": 'ヤ', "_..__": 'ユ', "__": 'ヨ', "...": 'ラ', "__.": 'リ', "_.__.": 'ル', "___": 'レ', "._._": 'ロ', "_._": 'ワ', ".___": 'ヲ', "._._.": 'ン',
                    "..": '゛', "..__.": '゜', ".__._": 'ー', "._._._": '、', "_._.__": '！', "..__._": '＿'}
const morse_num = {".____": '1', "..___": '2', "...__": '3', "...._": '4', ".....": '5', "_....": '6', "__...": '7', "___..": '8', "____.": '9', "_____": '0'}

const Aalph_morse = {'a': "._", 'b': "_...", 'c': "_._.", 'd': "_..", 'e': ".", 'f': ".._.", 'g': "__.", 'h': "....", 'i': "..", 'j': ".___", 'k': "_._", 'l': "._..", 'm': "__", 'n': "_.", 'o': "___", 'p': ".__.", 'q': "__._", 'r': "._.", 's': "...", 't': "_", 'u': ".._", 'v': "..._", 'w': ".__", 'x': "_.._", 'y': "_.__", 'z': "__..", 'A': "._", 'B': "_...", 'C': "_._.", 'D': "_..", 'E': ".", 'F': ".._.", 'G': "__.", 'H': "....", 'I': "..", 'J': ".___", 'K': "_._", 'L': "._..", 'M': "__", 'N': "_.", 'O': "___", 'P': ".__.", 'Q': "__._", 'R': "._.", 'S': "...", 'T': "_", 'U': ".._", 'V': "..._", 'W': ".__", 'X': "_.._", 'Y': "_.__", 'Z': "__..",
                     '.': "._._._", ',': "__..__", '\'': ".____.", '-': "_...._", '!': "_._.__", '_': "..__._"}
const Akana_morse = {'あ': "__.__", 'い': "._", 'う': ".._", 'え': "_.___", 'お': "._...", 'か': "._..", 'き': "_._..", 'く': "..._", 'け': "_.__", 'こ': "____", 'さ': "_._._", 'し': "__._.", 'す': "___._", 'せ': ".___.", 'そ': "___.", 'た': "_.", 'ち': ".._.", 'つ': ".__.", 'て': "._.__", 'と': ".._..", 'な': "._.", 'に': "_._.", 'ぬ': "....", 'ね': "__._", 'の': "..__", 'は': "_...", 'ひ': "__.._", 'ふ': "__..", 'へ': ".", 'ほ': "_..", 'ま': "_.._", 'み': ".._._", 'む': "_", 'め': "_..._", 'も': "_.._.", 'や': ".__", 'ゆ': "_..__", 'よ': "__", 'ら': "...", 'り': "__.", 'る': "_.__.", 'れ': "___", 'ろ': "._._", 'わ': "_._", 'を': ".___", 'ん': "._._.",
                     'ア': "__.__", 'イ': "._", 'ウ': ".._", 'エ': "_.___", 'オ': "._...", 'カ': "._..", 'キ': "_._..", 'ク': "..._", 'ケ': "_.__", 'コ': "____", 'サ': "_._._", 'シ': "__._.", 'ス': "___._", 'セ': ".___.", 'ソ': "___.", 'タ': "_.", 'チ': ".._.", 'ツ': ".__.", 'テ': "._.__", 'ト': ".._..", 'ナ': "._.", 'ニ': "_._.", 'ヌ': "....", 'ネ': "__._", 'ノ': "..__", 'ハ': "_...", 'ヒ': "__.._", 'フ': "__..", 'ヘ': ".", 'ホ': "_..", 'マ': "_.._", 'ミ': ".._._", 'ム': "_", 'メ': "_..._", 'モ': "_.._.", 'ヤ': ".__", 'ユ': "_..__", 'ヨ': "__", 'ラ': "...", 'リ': "__.", 'ル': "_.__.", 'レ': "___", 'ロ': "._._", 'ワ': "_._", 'ヲ': ".___", 'ン': "._._.",
                     '゛': "..", '゜': "..__.", 'ー': ".__._", '、': "._._._", '！': "_._.__", '＿': "..__._"}
const num_morse = {'1': ".____", '2': "..___", '3': "...__", '4': "...._", '5': ".....", '6': "_....", '7': "__...", '8': "___..", '9': "____.", '0': "_____"}

const kana_daku = {'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ', 'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ', 'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と', 'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
                   'ガ': 'か', 'ギ': 'き', 'グ': 'く', 'ゲ': 'け', 'ゴ': 'こ', 'ザ': 'さ', 'ジ': 'し', 'ズ': 'す', 'ゼ': 'せ', 'ゾ': 'そ', 'ダ': 'た', 'ヂ': 'ち', 'ヅ': 'つ', 'デ': 'て', 'ド': 'と', 'バ': 'は', 'ビ': 'ひ', 'ブ': 'ふ', 'ベ': 'へ', 'ボ': 'ほ'}
const kana_handaku = {'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ペ': 'へ', 'ぽ': 'ほ', 'パ': 'ハ', 'ピ': 'ヒ', 'ふ': 'ふ', 'ぺ': 'へ', 'ポ': 'ほ'}
const kana_yousoku = {'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お', 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ', 'っ': 'つ',
                      'ァ': 'あ', 'ィ': 'い', 'ゥ': 'う', 'ェ': 'え', 'ォ': 'お', 'ャ': 'や', 'ュ': 'ゆ', 'ョ': 'よ', 'ッ': 'つ'}
const kana_hankaku = {'ｱ': 'あ', 'ｲ': 'い', 'ｳ': 'う', 'ｴ': 'え', 'ｵ': 'お', 'ｶ': 'か', 'ｷ': 'き', 'ｸ': 'く', 'ｹ': 'け', 'ｺ': 'こ', 'ｻ': 'さ', 'ｼ': 'し', 'ｽ': 'す', 'ｾ': 'せ', 'ｿ': 'そ', 'ﾀ': 'た', 'ﾁ': 'ち', 'ﾂ': 'つ', 'ﾃ': 'て', 'ﾄ': 'と', 'ﾅ': 'な', 'ﾆ': 'に', 'ﾇ': 'ぬ', 'ﾈ': 'ね', 'ﾉ': 'の', 'ﾊ': 'は', 'ﾋ': 'ひ', 'ﾌ': 'ふ', 'ﾍ': 'へ', 'ﾎ': 'ほ', 'ﾏ': 'ま', 'ﾐ': 'み', 'ﾑ': 'む', 'ﾒ': 'め', 'ﾓ': 'も', 'ﾔ': 'や', 'ﾕ': 'ゆ', 'ﾖ': 'よ', 'ﾗ': 'ら', 'ﾘ': 'り', 'ﾙ': 'る', 'ﾚ': 'れ', 'ﾛ': 'ろ', 'ﾜ': 'わ', 'ｦ': 'を', 'ﾝ': 'ん', 'ｧ': 'あ', 'ｨ': 'い', 'ｩ': 'う', 'ｪ': 'え', 'ｫ': 'お', 'ｬ': 'や', 'ｭ': 'ゆ', 'ｮ': 'よ', 'ｯ': 'つ'}

                    

function changemorse() {
    let long        = document.getElementById("long").value
    let short       = document.getElementById("short").value
    let delimiter   = document.getElementById("delimiter").value
    let char_select = document.getElementsByName("char_select")[0].checked
    let caps_flag   = document.getElementById("capslock_flag").checked

    let input_morse = document.getElementById("input_morse").value
    let output_char = document.getElementById("output_char")

    if (delimiter != "") {
        var dg = new RegExp(delimiter, 'g')
        input_morse = input_morse.replace(dg, ' ')
    }

    var res = ""
    var splitted_morse = input_morse.replace(/\n/g, " \n ").split(' ')
    var f = false
    for (var i = 0; i < splitted_morse.length; i++) {
        mchar = splitted_morse[i]
        if (mchar == "\n") {
            res += "\n"
            continue
        }
        if (mchar == "") {
            continue
        }
        var raw_mchar = mchar
        if (long != "") {
            var lg = new RegExp(long, 'g')
            mchar = mchar.replace(lg, '_')
        }
        if (short != "") {
            var sg = new RegExp(short, 'g')
            mchar = mchar.replace(sg, '.')
        }

        if (typeof morse_num[mchar] != "undefined") {
            res += morse_num[mchar]
            f = true
        } else {
            if (caps_flag) {
                if (char_select) {
                    if (typeof Cmorse_alph[mchar] != "undefined") {
                        res += Cmorse_alph[mchar]
                        f = true
                    } else {
                        res += " \\" + raw_mchar + "\\ "
                    }
                } else {
                    if (typeof Cmorse_kana[mchar] != "undefined") {
                        res += Cmorse_kana[mchar]
                        f = true
                    } else {
                        res += " \\" + raw_mchar + "\\ "
                    }
                }
            } else {
                if (char_select) {
                    if (typeof morse_alph[mchar] != "undefined") {
                        res += morse_alph[mchar]
                        f = true
                    } else {
                        res += " \\" + raw_mchar + "\\ "
                    }
                } else {
                    if (typeof morse_kana[mchar] != "undefined") {
                        res += morse_kana[mchar]
                        f = true
                    } else {
                        res += " \\" + raw_mchar + "\\ "
                    }
                }
            }
        }
    }

    if (!f) {
        res = ""
    }

    output_char.textContent = res
}

function changechar() {
    let long        = document.getElementById("long").value
    let short       = document.getElementById("short").value
    let delimiter   = document.getElementById("delimiter").value
    let char_select = document.getElementsByName("char_select")[0].checked
    let kana_correction = document.getElementById("kana_correction").checked
    
    let input_char = document.getElementById("input_char").value
    let output_morse = document.getElementById("output_morse")

    if (long == "") {
        long = "_"
    }
    if (short == "") {
        short = "."
    }
    if (delimiter == "") {
        delimiter = " "
    }

    var res = ""
    var f = true
    for (var i = 0; i < input_char.length; i++) {
        mchar = input_char[i]
        if (mchar == '\n') {
            res += '\n'
            continue
        }
        if (typeof num_morse[mchar] != "undefined") {
            res += num_morse[mchar].replace(/_/g, long).replace(/\./g, short) + delimiter
        } else {
            if (char_select) {
                if (typeof Aalph_morse[mchar] != "undefined") {
                    res += Aalph_morse[mchar].replace(/_/g, long).replace(/\./g, short) + delimiter
                } else {
                    res += " \\" + mchar + "\\ "
                    f = false
                }
            } else {
                if (mchar.match(/["” ﾞ]/) != null) {
                    mchar = '゛'
                }
                if (mchar.match(/[˚° ﾟ]/) != null) {
                    mchar = '゜'
                }
                if (typeof Akana_morse[mchar] != "undefined") {
                    res += Akana_morse[mchar].replace(/_/g, long).replace(/\./g, short) + delimiter
                } else if (kana_correction == true) {
                    if (typeof kana_daku[mchar] != "undefined") {
                        res += Akana_morse[kana_daku[mchar]].replace(/_/g, long).replace(/\./g, short) + delimiter
                        res += Akana_morse['゛'].replace(/_/g, long).replace(/\./g, short) + delimiter
                    } else if (typeof kana_handaku[mchar] != "undefined") {
                        console.log(kana_handaku[mchar])
                        res += Akana_morse[kana_handaku[mchar]].replace(/_/g, long).replace(/\./g, short) + delimiter
                        res += Akana_morse['゜'].replace(/_/g, long).replace(/\./g, short) + delimiter
                    } else if (typeof kana_yousoku[mchar] != "undefined") {
                        res += Akana_morse[kana_yousoku[mchar]].replace(/_/g, long).replace(/\./g, short) + delimiter
                    } else if (typeof kana_hankaku[mchar] != "undefined") {
                        console.log(kana_hankaku[mchar])
                        res += Akana_morse[kana_hankaku[mchar]].replace(/_/g, long).replace(/\./g, short) + delimiter
                    } else {
                        res += " \\" + mchar + "\\ "
                        f = false
                    }
                } else {
                    res += " \\" + mchar + "\\ "
                    f = false
                }
            }
        }
    }

    if (!f) {
        res = ""
    }

    output_morse.textContent = res
}

function change_set() {
    changemorse()
    changechar()
}