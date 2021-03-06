import React, { Component, PropTypes } from 'react';

// material-ui
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';

export default class SearchSelectfield extends Component {
  static propTypes = {
    hintText: PropTypes.string,
    sortState: PropTypes.string,
    dataSource: PropTypes.array,
    colKey: PropTypes.string,
    type: PropTypes.string,
    onFilter: PropTypes.func,
    searchState: PropTypes.string,
    onSearch: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: React.PropTypes.object,
  };

  getSelectField() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
    const { hintText, searchState, dataSource } = this.props;
    const JSX = [];

    const text = {
      fontSize: 13,
      color: palette.primary1Color,
    };

    for (const k in dataSource) {
      if (dataSource.hasOwnProperty(k)) {
        const datum = dataSource[k];
        JSX.push(
          <MenuItem
            key={datum}
            value={datum}
            primaryText={datum}
          />
        );
      }
    }

    return (
      <SelectField
        autoWidth
        hintText={hintText}
        underlineShow={false}
        value={searchState}
        onChange={(event, index, value) => this.search(value)}
        style={styles.selectField}
        labelStyle={text}
        hintStyle={styles.selectField}
        // style={styles.selectField}
        iconStyle={{ display: 'none' }}
      >
        {JSX}
      </SelectField>
    );
  }

  search(searchContent) {
    const { colKey, onSearch } = this.props;
    onSearch(colKey, searchContent, false);
  }

  clear() {
    const { colKey, onSearch } = this.props;
    onSearch(colKey, undefined);
  }

  render() {
    const { muiTheme } = this.context;
    const palette = muiTheme ? muiTheme.rawTheme.palette : undefined;
    const { searchState } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: 35,
          background: searchState && palette ? palette.accent2Color : '#ececec',
          borderRadius: 3,
        }}
      >
        <div>
          <FilterArrow
            sortState={this.props.sortState}
            onFilter={this.props.onFilter}
            colKey={this.props.colKey}
            type={this.props.type}
          />
        </div>
        {this.getSelectField()}
      { (searchState !== '') && (searchState !== undefined) ?
        <div
          onClick={::this.clear}
        >
          <Close
            color={ (searchState !== '') && (searchState !== undefined) && palette ?
              palette.primary1Color : undefined }
            style={styles.close}
          />
      </div> : null
      }
      </div>
    );
  }
}
