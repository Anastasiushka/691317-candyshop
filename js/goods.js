'use strict';

var GOOD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var IMAGES_PATH = 'img/cards/';
var IMAGE_ADDRESS = ['garlic-cream.jpg', 'cucumber-pedant.jpg', 'milk-pig.jpg', 'mushroom-shake.jpg', 'eggpland-madness.jpg', 'italian-joke.jpg', 'wasabi-hit.jpg', 'cunning-eggplant.jpg', 'mustard-challenge.jpg', 'cedar-velcro.jpg', 'pocket-portwine.jpg', 'chilean-bully.jpg', 'becon-bang.jpg', 'peanut-grapes.jpg', 'celery-soul.jpg', 'ear-in-bottle.jpg', 'black-garlick.jpg', 'russia.jpg', 'sour-mine.jpg', 'corn-morning.jpg', 'caviar-reception.jpg', 'new-year-mood.jpg', 'for-beer.jpg', 'miss-prawn.jpg', 'endless-bang.jpg', 'innocent-wine.jpg', 'belgian-foam.jpg', 'sharp-tongue.jpg'];
var GOODS_AMOUNT = 26;
var TROLLEY_GOODS_AMOUNT = 3;

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');
var catalogCard = document.querySelector('#card').content.querySelector('.catalog__card');
var readyCard = document.querySelector(amountClass);
var goodsCard = document.querySelector('.goods_card');
var goodsCards = document.querySelector('.goods__cards');
goodsCards.classList.remove('goods__cards--empty');
var goodsCardEmpty = document.querySelector('.goods__card-empty');
goodsCardEmpty.classList.add('visually-hidden');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

var sugarTF = getRandomNumber(1, 2) === 1 ? 'Содержит сахар. ' : 'Без сахара. ';
var compound = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var consistI = getRandomNumber(1, compound.length);
var consist;
for (var i = 1; i <= consistI; i++) {
  if (i < consistI) {
    consist += compound[getRandomNumber(0, compound.length - 1)] + ', ';
  } else {
    consist += compound[getRandomNumber(0, compound.length - 1)] + '.';
  }
}

var getDescription = function (descriptionNumber) {
  var descriptions = [];
  for (var j = 1; j <= descriptionNumber; j++) {
    descriptions.push({
      name: GOOD_NAME[j],
      picture: IMAGES_PATH + IMAGE_ADDRESS[j],
      amount: getRandomNumber(0, 20),
      price: getRandomNumber(10, 150) * 10,
      weight: getRandomNumber(30, 300),
      rating: {
        value: getRandomNumber(1, 5),
        number: getRandomNumber(10, 900)
      },
      nutritionFacts: {
        sugar: sugarTF,
        energy: getRandomNumber(70, 500),
        contents: consist
      }
    });
  }
  return descriptions;
};
var goods = getDescription(GOODS_AMOUNT);

var amountClass = '.card--little';
if (goods.amount > 5) {
  amountClass = '.card--in-stock';
} else if (goods.amount === 0) {
  amountClass = '.card--soon';
}
var ratingClass = '.stars__rating--one';
if (goods.value === 2) {
  ratingClass = '.stars__rating--two';
} else if (goods.value === 3) {
  ratingClass = '.stars__rating--three';
} else if (goods.value === 4) {
  ratingClass = '.stars__rating--four';
} else if (goods.value === 5) {
  ratingClass = '.stars__rating--five';
}

var renderCard = function (good) {
  var goodElement = catalogCard.cloneNode(true);
  goodElement.querySelector('.card__title').textContent = good.name;
  goodElement.querySelector('.card__img').src = good.picture;
  goodElement.querySelector('.card__price').textContent = good.price + ' ';
  goodElement.querySelector('.card__weight').textContent = '/ ' + good.weight + ' Г';
  goodElement.querySelector(ratingClass).textContent = good.value;
  goodElement.querySelector('.star__count').textContent = '(' + good.number + ')';
  goodElement.querySelector('.card__characteristic').textContent = good.sugarTF + good.energy + ' ккал';
  goodElement.querySelector('.card__composition-list').textContent = good.consist;
  return goodElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < goods.length; k++) {
  fragment.appendChild(renderCard(goods[k]));
}
readyCard.appendChild(fragment);


var getTrolleyDescription = function (trolleyDescriptionNumber) {
  var trolleyDescriptions = [];
  for (var j = 1; j <= trolleyDescriptionNumber; j++) {
    trolleyDescriptions.push({
      name: GOOD_NAME[j],
      picture: IMAGES_PATH + IMAGE_ADDRESS[j],
      price: getRandomNumber(10, 150) * 10
    });
  }
  return trolleyDescriptions;
};
var trolleyGoods = getTrolleyDescription(TROLLEY_GOODS_AMOUNT);

var renderTrolleyCard = function (trolleyGood) {
  var trolleyGoodElement = goodsCard.cloneNode(true);
  trolleyGoodElement.querySelector('.card-order__title').textContent = trolleyGood.name;
  trolleyGoodElement.querySelector('.card-order__img').src = trolleyGood.picture;
  trolleyGoodElement.querySelector('.card-order__price').textContent = trolleyGood.price + ' ₽';
  return trolleyGoodElement;
};

var trolleyFragment = document.createDocumentFragment();
for (var l = 0; l < trolleyGoods.length; l++) {
  trolleyFragment.appendChild(renderTrolleyCard(trolleyGoods[l]));
}
goodsCards.appendChild(trolleyFragment);
