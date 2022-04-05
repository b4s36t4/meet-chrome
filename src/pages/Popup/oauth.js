window.onload = function () {
    console.log(chrome.identity)
    document.querySelector("#connect").addEventListener("click", function () {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (token) {
                window.localStorage.setItem("token", token)
                window.location.reload()
            }
        })
    })
}