console.log("You are in the right file");
const wrapper = document.querySelector('.wrapper');
let boxesArray = ["", "", "", "", "", "", "", "", "", ];
const clearButton = document.querySelector('.clearBoard');
const closeModalButton = document.querySelector('.close-modal');
const modalContainer = document.querySelector('.modal-container');
const modalText = document.querySelector('.modalText');
let winner;



//player object creator

const Player = (name, symbol) => {
    const marker = symbol;
    const handle = name;

    //this basically determines who's marker gets put on the board and in the array
    //based on activePlayer

    const handleClick = e => {
        const target = parseInt(e.target.id);
        const div = document.getElementById(`${target}`);
        if(!div.classList.contains('unavailable')) {
            div.classList.toggle('unavailable');
            div.innerText = `${marker}`;
            boxesArray[target] = marker;
        } else {
            modalContainer.classList.toggle('hidden');
            modalText.innerText = `That space is already taken! Stop that!`;
        }
        
    }

    // check for winning combinations in the array

    const checkForWin = () => {
        if(marker === boxesArray[0] 
            && marker === boxesArray[1] 
            && marker === boxesArray[2]
            || marker === boxesArray[3]
            && marker === boxesArray[4]
            && marker === boxesArray[5]
            || marker === boxesArray[6]
            && marker === boxesArray[7]
            && marker === boxesArray[8]
            || marker === boxesArray[0]
            && marker === boxesArray[3]
            && marker === boxesArray[6]
            || marker === boxesArray[1]
            && marker === boxesArray[4]
            && marker === boxesArray[7]
            || marker === boxesArray[2]
            && marker === boxesArray[5]
            && marker === boxesArray[8]
            || marker === boxesArray[0]
            && marker === boxesArray[4]
            && marker === boxesArray[8]
            || marker === boxesArray[2]
            && marker === boxesArray[4]
            && marker === boxesArray[6]
            ) {
                winner = handle;
                modalContainer.classList.toggle('hidden');
                modalText.innerText = `${winner} wins!`;
        

                board.clearBoard();

        };

        // if the array has no empty spots and there is still no winner, declare a tie. 

        const boxes = boxesArray.includes("")
        
        if(!boxes && !winner){
            modalContainer.classList.toggle('hidden');
            modalText.innerText = `Tie!`;
            board.clearBoard();
        }
    };


    //instantiate the active property so I can flip it after each round to rotate activePlayer 

    let active;

    return {
        marker,
        handle,
        handleClick,
        checkForWin,
        active,
    };
}

// gameboard object and associated methods

const gameBoard = () => {
    const drawBoard = () => {
        boxesArray.forEach((box, index) => {
           const newBox = document.createElement('div');
           newBox.classList.add('box');
           newBox.setAttribute("id", index);
           wrapper.appendChild(newBox);

        })
    }

    const clearBoard = () => {
        for(i = 0; i < boxesArray.length; i++){
            boxesArray[i] = ""
        }

        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.innerText = "";
            box.classList.remove('unavailable')
        })

        winner = '';
    }


    return {drawBoard, clearBoard}
}

// gameplay object

function playGame(gameBoard, X, O) {
    let activePlayer = O;
    gameBoard.drawBoard();

    
    const playRound = (activePlayer) => {

        const handleEvents = (e) => {
            activePlayer.handleClick(e);
            activePlayer.checkForWin();
        }

        const APdisplay = document.querySelector('.activePlayer');
        APdisplay.innerText = `Active Player: ${activePlayer.handle}`;
        wrapper.addEventListener('click', function myFunction(e) {
            handleEvents(e);
            wrapper.removeEventListener('click', myFunction);
            if(!winner){
                if(X.active === true){
                    X.active = false
                    O.active = true
                    playRound(O)
                } else {
                    O.active = false
                    X.active = true
                    playRound(X)
                }
            } else if (winner === X){
                board.clearBoard();
                playGame(board, X, O);
            } else {
                board.clearBoard();
                playGame(board, X, O);
            }
        });
    }

    playRound(activePlayer)



}

// instantiate the players, and the board, and start the game. 

const X = Player("X", "X");
const O = Player("O", "O");
const board = gameBoard();
playGame(board, X, O);
// this button resets the game. 

clearButton.addEventListener('click', board.clearBoard);
closeModalButton.addEventListener('click', ( () => {
    modalContainer.classList.toggle('hidden')
}));
// TODO - make my own modals instead of using alert