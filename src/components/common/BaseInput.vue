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
  defaultValue: {
    default: ''
  }
})
const DV = ref(props.defaultValue)
</script>
<template>
  <input
    :type="type"
    :class="className"
    :autofocus="autofocus"
    @input="onInput"
    :v-model="DV"
    maxlength="1"
  />
</template>
<style lang="scss"></style>
