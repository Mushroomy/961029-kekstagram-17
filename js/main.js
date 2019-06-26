'use strict';

var PICTURES_LENGTH = 25;
var picturesList = [];
var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var template = document.querySelector('#picture').content.querySelector('.picture');

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createMokArray(quantity) {
  for (var i = 0; i < quantity; i++) {
    picturesList[i] = {
      url: 'photos/' + getRndInteger(1, 25) + '.jpg',
      likes: getRndInteger(15, 200),
      comments: commentsList
    };
  }
  return picturesList;
}

function createPictures(picture) {
  var pictureElement = template.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
}

function createFragments() {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picturesList.length; i++) {
    fragment.appendChild(createPictures(picturesList[i]));
  }
  picturesContainer.appendChild(fragment);
}

createMokArray(PICTURES_LENGTH);
createFragments();

