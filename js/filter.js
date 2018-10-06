'use strict';

(function () {

  var RANGE_BTN_WIDTH = 10;
  var RANGE_WIDTH = 245;

  var price = {
    min: 0,
    max: 0
  };

  var catalogFilterRange = document.querySelector('.range__filter');
  var leftRange = catalogFilterRange.querySelector('.range__btn--left');
  var rightRange = catalogFilterRange.querySelector('.range__btn--right');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  var rangeFillLine = document.querySelector('.range__fill-line');

  var filters = {
    icecream: false,
    soda: false,
    gum: false,
    marmalade: false,
    marshmallows: false,

    sugarFree: false,
    vegetarian: false,
    glutenFree: false,

    onlyAvailable: false,
    onlyFavorite: false
  };

  var sortState = 'popular';

  var updatePriceDebounce = window.debounce(function () {
    window.catalog.renderCards();
  });

  var resetFilters = function () {
    var filterIcecreamData = document.querySelector('input[id = "filter-icecream"]');
    var filterSodaData = document.querySelector('input[id = "filter-soda"]');
    var filterGumData = document.querySelector('input[id = "filter-gum"]');
    var filterMarmaladeData = document.querySelector('input[id = "filter-marmalade"]');
    var filterMarshmallowsData = document.querySelector('input[id = "filter-marshmallows"]');
    var filterSugarFreeData = document.querySelector('input[id = "filter-sugar-free"]');
    var filterVegetarianData = document.querySelector('input[id = "filter-vegetarian"]');
    var filterGlutenFreeData = document.querySelector('input[id = "filter-gluten-free"]');

    filterIcecreamData.checked = false;
    filterSodaData.checked = false;
    filterGumData.checked = false;
    filterMarmaladeData.checked = false;
    filterMarshmallowsData.checked = false;
    filterSugarFreeData.checked = false;
    filterVegetarianData.checked = false;
    filterGlutenFreeData.checked = false;

    filters.icecream = false;
    filters.soda = false;
    filters.gum = false;
    filters.marmalade = false;
    filters.marshmallows = false;

    filters.sugarFree = false;
    filters.vegetarian = false;
    filters.glutenFree = false;

    setPrices(0, 100);
  };

  var listenButtonEvents = function () {

    var itemBtnIcecream = document.querySelector('.items-count__icecream');
    var itemBtnSoda = document.querySelector('.items-count__soda');
    var itemBtnGum = document.querySelector('.items-count__gum');
    var itemBtnMarmalade = document.querySelector('.items-count__marmalade');
    var itemBtnMarshmallows = document.querySelector('.items-count__marshmallows');
    var itemBtnSugarFree = document.querySelector('.items-count__sugar-free');
    var itemBtnVegetarian = document.querySelector('.items-count__vegetarian');
    var itemBtnGlutenFree = document.querySelector('.items-count__gluten-free');

    var itemBtnFavorite = document.querySelector('.items-count__favorite');
    var itemBtnAvailability = document.querySelector('.items-count__availability');

    var itemBtnPopular = document.querySelector('.items-count__popular');
    var itemBtnExpensive = document.querySelector('.items-count__expensive');
    var itemBtnCheep = document.querySelector('.items-count__cheep');
    var itemBtnRating = document.querySelector('.items-count__rating');

    var showEverything = document.querySelector('.catalog__submit');

    itemBtnIcecream.addEventListener('click', window.debounce(function () {
      var filterIcecreamData = document.querySelector('input[id = "filter-icecream"]');
      filters.icecream = filterIcecreamData.checked;
      window.catalog.renderCards();
    }));

    itemBtnSoda.addEventListener('click', window.debounce(function () {
      var filterSodaData = document.querySelector('input[id = "filter-soda"]');
      filters.soda = filterSodaData.checked;
      window.catalog.renderCards();
    }));

    itemBtnGum.addEventListener('click', window.debounce(function () {
      var filterGumData = document.querySelector('input[id = "filter-gum"]');
      filters.gum = filterGumData.checked;
      window.catalog.renderCards();
    }));

    itemBtnMarmalade.addEventListener('click', window.debounce(function () {
      var filterMarmaladeData = document.querySelector('input[id = "filter-marmalade"]');
      filters.marmalade = filterMarmaladeData.checked;
      window.catalog.renderCards();
    }));

    itemBtnMarshmallows.addEventListener('click', window.debounce(function () {
      var filterMarshmallowsData = document.querySelector('input[id = "filter-marshmallows"]');
      filters.marshmallows = filterMarshmallowsData.checked;
      window.catalog.renderCards();
    }));

    itemBtnSugarFree.addEventListener('click', window.debounce(function () {
      var filterSugarFreeData = document.querySelector('input[id = "filter-sugar-free"]');
      filters.sugarFree = filterSugarFreeData.checked;
      window.catalog.renderCards();
    }));

    itemBtnVegetarian.addEventListener('click', window.debounce(function () {
      var filterVegetarianData = document.querySelector('input[id = "filter-vegetarian"]');
      filters.vegetarian = filterVegetarianData.checked;
      window.catalog.renderCards();
    }));

    itemBtnGlutenFree.addEventListener('click', window.debounce(function () {
      var filterGlutenFreeData = document.querySelector('input[id = "filter-gluten-free"]');
      filters.glutenFree = filterGlutenFreeData.checked;
      window.catalog.renderCards();
    }));

    itemBtnPopular.addEventListener('click', window.debounce(function () {
      sortState = 'popular';
      window.catalog.renderCards();
    }));

    itemBtnExpensive.addEventListener('click', window.debounce(function () {
      sortState = 'expensive';
      window.catalog.renderCards();
    }));

    itemBtnCheep.addEventListener('click', window.debounce(function () {
      sortState = 'cheep';
      window.catalog.renderCards();
    }));

    itemBtnRating.addEventListener('click', window.debounce(function () {
      sortState = 'rating';
      window.catalog.renderCards();
    }));

    itemBtnFavorite.addEventListener('click', window.debounce(function () {
      resetFilters();
      var filterFavoriteData = document.querySelector('input[id = "filter-favorite"]');
      var filterAvailabilityData = document.querySelector('input[id = "filter-availability"]');
      filterAvailabilityData.checked = false;
      window.filters.onlyFavorite = filterFavoriteData.checked;
      if (window.filters.onlyFavorite) {
        filters.onlyAvailable = false;
      }
      window.catalog.renderCards();
    }));

    itemBtnAvailability.addEventListener('click', window.debounce(function () {
      resetFilters();
      var filterAvailabilityData = document.querySelector('input[id = "filter-availability"]');
      var filterFavoriteData = document.querySelector('input[id = "filter-favorite"]');
      filterFavoriteData.checked = false;
      filters.onlyAvailable = filterAvailabilityData.checked;
      if (filters.onlyAvailable) {
        window.filters.onlyFavorite = false;
      }
      window.catalog.renderCards();
    }));

    showEverything.addEventListener('click', window.debounce(function () {
      resetFilters();
      var filterAvailabilityData = document.querySelector('input[id = "filter-availability"]');
      var filterFavoriteData = document.querySelector('input[id = "filter-favorite"]');
      filterAvailabilityData.checked = false;
      filterFavoriteData.checked = false;
      filters.onlyAvailable = false;
      window.filters.onlyFavorite = false;
      window.catalog.renderCards();
    }));
  };

  var hasKindFilters = function () {
    return filters.icecream || filters.soda || filters.gum || filters.marmalade || filters.marshmallows;
  };

  var hasNutritionFilters = function () {
    return filters.sugarFree || filters.vegetarian || filters.glutenFree;
  };

  var sortGoods = function (cards) {
    switch (sortState) {
      case 'popular':
        cards.sort(function (a, b) {
          return a.rating < b.rating ? 1 : -1;
        });
        break;
      case 'expensive':
        cards.sort(function (a, b) {
          return a.price < b.price ? 1 : -1;
        });
        break;
      case 'cheep':
        cards.sort(function (a, b) {
          return a.price < b.price ? -1 : 1;
        });
        break;
      case 'rating':
        cards.sort(function (a, b) {
          return a.rating.value < b.rating.value ? 1 : -1;
        });
        break;
    }
  };

  var checkFilter = function (good) {

    if (window.filters.onlyFavorite && !good.inFavorite) {
      return false;
    }

    if (filters.onlyAvailable) {
      if (good.amount === 0) {
        return false;
      }
      return true;
    }

    if (good.price < price.min || good.price > price.max) {
      return false;
    }

    if (hasKindFilters()) {
      switch (good.kind) {
        case 'Мороженое':
          if (!filters.icecream) {
            return false;
          }
          break;
        case 'Газировка':
          if (!filters.soda) {
            return false;
          }
          break;
        case 'Жевательная резинка':
          if (!filters.gum) {
            return false;
          }
          break;
        case 'Мармелад':
          if (!filters.marmalade) {
            return false;
          }
          break;
        case 'Зефир':
          if (!filters.marshmallows) {
            return false;
          }
          break;
      }
    }

    if (hasNutritionFilters()) {
      if (good.nutritionFacts.sugar && filters.sugarFree) {
        return false;
      }
      if (good.nutritionFacts.gluten && filters.glutenFree) {
        return false;
      }
      if (!good.nutritionFacts.vegetarian && filters.vegetarian) {
        return false;
      }
    }
    return true;
  };

  var updateMinPrice = function (pos) {

    if (pos < 0) {
      pos = 0;
    } else if (pos > rightRange.offsetLeft) {
      pos = rightRange.offsetLeft;
    }

    if (pos === 0) {
      price.min = 0;
    } else {
      price.min = Math.floor(pos / RANGE_WIDTH * 100);
    }

    rangePriceMin.textContent = price.min;

    leftRange.style.left = pos + 'px';
    rangeFillLine.style.left = pos + RANGE_BTN_WIDTH / 2 + 'px';

  };

  var updateMaxPrice = function (pos) {

    if (pos > RANGE_WIDTH) {
      pos = RANGE_WIDTH;
    } else if (pos < leftRange.offsetLeft) {
      pos = leftRange.offsetLeft;
    }

    if (pos === 0) {
      price.max = 0;
    } else {
      price.max = Math.floor(pos / RANGE_WIDTH * 100);
    }

    rangePriceMax.textContent = price.max;

    rightRange.style.left = pos + 'px';
    rangeFillLine.style.right = catalogFilterRange.offsetWidth - pos - RANGE_BTN_WIDTH / 2 + 'px';

  };

  var setPrices = function (min, max) {
    var pmin = min * RANGE_WIDTH / 100;
    var pmax = max * RANGE_WIDTH / 100;
    updateMinPrice(pmin);
    updateMaxPrice(pmax);
  };

  var onLeftRangeMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      var leftRangePos = leftRange.offsetLeft - shift;
      updateMinPrice(leftRangePos);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!dragged) {
        leftRange.style.left = leftRange.offsetLeft + 'px';
      }
      updateMinPrice(parseInt(leftRange.style.left, 10));
      updatePriceDebounce();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  leftRange.addEventListener('mousedown', onLeftRangeMouseDown);

  var onRightRangeMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      var rightRangePos = rightRange.offsetLeft - shift;
      updateMaxPrice(rightRangePos);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!dragged) {
        rightRange.style.left = rightRange.offsetLeft + 'px';
      }
      updateMaxPrice(parseInt(rightRange.style.left, 10));
      updatePriceDebounce();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  rightRange.addEventListener('mousedown', onRightRangeMouseDown);

  var loadSuccessHandler = function () {
    updateMinPrice(leftRange.offsetLeft);
    updateMaxPrice(rightRange.offsetLeft);
    listenButtonEvents();
    setPrices(price.min, price.max);
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

  window.filters = filters;

  window.filter = {
    checkFilter: checkFilter,
    sortGoods: sortGoods,
    price: price,
    setPrices: setPrices
  };
})();
