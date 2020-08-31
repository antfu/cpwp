<template>
  <div class="text-xl mb-12">
    <div class="icon-btn mx-2" @click="isDark = !isDark">
      <Icon :icon="isDark ? 'ri:moon-line' : 'ri:sun-line'" class="inline-block" />
    </div>

    <a class="icon-btn mx-2" href="https://github.com/shimohq/chinese-programmer-wrong-pronunciation" target="_blank">
      <Icon icon="ri:play-list-add-fill" class="inline-block" />
    </a>

    <a class="icon-btn mx-2" href="https://github.com/antfu/cpwp" target="_blank">
      <Icon icon="ri:github-fill" class="inline-block" />
    </a>
  </div>
</template>

<script setup lang='ts'>
export { isDark } from '/~/utils'
</script>
