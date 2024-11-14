

/* VARIAVEIS */

const speedElement = document.querySelector("#speed");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");


let watchID = null;
let currentRide = null;

/* FUNÇÕES */

startBtn.addEventListener("click", () =>{
    if (watchID)
        return
        
    function handleSuccess(position){
        addPosition(currentRide, position);

        speedElement.innerText = position.coords.speed ? (position.coords.speed * 3.6).toFixed(1) : 0
    }

    function handleError(error){
        console.log(error.msg);
    }

    const options = {enableHighAccuracy: true};
    
    currentRide = creatNewRide()
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

    startBtn.classList.add("hide");
    stopBtn.classList.remove("hide");

})

stopBtn.addEventListener("click", () =>{

    if (!watchID)
        return

    navigator.geolocation.clearWatch(watchID);
    watchID = null;
    updateStopTime(currentRide);
    currentRide = null;
    startBtn.classList.remove("hide");
    stopBtn.classList.add("hide");

    window.location.href = `./index.html`
})
