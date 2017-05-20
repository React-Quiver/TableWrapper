import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchSelectfield', function () {
  it('should exists', function () {
    var SearchSelectfield = require('../SearchSelectfield');

    var wrapper = shallow(React.createElement(SearchSelectfield, null));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', function () {
    var SearchSelectfield = require('../SearchSelectfield');

    var wrapper = shallow(React.createElement(SearchSelectfield, null));

    expect(wrapper.find('div')).to.have.length(1);
  });
});