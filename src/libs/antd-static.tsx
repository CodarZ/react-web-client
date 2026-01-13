/**
 * Antd 全局静态方法
 *
 * 用于在 React 组件树之外（如：axios 拦截器等）
 * 调用 antd 的 message、notification、modal 方法。
 *
 * @see https://ant.design/components/app-cn#global-scene-redux
 *
 */
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

/**
 * 静态方法提供组件
 * 必须放在 <App> 组件内部，用于获取并暴露静态方法实例
 */
export function AntdStaticProvider() {
  const staticFunctions = App.useApp();

  message = staticFunctions.message;
  notification = staticFunctions.notification;
  modal = staticFunctions.modal;

  return null;
}

export { message, modal, notification };
