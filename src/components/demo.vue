<template >
  <div>
    <p>this a vue component in markdown component</p>
    <button @click="count++">vue component {{count}}</button>
  </div>
</template>
<script lang="ts" setup>
const count = ref(0)
</script>

