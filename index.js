const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides()

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id
    
    const itemElement = document.createElement("li");
    itemElement.classList.add("list")
    itemElement.id = ride.id
    itemElement.addEventListener("click", ()=>{
        window.location.href = `./detail.html?id=${item.id}`});

    rideListElement.appendChild(itemElement);

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const dados = document.createElement("div");
    dados.classList.add("dados")

    const mapId = `map${ride.id}`
    const mapa = document.createElement("div");
    mapa.classList.add("mapa-preview")
    mapa.id = mapId

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
    cityDiv.classList.add("city")

    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} km/h`;
    maxSpeedDiv.classList.add("max-speed")

    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} km`;

    const durationDiv = document.createElement("div");
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const dateDiv = document.createElement("div");
    dateDiv.innerText = `${getStartDate(ride)}`;
    dateDiv.classList.add("date");

    dados.appendChild(cityDiv);
    dados.appendChild(maxSpeedDiv);
    dados.appendChild(distanceDiv);
    dados.appendChild(durationDiv);
    dados.appendChild(dateDiv);
    itemElement.appendChild(mapa);
    itemElement.appendChild(dados);

 
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

const list = document.querySelectorAll(".list");

list.forEach((item, index)=>{
    item.addEventListener("click", ()=>{
        window.location.href = `./detail.html?id=${item.id}`
    })
})
