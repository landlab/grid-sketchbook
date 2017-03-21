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
var global = typeof window === 'undefined' ? this : window;
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

var _grid = require('./grid.jsx');

var _grid2 = _interopRequireDefault(_grid);

var _legend = require('./legend.jsx');

var _legend2 = _interopRequireDefault(_legend);

var _landlab_raster_grid_example = require('../landlab_raster_grid_example.json');

var _landlab_raster_grid_example2 = _interopRequireDefault(_landlab_raster_grid_example);

var _landlab_hex_grid_example = require('../landlab_hex_grid_example.json');

var _landlab_hex_grid_example2 = _interopRequireDefault(_landlab_hex_grid_example);

var _app = require('../theme/app.scss');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      showCornerLabels: false
    };
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
      console.log('show', activeLayers);
      return _react2.default.createElement(
        'div',
        { className: _app2.default.chart },
        _react2.default.createElement(_legend2.default, { active: activeLayers, onChange: function onChange(e) {
            return _this2.setState(_defineProperty({}, e.target.value, !_this2.state[e.target.value]));
          } }),
        _react2.default.createElement(
          'h2',
          null,
          'Raster Grid'
        ),
        _react2.default.createElement(_grid2.default, { data: _landlab_raster_grid_example2.default, show: activeLayers }),
        _react2.default.createElement(
          'h2',
          null,
          'Hex Grid'
        ),
        _react2.default.createElement(_grid2.default, { data: _landlab_hex_grid_example2.default, show: activeLayers })
      );
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
          data = _props.data,
          show = _props.show;

      var margin = { top: 2, right: 10, bottom: 5, left: 10 };
      var row = 3;
      var col = 4;
      var cellWidth = 10;
      var innerHeight = (row - 1) * cellWidth;
      var innerWidth = (col - 1) * cellWidth;
      var chartHeight = innerHeight + margin.top + margin.bottom;
      var chartWidth = innerWidth + margin.left + margin.right;

      var xScale = d3.scaleLinear().domain([0, innerWidth]).range([0, innerWidth]);

      var yScale = d3.scaleLinear().domain([0, innerHeight]).range([innerHeight, 0]);

      var nodes = data.nodes.map(function (d) {
        return _react2.default.createElement(
          'g',
          { key: 'node ' + d.id },
          _react2.default.createElement('circle', {
            className: show.nodes ? show.nodeLabels ? _node2.default.highlight : _node2.default.node : _node2.default.none,
            cx: xScale(d.x),
            cy: yScale(d.y),
            r: 0.7,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ node: true, activeNode: d.id });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ node: false, activeNode: null });
            }
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeNode === d.id || show.nodeLabels ? _node2.default.activeLabel : _node2.default.text,
              x: xScale(d.x),
              dy: -1,
              y: yScale(d.y),
              textAnchor: 'middle'
            },
            'node ' + d.id
          )
        );
      });

      var corners = data.corners.map(function (d) {
        return _react2.default.createElement(
          'g',
          { key: 'corner ' + d.id },
          _react2.default.createElement('circle', {
            className: show.corners ? show.cornerLabels ? _corner2.default.highlight : _corner2.default.corner : _corner2.default.none,
            cx: xScale(d.x),
            cy: yScale(d.y),
            r: 0.7,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ corner: true, activeCorner: d.id });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ corner: false, activeCorner: null });
            }
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeCorner === d.id || show.cornerLabels ? _corner2.default.activeLabel : _corner2.default.text,
              x: xScale(d.x),
              dy: -1,
              y: yScale(d.y),
              textAnchor: 'middle'
            },
            'corner ' + d.id
          )
        );
      });

      var getPath = function getPath(verticies, vertex) {
        var allCorners = verticies.map(function (c) {
          return xScale(data[vertex][c].x) + ' ' + yScale(data[vertex][c].y);
        });
        // console.log(allCorners);
        var d = 'M ' + allCorners + ' Z';
        return d;
      };

      var cells = data.cells.map(function (d) {
        return _react2.default.createElement(
          'g',
          { key: 'cell ' + d.id },
          _react2.default.createElement('path', {
            className: show.cells ? show.cellLabels ? _cell2.default.highlight : _cell2.default.cell : _cell2.default.none,
            d: getPath(d.corners, 'corners'),
            fill: 'transparent',
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ cell: true, activeCell: d.id });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ cell: false, activeCell: null });
            }
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeCell === d.id || show.cellLabels ? _cell2.default.activeLabel : _cell2.default.text,
              x: xScale(d.x),
              y: yScale(d.y),
              textAnchor: 'middle'
            },
            'cell ' + d.id
          )
        );
      });

      var patches = data.patches.map(function (d) {
        return _react2.default.createElement(
          'g',
          { key: 'patch ' + d.id },
          _react2.default.createElement('path', {
            className: show.patches ? show.patchLabels ? _patch2.default.highlight : _patch2.default.patch : _patch2.default.none,
            d: getPath(d.nodes, 'nodes'),
            fill: 'transparent',
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ patch: true, activePatch: d.id });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ patch: false, activePatch: null });
            }
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activePatch === d.id || show.patchLabels ? _patch2.default.activeLabel : _patch2.default.text,
              x: xScale(data.corners[d.id].x),
              y: yScale(data.corners[d.id].y),
              textAnchor: 'middle'
            },
            'patch ' + d.id
          )
        );
      });

      var faces = data.faces.map(function (d) {
        return _react2.default.createElement(
          'g',
          { key: 'face ' + d.id },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'marker',
              { className: _face2.default.arrow, id: 'face', orient: 'auto', viewBox: '-6 -6 12 12', refX: 5, refY: 0, markerHeight: 2 },
              _react2.default.createElement('path', { d: 'M -4 -4 0 0 -4 4' })
            )
          ),
          _react2.default.createElement('line', {
            className: show.faces ? show.faceLabels ? _face2.default.highlight : _face2.default.face : _face2.default.none,
            x1: xScale(data.corners[d.tail_corner].x),
            x2: xScale(data.corners[d.head_corner].x),
            y1: yScale(data.corners[d.tail_corner].y),
            y2: yScale(data.corners[d.head_corner].y),
            markerEnd: 'url(#face)',
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ face: true, activeFace: d.id });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ face: false, activeFace: null });
            }

          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeFace === d.id || show.faceLabels ? _face2.default.activeLabel : _face2.default.text,
              x: xScale(d.x),
              y: yScale(d.y),
              dy: 0.3,
              textAnchor: 'middle'
            },
            'face ' + d.id
          )
        );
      });

      var links = data.links.map(function (d) {
        return _react2.default.createElement(
          'g',
          { key: 'link ' + d.id },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'marker',
              { className: _link2.default.arrow, id: 'head', orient: 'auto', viewBox: '-6 -6 12 12', refX: 5, refY: 0, markerHeight: 2 },
              _react2.default.createElement('path', { d: 'M -4 -4 0 0 -4 4' })
            )
          ),
          _react2.default.createElement('line', {
            className: show.links ? show.linkLabels ? _link2.default.highlight : _link2.default.link : _link2.default.none,
            x1: xScale(data.nodes[d.tail_node].x),
            x2: xScale(data.nodes[d.head_node].x),
            y1: yScale(data.nodes[d.tail_node].y),
            y2: yScale(data.nodes[d.head_node].y),
            markerEnd: 'url(#head)',
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ link: true, activeLink: d.id });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ link: false, activeLink: null });
            }
          }),
          _react2.default.createElement(
            'text',
            {
              className: _this2.state.activeLink === d.id || show.linkLabels ? _link2.default.activeLabel : _link2.default.text,
              x: xScale(d.x),
              y: yScale(d.y),
              dy: 0.3,
              textAnchor: 'middle'
            },
            'link ' + d.id
          )
        );
      });

      return _react2.default.createElement(
        'svg',
        { className: _grid2.default.chart, viewBox: '0 0 ' + chartWidth + ' ' + chartHeight, width: '60vw' },
        _react2.default.createElement(
          'g',
          { transform: 'translate(' + margin.left + ' ' + margin.top + ')' },
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
  data: _react2.default.PropTypes.shape({
    // cells: React.PropsTypes.array,
    // corners: React.PropsTypes.array,
    // faces: React.PropsTypes.array,
    // links: React.PropsTypes.array,
    // nodes: React.PropsTypes.array,
    // patches: React.PropsTypes.array,
  }).isRequired,
  show: _react2.default.PropTypes.object
};

exports.default = Grid;

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
            { className: props.active.links ? _legend2.default.linkButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showLinks' },
            'Links'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.linkLabels ? _legend2.default.linkButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showLinkLabels' },
            'Show IDs'
          )
        ),
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
            { className: props.active.nodes ? _legend2.default.nodeButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showNodes' },
            'Nodes'
          ),
          _react2.default.createElement(
            'button',
            { className: props.active.nodeLabels ? _legend2.default.nodeButtonDown : _legend2.default.button, onClick: props.onChange, value: 'showNodeLabels' },
            'Show IDs'
          )
        ),
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
        )
      )
    )
  );
};

exports.default = Legend;


Legend.propTypes = {
  onChange: _react2.default.PropTypes.any
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

require.register("landlab_hex_grid_example-first.json", function(exports, require, module) {
module.exports = {
    "cells": [
        {
            "area": 86.60254037844386,
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
    "faces": [
        {
            "area": 5.773502691896258,
            "id": 0,
            "x": 2.5,
            "y": 4.330127018922193
        },
        {
            "area": 5.773502691896258,
            "id": 1,
            "x": 7.5,
            "y": 4.330127018922193
        },
        {
            "area": 5.773502691896257,
            "id": 2,
            "x": 12.5,
            "y": 4.330127018922193
        },
        {
            "area": 5.773502691896257,
            "id": 3,
            "x": 17.5,
            "y": 4.330127018922193
        },
        {
            "area": 5.773502691896258,
            "id": 4,
            "x": 22.5,
            "y": 4.330127018922193
        },
        {
            "area": 5.773502691896258,
            "id": 5,
            "x": 27.5,
            "y": 4.330127018922193
        },
        {
            "area": 5.773502691896258,
            "id": 6,
            "x": 0.0,
            "y": 8.660254037844386
        },
        {
            "area": 5.773502691896256,
            "id": 7,
            "x": 10.0,
            "y": 8.660254037844386
        },
        {
            "area": 5.773502691896258,
            "id": 8,
            "x": 20.0,
            "y": 8.660254037844386
        },
        {
            "area": 5.773502691896258,
            "id": 9,
            "x": 30.0,
            "y": 8.660254037844386
        },
        {
            "area": 5.773502691896257,
            "id": 10,
            "x": 2.5,
            "y": 12.990381056766578
        },
        {
            "area": 5.773502691896258,
            "id": 11,
            "x": 7.5,
            "y": 12.990381056766578
        },
        {
            "area": 5.773502691896258,
            "id": 12,
            "x": 12.5,
            "y": 12.990381056766578
        },
        {
            "area": 5.773502691896257,
            "id": 13,
            "x": 17.5,
            "y": 12.990381056766578
        },
        {
            "area": 5.773502691896258,
            "id": 14,
            "x": 22.5,
            "y": 12.990381056766578
        },
        {
            "area": 5.773502691896258,
            "id": 15,
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
            "status": 1,
            "x": 0.0,
            "y": 0.0
        },
        {
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
            "status": 1,
            "x": 10.0,
            "y": 0.0
        },
        {
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
            "status": 1,
            "x": 20.0,
            "y": 0.0
        },
        {
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
            "status": 1,
            "x": 30.0,
            "y": 0.0
        },
        {
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
            "status": 1,
            "x": -5.0,
            "y": 8.660254037844386
        },
        {
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
            "status": 0,
            "x": 5.0,
            "y": 8.660254037844386
        },
        {
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
            "status": 0,
            "x": 15.0,
            "y": 8.660254037844386
        },
        {
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
            "status": 0,
            "x": 25.0,
            "y": 8.660254037844386
        },
        {
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
            "status": 1,
            "x": 35.0,
            "y": 8.660254037844386
        },
        {
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
            "status": 1,
            "x": 0.0,
            "y": 17.32050807568877
        },
        {
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
            "status": 1,
            "x": 10.0,
            "y": 17.32050807568877
        },
        {
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
            "status": 1,
            "x": 20.0,
            "y": 17.32050807568877
        },
        {
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
            "status": 1,
            "x": 30.0,
            "y": 17.32050807568877
        }
    ],
    "patches": [
        {
            "id": 0,
            "links": [
                5,
                4,
                0
            ]
        },
        {
            "id": 1,
            "links": [
                7,
                6,
                1
            ]
        },
        {
            "id": 2,
            "links": [
                9,
                8,
                2
            ]
        },
        {
            "id": 3,
            "links": [
                11,
                3,
                4
            ]
        },
        {
            "id": 4,
            "links": [
                12,
                5,
                6
            ]
        },
        {
            "id": 5,
            "links": [
                13,
                7,
                8
            ]
        },
        {
            "id": 6,
            "links": [
                14,
                9,
                10
            ]
        },
        {
            "id": 7,
            "links": [
                16,
                15,
                11
            ]
        },
        {
            "id": 8,
            "links": [
                18,
                17,
                12
            ]
        },
        {
            "id": 9,
            "links": [
                20,
                19,
                13
            ]
        },
        {
            "id": 10,
            "links": [
                22,
                21,
                14
            ]
        },
        {
            "id": 11,
            "links": [
                23,
                16,
                17
            ]
        },
        {
            "id": 12,
            "links": [
                24,
                18,
                19
            ]
        },
        {
            "id": 13,
            "links": [
                25,
                20,
                21
            ]
        }
    ]
};
;
});

require.register("landlab_hex_grid_example-second.json", function(exports, require, module) {
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
                11,
                10,
                6
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
                12,
                11,
                7
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
                10,
                9,
                5
            ]
        }
    ]
};
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
                11,
                10,
                6
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
                12,
                11,
                7
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
                10,
                9,
                5
            ]
        }
    ]
};
});

require.register("landlab_raster_grid_example-first.json", function(exports, require, module) {
module.exports = {
  "cells": [
    {
      "area": 100.0,
      "faces": [
          3,
          5,
          2,
          0
      ],
      "id": 0,
      "node": 5,
      "x": 10.0,
      "y": 10.0
    },
    {
      "area": 100.0,
      "faces": [
          4,
          6,
          3,
          1
      ],
      "id": 1,
      "node": 6,
      "x": 20.0,
      "y": 10.0
    }
  ],
  "faces": [
    {
      "width": 10.0,
      "id": 0,
      "x": 10.0,
      "y": 5.0
    },
    {
      "width": 10.0,
      "id": 1,
      "x": 20.0,
      "y": 5.0
    },
    {
      "width": 10.0,
      "id": 2,
      "x": 5.0,
      "y": 10.0
    },
    {
      "width": 10.0,
      "id": 3,
      "x": 15.0,
      "y": 10.0
    },
    {
      "width": 10.0,
      "id": 4,
      "x": 25.0,
      "y": 10.0
    },
    {
      "width": 10.0,
      "id": 5,
      "x": 10.0,
      "y": 15.0
    },
    {
      "width": 10.0,
      "id": 6,
      "x": 20.0,
      "y": 15.0
    }
  ],
  "links": [
    {
      "face_id": -1,
      "head_node": 1,
      "id": 0,
      "length": 10.0,
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
      "patches": [
        0,
        -1
      ],
      "status": 4,
      "tail_node": 0,
      "x": 0.0,
      "y": 5.0
    },
    {
      "face_id": 0,
      "head_node": 5,
      "id": 4,
      "length": 10.0,
      "patches": [
        0,
        1
      ],
      "status": 0,
      "tail_node": 1,
      "x": 10.0,
      "y": 5.0
    },
    {
      "face_id": 1,
      "head_node": 6,
      "id": 5,
      "length": 10.0,
      "patches": [
        1,
        2
      ],
      "status": 0,
      "tail_node": 2,
      "x": 20.0,
      "y": 5.0
    },
    {
      "face_id": -1,
      "head_node": 7,
      "id": 6,
      "length": 10.0,
      "patches": [
        2,
        -1
      ],
      "status": 4,
      "tail_node": 3,
      "x": 30.0,
      "y": 5.0
    },
    {
      "face_id": 2,
      "head_node": 5,
      "id": 7,
      "length": 10.0,
      "patches": [
        0,
        3
      ],
      "status": 0,
      "tail_node": 4,
      "x": 5.0,
      "y": 10.0
    },
    {
      "face_id": 3,
      "head_node": 6,
      "id": 8,
      "length": 10.0,
      "patches": [
        1,
        4
      ],
      "status": 0,
      "tail_node": 5,
      "x": 15.0,
      "y": 10.0
    },
    {
      "face_id": 4,
      "head_node": 7,
      "id": 9,
      "length": 10.0,
      "patches": [
        2,
        5
      ],
      "status": 0,
      "tail_node": 6,
      "x": 25.0,
      "y": 10.0
    },
    {
      "face_id": -1,
      "head_node": 8,
      "id": 10,
      "length": 10.0,
      "patches": [
        3,
        -1
      ],
      "status": 4,
      "tail_node": 4,
      "x": 0.0,
      "y": 15.0
    },
    {
      "face_id": 5,
      "head_node": 9,
      "id": 11,
      "length": 10.0,
      "patches": [
        3,
        4
      ],
      "status": 0,
      "tail_node": 5,
      "x": 10.0,
      "y": 15.0
    },
    {
      "face_id": 6,
      "head_node": 10,
      "id": 12,
      "length": 10.0,
      "patches": [
        4,
        5
      ],
      "status": 0,
      "tail_node": 6,
      "x": 20.0,
      "y": 15.0
    },
    {
      "face_id": -1,
      "head_node": 11,
      "id": 13,
      "length": 10.0,
      "patches": [
        5,
        -1
      ],
      "status": 4,
      "tail_node": 7,
      "x": 30.0,
      "y": 15.0
    },
    {
      "face_id": -1,
      "head_node": 9,
      "id": 14,
      "length": 10.0,
      "patches": [
        3,
        -1
      ],
      "status": 4,
      "tail_node": 8,
      "x": 5.0,
      "y": 20.0
    },
    {
      "face_id": -1,
      "head_node": 10,
      "id": 15,
      "length": 10.0,
      "patches": [
        4,
        -1
      ],
      "status": 4,
      "tail_node": 9,
      "x": 15.0,
      "y": 20.0
    },
    {
      "face_id": -1,
      "head_node": 11,
      "id": 16,
      "length": 10.0,
      "patches": [
        5,
        -1
      ],
      "status": 4,
      "tail_node": 10,
      "x": 25.0,
      "y": 20.0
    }
  ],
  "nodes": [
    {
      "id": 0,
      "link_dirs": [
        -1,
        -1,
        0,
        0
      ],
      "links": [
        0,
        3,
        -1,
        -1
      ],
      "neighbor_nodes": [
        1,
        4,
        -1,
        -1
      ],
      "status": 1,
      "x": 0.0,
      "y": 0.0
    },
    {
      "id": 1,
      "link_dirs": [
        -1,
        -1,
        1,
        0
      ],
      "links": [
        1,
        4,
        0,
        -1
      ],
      "neighbor_nodes": [
        2,
        5,
        0,
        -1
      ],
      "status": 1,
      "x": 10.0,
      "y": 0.0
    },
    {
      "id": 2,
      "link_dirs": [
        -1,
        -1,
        1,
        0
      ],
      "links": [
        2,
        5,
        1,
        -1
      ],
      "neighbor_nodes": [
        3,
        6,
        1,
        -1
      ],
      "status": 1,
      "x": 20.0,
      "y": 0.0
    },
    {
      "id": 3,
      "link_dirs": [
        0,
        -1,
        1,
        0
      ],
      "links": [
        -1,
        6,
        2,
        -1
      ],
      "neighbor_nodes": [
        -1,
        7,
        2,
        -1
      ],
      "status": 1,
      "x": 30.0,
      "y": 0.0
    },
    {
      "id": 4,
      "link_dirs": [
        -1,
        -1,
        0,
        1
      ],
      "links": [
        7,
        10,
        -1,
        3
      ],
      "neighbor_nodes": [
        5,
        8,
        -1,
        0
      ],
      "status": 1,
      "x": 0.0,
      "y": 10.0
    },
    {
      "id": 5,
      "link_dirs": [
        -1,
        -1,
        1,
        1
      ],
      "links": [
        8,
        11,
        7,
        4
      ],
      "neighbor_nodes": [
        6,
        9,
        4,
        1
      ],
      "status": 0,
      "x": 10.0,
      "y": 10.0
    },
    {
      "id": 6,
      "link_dirs": [
        -1,
        -1,
        1,
        1
      ],
      "links": [
        9,
        12,
        8,
        5
      ],
      "neighbor_nodes": [
        7,
        10,
        5,
        2
      ],
      "status": 0,
      "x": 20.0,
      "y": 10.0
    },
    {
      "id": 7,
      "link_dirs": [
        0,
        -1,
        1,
        1
      ],
      "links": [
        -1,
        13,
        9,
        6
      ],
      "neighbor_nodes": [
        -1,
        11,
        6,
        3
      ],
      "status": 1,
      "x": 30.0,
      "y": 10.0
    },
    {
      "id": 8,
      "link_dirs": [
        -1,
        0,
        0,
        1
      ],
      "links": [
        14,
        -1,
        -1,
        10
      ],
      "neighbor_nodes": [
        9,
        -1,
        -1,
        4
      ],
      "status": 1,
      "x": 0.0,
      "y": 20.0
    },
    {
      "id": 9,
      "link_dirs": [
        -1,
        0,
        1,
        1
      ],
      "links": [
        15,
        -1,
        14,
        11
      ],
      "neighbor_nodes": [
        10,
        -1,
        8,
        5
      ],
      "status": 1,
      "x": 10.0,
      "y": 20.0
    },
    {
      "id": 10,
      "link_dirs": [
        -1,
        0,
        1,
        1
      ],
      "links": [
        16,
        -1,
        15,
        12
      ],
      "neighbor_nodes": [
        11,
        -1,
        9,
        6
      ],
      "status": 1,
      "x": 20.0,
      "y": 20.0
    },
    {
      "id": 11,
      "link_dirs": [
        0,
        0,
        1,
        1
      ],
      "links": [
        -1,
        -1,
        16,
        13
      ],
      "neighbor_nodes": [
        -1,
        -1,
        10,
        7
      ],
      "status": 1,
      "x": 30.0,
      "y": 20.0
    }
  ],
  "patches": [
    {
      "id": 0,
      "links": [
        4,
        7,
        3,
        0
      ]
    },
    {
      "id": 1,
      "links": [
        5,
        8,
        4,
        1
      ]
    },
    {
      "id": 2,
      "links": [
        6,
        9,
        5,
        2
      ]
    },
    {
      "id": 3,
      "links": [
        11,
        14,
        10,
        7
      ]
    },
    {
      "id": 4,
      "links": [
        12,
        15,
        11,
        8
      ]
    },
    {
      "id": 5,
      "links": [
        13,
        16,
        12,
        9
      ]
    }
  ]
};
;
});

require.register("landlab_raster_grid_example-second.json", function(exports, require, module) {
module.exports = {
    "cells": [
        {
            "area": 100.0,
            "corners": [
                4,
                3,
                0,
                1
            ],
            "faces": [
                3,
                5,
                2,
                0
            ],
            "id": 0,
            "node": 5,
            "x": 10.0,
            "y": 10.0
        },
        {
            "area": 100.0,
            "corners": [
                5,
                4,
                1,
                2
            ],
            "faces": [
                4,
                6,
                3,
                1
            ],
            "id": 1,
            "node": 6,
            "x": 20.0,
            "y": 10.0
        }
    ],
    "faces": [
        {
            "cells": [
                -1,
                0
            ],
            "corners": [
                0,
                1
            ],
            "head_corner": 1,
            "id": 0,
            "length": 10.0,
            "link": 4,
            "tail_corner": 0,
            "x": 10.0,
            "y": 5.0
        },
        {
            "cells": [
                -1,
                1
            ],
            "corners": [
                1,
                2
            ],
            "head_corner": 2,
            "id": 1,
            "length": 10.0,
            "link": 5,
            "tail_corner": 1,
            "x": 20.0,
            "y": 5.0
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                0,
                3
            ],
            "head_corner": 3,
            "id": 2,
            "length": 10.0,
            "link": 7,
            "tail_corner": 0,
            "x": 5.0,
            "y": 10.0
        },
        {
            "cells": [
                1,
                0
            ],
            "corners": [
                1,
                4
            ],
            "head_corner": 4,
            "id": 3,
            "length": 10.0,
            "link": 8,
            "tail_corner": 1,
            "x": 15.0,
            "y": 10.0
        },
        {
            "cells": [
                -1,
                1
            ],
            "corners": [
                2,
                5
            ],
            "head_corner": 5,
            "id": 4,
            "length": 10.0,
            "link": 9,
            "tail_corner": 2,
            "x": 25.0,
            "y": 10.0
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                3,
                4
            ],
            "head_corner": 4,
            "id": 5,
            "length": 10.0,
            "link": 11,
            "tail_corner": 3,
            "x": 10.0,
            "y": 15.0
        },
        {
            "cells": [
                1,
                -1
            ],
            "corners": [
                4,
                5
            ],
            "head_corner": 5,
            "id": 6,
            "length": 10.0,
            "link": 12,
            "tail_corner": 4,
            "x": 20.0,
            "y": 15.0
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
                0,
                -1
            ],
            "status": 4,
            "tail_node": 0,
            "x": 0.0,
            "y": 5.0
        },
        {
            "face_id": 0,
            "head_node": 5,
            "id": 4,
            "length": 10.0,
            "nodes": [
                1,
                5
            ],
            "patches": [
                0,
                1
            ],
            "status": 0,
            "tail_node": 1,
            "x": 10.0,
            "y": 5.0
        },
        {
            "face_id": 1,
            "head_node": 6,
            "id": 5,
            "length": 10.0,
            "nodes": [
                2,
                6
            ],
            "patches": [
                1,
                2
            ],
            "status": 0,
            "tail_node": 2,
            "x": 20.0,
            "y": 5.0
        },
        {
            "face_id": -1,
            "head_node": 7,
            "id": 6,
            "length": 10.0,
            "nodes": [
                3,
                7
            ],
            "patches": [
                2,
                -1
            ],
            "status": 4,
            "tail_node": 3,
            "x": 30.0,
            "y": 5.0
        },
        {
            "face_id": 2,
            "head_node": 5,
            "id": 7,
            "length": 10.0,
            "nodes": [
                4,
                5
            ],
            "patches": [
                0,
                3
            ],
            "status": 0,
            "tail_node": 4,
            "x": 5.0,
            "y": 10.0
        },
        {
            "face_id": 3,
            "head_node": 6,
            "id": 8,
            "length": 10.0,
            "nodes": [
                5,
                6
            ],
            "patches": [
                1,
                4
            ],
            "status": 0,
            "tail_node": 5,
            "x": 15.0,
            "y": 10.0
        },
        {
            "face_id": 4,
            "head_node": 7,
            "id": 9,
            "length": 10.0,
            "nodes": [
                6,
                7
            ],
            "patches": [
                2,
                5
            ],
            "status": 0,
            "tail_node": 6,
            "x": 25.0,
            "y": 10.0
        },
        {
            "face_id": -1,
            "head_node": 8,
            "id": 10,
            "length": 10.0,
            "nodes": [
                4,
                8
            ],
            "patches": [
                3,
                -1
            ],
            "status": 4,
            "tail_node": 4,
            "x": 0.0,
            "y": 15.0
        },
        {
            "face_id": 5,
            "head_node": 9,
            "id": 11,
            "length": 10.0,
            "nodes": [
                5,
                9
            ],
            "patches": [
                3,
                4
            ],
            "status": 0,
            "tail_node": 5,
            "x": 10.0,
            "y": 15.0
        },
        {
            "face_id": 6,
            "head_node": 10,
            "id": 12,
            "length": 10.0,
            "nodes": [
                6,
                10
            ],
            "patches": [
                4,
                5
            ],
            "status": 0,
            "tail_node": 6,
            "x": 20.0,
            "y": 15.0
        },
        {
            "face_id": -1,
            "head_node": 11,
            "id": 13,
            "length": 10.0,
            "nodes": [
                7,
                11
            ],
            "patches": [
                5,
                -1
            ],
            "status": 4,
            "tail_node": 7,
            "x": 30.0,
            "y": 15.0
        },
        {
            "face_id": -1,
            "head_node": 9,
            "id": 14,
            "length": 10.0,
            "nodes": [
                8,
                9
            ],
            "patches": [
                3,
                -1
            ],
            "status": 4,
            "tail_node": 8,
            "x": 5.0,
            "y": 20.0
        },
        {
            "face_id": -1,
            "head_node": 10,
            "id": 15,
            "length": 10.0,
            "nodes": [
                9,
                10
            ],
            "patches": [
                4,
                -1
            ],
            "status": 4,
            "tail_node": 9,
            "x": 15.0,
            "y": 20.0
        },
        {
            "face_id": -1,
            "head_node": 11,
            "id": 16,
            "length": 10.0,
            "nodes": [
                10,
                11
            ],
            "patches": [
                5,
                -1
            ],
            "status": 4,
            "tail_node": 10,
            "x": 25.0,
            "y": 20.0
        }
    ],
    "nodes": [
        {
            "cell": -1,
            "id": 0,
            "link_dirs": [
                -1,
                -1,
                0,
                0
            ],
            "links": [
                0,
                3,
                -1,
                -1
            ],
            "neighbor_nodes": [
                1,
                4,
                -1,
                -1
            ],
            "patches": [
                0,
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
                1,
                0
            ],
            "links": [
                1,
                4,
                0,
                -1
            ],
            "neighbor_nodes": [
                2,
                5,
                0,
                -1
            ],
            "patches": [
                1,
                0,
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
                1,
                0
            ],
            "links": [
                2,
                5,
                1,
                -1
            ],
            "neighbor_nodes": [
                3,
                6,
                1,
                -1
            ],
            "patches": [
                2,
                1,
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
                0,
                -1,
                1,
                0
            ],
            "links": [
                -1,
                6,
                2,
                -1
            ],
            "neighbor_nodes": [
                -1,
                7,
                2,
                -1
            ],
            "patches": [
                -1,
                2,
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
                0,
                1
            ],
            "links": [
                7,
                10,
                -1,
                3
            ],
            "neighbor_nodes": [
                5,
                8,
                -1,
                0
            ],
            "patches": [
                3,
                -1,
                -1,
                0
            ],
            "status": 1,
            "x": 0.0,
            "y": 10.0
        },
        {
            "cell": 0,
            "id": 5,
            "link_dirs": [
                -1,
                -1,
                1,
                1
            ],
            "links": [
                8,
                11,
                7,
                4
            ],
            "neighbor_nodes": [
                6,
                9,
                4,
                1
            ],
            "patches": [
                4,
                3,
                0,
                1
            ],
            "status": 0,
            "x": 10.0,
            "y": 10.0
        },
        {
            "cell": 1,
            "id": 6,
            "link_dirs": [
                -1,
                -1,
                1,
                1
            ],
            "links": [
                9,
                12,
                8,
                5
            ],
            "neighbor_nodes": [
                7,
                10,
                5,
                2
            ],
            "patches": [
                5,
                4,
                1,
                2
            ],
            "status": 0,
            "x": 20.0,
            "y": 10.0
        },
        {
            "cell": -1,
            "id": 7,
            "link_dirs": [
                0,
                -1,
                1,
                1
            ],
            "links": [
                -1,
                13,
                9,
                6
            ],
            "neighbor_nodes": [
                -1,
                11,
                6,
                3
            ],
            "patches": [
                -1,
                5,
                2,
                -1
            ],
            "status": 1,
            "x": 30.0,
            "y": 10.0
        },
        {
            "cell": -1,
            "id": 8,
            "link_dirs": [
                -1,
                0,
                0,
                1
            ],
            "links": [
                14,
                -1,
                -1,
                10
            ],
            "neighbor_nodes": [
                9,
                -1,
                -1,
                4
            ],
            "patches": [
                -1,
                -1,
                -1,
                3
            ],
            "status": 1,
            "x": 0.0,
            "y": 20.0
        },
        {
            "cell": -1,
            "id": 9,
            "link_dirs": [
                -1,
                0,
                1,
                1
            ],
            "links": [
                15,
                -1,
                14,
                11
            ],
            "neighbor_nodes": [
                10,
                -1,
                8,
                5
            ],
            "patches": [
                -1,
                -1,
                3,
                4
            ],
            "status": 1,
            "x": 10.0,
            "y": 20.0
        },
        {
            "cell": -1,
            "id": 10,
            "link_dirs": [
                -1,
                0,
                1,
                1
            ],
            "links": [
                16,
                -1,
                15,
                12
            ],
            "neighbor_nodes": [
                11,
                -1,
                9,
                6
            ],
            "patches": [
                -1,
                -1,
                4,
                5
            ],
            "status": 1,
            "x": 20.0,
            "y": 20.0
        },
        {
            "cell": -1,
            "id": 11,
            "link_dirs": [
                0,
                0,
                1,
                1
            ],
            "links": [
                -1,
                -1,
                16,
                13
            ],
            "neighbor_nodes": [
                -1,
                -1,
                10,
                7
            ],
            "patches": [
                -1,
                -1,
                5,
                -1
            ],
            "status": 1,
            "x": 30.0,
            "y": 20.0
        }
    ],
    "patches": [
        {
            "area": 100.0,
            "id": 0,
            "links": [
                4,
                7,
                3,
                0
            ],
            "nodes": [
                5,
                4,
                0,
                1
            ]
        },
        {
            "area": 100.0,
            "id": 1,
            "links": [
                5,
                8,
                4,
                1
            ],
            "nodes": [
                6,
                5,
                1,
                2
            ]
        },
        {
            "area": 100.0,
            "id": 2,
            "links": [
                6,
                9,
                5,
                2
            ],
            "nodes": [
                7,
                6,
                2,
                3
            ]
        },
        {
            "area": 100.0,
            "id": 3,
            "links": [
                11,
                14,
                10,
                7
            ],
            "nodes": [
                9,
                8,
                4,
                5
            ]
        },
        {
            "area": 100.0,
            "id": 4,
            "links": [
                12,
                15,
                11,
                8
            ],
            "nodes": [
                10,
                9,
                5,
                6
            ]
        },
        {
            "area": 100.0,
            "id": 5,
            "links": [
                13,
                16,
                12,
                9
            ],
            "nodes": [
                11,
                10,
                6,
                7
            ]
        }
    ]
};
});

require.register("landlab_raster_grid_example.json", function(exports, require, module) {
module.exports = {
    "cells": [
        {
            "area": 100.0,
            "corners": [
                4,
                3,
                0,
                1
            ],
            "faces": [
                3,
                5,
                2,
                0
            ],
            "id": 0,
            "node": 5,
            "x": 10.0,
            "y": 10.0
        },
        {
            "area": 100.0,
            "corners": [
                5,
                4,
                1,
                2
            ],
            "faces": [
                4,
                6,
                3,
                1
            ],
            "id": 1,
            "node": 6,
            "x": 20.0,
            "y": 10.0
        }
    ],
    "corners": [
        {
            "cells": [
                0,
                -1,
                -1,
                -1
            ],
            "face_dirs": [
                -1,
                -1,
                0,
                0
            ],
            "faces": [
                0,
                2,
                -1,
                -1
            ],
            "id": 0,
            "x": 5.0,
            "y": 5.0
        },
        {
            "cells": [
                1,
                0,
                -1,
                -1
            ],
            "face_dirs": [
                -1,
                -1,
                1,
                0
            ],
            "faces": [
                1,
                3,
                0,
                -1
            ],
            "id": 1,
            "x": 15.0,
            "y": 5.0
        },
        {
            "cells": [
                -1,
                1,
                -1,
                -1
            ],
            "face_dirs": [
                0,
                -1,
                1,
                0
            ],
            "faces": [
                -1,
                4,
                1,
                -1
            ],
            "id": 2,
            "x": 25.0,
            "y": 5.0
        },
        {
            "cells": [
                -1,
                -1,
                -1,
                0
            ],
            "face_dirs": [
                -1,
                0,
                0,
                1
            ],
            "faces": [
                5,
                -1,
                -1,
                2
            ],
            "id": 3,
            "x": 5.0,
            "y": 15.0
        },
        {
            "cells": [
                -1,
                -1,
                0,
                1
            ],
            "face_dirs": [
                -1,
                0,
                1,
                1
            ],
            "faces": [
                6,
                -1,
                5,
                3
            ],
            "id": 4,
            "x": 15.0,
            "y": 15.0
        },
        {
            "cells": [
                -1,
                -1,
                1,
                -1
            ],
            "face_dirs": [
                0,
                0,
                1,
                1
            ],
            "faces": [
                -1,
                -1,
                6,
                4
            ],
            "id": 5,
            "x": 25.0,
            "y": 15.0
        }
    ],
    "faces": [
        {
            "cells": [
                -1,
                0
            ],
            "corners": [
                0,
                1
            ],
            "head_corner": 1,
            "id": 0,
            "length": 10.0,
            "link": 4,
            "tail_corner": 0,
            "x": 10.0,
            "y": 5.0
        },
        {
            "cells": [
                -1,
                1
            ],
            "corners": [
                1,
                2
            ],
            "head_corner": 2,
            "id": 1,
            "length": 10.0,
            "link": 5,
            "tail_corner": 1,
            "x": 20.0,
            "y": 5.0
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                0,
                3
            ],
            "head_corner": 3,
            "id": 2,
            "length": 10.0,
            "link": 7,
            "tail_corner": 0,
            "x": 5.0,
            "y": 10.0
        },
        {
            "cells": [
                1,
                0
            ],
            "corners": [
                1,
                4
            ],
            "head_corner": 4,
            "id": 3,
            "length": 10.0,
            "link": 8,
            "tail_corner": 1,
            "x": 15.0,
            "y": 10.0
        },
        {
            "cells": [
                -1,
                1
            ],
            "corners": [
                2,
                5
            ],
            "head_corner": 5,
            "id": 4,
            "length": 10.0,
            "link": 9,
            "tail_corner": 2,
            "x": 25.0,
            "y": 10.0
        },
        {
            "cells": [
                0,
                -1
            ],
            "corners": [
                3,
                4
            ],
            "head_corner": 4,
            "id": 5,
            "length": 10.0,
            "link": 11,
            "tail_corner": 3,
            "x": 10.0,
            "y": 15.0
        },
        {
            "cells": [
                1,
                -1
            ],
            "corners": [
                4,
                5
            ],
            "head_corner": 5,
            "id": 6,
            "length": 10.0,
            "link": 12,
            "tail_corner": 4,
            "x": 20.0,
            "y": 15.0
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
                0,
                -1
            ],
            "status": 4,
            "tail_node": 0,
            "x": 0.0,
            "y": 5.0
        },
        {
            "face_id": 0,
            "head_node": 5,
            "id": 4,
            "length": 10.0,
            "nodes": [
                1,
                5
            ],
            "patches": [
                0,
                1
            ],
            "status": 0,
            "tail_node": 1,
            "x": 10.0,
            "y": 5.0
        },
        {
            "face_id": 1,
            "head_node": 6,
            "id": 5,
            "length": 10.0,
            "nodes": [
                2,
                6
            ],
            "patches": [
                1,
                2
            ],
            "status": 0,
            "tail_node": 2,
            "x": 20.0,
            "y": 5.0
        },
        {
            "face_id": -1,
            "head_node": 7,
            "id": 6,
            "length": 10.0,
            "nodes": [
                3,
                7
            ],
            "patches": [
                2,
                -1
            ],
            "status": 4,
            "tail_node": 3,
            "x": 30.0,
            "y": 5.0
        },
        {
            "face_id": 2,
            "head_node": 5,
            "id": 7,
            "length": 10.0,
            "nodes": [
                4,
                5
            ],
            "patches": [
                0,
                3
            ],
            "status": 0,
            "tail_node": 4,
            "x": 5.0,
            "y": 10.0
        },
        {
            "face_id": 3,
            "head_node": 6,
            "id": 8,
            "length": 10.0,
            "nodes": [
                5,
                6
            ],
            "patches": [
                1,
                4
            ],
            "status": 0,
            "tail_node": 5,
            "x": 15.0,
            "y": 10.0
        },
        {
            "face_id": 4,
            "head_node": 7,
            "id": 9,
            "length": 10.0,
            "nodes": [
                6,
                7
            ],
            "patches": [
                2,
                5
            ],
            "status": 0,
            "tail_node": 6,
            "x": 25.0,
            "y": 10.0
        },
        {
            "face_id": -1,
            "head_node": 8,
            "id": 10,
            "length": 10.0,
            "nodes": [
                4,
                8
            ],
            "patches": [
                3,
                -1
            ],
            "status": 4,
            "tail_node": 4,
            "x": 0.0,
            "y": 15.0
        },
        {
            "face_id": 5,
            "head_node": 9,
            "id": 11,
            "length": 10.0,
            "nodes": [
                5,
                9
            ],
            "patches": [
                3,
                4
            ],
            "status": 0,
            "tail_node": 5,
            "x": 10.0,
            "y": 15.0
        },
        {
            "face_id": 6,
            "head_node": 10,
            "id": 12,
            "length": 10.0,
            "nodes": [
                6,
                10
            ],
            "patches": [
                4,
                5
            ],
            "status": 0,
            "tail_node": 6,
            "x": 20.0,
            "y": 15.0
        },
        {
            "face_id": -1,
            "head_node": 11,
            "id": 13,
            "length": 10.0,
            "nodes": [
                7,
                11
            ],
            "patches": [
                5,
                -1
            ],
            "status": 4,
            "tail_node": 7,
            "x": 30.0,
            "y": 15.0
        },
        {
            "face_id": -1,
            "head_node": 9,
            "id": 14,
            "length": 10.0,
            "nodes": [
                8,
                9
            ],
            "patches": [
                3,
                -1
            ],
            "status": 4,
            "tail_node": 8,
            "x": 5.0,
            "y": 20.0
        },
        {
            "face_id": -1,
            "head_node": 10,
            "id": 15,
            "length": 10.0,
            "nodes": [
                9,
                10
            ],
            "patches": [
                4,
                -1
            ],
            "status": 4,
            "tail_node": 9,
            "x": 15.0,
            "y": 20.0
        },
        {
            "face_id": -1,
            "head_node": 11,
            "id": 16,
            "length": 10.0,
            "nodes": [
                10,
                11
            ],
            "patches": [
                5,
                -1
            ],
            "status": 4,
            "tail_node": 10,
            "x": 25.0,
            "y": 20.0
        }
    ],
    "nodes": [
        {
            "cell": -1,
            "id": 0,
            "link_dirs": [
                -1,
                -1,
                0,
                0
            ],
            "links": [
                0,
                3,
                -1,
                -1
            ],
            "neighbor_nodes": [
                1,
                4,
                -1,
                -1
            ],
            "patches": [
                0,
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
                1,
                0
            ],
            "links": [
                1,
                4,
                0,
                -1
            ],
            "neighbor_nodes": [
                2,
                5,
                0,
                -1
            ],
            "patches": [
                1,
                0,
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
                1,
                0
            ],
            "links": [
                2,
                5,
                1,
                -1
            ],
            "neighbor_nodes": [
                3,
                6,
                1,
                -1
            ],
            "patches": [
                2,
                1,
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
                0,
                -1,
                1,
                0
            ],
            "links": [
                -1,
                6,
                2,
                -1
            ],
            "neighbor_nodes": [
                -1,
                7,
                2,
                -1
            ],
            "patches": [
                -1,
                2,
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
                0,
                1
            ],
            "links": [
                7,
                10,
                -1,
                3
            ],
            "neighbor_nodes": [
                5,
                8,
                -1,
                0
            ],
            "patches": [
                3,
                -1,
                -1,
                0
            ],
            "status": 1,
            "x": 0.0,
            "y": 10.0
        },
        {
            "cell": 0,
            "id": 5,
            "link_dirs": [
                -1,
                -1,
                1,
                1
            ],
            "links": [
                8,
                11,
                7,
                4
            ],
            "neighbor_nodes": [
                6,
                9,
                4,
                1
            ],
            "patches": [
                4,
                3,
                0,
                1
            ],
            "status": 0,
            "x": 10.0,
            "y": 10.0
        },
        {
            "cell": 1,
            "id": 6,
            "link_dirs": [
                -1,
                -1,
                1,
                1
            ],
            "links": [
                9,
                12,
                8,
                5
            ],
            "neighbor_nodes": [
                7,
                10,
                5,
                2
            ],
            "patches": [
                5,
                4,
                1,
                2
            ],
            "status": 0,
            "x": 20.0,
            "y": 10.0
        },
        {
            "cell": -1,
            "id": 7,
            "link_dirs": [
                0,
                -1,
                1,
                1
            ],
            "links": [
                -1,
                13,
                9,
                6
            ],
            "neighbor_nodes": [
                -1,
                11,
                6,
                3
            ],
            "patches": [
                -1,
                5,
                2,
                -1
            ],
            "status": 1,
            "x": 30.0,
            "y": 10.0
        },
        {
            "cell": -1,
            "id": 8,
            "link_dirs": [
                -1,
                0,
                0,
                1
            ],
            "links": [
                14,
                -1,
                -1,
                10
            ],
            "neighbor_nodes": [
                9,
                -1,
                -1,
                4
            ],
            "patches": [
                -1,
                -1,
                -1,
                3
            ],
            "status": 1,
            "x": 0.0,
            "y": 20.0
        },
        {
            "cell": -1,
            "id": 9,
            "link_dirs": [
                -1,
                0,
                1,
                1
            ],
            "links": [
                15,
                -1,
                14,
                11
            ],
            "neighbor_nodes": [
                10,
                -1,
                8,
                5
            ],
            "patches": [
                -1,
                -1,
                3,
                4
            ],
            "status": 1,
            "x": 10.0,
            "y": 20.0
        },
        {
            "cell": -1,
            "id": 10,
            "link_dirs": [
                -1,
                0,
                1,
                1
            ],
            "links": [
                16,
                -1,
                15,
                12
            ],
            "neighbor_nodes": [
                11,
                -1,
                9,
                6
            ],
            "patches": [
                -1,
                -1,
                4,
                5
            ],
            "status": 1,
            "x": 20.0,
            "y": 20.0
        },
        {
            "cell": -1,
            "id": 11,
            "link_dirs": [
                0,
                0,
                1,
                1
            ],
            "links": [
                -1,
                -1,
                16,
                13
            ],
            "neighbor_nodes": [
                -1,
                -1,
                10,
                7
            ],
            "patches": [
                -1,
                -1,
                5,
                -1
            ],
            "status": 1,
            "x": 30.0,
            "y": 20.0
        }
    ],
    "patches": [
        {
            "area": 100.0,
            "id": 0,
            "links": [
                4,
                7,
                3,
                0
            ],
            "nodes": [
                5,
                4,
                0,
                1
            ]
        },
        {
            "area": 100.0,
            "id": 1,
            "links": [
                5,
                8,
                4,
                1
            ],
            "nodes": [
                6,
                5,
                1,
                2
            ]
        },
        {
            "area": 100.0,
            "id": 2,
            "links": [
                6,
                9,
                5,
                2
            ],
            "nodes": [
                7,
                6,
                2,
                3
            ]
        },
        {
            "area": 100.0,
            "id": 3,
            "links": [
                11,
                14,
                10,
                7
            ],
            "nodes": [
                9,
                8,
                4,
                5
            ]
        },
        {
            "area": 100.0,
            "id": 4,
            "links": [
                12,
                15,
                11,
                8
            ],
            "nodes": [
                10,
                9,
                5,
                6
            ]
        },
        {
            "area": 100.0,
            "id": 5,
            "links": [
                13,
                16,
                12,
                9
            ],
            "nodes": [
                11,
                10,
                6,
                7
            ]
        }
    ]
};
});

require.register("scss/grid.scss", function(exports, require, module) {
module.exports = {"node":"_node_1tg1m_1"};
});

require.register("theme/app.scss", function(exports, require, module) {
module.exports = {"chart":"_chart_mg0q5_1"};
});

require.register("theme/cell.scss", function(exports, require, module) {
module.exports = {"cell":"_cell_1453t_1","none":"_none_1453t_6","highlight":"_highlight_1453t_9","text":"_text_1453t_14","activeLabel":"_activeLabel_1453t_17"};
});

require.register("theme/corner.scss", function(exports, require, module) {
module.exports = {"corner":"_corner_1gvuu_1","none":"_none_1gvuu_6","highlight":"_highlight_1gvuu_9","text":"_text_1gvuu_12","activeLabel":"_activeLabel_1gvuu_15"};
});

require.register("theme/face.scss", function(exports, require, module) {
module.exports = {"face":"_face_3qvdu_1","none":"_none_3qvdu_7","highlight":"_highlight_3qvdu_10","text":"_text_3qvdu_13","activeLabel":"_activeLabel_3qvdu_16","arrow":"_arrow_3qvdu_21"};
});

require.register("theme/grid.scss", function(exports, require, module) {
module.exports = {"chart":"_chart_3y0hp_1"};
});

require.register("theme/legend.scss", function(exports, require, module) {
module.exports = {"container":"_container_1dscn_1","section":"_section_1dscn_8","column":"_column_1dscn_15","button":"_button_1dscn_24","cellButtonDown":"_cellButtonDown_1dscn_24","cellLabelButton":"_cellLabelButton_1dscn_24","patchButtonDown":"_patchButtonDown_1dscn_24","patchLabelButton":"_patchLabelButton_1dscn_24","linkButtonDown":"_linkButtonDown_1dscn_24","linkLabelButton":"_linkLabelButton_1dscn_24","faceButtonDown":"_faceButtonDown_1dscn_24","faceLabelButton":"_faceLabelButton_1dscn_24","nodeButtonDown":"_nodeButtonDown_1dscn_24","nodeLabelButton":"_nodeLabelButton_1dscn_24","cornerButtonDown":"_cornerButtonDown_1dscn_24","cornerLabelButton":"_cornerLabelButton_1dscn_24"};
});

require.register("theme/link.scss", function(exports, require, module) {
module.exports = {"link":"_link_19f57_1","none":"_none_19f57_7","highlight":"_highlight_19f57_10","text":"_text_19f57_14","activeLabel":"_activeLabel_19f57_17","arrow":"_arrow_19f57_22"};
});

require.register("theme/node.scss", function(exports, require, module) {
module.exports = {"node":"_node_1t97w_1","none":"_none_1t97w_6","highlight":"_highlight_1t97w_9","text":"_text_1t97w_12","activeLabel":"_activeLabel_1t97w_15"};
});

require.register("theme/patch.scss", function(exports, require, module) {
module.exports = {"patch":"_patch_pvkok_1","none":"_none_pvkok_6","highlight":"_highlight_pvkok_9","text":"_text_pvkok_14","activeLabel":"_activeLabel_pvkok_17"};
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.io = require("socket.io-client");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map