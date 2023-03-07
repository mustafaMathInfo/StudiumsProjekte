export const fetchHttp = (url,methodHttp, headersHttp, bodyHttp) => {
    fetch(
        url, {
            method: methodHttp ? methodHttp : 'GET',
            headers: headersHttp ? headersHttp : {},
            body: bodyHttp ? JSON.stringify(bodyHttp) : null,
        })
        .then((response) => {
            console.log(response);
            if (!response.ok) {

            }
        }).catch((err) => {
        alert(err)
    })
}