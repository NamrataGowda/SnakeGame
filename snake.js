//canvas 
var boardSize = 25 ;
var row = 20;
var col = 20;
var board;
var context;

//snake
var snakeX = boardSize * 5;
var snakeY = boardSize * 5;
var snakeBody = [] //This snake body will expand

//food
var foodX;
var foodY;

//physics
var velocityX = 0;
var velocityY = 0;

var gameOver = false;



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

    if(gameOver){
        return;
    }

    //canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, boardSize, boardSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        showFood();
    }

    for(let i = snakeBody.length - 1 ; i > 0 ; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //snake's movement
    context.fillStyle = "yellow";
    snakeX += velocityX * boardSize;
    snakeY += velocityY * boardSize;
    context.fillRect(snakeX, snakeY, boardSize, boardSize);
    for(let i = 0; i <= snakeBody.length ; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boardSize, boardSize);
    }
 
    if(snakeX < 0 || snakeX > col*blockSize || snakeY < 0 || snakeY > row*blockSize){
         gameOver = true;
         alert("GAME OVER !");
     }

    for(let i = 0; i < snakeBody.length; i++){
         if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
             gameOver = true;
             alert("GAME OVER !");
         }

 }
}

//makes food appear anywhere 
function showFood(){
    foodX = Math.floor(Math.random() * col) * boardSize;
    foodY = Math.floor(Math.random() * row) * boardSize;
}

//changing direction of snake
function changeDirection(e){
    if(e.code == 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

