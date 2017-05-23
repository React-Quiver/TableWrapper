'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

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


var SearchAutoComplete = function (_Component) {
  _inherits(SearchAutoComplete, _Component);

  function SearchAutoComplete() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchAutoComplete);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchAutoComplete.__proto__ || Object.getPrototypeOf(SearchAutoComplete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      lastSearchContent: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchAutoComplete, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.searchState === undefined) {
        this.state.lastSearchContent = '';
      }
    }
  }, {
    key: 'search',
    value: function search(searchContent) {
      var lastSearchContent = this.state.lastSearchContent;
      var _props = this.props,
          colKey = _props.colKey,
          onSearch = _props.onSearch;

      var charIsAdded = searchContent.length > lastSearchContent.length;
      onSearch(colKey, searchContent, charIsAdded);
      this.state.lastSearchContent = searchContent;
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _props2 = this.props,
          colKey = _props2.colKey,
          onSearch = _props2.onSearch;

      this.setState({ content: '' });
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
          searchState = _props3.searchState,
          dataSource = _props3.dataSource;


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
        _react2.default.createElement(_AutoComplete2.default, {
          inputStyle: {
            color: searchState !== '' && palette ? palette.primary1Color : undefined
          },
          searchText: searchState || '',
          onNewRequest: function onNewRequest(string) {
            return _this2.search(string);
          },
          textFieldStyle: _styles2.default.textFieldStyle,
          underlineShow: false,
          hintText: hintText,
          style: _styles2.default.text,
          filter: _AutoComplete2.default.caseInsensitiveFilter,
          dataSource: dataSource
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

  return SearchAutoComplete;
}(_react.Component);

SearchAutoComplete.propTypes = {
  hintText: _react.PropTypes.string,
  sortState: _react.PropTypes.string,
  colKey: _react.PropTypes.string,
  onFilter: _react.PropTypes.func,
  type: _react.PropTypes.string,
  searchState: _react.PropTypes.string,
  onSearch: _react.PropTypes.func,
  dataSource: _react.PropTypes.array
};
SearchAutoComplete.contextTypes = {
  muiTheme: _react.PropTypes.object,
  router: _react2.default.PropTypes.object
};
exports.default = SearchAutoComplete;
module.exports = exports['default'];