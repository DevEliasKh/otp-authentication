<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
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
  // defaultValue: {
  //   type: [String, Number],
  //   default: ''
  // },
  onPaste: {
    type: Function
  }
})

// const DV = ref(props.defaultValue)
</script>
<template>
  <input
    :type="type"
    :class="className"
    :autofocus="autofocus"
    @input="onInput"
    maxlength="1"
    @paste="onPaste"
  />
</template>
<style lang="scss"></style>

<!-- :v-model="DV" -->
