/**
* @author Sean Taylor Hutchison
* @email seanthutchison@gmail.com
* @website http://taylorhutchison.com
* @created 8/25/2014
* @last_modified 8/25/2014
*/
/// <reference path="interfaces.ts"/>
var narrate = (function () {
    function narrate(name, config) {
        if (config != undefined) {
            narrate.config(config);
        }
        if (name != undefined) {
            narrate.getAllMatchingElements(name, document.all);
        } else {
            narrate.logIfDebugging("You must supply a name to match class or attribute values against. Try narrate(\"mystory\")", true);
        }
        return narrate;
    }
    narrate.go = function (position) {
        var elementCount = narrate.settings.narrationElemCollection.length;
        if (position % elementCount == 0) {
            return 0;
        } else if (position >= 0 && position <= elementCount - 1) {
            return position;
        } else if (position >= 0) {
            return Math.abs(position % elementCount);
        } else {
            return elementCount - Math.abs(position % elementCount);
        }
    };

    narrate.getGo = function (position) {
        console.log(narrate.go(position));
    };

    narrate.play = function (start, duration) {
    };

    Object.defineProperty(narrate, "options", {
        get: function () {
            return narrate.settings;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(narrate, "debug", {
        set: function (debug_bool) {
            if (typeof (debug_bool) == "boolean") {
                narrate.settings.debug = debug_bool;
                narrate.logIfDebugging("Debugging mode has be turned on");
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(narrate, "modulator", {
        set: function (modObj) {
            //Check if modObj is valid
            if (modObj) {
                narrate.settings.modulator = modObj;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(narrate, "audioPath", {
        set: function (path) {
            //Check if its a full, valid path
            if (path) {
                narrate.settings.audioPath = path;
                narrate.setupAudio();
            }
        },
        enumerable: true,
        configurable: true
    });

    narrate.jump = function (position) {
        if (typeof (position) == "number") {
            narrate.go(position);
        } else if (position instanceof HTMLElement) {
            narrate.go(position);
        }
        return narrate;
    };

    narrate.previous = function () {
        return narrate;
    };

    narrate.next = function () {
        return narrate;
    };

    narrate.logIfDebugging = function (message, force) {
        if (narrate.settings.debug || force == true) {
            console.log(message);
        }
        return narrate;
    };

    narrate.setupAudio = function () {
        return narrate;
    };

    narrate.config = function (configObj) {
        for (var prop in configObj) {
            if (narrate.settings.hasOwnProperty(prop)) {
                narrate.settings[prop] = configObj[prop];
            }
        }
        return narrate;
    };

    narrate.getAllMatchingElements = function (name, docElements) {
        var counter = 0;
        for (var counter = 0; counter < docElements.length; counter++) {
            if (docElements[counter].hasAttribute(name) || docElements[counter].className.indexOf(name) > -1) {
                narrate.settings.narrationElemCollection.push(docElements[counter]);
            }
        }
        narrate.logIfDebugging(narrate.settings.narrationElemCollection.length + " elements added to the narration matching \"" + name + "\"");
    };
    narrate.settings = {
        version: 0.1,
        narrationElemCollection: [],
        debug: false,
        modulator: undefined,
        audioPath: undefined,
        autoplay: false,
        timings: [],
        control: undefined,
        position: 0
    };
    return narrate;
})();
//# sourceMappingURL=narrate.js.map
