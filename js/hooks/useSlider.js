import { useLinkedList } from './useLinkedList.js';

export const useSlider = (slides = [], onUpdate, intervalTime = 5000) => {
  const { next, prev, current, reset } = useLinkedList(slides);
  const sliderState = {
    intervalFnc: null,
  };

  function startSlider() {
    if (sliderState.intervalFnc) return;

    sliderState.intervalFnc = setInterval(() => {
      handleNextClick();
    }, intervalTime);
  }

  function stopSlider() {
    clearInterval(sliderState.intervalFnc);
    sliderState.intervalFnc = null;
  }

  function handleResetClick() {
    reset();
    if (onUpdate) onUpdate();
  }

  function handlePrevClick() {
    prev();
    if (onUpdate) onUpdate();
  }

  function handleNextClick() {
    next();
    if (onUpdate) onUpdate();
  }

  return {
    handlePrevClick,
    handleNextClick,
    handleResetClick,
    startSlider,
    stopSlider,
    current,
  };
};
