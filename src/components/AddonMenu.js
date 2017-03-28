// Foundation
import AddonMenuFoundation from '../foundations/AddonMenuFoundation';

// Adapter
import addonMenuAdapter from '../adapters/addonMenuAdapter';

// Component
import SimpleMenu from './SimpleMenu';

class AddonMenu extends SimpleMenu {
  constructor(props) {
    super(props);

    // Finally, create our MDC AddonMenu Foundation
    this.foundation = new AddonMenuFoundation(addonMenuAdapter(this));
  }
}

export default AddonMenu;

