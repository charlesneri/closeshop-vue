<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import L from 'leaflet'
import logo from '@/assets/img/closeshop-bg.png'

const { mdAndUp } = useDisplay()
const isDesktop = computed(() => mdAndUp.value)

const showSearch = ref(false)
const searchQuery = ref('')
let currentMarker = null

function toggleSearch() {
  showSearch.value = !showSearch.value
}

function navigate(to) {
  console.log(`Navigate to: ${to}`)
}

onMounted(() => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      const map = L.map('map').setView([lat, lng], 13)
      window.mapInstance = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)

      L.marker([lat, lng]).addTo(map).bindPopup('You are here!').openPopup()
    },
    (error) => {
      console.error('Geolocation error:', error)
      alert('Failed to get your location')
    },
  )
})
async function onSearchClick() {
  if (!searchQuery.value) {
    alert('Please enter a location to search.')
    return
  }

  const baseUrl =  'http://localhost:3001/api/search'
  const params = new URLSearchParams({
    q: searchQuery.value,
  })

  const url = `${baseUrl}?q=${encodeURIComponent(searchQuery.value)}`
  console.log('Searching:', url)

  try {
    const response = await fetch(url)
    const results = await response.json()

    if (!results || results.length === 0) {
      alert('Location not found.')
      return
    }

    const lat = parseFloat(results[0].lat)
    const lon = parseFloat(results[0].lon)

    if (window.mapInstance) {
      window.mapInstance.setView([lat, lon], 13)

      if (currentMarker) {
        window.mapInstance.removeLayer(currentMarker)
      }

      currentMarker = L.marker([lat, lon])
        .addTo(window.mapInstance)
        .bindPopup(`Searched: ${results[0].display_name}`)
        .openPopup()
    } else {
      alert('Map not initialized.')
    }
  } catch (error) {
    console.error('Search error:', error)
    alert('Failed to search location.')
  }
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
          v-model="searchQuery"
          @keydown.enter="onSearchClick"
          @click:append-inner="toggleSearch"
        />
        <v-btn small class="mt-2 ml-2" color="primary" @click="onSearchClick"> Search </v-btn>

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
            v-model="searchQuery"
            @keydown.enter="onSearchClick"
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

    <v-main class="pa-4">
      <div id="map" style="height: 400px"></div>
      <!-- Recommended Section -->
      <section class="section-block">
        <h1 class="title-line">Recommended</h1>
        <v-divider class="mydivide" />
        <v-card class="item-holder">
          <v-img class="item-pic" :src="logo" cover />
        </v-card>
      </section>

      <!-- Nearby Stores Section -->
      <section class="section-block">
        <h1 class="title-line">Nearby Stores</h1>
        <v-divider class="mydivide" />
        <v-card class="item-holder">
          <v-img class="item-pic" :src="logo" cover />
        </v-card>
      </section>

      <!-- Featured Sellers Section -->
      <section class="section-block">
        <h1 class="title-line">Featured Sellers on Our Listing</h1>
        <v-divider class="mydivide" />
        <v-card class="item-holder">
          <v-img class="item-pic" :src="logo" cover />
        </v-card>
      </section>
    </v-main>
  </v-app>
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
/*css in the main*/

.title-line {
  font-size: 1.5rem;
  margin-bottom: 8px;
  margin-left: 2%;
}

.mydivide {
  background-color: #000;
  height: 3px;
  width: 50%;
  margin: 0 auto 16px auto;
}

.section-block {
  margin-bottom: 32px;
}

.item-holder {
  max-width: 300px;
  margin: 0 auto;
  padding: 8px;
}

.item-pic {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  border: 1px solid #ccc;
}
</style>
