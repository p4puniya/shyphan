import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;

const App = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState([]); // State to store form data
  const [form] = Form.useForm(); // Initialize form instance
  const [columns, setColumns] = useState([]); // State to store table columns

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields(); 
  };

  const handleSubmit = (values) => {
    // Capture form data and store it in formData state
    const formattedValues = {
      ...values,
      dateTime: values.dateTime ? values.dateTime.map(date => date.format('YYYY-MM-DD HH:mm:ss')) : null
    };
    setFormData([...formData, formattedValues]);
    onClose(); // Close the drawer after form submission

    // Generate columns based on the keys of the submitted values
    const newColumns = Object.keys(values).map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of each key
      dataIndex: key,
      key: key
    }));
    setColumns(newColumns);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user\'s name',
                  },
                ]}
              >
                <Input placeholder="Please enter user's name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="PhoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user\'s phone number',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  addonBefore="+91"
                  placeholder="Please enter user's phone number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: 'Select Role',
                  },
                ]}
              >
                <Select placeholder="Select Role">
                  <Option value="admin">Admin</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="teamMember">Team Member</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                initialValue={"enabled"}
              >
                <Select placeholder="Please choose the type" defaultValue= "enabled">
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user\'s password',
                  },
                ]}
              >
                <Input placeholder="Please enter user's password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user\'s email',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please enter user's email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'please enter user\'s address',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter user's address" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      
      <div>
        <h2>Staff Manager</h2>
        <Table dataSource={formData} columns={columns} /> {/* Display data in a table */}
      </div>
    </>
  );
};

export default App;
