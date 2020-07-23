'use strict';

function delay(ms) {

    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(`Promise был выполнен успешно через ${ms} миллисекунд`);
        }, ms);
    });

}
delay(3000).then(
    // result => {alert(result)}
);

const task1 = document.querySelector('.task1');

let promise2 = new Promise((resolve, reject) => {
    let randomNumber = getRandomInt(1, 10);
    setTimeout(() => {
        if (randomNumber >= 1 && randomNumber <= 5) resolve(randomNumber);
        if (randomNumber > 5) reject(new Error(`Случайное число ${randomNumber} > 5`))
    }, randomNumber * 1000);
})

promise2.then(
    result => {
        task1.textContent = `Случайное число ${result}`;
    },
    error => {
        task1.textContent = error;
    }
);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
