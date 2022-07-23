console.log("You are in the right file");
const wrapper = document.querySelector('.wrapper');
const boxesArray = ["", "", "", "", "", "", "", "", "", ]


const Player = (name, symbol) => {
    const markerArray = []
    const marker = symbol;
    const handle = name;
    const handleClick = e => {
        const target = parseInt(e.target.id);
        const div = document.getElementById(`${target}`);
        div.classList.toggle('unavailable');
        div.setAttribute('owner', marker)
        div.innerText = `${target}`;
        boxesArray[target] = marker;

    }
    return {
        marker,
        handle,
        markerArray,
        handleClick,
    };
}

const gameBoard = () => {
    const drawBoard = () => {
        boxesArray.forEach((box, index) => {
           const newBox = document.createElement('div');
           newBox.classList.add('box');
           newBox.setAttribute("id", index);
           wrapper.appendChild(newBox);

        })
    }

    return {drawBoard}
}

function playGame(gameBoard, player1, player2) {
    let activePlayer;
    let winner;
    gameBoard.drawBoard();
    
    pickPlayer = () => {
        return Math.floor(Math.random() * 2)
    }

    if (pickPlayer === 0) {
        activePlayer = player1
    } else {
        activePlayer = player2
    }


    playRound = (activePlayer) => {
        const APdisplay = document.querySelector('.activePlayer');
        APdisplay.innerText = `Active Player: ${activePlayer.handle}`
        wrapper.addEventListener('click', ( (e) => {
            activePlayer.handleClick(e);
            checkForWin(activePlayer);
        }));
    }

    checkForWin = (activePlayer) => {
        if(activePlayer.marker === boxesArray[0] 
            && activePlayer.marker === boxesArray[1] 
            && activePlayer.marker === boxesArray[2]
            || activePlayer.marker === boxesArray[3]
            && activePlayer.marker === boxesArray[4]
            && activePlayer.marker === boxesArray[5]
            || activePlayer.marker === boxesArray[6]
            && activePlayer.marker === boxesArray[7]
            && activePlayer.marker === boxesArray[8]
            || activePlayer.marker === boxesArray[0]
            && activePlayer.marker === boxesArray[3]
            && activePlayer.marker === boxesArray[6]
            || activePlayer.marker === boxesArray[1]
            && activePlayer.marker === boxesArray[4]
            && activePlayer.marker === boxesArray[7]
            || activePlayer.marker === boxesArray[2]
            && activePlayer.marker === boxesArray[5]
            && activePlayer.marker === boxesArray[8]
            || activePlayer.marker === boxesArray[0]
            && activePlayer.marker === boxesArray[4]
            && activePlayer.marker === boxesArray[8]
            || activePlayer.marker === boxesArray[2]
            && activePlayer.marker === boxesArray[4]
            && activePlayer.marker === boxesArray[6]
            ) {
            console.log("You won!")
        } else {
            console.log(boxesArray)
        }
    };

    playRound(activePlayer);


}

const player1 = Player("Player One", "X");
const player2 = Player("Player Two", "O");
const board = gameBoard();
playGame(board, player1, player2)
