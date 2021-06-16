const { POW, V_RESOLUTION, V_REF_N, AV, R, E, E1, M, B, RF } = require("../constants");

const getDecimal = data => [...data].reverse().map((bit, indx) => Math.pow(+bit === 0 ? 0 : POW, indx)).reduce((x,y) => x + y);

const getHR = data => {
    const decimal = getDecimal(data); 
    let Va = (decimal * V_RESOLUTION); 
    let Vsal = Va + 1; 
    let Vsen = Vsal/(1+(R/RF));
    let HR = (Vsen - B)/M; 
    console.log("HR",HR);
    return HR;
}

 
module.exports = { getHR, getDecimal };