<!-- :value="inputDefault" -->
<template>
  <div class="otp">
    <div class="otp__title">کد تایید</div>
    <div class="otp__boxes" ref="input">
      <template v-for="n in numberOfOTCBoxes" :key="n">
        <BaseInput
          type="text"
          class="otp__box"
          @input="onFilledInput"
          :tabindex="n"
          :autofocus="n == 1 ? true : false"
          @paste="onPasteData"
        />
      </template>
    </div>
    <slot name="hint"> </slot>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import BaseInput from '@/components/common/BaseInput.vue'
import { onMounted } from 'vue'

defineProps({
  onFilledInput: {
    type: Function
  },
  // inputDefault: {
  //   type: null
  // },
  numberOfOTCBoxes: {
    type: Number
  }
})
const input = ref(null)
let inputs = []
onMounted(() => {
  inputs = input.value.children
})

function onPasteData(event) {
  const pastedData = event.clipboardData.getData('text')
  const arrPastedData = pastedData.split('')
  for (let i = 0; i < arrPastedData.length; i++) {
    inputs[i].value = +arrPastedData[i]
    console.log(inputs[i])
  }
}
</script>
<style lang="scss"></style>
