<template>
  <div class="flex flex-col gap-6">
    <Toast />

    <!-- <Button label="Show" @click="show()" /> -->

    <div class="text-3xl font-semibold">Make a new transaction</div>
    <div class="flex gap-4">
      <Select
        v-model="selectedAccount"
        :options="userAccounts ?? []"
        optionLabel="account_name"
        placeholder="Select an account"
        :loading="loading"
        class="w-full md:w-56"
      ></Select>
      <ToggleButton
        v-model="isIncome"
        offLabel="Expend"
        onLabel="Income"
        offIcon="pi pi-arrow-up"
        onIcon="pi pi-arrow-down"
        class="w-36"
        aria-label="Do you confirm"
      />
    </div>

    <!-- <AutoComplete></AutoComplete> -->

    <!-- <div>a</div> -->

    <!-- <InputText></InputText> -->
    <Select
      v-model="selectedCategory"
      :options="categories ?? []"
      optionLabel="account_name"
      placeholder="Select a category"
      :loading="loading"
      class="w-full md:w-56"
    ></Select>

    <FloatLabel class="w-full md:w-56">
      <InputText id="detail" class="w-full md:w-56" v-model="detail" />
      <label for="detail">Detail</label>
    </FloatLabel>

    <!-- <InputNumber
      v-model="value1"
      mode="currency"
      currency="USD"
      locale="en-US"
    /> -->

    <InputNumber
      v-model="delta"
      class="w-full md:w-40"
      inputId="horizontal-buttons"
      showButtons
      buttonLayout="horizontal"
      :step="1"
      :min="0"
      mode="currency"
      :currency="selectedAccount?.currency_code ?? 'CAD'"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>

    <DatePicker
      showButtonBar
      v-model="date"
      showIcon
      :manualInput="false"
      class="w-full md:w-40"
    ></DatePicker>

    <ToggleButton
      v-model="addRemark"
      onLabel="Remark"
      offLabel="Remark"
      onIcon="pi pi-pencil"
      offIcon="pi pi-pencil"
      class="w-36"
      aria-label="Do you confirm"
    />

    <Textarea v-if="addRemark" v-model="remark" autoResize rows="5" cols="30" />

    <Button @click="createNewRecord" class="w-full md:w-40" label="Submit"></Button>
  </div>
</template>

<script setup lang="ts">
// import { loading, removeUserSession } from "@/main";
// import AutoComplete from 'primevue/autocomplete';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ToggleButton from "primevue/togglebutton";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";

import { sendRequest, validateToken } from "@/main";
import { computed, onMounted, Ref, ref } from "vue";

const toast = useToast();

const userSession = JSON.parse(localStorage.getItem("userSession") ?? "{}");

const loading = ref(false);

const isIncome = ref(false);
const addRemark = ref(false);

const delta = ref(0);
// const _delta = computed({
//   // getter
//   get() {
//     return delta.value;
//   },
//   // setter
//   set(v) {
//     delta.value = v ? (typeof v === "string" ? parseFloat(v) : v) : 0;
//   },
// });

const userAccounts = ref([]);
const selectedAccount: Ref<any> = ref(null);

const categories = ref([]);
const selectedCategory = ref(null);

const detail = ref("");
const remark = ref("");

const date = ref(new Date());

async function createNewRecord() {
  if (loading.value) {
    console.log("loading");
    return;
  }
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
  loading.value = true;
  try {
    const resp = await sendRequest(
      "api/transaction",
      "POST",
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      {
        account: selectedAccount?.value?.id,
        category: selectedCategory?.value,
        delta: isIncome.value ? -delta.value : delta.value,
        remark: remark.value,
        detail: detail.value,
      }
    );
    console.log(resp);
    if (resp?.data) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Create new transaction success!",
        life: 3000,
      });
    }
    if (resp?.error) {
      toast.add({
        severity: "error",
        summary: "Transaction Error",
        detail: `Error: ${resp?.error?.message}`,
        life: 3000,
      });
    }
  } catch (error) {
    console.warn(error);
    toast.add({
        severity: "error",
        summary: "Transaction Error",
        detail: `Error: ${error.message}`,
        life: 3000,
      });
  } finally {
    loading.value = false;
  }
}
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
  if (accounts?.data) {
    userAccounts.value = accounts.data;
  }
  loading.value = false;
});
</script>

<style>
.p-textarea {
  /* @apply p-4 */
}
/* .p-datepicker-calendar-container {
  @apply w-full;
}

.p-datepicker-calendar {
  @apply w-full;
}

@media screen and (max-width: 640px) {
  .p-datepicker-weekday-cell {
    @apply !p-0;
  }
  
  .p-datepicker-day-cell {
    @apply !p-0;
  }
}

.p-datepicker-header {
  @apply w-full;
} */
</style>
