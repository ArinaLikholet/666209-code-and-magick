'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var TEXT_LINE1 = 'Ура вы победили!';
var TEXT_LINE2 = 'Список результатов:';
var TextLinePosition1 = {
  x: 120,
  y: 40
};
var TextLinePosition2 = {
  x: 120,
  y: 60
};

var BarPosition = {
  x: 140,
  y: 245
};
var BAR_HEIGHT = 150;
var BAR_SCORE = 10;
var COLUMN_GAP = 50;
var COLUMN_WIDTH = 40;
var BAR_NAME = 20;


// рисует облако
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - GAP);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH - GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + GAP);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

// рисует текст
var renderText = function (text, x, y, ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px "PT Mono"';
  ctx.fillText(text, x, y);
};

// ищет максимальный элемент в массиве
var getMaxElement = function (numArray) {
  return Math.max.apply(null, numArray);
};
// вычисляет высоту столбца в зависимости от времени прохождения
var getBarHeightArray = function (times) {
  var arrayLength = times.length;
  var columnHeights = new Array(arrayLength);
  var maxPlayerTime = getMaxElement(times);
  for (var i = 0; i < arrayLength; i++) {
    columnHeights[i] = BAR_HEIGHT * times[i] / maxPlayerTime;
  }
  return columnHeights;
};
// вычисляет цвет столбцов
var getBarColor = function (ctx, names, times) {
  var columnHeights = getBarHeightArray(times);
  var fillColor;
  var x = BarPosition.x;

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      fillColor = 'rgba(255, 0, 0, 1)';
    } else {
      var brightness = Math.round(Math.random() * 100);
      fillColor = 'hsl(145, ' + brightness + '%, 50%)';
    }
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, BarPosition.y, COLUMN_WIDTH, -columnHeights[i]);
    renderText(names[i], x, BarPosition.y + BAR_NAME, ctx);
    renderText(Math.trunc(times[i]), x, BarPosition.y - columnHeights[i] - BAR_SCORE, ctx);
    x += COLUMN_GAP + COLUMN_WIDTH;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  getBarColor(ctx, names, times);
  renderText(TEXT_LINE1, TextLinePosition1.x, TextLinePosition1.y, ctx);
  renderText(TEXT_LINE2, TextLinePosition2.x, TextLinePosition2.y, ctx);

};
