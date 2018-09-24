'use strict';

var GOOD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var IMAGES_PATH = 'img/cards/';
var IMAGE_ADDRESS = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];
var GOODS_AMOUNT = 26;
// var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MAP_PATH = 'img/map/';
var MAP_ADDRESS = ['academicheskaya.jpg', 'vasileostrovskaya.jpg', 'rechka.jpg', 'petrogradskaya.jpg', 'proletarskaya.jpg', 'vostaniya.jpg', 'prosvesheniya.jpg', 'frunzenskaya.jpg', 'chernishevskaya.jpg', 'tehinstitute.jpg'];
var RANGE_BTN_WIDTH = 10;
var RANGE_WIDTH = 245;

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');
var catalogCard = document.querySelector('#card').content.querySelector('.catalog__card');
var goodsCard = document.querySelector('#card-order').content.querySelector('.goods_card');
var goodsCards = document.querySelector('.goods__cards');
goodsCards.classList.remove('goods__cards--empty');

var paymentCardWrap = document.querySelector('.payment__card-wrap');
var cardNumber = paymentCardWrap.querySelector('input[name = "card-number"]');
var paymentCard = document.querySelector('#payment__card');
var paymentCash = document.querySelector('#payment__cash');
var paymentCashWrap = document.querySelector('.payment__cash-wrap');
var cardDate = paymentCardWrap.querySelector('input[name = "card-date"]');
var cardCvc = paymentCardWrap.querySelector('input[name = "card-cvc"]');
var cardholder = paymentCardWrap.querySelector('input[name = "cardholder"]');
var deliverStore = document.querySelector('#deliver__store');
var deliverCourier = document.querySelector('#deliver__courier');
var deliverStoreWrap = document.querySelector('.deliver__store');
var deliverCourierWrap = document.querySelector('.deliver__courier');
var deliverStreet = deliverCourierWrap.querySelector('input[name = "deliver-street"]');
var deliverHouse = deliverCourierWrap.querySelector('input[name = "deliver-house"]');
var deliverFloor = deliverCourierWrap.querySelector('input[name = "deliver-floor"]');
var deliverRoom = deliverCourierWrap.querySelector('input[name = "deliver-room"]');
var deliverDescription = deliverCourierWrap.querySelector('textarea[name = "deliver-description"]');
var storeAddress = document.querySelectorAll('input[name = "store"]');
var storeAddressMap = document.querySelector('.deliver__store-map-img');
// var orderCreationSuccess = document.querySelector('.order-creation__success');
// var orderCreationError = document.querySelector('.order-creation__error');
// var modalCloseSuccess = orderCreationSuccess.querySelector('.modal__close');
// var modalCloseError = orderCreationError.querySelector('.modal__close');
var buySubmitButton = document.querySelector('.buy__submit-btn');
var contactData = document.querySelector('.contact-data__inputs');
var contactDataName = contactData.querySelector('input[name = "name"]');
var contactDataTel = contactData.querySelector('input[name = "tel"]');
var contactDataEmail = contactData.querySelector('input[name = "email"]');
var paymentCardStatus = paymentCardWrap.querySelector('.payment__card-status');
var orderCreation = document.querySelector('.buy').querySelector('form');

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

var disableForm = function () {
  cardNumber.disabled = true;
  cardDate.disabled = true;
  cardCvc.disabled = true;
  cardholder.disabled = true;
  contactDataName.disabled = true;
  contactDataTel.disabled = true;
  contactDataEmail.disabled = true;
  deliverStreet.disabled = true;
  deliverHouse.disabled = true;
  deliverFloor.disabled = true;
  deliverRoom.disabled = true;
  deliverDescription.disabled = true;
  buySubmitButton.disabled = true;
};

disableForm();

var enableForm = function () {
  cardNumber.disabled = false;
  cardDate.disabled = false;
  cardCvc.disabled = false;
  cardholder.disabled = false;
  contactDataName.disabled = false;
  contactDataTel.disabled = false;
  contactDataEmail.disabled = false;
  if (deliverStoreWrap.classList.contains('visually-hidden')) {
    deliverStreet.disabled = false;
    deliverHouse.disabled = false;
    deliverFloor.disabled = false;
    deliverRoom.disabled = false;
    deliverDescription.disabled = false;
  }
  buySubmitButton.disabled = false;
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
  enableForm();
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
    disableForm();
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

var luhnAlgorithm = function () {
  var arr = cardNumber.value.split('');
  var digitSum = 0;
  for (var a = 0; a < arr.length; a++) {
    var digit = parseInt(arr[a], 10);
    if (a % 2 === 0) {
      var digit2X = digit * 2;
      digit = digit2X > 9 ? digit2X - 9 : digit2X;
    }
    digitSum += digit;
  }
  return digitSum % 10 === 0;
};

var choosePaymentCash = function () {
  paymentCashWrap.classList.remove('visually-hidden');
  paymentCardWrap.classList.add('visually-hidden');
  cardNumber.disabled = true;
  cardDate.disabled = true;
  cardCvc.disabled = true;
  cardholder.disabled = true;
  cardNumber.required = false;
  cardDate.required = false;
  cardCvc.required = false;
  cardholder.required = false;
};

var choosePaymentCard = function () {
  paymentCashWrap.classList.add('visually-hidden');
  paymentCardWrap.classList.remove('visually-hidden');
  cardNumber.disabled = false;
  cardDate.disabled = false;
  cardCvc.disabled = false;
  cardholder.disabled = false;
  cardNumber.required = true;
  cardDate.required = true;
  cardCvc.required = true;
  cardholder.required = true;
};

paymentCash.addEventListener('click', function () {
  choosePaymentCash();
});

paymentCash.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    choosePaymentCash();
  }
});

paymentCard.addEventListener('click', function () {
  choosePaymentCard();
});

paymentCard.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    choosePaymentCard();
  }
});

var chooseDeliverStore = function () {
  deliverStoreWrap.classList.remove('visually-hidden');
  deliverCourierWrap.classList.add('visually-hidden');
  deliverStreet.disabled = true;
  deliverHouse.disabled = true;
  deliverFloor.disabled = true;
  deliverRoom.disabled = true;
  deliverDescription.disabled = true;
  deliverStreet.required = false;
  deliverHouse.required = false;
  deliverRoom.required = false;
};

var chooseDeliverCourier = function () {
  deliverCourierWrap.classList.remove('visually-hidden');
  deliverStoreWrap.classList.add('visually-hidden');
  if (trolleyGoods.length > 0) {
    deliverStreet.disabled = false;
    deliverHouse.disabled = false;
    deliverFloor.disabled = false;
    deliverRoom.disabled = false;
    deliverDescription.disabled = false;
  }
  deliverStreet.required = true;
  deliverHouse.required = true;
  deliverRoom.required = true;
};

deliverStore.addEventListener('click', function () {
  chooseDeliverStore();
});

deliverStore.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    chooseDeliverStore();
  }
});

deliverCourier.addEventListener('click', function () {
  chooseDeliverCourier();
});

deliverCourier.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    chooseDeliverCourier();
  }
});

orderCreation.addEventListener('click', function () {
  for (var s = 0; s < storeAddress.length; s++) {
    if (storeAddress[s].checked) {
      storeAddressMap.src = MAP_PATH + MAP_ADDRESS[s];
    }
  }
});

cardNumber.addEventListener('blur', function () {
  if (!luhnAlgorithm()) {
    cardNumber.setCustomValidity('Номер банковской карты введен неверно');
  } else {
    cardNumber.setCustomValidity('');
  }
});

cardDate.addEventListener('blur', function () {
  if (!cardDate.checkValidity()) {
    cardDate.setCustomValidity('Дата указана неверно');
  } else {
    cardDate.setCustomValidity('');
  }
});

cardCvc.addEventListener('blur', function () {
  if (!cardCvc.checkValidity()) {
    cardCvc.setCustomValidity('Введите данные в указаном формате');
  } else {
    cardCvc.setCustomValidity('');
  }
});

cardholder.addEventListener('blur', function () {
  if (!cardholder.checkValidity()) {
    cardholder.setCustomValidity('Пожалуйста, введите имя');
  } else {
    cardholder.setCustomValidity('');
  }
});

var onCardInputsChange = function () {
  if (cardDate.checkValidity() && cardCvc.checkValidity() && cardholder.checkValidity() && luhnAlgorithm()) {
    paymentCardStatus.textContent = 'Одобрен';
  } else {
    paymentCardStatus.textContent = 'Неизвестен';
  }
};

cardNumber.addEventListener('change', onCardInputsChange);
cardDate.addEventListener('change', onCardInputsChange);
cardCvc.addEventListener('change', onCardInputsChange);
cardholder.addEventListener('change', onCardInputsChange);
/*
var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOrderCreationSuccess();
    closeOrderCreationError();
  }
};

var openOrderCreationSuccess = function () {
  orderCreationSuccess.classList.remove('modal--hidden');
  document.addEventListener('keydown', onModalEscPress);
};

var closeOrderCreationSuccess = function () {
  orderCreationSuccess.classList.add('modal--hidden');
  document.removeEventListener('keydown', onModalEscPress);
};

var openOrderCreationError = function () {
  orderCreationSuccess.classList.remove('modal--hidden');
  document.addEventListener('keydown', onModalEscPress);
};

var closeOrderCreationError = function () {
  orderCreationSuccess.classList.add('modal--hidden');
  document.removeEventListener('keydown', onModalEscPress);
};

modalCloseSuccess.addEventListener('click', function () {
  closeOrderCreationSuccess();
});

modalCloseSuccess.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeOrderCreationSuccess();
  }
});

modalCloseError.addEventListener('click', function () {
  closeOrderCreationError();
});

modalCloseError.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeOrderCreationError();
  }
});

if () {
  buySubmitButton.addEventListener('click', function() {
    openOrderCreationSuccess();
  });
  buySubmitButton.addEventListener('keydown', function() {
    openOrderCreationSuccess();
  });
} else {
  buySubmitButton.addEventListener('click', function() {
    openOrderCreationError();
  });
  buySubmitButton.addEventListener('keydown', function() {
    openOrderCreationError();
  });
}
*/

var catalogFilterRange = document.querySelector('.range__filter');
var leftRange = catalogFilterRange.querySelector('.range__btn--left');
var rightRange = catalogFilterRange.querySelector('.range__btn--right');
var rangePriceMin = document.querySelector('.range__price--min');
var rangePriceMax = document.querySelector('.range__price--max');
rangePriceMin.textContent = 0;
rangePriceMax.textContent = 100;
var rangeFillLine = document.querySelector('.range__fill-line');

var priceMx = Math.floor((rightRange.offsetLeft - RANGE_BTN_WIDTH / 2) / RANGE_WIDTH * 100);
var priceMn = Math.floor((leftRange.offsetLeft - RANGE_BTN_WIDTH / 2) / RANGE_WIDTH * 100);
rangePriceMax.textContent = priceMx;
rangePriceMin.textContent = priceMn;

var onLeftRangeMouseDown = function (evt) {
  evt.preventDefault();
  var startCoords = evt.clientX - RANGE_BTN_WIDTH / 2;
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    leftRange.style.left = (leftRange.offsetLeft - shift) + 'px';
    var leftRangePos = parseInt(leftRange.style.left, 10);

    rangeFillLine.style.left = leftRangePos + RANGE_BTN_WIDTH / 2 + 'px';

    if (leftRangePos < 0) {
      leftRange.style.left = '0px';
    } else if (leftRangePos > rightRange.offsetLeft) {
      leftRange.style.left = rightRange.offsetLeft + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!dragged) {
      leftRange.style.left = leftRange.offsetLeft + 'px';
    }

    var priceMin = Math.floor(parseInt(leftRange.style.left, 10) / RANGE_WIDTH * 100);
    rangePriceMin.textContent = priceMin;
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
leftRange.addEventListener('mousedown', onLeftRangeMouseDown);

var onRightRangeMouseDown = function (evt) {
  evt.preventDefault();
  var startCoords = evt.clientX - RANGE_BTN_WIDTH / 2;
  window.startCoordsR = startCoords;
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    rightRange.style.left = (rightRange.offsetLeft - shift) + 'px';
    var rightRangePos = parseInt(rightRange.style.left, 10);

    rangeFillLine.style.right = catalogFilterRange.offsetWidth - rightRangePos + 'px';
    
    if (rightRangePos > RANGE_WIDTH) {
      rightRange.style.left = RANGE_WIDTH + 'px';
    } else if (rightRangePos < leftRange.offsetLeft) {
      rightRange.style.left = leftRange.offsetLeft + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!dragged) {
      rightRange.style.left = rightRange.offsetLeft + 'px';
    }

    var priceMax = Math.floor(parseInt(rightRange.style.left, 10) / RANGE_WIDTH * 100);
    rangePriceMax.textContent = priceMax;
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
rightRange.addEventListener('mousedown', onRightRangeMouseDown);
