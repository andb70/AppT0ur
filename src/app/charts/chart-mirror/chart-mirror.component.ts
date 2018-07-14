import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChartDataRecord} from '../../models/AppChartData';
import {ArchitectService} from '../../architect.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import * as Chart from 'chart.js';
import {ChartDataSets} from 'chart.js';

@Component({
  selector: 'app-chart-mirror',
  template:
      `
    <div class="gridInNine"
         (mouseover)="chartHovered($event)"
         (click)="chartClicked($event)">
      <canvas class="center"
              width="320" height="255"
              #chartCanvas>{{ chart }}
      </canvas>
    </div>`,
  styleUrls: ['../charts.css']
})
export class ChartMirrorComponent implements AfterViewInit {

  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  context: CanvasRenderingContext2D;

  chart;
  data: ChartDataRecord;
  private _subscription: Subscription;

  constructor(private router: Router, public service: ArchitectService, private cdRef: ChangeDetectorRef) {
    // console.log('Chart constructor');
  }

  /*  con il decorator @ViewChild aspettiamo di vedere il canvas dopo ViewInit
      in modo da poterci inserire il chart di nostra creazione, valorizzando la variabile
      NB: eliminaiamo eventuali sottoscrizioni presenti > TODO verificare se serve
      quindi sottoscriviamo chartRoute per ricevere le notifiche quando si naviga verso
      un altro grafico e poter creare la vista conseguente
      creiamo il primo grafico
   */
  ngAfterViewInit(): void {
    console.log('ChartMirror ngAfterViewInit data is undefined');
    if (this.isBusy()) {
      this._subscription.unsubscribe();
    }
    this._subscription = this.service.optionsChange.subscribe((curView) => {
      console.log('ChartMirror', curView);
       // scaricare il grafico corrente e ricaricare

      try {
        console.log('ChartMirror destroy chart', this.data);
        this.chart.destroy();
      } catch (e) {
        console.log('ChartMirror destroy fail', e);
      }
      this.data = this.service.getActiveChart();
      this.createChart();
    });

    this.service.chartRoute.subscribe(data => {
      try {
        console.log('ChartMirror destroy chart', this.data);
        this.chart.destroy();
      } catch (e) {
        console.log('ChartMirror destroy fail', e);
      }
      this.data = data;
      this.createChart();
    });
    this.data = this.service.getActiveChart();
    this.createChart();
    // solo in questo momento serve ad evitare l'errore di cambio valore dopo il check
    this.cdRef.detectChanges();
  }

  isBusy() {
    return (this._subscription && !this._subscription.closed);
  }

  createChart() {
    console.log('createChart context', this.chartCanvas, this.context);
    this.context = this.chartCanvas.nativeElement.getContext('2d');
    /*
    class Chart {
    static readonly Chart: typeof Chart;
    constructor(
        context: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
        options: Chart.ChartConfiguration
    );
    config: Chart.ChartConfiguration;
    data: Chart.ChartData;

      interface ChartConfiguration {
          type?: ChartType | string;
          data?: ChartData;
          options?: ChartOptions;

      type ChartType = 'line' | 'bar' | 'horizontalBar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie';

      interface ChartData {
          labels?: Array<string | string[]>;
          datasets?: ChartDataSets[];
      }

        interface ChartDataSets {
            cubicInterpolationMode?: 'default' | 'monotone';
            backgroundColor?: ChartColor | ChartColor[];
            borderWidth?: number | number[];
            borderColor?: ChartColor | ChartColor[];
            borderCapStyle?: string;
            borderDash?: number[];
            borderDashOffset?: number;
            borderJoinStyle?: string;
            borderSkipped?: PositionType;
            data?: number[] | ChartPoint[];
            fill?: boolean | number | string;
            hoverBackgroundColor?: string | string[];
            hoverBorderColor?: string | string[];
            hoverBorderWidth?: number | number[];
            label?: string;
            lineTension?: number;
            steppedLine?: 'before' | 'after' | boolean;
            pointBorderColor?: ChartColor | ChartColor[];
            pointBackgroundColor?: ChartColor | ChartColor[];
            pointBorderWidth?: number | number[];
            pointRadius?: number | number[];
            pointHoverRadius?: number | number[];
            pointHitRadius?: number | number[];
            pointHoverBackgroundColor?: ChartColor | ChartColor[];
            pointHoverBorderColor?: ChartColor | ChartColor[];
            pointHoverBorderWidth?: number | number[];
            pointStyle?: PointStyle | HTMLImageElement | Array<PointStyle | HTMLImageElement>;
            xAxisID?: string;
            yAxisID?: string;
            type?: string;
            hidden?: boolean;
            hideInLegendAndTooltip?: boolean;
            showLine?: boolean;
            stack?: string;
            spanGaps?: boolean;
        }
    type ChartColor = string | CanvasGradient | CanvasPattern | string[];

     */
    this.chart = new Chart(this.context, {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    });
    this.chart.update();
  }


  // events
  public chartClicked(e: any): void {
    console.log('Chart ' + this.data.chartID + ' chartClicked ObjectID.notSet isRouteBusy: ', this.isBusy());
    /* qui il grafico deve chiudersi, lo facciamo semplicemente navigando
       verso la visualizzazione attiva
    */
    this.service.onRoute(this.service.curView.contextID);
  }

  public chartHovered(e: any): void {
    this.service.onMouseOver(this.data.chartID);
  }

  get datasets(): ChartDataSets[] {
    if (this.data == null) {
      return;
    }
    /*return this.data.lineChartData;*/
    let cds: ChartDataSets[] = [];
    for (let i = 0; i < this.data.lineChartData.length; i++) {
      cds.push({
        borderColor: this.data.lineChartColors[i].borderColor,
        backgroundColor: this.data.lineChartColors[i].backgroundColor,
        borderWidth: this.data.lineChartColors[i].borderWidth,
        data: this.data.lineChartData[i].data,
        label: this.data.lineChartData[i].label
      } as ChartDataSets);
    }
    return cds;
  }

  get labels() {
    if (this.data == null) {
      return;
    }
    return this.data.lineChartLabels;
  }

  get options() {
    if (this.data == null) {
      return;
    }
    return this.data.lineChartOptions;
  }

  get colors() {
    if (this.data == null) {
      return;
    }
    return this.data.lineChartColors;
  }

  get legend() {
    return false;
    // return this.data.lineChartLegend;
  }

  get chartType() {
    if (this.data == null) {
      return;
    }
    return this.data.lineChartType;
  }
}
