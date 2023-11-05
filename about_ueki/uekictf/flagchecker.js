/*
LICENCE : MIT

Copyright © 2023 Ll_e_ki

https://opensource.org/license/mit/
*/

async function sha256(text){
    let encoded_text = new TextEncoder().encode(text);
    let tmp_hash_abuffer = await crypto.subtle.digest("SHA-256", encoded_text);
    let hash_array = Array.from(new Uint8Array(tmp_hash_abuffer));
    let hash = hash_array.map(b => b.toString(16).padStart(2, '0')).join('');

    return hash;
}

async function check(seikaihash, stretchingnokaisuuu, seikainotokinomessage, chigautokimessageno) {
    let tmp_hash = document.getElementById("submit_flag").value
    for (var i = 0; i < stretchingnokaisuuu; i++) {
        tmp_hash = await sha256(tmp_hash)
    }
    console.log(tmp_hash)
    if (tmp_hash == seikaihash) {
        alert(seikainotokinomessage)
    } else {
        alert(chigautokimessageno)
    }
}