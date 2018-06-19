import {ObjectID} from './object-id.enum';
import {ObjectOfView} from './ObjectOfView';

export class ViewPiantinaAngus {
  public static JSON () {
    const data: ObjectOfView = new ObjectOfView('ViewPiantinaAngus');
    const objs = [];
    data.objects = objs;

    objs.push({'routerLink': '/apptour/' + ObjectID.viewSezioneLavaggio, 'childId': 'child1', 'contextID': ObjectID.viewSezioneLavaggio});
    objs.push({'routerLink': '/apptour/' + ObjectID.viewSezionePretrattamento, 'childId': 'child2', 'contextID': ObjectID.viewSezionePretrattamento});
    objs.push({'routerLink': '/apptour/' + ObjectID.viewSezioneStoccaggio, 'childId': 'child3', 'contextID': ObjectID.viewSezioneStoccaggio});

    data.leanOptions.cssDefault = 'angus3Default';

    data.leanOptions.addOption(3, 'layout', false, ObjectID.btnLeanChild1, false, 'angus3Lean');
    data.leanOptions.addOption(3, 'sfondo', false, ObjectID.btnLeanChild2, false, 'angus3Lean sfondo');

    data.digitalOptions.addOption(4, 'QR', false, ObjectID.btnDigitalChild1, false, 'angus3Digital');
    return data;

  }
}
