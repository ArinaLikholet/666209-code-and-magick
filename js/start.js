'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var TEXT = 'Ура вы победили!\nСписок результатов:';
var TEXT_HEIGHT = 20;
var TEXT_WIDTH = 30;
var TEXT_GAP = 20;

var GRAPH_X = 40;
var GRAPH_Y = 100;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 120;
var BAR_GAP = 50;
var BAR_NAME = 20;
var BAR_SCORE = 10;


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

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderMultiLineText = function (ctx, str, x, y, yGap) {
  var strings = str.split('\n');
  var yPosition = y;
  for (var i = 0; i < strings.length; i++) {
    ctx.fillText(strings[i], x, yPosition);
    yPosition += yGap;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px "PT Mono"';

  var textX = CLOUD_X + TEXT_HEIGHT;
  var textY = CLOUD_Y + TEXT_WIDTH;

  renderMultiLineText(ctx, TEXT, textX, textY, TEXT_GAP);

  var Time = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var brightness = Math.round(Math.random() * 100);
      var color = 'hsl(145, ' + brightness + '%, 50%)';
      ctx.fillStyle = color;
    }

    var barHeight = (BAR_HEIGHT * times[i]) / Time;
    var barX = CLOUD_X + GRAPH_X + (BAR_WIDTH + BAR_GAP) * i;
    var barY = CLOUD_Y + GRAPH_Y + BAR_HEIGHT - barHeight;
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000';

    var barNameY = CLOUD_Y + GRAPH_Y + BAR_HEIGHT + BAR_NAME;
    ctx.fillText(names[i], barX, barNameY);

    var barScoreY = barY - BAR_SCORE;
    ctx.fillText(Math.round(times[i]), barX, barScoreY);
  }
};
