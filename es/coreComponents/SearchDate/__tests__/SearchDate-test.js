import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchDate', function () {
  it('should exists', function () {
    var SearchDate = require('../SearchDate');

    var wrapper = shallow(React.createElement(SearchDate, null));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', function () {
    var SearchDate = require('../SearchDate');

    var wrapper = shallow(React.createElement(SearchDate, null));

    expect(wrapper.find('div')).to.have.length(1);
  });
});