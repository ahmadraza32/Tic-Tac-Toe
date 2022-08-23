
const X_CLASS = 'x'
const CIRLCE_CLASS = 'circle'
let circleTurn

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const board = document.getElementById('board')
const ceils = document.querySelectorAll('[data-ceil]')
const h1Element = document.querySelector('[data-winning-message-text]')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    ceils.forEach(ceil => {
        ceil.classList.remove(X_CLASS)
        ceil.classList.remove(CIRLCE_CLASS)
        ceil.removeEventListener('click', handleClick)
        ceil.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}

function handleClick(e){
    const ceil = e.target
    const currentClass = circleTurn ? CIRLCE_CLASS : X_CLASS

    // placeMark
    placeMark(ceil, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        // switching turn
        swapTurn()
    
        // hover state
        setBoardHoverClass()
    }

}

function isDraw(){
    return [...ceils].every(ceil => {
        return ceil.classList.contains(X_CLASS) || ceil.classList.contains(CIRLCE_CLASS)
    })
}

function endGame(draw){
    if(draw){
        h1Element.innerText = `Game Draw`
    }
    else{
        h1Element.innerText = `${circleTurn ? "O's " : "X's " } wins.`
    }
    winningMessage.classList.add('show')
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return ceils[index].classList.contains(currentClass)
        })
    })
}

function placeMark(ceil, currentClass){
    ceil.classList.add(currentClass)
}

function swapTurn(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(CIRLCE_CLASS)
    board.classList.remove(X_CLASS)
    if(circleTurn){
        board.classList.add(CIRLCE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}