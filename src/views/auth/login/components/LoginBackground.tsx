import { theme } from 'antd';

import cornerBottom from '../assets/corner-bottom.svg';
import cornerTop from '../assets/corner-top.svg';
import styles from './LoginBackground.module.css';

/** 登录页面背景装饰组件 */
export default function LoginBackground() {
  const { token } = theme.useToken();

  return (
    <div className={styles.container}>
      {/* 右上角主题色不规则形状 */}
      <div className={`${styles.cornerDecor} ${styles.cornerTop}`}>
        <img src={cornerTop} alt="" className={styles.cornerImg} />
      </div>

      {/* 左下角主题色不规则形状 */}
      <div className={`${styles.cornerDecor} ${styles.cornerBottom}`}>
        <img src={cornerBottom} alt="" className={styles.cornerImg} />
      </div>

      {/* 浮动装饰圆形 */}
      <div className={`${styles.flyCircle} ${styles.circle1}`} style={{ backgroundColor: token.colorPrimaryBg }} />
      <div className={`${styles.flyCircle} ${styles.circle2}`} style={{ backgroundColor: token.colorPrimaryBgHover }} />
      <div className={`${styles.flyCircle} ${styles.circle3}`} style={{ backgroundColor: token.colorPrimaryBg }} />
      <div className={`${styles.flyCircle} ${styles.circle4}`} style={{ backgroundColor: token.colorPrimaryBgHover }} />
    </div>
  );
}
