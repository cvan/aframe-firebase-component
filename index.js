require('firebase');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Firebase system.
 */
AFRAME.registerSystem('firebase', {
  init: function () {
    var sceneEl = this.sceneEl;
    var config = sceneEl.getAttribute('firebase');
    var self = this;

    this.firebase = firebase.initializeApp(config);
    this.database = firebase.database();
    this.broadcastHandlers = [];
    this.syncedEntities = {};

    firebase.database().ref('entities').on('value', function (snapshot) {
      self.syncEntities(snapshot.val());
    });
  },

  syncEntities: function (entities) {
    var sceneEl = this.sceneEl;
    var syncedEntities = this.syncedEntities;

    Object.keys(entities).forEach(function (id) {
      // Create entity if it doesn't exist.
      if (!syncedEntities[id]) {
        var entity = document.createElement('a-entity');
        entity.setAttribute('id', id);
        Object.keys(entities[id]).forEach(function (componentName) {
          entity.setAttribute(componentName, entities[id][componentName]);
        });
        sceneEl.appendChild(entity);
        syncedEntities[id] = entity;
        return;
      }
      // Update entity.
      Object.keys(entities[id]).forEach(function (componentName) {
        syncedEntities[id].setAttribute(componentName, entities[id][componentName]);
      });
    });
  },

  /**
   * Register broadcast to send entity component data to Firebase database on interval.
   */
  registerBroadcast: function (el, components, interval) {
    var database = this.database;
    var handler = {interval: interval};
    handler.handler = function send () {
      // Build data.
      var data = {};
      components.forEach(function getData (componentName) {
        data[componentName] = el.getComputedAttribute(componentName);
      });
      // Initialize entry.
      if (!handler.entityKey) {
        handler.entityKey = firebase.database().ref().child('entities').push().key;
      }
      // Update entry.
      firebase.database().ref('entities/' + handler.entityKey).update(data);
    };
    this.broadcastHandlers.push(handler);
  },

  tick: function (time) {
    if (time - this.time < 200) { return; }
    this.time = time;

    this.broadcastHandlers.forEach(function runHandler (handler) {
      handler.handler();
    });
  }
});

/**
 * Data holder for the scene.
 */
AFRAME.registerComponent('firebase', {
  schema: {
    apiKey: {type: 'string'},
    authDomain: {type: 'string'},
    databaseURL: {type: 'string'},
    storageBucket: {type: 'string'}
  }
});

/**
 * Broadcast.
 */
AFRAME.registerComponent('firebase-broadcast', {
  schema: {
    interval: {default: 10},
    components: {default: ['position', 'rotation']}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var system = el.sceneEl.systems.firebase;
    system.registerBroadcast(el, data.components, data.interval);
  }
});

function guid() {
  var text = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < 5; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}
