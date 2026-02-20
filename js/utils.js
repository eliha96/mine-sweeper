'use strict'


function getRandomInt(max, min = 0) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getClassName(position) {
    const cellClass = `pos-${position.i}-${position.j}`
    return cellClass
}