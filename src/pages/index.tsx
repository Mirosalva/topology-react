import React from 'react';
import { connect } from 'dva';

import styles from './index.less';
import { Tools } from '@/utils/tools';
import {getJsonHeaders,post} from '@/utils/http/requestMethod';
import * as FileSaver from 'file-saver';
declare var C2S: any;

import { Topology } from 'topology-core';
import { Options } from 'topology-core/options';
import { registerNode } from 'topology-core/middles';
import {
  flowData,
  flowDataAnchors,
  flowDataIconRect,
  flowDataTextRect,
  flowSubprocess,
  flowSubprocessIconRect,
  flowSubprocessTextRect,
  flowDb,
  flowDbIconRect,
  flowDbTextRect,
  flowDocument,
  flowDocumentAnchors,
  flowDocumentIconRect,
  flowDocumentTextRect,
  flowInternalStorage,
  flowInternalStorageIconRect,
  flowInternalStorageTextRect,
  flowExternStorage,
  flowExternStorageAnchors,
  flowExternStorageIconRect,
  flowExternStorageTextRect,
  flowQueue,
  flowQueueIconRect,
  flowQueueTextRect,
  flowManually,
  flowManuallyAnchors,
  flowManuallyIconRect,
  flowManuallyTextRect,
  flowDisplay,
  flowDisplayAnchors,
  flowDisplayIconRect,
  flowDisplayTextRect,
  flowParallel,
  flowParallelAnchors,
  flowComment,
  flowCommentAnchors
} from 'topology-flow-diagram';

import {
  activityFinal,
  activityFinalIconRect,
  activityFinalTextRect,
  swimlaneV,
  swimlaneVIconRect,
  swimlaneVTextRect,
  swimlaneH,
  swimlaneHIconRect,
  swimlaneHTextRect,
  fork,
  forkHAnchors,
  forkIconRect,
  forkTextRect,
  forkVAnchors
} from 'topology-activity-diagram';
import {
  simpleClass,
  simpleClassIconRect,
  simpleClassTextRect,
  interfaceClass,
  interfaceClassIconRect,
  interfaceClassTextRect
} from 'topology-class-diagram';
import {
  lifeline,
  lifelineAnchors,
  lifelineIconRect,
  lifelineTextRect,
  sequenceFocus,
  sequenceFocusAnchors,
  sequenceFocusIconRect,
  sequenceFocusTextRect
} from 'topology-sequence-diagram';

import CanvasProps from './components/canvasProps';
import { IEvent } from '@/models/event';
import { Store } from 'le5le-store';


class Index extends React.Component<{ event: IEvent }> {

  canvas: Topology;
  canvasOptions: Options = {
    rotateCursor: '/img/rotate.cur'
  };
  subMenu : any;
  selected: CanvasProps;

  data = {
    id: '',
    fileId: '',
    data: { nodes: [], lines: [] },
    name: '',
    desc: '',
    image: '',
    userId: '',
    shared: false
  };

  state = {
    event: this.props.event,
    tools: Tools,
    iconfont: { fontSize: '48px' },
    selected: {
      node: null,
      line: null,
      multi: false,
    }
  };

  componentDidMount() {
    this.canvasRegister();
    this.canvasOptions.on = this.onMessage;
    this.canvas = new Topology('topology-canvas', this.canvasOptions);

    // this.addSubscribe();
    document.addEventListener("keydown", this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown)
  }

  // 监听键盘快捷键
  onKeyDown = (key:KeyboardEvent) => {
    switch (key.keyCode) {
      case 79:
        if (key.ctrlKey) {
          setTimeout(() => {
            this.selected = null;
          });
          if (!this.data.id) {
            this.onNew();
          }
          this.onOpenLocal();
        }
        break;
      case 73:
        if (key.ctrlKey) {
          setTimeout(() => {
            this.selected = null;
          });
          this.onOpenLocal();
        }
        break;
      case 83:
        if (key.ctrlKey) {
          if (key.shiftKey) {
            this.data.id = '';
            this.save();
          } else if (key.altKey) {
            this.onSaveLocal();
          } else {
            this.save();
          }
        }
        break;
      case 88:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.onCut();
        }
        break;
      case 67:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.onCopy();
        }
        break;
      case 86:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.onParse();
        }
        break;
      case 89:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.canvas.redo();
        }
        break;
        // 撤销 反撤销
      case 90:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          if (key.shiftKey) {
            this.canvas.redo();
          } else {
            this.canvas.undo();
          }
        }
        break;
    }

    if (key.ctrlKey && key.keyCode === 83) {
      key.preventDefault();
      key.returnValue = false;
      return false;
    }
  }

  // 对 menu 子项点击事件监听
  // addSubscribe = () => {
  //   this.subMenu = Store.subscribe('clickMenu', (menu: { event: string; data: any }) => {
  //     switch (menu.event) {
  //       case 'new':
  //         this.onNew();
  //         break;
  //       case 'open':
  //         setTimeout(() => {
  //           this.selected = null;
  //         });
  //         if (!this.data.id) {
  //           this.onNew();
  //         }
  //         this.onOpenLocal();
  //         break;
  //       case 'save':
  //         // alert('test')
  //         // this.testHttp();
  //         this.save();
  //         break;
  //       case 'saveAs':
  //         this.data.id = '';
  //         this.save();
  //         break;
  //       case 'down':
  //         this.onSaveLocal();
  //         break;
  //       case 'downPng':
  //         this.onSavePng(menu.data);
  //         break;
  //       case 'undo':
  //         this.canvas.undo();
  //         break;
  //       case 'redo':
  //         this.canvas.redo();
  //         break;
  //       case 'cut':
  //         this.canvas.cut();
  //         break;
  //       case 'copy':
  //         this.canvas.copy();
  //         break;
  //       case 'parse':
  //         this.canvas.parse();
  //         break;
  //       case 'filename':
  //         this.onSaveFilename(menu.data);
  //         break;
  //       case 'share':
  //         this.onShare();
  //         break;
  //       case 'lock':
  //         this.readonly = menu.data;
  //         this.canvas.lock(menu.data);
  //         break;
  //       case 'lineName':
  //         this.canvas.data.lineName = menu.data;
  //         break;
  //       case 'fromArrowType':
  //         this.canvas.data.fromArrowType = menu.data;
  //         break;
  //       case 'toArrowType':
  //         this.canvas.data.toArrowType = menu.data;
  //         break;
  //       // case 'scale':
  //         // this.canvas.scaleTo(menu.data);
  //         // break;
  //       case 'fullscreen':
  //         // this.workspace.nativeElement.requestFullscreen();
  //         // 改成react的函数绑定 实现全屏
  //         setTimeout(() => {
  //           this.canvas.resize();
  //           this.canvas.overflow();
  //         }, 500);
  //         break;
  //     }
  //   });
  //
  // }

  onNew() {
    this.data = {
      id: '',
      fileId: '',
      data: { nodes: [], lines: [] },
      name: '',
      desc: '',
      image: '',
      userId: '',
      shared: false
    };
    Store.set('file', this.data);
    this.canvas.open(this.data.data);
  }

  async onOpen(data: { id: string; fileId?: string }) {
    const ret = await this.service.Get(data);
    if (!ret) {
      this.router.navigateByUrl('/workspace');
      return;
    }
    Store.set('recently', {
      id: ret.id,
      fileId: ret.fileId || '',
      image: ret.image,
      name: ret.name,
      desc: ret.desc
    });

    if (this.user && ret.userId !== this.user.id) {
      ret.shared = false;
      ret.id = '';
    }
    this.data = ret;
    Store.set('lineName', ret.data.lineName);
    Store.set('fromArrowType', ret.data.fromArrowType);
    Store.set('toArrowType', ret.data.toArrowType);
    this.canvas.open(ret.data);

    Store.set('file', this.data);

    this.animate();
  }

  animate() {
    const n = Date.now();
    for (const item of this.canvas.data.nodes) {
      if (item.animatePlay) {
        item.animateStart = n;
      }
    }
    this.canvas.animate();
  }

  onOpenLocal() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      const elem: any = event.srcElement || event.target;
      if (elem.files && elem.files[0]) {
        const name = elem.files[0].name.replace('.json', '');
        this.data.name = name;
        Store.set('file', this.data);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const text = e.target.result + '';
          try {
            const data = JSON.parse(text);
            if (data && Array.isArray(data.nodes) && Array.isArray(data.lines)) {
              Store.set('lineName', data.lineName);
              Store.set('fromArrowType', data.fromArrowType);
              Store.set('toArrowType', data.toArrowType);
              this.data = {
                id: '',
                fileId: '',
                data,
                name: name,
                desc: '',
                image: '',
                userId: '',
                shared: false
              };
              this.canvas.open(data);
            }
          } catch (e) {
            return false;
          }
        };
        reader.readAsText(elem.files[0]);
      }
    };
    input.click();
  }


  testHttp () {
    const requestParams = {
      REQUEST_URL: '/testforhttp',
      headers: getJsonHeaders()
    };
    const _this = this;
    post(requestParams, {
      onSuccess (responseData) {
        if (responseData.returnCode == 0) {
          const {guardianName } = responseData.data;
          _this.setState({
            guardianName
          })
        }
      },
    });
  }

  save() {
    this.data.data = this.canvas.data;
    this.canvas.toImage(null, null, async blob => {
      if (this.data.id && !this.coreService.isVip(this.user)) {
        if (!(await this.service.DelImage(this.data.image))) {
          return;
        }
      }

      const file = await this.service.Upload(blob, this.data.shared);
      if (!file) {
        return;
      }
      this.data.image = file.url;
      const ret = await this.service.Save(this.data);
      if (ret) {
        this.data.id = ret.id;
        Store.set('file', this.data);
        const _noticeService: NoticeService = new NoticeService();
        _noticeService.notice({
          body: '保存成功！',
          theme: 'success'
        });

        Store.set('recently', {
          id: this.data.id,
          image: this.data.image,
          name: this.data.name,
          desc: this.data.desc
        });

        this.router.navigate(['/workspace'], { queryParams: { id: this.data.id } });
      }
    });
  }

  async onSaveFilename(filename: string) {
    this.data.name = filename;
    Store.set('file', this.data);

    if (this.data.id) {
      if (
        !(await this.service.Patch({
          id: this.data.id,
          name: filename
        }))
      ) {
        return;
      }

      Store.set('recently', {
        id: this.data.id,
        fileId: this.data.fileId || '',
        image: this.data.image,
        name: filename
      });
    }
  }

  onSaveLocal() {
    const data = this.canvas.data;
    FileSaver.saveAs(
      new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' }),
      `${this.data.name || 'le5le.topology'}.json`
    );
  }

  onSavePng(options?: { type?: string; quality?: any; ext?: string }) {
    if (!options) {
      options = {};
    }
    const name = this.data.name + (options.ext || '.png');
    this.canvas.saveAsImage(name, options.type, options.quality);
  }

  async onShare() {
    if (!this.data.id) {
      return;
    }

    if (
      !(await this.service.Patch({
        id: this.data.id,
        image: this.data.image,
        shared: !this.data.shared
      }))
    ) {
      return;
    }

    this.data.shared = !this.data.shared;
    Store.set('file', this.data);
  }

  onCut() {
    this.canvas.cut();
  }
  onCopy() {
    this.canvas.copy();
  }
  onParse() {
    this.canvas.parse();
  }

  canvasRegister() {
    registerNode('flowData', flowData, flowDataAnchors, flowDataIconRect, flowDataTextRect);
    registerNode('flowSubprocess', flowSubprocess, null, flowSubprocessIconRect, flowSubprocessTextRect);
    registerNode('flowDb', flowDb, null, flowDbIconRect, flowDbTextRect);
    registerNode('flowDocument', flowDocument, flowDocumentAnchors, flowDocumentIconRect, flowDocumentTextRect);
    registerNode(
      'flowInternalStorage',
      flowInternalStorage,
      null,
      flowInternalStorageIconRect,
      flowInternalStorageTextRect
    );
    registerNode(
      'flowExternStorage',
      flowExternStorage,
      flowExternStorageAnchors,
      flowExternStorageIconRect,
      flowExternStorageTextRect
    );
    registerNode('flowQueue', flowQueue, null, flowQueueIconRect, flowQueueTextRect);
    registerNode('flowManually', flowManually, flowManuallyAnchors, flowManuallyIconRect, flowManuallyTextRect);
    registerNode('flowDisplay', flowDisplay, flowDisplayAnchors, flowDisplayIconRect, flowDisplayTextRect);
    registerNode('flowParallel', flowParallel, flowParallelAnchors, null, null);
    registerNode('flowComment', flowComment, flowCommentAnchors, null, null);

    // activity
    registerNode('activityFinal', activityFinal, null, activityFinalIconRect, activityFinalTextRect);
    registerNode('swimlaneV', swimlaneV, null, swimlaneVIconRect, swimlaneVTextRect);
    registerNode('swimlaneH', swimlaneH, null, swimlaneHIconRect, swimlaneHTextRect);
    registerNode('forkH', fork, forkHAnchors, forkIconRect, forkTextRect);
    registerNode('forkV', fork, forkVAnchors, forkIconRect, forkTextRect);

    // class
    registerNode('simpleClass', simpleClass, null, simpleClassIconRect, simpleClassTextRect);
    registerNode('interfaceClass', interfaceClass, null, interfaceClassIconRect, interfaceClassTextRect);

    // sequence
    registerNode('lifeline', lifeline, lifelineAnchors, lifelineIconRect, lifelineTextRect);
    registerNode('sequenceFocus', sequenceFocus, sequenceFocusAnchors, sequenceFocusIconRect, sequenceFocusTextRect);
  }

  onMessage = (event: string, data: any) => {
    switch (event) {
      case 'node':
      case 'addNode':
        this.setState({
          selected: {
            node: data,
            line: null,
            multi: false,
          }
        });
        break;
      case 'line':
      case 'addLine':
        this.setState({
          selected: {
            node: null,
            line: data,
            multi: false,
          }
        });
        break;
      case 'multi':
        this.setState({
          selected: {
            node: null,
            line: null,
            multi: true
          }
        });
        break;
      case 'space':
        this.setState({
          selected: {
            node: null,
            line: null,
            multi: false
          }
        });
        break;
      case 'moveOut':

        break;
      case 'moveNodes':
      case 'resizeNodes':
        if (data.length > 1) {
          this.setState({
            selected: {
              node: null,
              line: null,
              multi: true,
            }
          });
        } else {
          this.setState({
            selected: {
              node: data[0],
              line: null,
              multi: false
            }
          });
        }
        break;
      case 'resize':
      case 'scale':
      case 'locked':
        if (this.canvas) {
          this.props.dispatch({
            type: 'canvas/update',
            payload: {
              data: this.canvas.data
            }
          });
        }
        break;
    }
    // tslint:disable-next-line:no-console
    // console.log('onMessage:', event, data);
  };

  onDrag(event: React.DragEvent<HTMLAnchorElement>, node: any) {
    event.dataTransfer.setData('Text', JSON.stringify(node.data));
  }

  handlePropsChange = (props: any, changedValues: any, allValues: any) => {
    if (changedValues.node) {
      // 遍历查找修改的属性，赋值给原始Node

      // this.state.selected.node = Object.assign(this.state.selected.node, changedValues.node);
      for (const key in changedValues.node) {
        if (Array.isArray(changedValues.node[key])) {
        } else if (typeof changedValues.node[key] === 'object') {
          for (const k in changedValues.node[key]) {
            this.state.selected.node[key][k] = changedValues.node[key][k];
          }
        } else {
          this.state.selected.node[key] = changedValues.node[key];
        }
      }
      // 通知属性更新，刷新
      this.canvas.updateProps(this.state.selected.node);
    }
  }

  componentDidUpdate() {
    if (this.props.event !== this.state.event) {
      this.setState({ event: this.props.event });
      if (this['handle_' + this.props.event.event]) {
        this['handle_' + this.props.event.event](this.props.event.data);
      }
    }
  }

  handle_new(data: any) {
    this.canvas.open({ nodes: [], lines: [] });
  }

  handle_open(data: any) {
    this.handle_replace(data);
  }

  handle_replace(data: any) {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      const elem: any = event.srcElement || event.target;
      if (elem.files && elem.files[0]) {
        const name = elem.files[0].name.replace('.json', '');
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const text = e.target.result + '';
          try {
            const data = JSON.parse(text);
            if (data && Array.isArray(data.nodes) && Array.isArray(data.lines)) {
              this.canvas.open(data);
            }
          } catch (e) {
            return false;
          }
        };
        reader.readAsText(elem.files[0]);
      }
    };
    input.click();
  }

  handle_save(data: any) {
    FileSaver.saveAs(
      new Blob([JSON.stringify(this.canvas.data)], { type: 'text/plain;charset=utf-8' }),
      `topography.json`
    );
  }

  handle_savePng(data: any) {
    this.canvas.saveAsImage('topology.png');
  }

  handle_saveSvg(data: any) {
    const ctx = new C2S(this.canvas.canvas.width + 200, this.canvas.canvas.height + 200);
    for (const item of this.canvas.data.nodes) {
      item.render(ctx);
    }

    for (const item of this.canvas.data.lines) {
      item.render(ctx);
    }

    let mySerializedSVG = ctx.getSerializedSvg();
    mySerializedSVG = mySerializedSVG.replace(
      '<defs/>',
      `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
    );

    mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

    const urlObject: any = window.URL || window;
    const export_blob = new Blob([mySerializedSVG]);
    const url = urlObject.createObjectURL(export_blob);

    const a = document.createElement('a');
    a.setAttribute('download', 'topology.svg');
    a.setAttribute('href', url);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  }

  handle_undo(data: any) {
    this.canvas.undo();
  }

  handle_redo(data: any) {
    this.canvas.redo();
  }

  handle_copy(data: any) {
    this.canvas.copy();
  }

  handle_cut(data: any) {
    this.canvas.cut();
  }

  handle_parse(data: any) {
    this.canvas.parse();
  }

  handle_curve(data: any) {
    this.canvas.data.lineName = 'curve';
    this.props.dispatch({
      type: 'canvas/update',
      payload: {
        data: this.canvas.data
      }
    });
  }

  handle_polyline(data: any) {
    this.canvas.data.lineName = 'polyline';
    this.props.dispatch({
      type: 'canvas/update',
      payload: {
        data: this.canvas.data
      }
    });
  }

  handle_line(data: any) {
    this.canvas.data.lineName = 'line';
    this.props.dispatch({
      type: 'canvas/update',
      payload: {
        data: this.canvas.data
      }
    });
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.tools}>
          {
            this.state.tools.map((item, index) => {
              return (
                <div key={index}>
                  <div className={styles.title}>{item.group}</div>
                  <div className={styles.buttons}>
                    {
                      item.children.map((btn: any, i: number) => {
                        return (
                          <a key={i} title={btn.name} draggable={true} onDragStart={(ev) => { this.onDrag(ev, btn) }}>
                            <i className={'topology ' + btn.icon} style={this.state.iconfont} />
                          </a>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div id="topology-canvas" className={styles.full} />
        <div className={styles.props}>
          <CanvasProps data={this.state.selected} onValuesChange={this.handlePropsChange} />
        </div>
      </div>
    );
  }
}

export default connect((state: any) => ({ event: state.event }))(Index);
