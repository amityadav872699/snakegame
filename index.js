// gamem constants and variables
let inputDir = {x: 0,y: 0};
// music initialization
const foodSound = new Audio('../music/food.mp3');
const gameOversound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
let foodArr = {x: 6, y: 7}
let score = 0;
// ID and classes elements
let board = document.getElementById('board');
let scoreDiv = document.getElementById('score');
let highScoreDiv = document.getElementById('highScore');

// game function


function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // musicSound.play();
}


function isCollide(snake){

    // if snake bump into himself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
        

    return false;
}
function gameEngine(){
    // part 1 : updating the snake array and Food
    if(isCollide(snakeArr)){
        gameOversound.play();
        musicSound.pause();
        inputDir = {x: 0,y: 0};
        alert("Game over. Press any key to play again");
        snakeArr = [{x: 13, y: 15}]
        // musicSound.play();
        score = 0;
        speed = 5;

    }

    // if snake eaten the food
    if(snakeArr[0].y === foodArr.y && snakeArr[0].x === foodArr.x){
        foodSound.play();
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        foodArr = {
            x: Math.round(a + (b-a)*Math.random()),
            y: Math.round(a + (b-a)*Math.random())
        }
        score += 1;
        if(score>hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
            highScoreDiv.innerHTML = `HiScore : ${hiScoreVal}`;
        }
        if(score%5==0){
            speed +=5;
        }
        scoreDiv.innerHTML = `Score : ${score}`;
    }

    // moving the snake
    for(let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2 : Display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add('snake-head');
        }
        else{
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    })
    // display the food
    
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodArr.y;
    foodElement.style.gridColumnStart = foodArr.x;
    foodElement.classList.add('snake-food');
    board.appendChild(foodElement);
    
}




// main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiScoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
}
else{
    hiScoreVal = JSON.parse(hiscore);
    highScoreDiv.innerHTML = `HiScore : ${hiScoreVal}`;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x: 0, y: 1}  //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('Up arrow');
            inputDir.x = 0;
            inputDir.y = -1;            
            break;
        case "ArrowDown":
            console.log('Down arrow');   
            inputDir.x = 0;
            inputDir.y = 1;         
            break;
        case "ArrowLeft":
            console.log('Left arrow'); 
            inputDir.x = -1;
            inputDir.y = 0;            
            break;
        case "ArrowRight":
            console.log('Right arrow'); 
            inputDir.x = 1;
            inputDir.y = 0;            
            break;
    
        default:
            break;
    }
})