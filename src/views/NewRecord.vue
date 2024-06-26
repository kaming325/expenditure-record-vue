<template>
  <div class="">
    <Button label="Show" @click="show()" />
    <h2>New Record</h2>

    <AutoComplete></AutoComplete>

    <div>a</div>

    <InputText></InputText>
    <InputNumber
      v-model="value1"
      mode="currency"
      currency="USD"
      locale="en-US"
    />

    <InputNumber
      v-model="value1"
      inputId="horizontal-buttons"
      showButtons
      buttonLayout="horizontal"
      :step="0.25"
      mode="currency"
      currency="CAD"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>

    <Button @click="debug" label="Submit"> </Button>

    <ToggleButton
      v-model="checked"
      onLabel="Locked"
      offLabel="Unlocked"
      onIcon="pi pi-lock"
      offIcon="pi pi-lock-open"
      class="w-36"
      aria-label="Do you confirm"
    />

    <Select
      v-model="selectedAccount"
      :options="userAccounts ?? []"
      optionLabel="account_name"
      placeholder="Select an account"
      :loading="loading"
      class="w-full md:w-56"
    ></Select>
  </div>
  <Toast />
</template>

<script setup lang="ts">
// import { loading, removeUserSession } from "@/main";
// import AutoComplete from 'primevue/autocomplete';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ToggleButton from "primevue/togglebutton";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { sendRequest, validateToken } from "@/main";

const toast = useToast();

const userSession = JSON.parse(localStorage.getItem("userSession") ?? "{}");

const loading = ref(false);

const checked = ref(false);
const value1 = ref(0);

const userAccounts = ref([]);
const selectedAccount = ref(null);

function debug() {
  const root = document.getElementsByTagName("html")[0];
  root.classList.toggle("app-dark");
}
const show = () => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Message Content",
    life: 3000,
  });
};

onMounted(async () => {
  loading.value = true;
  const access_token = await validateToken();
  if (!access_token) {
    toast.add({
      severity: "error",
      summary: "Auth Error",
      detail: "failed to get user token, please login again",
      life: 3000,
    });
    console.warn("no valid token");
    return;
  }
  const accounts = await sendRequest(
    "api/account/user",
    "GET",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    {}
  );
  if(accounts?.data) {
    userAccounts.value = accounts.data
  }
  loading.value = false;

});
</script>
