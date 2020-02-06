<template>
  <div class="question">
    <div class="question-text" v-html="question.question"></div>
    <div class="answers-container">
      <ul>
        <Answer
          class="m-20"
          v-for="(answer, index) in question.answers"
          :key="index"
          :answerText="answer.answer"
          :answerState="answer.state"
          @answerSelected="handleAnswer"
        ></Answer>
      </ul>
    </div>
  </div>
</template>

<script>
import Answer from "@/components/Answer";

export default {
  name: "Questions",
  components: {
    Answer
  },
  props: {
    timeOut: Boolean
  },
  data() {
    return {
      question: {}
    };
  },
  mounted() {
    let results = [];
    fetch("https://opentdb.com/api.php?amount=1&type=multiple")
      .then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response.json().then(data => {
          console.log(data.results[0]);
          this.formatQuestion(data.results[0]);
        });
      })
      .catch(err => {
        console.log("Fetch Error :-S", err);
      });
  },
  methods: {
    formatQuestion(result) {
      let answers = [];
      result.incorrect_answers.pop(); //Remove 1 Wrong Answer
      result.incorrect_answers.forEach(a => {
        answers.push({ answer: a, correct: false, state: "waiting" });
      });
      answers.splice(
        Math.floor(Math.random() * Math.floor(answers.length + 1)),
        0,
        { answer: result.correct_answer, correct: true, state: "waiting" }
      );

      this.question = {
        category: result.category,
        question: result.question,
        answers: answers,
        answered: false
      };
    },
    handleAnswer(e) {
      if (!this.question.answered) {
        this.question.answered = true;
        if (this.question.answers[e].correct) {
          this.question.answers[e].state = "correct";
          this.$emit("answered", true);
        } else {
          this.$emit("answered", false);
          this.question.answers[e].state = "incorrect";
          this.question.answers.find(el => el.correct).state = "correct";
        }
      }
    },
    handleTimeout(e) {}
  }
};
</script>

<style scoped lang="scss">
.question {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.question-text {
  margin: 0px 30px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5em;
}

.answers-container {
  position: relative;
  width: 90%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
