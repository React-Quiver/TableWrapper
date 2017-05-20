'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortDown = sortDown;
exports.sortUp = sortUp;
exports.filterData = filterData;
exports.getValue = getValue;
exports.getInitialStructuredData = getInitialStructuredData;
exports.getStructuredData = getStructuredData;
exports.capitalize = capitalize;
function sortDown(a, b, colKey, type) {
  var nameA = undefined;
  var nameB = undefined;

  if (type === 'NUMBER') {
    nameA = a[colKey] ? Number(a[colKey]) : -999999999;
    nameB = b[colKey] ? Number(b[colKey]) : -999999999;
  } else {
    nameA = a[colKey] ? String(a[colKey]).toLowerCase() : 'z';
    nameB = b[colKey] ? String(b[colKey]).toLowerCase() : 'z';
  }

  if (nameA > nameB) {
    return 1;
  }

  if (nameA < nameB) {
    return -1;
  }

  return 0;
}

function sortUp(a, b, colKey, type) {
  var nameA = undefined;
  var nameB = undefined;

  if (type === 'NUMBER') {
    nameA = a[colKey] ? Number(a[colKey]) : -999999999;
    nameB = b[colKey] ? Number(b[colKey]) : -999999999;
  } else {
    nameA = a[colKey] ? String(a[colKey]).toLowerCase() : 'z';
    nameB = b[colKey] ? String(b[colKey]).toLowerCase() : 'z';
  }

  if (nameA < nameB) {
    return 1;
  }

  if (nameA > nameB) {
    return -1;
  }

  return 0;
}

function filterData(a, colKey, searchContent) {
  var nameA = a[colKey] ? String(a[colKey]).toLowerCase() : '';

  if (nameA.indexOf(searchContent) !== -1) {
    return true;
  }

  return false;
}

function getValue(js, path) {
  var dotSplittedPath = path.split('.');
  var val = js;

  for (var k in dotSplittedPath) {
    if (dotSplittedPath.hasOwnProperty(k)) {
      var subPath = dotSplittedPath[k];

      var arraySplit = subPath.split('[');
      if (arraySplit.length > 1) {
        var index = Number(arraySplit[1].charAt(0));
        val = val[arraySplit[0]][index];
      } else {
        val = val[subPath];
      }
    }
  }

  return val;
}

function getInitialStructuredData(data, tableMeta) {
  var cols = tableMeta.cols;

  var structuredData = [];

  for (var j in data) {
    if (data.hasOwnProperty(j)) {
      var datum = data[j];
      var structuredDatum = [];
      for (var k in cols) {
        if (cols.hasOwnProperty(k)) {
          var col = cols[k];
          var val = '';
          for (var l in col.dataPath) {
            if (col.dataPath.hasOwnProperty(l)) {
              var path = col.dataPath[l];
              val += getValue(datum, path);
            }
          }

          structuredDatum[col.colKey] = val;
        }
      }

      structuredDatum._datum = datum;
      structuredData.push(structuredDatum);
    }
  }

  return structuredData;
}

function getStructuredData(data, tableMeta) {
  var cols = tableMeta.cols;

  var structuredData = getInitialStructuredData(data, tableMeta);

  for (var k in cols) {
    if (cols.hasOwnProperty(k)) {
      (function () {
        var col = cols[k];
        if (col.searchContent) {
          structuredData = structuredData.filter(function (a) {
            return filterData(a, col.colKey, col.searchContent.toLowerCase());
          } // eslint-disable-line
          );
        }
      })();
    }
  }

  return structuredData;
}

function capitalize(str) {
  if (str) {
    var pieces = str.split(' ');
    for (var i = 0; i < pieces.length; i++) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1).toLowerCase();
    }

    return pieces.join(' ');
  }

  return undefined;
}