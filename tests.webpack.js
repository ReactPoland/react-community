import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.chai = chai
global.expect = chai.expect
// global.should = chai.should()

var context = require.context('./src', true, /-test\.js$/)
context.keys().forEach(context)