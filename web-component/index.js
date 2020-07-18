class ObjectVisualizerElement extends HTMLElement {
  constructor() {
    super();
    this._data = null;
    this._shadow = this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    this._style= `.object-visualizer {
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  padding: 10px;
  font-family: Menlo;
  font-size: 0.8rem;
  line-height: 1.4;
  background-color: hsl(0, 0%, 13%);
}

.array > .value,
.object > .value {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}

.key {
  color: hsl(300, 60%, 65%);
  user-select: none;
}

.string > .value {
  color: hsl(12, 100%, 40%);
}

.boolean > .value,
.number > .value {
  color: hsl(250, 70%, 65%);
}

.null > .value,
.undefined > .value {
  color: hsl(0, 0%, 40%);
}

.separator {
  cursor: pointer;
  font-size: 0.8rem;
  user-select: none;
  color: hsl(0, 0%, 80%);
}

.indicator {
  cursor: pointer;
  font-size: 0.8rem;
  padding-right: 0.3rem;
  user-select: none;
  vertical-align: text-bottom;
  color: hsl(0, 0%, 50%);
}

.array > .key,
.object > .key {
  cursor: pointer;
}

.value > .array,
.value > .object {
  position: relative;
  left: -0.8rem;
}

.count,
.preview,
.quotes {
  cursor: pointer;
  font-size: 0.8rem;
  user-select: none;
  color: hsl(0, 0%, 80%);
}`;
     
   this.template.innerHTML = `<style>${this._style}</style> <div id="obj-vis-el"></div>`;
      this._shadow.appendChild(this.template.content.cloneNode(true));

  }

  static get observedAttributes() { return ["data"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    // name will always be "country" due to observedAttributes
    this._data = newValue;   
    this._updateRendering();
  }
  connectedCallback() {
    this._updateRendering();
  }

  get data() {
    return typeof(this._data) ==="string" && this._data.length > 0? JSON.parse(this._data) : this._data;
  }
  set data(v) {
    this.setAttribute("data", v);
  }

  _updateRendering() {
   
   ObjectVisualizer.mount(this.data, this.shadowRoot.getElementById("obj-vis-el"));
  }
}

customElements.define("object-visualizer", ObjectVisualizerElement);

