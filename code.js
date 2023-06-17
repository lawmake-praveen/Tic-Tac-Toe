const cells = document.querySelectorAll('.cell')
const statusText = document.querySelector('.status')
const resetBtn = document.querySelector('.reset')
const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [0,4,8],
  [2,5,8],
  [2,4,6],
  [1,4,7]
]
let options = ['','','','','','','','','']
let currentPlayer = 'X'
let playing = false

initializeGame()

function initializeGame(){
  cells.forEach(cell => cell.addEventListener('click',cellClicked))
  resetBtn.addEventListener('click',reset)
  statusText.textContent = `${currentPlayer}'s turn`
  playing = true
}
function cellClicked(){
  const cellIndex = this.getAttribute('cellIndex')

  if(options[cellIndex] != '' || !playing){
    return;
  }
  updateCell(this, cellIndex)
  checkWinner()
}
function updateCell(cell, cellIndex){
  options[cellIndex] = currentPlayer
  cell.textContent = currentPlayer
}
function changePlayer (){
  if(currentPlayer == 'X'){
    currentPlayer = 'O'
  }else if(currentPlayer == 'O'){
    currentPlayer = 'X'
  }
  statusText.textContent = `${currentPlayer}'s turn`
}
function checkWinner(){
  let roundWon = false
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i]
    const cellA = options[condition[0]]
    const cellB = options[condition[1]]
    const cellC = options[condition[2]]

    if(cellA == '' || cellB == '' || cellC == ''){
      continue
    }else if(cellA == cellB && cellB == cellC){
      roundWon  = true
      break
    }
  }
  if(roundWon){
    statusText.textContent = `${currentPlayer} Won`
    playing = false
  }else if(!options.includes('')){
    statusText.textContent = 'Draw'
    playing = false
  }else{
    changePlayer()
  }
}
function reset(){
    currentPlayer = 'X'
    options = ['','','','','','','','','']
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach((cell)=>{cell.textContent = ''})
    playing = true
}