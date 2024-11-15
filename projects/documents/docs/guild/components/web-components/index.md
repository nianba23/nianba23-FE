# 探讨 web-components 的正确使用姿势

## web-components 是什么？

[Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components) 是一组 Web 原生 API 的总称，允许开发人员创建可重用的自定义组件，并在 web 中像使用原生 HTML 标签一样使用。
目前已有很多前端框架/库支持 web components。

## 可以替代现代 UI 框架吗？

封装自定义元素，听着很熟悉，似乎解决了前端开发必须使用 `vue`、 `react` 等 UI 框架来实现代码复用的问题。

但是我们使用 UI 框架已经不再是纯粹的为了`组件复用`。我们更离不开的是声明式（数据驱动）的开发方式，以及 UI 框架的一系列周边生态带来的开发便捷。

我们享受着 UI 框架带来的 `现代式` 开发，虽然他不是 web 标准，但是声明式的开发方式几乎已经成为了现代 web 前端的事实标准。

而 `web components` 可以看作只是丰富了 HTML 的原生标签。所以它无法和 `vue` `react` 等做一个正面比较，更别说 `web components` 的出现会取代它们。

## 它适用于什么样的场景？

UI 组件库！当你希望你的 UI 组件可以在任何框架上运行（包括原生），那么使用 `web components` 可以达到目的。

由于它只是拓展了 HTML 的原生标签，所以可以像使用 `div` 标签一样的方式来使用它。这样可以拓展你的 UI 组件库的受众。无论开发者使用的是 `vue` 还是 `react` 都可以调用你的组件，当然包括原生开发。

## 核心 API

- custom elements 自定义元素：用来定义‘自定义元素’及其‘行为’，对外提供组件的标签
- shadow DOM 影子：用来封装组件内部的结构，避免与外部冲突
- HTML templates HTML 模板：包括 template 和 slot 元素，可以定义各种组件的 HTML 模板，然后被复用到其他地方

HTML imports 目前已废弃

## 入门示例


