const boxes = document.querySelectorAll('.box');
const boxArray = [
    {
        id: 1,
        text: ""
    },

    {
        id: 2,
        text: ""
    },

    {
        id: 3,
        text: ""
    },

    {
        id: 4,
        text: ""
    },

    {
        id: 5,
        text: ""
    },

    {
        id: 6,
        text: ""
    },

    {
        id: 7,
        text: ""
    },

    {
        id: 8,
        text: ""
    },

    {
        id: 9,
        text: ""
    },

];
const makeBoxesButton = document.getElementById('makeBoxes');
const gameBoard = document.querySelector('.gameBoard');

const playerFactory = (name, symbol) => {
    return {
        name,
        symbol,
    }
}

//iife to load the game board

(() => {
    boxArray.forEach((box) => {
        const gameboard = document.querySelector('.gameBoard');
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        newBox.setAttribute('id', `${box.id}`)
        newBox.innerText = `${box.text}`
        gameboard.appendChild(newBox);
    })
})();


gameBoard.addEventListener('click', (e) => {
    const index = parseInt(e.target.id);
    console.log(index);
    selectedBoxRef = boxArray.find(box => {
        return box.id === index;
    })
    selectedBoxRef.text = "X";
    updateBoxes();
});

function updateBoxes(){
    const gameboard = document.querySelector('.gameBoard');
    gameboard.innerHTML = '';
    boxArray.forEach(box => {
    const newBox = document.createElement('div');
    newBox.classList.add('box');
    newBox.setAttribute('id', `${box.id}`)
    newBox.innerText = `${box.text}`;
    gameboard.appendChild(newBox);
    })
};

