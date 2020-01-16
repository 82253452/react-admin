import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { useEffectOnce } from 'react-use';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import DownList from './components/DownList';
import styles from './Center.less';
import CurrentUserContainer from '@/hookModels/currentUser';
import BookContainer from '@/hookModels/book';

export default () => {
  const { user: currentUser, loading: currentUserLoading } = CurrentUserContainer.useContainer();
  const {
    init,
    pagination,
    ownPagination,
    editorPagination,
    downPagination,
  } = BookContainer.useContainer();

  let inputRef = useRef(null);

  const [state, setState] = useState({
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'applications',
  });

  const { newTags = [], inputVisible, inputValue, tabKey } = state;

  useEffectOnce(() => {
    init();
  });

  const operationTabList = [
    {
      key: 'articles',
      tab: (
        <span>
          新书 <span style={{ fontSize: 14 }}>({pagination.total})</span>
        </span>
      ),
    },
    {
      key: 'applications',
      tab: (
        <span>
          更新中 <span style={{ fontSize: 14 }}>({editorPagination.total})</span>
        </span>
      ),
    },
    {
      key: 'down',
      tab: (
        <span>
          已下架 <span style={{ fontSize: 14 }}>({downPagination.total})</span>
        </span>
      ),
    },
    {
      key: 'projects',
      tab: (
        <span>
          已完结 <span style={{ fontSize: 14 }}>({ownPagination.total})</span>
        </span>
      ),
    },
  ];

  const onTabChange = key => {
    setState({ ...state, tabKey: key });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  const saveInputRef = input => {
    inputRef = input;
  };

  const handleInputChange = e => {
    setState({ ...state, inputValue: e.target.value });
    // setState({ inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      setState({
        ...state,
        newTags: [...newTags, { key: `new-${newTags.length}`, label: inputValue }],
      });
    }
  };

  const renderChildrenByTabKey = () => {
    if (tabKey === 'projects') {
      return <Projects />;
    }
    if (tabKey === 'applications') {
      return <Applications />;
    }
    if (tabKey === 'down') {
      return <DownList />;
    }
    if (tabKey === 'articles') {
      return <Articles />;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
            {!currentUserLoading && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatarurl} />
                  <div className={styles.name}>{currentUser.nickname}</div>
                  <div>{currentUser.desc}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <i className={styles.title} />
                    {currentUser.contractstatus ? '已签约' : '未签约'}
                  </p>
                  <p>
                    <i className={styles.group} />
                    {currentUser.grade}
                  </p>
                  <p>
                    <i className={styles.address} />z {currentUser.province || '无'}
                    {currentUser.city || '无'}
                  </p>
                </div>
                <Divider dashed />
                <div className={styles.tags}>
                  <div className={styles.tagsTitle}>标签</div>
                  {(currentUser.tags || []).concat(newTags).map(item => (
                    <Tag key={item.key}>{item.label}</Tag>
                  ))}
                  {inputVisible && (
                    <Input
                      ref={ref => saveInputRef(ref)}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputConfirm}
                      onPressEnter={handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                      <Icon type="plus" />
                    </Tag>
                  )}
                </div>
                <Divider style={{ marginTop: 16 }} dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}>
                    {currentUser.notice &&
                      currentUser.notice.map(item => (
                        <Col key={item.id} lg={24} xl={12}>
                          <Link to={item.href}>
                            <Avatar size="small" src={item.logo} />
                            {item.member}
                          </Link>
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
