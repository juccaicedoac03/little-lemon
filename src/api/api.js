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
    if (x<8){
        x = x+10;
    }

    let tables = [];
    for (let i = 0; i<x; i++) {
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

export const updTables = function (times, newTimes) {
    let TIMES = {...times};
    let keys = Object.keys(TIMES);
    let tables = TIMES[keys[0]];
    for (let i of newTimes) {
        if (!keys.includes(i)) {
            TIMES[i] = tables;
        };
    }
    return TIMES;
};

export const getReservations = function(sels) {
    let reservations = [];
    for (let keyDate in sels) {
        for (let keyTime in sels[keyDate]) {
            sels[keyDate][keyTime].map((element)=>{
                return (
                reservations.push(keyDate + "-" + keyTime + "-" +  element)
                )
            });
        };
    };
    return reservations;
}

export const formatDate = (date) => {
    const dateVec = date.toLocaleString().split(' ')[0].split('/')
    if (dateVec[1].length===1){
        dateVec[1] = '0' + dateVec[1];
    }
    return dateVec[2] + '-' + dateVec[1] + '-' + dateVec[0];
};

export const fetchAPI = function(date) {
    const result = [];
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