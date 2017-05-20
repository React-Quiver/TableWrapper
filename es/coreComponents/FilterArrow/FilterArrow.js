var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';

// material-ui
import Up from 'material-ui/svg-icons/navigation/arrow-drop-up';
import Down from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Filter from 'material-ui/svg-icons/content/filter-list';

// styles
import styles from './styles';

var FilterArrow = function (_Component) {
  _inherits(FilterArrow, _Component);

  function FilterArrow() {
    _classCallCheck(this, FilterArrow);

    return _possibleConstructorReturn(this, (FilterArrow.__proto__ || Object.getPrototypeOf(FilterArrow)).apply(this, arguments));
  }

  _createClass(FilterArrow, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onFilter = _props.onFilter,
          colKey = _props.colKey,
          type = _props.type,
          sortState = _props.sortState;
      var palette = this.context.muiTheme.rawTheme.palette;


      if (sortState === 'Down') {
        return React.createElement(Down, {
          style: styles.arrow,
          color: palette.primary1Color,
          onClick: function onClick() {
            _this2.setState({ filter: 'Up' });
            onFilter(colKey, 'Up', type);
          }
        });
      }

      if (sortState === 'Up') {
        return React.createElement(Up, {
          style: styles.arrow,
          color: palette.primary1Color,
          onClick: function onClick() {
            _this2.setState({ filter: undefined });
            onFilter(colKey, 'Down', type);
          }
        });
      }

      return React.createElement(Down, {
        style: styles.arrow,
        onClick: function onClick() {
          _this2.setState({ filter: 'Down' });
          onFilter(colKey, 'Down', type);
        }
      });
    }
  }]);

  return FilterArrow;
}(Component);

FilterArrow.propTypes = {
  sortState: PropTypes.string,
  colKey: PropTypes.string,
  type: PropTypes.string,
  onFilter: PropTypes.func
};
FilterArrow.contextTypes = {
  muiTheme: PropTypes.object,
  router: React.PropTypes.object
};
export default FilterArrow;