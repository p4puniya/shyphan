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
import './Navigation.css';

const { Header, Sider, Content } = Layout;


const NavigationPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // State for dark mode
  const navigate = useNavigate();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const onClick = (e) => {
  //   console.log('click ', e);
  // };
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };
  const onClick = ({ key }) => {
    if (key === '9') { // If Logout option is selected
      handleLogout();
    } else {
      // Handle other menu options if needed
    }
  };

  

  const toggleTheme = () => {
    setDarkMode(!darkMode); // Toggle the theme
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
        },
        {
          key: '2',
          icon: <AppstoreOutlined />,
          label: 'Category',
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
        },
        {
          key: '4',
          icon: <BookOutlined />,
          label: 'Staff Manager',
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
        },
        {
          key: '6',
          icon: <PhoneOutlined />,
          label: 'Lead Call',
        },
        {
          key: '7',
          icon: <FileSearchOutlined />,
          label: 'Lead Follow-Up',
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
        },
        {
          key: '9',
          icon: <LogoutOutlined />,
          label: 'Logout',
        },
      ],
    },
  ];

  const layoutStyle = {
    borderRadius: 8,
    height: '100vh',
    width: '100%',
    background: darkMode ? '#111111' : '#f0f2f5', // Dynamic background color based on darkMode state
  };

  const siderStyle = {
    textAlign: 'center',
    lineHeight: '50px',
    color: darkMode ? 'white' : '#121212',
    background: darkMode ? '#001529' : 'white', // Dynamic text color based on darkMode state
    fontWeight: 'bold', 
    SizeContext: 'large',
  };

  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={siderStyle}>
        <div class="dashboard" />
        {!collapsed && <div>SHYPHAN LOGO</div>}
        <Menu
          theme={darkMode ? 'dark' : 'light'} // Toggle theme based on darkMode state
          // style={{color: darkMode ? 'white' : '#121212'}}
          onClick={onClick}
          defaultSelectedKeys={['1']}
          inlineCollapsed={collapsed}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            margin: '0px 0px 1px 1px',
            padding: 0,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Switch  checked={darkMode} onChange={toggleTheme} style={{ marginLeft: '1rem' }} /> {/* Add Switch component */}
        </Header>
        <Content
          style={{
            margin: '0px 0px 0px 1px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default NavigationPage;
