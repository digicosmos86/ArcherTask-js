const sliderToPixel = (sliderValue) => {
  const sliderWidth = 500 - 100;
  const sliderTop = 100;
  const sliderMax = 200;

  const pixelY =
    Math.round(50 + ((sliderMax - sliderValue) / sliderMax) * sliderWidth) +
    sliderTop;

  return pixelY;
};

const isHit = (response, targetValue, isOverlord) => {
  const responseTop = sliderToPixel(response);
  const targetTop = sliderToPixel(targetValue);
  const height = isOverlord ? 17 : 13;

  return responseTop + 3 >= targetTop && responseTop < targetTop + height;
};

export { sliderToPixel as calculateByValue, isHit };
