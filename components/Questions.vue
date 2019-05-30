<template lang="pug">
  div
    .loading(v-if="loading")
      .spinner
        .rect1
        .rect2
        .rect3
        .rect4
        .rect5
    .loaded(v-else)
      .set(v-for="(set, setIdx) in questions")
        h3.set-title {{set.about}}
        Question(v-for="(body, questionIdx) in set.body" 
          :key="body.question" 
          :questionText="body.question" 
          :reversePoint="body.reversePoint" 
          :questionIdx="questionIdx" 
          :points="points"
          :setIdx="setIdx")
      p あなたの点数は{{sumOfPoints()}}点です。
</template>


<script>
// components
import Question from "./Question";

// plugins
import { createClient } from "~/plugins/contentful.js";

const client = createClient();

export default {
  data() {
    return {
      questions: null,
      errored: false,
      loading: true,
      points: []
    };
  },
  methods: {
    sumOfPoints: function() {
      return this.points.flat().reduce((a, b) => a + b);
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
.loading {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: #2c3e50;
  .spinner {
    margin: 100px auto;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: white;
    height: 100%;
    width: 6px;
    display: inline-block;
    margin: 0 2px;

    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
}

@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
