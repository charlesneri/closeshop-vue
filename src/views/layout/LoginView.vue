<script setup>
import { ref } from 'vue'
import logo from '@/assets/img/closeshop-bg.png' // Explicit import

const visible = ref(false)
const failedAttempts = ref(0)

function handleLogin() {
  // Simulate failed login (replace this with real login logic)
  const isLoginSuccessful = false

  if (!isLoginSuccessful) {
    failedAttempts.value++
  }
}
</script>

<template>
  <v-app
    ><v-main class="color-background">
      <v-container fluid class="fill-height d-flex justify-center align-center">
        <v-row justify="center" class="w-100">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="pa-6 pb-8 border-card" rounded="lg">
              <v-img class="mx-auto my-6" max-width="228" :src="logo" cover />

              <h1 class="text-center text-h5 text-md-h4 pb-5">Login</h1>

              <div class="text-subtitle-1 text-medium-emphasis">Account</div>

              <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
              />

              <div
                class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
              >
                Password
                <a
                  class="text-caption text-decoration-none text-blue"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Forgot login password?
                </a>
              </div>

              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              />

              <v-card
                v-if="failedAttempts > 0 && failedAttempts <= 3"
                class="mb-6"
                color="surface-variant"
                variant="tonal"
              >
                <v-card-text class="text-medium-emphasis text-caption">
                  Warning: After 3 consecutive failed login attempts, your account will be
                  temporarily locked for three hours. If you must login now, click "Forgot login
                  password?" to reset.
                </v-card-text>
              </v-card>

              <v-btn
                class="mb-6 btn-color"
                size="large"
                variant="tonal"
                block
                @click="handleLogin"
              >
                Log In
              </v-btn>

              <v-card-text class="text-center">
                <a
                  class="text-blue text-decoration-none"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sign up now <v-icon icon="mdi-chevron-right" />
                </a>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container> </v-main>

  <v-footer
    class="d-none d-md-flex justify-center pa-4 bg-footer"
    app
  >
    <span class="white--text">© 2025 CloseShop. All rights reserved.</span>
  </v-footer>


  </v-app>
</template>

<style scoped>
.color-background {
  background-color: #deeff5;
}
h1{
    color: #3D79B6;
    font-weight: bolder;
}
.btn-color{
    background-color: #3D79B6;
    color: white;
}
.border-card{
    border-right: #3D79B6 solid 5px;
    border-bottom: #3D79B6 solid 5px;
}

.bg-footer {
  background-color: #EFF0F2;
}
/* Optional: custom mobile tweaks */
@media (max-width: 600px) {
  h1 {
    font-size: 1.6rem !important;
  }
}
</style>
