'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = exports.Outline = exports.Document = exports.pdfjs = undefined;

var _pdfjsDist = require('pdfjs-dist');

var _pdfjsDist2 = _interopRequireDefault(_pdfjsDist);

var _Document = require('./Document');

var _Document2 = _interopRequireDefault(_Document);

var _Outline = require('./Outline');

var _Outline2 = _interopRequireDefault(_Outline);

var _Page = require('./Page');

var _Page2 = _interopRequireDefault(_Page);

var _utils = require('./shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_utils.isLocalFileSystem) {
  (0, _utils.warnOnDev)('You are running React-PDF from your local file system. PDF.js Worker may fail to load due to browser\'s security policies. If you\'re on Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.');
}

_pdfjsDist2.default.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

exports.pdfjs = _pdfjsDist2.default;
exports.Document = _Document2.default;
exports.Outline = _Outline2.default;
exports.Page = _Page2.default;