
    

    mapboxgl.accessToken = mapToken;

// Make sure coordinates is an array of numbers
// console.log(coordinates);

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates,
    zoom: 8,
});



const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
    .setHTML(
        `<h4>${listing.location}</h4><p>Exact location provided after booking</p>`
    )
)
.addTo(map);
