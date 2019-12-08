var __importdefault = (this && this.__importdefault) || function (mod) {
    return (mod && mod.__esmodule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

var _blocks = __importdefault(require('./lib/components')).default;
var _blockNames = Object.keys(_blocks);

for (var i = 0; i < _blockNames.length; i++) {
  var _name = _blockNames[i];
  exports[_name] = _blocks[_name];
}
