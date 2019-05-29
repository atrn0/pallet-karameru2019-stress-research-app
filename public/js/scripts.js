let app = new Vue({
  el: '#app',
  data: {
    questions: null,
    points: [],
    loading: true,
    errored: false
  },
  methods: {
    sumOfPoints: function () {
      console.log("compute sum");
      if (this.loading) {
        return 0;
      } else {
        return this.points.flat().reduce((currentSum, current) => {
          return currentSum + current;
        })
      }
    }
  },
  mounted: function () {
    fetch('/questions.json')
      .then((res) => {
        return res.json();
      })
      .then((questions) => {
        this.questions = questions;
        console.log(this.questions);
        for (let i = 0; i < this.questions.length; i++) {
          this.points.push(new Array(this.questions[i].body.length).fill(0));
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
})