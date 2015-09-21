var geocoder;
 var map;
 function initialize() {
   geocoder = new google.maps.Geocoder();
   var latlng = new google.maps.LatLng(-34.397, 150.644);
   var mapOptions = {
     zoom: 3,
     center: latlng
   }
   map = new google.maps.Map(document.getElementById("map"), mapOptions);
 }

 function codeAddress() {
   var address = $("input#new-location-name").val();
   geocoder.geocode( { 'address': address}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
       map.setCenter(results[0].geometry.location);
       var contentString = address;

       var infowindow = new google.maps.InfoWindow({
         content: contentString
       });

       var marker = new google.maps.Marker({
           map: map,
           Title: '' + address,
           position: results[0].geometry.location
       });

       marker.addListener('click', function() {
         infowindow.open(map, marker);
       });
     } else {
       alert("Geocode was not successful for the following reason: " + status);
     }
   });
 }


$(document).ready(function() {
  $("#add-landmark").click(function() {
    $("#new-landmarks").append('<div class="new-landmark">' +
                                 '<div class="form-group">' +
                                   '<label for="new-nameOf">Landmark:</label>' +
                                   '<input type="text" class="form-control new-nameOf">' +
                                 '</div>');
  });

  $("form#new-spot").submit(function(event) {
      event.preventDefault();

      var inputtedCountryName = $("input#new-country-name").val();
      var inputtedLocationName = $("input#new-location-name").val();
      var inputtedDate = $("input#new-time").val();
      var inputtedNote = $("input#new-note").val();

      var newSpot = { countryName: inputtedCountryName, locationName: inputtedLocationName, date: inputtedDate, notes: inputtedNote, landmarks: [] };
debugger;
      $(".new-landmark").each(function() {
        var inputtedLandmark = $(this).find("input.new-nameOf").val();
        var newLandmark = { nameOf: inputtedLandmark };

        newSpot.landmarks.push(newLandmark);
      });


      $("ul#vacation-spots").append("<li><span class='vacation'>" + newSpot.locationName + "</span></li>");

     $(".vacation").last().click(function() {
       $("#show-location").show();
debugger;
       $("#show-location h2").text(newSpot.locationName);
       $(".country").text(newSpot.countryName);
       $(".time").text(newSpot.date);
       $(".notes").text(newSpot.notes);

       $("ul#landmark").text("");
       newSpot.landmarks.forEach(function(landmark) {
         $("ul#landmark").append("<li>" + landmark.nameOf + "</li>");
       });
     });

     $("input#new-country-name").val("");
     $("input#new-location-name").val("");
     $("input#new-time").val("");
     $("input#new-note").val("");
     $("input.new-nameOf").val("");
   });

 });
