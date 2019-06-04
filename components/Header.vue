<template lang="pug">
div.header
  .logo
    img(src="~/assets/logo.svg")
  h1.title.has-text-centered ストレス診断だぱん。
  .panda1
    img(src="~/assets/panda1.svg")
  a(href="#" @click="clickSmoothScroll()").down_button
    img(src="~/assets/down_button.svg")

</template>

<script>
export default {
  methods: {
    clickSmoothScroll() {
      event.preventDefault();
      this.$SmoothScroll(
        document.querySelector("#questions"),
        400,
        null,
        null,
        "y"
      );
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/colors.scss";

.header {
  height: 100vh;

  & .title {
    color: #eee;
    margin: 4rem 0;
    font-size: 2rem;
  }

  & .logo {
    margin-top: 4rem;
    text-align: center;
    & img {
      width: 80vw;
      max-width: 500px;
    }
  }

  & .panda1 img {
    max-width: 300px;
    position: relative;
    left: -100px;
    animation: panda1 1.8s ease 0s infinite alternate;
  }

  & .down_button {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    animation: down_button 0.8s ease-in infinite alternate;
    & img {
      height: 3rem;
    }
  }
}

@keyframes down_button {
  100% {
    transform: translateY(0);
  }
  0% {
    transform: translateY(-1rem);
  }
}

@keyframes panda1 {
  0% {
  }
  100% {
    transform: rotate(5deg);
  }
}
</style>