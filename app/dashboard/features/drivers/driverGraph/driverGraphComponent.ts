import { Component, Input, OnChanges, OnInit } from '@angular/core';

declare var google: any


@Component({
  selector: 'driver-graph',
  templateUrl: 'app/dashboard/features/drivers/driverGraph/driverGraphTemplate.html'
})



export class DriverGraphComponent implements OnChanges, OnInit {
  // lineChart
  private driversEvents: any[];
  private showError: boolean;
  private broadcastErrorCode: boolean;
  private errorMessage: boolean;
  @Input() driverEachDayEventNames: any[];
  @Input() driverEachDayEventStop: any[];
  @Input() driverEachDayEventStart: any[];
  private eventStartTime: any[] = [];
  private eventStartDate: any[] = [];
  private eventStopTime: any[] = [];
  private eventStopDate: any[] = [];
  private eventStartStopTime: string[] = [];

  private mapsEventNamesToLogEvents;
  private eventArray: string[];
  private splitStartTimeValue: string[];
  ngOnChanges(): void {

    this.eventArray = ["Driving", "On_Duty", "Sleeper_Berth", "Off_Duty"];
    this.getEventStartStopTimeArray();

    this.mapEventNamesToLogEvent();
    this.loadGraph();
  }
  ngOnInit() {

  }

  loadGraph(){
    // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(() => this.drawChart());
 
  }



  drawChart() {
    let i: number;

    var chartdata = new google.visualization.DataTable();
    chartdata.addColumn('datetime', 'Time');
    chartdata.addColumn('number', 'Log Events');
    var j = 0;
    let t: number = 0;
    // defining the total lenght of the rows in graph
    var length = (this.eventStartDate.length + this.eventStopDate.length);

    // initiate graph rows
    chartdata.addRows(length + 4)

   

  //------------- set the initial graph x and y axis event values START (The below setup is default)----------------------
   //extract year, month and day from eventStartDate
   let splittedInitialDate: string[] = this.eventStartDate[0].split("-");
   let year = parseInt(splittedInitialDate[0]);
   let month = parseInt(splittedInitialDate[1]);
   let day = parseInt(splittedInitialDate[2]);

  // extract hour, minutes, seconds from eventStartDate
  let splittedInitialTime: string[] = this.eventStartTime[t].split(":")
     let hour = parseInt(splittedInitialTime[0])
     let minutes = parseInt(splittedInitialTime[1])
     let seconds = parseInt(splittedInitialTime[2]);  
  
  // set the initial date time in x axis of graph
    chartdata.setCell(0, 0, new Date(year, month, day, 0, 0, 0));
    // set the initial event in y axis of graph (the third value zero below represents the event assigned 
    // in graph options ticks "0")
    chartdata.setCell(0, 1, 0);

    //----------- set end values for first initiated event values ------------------------
    chartdata.setCell(1, 0, new Date(year, month, day, hour, minutes, seconds));
    chartdata.setCell(1, 1, 0);
    //----------- set end values for first initiated event values ------------------------

  //------------- set the initial graph x and y axis event values END-----------------------------------------------------


// Now we set the log events and time looping through the log data -----------------------------

  // loop start from second row as first two rows are set initially which is above
    for (i = 2; i < length; i = (i + 2)) {
      
      // split the start date and time for all the events in the log list
      var splittedStartDate: string[] = this.eventStartDate[t].split("-")

      let startYear = parseInt(splittedStartDate[0])
      let startMonth = parseInt(splittedStartDate[1])
      let startDay = parseInt(splittedStartDate[2]);

      var splittedStartTime: string[] = this.eventStartTime[t].split(":")

      let startHour = parseInt(splittedStartTime[0])
      let startMinutes = parseInt(splittedStartTime[1])
      let startSeconds = parseInt(splittedStartTime[2]);

      // set the start event and corresponding time on x and y axis
      chartdata.setCell(i, 0, new Date(startYear, startMonth, startDay, 
        startHour, startMinutes, startSeconds));
      chartdata.setCell(i, 1, this.mapsEventNamesToLogEvents[t]);


      // split the stop date and time for all the events in the log list
      var splittedStopDate: string[] = this.eventStopDate[t].split("-")

      let stopYear = parseInt(splittedStopDate[0])
      let stopMonth = parseInt(splittedStopDate[1])
      let stopDay = parseInt(splittedStopDate[2]);

      var splittedStopTime: string[] = this.eventStopTime[t].split(":")

      let stopHour = parseInt(splittedStopTime[0])
      let stopMinutes = parseInt(splittedStopTime[1])
      let stopSeconds = parseInt(splittedStopTime[2]);

      // set the stop event and corresponding time on x and y axis 
      j = i + 1
      chartdata.setCell(j, 0, new Date(stopYear, stopMonth, stopDay, 
        stopHour, stopMinutes, stopSeconds));
      chartdata.setCell(j, 1, this.mapsEventNamesToLogEvents[t]);

      t++;

    }

//------------- set the end of graph x and y axis event values START (The below setup is default)----------------------

    // pick the eventEndTimestamp of very last event and map the 24th hour in graph
    var splittedEndDate: string[] = this.eventStopDate[t - 1].split("-")

    let endYear = parseInt(splittedEndDate[0])
    let endMonth = parseInt(splittedEndDate[1])
    let endDay = parseInt(splittedEndDate[2]);

    var splittedEndTime: string[] = this.eventStopTime[t - 1].split(":")

    let endHour = parseInt(splittedEndTime[0])
    let endMinutes = parseInt(splittedEndTime[1])
    let endSeconds = parseInt(splittedEndTime[2]);

    // 
    var n = j + 1;

    chartdata.setCell(n, 0, new Date(endYear, endMonth, endDay, endHour, endMinutes, endSeconds));
    chartdata.setCell(n, 1, this.mapsEventNamesToLogEvents[t]);

    chartdata.setCell(n + 1, 0, new Date(endYear, endMonth,endDay, 24, 0, 0));
    chartdata.setCell(n + 1, 1, this.mapsEventNamesToLogEvents[t]);
  //------------- set the end of graph x and y axis event values END--------------------------------------------------------

    var options = {
      title: 'Driver Log',
      //curveType: 'function',
      legend: { position: 'right' },
      width: 1600,
      height: 360,
      hAxis: {
        format: 'HH:mm:ss',
        gridlines: { count: 8 },
        min: 0,
        max: 24,
        viewWindow: {

        },
      },
      vAxis: {
        gridlines: {
          color: 'none',
          count: 5
        },
        minValue: 0,
        ticks: [{ v: 0, f: "" }, { v: 10, f: "Driving" }, { v: 20, f: "On_Duty" }, { v: 30, f: "Off_Duty" }, { v: 40, f: "Sleeper_Berth" }, { v: 50, f: "" }],
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(chartdata, options);

  }


  getEventStartStopTimeArray() {
    let i: number;
    let splitEventStart: any;
    let length: number = this.driverEachDayEventStart.length
    let splited: string[];
   


    for (i = 0; i < length; i++) {
     
      splited = this.driverEachDayEventStart[i].split(" ");
      this.eventStartDate[i] = splited[0];
      this.eventStartTime[i] = splited[1];
      /* if (this.driverEachDayEventStop[i]==null && (i+1)!=length)
        {
          
           this.eventStopDate[i] = splited[0];
           splited =this.driverEachDayEventStart[i+1].split(" ");
           
          this.eventStopTime[i] =  splited[1];
        }
        else if (this.driverEachDayEventStop[0]==null && (i)==length)
       {
            this.eventStopDate[i] = splited[0];
          this.eventStopTime[i]= "24:00:00";
       }
        else
        {*/
      splited = this.driverEachDayEventStop[i].split(" ");
      this.eventStopDate[i] = splited[0];
      this.eventStopTime[i] = splited[1];
      //}


    }
    console.log("testing event start time" + this.driverEachDayEventStart);
    console.log("testing event stop time" + this.driverEachDayEventStop);
  }




  mapEventNamesToLogEvent() {

    this.mapsEventNamesToLogEvents = []
    let i: number = 0;
    let length = this.driverEachDayEventNames.length;

    for (i = 0; i < length; i++) {
      if (this.driverEachDayEventNames[i] == "Driving") {
        this.mapsEventNamesToLogEvents[i] = 10;
      }
      else if (this.driverEachDayEventNames[i] == "On_Duty") {
        this.mapsEventNamesToLogEvents[i] = 20;
      }
      else if (this.driverEachDayEventNames[i] == "Off_Duty") {
        this.mapsEventNamesToLogEvents[i] = 30;
      }
      else if (this.driverEachDayEventNames[i] == "Sleeper_Berth") {
        this.mapsEventNamesToLogEvents[i] = 40;
      }


    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}