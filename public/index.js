window.onload = () => {
    let toFill = document.querySelector(".fillable");
    let getDogs = new XMLHttpRequest();
    getDogs.open('GET', 'http://localhost:3021/getDogs', true);
    getDogs.onload = (response) => {
        if (response.target.status === 200) {
            console.log(response.target.response)
        }

    }
    getDogs.send();
}