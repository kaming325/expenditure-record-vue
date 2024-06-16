<template>
  <div>
    <h2>{{ label ?? 'label' }}</h2>
    <div
      ref="container"
      class="flex border-b-4 transition-colors ease-linear duration-700"
      :class="isFocus ? 'border-green-700' : 'border-blue-700'"
    >
      <span>
        <div
          ref="icon"
          class="w-10 h-10 transition-colors duration-700 ease-in"
          v-html="props?.icon"
          :class="isFocus ? 'text-green-700' : 'text-blue-700'"
        ></div>
      </span>
      <input
        @focusin="isFocus = true"
        @focusout="isFocus = false"
        class="outline-none ml-2"
        :type="props.inputType ?? 'text'"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

const props = defineProps(["icon", "inputType", "label"]);

const isFocus = ref(false);

const inputValue = defineModel('inputValue')
// const lastName = defineModel('lastName')

</script>

<style scoped>
</style>
