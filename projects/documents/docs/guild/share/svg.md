# SVG 简介

SVG 是一个强大的工具，用于创建可伸缩的矢量图形，适用于各种应用场景，包括 Web 开发、数据可视化、图表绘制等.SVG 图像是基于 XML 的文本文件，可以在网页上嵌入，也可以作为独立文件存在。

## 功能和场景

**以下是一些 SVG 的主要功能和特性**：

- 矢量图形： SVG 使用矢量图形描述，这意味着图像可以无损地放大或缩小而不失真。这对于不同大小的屏幕和设备非常有用。
- XML 格式： SVG 是基于 XML 的标记语言，因此它可以轻松地与其他 XML 技术集成，如 XPath 和 CSS。这也使得 SVG 文件可以通过文本编辑器进行编辑。
- 形状元素： SVG 支持各种基本形状元素，如矩形（rect）、圆形（circle）、椭圆（ellipse）、线段（line）、多边形（polygon）、路径 （path）等，允许创建丰富多样的图形。
- 文本元素： SVG 允许在图形中插入文本，使用 text 元素。这使得在图形中添加标签、说明或注释变得容易。
- 渐变和填充： SVG 支持渐变（线性渐变和径向渐变）以及各种填充效果。这使得创建丰富多彩的图形变得简单。
- 变换： SVG 提供了一系列的变换，如平移、缩放、旋转等，这些变换可以应用于任何 SVG 元素。
- 滤镜效果： SVG 允许应用各种滤镜效果，如模糊、阴影等，以增强图形的外观。
- 互动性： SVG 支持通过 JavaScript 添加互动性。你可以使用事件处理程序（event handlers）来响应用户的交互，使得 SVG 图形能够动态地响应用户的操- 作。
- 嵌套和组合： SVG 允许元素的嵌套和组合，从而创建更为复杂的图形结构。
- 动画： SVG 支持通过 CSS 或 SMIL（Synchronized Multimedia Integration Language）添加动画。这使得图形元素能够在一定时间内发生平滑的变化。

**path 用`d`属性来描述路径，命令如下：**

- M = moveto 移动到某点。
- L = lineto 画一条直线到某点。
- H = horizontal lineto 画一条水平线到某点。
- V = vertical lineto 画一条垂直线到某点。
- Q = quadratic Bézier curveto 二次贝塞尔曲线
- T = smooth quadratic Bézier curveto 平滑二次贝塞尔曲线
- C = curveto 三次贝塞尔曲线
- S = smooth curveto 平滑三次贝塞尔曲线
- A = elliptical Arc 弧形
- Z = closepath 从结束点到开始点画一条直线，形成一个闭合的区域。

> 1. 大写表示绝对定位，绝对的参照点是 svg 最上角的那一点。
> 2. 小写表示相对定位，相对的参照点是上一个位置。

**SVG 在 Web 开发中的常见应用场景和例子：**

- 图标和按钮： SVG 可用于创建各种图标和按钮，而且由于其矢量特性，图标可以在不同分辨率的屏幕上保持清晰度

  ```html
  <svg width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="blue" />
  </svg>
  ```

- 数据可视化： SVG 可用于创建各种图表，如折线图、柱状图、饼图等，用于展示数据

  ```html
  <svg width="400" height="300">
    <rect x="50" y="20" width="50" height="150" fill="blue" />
    <rect x="150" y="70" width="50" height="100" fill="green" />
    <!-- ...其他图形元素... -->
  </svg>
  ```

- 动画效果： SVG 允许通过 CSS 或 SMIL 实现动画效果，用于吸引用户的注意或提供交互反馈

  ```html
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red">
      <animate
        attributeName="r"
        from="40"
        to="10"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
  ```

- Logo 设计： 公司和品牌的 Logo 通常需要在各种设备和尺寸上清晰可见，SVG 是一个理想的选择

  ```html
  <svg width="200" height="100">
    <text x="10" y="40" font-family="Arial" font-size="40" fill="blue">
      MyLogo
    </text>
  </svg>
  ```

- 背景图案： SVG 可用于创建复杂的背景图案，以提高网页的视觉吸引力

  ```html
  <svg width="800" height="600">
    <pattern
      id="pattern1"
      x="0"
      y="0"
      width="100"
      height="100"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="50" cy="50" r="50" fill="red" />
    </pattern>
    <rect x="0" y="0" width="800" height="600" fill="url(#pattern1)" />
  </svg>
  ```

- 元素之间的连线

  ```html
  <!-- 直线连接 -->
  <svg width="200" height="200">
    <line x1="50" y1="50" x2="150" y2="150" stroke="black" stroke-width="2" />
  </svg>

  <!-- 自定义路径曲线 -->
  <svg width="200" height="200">
    <path d="M50,50 C150,150 150,150 150,150" stroke="black" stroke-width="2" />
  </svg>

  <!-- 多点连接 -->
  <svg width="200" height="200">
    <polyline points="50,50 150,150 250,50" stroke="black" stroke-width="2" />
  </svg>

  <!-- 箭头连线 -->
  <svg width="200" height="200">
    <defs>
      <marker
        id="arrow"
        markerWidth="8"
        markerHeight="8"
        refX="3"
        refY="4"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,8 L8,4 Z" fill="black" />
      </marker>
    </defs>
    <line
      x1="50"
      y1="50"
      x2="150"
      y2="150"
      stroke="black"
      stroke-width="2"
      marker-end="url(#arrow)"
    />
  </svg>
  ```

## 连线示例

```vue
<template>
  <div class="container">
    <div v-for="(item, index) in data" :key="index" class="item">
      <div><input type="text" v-model="item.label" /></div>
      <button class="remove" @click="remove(index)">删除</button>
      <div v-if="index < data.length - 1" class="connector-line">
        <svg width="10" height="48">
          <path
            d="M10 0 Q 2 24, 10 46"
            fill="none"
            stroke="#ccc"
            stroke-width="1"
          />
          <text x="6" y="24" font-size="12" fill="#a3a3a3" text-anchor="middle">
            ||
          </text>
        </svg>
      </div>
    </div>
    <button class="add" @click="add">添加</button>
  </div>
</template>

<script setup>
const data = ref([
  {
    label: 1,
  },
  {
    label: 2,
  },
]);
const add = () => {
  data.value = data.value || [];
  if (data.value.length < 5) {
    data.value.push({
      label: data.value.length + 1,
    });
  } else {
    console.warn("最多添加 5 个");
  }
};
const remove = (index: number) => {
  if (data.value[index]) {
    data.value.splice(index, 1);
  }
};
</script>

<style lang="less">
.item {
  position: relative;
  margin-bottom: 12px;
  height: 36px;
  padding-left: 10px;
  display: flex;

  .connector-line {
    position: absolute;
    left: -2px;
    top: 50%;
    width: 1px;
    height: 48px;
    background-color: transparent;
  }

  .remove {
    opacity: 0;
    margin-left: 4px;
  }

  &:hover {
    .remove {
      opacity: 1;
    }
  }
}
</style>
```

![image](../../assets/share/svg.jpg)

参考：[svg 中 path 贝塞尔曲线和圆弧图文详解](https://juejin.cn/post/7018952717343129607)
