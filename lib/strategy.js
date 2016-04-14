// Load modules.
var passport = require('passport-strategy');


function StateStrategy(options, verify) {
  passport.Strategy.call(this);
}

// Inherit from `passport.Strategy`.
util.inherits(StateStrategy, passport.Strategy);


StateStrategy.prototype.authenticate = function(req, options) {
  options = options || {};
  
};


// Expose constructor.
module.exports = StateStrategy;
