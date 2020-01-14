import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { useEffectOnce } from 'react-use';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import styles from './Center.less';
import CurrentUserContainer from '@/hookModels/currentUser';
import BookContainer from '@/hookModels/book';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        关注 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        已完结 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        我的 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

export default () => {
  const { user: currentUser, loading: currentUserLoading } = CurrentUserContainer.useContainer();

  const [state, setState] = useState({
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'projects',
  });

  let inputRef = useRef(null);
  let { newTags = [], inputVisible, inputValue, tabKey } = state;
  const { fetchOwnList } = BookContainer.useContainer();
  useEffectOnce(() => {
    fetchOwnList();
  });

  // const { currentUser = {}, currentUserLoading } = props;
  // const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
  // const state: AccountCenterState = ;

  // public input: Input | null | undefined = undefined;
  // useEffect(() => {
  //   // fetch()
  //   console.log(222)
  // }, [])

  // const componentDidMount() {
  //   const { dispatch } = props;
  //   console.log(props)
  //   dispatch({
  //     type: 'book/fetch',
  //   });
  // }

  const onTabChange = key => {
    // If you need to sync state to url
    // const { match } = props;
    // router.push(`${match.url}/${key}`);
    setState({ ...state, tabKey: key });
    // setState({ tabKey: key as AccountCenterState['tabKey'] });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
    // setState({ inputVisible: true }, () => this.input && this.input.focus());
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
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    // setState({
    //   ...state,
    //   newTags,
    //   inputVisible: false,
    //   inputValue: '',
    // });
  };

  const renderChildrenByTabKey = () => {
    if (tabKey === 'projects') {
      return <Projects />;
    }
    if (tabKey === 'applications') {
      return <Applications />;
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
                    <i className={styles.address} />
                    {/* {(currentUser.geographic || { province: { label: '无' } }).province.label} */}
                    {/* { */}
                    {/*  ( */}
                    {/*    currentUser.geographic || { */}
                    {/*      city: { */}
                    {/*        label: '无', */}
                    {/*      }, */}
                    {/*    } */}
                    {/*  ).city.label */}
                    {/* } */}
                    {currentUser.province || '无'}
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
