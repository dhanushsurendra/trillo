export default class Maps {
    constructor(id, latitude, longitude, name, url) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.url = url;
    }

    getMap() {
        const lat = this.latitude;
        const lng = this.longitude;
        const name = this.name;
        console.log(this.latitude, this.longitude);
        var script = document.createElement('script');
        script.src = this.url;
        script.defer = true;
        script.async = true;
        var marker;

        // Attach your callback function to the `window` object
        window.initMap = function () {
            var map = new google.maps.Map(document.getElementById('popup__img-1'), {
                zoom: 15,
                center: { lat: lat, lng: lng },
                tilt: 45,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: ['roadmap', 'terrain', 'satellite']
                },
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                }
                //disableDefaultUI: true,
            });
            //map.setTilt(45);

            var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('popup__img-2'), {
                position: {
                    lat: lat, lng: lng
                },
                pov: {
                    heading: 165, pitch: 0
                },
                zoom: 1,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
            });

            marker = new google.maps.Marker({
                position: map.getCenter(),
                map: map,
                animation: google.maps.Animation.DROP,
                draggable: true,
                title: name
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