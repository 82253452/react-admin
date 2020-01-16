import { Icon, List, Popconfirm, Tag } from 'antd';
import React from 'react';
import router from 'umi/router';
import ArticleListContent from '../ArticleListContent';
import styles from './index.less';
import BookContainer from '@/hookModels/book';

export default () => {
  const { list, pushBook } = BookContainer.useContainer();
  const IconText = ({ type, text, onClick }) => (
    <span onClick={() => onClick && onClick()}>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  function toDetail(id) {
    router.push(`/adminUser/book/${id}`);
  }

  function bookPush(data) {
    pushBook(data)
  }

  return (
    <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <Popconfirm
              title="确认发布?"
              onConfirm={() => bookPush(item)}
              okText="确定"
              cancelText="取消"
            >
              <IconText key="status" type="copy" text="发布"/>
            </Popconfirm>,
            <IconText key="edit" type="edit" text="编辑" onClick={() => toDetail(item.id)}/>,
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
