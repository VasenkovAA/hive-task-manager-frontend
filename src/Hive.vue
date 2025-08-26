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
  name: 'HiveApp', // Изменено с 'Hive' на 'HiveApp'
  components: {
    HiveHeader,
    HiveFooter
  }
}
</script>

<style>
/* Глобальные стили теперь в global.css */
</style>