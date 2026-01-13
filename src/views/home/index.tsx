import { Card, Typography } from 'antd';

import dayjs from 'dayjs';

const { Paragraph, Text } = Typography;

export default function HomePage() {
  return (
    <div style={{ padding: 16 }}>
      <Card title="欢迎使用" variant="borderless">
        <Typography>
          <Paragraph>
            <Text type="secondary">
              今天是
              {dayjs().format(' YYYY 年 MM 月 DD 日, dddd')}
            </Text>
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
}
