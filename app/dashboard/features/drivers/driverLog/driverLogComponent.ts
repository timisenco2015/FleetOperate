import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DriverLogService} from './driverLogService';
import {DriverGraphComponent} from '../driverGraph/driverGraphComponent';
import {KeysPipe} from './IterateTpGetObjectKeys'
//import * as moment from 'moment-timezone';

declare var moment: any;

@Component({
    selector: 'driver-log',
    templateUrl: 'app/dashboard/features/drivers/driverLog/driverLogTemplate.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class DriverLogComponent implements OnChanges, OnInit {

     @Input() driverData: any[];
     private userChoosenDate: any;
     @Input() sendDriverData:any;
    private driversLogs: any[];
    private driverLog: boolean;
    private showError: boolean;
    private broadcastErrorCode : boolean;
    private errorMessage: boolean;
    private driverDailyLogs: any[];
    private driverAllLogs: any[];
    private driverEachDayEventNames: any[]=[];
    private driverEachDayEventStart:any[]=[];;
    private driverEachDayEventStop:any[]=[];
    private logEventTableData: any[]=[];
    private startDate: string;
    private endDate: string;
    private displayGrapgh: boolean;
    private driverLogs: boolean;
    private showMoreDriverDetails:boolean
    private activeToday:boolean;
    private dateFound:boolean;
    private noLogDetails:boolean;
    private driverLogKeys: any[];
    // constructor to loop the products in product service file and disply in html
    constructor(private _driverLogService: DriverLogService) 
    {
            
          
           
    }

    ngOnInit()
    {
        this.driverLog = false
      this.showMoreDriverDetails=false;
        this.dateFound=false;
        this.noLogDetails=false;
    }


    getDriversLog()
    {
        
        this._driverLogService.getDriverLog().subscribe(
            response => {
                this.driverAllLogs = response.json();
             this.readDriversLogsFunction(this.driverAllLogs);
                console.log(" drivers logs:  ", this.driverAllLogs);
               
                if(response.status == 200){
                     this.showError = false;
                 }else{
                     this.broadcastErrorCode = response.status;
                     this.showError = true;
                     if(this.showError = true){
                        window.scrollTo(0,0)
                    }
                 }
            },
            error => {
            this.errorMessage = error;
            if(error != null){
                this.broadcastErrorCode = error;
                this.showError = true;
                if(this.showError = true){
                     window.scrollTo(0,0)
                }
            }
            console.log("Options request Error : ", error.status)
        });
     
     
    }

      
    readDriversLogsFunction(data: any[])
    {
        let i: number;
        let j:number;
      let convertedDate: any;
       let splittedDate: any[];     
    
        this.driverLogKeys = Object.keys((data[0]['driverLogs']));
        
            if (this.driverAllLogs!=null)
                {
                   for (i=0; i<this.driverLogKeys.length; i++)
                    {
                       
                                //the three lines below will convert the date or list of dates recieved from driver list template to 
                                // this format YYYY-MM-DD
                                let dateString=new Date(this.userChoosenDate).toString();
                                dateString=dateString.split(' ').slice(0, 4).join(' ')
                                convertedDate = moment( dateString).format('YYYY-MM-DD');

                                //this line will split date recieved from the service file in other to comapre the date with
                                // the conver date above

                                
                                splittedDate = this.driverLogKeys[i].split("T");
                                
                                if (convertedDate==splittedDate[0] )
                                    {
                                       
                                   
                                        this. getDriverDailyLogs( data[0]['driverLogs'][this.driverLogKeys[i]]);
                                        this.driverLog = true;
                                        this.dateFound = true; 
                                        this.displayGrapgh = true;
                                        this.noLogDetails=false;
                                    }

                                   
                                   
                            }

                            if (!this.dateFound)
                                {
                                    this.driverLog = false;
                                    this.displayGrapgh = false;
                                    this.logEventTableData=[]
                                    this.noLogDetails=true;
                                }
                           
                           
                   
                   
                    
                }
           
    }

    onClickRODS() {
        
    }

    onClickYesterday()
    {
        this.dateFound = false; 
         let currentDate = new Date();
         var yesterdayDate = new Date();
         yesterdayDate.setDate( currentDate.getDate() - 1);
         this.userChoosenDate = yesterdayDate
    
         this.getDriversLog();
        
    }
    onClickToday(){
        this.activeToday = true;
        this.dateFound = false;
        let currentDate = new Date();
        this.userChoosenDate = currentDate;
    
        this.getDriversLog();
        
    }

   

   

    getDriverDailyLogs(data: any[])
    {
         
      
    
        let i: number;
        let length: number = data.length;
        let localConvertedEventStartTime: any;
        let localConvertedEventStopTime: any
        let location: any;
        let odometer: any;
        let note: any;
        let eventName: any;
       
       
       this.driverDailyLogs = data;
       this.logEventTableData =[];
        for (i=0; i<this.driverDailyLogs.length; i++)
            {
                 eventName= this.driverDailyLogs[i]['logEvent']
                 location =  this.driverDailyLogs[i]['location'];
                 odometer = this.driverDailyLogs[i]['fleetOdometerReading'];
                note = this.driverDailyLogs[i]['notes'];
                
                 this.driverEachDayEventNames[i] = eventName;
                localConvertedEventStartTime =  moment.utc( this.driverDailyLogs[i]['eventTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss');
                this.driverEachDayEventStart[i] = localConvertedEventStartTime
                 
                if ((this.driverDailyLogs[i]['eventEndTimestamp']==null) && (i+1)!=length)
                    {
                        localConvertedEventStopTime = moment.utc( this.driverDailyLogs[i+1]['eventTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss');
                        this.driverEachDayEventStop[i] = localConvertedEventStopTime; 
                         
                    }
                else if ((this.driverDailyLogs[i]['eventEndTimestamp']==null) && (i+1)==length)
                    {
                         localConvertedEventStopTime = moment.utc( this.driverDailyLogs[0]['eventTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss');
                       this.driverEachDayEventStop[i] = localConvertedEventStopTime;
                    }
                    else
                        {
                             localConvertedEventStopTime = moment.utc( this.driverDailyLogs[i]['eventEndTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss'); 
                             this.driverEachDayEventStop[i] = localConvertedEventStopTime;
                        }


                        
                            
               this.getlogEventTableData(localConvertedEventStartTime,  localConvertedEventStopTime ,location, odometer, note,eventName)
                
            }
            
    }

    getlogEventTableData(eventStartTime:any, eventStopTime :any, location:any, odometer:any, note: any, eventName:any)
    {
        let duration: any; 
        let calTimeDifference: any;
        let splitedStartTime: string = eventStartTime.split(" ")[1];
        let splitedStop: string = eventStopTime.split(" ")[1]
        calTimeDifference  = new Date(eventStopTime).getTime()- new Date( eventStartTime).getTime();
         duration =this.convertMillSecondsToTimeString(calTimeDifference);
        this.logEventTableData.push({"eventTimestamp": splitedStartTime, "location": location, "fleetOdometerReading": odometer,"logEvent": eventName,"duration": duration,"notes":note })
       
    }

    convertMillSecondsToTimeString(duration: any)
    {
     var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
   

    var seconds = Math.floor((duration % oneMinute) / oneSecond);
    var minutes = Math.floor((duration % oneHour) / oneMinute);
    var hours = Math.floor(duration  / oneHour);
    

    var timeString = '';
   
    if (hours !== 0) {
        timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
    }
    if (minutes !== 0) {
        timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
    }
    if (seconds !== 0 || duration < 1000) {
        timeString += (seconds !== 1) ? (seconds + ' seconds ') : (seconds + ' second ');
    }

    return timeString;
}

   

    // render driverLog on constant changes
    ngOnChanges(): void {
         console.log("driverData in driver rods...",this.driverData);

        /*for (var i = 0; i < this.driverList.length; i++) {

            var logData = this.driverList[i];

            if (logData.driverId == this.selectedDriverID.driverId) {

                this.driverLog = logData;
                // console.log(this.fleetSummary);
                break;

            } else {
                this.driverLog = null;
            }
        }*/
    }

}