export const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
};

export const genTables = function (date, times) {
    let min = 1;
    let max = 15;

    let x = Array.from(date.getDate().toString(), Number).reduce((a, b) => a + b, 0);

    let tables = [];

    for (let i = 0; tables.length<x; i++) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            if ( !tables.includes("Table "+randomNumber) ){
                tables.push("Table "+randomNumber);
        };
    };

    let timeTables = {}
    for (let i of times) {
      timeTables[i] = tables;
    }
    return timeTables;
};

export const fetchAPI = function(date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};
export const submitAPI = function(formData) {
    return true;
};