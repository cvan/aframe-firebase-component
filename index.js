require('firebase');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerSystem('firebase', {
  init: function () {
    var sceneEl = this.sceneEl;
    var config = sceneEl.getAttribute('firebase');
    this.firebase = firebase.initializeApp(config);
    this.database = firebase.database();
  }
});

AFRAME.registerComponent('firebase', {
  schema: {
    // For the scene until we have system schemas.
    apiKey: {type: 'string'},
    authDomain: {type: 'string'},
    databaseURL: {type: 'string'},
    storageBucket: {type: 'string'}
  }
});
