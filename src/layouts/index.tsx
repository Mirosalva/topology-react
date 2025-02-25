import React from 'react';
import styles from './index.less';
import Headers from './headers';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.page}>
      <Headers />
      <div className={styles.body}>{props.children}</div>
      <div className={styles.page}> 底部测试页面</div>
    </div>
  );
};

export default BasicLayout;
