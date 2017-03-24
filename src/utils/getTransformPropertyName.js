
let storedTransformPropertyName;

/**
 * Gets the browser's transform-property name by creating a div and checking its styles.
 *
 * Code copied from https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu/simple/index.js
 *
 * @name getTransformPropertyName
 * @param {Object} globalObj Global container
 * @param {Boolean} forceRefresh whether or not we'll refresh the value
 */
function getTransformPropertyName(globalObj, forceRefresh = false) {
  if (storedTransformPropertyName === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : 'webkitTransform');
    storedTransformPropertyName = transformPropertyName;
  }

  return storedTransformPropertyName;
}

export default getTransformPropertyName;
