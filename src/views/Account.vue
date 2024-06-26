<template>
  <div class="flex flex-col gap-6">
    <div>hi</div>

    <div>
      {{ `selected currency: ${selectedCurrency?.code ?? "-"}` }}
    </div>

    <Select
      v-model="accountType"
      :options="['cash', 'credit']"
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

    <InputNumber
      v-model="initAmt"
      inputId="horizontal-buttons"
      showButtons
      buttonLayout="horizontal"
      :step="0.25"
      mode="currency"
      :currency="selectedCurrency?.code ?? 'USD'"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>

    <Button
      label="Add Account"
      @click="createNewAcc"
      icon="pi pi-plus"
      class="w-full md:w-56"
    />
  </div>
  <Toast />
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

import { userSessionType } from "@/types";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Select from "primevue/select";
import AutoComplete from "primevue/autocomplete";
import FloatLabel from "primevue/floatlabel";
import InputNumber from "primevue/inputnumber";

import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const toast = useToast();

import { onMounted, Ref, ref } from "vue";
import { sendRequest, validateToken } from "@/main";

// const baseUrl = import.meta.env.VITE_BACKEND_URL;

// const userSession: userSessionType = JSON.parse(
//   localStorage.getItem("userSession") ?? "{}"
// );

const loading = ref(false);

const newAccountName = ref("");
const accountType = ref("cash");
const initAmt = ref(0);

const selectedCurrency: Ref<currencyType> = ref(null as any);
const filteredCurrencies = ref();
const currencies = ref([] as currencyType[]);

async function createNewAcc() {
  if (loading.value) {
    console.log("loading");
    return;
  }
  const access_token = await validateToken();
  if (!access_token) {
    console.warn("no valid token");
    return;
  }
  loading.value = true;
  try {
    const resp = await sendRequest(
      "api/account",
      "POST",
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      {
        balance: initAmt?.value,
        type: accountType?.value,
        currency_code: selectedCurrency?.value?.code,
        account_name: newAccountName?.value,
      }
    );
    console.log(resp);
    if (!resp?.error) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Create new account success!",
        life: 3000,
      });
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
}

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

onMounted(async () => {
  loading.value = true;
  currencies.value = Object.entries(
    (await import("@/assets/data/Common-Currency.json")) ?? {}
  )
    .map(([k, v]) => v)
    ?.sort((a, b) => a.name?.localeCompare(b.name)) as typeof currencies.value;
  loading.value = false;
});
</script>
