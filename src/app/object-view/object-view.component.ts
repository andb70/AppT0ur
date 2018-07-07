import {Component, OnInit} from '@angular/core';
import {ArchitectService} from '../architect.service';
import {ObjectID} from '../models/object-id.enum';
import {ObjectOfView} from '../models/ObjectOfView';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-piantina',
  templateUrl: './object-view.component.html',
  styleUrls: [
    './styleAngus.scss',
    './styleAngusBackground.scss']
})

/*

  per intercettare gli eventi di routing
  https://stackoverflow.com/questions/33571605/angular-2-how-to-navigate-to-another-route-using-this-router-parent-navigate

  https://toddmotto.com/dynamic-page-titles-angular-2-router-events

  leggere i parametri
  https://stackoverflow.com/questions/40275862/how-to-get-parameter-on-angular2-route-in-angular-way

  compatibilità rxjs
  https://github.com/shlomiassaf/ngx-modialog/issues/426

 */
export class ObjectViewComponent implements OnInit {
  ObjectID = ObjectID;
  data: ObjectOfView;

  constructor(private router: Router, private route: ActivatedRoute, public service: ArchitectService) {

    this.service.route.subscribe(result => {
      console.log('View routed ' + result);
    });
    this.service.dataChange.subscribe(result => {
      //   {'index': 3, 'text': 'layout', 'checked': false},
      console.log('Optimize data change', result);
      this.data = result;
    });
  }


  get css(): string {
    return this.data.css;
  }

  register(contextID: number) {
    this.data = this.service.registerObject(contextID);

  }

  ngOnInit() {
    // console.log('ObjView ' + this.contextID + ' init before register');
    this.route.params.subscribe(params => {
        // console.log('ObjView ' + this.contextID + ' init: route.subscribe');
        this.register(params['contextID']);
        console.log('ObjView ' + this.data.contextID + ' init: route registered');
      }
    );
    // console.log('ObjView  ' + this.contextID + ' init: after registerObject');
  }


  onObjMouseOver(index) {
    console.log('ObjectOfView objMouseover ' + index);
    if (this.data.children.length > 0) {
      return;
    }
    this.service.onMouseOver({curIndex: index});
  }

  onDivMouseOver(index) {
    console.log('ObjectOfView divMouseover ' + index);
    this.service.onMouseOver({curIndex: index});
  }

  onClick(index) {
    console.log('ObjectOfView click ' + index);
    this.service.onRoute(index);
  }

}
