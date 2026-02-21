'use strict'

const gLevelsMap = {
    Easy: {
        SIZE: 4,
        MINES: 2,
        LIVES: 1
    },

    Medium: {
        SIZE: 8,
        MINES: 6,
        LIVES: 3
    },

    Hard: {
        SIZE: 12,
        MINES: 10,
        LIVES: 5
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

    onGameInit(gLevel.LIVES)
}

