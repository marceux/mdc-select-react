import React, { PropTypes, PureComponent } from 'react';

class TextfieldHelptext extends PureComponent {
  constructor(props) {
    super(props);

    // Method binding, baby
    this.setRootNode = this.setRootNode.bind(this);
  }

  setRootNode(node) {
    this.rootNode = node;
  }

  render() {
    const { children, classes } = this.props;

    return (
      <p
        className={classes.join(' ')}
        ref={this.setRootNode}
      >
        {children}
      </p>
    );
  }
}

TextfieldHelptext.propTypes = {
  classes: PropTypes.shape({
    join: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.any.isRequired,
};

export default TextfieldHelptext;
