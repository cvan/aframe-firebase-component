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
    this.syncedEntities = {};

    firebase.database().ref('entities').on('value', function (snapshot) {
      self.syncEntities(snapshot.val());
    });
  },

  /**
   * Read data.
   */
  syncEntities: function (entities) {
    var sceneEl = this.sceneEl;
    var syncedEntities = this.syncedEntities;

    Object.keys(entities).forEach(function (id) {
      // Update entity.
      if (syncedEntities[id]) {
        Object.keys(entities[id]).forEach(function (componentName) {
          syncedEntities[id].setAttribute(componentName, entities[id][componentName]);
        });
        return;
      }

      // Create entity if it doesn't exist.
      var entity = document.createElement('a-entity');
      Object.keys(entities[id]).forEach(function (componentName) {
        entity.setAttribute(componentName, entities[id][componentName]);
      });
      sceneEl.appendChild(entity);
      syncedEntities[id] = entity;
    });
  },

  /**
   * Send data.
   */
  registerBroadcast: function (el, components) {
    var database = this.database;

    el.addEventListener('componentchanged', function broadcast (evt) {
      // Only broadcast selected components.
      if (components.indexOf(evt.detail.name) === -1) { return; }

      // Build data.
      var data = {};
      components.forEach(function getData (componentName) {
        data[componentName] = el.getComputedAttribute(componentName);
      });

      // Initialize entry.
      var entityKey = el.getAttribute('firebase-broadcast').id;
      if (!entityKey) {
        entityKey = firebase.database().ref().child('entities').push().key;
        el.setAttribute('firebase-broadcast', 'id', entityKey);
      }

      // Update entry.
      firebase.database().ref('entities/' + entityKey).update(data);
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
    id: {default: ''},
    components: {default: ['position', 'rotation']}
  },

  init: function () {
    var el = this.el;
    var system = el.sceneEl.systems.firebase;
    system.registerBroadcast(el, this.data.components);
  }
});
