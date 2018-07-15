'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextLayerItemInternal = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PageContext = require('../PageContext');

var _PageContext2 = _interopRequireDefault(_PageContext);

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Render disproportion above which font will be considered broken and fallback will be used
var BROKEN_FONT_ALARM_THRESHOLD = 0.1;

var TextLayerItemInternal = exports.TextLayerItemInternal = function (_PureComponent) {
  (0, _inherits3.default)(TextLayerItemInternal, _PureComponent);

  function TextLayerItemInternal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TextLayerItemInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TextLayerItemInternal.__proto__ || (0, _getPrototypeOf2.default)(TextLayerItemInternal)).call.apply(_ref, [this].concat(args))), _this), _this.getElementWidth = function (element) {
      var _this2 = _this,
          sideways = _this2.sideways;

      return element.getBoundingClientRect()[sideways ? 'height' : 'width'];
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TextLayerItemInternal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.alignTextItem();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.alignTextItem();
    }
  }, {
    key: 'getFontData',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fontFamily) {
        var page, font;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                page = this.props.page;
                _context.next = 3;
                return page.commonObjs.ensureObj(fontFamily);

              case 3:
                font = _context.sent;
                return _context.abrupt('return', font.data);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFontData(_x) {
        return _ref2.apply(this, arguments);
      }

      return getFontData;
    }()
  }, {
    key: 'alignTextItem',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var element, _props, fontName, scale, width, targetWidth, fontData, actualWidth, widthDisproportion, repairsNeeded, fallbackFontName, ascent;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.item) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                element = this.item;

                element.style.transform = '';

                _props = this.props, fontName = _props.fontName, scale = _props.scale, width = _props.width;
                targetWidth = width * scale;
                _context2.next = 8;
                return this.getFontData(fontName);

              case 8:
                fontData = _context2.sent;
                actualWidth = this.getElementWidth(element);
                widthDisproportion = Math.abs(targetWidth / actualWidth - 1);
                repairsNeeded = widthDisproportion > BROKEN_FONT_ALARM_THRESHOLD;

                if (repairsNeeded) {
                  fallbackFontName = fontData ? fontData.fallbackName : 'sans-serif';

                  element.style.fontFamily = fallbackFontName;

                  actualWidth = this.getElementWidth(element);
                }

                ascent = fontData ? fontData.ascent : 1;


                element.style.transform = 'scaleX(' + targetWidth / actualWidth + ') translateY(' + (1 - ascent) * 100 + '%)';

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function alignTextItem() {
        return _ref3.apply(this, arguments);
      }

      return alignTextItem;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var fontSize = this.fontSize,
          top = this.top,
          left = this.left;
      var _props2 = this.props,
          customTextRenderer = _props2.customTextRenderer,
          fontName = _props2.fontName,
          scale = _props2.scale,
          text = _props2.str;


      return _react2.default.createElement(
        'div',
        {
          style: {
            height: '1em',
            fontFamily: fontName,
            fontSize: fontSize * scale + 'px',
            position: 'absolute',
            top: top * scale + 'px',
            left: left * scale + 'px',
            transformOrigin: 'left bottom',
            whiteSpace: 'pre',
            pointerEvents: 'all'
          },
          ref: function ref(_ref4) {
            _this3.item = _ref4;
          }
        },
        customTextRenderer ? customTextRenderer(this.props) : text
      );
    }
  }, {
    key: 'unrotatedViewport',
    get: function get() {
      var _props3 = this.props,
          page = _props3.page,
          scale = _props3.scale;


      return page.getViewport(scale);
    }

    /**
     * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
     * text content.
     */

  }, {
    key: 'rotate',
    get: function get() {
      var _props4 = this.props,
          page = _props4.page,
          rotate = _props4.rotate;

      return rotate - page.rotate;
    }
  }, {
    key: 'sideways',
    get: function get() {
      var rotate = this.rotate;

      return rotate % 180 !== 0;
    }
  }, {
    key: 'defaultSideways',
    get: function get() {
      var rotation = this.unrotatedViewport.rotation;

      return rotation % 180 !== 0;
    }
  }, {
    key: 'fontSize',
    get: function get() {
      var transform = this.props.transform;
      var defaultSideways = this.defaultSideways;

      var _transform = (0, _slicedToArray3.default)(transform, 2),
          fontHeightPx = _transform[0],
          fontWidthPx = _transform[1];

      return defaultSideways ? fontWidthPx : fontHeightPx;
    }
  }, {
    key: 'top',
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport,
          defaultSideways = this.defaultSideways;

      var _transform2 = (0, _slicedToArray3.default)(transform, 6),
          /* fontHeightPx */offsetX = _transform2[2],
          offsetY = _transform2[3],
          x = _transform2[4],
          y = _transform2[5];

      var _viewport$viewBox = (0, _slicedToArray3.default)(viewport.viewBox, 4),
          /* xMin */yMin = _viewport$viewBox[1],
          /* xMax */yMax = _viewport$viewBox[3];

      return defaultSideways ? x + offsetX + yMin : yMax - (y + offsetY);
    }
  }, {
    key: 'left',
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport,
          defaultSideways = this.defaultSideways;

      var _transform3 = (0, _slicedToArray3.default)(transform, 6),
          /* fontHeightPx */ /* fontWidthPx */ /* offsetX */x = _transform3[4],
          y = _transform3[5];

      var _viewport$viewBox2 = (0, _slicedToArray3.default)(viewport.viewBox, 1),
          xMin = _viewport$viewBox2[0];

      return defaultSideways ? y - xMin : x - xMin;
    }
  }]);
  return TextLayerItemInternal;
}(_react.PureComponent);

TextLayerItemInternal.propTypes = {
  customTextRenderer: _propTypes2.default.func,
  fontName: _propTypes2.default.string.isRequired,
  itemIndex: _propTypes2.default.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  page: _propTypes3.isPage.isRequired,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number,
  str: _propTypes2.default.string.isRequired,
  transform: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  width: _propTypes2.default.number.isRequired
};

var TextLayerItem = function TextLayerItem(props) {
  return _react2.default.createElement(
    _PageContext2.default.Consumer,
    null,
    function (context) {
      return _react2.default.createElement(TextLayerItemInternal, (0, _extends3.default)({}, context, props));
    }
  );
};

exports.default = TextLayerItem;