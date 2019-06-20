<template lang="pug">
  div
    Header
    #app.container
      Questions
</template>

<script>
import Questions from "./../components/Questions";
import Header from "./../components/Header";
export default {
  components: {
    Questions,
    Header
  }
};
</script>

<style lang="scss">
@import "~/assets/colors.scss";
.container {
  width: 95vw;
  max-width: 600px;
  align-items: center;
  white-space: pre-line;
}
</style>
