'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationLayerInternal = undefined;

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

var _pdfjsDist = require('pdfjs-dist');

var _pdfjsDist2 = _interopRequireDefault(_pdfjsDist);

var _DocumentContext = require('../DocumentContext');

var _DocumentContext2 = _interopRequireDefault(_DocumentContext);

var _PageContext = require('../PageContext');

var _PageContext2 = _interopRequireDefault(_PageContext);

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnnotationLayerInternal = exports.AnnotationLayerInternal = function (_PureComponent) {
  (0, _inherits3.default)(AnnotationLayerInternal, _PureComponent);

  function AnnotationLayerInternal() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AnnotationLayerInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AnnotationLayerInternal.__proto__ || (0, _getPrototypeOf2.default)(AnnotationLayerInternal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      annotations: null
    }, _this.loadAnnotations = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var page, cancellable, annotations;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              page = _this.props.page;
              _context.prev = 1;
              cancellable = (0, _utils.makeCancellable)(page.getAnnotations());

              _this.runningTask = cancellable;
              _context.next = 6;
              return cancellable.promise;

            case 6:
              annotations = _context.sent;

              _this.setState({ annotations: annotations }, _this.onLoadSuccess);
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](1);

              _this.setState({ annotations: false });
              _this.onLoadError(_context.t0);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 10]]);
    })), _this.onLoadSuccess = function () {
      var onGetAnnotationsSuccess = _this.props.onGetAnnotationsSuccess;
      var annotations = _this.state.annotations;


      (0, _utils.callIfDefined)(onGetAnnotationsSuccess, annotations);
    }, _this.onLoadError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onGetAnnotationsError = _this.props.onGetAnnotationsError;


      (0, _utils.callIfDefined)(onGetAnnotationsError, error);
    }, _this.onRenderSuccess = function () {
      var onRenderAnnotationsSuccess = _this.props.onRenderAnnotationsSuccess;


      (0, _utils.callIfDefined)(onRenderAnnotationsSuccess);
    }, _this.onRenderError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onRenderAnnotationsError = _this.props.onRenderAnnotationsError;


      (0, _utils.callIfDefined)(onRenderAnnotationsError, error);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AnnotationLayerInternal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var page = this.props.page;


      if (!page) {
        throw new Error('Attempted to load page annotations, but no page was specified.');
      }

      this.loadAnnotations();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          page = _props.page,
          renderInteractiveForms = _props.renderInteractiveForms;


      if (prevProps.page && page !== prevProps.page || renderInteractiveForms !== prevProps.renderInteractiveForms) {
        this.loadAnnotations();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
    }

    /**
     * Called when a annotations fails to render.
     */

  }, {
    key: 'renderAnnotations',
    value: function renderAnnotations() {
      var annotations = this.state.annotations;


      if (!annotations) {
        return;
      }

      var _props2 = this.props,
          linkService = _props2.linkService,
          page = _props2.page,
          renderInteractiveForms = _props2.renderInteractiveForms;

      var viewport = this.viewport.clone({ dontFlip: true });

      var parameters = {
        annotations: annotations,
        div: this.annotationLayer,
        linkService: linkService,
        page: page,
        renderInteractiveForms: renderInteractiveForms,
        viewport: viewport
      };

      this.annotationLayer.innerHTML = '';

      try {
        _pdfjsDist2.default.AnnotationLayer.render(parameters);
        this.onRenderSuccess();
      } catch (error) {
        this.onRenderError(error);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'react-pdf__Page__annotations annotationLayer',
          ref: function ref(_ref3) {
            _this3.annotationLayer = _ref3;
          }
        },
        this.renderAnnotations()
      );
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
  return AnnotationLayerInternal;
}(_react.PureComponent);

AnnotationLayerInternal.propTypes = {
  linkService: _propTypes3.isLinkService.isRequired,
  onGetAnnotationsError: _propTypes2.default.func,
  onGetAnnotationsSuccess: _propTypes2.default.func,
  onRenderAnnotationsError: _propTypes2.default.func,
  onRenderAnnotationsSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage,
  renderInteractiveForms: _propTypes2.default.bool,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};

var AnnotationLayer = function AnnotationLayer(props) {
  return _react2.default.createElement(
    _DocumentContext2.default.Consumer,
    null,
    function (documentContext) {
      return _react2.default.createElement(
        _PageContext2.default.Consumer,
        null,
        function (pageContext) {
          return _react2.default.createElement(AnnotationLayerInternal, (0, _extends3.default)({}, documentContext, pageContext, props));
        }
      );
    }
  );
};

exports.default = AnnotationLayer;