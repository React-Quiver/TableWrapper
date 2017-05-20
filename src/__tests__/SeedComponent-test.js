jest.unmock('../TableWrapper');

import React from 'react';
import { shallow } from 'enzyme';

describe('TableWrapper', () => {
  it('should work', () => {
    const TableWrapper = require('../TableWrapper');
    const wrapper = shallow(
      <TableWrapper />
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('Hay.');
  });

  it('should render all the card components', () => {
    const TableWrapper = require('../TableWrapper');
    const wrapper = shallow(
      <TableWrapper text="It works!" />
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('It works!');
  });
});
