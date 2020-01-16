import React from 'react';
import moment from 'moment';
import styles from './index.less';

export default ({ data: { detail, ctime } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{detail}</div>
    <div className={styles.extra}>
      {moment(ctime).format('YYYY-MM-DD HH:mm')}
    </div>
  </div>
);
