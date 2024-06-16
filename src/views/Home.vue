<script setup lang="ts">
import { ref } from 'vue'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})

const userSession = JSON.parse(localStorage.getItem("userSession") ?? "{}");

</script>

<template>
  <div>
  <h2>Home</h2>
  <label>
    Search: <input v-model.trim="search" maxlength="20">
  </label>
  <div>
    {{ userSession }}
  </div>
</div>
</template>