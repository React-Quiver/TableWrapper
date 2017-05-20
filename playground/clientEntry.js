import React from 'react';
import ReactDOM from 'react-dom';
import Playground from 'component-playground';
import TableWrapper from '../src';

const TableWrapperExample = require('raw!../src/TableWrapper.example');

const Index = () => (
  <div className="component-documentation">
    <Playground codeText={TableWrapperExample} scope={{ React, TableWrapper }} />
  </div>
);

ReactDOM.render(<Index />, document.getElementById('root'));

if (__ONBUILD_REACT_PERF__) {
  window.Perf = require('react-addons-perf');
}
