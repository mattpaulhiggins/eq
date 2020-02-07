<template>
  <div class="questions">
    <Confetti :fire="fireConfetti"></Confetti>
    <div class="upper-container">
      <Timer
        @timeOut="handleTimeout"
        initTime="25"
        :running="!questionAnswered"
        :reset="resetTimer"
      ></Timer>
      <div class="question-label-container">
        <div class="question-label">
          Score {{ score }}
          <span>/{{ questionCount }}</span>
        </div>
        <hr />
      </div>
    </div>
    <div class="question-container">
      <transition name="fade">
        <Question @answered="handleAnswer" :key="questionKey"></Question>
      </transition>
    </div>
    <div class="button-container">
      <button
        :disabled="!questionAnswered"
        @click="nextQuestion"
        class="btn-next"
      >
        Next
      </button>
    </div>
    <Bubbles></Bubbles>
  </div>
</template>

<script>
import Timer from "@/components/Timer";
import Answer from "@/components/Answer";
import Question from "@/components/Question";
import Confetti from "@/components/Confetti";
import Bubbles from "@/components/Bubbles";

export default {
  name: "Questions",
  components: {
    Timer,
    Answer,
    Question,
    Confetti,
    Bubbles
  },
  data() {
    return {
      score: 0,
      questionKey: 0,
      questionAnswered: false,
      fireConfetti: false,
      resetTimer: false
    };
  },
  methods: {
    handleTimeout() {
      this.nextQuestion();
    },
    handleAnswer(e) {
      if (!this.questionAnswered) {
        this.questionAnswered = true;
        if (e) {
          this.fireConfetti = !this.fireConfetti;
          this.score++;
        }
      }
    },
    nextQuestion() {
      this.questionKey += 1;
      this.questionAnswered = false;
      this.resetTimer = !this.resetTimer;
    }
  },
  computed: {
    questionCount: function() {
      return this.questionKey + 1;
    }
  }
};
</script>

<style scoped lang="scss">
.questions {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  & > .upper-container {
    flex-shrink: 0;
  }

  & > .button-container {
    flex-shrink: 0;
  }

  & > .question-container {
    flex-grow: 1;
  }
}

.question-label-container {
  width: 95%;
  padding: 0px 20px;
}

.question-label {
  font-weight: 600;
  font-size: 28px;
  letter-spacing: -0.04em;
  color: #99a1c7;

  & > span {
    font-size: 20px;
    font-weight: 400;
    display: inline-block;
    transform: translateY(3px);
  }
}

hr {
  border-width: 0 0 4px 0;
  border-style: dotted;
  border-color: rgba(255, 255, 255, 0.04);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.btn-next {
  border: none;
  font-size: 24px;
  font-weight: 400;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  color: white;
  background: #117eeb;
  padding: 15px 30px;
  margin: 20px 0px;
  border-radius: 1000px;
  width: 150px;
  transition: opacity 200ms ease;

  &:disabled {
    opacity: 0.1;
  }
}

.upper-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.question-container {
  position: relative;
  width: 100%;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.fade-enter {
  opacity: 0;
  transform: translateX(1000px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-500px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1000ms cubic-bezier(0, 0.5, 0, 1);
}

#bubbles {
  position: absolute;
}

@media only screen and (min-width: 600px) {
  .questions {
    width: 480px;
  }
}
</style>
