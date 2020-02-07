<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Work+Sans:400,600&display=swap");

:root {
  --color-bg: #252c4a;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: white;
  font-family: "Work Sans", sans-serif;
  letter-spacing: -0.02em;
}

* {
  box-sizing: border-box;
}

.content {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
