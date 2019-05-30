<template lang="pug">
div
  .question
    .question-text Q{{questionIdx+1}}: {{questionText}}
    .buttons.has-addons.is-centered
      span.button.q-input.is-info.is-small(v-for="(e, i) in ['そうだ', 'まあそうだ', 'ややちがう', 'ちがう']")
        input(type="radio" :value="reversePoint ? 4-i : i+1" :id="setIdx+'-'+questionIdx+'-'+i" v-model="points[setIdx][questionIdx]")
        label(:class="'button'+i" :for="setIdx+'-'+questionIdx+'-'+i") {{e}}
</template>

<script>
export default {
  props: ["questionText", "reversePoint", "questionIdx", "points", "setIdx"]
};
</script>

<style lang="scss">
.question {
  margin: 1rem;
}
.question .buttons .button {
  border: 0;
  padding: 0;
  & label {
    height: 100%;
    padding: 0.5rem;
    padding-bottom: calc(0.375em - 1px);
    padding-top: calc(0.375em - 1px);
  }
  & .button0 {
    border-radius: 3px 0 0 3px;
  }
  & .button3 {
    border-radius: 0 3px 3px 0;
  }
  & input {
    display: none;
  }
  & input[type="radio"]:checked + label {
    background: darkblue;
  }
}
</style>
