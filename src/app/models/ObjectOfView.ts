import {ObjectID} from './object-id.enum';
import {OptionOfView} from './OptionBuilder';
import {EventEmitter, Output} from '@angular/core';

/* todo: rendere ObjectOfView ricorsiva portando dentro i membri di ChildOfView
*  e trasformando objects in     objects: ObjectOfView[];
*  risultato:
  export class ObjectOfView {
    css: string;
    routerLink: string;
    childId: string;
    contextID: ObjectID;
    public objects: ObjectOfView[];
    public leanOptions: OptionOfView = new OptionOfView();
    public digitalOptions: OptionOfView = new OptionOfView();
    public _charts: ChartOfView[];   // pacchetto per la contestualizzazione dei grafici
    constructor(public name) { }
  }
  export class ChartOfView {
    chart: number;   // punta ad un chart specifico
    active           // array di condizioni da verificare per avere il grafico attivo
    dataActive[]     // array di condizioni da verificare per avere la traccia attiva
  }

*
* */
export class ObjectOfView implements NodeOfView {
  public objects: ChildOfView[]; // obsoleto
  private _children: ObjectOfView[] = [];
  public parent: ObjectOfView = null;
  private _activeNode: ObjectOfView = null;
  private _hasLean = false;
  private _hasDigital = false;
  private _change = false;
  @Output() change = new EventEmitter();
  css: string;
  childId: string;
  contextID: ObjectID;

  public leanOptions: OptionOfView = new OptionOfView();
  public digitalOptions: OptionOfView = new OptionOfView();
  public chartOptions: OptionOfChart = new OptionOfChart();
  private _leanCount = 0;

  chartsVisible: boolean[] = [
    true, false, false,
    false, true, false,
    true, true, true];

  constructor(private _name) {
  }

  routerLink(): string {
    return '/apptour/' + this.contextID;
  }

  // todo: compilare la stringa dei css per tutte le opzioni attive
  updateOptions() {
    console.log('updateLeanOptions lean: ', this.leanOptions.options, this.digitalOptions.options);
    let cssResult: string = this.leanOptions.cssDefault;
    let hasLean = false;
    let hasDigital = false;


    if (this.btnLean) {
      this.leanOptions.options.forEach(option => {
        if (option.checked) {
          hasLean = true;
          cssResult = option.css;
        }
      });
    }
    if (this.btnDigital) {
      this.digitalOptions.options.forEach(option => {
        if (option.checked) {
          hasDigital = true;
          cssResult = option.css;
        }
      });
    }
    // console.log('updateOptions css: ' + cssResult);
    this.css = cssResult;

    this.chartsVisible = [
      !(hasLean || hasDigital), hasLean && !hasDigital, hasDigital,
      false, true, false,
      true, true, true];

    if (this._hasLean === hasLean && this._hasDigital === hasDigital) {
      return;
    }
    // solo se lo stato dei bottoni è cambiato settiamo l'output:
    // _change = true
    // scateniamo l'evento per l'aggiornamento
    this._hasLean = hasLean;
    this._hasDigital = hasDigital;
    this._change = true;
    this.change.emit();
  }

  get optionChanged(): boolean {
    return this._change;
  }
  get btnLean(): boolean {
    return this.leanOptions.btnMain;
  }

  get btnLeanEnable(): boolean {
    return this.leanOptions.options.length > 0;
  }

  set btnLean(value: boolean) {
    this._change = false;
    if (this.leanOptions.btnMain !== value) {
      this.leanOptions.btnMain = value;
      this.updateOptions();
      return;
    }
  }

  get btnDigital(): boolean {
    return this.digitalOptions.btnMain && this.btnDigitalEnable;
  }

  get btnDigitalEnable(): boolean {
    /* abilitato se non ci sono opzioni lean o se è attivata l'opzione lean */
    const hasDigitalOptions = this.digitalOptions.options.length > 0;
    const leanActive = (this.btnLean && this._leanCount > 0);
    const ignoreLean = !this.btnLeanEnable;
    return hasDigitalOptions && (leanActive || ignoreLean);
  }

  set btnDigital(value: boolean) {
    this._change = false;
    if (this.digitalOptions.btnMain !== value) {
      this.digitalOptions.btnMain = value;
      this.updateOptions();
    }
  }


  setBtnLeanOption(index: number) {
    console.log('setBtnLeanOption', index);
    this._change = false;
    this.leanOptions.options.forEach(option => {
      console.log('check option', option);
      if (option.contextID === index) { // TSLint correction == should be ===
        if (option.checked) {
          this._leanCount--;
        } else {
          this._leanCount++;
        }
        console.log('found option', option);
        option.checked = !option.checked;
        this.updateOptions();
        return;
      }
    });
  }

  setBtnDigitalOption(index: number) {
    this._change = false;
    this.digitalOptions.options.forEach(option => {
      if (option.contextID === index) { // TSLint correction == should be ===
        option.checked = !option.checked;
        this.updateOptions();
        return;
      }
    });
  }


  fromJSON(callbackFn: (index: number) => ObjectOfView): ObjectOfView {
    // utilizzato per integrare tutti i files ts già scritti
    // trasforma la struttura lineare in struttura ad albero
    this.objects.forEach(child => {
      let node: ObjectOfView = callbackFn(child.contextID);
      if (node) {
        node.parent = this;
        node.css = child.css;
        node.childId = child.childId;
        node.contextID = child.contextID;
        this._children.push(node.fromJSON(i => callbackFn(i)));
      } else {
        node = new ObjectOfView(child.name);
        node.parent = this;
        node.css = child.css;
        node.childId = child.childId;
        node.contextID = child.contextID;
        this._children.push(node);
      }
      // node.updateOptions();
    });
    // console.log('BuildTree', this.contextID);
    return this;
  }

  /*  get root(): ObjectOfView {
      if (this.parent) {
        return this.parent.root;
      }
      return this;
    }*/

  setActive() {
    this.activeNode = this;
  }

  set activeNode(node: ObjectOfView) {
    if (this.parent) {
      this.parent.activeNode = node;
    }
    this._activeNode = node;
  }

  get activeNode(): ObjectOfView {
    if (this.parent) {
      return this.parent.activeNode;
    }
    return this._activeNode;
  }

  get isSelected(): boolean {
    return (this === this.activeNode);
  }

  get id(): ObjectID {
    return this.contextID;
  }

  get name(): string {
    return this._name;
  }

  get data(): ObjectOfView {
    return this;
  }

  get node(): NodeOfView {
    return this;
  }

  get children(): NodeOfView[] {

    return this._children;
  }

  get hasDigital(): boolean {
    return this._hasLean;
  }

  get hasLean(): boolean {
    return this._hasDigital;
  }


  /*appendChild(child: ObjectOfView) {
    this._children.push(child);
  }

  numChildren(): number {
    return this._children.length;
  }

  getChildByIndex(index: number) {
    return this._children[index];

  }

  getChildByName(name: string) {
    this._children.forEach(child => {
      if (child.name == name) {
        return child;
      }
    });
    return null;
  }*/
}

export interface NodeOfView {
  id: ObjectID;
  name: string;
  children: NodeOfView[];
  isSelected: boolean;
  data: ObjectOfView;
  hasLean: boolean;
  hasDigital: boolean;
}

export class ChildOfView { // obsoleto
  css: string;
  childId: string;
  contextID: ObjectID;

  constructor(public name) {
  }
}


// portare in un file specifico e implementare
export class OptionOfChart {
  /*
    serve per contestualizzare i _charts, già memorizzati già nell'architect:
    vedi  private _chartData = new AppChartData();
   */
  public options: ChartOptionType[] = [];

  constructor() {
  }

  public addOption(indexOfChart: number,
                   text: string,
                   useWithLeanOptions: boolean[], /* -1 significa con tutte */
                   useWithDigitalOptions: boolean[]  /* -1 significa con tutte */
  ) {
    this.options.push(new ChartOptionType(indexOfChart, text, useWithLeanOptions, useWithDigitalOptions));
  }
}

export class ChartOptionType {
  constructor(public indexOfChart: number,
              public text: string,
              public useWithLeanOptions: boolean[], /* -1 significa con tutte */
              public useWithDigitalOptions: boolean[]  /* -1 significa con tutte */) {
  }
}
