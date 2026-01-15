import { theme } from 'antd';

import styles from './LoginBackground.module.css';
import { CornerBottomIcon, CornerTopIcon } from './SVGIcons';

/** 登录页面背景装饰组件 */
export default function LoginBackground() {
  const { token } = theme.useToken();

  return (
    <div className={styles.container}>
      {/* 右上角主题色不规则形状 */}
      <div className={`${styles.cornerTop}`}>
        <CornerTopIcon
          className={styles.cornerImg}
          primaryColor={token.colorPrimary}
          secondaryColor={token.colorPrimaryBorderHover}
        />
      </div>

      {/* 左下角主题色不规则形状 */}
      <div className={`${styles.cornerBottom}`}>
        <CornerBottomIcon
          className={styles.cornerImg}
          primaryColor={token.colorPrimary}
          secondaryColor={token.colorPrimaryBorderHover}
        />
      </div>

      {/* 浮动装饰圆形 */}
      <div className={`${styles.flyCircle} ${styles.circle1}`} style={{ backgroundColor: token.colorPrimaryBg }} />
      <div className={`${styles.flyCircle} ${styles.circle2}`} style={{ backgroundColor: token.colorPrimaryBgHover }} />
      <div className={`${styles.flyCircle} ${styles.circle3}`} style={{ backgroundColor: token.colorPrimaryBg }} />
      <div className={`${styles.flyCircle} ${styles.circle4}`} style={{ backgroundColor: token.colorPrimaryBgHover }} />
    </div>
  );
}
