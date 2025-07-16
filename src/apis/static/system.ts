type RouteType = {
  /** 组件名称 */
  name: string
  /** 地址栏路径 */
  path: string
  /** 是否隐藏 */
  hidden: boolean
  /** 重定向路径 */
  redirect: string
  /** 组件所在路径 */
  component: string
  /** 一直显示 */
  alwaysShow: boolean
  meta: {
    /** 菜单标题 */
    title: string
    /** 菜单图标 */
    icon: string
    /** 是否缓存 */
    noCache: boolean
    /** 外部链接 */
    link: null
  }
  children?: RouteType[]
}

export async function getSystemRoutes() {
  return [
    {
      name: 'Company',
      path: '/company',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '公司管理',
        icon: 'tree',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'User',
          path: 'user',
          hidden: false,
          component: 'system/user/index',
          meta: {
            title: '账号管理',
            icon: 'user',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Role',
          path: 'role',
          hidden: false,
          component: 'system/role/index',
          meta: {
            title: '角色管理',
            icon: 'peoples',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Dept',
          path: 'dept',
          hidden: false,
          component: 'system/dept/index',
          meta: {
            title: '组织架构管理',
            icon: 'tree',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Post',
          path: 'post',
          hidden: false,
          component: 'system/post/index',
          meta: {
            title: '岗位管理',
            icon: 'post',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Notice',
          path: 'notice',
          hidden: false,
          component: 'system/notice/index',
          meta: {
            title: '通知公告',
            icon: 'message',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'System',
      path: '/system',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '系统管理',
        icon: 'system',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Menu',
          path: 'menu',
          hidden: false,
          component: 'system/menu/index',
          meta: {
            title: '菜单管理',
            icon: 'tree-table',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Dict',
          path: 'dict',
          hidden: false,
          component: 'system/dict/index',
          meta: {
            title: '字典管理',
            icon: 'dict',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Config',
          path: 'config',
          hidden: false,
          component: 'system/config/index',
          meta: {
            title: '参数设置',
            icon: 'edit',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Monitor',
      path: '/monitor',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '系统监控',
        icon: 'monitor',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Job',
          path: 'job',
          hidden: false,
          component: 'monitor/job/index',
          meta: {
            title: '定时任务',
            icon: 'job',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Http://www.hzylife.com:8858',
          path: 'http://www.hzylife.com:8858',
          hidden: false,
          component: 'Layout',
          meta: {
            title: 'Sentinel控制台',
            icon: 'sentinel',
            noCache: false,
            link: 'http://www.hzylife.com:8858',
          },
        },
        {
          name: 'Http://www.hzylife.com:8848/nacos',
          path: 'http://www.hzylife.com:8848/nacos',
          hidden: false,
          component: 'Layout',
          meta: {
            title: 'Nacos控制台',
            icon: 'nacos',
            noCache: false,
            link: 'http://www.hzylife.com:8848/nacos',
          },
        },
        {
          name: 'Http://www.hzylife.com:9100/login',
          path: 'http://www.hzylife.com:9100/login',
          hidden: false,
          component: 'Layout',
          meta: {
            title: 'Admin控制台',
            icon: 'server',
            noCache: false,
            link: 'http://www.hzylife.com:9100/login',
          },
        },
        {
          name: 'Log',
          path: 'log',
          hidden: false,
          redirect: 'noRedirect',
          component: 'ParentView',
          alwaysShow: true,
          meta: {
            title: '日志管理',
            icon: 'log',
            noCache: false,
            link: null,
          },
          children: [
            {
              name: 'Operlog',
              path: 'operlog',
              hidden: false,
              component: 'system/operlog/index',
              meta: {
                title: '操作日志',
                icon: 'form',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Logininfor',
              path: 'logininfor',
              hidden: false,
              component: 'system/logininfor/index',
              meta: {
                title: '登录日志',
                icon: 'logininfor',
                noCache: false,
                link: null,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Bank',
      path: '/bank',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '业务合作',
        icon: 'customer',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Banklist',
          path: 'banklist',
          hidden: false,
          component: 'bank/banklist/index',
          meta: {
            title: '银行管理',
            icon: 'yinhang',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Customer',
          path: 'customer',
          hidden: false,
          component: 'bank/banklist/customer',
          meta: {
            title: '客户管理',
            icon: 'customer',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Reconciliation',
      path: '/reconciliation',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '收款核对',
        icon: 'dui',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Settlementlist',
          path: 'settlementlist',
          hidden: false,
          component: 'reconciliation/settlementlist/index',
          meta: {
            title: '银联结算收款',
            icon: 'dui',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Receivable',
          path: 'receivable',
          hidden: false,
          component: 'reconciliation/receivable/index',
          meta: {
            title: '翼支付回款',
            icon: 'dui',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Repayment',
      path: '/repayment',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '还款管理',
        icon: 'plan',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Phases',
          path: 'phases',
          hidden: false,
          component: 'plan/planlist/phases',
          meta: {
            title: '分期管理',
            icon: 'fenqi',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Planlist',
          path: 'planlist',
          hidden: false,
          component: 'plan/planlist/index',
          meta: {
            title: '还款计划',
            icon: 'plan',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Refund',
          path: 'refund',
          hidden: false,
          component: 'plan/planlist/refund',
          meta: {
            title: '还款异常',
            icon: 'yc',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Channel',
      path: '/channel',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '渠道管理',
        icon: 'channel',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Canal',
          path: 'canal',
          hidden: false,
          component: 'channel/canal/index',
          meta: {
            title: '渠道信息',
            icon: 'channel',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Betal',
      path: '/betal',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '付款管理',
        icon: 'pay',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Pay',
          path: 'pay',
          hidden: false,
          component: 'betal/pay/index',
          meta: {
            title: '货款代付',
            icon: 'behalf',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Order',
      path: '/order',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '订单管理',
        icon: 'order',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Manage',
          path: 'manage',
          hidden: false,
          component: 'order/manage/index',
          meta: {
            title: '订单管理',
            icon: 'order',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Failedorder',
          path: 'failedorder',
          hidden: false,
          component: 'order/manage/failedorder',
          meta: {
            title: '退款失败订单',
            icon: 'fail',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Report',
      path: '/report',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '报表管理',
        icon: 'report',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Settlement',
          path: 'settlement',
          hidden: false,
          component: 'report/settlement/index',
          meta: {
            title: '结算对账报表',
            icon: 'settlement',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Loans',
          path: 'loans',
          hidden: false,
          component: 'report/loans/index',
          meta: {
            title: '货款对账报表',
            icon: 'reconciliation',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Returnedmoney',
          path: 'returnedmoney',
          hidden: false,
          component: 'report/returnedmoney/index',
          meta: {
            title: '回款对账报表',
            icon: 'paymentcoll',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Daily',
          path: 'daily',
          hidden: false,
          component: 'report/daily/index',
          meta: {
            title: '日报表',
            icon: 'day',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Monthlyreport',
          path: 'monthlyreport',
          hidden: false,
          component: 'report/monthlyreport/index',
          meta: {
            title: '月报表',
            icon: 'month',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Bankcharges',
          path: 'bankcharges',
          hidden: false,
          component: 'report/bankcharges/index',
          meta: {
            title: '银行手续费明细报表',
            icon: 'shou',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Business',
          path: 'business',
          hidden: false,
          component: 'report/business/index',
          meta: {
            title: '业务开展明细报表',
            icon: 'business',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Advance',
          path: 'advance',
          hidden: false,
          component: 'report/advance/index',
          meta: {
            title: '资金垫付明细报表',
            icon: 'capital',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Businessstatement',
          path: 'businessstatement',
          hidden: false,
          component: 'report/businessstatement/index',
          meta: {
            title: '业务报表',
            icon: 'yewu',
            noCache: false,
            link: null,
          },
        },
      ],
    },
    {
      name: 'Statistics',
      path: '/statistics',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '统计图表',
        icon: 'charts',
        noCache: false,
        link: null,
      },
      children: [
        {
          name: 'Chart',
          path: 'chart',
          hidden: false,
          component: 'statistics/index',
          meta: {
            title: '销售数据统计图表',
            icon: 'charts',
            noCache: false,
            link: null,
          },
        },
        {
          name: 'Chart1',
          path: 'chart1',
          hidden: false,
          component: 'statistics/staging',
          meta: {
            title: '分期数据统计图表',
            icon: 'charts',
            noCache: false,
            link: null,
          },
        },
      ],
    },
  ] as RouteType[]
}
