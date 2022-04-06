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

// useEffect(() => {
//     if (!isTokenSave || !window) return;
//     const call = async () => {
//       const token = localStorage.getItem("token")
//       console.log(token)
//       const req = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date().toISOString()}`, {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       })
//       console.log(req)
//     }
//     call();
//   }, [isTokenSave])