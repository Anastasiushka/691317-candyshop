'use strict';

(function () {

  var RANGE_BTN_WIDTH = 10;
  var RANGE_WIDTH = 245;

  var priceMin = 0;
  var priceMax = 100;

  var catalogFilterRange = document.querySelector('.range__filter');
  var leftRange = catalogFilterRange.querySelector('.range__btn--left');
  var rightRange = catalogFilterRange.querySelector('.range__btn--right');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  var rangeFillLine = document.querySelector('.range__fill-line');

  var filterIcecream = false;
  var filterSoda = false;
  var filterGum = false;
  var filterMarmalade = false;
  var filterMarshmallows = false;

  var filterSugarFree = false;
  var filterVegetarian = false;
  var filterGlutenFree = false;

  var filterOnlyAvailable = false;
  window.filterOnlyFavorite = false;

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

    filterIcecream = false;
    filterSoda = false;
    filterGum = false;
    filterMarmalade = false;
    filterMarshmallows = false;

    filterSugarFree = false;
    filterVegetarian = false;
    filterGlutenFree = false;

    setPrices(0, 100);
  };

  var loadSuccessHandler = function () {

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

    updateMinPrice(leftRange.offsetLeft);
    updateMaxPrice(rightRange.offsetLeft);

    itemBtnIcecream.addEventListener('click', window.debounce(function () {
      var filterIcecreamData = document.querySelector('input[id = "filter-icecream"]');
      filterIcecream = filterIcecreamData.checked;
      window.catalog.renderCards();
    }));

    itemBtnSoda.addEventListener('click', window.debounce(function () {
      var filterSodaData = document.querySelector('input[id = "filter-soda"]');
      filterSoda = filterSodaData.checked;
      window.catalog.renderCards();
    }));

    itemBtnGum.addEventListener('click', window.debounce(function () {
      var filterGumData = document.querySelector('input[id = "filter-gum"]');
      filterGum = filterGumData.checked;
      window.catalog.renderCards();
    }));

    itemBtnMarmalade.addEventListener('click', window.debounce(function () {
      var filterMarmaladeData = document.querySelector('input[id = "filter-marmalade"]');
      filterMarmalade = filterMarmaladeData.checked;
      window.catalog.renderCards();
    }));

    itemBtnMarshmallows.addEventListener('click', window.debounce(function () {
      var filterMarshmallowsData = document.querySelector('input[id = "filter-marshmallows"]');
      filterMarshmallows = filterMarshmallowsData.checked;
      window.catalog.renderCards();
    }));

    itemBtnSugarFree.addEventListener('click', window.debounce(function () {
      var filterSugarFreeData = document.querySelector('input[id = "filter-sugar-free"]');
      filterSugarFree = filterSugarFreeData.checked;
      window.catalog.renderCards();
    }));

    itemBtnVegetarian.addEventListener('click', window.debounce(function () {
      var filterVegetarianData = document.querySelector('input[id = "filter-vegetarian"]');
      filterVegetarian = filterVegetarianData.checked;
      window.catalog.renderCards();
    }));

    itemBtnGlutenFree.addEventListener('click', window.debounce(function () {
      var filterGlutenFreeData = document.querySelector('input[id = "filter-gluten-free"]');
      filterGlutenFree = filterGlutenFreeData.checked;
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
      window.filterOnlyFavorite = filterFavoriteData.checked;
      if (window.filterOnlyFavorite) {
        filterOnlyAvailable = false;
      }
      window.catalog.renderCards();
    }));

    itemBtnAvailability.addEventListener('click', window.debounce(function () {
      resetFilters();
      var filterAvailabilityData = document.querySelector('input[id = "filter-availability"]');
      var filterFavoriteData = document.querySelector('input[id = "filter-favorite"]');
      filterFavoriteData.checked = false;
      filterOnlyAvailable = filterAvailabilityData.checked;
      if (filterOnlyAvailable) {
        window.filterOnlyFavorite = false;
      }
      window.catalog.renderCards();
    }));

    showEverything.addEventListener('click', window.debounce(function () {
      resetFilters();
      var filterAvailabilityData = document.querySelector('input[id = "filter-availability"]');
      var filterFavoriteData = document.querySelector('input[id = "filter-favorite"]');
      filterAvailabilityData.checked = false;
      filterFavoriteData.checked = false;
      filterOnlyAvailable = false;
      window.filterOnlyFavorite = false;
      window.catalog.renderCards();
    }));
    setPrices(window.filter.priceMin, window.filter.priceMax);
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

  var hasKindFilters = function () {
    return filterIcecream || filterSoda || filterGum || filterMarmalade || filterMarshmallows;
  };

  var hasNutritionFilters = function () {
    return filterSugarFree || filterVegetarian || filterGlutenFree;
  };

  var sortGoods = function (cards) {
    switch (sortState) {
      case 'popular':
        cards.sort(function (a, b) {
          return b.rating - a.rating;
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

    if (filterOnlyAvailable) {
      if (good.amount === 0) {
        return false;
      }
      return true;
    }

    if (good.price < window.filter.priceMin || good.price > window.filter.priceMax) {
      return false;
    }

    if (hasKindFilters()) {
      switch (good.kind) {
        case 'Мороженое':
          if (!filterIcecream) {
            return false;
          }
          break;
        case 'Газировка':
          if (!filterSoda) {
            return false;
          }
          break;
        case 'Жевательная резинка':
          if (!filterGum) {
            return false;
          }
          break;
        case 'Мармелад':
          if (!filterMarmalade) {
            return false;
          }
          break;
        case 'Зефир':
          if (!filterMarshmallows) {
            return false;
          }
          break;
      }
    }

    if (hasNutritionFilters()) {
      if (good.nutritionFacts.sugar && filterSugarFree) {
        return false;
      }
      if (good.nutritionFacts.gluten && filterGlutenFree) {
        return false;
      }
      if (!good.nutritionFacts.vegetarian && filterVegetarian) {
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
      window.filter.priceMin = 0;
    } else {
      window.filter.priceMin = Math.floor(pos / RANGE_WIDTH * 100);
    }

    rangePriceMin.textContent = window.filter.priceMin;

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
      window.filter.priceMax = 0;
    } else {
      window.filter.priceMax = Math.floor(pos / RANGE_WIDTH * 100);
    }

    rangePriceMax.textContent = window.filter.priceMax;

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

  window.backend.load(loadSuccessHandler, loadErrorHandler);

  window.filter = {
    checkFilter: checkFilter,
    sortGoods: sortGoods,
    priceMin: priceMin,
    priceMax: priceMax,
    setPrices: setPrices
  };
})();
