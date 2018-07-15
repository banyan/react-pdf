'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutlineItemInternal = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _DocumentContext = require('./DocumentContext');

var _DocumentContext2 = _interopRequireDefault(_DocumentContext);

var _OutlineContext = require('./OutlineContext');

var _OutlineContext2 = _interopRequireDefault(_OutlineContext);

var _Ref = require('./Ref');

var _Ref2 = _interopRequireDefault(_Ref);

var _utils = require('./shared/utils');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OutlineItemInternal = exports.OutlineItemInternal = function (_PureComponent) {
  (0, _inherits3.default)(OutlineItemInternal, _PureComponent);

  function OutlineItemInternal() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, OutlineItemInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OutlineItemInternal.__proto__ || (0, _getPrototypeOf2.default)(OutlineItemInternal)).call.apply(_ref, [this].concat(args))), _this), _this.getDestination = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _this$props, item, pdf;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, item = _this$props.item, pdf = _this$props.pdf;

              if ((0, _utils.isDefined)(_this.destination)) {
                _context.next = 9;
                break;
              }

              if (!(typeof item.dest === 'string')) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return pdf.getDestination(item.dest);

            case 5:
              _this.destination = _context.sent;
              _context.next = 9;
              break;

            case 8:
              _this.destination = item.dest;

            case 9:
              return _context.abrupt('return', _this.destination);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.getPageIndex = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var pdf, destination, _destination, ref;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              pdf = _this.props.pdf;

              if ((0, _utils.isDefined)(_this.pageIndex)) {
                _context2.next = 10;
                break;
              }

              _context2.next = 4;
              return _this.getDestination();

            case 4:
              destination = _context2.sent;

              if (!destination) {
                _context2.next = 10;
                break;
              }

              _destination = (0, _slicedToArray3.default)(destination, 1), ref = _destination[0];
              _context2.next = 9;
              return pdf.getPageIndex(new _Ref2.default(ref));

            case 9:
              _this.pageIndex = _context2.sent;

            case 10:
              return _context2.abrupt('return', _this.pageIndex);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.getPageNumber = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if ((0, _utils.isDefined)(_this.pageNumber)) {
                _context3.next = 5;
                break;
              }

              _context3.next = 3;
              return _this.getPageIndex();

            case 3:
              _context3.t0 = _context3.sent;
              _this.pageNumber = _context3.t0 + 1;

            case 5:
              return _context3.abrupt('return', _this.pageNumber);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.onClick = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(event) {
        var onClick, pageIndex, pageNumber;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                onClick = _this.props.onClick;


                event.preventDefault();

                _context4.next = 4;
                return _this.getPageIndex();

              case 4:
                pageIndex = _context4.sent;
                _context4.next = 7;
                return _this.getPageNumber();

              case 7:
                pageNumber = _context4.sent;


                (0, _utils.callIfDefined)(onClick, {
                  pageIndex: pageIndex,
                  pageNumber: pageNumber
                });

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(OutlineItemInternal, [{
    key: 'renderSubitems',
    value: function renderSubitems() {
      var _props = this.props,
          item = _props.item,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['item']);


      if (!item.items || !item.items.length) {
        return null;
      }

      var subitems = item.items;


      return _react2.default.createElement(
        'ul',
        null,
        subitems.map(function (subitem, subitemIndex) {
          return _react2.default.createElement(OutlineItemInternal, (0, _extends3.default)({
            key: typeof subitem.destination === 'string' ? subitem.destination : subitemIndex,
            item: subitem
          }, otherProps));
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var item = this.props.item;


      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          {
            href: '#',
            onClick: this.onClick
          },
          item.title
        ),
        this.renderSubitems()
      );
    }
  }]);
  return OutlineItemInternal;
}(_react.PureComponent);

var isDestination = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.any)]);

OutlineItemInternal.propTypes = {
  item: _propTypes2.default.shape({
    title: _propTypes2.default.string,
    destination: isDestination,
    items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      title: _propTypes2.default.string,
      destination: isDestination
    }))
  }).isRequired,
  onClick: _propTypes2.default.func,
  pdf: _propTypes3.isPdf.isRequired
};

var OutlineItem = function OutlineItem(props) {
  return _react2.default.createElement(
    _DocumentContext2.default.Consumer,
    null,
    function (documentContext) {
      return _react2.default.createElement(
        _OutlineContext2.default.Consumer,
        null,
        function (outlineContext) {
          return _react2.default.createElement(OutlineItemInternal, (0, _extends3.default)({}, documentContext, outlineContext, props));
        }
      );
    }
  );
};

exports.default = OutlineItem;