import { Avatar, Card, Dropdown, Icon, List, Menu, Popconfirm, Tooltip } from 'antd';
import React from 'react';
import numeral from 'numeral';
import router from 'umi/router';
import stylesApplications from './index.less';
import BookContainer from '@/hookModels/book';

function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

export default () => {
  const { downlist: list, finishBook, upBook } = BookContainer.useContainer();

  const CardInfo = ({ activeUser, newUser }) => (
    <div className={stylesApplications.cardInfo}>
      <div>
        <p>订阅</p>
        <p>{activeUser || 0}</p>
      </div>
      <div>
        <p>浏览</p>
        <p>{newUser || 0}</p>
      </div>
    </div>
  );

  function onFinishBook(d) {
    finishBook(d)
  }

  return (
    <List
      rowKey="id"
      className={stylesApplications.filterCardList}
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={item => (
        <List.Item key={item.id}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip key="download" title="下载">
                <Icon type="download" />
              </Tooltip>,
              <Tooltip
                title="编辑"
                key="edit"
                onClick={() => router.push(`/adminUser/book/${item.id}`)}
              >
                <Icon type="edit" />
              </Tooltip>,
              <Tooltip title="分享" key="share">
                <Icon type="share-alt" />
              </Tooltip>,
              <Dropdown overlay={(<Menu>
                <Menu.Item>
                  <Popconfirm
                    title="确认完结?"
                    onConfirm={() => upBook(item)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      上架
                    </a>
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="#">
                    签约
                  </a>
                </Menu.Item>
              </Menu>)} key="ellipsis">
                <Icon type="ellipsis" />
              </Dropdown>,
            ]}
          >
            <Card.Meta avatar={<Avatar size="small" src={item.image} />} title={item.name} />
            <div className={stylesApplications.cardItemContent}>
              <CardInfo
                activeUser={formatWan(item.subscribeNum)}
                newUser={numeral(item.likeNum).format('0,0')}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
