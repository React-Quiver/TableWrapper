'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Table = require('material-ui/Table');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactWindowResizeListener = require('react-window-resize-listener');

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _SearchField = require('./coreComponents/SearchField');

var _SearchField2 = _interopRequireDefault(_SearchField);

var _SearchDate = require('./coreComponents/SearchDate');

var _SearchDate2 = _interopRequireDefault(_SearchDate);

var _SearchAutoComplete = require('./coreComponents/SearchAutoComplete');

var _SearchAutoComplete2 = _interopRequireDefault(_SearchAutoComplete);

var _SearchSelectfield = require('./coreComponents/SearchSelectfield');

var _SearchSelectfield2 = _interopRequireDefault(_SearchSelectfield);

var _helpers = require('./helpers');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// material-ui


// custom elements


// helpers


// styles


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
      structuredData: (0, _helpers.getInitialStructuredData)(data, tableMeta),
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
        this.state.structuredData = (0, _helpers.getStructuredData)(nextProps.data, this.state.tableMeta);
        this.forceUpdate();
      }
    }
  }, {
    key: 'setDimension',
    value: function setDimension() {
      this.state.height = _reactDom2.default.findDOMNode(this.refs.wrapper).clientHeight - 123;
      this.state.width = _reactDom2.default.findDOMNode(this.refs.wrapper).clientWidth;
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
          return (0, _helpers.sortUp)(a, b, colKey, type);
        });
        this.setSortStatesForCol(colKey, mode);
      }
      if (mode === 'Down') {
        structuredData.sort(function (a, b) {
          return (0, _helpers.sortDown)(a, b, colKey, type);
        });
        this.setSortStatesForCol(colKey, mode);
      }

      if (mode === undefined) {
        this.state.structuredData = (0, _helpers.getInitialStructuredData)(data, tableMeta);
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
        this.state.structuredData = (0, _helpers.getStructuredData)(data, tableMeta);
      } else {
        if (charIsAdded) {
          this.state.structuredData = structuredData.filter(function (a) {
            return (0, _helpers.filterData)(a, colKey, searchContent.toLowerCase());
          });
        } else {
          this.state.structuredData = (0, _helpers.getStructuredData)(data, tableMeta).filter(function (a) {
            return (0, _helpers.filterData)(a, colKey, searchContent.toLowerCase());
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


      return _react2.default.createElement(
        _Table.Table,
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
          this.state.structuredData = (0, _helpers.getStructuredData)(data, tableMeta);
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
        JSX.push(_react2.default.createElement(
          _Table.TableRow,
          {
            key: 'TableHeaderColumn',
            style: _styles2.default.fullWidth
          },
          _react2.default.createElement(
            _Table.TableHeaderColumn,
            {
              colSpan: cols.length
            },
            _react2.default.createElement(
              'div',
              { style: _styles2.default.tableMeta },
              tableMeta.superHeader
            ),
            _react2.default.createElement(
              'div',
              { style: _styles2.default.iconMenu },
              _react2.default.createElement(
                _IconMenu2.default,
                {
                  iconButtonElement: _react2.default.createElement(
                    _IconButton2.default,
                    null,
                    _react2.default.createElement(_moreVert2.default, null)
                  ),
                  anchorOrigin: { horizontal: 'left', vertical: 'top' },
                  targetOrigin: { horizontal: 'left', vertical: 'top' },
                  onChange: this.handleIconMenu.bind(this)
                },
                _react2.default.createElement(_MenuItem2.default, { value: 'clear', primaryText: 'Clear filters' }),
                _react2.default.createElement(_MenuItem2.default, { value: 'stripes', primaryText: 'Striped Rows' })
              )
            )
          )
        ));
      }

      var tableHeaderColumns = [];

      for (var k in cols) {
        if (cols.hasOwnProperty(k)) {
          var col = cols[k];
          var search = _react2.default.createElement(
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
            search = _react2.default.createElement(_SearchField2.default, {
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
            search = _react2.default.createElement(_SearchDate2.default, {
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
              search = _react2.default.createElement(_SearchAutoComplete2.default, {
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
              search = _react2.default.createElement(_SearchSelectfield2.default, {
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

          tableHeaderColumns.push(_react2.default.createElement(
            _Table.TableHeaderColumn,
            {
              key: 'TableHeaderColumn_' + col.colKey,
              tooltip: col.tooltip,
              style: col.style && col.style.width ? Object.assign({}, col.style, _styles2.default.tableRow) : Object.assign({}, {
                width: this.state.colWidth - 30
              }, col.style, _styles2.default.tableRow)
            },
            search
          ));
        }
      }

      JSX.push(_react2.default.createElement(
        _Table.TableRow,
        {
          key: 'TableHeaderColumn_TableRow',
          style: _styles2.default.fullWidth
        },
        tableHeaderColumns
      ));

      return _react2.default.createElement(
        _Table.TableHeader,
        {
          displaySelectAll: mutlipleProperties.showCheckboxes,
          adjustForCheckbox: mutlipleProperties.showCheckboxes,
          enableSelectAll: tableProperties.enableSelectAll,
          style: _styles2.default.tableHeader
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
                tableRowColumns.push(_react2.default.createElement(
                  _Table.TableRowColumn,
                  {
                    style: Object.assign({}, col.style, _styles2.default.tableRow),
                    key: col.colKey + '_' + datum.id
                  },
                  _react2.default.createElement(WarpperComponent, {
                    key: col.colKey + '_' + datum.id,
                    datum: datum._datum,
                    value: datum[col.colKey]
                  })
                ));
              } else {
                tableRowColumns.push(_react2.default.createElement(
                  _Table.TableRowColumn,
                  {
                    style: Object.assign({}, col.style, _styles2.default.tableRow),
                    key: col.colKey + '_' + datum.id
                  },
                  tableBodyProperties.capitalize ? (0, _helpers.capitalize)(String(datum[col.colKey])) : datum[col.colKey]
                ));
              }
            }
          }

          JSX.push(_react2.default.createElement(
            _Table.TableRow,
            {
              key: '' + datum.id,
              style: _styles2.default.tableRow
            },
            tableRowColumns
          ));
        }
      }

      var slicedJSX = JSX.slice(0, visibleEntries);

      return _react2.default.createElement(
        _Table.TableBody,
        {
          ref: function ref(_ref2) {
            if (!_this4.viewport) {
              _this4.viewport = _reactDom2.default.findDOMNode(_ref2).parentNode.parentNode;
            }
          },
          displayRowCheckbox: mutlipleProperties.showCheckboxes,
          deselectOnClickaway: tableBodyProperties.deselectOnClickaway,
          showRowHover: tableBodyProperties.showRowHover,
          stripedRows: tableBodyProperties.stripedRows
        },
        slicedJSX,
        slicedJSX.length < JSX.length ? _react2.default.createElement(
          'div',
          {
            style: { textAlign: 'center', width: '110vh', padding: 20, paddingBottom: 30 }
          },
          _react2.default.createElement(_CircularProgress2.default, null)
        ) : null
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var fullHeight = this.props.tableMeta.tableProperties.fullHeight;

      var JSX = _react2.default.createElement(
        'div',
        {
          ref: 'wrapper',
          style: fullHeight ? {
            height: 'calc(100vh - 168px)',
            overflow: 'hidden'
          } : undefined
        },
        this.table(),
        _react2.default.createElement(_reactWindowResizeListener.WindowResizeListener, { onResize: function onResize() {
            _this5.setDimension();
            _this5.calcColWidth();
          }
        })
      );

      return this.context.muiTheme ? JSX : _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        JSX
      );
    }
  }]);

  return TableWrapper;
}(_react.Component);

TableWrapper.propTypes = {
  tableMeta: _react.PropTypes.object,
  data: _react.PropTypes.array,
  onCellClick: _react.PropTypes.func
};
exports.default = TableWrapper;
module.exports = exports['default'];