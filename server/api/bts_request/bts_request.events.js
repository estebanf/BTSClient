/**
 * BtsRequest model events
 */

'use strict';

import {EventEmitter} from 'events';
var BtsRequest = require('../../sqldb').BtsRequest;
var BtsRequestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BtsRequestEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  BtsRequest.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    BtsRequestEvents.emit(event + ':' + doc._id, doc);
    BtsRequestEvents.emit(event, doc);
    done(null);
  };
}

export default BtsRequestEvents;
