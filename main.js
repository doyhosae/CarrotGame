const game__field = document.querySelector(".game__field");
const faPlayCircle = document.querySelector(".fa-play-circle");
const game__score = document.querySelector(".game__score");
const popUpHide = document.querySelector(".pop-up");
const popUp__refresh = document.querySelector(".pop-up__refresh");
const popUp__message = document.querySelector(".pop-up__message");
const game__timer = document.querySelector(".game__timer");
const game__header = document.querySelector(".game__header");

function init(x, y){
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
    // const carrot = document.querySelector(".carrot");
    let minX = Math.ceil(0);
    let maxX = Math.floor(720);
    let minY = Math.ceil(0);
    let maxY = Math.floor(157);
    

    for (let i = 0; i < 10; i ++){
        let x;
        let y;
        x = Math.floor(Math.random() * (maxX - minX)) + minX;
        y = Math.floor(Math.random() * (maxY - minY)) + minY;
        init(x, y);
    }

    for (let i = 0; i < 5; i ++){
        let x;
        let y;
        x = Math.floor(Math.random() * (maxX - minX)) + minX;
        y = Math.floor(Math.random() * (maxY - minY)) + minY;
        bugInit(x, y);
    }

    game__score.innerHTML = "10";

    timer();
}

function score(){
    let carrot_coordinate = document.querySelectorAll(".carrot");

    if(carrot_coordinate.length > 0){
        game__score.innerHTML = carrot_coordinate.length;
    } else if(carrot_coordinate.length === 0){
        game__score.innerHTML = carrot_coordinate.length;
        popUp__message.innerHTML = "Congratulation!!🤗";
        timer("success");
        popUpHide.style.display = "block";
    };
}

function hide(e){
    if (e.target.className === "carrot"){
        e.target.remove();
        score();
    } else if(e.target.className ==="bug"){
        popUpHide.style.display = "block";
        losePopUp();

    };
}
function timer(confirm){
    let time = 5;
    let x;

    if(confirm != "success"){
        x = setInterval(function() {
            //이 안에 if문으로 넣으면 어떨까? setInterval은 별개로 계속 되는듯
            game__timer.innerHTML = time;
            time--;
            if(time < 0){
                clearInterval(x);
                game__timer.innerHTML = "0";
                popUpHide.style.display = "block";
                losePopUp();
            }
        }, 1000);
    } else if (confirm === "success"){
        clearInterval(x);
        console.log(confirm);
    };
    
    // if(confirm === "success"){
    //     clearInterval(x);
    //     console.log(confirm);
    // } else{
    //     x = setInterval(function() {
    //         game__timer.innerHTML = time;
    //         time--;
    //         if(time < 0){
    //             clearInterval(x);
    //             game__timer.innerHTML = "0";
    //             popUpHide.style.display = "block";
    //             losePopUp();
    //         }
    //     }, 1000);
    // };
}

function losePopUp(){
    popUp__message.innerHTML = "Lose🤣";
    timer("success");

}

function popUpRefresh(){
    const carrotC = document.querySelectorAll(".carrot");
    e.target.remove();
    score();
}

function pauseBtn(e){
    if(e.target.className === "fas fa-play-circle"){
        faPlayCircle.className = "fas fa-pause-circle";
        play();
    } else if(e.target.className === "fas fa-pause-circle"){
        playPause();
    };
}

function playPause(){
    console.log("pause");
}

game__field.addEventListener('click', hide, false);
faPlayCircle.addEventListener('click', pauseBtn, false);
popUp__refresh.addEventListener('click', popUpRefresh, false);
popUp__refresh.addEventListener('click', () => {
    popUpHide.style.display = "none";
    play();
});
