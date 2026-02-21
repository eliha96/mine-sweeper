'use strict'

const gLevelsMap = {
    Easy: {
        SIZE: 4,
        MINES: 2
    },

    Medium: {
        SIZE: 8,
        MINES: 6
    },

    Hard: {
        SIZE: 12,
        MINES: 10
    }
}

function onLevelClick(elLevel) {
    // update gLevel
    const levelName = elLevel.innerText
    gLevel = gLevelsMap[levelName]

    // update DOM
    const elLevels = document.querySelectorAll('.level')
    elLevels.forEach(level => {level.classList.remove('clicked')})
    
    elLevel.classList.add('clicked')

    onGameInit()
}

