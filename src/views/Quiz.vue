<template>
  <div class="quiz">
    <questions></questions>
  </div>
</template>

<script>
import Questions from "@/components/Questions";

export default {
  name: "quiz",
  components: {
    Questions
  }
};
</script>

<style lang="scss" scoped>
.quiz {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
