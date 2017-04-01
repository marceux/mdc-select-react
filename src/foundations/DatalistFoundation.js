/* eslint-disable no-underscore-dangle */
import { MDCFoundation } from '@material/base/dist/mdc.base';

class DatalistFoundation extends MDCFoundation {
  static get defaultAdapter() {
    return {
      addClass: () => {},
      removeClass: () => {},
      registerInteractionEventHandler: () => {},
      deregisterInteractionEventHandler: () => {},
      registerDocumentClickHandler: () => {},
      deregisterDocumentClickHandler: () => {},
      storeFocus: () => {},
      restoreFocus: () => {},
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
    this.itemClickHandler_ = (event) => this.handleItemClick_(event);
    this.itemKeyDownHandler_ = (event) => this.handleItemKeyDown_(event);
    this.itemKeyUpHandler_ = (event) => this.handleItemKeyUp_(event);
    this.documentClickHandler_ = () => this.handleDocumentClick_();

    // Default values for component
    this.isOpen_ = false;
  }

  init() {
    this.adapter_.registerInteractionEventHandler('click', this.itemClickHandler_);
    this.adapter_.registerInteractionEventHandler('keydown', this.itemKeyDownHandler_);
    this.adapter_.registerInteractionEventHandler('keyup', this.itemKeyUpHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionEventHandler('click', this.itemClickHandler_);
    this.adapter_.deregisterInteractionEventHandler('keydown', this.itemKeyDownHandler_);
    this.adapter_.deregisterInteractionEventHandler('keyup', this.itemKeyUpHandler_);
  }

  isOpen() {
    return this.isOpen_;
  }

  open(storeFocus = false) {
    // Register the document click handler
    this.adapter_.registerDocumentClickHandler(this.documentClickHandler_);

    this.isOpen_ = true;
    this.adapter_.addClass('mdc-datalist--open');

    // If we want, we can store the current focused item
    if (storeFocus) {
      this.adapter_.storeFocus();
    }
  }

  close(restoreFocus = false) {
    // Deregister the document click handler
    this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);

    this.isOpen_ = false;
    this.adapter_.removeClass('mdc-datalist--open');

    // If we want, after closing, we can restore the previously focused item
    if (restoreFocus) {
      this.adapter_.restoreFocus();
    }
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  focusOnItemAtIndex(index) {
    this.adapter_.storeFocus();
    this.adapter_.focusOnElementAtIndex(index);
  }

  handleItemKeyDown_(event) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return true;
    }

    // Get the number of items...
    const numberOfItems = this.adapter_.getNumberOfItems();

    // Return true and do nothing if no items
    if (numberOfItems <= 0) {
      return true;
    }

    // Then we must have at least 1 number of items, the last item index is that
    // number minus 1. Also get the current index
    const lastIndex = numberOfItems - 1;
    const index = this.adapter_.getIndexForEventTarget(event.target);

    // Get the keyCode and key and shiftKey if it exists
    const { keyCode, key, shiftKey } = event;

    // Set our tab button check
    const isTab = (key === 'Tab' || keyCode === 9);

    // If the tab key is pressed...
    if (isTab) {
      // If we press shift and we are at the first index, we are leaving the list
      // and going "back" to the previously active element
      // Or, if the index is the last index, and we pressed tab, then we are leaving
      // the list and going "forward", even though it is still the previously
      // active element
      if (numberOfItems === 1 || (shiftKey && index === 0) || (index === lastIndex)) {
        event.preventDefault();
        this.close(true);
        this.adapter_.notifyCancel();
        return false;
      }
    }

    const isNext = (key === 'ArrowDown' || keyCode === 40);
    const isPrevious = (key === 'ArrowUp' || keyCode === 38);

    // If none of these, do nothing
    if (!isNext && !isPrevious) {
      return true;
    }

    // We are going to prevent default behavior for both isNext/isPrevious keydowns
    event.preventDefault();

    if (isNext) {
      switch (index) {
        case lastIndex:
          this.adapter_.focusOnElementAtIndex(0);
          return false;
        default:
          this.adapter_.focusOnElementAtIndex(index + 1);
          return false;
      }
    }

    if (isPrevious) {
      switch (index) {
        case 0:
          this.adapter_.focusOnElementAtIndex(lastIndex);
          return false;
        default:
          this.adapter_.focusOnElementAtIndex(index - 1);
          return false;
      }
    }

    // fallback
    return true;
  }

  handleItemKeyUp_(event) {
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
      this.close(true);
      this.adapter_.selectItemAtIndex(index);
      return false;
    }

    // Esc is a cancel-type action
    if (isEscape) {
      this.close(true);
      this.adapter_.notifyCancel();
      return false;
    }

    return true;
  }

  handleItemClick_(event) {
    // We don't want the click event to bubble up
    event.stopPropagation();

    const index = this.adapter_.getIndexForEventTarget(event.target);

    // If an index value was returned that is AT LEAST 0, then we have
    // an index and we'll select it!
    if (index >= 0) {
      this.close(true);
      this.adapter_.selectItemAtIndex(index);
    }

    return true;
  }

  handleDocumentClick_() {
    this.close();
    this.adapter_.notifyCancel();
  }
}

export default DatalistFoundation;
