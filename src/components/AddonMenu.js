// Foundation
import AddonMenuFoundation from '../foundations/AddonMenuFoundation';

// Adapter
import simpleMenuAdapter from '../adapters/simpleMenuAdapter';

// Component
import SimpleMenu from './SimpleMenu';

class AddonMenu extends SimpleMenu {
  constructor(props) {
    super(props);

    // Finally, create our MDC AddonMenu Foundation
    this.foundation = new AddonMenuFoundation(simpleMenuAdapter(this));
  }
}

export default AddonMenu;

