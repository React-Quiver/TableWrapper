import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchField', function () {
  it('should exists', function () {
    var SearchField = require('../SearchField');

    var wrapper = shallow(React.createElement(SearchField, null));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', function () {
    var SearchField = require('../SearchField');

    var wrapper = shallow(React.createElement(SearchField, null));

    expect(wrapper.find('div')).to.have.length(1);
  });
});