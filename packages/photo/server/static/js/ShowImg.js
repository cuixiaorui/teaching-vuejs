const parentElement = document.querySelector(".photoContainer");
export default class ShowImg {
  constructor(data) {
    this.data = data;
    this.createElement();
  }

  createElement() {
    const div = document.createElement("div");
    div.classList.add("photoItem");
    div.innerHTML = `
        <img src="${this.data.imgUrl}">
        <span>${this.data.name}</span>
    `;
    parentElement.appendChild(div);
    return div;
  }
}
