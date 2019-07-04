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

