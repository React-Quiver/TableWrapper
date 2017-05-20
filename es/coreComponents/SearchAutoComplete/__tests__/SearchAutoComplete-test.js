import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchAutoComplete', function () {
  it('should exists', function () {
    var SearchAutoComplete = require('../SearchAutoComplete');

    var wrapper = shallow(React.createElement(SearchAutoComplete, null));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', function () {
    var SearchAutoComplete = require('../SearchAutoComplete');

    var wrapper = shallow(React.createElement(SearchAutoComplete, null));

    expect(wrapper.find('div')).to.have.length(1);
  });
});