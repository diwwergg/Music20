// this font end page is used to check the token
const token = localStorage.getItem("token");
const URL_ORIGIN1 = window.location.origin;

if (!token) {
    console.log('Token is not found');
    window.location.href = `${URL_ORIGIN1}`;
} else {
    const check = checkTokenVerify()
    if (!check) {
        console.log('Token is invalid');
        window.location.href = `${URL_ORIGIN1}`;
    }
}


async function checkTokenVerify() {
    const url = `${URL_ORIGIN1}/checkToken`;
    const bodyToken = { token };
    try {
        await fetch(url, {
            method: 'GET',
            body: JSON.stringify(bodyToken),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.auth) {
                    console.log('Token is valid');
                    return true;
                } else {
                    console.log('Token is invalid');
                    return false;
                }
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    } catch (error) {
        console.error(error);
        return false;
    }
}
