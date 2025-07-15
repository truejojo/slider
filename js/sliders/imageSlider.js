// Callback-Muster

import { images } from '../../data/images.js';
import {
  createElWithClassName,
  appendChildsToParent,
  getDocumentByQuerySelector,
  createBtn,
  addClassToEl,
  removeClassFromEl,
  createElWithClassNameAndEventListener,
} from '../utils/domHelper.js';
import { useSlider } from '../hooks/useSlider.js';

const sliderInnerEl = getDocumentByQuerySelector('.image-slider-inner');
const sliderFigcaptionEl = getDocumentByQuerySelector(
  '.image-slider-figcaption',
);
const sliderControlsEl = getDocumentByQuerySelector('.image-slider-controls');
const slideEl = createElWithClassNameAndEventListener(
  'img',
  'image-slider-slide',
  toggleInfo,
);
const headlineEl = createElWithClassName('span', 'headline');
const textEl = createElWithClassName('span', 'text');

const {
  handlePrevClick,
  handleNextClick,
  handleResetClick,
  startSlider,
  stopSlider,
  current,
} = useSlider(images, updateView);

const prevBtn = createBtn('<', 'btn-prev', handlePrevClick);
const resetBtn = createBtn('Reset', 'btn-reset', handleResetClick);
const nextBtn = createBtn('>', 'btn-next', handleNextClick);

const stopSliderShowBtn = createBtn('Stop', 'btn-stop', handleStopClick);
const startSliderShowBtn = createBtn('Start', 'btn-start', handleStartClick);

function toggleInfo() {
  if (sliderFigcaptionEl.classList.contains('hide')) {
    removeClassFromEl(sliderFigcaptionEl, 'hide');
    addClassToEl(sliderFigcaptionEl, 'position-absolute');
  } else {
    console.log('sliderFigcaptionEl', sliderFigcaptionEl);

    addClassToEl(sliderFigcaptionEl, 'hide');
    removeClassFromEl(sliderFigcaptionEl, 'position-absolute');
  }
}

function updateView() {
  const currentImage = current();

  if (!currentImage) return;

  if (currentImage) {
    slideEl.src = currentImage.src;
    slideEl.alt = currentImage.alt;
    headlineEl.innerText = currentImage.alt;
    textEl.innerText = currentImage.text;
  }

  addClassToEl(sliderFigcaptionEl, 'hide');
  removeClassFromEl(sliderFigcaptionEl, 'position-absolute');
}

function handleStartClick() {
  startSlider();
  addClassToEl(startSliderShowBtn, 'hide');
  removeClassFromEl(stopSliderShowBtn, 'hide');
}

function handleStopClick() {
  stopSlider();
  addClassToEl(stopSliderShowBtn, 'hide');
  removeClassFromEl(startSliderShowBtn, 'hide');
}

function initializeSlider() {
  appendChildsToParent(slideEl, sliderInnerEl);
  appendChildsToParent(
    [prevBtn, resetBtn, stopSliderShowBtn, startSliderShowBtn, nextBtn],
    sliderControlsEl,
  );
  appendChildsToParent([headlineEl, textEl], sliderFigcaptionEl);
  addClassToEl(sliderFigcaptionEl, 'hide');
  removeClassFromEl(sliderFigcaptionEl, 'position-absolute');

  updateView();
  handleStartClick();
}
initializeSlider();
