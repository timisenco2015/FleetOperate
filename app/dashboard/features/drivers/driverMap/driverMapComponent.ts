import {Component, OnInit, Input, OnChanges} from '@angular/core';

declare var H: any;

@Component({
//moduleId: module.id,
    selector: 'driverMap',
    templateUrl: 'app/dashboard/features/drivers/driverMap/driverMapTemplate.html',
    styleUrls: ['app/dashboard/features/drivers/driverMap/driverMapStyle.css']

})

export class DriverMapComponent implements OnInit, OnChanges {

    @Input() driverData: any;
    
    ngOnInit(): void {
        
    }

    ngOnChanges(): void {
        console.log("driverData in driver map..",this.driverData)
        this.callHereMap()
    }

    appId: any = 'BFqkMiSS8Dm01YE4LW5k';
    appCode: any = 'JxvRX7RSa5Lx1G61fD1m2Q';

    // call Here map
    callHereMap(){

        let platform = new H.service.Platform({
            'app_id': this.appId,
            'app_code': this.appCode
        });

        // Obtain the default map types from the platform object:
        let defaultLayers = platform.createDefaultLayers();

        var truckCurrentLocation = {lat: this.driverData.driverLocationInfo.latitude,
                                    lng: this.driverData.driverLocationInfo.longitude};

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

    }
}