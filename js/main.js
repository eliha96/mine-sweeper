'use strict'

const MINE = '💣'
const FLAG = '🚩'

var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1
}

var gBoard = []

var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0,
    livesCount: 0
}

var gTimerInterval


function onGameInit() {
    gGame.isOn = true
    buildBoard()
    resetTimer()
    handleMineCount()
    updateLivesCount(gLevel.LIVES)
}

function buildBoard() {
    gBoard = createMat(gLevel.SIZE)
    placeMines()
    setMinesNegsCount(gBoard)
    renderBoard()
}

function createMat(rows, cols = rows) {
    const mat = []
    for (var i = 0; i < rows; i++) {
        const row = []
        for (var j = 0; j < cols; j++) {
            row.push({
                minesAroundCount: null,
                isRevealed: false,
                isMine: false,
                isMarked: false
            })
        }
        mat.push(row)
    }
    return mat
}


function renderBoard() {
    const elSmileyBtn = document.querySelector('.smiley-btn')
    const elTbody = document.querySelector('tbody')

    elSmileyBtn.innerText = '🙂'

    var htmlStr = ''
    for (var i = 0; i < gBoard.length; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < gBoard[i].length; j++) {
            var cellContent = gBoard[i][j].isMine ? MINE : gBoard[i][j].minesAroundCount
            var cellPosClass = getClassName({ i, j })
            htmlStr += `<td class="cell cell-hover ${cellContent === MINE ? 'mine' : 'num-' + cellContent} ${cellPosClass}" onclick="onCellClicked(this, ${i}, ${j})"
            oncontextmenu="onCellMark(this, ${i}, ${j}, event)">
            <span class="cell-content">${cellContent === 0 ? '' : cellContent}</span>
            <span class="cell-mark">${FLAG}</span>
            </td>`
        }
        htmlStr += '</tr>'
    }

    elTbody.innerHTML = htmlStr
}



function onCellClicked(elCell, i, j) {
    if (!gTimerInterval) gTimerInterval = setInterval(runTimer,1000)

    const clickedCell = gBoard[i][j]

    if (!gGame.isOn || clickedCell.isMarked) return

    revealCell(elCell, i, j)

    if (clickedCell.isMine) {
        onMineClick(elCell, i, j)
        return
    }

    if (clickedCell.minesAroundCount === 0) expandReveal(gBoard, { i, j })

    if(isVictory()) gameOver()
}

function onCellMark(elCell, i, j, ev=null) {
    if (!gTimerInterval) gTimerInterval = setInterval(runTimer,1000)

    if (ev) ev.preventDefault()
    if (gBoard[i][j].isRevealed) return

    // update model
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    handleMineCount()

    // update DOM
    elCell.querySelector('.cell-mark').style.display = gBoard[i][j].isMarked ? 'block' : 'none'

    if(isVictory()) gameOver()
}

function gameOver() {
    gGame.isOn = false

    // disable hover
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const currCell = document.querySelector(`.pos-${i}-${j}`)
            currCell.classList.remove('cell-hover')
        }
    }

    const elSmileyBtn = document.querySelector('.smiley-btn')
    isVictory() ? elSmileyBtn.innerText = '😎' : elSmileyBtn.innerText = '🤯'

    // stop timer
    clearInterval(gTimerInterval)
}


function isVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            var currCell = gBoard[i][j]

            // check if all not mines revealed 
            if (!currCell.isRevealed && !currCell.isMine) return

            // check if marked mine
            if (currCell.isMine && !currCell.isMarked) return

        }

    }
    return true
}

function revealCell(elCell, i, j) {
    // update model
    gBoard[i][j].isRevealed = true

    // update DOM
    elCell.querySelector('.cell-content').style.display = 'block'
    elCell.classList.add('clicked')
}

function hideCell(elCell, i, j) {
    // update model
    gBoard[i][j].isRevealed = false

    // update DOM
    elCell.querySelector('.cell-content').style.display = 'none'
    elCell.classList.remove('clicked')
}

function expandReveal(board, pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === pos.i && j === pos.j) continue

            var elCell = document.querySelector(`.pos-${i}-${j}`)
            if (!board[i][j].isMine && !board[i][j].isMarked) revealCell(elCell, i, j)
        }
    }
}

function updateLivesCount(lives=null)  {
    gGame.livesCount = lives ? lives : gGame.livesCount
    const elLivesCount = document.querySelector('.num-lives')
    elLivesCount.innerText = gGame.livesCount
}