//  Based on code found
//  @https://developers.google.com/maps/documentation/javascript

'use strict';

//document.addEventListener('DOMContentLoaded', function(){
  var map, infoWindow;

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  function showResults(results, status){
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function handleLocationError(browserHasGeolocation, infowindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12
    });
    infoWindow = new google.maps.InfoWindow({map: map});
    var pos;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You');
      map.setCenter(pos);

      var service = new google.maps.places.PlacesService(map);
      service.textSearch({
        location: pos,
        radius: 1000,
        query: 'meditation retreat'
        }, showResults);

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  //Using initMap() to make gulp happy, also in case initMap never runs for some reason
  if (!map){
    initMap();
  }
//});
