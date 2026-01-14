import { Col, Flex, Row, theme } from 'antd';

import FormLeft from './assets/form-left.svg';
import LoginBackground from './components/LoginBackground';
import LoginForm from './components/LoginForm';
import styles from './index.module.css';

export default function LoginPage() {
  const { token } = theme.useToken();

  return (
    <Flex
      justify="center"
      align="center"
      className={styles.container}
      style={{
        background: token.colorBgContainer,
      }}
    >
      <Row
        className={styles.card}
        style={{
          borderRadius: token.borderRadius,
          backgroundColor: token.colorBgBase,
        }}
      >
        <Col xs={0} sm={12} md={14} style={{ height: '100%' }}>
          <Flex
            align="center"
            justify="center"
            className={styles.panel}
            style={{
              background: `linear-gradient(60deg,${token.colorPrimary},${token.colorPrimaryBorderHover}`,
            }}
          >
            <img src={FormLeft} className={styles.illustration} />
          </Flex>
        </Col>
        <Col xs={24} sm={12} md={10} style={{ height: '100%' }}>
          <Flex
            vertical={true}
            align="center"
            justify="center"
            className={styles.panel}
            style={{ padding: token.paddingMD }}
          >
            <Flex
              align="center"
              justify="center"
              style={{
                marginBottom: token.marginMD,
                fontSize: token.fontSizeHeading4,
                fontWeight: token.fontWeightStrong,
                lineHeight: token.lineHeightLG,
              }}
            >
              React Web Client
            </Flex>
            <LoginForm></LoginForm>
          </Flex>
        </Col>
      </Row>
      {/* 背景装饰层 */}
      <LoginBackground />
    </Flex>
  );
}
