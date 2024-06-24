<template>
  <div class="flex flex-col gap-6">
    <div>hi</div>

    <div>
      {{ `selected currency: ${selectedCurrency?.code ?? "-"}` }}
    </div>

    <Select
          v-model="accountType"
          :options="[
            'cash',
            'credit',
          ]"
          placeholder="Select a type"
          class="w-full md:w-56"
        ></Select>

    <AutoComplete
      v-model="selectedCurrency"
      :suggestions="filteredCurrencies"
      optionLabel="name"
      dropdown
      class="w-full md:w-56"
      @complete="search"
    />

    <FloatLabel class="w-full md:w-56">
      <InputText id="newAccountName" v-model="newAccountName" />
      <label for="newAccountName">Account Name</label>
    </FloatLabel>

    <!-- <InputText
          v-model="newAccountName"
          placeholder="Account Name"
          class="w-full md:w-56"
        /> -->

    <Button label="Add Account" icon="pi pi-plus" class="w-full md:w-56" />
  </div>
</template>

<script lang="ts" setup>
type currencyType = {
  symbol: string; //"$";
  name: string; //"US Dollar";
  symbol_native: string; //"$";
  decimal_digits: number; //2;
  rounding: number; // 0;
  code: string; //"USD";
  name_plural: string; //"US dollars";
};

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Select from "primevue/select";
import AutoComplete from "primevue/autocomplete";
import FloatLabel from "primevue/floatlabel";

import { onMounted, Ref, ref } from "vue";

const newAccountName = ref("");

const accountType = ref('cash');

const selectedCurrency: Ref<currencyType> = ref(null as any);
const filteredCurrencies = ref();

const search = (event: any) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCurrencies.value = [...currencies.value];
    } else {
      filteredCurrencies.value = currencies.value?.filter((currency) => {
        return (
          currency.name
            ?.toLowerCase()
            ?.startsWith(event.query?.toLowerCase()) ||
          currency.code?.toLowerCase()?.startsWith(event.query?.toLowerCase())
        );
      });
    }
  }, 250);
};
const currencies = ref(
  [] as currencyType[]
  // [] as any[]
); // Object.entries(await import('@/assets/data/Common-Currency.json'));

onMounted(async () => {
  currencies.value = Object.entries(
    (await import("@/assets/data/Common-Currency.json")) ?? {}
  )
    .map(([k, v]) => v)
    ?.sort((a, b) => a.name?.localeCompare(b.name)) as typeof currencies.value;
});
</script>
