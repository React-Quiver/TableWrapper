var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';

// material-ui
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';

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
          JSX.push(React.createElement(MenuItem, {
            key: datum,
            value: datum,
            primaryText: datum
          }));
        }
      }

      return React.createElement(
        SelectField,
        {
          autoWidth: true,
          hintText: hintText,
          underlineShow: false,
          value: searchState,
          onChange: function onChange(event, index, value) {
            return _this2.search(value);
          },
          style: styles.selectField,
          labelStyle: text,
          hintStyle: styles.selectField
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
      var palette = this.context.muiTheme.rawTheme.palette;
      var searchState = this.props.searchState;


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
        this.getSelectField(),
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

  return SearchSelectfield;
}(Component);

SearchSelectfield.propTypes = {
  hintText: PropTypes.string,
  sortState: PropTypes.string,
  dataSource: PropTypes.array,
  colKey: PropTypes.string,
  type: PropTypes.string,
  onFilter: PropTypes.func,
  searchState: PropTypes.string,
  onSearch: PropTypes.func
};
SearchSelectfield.contextTypes = {
  muiTheme: PropTypes.object,
  router: React.PropTypes.object
};
export default SearchSelectfield;