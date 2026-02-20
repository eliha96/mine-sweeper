'use strict'

function resetTimer() {

    // clear interval
    clearInterval(gTimerInterval)
    gTimerInterval = null

    // reset gTime
    gGame.secsPassed = 0

    // update DOM
    renderTimer()
}


function runTimer() {
    gGame.secsPassed++
    renderTimer()
}


function renderTimer() {
    const seconds = gGame.secsPassed % 60
    const minutes = (gGame.secsPassed / 60).toFixed(0)

    const elSeconds = document.querySelector('.seconds')
    const elMinutes = document.querySelector('.minutes')

    // render seconds
    elSeconds.innerText = seconds < 10 ? '0' + seconds : seconds

    // render minutes
    elMinutes.innerText = minutes < 10 ? '0' + minutes : minutes
}