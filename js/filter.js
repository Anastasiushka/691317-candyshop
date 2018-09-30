'use strict';

(function () {

  var RANGE_BTN_WIDTH = 10;
  var RANGE_WIDTH = 245;

  var catalogFilterRange = document.querySelector('.range__filter');
  var leftRange = catalogFilterRange.querySelector('.range__btn--left');
  var rightRange = catalogFilterRange.querySelector('.range__btn--right');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  var rangeFillLine = document.querySelector('.range__fill-line');

  rangePriceMin.textContent = window.priceMin;
  rangePriceMax.textContent = window.priceMax;

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
    window.renderCards();
  });

  var loadSuccessHandler = function (objects) {

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

    itemBtnIcecream.addEventListener('click', window.debounce(function (evt) {
      var filterIcecreamData = document.querySelector('input[id = "filter-icecream"]');
      filterIcecream = filterIcecreamData.checked;
      window.renderCards();
    }));

    itemBtnSoda.addEventListener('click', window.debounce(function (evt) {
      var filterSodaData = document.querySelector('input[id = "filter-soda"]');
      filterSoda = filterSodaData.checked;
      window.renderCards();
    }));

    itemBtnGum.addEventListener('click', window.debounce(function (evt) {
      var filterGumData = document.querySelector('input[id = "filter-gum"]');
      filterGum = filterGumData.checked;
      window.renderCards();
    }));

    itemBtnMarmalade.addEventListener('click', window.debounce(function (evt) {
      var filterMarmaladeData = document.querySelector('input[id = "filter-marmalade"]');
      filterMarmalade = filterMarmaladeData.checked;
      window.renderCards();
    }));

    itemBtnMarshmallows.addEventListener('click', window.debounce(function (evt) {
      var filterMarshmallowsData = document.querySelector('input[id = "filter-marshmallows"]');
      filterMarshmallows = filterMarshmallowsData.checked;
      window.renderCards();
    }));

    itemBtnSugarFree.addEventListener('click', window.debounce(function (evt) {
      var filterSugarFreeData = document.querySelector('input[id = "filter-sugar-free"]');
      filterSugarFree = filterSugarFreeData.checked;
      window.renderCards();
    }));

    itemBtnVegetarian.addEventListener('click', window.debounce(function (evt) {
      var filterVegetarianData = document.querySelector('input[id = "filter-vegetarian"]');
      filterVegetarian = filterVegetarianData.checked;
      window.renderCards();
    }));

    itemBtnGlutenFree.addEventListener('click', window.debounce(function (evt) {
      var filterGlutenFreeData = document.querySelector('input[id = "filter-gluten-free"]');
      filterGlutenFree = filterGlutenFreeData.checked;
      window.renderCards();
    }));

    itemBtnPopular.addEventListener('click', window.debounce(function (evt) {
      sortState = 'popular';
      window.renderCards();
    }));

    itemBtnExpensive.addEventListener('click', window.debounce(function (evt) {
      sortState = 'expensive';
      window.renderCards();
    }));

    itemBtnCheep.addEventListener('click', window.debounce(function (evt) {
      sortState = 'cheep';
      window.renderCards();
    }));

    itemBtnRating.addEventListener('click', window.debounce(function (evt) {
      sortState = 'rating';
      window.renderCards();
    }));

    itemBtnFavorite.addEventListener('click', window.debounce(function (evt) {
      var filterAvailability = document.querySelector('input[id = "filter-availability"]');
      filterAvailability.checked = false;
      window.filterOnlyFavorite = !window.filterOnlyFavorite;
      if (window.filterOnlyFavorite) {
        filterOnlyAvailable = false;
      }
      window.renderCards();
    }));

    itemBtnAvailability.addEventListener('click', window.debounce(function (evt) {
      var filterFavorite = document.querySelector('input[id = "filter-favorite"]');
      filterFavorite.checked = false;
      filterOnlyAvailable = !filterOnlyAvailable;      
      if (filterOnlyAvailable) {
        window.filterOnlyFavorite = false;
      }
      window.renderCards();
    }));

    showEverything.addEventListener('click', window.debounce(function (evt) {
      var filterAvailabilityData = document.querySelector('input[id = "filter-availability"]');
      var filterFavoriteData = document.querySelector('input[id = "filter-favorite"]');
      var filterIcecreamData = document.querySelector('input[id = "filter-icecream"]');
      var filterSodaData = document.querySelector('input[id = "filter-soda"]');
      var filterGumData = document.querySelector('input[id = "filter-gum"]');
      var filterMarmaladeData = document.querySelector('input[id = "filter-marmalade"]');
      var filterMarshmallowsData = document.querySelector('input[id = "filter-marshmallows"]');
      var filterSugarFreeData = document.querySelector('input[id = "filter-sugar-free"]');
      var filterVegetarianData = document.querySelector('input[id = "filter-vegetarian"]');
      var filterGlutenFreeData = document.querySelector('input[id = "filter-gluten-free"]');

      filterAvailabilityData.checked = false;
      filterFavoriteData.checked = false;
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

      filterOnlyAvailable = false;
      window.filterOnlyFavorite = false;

      window.renderCards();
    }));

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

  var sortGoods = function(cards) {
    switch(sortState) {
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

      if (good.price < window.priceMin || good.price > window.priceMax) {
          return false;
      }

      if (hasKindFilters()) {
        switch(good.kind) {
          case 'Мороженое':
            if (!filterIcecream){
              return false;
            } 
            break;
          case 'Газировка':
            if (!filterSoda){
              return false;
            } 
            break;
          case 'Жевательная резинка':
            if (!filterGum){
              return false;
            } 
            break;
          case 'Мармелад':
            if (!filterMarmalade){
              return false;
            } 
            break;
          case 'Зефир':
            if (!filterMarshmallows){
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
  
  var updateMinPrice = function (v) {
      window.priceMin = Math.floor(v / RANGE_WIDTH * 100);
      rangePriceMin.textContent = window.priceMin;
  };

  var updateMaxPrice = function (v) {
      window.priceMax = Math.floor(v / RANGE_WIDTH * 100);
      rangePriceMax.textContent = window.priceMax;
  };

  var onLeftRangeMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = startCoords - moveEvt.clientX ;
      startCoords = moveEvt.clientX;

      var leftRangePos = leftRange.offsetLeft - shift;
      if (leftRangePos < 0) {
        leftRangePos = 0;
      } else if (leftRangePos > rightRange.offsetLeft) {
        leftRangePos = rightRange.offsetLeft;
      }

      leftRange.style.left = leftRangePos + 'px';
      rangeFillLine.style.left = leftRangePos + RANGE_BTN_WIDTH / 2+ 'px';
      updateMinPrice(parseInt(leftRange.style.left, 10));
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
      if (rightRangePos > RANGE_WIDTH) {
        rightRangePos = RANGE_WIDTH;
      } else if (rightRangePos < leftRange.offsetLeft) {
        rightRangePos = leftRange.offsetLeft;
      }

      rightRange.style.left = rightRangePos + 'px';
      rangeFillLine.style.right = catalogFilterRange.offsetWidth - rightRangePos - RANGE_BTN_WIDTH / 2+ 'px';
      updateMaxPrice(parseInt(rightRange.style.left, 10));
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

  window.checkFilter = checkFilter;
  window.sortGoods = sortGoods;
  window.backend.load(loadSuccessHandler, loadErrorHandler);
})();
