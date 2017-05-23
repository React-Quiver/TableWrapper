var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';
import dateformat from 'dateformat';

// material-ui
import DatePicker from 'material-ui/DatePicker';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';

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
      var dateString = dateformat(date, 'yyyy-mm-dd');
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


      return React.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: 35,
            background: searchState && palette ? palette.primary2Color : '#ececec',
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
        React.createElement(DatePicker, {
          inputStyle: {
            color: searchState !== '' && palette ? palette.primary1Color : undefined
          },
          value: searchState ? new Date(searchState) : undefined,
          onChange: function onChange(e, date) {
            return _this2.search(date);
          },
          textFieldStyle: styles.text,
          underlineShow: false,
          hintText: hintText,
          container: 'inline'
        }),
        searchState !== '' && searchState !== undefined ? React.createElement(
          'div',
          {
            onClick: this.clear.bind(this)
          },
          React.createElement(Close, {
            color: searchState !== '' && searchState !== undefined && palette ? palette.primary1Color : undefined,
            style: styles.close
          })
        ) : null
      );
    }
  }]);

  return SearchDate;
}(Component);

SearchDate.propTypes = {
  hintText: PropTypes.string,
  sortState: PropTypes.string,
  colKey: PropTypes.string,
  onFilter: PropTypes.func,
  type: PropTypes.string,
  searchState: PropTypes.string,
  onSearch: PropTypes.func
};
SearchDate.contextTypes = {
  muiTheme: PropTypes.object,
  router: React.PropTypes.object
};
export default SearchDate;