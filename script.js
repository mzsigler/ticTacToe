console.log("You are in the right file");
const wrapper = document.querySelector('.wrapper');
let boxesArray = ["", "", "", "", "", "", "", "", "", ];
const clearButton = document.querySelector('.clearBoard');



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
            alert("That space is already taken! Stop that!")
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
                alert(`${winner} wins!`);
                board.clearBoard();

        };
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

    }


    return {drawBoard, clearBoard}
}

// gameplay object

function playGame(gameBoard, X, O) {
    let winner;
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
            } else {
                board.clearBoard();
            }
        });
    }


    if(!winner){
        playRound(activePlayer)
    }


}

// instantiate the players, and the board, and start the game. 

const X = Player("X", "X");
const O = Player("O", "O");
const board = gameBoard();
playGame(board, X, O);
// this button resets the game. 

clearButton.addEventListener('click', board.clearBoard);

// TODO - declare a tie and clear the board

// TODO - make my own modals instead of using alert