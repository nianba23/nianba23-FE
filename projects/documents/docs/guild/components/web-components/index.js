class CustomElementStart extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: 'open' });
    const text = document.createElement('span');
    text.textContent = 'Hello, World!';
    text.style.color = 'red';

    shadow.append(text);
  }
}

/**
 * TODO:
 * 使用 customElements.define 方法注册自定义元素
 * 参数：
 * 1. 元素名称，名称不能是单个单词，必须使用短横线隔开
 * 2. 自定义元素的的行为，必须是一个类
 * 3. 继承元素，可配置
 */
customElements.define('custom-element-start', CustomElementStart);
