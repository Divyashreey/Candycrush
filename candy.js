var candies=["Blue","Orange","Green","Yellow","Red","Purple"];
var board=[];
var row=9;
var col=9;
var score=0;
var currTile;
var otherTile;
window.onload=function(){
    startGame();
    window.setInterval(function(){
        crushCandy();
        slidecandy();
        generateCandy();
    },100);
}
function randomCandy(){
    return candies[Math.floor(Math.random()* candies.length)];
}
function startGame() {
    for (let r = 0; r < row; r++) {
        let newRow = [];
        for (let c = 0; c < col; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";
            // Add event listeners for both touch events and mouse events
            tile.addEventListener("touchstart", handleTouchStart);
            tile.addEventListener("touchmove", handleTouchMove);
            tile.addEventListener("touchend", handleTouchEnd);
            tile.addEventListener("mousedown", handleMouseDown);
            tile.addEventListener("mousemove", handleMouseMove);
            tile.addEventListener("mouseup", handleMouseUp);
            document.getElementById("board").append(tile);
            newRow.push(tile);
        }
        board.push(newRow);
    }
    console.log(board);
}



function handleTouchStart(event) {
    event.preventDefault();
    currTile = this;
}

function handleTouchMove(event) {
    event.preventDefault();
    // Implement touch move handling if necessary
}

function handleTouchEnd(event) {
    event.preventDefault();
    otherTile = this;
    // Call dragEnd function after touch end
    dragEnd();
}

function handleMouseDown(event) {
    event.preventDefault();
    currTile = this;
}

function handleMouseMove(event) {
    event.preventDefault();
    // Implement mouse move handling if necessary
}
function handleMouseUp(event) {
    event.preventDefault();
    otherTile = this;
    // Call dragEnd function after mouse up
    dragEnd();
}
function dragEnd(){
    if(currTile.src.includes("blank")||otherTile.src.includes("blank"))
    {
     return;
    }
    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        let validMove= checkvalid();
        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg; 
        }
    }
}
function crushCandy(){
   crushThree();
   document.getElementById("score").innerText=score;
}
function crushThree(){
    for(let r=0;r<row;r++){
       
        for(let c=0;c<col-2;c++){
           let candy1=board[r][c];
           let candy2=board[r][c+1];
           let candy3=board[r][c+2];
           if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
            candy1.src="./images/blank.png";
            candy2.src="./images/blank.png";
            candy3.src="./images/blank.png";
            score += 30;
           }
        }
    }
    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row-2; r++) {
            let can1 = board[r][c];
            let can2 = board[r+1][c];
            let can3 = board[r+2][c];
            if (can1.src == can2.src && can2.src == can3.src && !can1.src.includes("blank")) {
                can1.src = "./images/blank.png";
                can2.src = "./images/blank.png";
                can3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
 }
 function checkvalid(){
    for(let r=0;r<row;r++){
       
        for(let c=0;c<col-2;c++){
           let candy1=board[r][c];
           let candy2=board[r][c+1];
           let candy3=board[r][c+2];
           if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
          return true;
           }
        }
    }
    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row-2; r++) {
            let can1 = board[r][c];
            let can2 = board[r+1][c];
            let can3 = board[r+2][c];
            if (can1.src == can2.src && can2.src == can3.src && !can1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
 }
 function slidecandy(){
    for( let c=0;c<col;c++){
        let ind=row-1;
        for(let r=col-1;r>=0;r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src=board[r][c].src;
                ind-=1;
            }
        }
        for(let r=ind;r>=0;r--){
            board[r][c].src="./images/blank.png";
        }
    }
 }
 function generateCandy(){
  for(let c=0;c<col;c++){
    if(board[0][c].src.includes("blank")){
        board[0][c].src="./images/"+randomCandy()+".png";
    }
  }
 }