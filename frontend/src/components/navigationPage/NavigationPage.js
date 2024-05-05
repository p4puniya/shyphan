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
import { useNavigate } from 'react-router-dom';
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


const NavigationPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const [loggedIn, setLoggedIn] = useState(true); // State to manage login status

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login
  const toggleTheme = () => {
    setDarkMode(!darkMode);

  };
  const onClick = ({ key }) => {
    if (key === '9') { // If Logout option is selected
      handleLogout();
    } else {
      // Handle other menu options if needed
    }
  };

  

  const handleLogout = () => {
    setLoggedIn(false); // Update login status to false
  };

  const items = [
    {
      key: 'Group 1',
      type: 'group',
      children: [
        {
          key: '1',
          icon: <HomeOutlined />,
          label: 'Dashboard',
          component: () => <Dashboard />,
        },
        {
          key: '2',
          icon: <AppstoreOutlined />,
          label: 'Property',
          children:[
            {
              key: '2.1',
              icon: <SolutionOutlined />,
              label: 'Private',
            },
            {
              key: '2.2',
              icon: <BookOutlined />,
              label: 'Public',
            },
          ]
        },
      ],
    },
    {
      key: 'Group 2',
      label: !collapsed && 'User Management',
      type: 'group',
      children: [
        {
          key: '3',
          icon: <SolutionOutlined />,
          label: 'Staff Member',
          component: () => <StaffMember />,
        },
        {
          key: '4',
          icon: <BookOutlined />,
          label: 'Staff Manager',
          component: () => <StaffManager />,
        },
      ],
    },
    {
      key: 'Group 3',
      label: !collapsed && 'Lead Management',
      type: 'group',
      children: [
        {
          key: '5',
          icon: <UserOutlined />,
          label: 'Call Manager',
          component: () => <CallManager />,
        },
        {
          key: '6',
          icon: <PhoneOutlined />,
          label: 'Lead Call',
          component: () => <LeadCall />,
        },
        {
          key: '7',
          icon: <FileSearchOutlined />,
          label: 'Lead Follow-Up',
          component: () => <LeadFollowUp />,
        },
      ],
    },
    {
      key: 'Group 4',
      label: !collapsed && 'Settings',
      type: 'group',
      children: [
        {
          key: '8',
          icon: <SettingOutlined />,
          label: 'Settings',
          component: () => <Settings />,
        },
        {
          key: '9',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: handleLogout, // Add onClick handler for Logout
        },
      ],
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
        >
          {items.map((group) => (
            <Menu.ItemGroup key={group.key} title={group.label}>
              {group.children.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => handleMenuItemClick(item.label, item.onClick)}
                >
                  <span>{item.label}</span>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          ))}
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
            background: colorBgContainer,
          }}
        >
          {items.map((group) =>
            group.children.map((item) =>
              item.label === selectedMenuItem ? <item.component key={item.key} /> : null
            )
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default NavigationPage;
