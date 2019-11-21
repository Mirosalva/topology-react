import React, { Component } from 'react';
import { Form, InputNumber,Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { Node } from 'topology-core/models/node';
import { Line } from 'topology-core/models/line';

import styles from './index.less';

export interface CanvasPropsProps {
  form: FormComponentProps['form'];
  data: {
    node?: Node,
    line?: Line,
    multi?: boolean
  };
  onValuesChange: (props: any, changedValues: any, allValues: any) => void;
}

class CanvasProps extends Component<CanvasPropsProps> {
  state = {
    node: this.props.data.node,
    line: this.props.data.line,
    multi: this.props.data.multi,
  };

  // 当前state中node与父组件传参不同步时，重新渲染
  componentDidUpdate() {
    if (this.state.node !== this.props.data.node || this.state.line !== this.props.data.line || this.state.multi !== this.props.data.multi) {
      this.setState({
        node: this.props.data.node,
        line: this.props.data.line,
        multi: this.props.data.multi,
      });
    }
  }




  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.node) {
      return (
        <Form>
          <div className={styles.title}>节点信息：</div>
          <div className={styles.items}>
            <div className="flex grid">
              <div>X（px）</div>
              <div>Y（px）</div>
            </div>
            <div className="flex grid mt5">
              <div className="mr5">
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.x', { initialValue: this.state.node.rect.x })(<InputNumber />)}
                </Form.Item>
              </div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.y', { initialValue: this.state.node.rect.y })(<InputNumber />)}
                </Form.Item>
              </div>
            </div>


            <div className="flex grid">
              <div>宽（px）</div>
              <div>高（px）</div>
            </div>
            <div className="flex grid mt5">
              <div className="mr5">
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.width', { initialValue: this.state.node.rect.width })(<InputNumber />)}
                </Form.Item>
              </div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.height', { initialValue: this.state.node.rect.height })(<InputNumber />)}
                </Form.Item>
              </div>
            </div>

            <div className={styles.title}>业务配置 ：</div>

            <div className="flex grid">
              <div>项目名称</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.systemIP', { initialValue: '业务风控' })(<Input />)}
                </Form.Item>
              </div>
            </div>


            <div className="flex grid">
              <div>系统名</div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.systemName', { initialValue: '测试系统' })(<Input />)}
                </Form.Item>
            </div>

            <div className="flex grid">
              <div>IP配置</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.systemIP', { initialValue: '192.168.1.1' })(<Input />)}
                </Form.Item>
              </div>
            </div>


            <div className="flex grid">
              <div>部署服务</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.serviceName', { initialValue: 'nginx' })(<Input />)}
                </Form.Item>
              </div>
            </div>

            <div className="flex grid">
              <div>XXXX</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.systemIP', { initialValue: '' })(<Input />)}
                </Form.Item>
              </div>
            </div>

            <div className="flex grid">
              <div>XXXX</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.rect.systemIP', { initialValue: '' })(<Input />)}
                </Form.Item>
              </div>
            </div>

          </div>
        </Form>
      );
    } else if (this.state.line) {
      return (
        <Form>
            <div className={styles.title}>连接状态 ：</div>
          <div className={styles.items}>

            <div className="flex grid">
              <div>单向通路</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('node.nodeLine.status', { initialValue: '正常' })(<Input />)}
              </Form.Item>
            </div>

            <div className="flex grid">
              <div>XXX</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('node.nodeLine.status', { initialValue: '' })(<Input />)}
              </Form.Item>
            </div>

            <div className="flex grid">
              <div>XXX</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('node.nodeLine.status', { initialValue: '' })(<Input />)}
              </Form.Item>
            </div>
          </div>


        </Form>
      );
    } else if (this.state.multi) {
      return (
        <div className={styles.title}>multi</div>
      );
    }

    return (
      <div>
        <div className={styles.title}>欢迎使用图形绘制工具</div>
        {/*<div className={styles.group}>*/}
        {/*  <span className={styles.star}>欢迎提出优化改进建议*/}
        {/*  </span>*/}
        {/*  <a href="">使用教程</a><br />*/}
        {/*  <a href="" target="_blank">联系我们</a*/}
        {/*  ><br />*/}
        {/*</div>*/}
        <div className={styles.title}>[Todo]计划实现功能</div>
        <ul className={styles.group}>
          <li>对画布元素的操作：全选、复制、剪切、粘贴快捷键配置</li>
          <li>画布图形预览</li>
          <li>画布数据从json 转为 xml 文件</li>
          <li>元素集合按模块分组</li>
          <li>绘制工具简易使用教程</li>
          <li>增加锁定按钮：改变画布可编辑状态</li>
        </ul>
        <div className={styles.bottom} >
          <div className={styles.title}>
            小提示
          </div>
          <ul className={styles.group}>
            <li>方向键：控制节点移动5个像素</li>
            <li>Ctrl + 方向键：控制节点移动1个像素</li>
            <li>Ctrl + 鼠标移动：移动整个画布</li>
            <li>Ctrl + 鼠标滚轮：缩放</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Form.create<CanvasPropsProps>({
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    if (onValuesChange) {
      onValuesChange(restProps, changedValues, allValues);
    }
  }
})(CanvasProps);
