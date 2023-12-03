import { settings, select } from './../settings.js';

class AmountWidget {
  constructor(element) {
    const thisWidget = this;
    thisWidget.getElements(element);
    thisWidget.min = settings.amountWidget.defaultMin;
    thisWidget.max = settings.amountWidget.defaultMax;
    thisWidget.defaultValue = settings.amountWidget.defaultValue;
    thisWidget.setValue(thisWidget.input.value || thisWidget.defaultValue);
    thisWidget.initActions();
  }

  getElements(element) {
    const thisWidget = this;
    thisWidget.element = element;

    thisWidget.input = thisWidget.element.querySelector(
      select.widgets.amount.input
    );

    thisWidget.linkDecrease = thisWidget.element.querySelector(
      select.widgets.amount.linkDecrease
    );
    thisWidget.linkIncrease = thisWidget.element.querySelector(
      select.widgets.amount.linkIncrease
    );
    thisWidget.previousValue = thisWidget.input.value;
  }
  setValue(value) {
    const thisWidget = this;

    const newValue = parseInt(value);

    if (
      thisWidget !== newValue &&
      !isNaN(newValue) &&
      newValue >= thisWidget.min &&
      newValue <= thisWidget.max
    ) {
      thisWidget.value = newValue;
    }

    thisWidget.input.value = thisWidget.value;
    thisWidget.announce();
  }
  initActions() {
    const thisWidget = this;
    thisWidget.input.addEventListener('change', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.input.value);
    });
    thisWidget.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });
    thisWidget.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }
  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true,
    });
    thisWidget.element.dispatchEvent(event);
  }
}
export default AmountWidget;
