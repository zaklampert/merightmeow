import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Layout, Menu, Icon } from 'antd';
import './App.less';
import Me from '../components/Me'
import ChangeStatus from '../components/ChangeStatus';
import Groups from '../containers/GroupsListContainer';
import CreateGroup from '../components/groups/CreateGroup';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.userId) {
      this.context.router.push('/signin');
    }
  }
  render() {
    const {user, groups, children, location, userId, searchResults, searching} = this.props;
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });
    return (
      <Layout style={{height: "100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Me me={user} userId={userId} />
          <ChangeStatus searchResults={searchResults} searching={searching}/>
          <Groups />

         
          <CreateGroup />
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          
          {clonedChildren}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          mrn
        </Footer>
      </Layout>
    </Layout>
    )
  }
}


App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
