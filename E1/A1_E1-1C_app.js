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



async function result(msg) {
    const return1 = await noAddGrunt(msg);
    const return2 = await noAddSmack(return1);
    const final = await noAddBreath(return2);
    console.log(final); // output => *smack*telephone*grunt**wheez*
}
let msg = "telephone";
result(msg);