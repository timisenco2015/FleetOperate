import {PipeTransform, Pipe} from '@angular/core';


@Pipe({
    name: 'statusFilter'
})

export class StatusFilterPipe implements PipeTransform {

    transform(trucks: any[], args: any): any[] {
        console.log("status...", args)

        if (!args) {
            return trucks;
        } else if (args == 'All') {
            return trucks;
        } else if (args == 'Running') {
            return trucks.filter((truck) => truck.status.indexOf('Running') !== -1);
        } else if (args == 'Waiting') {
            return trucks.filter((truck) => truck.status.indexOf('Waiting') !== -1);
        } else if (args == 'Stopped') {
            return trucks.filter((truck) => truck.status.indexOf('Stopped') !== -1);
        }
        // return trucks;
    }
}