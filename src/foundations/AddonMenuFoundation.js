/**
 * This foundation is almost an exact copy of the MDCSimpleMenuFoundation, except
 * that there is no "saveFocus" or "restoreFocus" calls.
 *
 * This is hackish, but maybe in the future, we'll implement something better.
 */

/* eslint-disable */
import { MDCSimpleMenuFoundation } from '@material/menu/dist/mdc.menu';

class AddonMenuFoundation extends MDCSimpleMenuFoundation {
  // Handle keys that we want to repeat on hold (tab and arrows).
  handleKeyboardDown_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key, shiftKey} = evt;
    const isTab = key === 'Tab' || keyCode === 9;
    const isArrowUp = key === 'ArrowUp' || keyCode === 38;
    const isArrowDown = key === 'ArrowDown' || keyCode === 40;
    const isSpace = key === 'Space' || keyCode === 32;

    const focusedItemIndex = this.adapter_.getFocusedItemIndex();
    const lastItemIndex = this.adapter_.getNumberOfItems() - 1;

    const extendedElement = this.adapter_.getExtendedElement();

    // If we press "Shift" and we are at the top element
    if (shiftKey && isTab && focusedItemIndex === 0) {
      // If we actually have an extendedElement
      if (extendedElement) {
        extendedElement.focus();
      } else {
        this.adapter_.focusItemAtIndex(lastItemIndex);
      }

      evt.preventDefault();
      return false;
    }

    if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
      if (extendedElement) {
        extendedElement.focus();
      } else {
        this.adapter_.focusItemAtIndex(0);
      }

      evt.preventDefault();
      return false;
    }

    // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
    if (isArrowUp || isArrowDown || isSpace) {
      evt.preventDefault();
    }

    if (isArrowUp) {
      if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
      }
    } else if (isArrowDown) {
      if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
      }
    }

    return true;
  }

  // Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
  handleKeyboardUp_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key} = evt;
    const isEnter = key === 'Enter' || keyCode === 13;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEnter || isSpace) {
      this.handlePossibleSelected_(evt);
    }

    if (isEscape) {
      this.adapter_.notifyCancel();
      this.close();
    }

    return true;
  }

  open() {
    //this.adapter_.saveFocus();
    this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING);
    this.animationRequestId_ = requestAnimationFrame(() => {
      this.dimensions_ = this.adapter_.getInnerDimensions();
      this.applyTransitionDelays_();
      this.autoPosition_();
      this.animateMenu_();
      this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.OPEN);
      //this.focusOnOpen_(focusIndex);
      this.adapter_.registerDocumentClickHandler(this.documentClickHandler_);
    });

    this.isOpen_ = true;
  }

  close() {
    this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);
    this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING);

    requestAnimationFrame(() => {
      this.removeTransitionDelays_();
      this.animateMenu_();
      this.adapter_.removeClass(MDCSimpleMenuFoundation.cssClasses.OPEN);
    });

    this.isOpen_ = false;

    //this.adapter_.restoreFocus();
  }
}

export default AddonMenuFoundation;
/* eslint-enable */
