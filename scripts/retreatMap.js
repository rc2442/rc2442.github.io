//  Based on code found
//  @https://developers.google.com/maps/documentation/javascript

'use strict';

//Adding DOMContentLoaded broke this code for some reason, I think it has to do with
//initMap not being available during load because it's a callback for the Google Maps
//API load.
var map, infoWindow, searchBox;
var markers = [];

function createMarker(place, index) {
  var placeLoc = place.geometry.location;
  markers[index] = new google.maps.Marker({
    map: map,
    position: placeLoc
  });

  google.maps.event.addListener(markers[index], 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

function searchForRetreats(pos){
  var service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: pos,
      radius: 1000,
      query: 'meditation retreat'
      }, showResults);
}

function showResults(results, status){
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], i);
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

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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
    searchForRetreats(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    //Retrieve center of new view and perform search based on that location
    searchForRetreats(bounds.getCenter());

  });
}

//Using initMap() to make gulp happy, also in case initMap never runs for some reason
if (!map){
  initMap();
}
