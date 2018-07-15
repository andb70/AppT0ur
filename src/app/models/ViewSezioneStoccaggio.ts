import {ObjectID} from './object-id.enum';
import {ObjectOfView} from './ObjectOfView';

export class ViewSezioneStoccaggio {
  public static JSON() {
    const data: ObjectOfView = new ObjectOfView('Sezione Stoccaggio');
    const objs = [];
    data.objects = objs;

    objs.push({'childId': 'child1', 'contextID': ObjectID.viewImpilatore});

    data.leanOptions.cssDefault = 'an1 bss';
    // data.leanOptions.addOption(3, 'layout', false, ObjectID.btnLeanChild1, false, 'an1 bssL');
    data.digitalOptions.addOption(4, 'QR', false, ObjectID.btnDigitalChild1, false, 'an1 bssD');
    return data;

  }
}
