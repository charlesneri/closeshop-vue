<script setup>
import { ref } from 'vue'

const form = ref(false)
const email = ref(null)
const password = ref(null)
const loading = ref(false)

function onSubmit() {
  if (!form.value) return
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}
function required(v) {
  return !!v || 'Field is required'
}


//for map
import { onMounted } from 'vue';
import L from 'leaflet';

onMounted(() => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Create map
    const map = L.map('map').setView([lat, lng], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add marker
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup('You are here!')
      .openPopup();
  }, (error) => {
    console.error('Geolocation error:', error);
    alert('Failed to get your location');
  });
});
</script>

<template>
  <v-sheet class="pa-12 bg-main" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          clearable
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>


     <div id="map" style="height: 400px;"></div>
  </v-sheet>
</template>
<style scoped>
.bg-main {
  background-color: #deeff5;
}
</style>
