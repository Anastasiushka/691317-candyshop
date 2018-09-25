'use strict';

(function () {

  var GOOD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
  var IMAGES_PATH = 'img/cards/';
  var IMAGE_ADDRESS = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];
  var GOODS_AMOUNT = 26;
  var ENTER_KEYCODE = 13;
  window.ENTER_KEYCODE = ENTER_KEYCODE;

  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');
  var catalogCard = document.querySelector('#card').content.querySelector('.catalog__card');
  var goodsCard = document.querySelector('#card-order').content.querySelector('.goods_card');
  var goodsCards = document.querySelector('.goods__cards');
  goodsCards.classList.remove('goods__cards--empty');

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNumber;
  };

  var sugarTF = getRandomNumber(1, 2) === 1 ? 'Содержит сахар. ' : 'Без сахара. ';
  var compound = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
  var consistI = getRandomNumber(1, compound.length);
  var consist = '';
  for (var i = 1; i <= consistI; i++) {
    if (i < consistI) {
      consist += compound[getRandomNumber(0, compound.length - 1)] + ', ';
    } else {
      consist += compound[getRandomNumber(0, compound.length - 1)] + '.';
    }
  }

  var getDescription = function (descriptionNumber) {
    var descriptions = [];
    for (var j = 0; j < descriptionNumber; j++) {
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

  var renderCard = function (good) {
    var ratingClass = 'stars__rating--one';
    if (good.rating.value === 2) {
      ratingClass = 'stars__rating--two';
    } else if (good.rating.value === 3) {
      ratingClass = 'stars__rating--three';
    } else if (good.rating.value === 4) {
      ratingClass = 'stars__rating--four';
    } else if (good.rating.value === 5) {
      ratingClass = 'stars__rating--five';
    }

    var amountClass = 'card--little';
    if (good.amount > 5) {
      amountClass = 'card--in-stock';
    } else if (good.amount === 0) {
      amountClass = 'card--soon';
    }

    var goodElement = catalogCard.cloneNode(true);
    goodElement.classList.remove('card--in-stock');
    goodElement.classList.add(amountClass);
    goodElement.setAttribute('data-index', k);
    goodElement.querySelector('.card__title').textContent = good.name;
    goodElement.querySelector('.card__img').src = good.picture;
    goodElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency"> ₽ </span>' + '<span class="card__weight">/ ' + good.weight + ' Г</span>';
    goodElement.querySelector('.stars__rating').textContent = good.rating.value;
    var starsRating = goodElement.querySelector('.stars__rating');
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add(ratingClass);
    goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
    goodElement.querySelector('.card__characteristic').textContent = good.nutritionFacts.sugarTF + good.nutritionFacts.energy + ' ккал';
    goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.consist;
    return goodElement;
  };

  var fragment = document.createDocumentFragment();
  for (var k = 0; k < goods.length; k++) {
    fragment.appendChild(renderCard(goods[k]));
  }
  catalogCards.appendChild(fragment);

  var cardFavoriteBtn = catalogCards.querySelectorAll('.card__btn-favorite');
  var allCatalogCards = catalogCards.querySelectorAll('.catalog__card');
  var mainHeaderBasket = document.querySelector('.main-header__basket');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  var trolleyGoods = [];
  window.trolleyGoods = trolleyGoods;

  cardFavoriteBtn.forEach(function (element) {
    var onCardFavoriteBtnClick = function (evt) {
      evt.preventDefault();
      element.classList.toggle('.card__btn-favorite--selected');
    };
    element.addEventListener('click', onCardFavoriteBtnClick);
  });

  var renderTrolleyCard = function (trolleyGood) {
    var trolleyGoodElement = goodsCard.cloneNode(true);
    trolleyGoodElement.name = trolleyGood.name;
    trolleyGoodElement.querySelector('.card-order__title').textContent = trolleyGood.name;
    trolleyGoodElement.querySelector('.card-order__img').src = trolleyGood.picture;
    trolleyGoodElement.querySelector('.card-order__price').textContent = trolleyGood.price + ' ₽';
    trolleyGoodElement.querySelector('.card-order__count').value = trolleyGood.orderedAmount;

    var orderCardClose = trolleyGoodElement.querySelector('.card-order__close');
    var orderCardDecrease = trolleyGoodElement.querySelector('.card-order__btn--decrease');
    var orderCardIncrease = trolleyGoodElement.querySelector('.card-order__btn--increase');

    orderCardClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      deleteCard(trolleyGoodElement);
    });

    orderCardClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        deleteCard(trolleyGoodElement);
      }
    });

    orderCardDecrease.addEventListener('click', function (evt) {
      evt.preventDefault();
      decreaseOrderCardAmount(trolleyGoodElement);
    });

    orderCardDecrease.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        decreaseOrderCardAmount(trolleyGoodElement);
      }
    });

    orderCardIncrease.addEventListener('click', function (evt) {
      evt.preventDefault();
      increaseOrderCardAmount(trolleyGoodElement);
    });

    orderCardIncrease.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        increaseOrderCardAmount(trolleyGoodElement);
      }
    });

    return trolleyGoodElement;
  };

  var createTrolleyCard = function (chosenCard) {
    var chCard = {};
    Object.assign(chCard, chosenCard);
    delete chCard.amount;
    delete chCard.weight;
    delete chCard.rating;
    delete chCard.nutritionFacts;
    chCard.orderedAmount = 1;
    return chCard;
  };

  allCatalogCards.forEach(function (elt) {
    var cardBtn = elt.querySelector('.card__btn');
    var onCardBtnClick = function (evt) {
      evt.preventDefault();
      var eltData = elt.getAttribute('data-index');
      goodsCardEmpty.classList.add('visually-hidden');
      var chosenCard = goods[eltData];
      if (chosenCard.amount > 0) {
        chosenCard.amount -= 1;
        var trolleyCard = getTrolleyCard(chosenCard.name);
        if (trolleyCard) {
          trolleyCard.orderedAmount++;
        } else {
          trolleyGoods.push(createTrolleyCard(chosenCard));
        }
        renderTrolleyFragment();
      }
      updateBasketGoodsCount();
    };
    cardBtn.addEventListener('click', onCardBtnClick);
  });

  var renderTrolleyFragment = function () {
    window.enable.enableForm();
    var trolleyFragment = document.createDocumentFragment();
    for (var l = 0; l < trolleyGoods.length; l++) {
      trolleyFragment.appendChild(renderTrolleyCard(trolleyGoods[l]));
    }
    goodsCards.innerHTML = '<div class="goods__card-empty visually-hidden"><p><b>Странно, ты ещё ничего не добавил.</b></p><p>У нас столько всего вкусного и необычного, обязательно попробуй.</p></div>';
    goodsCards.appendChild(trolleyFragment);
  };

  var updateBasketGoodsCount = function () {
    if (trolleyGoods.length > 0) {
      var basketGoods = '';
      if (trolleyGoods.length < 2) {
        basketGoods = ' товар';
      } else if (trolleyGoods.length < 5) {
        basketGoods = ' товара';
      } else {
        basketGoods = ' товаров';
      }
      mainHeaderBasket.textContent = 'В корзине ' + trolleyGoods.length + basketGoods;
    } else {
      mainHeaderBasket.textContent = 'В корзине ничего нет';
      goodsCards.innerHTML = '<div class="goods__card-empty"><p><b>Странно, ты ещё ничего не добавил.</b></p><p>У нас столько всего вкусного и необычного, обязательно попробуй.</p></div>';
      window.disable.disableForm();
    }
  };

  var getCatalogDescCard = function (name) {
    return goods.find(function (currentGood) {
      return name === currentGood.name;
    });
  };

  var getTrolleyCard = function (name) {
    return trolleyGoods.find(function (currentGood) {
      return name === currentGood.name;
    });
  };

  var deleteCard = function (element) {
    var catalogDescCard = getCatalogDescCard(element.name);
    var trolleyCard = getTrolleyCard(element.name);
    catalogDescCard.amount += trolleyCard.orderedAmount;

    goodsCards.removeChild(element);
    for (var e = 0; e < trolleyGoods.length; e++) {
      if (element.name === trolleyGoods[e].name) {
        trolleyGoods.splice(e, 1);
      }
    }
    updateBasketGoodsCount();

    if (trolleyGoods.length > 0) {
      renderTrolleyFragment();
    }
  };

  var decreaseOrderCardAmount = function (element) {
    var catalogDescCard = getCatalogDescCard(element.name);
    var trolleyCard = getTrolleyCard(element.name);

    catalogDescCard.amount++;
    trolleyCard.orderedAmount--;

    if (trolleyCard.orderedAmount <= 0) {
      deleteCard(element);
    }
    if (trolleyGoods.length > 0) {
      renderTrolleyFragment();
    }
  };

  var increaseOrderCardAmount = function (element) {
    var catalogDescCard = getCatalogDescCard(element.name);
    var trolleyCard = getTrolleyCard(element.name);

    if (catalogDescCard.amount > 0) {
      catalogDescCard.amount--;
      trolleyCard.orderedAmount++;
    }
    renderTrolleyFragment();
  };

})();
