/**
 * Rotate arms on click.
 */
AFRAME.registerComponent('raise-the-roof', {
  schema: {default: false},

  init: function () {
    var el = this.el;
    window.addEventListener('mousedown', function () {
      el.setAttribute('raise-the-roof', true);
    });
    window.addEventListener('mouseup', function () {
      el.setAttribute('raise-the-roof', false);
    });
  },

  update: function () {
    var arms = this.el.querySelector('.arms');
    if (!arms) { return; }

    if (this.data) {
      arms.setAttribute('rotation', {x: 180, y: 0, z: 0});
    } else {
      arms.setAttribute('rotation', {x: 0, y: 0, z: 0});
    }
  }
});
