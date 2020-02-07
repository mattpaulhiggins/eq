<template>
  <li @click="handleSelected" :class="answerClass">
    <div v-html="answerText"></div>
    <font-awesome-icon :icon="icon" :class="iconClass" />
  </li>
</template>

<script>
import {
  faCircle,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-regular-svg-icons";

export default {
  props: {
    answerText: String,
    answerState: String
  },
  data() {
    return {
      icon: faCircle,
      iconClass: "icon",
      answerClass: "answer",
      answered: false
    };
  },
  methods: {
    handleSelected() {
      this.$emit("answerSelected", this.$vnode.key);
    }
  },
  watch: {
    answerState: function(newVal, oldVal) {
      switch (this.answerState) {
        case "correct":
          this.icon = faCheckCircle;
          this.iconClass = "icon icon--correct";
          this.answerClass = "answer answer--correct";
          break;
        case "incorrect":
          this.icon = faTimesCircle;
          this.iconClass = "icon icon--incorrect";
          this.answerClass = "answer answer--incorrect";
          break;
        default:
          this.icon = "faCircle";
          this.iconClass = "icon";
          this.answerClass = "answer";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.answer {
  font-size: 15px;
  background-image: linear-gradient(to right, var(--color-bg), #253252);
  margin: 18px 0px;
  padding: 15px 20px;
  border: 4px solid #234768;
  border-radius: 24px;
  transition: all 200ms ease-out;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
  }
}

.icon {
  font-size: 24px;
}

.icon--correct {
  color: #117eeb;
}

.icon--incorrect {
  color: #fc4f6a;
}

.answer--incorrect {
  border: 4px solid #fc4f6a;
}
</style>
