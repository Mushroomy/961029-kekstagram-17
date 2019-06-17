'use strict';

var PICTURES_LENGTH = 25;
var picturesList = [];

function makeNumArray(min, max) {
  var numArray = [];
  var arrLength = max - min;
  for (var i = 0; i <= arrLength; i++) {
    numArray[i] = min;
    min += 1;
  }
  return numArray;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

var photosArray = makeNumArray(1, 25);
shuffleArray(photosArray);
var likesArray = makeNumArray(15, 200);
shuffleArray(likesArray);
var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createArray() {
  for (var i = 0; i < PICTURES_LENGTH; i++) {
    picturesList[i] = {
      url: 'photos/' + photosArray[i] + '.jpg',
      likes: likesArray[i],
      comments: commentsList[getRndInteger(0, commentsList.length)]
    };
  }
  return picturesList;
}

createArray();

var template = document.querySelector('#picture').content.querySelector('.picture');
var createPictures = function (picture) {
  var pictureElement = template.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;
  return pictureElement;
};
var picturesCont = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 0; i < picturesList.length; i++) {
  fragment.appendChild(createPictures(picturesList[i]));
}

picturesCont.appendChild(fragment);
