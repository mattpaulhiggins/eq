<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/quiz">Quiz</router-link>
    </div>-->
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
  background: #252c4a;
  color: white;
  font-family: "Work Sans", sans-serif;
  letter-spacing: -0.02em;
}

* {
  box-sizing: border-box;
}

.content {
  width: 100vw;
  height: 90vh;
  position: relative;
}

// #nav {
//   padding: 30px;
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   justify-content: space-between;
//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
