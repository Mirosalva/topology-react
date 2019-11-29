/**
 * Author : Minerva-S
 * Create Time : 2019/11/28 17:14
 * Description :
 */
import React from 'react';
import { connect } from 'dva';
import styles from './headers.less';
class Bottom extends React.Component<{canvasData : any }>{

    render(): React.ReactNode{
      return (
        <div>这里是底部</div>
      );
    }
}
export default connect((state:any) => ({canvasData:state.canvas}))(Bottom);
