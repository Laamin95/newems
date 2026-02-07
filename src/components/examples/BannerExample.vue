<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Banner Components</h2>

    <!-- Controls -->
    <Card title="Banner Controls">
      <div class="space-y-4">
        <div class="flex gap-2 flex-wrap">
          <Button @click="showDefault = true" color="gray" size="sm">Show Default</Button>
          <Button @click="showInfo = true" color="info" size="sm">Show Info</Button>
          <Button @click="showSuccess = true" color="success" size="sm">Show Success</Button>
          <Button @click="showWarning = true" color="warning" size="sm">Show Warning</Button>
          <Button @click="showError = true" color="danger" size="sm">Show Error</Button>
        </div>
      </div>
    </Card>

    <!-- Banner Examples -->
    <div class="space-y-4">
      <!-- Default Banner -->
      <Banner
        v-model="showDefault"
        title="Default Banner"
        message="This is a default banner message."
        sticky
      />

      <!-- Info Banner -->
      <Banner
        v-model="showInfo"
        variant="info"
        icon="info"
        title="Information"
        message="This is an informational banner with an icon."
        sticky
      />

      <!-- Success Banner -->
      <Banner
        v-model="showSuccess"
        variant="success"
        icon="success"
        title="Success!"
        message="Your action was completed successfully."
        :timeout="5000"
        show-progress
        sticky
      />

      <!-- Warning Banner -->
      <Banner
        v-model="showWarning"
        variant="warning"
        icon="warning"
        title="Warning"
        message="Please review the following information carefully."
        outlined
        sticky
      />

      <!-- Error Banner -->
      <Banner
        v-model="showError"
        variant="error"
        icon="error"
        title="Error"
        message="An error occurred. Please try again."
        sticky
      />
    </div>

    <!-- More Examples -->
    <Card title="Banner Variants">
      <div class="space-y-6">
        <!-- With Actions -->
        <Banner
          v-model="bannerWithActions"
          variant="info"
          icon="info"
          title="Update Available"
          message="A new version is available. Update now to get the latest features."
        >
          <template #actions>
            <Button size="sm" variant="text" color="info" @click="bannerWithActions = false">
              Dismiss
            </Button>
            <Button size="sm" color="info" @click="handleUpdate">
              Update Now
            </Button>
          </template>
        </Banner>

        <!-- Dense Banner -->
        <Banner
          v-model="denseBanner"
          variant="success"
          icon="success"
          message="Dense banner with compact spacing"
          dense
        />

        <!-- With Custom Content -->
        <Banner
          v-model="customBanner"
          variant="warning"
        >
          <template #title>
            <div class="flex items-center gap-2">
              <span class="text-2xl">⚠️</span>
              <span>Custom Banner Content</span>
            </div>
          </template>
          <template #default>
            <p>You can use slots to fully customize the banner content.</p>
            <ul class="list-disc list-inside mt-2 text-sm">
              <li>Custom icons</li>
              <li>Rich content</li>
              <li>Any HTML structure</li>
            </ul>
          </template>
        </Banner>

        <!-- Auto-dismiss with Progress -->
        <Banner
          v-model="autoDismiss"
          variant="success"
          icon="success"
          title="Auto Dismiss"
          message="This banner will automatically dismiss in 10 seconds."
          :timeout="10000"
          show-progress
        />

        <!-- Bottom Position -->
        <Banner
          v-model="bottomBanner"
          variant="info"
          icon="info"
          title="Bottom Banner"
          message="This banner is positioned at the bottom."
          position="bottom"
          sticky
        />

        <!-- Rounded -->
        <Banner
          v-model="roundedBanner"
          variant="error"
          icon="error"
          title="Rounded Banner"
          message="This banner has rounded corners."
          rounded="lg"
        />

        <!-- Not Closeable -->
        <Banner
          v-model="notCloseable"
          variant="warning"
          icon="warning"
          title="Important Notice"
          message="This banner cannot be closed by the user."
          :closeable="false"
        />
      </div>

      <div class="mt-6 flex gap-2 flex-wrap">
        <Button @click="showAllBanners" size="sm">Show All Banners</Button>
        <Button @click="hideAllBanners" variant="outlined" size="sm">Hide All Banners</Button>
      </div>
    </Card>

    <!-- API Reference -->
    <Card title="API Reference">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="border-b">
            <tr>
              <th class="text-left p-2">Prop</th>
              <th class="text-left p-2">Type</th>
              <th class="text-left p-2">Default</th>
              <th class="text-left p-2">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr>
              <td class="p-2 font-mono">v-model</td>
              <td class="p-2">Boolean</td>
              <td class="p-2">true</td>
              <td class="p-2">Controls banner visibility</td>
            </tr>
            <tr>
              <td class="p-2 font-mono">variant</td>
              <td class="p-2">String</td>
              <td class="p-2">'default'</td>
              <td class="p-2">default | info | success | warning | error</td>
            </tr>
            <tr>
              <td class="p-2 font-mono">icon</td>
              <td class="p-2">String</td>
              <td class="p-2">''</td>
              <td class="p-2">Icon to display (info, success, warning, error)</td>
            </tr>
            <tr>
              <td class="p-2 font-mono">timeout</td>
              <td class="p-2">Number</td>
              <td class="p-2">0</td>
              <td class="p-2">Auto-dismiss after X ms (0 = disabled)</td>
            </tr>
            <tr>
              <td class="p-2 font-mono">sticky</td>
              <td class="p-2">Boolean</td>
              <td class="p-2">false</td>
              <td class="p-2">Stick to top/bottom of viewport</td>
            </tr>
            <tr>
              <td class="p-2 font-mono">position</td>
              <td class="p-2">String</td>
              <td class="p-2">'top'</td>
              <td class="p-2">Position when sticky (top | bottom)</td>
            </tr>
            <tr>
              <td class="p-2 font-mono">showProgress</td>
              <td class="p-2">Boolean</td>
              <td class="p-2">false</td>
              <td class="p-2">Show progress bar for auto-dismiss</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Banner } from '../../'

const showDefault = ref(true)
const showInfo = ref(true)
const showSuccess = ref(true)
const showWarning = ref(true)
const showError = ref(true)
const bannerWithActions = ref(true)
const denseBanner = ref(true)
const customBanner = ref(true)
const autoDismiss = ref(true)
const bottomBanner = ref(false)
const roundedBanner = ref(true)
const notCloseable = ref(true)

const handleUpdate = () => {
  alert('Update initiated!')
  bannerWithActions.value = false
}

const showAllBanners = () => {
  showDefault.value = true
  showInfo.value = true
  showSuccess.value = true
  showWarning.value = true
  showError.value = true
  bannerWithActions.value = true
  denseBanner.value = true
  customBanner.value = true
  autoDismiss.value = true
  bottomBanner.value = true
  roundedBanner.value = true
  notCloseable.value = true
}

const hideAllBanners = () => {
  showDefault.value = false
  showInfo.value = false
  showSuccess.value = false
  showWarning.value = false
  showError.value = false
  bannerWithActions.value = false
  denseBanner.value = false
  customBanner.value = false
  autoDismiss.value = false
  bottomBanner.value = false
  roundedBanner.value = false
  notCloseable.value = false
}
</script>