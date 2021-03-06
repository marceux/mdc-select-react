import React, { PropTypes, PureComponent } from 'react';

class SimpleMenuOption extends PureComponent {
  render() {
    const { id, label } = this.props;

    return (
      <li
        className="mdc-list-item"
        id={id}
        role="option"
        tabIndex="0"
      >
        {label}
      </li>
    );
  }
}

SimpleMenuOption.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
};

export default SimpleMenuOption;
