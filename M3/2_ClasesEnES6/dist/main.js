"use strict";

var _cliente = _interopRequireDefault(require("./cliente.js"));

var _impuesto = _interopRequireDefault(require("./impuesto.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var impuesto1 = new _impuesto["default"](1000, 100);
var cliente1 = new _cliente["default"]("Ricardo", impuesto1);
console.log(cliente1.calcularImpuesto());