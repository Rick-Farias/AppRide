const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");
const ride = getRideRecord(itemId)


    document.addEventListener("DOMContentLoaded", async ()=>{
        const detail = document.querySelector("#detail");

        const firstPosition = ride.data[0]
        const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

        const mapaDetail = document.createElement("div");
        mapaDetail.id = "mapa"


        const dados = document.createElement("div");
        dados.classList.add("dados")

        const mapa = document.createElement("div");
        mapa.classList.add("mapa-preview")

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

        const deleteButton = document.createElement("button")
        deleteButton.innerText = "DELETE"
        deleteButton.id = "delete"

        dados.appendChild(mapaDetail);
        dados.appendChild(cityDiv);
        dados.appendChild(maxSpeedDiv);
        dados.appendChild(distanceDiv);
        dados.appendChild(durationDiv);
        dados.appendChild(dateDiv);
        
        detail.appendChild(dados)
        detail.appendChild(deleteButton);

        const deletebtn = document.querySelector("#delete")
        deletebtn.addEventListener("click", ()=>{
            deleteRide(itemId)
            window.location.href = `./index.html`
        })

        const map = L.map("mapa")
        map.setView([firstPosition.latitude, firstPosition.longitude],14)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        const positionsArray = ride.data.map((position =>{
            return [position.latitude, position.longitude]
        }))

        const polyline = L.polyline(positionsArray, {color: "#ff0000"})
        polyline.addTo(map)

        map.fitBounds(polyline.getBounds())
    })

