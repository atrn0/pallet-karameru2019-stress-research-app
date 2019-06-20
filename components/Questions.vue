<template lang="pug">
  div
    .loaded#questions(v-if="!loading")
      .set(v-for="(set, setIdx) in questions")
        h3.set-title {{set.about}}
        .questions
          Question(v-for="(body, questionIdx) in set.body" 
            :key="body.question" 
            :questionText="body.question" 
            :reversePoint="body.reversePoint" 
            :questionIdx="questionIdx" 
            :points="points"
            :setIdx="setIdx")
      .show_result_button
        a.button(v-on:click="showResults" href="#" @click="clickSmoothScroll()") 結果をみる
      #result
        .result(v-if="answered")
          img(:src="resultImgSrc")
          p.result_message {{resultMessage}}
          a.button(href="/") もう1回診断する
</template>


<script>
// components
import Question from "./Question";

// plugins
import { createClient } from "~/plugins/contentful.js";

// photos
import tired_panda from "~/assets/tired_panda.svg";
import imopanda from "~/assets/imopanda.svg";

const client = createClient();

export default {
  data() {
    return {
      questions: null,
      errored: false,
      loading: true,
      points: [],
      answered: false,
      resultMessage: "",
      resultImgSrc: ""
    };
  },
  methods: {
    sumOfPoints: function() {
      return this.points.flat().reduce((a, b) => a + b);
    },
    showResults: function() {
      if (this.sumOfPoints() < 40) {
        this.resultMessage =
          "あなたはそんなにストレスはなさそうだぱんね！\nこのまま安らかな生活を送ろう";
        this.resultImgSrc = imopanda;
      } else {
        this.resultMessage =
          "あなたはストレスが多いぱん！\nしっかりパンフ・パネルを読んでリラックス方法を知ろう！";
        this.resultImgSrc = tired_panda;
      }
      this.answered = true;
    },
    clickSmoothScroll() {
      event.preventDefault();
      this.$SmoothScroll(
        document.querySelector("#result"),
        400,
        null,
        null,
        "y"
      );
    }
  },
  mounted: function() {
    client
      .getEntries({
        content_type: "questionSet"
      })
      .then(entries => {
        this.questions = entries.items.map(item => {
          return {
            about: item.fields.about,
            body: item.fields.body.map(body => {
              return body.fields;
            })
          };
        });
        console.log("get questions!");
        console.log(JSON.stringify(this.questions));
      })
      .then(() => {
        for (let i = 0; i < this.questions.length; i++) {
          this.points.push(new Array(this.questions[i].body.length).fill(0));
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },
  components: {
    Question
  }
};
</script>

<style lang="scss">
@import "~/assets/colors.scss";

.loaded {
  margin: 3rem 0;
}

.set {
  padding-top: 2rem;
}

.set-title {
  text-align: justify;
}

.questions {
  background: #eee;
  color: #333;
  padding: 1rem 0;
  margin: 1rem 0;
  border-radius: 1rem;
  filter: drop-shadow(0 0 0.2rem #333);
}
.loaded {
  & .button {
    border: solid 1px #333;
    padding: 0.5rem;
    padding-bottom: calc(0.375em - 1px);
    padding-top: calc(0.375em - 1px);
    transition-duration: 300ms;
    transition-timing-function: ease;
    background: #eee;
    height: 40px;
    border-radius: 40px;
  }
}

.show_result_button {
  text-align: right;
}

.result {
  height: 100vh;
  text-align: center;
  & img {
    height: 60vh;
    max-width: 500px;
    position: relative;
    bottom: -3rem;
  }
  & .result_message {
    margin: 2rem 0;
    padding: 1rem;
    background: #eee;
    color: #333;
    border-radius: 1rem;
    filter: drop-shadow(0 0 0.2rem #333);
    text-align: left;

    & :before {
      content: "";
      position: absolute;
      bottom: -24px;
      left: 50%;
      margin-left: -15px;
      border: 12px solid transparent;
      border-top: 12px solid #fff;
      z-index: 2;
    }

    & :after {
      content: "";
      position: absolute;
      bottom: -30px;
      left: 50%;
      margin-left: -17px;
      border: 14px solid transparent;
      border-top: 14px solid #555;
      z-index: 1;
    }
  }
}
</style>
