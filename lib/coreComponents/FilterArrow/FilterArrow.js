'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _arrowDropUp = require('material-ui/svg-icons/navigation/arrow-drop-up');

var _arrowDropUp2 = _interopRequireDefault(_arrowDropUp);

var _arrowDropDown = require('material-ui/svg-icons/navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

var _filterList = require('material-ui/svg-icons/content/filter-list');

var _filterList2 = _interopRequireDefault(_filterList);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// material-ui


// styles


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
        return _react2.default.createElement(_arrowDropDown2.default, {
          style: _styles2.default.arrow,
          color: palette.primary1Color,
          onClick: function onClick() {
            _this2.setState({ filter: 'Up' });
            onFilter(colKey, 'Up', type);
          }
        });
      }

      if (sortState === 'Up') {
        return _react2.default.createElement(_arrowDropUp2.default, {
          style: _styles2.default.arrow,
          color: palette.primary1Color,
          onClick: function onClick() {
            _this2.setState({ filter: undefined });
            onFilter(colKey, 'Down', type);
          }
        });
      }

      return _react2.default.createElement(_arrowDropDown2.default, {
        style: _styles2.default.arrow,
        onClick: function onClick() {
          _this2.setState({ filter: 'Down' });
          onFilter(colKey, 'Down', type);
        }
      });
    }
  }]);

  return FilterArrow;
}(_react.Component);

FilterArrow.propTypes = {
  sortState: _react.PropTypes.string,
  colKey: _react.PropTypes.string,
  type: _react.PropTypes.string,
  onFilter: _react.PropTypes.func
};
FilterArrow.contextTypes = {
  muiTheme: _react.PropTypes.object,
  router: _react2.default.PropTypes.object
};
exports.default = FilterArrow;
module.exports = exports['default'];