import { Card, List } from 'antd';
import React from 'react';

import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import AvatarList from '../AvatarList';
import { ListItemDataType } from '../../data.d';
import { ModalState } from '../../model';
import styles from './index.less';

const Projects: React.FC<Partial<ModalState>> = props => {
  const { list, currentUser } = props;
  const toDetail = id => {
    router.push(`/adminUser/book/${id}`);
  };
  return (
    <List<ListItemDataType>
      className={styles.coverCardList}
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={item => (
        <List.Item onClick={() => toDetail(item.id)}>
          <Card className={styles.card} hoverable cover={<img alt={item.name} src={item.image} />}>
            <Card.Meta title={<a>{item.name}</a>} description={item.detail} />
            <div className={styles.cardItemContent}>
              <span>{moment(item.mtime).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  <AvatarList.Item src={currentUser.avatarurl} />
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default connect(({ book, user }) => ({
  list: book.list,
  currentUser: user.currentUser,
}))(Projects);
