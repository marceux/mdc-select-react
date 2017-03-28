import React, { PropTypes, PureComponent } from 'react';

class SimpleMenuOption extends PureComponent {
  render() {
    const { id, text } = this.props;

    return (
      <li
        className="mdc-list-item"
        id={id}
        role="option"
        tabIndex="0"
      >
        {text}
      </li>
    );
  }
}

SimpleMenuOption.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  text: PropTypes.string,
};

export default SimpleMenuOption;
