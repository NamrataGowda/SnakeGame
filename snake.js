//canvas 
var boardSize = 25 ;
var row = 20;
var col = 20;
var board;
var context;

//snake
var snakeX = boardSize * 5;
var snakeY = boardSize * 5;

//food
var foodX;
var foodY;

//physics
var velocityX = 0;
var velocityY = 0;

//Loads the canvas on screen
window.onload = function(){

    board = document.getElementById("board");
    board.height = row * boardSize;
    board.width = col * boardSize;
    context = board.getContext("2d"); //used for drawing on the board

    showFood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000/10); //This will update the screen 10 times in 1 second

}

//adds different elements to the canvas
function update(){

    //canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //snake
    context.fillStyle = "yellow";
    snakeX += velocityX * boardSize;
    snakeY += velocityY * boardSize;
    context.fillRect(snakeX, snakeY, boardSize, boardSize);

    if(snakeX == foodX && snakeY == foodY){
        showFood();
    }

    //food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, boardSize, boardSize);
}

//makes food appear anywhere 
function showFood(){
    foodX = Math.floor(Math.random() * col) * boardSize;
    foodY = Math.floor(Math.random() * row) * boardSize;
}

//changing direction of snake
function changeDirection(e){
    if(e.code == 'ArrowUp'){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == 'ArrowDown'){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == 'ArrowLeft'){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == 'ArrowRight'){
        velocityX = 1;
        velocityY = 0;
    }
}

