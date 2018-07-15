'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageCanvasInternal = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageCanvasInternal = exports.PageCanvasInternal = function (_PureComponent) {
  (0, _inherits3.default)(PageCanvasInternal, _PureComponent);

  function PageCanvasInternal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PageCanvasInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PageCanvasInternal.__proto__ || (0, _getPrototypeOf2.default)(PageCanvasInternal)).call.apply(_ref, [this].concat(args))), _this), _this.onRenderSuccess = function () {
      _this.renderer = null;

      var _this$props = _this.props,
          onRenderSuccess = _this$props.onRenderSuccess,
          page = _this$props.page,
          scale = _this$props.scale;


      (0, _utils.callIfDefined)(onRenderSuccess, (0, _utils.makePageCallback)(page, scale));
    }, _this.onRenderError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onRenderError = _this.props.onRenderError;


      (0, _utils.callIfDefined)(onRenderError, error);
    }, _this.drawPageOnCanvas = function () {
      var _this2 = _this,
          canvas = _this2.canvasLayer;


      if (!canvas) {
        return null;
      }

      var _this3 = _this,
          renderViewport = _this3.renderViewport,
          viewport = _this3.viewport;
      var _this$props2 = _this.props,
          page = _this$props2.page,
          renderInteractiveForms = _this$props2.renderInteractiveForms;


      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;

      canvas.style.width = Math.floor(viewport.width) + 'px';
      canvas.style.height = Math.floor(viewport.height) + 'px';

      var renderContext = {
        get canvasContext() {
          return canvas.getContext('2d');
        },
        viewport: renderViewport,
        renderInteractiveForms: renderInteractiveForms
      };

      // If another render is in progress, let's cancel it
      _this.cancelRenderingTask();

      _this.renderer = page.render(renderContext);

      return _this.renderer.then(_this.onRenderSuccess).catch(_this.onRenderError);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PageCanvasInternal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawPageOnCanvas();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          page = _props.page,
          renderInteractiveForms = _props.renderInteractiveForms;

      if (renderInteractiveForms !== prevProps.renderInteractiveForms) {
        // Ensures the canvas will be re-rendered from scratch. Otherwise all form data will stay.
        page.cleanup();
        this.drawPageOnCanvas();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cancelRenderingTask();
    }
  }, {
    key: 'cancelRenderingTask',
    value: function cancelRenderingTask() {
      /* eslint-disable no-underscore-dangle */
      if (this.renderer && this.renderer._internalRenderTask.running) {
        this.renderer._internalRenderTask.cancel();
      }
      /* eslint-enable no-underscore-dangle */
    }

    /**
     * Called when a page is rendered successfully.
     */


    /**
     * Called when a page fails to render.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement('canvas', {
        className: 'react-pdf__Page__canvas',
        style: {
          display: 'block',
          userSelect: 'none'
        },
        ref: function ref(_ref2) {
          _this4.canvasLayer = _ref2;
        }
      });
    }
  }, {
    key: 'renderViewport',
    get: function get() {
      var _props2 = this.props,
          page = _props2.page,
          rotate = _props2.rotate,
          scale = _props2.scale;


      var pixelRatio = (0, _utils.getPixelRatio)();

      return page.getViewport(scale * pixelRatio, rotate);
    }
  }, {
    key: 'viewport',
    get: function get() {
      var _props3 = this.props,
          page = _props3.page,
          rotate = _props3.rotate,
          scale = _props3.scale;


      return page.getViewport(scale, rotate);
    }
  }]);
  return PageCanvasInternal;
}(_react.PureComponent);

PageCanvasInternal.propTypes = {
  onRenderError: _propTypes2.default.func,
  onRenderSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage.isRequired,
  renderInteractiveForms: _propTypes2.default.bool,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};

var PageCanvas = function PageCanvas(props) {
  return _react2.default.createElement(
    _PageContext2.default.Consumer,
    null,
    function (context) {
      return _react2.default.createElement(PageCanvasInternal, (0, _extends3.default)({}, context, props));
    }
  );
};

exports.default = PageCanvas;