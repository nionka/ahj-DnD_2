/* eslint-disable class-methods-use-this */
export default class LoadImage {
  constructor(container) {
    this.container = container;
    this.form = this.container.querySelector('.form');
    this.loadImg = this.container.querySelector('.load-img');
    this.images = this.container.querySelector('.images');
  }

  init() {
    this.form.addEventListener('click', (e) => this.onLoad(e));
    this.form.addEventListener('change', (e) => this.onChange(e));
    this.images.addEventListener('click', (event) => this.removeImg(event));

    this.form.addEventListener('dragover', (e) => e.preventDefault());
    this.form.addEventListener('drop', (e) => this.onDrop(e));
  }

  onDrop(e) {
    e.preventDefault();

    const img = e.dataTransfer.files[0];
    this.checkImg(img);
  }

  onChange(e) {
    e.preventDefault();

    const img = e.target.files[0];
    this.checkImg(img);

    this.container.querySelector('.load-img').value = '';
  }

  onLoad(e) {
    e.preventDefault();

    this.loadImg.dispatchEvent(new MouseEvent('click'));
  }

  checkImg(imgLoad) {
    const imgUrl = URL.createObjectURL(imgLoad);

    const testImg = document.createElement('img');
    testImg.src = imgUrl;
    testImg.onload = () => {
      this.addImg(imgUrl, 'image');
      URL.revokeObjectURL(imgUrl);
    };
    testImg.onerror = () => console.log('ops');
  }

  addImg(url, name) {
    const div = document.createElement('div');
    div.classList.add('img-box');
    div.innerHTML = `<button class="btn">X</button><img src="${url}" alt="${name}" class="img">`;
    this.images.append(div);
  }

  removeImg(e) {
    if (e.target.classList.contains('btn')) {
      e.target.closest('.img-box').remove();
    }
  }
}
