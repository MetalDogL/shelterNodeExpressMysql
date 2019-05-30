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
                let id = document.createElement('td');
                id.textContent = dog.id;
                row.appendChild(id);
                let hasHome = document.createElement('td');
                hasHome.textContent = dog.hashome === 1 ? "Yes" : "NO";
                row.appendChild(hasHome);
                let button = document.createElement('button');
                button.secretId = dog.id;
                button.textContent = 'DELETE';
                button.addEventListener('click', (event) => {
                    let deleteDog = new XMLHttpRequest();
                    deleteDog.open('DELETE', `http://localhost:3021/delete/${dog.id}`, true);
                    deleteDog.send();
                })
                row.appendChild(button);

                let takeHomeButton = document.createElement('button');
                takeHomeButton.secretId = dog.id;
                takeHomeButton.textContent = 'TAKE HOME';
                takeHomeButton.addEventListener('click', (event) => {
                    let takeHomeDog = new XMLHttpRequest();
                    takeHomeDog.open('PATCH', `http://localhost:3021/takeHome/${dog.id}`, true);
                    takeHomeDog.send();
                })
                row.appendChild(takeHomeButton);
                toFill.appendChild(row);
            })
        }
    }
    getDogs.send();

    let senddata = document.querySelector('.senddata');
    senddata.addEventListener('submit', (event) => {
        event.preventDefault();
        const { name, age } = event.target.elements;
        console.log(name.value, age.value);
        let bodyToSend = { name: name.value, age: age.value, date: Date.now(), hashome: false };
        let sendDog = new XMLHttpRequest();
        sendDog.open('POST', 'http://localhost:3021/', true);
        sendDog.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        sendDog.send(JSON.stringify(bodyToSend));
    })
}