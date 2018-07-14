import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, ITreeState} from 'angular-tree-component';
import {ArchitectService} from '../architect.service';
import {ChangeDetectorRef} from '@angular/core';
import {ObjectID} from '../models/object-id.enum';
import {NodeOfView, ObjectOfView} from '../models/ObjectOfView';

// http://demos.wijmo.com/5/Angular2/TreeViewIntro/TreeViewIntro/

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  /*
  template: `
    <tree-root #tree class="node"
               [(state)]="state"
               [nodes]="nodes"
               [options]="options"
               (mouseover)="onObjMouseOver(0)"></tree-root>`,
    */
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements AfterViewInit {

  state: ITreeState;
  nodes: NodeOfView[] = [];

  @ViewChild('tree') tree;

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        $event.preventDefault();
        console.log('node click', node, event);
        this.service.onRoute(node.id);
      },
    },
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
  };

  options: ITreeOptions = {
    actionMapping: this.actionMapping
  };

  constructor(public service: ArchitectService, private cdRef: ChangeDetectorRef) {
    this.nodes = [service.root];
    service.route.subscribe((node: ObjectOfView) => {
      console.log('Node route', node);
      // this.activate(node);
    });
    service.optionsChange.subscribe((node: ObjectOfView) => {
      console.log('Node optionsChange', node);
    });
  }
 /* activate (node) {
    const t = this.tree.treeModel;
    const activeNode = t.getActiveNode();
    if (activeNode) {
      activeNode.setIsActive(false, true);
    }
    const newNode = t.getNodeById(node.id);
    console.log('NewNode', newNode);
    newNode.setIsActive(true);
    t.update();
  }*/

  ngAfterViewInit() {
    console.log('ViewChild', this.tree);
    this.tree.treeModel.expandAll();
    this.cdRef.detectChanges();
    // this.activate(this.tree.treeModel.getNodeById(this.nodes[0].id));
  }

  onObjMouseOver(index) {
    console.log('Node objMouseover ' + index);
    this.service.onMouseOver({curIndex: ObjectID.node});
  }

}
