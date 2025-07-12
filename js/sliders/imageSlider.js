// Callback-Muster

import { images } from '../../data/images.js';
import {
  createElWithClassName,
  appendChildsToParent,
  getDocumentByQuerySelector,
  createBtn,
  addClassToEl,
  removeClassFromEl,
} from '../utils/domHelper.js';
import { useSlider } from '../hooks/useSlider.js';

const sliderInnerEl = getDocumentByQuerySelector('.image-slider-inner');
const sliderControlsEl = getDocumentByQuerySelector('.image-slider-controls');
const slideEl = createElWithClassName('img', 'image-slider-slide');

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

function updateView() {
  const currentImage = current();

  if (currentImage) {
    slideEl.src = currentImage.src;
    slideEl.alt = currentImage.alt;
  }
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

  updateView();
  handleStartClick();
}
initializeSlider();
