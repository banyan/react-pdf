'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutlineInternal = undefined;

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

var _OutlineContext = require('./OutlineContext');

var _OutlineContext2 = _interopRequireDefault(_OutlineContext);

var _OutlineItem = require('./OutlineItem');

var _OutlineItem2 = _interopRequireDefault(_OutlineItem);

var _utils = require('./shared/utils');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OutlineInternal = exports.OutlineInternal = function (_PureComponent) {
  (0, _inherits3.default)(OutlineInternal, _PureComponent);

  function OutlineInternal() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, OutlineInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OutlineInternal.__proto__ || (0, _getPrototypeOf2.default)(OutlineInternal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      outline: null
    }, _this.loadOutline = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var pdf, outline, cancellable;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pdf = _this.props.pdf;


              _this.setState(function (prevState) {
                if (!prevState.outline) {
                  return null;
                }
                return { outline: null };
              });

              outline = null;
              _context.prev = 3;
              cancellable = (0, _utils.makeCancellable)(pdf.getOutline());

              _this.runningTask = cancellable;
              _context.next = 8;
              return cancellable.promise;

            case 8:
              outline = _context.sent;

              _this.setState({ outline: outline }, _this.onLoadSuccess);
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](3);

              _this.setState({ outline: false });
              _this.onLoadError(_context.t0);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[3, 12]]);
    })), _this.onLoadSuccess = function () {
      var onLoadSuccess = _this.props.onLoadSuccess;
      var outline = _this.state.outline;


      (0, _utils.callIfDefined)(onLoadSuccess, outline);
    }, _this.onLoadError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error);

      var onLoadError = _this.props.onLoadError;


      (0, _utils.callIfDefined)(onLoadError, error);
    }, _this.onItemClick = function (_ref3) {
      var pageIndex = _ref3.pageIndex,
          pageNumber = _ref3.pageNumber;
      var onItemClick = _this.props.onItemClick;


      (0, _utils.callIfDefined)(onItemClick, {
        pageIndex: pageIndex,
        pageNumber: pageNumber
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(OutlineInternal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pdf = this.props.pdf;


      if (!pdf) {
        throw new Error('Attempted to load an outline, but no document was specified.');
      }

      this.loadOutline();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var pdf = this.props.pdf;


      if (prevProps.pdf && pdf !== prevProps.pdf) {
        this.loadOutline();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
    }
  }, {
    key: 'renderOutline',
    value: function renderOutline() {
      var outline = this.state.outline;


      return _react2.default.createElement(
        'ul',
        null,
        outline.map(function (item, itemIndex) {
          return _react2.default.createElement(_OutlineItem2.default, {
            key: typeof item.destination === 'string' ? item.destination : itemIndex,
            item: item
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var pdf = this.props.pdf;
      var outline = this.state.outline;


      if (!pdf || !outline) {
        return null;
      }

      var _props = this.props,
          className = _props.className,
          inputRef = _props.inputRef;


      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          className: (0, _mergeClassNames2.default)('react-pdf__Outline', className),
          ref: inputRef
        }, this.eventProps),
        _react2.default.createElement(
          _OutlineContext2.default.Provider,
          { value: this.childContext },
          this.renderOutline()
        )
      );
    }
  }, {
    key: 'childContext',
    get: function get() {
      return {
        onClick: this.onItemClick
      };
    }
  }, {
    key: 'eventProps',
    get: function get() {
      var _this3 = this;

      // eslint-disable-next-line react/destructuring-assignment
      return (0, _makeEventProps2.default)(this.props, function () {
        return _this3.state.outline;
      });
    }

    /**
     * Called when an outline is read successfully
     */


    /**
     * Called when an outline failed to read successfully
     */

  }]);
  return OutlineInternal;
}(_react.PureComponent);

OutlineInternal.propTypes = (0, _extends3.default)({
  className: _propTypes3.isClassName,
  inputRef: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func,
  onLoadError: _propTypes2.default.func,
  onLoadSuccess: _propTypes2.default.func,
  pdf: _propTypes3.isPdf
}, (0, _propTypes3.eventsProps)());

var Outline = function Outline(props) {
  return _react2.default.createElement(
    _DocumentContext2.default.Consumer,
    null,
    function (context) {
      return _react2.default.createElement(OutlineInternal, (0, _extends3.default)({}, context, props));
    }
  );
};

exports.default = Outline;