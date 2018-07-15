'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageSVGInternal = undefined;

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

var _pdfjsDist = require('pdfjs-dist');

var _pdfjsDist2 = _interopRequireDefault(_pdfjsDist);

var _PageContext = require('../PageContext');

var _PageContext2 = _interopRequireDefault(_PageContext);

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageSVGInternal = exports.PageSVGInternal = function (_PureComponent) {
  (0, _inherits3.default)(PageSVGInternal, _PureComponent);

  function PageSVGInternal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PageSVGInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PageSVGInternal.__proto__ || (0, _getPrototypeOf2.default)(PageSVGInternal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      svg: null
    }, _this.onRenderSuccess = function () {
      _this.renderer = null;

      var _this$props = _this.props,
          onRenderSuccess = _this$props.onRenderSuccess,
          page = _this$props.page,
          scale = _this$props.scale;


      (0, _utils.callIfDefined)(onRenderSuccess, (0, _utils.makePageCallback)(page, scale));
    }, _this.onRenderError = function (error) {
      if (error.name === 'RenderingCancelledException') {
        return;
      }

      var onRenderError = _this.props.onRenderError;


      (0, _utils.callIfDefined)(onRenderError, error);
    }, _this.renderSVG = function () {
      var page = _this.props.page;


      _this.renderer = page.getOperatorList();

      return _this.renderer.then(function (operatorList) {
        var svgGfx = new _pdfjsDist2.default.SVGGraphics(page.commonObjs, page.objs);
        _this.renderer = svgGfx.getSVG(operatorList, _this.viewport).then(function (svg) {
          svg.style.maxWidth = '100%';
          svg.style.height = 'auto';
          _this.setState({ svg: svg }, _this.onRenderSuccess);
        }).catch(_this.onRenderError);
      }).catch(_this.onRenderError);
    }, _this.drawPageOnContainer = function (element) {
      var svg = _this.state.svg;


      if (!element || !svg) {
        return;
      }

      var renderedPage = element.firstElementChild;
      if (renderedPage) {
        var _this$viewport = _this.viewport,
            width = _this$viewport.width,
            height = _this$viewport.height;

        renderedPage.setAttribute('width', width);
        renderedPage.setAttribute('height', height);
      } else {
        element.appendChild(svg);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PageSVGInternal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderSVG();
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
      var _this2 = this;

      return _react2.default.createElement('div', {
        className: 'react-pdf__Page__svg',
        style: {
          display: 'block',
          backgroundColor: 'white'
        }
        // Note: This cannot be shortened, as we need this function to be called with each render.
        , ref: function ref(_ref2) {
          return _this2.drawPageOnContainer(_ref2);
        }
      });
    }
  }, {
    key: 'viewport',
    get: function get() {
      var _props = this.props,
          page = _props.page,
          rotate = _props.rotate,
          scale = _props.scale;


      return page.getViewport(scale, rotate);
    }
  }]);
  return PageSVGInternal;
}(_react.PureComponent);

PageSVGInternal.propTypes = {
  onRenderError: _propTypes2.default.func,
  onRenderSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage.isRequired,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};

var PageSVG = function PageSVG(props) {
  return _react2.default.createElement(
    _PageContext2.default.Consumer,
    null,
    function (context) {
      return _react2.default.createElement(PageSVGInternal, (0, _extends3.default)({}, context, props));
    }
  );
};

exports.default = PageSVG;