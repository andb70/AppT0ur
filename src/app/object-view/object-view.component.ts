import {Component, OnInit} from '@angular/core';
import {ArchitectService} from '../architect.service';
import {ObjectID} from '../models/object-id.enum';
import {ObjectOfView} from '../models/ObjectOfView';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-piantina',
  templateUrl: './object-view.component.html',
  styleUrls: [
    './styleAngus.scss',
    './styleAngusBackground.scss']
})
export class ObjectViewComponent implements OnInit {
  private _routeSub: Subscription;
  private _paramsSub: Subscription;
  ObjectID = ObjectID;
  data: ObjectOfView;
  private onDiv: ObjectID  = ObjectID.notSet;
  get css(): string {
    return this.data.css;
  }

  constructor(private route: ActivatedRoute, public service: ArchitectService) {
    this.service.viewUnsubscribe.subscribe( () => {
      if (this.isRouteBusy()) {
        this._routeSub.unsubscribe();
      }
      if (this.isParamBusy()) {
        this._paramsSub.unsubscribe();
      }
    });

    this._routeSub = this.service.route.subscribe(result => {
      this.data = result;
      console.log('ObjView routed', result);
    });
  }

  isRouteBusy() {
    return (this._routeSub && !this._routeSub.closed);
  }

  isParamBusy() {
    return (this._paramsSub && !this._paramsSub.closed);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        console.log('ObjView activateView', params['contextID']);
        this.data = this.service.activateView(params['contextID']);
        console.log('ObjView registered', this.data);
      }
    );
  }

  onObjMouseOver(index) {
    // console.log('ObjectOfView objMouseover ' + index);
    if (this.data.children.length > 0) {
      return;
    }
    this.service.onMouseOver({curIndex: index});
  }

  onDivMouseOver(index: ObjectID) {
    // console.log('ObjectOfView divMouseover ' + index);
    this.onDiv = index;
    this.service.onMouseOver({curIndex: index});
  }
  onDivMouseLeave(index: ObjectID) {
    this.onDiv = ObjectID.notSet;
  }
  divOver(index: ObjectID): boolean {
    return index == this.onDiv;
  }
  onClick(index) {
    // console.log('ObjectOfView click ' + index);
    this.service.onRoute(index);
  }

}
