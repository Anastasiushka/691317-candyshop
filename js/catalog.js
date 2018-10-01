'use strict';

(function () {
  var IMAGES_PATH = 'img/cards/';
  var ENTER_KEYCODE = 13;

  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');
  var catalogLoad = document.querySelector('.catalog__load');
  var catalogCard = document.querySelector('#card').content.querySelector('.catalog__card');
  var goodsCard = document.querySelector('#card-order').content.querySelector('.goods_card');
  var goodsCards = document.querySelector('.goods__cards');
  goodsCards.classList.remove('goods__cards--empty');
  var emptyFilters = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
  var mainHeaderBasket = document.querySelector('.main-header__basket');

  var goods = [];
  var trolleyGoods = [];
  var favoriteCount = 0;

  var renderCards = function () {

    var rendered = 0;
    var fragment = document.createDocumentFragment();
    catalogCards.innerHTML = '<p class="catalog__load visually-hidden">Данные загружаются...</p>';

    window.filter.sortGoods(goods);

    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];

      if (!window.filter.checkFilter(good)) {
        continue;
      }

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
      goodElement.setAttribute('data-index', i);
      goodElement.querySelector('.card__title').textContent = good.name;
      goodElement.querySelector('.card__img').src = IMAGES_PATH + good.picture;
      goodElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency"> ₽ </span>' + '<span class="card__weight">/ ' + good.weight + ' Г</span>';
      goodElement.querySelector('.stars__rating').textContent = good.rating.value;
      var starsRating = goodElement.querySelector('.stars__rating');
      starsRating.classList.remove('stars__rating--five');
      starsRating.classList.add(ratingClass);
      goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
      goodElement.querySelector('.card__characteristic').textContent = good.nutritionFacts.sugarTF + good.nutritionFacts.energy + ' ккал';
      goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.consist;

      if (good.inFavorite) {
        var cardFav = goodElement.querySelector('.card__btn-favorite');
        cardFav.classList.add('card__btn-favorite--selected');
      }

      fragment.appendChild(goodElement);
      rendered++;
    }
    catalogCards.appendChild(fragment);
    catalogLoad.classList.add('visually-hidden');
    addGoodsEvents();
    updateAvailableCount();
    updateFilteredCount();
    updateFavoriteCount();

    if (rendered === 0) {
      catalogCards.innerHTML = '';
      catalogCards.appendChild(emptyFilters);
    }

  };

  var updateFavoriteCount = function () {
    var itemCountFavorite = document.querySelector('.item-count__favorite');
    itemCountFavorite.textContent = '(' + favoriteCount + ')';
  };

  var updateAvailableCount = function () {
    var available = 0;
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.amount > 0) {
        available++;
      }
    }
    var itemCountAvailability = document.querySelector('.item-count__availability');
    itemCountAvailability.textContent = '(' + available + ')';
  };

  var updateFilteredCount = function () {
    var itemBtnRangeCount = document.querySelector('.range__count');
    var itemPriceRange = 0;
    var itemCountIcecream = 0;
    var itemCountSoda = 0;
    var itemCountGum = 0;
    var itemCountMarmalade = 0;
    var itemCountMarshmallows = 0;
    var itemCountSugarFree = 0;
    var itemCountVegetarian = 0;
    var itemCountGlutenFree = 0;
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.price < window.filter.price.min || good.price > window.filter.price.max) {
        continue;
      }
      itemPriceRange++;
      switch (good.kind) {
        case 'Мороженое':
          itemCountIcecream++;
          break;
        case 'Газировка':
          itemCountSoda++;
          break;
        case 'Жевательная резинка':
          itemCountGum++;
          break;
        case 'Мармелад':
          itemCountMarmalade++;
          break;
        case 'Зефир':
          itemCountMarshmallows++;
          break;
      }
      if (!good.nutritionFacts.sugar) {
        itemCountSugarFree++;
      }
      if (!good.nutritionFacts.gluten) {
        itemCountVegetarian++;
      }
      if (good.nutritionFacts.vegetarian) {
        itemCountGlutenFree++;
      }
    }
    document.querySelector('.item-count__icecream').textContent = '(' + itemCountIcecream + ')';
    document.querySelector('.item-count__soda').textContent = '(' + itemCountSoda + ')';
    document.querySelector('.item-count__gum').textContent = '(' + itemCountGum + ')';
    document.querySelector('.item-count__marmalade').textContent = '(' + itemCountMarmalade + ')';
    document.querySelector('.item-count__marshmallows').textContent = '(' + itemCountMarshmallows + ')';
    document.querySelector('.item-count__sugar-free').textContent = '(' + itemCountSugarFree + ')';
    document.querySelector('.item-count__gluten-free').textContent = '(' + itemCountVegetarian + ')';
    document.querySelector('.item-count__vegetarian').textContent = '(' + itemCountGlutenFree + ')';

    itemBtnRangeCount.textContent = '(' + itemPriceRange + ')';
  };

  var addGoodsEvents = function () {
    var goodsCardEmpty = document.querySelector('.goods__card-empty');
    var allCatalogCards = catalogCards.querySelectorAll('.catalog__card');

    allCatalogCards.forEach(function (elt) {
      var cardFav = elt.querySelector('.card__btn-favorite');
      var onCardFavoriteBtnClick = function (evt) {
        evt.preventDefault();
        var eltData = elt.getAttribute('data-index');
        if (goods[eltData].inFavorite) {
          cardFav.classList.remove('card__btn-favorite--selected');
          goods[eltData].inFavorite = false;
          favoriteCount--;
          if (window.filterOnlyFavorite) {
            renderCards();
          }
        } else {
          cardFav.classList.add('card__btn-favorite--selected');
          goods[eltData].inFavorite = true;
          favoriteCount++;
        }
        updateFavoriteCount();
      };
      cardFav.addEventListener('click', onCardFavoriteBtnClick);

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
  };

  var renderTrolleyCard = function (trolleyGood) {
    var trolleyGoodElement = goodsCard.cloneNode(true);
    trolleyGoodElement.name = trolleyGood.name;
    trolleyGoodElement.querySelector('.card-order__title').textContent = trolleyGood.name;
    trolleyGoodElement.querySelector('.card-order__img').src = IMAGES_PATH + trolleyGood.picture;
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

  var loadSuccessHandler = function (objects) {
    goods = objects;
    for (var i = 0; i < goods.length; i++) {
      goods[i].inFavorite = false;
    }
    renderCards();
    updateFilteredCount();
    updateFavoriteCount();
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);

  window.catalog = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    trolleyGoods: trolleyGoods,
    goods: goods,
    renderCards: renderCards,
  };
})();
