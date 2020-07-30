const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = (data.coords.speed * 3.6).toFixed(2);
    arrow.style.transform = `rotate(${data.coords.heading}deg)`
}, (err) => {
    console.log(err);
    alert('Uh-oh, you need to allow location permission for this application to run.')
});