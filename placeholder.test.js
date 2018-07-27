var placeholder = require('./index.js');
var expect = require('chai').expect;

describe('验证placeholder接口对象', function() {
  	it('init应该是个函数', function() {
    	expect(placeholder.init).to.be.a("function");
  	});
});