'use strict';

var charterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var charterSimilar = document.querySelector('.setup-similar-list');

var CHARTER_CONFIG = {
  names: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  surnames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)]'
  ],

  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

document.querySelector('.setup').classList.remove('hidden');

function getInteger(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function getCharter(data) {
  return {
    name: data.names[getInteger(0, data.names.length - 1)] + ' ' + data.surnames[getInteger(0, data.surnames.length - 1)],
    coatColor: data.coatColors[getInteger(0, data.coatColors.length - 1)],
    eyesColor: data.eyesColors[getInteger(0, data.eyesColors.length - 1)]
  };
}

function generateCharter(dataWizard) {
  var clonedCharter = charterTemplate.cloneNode(true);

  clonedCharter.querySelector('.setup-similar-label').textContent = dataWizard.name;
  clonedCharter.querySelector('.wizard-coat').setAttribute('fill', dataWizard.coatColor);
  clonedCharter.querySelector('.wizard-eyes').setAttribute('fill', dataWizard.eyesColor);

  return clonedCharter;
}

function getSimilarCharters() {
  var similarCharters = [];

  for (var i = 0; i < 4; i++) {
    similarCharters.push(getCharter(CHARTER_CONFIG));
  }

  return similarCharters;
}

var chartersList = getSimilarCharters();

function paintCharters(list) {
  var wizardFragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    wizardFragment.appendChild(generateCharter(list[i]));
  }

  return charterSimilar.appendChild(wizardFragment);
}

paintCharters(chartersList);

document.querySelector('.setup-similar').classList.remove('hidden');
