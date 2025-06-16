<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import logo from '@/assets/img/closeshop-bg.png'

// Vuetify Composition API hook to detect screen size
const { mdAndUp } = useDisplay()
const isDesktop = computed(() => mdAndUp.value)

function navigate(to) {
  console.log(`Navigate to: ${to}`)
  // Add your router logic if needed
}
</script>

<template>
  <v-app>
    <div class="maindiv">
      <!-- Desktop Navigation -->
      <v-app-bar
        v-show="isDesktop"
        class="web-layout"
        elevation="0"
        color="white"
        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
      >
        <v-img class="ms-5" max-width="150" :src="logo" cover />
        <v-spacer />

        <!-- Navigation Buttons -->
        <v-btn text class="nav-web" @click="navigate('home')">Home</v-btn>
        <v-btn text class="nav-web" @click="navigate('cart')">Cart</v-btn>
        <v-btn text class="nav-web" @click="navigate('message')">Message</v-btn>
        <v-btn text class="nav-web" @click="navigate('notification')">Notification</v-btn>

        <v-btn  class="ml-4 seller-btn" @click="navigate('seller')">Become a Seller</v-btn>

        <v-btn icon class="ml-4">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-avatar class="ml-2">
          <v-icon>mdi-account-outline</v-icon>
        </v-avatar>
      </v-app-bar>

      <!-- Mobile Top Bar -->
      <v-app-bar v-show="!isDesktop" class="mobile-view" color="white" flat>
        <v-img class="ms-3" max-width="120" :src="logo" cover />
        <v-spacer />

        <v-btn icon @click="navigate('search')">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon @click="navigate('home')">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon @click="navigate('message')">
          <v-icon>mdi-chat-outline</v-icon>
        </v-btn>
        <v-btn icon @click="navigate('notification')">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Mobile Bottom Navigation -->
      <v-bottom-navigation v-show="!isDesktop" grow>
        <v-btn @click="navigate('home')" prepend-icon="mdi-home">Home</v-btn>
        <v-btn @click="navigate('cart')" prepend-icon="mdi-cart">Cart</v-btn>
        <v-btn @click="navigate('me')" prepend-icon="mdi-account">Me</v-btn>
      </v-bottom-navigation>
    </div>
  </v-app>
</template>

<style scoped>
.nav-web {
  margin-left: 15px;
  text-transform: capitalize;
}

.mobile-view {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.seller-btn {
    background-color: #3D79B6;
    color:white;
    border-radius: 20px;
}

</style>
