AFRAME.registerComponent('move', {
    schema: {
        enabled: {default: false},
        speed: {type: 'number'},
    },
    init:function (){
        this.realSpeed=0;
    },

    tick: function (time, delta) {
        const data = this.data;
        if (!data.enabled || !delta) { return; }
        this.realSpeed=data.speed * (delta / 1000);
        this.el.object3D.translateZ(this.realSpeed);
    }
  });