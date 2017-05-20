'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _dirtyChai = require('dirty-chai');

var _dirtyChai2 = _interopRequireDefault(_dirtyChai);

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_dirtyChai2.default);

describe.skip('SearchDate', function () {
  it('should exists', function () {
    var SearchDate = require('../SearchDate');

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(SearchDate, null));

    (0, _chai.expect)(wrapper).to.have.length(1);
  });

  it('should render inner components', function () {
    var SearchDate = require('../SearchDate');

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(SearchDate, null));

    (0, _chai.expect)(wrapper.find('div')).to.have.length(1);
  });
});