var TweenMax = window.TweenMax,
    Back = window.Back;

function fullPath(globe, delay, callback) {

    var p = globe.pathView[globe.pathIndex];
    
    TweenMax.to(globe.camera.position, delay, {
        x: p.x,
        y: p.y,
        z: p.z,
        onComplete: function() {
            globe.pathIndex++;
            if (globe.pathIndex < globe.pathView.length) {
                fullPath(globe, delay, callback);
            }
            else {
                if (callback) {
                    TweenMax.ticker.removeEventListener("tick", globe.render);
                    callback();
                }
            }
        }
    });
    
    TweenMax.to(globe.boat.position, delay, globe.pathBoat[globe.pathIndex]);
    
}

function nextStep(globe, delay, callback) {

    var p = globe.pathView[globe.pathIndex];
    
    TweenMax.to(globe.camera.position, delay, {
        x: p.x,
        y: p.y,
        z: p.z,
        onComplete: function() {
            
            if (globe.pathIndex === globe.steps[globe.stepIndex].index) {
                globe.pathIndex = globe.steps[globe.stepIndex].index;
                globe.stepIndex = (globe.stepIndex + 1) % globe.steps.length;
                if (callback) {
                    TweenMax.ticker.removeEventListener("tick", globe.render);
                    callback();
                }
                return;
            }
            
            if (globe.pathIndex >= globe.pathView.length - 1) {
                globe.pathIndex = 1;
                globe.stepIndex = 1;
                TweenMax.ticker.removeEventListener("tick", globe.render);
                callback();
                return;
            }
            
            globe.pathIndex++;
            
            nextStep(globe, delay, callback);
            
        }
    });
  //  TweenMax.to(globe.boat.position, delay, globe.pathBoat[globe.pathIndex]);
    
}

function previousStep(globe, delay, callback) {

    var p = globe.pathView[globe.pathIndex];
    TweenMax.to(globe.camera.position, delay, {
        x: p.x,
        y: p.y,
        z: p.z,
        onComplete: function() {
            
            if (globe.stepIndex - 2 === -1) {
                globe.stepIndex = globe.steps.length + 1;
                globe.pathIndex = globe.pathView.length - 1;
            }
            
            if (globe.pathIndex === globe.steps[globe.stepIndex - 2].index) {
                globe.pathIndex = globe.steps[globe.stepIndex - 2].index;
                globe.stepIndex = (globe.stepIndex - 1);
                TweenMax.ticker.removeEventListener("tick", globe.render);
                callback();
                return;
            }
            
            if (globe.pathIndex === 0) {
                globe.pathIndex = 1;
                globe.stepIndex = 1;
                TweenMax.ticker.removeEventListener("tick", globe.render);
                callback();
                return;
            }
            
            globe.pathIndex--;
            
            previousStep(globe, delay, callback);
            
        }
    });     
    
}

function goTo(globe, where, isFar) {
    
    var step,
        index;
        
    if (globe.steps[where]) {
        step = globe.steps[where];  
        index = where;
    }
    else {
        for (var i in globe.steps) {
            if (globe.steps[i].id === where) {
                step = globe.steps[i];
                break;
            }
        }
        index = i * 1;
    }

    var p;
    if (!isFar) {
        p = globe.pathView[step.index];
    }
    else {
        p = globe.firstPoint;
    }
    
    globe.stepIndex = index + 1;
    globe.pathIndex = step.index + 1;
    
    globe.camera.position.x = p.x;
    globe.camera.position.y = p.y;
    globe.camera.position.z = p.z;
    
}

function zoom(globe, delay, callback) {

    TweenMax.to(globe.camera.position, delay, {
        x: globe.pathView[1].x,
        y: globe.pathView[1].y,
        z: globe.pathView[1].z,
        onComplete: function() {
            TweenMax.ticker.removeEventListener("tick", globe.render);
            callback();
        },
        ease: Back.easeOut.config(1.7)
    });
    
}

module.exports = exports = function(next) {
    
    var that = this;
    
    this.pathIndex = 1;
    this.stepIndex = 1;
    this.commands = {};
    
    this.commands.fullPath = function(delay, callback) {
        TweenMax.ticker.addEventListener('tick', that.render);
        that.pathIndex = 0;
        this.stepIndex = 0;
        if (!callback) {
            callback = function() {};
        }
        fullPath(that, delay, callback);
    };
    
    this.commands.nextStep = function(delay, callback) {
        TweenMax.ticker.addEventListener('tick', that.render);
        if (!callback) {
            callback = function() {};
        }
        nextStep(that, delay, callback);
    };
    
    this.commands.previousStep = function(delay, callback) {
        TweenMax.ticker.addEventListener('tick', that.render);
        if (!callback) {
            callback = function() {};
        }
        previousStep(that, delay, callback);
    };
    
    this.commands.goTo = function(where, isFar) {
        goTo(that, where, isFar);
        that.render();
    };
    
    this.commands.zoom = function(delay, callback) {
        TweenMax.ticker.addEventListener('tick', that.render);
        zoom(that, delay, callback);
    };
    
    next();
    
};