/* PEGANDO OS VALORES DA API DE LOC DO GOOGLE */
async function getLocationData(latitude, longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`

    const response = await fetch(url)
    return await response.json()

}
    /* CALCULA A VELOCIDADE MAXIMA */
function getMaxSpeed(positions){
    let maxSpeed = 0;

    /* VELOCIDADE COMEÇA COM 0, E CADA VEZ QUE O VALOR AUMENTA, ELE É ADICIONADO NO maxSpeed */
    positions.forEach(position =>{
        if(position.speed != null && position.speed > maxSpeed)
            maxSpeed = position.speed
    })
    /* RETORNA O MAX SPEED * 3.6 PARA FICAR COMO KM/h */
    return (maxSpeed * 3.6).toFixed(2);
}

    /* CALCULA A DISTANCIA PERCORRIDA */
function getDistance(positions){
    const earthRadiusKm = 6371;
    let totalDistance = 0;

    for(let i = 0 ; i < positions.length - 1 ; i++){

        const p1 = {
            latitude : positions[i].latitude,
            longitude : positions[i].longitude
        }

        const p2 = {
            latitude : positions[i + 1].latitude,
            longitude : positions[i + 1].longitude
        }

        const deltaLatitude = toRad(p2.latitude - p1.latitude)
        const deltalongitude = toRad(p2.longitude - p1.longitude)

        const a = Math.sin(deltaLatitude/2) *
            Math.sin(deltaLatitude/2) +
            Math.sin(deltalongitude/2) *
            Math.sin(deltalongitude/2) *
            Math.cos(toRad(p1.latitude)) *
            Math.cos(toRad(p2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
        const  distance = earthRadiusKm * c

        totalDistance += distance

        return totalDistance.toFixed(2)
}

function toRad(degree){
    return degree * Math.PI / 180
}
}

    /* CALCULA A DURAÇÃO DA CORRIDA */
function getDuration(ride){
    /* MUDA O FORMATO DA INFORMAÇÃO */
    function format(number, digits){
        return String(number.toFixed(0)).padStart(2, '0')
    }
    const interval = (ride.stopTime - ride.startTime) / 1000
    const minutes = Math.trunc(interval / 60)
    const seconds = interval % 60

    return `${format(minutes,2)}:${format(seconds,2)}` 
}
    /* PEGA O PRIMEIRO REGISTRO DE DATA E HORA */
function getStartDate(ride){

    const d = new Date(ride.startTime)

    const day = d.toLocaleString("en-US", {day: "numeric"})
    const month = d.toLocaleString("pt-BR", {month: "short"})
    const year = d.toLocaleString("en-US", {year: "numeric"})

    const hour = d.toLocaleString("en-US", {hour: "2-digit", hour12:false})
    const minute = d.toLocaleString("en-US", {minute: "2-digit"})

    return ` ${hour}:${minute} - ${month} ${day}, ${year}`;

}
