'use strict';

function delay(ms) {

    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(`Promise был выполнен успешно через ${ms} миллисекунд`);
        }, ms);
    });

}
delay(3000).then(
    result => {alert(result)}
);


// console.log(promise);