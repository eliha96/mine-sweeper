'use strict'

function buildBoard(currCell) {
    placeMines(currCell)
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
