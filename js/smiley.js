'use strict'
// onmouseenter="onSmileyEnter(this)" onmouseleave="onSmileyLeave(this)" onmousedown="onSmileyClick(this)"

function onSmileyEnter(elSmileyBtn) {
    elSmileyBtn.innerText = '😀'
}

function onSmileyLeave(elSmileyBtn) {
    elSmileyBtn.innerText = '🙂'
}

function onSmileyClick(elSmileyBtn) {
    elSmileyBtn.innerText = '😯'
}

