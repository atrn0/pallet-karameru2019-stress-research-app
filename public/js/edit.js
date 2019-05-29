let app = new Vue({
  el: '#app',
  data: {
    questions: null,
    loading: true,
    errored: false,
    newQ: { set: '', question: '', reversePoint: false }
  },
  methods: {
    addQuestion: function (event) {
      this.questions[this.newQ.set].body
        .push(
          {
            'question': this.newQ.question,
            'reversePoint': this.newQ.reversePoint
          });
      this.newQ = { set: '', question: '', reversePoint: false }
      fetch('/edit')
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
      })
      .finally(() => {
        this.loading = false;
      });
  }
})