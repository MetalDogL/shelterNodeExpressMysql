window.onload = () => {
    let toFill = document.querySelector(".fillable");
    let getDogs = new XMLHttpRequest();
    getDogs.open('GET', 'http://localhost:3021/getDogs', true);
    getDogs.onload = (response) => {
        if (response.target.status === 200) {
            let dogs = JSON.parse(response.target.response);
            dogs.forEach(dog => {
                let row = document.createElement('tr');
                let name = document.createElement('td');
                name.textContent = dog.name;
                row.appendChild(name);

                let age = document.createElement('td');
                age.textContent = dog.age;
                row.appendChild(age);

                let date = document.createElement('td');
                date.textContent = dog.date;
                row.appendChild(date);

                let hasHome = document.createElement('td');
                hasHome.textContent = dog.hashome === 1 ? "Yes" : "NO";
                row.appendChild(hasHome);

                toFill.appendChild(row);
            })
            console.log(dogs)
        }

    }
    getDogs.send();
}