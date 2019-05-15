(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;require.register("child_process", function(exports, require, module) {
  module.exports = {};
});
require.register("fs", function(exports, require, module) {
  module.exports = {};
});
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("app.scss", function(exports, require, module) {
module.exports = {};
});

require.register("components/app.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

var _legend = require('./legend');

var _legend2 = _interopRequireDefault(_legend);

var _inputs = require('./inputs');

var _inputs2 = _interopRequireDefault(_inputs);

var _app = require('../theme/app.scss');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: change this to the deployed URL!
var apiBase = 'https://siwenna.colorado.edu:8000';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      showCells: true,
      showCellLabels: false,
      showPatches: true,
      showPatchLabels: false,
      showLinks: true,
      showLinkLabels: false,
      showFaces: true,
      showFaceLabels: false,
      showNodes: true,
      showNodeLabels: false,
      showCorners: true,
      showCornerLabels: false,
      graph: {},
      grid: 'raster',
      rows: 3,
      cols: 4,
      spacing: 10,
      layout: 'hex',
      orientation: 'horizontal'
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var APIurl = apiBase + '/graphs/' + this.state.grid + '?shape=' + this.state.rows + ',' + this.state.cols + '&spacing=' + this.state.spacing;

      _axios2.default.get(APIurl).then(function (response) {
        _this2.setState({ graph: response.data.graph });
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      var _this3 = this;

      var newGrid = this.state.grid !== state.grid;
      var newRows = this.state.rows !== state.rows;
      var newCols = this.state.cols !== state.cols;
      var newLayout = this.state.layout !== state.layout;
      var newOrientation = this.state.orientation !== state.orientation;
      var spacing = this.state.grid === 'hex' || 'radial' ? this.state.spacing : this.state.spacing + ',' + this.state.spacing;
      var layoutQuery = this.state.grid === 'hex' ? '&node_layout=' + this.state.layout : '';
      var orientationQuery = this.state.grid === 'hex' ? '&orientation=' + this.state.orientation : '';
      var newGraph = newGrid || newRows || newCols || newLayout || newOrientation;
      var APIurl = apiBase + '/graphs/' + this.state.grid + '?shape=' + this.state.rows + ',' + this.state.cols + '&spacing=' + spacing + layoutQuery + orientationQuery;

      if (newGraph) {
        _axios2.default.get(APIurl).then(function (response) {
          _this3.setState({ graph: response.data.graph });
        });
      }
    }
  }, {
    key: 'updateGridValues',
    value: function updateGridValues(event) {
      var isString = isNaN(+event.target.value);
      this.setState(_defineProperty({}, event.target.name, isString ? event.target.value : +event.target.value));
    }
  }, {
    key: 'toggleActiveLayers',
    value: function toggleActiveLayers(event) {
      this.setState(_defineProperty({}, event.target.value, !this.state[event.target.value]));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var activeLayers = {
        cells: this.state.showCells,
        cellLabels: this.state.showCellLabels,
        patches: this.state.showPatches,
        patchLabels: this.state.showPatchLabels,
        links: this.state.showLinks,
        linkLabels: this.state.showLinkLabels,
        faces: this.state.showFaces,
        faceLabels: this.state.showFaceLabels,
        nodes: this.state.showNodes,
        nodeLabels: this.state.showNodeLabels,
        corners: this.state.showCorners,
        cornerLabels: this.state.showCornerLabels
      };

      return this.state.graph.data_vars ? _react2.default.createElement(
        'div',
        { className: _app2.default.chart },
        _react2.default.createElement(_inputs2.default, {
          grid: this.state.grid,
          rows: this.state.rows,
          cols: this.state.cols,
          layout: this.state.layout,
          orientation: this.state.orientation,
          onChange: function onChange(e) {
            return _this4.updateGridValues(e);
          }
        }),
        _react2.default.createElement(_grid2.default, {
          nodeX: this.state.graph.data_vars.x_of_node.data,
          nodeY: this.state.graph.data_vars.y_of_node.data,
          patchLinks: this.state.graph.data_vars.links_at_patch.data,
          cornerX: this.state.graph.data_vars.x_of_corner.data,
          cornerY: this.state.graph.data_vars.y_of_corner.data,
          cellFaces: this.state.graph.data_vars.faces_at_cell.data,
          linkLine: this.state.graph.data_vars.nodes_at_link.data,
          faceLine: this.state.graph.data_vars.corners_at_face.data,
          show: activeLayers,
          spacing: this.state.spacing * 1
        }),
        _react2.default.createElement(_legend2.default, {
          active: activeLayers,
          onChange: function onChange(e) {
            return _this4.toggleActiveLayers(e);
          }
        })
      ) : null;
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

require.register("components/grid.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _grid = require('../theme/grid.scss');

var _grid2 = _interopRequireDefault(_grid);

var _node = require('../theme/node.scss');

var _node2 = _interopRequireDefault(_node);

var _cell = require('../theme/cell.scss');

var _cell2 = _interopRequireDefault(_cell);

var _link = require('../theme/link.scss');

var _link2 = _interopRequireDefault(_link);

var _patch = require('../theme/patch.scss');

var _patch2 = _interopRequireDefault(_patch);

var _corner = require('../theme/corner.scss');

var _corner2 = _interopRequireDefault(_corner);

var _face = require('../theme/face.scss');

var _face2 = _interopRequireDefault(_face);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_React$Component) {
  _inherits(Grid, _React$Component);

  function Grid() {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this));

    _this.state = {
      node: false,
      activeNode: null,
      cell: false,
      activeCell: null,
      face: false,
      activeFace: null,
      link: false,
      activeLink: null,
      patch: false,
      activePatch: null,
      corner: false,
      activeCorner: null
    };
    return _this;
  }

  _createClass(Grid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          nodeX = _props.nodeX,
          nodeY = _props.nodeY,
          patchLinks = _props.patchLinks,
          cornerX = _props.cornerX,
          cornerY = _props.cornerY,
          cellFaces = _props.cellFaces,
          linkLine = _props.linkLine,
          faceLine = _props.faceLine,
          spacing = _props.spacing,
          show = _props.show;


      var xExtent = d3.extent(nodeX);
      var yExtent = d3.extent(nodeY);

      var margin = { top: spacing / 4, right: spacing / 4, bottom: spacing / 4, left: spacing / 4 };
      var innerWidth = xExtent[1] - xExtent[0];
      var innerHeight = yExtent[1] - yExtent[0];
      var marginLeftOffset = margin.left - xExtent[0];
      var marginTopOffset = margin.top + yExtent[0];
      var chartHeight = innerHeight + margin.top + margin.bottom;
      var chartWidth = innerWidth + margin.left + margin.right;
      var half = spacing / 2;

      var yScale = d3.scaleLinear().domain([0, innerHeight]).range([innerHeight, 0]);

      var nodes = nodeX.map(function (d, i) {
        return _react2.default.createElement(
          'g',
          { key: 'node' + -i },
          _react2.default.createElement('circle', {
            className: show.nodes ? show.nodeLabels ? _node2.default.highlight : _node2.default.node : _node2.default.none,
            cx: d,
            cy: yScale(nodeY[i]),
            r: 0.7,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ node: true, activeNode: i });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ node: false, activeNode: null });
            }
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeNode === i || show.nodeLabels ? _node2.default.activeLabel : _node2.default.none,
              x: d,
              dy: -1,
              y: yScale(nodeY[i]),
              textAnchor: 'middle'
            },
            'node ',
            i
          )
        );
      });

      var corners = cornerX.map(function (d, i) {
        return _react2.default.createElement(
          'g',
          { key: 'corner' + -i },
          _react2.default.createElement('circle', {
            className: show.corners ? show.cornerLabels ? _corner2.default.highlight : _corner2.default.corner : _corner2.default.none,
            cx: d,
            cy: yScale(cornerY[i]),
            r: 0.7,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ corner: true, activeCorner: i });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ corner: false, activeCorner: null });
            }
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeCorner === i || show.cornerLabels ? _corner2.default.activeLabel : _corner2.default.none,
              x: d,
              dy: -1,
              y: yScale(cornerY[i]),
              textAnchor: 'middle'
            },
            'corner ',
            i
          )
        );
      });

      var getPath = function getPath(verticies, element) {
        var coordinates = verticies.map(function (c) {
          if (element === 'node') {
            return nodeX[c] + ' ' + yScale(nodeY[c]);
          } else if (element === 'corner') {
            return cornerX[c] + ' ' + yScale(cornerY[c]);
          }
          return null;
        });
        var d = 'M ' + coordinates + ' Z';
        return d;
      };

      var getVerticies = function getVerticies(vector, element) {
        var verticieSet = void 0;
        if (element === 'node') {
          verticieSet = new Set(vector.map(function (v) {
            return linkLine[v];
          }).flat());
        }
        if (element === 'corner') {
          verticieSet = new Set(vector.map(function (v) {
            return faceLine[v];
          }).flat());
        }
        return [].concat(_toConsumableArray(verticieSet));
      };

      var cellCorners = cellFaces.map(function (cellFace) {
        return getVerticies(cellFace, 'corner');
      });
      var patchNodes = patchLinks.map(function (patchLink) {
        return getVerticies(patchLink, 'node');
      });

      var cellTextPosition = cellCorners.map(function (d) {
        var position = {
          x: cornerX[d[1]] - half,
          y: yScale(cornerY[d[1]] - half / 2)
        };
        return position;
      });

      var patchTextPosition = patchNodes.map(function (d) {
        var position = d.length % 3 === 0 ? {
          x: (nodeX[d[0]] + nodeX[d[1]] + nodeX[d[2]]) / 3,
          y: yScale((nodeY[d[0]] + nodeY[d[1]] + nodeY[d[2]]) / 3)
        } : {
          x: nodeX[d[1]] - half,
          y: yScale(nodeY[d[1]] - half / 2)
        };
        return position;
      });

      var cells = cellCorners.map(function (d, i) {
        return _react2.default.createElement(
          'g',
          {
            key: 'cell' + -i,
            className: show.cells ? show.cellLabels ? _cell2.default.highlight : _cell2.default.cell : _cell2.default.none,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ cell: true, activeCell: i });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ cell: false, activeCell: null });
            }
          },
          _react2.default.createElement('path', {
            d: getPath(d, 'corner')
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeCell === i || show.cellLabels ? _cell2.default.activeLabel : _cell2.default.none,
              x: cellTextPosition[i].x,
              y: cellTextPosition[i].y,
              textAnchor: 'middle'
            },
            'cell ',
            i
          )
        );
      });

      var patches = patchNodes.map(function (d, i) {
        return _react2.default.createElement(
          'g',
          {
            className: show.patches ? show.patchLabels ? _patch2.default.highlight : _patch2.default.patch : _patch2.default.none,
            key: 'patch' + -i,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ patch: true, activePatch: i });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ patch: false, activePatch: null });
            }
          },
          _react2.default.createElement('path', {
            d: getPath(d, 'node')
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activePatch === i || show.patchLabels ? _patch2.default.activeLabel : _patch2.default.none,
              x: patchTextPosition[i].x,
              y: patchTextPosition[i].y,
              textAnchor: 'middle'
            },
            'patch ',
            i
          )
        );
      });

      var faces = faceLine.map(function (d, i) {
        var vertical = cornerX[d[0]] === cornerX[d[1]];
        var textClassnames = (0, _classnames2.default)(_this2.state.activeFace === i || show.faceLabels ? _face2.default.activeLabel : _face2.default.none, vertical && _face2.default.vertical);
        return _react2.default.createElement(
          'g',
          {
            key: 'face' + -i,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ face: true, activeFace: i });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ face: false, activeFace: null });
            }
          },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'marker',
              {
                className: _face2.default.arrow,
                id: 'face',
                orient: 'auto',
                viewBox: '-6 -6 12 12',
                refX: 5,
                refY: 0,
                markerHeight: 2
              },
              _react2.default.createElement('path', { d: 'M -4 -4 0 0 -4 4' })
            )
          ),
          _react2.default.createElement('line', {
            className: show.faces ? show.faceLabels ? _face2.default.highlight : _face2.default.face : _face2.default.none,
            x1: cornerX[d[0]],
            x2: cornerX[d[1]],
            y1: yScale(cornerY[d[0]]),
            y2: yScale(cornerY[d[1]]),
            markerEnd: 'url(#face)'
          }),
          _react2.default.createElement(
            'text',
            {
              className: textClassnames,
              x: (cornerX[d[0]] + cornerX[d[1]]) / 2,
              y: yScale((cornerY[d[0]] + cornerY[d[1]]) / 2),
              dx: vertical ? 0.1 : 0,
              dy: vertical ? 0 : 0.3,
              textAnchor: 'middle'
            },
            'face ',
            i
          )
        );
      });

      var links = linkLine.map(function (d, i) {
        var vertical = nodeX[d[0]] === nodeX[d[1]];
        var textClassnames = (0, _classnames2.default)(_this2.state.activeLink === i || show.linkLabels ? _link2.default.activeLabel : _link2.default.none, vertical && _link2.default.vertical);

        return _react2.default.createElement(
          'g',
          {
            key: 'link' + -i,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ link: true, activeLink: i });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ link: false, activeLink: null });
            }
          },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'marker',
              {
                className: _link2.default.arrow,
                id: 'head',
                orient: 'auto',
                viewBox: '-6 -6 12 12',
                refX: 5,
                refY: 0,
                markerHeight: 2
              },
              _react2.default.createElement('path', { d: 'M -4 -4 0 0 -4 4' })
            )
          ),
          _react2.default.createElement('line', {
            className: show.links ? show.linkLabels ? _link2.default.highlight : _link2.default.link : _link2.default.none,
            x1: nodeX[d[0]],
            x2: nodeX[d[1]],
            y1: yScale(nodeY[d[0]]),
            y2: yScale(nodeY[d[1]]),
            markerEnd: 'url(#head)'
          }),
          _react2.default.createElement(
            'text',
            {
              className: textClassnames,
              x: (nodeX[d[0]] + nodeX[d[1]]) / 2,
              y: yScale((nodeY[d[0]] + nodeY[d[1]]) / 2),
              dx: vertical ? 0.1 : 0,
              dy: vertical ? 0 : 0.3,
              textAnchor: 'middle'
            },
            'link ',
            i
          )
        );
      });

      return _react2.default.createElement(
        'svg',
        { className: _grid2.default.chart, viewBox: '0 0 ' + chartWidth + ' ' + chartHeight, width: '80vw' },
        _react2.default.createElement(
          'g',
          { transform: 'translate(' + marginLeftOffset + ' ' + marginTopOffset + ')' },
          patches,
          cells,
          links,
          faces,
          nodes,
          corners
        )
      );
    }
  }]);

  return Grid;
}(_react2.default.Component);

Grid.propTypes = {
  nodeX: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
  nodeY: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
  patchLinks: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.array).isRequired,
  cornerX: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
  cornerY: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
  cellFaces: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.array).isRequired,
  linkLine: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.array).isRequired,
  faceLine: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.array).isRequired,
  spacing: _react2.default.PropTypes.number.isRequired,
  show: _react2.default.PropTypes.shape({
    cells: _react2.default.PropTypes.bool,
    cellLabels: _react2.default.PropTypes.bool,
    patches: _react2.default.PropTypes.bool,
    patchLabels: _react2.default.PropTypes.bool,
    links: _react2.default.PropTypes.bool,
    linkLabels: _react2.default.PropTypes.bool,
    faces: _react2.default.PropTypes.bool,
    faceLabels: _react2.default.PropTypes.bool,
    nodes: _react2.default.PropTypes.bool,
    nodeLabels: _react2.default.PropTypes.bool,
    corners: _react2.default.PropTypes.bool,
    cornerLabels: _react2.default.PropTypes.bool
  }).isRequired
};

exports.default = Grid;
});

require.register("components/inputs.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inputs = require('../theme/inputs.scss');

var _inputs2 = _interopRequireDefault(_inputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Inputs = function Inputs(props) {
  var grid = props.grid,
      rows = props.rows,
      cols = props.cols,
      layout = props.layout,
      orientation = props.orientation,
      onChange = props.onChange;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'form',
      { className: _inputs2.default.form },
      _react2.default.createElement(
        'label',
        { className: _inputs2.default.label, htmlFor: 'grid' },
        'Grid',
        _react2.default.createElement(
          'select',
          { className: _inputs2.default.select, name: 'grid', value: grid, onChange: onChange },
          _react2.default.createElement('option', { disabled: true, value: '' }),
          _react2.default.createElement(
            'option',
            { value: 'raster' },
            'raster'
          ),
          _react2.default.createElement(
            'option',
            { value: 'hex' },
            'hex'
          ),
          _react2.default.createElement(
            'option',
            { disabled: true, value: 'radial' },
            'radial'
          )
        )
      ),
      grid === 'radial' ? _react2.default.createElement(
        'label',
        { className: _inputs2.default.label, htmlFor: 'rows' },
        'Number of Rings',
        _react2.default.createElement('input', { className: _inputs2.default.input, type: 'number', max: '5', min: '1', placeholder: 'rows', name: 'rows', value: rows, onChange: onChange })
      ) : _react2.default.createElement(
        'label',
        { className: _inputs2.default.label, htmlFor: 'rows' },
        'Rows',
        _react2.default.createElement('input', { className: _inputs2.default.input, type: 'number', max: '9', min: '3', placeholder: 'rows', name: 'rows', value: rows, onChange: onChange })
      ),
      _react2.default.createElement(
        'label',
        { className: _inputs2.default.label, htmlFor: 'cols' },
        grid === 'radial' ? 'Points in First Ring' : 'Columns',
        _react2.default.createElement('input', { className: _inputs2.default.input, type: 'number', max: '9', min: '0', placeholder: 'cols', name: 'cols', value: cols, onChange: onChange })
      ),
      grid === 'hex' && _react2.default.createElement(
        'div',
        { className: _inputs2.default.hexOptions },
        _react2.default.createElement(
          'label',
          { className: _inputs2.default.label, htmlFor: 'layout' },
          'Node Layout',
          _react2.default.createElement(
            'select',
            { className: _inputs2.default.select, name: 'layout', value: layout, onChange: onChange },
            _react2.default.createElement('option', { disabled: true, value: '' }),
            _react2.default.createElement(
              'option',
              { value: 'rect' },
              'rectangular'
            ),
            _react2.default.createElement(
              'option',
              { value: 'hex' },
              'hexagonal'
            )
          )
        ),
        _react2.default.createElement(
          'label',
          { className: _inputs2.default.label, htmlFor: 'orientation' },
          'Orientation',
          _react2.default.createElement(
            'select',
            { className: _inputs2.default.select, name: 'orientation', value: orientation, onChange: onChange },
            _react2.default.createElement('option', { disabled: true, value: '' }),
            _react2.default.createElement(
              'option',
              { value: 'horizontal' },
              'horizontal'
            ),
            _react2.default.createElement(
              'option',
              { disabled: true, value: 'vertical' },
              'vertical'
            )
          )
        )
      )
    )
  );
};

Inputs.propTypes = {
  grid: _react2.default.PropTypes.string.isRequired,
  rows: _react2.default.PropTypes.number.isRequired,
  cols: _react2.default.PropTypes.number.isRequired,
  layout: _react2.default.PropTypes.string.isRequired,
  orientation: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired
};

exports.default = Inputs;
});

require.register("components/legend.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _legend = require('../theme/legend.scss');

var _legend2 = _interopRequireDefault(_legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Legend = function Legend(props) {
  return _react2.default.createElement(
    'div',
    { className: _legend2.default.container },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Areas'
      ),
      _react2.default.createElement(
        'section',
        { className: _legend2.default.section },
        _react2.default.createElement(
          'div',
          { className: _legend2.default.column },
          _react2.default.createElement(
            'button',
            { className: props.active.cells ? _legend2.default.cellButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showCells' },
            'Cells'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.cellLabels ? _legend2.default.cellButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showCellLabels' },
            'Show IDs'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _legend2.default.column },
          _react2.default.createElement(
            'button',
            { className: props.active.patches ? _legend2.default.patchButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showPatches' },
            'Patches'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.patchLabels ? _legend2.default.patchButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showPatchLabels' },
            'Show IDs'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Vectors'
      ),
      _react2.default.createElement(
        'section',
        { className: _legend2.default.section },
        _react2.default.createElement(
          'div',
          { className: _legend2.default.column },
          _react2.default.createElement(
            'button',
            { className: props.active.faces ? _legend2.default.faceButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showFaces' },
            'Faces'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.faceLabels ? _legend2.default.faceButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showFaceLabels' },
            'Show IDs'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _legend2.default.column },
          _react2.default.createElement(
            'button',
            { className: props.active.links ? _legend2.default.linkButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showLinks' },
            'Links'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.linkLabels ? _legend2.default.linkButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showLinkLabels' },
            'Show IDs'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Points'
      ),
      _react2.default.createElement(
        'section',
        { className: _legend2.default.section },
        _react2.default.createElement(
          'div',
          { className: _legend2.default.column },
          _react2.default.createElement(
            'button',
            { className: props.active.corners ? _legend2.default.cornerButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showCorners' },
            'Corners'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.cornerLabels ? _legend2.default.cornerButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showCornerLabels' },
            'Show IDs'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _legend2.default.column },
          _react2.default.createElement(
            'button',
            { className: props.active.nodes ? _legend2.default.nodeButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showNodes' },
            'Nodes'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.nodeLabels ? _legend2.default.nodeButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showNodeLabels' },
            'Show IDs'
          )
        )
      )
    )
  );
};

exports.default = Legend;


Legend.propTypes = {
  onChange: _react2.default.PropTypes.func.isRequired,
  active: _react2.default.PropTypes.shape({
    cells: _react2.default.PropTypes.bool,
    cellLabels: _react2.default.PropTypes.bool,
    patches: _react2.default.PropTypes.bool,
    patchLabels: _react2.default.PropTypes.bool,
    links: _react2.default.PropTypes.bool,
    linkLabels: _react2.default.PropTypes.bool,
    faces: _react2.default.PropTypes.bool,
    faceLabels: _react2.default.PropTypes.bool,
    nodes: _react2.default.PropTypes.bool,
    nodeLabels: _react2.default.PropTypes.bool,
    corners: _react2.default.PropTypes.bool,
    cornerLabels: _react2.default.PropTypes.bool
  }).isRequired
};
});

require.register("initialize.jsx", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var root = _react2.default.createElement(_app2.default, null);
  _reactDom2.default.render(root, document.getElementById('app'));
});
});

require.register("landlab_hex_grid_example.json", function(exports, require, module) {
module.exports = {
    "cells": [
        {
            "area": 86.60254037844386,
            "corners": [
                8,
                11,
                7,
                3,
                0,
                4
            ],
            "faces": [
                7,
                11,
                10,
                6,
                0,
                1
            ],
            "id": 0,
            "node": 5,
            "x": 5.0,
            "y": 8.660254037844386
        },
        {
            "area": 86.60254037844386,
            "corners": [
                9,
                12,
                8,
                4,
                1,
                5
            ],
            "faces": [
                8,
                13,
                12,
                7,
                2,
                3
            ],
            "id": 1,
            "node": 6,
            "x": 15.0,
            "y": 8.660254037844386
        },
        {
            "area": 86.60254037844386,
            "corners": [
                10,
                13,
                9,
                5,
                2,
                6
            ],
            "faces": [
                9,
                15,
                14,
                8,
                4,
                5
            ],
            "id": 2,
            "node": 7,
            "x": 25.0,
            "y": 8.660254037844386
        }
    ],
    "corners": [
        {
            "cells": [
                0,
                -1
            ],
            "face_dirs": [
                -1,
                1,
                0
            ],
            "faces": [
                1,
                0,
                -1
            ],
            "id": 0,
            "x": 5.0,
            "y": 2.886751
        },
        {
            "cells": [
                1,
                -1
            ],
            "face_dirs": [
                -1,
                1,
                0
            ],
            "faces": [
                3,
                2,
                -1
            ],
            "id": 1,
            "x": 15.0,
            "y": 2.886751
        },
        {
            "cells": [
                2,
                -1
            ],
            "face_dirs": [
                -1,
                1,
                0
            ],
            "faces": [
                5,
                4,
                -1
            ],
            "id": 2,
            "x": 25.0,
            "y": 2.886751
        },
        {
            "cells": [
                0,
                -1
            ],
            "face_dirs": [
                -1,
                -1,
                0
            ],
            "faces": [
                6,
                0,
                -1
            ],
            "id": 3,
            "x": -8.881784197001252e-16,
            "y": 5.773503
        },
        {
            "cells": [
                0,
                1
            ],
            "face_dirs": [
                -1,
                1,
                -1
            ],
            "faces": [
                7,
                1,
                2
            ],
            "id": 4,
            "x": 10.0,
            "y": 5.773503
        },
        {
            "cells": [
                1,
                2
            ],
            "face_dirs": [
                -1,
                1,
                -1
            ],
            "faces": [
                8,
                3,
                4
            ],
            "id": 5,
            "x": 20.0,
            "y": 5.773503
        },
        {
            "cells": [
                2,
                -1
            ],
            "face_dirs": [
                -1,
                1,
                0
            ],
            "faces": [
                9,
                5,
                -1
            ],
            "id": 6,
            "x": 30.0,
            "y": 5.773503
        },
        {
            "cells": [
                0,
                -1
            ],
            "face_dirs": [
                -1,
                1,
                0
            ],
            "faces": [
                10,
                6,
                -1
            ],
            "id": 7,
            "x": -8.881784197001252e-16,
            "y": 11.547005
        },
        {
            "cells": [
                0,
                1
            ],
            "face_dirs": [
                -1,
                1,
                1
            ],
            "faces": [
                12,
                11,
                7
            ],
            "id": 8,
            "x": 10.0,
            "y": 11.547005
        },
        {
            "cells": [
                1,
                2
            ],
            "face_dirs": [
                -1,
                1,
                1
            ],
            "faces": [
                14,
                13,
                8
            ],
            "id": 9,
            "x": 20.0,
            "y": 11.547005
        },
        {
            "cells": [
                2,
                -1
            ],
            "face_dirs": [
                1,
                1,
                0
            ],
            "faces": [
                15,
                9,
                -1
            ],
            "id": 10,
            "x": 30.0,
            "y": 11.547005
        },
        {
            "cells": [
                0,
                -1
            ],
            "face_dirs": [
                1,
                -1,
                0
            ],
            "faces": [
                10,
                11,
                -1
            ],
            "id": 11,
            "x": 4.999999999999999,
            "y": 14.433757
        },
        {
            "cells": [
                1,
                -1
            ],
            "face_dirs": [
                1,
                -1,
                0
            ],
            "faces": [
                12,
                13,
                -1
            ],
            "id": 12,
            "x": 15.0,
            "y": 14.433757
        },
        {
            "cells": [
                2,
                -1
            ],
            "face_dirs": [
                1,
                -1,
                0
            ],
            "faces": [
                14,
                15,
                -1
            ],
            "id": 13,
            "x": 25.0,
            "y": 14.433757
        }
    ],
    "faces": [
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                3,
                0
            ],
            "head_corner": 0,
            "id": 0,
            "length": 5.773503018922223,
            "link": 4,
            "tail_corner": 3,
            "x": 2.5,
            "y": 4.330127018922193
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                0,
                4
            ],
            "head_corner": 4,
            "id": 1,
            "length": 5.773503018922221,
            "link": 6,
            "tail_corner": 0,
            "x": 7.5,
            "y": 4.330127018922193
        },
        {
            "cells": [
                1,
                -1
            ],
            "corners": [
                4,
                1
            ],
            "head_corner": 1,
            "id": 2,
            "length": 5.773503018922221,
            "link": 5,
            "tail_corner": 4,
            "x": 12.5,
            "y": 4.330127018922193
        },
        {
            "cells": [
                1,
                -1
            ],
            "corners": [
                1,
                5
            ],
            "head_corner": 5,
            "id": 3,
            "length": 5.773503018922221,
            "link": 11,
            "tail_corner": 1,
            "x": 17.5,
            "y": 4.330127018922193
        },
        {
            "cells": [
                2,
                -1
            ],
            "corners": [
                5,
                2
            ],
            "head_corner": 2,
            "id": 4,
            "length": 5.773503018922221,
            "link": 9,
            "tail_corner": 5,
            "x": 22.5,
            "y": 4.330127018922193
        },
        {
            "cells": [
                2,
                -1
            ],
            "corners": [
                2,
                6
            ],
            "head_corner": 6,
            "id": 5,
            "length": 5.773503018922221,
            "link": 14,
            "tail_corner": 2,
            "x": 27.5,
            "y": 4.330127018922193
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                3,
                7
            ],
            "head_corner": 7,
            "id": 6,
            "length": 5.773502000000001,
            "link": 21,
            "tail_corner": 3,
            "x": 0.0,
            "y": 8.660254037844386
        },
        {
            "cells": [
                0,
                1
            ],
            "corners": [
                4,
                8
            ],
            "head_corner": 8,
            "id": 7,
            "length": 5.773502000000001,
            "link": 20,
            "tail_corner": 4,
            "x": 10.0,
            "y": 8.660254037844386
        },
        {
            "cells": [
                1,
                2
            ],
            "corners": [
                5,
                9
            ],
            "head_corner": 9,
            "id": 8,
            "length": 5.773502000000001,
            "link": 13,
            "tail_corner": 5,
            "x": 20.0,
            "y": 8.660254037844386
        },
        {
            "cells": [
                2,
                -1
            ],
            "corners": [
                6,
                10
            ],
            "head_corner": 10,
            "id": 9,
            "length": 5.773502000000001,
            "link": 8,
            "tail_corner": 6,
            "x": 30.0,
            "y": 8.660254037844386
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                7,
                11
            ],
            "head_corner": 11,
            "id": 10,
            "length": 5.773503018922221,
            "link": 7,
            "tail_corner": 7,
            "x": 2.5,
            "y": 12.990381056766578
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                11,
                8
            ],
            "head_corner": 8,
            "id": 11,
            "length": 5.773503018922222,
            "link": 18,
            "tail_corner": 11,
            "x": 7.5,
            "y": 12.990381056766578
        },
        {
            "cells": [
                1,
                -1
            ],
            "corners": [
                8,
                12
            ],
            "head_corner": 12,
            "id": 12,
            "length": 5.773503018922221,
            "link": 17,
            "tail_corner": 8,
            "x": 12.5,
            "y": 12.990381056766578
        },
        {
            "cells": [
                1,
                -1
            ],
            "corners": [
                12,
                9
            ],
            "head_corner": 9,
            "id": 13,
            "length": 5.773503018922221,
            "link": 19,
            "tail_corner": 12,
            "x": 17.5,
            "y": 12.990381056766578
        },
        {
            "cells": [
                2,
                -1
            ],
            "corners": [
                9,
                13
            ],
            "head_corner": 13,
            "id": 14,
            "length": 5.773503018922221,
            "link": 12,
            "tail_corner": 9,
            "x": 22.5,
            "y": 12.990381056766578
        },
        {
            "cells": [
                2,
                -1
            ],
            "corners": [
                13,
                10
            ],
            "head_corner": 10,
            "id": 15,
            "length": 5.773503018922221,
            "link": 16,
            "tail_corner": 13,
            "x": 27.5,
            "y": 12.990381056766578
        }
    ],
    "links": [
        {
            "face_id": -1,
            "head_node": 1,
            "id": 0,
            "length": 10.0,
            "nodes": [
                0,
                1
            ],
            "patches": [
                0,
                -1
            ],
            "status": 4,
            "tail_node": 0,
            "x": 5.0,
            "y": 0.0
        },
        {
            "face_id": -1,
            "head_node": 2,
            "id": 1,
            "length": 10.0,
            "nodes": [
                1,
                2
            ],
            "patches": [
                1,
                -1
            ],
            "status": 4,
            "tail_node": 1,
            "x": 15.0,
            "y": 0.0
        },
        {
            "face_id": -1,
            "head_node": 3,
            "id": 2,
            "length": 10.0,
            "nodes": [
                2,
                3
            ],
            "patches": [
                2,
                -1
            ],
            "status": 4,
            "tail_node": 2,
            "x": 25.0,
            "y": 0.0
        },
        {
            "face_id": -1,
            "head_node": 4,
            "id": 3,
            "length": 10.0,
            "nodes": [
                0,
                4
            ],
            "patches": [
                3,
                -1
            ],
            "status": 4,
            "tail_node": 0,
            "x": -2.5,
            "y": 4.330127018922193
        },
        {
            "face_id": 0,
            "head_node": 5,
            "id": 4,
            "length": 10.0,
            "nodes": [
                0,
                5
            ],
            "patches": [
                0,
                3
            ],
            "status": 0,
            "tail_node": 0,
            "x": 2.5,
            "y": 4.330127018922193
        },
        {
            "face_id": 1,
            "head_node": 5,
            "id": 5,
            "length": 10.0,
            "nodes": [
                1,
                5
            ],
            "patches": [
                0,
                4
            ],
            "status": 0,
            "tail_node": 1,
            "x": 7.5,
            "y": 4.330127018922193
        },
        {
            "face_id": 2,
            "head_node": 6,
            "id": 6,
            "length": 10.0,
            "nodes": [
                1,
                6
            ],
            "patches": [
                1,
                4
            ],
            "status": 0,
            "tail_node": 1,
            "x": 12.5,
            "y": 4.330127018922193
        },
        {
            "face_id": 3,
            "head_node": 6,
            "id": 7,
            "length": 10.0,
            "nodes": [
                2,
                6
            ],
            "patches": [
                1,
                5
            ],
            "status": 0,
            "tail_node": 2,
            "x": 17.5,
            "y": 4.330127018922193
        },
        {
            "face_id": 4,
            "head_node": 7,
            "id": 8,
            "length": 10.0,
            "nodes": [
                2,
                7
            ],
            "patches": [
                2,
                5
            ],
            "status": 0,
            "tail_node": 2,
            "x": 22.5,
            "y": 4.330127018922193
        },
        {
            "face_id": 5,
            "head_node": 7,
            "id": 9,
            "length": 10.0,
            "nodes": [
                3,
                7
            ],
            "patches": [
                2,
                6
            ],
            "status": 0,
            "tail_node": 3,
            "x": 27.5,
            "y": 4.330127018922193
        },
        {
            "face_id": -1,
            "head_node": 8,
            "id": 10,
            "length": 10.0,
            "nodes": [
                3,
                8
            ],
            "patches": [
                6,
                -1
            ],
            "status": 4,
            "tail_node": 3,
            "x": 32.5,
            "y": 4.330127018922193
        },
        {
            "face_id": 6,
            "head_node": 5,
            "id": 11,
            "length": 10.0,
            "nodes": [
                4,
                5
            ],
            "patches": [
                3,
                7
            ],
            "status": 0,
            "tail_node": 4,
            "x": 0.0,
            "y": 8.660254037844386
        },
        {
            "face_id": 7,
            "head_node": 6,
            "id": 12,
            "length": 10.0,
            "nodes": [
                5,
                6
            ],
            "patches": [
                4,
                8
            ],
            "status": 0,
            "tail_node": 5,
            "x": 10.0,
            "y": 8.660254037844386
        },
        {
            "face_id": 8,
            "head_node": 7,
            "id": 13,
            "length": 10.0,
            "nodes": [
                6,
                7
            ],
            "patches": [
                5,
                9
            ],
            "status": 0,
            "tail_node": 6,
            "x": 20.0,
            "y": 8.660254037844386
        },
        {
            "face_id": 9,
            "head_node": 8,
            "id": 14,
            "length": 10.0,
            "nodes": [
                7,
                8
            ],
            "patches": [
                6,
                10
            ],
            "status": 0,
            "tail_node": 7,
            "x": 30.0,
            "y": 8.660254037844386
        },
        {
            "face_id": -1,
            "head_node": 9,
            "id": 15,
            "length": 10.0,
            "nodes": [
                4,
                9
            ],
            "patches": [
                7,
                -1
            ],
            "status": 4,
            "tail_node": 4,
            "x": -2.5,
            "y": 12.990381056766578
        },
        {
            "face_id": 10,
            "head_node": 9,
            "id": 16,
            "length": 10.0,
            "nodes": [
                5,
                9
            ],
            "patches": [
                7,
                11
            ],
            "status": 0,
            "tail_node": 5,
            "x": 2.5,
            "y": 12.990381056766578
        },
        {
            "face_id": 11,
            "head_node": 10,
            "id": 17,
            "length": 10.0,
            "nodes": [
                5,
                10
            ],
            "patches": [
                8,
                11
            ],
            "status": 0,
            "tail_node": 5,
            "x": 7.5,
            "y": 12.990381056766578
        },
        {
            "face_id": 12,
            "head_node": 10,
            "id": 18,
            "length": 10.0,
            "nodes": [
                6,
                10
            ],
            "patches": [
                8,
                12
            ],
            "status": 0,
            "tail_node": 6,
            "x": 12.5,
            "y": 12.990381056766578
        },
        {
            "face_id": 13,
            "head_node": 11,
            "id": 19,
            "length": 10.0,
            "nodes": [
                6,
                11
            ],
            "patches": [
                9,
                12
            ],
            "status": 0,
            "tail_node": 6,
            "x": 17.5,
            "y": 12.990381056766578
        },
        {
            "face_id": 14,
            "head_node": 11,
            "id": 20,
            "length": 10.0,
            "nodes": [
                7,
                11
            ],
            "patches": [
                9,
                13
            ],
            "status": 0,
            "tail_node": 7,
            "x": 22.5,
            "y": 12.990381056766578
        },
        {
            "face_id": 15,
            "head_node": 12,
            "id": 21,
            "length": 10.0,
            "nodes": [
                7,
                12
            ],
            "patches": [
                10,
                13
            ],
            "status": 0,
            "tail_node": 7,
            "x": 27.5,
            "y": 12.990381056766578
        },
        {
            "face_id": -1,
            "head_node": 12,
            "id": 22,
            "length": 10.0,
            "nodes": [
                8,
                12
            ],
            "patches": [
                10,
                -1
            ],
            "status": 4,
            "tail_node": 8,
            "x": 32.5,
            "y": 12.990381056766578
        },
        {
            "face_id": -1,
            "head_node": 10,
            "id": 23,
            "length": 10.0,
            "nodes": [
                9,
                10
            ],
            "patches": [
                11,
                -1
            ],
            "status": 4,
            "tail_node": 9,
            "x": 5.0,
            "y": 17.32050807568877
        },
        {
            "face_id": -1,
            "head_node": 11,
            "id": 24,
            "length": 10.0,
            "nodes": [
                10,
                11
            ],
            "patches": [
                12,
                -1
            ],
            "status": 4,
            "tail_node": 10,
            "x": 15.0,
            "y": 17.32050807568877
        },
        {
            "face_id": -1,
            "head_node": 12,
            "id": 25,
            "length": 10.0,
            "nodes": [
                11,
                12
            ],
            "patches": [
                13,
                -1
            ],
            "status": 4,
            "tail_node": 11,
            "x": 25.0,
            "y": 17.32050807568877
        }
    ],
    "nodes": [
        {
            "cell": -1,
            "id": 0,
            "link_dirs": [
                -1,
                -1,
                -1,
                0,
                0,
                0
            ],
            "links": [
                0,
                4,
                3,
                -1,
                -1,
                -1
            ],
            "neighbor_nodes": [
                1,
                5,
                4,
                -1,
                -1,
                -1
            ],
            "patches": [
                0,
                3,
                -1,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 0.0,
            "y": 0.0
        },
        {
            "cell": -1,
            "id": 1,
            "link_dirs": [
                -1,
                -1,
                -1,
                1,
                0,
                0
            ],
            "links": [
                1,
                6,
                5,
                0,
                -1,
                -1
            ],
            "neighbor_nodes": [
                2,
                6,
                5,
                0,
                -1,
                -1
            ],
            "patches": [
                0,
                1,
                4,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 10.0,
            "y": 0.0
        },
        {
            "cell": -1,
            "id": 2,
            "link_dirs": [
                -1,
                -1,
                -1,
                1,
                0,
                0
            ],
            "links": [
                2,
                8,
                7,
                1,
                -1,
                -1
            ],
            "neighbor_nodes": [
                3,
                7,
                6,
                1,
                -1,
                -1
            ],
            "patches": [
                1,
                2,
                5,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 20.0,
            "y": 0.0
        },
        {
            "cell": -1,
            "id": 3,
            "link_dirs": [
                -1,
                -1,
                1,
                0,
                0,
                0
            ],
            "links": [
                10,
                9,
                2,
                -1,
                -1,
                -1
            ],
            "neighbor_nodes": [
                8,
                7,
                2,
                -1,
                -1,
                -1
            ],
            "patches": [
                2,
                6,
                -1,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 30.0,
            "y": 0.0
        },
        {
            "cell": -1,
            "id": 4,
            "link_dirs": [
                -1,
                -1,
                1,
                0,
                0,
                0
            ],
            "links": [
                11,
                15,
                3,
                -1,
                -1,
                -1
            ],
            "neighbor_nodes": [
                5,
                9,
                0,
                -1,
                -1,
                -1
            ],
            "patches": [
                3,
                7,
                -1,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": -5.0,
            "y": 8.660254037844386
        },
        {
            "cell": 0,
            "id": 5,
            "link_dirs": [
                -1,
                -1,
                -1,
                1,
                1,
                1
            ],
            "links": [
                12,
                17,
                16,
                11,
                4,
                5
            ],
            "neighbor_nodes": [
                6,
                10,
                9,
                4,
                0,
                1
            ],
            "patches": [
                0,
                3,
                4,
                7,
                8,
                13
            ],
            "status": 0,
            "x": 5.0,
            "y": 8.660254037844386
        },
        {
            "cell": 1,
            "id": 6,
            "link_dirs": [
                -1,
                -1,
                -1,
                1,
                1,
                1
            ],
            "links": [
                13,
                19,
                18,
                12,
                6,
                7
            ],
            "neighbor_nodes": [
                7,
                11,
                10,
                5,
                1,
                2
            ],
            "patches": [
                1,
                4,
                5,
                8,
                9,
                11
            ],
            "status": 0,
            "x": 15.0,
            "y": 8.660254037844386
        },
        {
            "cell": 2,
            "id": 7,
            "link_dirs": [
                -1,
                -1,
                -1,
                1,
                1,
                1
            ],
            "links": [
                14,
                21,
                20,
                13,
                8,
                9
            ],
            "neighbor_nodes": [
                8,
                12,
                11,
                6,
                2,
                3
            ],
            "patches": [
                2,
                5,
                6,
                9,
                10,
                12
            ],
            "status": 0,
            "x": 25.0,
            "y": 8.660254037844386
        },
        {
            "cell": -1,
            "id": 8,
            "link_dirs": [
                -1,
                1,
                1,
                0,
                0,
                0
            ],
            "links": [
                22,
                14,
                10,
                -1,
                -1,
                -1
            ],
            "neighbor_nodes": [
                12,
                7,
                3,
                -1,
                -1,
                -1
            ],
            "patches": [
                6,
                10,
                -1,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 35.0,
            "y": 8.660254037844386
        },
        {
            "cell": -1,
            "id": 9,
            "link_dirs": [
                -1,
                1,
                1,
                0,
                0,
                0
            ],
            "links": [
                23,
                15,
                16,
                -1,
                -1,
                -1
            ],
            "neighbor_nodes": [
                10,
                4,
                5,
                -1,
                -1,
                -1
            ],
            "patches": [
                7,
                13,
                -1,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 0.0,
            "y": 17.32050807568877
        },
        {
            "cell": -1,
            "id": 10,
            "link_dirs": [
                -1,
                1,
                1,
                1,
                0,
                0
            ],
            "links": [
                24,
                23,
                17,
                18,
                -1,
                -1
            ],
            "neighbor_nodes": [
                11,
                9,
                5,
                6,
                -1,
                -1
            ],
            "patches": [
                8,
                11,
                13,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 10.0,
            "y": 17.32050807568877
        },
        {
            "cell": -1,
            "id": 11,
            "link_dirs": [
                -1,
                1,
                1,
                1,
                0,
                0
            ],
            "links": [
                25,
                24,
                19,
                20,
                -1,
                -1
            ],
            "neighbor_nodes": [
                12,
                10,
                6,
                7,
                -1,
                -1
            ],
            "patches": [
                9,
                11,
                12,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 20.0,
            "y": 17.32050807568877
        },
        {
            "cell": -1,
            "id": 12,
            "link_dirs": [
                1,
                1,
                1,
                0,
                0,
                0
            ],
            "links": [
                25,
                21,
                22,
                -1,
                -1,
                -1
            ],
            "neighbor_nodes": [
                11,
                7,
                8,
                -1,
                -1,
                -1
            ],
            "patches": [
                10,
                12,
                -1,
                -1,
                -1,
                -1
            ],
            "status": 1,
            "x": 30.0,
            "y": 17.32050807568877
        }
    ],
    "patches": [
        {
            "area": 43.30126953125,
            "id": 0,
            "links": [
                5,
                4,
                0
            ],
            "nodes": [
                5,
                0,
                1
            ]
        },
        {
            "area": 43.30126953125,
            "id": 1,
            "links": [
                7,
                6,
                1
            ],
            "nodes": [
                6,
                1,
                2
            ]
        },
        {
            "area": 43.30126953125,
            "id": 2,
            "links": [
                9,
                8,
                2
            ],
            "nodes": [
                7,
                2,
                3
            ]
        },
        {
            "area": 43.30126953125,
            "id": 3,
            "links": [
                11,
                3,
                4
            ],
            "nodes": [
                5,
                4,
                0
            ]
        },
        {
            "area": 43.30126953125,
            "id": 4,
            "links": [
                12,
                5,
                6
            ],
            "nodes": [
                6,
                5,
                1
            ]
        },
        {
            "area": 43.30126190185547,
            "id": 5,
            "links": [
                13,
                7,
                8
            ],
            "nodes": [
                7,
                6,
                2
            ]
        },
        {
            "area": 43.30127716064453,
            "id": 6,
            "links": [
                14,
                9,
                10
            ],
            "nodes": [
                8,
                7,
                3
            ]
        },
        {
            "area": 43.30126953125,
            "id": 7,
            "links": [
                16,
                15,
                11
            ],
            "nodes": [
                9,
                4,
                5
            ]
        },
        {
            "area": 43.30126953125,
            "id": 8,
            "links": [
                18,
                17,
                12
            ],
            "nodes": [
                10,
                5,
                6
            ]
        },
        {
            "area": 43.30126953125,
            "id": 9,
            "links": [
                20,
                19,
                13
            ],
            "nodes": [
                11,
                6,
                7
            ]
        },
        {
            "area": 43.30126953125,
            "id": 10,
            "links": [
                22,
                21,
                14
            ],
            "nodes": [
                12,
                7,
                8
            ]
        },
        {
            "area": 43.30126953125,
            "id": 11,
            "links": [
                23,
                16,
                17
            ],
            "nodes": [
                10,
                9,
                5
            ]
        },
        {
            "area": 43.30126953125,
            "id": 12,
            "links": [
                24,
                18,
                19
            ],
            "nodes": [
                11,
                6,
                10
            ]
        },
        {
            "area": 43.30126953125,
            "id": 13,
            "links": [
                25,
                20,
                21
            ],
            "nodes": [
                12,
                7,
                11
            ]
        }
    ]
}
;
});

require.register("landlab_raster_grid_example.json", function(exports, require, module) {
module.exports = {
  "_type": "graph",
  "graph": {
    "attrs": {},
    "coords": {},
    "data_vars": {
      "nodes_at_link": {
      "attrs": {},
      "data": [
        [
          0,
          1
        ],
        [
          1,
          2
        ],
        [
          2,
          3
        ],
        [
          0,
          4
        ],
        [
          1,
          5
        ],
        [
          2,
          6
        ],
        [
          3,
          7
        ],
        [
          4,
          5
        ],
        [
          5,
          6
        ],
        [
          6,
          7
        ],
        [
          4,
          8
        ],
        [
          5,
          9
        ],
        [
          6,
          10
        ],
        [
          7,
          11
        ],
        [
          8,
          9
        ],
        [
          9,
          10
        ],
        [
          10,
          11
        ]
      ],
      "dims": [
        "link",
        "nodes_per_link"
      ]
    },
    "nodes_at_patch": {
      "attrs": {},
      "data": [
        [
          5,
          4,
          0,
          1
        ],
        [
          6,
          5,
          1,
          2
        ],
        [
          7,
          6,
          2,
          3
        ],
        [
          9,
          8,
          4,
          5
        ],
        [
          10,
          9,
          5,
          6
        ],
        [
          11,
          10,
          6,
          7
        ]
      ],
      "dims": [
        "patch",
        "nodes_per_patch"
      ]
    },
      "x_of_node": {
        "attrs": {},
        "data": [
          0,
          10,
          20,
          30,
          0,
          10,
          20,
          30,
          0,
          10,
          20,
          30
        ],
        "dims": [
          "node"
        ]
      },
      "y_of_node": {
        "attrs": {},
        "data": [
          0,
          0,
          0,
          0,
          10,
          10,
          10,
          10,
          20,
          20,
          20,
          20
        ],
        "dims": [
          "node"
        ]
      }
    },
    "dims": {
      "link": 17,
      "node": 12,
      "nodes_per_link": 2,
      "nodes_per_patch": 4,
      "patch": 6
    }
  },
  "href": "/graph/raster?shape=3%2C4&spacing=10.%2C10."
}
;
});

require.register("theme/app.scss", function(exports, require, module) {
module.exports = {"chart":"_chart_5lvh9_8"};
});

require.register("theme/cell.scss", function(exports, require, module) {
module.exports = {"cell":"_cell_1w11x_1","none":"_none_1w11x_6","highlight":"_highlight_1w11x_9","activeLabel":"_activeLabel_1w11x_14"};
});

require.register("theme/colors.scss", function(exports, require, module) {
module.exports = {};
});

require.register("theme/corner.scss", function(exports, require, module) {
module.exports = {"corner":"_corner_1r834_1","none":"_none_1r834_6","highlight":"_highlight_1r834_9","activeLabel":"_activeLabel_1r834_12"};
});

require.register("theme/face.scss", function(exports, require, module) {
module.exports = {"face":"_face_1oscw_1","none":"_none_1oscw_7","highlight":"_highlight_1oscw_10","activeLabel":"_activeLabel_1oscw_13","arrow":"_arrow_1oscw_18","vertical":"_vertical_1oscw_22"};
});

require.register("theme/grid.scss", function(exports, require, module) {
module.exports = {"chart":"_chart_3y0hp_1"};
});

require.register("theme/inputs.scss", function(exports, require, module) {
module.exports = {"input":"_input_1mckk_1","form":"_form_1mckk_15","hexOptions":"_hexOptions_1mckk_21","label":"_label_1mckk_25","select":"_select_1mckk_32"};
});

require.register("theme/legend.scss", function(exports, require, module) {
module.exports = {"button":"_button_vnpo2_1","cellButtonDown":"_cellButtonDown_vnpo2_1","patchButtonDown":"_patchButtonDown_vnpo2_1","linkButtonDown":"_linkButtonDown_vnpo2_1","faceButtonDown":"_faceButtonDown_vnpo2_1","nodeButtonDown":"_nodeButtonDown_vnpo2_1","cornerButtonDown":"_cornerButtonDown_vnpo2_1","container":"_container_vnpo2_12","section":"_section_vnpo2_21","column":"_column_vnpo2_28"};
});

require.register("theme/link.scss", function(exports, require, module) {
module.exports = {"link":"_link_11tkv_1","none":"_none_11tkv_7","highlight":"_highlight_11tkv_10","activeLabel":"_activeLabel_11tkv_14","arrow":"_arrow_11tkv_19","vertical":"_vertical_11tkv_23"};
});

require.register("theme/node.scss", function(exports, require, module) {
module.exports = {"node":"_node_1krq3_1","none":"_none_1krq3_6","highlight":"_highlight_1krq3_9","activeLabel":"_activeLabel_1krq3_12"};
});

require.register("theme/patch.scss", function(exports, require, module) {
module.exports = {"patch":"_patch_1mb2f_1","none":"_none_1mb2f_6","highlight":"_highlight_1mb2f_9","activeLabel":"_activeLabel_1mb2f_14"};
});

require.register("theme/shared.scss", function(exports, require, module) {
module.exports = {};
});

require.alias("buffer/index.js", "buffer");
require.alias("events/events.js", "events");
require.alias("stream-http/index.js", "http");
require.alias("https-browserify/index.js", "https");
require.alias("process/browser.js", "process");
require.alias("punycode/punycode.js", "punycode");
require.alias("querystring-es3/index.js", "querystring");
require.alias("stream-browserify/index.js", "stream");
require.alias("string_decoder/index.js", "string_decoder");
require.alias("url/url.js", "url");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.io = require("socket.io-client");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map