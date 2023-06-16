const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");

let currentPlayerr;
let grid;

const winning_pos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//function to intialize the game.

function init(){
    currentPlayerr="X";
    grid=["","","","","","","","",""];

    //UI UPDATE.

    boxes.forEach((box,index) =>{
        box.innerText= "";
        boxes[index].style.pointerEvents = "all"; 

        //initialising box with css property again.

        box.classList = `box box${index+1}`;
});
    newgamebtn.classList.remove("active");

    gameinfo.innerText = `Current Player - ${currentPlayerr}`;

}

init();

function swapTurn(){

    if(currentPlayerr === "X")
        currentPlayerr="O";
    else
        currentPlayerr="X";

        gameinfo.innerText = `Current Player - ${currentPlayerr}`;
  
}




function checkwin() {
    let answer = "";

    winning_pos.forEach((position) => {
        if (
            (grid[position[0]] !== "" || grid[position[1]] !== "" || grid[position[2]] !== "") &&
            (grid[position[0]] === grid[position[1]]) &&
            (grid[position[1]] === grid[position[2]])
        ) {
            if (grid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //disable pointer event ki aage click na ho aur wahi ruk jaye.

            boxes.forEach((box) => {

                box.style.pointerEvents = "none";
            })

            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

        
    });

    if(answer !== ""){
        gameinfo.innerText = `Winner Player -${answer}`;
        newgamebtn.classList.add("active");
        return;

    }

    //Game tied
    let count = 0;
    grid.forEach((box) => {
        if(box !== "")
            count++;
    });

    if(count === 9)
       { 
        gameinfo.innerText = `Game Tied`;
        newgamebtn.classList.add("active");
        }
}






function handleClick(index){

    if(grid[index] === ""){
         boxes[index].innerText = currentPlayerr;
         grid[index] = currentPlayerr; 
         
         boxes[index].style.pointerEvents = "none";
         //swap turn

         swapTurn();

         checkwin();
    }
}


boxes.forEach((box,index) => {
    box.addEventListener("click" , () =>{
        handleClick(index);
    })
});

newgamebtn.addEventListener("click",init);