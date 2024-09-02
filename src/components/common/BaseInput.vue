<script setup>
import { defineProps } from 'vue'
defineProps({
  type: {
    type: String
  },
  className: {
    type: String
  },
  onInput: {
    type: Function
  },
  autofocus: {
    type: Boolean
  },
  onFocus: {
    type: Function
  },

  onPaste: {
    type: Function
  }
})
</script>
<template>
  <input
    :type="type"
    :class="className"
    :autofocus="autofocus"
    @input="onInput"
    maxlength="1"
    @paste="onPaste"
    @focus="onFocus"
  />
</template>
<style lang="scss"></style>
