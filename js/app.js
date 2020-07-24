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

// Task 2

const task2 = document.querySelector('.task2');

let promise3 = new Promise((resolve, reject) => {
    let randomNumber = getRandomInt(1, 10);
    setTimeout(() => {
        if (randomNumber % 2 == 0) resolve('Successfully');
        else reject(new Error('Failed'));
    }, 5000);
});

promise3.then(
        result => {
            task2.textContent = result;
        }
    )
    .catch(
        error => {
            task2.textContent = error;
        }
    );


//Task 3 ------------------------------------------------
// Сделайте цепочку из трех промисов. Пусть первый промис возвращает число. Сделайте так, чтобы каждый последующий промис через 3 секунды возводил в квадрат результат предыдущего промиса. После окончания манипуляций выведите число алертом на экран.
const task3 = document.querySelector('.task3');

function powNumber(num) {
    return new Promise((resolve) => {
        task3.textContent = num;
        resolve(num);
    });
}

powNumber(4)
    .then(
        num => new Promise((resolve) => { // возвели 4 в квадрат через 3 с.
            setTimeout(() => {
                num = Math.pow(num, 2);
                task3.textContent = num;
                resolve(num);
            }, 3000);
        })
    )
    .then(
        num => new Promise((resolve) => { // возвели 16 в квадрат через 3 с.
            setTimeout(() => {
                num = Math.pow(num, 2);
                resolve(num);
            }, 3000);
        })
    )
    .then(
        num => { // уже ничего не делаем, отдаём результат
            task3.textContent = num;
        }
    ).catch(
        (err) => {
            console.warn(err);
        }
    );
