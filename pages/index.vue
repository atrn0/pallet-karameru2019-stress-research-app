<template lang="pug">
  #app.container
    div(v-if="loading") Loading...
    div(v-else)
      div(v-for="(set, i) in questions")
        p {{set.about}}
        table
          tr
            td 質問
            td そうだ
            td まあそうだ
            td やや違う
            td 違う
          tr(v-for="(q, j) in set.body")
            td {{q.question}}
            td(v-for="k in [1, 2, 3, 4]")
              input(type="radio" :value="q.reversePoint ? 5-k : k" :id="i+'-'+j+'-'+k" v-model="points[i][j]")
              label(:for="i+'-'+j+'-'+k") {{k}}
      div
        p あなたの点数は: {{sumOfPoints()}}点です。
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

const client = createClient();

export default {
  data() {
    return {
      questions: null,
      points: [],
      loading: true,
      errored: false
    };
  },
  methods: {
    sumOfPoints: function() {
      console.log("compute sum");
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
      })
      .then(() => {
        for (let i = 0; i < this.questions.length; i++) {
          this.points.push(new Array(this.questions[i].body.length).fill(0));
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
