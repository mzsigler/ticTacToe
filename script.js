const boxes = document.querySelectorAll('.box');
const boxArray = Array.from([length = 9]);
console.log(boxArray)

boxes.forEach(box => {
    box.addEventListener("click", () => {
        console.log(`I am ${box.id}`)
    })
})