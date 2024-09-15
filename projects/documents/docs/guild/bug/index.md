# 踩坑

记录平常遇到的一些坑点、技术点，以备后面查阅。

## 视频自动播放策略

目的是为了改善用户体验，策略详情：
1. 始终允许静音自动播放
2. 在以下情况，带声音的自动播放会被允许：
  - 用户已经与当前域进行了交户
  - 在桌面设备上，用户的媒体参与度（衡量个人在王帐上使用多媒体的倾向）指数阈值已达标
    对于开发者而言，媒体参与度的计算规则无法通过技术手段更改、不同版本的浏览器可能会有差异
  - 用户已经将网站添加到移动设备上的主屏幕或在桌面上安装了 PWA
3. 顶部帧可以将自动播放权限委派给其 iframe，以允许自动播放声音

#### 开发者的最佳实践

方案一：互动后播放

先尝试自动播放，若发生异常，则引导用户进行互动操作，然后再进行播放

```js
const modal = document.querySelector('.modal'); // 按钮蒙层
const btn = document.querySelector('.btn');
async function play() {
  try {
    await vdo.play();
    modal.style.display = 'none';
    btn.removeEventListener('click', play);
  } catch (err) {
    modal.style,display = 'flex';
    btn.addEventListener('click', play);
  }
}
play();
```

方案二：互动后出声

先静音播放，然后根据是否能自动播放决定是否取消静音，如果能自动播放则取消静音，如果不能自动播放则引导用户进行交互操作后取消静音

```js
function play() {
  vdo.muted = true;
  vdo.play();

  const ctx = new AudioContext();
  const canAutoPlay = ctx.state === 'running';
  ctx.close();

  if (canAutoPlay) {
    vdo.muted = false;
    modal.style.display = 'none';
    btn.removeEventListener('click', play);
  } else {
    modal.style,display = 'flex';
    btn.addEventListener('click', play);
  }
}
```
