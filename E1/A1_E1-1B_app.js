function noAddGrunt(msg) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(msg + "*grunt*");
        }, 1000);
    });
}

function noAddSmack(msg) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve("*smack*" + msg);
        }, 1000);
    });
}

function noAddBreath(msg) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(msg + "*wheez*");
        }, 1000);
    });
}

let msg = "telephone";

noAddGrunt(msg).then(return1 => {
    noAddSmack(return1).then(return2 => {
        noAddBreath(return2).then(final => {
            console.log(final); // output => *smack*telephone*grunt**wheez*
        });
    });
});