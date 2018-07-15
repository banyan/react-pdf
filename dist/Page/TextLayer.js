'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextLayerInternal = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _TextLayerItem = require('./TextLayerItem');

var _TextLayerItem2 = _interopRequireDefault(_TextLayerItem);

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextLayerInternal = exports.TextLayerInternal = function (_PureComponent) {
  (0, _inherits3.default)(TextLayerInternal, _PureComponent);

  function TextLayerInternal() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TextLayerInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TextLayerInternal.__proto__ || (0, _getPrototypeOf2.default)(TextLayerInternal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      textItems: null
    }, _this.loadTextItems = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var page, cancellable, _ref3, textItems;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              page = _this.props.page;
              _context.prev = 1;
              cancellable = (0, _utils.makeCancellable)(page.getTextContent());

              _this.runningTask = cancellable;
              _context.next = 6;
              return cancellable.promise;

            case 6:
              _ref3 = _context.sent;
              textItems = _ref3.items;

              _this.setState({ textItems: textItems }, _this.onLoadSuccess);
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](1);

              _this.setState({ textItems: false });
              _this.onLoadError(_context.t0);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 11]]);
    })), _this.onLoadSuccess = function () {
      var onGetTextSuccess = _this.props.onGetTextSuccess;
      var textItems = _this.state.textItems;


      (0, _utils.callIfDefined)(onGetTextSuccess, textItems);
    }, _this.onLoadError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onGetTextError = _this.props.onGetTextError;


      (0, _utils.callIfDefined)(onGetTextError, error);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TextLayerInternal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var page = this.props.page;


      if (!page) {
        throw new Error('Attempted to load page text content, but no page was specified.');
      }

      this.loadTextItems();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var page = this.props.page;


      if (prevProps.page && page !== prevProps.page) {
        this.loadTextItems();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
    }
  }, {
    key: 'renderTextItems',
    value: function renderTextItems() {
      var textItems = this.state.textItems;


      if (!textItems) {
        return null;
      }

      return textItems.map(function (textItem, itemIndex) {
        return _react2.default.createElement(_TextLayerItem2.default
        // eslint-disable-next-line react/no-array-index-key
        , (0, _extends3.default)({ key: itemIndex,
          itemIndex: itemIndex
        }, textItem));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var viewport = this.unrotatedViewport,
          rotate = this.rotate;


      return _react2.default.createElement(
        'div',
        {
          className: 'react-pdf__Page__textContent',
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: viewport.width + 'px',
            height: viewport.height + 'px',
            color: 'transparent',
            transform: 'translate(-50%, -50%) rotate(' + rotate + 'deg)',
            pointerEvents: 'none'
          }
        },
        this.renderTextItems()
      );
    }
  }, {
    key: 'unrotatedViewport',
    get: function get() {
      var _props = this.props,
          page = _props.page,
          scale = _props.scale;


      return page.getViewport(scale);
    }

    /**
     * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
     * text content.
     */

  }, {
    key: 'rotate',
    get: function get() {
      var _props2 = this.props,
          page = _props2.page,
          rotate = _props2.rotate;

      return rotate - page.rotate;
    }
  }]);
  return TextLayerInternal;
}(_react.PureComponent);

TextLayerInternal.propTypes = {
  onGetTextError: _propTypes2.default.func,
  onGetTextSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage.isRequired,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};

var TextLayer = function TextLayer(props) {
  return _react2.default.createElement(
    _PageContext2.default.Consumer,
    null,
    function (context) {
      return _react2.default.createElement(TextLayerInternal, (0, _extends3.default)({}, context, props));
    }
  );
};

exports.default = TextLayer;