// Load modules.
var passport = require('passport-strategy')
  , util = require('util');


function StateStrategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  
  passport.Strategy.call(this);
  this.name = 'state';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

// Inherit from `passport.Strategy`.
util.inherits(StateStrategy, passport.Strategy);


StateStrategy.prototype.authenticate = function(req, options) {
  options = options || {};
  
  if (!req.state) { return this.fail(); }
  
  var self = this;
  
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    
    self.success(user, info);
  }

  try {
    var arity = this._verify.length;
    if (this._passReqToCallback) {
      if (arity == 4) {
        this._verify(req, req.state.user, req.state, verified);
      } else { // arity == 3
        this._verify(req, req.state.user, verified);
      }
    } else {
      if (arity == 3) {
        this._verify(req.state.user, req.state, verified);
      } else { // arity == 2
        this._verify(req.state.user, verified);
      }
    }
  } catch (ex) {
    return this.error(ex);
  }
};


// Expose constructor.
module.exports = StateStrategy;
