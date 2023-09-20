function noAddGrunt(msg, cb) {
    setTimeout(() => {
        cb(msg + "*grunt*");
    }, 1000);
}
function noAddSmack(msg, cb) {
    setTimeout(() => {
        cb("*smack*" + msg);
    }, 1000);
}
function noAddBreath(msg, cb) {
    setTimeout(() => {
        cb(msg + "*wheez*");
    }, 1000);
}
let msg = "telephone";

noAddGrunt(msg, (return1) => {
    noAddSmack(return1, (return2) => {
        noAddBreath(return2, (final) => {
            console.log(final);  // output => *smack*telephone*grunt**wheez*
        });
    });
});
