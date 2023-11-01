import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const USER_ITEMS: MenuProps['items'] = [
  {
    label: "User Center",
    key: '0',
  },
  {
    label: "Logout",
    key: '1',
  },
];

const HeaderHover: React.FC = () => (
  <Dropdown menu={{ items: USER_ITEMS }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default HeaderHover;