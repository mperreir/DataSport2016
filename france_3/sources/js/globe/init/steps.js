var steps = require("../factories/steps.js");

module.exports = exports = function(next) {
    
    this.steps = steps(this, this.assets.steps);
    
    next();
    
};