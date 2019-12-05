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
          <div className={styles.title}>服务器基本信息：</div>
          <div className={styles.items}>
            <div className="flex grid">
              <div>服务器名称</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.server_name', { initialValue: this.state.node.server_info.server_name })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="flex grid">
              <div>IP1</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {/*{getFieldDecorator('node.rect.x', { initialValue: this.state.node.rect.x })(<InputNumber />)}*/}
                  {getFieldDecorator('node.server_info.server_ip1', { initialValue: this.state.node.server_info.server_ip1 })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="flex grid">
              <div>IP2</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.server_ip2', { initialValue: this.state.node.server_info.server_ip2  })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="flex grid">
              <div>IP3</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.server_ip3', { initialValue: this.state.node.server_info.server_ip3  })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="flex grid">
              <div>服务器状态</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.server_state', { initialValue: this.state.node.server_info.server_state  })(<Input />)}
                </Form.Item>
              </div>
            </div>

            <div className="flex grid">
              <div>CPU配置</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.cpu_info', { initialValue: this.state.node.server_info.cpu_info  })(<Input />)}
                </Form.Item>
              </div>
            </div>

            <div className="flex grid">
              <div>内存配置</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.memory_info', { initialValue: this.state.node.server_info.memory_info  })(<Input />)}
                </Form.Item>
              </div>
            </div>

            <div className="flex grid">
              <div>系统及版本</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.system_version', { initialValue: this.state.node.server_info.system_version  })(<Input />)}
                </Form.Item>
              </div>
            </div>

            <div className="flex grid">
              <div>硬盘配置</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server_info.harddisk_info', { initialValue: this.state.node.server_info.harddisk_info})(<Input />)}
                </Form.Item>
              </div>
            </div>

            <div className={styles.title}>部署服务信息：</div>
            <div className="flex grid">
              <div>服务名称</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.service_info.service_name', { initialValue: '智能物流' })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="flex grid">
              <div>服务类型</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.service_info.service_type', { initialValue: '第三方组件' })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="flex grid">
              <div>组件名</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server.service_info.service_component', { initialValue: 'tomcat' })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="flex grid">
              <div>开放端口</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server.service_info.service_port', { initialValue: '' })(<Input />)}
                </Form.Item>
              </div>
            </div>


            <div className="flex grid">
              <div>协议类型</div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server.service_info.service_protocol', { initialValue: '测试环境' })(<Input />)}
                </Form.Item>
            </div>

            <div className="flex grid">
              <div>服务类型</div>
              <div>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('node.server.service_info.service_style', { initialValue: '192.168.1.1' })(<Input />)}
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      );
    } else if (this.state.line) {
      return (
        <Form>
            <div className={styles.title}>连线设置 ：</div>
          <div className={styles.items}>

            <div className="flex grid">
              <div>起点箭头</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('line.fromArrow', { initialValue: this.state.line.fromArrow })(<Input />)}
              </Form.Item>
            </div>

            <div className="flex grid">
              <div>终点箭头</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('line.toArrow', { initialValue: this.state.line.toArrow })(<Input />)}
              </Form.Item>
            </div>

            <div className="flex grid">
              <div>开始服务器ID</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('line.line_info.begin_server_id', { initialValue: this.state.line.line_info.begin_server_id })(<Input />)}
              </Form.Item>
            </div>
            <div className="flex grid">
              <div>结束服务器ID</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('line.line_info.end_server_id', { initialValue: this.state.line.line_info.end_server_id })(<Input />)}
              </Form.Item>
            </div>

            <div className="flex grid">
              <div>访问类型</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('line.line_info.connect_type', { initialValue: this.state.line.line_info.connect_type })(<Input />)}
              </Form.Item>
            </div>
            <div className="flex grid">
              <div>端口</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('line.line_info.connect_port', { initialValue: this.state.line.line_info.connect_port })(<Input />)}
              </Form.Item>
            </div>
            <div className="flex grid">
              <div>连接带宽</div>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('line.line_info.bandwidth', { initialValue:this.state.line.line_info.bandwidth })(<Input />)}
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
            <li>Ctrl + Z 撤销</li>
            <li>Ctrl + Shift + Z 反撤销</li>
            <li>Ctrl + X 剪切</li>
            <li>Ctrl + C 复制</li>
            <li>Ctrl + V 粘贴</li>
            <li>Ctrl + O 打开</li>

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
