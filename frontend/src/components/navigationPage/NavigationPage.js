import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  BookOutlined,
  SolutionOutlined,
  SettingOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
  FileSearchOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Switch } from 'antd';
import { Navigate } from 'react-router-dom'; // Import Redirect from react-router-dom
//Importing Pages
import Dashboard from '../dashboard/Dashboard';
import StaffManager from '../userManagement/StaffManager';
import Properties from '../propertiesPage/Properties';
import LeadCall from '../leadManagement/LeadCall';
import LeadFollowUp from '../leadManagement/LeadFollowUp';
import CallManager from '../leadManagement/CallManager';
import Settings from '../settings/Settings';
import StaffMember from '../userManagement/StaffMember';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const NavigationPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMenuItemKey, setSelectedMenuItem] = useState('1'); 
  const [loggedIn, setLoggedIn] = useState(true);

  const {
    token: { colorBgContainer},
  } = theme.useToken();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  }
  
  const onClick = ({ key }) => {
    if (key === '9') { // If Logout option is selected
      handleLogout();
    } else {
      // Handle other menu options if needed
    }
  };

  

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setLoggedIn(false); // Update login status to false
  };


  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      component: <Dashboard />,
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: 'Properties',
      children: [
        {
          key: '2.1',
          label: 'Dashboard',
          component: <Dashboard />,
        },
        {
          key: '2.2',
          label: 'Category',
          component: <Properties />,

        },
      ],
    },
    
    {
      key: '3',
      icon: <SolutionOutlined />,
      label: 'Staff Member',
      component: <StaffMember />,
    },
    {
      key: '4',
      icon: <BookOutlined />,
      label: 'Staff Manager',
      component: <StaffManager />,
    },
    {
      key: '5',
      icon: <UserOutlined />,
      label: 'Call Manager',
      component: <CallManager />,
    },
    {
      key: '6',
      icon: <PhoneOutlined />,
      label: 'Lead Call',
      component: <LeadCall />,
    },
    {
      key: '7',
      icon: <FileSearchOutlined />,
      label: 'Lead Follow-Up',
      component: <LeadFollowUp />,
    },
    {
      key: '8.1',
      icon: <SettingOutlined />,
      label: 'Settings',
      component: <Settings />,
    },
    {
      key: '8.2',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const layoutStyle = {
    borderRadius: 8,
    height: '100vh',
    width: '100%',
    background: darkMode ? '#111111' : '#f0f2f5',
  };

  const siderStyle = {
    textAlign: 'center',
    lineHeight: '50px',
    color: darkMode ? 'white' : '#121212',
    background: darkMode ? '#001529' : 'white',
    fontWeight: 'bold', 
    SizeContext: 'large',
  };

  const handleMenuItemClick = (label, onClick) => {
    setSelectedMenuItem(label); // Set the selected menu item label
    if (onClick) onClick(); // Call the onClick handler if provided
  };

  if (!loggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={siderStyle}>
        <div className="dashboard" />
        {!collapsed && <div>SHYPHAN LOGO</div>}
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          defaultSelectedKeys={['1']}
          inlineCollapsed={collapsed}
          defaultOpenKeys={['sub1']}
          mode="inline"
          onSelect={({ key }) => handleMenuItemClick(key)}
        >
          {menuItems.map((menuItem) =>
            menuItem.children ? (
              <SubMenu 
                key={menuItem.key} 
                icon={menuItem.icon} 
                title={menuItem.label}>
                {menuItem.children.map((childItem) => (
                  <Menu.Item
                    key={childItem.key}
                    onClick={() => handleMenuItemClick(childItem.key, childItem.onClick)}
                  >
                    <span>{childItem.label}</span>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={menuItem.key}
                icon={menuItem.icon}
                onClick={() => handleMenuItemClick(menuItem.key, menuItem.onClick)}
              >
                <span>{menuItem.label}</span>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            margin: '0px 0px 1px 1px',
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 50,
              height: 50,
              margin: '3px',
            }}
          />
          <Switch  checked={darkMode} onChange={toggleTheme} style={{ marginLeft: '1rem' }} />
        </Header>
        <Content
          style={{
            margin: '0px 0px 0px 1px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {menuItems.map((menuItem) =>
            menuItem.key === selectedMenuItemKey ? menuItem.component : null
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default NavigationPage;
