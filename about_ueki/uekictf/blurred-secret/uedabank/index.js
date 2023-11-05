let login_flag = false

// function account_opening() {}
// function login() {}

function customer_page() {
    if (login_flag == true) {
        location.href = "customer_page.html"
    } else {
        alert("ログイン状態でのみご確認いただけます")
    }
}