import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('FilterArrow', function () {
  it('should exists', function () {
    var FilterArrow = require('../FilterArrow');

    var wrapper = shallow(React.createElement(FilterArrow, null));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', function () {
    var FilterArrow = require('../FilterArrow');

    var wrapper = shallow(React.createElement(FilterArrow, null));

    expect(wrapper.find('div')).to.have.length(1);
  });
});