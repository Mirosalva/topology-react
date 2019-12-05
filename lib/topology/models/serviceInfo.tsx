/**
 * Author : Minerva-S
 * Create Time : 2019/12/02 15:29
 * Description :
 */
export class ServiceInfo {
  service_id: string;
  service_name:string;
  service_type:string; // 1 2 3
  service_component:string; // 本服务使用组件
  service_port:string;
  service_protocol:string;
  service_style:string ; // 1 公网  2 局域网 3 VPN

  constructor(json?:any) {
    if (json) {
      this.service_id = json.service_id;
      this.service_name = json.service_name;
      this.service_type = json.service_type;
      this.service_component = json.service_component;
      this.service_port = json.service_port;
      this.service_protocol = json.service_protocol;
      this.service_style = json.service_style;

    }
  }
}
