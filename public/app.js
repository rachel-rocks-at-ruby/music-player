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
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
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
require.register("audio.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var AUDIO = document.createElement('audio');
var _default = AUDIO;
exports["default"] = _default;
});

require.register("components/App.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _PlayerContainer = _interopRequireDefault(require("./PlayerContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super.apply(this, arguments);
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_PlayerContainer["default"], null);
    }
  }]);

  return App;
}(_react["default"].Component);

exports["default"] = App;
});

;require.register("components/Player.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Player = function Player(props) {
  var actions = props.actions,
      currentSong = props.currentSong,
      isPlaying = props.isPlaying;
  var playOrPauseSong = actions.playOrPauseSong,
      setNextSong = actions.setNextSong,
      setPrevSong = actions.setPrevSong;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "player"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "songName"
  }, currentSong ? currentSong.track : ''), /*#__PURE__*/_react["default"].createElement("div", {
    className: "controls"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "button directionButton",
    onClick: setPrevSong
  }, "Prev"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "button playButton",
    onClick: function onClick() {
      return playOrPauseSong(currentSong.url, true);
    }
  }, isPlaying ? 'Pause' : 'Play'), /*#__PURE__*/_react["default"].createElement("button", {
    className: "button directionButton",
    onClick: setNextSong
  }, "Next")));
};

var _default = Player;
exports["default"] = _default;
});

;require.register("components/PlayerContainer.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Player = _interopRequireDefault(require("./Player"));

var _SongList = _interopRequireDefault(require("./SongList"));

var _playlist = _interopRequireDefault(require("../playlist.js"));

var _audio = _interopRequireDefault(require("../audio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Player Container
var PlayerContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(PlayerContainer, _React$Component);

  var _super = _createSuper(PlayerContainer);

  function PlayerContainer() {
    var _this;

    _classCallCheck(this, PlayerContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      currentSong: _objectSpread(_objectSpread({}, _playlist["default"][0]), {}, {
        index: 0
      }),
      isPlaying: false,
      shuffle: false
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      _audio["default"].play();

      _this.setState({
        isPlaying: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function () {
      // TODO: make pause resume at expected time
      _audio["default"].pause();

      _this.setState({
        isPlaying: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "load", function (currentSong) {
      _audio["default"].src = currentSong.url;

      _audio["default"].load();

      _this.setState({
        currentSong: currentSong
      });
    });

    _defineProperty(_assertThisInitialized(_this), "startSong", function (song) {
      _this.pause();

      _this.load(song);

      _this.play();
    });

    _defineProperty(_assertThisInitialized(_this), "playOrPauseSong", function () {
      var _this$state = _this.state,
          currentSong = _this$state.currentSong,
          isPlaying = _this$state.isPlaying;

      if (isPlaying) {
        _this.pause();
      } else {
        _this.startSong(currentSong);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setCurrentSong", function (currentSong) {
      _this.startSong(currentSong);
    });

    _defineProperty(_assertThisInitialized(_this), "setNextSong", function () {
      var _this$state2 = _this.state,
          currentSong = _this$state2.currentSong,
          shuffle = _this$state2.shuffle;
      var updatedSongIndex;

      if (shuffle) {
        // TODO: make sure shuffling doesn't repeat songs that already played
        updatedSongIndex = Math.floor(Math.random() * (0, _playlist["default"].length));
      } else {
        var nextSongIndex = currentSong.index + 1;
        updatedSongIndex = nextSongIndex >= _playlist["default"].length ? 0 : nextSongIndex;
      }

      var newSong = _objectSpread(_objectSpread({}, _playlist["default"][updatedSongIndex]), {}, {
        index: updatedSongIndex
      });

      _this.setCurrentSong(newSong);
    });

    _defineProperty(_assertThisInitialized(_this), "setPrevSong", function () {
      var _this$state3 = _this.state,
          currentSong = _this$state3.currentSong,
          shuffle = _this$state3.shuffle;
      var updatedSongIndex;

      if (shuffle) {
        // TODO: go to previous song based on random order
        updatedSongIndex = Math.floor(Math.random() * (0, _playlist["default"].length));
      } else {
        var prevSongIndex = currentSong.index - 1;
        var lastSong = _playlist["default"].length - 1;
        updatedSongIndex = prevSongIndex < 0 ? lastSong : prevSongIndex;
      }

      var newSong = _objectSpread(_objectSpread({}, _playlist["default"][updatedSongIndex]), {}, {
        index: updatedSongIndex
      });

      _this.setCurrentSong(newSong);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleShuffle", function () {
      _this.setState(function (prevState) {
        return {
          shuffle: !prevState.shuffle
        };
      });
    });

    return _this;
  }

  _createClass(PlayerContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _audio["default"].addEventListener('ended', function () {
        return _this2.setNextSong();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      _audio["default"].removeEventListener('ended', function () {
        return _this3.setState({
          isPlaying: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
          currentSong = _this$state4.currentSong,
          isPlaying = _this$state4.isPlaying,
          shuffle = _this$state4.shuffle;
      var actions = {
        playOrPauseSong: this.playOrPauseSong,
        setCurrentSong: this.setCurrentSong,
        setNextSong: this.setNextSong,
        setPrevSong: this.setPrevSong,
        toggleShuffle: this.toggleShuffle
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "container"
      }, /*#__PURE__*/_react["default"].createElement(_Player["default"], {
        actions: actions,
        currentSong: currentSong,
        isPlaying: isPlaying
      }), /*#__PURE__*/_react["default"].createElement(_SongList["default"], {
        actions: actions,
        currentSong: currentSong,
        shuffle: shuffle
      }));
    }
  }]);

  return PlayerContainer;
}(_react["default"].Component);

exports["default"] = PlayerContainer;
});

;require.register("components/SongList.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _playlist = _interopRequireDefault(require("../playlist.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SongList = function SongList(props) {
  var actions = props.actions,
      currentSong = props.currentSong,
      shuffle = props.shuffle;
  var setCurrentSong = actions.setCurrentSong,
      toggleShuffle = actions.toggleShuffle;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlist"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlistHeader"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlistTitle"
  }, "Playlist"), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox",
    checked: shuffle,
    onChange: toggleShuffle
  }), ' ', "Shuffle")), _playlist["default"].map(function (song, index) {
    var album = song.album,
        artist = song.artist,
        id = song.id,
        track = song.track;
    var activeSong = id === currentSong.id;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(activeSong && 'activeSong', " song"),
      key: id,
      onClick: function onClick() {
        return setCurrentSong(_objectSpread(_objectSpread({}, song), {}, {
          index: index
        }));
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "track"
    }, track), /*#__PURE__*/_react["default"].createElement("div", {
      className: "songInfo"
    }, artist, " - ", album));
  }));
};

var _default = SongList;
exports["default"] = _default;
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_App["default"], null), document.querySelector('#app'));
});
});

;require.register("playlist.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  artist: 'Frank Ocean',
  album: 'channel ORANGE',
  track: 'Sweet Life',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/frank_ocean_sweet_life.mp3',
  id: '7a187a2c-e6fe-46a6-a8d4-5b5984da3de3'
}, {
  artist: 'Grace Jones',
  album: 'Bulletproof Heart',
  track: 'On My Way',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/grace_jones_on_my_way.mp3',
  id: '9f6b44a3-0d57-4ae1-bfab-2447adf6eaf0'
}, {
  artist: 'Junior Boys',
  album: 'Big Black Coat',
  track: 'You Say That',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/junior_boys_you_say_that.mp3',
  id: '1c8d7409-59fb-4bf8-9ee6-8a328559754a'
}, {
  artist: 'Kate Bush',
  album: 'Hounds of Love',
  track: 'Running Up That Hill',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/kate_bush_running_up_that_hill.mp3',
  id: 'a27f140e-082d-4004-9368-1c7bfd84e9d0'
}, {
  artist: 'King',
  album: 'We Are King',
  track: 'Supernatural',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/king_supernatural.mp3',
  id: '0a78d3b2-7dc6-462b-8d8c-a5310ccb6451'
}, {
  artist: 'Terry Riley',
  album: 'Persian Surgery Dervishes',
  track: 'Performance 1, part 1',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/terry_riley_persian_surgery_dervises_performance_1_part_1.mp3',
  id: 'd7e10f3c-e967-43f8-babc-14ce537a2578'
}];
exports["default"] = _default;
});

;require.alias("buffer/index.js", "buffer");
require.alias("events/events.js", "events");
require.alias("path-browserify/index.js", "path");
require.alias("process/browser.js", "process");
require.alias("stream-browserify/index.js", "stream");
require.alias("string_decoder/lib/string_decoder.js", "string_decoder");
require.alias("util/util.js", "sys");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map