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

//Task 6 ------------------------------------------------
// Сделайте функцию getNum, которая возвращает промис, который с задержкой в 3 секунды выведет случайное число от 1 до 5. Создайте async функцию, которая с помощью await будет дожидаться результата getNum, затем возводить его в квадрат и выводить на экран.
const task6 = document.querySelector('.task6');

function getNum() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomNum = getRandomInt(1, 5);
            resolve(randomNum);
        }, 3000);
    });
}


waitGetNum();
async function waitGetNum() {
    let randomNum = await getNum(); // ждём 3 секунды пока промис выполнится и вернёт случайное число
    task6.textContent = `Случайное число ${randomNum} в квадрате: ${randomNum ** 2}`;
}

//Task 7 ------------------------------------------------
// Сделайте функцию getNum1, которая возвращает промис, который с задержкой в 3 секунды выведет случайное число от 1 до 5. Сделайте также функцию getNum2, которая возвращает промис, который с задержкой в 5 секунд выведет случайное число от 6 до 10. Создайте async функцию, которая с помощью await будет дожидаться результата getNum1, затем будет дожидаться результата getNum2, а затем найдет сумму полученных чисел и выведет на экран.
const task7 = document.querySelector('.task7');

function getNum2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomNum = getRandomInt(6, 10);
            resolve(randomNum);
        }, 5000);
    });
}

waitGetNum2();
async function waitGetNum2() {
    // const rNum1 = Promise.all([getNum(), getNum2()]).then(arr => console.log(arr));
    const arrNumbersRand = await Promise.all([getNum(), getNum2()]);
    const summRandNum = arrNumbersRand.reduce((accum, elem) => accum += elem, 0);
    task7.textContent = `Случайные числа [${arrNumbersRand}], их сумма: ${summRandNum}`;
}

//Task 8 ------------------------------------------------
// Даны 3 картинки. С помощью Promise.all дождитесь окончания загрузки всех картинок и выведите их на экран.
const task8 = document.querySelector('.task8');
const imagesData = [
    'http://pngimg.com/uploads/macaron/macaron_PNG119.png',
    'http://pngimg.com/uploads/honey/honey_PNG86357.png',
    'http://pngimg.com/uploads/donut/donut_PNG26.png',
];

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;

        image.onload = () => resolve(image); // В случае загрузки, отдаём картинку
        image.onerror = () => reject(new Error(`Invalid url: ${url}`)); // В случае ошибки загрузки, передаём ошибку
    });
}

// Самовызывающаяся функция
( async () => {
    try {
        // Дожидаемся загрузки картинок, в случае успеха, вставляем на страницу
        // Для каждого url создали промис и возвратили все промисы в виде массива
        // Затем дожидаемся выполнения Promise.all и получаем массив картинок
        let uploadedImages = await Promise.all(imagesData.map(urlImg => {return loadImg(urlImg)}));
        // Вставляем все загруженные картинки на страницу
        uploadedImages.forEach(image => {
            task8.append(image);
        });
    } catch (err) {
        // Если загрузка не удалась, выводим в консоль сообщение
        console.error(err.message);
    }
})();
