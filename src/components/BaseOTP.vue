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
          :onfocus="focusHandler"
        />
      </template>
    </div>
    <slot name="hint"> </slot>
  </div>
</template>
<script setup>
import { onUpdated, ref } from 'vue'

import BaseInput from '@/components/common/BaseInput.vue'
import { onMounted } from 'vue'

const props = defineProps({
  onFilledInput: {
    type: Function
  },

  numberOfOTCBoxes: {
    type: Number
  },
  isResetInput: {
    type: Boolean
  }
})

const input = ref(null)
let inputs = []
onMounted(() => {
  inputs = input.value.children
})

onUpdated(() => {
  if (props.isResetInput) {
    resetInput()
  }
})

function onPasteData(event) {
  const pastedData = event.clipboardData.getData('text')
  const arrPastedData = pastedData.split('')
  for (let i = 0; i < arrPastedData.length; i++) {
    inputs[i].value = +arrPastedData[i]
  }
}

function focusHandler(e) {
  const element = e.target
  let lastEmptyElement = findLastEmpty(element)
  lastEmptyElement?.focus()
}

function findLastEmpty(element) {
  if (element.value.length == 0 && element.tabIndex != 1) {
    return findLastEmpty(element.previousSibling)
  } else if (element.value.length == 0 && element.tabIndex == 1) {
    return element
  } else {
    return element.nextSibling
  }
}

function resetInput() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = ''
  }
}
</script>
<style lang="scss"></style>
