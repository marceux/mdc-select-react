/* eslint-disable no-underscore-dangle */
import { MDCFoundation } from '@material/base/dist/mdc.base';

class DatalistFoundation extends MDCFoundation {
  static get defaultAdapter() {
    return {
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      registerInputEventHandler: () => {},
      deregisterInputEventHandler: () => {},
      registerBtnEventHandler: () => {},
      deregisterBtnEventHandler: () => {},
      registerInteractionEventHandler: () => {},
      deregisterInteractionEventHandler: () => {},
      registerDocumentEventHandler: () => {},
      deregisterDocumentEventHandler: () => {},
      isInputFocused: () => {},
      matchExists: () => {},
      focusOnElementAtIndex: () => {},
      getIndexForEventTarget: () => {},
      getNumberOfItems: () => {},
      selectItemAtIndex: () => {},
      notifyCancel: () => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(DatalistFoundation.defaultAdapter, adapter));

    // Default values for component
    this.isOpen_ = false;
  }

  init() {
    this.adapter_.registerInputEventHandler('click', this.inputClickHandler_);
    this.adapter_.registerInputEventHandler('keydown', this.inputKeyDownHandler_);

    this.adapter_.registerBtnEventHandler('click', this.toggle);

    this.adapter_.registerInteractionEventHandler('click', this.itemClickHandler_);
    this.adapter_.registerInteractionEventHandler('keydown', this.itemKeydownHandler_);
    this.adapter_.registerInteractionEventHandler('keyup', this.itemKeyupHandler_);
  }

  destroy() {
    this.adapter_.deregisterInputEventHandler('click', this.inputClickHandler_);
    this.adapter_.deregisterInputEventHandler('keydown', this.inputKeyDownHandler_);

    this.adapter_.deregisterBtnEventHandler('click', this.toggle);

    this.adapter_.deregisterInteractionEventHandler('click', this.itemClickHandler_);
    this.adapter_.deregisterInteractionEventHandler('keydown', this.itemKeydownHandler_);
    this.adapter_.deregisterInteractionEventHandler('keyup', this.itemKeyupHandler_);
  }

  isOpen() {
    return this.isOpen_;
  }

  open() {
    // Add/remove classes here
    this.isOpen_ = true;
    return;
  }

  close() {
    // Add/remove classes here
    this.isOpen_ = false;
    return;
  }

  toggle() {
    if (this.isOpen()) {
      this.close();      
    } else {
      this.open();
    }
  }

  inputClickHandler_() {
    if (this.adapter_.isInputFocused()) {
      this.open();
    }
  }

  inputKeydownHandler_(event) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return true;
    }

    const { keyCode, key } = event;
    const isNext = (key === 'ArrowDown' || keyCode === 40);
    const isPrevious = (key === 'ArrowUp' || keyCode === 38);

    if (!isNext && !isPrevious) {
      if (!this.adapter_.matchExists()) {
        this.close();
        return true;
      } else if (!this.isOpen()) {
        this.open();
        return true;
      }
    }

    // Set our index variable
    let index;

    if (isNext) {
      index = 0;
    }

    if (isPrevious) {
      index = this.adapter_.getNumberOfItems() - 1;
    }

    this.adapter_.focusOnElementAtIndex(index);

    return true;
  }

  itemClickHandler_(event) {
    const index = this.adapter_.getIndexFromItemElement(event.target);

    if (index >= 0) {
      this.selectItemAtIndex_(index);
    }
  }

  itemKeydownHandler_(event) {
    const lastIndex = this.adapter_.getLengthOfItems() - 1;
    const index = this.adapter_.getIndexFromItemElement(event.target);

    if (isNext) {
      switch (index) {
        case lastIndex:
          this.adapter_.focusOnElementAtIndex(0);
          return;
        default:
          this.adapter_.focusOnElementAtIndex();
          return;
      }
    }

    if (isPrevious) {
      switch (index) {
        case 0:
          this.adapter_.focusOnElementAtIndex(lastIndex);
          return;
        default:
          this.adapter_.focusOnElementAtIndex(index - 1);
          return;
      }
    }
  }

  itemKeyupHandler_(event) {
    const index = this.adapter_.getIndexFromItemElement(event.target);

    if (isTab || isEnter) {
      this.selectItemAtIndex_(index); 
      return;
    }

    if (isEsc) {
      this.cancel();
      return;
    }
  }

  selectItemAtIndex_(index) {
    this.adapter_.selectItemAtIndex(index);
    this.close();
  }

  cancel() {
    this.adapter_.notifyCancel();
    this.close();
  }
}

export default DatalistFoundation;
