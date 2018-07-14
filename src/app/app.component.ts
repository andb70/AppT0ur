import { Component } from '@angular/core';
import {ArchitectService} from './architect.service';
import {ObjectID} from './models/object-id.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appT0urist';

  constructor(public service: ArchitectService) {
    this.homeRedirect();
  }

  homeRedirect() {
    console.log('app homeRedirect');
    this.service.onRoute(ObjectID.viewHome);
  }

  counterChartZero() {
    // this.service.chartCounterZero();
  }

}
