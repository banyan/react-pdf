'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _makeEventProps = require('make-event-props');

var _makeEventProps2 = _interopRequireDefault(_makeEventProps);

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _pdfjsDist = require('pdfjs-dist');

var _pdfjsDist2 = _interopRequireDefault(_pdfjsDist);

var _DocumentContext = require('./DocumentContext');

var _DocumentContext2 = _interopRequireDefault(_DocumentContext);

var _LinkService = require('./LinkService');

var _LinkService2 = _interopRequireDefault(_LinkService);

var _utils = require('./shared/utils');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadFromFile = function loadFromFile(file) {
  return new _promise2.default(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function () {
      return resolve(new Uint8Array(reader.result));
    };
    reader.onerror = function (event) {
      switch (event.target.error.code) {
        case event.target.error.NOT_FOUND_ERR:
          return reject(new Error('Error while reading a file: File not found.'));
        case event.target.error.NOT_READABLE_ERR:
          return reject(new Error('Error while reading a file: File not readable.'));
        case event.target.error.SECURITY_ERR:
          return reject(new Error('Error while reading a file: Security error.'));
        case event.target.error.ABORT_ERR:
          return reject(new Error('Error while reading a file: Aborted.'));
        default:
          return reject(new Error('Error while reading a file.'));
      }
    };
    reader.readAsArrayBuffer(file);

    return null;
  });
}; /**
    * Loads a PDF document. Passes it to all children.
    */

var Document = function (_PureComponent) {
  (0, _inherits3.default)(Document, _PureComponent);

  function Document() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Document);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      pdf: null
    }, _this.viewer = {
      scrollPageIntoView: function scrollPageIntoView(_ref2) {
        var pageNumber = _ref2.pageNumber;

        // Handling jumping to internal links target
        var onItemClick = _this.props.onItemClick;

        // First, check if custom handling of onItemClick was provided

        if (onItemClick) {
          onItemClick({ pageNumber: pageNumber });
          return;
        }

        // If not, try to look for target page within the <Document>.
        var page = _this.pages[pageNumber - 1];

        if (page) {
          // Scroll to the page automatically
          page.scrollIntoView();
          return;
        }

        (0, _utils.warnOnDev)('Warning: An internal link leading to page ' + pageNumber + ' was clicked, but neither <Document> was provided with onItemClick nor it was able to find the page within itself. Either provide onItemClick to <Document> and handle navigating by yourself or ensure that all pages are rendered within <Document>.');
      }
    }, _this.linkService = new _LinkService2.default(), _this.loadDocument = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var source, _this$props, options, onLoadProgress, onPassword, loadingTask, cancellable, pdf;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = null;
              _context.prev = 1;
              _context.next = 4;
              return _this.findDocumentSource();

            case 4:
              source = _context.sent;

              _this.onSourceSuccess();
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              _this.onSourceError(_context.t0);

            case 11:
              if (source) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return');

            case 13:

              _this.setState(function (prevState) {
                if (!prevState.pdf) {
                  return null;
                }
                return { pdf: null };
              });

              _this$props = _this.props, options = _this$props.options, onLoadProgress = _this$props.onLoadProgress, onPassword = _this$props.onPassword;
              _context.prev = 15;
              loadingTask = _pdfjsDist2.default.getDocument((0, _extends3.default)({}, source, options));

              loadingTask.onPassword = onPassword;
              if (onLoadProgress) {
                loadingTask.onProgress = onLoadProgress;
              }
              cancellable = (0, _utils.makeCancellable)(loadingTask);

              _this.runningTask = cancellable;
              _context.next = 23;
              return cancellable.promise;

            case 23:
              pdf = _context.sent;

              _this.setState(function (prevState) {
                if (prevState.pdf && prevState.pdf.fingerprint === pdf.fingerprint) {
                  return null;
                }

                return { pdf: pdf };
              }, _this.onLoadSuccess);
              _context.next = 31;
              break;

            case 27:
              _context.prev = 27;
              _context.t1 = _context['catch'](15);

              _this.setState({ pdf: false });
              _this.onLoadError(_context.t1);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 8], [15, 27]]);
    })), _this.onSourceSuccess = function () {
      var onSourceSuccess = _this.props.onSourceSuccess;

      (0, _utils.callIfDefined)(onSourceSuccess);
    }, _this.onSourceError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onSourceError = _this.props.onSourceError;


      (0, _utils.callIfDefined)(onSourceError, error);
    }, _this.onLoadSuccess = function () {
      var onLoadSuccess = _this.props.onLoadSuccess;
      var pdf = _this.state.pdf;


      (0, _utils.callIfDefined)(onLoadSuccess, pdf);

      _this.pages = new Array(pdf.numPages);
      _this.linkService.setDocument(pdf);
    }, _this.onLoadError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onLoadError = _this.props.onLoadError;


      (0, _utils.callIfDefined)(onLoadError, error);
    }, _this.findDocumentSource = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var file, fileUint8Array, url, otherParams, _fileUint8Array;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              file = _this.props.file;

              if (file) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return', null);

            case 3:
              if (!(typeof file === 'string')) {
                _context2.next = 9;
                break;
              }

              if (!(0, _utils.isDataURI)(file)) {
                _context2.next = 7;
                break;
              }

              fileUint8Array = (0, _utils.dataURItoUint8Array)(file);
              return _context2.abrupt('return', { data: fileUint8Array });

            case 7:

              (0, _utils.displayCORSWarning)();
              return _context2.abrupt('return', { url: file });

            case 9:
              if (!(file instanceof _pdfjsDist.PDFDataRangeTransport)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt('return', { range: file });

            case 11:
              if (!(0, _utils.isArrayBuffer)(file)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('return', { data: file });

            case 13:
              if (!_utils.isBrowser) {
                _context2.next = 19;
                break;
              }

              if (!((0, _utils.isBlob)(file) || (0, _utils.isFile)(file))) {
                _context2.next = 19;
                break;
              }

              _context2.next = 17;
              return loadFromFile(file);

            case 17:
              _context2.t0 = _context2.sent;
              return _context2.abrupt('return', {
                data: _context2.t0
              });

            case 19:
              if (!((typeof file === 'undefined' ? 'undefined' : (0, _typeof3.default)(file)) !== 'object')) {
                _context2.next = 21;
                break;
              }

              throw new Error('Invalid parameter in file, need either Uint8Array, string or a parameter object');

            case 21:
              if (!(!file.url && !file.data && !file.range)) {
                _context2.next = 23;
                break;
              }

              throw new Error('Invalid parameter object: need either .data, .range or .url');

            case 23:
              if (!(typeof file.url === 'string')) {
                _context2.next = 29;
                break;
              }

              if (!(0, _utils.isDataURI)(file.url)) {
                _context2.next = 28;
                break;
              }

              url = file.url, otherParams = (0, _objectWithoutProperties3.default)(file, ['url']);
              _fileUint8Array = (0, _utils.dataURItoUint8Array)(url);
              return _context2.abrupt('return', (0, _extends3.default)({ data: _fileUint8Array }, otherParams));

            case 28:

              (0, _utils.displayCORSWarning)();

            case 29:
              return _context2.abrupt('return', file);

            case 30:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.registerPage = function (pageIndex, ref) {
      _this.pages[pageIndex] = ref;
    }, _this.unregisterPage = function (pageIndex) {
      delete _this.pages[pageIndex];
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Document, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadDocument();
      this.linkService.setViewer(this.viewer);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var file = this.props.file;

      if (file !== prevProps.file) {
        this.loadDocument();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
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
      var children = this.props.children;


      return _react2.default.createElement(
        _DocumentContext2.default.Provider,
        { value: this.childContext },
        children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          file = _props.file,
          inputRef = _props.inputRef;
      var pdf = this.state.pdf;


      var content = void 0;
      if (!file) {
        content = this.renderNoData();
      } else if (pdf === null) {
        content = this.renderLoader();
      } else if (pdf === false) {
        content = this.renderError();
      } else {
        content = this.renderChildren();
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          className: (0, _mergeClassNames2.default)('react-pdf__Document', className),
          ref: inputRef
        }, this.eventProps),
        content
      );
    }
  }, {
    key: 'childContext',
    get: function get() {
      var linkService = this.linkService,
          registerPage = this.registerPage,
          unregisterPage = this.unregisterPage;
      var _props2 = this.props,
          renderMode = _props2.renderMode,
          rotate = _props2.rotate;
      var pdf = this.state.pdf;


      return {
        linkService: linkService,
        pdf: pdf,
        registerPage: registerPage,
        renderMode: renderMode,
        rotate: rotate,
        unregisterPage: unregisterPage
      };
    }
  }, {
    key: 'eventProps',
    get: function get() {
      var _this3 = this;

      // eslint-disable-next-line react/destructuring-assignment
      return (0, _makeEventProps2.default)(this.props, function () {
        return _this3.state.pdf;
      });
    }

    /**
     * Called when a document source is resolved correctly
     */


    /**
     * Called when a document source failed to be resolved correctly
     */


    /**
     * Called when a document is read successfully
     */


    /**
     * Called when a document failed to read successfully
     */


    /**
     * Finds a document source based on props.
     */

  }]);
  return Document;
}(_react.PureComponent);

exports.default = Document;


Document.defaultProps = {
  error: 'Failed to load PDF file.',
  loading: 'Loading PDF…',
  noData: 'No PDF file specified.',
  onPassword: function onPassword(callback, reason) {
    switch (reason) {
      case 1:
        {
          // Needs password
          // eslint-disable-next-line no-alert
          var password = prompt('Enter the password to open this PDF file.');
          return callback(password);
        }
      case 2:
        {
          // Invalid password
          // eslint-disable-next-line no-alert
          var _password = prompt('Invalid password. Please try again.');
          return callback(_password);
        }
      default:
        return null;
    }
  }
};

Document.propTypes = (0, _extends3.default)({
  children: _propTypes2.default.node,
  className: _propTypes3.isClassName,
  error: _propTypes2.default.node,
  file: _utils.isFile,
  inputRef: _propTypes2.default.func,
  loading: _propTypes2.default.node,
  noData: _propTypes2.default.node,
  onItemClick: _propTypes2.default.func,
  onLoadError: _propTypes2.default.func,
  onLoadProgress: _propTypes2.default.func,
  onLoadSuccess: _propTypes2.default.func,
  onPassword: _propTypes2.default.func,
  onSourceError: _propTypes2.default.func,
  onSourceSuccess: _propTypes2.default.func,
  rotate: _propTypes2.default.number
}, (0, _propTypes3.eventsProps)());