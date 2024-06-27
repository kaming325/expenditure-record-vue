<template>
  <div>
    <div v-if="true" class="bg-gray-100 font-family-ubuntu flex">
      <aside
        class="relative bg-sidebar h-screen w-64 hidden overflow-y-hidden sm:block shadow-xl"
      >
        <div class="h-full flex flex-col">
          <div class="p-6">
            <!-- <a
              href="index.html"
              class="text-white text-3xl font-semibold uppercase hover:text-gray-300"
              >Admin</a
            > -->

            <div role="button">        
              <span class="pi pi-home text-white" style="font-size: 2rem;" />
            </div>
            <button
              @click="$router.push('/newRecord')"
              class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex gap-1 items-center justify-center"
            >
              <span>
                <div class="w-4 h-4 text-blue-700" v-html="AddIcon"></div>
              </span>
              New Report
            </button>
          </div>
          <div class="overflow-y-auto overscroll-y-none h-screen">
            <nav class="text-white text-base font-semibold py-2">
              <RouterLink
                v-for="tab in tabs"
                :to="tab.to"
                class="flex items-center py-4 mx-2 my-1 pl-6 rounded-3xl hover:bg-white hover:text-blue-700"
                :class="
                  $route.path === tab.to
                    ? 'bg-white text-blue-700'
                    : 'text-white'
                "
              >
                <!-- svg icon here -->
                <!-- <i class="fas fa-tachometer-alt mr-3"></i> -->
                {{ tab.name }}
              </RouterLink>
              <!-- <button @click="logout">
                  Logout
                </button> -->
            </nav>
            <!-- <a
                href="#"
                class="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4"
              >
                <i class="fas fa-arrow-circle-up mr-3"></i>
                Upgrade to Pro!
              </a> -->
          </div>
        </div>
      </aside>

      <div class="w-full flex flex-col h-screen overflow-y-hidden">
        <!-- Desktop Header -->
        <header class="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div class="w-1/2"></div>
          <div class="relative w-1/2 flex justify-end">
            <button @click="isOpen = !isOpen">
              <span>
                <div v-html="MenuIcon1" class="text-black w-10 h-10"></div>
              </span>
            </button>
            <button
              v-show="isOpen"
              @click="isOpen = false"
              class="h-full w-full fixed inset-0 cursor-default"
            ></button>
            <div
              v-show="isOpen"
              class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-[3.5rem]"
            >
              <!-- <a href="#" class="block px-4 py-2 account-link hover:text-white"
                >Account</a
              > -->
              <Button @click="$router.push('/user')" class="block px-4 py-2 account-link hover:text-white">
                Account
              </Button>
              <a href="#" class="block px-4 py-2 account-link hover:text-white"
                >Support</a
              >
              <Button @click="logout" class="block px-4 py-2 account-link hover:text-white"
                >Sign Out
              </Button>
            </div>
          </div>
        </header>

        <!-- Mobile Header & Nav -->
        <header class="w-full bg-sidebar py-5 px-6 sm:hidden">
          <div class="flex items-center justify-between">
            <!-- <a
              href="index.html"
              class="text-white text-3xl font-semibold uppercase hover:text-gray-300"
              >Admin</a
            > -->
            <div role="button">        
              <span class="pi pi-home text-white" style="font-size: 2rem;" />
            </div>
            <button
              @click="isOpen = !isOpen"
              class="text-black text-3xl focus:outline-none"
            >
              <span v-if="!isOpen">
                <div class="w-8 h-8 text-white" v-html="MenuIcon"></div>
              </span>

              <span v-else>
                <div class="w-8 h-8 text-white" v-html="CloseIcon"></div>
              </span>
            </button>
          </div>

          <!-- Dropdown Nav -->
          <nav :class="isOpen ? 'flex' : 'hidden'" class="flex flex-col pt-4">
            <a
              href="index.html"
              class="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i class="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </a>
            <a
              href="blank.html"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-sticky-note mr-3"></i>
              Blank Page
            </a>
            <a
              href="tables.html"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-table mr-3"></i>
              Tables
            </a>
            <button
              class="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
            >
              <i class="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
            </button>
          </nav>
          <!-- <button class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                    <i class="fas fa-plus mr-3"></i> New Report
                </button> -->
        </header>

        <div class="w-full overflow-x-hidden border-t flex flex-col">
          <main class="w-full flex-grow p-6">
            <RouterView />
          </main>

          <!-- <footer class="w-full bg-white text-right p-4">
                    Built by <a target="_blank" href="https://davidgrzyb.com" class="underline">David Grzyb</a>.
                </footer> -->
        </div>
      </div>

      <!-- AlpineJS -->
      <!-- <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script> -->
      <!-- Font Awesome -->
      <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js" integrity="sha256-KzZiKy0DWYsnwMF+X1DvQngQ2/FxF7MF3Ff72XcpuPs=" crossorigin="anonymous"></script> -->
      <!-- ChartJS -->
      <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" integrity="sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI=" crossorigin="anonymous"></script> -->

      <!-- <script>
            var chartOne = document.getElementById('chartOne');
            var myChart = new Chart(chartOne, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
    
            var chartTwo = document.getElementById('chartTwo');
            var myLineChart = new Chart(chartTwo, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        </script> -->
    </div>

  </div>
</template>

<script setup lang="ts">
// import { store, loading } from "@/main";
import { onBeforeMount, computed, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import Button from "primevue/button";

import MenuIcon from "@assets/icons/menu.svg?raw";
import MenuIcon1 from "@assets/icons/menu2.svg?raw";
import CloseIcon from "@assets/icons/close.svg?raw";
import AddIcon from "@assets/icons/add.svg?raw";

const router = useRouter();
const route = useRoute();

const isOpen = ref(false);

const tabs = [
  {
    name: "Dashboard",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Account",
    to: "/account",
  },
  {
    name: "login",
    to: "/login",
  },
];

// getter = computed() => {}
// const loggedinUser = computed(() => {
//   return (localStorage.getItem('userSession'))
//   // return store.userSession;
// });

onBeforeMount(() => {
  if (!localStorage.getItem("userSession")) {
    router.push("/login");
  }
});

function logout() {
  localStorage.removeItem("userSession");
  router.push("/login");
}
</script>

<style scoped>

/* @import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap'); */
.font-family-ubuntu {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.bg-sidebar {
  background: #476fff;
}
.cta-btn {
  color: #3d68ff;
}
.upgrade-btn {
  background: #1947ee;
}
.upgrade-btn:hover {
  background: #0038fd;
}
/* .active-nav-link {
    background: #1947ee;
  } */
/* .nav-item:hover {
    background: #1947ee;
  } */
.account-link:hover {
  background: #3d68ff;
}
</style>
