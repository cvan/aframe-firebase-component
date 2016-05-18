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
    this.firebase = firebase.initializeApp(config);
    this.database = firebase.database();
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
    send: {default: ['position', 'rotation']}
  },

  init: function () {
    var el = this.el;
    var system = el.systems.firebase;
    system.registerBroadcast(el, this.data);
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
