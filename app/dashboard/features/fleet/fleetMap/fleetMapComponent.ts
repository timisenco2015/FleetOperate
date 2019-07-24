import {Component, OnInit, Input, OnChanges} from '@angular/core';

declare var H: any;
@Component({
//moduleId: module.id,
    selector: 'fleetMap',
    templateUrl: 'app/dashboard/features/fleet/fleetMap/fleetMapTemplate.html',
    styleUrls: ['app/dashboard/features/fleet/fleetMap/mapStyle.css']

})

export class FleetMapComponent implements OnInit, OnChanges {

    fleetMap: any;
    //@Input() selectedTruckID: any;
    //@Input() truckList: any[];
    @Input() fleetLocation: any;
    lat: number ;
    lng: number ;
    @Input() fleetEventLocation:any;

    // constructor to loop the products in product service file and disply in html
    constructor() {

    }
    // render something initially 
    ngOnInit(): void {
        //this.callGoogleMap();
    }
    
    // render truck summary on constant changes
    ngOnChanges(): void {
        console.log("fleet location in fleet map component...",this.fleetLocation);
        var loc = this.fleetLocation;
        //var fleetLoc = this.fleetLocation

        /*console.log("list recevied...", this.truckList);

        for (var i = 0; i < this.truckList.length; i++) {

            var summaryData = this.truckList[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.fleetId == this.selectedTruckID.fleetId) {

                this.fleetMap = summaryData;
                console.log("fleet summary is:  ", this.fleetMap);
                //this.lat = this.fleetSummary.location.lat;
                //this.lng = this.fleetSummary.location.lng;
                break;

            } else {
                this.fleetMap = null;
            }
        }*/
        this.callHereMap(loc);
        //this.callHereMapForGeneral(fleetLoc);

    }

    appId: any = 'BFqkMiSS8Dm01YE4LW5k';
    appCode: any = 'JxvRX7RSa5Lx1G61fD1m2Q';

    // call Here map
    callHereMap(loc: any){
        console.log("here map called...",loc);
        let platform = new H.service.Platform({
            'app_id': this.appId,
            'app_code': this.appCode
        });
        console.log("here map called...platform..",platform);
        // Obtain the default map types from the platform object:
        let defaultLayers = platform.createDefaultLayers();

        /*var truckCurrentLocation = {lat: this.fleetMap.currentLocation.latitude,
                                    lng: this.fleetMap.currentLocation.longitude};*/
        var truckCurrentLocation = {lat: loc.latitude,
                                    lng: loc.longitude};

        // Instantiate (and display) a map object:
        let map = new H.Map(
        document.getElementById('map'),
        defaultLayers.normal.map,
        {
            zoom: 8,
            center: truckCurrentLocation
        });

        //Step 3: make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create a marker icon from an image URL:
        var icon = new H.map.Icon('external/images/truck-map2.png');

        // Create a marker using the previously instantiated icon:
        var marker = new H.map.Marker(truckCurrentLocation, { icon: icon });

        // Add the marker to the map:
        map.addObject(marker);

        // map route
       //this.calculateRoute(map, platform);
    }

    calculateRoute(map, platform){

        let origin = [ 49.8951,
                         -97.1384]

        let destination = [ 49.2827,
                             -123.1207]

        let waypoint = [50.4452, -104.6189] 

        // Create the parameters for the routing request:
        var routingParameters = {
                // The routing mode:
                'mode': 'fastest;truck;traffic:enabled',
                // The start point of the route:
                'waypoint0': origin,
                // The end point of the route:
                //'waypoint1': waypoint,
                'waypoint1': destination,
                // To retrieve the shape of the route we choose the route
                // representation mode 'display'
                'representation': 'display'
        };

        // Define a callback function to process the routing response:
        var onResult = function(result) {
                        /*var route,
                            routeShape,
                            startPoint,
                            endPoint,
                            strip;*/
                    console.log("print result..",result)
                    if(result.response.route) {
                    // Pick the first route from the response:
                    var route = result.response.route[0];
                    // Pick the route's shape:
                    var routeShape = route.shape;

                    // Create a strip to use as a point source for the route line
                    var strip = new H.geo.Strip();

                    // Push all the points in the shape into the strip:
                    routeShape.forEach(function(point) {
                            var parts = point.split(',');
                            strip.pushLatLngAlt(parts[0], parts[1]);
                    });
                
                    // Create a polyline to display the route
                    /*routeLine = new H.map.Polyline(strip, {
                                style: { lineWidth: 10 },
                                arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
                                });*/

        // Retrieve the mapped positions of the requested waypoints:
        var startPoint = route.waypoint[0].mappedPosition;
        var endPoint = route.waypoint[1].mappedPosition;

        // Create a polyline to display the route:
        var routeLine = new H.map.Polyline(strip, {
            style: { strokeColor: 'blue', lineWidth: 10 },
            arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
            });

        // Create a marker for the start point:
        var startMarker = new H.map.Marker({
                                lat: startPoint.latitude,
                                lng: startPoint.longitude
                                });

        // Create a marker for the end point:
        var endMarker = new H.map.Marker({
        lat: endPoint.latitude,
        lng: endPoint.longitude
        });

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.setViewBounds(routeLine.getBounds());
        }
    };

    // Get an instance of the routing service:
    var router = platform.getRoutingService();
    console.log("router...",router)
    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult,
        function(error) {
        alert(error.message);
        });
    }



}