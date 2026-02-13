'use strict'
var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gBoard = []

var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}

buildBoard()

function createMat(rows, cols = rows) {
    const mat = []
    for (var i = 0; i < rows; i++) {
        const row = []
        for (var j = 0; j < cols; j++) {
            row.push({
                minesAroundCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false
            })
        }
        mat.push(row)
    }
    return mat
}

function buildBoard() {
    gBoard = createMat(gLevel.SIZE)
    // place mines
    gBoard[0][1].isMine = true
    gBoard[1][0].isMine = true
}