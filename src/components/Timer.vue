<template>
  <div class="timer">
    <div class="fill" :style="{ width: percentRemaining + '%' }"></div>
    <div class="overlay">
      <div class="spacer"></div>
      <div class="time">{{ timeInSec }}</div>
      <font-awesome-icon :icon="['far', 'clock']" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initTime: String,
    running: Boolean,
    reset: Boolean
  },
  data() {
    return {
      time: 0
    };
  },
  mounted() {
    this.time = parseInt(this.initTime);
    this.secTimer = setInterval(this.countDown, 1000);
  },
  methods: {
    countDown() {
      if (this.time > 0) {
        this.time = this.time - 1;
      } else {
        this.$emit("timeOut");
        clearInterval(this.secTimer);
      }
    }
  },
  computed: {
    timeInSec() {
      return Math.ceil(this.time);
    },
    percentRemaining() {
      return (this.time / parseInt(this.initTime)) * 100 + 10;
    }
  },
  watch: {
    running: function(newVal, oldVal) {
      if (!newVal) {
        clearInterval(this.secTimer);
      }
    },
    reset: function() {
      this.time = parseInt(this.initTime);
      this.secTimer = setInterval(this.countDown, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.secTimer);
  }
};
</script>

<style lang="scss" scoped>
.timer {
  position: relative;
  padding: 8px 10px;
  margin: 20px 0px;
  border-radius: 100px;
  border: 4px solid #3f4768;
  overflow: hidden;
  width: 90%;
}

.fill {
  position: absolute;
  z-index: -1;
  top: 0;
  left: -10%;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #fe4f68, #b56ffb);
  border-radius: 100px;
  transition: width 400ms ease;
}

.overlay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  & > .time {
    font-size: 20px;
  }

  & > .icon {
    font-size: 22px;
    opacity: 0.7;
  }
}
</style>
