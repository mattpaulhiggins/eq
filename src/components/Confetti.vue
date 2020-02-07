<template>
  <div class="confetti">
    <canvas id="confetti-canvas"></canvas>
  </div>
</template>

<script>
import confetti from "canvas-confetti";

export default {
  props: {
    fire: Boolean
  },
  mounted() {
    const confettiCanvas = document.getElementById("confetti-canvas");
    var myConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true
    });
  },
  watch: {
    fire: function() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.85
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.confetti {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
