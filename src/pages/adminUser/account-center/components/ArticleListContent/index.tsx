import React from 'react';
import moment from 'moment';
import styles from './index.less';

export default ({ data: { detail, ctime } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{detail}</div>
    <div className={styles.extra}>
      {/* <Avatar src={avatar} size="small" /> */}
      {/* <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a> */}
      <em>{moment(ctime).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);
