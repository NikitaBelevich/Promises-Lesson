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


//Task 4 ------------------------------------------------
// Сделайте 3 промиса, в каждом из которых расположена функция setTimeout со случайно задержкой от 1 до 5 секунд. Пусть каждый промис своим результатом возвращает эту задержку. С помощью Promise.all получите массив результатов, найдите его сумму, выведите на экран.
const task4 = document.querySelector('.task4');

const prom4_1 = new Promise((resolve, reject) => {
    let delay = getRandomInt(1, 5);
    setTimeout(() => {
        resolve(delay);
    }, delay  * 1000);     
});
const prom4_2 = new Promise((resolve, reject) => {
    let delay = getRandomInt(1, 5);
    setTimeout(() => {
        resolve(delay);
    }, delay  * 1000);
});
const prom4_3 = new Promise((resolve, reject) => {
    let delay = getRandomInt(1, 5);
    setTimeout(() => {
        resolve(delay);
    }, delay  * 1000);
});

const result4 = Promise.all([prom4_1, prom4_2, prom4_3]).then(
    arr => {
        let delaySumm = arr.reduce((value, elem) => {
            return value += elem;
        }, 0);
        task4.textContent = `Исходный массив: [${arr}], сумма: ${delaySumm}`;
    }
);

//Task 5 ------------------------------------------------
// Сделайте 3 промиса, в каждом из которых расположена функция setTimeout со случайно задержкой от 1 до 5 секунд. Пусть первый промис возвращает число 1, второй - число 2, третий - число 3. С помощью Promise.race дождитесь загрузки первого сработавшего промиса и выведите результат его работы на экран.
const task5 = document.querySelector('.task5');

const prom5_1 = new Promise((resolve) => {
    let delay = getRandomInt(1, 5);
    setTimeout(() => {
        resolve(1);
    }, delay * 1000);
});
const prom5_2 = new Promise((resolve) => {
    let delay = getRandomInt(1, 5);
    setTimeout(() => {
        resolve(2);
    }, delay * 1000);
});
const prom5_3 = new Promise((resolve) => {
    let delay = getRandomInt(1, 5);
    setTimeout(() => {
        resolve(3);
    }, delay * 1000);
});

const result5 = Promise.race([prom5_1, prom5_2, prom5_3]).then(
    value => {
        task5.textContent = `Первым выполнился promise № ${value}`;
    }
);
