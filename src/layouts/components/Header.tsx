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
        background: `color-mix(in srgb, ${token.colorBgContainer}, transparent 40%)`,
        backdropFilter: 'blur(8px) saturate(180%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(1.1)',
        borderBottom: `1px solid ${token.colorSplit}`,
        position: 'sticky',
        top: 0,
        zIndex: token.zIndexPopupBase - 10,
        transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
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
