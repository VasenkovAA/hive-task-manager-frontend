<template>
  <div id="Hive">
    <HiveHeader />
    <main>
      <router-view />
    </main>
    <HiveFooter />
  </div>
</template>

<script>
import HiveHeader from './components/HiveHeader.vue'
import HiveFooter from './components/HiveFooter.vue'

export default {
  // eslint-disable-next-line
  name: 'Hive',
  components: {
    HiveHeader,
    HiveFooter
  }
}
</script>

<style>
/* Глобальные стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f8f9fa;
  color: #212529;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

#Hive {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>