import { LogoutOutlined, QuestionCircleFilled } from '@ant-design/icons'
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components'
import { Dropdown } from 'antd'
import { useState } from 'react'
import defaultProps from './_defaultProps'

export default function BaseLayout() {
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1')
  if (typeof document === 'undefined') {
    return <div />
  }
  return (
    <ProLayout
      layout="mix"
      style={{ height: '100vh' }}
      bgLayoutImgList={[
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          left: 85,
          bottom: 100,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          bottom: -68,
          right: -45,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
          bottom: 0,
          left: 0,
          width: '331px',
        },
      ]}
      {...defaultProps}
      location={{
        pathname,
      }}
      token={{
        header: {
          colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
        },
      }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: '七妮妮',
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          )
        },
      }}
      actionsRender={(props) => {
        if (props.isMobile) return []
        if (typeof window === 'undefined') return []
        return [<QuestionCircleFilled key="QuestionCircleFilled" />]
      }}
      headerTitleRender={(logo, title, _) => {
        const defaultDom = (
          <a>
            {logo}
            {title}
          </a>
        )
        if (typeof window === 'undefined') return defaultDom
        if (document.body.clientWidth < 1400) {
          return defaultDom
        }
        if (_.isMobile) return defaultDom
        return <>{defaultDom}</>
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined
        return (
          <div
            style={{
              textAlign: 'center',
              paddingBlockStart: 12,
            }}
          >
            <div>©2025 React Web Client </div>
            <div>by Ant Design</div>
          </div>
        )
      }}
      onMenuHeaderClick={(e) => console.log(e)}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            setPathname(item.path || '/welcome')
          }}
        >
          {dom}
        </div>
      )}
    >
      <PageContainer title={false}>
        <ProCard
          style={{
            height: '200vh',
            minHeight: 800,
          }}
        >
          <div />
        </ProCard>
      </PageContainer>
    </ProLayout>
  )
}
