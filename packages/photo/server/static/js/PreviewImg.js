const parentElement = document.querySelector(".wantUpload");

export default class PreviewImg {
  constructor(file) {
    this.file = file;
    this.element = this.createElement();
    this.setImgUrl(this.getImgElement());
  }

  updateProgress(loaded, total) {
    const percent = this.getPercent(loaded, total);
    this.showProgressView();
    this.updateProgressView(percent);

    if (this.isLoaded(percent)) {
      this.hideProgressView();
    }
  }

  getPercent(loaded, total) {
    return Math.ceil((loaded / total) * 100);
  }

  updateProgressView(percent) {
    this.element.querySelector(".plan").style.width = percent + "%";
    this.element.querySelector(".val").textContent = percent + "%";
  }

  isLoaded(percent) {
    return percent >= 100;
  }

  hideProgressView() {
    this.element.querySelector(".myProgress").style.display = "none";
  }

  showProgressView() {
    this.element.querySelector(".myProgress").style.display = "block";
  }

  getFile() {
    return this.file;
  }

  getImgName() {
    return this.file.name;
  }

  getImgElement() {
    return this.element.querySelector("img");
  }

  setImgUrl(img) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      img.setAttribute("src", fileReader.result);
    };

    fileReader.readAsDataURL(this.file);
  }

  createElement() {
    const div = document.createElement("div");
    div.classList.add("uploadPhotoItem");
    div.innerHTML = `
            <div class="uploadPhotoItem">
                <span class="myProgress">
                    <span class="plan"></span>
                    <span class="val">30%</span>
                </span>
                <img src="img/1.jpg" />
                <span class="pictureName">
                    ${this.getImgName()}
                </span>
        </div>
    `;
    parentElement.appendChild(div);
    return div;
  }
}
