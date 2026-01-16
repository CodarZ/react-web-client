/** 获取验证码 (使用 Canvas 纯前端模拟) */
export async function getCaptchaApi() {
  const canvas = document.createElement('canvas');
  const width = 100;
  const height = 32;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // 背景填充
  ctx.fillStyle = '#f0f2f5';
  ctx.fillRect(0, 0, width, height);

  // 生成 4 位随机字符
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (let i = 0; i < 4; i++) {
    const char = chars.charAt(Math.floor(Math.random() * chars.length));

    // 为每个字符设置随机样式
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = `rgb(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150})`;
    ctx.textBaseline = 'middle';

    // 随机微调坐标和角度
    ctx.save();
    ctx.translate(20 * i + 15, height / 2);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }

  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }

  // 延迟模拟网络加载
  await new Promise((resolve) => setTimeout(resolve, 300));

  return canvas.toDataURL('image/png');
}

/** 登录 */
export async function loginApi(data: unknown) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.code === 200) {
    return result.data;
  }
  throw new Error(result.msg || '登录失败');
}

/** 退出登录 */
export async function logoutApi() {
  const response = await fetch('/auth/logout', {
    method: 'POST',
  });
  const result = await response.json();
  if (result.code === 200) {
    return result.data;
  }
  throw new Error(result.msg || '登出失败');
}
