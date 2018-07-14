import {Component} from '@angular/core';
import {ArchitectService} from '../architect.service';
import {ObjectID} from '../models/object-id.enum';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.css']
})
export class WorkInProgressComponent {
  ObjectID = ObjectID;

  constructor(public service: ArchitectService) {
  }

  homeRedirect() {
    this.service.onRoute(ObjectID.viewHome);
  }

  onDivMouseOver(index) {
    this.service.onMouseOver({curIndex: index});
  }
}
