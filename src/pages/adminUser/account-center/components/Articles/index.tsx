import { Icon, List, Tag } from 'antd';
import React from 'react';
import ArticleListContent from '../ArticleListContent';
import { ListItemDataType } from '../../data.d';
import styles from './index.less';
import BookContainer from '@/hookModels/book';
import CurrentUserContainer from '@/hookModels/currentUser';

export default () => {
  const { list } = BookContainer.useContainer();
  const { user } = CurrentUserContainer.useContainer();
  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText key="star" type="star-o" text={item.star} />,
            <IconText key="like" type="like-o" text={item.like} />,
            <IconText key="message" type="message" text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.name}
              </a>
            }
            description={
              <span>
                {item.bookTags.map(t => (
                  <Tag>{t.name}</Tag>
                ))}
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};
