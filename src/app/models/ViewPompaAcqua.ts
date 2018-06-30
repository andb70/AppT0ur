import {ObjectOfView} from './ObjectOfView';
import {ObjectID} from './object-id.enum';

export class ViewPompaAcqua {
  public static JSON() {
    const data: ObjectOfView = new ObjectOfView('Pompa Acqua');
    const objs = [];
    data.objects = objs;

    // tslint:disable-next-line:max-line-length
    objs.push({
      'routerLink': '/apptour/' + ObjectID.viewSensoreCorrenteAssorbita,
      'childId': 'child1',
      'contextID': ObjectID.viewSensoreCorrenteAssorbita
    });
    objs.push({
      'routerLink': '/apptour/' + ObjectID.viewSensoreNumeroDiGiri,
      'childId': 'child2',
      'contextID': ObjectID.viewSensoreNumeroDiGiri
    });
    objs.push({
      'routerLink': '/apptour/' + ObjectID.viewSensoreOreLavoro,
      'childId': 'child3',
      'contextID': ObjectID.viewSensoreOreLavoro
    });

    // TODO --> SISTEMARE CSS
    data.leanOptions.cssDefault = 'an3 bpa';
    data.leanOptions.addOption(3, 'layout', false, ObjectID.btnLeanChild1, false, 'an3L bpaL');
    data.digitalOptions.addOption(4, 'QR', false, ObjectID.btnDigitalChild1, false, 'an3L bpaD');
    return data;

  }
}
