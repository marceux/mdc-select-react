/**
 * This foundation is almost an exact copy of the MDCSimpleMenuFoundation, except
 * that there is no "saveFocus" or "restoreFocus" calls.
 *
 * This is hackish, but maybe in the future, we'll implement something better.
 */

/* eslint-disable */
import { MDCSimpleMenuFoundation } from '@material/menu/dist/mdc.menu';

class AddonMenuFoundation extends MDCSimpleMenuFoundation {
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
