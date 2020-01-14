import React, { useEffect } from 'react';
import { Breadcrumb, Layout } from 'antd';
import router from 'umi/router';
import CurrentUserContainer from '../hookModels/currentUser';
import SettingContainer from '../hookModels/setting';

export default ({ children, location }) => {
  const { user, query: currentUser } = CurrentUserContainer.useContainer();
  const { getSetting } = SettingContainer.useContainer();
  useEffect(() => {
    currentUser();
    getSetting();
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
