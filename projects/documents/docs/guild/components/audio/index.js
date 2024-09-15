const audioEle = document.querySelector('audio');
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

// 初始化 canvas 尺寸
function initCVS() {
  const size = 500;
  cvs.width = size * devicePixelRatio;
  cvs.height = size * devicePixelRatio;
  cvs.style.width = cvs.style.height = size + 'px';
}
initCVS();

function draw(datas, maxValue) {
  const centerX = cvs.width / 2; // 居中
  const centerY = cvs.height / 2; // 居中
  const baseRadius = Math.min(centerX / 1.5, centerY / 1.5); // 基础圆的半径

  ctx.clearRect(0, 0, cvs.width, cvs.height); // 清除画布

  // 遍历频率数据并绘制每个弧线
  datas.forEach((value, index) => {
    const startAngle = (index / datas.length) * Math.PI * 2; // 起始角度
    const endAngle = ((index + 1) / datas.length) * Math.PI * 2; // 结束角度
    const offset = value / maxValue * 80; // 偏移量，根据强度调整
    const innerRadius = baseRadius; // 内部半径
    const outerRadius = baseRadius + offset; // 外部半径

    ctx.beginPath();
    ctx.moveTo(centerX + innerRadius * Math.cos(startAngle), centerY + innerRadius * Math.sin(startAngle));
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle, false);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();

    ctx.lineWidth = 2; // 设置弧线厚度
    ctx.strokeStyle = '#159709b2'; // 设置弧线颜色
    ctx.lineCap = 'round'; // 圆形的线条端点
    ctx.lineJoin = 'round'; // 圆形的线条连接处
    ctx.stroke(); // 绘制路径
  });

  ctx.beginPath();
  ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)'; // 设置背景圆的颜色
  ctx.lineWidth = 2;
  ctx.stroke();
}
draw(new Array(256).fill(0), 255);

let isInit = false;
let analyser;
let buffer;
audioEle.onplay = function() {
  if (isInit) {
    return;
  }

  try {
    // 创建音频上下文
    const audioCtx = new AudioContext();
    // 创建分析器节点
    analyser = audioCtx.createAnalyser();
    // 设置频率数据长度
    analyser.fftSize = 512;
    // 创建频率数据缓冲区
    buffer = new Uint8Array(analyser.frequencyBinCount);

    // 创建媒体元素源
    const source = audioCtx.createMediaElementSource(audioEle);
    // 连接分析器节点
    source.connect(analyser);

    // 分析器节点连接音频上下文目的地
    analyser.connect(audioCtx.destination);

    isInit = true;
  } catch (error) {
    console.error('Failed to initialize audio context:', error);
  }
};

function update() {
  requestAnimationFrame(update);
  if (!isInit) {
    return;
  }

  try {
    // 获取频率数据
    analyser.getByteFrequencyData(buffer);
    // 取 2/3 数据绘制频谱图
    const offset = Math.floor(buffer.length * 2 / 3);
    const datas = new Array(offset * 2);
    for (let i = 0; i < offset; i++) {
      datas[i] = datas[datas.length - i -1] = buffer[i];
    }

    // 绘制频谱图
    draw(datas, 255);
  } catch (error) {
    console.error('Failed to get frequency data:', error);
  }
}
update();
