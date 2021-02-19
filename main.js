const game__field = document.querySelector(".game__field");
const faPlayCircle = document.querySelector(".fa-play-circle");
const game__score = document.querySelector(".game__score");
const popUpHide = document.querySelector(".pop-up");
const popUp__refresh = document.querySelector(".pop-up__refresh");
const popUp__message = document.querySelector(".pop-up__message");
const game__timer = document.querySelector(".game__timer");
const game__header = document.querySelector(".game__header");
let x;
let time;
let achiveTimer;
let isStop = false;

let bgAudio = new Audio("./sound/bg.mp3");
let bugAudio = new Audio("./sound/bug_pull.mp3");
let carrotAudio = new Audio("./sound/carrot_pull.mp3");
let gameWinAudio = new Audio("./sound/game_win.mp3");
let alerrtAudio = new Audio("./sound/alert.wav");

function init(x, y){
    bgAudio.play();
    const newCarrot = document.createElement("img");
    newCarrot.setAttribute("class", "carrot");
    newCarrot.setAttribute("src", "img/carrot.png")
    newCarrot.style.left = `${x}px`;
    newCarrot.style.top = `${y}px`;

    game__field.appendChild(newCarrot);
}

function bugInit(x, y){
    const newBug = document.createElement("img");
    newBug.setAttribute("class", "bug");
    newBug.setAttribute("src", "img/bug.png")
    newBug.style.left = `${x}px`;
    newBug.style.top = `${y}px`;

    game__field.appendChild(newBug);
}

function play(){
    const carrot = document.querySelectorAll(".carrot");
    
    if(carrot.length > 0){
        return;
    };
    let minX = Math.ceil(0);
    let maxX = Math.floor(720);
    let minY = Math.ceil(0);
    let maxY = Math.floor(157);

    time = 10;
    

    //carrot
    for (let i = 0; i < 10; i ++){
        let x;
        let y;
        x = Math.floor(Math.random() * (maxX - minX)) + minX;
        y = Math.floor(Math.random() * (maxY - minY)) + minY;
        init(x, y);
    }

    //bug
    for (let i = 0; i < 8; i ++){
        let x;
        let y;
        x = Math.floor(Math.random() * (maxX - minX)) + minX;
        y = Math.floor(Math.random() * (maxY - minY)) + minY;
        bugInit(x, y);
    }

    const carrotAll = document.querySelectorAll(".carrot");
    game__score.innerHTML = carrotAll.length;

    callTimer();
}

function score(){
    let carrot_coordinate = document.querySelectorAll(".carrot");

    if(carrot_coordinate.length > 0){
        game__score.innerHTML = carrot_coordinate.length;
    } else if(carrot_coordinate.length === 0){
        game__score.innerHTML = carrot_coordinate.length;
        popUp__message.innerHTML = "Congratulation!!🤗";
        timerPause();
        gameWinAudio.play();
        popUpHide.style.display = "block";
    };
}

function hide(e){
    if(faPlayCircle.className === "fas fa-play-circle" || popUpHide.style.display === "block"){
        // alerrtAudio.play();
        // timerPause();
    } else if(faPlayCircle.className === "fas fa-pause-circle"){
        if (e.target.className === "carrot"){
            e.target.remove();
            carrotAudio.play();
            score();
        } else if(e.target.className ==="bug"){
            bugAudio.play();
            popUpHide.style.display = "block";
            losePopUp();
        };
    };
    
}

function callTimer(){
    x = setInterval("timer()", 1000);
}

function timer(confirm){
    // x = setInterval(function() {
        if(isStop){
            console.log("stop!");
            achiveTimer = timer;
        } else{
            game__timer.innerHTML = `${time}s`;
            time--;
            
            if(time < 0){
                timerPause();
                popUpHide.style.display = "block";
                losePopUp();
            };
        };
    // }, 1000);
}

function losePopUp(){
    popUp__message.innerHTML = "Lose🤣";
    timerPause();
}

function pauseBtn(e){
    if(e.target.className === "fas fa-play-circle"){
        faPlayCircle.className = "fas fa-pause-circle";
        alerrtAudio.play();
        timerPlay();
        play();
    } else if(e.target.className === "fas fa-pause-circle"){
        faPlayCircle.className = "fas fa-play-circle";
        alerrtAudio.play();
        timerPause();
    };
}

function timerPause(){
    isStop = true;
}

function timerPlay(){
    isStop = false;
}

function popUpRefresh(){
    const carrotAll = document.querySelectorAll(".carrot");
    const bugAll = document.querySelectorAll(".bug");

    alerrtAudio.play();

    carrotAll.forEach(element => element.remove());
    bugAll.forEach(element => element.remove());

    popUpHide.style.display = "none";
    clearInterval(x);
    timerPlay();
    play();
}

game__field.addEventListener('click', hide, false);
faPlayCircle.addEventListener('click', pauseBtn, false);
popUp__refresh.addEventListener('click', popUpRefresh, false);
// popUp__refresh.addEventListener('click', () => {
//     const carrotAll = document.querySelectorAll(".carrot");
//     const bugAll = document.querySelectorAll(".bug");

//     alerrtAudio.play();

//     carrotAll.forEach(element => element.remove());
//     bugAll.forEach(element => element.remove());

//     popUpHide.style.display = "none";
//     play();
// });
