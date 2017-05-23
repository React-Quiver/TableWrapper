var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// material-ui
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ReactDOM from 'react-dom';
import { WindowResizeListener } from 'react-window-resize-listener';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CircularProgress from 'material-ui/CircularProgress';

// custom elements
import SearchField from './coreComponents/SearchField';
import SearchDate from './coreComponents/SearchDate';
import SearchAutoComplete from './coreComponents/SearchAutoComplete';
import SearchSelectfield from './coreComponents/SearchSelectfield';

// helpers
import { sortUp, sortDown, filterData, getInitialStructuredData, getStructuredData, capitalize } from './helpers';

// styles
import styles from './styles';

var TableWrapper = function (_Component) {
  _inherits(TableWrapper, _Component);

  function TableWrapper() {
    var _ref;

    _classCallCheck(this, TableWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TableWrapper.__proto__ || Object.getPrototypeOf(TableWrapper)).call.apply(_ref, [this].concat(args)));

    var _this$props = _this.props,
        tableMeta = _this$props.tableMeta,
        data = _this$props.data;


    _this.state = {
      initialTableMeta: tableMeta,
      tableMeta: tableMeta,
      data: data,
      structuredData: getInitialStructuredData(data, tableMeta),
      height: 1200,
      colWidth: 300,
      visibleEntries: 30,
      lastColKey: undefined
    };
    return _this;
  }

  _createClass(TableWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setDimension();
      this.calcColWidth();

      this.viewport.addEventListener('scroll', function (e) {
        var clientHeight = e.srcElement.clientHeight;
        var scrollHeight = e.srcElement.scrollHeight;
        var scrollTop = e.srcElement.scrollTop;
        var ratio = scrollTop / (scrollHeight - clientHeight) * 100;

        if (ratio >= 100) {
          _this2.displayMoreEntries(50);
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data) {
        this.state.data = nextProps.data;
        this.state.structuredData = getStructuredData(nextProps.data, this.state.tableMeta);
        this.forceUpdate();
      }
    }
  }, {
    key: 'setDimension',
    value: function setDimension() {
      this.state.height = ReactDOM.findDOMNode(this.refs.wrapper).clientHeight - 123;
      this.state.width = ReactDOM.findDOMNode(this.refs.wrapper).clientWidth;
    }
  }, {
    key: 'setSortStatesForCol',
    value: function setSortStatesForCol(colKey, mode) {
      var tableMeta = this.state.tableMeta;

      var newTableMeta = tableMeta;

      for (var k in newTableMeta.cols) {
        if (newTableMeta.cols.hasOwnProperty(k)) {
          if (newTableMeta.cols[k].colKey === colKey) {
            newTableMeta.cols[k].sortState = mode;
          } else {
            newTableMeta.cols[k].sortState = undefined;
          }
        }
      }

      this.state.tableMeta = newTableMeta;
      this.forceUpdate();
    }
  }, {
    key: 'setSearchStateForCol',
    value: function setSearchStateForCol(colKey, searchContent) {
      var tableMeta = this.state.tableMeta;

      var newTableMeta = tableMeta;

      for (var k in newTableMeta.cols) {
        if (newTableMeta.cols.hasOwnProperty(k)) {
          if (newTableMeta.cols[k].colKey === colKey) {
            newTableMeta.cols[k].searchContent = searchContent;
          }
        }
      }
      this.state.tableMeta = newTableMeta;
      this.forceUpdate();
    }
  }, {
    key: 'displayMoreEntries',
    value: function displayMoreEntries(nb) {
      this.state.visibleEntries += nb;
      this.forceUpdate();
    }
  }, {
    key: 'calcColWidth',
    value: function calcColWidth() {
      var _state = this.state,
          tableMeta = _state.tableMeta,
          width = _state.width;

      var newTableMeta = tableMeta;

      var colCount = newTableMeta.cols.length;
      var totWidth = width;

      for (var k in newTableMeta.cols) {
        if (newTableMeta.cols.hasOwnProperty(k)) {
          var col = newTableMeta.cols[k];
          if (col.style && col.style.width) {
            totWidth = totWidth - (col.style.width + 30);
            colCount -= 1;
          }
        }
      }
      this.state.colWidth = totWidth / colCount;
      this.forceUpdate();
    }
  }, {
    key: 'resetSearchStates',
    value: function resetSearchStates() {
      var tableMeta = this.state.tableMeta;

      var newTableMeta = tableMeta;

      for (var k in newTableMeta.cols) {
        if (newTableMeta.cols.hasOwnProperty(k)) {
          newTableMeta.cols[k].searchContent = undefined;
        }
      }
      this.state.tableMeta = newTableMeta;
      this.forceUpdate();
    }
  }, {
    key: 'sortRequest',
    value: function sortRequest(colKey, mode, type) {
      var _props = this.props,
          data = _props.data,
          tableMeta = _props.tableMeta;
      var structuredData = this.state.structuredData;

      if (mode === 'Up') {
        structuredData.sort(function (a, b) {
          return sortUp(a, b, colKey, type);
        });
        this.setSortStatesForCol(colKey, mode);
      }
      if (mode === 'Down') {
        structuredData.sort(function (a, b) {
          return sortDown(a, b, colKey, type);
        });
        this.setSortStatesForCol(colKey, mode);
      }

      if (mode === undefined) {
        this.state.structuredData = getInitialStructuredData(data, tableMeta);
        this.setSortStatesForCol(colKey, undefined);
      }
    }
  }, {
    key: 'searchRequest',
    value: function searchRequest(colKey, searchContent, charIsAdded) {
      var _props2 = this.props,
          data = _props2.data,
          tableMeta = _props2.tableMeta;
      var structuredData = this.state.structuredData;


      this.setSearchStateForCol(colKey, searchContent);

      if (searchContent === undefined) {
        this.state.structuredData = getStructuredData(data, tableMeta);
      } else {
        if (charIsAdded) {
          this.state.structuredData = structuredData.filter(function (a) {
            return filterData(a, colKey, searchContent.toLowerCase());
          });
        } else {
          this.state.structuredData = getStructuredData(data, tableMeta).filter(function (a) {
            return filterData(a, colKey, searchContent.toLowerCase());
          });
        }
      }
      this.forceUpdate();
    }
  }, {
    key: 'table',
    value: function table() {
      var _this3 = this;

      var tableMeta = this.state.tableMeta;
      var height = this.state.height;
      var tableProperties = tableMeta.tableProperties;
      var fullHeight = tableProperties.fullHeight;


      return React.createElement(
        Table,
        {
          onCellClick: function onCellClick(row) {
            var datum = _this3.state.structuredData[row]._datum;
            _this3.props.onCellClick(datum);
          },
          style: { cursor: 'pointer ' },
          fixedHeader: tableProperties.fixedHeader,
          selectable: tableProperties.selectable,
          multiSelectable: tableProperties.multiSelectable,
          height: fullHeight ? String(height) : undefined
        },
        this.tableHeader(),
        this.tableBody()
      );
    }
  }, {
    key: 'handleIconMenu',
    value: function handleIconMenu(e, v) {
      var _props3 = this.props,
          data = _props3.data,
          tableMeta = _props3.tableMeta;

      switch (v) {
        case 'clear':
          this.resetSearchStates();
          this.state.structuredData = getStructuredData(data, tableMeta);
          this.state.visibleEntries = 30;
          this.forceUpdate();
          break;
        case 'stripes':
          this.state.tableMeta.tableBodyProperties.stripedRows = !this.state.tableMeta.tableBodyProperties.stripedRows;
          this.forceUpdate();
          break;
        default:

      }
    }
  }, {
    key: 'tableHeader',
    value: function tableHeader() {
      var tableMeta = this.state.tableMeta;
      var cols = tableMeta.cols,
          tableProperties = tableMeta.tableProperties,
          mutlipleProperties = tableMeta.mutlipleProperties;

      var JSX = [];

      if (tableMeta.superHeader) {
        JSX.push(React.createElement(
          TableRow,
          {
            key: 'TableHeaderColumn',
            style: styles.fullWidth
          },
          React.createElement(
            TableHeaderColumn,
            {
              colSpan: cols.length
            },
            React.createElement(
              'div',
              { style: styles.tableMeta },
              tableMeta.superHeader
            ),
            React.createElement(
              'div',
              { style: styles.iconMenu },
              React.createElement(
                IconMenu,
                {
                  iconButtonElement: React.createElement(
                    IconButton,
                    null,
                    React.createElement(MoreVertIcon, null)
                  ),
                  anchorOrigin: { horizontal: 'left', vertical: 'top' },
                  targetOrigin: { horizontal: 'left', vertical: 'top' },
                  onChange: this.handleIconMenu.bind(this)
                },
                React.createElement(MenuItem, { value: 'clear', primaryText: 'Clear filters' }),
                React.createElement(MenuItem, { value: 'stripes', primaryText: 'Striped Rows' })
              )
            )
          )
        ));
      }

      var tableHeaderColumns = [];

      for (var k in cols) {
        if (cols.hasOwnProperty(k)) {
          var col = cols[k];
          var search = React.createElement(
            'div',
            {
              style: {
                width: col.style && col.style.width ? col.style.width : '100%',
                overflow: 'hidden'
              }
            },
            col.headerTitle
          );
          if (col.searchable === 'STRING') {
            search = React.createElement(SearchField, {
              colKey: col.colKey,
              type: col.type,
              sortState: col.sortState,
              searchState: col.searchContent,
              onFilter: this.sortRequest.bind(this),
              onSearch: this.searchRequest.bind(this),
              hintText: col.headerTitle
            });
          }

          if (col.searchable === 'DATE') {
            search = React.createElement(SearchDate, {
              colKey: col.colKey,
              type: col.type,
              sortState: col.sortState,
              searchState: col.searchContent,
              onFilter: this.sortRequest.bind(this),
              onSearch: this.searchRequest.bind(this),
              hintText: col.headerTitle
            });
          }

          if (col.searchable === 'AUTOCOMPLETE') {
            if (col.autocomplete.type === 'suggest') {
              search = React.createElement(SearchAutoComplete, {
                colKey: col.colKey,
                type: col.type,
                sortState: col.sortState,
                searchState: col.searchContent,
                onFilter: this.sortRequest.bind(this),
                onSearch: this.searchRequest.bind(this),
                dataSource: col.autocomplete.dataSource,
                hintText: col.headerTitle
              });
            }

            if (col.autocomplete.type === 'static') {
              search = React.createElement(SearchSelectfield, {
                colKey: col.colKey,
                type: col.type,
                sortState: col.sortState,
                searchState: col.searchContent,
                onFilter: this.sortRequest.bind(this),
                onSearch: this.searchRequest.bind(this),
                dataSource: col.autocomplete.dataSource,
                hintText: col.headerTitle,
                width: this.state.width
              });
            }
          }

          tableHeaderColumns.push(React.createElement(
            TableHeaderColumn,
            {
              key: 'TableHeaderColumn_' + col.colKey,
              tooltip: col.tooltip,
              style: col.style && col.style.width ? Object.assign({}, col.style, styles.tableRow) : Object.assign({}, {
                width: this.state.colWidth - 30
              }, col.style, styles.tableRow)
            },
            search
          ));
        }
      }

      JSX.push(React.createElement(
        TableRow,
        {
          key: 'TableHeaderColumn_TableRow',
          style: styles.fullWidth
        },
        tableHeaderColumns
      ));

      return React.createElement(
        TableHeader,
        {
          displaySelectAll: mutlipleProperties.showCheckboxes,
          adjustForCheckbox: mutlipleProperties.showCheckboxes,
          enableSelectAll: tableProperties.enableSelectAll,
          style: styles.tableHeader
        },
        JSX
      );
    }
  }, {
    key: 'tableBody',
    value: function tableBody() {
      var _this4 = this;

      var _state2 = this.state,
          tableMeta = _state2.tableMeta,
          structuredData = _state2.structuredData,
          visibleEntries = _state2.visibleEntries;
      var mutlipleProperties = tableMeta.mutlipleProperties,
          tableBodyProperties = tableMeta.tableBodyProperties,
          cols = tableMeta.cols;


      var JSX = [];

      for (var j in structuredData) {
        if (structuredData.hasOwnProperty(j)) {
          var tableRowColumns = [];
          var datum = structuredData[j];

          for (var k in cols) {
            if (cols.hasOwnProperty(k)) {
              var col = cols[k];
              if (col.component) {
                var WarpperComponent = col.component;
                tableRowColumns.push(React.createElement(
                  TableRowColumn,
                  {
                    style: Object.assign({}, col.style, styles.tableRow),
                    key: col.colKey + '_' + datum.id
                  },
                  React.createElement(WarpperComponent, {
                    key: col.colKey + '_' + datum.id,
                    datum: datum._datum,
                    value: datum[col.colKey]
                  })
                ));
              } else {
                tableRowColumns.push(React.createElement(
                  TableRowColumn,
                  {
                    style: Object.assign({}, col.style, styles.tableRow),
                    key: col.colKey + '_' + datum.id
                  },
                  tableBodyProperties.capitalize ? capitalize(String(datum[col.colKey])) : datum[col.colKey]
                ));
              }
            }
          }

          JSX.push(React.createElement(
            TableRow,
            {
              key: '' + datum.id,
              style: styles.tableRow
            },
            tableRowColumns
          ));
        }
      }

      var slicedJSX = JSX.slice(0, visibleEntries);

      return React.createElement(
        TableBody,
        {
          ref: function ref(_ref2) {
            if (!_this4.viewport) {
              _this4.viewport = ReactDOM.findDOMNode(_ref2).parentNode.parentNode;
            }
          },
          displayRowCheckbox: mutlipleProperties.showCheckboxes,
          deselectOnClickaway: tableBodyProperties.deselectOnClickaway,
          showRowHover: tableBodyProperties.showRowHover,
          stripedRows: tableBodyProperties.stripedRows
        },
        slicedJSX,
        slicedJSX.length < JSX.length ? React.createElement(
          'div',
          {
            style: { textAlign: 'center', width: '110vh', padding: 20, paddingBottom: 30 }
          },
          React.createElement(CircularProgress, null)
        ) : null
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var fullHeight = this.props.tableMeta.tableProperties.fullHeight;

      var JSX = React.createElement(
        'div',
        {
          ref: 'wrapper',
          style: fullHeight ? {
            height: 'calc(100vh - 168px)',
            overflow: 'hidden'
          } : undefined
        },
        this.table(),
        React.createElement(WindowResizeListener, { onResize: function onResize() {
            _this5.setDimension();
            _this5.calcColWidth();
          }
        })
      );

      return React.createElement(
        MuiThemeProvider,
        { muiTheme: this.context.muiTheme },
        JSX
      );
    }
  }]);

  return TableWrapper;
}(Component);

TableWrapper.propTypes = {
  tableMeta: PropTypes.object,
  data: PropTypes.array,
  onCellClick: PropTypes.func
};
TableWrapper.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};
export default TableWrapper;