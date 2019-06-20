<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="scss">
@import "~/assets/colors.scss";

html {
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: $theme-color;
}

body {
  font-family: "Kosugi Maru", Roboto, "Source Sans Pro", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  color: white;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
