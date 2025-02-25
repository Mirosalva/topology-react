import { Menu } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './headers.less';
const { SubMenu } = Menu;

class Headers extends React.Component<{ canvasData: any }> {
  state = {

    lineNames: {
      curve: '曲线',
      polyline: '折线',
      line: '直线'
    }
  };

  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (!key) {
      return;
    }

    if (key.indexOf('/') === 0) {
      router.push(key);
      return;
    }
    switch (key) {
      // case 'about':
      //   this.setState({
      //     about: true,
      //   });
      //   break;

      default:
        if (key && this.props.dispatch) {
          this.props.dispatch({
            type: 'event/emit',
            payload: {
              event: key
            }
          });
        }
        break;
    }
  };

  render(): React.ReactNode {
    const { data } = this.props.canvasData;
    const scale = Math.floor(data.scale *100);
    return (
      <div>
        <Menu
          className={styles.menus}
          selectedKeys={[]}
          mode="horizontal"
          onClick={this.onMenuClick}
        >
          <SubMenu title="文件" className={styles.item}>
            <Menu.Item key="new" className={styles.subTtem}>新建文件</Menu.Item>
            {/*<Menu.Item key="open" className={styles.subTtem}>打开本地文件（暂不可用）</Menu.Item>*/}
            <Menu.Item key="replace" className={styles.subTtem}>导入本地文件</Menu.Item>
            <Menu.Divider>{}</Menu.Divider>
            <Menu.Item key="save" className={styles.subTtem}>保存到本地</Menu.Item>
            <Menu.Item key="savePng" className={styles.subTtem}>下载为PNG</Menu.Item>
            <Menu.Item key="saveSvg" className={styles.subTtem}>下载为SVG</Menu.Item>
          </SubMenu>
          <SubMenu title="编辑" className={styles.item}>
            <Menu.Item key="undo" className={styles.subTtem}>撤消</Menu.Item>
            <Menu.Item key="redo" className={styles.subTtem}>恢复</Menu.Item>
            <Menu.Divider>{}</Menu.Divider>
            <Menu.Item key="copy" className={styles.subTtem}>复制</Menu.Item>
            <Menu.Item key="cut" className={styles.subTtem}>剪切</Menu.Item>
            <Menu.Item key="parse" className={styles.subTtem}>粘贴</Menu.Item>
          </SubMenu>

          <div className={styles.full} />
          <Menu.Item key='fullscreen' className={styles.right}>
            <div>全屏</div>
          </Menu.Item>
          <Menu.Item key='restore' className={styles.right}>
            <div>
              视图：{scale}%
              <a  className={styles.subTtem} hidden={scale == 100}> 还原</a >
            </div>
          </Menu.Item>

          <SubMenu title={`默认连线类型：${this.state.lineNames[data.lineName]}`} className={styles.right}>
            <Menu.Item className={styles.subTtem} key="curve">曲线</Menu.Item>
            <Menu.Item className={styles.subTtem} key="polyline">折线</Menu.Item>
            <Menu.Item className={styles.subTtem} key="line">直线</Menu.Item>
          </SubMenu>
        </Menu>

      </div>
    );
  }
}
export default connect((state: any) => ({ canvasData: state.canvas }))(Headers);
