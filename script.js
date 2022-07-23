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
        div.innerText = `${marker}`;
        markerArray.push(target);

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

    console.log(pickPlayer())

    if (pickPlayer === 0) {
        activePlayer = player1
    } else {
        activePlayer = player2
    }


    playRound = (activePlayer) => {
        const APdisplay = document.querySelector('.activePlayer');
        APdisplay.innerText = `Active Player: ${activePlayer.handle}`
        wrapper.addEventListener('click', activePlayer.handleClick);

    }





}

const player1 = Player("Player One", "X");
const player2 = Player("Player Two", "O");


const board = gameBoard();
playGame(board, player1, player2)
