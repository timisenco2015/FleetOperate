import {Component, OnInit, Input, OnChanges} from '@angular/core';

declare var google: any;
declare var H: any;
@Component({
    //moduleId: module.id,
    selector: 'trailer-map',
    templateUrl: 'app/dashboard/features/trailers/trailerMap/trailerMapTemplate.html',
    styleUrls: ['app/dashboard/features/trailers/trailerMap/trailerMapStyle.css']

})

export class TrailerMapComponent implements OnInit, OnChanges {

    @Input() selectedTrailerID: any;
    @Input() trailerList: any[];

    // render something from service or outside this component
    constructor() {


    }

    // render something initially 
    ngOnInit(): void {
        //this.callGoogleMap();
    }

    // render something on constant changes
    ngOnChanges(): void {
      console.log("selectedTrailerID..",this.selectedTrailerID);
        //this.callGoogleMap();
    }

    // call google map and display current location and truck route
    callGoogleMap(){
        let directionsService: any = new google.maps.DirectionsService;
        let directionsDisplay: any = new google.maps.DirectionsRenderer;

        var truckCurrentLocation = {lat: 49.8998,
                                    lng: -97.1375};
        
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: truckCurrentLocation
          
        });
        
        var truckCurrentLocationMarker = new google.maps.Marker({
          position: truckCurrentLocation,
          map: map,
          title: "I'm here !!",
          icon: 'external/images/truck-map2.png'
        });
        directionsDisplay.setMap(map);
       // this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    }
    // calculate and display truck route
    /*calculateAndDisplayRoute(directionsService, directionsDisplay){
        
         var waypts = [];
          var locationsArray:any[] = this.fleetSummary.waypoints;
      console.log("waypoints:  ", locationsArray);
      for (var i = 0; i < locationsArray.length; i++) {
          console.log("locationsArray is:  ", locationsArray[i]);
          var waypoint = locationsArray[i];
          console.log("waypoint is:  ", waypoint.latitude);
            waypts.push({
              location: new google.maps.LatLng(waypoint.latitude,waypoint.longitude),
              stopover: true
            });      
        }

        directionsService.route({
          origin: {lat: this.fleetSummary.origin.latitude,
                   lng: this.fleetSummary.origin.longitude},
          destination: {lat: this.fleetSummary.destination.latitude,
                        lng: this.fleetSummary.destination.longitude},
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

    };*/
}