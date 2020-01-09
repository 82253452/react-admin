import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';
import Authorized from '@/utils/Authorized';
import Link from 'umi/link';
import router from 'umi/router';

const CustomLayout = ({ dispatch, children, settings, location }) => {
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  function goPrev() {
    router.go(-1);
  }

  return (
    <Layout>
      <Layout.Content>
        <div
          style={{
            display: `${location.pathname === '/adminUser/account-center' ? 'none' : 'block'}`,
          }}
        >
          <Breadcrumb style={{ margin: '16px 16px 16px 24px' }}>
            <Breadcrumb.Item>
              <a onClick={goPrev}>返回</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>{children}</div>
      </Layout.Content>
    </Layout>
  );
};
export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(CustomLayout);
