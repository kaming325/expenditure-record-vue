<template>
  <div>
    <h2>{{ label ?? "" }}</h2>
    <!-- class="flex border-b-4 transition-colors ease-linear duration-500" -->
    <div>
      <div class="flex items-center max-w-[50rem]">
        <!-- :class="isFocus ? 'border-green-700' : 'border-blue-700'" -->
        <span>
          <div
            ref="icon"
            class="w-8 h-8 transition-colors duration-300 ease-linear"
            v-html="props?.icon"
            :class="isFocus ? 'text-green-700' : 'text-blue-700'"
          ></div>
        </span>
        <input
          @focusin="isFocus = true"
          @focusout="isFocus = false"
          class="outline-none ml-2 bg-transparent max-w-36 sm:max-w-60"
          :type="props.inputType ?? 'text'"
          v-model="inputValue"
        />
          <slot name="append-inner"></slot>
      </div>
      <div class="bg-blue-700 h-[3px] w-full">
        <div ref="bar" class="h-full bg-green-700" style="width: 0%"></div>
      </div>
      <!-- add error message -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

const props = defineProps(["icon", "inputType", "label"]);

const isFocus = ref(false);

const bar = ref("bar");

const inputValue = defineModel("inputValue");

let barLength = 0;

watch(isFocus, (n, o) => {
  if (n) {
    const timer = setInterval(() => {
      barLength += 2;
      (bar.value as any).style.width = `${barLength}%`;
      if (barLength >= 100) {
        clearInterval(timer);
      }
    }, 1);
    return;
  }
  const timer = setInterval(() => {
    barLength -= 2;
    (bar.value as any).style.width = `${barLength}%`;
    if (barLength <= 0) {
      clearInterval(timer);
    }
  }, 1);
});
</script>

<style>
.p-password-input {
  outline: none;
  border: 0px;
  background: transparent;
}
</style>
