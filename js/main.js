'use strict'

const MINE = '💣'
const FLAG = '🚩'

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


function onGameInit() {
    buildBoard()
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

function placeMines() {
    var mine = 0
    while (mine < gLevel.MINES) {
        var i = getRandomInt(gLevel.SIZE)
        var j = getRandomInt(gLevel.SIZE)
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

function renderBoard() {
    const elTbody = document.querySelector('tbody')

    var htmlStr = ''
    for (var i = 0; i < gBoard.length; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < gBoard[i].length; j++) {
            var classList = getClassName({ i, j })
            htmlStr += `<td class="cell ${classList}" onclick="onCellClicked(this, ${i}, ${j})"
            oncontextmenu="onCellMark(this, ${i}, ${j}, event)"
            ><span class="cell-content">${gBoard[i][j].isMine ? MINE : gBoard[i][j].minesAroundCount}
            </span>
            <span class="cell-mark">${FLAG}</span>
            </td>`
        }
        htmlStr += '</tr>'
    }

    elTbody.innerHTML = htmlStr
}

function buildBoard() {
    gBoard = createMat(gLevel.SIZE)
    placeMines()
    setMinesNegsCount(gBoard)
    renderBoard()
}


function getRandomInt(max, min = 0) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function onCellClicked(elCell, i, j, ev) {
    if (gBoard[i][j].isMarked) return

    // update model
    gBoard[i][j].isRevealed = true
    console.log(ev)

    elCell.querySelector('.cell-content').style.display = 'block'
}

function onCellMark(elCell, i, j, ev) {

    ev.preventDefault()
    if (gBoard[i][j].isRevealed) return

    // update model
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    console.log(gBoard[i][j].isMarked)


    // update DOM
    elCell.querySelector('.cell-mark').style.display = gBoard[i][j].isMarked ? 'block' : 'none'
}


function getClassName(position) {
    const cellClass = `cell-${position.i}-${position.j}`
    return cellClass
}