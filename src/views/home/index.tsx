import { useQueryClient } from '@tanstack/react-query';

import { Avatar, Button, Card, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import dayjs from 'dayjs';

import { useUserList, userKeys } from '@/apis';
import type { User } from '@/mocks/modules/user/schema';

import { message } from '@/libs/antd-static';

const { Paragraph, Text } = Typography;

/** 角色颜色映射 */
const roleColorMap: Record<string, string> = {
  admin: 'red',
  user: 'blue',
  guest: 'default',
};

/** 表格列定义 */
const columns: ColumnsType<User> = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 60,
    render: (avatar: string) => <Avatar src={avatar} size="small" />,
  },
  { title: '姓名', dataIndex: 'username', width: 120 },
  { title: '昵称', dataIndex: 'nickname', width: 120 },
  { title: '邮箱', dataIndex: 'email', width: 200 },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 100,
    render: (role: string) => <Tag color={roleColorMap[role]}>{role}</Tag>,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
  },
];

export default function HomePage() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, isFetching, refetch } = useUserList({ enabled: false });

  /** 取消请求 */
  const handleCancelRequest = () => {
    queryClient.cancelQueries({ queryKey: userKeys.lists() });
    message.info('请求已取消');
  };

  return (
    <Card title="欢迎使用" variant="borderless">
      <Typography>
        <Paragraph>
          <Text type="secondary">
            今天是
            {dayjs().format(' YYYY 年 MM 月 DD 日, dddd')}
          </Text>
        </Paragraph>
      </Typography>

      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" loading={isFetching} onClick={() => refetch()}>
          获取用户列表
        </Button>
        <Button danger={true} disabled={!isFetching} onClick={handleCancelRequest}>
          取消请求
        </Button>
      </Space>

      {users.length > 0 && (
        <Table rowKey="id" columns={columns} dataSource={users} loading={isLoading} pagination={false} size="small" />
      )}
    </Card>
  );
}
