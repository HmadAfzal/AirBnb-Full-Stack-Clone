mapboxgl.accessToken = 'pk.eyJ1IjoiaG1hZGFmemFsIiwiYSI6ImNsdGZzZHp2cDB2c2IyaW80NzdjNGx2Z2kifQ.czGhLrfeiErS89433mEo_A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: coordinates, 
    zoom: 12 
});

const marker = new mapboxgl.Marker({ color: 'red', rotation: 45 })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup().setHTML("<p>Exact location will be provided after booking!</>"))
    .addTo(map); 