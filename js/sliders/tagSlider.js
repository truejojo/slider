import { dias } from '../../data/dias.js';
import {
  getDocumentByQuerySelector,
  createElWithClassName,
  createBtn,
  appendChildsToParent,
  addClassToEl,
  removeClassFromEl,
} from '../utils/domHelper.js';
import { useSlider } from '../hooks/useSlider.js';

const sliderInnerEl = getDocumentByQuerySelector('.tag-slider-inner');
const sliderControlsEl = getDocumentByQuerySelector('.tag-slider-controls');
const slideEl = createElWithClassName('div', 'tag-slider-slide');
const headlineEl = createElWithClassName('h2', 'headline');
const textEl = createElWithClassName('p', 'text');

const {
  handlePrevClick,
  handleNextClick,
  handleResetClick,
  startSlider,
  stopSlider,
  current,
} = useSlider(dias, updateView, 3000);

const prevBtn = createBtn('Zurück', 'btn-prev', handlePrevClick);
const resetBtn = createBtn('Reset', 'btn-resett', handleResetClick);
const nextBtn = createBtn('Vor', 'btn-next', handleNextClick);

const stopSliderShowBtn = createBtn('Stop Slider', 'btn-stop', handleStopClick);
const startSliderShowBtn = createBtn(
  'Play Slider',
  'btn-start',
  handleStartClick,
);

function updateView() {
  const currentImage = current();

  if (currentImage) {
    headlineEl.innerText = currentImage.headline;
    textEl.innerText = currentImage.text;
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
  appendChildsToParent([headlineEl, textEl], slideEl);
  appendChildsToParent(slideEl, sliderInnerEl);
  appendChildsToParent(
    [prevBtn, resetBtn, stopSliderShowBtn, startSliderShowBtn, nextBtn],
    sliderControlsEl,
  );

  addClassToEl(stopSliderShowBtn, 'hide');
  updateView();
}
initializeSlider();
