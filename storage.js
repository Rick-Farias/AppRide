    /* CRIANDO RIDES */
function creatNewRide(){
    const rideID = Date.now()
    const rideRecord = {
        data:[],
        startTime: rideID,
        stopTime: null
    }

    
    saveRideRecord(rideID, rideRecord)
    return rideID
}
    /* RETORNA AS RIDES */
function getAllRides(){
     return Object.entries(localStorage)
}

    
function getRideRecord(rideID){
    console.log(JSON.parse(localStorage.getItem(rideID)))
    return JSON.parse(localStorage.getItem(rideID)) 
}
    /* SALVA AS RIDES NO LOCAL STORAGE */
function saveRideRecord(rideID, rideRecord){
    localStorage.setItem(rideID, JSON.stringify(rideRecord))
}

    /* ADICIONA OS DADOS COLETADOS */
function addPosition(rideID, position){
    const rideRecord = getRideRecord(rideID)
    const newData = {
        accuracy: position.coords.accuracy ,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy ,
        heading: position.coords.heading ,
        latitude: position.coords.latitude ,
        longitude: position.coords.longitude ,
        speed: position.coords.speed,
        timestamp: position.timestamp
    }

    rideRecord.data.push(newData)
    saveRideRecord(rideID, rideRecord)
}
    /* PEGA O VALOR DO STOP TIME */
function updateStopTime(rideID){
    const rideRecord = getRideRecord(rideID)
    rideRecord.stopTime = Date.now()
    saveRideRecord(rideID, rideRecord)
}
    /* PEGA DELETA UMA RIDE DE ACORCO COM O ID */
function deleteRide(itemId){
    localStorage.removeItem(itemId)
}