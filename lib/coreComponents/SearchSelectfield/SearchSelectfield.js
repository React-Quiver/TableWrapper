'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

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


var SearchSelectfield = function (_Component) {
  _inherits(SearchSelectfield, _Component);

  function SearchSelectfield() {
    _classCallCheck(this, SearchSelectfield);

    return _possibleConstructorReturn(this, (SearchSelectfield.__proto__ || Object.getPrototypeOf(SearchSelectfield)).apply(this, arguments));
  }

  _createClass(SearchSelectfield, [{
    key: 'getSelectField',
    value: function getSelectField() {
      var _this2 = this;

      var palette = this.context.muiTheme.rawTheme.palette;
      var _props = this.props,
          hintText = _props.hintText,
          searchState = _props.searchState,
          dataSource = _props.dataSource;

      var JSX = [];

      var text = {
        fontSize: 13,
        color: palette.primary1Color
      };

      for (var k in dataSource) {
        if (dataSource.hasOwnProperty(k)) {
          var datum = dataSource[k];
          JSX.push(_react2.default.createElement(_MenuItem2.default, {
            key: datum,
            value: datum,
            primaryText: datum
          }));
        }
      }

      return _react2.default.createElement(
        _SelectField2.default,
        {
          autoWidth: true,
          hintText: hintText,
          underlineShow: false,
          value: searchState,
          onChange: function onChange(event, index, value) {
            return _this2.search(value);
          },
          style: _styles2.default.selectField,
          labelStyle: text,
          hintStyle: _styles2.default.selectField
          // style={styles.selectField}
          , iconStyle: { display: 'none' }
        },
        JSX
      );
    }
  }, {
    key: 'search',
    value: function search(searchContent) {
      var _props2 = this.props,
          colKey = _props2.colKey,
          onSearch = _props2.onSearch;

      onSearch(colKey, searchContent, false);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _props3 = this.props,
          colKey = _props3.colKey,
          onSearch = _props3.onSearch;

      onSearch(colKey, undefined);
    }
  }, {
    key: 'render',
    value: function render() {
      var muiTheme = this.context.muiTheme;

      var palette = muiTheme ? muiTheme.rawTheme.palette : undefined;
      var searchState = this.props.searchState;


      return _react2.default.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: 35,
            background: searchState && palette ? palette.primary2Color : '#ececec',
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
        this.getSelectField(),
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

  return SearchSelectfield;
}(_react.Component);

SearchSelectfield.propTypes = {
  hintText: _react.PropTypes.string,
  sortState: _react.PropTypes.string,
  dataSource: _react.PropTypes.array,
  colKey: _react.PropTypes.string,
  type: _react.PropTypes.string,
  onFilter: _react.PropTypes.func,
  searchState: _react.PropTypes.string,
  onSearch: _react.PropTypes.func
};
SearchSelectfield.contextTypes = {
  muiTheme: _react.PropTypes.object,
  router: _react2.default.PropTypes.object
};
exports.default = SearchSelectfield;
module.exports = exports['default'];