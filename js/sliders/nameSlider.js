'use strict';

import { dias } from '../../data/dias.js';
import {
  getDocumentByQuerySelector,
  createElWithClassName,
  createBtn,
  appendChildsToParent,
} from '../utils/domHelper.js';
import { useSlider } from '../hooks/useSlider.js';

const sliderInnerEl = getDocumentByQuerySelector('.name-slider-inner');
const sliderControlsEl = getDocumentByQuerySelector('.name-slider-controls');
const slideEl = createElWithClassName('div', 'name-slider-slide');
const headlineEl = createElWithClassName('h2', 'headline');

const { handlePrevClick, handleNextClick, current } = useSlider(
  dias,
  updateView,
  2000,
);

const prevBtn = createBtn('<', 'btn-prev', handlePrevClick);
const nextBtn = createBtn('>', 'btn-next', handleNextClick);

function updateView() {
  const currentSlide = current();

  if (currentSlide) {
    headlineEl.innerText = currentSlide.headline;
  }
}

function initializeSlider() {
  appendChildsToParent(headlineEl, slideEl);
  appendChildsToParent(slideEl, sliderInnerEl);
  appendChildsToParent([prevBtn, nextBtn], sliderControlsEl);

  updateView();
}
initializeSlider();
