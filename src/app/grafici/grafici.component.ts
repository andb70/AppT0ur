import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArchitectService} from '../architect.service';
import {ObjectID} from '../models/object-id.enum';

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.component.html',
  styleUrls: ['./grafici.component.css']
})
export class GraficiComponent implements OnInit {

  ObjectID = ObjectID;
  leanStato = false;
  digitalStato = false;
  grafico1 = 'grafico';
  grafico2 = 'grafico2';
  grafico3 = 'grafico3';

  @Output() grafico = new EventEmitter();

  constructor(public service: ArchitectService) {
    this.service.leanClick.subscribe(res => {
      this.leanStato = res.stato;
    });
    this.service.digitalClick.subscribe(res => {
      this.digitalStato = res.stato;
    });
    this.service.grafici.subscribe(res => {
      this.grafico1 = res.first;
      this.grafico2 = res.second;
      this.grafico3 = res.third;
     /* return this.grafico1, this.grafico2;*/
    });
  }

  ngOnInit() {

  }

  changeClass() {
    this.service.changeClassGraphFirst();
  }
  onDivMouseOver(index) {
    this.service.onMouseOver({curIndex: index});
  }

}
