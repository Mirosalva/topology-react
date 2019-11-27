import Toast from 'antd-mobile/lib/toast';
Toast.show = (message) => {
    Toast.info(message,2,null,false)
}
export default Toast;
