'use strict';

var PICTURES_LENGTH = 25;
var MIN_LIKE = 15;
var MAX_LIKE = 200;
var picturesData = {};
var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var namesList = [
  'Ваня',
  'Коля',
  'Маша',
  'Олег',
  'Евгений',
  'Юлия'
];
var MIN_AVATAR = 1;
var MAX_AVATAR = 5;
var pictureMokArray = [];
var template = document.querySelector('#picture').content.querySelector('.picture');

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRndElement(array) {
  return array[Math.floor(Math.random() * (array.length - 0))];
}

function createMockObject(names, comments) {
  picturesData = {
    url: 'photos/' + getRndInteger(1, 25) + '.jpg',
    likes: getRndInteger(MIN_LIKE, MAX_LIKE),
    comment: []
  };

  var commentsCount = getRndInteger(0, 3);

  for (var i = 0; i < commentsCount; i++) {
    var commentData = {
      avatar: 'img/avatar-' + getRndInteger(MIN_AVATAR, MAX_AVATAR) + '.svg',
      message: getRndElement(comments),
      name: getRndElement(names)
    };
    picturesData.comment.push(commentData);

  }

  return picturesData;
}

function createMokArray(quantity) {
  for (var j = 0; j < quantity; j++) {
    pictureMokArray[j] = createMockObject(namesList, commentsList, PICTURES_LENGTH);
  }
  return pictureMokArray;
}

function createPictures(picture) {
  var pictureElement = template.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comment.length;
  return pictureElement;
}

function createFragments() {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureMokArray.length; i++) {
    fragment.appendChild(createPictures(pictureMokArray[i]));
  }
  picturesContainer.appendChild(fragment);
}

createMokArray(PICTURES_LENGTH);
createFragments();


/* module4-task1 */

var uploadInput = document.querySelector('#upload-file');
var editForm = document.querySelector('.img-upload__overlay');
var closeFormBtn = editForm.querySelector('.img-upload__cancel');

var sliderPin = editForm.querySelector('.effect-level__pin');
var sliderLine = editForm.querySelector('.effect-level__line');
var sliderContainer = editForm.querySelector('.img-upload__effect-level');
var sliderInput = editForm.querySelector('.effect-level__value');
var DEFAULT_EFFECT_PERCENT = 100;

var radioBtns = editForm.querySelectorAll('.effects__radio');

var mainImg = editForm.querySelector('.img-upload__preview img');
//var effectBtns = editForm.querySelector('.effects__list .effects__item');

var ESC_KEYCODE = 27;
//var ENTER_KEYCODE = 13;

var zoomPlusBtn = editForm.querySelector('.scale__control--bigger');
var zoomMinusBtn = editForm.querySelector('.scale__control--smaller');
var zoomScale = editForm.querySelector('.scale__control--value');

var commentTextarea = editForm.querySelector('.text__description');

var Zoom = {
  'step': 25,
  'min': 25,
  'max': 100,
  'default': 100
};

//var Filter = {
//  'chrome': 'filter: grayscale(0..1)',
//  'sepia': 'filter: sepia(0..1)',
//  'marvin': 'filter: invert(0..100%)',
//  'phobos': 'filter: blur(0..1)',
//  'heat': 'filter: brightness(1..3)',
//};
/*  min max значения  */

function openEditForm() {
  editForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  zoomScale.value = Zoom['default'];
  zoomChange();
  effectChange(DEFAULT_EFFECT_PERCENT/*, effectName*/);
  sliderPin.style.left = (sliderLine.offsetWidth * DEFAULT_EFFECT_PERCENT / 100) + 'px';
  checkTextareaFocus();
}

function closeEditForm() {
  editForm.classList.add('hidden');
  uploadInput.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
}

function effectChange(percent/*, effectName*/) {
  sliderInput.setAttribute('value', percent);
  mainImg.style.cssText = 'transition: all .1s ease-out;' + 'filter: invert(' + percent + '%)';
}

function zoomChange() {
  zoomScale.setAttribute('value', zoomScale.value);
  mainImg.style.cssText = 'transition: all .1s ease-out';
  mainImg.style.transform = 'scale(' + zoomScale.value / 100 + ')';
}

function zoomPlus(currentZoom) {
  currentZoom = zoomScale.value;
  if (currentZoom < Zoom['max']) {
    zoomScale.value = parseInt(zoomScale.value) + Zoom['step'];
    zoomChange();
  }
}

function zoomMinus(currentZoom) {
  currentZoom = parseInt(zoomScale.value);
  if (currentZoom > Zoom['min']) {
    zoomScale.value -= Zoom['step'];
    zoomChange();
  }
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditForm();
  }
}

function calculatePercent(x, number) {
  return Math.round(100 / (number / x));
}

radioBtns.forEach(function (e) {
  e.addEventListener('click', function () {

    var effectName = e.value;
    mainImg.classList = '';
    mainImg.classList.add('effects__preview--' + effectName + '');

  });
});

uploadInput.addEventListener('change', function () {
  openEditForm();
});

closeFormBtn.addEventListener('click', function () {
  closeEditForm();
  editForm.value = '';
});

function checkTextareaFocus() {
  commentTextarea.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  }, true);

  commentTextarea.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
  }, true);
}

zoomPlusBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  zoomPlus();
});

zoomMinusBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  zoomMinus();
});

sliderPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var SLIDER_MIN = 0;
  var SLIDER_MAX = sliderLine.offsetWidth;
  var startCoords = {
    x: evt.clientX
  };  
  
  function onMouseMove (moveEvt) {
    moveEvt.preventDefault();
    
    var shift = {
      x: startCoords.x - moveEvt.clientX
    };
    var sliderCoords = sliderPin.offsetLeft - shift.x;
    
    startCoords = {
      x: moveEvt.clientX
    };

    if (sliderCoords <= SLIDER_MIN) {
      sliderPin.style.left = SLIDER_MIN + 'px';
    } else if (sliderCoords >= SLIDER_MAX) {
      sliderPin.style.left = SLIDER_MAX + 'px';
    } else {
      sliderPin.style.left = sliderCoords + 'px';
    }
    
    var effectPercent = calculatePercent(sliderCoords, SLIDER_MAX);
    effectChange(effectPercent/* , effectName*/);
  }
  
  function onMouseUp (upEvt) {
    upEvt.preventDefault();
    sliderContainer.removeEventListener('mousemove', onMouseMove);
    sliderContainer.removeEventListener('mouseup', onMouseUp);
  }
  
  sliderContainer.addEventListener('mousemove', onMouseMove);
  sliderContainer.addEventListener('mouseup', onMouseUp);
});

/* /module4-task1 */
