import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'dva';
import { ModalState } from './model';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import { CurrentUser, TagType } from './data.d';
import styles from './Center.less';

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

interface AccountCenterProps extends RouteChildrenProps {
  dispatch: Dispatch<any>;
  currentUser: Partial<CurrentUser>;
  currentUserLoading: boolean;
}

interface AccountCenterState {
  newTags: TagType[];
  tabKey?: 'articles' | 'applications' | 'projects';
  inputVisible?: boolean;
  inputValue?: string;
}

class AccountCenter extends Component<AccountCenterProps, AccountCenterState> {
  // static getDerivedStateFromProps(
  //   props: accountCenterProps,
  //   state: accountCenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;

  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }

  //   return null;
  // }

  state: AccountCenterState = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'projects',
  };

  public input: Input | null | undefined = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'book/fetch',
    });
  }

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as AccountCenterState['tabKey'],
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input && this.input.focus());
  };

  saveInputRef = (input: Input | null) => {
    this.input = input;
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  renderChildrenByTabKey = (tabKey: AccountCenterState['tabKey']) => {
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

  render() {
    const { newTags = [], inputVisible, inputValue, tabKey } = this.state;
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
              {!dataLoading && (
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
                        ref={ref => this.saveInputRef(ref)}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
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
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(
  ({
    loading,
    accountCenter,
    user,
  }: {
    loading: { effects: { [key: string]: boolean } };
    accountCenter: ModalState;
  }) => ({
    currentUser: user.currentUser,
    // currentUserLoading: loading.effects['accountCenter/fetchCurrent'],
    currentUserLoading: false,
  }),
)(AccountCenter);
