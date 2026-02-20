'use strict'

function placeMines() {
    var mine = 0
    while (mine < gLevel.MINES) {
        var i = getRandomInt(gLevel.SIZE)
        var j = getRandomInt(gLevel.SIZE)
        
        // prevent two mines placed at the same place
        if (gBoard[i][j].isMine) continue

        gBoard[i][j].isMine = true
        mine++
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cellPos = { i, j }
            board[i][j].minesAroundCount = countMinesAround(cellPos, board)
        }

    }

}

function countMinesAround(pos, board) {
    var count = 0
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === pos.i && j === pos.j) continue

            if (board[i][j].isMine) count++
        }
    }
    return count
}


function revealAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (!gBoard[i][j].isMine) continue
            const elCell = document.querySelector(`.${getClassName({ i, j })}`)
            revealCell(elCell, i, j)
        }
    }
}

function handleMineCount() {
    // count marked cells
    var markedCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMarked) markedCount++
        }
    }

    // update model
    gGame.markedCount = markedCount

    // update DOM
    var numMines = gLevel.MINES - markedCount
    
    const elNumMine = document.querySelector('.num-mines')
    elNumMine.innerText = numMines

    numMines < 0 ? elNumMine.style.color = 'red' : elNumMine.style.color = 'black'
}