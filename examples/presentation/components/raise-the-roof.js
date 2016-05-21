/**
 * Rotate arms on click.
 */
AFRAME.registerComponent('raise-the-roof', {
  init: function () {
    var el = this.el;
    window.addEventListener('mousedown', function () {
      el.querySelector('.arms').setAttribute('rotation', {x: 180, y: 0, z: 0});
    });
    window.addEventListener('mouseup', function () {
      el.querySelector('.arms').setAttribute('rotation', {x: 0, y: 0, z: 0});
    });
  }
});
