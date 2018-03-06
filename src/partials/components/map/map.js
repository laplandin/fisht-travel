function initMap() {
  var coordinates = {lat: 44.2920, lng: 40.18025},
    zoom = 17,
    mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#0096ff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#6ec1ff"
            },
            {
                "visibility": "on"
            }
        ]
    }
],

  map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: zoom,
    scrollwheel: false
  });

  map.setOptions({styles: mapStyles});

  var image = '../img/map-pin.png',
  marker = new google.maps.Marker({
    position: {lat: 44.2920, lng: 40.1805},
    map: map,
    icon: image,
  });
};
