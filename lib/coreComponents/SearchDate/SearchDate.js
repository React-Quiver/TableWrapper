'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _cancel = require('material-ui/svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

var _FilterArrow = require('../FilterArrow');

var _FilterArrow2 = _interopRequireDefault(_FilterArrow);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// material-ui


// custom components


// styles


var SearchDate = function (_Component) {
  _inherits(SearchDate, _Component);

  function SearchDate() {
    _classCallCheck(this, SearchDate);

    return _possibleConstructorReturn(this, (SearchDate.__proto__ || Object.getPrototypeOf(SearchDate)).apply(this, arguments));
  }

  _createClass(SearchDate, [{
    key: 'search',
    value: function search(searchContent) {
      var date = new Date(searchContent);
      var dateString = (0, _dateformat2.default)(date, 'yyyy-mm-dd');
      var _props = this.props,
          colKey = _props.colKey,
          onSearch = _props.onSearch;

      onSearch(colKey, dateString, false);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _props2 = this.props,
          colKey = _props2.colKey,
          onSearch = _props2.onSearch;

      onSearch(colKey, undefined);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var muiTheme = this.context.muiTheme;

      var palette = muiTheme ? muiTheme.rawTheme.palette : undefined;
      var _props3 = this.props,
          hintText = _props3.hintText,
          searchState = _props3.searchState;


      return _react2.default.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: 35,
            background: searchState && palette ? palette.accent2Color : '#ececec',
            borderRadius: 3
          }
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_FilterArrow2.default, {
            sortState: this.props.sortState,
            onFilter: this.props.onFilter,
            colKey: this.props.colKey,
            type: this.props.type
          })
        ),
        _react2.default.createElement(_DatePicker2.default, {
          inputStyle: {
            color: searchState !== '' && palette ? palette.primary1Color : undefined
          },
          value: searchState ? new Date(searchState) : undefined,
          onChange: function onChange(e, date) {
            return _this2.search(date);
          },
          textFieldStyle: _styles2.default.text,
          underlineShow: false,
          hintText: hintText,
          container: 'inline'
        }),
        searchState !== '' && searchState !== undefined ? _react2.default.createElement(
          'div',
          {
            onClick: this.clear.bind(this)
          },
          _react2.default.createElement(_cancel2.default, {
            color: searchState !== '' && searchState !== undefined && palette ? palette.primary1Color : undefined,
            style: _styles2.default.close
          })
        ) : null
      );
    }
  }]);

  return SearchDate;
}(_react.Component);

SearchDate.propTypes = {
  hintText: _react.PropTypes.string,
  sortState: _react.PropTypes.string,
  colKey: _react.PropTypes.string,
  onFilter: _react.PropTypes.func,
  type: _react.PropTypes.string,
  searchState: _react.PropTypes.string,
  onSearch: _react.PropTypes.func
};
SearchDate.contextTypes = {
  muiTheme: _react.PropTypes.object,
  router: _react2.default.PropTypes.object
};
exports.default = SearchDate;
module.exports = exports['default'];