export default class Maps {
    constructor(id, latitude, longitude, name) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
    }

    getMap() {
        const lngArr = this.longitude.toString().split('.');
        const lngShort = lngArr[1].substr(0, 6);
        const lngNew = parseFloat(`${lngArr[0]}.${lngShort}`);
        const latArr = this.latitude.toString().split('.');
        const latShort = latArr[1].substr(0, 6);
        const latNew = parseFloat(`${latArr[0]}.${latShort}`);
       // console.log(latNew, lngNew);
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-plNVe_BISlUPKPzZYpJTWXhGJWaVgbM&callback=initMap';
        script.defer = true;
        script.async = true;
        var marker;

        // Attach your callback function to the `window` object
        window.initMap = function () {
            var options = {
                zoom: 15,
                center: { lat: latNew, lng: lngNew },
                mapTypeId: 'satellite',
                disableDefaultUI: true,
            }

            var map = new google.maps.Map(document.getElementById('popup__img'), options);
           // map.tilt(45);
            marker = new google.maps.Marker({
                position: { lat: latNew, lng: lngNew },
                map: map,
                animation: google.maps.Animation.DROP
            });
            marker.addListener('click', toggleBounce);
        };

        function toggleBounce() {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          }

        // Append the 'script' element to 'head'
        document.head.appendChild(script);
    }
}