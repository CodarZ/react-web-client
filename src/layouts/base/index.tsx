import { ProLayout } from '@ant-design/pro-components'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { getDynamicMenuData } from '@/routes/constants'
import { routeToMenu } from '@/utils'
import { useEffect, useState } from 'react'
import {
  HomeOutlined,
  ApartmentOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  SettingOutlined,
  MonitorOutlined,
  CustomerServiceOutlined,
  BankOutlined,
  TableOutlined,
  BookOutlined,
  EditOutlined,
  ScheduleOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  HomeOutlined: <HomeOutlined />,
  tree: <ApartmentOutlined />,
  user: <UserOutlined />,
  peoples: <TeamOutlined />,
  post: <FileTextOutlined />,
  message: <MessageOutlined />,
  system: <SettingOutlined />,
  'tree-table': <TableOutlined />,
  dict: <BookOutlined />,
  edit: <EditOutlined />,
  monitor: <MonitorOutlined />,
  job: <ScheduleOutlined />,
  sentinel: <SettingOutlined />,
  nacos: <SettingOutlined />,
  server: <DatabaseOutlined />,
  log: <FileTextOutlined />,
  form: <FormOutlined />,
  logininfor: <LogoutOutlined />,
  customer: <CustomerServiceOutlined />,
  yinhang: <BankOutlined />,
}

// 菜单项类型
interface MenuItem {
  path: string
  name: string
  icon?: string
  children?: MenuItem[]
}

// 静态菜单数据
const staticMenuData: MenuItem[] = [
  {
    path: '/',
    name: '首页',
    icon: 'HomeOutlined',
  },
]

export default function BaseLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuData, setMenuData] = useState<MenuItem[]>(staticMenuData)

  // 加载动态菜单数据
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const dynamicRoutes = await getDynamicMenuData()
        const dynamicMenus = routeToMenu(dynamicRoutes)

        console.log('动态菜单数据:', dynamicMenus)
        setMenuData([...staticMenuData, ...dynamicMenus])
      } catch (error) {
        console.error('Failed to load menu data:', error)
      }
    }

    loadMenuData()
  }, [])

  if (typeof document === 'undefined') {
    return <div />
  }

  return (
    <div style={{ height: '100vh' }}>
      <ProLayout
        layout="mix"
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          title: '超级管理员',
        }}
        menuDataRender={() => {
          return menuData.map((item) => ({
            ...item,
            icon: item.icon ? iconMap[item.icon] : undefined,
          }))
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              navigate(item.path || '/')
            }}
            style={{ cursor: 'pointer' }}
          >
            {dom}
          </div>
        )}
      >
        <Outlet />
      </ProLayout>
    </div>
  )
}
