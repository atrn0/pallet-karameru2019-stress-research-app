<template lang="pug">
div
  .question
    .question-text Q{{questionIdx+1}}: {{questionText}}
    .buttons.is-centered
      span(v-for="(e, i) in ['そうだ', 'まあそうだ', 'ややちがう', 'ちがう']")
        input(type="radio" :value="reversePoint ? 4-i : i+1" :id="setIdx+'-'+questionIdx+'-'+i" v-model="points[setIdx][questionIdx]")
        label(:for="setIdx+'-'+questionIdx+'-'+i") {{e}}
</template>

<script>
export default {
  props: ["questionText", "reversePoint", "questionIdx", "points", "setIdx"]
};
</script>

<style lang="scss">
@import "~/assets/colors.scss";

.question {
  margin: 1.5rem 4vw;
}

.question .buttons span {
  padding: 0;
  font-size: 0.7rem;
  margin: 0.2rem;
  & label {
    border-radius: 13.5px;
    border: solid 1px #333;
    height: 100%;
    padding: 0.5rem;
    padding-bottom: calc(0.375em - 1px);
    padding-top: calc(0.375em - 1px);
    transition-duration: 300ms;
    transition-timing-function: ease;
  }
  & input {
    display: none;
  }
  & input[type="radio"]:checked + label {
    color: #fff;
    background: $theme-color;
  }
}
</style>
