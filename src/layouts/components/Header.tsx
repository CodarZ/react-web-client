import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, theme } from 'antd';

const { Header: AntHeader } = Layout;

/** 头部导航栏组件 */
export function Header(props: { collapsed: boolean; onToggleCollapse: () => void }) {
  const { collapsed, onToggleCollapse } = props;

  const { token } = theme.useToken();

  return (
    <AntHeader
      style={{
        padding: 0,
        zIndex: 1000,
      }}
    >
      <Flex align="center" justify="space-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          style={{
            height: token.Layout?.headerHeight || 64,
            width: token.Layout?.headerHeight || 64,
            fontSize: token.fontSizeLG,
          }}
        />

        <Flex></Flex>
      </Flex>
    </AntHeader>
  );
}
