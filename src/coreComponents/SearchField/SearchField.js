import React, { Component, PropTypes } from 'react';

// material-ui
import TextField from 'material-ui/TextField';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';

export default class SearchField extends Component {
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

  state = {
    lastSearchContent: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchState === undefined) {
      this.state.lastSearchContent = '';
    }
  }

  search(searchContent) {
    const { lastSearchContent } = this.state;
    const { colKey, onSearch } = this.props;
    const charIsAdded = searchContent.length > lastSearchContent.length;
    onSearch(colKey, searchContent, charIsAdded);
    this.state.lastSearchContent = searchContent;
  }

  clear() {
    const { colKey, onSearch } = this.props;
    this.setState({ content: '' });
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
        <TextField
          inputStyle=
          {{
            color: (searchState !== '') && palette ? palette.primary1Color : undefined,
          }}
          value={ searchState || '' }
          onChange={
            (e) => this.search(e.target.value)
          }
          style={styles.text}
          underlineShow={false}
          hintText={hintText}
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
