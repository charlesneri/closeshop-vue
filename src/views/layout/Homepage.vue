<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import logo from '@/assets/img/closeshop-bg.png'

const { mdAndUp } = useDisplay()
const isDesktop = computed(() => mdAndUp.value)

// Show/hide search input
const showSearch = ref(false)

function toggleSearch() {
  showSearch.value = !showSearch.value
}

function navigate(to) {
  console.log(`Navigate to: ${to}`)
}

//website search
const searchQuery = ref('')

function onSearchClick() {
  console.log('Search icon clicked with query:', searchQuery.value)
  // You can add logic here like:
  // searchProducts(searchQuery.value)
}

</script>

<template>
  <v-app>
    <!-- Single App Bar for All Screens -->
    <v-app-bar
      fixed
      elevation="0"
      color="white"
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.12); z-index: 10"
    >
      <template v-if="isDesktop">
        <v-img class="ms-5" max-width="150" :src="logo" cover />
        <v-spacer />
        <v-text-field
          class="web-search-bar"
          append-inner-icon="mdi-magnify"
          placeholder="Search location or item here"
          variant="solo-filled"
          flat
          clearable
          density="comfortable"
          hide-details
          color="primary"
          v-model="searchQuery"
          @click:append-inner="onSearchClick"
        />

        <v-btn text class="nav-web" @click="navigate('home')">Home</v-btn>
        <v-btn text class="nav-web" @click="navigate('cart')">Cart</v-btn>
        <v-btn text class="nav-web" @click="navigate('message')">Message</v-btn>
        <v-btn text class="nav-web" @click="navigate('notification')">Notification</v-btn>

        <v-btn class="ml-4 seller-btn" @click="navigate('seller')">Become a Seller</v-btn>
        <v-btn icon class="ml-4">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-avatar class="ml-2 profile">
          <v-icon>mdi-account-outline</v-icon>
        </v-avatar>
      </template>

      <template v-else>
        <v-img class="ms-3" max-width="100" :src="logo" cover />
        <v-spacer />

        <div class="d-flex align-center" style="gap: 8px">
          <!-- Search Icon -->
          <v-btn icon @click="toggleSearch" v-if="!showSearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <!-- Search Input -->
          <v-text-field
            v-if="showSearch"
            class="search-mobile"
            placeholder="Search Location and item here"
            hide-details
            bg-color="white"
            density="compact"
            flat
            variant="solo-filled"
            autofocus
            append-inner-icon="mdi-close"
            @click:append-inner="toggleSearch"
          />

          <!-- Other icons -->
          <v-btn icon @click="navigate('home')"><v-icon>mdi-web</v-icon></v-btn>
          <v-btn icon @click="navigate('message')"><v-icon>mdi-chat-outline</v-icon></v-btn>
          <v-btn icon @click="navigate('notification')"><v-icon>mdi-bell</v-icon></v-btn>
        </div>
      </template>
    </v-app-bar>

    <!-- Main Content with padding to avoid bar overlap -->
    <div class="maindiv" :style="{ marginTop: isDesktop ? '64px' : '56px' }">
      <!-- Page content goes here -->
    </div>

    <!-- Mobile Bottom Navigation -->
    <v-bottom-navigation v-if="!isDesktop" grow>
      <v-btn @click="navigate('home')" prepend-icon="mdi-home">Home</v-btn>
      <v-btn @click="navigate('cart')" prepend-icon="mdi-cart">Cart</v-btn>
      <v-btn @click="navigate('me')" prepend-icon="mdi-account">Me</v-btn>
    </v-bottom-navigation>
  </v-app>

  <v-main> </v-main>
</template>
<style scoped>
.nav-web {
  margin-left: 15px;
  text-transform: capitalize;
}

.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.seller-btn {
  background-color: #3d79b6;
  color: white;
  border-radius: 20px;
}

.profile {
  border: 1px solid black;
}

/* For the mobile search input to overlay properly */
.search-mobile {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  background-color: white;
  padding: 0 16px;
}
.search-mobile {
  max-width: 350px;
  min-width: 100px;
  margin-top: 10px;
}
</style>
