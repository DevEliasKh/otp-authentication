<template>
  <div class="otp">
    <div class="otp__title">کد تایید</div>
    <div class="otp__boxes">
      <template v-for="n in numberOfOTCBoxes" :key="n">
        <BaseInput
          type="text"
          class="otp__box"
          @input="onFilledInput"
          :tabindex="n"
          :autofocus="n == 1 ? true : false"
          :value="inputDefault"
        />
      </template>
    </div>
    <slot name="hint"> </slot>
  </div>
</template>
<script setup>
import BaseInput from '@/components/common/BaseInput.vue'

defineProps({
  onFilledInput: {
    type: Function
  },
  inputDefault: {
    type: Number || null
  },
  numberOfOTCBoxes: {
    type: Number
  }
})
</script>
<style lang="scss"></style>
