import {ObjectID} from './object-id.enum';
import * as _ from 'underscore';

/**
 * esportiamo 3 classi:
 * ChartDataRecord      oggetto che contiene tutte le proprietà di un singolo grafico
 * LineChartColors      oggetto che contiene le proprietà di una singola serie
 *                    espone dei metodi statici per restituire dei temi già costruiti
 *                      .getGreyTheme()
 *                      .getDarkGreyTheme()
 *                    TODO: aggiungere qui pacchetti tematici per definire le proprietà delle serie
 * AppChartData            oggetto che contiene un array di ChartDataRecord
 *                      nel costruttore vengono creati tutti i record che verranno utilizzati nell'applicazione
 *                    TODO: aggiungere qui altri grafici da richiamare nell'applicazione
 *
 */

export class AppChartData {

  private data: ChartDataRecord[] = [];
  public leanIndex = 0;
  public digitalIndex = 0;

  get chartsVisible(): boolean[] {
    return this._chartsVisible;
  }

  set chartsVisible(value: boolean[]) {
    this._chartsVisible = value;
  }

  private _chartsVisible: boolean[] = [
    true, false, false,
    false, true, false,
    true, true, true];

  constructor() {

    // grafico 1
    const grafico1 = ChartDataRecord.createChartRecord(
      'grafico1',
      [
        this.serieCurrentSTD(),
      ],
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      AppChartData.ChartOptions1('Current absorption', true, 25, 17, 17, false,
        false, 20, 17, false, null),
      AppChartData.ChartOptions1('Current absorption', true, 14, 9, 9, false,
        false, 12, 9, false, null),
      [
        LineChartColors.getGreyTheme()
      ],
      true,
      'line',
      ObjectID.chart1
      )
    ;
    // fine grafico 1

    // grafico 2
    const grafico2 = ChartDataRecord.createChartRecord(
      'grafico2',
      [
        this.serieCurrentSTD(),
        this.serieCurrentLEAN()
      ],
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      AppChartData.ChartOptions1('Current absorption after Lean', true, 25, 17, 17, false,
        false, 20, 17, false, null),
      AppChartData.ChartOptions1('Current absorption after Lean', true, 14, 9, 9, false,
        false, 12, 9, false, null),
      [
        LineChartColors.getGreyTheme(),
        LineChartColors.getDarkGreyTheme()
      ],
      true,
      'line',
      ObjectID.chart2
      )
    ;
    // fine grafico 2


    // grafico 3
    const grafico3 = ChartDataRecord.createChartRecord(
      'grafico3',
      [
        this.serieCurrentSTD(),
        this.serieCurrentLEAN(),
        this.serieCurrentDIGITAL()
      ],
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      AppChartData.ChartOptions1('Current absorption after Digital', true, 25, 17, 17, false,
        false, 20, 17, false, null),
      AppChartData.ChartOptions1('Current absorption after Digital', true, 14, 9, 9, false,
        false, 12, 9, false, null),
      [
        LineChartColors.getGreyTheme(),
        LineChartColors.getDarkGreyTheme(),
        LineChartColors.getBlueTheme()
      ],
      true,
      'line',
      ObjectID.chart3
      )
    ;
    // fine grafico 3

    // grafico 4
    const grafico4 = ChartDataRecord.createChartRecord(
      'grafico4',
      [
        this.serieWaterSTD(),
      ],
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      AppChartData.ChartOptions1('Water consumption', true, 25, 17, 17, false,
        false, 20, 17, false, null),
      AppChartData.ChartOptions1('Water consumption', true, 14, 9, 9, false,
        false, 12, 9, false, null),
      [
        LineChartColors.getRedTheme(),
      ],
      true,
      'bar',
      ObjectID.chart4
      )
    ;
    // fine grafico 4

    // grafico 5
    const grafico5 = ChartDataRecord.createChartRecord(
      'grafico5',
      [
        this.serieWaterSTD(),
        this.serieWaterLEAN(),
      ],
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      AppChartData.ChartOptions1('Water consumption after Lean', true, 25, 17, 17, false,
        false, 20, 17, false, null),
      AppChartData.ChartOptions1('Wastege  after Lean', true, 14, 9, 9, false,
        false, 12, 9, false, null),
      [
        LineChartColors.getRedTheme(),
        LineChartColors.getGreenTheme(),
      ],
      true,
      'bar',
      ObjectID.chart5
      )
    ;
    // fine grafico 5
    // grafico 6
    const grafico6 = ChartDataRecord.createChartRecord(
      'grafico6',
      [
        this.serieWaterSTD(),
        this.serieWaterLEAN(),
        this.serieWaterDIGITAL(),
      ],
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      AppChartData.ChartOptions1('Water consumption after Digital', true, 25, 17, 17, false,
        false, 20, 17, false, null, true),
      AppChartData.ChartOptions1('Water consumption after Digital', true, 14, 9, 9, false,
        false, 12, 9, false, null, true),
      [
        LineChartColors.getRedTheme(),
        LineChartColors.getGreenTheme(),
        LineChartColors.getBlueTheme()
      ],
      true,
      'bar',
      ObjectID.chart6
      )
    ;
    // fine grafico 6
    /**
     * aggiungere qui altre triple di grafici
     *
     */
    const productionBarGraph = ChartDataRecord.createChartRecord(
      'productionBarGraph',
      [{data: [2, 4, 5, 8], label: null}],
      ['Before Lean', 'After Lean', 'After Digital 1', 'After Digital 2'],
      AppChartData.ChartOptions1('Productivity', true, 25, 17, 17, true, true, 20,
        17, true, AppChartData.Callback1(' pieces/man-hour')),
      AppChartData.ChartOptions1('Productivity', true, 14, 9, 9, true, true, 12,
        9, false, AppChartData.Callback1(' pieces/man-hour')),
      [LineChartColors.getGraphBarTheme()],
      false,
      'bar',
      ObjectID.chart7
    );


    const economicImpactBarGraph = ChartDataRecord.createChartRecord(
      'economicImpactBarGraph',
      [{data: [2.4, 5.8, 10.2, 13.4], label: null}],
      ['Before Lean', 'After Lean', 'After Digital 1', 'After Digital 2'],
      AppChartData.ChartOptions1(['Economic Impact', 'EBITDA %'], true, 25, 17, 17, true, true, 20,
        17, true, AppChartData.Callback2('%')),
      AppChartData.ChartOptions1(['Economic Impact', 'EBITDA %'], true, 14, 9, 9, true, true, 12,
        9, false, AppChartData.Callback2('%')),

      [LineChartColors.getGraphBarTheme()],
      false,
      'bar',
      ObjectID.chart8
    );

    const workInProgressGraphBar = ChartDataRecord.createChartRecord(
      'workInProgressGraphBar',
      [{data: [194, 54, 50, 42], label: null}],
      ['Before Lean', 'After Lean', 'After Digital 1', 'After Digital 2'],
      AppChartData.ChartOptions1('Work In Progress (WIP)', true, 25, 17, 17, true, true, 20,
        17, true, AppChartData.Callback1(' pieces')),
      AppChartData.ChartOptions1('Work In Progress (WIP)', true, 14, 9, 9, true, true, 12,
        9, false, AppChartData.Callback1(' pieces')),
      [LineChartColors.getGraphBarTheme()],
      false,
      'bar',
      ObjectID.chart9
    );


    this.data.push(
      grafico1,
      grafico2,
      grafico3,
      grafico4,
      grafico5,
      grafico6,
      /* aggiungere qui le ulteriori triple con chartID > chart9*/
      productionBarGraph,
      economicImpactBarGraph,
      workInProgressGraphBar
    );

  } // fine costruttore

  public static Callback1(text) {
    return {
      label: function (tooltipItem, data) {
        return (
          data['datasets'][0]['data'][tooltipItem['index']] + text /*' pieces'   ' pieces/man-hour'*/
        );
      }/*,
      labelColor: {
        borderColor: '#FFFFDD',
        backgroundColor: '#440000'
      }*/
    };
  }

  public static Callback2(text) {
    return {
      label: function (tooltipItem, data) {
        // get the concerned dataset
        const dataset = data.datasets[tooltipItem.datasetIndex];
        // get the current items value
        const currentValue = dataset.data[tooltipItem.index];

        return currentValue + text /*'%'*/;
      }/*,
      labelColor: {
        borderColor: '#FFFFDD',
        backgroundColor: '#440000'
      }*/
    };
  }


  public static ChartOptions1(text, responsive, titleFontSize, scaleFontSizeX, scaleFontSizeY,
                              stackedX, stackedY, tipTitleFontSize, tipFontSize, tipEnable, myCallbacks, legend = false) {
    return {
      responsive: responsive,
      display: true,
      title: {
        display: true,
        position: 'top',
        fontSize: titleFontSize,
        text: text,
        fontStyle: 'bold',
        fontColor: '#000'
      },
      legend: {
        display: legend,
        labels: {
          fontColor: 'rgb(255, 99, 132)'
        }
      },
      scales: {
        xAxes: [
          {
            stacked: stackedX,
            ticks: {
              beginAtZero: true,
              fontColor: '#000',
              fontSize: scaleFontSizeX,
              fontStyle: 'bold'
            }
          }
        ],
        yAxes: [
          {
            stacked: stackedY,
            ticks: {
              beginAtZero: true,
              fontColor: '#000',
              fontSize: scaleFontSizeY,
              fontStyle: 'bold'
            }
          }
        ]
      },
      tooltips: {
        enabled: tipEnable,
        mode: 'index',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        titleFontSize: tipTitleFontSize,
        titleFontColor: '#0066ff',
        bodyFontColor: '#FFF',
        bodyFontSize: tipFontSize,
        displayColors: false,
        callbacks: myCallbacks
      }
    };
  }


  get visibleCharts(): ChartDataRecord[] {

    // console.log('ChartFilter pattern', this.chartsVisible, this.data);
    const result = _.filter(this.data, (item) => {
      // console.log('ChartFilter item', item, this.chartsVisible[item.chartID - ObjectID.chart1]);
      return (this._chartsVisible[item.chartID - ObjectID.chart1]);
    });
    console.log('ChartFilter', result, this.data);
    return result;
  }

  public serieCurrentSTD(): ChartSerie {
    const data = [75, 89, 80, 81, 70, 73, 90, 85];
    return {data: data, label: 'Standard'};
  }

  public serieCurrentLEAN(): ChartSerie {
    // il numero delle serie è arbitrario, deve essere aumentato fino al
    // massimo numero di opzioni attivabili
    // più è alto l'indice migliore sarà il dato
    const data = [
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55]
    ];
    return {data: data[this.leanIndex], label: 'Lean'};
  }

  public serieCurrentDIGITAL(): ChartSerie {
    // il numero delle serie è arbitrario, deve essere aumentato fino al
    // massimo numero di opzioni attivabili
    // più è alto l'indice migliore sarà il dato
    const data = [
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66]
    ];
    return {data: data[this.digitalIndex], label: 'Digital'};
  }
  public serieWaterSTD(): ChartSerie {
    const data = [75, 89, 80, 81, 70, 73, 90, 85];
    return {data: data, label: 'Standard'};
  }

  public serieWaterLEAN(): ChartSerie {
    // il numero delle serie è arbitrario, deve essere aumentato fino al
    // massimo numero di opzioni attivabili
    // più è alto l'indice migliore sarà il dato
    const data = [
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55],
      [28, 48, 40, 19, 86, 27, 90, 55]
    ];
    return {data: data[this.leanIndex], label: 'Lean'};
  }

  public serieWaterDIGITAL(): ChartSerie {
    // il numero delle serie è arbitrario, deve essere aumentato fino al
    // massimo numero di opzioni attivabili
    // più è alto l'indice migliore sarà il dato
    const data = [
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66],
      [78, 48, 77, 9, 100, 27, 40, 66]
    ];
    return {data: data[this.digitalIndex], label: 'Digital'};
  }
}

export class ChartSerie {
  constructor(public data: number[], public label: string) {
  }
}

export class ChartDataRecord {
  public name: string;
  public lineChartData: ChartSerie[];
  public lineChartLabels: string[];
  public lineChartOptions: any;
  public lineChartOptionsThumbnail: any;
  public lineChartColors: LineChartColors[];
  public lineChartLegend: boolean;
  public lineChartType: string;
  public chartID: ObjectID;
  public tag: any;

  constructor() {

  }
  public static createChartRecord(name: string,
                                  lineChartData: ChartSerie[],
                                  lineChartLabels: string[],
                                  lineChartOptions: any,
                                  lineChartOptionsThumbnail: any,
                                  lineChartColors: LineChartColors[],
                                  lineChartLegend: boolean,
                                  lineChartType: string,
                                  chartID: ObjectID,
                                  tag?: any) {
    const cdr = new ChartDataRecord;
    cdr.name = name;
    cdr.lineChartData = lineChartData;
    cdr.lineChartLabels = lineChartLabels;
    cdr.lineChartOptions = lineChartOptions;
    cdr.lineChartOptionsThumbnail = lineChartOptionsThumbnail;
    cdr.lineChartColors = lineChartColors;
    cdr.lineChartLegend = lineChartLegend;
    cdr.lineChartType = lineChartType;
    cdr.chartID = chartID;
    cdr.tag = tag;
    return cdr;
  }

  public static cloneSerie(src: ChartSerie): ChartSerie {

    const data: number[] = [];
    data.length = src.data.length;
    for (let i = 0; i < src.data.length; i++) {
      data[i] = +src.data[i].toString();
    }

    return new ChartSerie(data, src.label);
  }

  routerLink(): string {
    return '/chart/' + this.chartID;
  }
  clone(): ChartDataRecord {
    const cdr = new ChartDataRecord;
    this.copyTo(cdr);
    return cdr;
  }


  copyTo(dest: ChartDataRecord): void {

    dest.name = this.name.toString();

    const chartData: ChartSerie[] = [];
    this.lineChartData.forEach((record) => {
      chartData.push(ChartDataRecord.cloneSerie(record));
    });
    dest.lineChartData = chartData;

    const chartLabels: string[] = [];
    this.lineChartLabels.forEach((record) => {
      chartLabels.push(record.toString());
    });

    dest.lineChartLabels = chartLabels;

    dest.lineChartOptions = this.lineChartOptions;

    dest.lineChartOptionsThumbnail = this.lineChartOptionsThumbnail;

    const chartColors: LineChartColors[] = [];
    this.lineChartColors.forEach((record) => {
      chartColors.push(record);
    });

    dest.lineChartColors = chartColors;
    dest.lineChartLegend = this.lineChartLegend;
    dest.lineChartType = this.lineChartType.toString();
    dest.tag = this.tag;
  }


}

export class LineChartColors {
  constructor(public backgroundColor: any[],
              public borderColor,
              public borderWidth,
              public pointBackgroundColor = null,
              public pointBorderColor = null,
              public pointHoverBackgroundColor = null,
              public pointHoverBorderColor = null) {
  }

  public static getGreyTheme(): LineChartColors {
    const t = new LineChartColors(
      ['rgba(148,159,177,0.2)'],
      'rgba(148,159,177,1)',
      2,
      'rgba(148,159,177,1)',
      '#fff',
      '#fff',
      'rgba(148,159,177,0.8)'
    );
    return t;
  }

  public static getDarkGreyTheme(): LineChartColors {
    const t = new LineChartColors(
      ['rgba(77,83,96,0.2)'],
      'rgba(77,83,96,1)',
      2,
      'rgba(77,83,96,1)',
      '#fff',
      '#fff',
      'rgba(77,83,96,1)'
    );
    return t;
  }

  public static getGreenTheme(): LineChartColors {
    const t = new LineChartColors(
      ['rgba(10,240,10,1)'],
      'rgba(0,0,96,1)',
      2,
      'rgba(0,0,64,1)',
      '#fff',
      '#fff',
      'rgba(96,96,160,1)'
    );
    return t;
  }

  public static getRedTheme(): LineChartColors {
    const t = new LineChartColors(
      ['rgba(200,10,10,1)'],
      'rgba(0,0,96,1)',
      2,
      'rgba(0,0,64,1)',
      '#fff',
      '#fff',
      'rgba(96,96,160,1)'
    );
    return t;
  }

  public static getBlueTheme(): LineChartColors {
    const t = new LineChartColors(
      ['rgba(10,10, 240,1)'],
      'rgba(0,0,96,1)',
      2,
      'rgba(0,0,64,1)',
      '#fff',
      '#fff',
      'rgba(96,96,160,1)'
    );
    return t;
  }

  public static getGraphBarTheme(): LineChartColors {
    const t = new LineChartColors(
      [
        'rgba(33, 142, 236, 0.8)',
        'rgba(255, 211, 44, 0.8)',
        'rgba(5, 27, 255, 0.8)',
        'rgba(50, 224, 55, 0.8)'
      ],
      '#000000',
      2
    );
    return t;
  }
}
