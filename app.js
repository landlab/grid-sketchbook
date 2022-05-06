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
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.io = require("socket.io-client");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map