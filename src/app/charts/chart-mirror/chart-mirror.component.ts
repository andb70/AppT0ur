import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartDataRecord} from '../../models/ChartData';
import {ArchitectService} from '../../architect.service';
import {ICallback} from '../../models/ICallback';
import {ObjectID} from '../../models/object-id.enum';
import * as Chart from 'chart.js';

import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chart-mirror',
  templateUrl: '../charts.html',
  styleUrls: ['../charts.css']
})
export class ChartMirrorComponent implements OnInit, ICallback {

  @Input()
  contextID: ObjectID = ObjectID.notSet;
  private _subscription: Subscription;
  public data: ChartDataRecord;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public service: ArchitectService) {
    console.log('Chart Mirror constructor');
    this.data = ChartData.voidChart();
  }

  setData(data: any) {
    // this.data = data.console.log('Got new data');
  }

  ngOnInit() {


    console.log('Chart Mirror ' + this.contextID + ' init: register route: subscribe ');
    if (!this.isBusy()) {
      this._subscription = this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            console.log('Chart Mirror ' + this.contextID + ' NavigationEnd: ', event);
            const response = this.service.getActiveChart();
            if (response.valid) {
              console.log('Chart Mirror ' + this.contextID + ' data applied');
              response.data.copyTo(this.data);
            }
          }
        });
    } else {
      console.log('Chart Mirror ' + this.contextID + ' init: Route IsBusy ');
    }

    // fino al momento del subscribe non riceviamo alcun evento
    // quindi andiamo a prenderci i dati subito e usciamo, per evitare
    // che i dati di default sovrascivano quelli appena ricevuti

    console.log('chart Mirror ' + this.contextID + ' init: after register route');
    const result = this.service.getActiveChart();
    if (result.valid) {
      result.data.copyTo(this.data);
    }
    console.log('Chart Mirror ' + this.contextID + ' init: End 1');

  }

  isBusy() {
    return (this._subscription && !this._subscription.closed);
  }

  // events
  public chartClicked(e: any): void {


    console.log('Chart Mirror ' + this.contextID + ' chartClicked ObjectID.notSet isBusy: ', this.isBusy());
    // qui deve chiudersi ma prima deve eliminare
    // la sottoscrizione agli eventi del router
    if (this.isBusy()) {
      console.log('Chart Mirror ' + this.contextID + ' chartClicked Router.unSubscribe');
      this._subscription.unsubscribe();
    }
    console.log('Chart Mirror ' + this.contextID + ' chartClicked before navigate');
    /*this.router.navigate(['home']);*/
    window.history.back();
    console.log('Chart Mirror ' + this.contextID + ' chartClicked end');


  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  get datasets() {
    if (!this.data) {return null; }
    return this.data.lineChartData;
  }

  get labels() {
    if (!this.data) {return null; }
    return this.data.lineChartLabels;
  }

  get options() {
    if (!this.data) {return null; }
    return this.data.lineChartOptions;
  }

  get colors() {
    if (!this.data) {return null; }
    return this.data.lineChartColors;
  }

  get legend() {
    // if (!this.data) {return null; }
    return false;
    // return this.data.lineChartLegend;
  }

  get chartType() {
    if (!this.data) {return null; }
    return this.data.lineChartType;
  }

}