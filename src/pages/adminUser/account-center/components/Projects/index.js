import { Card, List } from 'antd';
import React from 'react';
import moment from 'moment';
import router from 'umi/router';
import AvatarList from '../AvatarList';
import styles from './index.less';
import BookContainer from '@/hookModels/book';
import CurrentUserContainer from '@/hookModels/currentUser';

export default () => {
  const { ownlist } = BookContainer.useContainer()
  const { user: currentUser } = CurrentUserContainer.useContainer()

  function toDetail(id) {
    router.push(`/adminUser/book/${id}`);
  }
  return (
    <List
      className={styles.coverCardList}
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={ownlist}
      renderItem={item => (
        <List.Item onClick={() => toDetail(item.id)}>
          <Card className={styles.card} hoverable cover={<img alt={item.name} src={item.image}/>}>
            <Card.Meta title={<a>{item.name}</a>} description={item.detail}/>
            <div className={styles.cardItemContent}>
              <span>{moment(item.mtime).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  <AvatarList.Item src={currentUser.avatarurl}/>
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
