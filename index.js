    /* CRIANDO A VARIAVEL PARA PEGAR TODAS AS RIDES QUE RETORNARAM DO storage.js */
const allRides = getAllRides()
const rideListElement = document.querySelector("#rideList")

    /* UTILIZANDO O forEach PERCORREMOS TODAS AS RIDES CRIANDO O TEMPLATE PRO INDEX */
allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id
    
    /* CRIANDO A LISTA DE DADOS */
    const itemElement = document.createElement("li");
    itemElement.classList.add("list")
    itemElement.id = ride.id
    itemElement.addEventListener("click", ()=>{
    window.location.href = `./detail.html?id=${ride.id}`});

    rideListElement.appendChild(itemElement);

    /* PEGANDO A PRIMEIRA POSIÇÃO */
    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    /* CRIANDO DIV DADOS */
    const dados = document.createElement("div");
    dados.classList.add("dados")

    /* CRIANDO DIV MAPA */
    const mapId = `map${ride.id}`
    const mapa = document.createElement("div");
    mapa.classList.add("mapa-preview")
    mapa.id = mapId

    /* CRIANDO DIV CITY */
    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
    cityDiv.classList.add("city")

    /* CRIANDO DIV MAXSPEED */
    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} km/h`;
    maxSpeedDiv.classList.add("max-speed")

    /* CRIANDO DISTANCE */
    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} km`;
    
    /* CRIANDO DIV DURATION */
    const durationDiv = document.createElement("div");
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    /* CRIANDO DIV DATA/HORA */
    const dateDiv = document.createElement("div");
    dateDiv.innerText = `${getStartDate(ride)}`;
    dateDiv.classList.add("date");

    /* COLOCANDO TODOS AS DIVS NO INDEX */
    dados.appendChild(cityDiv);
    dados.appendChild(maxSpeedDiv);
    dados.appendChild(distanceDiv);
    dados.appendChild(durationDiv);
    dados.appendChild(dateDiv);
    itemElement.appendChild(mapa);
    itemElement.appendChild(dados);

    /* PEGANDO O MAP DA PRIMEIRA LOCALIZAÇÃO */
    const map = L.map(mapId,{
        attributionControl:false,
        zoomControl:false,
        dragging:false,
        scrollWhelZoom: false
    })
        map.setView([firstPosition.latitude, firstPosition.longitude],14)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)

});
