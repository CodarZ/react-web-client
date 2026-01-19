/**
 * 验证码生成模块
 * 注意：这是纯前端 Canvas 模拟的验证码，仅用于开发/演示
 * 生产环境应替换为后端 API
 */

const CAPTCHA_WIDTH = 100;
const CAPTCHA_HEIGHT = 32;
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** 生成随机颜色 */
function randomColor(max = 150): string {
  const r = Math.floor(Math.random() * max);
  const g = Math.floor(Math.random() * max);
  const b = Math.floor(Math.random() * max);
  return `rgb(${r}, ${g}, ${b})`;
}

/** 获取验证码 (使用 Canvas 纯前端模拟) */
export async function getCaptchaApi(): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CAPTCHA_WIDTH;
  canvas.height = CAPTCHA_HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // 背景填充
  ctx.fillStyle = '#f0f2f5';
  ctx.fillRect(0, 0, CAPTCHA_WIDTH, CAPTCHA_HEIGHT);

  // 生成 4 位随机字符
  for (let i = 0; i < 4; i++) {
    const char = CHARS.charAt(Math.floor(Math.random() * CHARS.length));

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = randomColor();
    ctx.textBaseline = 'middle';

    // 随机微调坐标和角度
    ctx.save();
    ctx.translate(20 * i + 15, CAPTCHA_HEIGHT / 2);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }

  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * CAPTCHA_WIDTH, Math.random() * CAPTCHA_HEIGHT);
    ctx.lineTo(Math.random() * CAPTCHA_WIDTH, Math.random() * CAPTCHA_HEIGHT);
    ctx.stroke();
  }

  // 延迟模拟网络加载
  await new Promise((resolve) => setTimeout(resolve, 300));

  return canvas.toDataURL('image/png');
}
