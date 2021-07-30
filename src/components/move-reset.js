/**
 * Reset curve follow rig pose back to beginning.
 */
 AFRAME.registerComponent('move-reset', {
    schema: {
      isVictory: {type: 'string'},
      enabled: {default: false}
    },
  
    init: function () {
      const el = this.el;
      this.preloadTime = 0;
      this.songTime = undefined;
      this.beatData = null;
      this.beatContainer = document.getElementById('beatContainer');
      this.wallContainer = document.getElementById('wallContainer');
      this.index = {events: 0, notes: 0, obstacles: 0};
      el.sceneEl.addEventListener('cleargame', () => {
        this.reset();
      });
    },
  
    update: function (oldData) {
      const data = this.data;
      const el = this.el;
  
      if (!oldData.isVictory && data.isVictory) { this.reset(); }
    },
  
    reset: function () {
        this.beatContainer.object3D.position.set(0,0,0);
        //AFRAME.scenes[0].emit("restart");
    }

  });
  