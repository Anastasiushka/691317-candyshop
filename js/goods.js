'use strict';

var GOOD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var IMAGE_ADDRESS = ['img/cards/garlic-cream.jpg', 'img/cards/cucumber-pedant.jpg', 'img/cards/milk-pig.jpg', 'img/cards/mushroom-shake.jpg', 'img/cards/eggpland-madness.jpg', 'img/cards/italian-joke.jpg', 'img/cards/wasabi-hit.jpg', 'img/cards/cunning-eggplant.jpg', 'img/cards/mustard-challenge.jpg', 'img/cards/cedar-velcro.jpg', 'img/cards/pocket-portwine.jpg', 'img/cards/chilean-bully.jpg', 'img/cards/becon-bang.jpg', 'img/cards/peanut-grapes.jpg', 'img/cards/celery-soul.jpg', 'img/cards/ear-in-bottle.jpg', 'img/cards/black-garlick.jpg', 'img/cards/russia.jpg', 'img/cards/sour-mine.jpg', 'img/cards/corn-morning.jpg', 'img/cards/caviar-reception.jpg', 'img/cards/new-year-mood.jpg', 'img/cards/for-beer.jpg', 'img/cards/miss-prawn.jpg', 'img/cards/endless-bang.jpg', 'img/cards/innocent-wine.jpg', 'img/cards/belgian-foam.jpg', 'img/cards/sharp-tongue.jpg'];

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('catalog__load');
catalogLoad.classList.add('visually-hidden');
var catalogCard = document.querySelector('.catalog__card');
var readyCard = document.querySelector(amountClass);
var goodsCard = document.querySelector('.goods_card');
var goodsCards = document.querySelector('.goods_cards');
goodsCards.classList.remove('goods__cards--empty');
var goodsCardEmpty = document.querySelector('.goods__card-empty');
goodsCardEmpty.classList.add('visually-hidden');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

var trueFalse = getRandomNumber(1, 2);
var sweetness = trueFalse === 2 ? false : true;
var sugarTF = sweetness ? 'Содержит сахар. ' : 'Без сахара. ';

var compound = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var consistI = getRandomNumber(1, compound.length);
var consist;
for (var i = 0; i <= consistI; i++) {
  if (i < consistI) {
    consist += compound[getRandomNumber(0, compound.length - 1)] + ', ';
  } else {
    consist += compound[getRandomNumber(0, compound.length - 1)] + '.';
  }
}

var goodsAmount = 26;
var getDescription = function (descriptionNumber) {
  var descriptions = [];
  for (var j = 1; j <= descriptionNumber; j++) {
    descriptions.push({
      name: GOOD_NAME[j],
      picture: IMAGE_ADDRESS[j],
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
var goods = getDescription(goodsAmount);

var amountClass = '.card--little';
if (goods.amount > 5) {
  amountClass = '.card--in-stock';
} if (goods.amount === 0) {
  amountClass = '.card--soon';
}
var ratingClass = '.stars__rating--one';
if (goods.rating.value === 2) {
  ratingClass = '.stars__rating--two';
} if (goods.rating.value === 3) {
  ratingClass = '.stars__rating--three';
} if (goods.rating.value === 4) {
  ratingClass = '.stars__rating--four';
} if (goods.rating.value === 5) {
  ratingClass = '.stars__rating--five';
}

var renderCard = function (good) {
  var goodElement = catalogCard.cloneNode(true);
  goodElement.querySelector('.card__title').textContent = good.name;
  goodElement.querySelector('.card__img').src = good.picture;
  goodElement.querySelector('.card__price').textContent = good.price + ' ';
  goodElement.querySelector('.card__weight').textContent = ' ' + good.weight + ' Г';
  goodElement.querySelector(ratingClass).textContent = good.rating.value;
  goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
  goodElement.querySelector('.card__characteristic').textContent = good.nutritionFacts.sugarTF + good.nutritionFacts.energy + ' ккал';
  goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.consist;
  return goodElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < goods.length; k++) {
  fragment.appendChild(renderCard(goods[k]));
}
readyCard.appendChild(fragment);


var trolleyGoodsAmount = 3;
var getTrolleyDescription = function (trolleyDescriptionNumber) {
  var trolleyDescriptions = [];
  for (var j = 1; j <= trolleyDescriptionNumber; j++) {
    trolleyDescriptions.push({
      name: GOOD_NAME[j],
      picture: IMAGE_ADDRESS[j],
      price: getRandomNumber(10, 150) * 10
    });
  }
  return trolleyDescriptions;
};
var trolleyGoods = getTrolleyDescription(trolleyGoodsAmount);

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
