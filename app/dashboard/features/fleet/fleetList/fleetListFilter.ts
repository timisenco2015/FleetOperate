import {PipeTransform, Pipe} from '@angular/core';


@Pipe({
    name: 'truckFilter'
})

export class FleetFilterPipe implements PipeTransform {

    /*transform(trucks: any[], args: any[]): any[] {
        console.log(args)
       let filter: any = args[0] ? args[0].toLocaleLowerCase() : null;
       
        return filter ? trucks.filter((truck: any) => 
        truck.fleetId.toLocaleLowerCase().indexOf(filter) !== -1): trucks;
    }*/

    transform(trucks: any[], args: any): any[] {
        // filter items array, items which match and return true will be kept, false will be filtered out
        if (!args) {
            return trucks;
        } else if (args) {
            // let filter = args ? args.toLocaleLowerCase() : null;
            return trucks.filter((truck: any) => truck.fleetId.toLowerCase().indexOf(args) !== -1);
        }

    }
}