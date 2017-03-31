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
      registerBtnClickHandler: () => {},
      deregisterBtnClickHandler: () => {},
      registerInteractionEventHandler: () => {},
      deregisterInteractionEventHandler: () => {},
      registerDocumentClickHandler: () => {},
      deregisterDocumentClickHandler: () => {},
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

    // Create our handlers; this is so that `this` still points to our
    // foundation within the `handle{...}` methods
    this.inputClickHandler_ = (event) => this.handleInputClick(event);
    this.inputInputHandler_ = (event) => this.handleInputInput(event);
    this.inputKeyDownHandler_ = (event) => this.handleInputKeyDown(event);
    this.btnClickHandler_ = () => this.handleBtnClick(event);
    this.itemClickHandler_ = (event) => this.handleItemClick(event);
    this.itemKeyDownHandler_ = (event) => this.handleItemKeyDown(event);
    this.itemKeyUpHandler_ = (event) => this.handleItemKeyUp(event);
    this.documentClickHandler_ = () => this.handleDocumentClick();

    // Default values for component
    this.isOpen_ = false;
  }

  init() {
    this.adapter_.registerInputEventHandler('click', this.inputClickHandler_);
    this.adapter_.registerInputEventHandler('input', this.inputInputHandler_);
    this.adapter_.registerInputEventHandler('keydown', this.inputKeyDownHandler_);

    this.adapter_.registerBtnClickHandler(this.btnClickHandler_);

    this.adapter_.registerInteractionEventHandler('click', this.itemClickHandler_);
    this.adapter_.registerInteractionEventHandler('keydown', this.itemKeyDownHandler_);
    this.adapter_.registerInteractionEventHandler('keyup', this.itemKeyUpHandler_);
  }

  destroy() {
    this.adapter_.deregisterInputEventHandler('click', this.inputClickHandler_);
    this.adapter_.deregisterInputEventHandler('input', this.inputInputHandler_);
    this.adapter_.deregisterInputEventHandler('keydown', this.inputKeyDownHandler_);

    this.adapter_.deregisterBtnClickHandler(this.btnClickHandler_);

    this.adapter_.deregisterInteractionEventHandler('click', this.itemClickHandler_);
    this.adapter_.deregisterInteractionEventHandler('keydown', this.itemKeyDownHandler_);
    this.adapter_.deregisterInteractionEventHandler('keyup', this.itemKeyUpHandler_);
  }

  isOpen() {
    return this.isOpen_;
  }

  open() {
    // Register the document click handler
    this.adapter_.registerDocumentClickHandler(this.documentClickHandler_);

    this.isOpen_ = true;
    this.adapter_.addClass('mdc-datalist--open');
    return;
  }

  close() {
    // Deregister the document click handler
    this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);

    this.isOpen_ = false;
    this.adapter_.removeClass('mdc-datalist--open');
    return;
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  handleInputClick(event) {
    // Stopping the click propagation
    event.stopPropagation();

    if (event.target.value !== '' && this.adapter_.matchExists(event.target.value)) {
      this.open();
    }
  }

  handleInputInput(event) {
    // If the value matches, then we'll make sure it's open,
    // else we'll close our autocomplete component
    if (event.target.value !== '' && this.adapter_.matchExists(event.target.value)) {
      if (!this.isOpen()) {
        this.open();
      }
    } else {
      this.close();
    }

    return true;
  }

  handleInputKeyDown(event) {
    const { keyCode, key } = event;
    const isNext = (key === 'ArrowDown' || keyCode === 40);
    const isPrevious = (key === 'ArrowUp' || keyCode === 38);

    // Only handling keyboard events for the isNext or isPrevious keys
    if (!isNext && !isPrevious) {
      return false;
    }

    // We are going to get the number of items in our data list
    const numberOfItems = this.adapter_.getNumberOfItems();

    // Set our index variable
    let index;

    // If we actually have items...
    if (numberOfItems) {
      // Check if "isNext", set index to 0
      if (isNext) {
        index = 0;
      }

      // Check if "isPrevious", set index to number - 1
      if (isPrevious) {
        index = numberOfItems - 1;
      }

      // Check if our menu is NOT open, then open
      if (!this.isOpen()) {
        this.open();
      }

      this.adapter_.focusOnElementAtIndex(index);
    }

    return true;
  }

  handleBtnClick(event) {
    // Focus on the input element
    this.adapter_.focusOnInput();

    // Open/close the autocomplete list
    this.toggle();

    // We don't want the event triggering our document listener
    event.stopPropagation();
  }

  handleItemClick(event) {
    const index = this.adapter_.getIndexForEventTarget(event.target);

    // If an index value was returned that is AT LEAST 0, then we have
    // an index and we'll select it!
    if (index >= 0) {
      // Restore Focus to Input
      this.adapter_.focusOnInput();

      this.close();

      // Select the item at the index
      this.adapter_.selectItemAtIndex(index);
    }

    return true;
  }

  handleItemKeyDown(event) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return false;
    }

    // Get the keyCode and key
    const { keyCode, key } = event;

    // Set our tab button check
    const isTab = (key === 'Tab' || keyCode === 9);

    // Get the number of items...
    const numberOfItems = this.adapter_.getNumberOfItems();

    if (numberOfItems <= 1) {
      // If we only have one item and we are tabbing, we are going to focus
      // on the input, and close the list
      if (isTab) {
        // Restore Focus to Input
        this.adapter_.focusOnInput();
        this.close();
        this.adapter_.notifyCancel();
        return false;
      }
    }

    const isNext = (key === 'ArrowDown' || keyCode === 40);
    const isPrevious = (key === 'ArrowUp' || keyCode === 38);

    if (!isNext && !isPrevious) {
      return false;
    }

    const lastIndex = numberOfItems - 1;
    const index = this.adapter_.getIndexForEventTarget(event.target);

    if (isNext) {
      switch (index) {
        case lastIndex:
          this.adapter_.focusOnElementAtIndex(0);
          return true;
        default:
          this.adapter_.focusOnElementAtIndex(index + 1);
          return true;
      }
    }

    if (isPrevious) {
      switch (index) {
        case 0:
          this.adapter_.focusOnElementAtIndex(lastIndex);
          return true;
        default:
          this.adapter_.focusOnElementAtIndex(index - 1);
          return true;
      }
    }

    if (isTab && index === lastIndex) {
      // Restore Focus to Input
      this.adapter_.focusOnInput();
      this.close();
      this.adapter_.notifyCancel();
      return false;
    }

    return false;
  }

  handleItemKeyUp(event) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return true;
    }

    const { keyCode, key } = event;

    const isEnter = (key === 'Enter' || keyCode === 13);
    const isSpace = (key === 'Space' || keyCode === 32);
    const isEscape = (key === 'Escape' || keyCode === 27);

    const index = this.adapter_.getIndexForEventTarget(event.target);

    // If we press Enter or Space, then we select the item
    if (isEnter || isSpace) {
      // Restore Focus to Input
      this.adapter_.focusOnInput();
      this.close();
      this.adapter_.selectItemAtIndex(index);
      return false;
    }

    // Esc is a cancel-type action
    if (isEscape) {
      // Restore Focus to Input
      this.adapter_.focusOnInput();
      this.close();
      this.adapter_.notifyCancel();
      return false;
    }

    return true;
  }

  handleDocumentClick() {
    this.close();

    this.adapter_.notifyCancel();
  }
}

export default DatalistFoundation;
