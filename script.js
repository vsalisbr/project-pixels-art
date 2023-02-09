const colorPalette = document.getElementById('color-palette');
const pixelBoard = document.getElementById('pixel-board');

const version = 0.5;

const saveData = () => {
  localStorage.colorPalette = colorPalette.innerHTML;
  localStorage.pixelBoard = pixelBoard.innerHTML;
  localStorage.version = version;
};

const saveBoardSize = (size) => {
  localStorage.boardSize = size;
};

// GERAÇÃO DO COLOR PALETTE
const uncheckColors = () => {
  const colors = document.getElementsByClassName('color');
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].className = 'color';
  }
};

function selectColor(event) {
  const color = event.target;
  if (!color.className.includes('selected')) {
    uncheckColors();
    color.className += ' selected';
  }
  localStorage.selectedColor = color.style.backgroundColor;
}

const int0To255 = () => Math.floor((Math.random() * 255));
const randomRGB = () => `rgb(${int0To255()},${int0To255()},${int0To255()})`;
const newDiv = () => document.createElement('div');
const divClass = (div) => {
  const divWClass = div;
  divWClass.className = 'color';
  return divWClass;
};
const divBackgroundColor = (div) => {
  const divWBackColor = div;
  divWBackColor.style.backgroundColor = randomRGB();
  return divWBackColor;
};
const createDiv = () => divBackgroundColor(divClass(newDiv()));

function createColorPalette(amount = 3) {
  const colors = [];
  for (let i = 0; i < amount; i += 1) {
    const color = createDiv();
    colors.push(color);
  }
  return colors;
}

const colorsEvent = () => {
  const colors = document.getElementsByClassName('color');
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].addEventListener('click', selectColor);
  }
};

const sectionColorPalette = (amount) => {
  const colors = createColorPalette(amount);
  for (let i = 0; i < colors.length; i += 1) {
    colorPalette.appendChild(colors[i]);
  }
  colorsEvent();
  saveData();
};

const defaultSectionColorPalette = () => {
  const first = '<div class="color selected" style="background-color: rgb(0, 0, 0);"></div>';
  colorPalette.innerHTML = first;
  sectionColorPalette();
};

// GERAÇÃO DO QUADRO DE PIXELS
const divClassPixel = (div) => {
  const divWClass = div;
  divWClass.className = 'pixel';
  divWClass.style.backgroundColor = 'rgb(255, 255, 255)';
  return divWClass;
};

const createDivPixel = () => divClassPixel(newDiv());

function createPixels(amount = 5) {
  const pixels = [];
  for (let i = 0; i < amount * amount; i += 1) {
    const pixel = createDivPixel();
    pixels.push(pixel);
  }
  return pixels;
}

const coloringPixel = (event) => {
  const pixel = event.target;
  pixel.style.backgroundColor = localStorage.selectedColor;
  saveData();
};

const pixelEvent = () => {
  const colors = document.getElementsByClassName('pixel');
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].addEventListener('click', coloringPixel);
  }
};

const limiteSizeBoard = (number) => {
  let size = number;
  if (size < 5) {
    size = 5;
  } else if (number > 50) {
    size = 50;
  }
  return size;
};

const sectionPixelBoard = (amount = 5) => {
  const tamanho = limiteSizeBoard(amount);
  pixelBoard.innerHTML = '';
  const pixels = createPixels(tamanho);
  for (let i = 0; i < pixels.length; i += 1) {
    pixelBoard.appendChild(pixels[i]);
  }
  pixelBoard.style.width = `${tamanho * 42}px`;
  pixelEvent();
  saveData();
};

const clearBoard = () => {
  sectionPixelBoard();
};

const regenerateBoard = () => {
  const boardSize = document.getElementById('board-size');
  if (boardSize.value.length === 0 || boardSize.value < 0) {
    alert('Board inválido!');
  }
  if (Number(boardSize.value) > 0) {
    const size = limiteSizeBoard(boardSize.value);
    sectionPixelBoard(size);
    saveBoardSize(size);
    boardSize.value = '';
  }
};

const btnRandomColorPalette = () => {
  const btns = document.getElementById('btns');
  const btn = document.createElement('button');
  btn.setAttribute('id', 'button-random-color');
  btn.innerText = 'Cores aleatórias';
  btn.addEventListener('click', defaultSectionColorPalette);
  btns.appendChild(btn);
};

const btnClearBoard = () => {
  const btns = document.getElementById('btns');
  const btn = document.createElement('button');
  btn.setAttribute('id', 'clear-board');
  btn.innerText = 'Limpar';
  btn.addEventListener('click', clearBoard);
  btns.appendChild(btn);
};

const inputSizeOfBoard = () => {
  const btns = document.getElementById('btns');
  const input = document.createElement('input');
  input.setAttribute('id', 'board-size');
  input.setAttribute('type', 'number');
  input.setAttribute('min', '1');
  input.setAttribute('placeholder', 'Digite seu número');
  input.innerText = 'VQV';
  btns.appendChild(input);
};

const btnGenerateBoard = () => {
  const btns = document.getElementById('btns');
  const btn = document.createElement('button');
  btn.setAttribute('id', 'generate-board');
  btn.innerText = 'VQV';
  btn.addEventListener('click', regenerateBoard);
  btns.appendChild(btn);
};

const creatElements = () => {
  btnRandomColorPalette();
  btnClearBoard();
  inputSizeOfBoard();
  btnGenerateBoard();
};

// DEFAULT
window.onload = () => {
  if (localStorage.version < version) {
    localStorage.clear();
  }
  if (!localStorage.version) {
    defaultSectionColorPalette();
    sectionPixelBoard();
    saveData();
  } else {
    colorPalette.innerHTML = localStorage.colorPalette;
    pixelBoard.innerHTML = localStorage.pixelBoard;
    pixelBoard.style.width = `${localStorage.boardSize * 42}px`;
    pixelEvent();
    colorsEvent();
  }
  creatElements();
  localStorage.selectedColor = 'rgb(0, 0, 0)';
};
