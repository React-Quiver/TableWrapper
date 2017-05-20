var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';

// material-ui
import TextField from 'material-ui/TextField';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';

var SearchField = function (_Component) {
  _inherits(SearchField, _Component);

  function SearchField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchField.__proto__ || Object.getPrototypeOf(SearchField)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      lastSearchContent: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchField, [{
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

      var palette = this.context.muiTheme.rawTheme.palette;
      var _props3 = this.props,
          hintText = _props3.hintText,
          searchState = _props3.searchState;


      return React.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: 35,
            background: searchState ? '#e1f5fe' : '#ececec',
            borderRadius: 3
          }
        },
        React.createElement(
          'div',
          null,
          React.createElement(FilterArrow, {
            sortState: this.props.sortState,
            onFilter: this.props.onFilter,
            colKey: this.props.colKey,
            type: this.props.type
          })
        ),
        React.createElement(TextField, {
          inputStyle: {
            color: searchState !== '' ? palette.primary1Color : undefined
          },
          value: searchState || '',
          onChange: function onChange(e) {
            return _this2.search(e.target.value);
          },
          style: styles.text,
          underlineShow: false,
          hintText: hintText
        }),
        searchState !== '' && searchState !== undefined ? React.createElement(
          'div',
          {
            onClick: this.clear.bind(this)
          },
          React.createElement(Close, {
            color: searchState !== '' && searchState !== undefined ? palette.primary1Color : undefined,
            style: styles.close
          })
        ) : null
      );
    }
  }]);

  return SearchField;
}(Component);

SearchField.propTypes = {
  hintText: PropTypes.string,
  sortState: PropTypes.string,
  colKey: PropTypes.string,
  onFilter: PropTypes.func,
  type: PropTypes.string,
  searchState: PropTypes.string,
  onSearch: PropTypes.func
};
SearchField.contextTypes = {
  muiTheme: PropTypes.object,
  router: React.PropTypes.object
};
export default SearchField;