import React, { Component, PropTypes } from 'react';
import dateformat from 'dateformat';

// material-ui
import DatePicker from 'material-ui/DatePicker';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';

export default class SearchDate extends Component {
  static propTypes = {
    hintText: PropTypes.string,
    sortState: PropTypes.string,
    colKey: PropTypes.string,
    onFilter: PropTypes.func,
    type: PropTypes.string,
    searchState: PropTypes.string,
    onSearch: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: React.PropTypes.object,
  };

  search(searchContent) {
    const date = new Date(searchContent);
    const dateString = dateformat(date, 'yyyy-mm-dd');
    const { colKey, onSearch } = this.props;
    onSearch(colKey, dateString, false);
  }

  clear() {
    const { colKey, onSearch } = this.props;
    onSearch(colKey, undefined);
  }

  render() {
    const { muiTheme } = this.context;
    const palette = muiTheme ? muiTheme.rawTheme.palette : undefined;
    const { hintText, searchState } = this.props;

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
        <DatePicker
          inputStyle=
          {{
            color: (searchState !== '') && palette ? palette.primary1Color : undefined,
          }}
          value={searchState ? new Date(searchState) : undefined}
          onChange={
            (e, date) => this.search(date)
          }
          textFieldStyle={styles.text}
          underlineShow={false}
          hintText={hintText}
          container="inline"
        />
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
