<template>
  <div class="px-2 py-8 text-center text-gray-700 dark:text-gray-200">
    <div class="flex">
      <h1 class="title mb-2 text-left m-auto font-thin" v-html="title" />
    </div>
    <Footer />

    <div>
      <div class="flex">
        <table class="m-auto text-left cursor-default">
          <thead>
            <tr>
              <th />
              <th class="text-center">
                UK
              </th>
              <th class="text-center">
                US
              </th>
              <th class="text-center hidden lg:block">
                Wrong
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.word">
              <td
                class="px-2 py-1.5 rounded text-right pr-4 hover:bg-gray-400 hover:bg-opacity-10"
                @click="practice(item)"
              >
                {{ item.word }}
              </td>
              <td
                class="px-2 py-1.5 text-sm rounded text-center opacity-75 hover:bg-gray-500 hover:bg-opacity-10"
                @click="play(item, 'uk')"
              >
                /{{ item.phonetic_uk }}/
              </td>
              <td
                class="px-2 py-1.5 text-sm rounded text-center opacity-75 hover:bg-gray-500 hover:bg-opacity-10"
                @click="play(item, 'us')"
              >
                /{{ item.phonetic_us }}/
              </td>
              <td class="px-2 py-1.5 text-sm rounded text-center text-red-600 dark:text-red-400 opacity-50 hidden lg:block">
                /{{ item.phonetic_wrong }}/
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fixed flex top-0 bottom-0 right-0 left-0 bg-white pointer-events-none transition-opacity duration-200 ease-in"
      :class="modal ? 'opacity-100' : 'opacity-0'"
    >
      <div class="m-auto">
        <div class="text-5xl mb-1">
          {{ word }}
        </div>
        <div class="text-normal opacity-50">
          {{ region.toUpperCase() }} [{{ phonetic }}]
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import raw from './data.json'

export const data = ref(raw)
export const word = ref('')
export const phonetic = ref('')
export const region = ref('us')
export const modal = ref(false)

export const title = Array.from('Chinese Programmer Wrong Pronunciation').map(i => i === ' ' ? '<br>' : `<span>${i}</span>`).join('')

export const play = (item: any, r: string) => {
  const audio = new Audio(item[`voice_${r}`])
  audio.addEventListener('playing', () => {
    word.value = item.word
    region.value = r
    phonetic.value = item[`phonetic_${r}`]

    modal.value = true
    setTimeout(() => {
      modal.value = false
    }, 1000)
  })
  audio.play()
}

export const practice = (item: any) => {
  window.open(`https://www.google.com/search?q=how+to+pronounce+${item.word.replace(/\s/g, '+')}`, '_blank')
}
</script>

<style>
.title span {
  opacity: 0.4;
  cursor: default;
  transition: 0.4s opacity ease;
}
.title span:hover {
  opacity: 1;
}
</style>
