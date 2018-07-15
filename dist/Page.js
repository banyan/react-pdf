'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageInternal = undefined;

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

var _makeEventProps = require('make-event-props');

var _makeEventProps2 = _interopRequireDefault(_makeEventProps);

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _DocumentContext = require('./DocumentContext');

var _DocumentContext2 = _interopRequireDefault(_DocumentContext);

var _PageContext = require('./PageContext');

var _PageContext2 = _interopRequireDefault(_PageContext);

var _PageCanvas = require('./Page/PageCanvas');

var _PageCanvas2 = _interopRequireDefault(_PageCanvas);

var _PageSVG = require('./Page/PageSVG');

var _PageSVG2 = _interopRequireDefault(_PageSVG);

var _TextLayer = require('./Page/TextLayer');

var _TextLayer2 = _interopRequireDefault(_TextLayer);

var _AnnotationLayer = require('./Page/AnnotationLayer');

var _AnnotationLayer2 = _interopRequireDefault(_AnnotationLayer);

var _utils = require('./shared/utils');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageInternal = exports.PageInternal = function (_PureComponent) {
  (0, _inherits3.default)(PageInternal, _PureComponent);

  function PageInternal() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PageInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PageInternal.__proto__ || (0, _getPrototypeOf2.default)(PageInternal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      page: null
    }, _this.onLoadSuccess = function () {
      var _this$props = _this.props,
          onLoadSuccess = _this$props.onLoadSuccess,
          registerPage = _this$props.registerPage;
      var page = _this.state.page;


      (0, _utils.callIfDefined)(onLoadSuccess, (0, _utils.makePageCallback)(page, _this.scale));

      (0, _utils.callIfDefined)(registerPage, _this.pageIndex, _this.ref);
    }, _this.onLoadError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onLoadError = _this.props.onLoadError;


      (0, _utils.callIfDefined)(onLoadError, error);
    }, _this.loadPage = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var pdf, pageNumber, page, cancellable;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pdf = _this.props.pdf;
              pageNumber = _this.getPageNumber();

              if (pageNumber) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return');

            case 4:

              _this.setState(function (prevState) {
                if (!prevState.page) {
                  return null;
                }
                return { page: null };
              });

              page = null;
              _context.prev = 6;
              cancellable = (0, _utils.makeCancellable)(pdf.getPage(pageNumber));

              _this.runningTask = cancellable;
              _context.next = 11;
              return cancellable.promise;

            case 11:
              page = _context.sent;

              _this.setState({ page: page }, _this.onLoadSuccess);
              _context.next = 19;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](6);

              _this.setState({ page: false });
              _this.onLoadError(_context.t0);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[6, 15]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PageInternal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pdf = this.props.pdf;


      if (!pdf) {
        throw new Error('Attempted to load a page, but no document was specified.');
      }

      this.loadPage();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var pdf = this.props.pdf;


      if (prevProps.pdf && pdf !== prevProps.pdf || this.getPageNumber() !== this.getPageNumber(prevProps)) {
        var unregisterPage = this.props.unregisterPage;


        (0, _utils.callIfDefined)(unregisterPage, this.getPageIndex(prevProps));

        this.loadPage();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var unregisterPage = this.props.unregisterPage;


      (0, _utils.callIfDefined)(unregisterPage, this.pageIndex);

      (0, _utils.cancelRunningTask)(this.runningTask);
    }
  }, {
    key: 'getPageIndex',
    value: function getPageIndex() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if ((0, _utils.isProvided)(props.pageNumber)) {
        return props.pageNumber - 1;
      }

      if ((0, _utils.isProvided)(props.pageIndex)) {
        return props.pageIndex;
      }

      return null;
    }
  }, {
    key: 'getPageNumber',
    value: function getPageNumber() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if ((0, _utils.isProvided)(props.pageNumber)) {
        return props.pageNumber;
      }

      if ((0, _utils.isProvided)(props.pageIndex)) {
        return props.pageIndex + 1;
      }

      return null;
    }
  }, {
    key: 'renderTextLayer',
    value: function renderTextLayer() {
      var renderTextLayer = this.props.renderTextLayer;


      if (!renderTextLayer) {
        return null;
      }

      return _react2.default.createElement(_TextLayer2.default, { key: this.pageKey + '_text' });
    }
  }, {
    key: 'renderAnnotations',
    value: function renderAnnotations() {
      var renderAnnotations = this.props.renderAnnotations;


      if (!renderAnnotations) {
        return null;
      }

      return _react2.default.createElement(_AnnotationLayer2.default, { key: this.pageKey + '_annotations' });
    }
  }, {
    key: 'renderSVG',
    value: function renderSVG() {
      return [_react2.default.createElement(_PageSVG2.default, { key: this.pageKeyNoScale + '_svg' }),
      /**
       * As of now, PDF.js 2.0.474 returns warnings on unimplemented annotations.
       * Therefore, as a fallback, we render "traditional" AnnotationLayer component.
       */
      this.renderAnnotations()];
    }
  }, {
    key: 'renderCanvas',
    value: function renderCanvas() {
      return [_react2.default.createElement(_PageCanvas2.default, { key: this.pageKey + '_canvas' }), this.renderTextLayer(), this.renderAnnotations()];
    }
  }, {
    key: 'renderNoData',
    value: function renderNoData() {
      var noData = this.props.noData;


      return _react2.default.createElement(
        'div',
        { className: 'react-pdf__message react-pdf__message--no-data' },
        noData
      );
    }
  }, {
    key: 'renderError',
    value: function renderError() {
      var error = this.props.error;


      return _react2.default.createElement(
        'div',
        { className: 'react-pdf__message react-pdf__message--error' },
        error
      );
    }
  }, {
    key: 'renderLoader',
    value: function renderLoader() {
      var loading = this.props.loading;


      return _react2.default.createElement(
        'div',
        { className: 'react-pdf__message react-pdf__message--loading' },
        loading
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _props = this.props,
          children = _props.children,
          renderMode = _props.renderMode;


      return _react2.default.createElement(
        _PageContext2.default.Provider,
        { value: this.childContext },
        renderMode === 'svg' ? this.renderSVG() : this.renderCanvas(),
        children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var pageNumber = this.pageNumber;
      var _props2 = this.props,
          className = _props2.className,
          pdf = _props2.pdf;
      var page = this.state.page;


      var content = void 0;
      if (!pageNumber) {
        content = this.renderNoData();
      } else if (pdf === null || page === null) {
        content = this.renderLoader();
      } else if (pdf === false || page === false) {
        content = this.renderError();
      } else {
        content = this.renderChildren();
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          className: (0, _mergeClassNames2.default)('react-pdf__Page', className),
          ref: function ref(_ref3) {
            var inputRef = _this3.props.inputRef;

            if (inputRef) {
              inputRef(_ref3);
            }

            _this3.ref = _ref3;
          },
          style: { position: 'relative' },
          'data-page-number': pageNumber
        }, this.eventProps),
        content
      );
    }
  }, {
    key: 'childContext',
    get: function get() {
      var page = this.state.page;


      if (!page) {
        return {};
      }

      var _props3 = this.props,
          customTextRenderer = _props3.customTextRenderer,
          onGetAnnotationsError = _props3.onGetAnnotationsError,
          onGetAnnotationsSuccess = _props3.onGetAnnotationsSuccess,
          onGetTextError = _props3.onGetTextError,
          onGetTextSuccess = _props3.onGetTextSuccess,
          onRenderAnnotationsError = _props3.onRenderAnnotationsError,
          onRenderAnnotationsSuccess = _props3.onRenderAnnotationsSuccess,
          onRenderError = _props3.onRenderError,
          onRenderSuccess = _props3.onRenderSuccess,
          renderInteractiveForms = _props3.renderInteractiveForms;


      return {
        customTextRenderer: customTextRenderer,
        onGetAnnotationsError: onGetAnnotationsError,
        onGetAnnotationsSuccess: onGetAnnotationsSuccess,
        onGetTextError: onGetTextError,
        onGetTextSuccess: onGetTextSuccess,
        onRenderAnnotationsError: onRenderAnnotationsError,
        onRenderAnnotationsSuccess: onRenderAnnotationsSuccess,
        onRenderError: onRenderError,
        onRenderSuccess: onRenderSuccess,
        page: page,
        renderInteractiveForms: renderInteractiveForms,
        rotate: this.rotate,
        scale: this.scale
      };
    }

    /**
     * Called when a page is loaded successfully
     */


    /**
     * Called when a page failed to load
     */

  }, {
    key: 'pageIndex',
    get: function get() {
      return this.getPageIndex();
    }
  }, {
    key: 'pageNumber',
    get: function get() {
      return this.getPageNumber();
    }
  }, {
    key: 'rotate',
    get: function get() {
      var rotate = this.props.rotate;


      if ((0, _utils.isProvided)(rotate)) {
        return rotate;
      }

      var page = this.state.page;


      if (!page) {
        return null;
      }

      return page.rotate;
    }
  }, {
    key: 'scale',
    get: function get() {
      var page = this.state.page;


      if (!page) {
        return null;
      }

      var _props4 = this.props,
          scale = _props4.scale,
          width = _props4.width,
          height = _props4.height;
      var rotate = this.rotate;

      // Be default, we'll render page at 100% * scale width.

      var pageScale = 1;

      // If width/height is defined, calculate the scale of the page so it could be of desired width.
      if (width || height) {
        var viewport = page.getViewport(scale, rotate);
        pageScale = width ? width / viewport.width : height / viewport.height;
      }

      return scale * pageScale;
    }
  }, {
    key: 'eventProps',
    get: function get() {
      var _this4 = this;

      return (0, _makeEventProps2.default)(this.props, function () {
        var page = _this4.state.page;

        if (!page) {
          return page;
        }

        return (0, _utils.makePageCallback)(page, _this4.scale);
      });
    }
  }, {
    key: 'pageKey',
    get: function get() {
      var page = this.state.page;


      return page.pageIndex + '@' + this.scale + '/' + this.rotate;
    }
  }, {
    key: 'pageKeyNoScale',
    get: function get() {
      var page = this.state.page;


      return page.pageIndex + '/' + this.rotate;
    }
  }]);
  return PageInternal;
}(_react.PureComponent);

PageInternal.defaultProps = {
  error: 'Failed to load the page.',
  loading: 'Loading page…',
  noData: 'No page specified.',
  renderAnnotations: true,
  renderInteractiveForms: false,
  renderMode: 'canvas',
  renderTextLayer: true,
  scale: 1.0
};

PageInternal.propTypes = (0, _extends3.default)({
  children: _propTypes2.default.node,
  className: _propTypes3.isClassName,
  customTextRenderer: _propTypes2.default.func,
  error: _propTypes2.default.node,
  height: _propTypes2.default.number,
  inputRef: _propTypes2.default.func,
  loading: _propTypes2.default.node,
  noData: _propTypes2.default.node,
  onGetTextError: _propTypes2.default.func,
  onGetTextSuccess: _propTypes2.default.func,
  onLoadError: _propTypes2.default.func,
  onLoadSuccess: _propTypes2.default.func,
  onRenderError: _propTypes2.default.func,
  onRenderSuccess: _propTypes2.default.func,
  pageIndex: _propTypes3.isPageIndex,
  pageNumber: _propTypes3.isPageNumber,
  pdf: _propTypes3.isPdf,
  registerPage: _propTypes2.default.func,
  renderAnnotations: _propTypes2.default.bool,
  renderInteractiveForms: _propTypes2.default.bool,
  renderMode: _propTypes3.isRenderMode,
  renderTextLayer: _propTypes2.default.bool,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number,
  unregisterPage: _propTypes2.default.func,
  width: _propTypes2.default.number
}, (0, _propTypes3.eventsProps)());

var Page = function Page(props) {
  return _react2.default.createElement(
    _DocumentContext2.default.Consumer,
    null,
    function (context) {
      return _react2.default.createElement(PageInternal, (0, _extends3.default)({}, context, props));
    }
  );
};

exports.default = Page;