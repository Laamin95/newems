<template>
  <div class="p-6 max-w-6xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold ui-text-color mb-6">Pagination Component</h1>

    <!-- Basic Pagination -->
    <Card title="Basic Pagination">
      <p class="text-sm text-ui-text-secondary mb-4">
        Simple pagination with page numbers.
      </p>
      <Pagination
        v-model="basicPage"
        :total-pages="10"
        @change="handlePageChange"
      />
      <p class="text-xs text-ui-text-secondary mt-4">Current page: {{ basicPage }}</p>
    </Card>

    <!-- With First/Last Buttons -->
    <Card title="With First/Last Buttons">
      <p class="text-sm text-ui-text-secondary mb-4">
        Include buttons to jump to first and last pages.
      </p>
      <Pagination
        v-model="firstLastPage"
        :total-pages="20"
        :show-first-last="true"
        @change="handlePageChange"
      />
    </Card>

    <!-- Sizes -->
    <Card title="Sizes">
      <p class="text-sm text-ui-text-secondary mb-4">
        Available in three different sizes.
      </p>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Small:</p>
          <Pagination v-model="sizePage" :total-pages="10" size="sm" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Medium (default):</p>
          <Pagination v-model="sizePage" :total-pages="10" size="md" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Large:</p>
          <Pagination v-model="sizePage" :total-pages="10" size="lg" />
        </div>
      </div>
    </Card>

    <!-- Variants -->
    <Card title="Variants">
      <p class="text-sm text-ui-text-secondary mb-4">
        Different visual styles.
      </p>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Default:</p>
          <Pagination v-model="variantPage" :total-pages="10" variant="default" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Primary:</p>
          <Pagination v-model="variantPage" :total-pages="10" variant="primary" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Outline:</p>
          <Pagination v-model="variantPage" :total-pages="10" variant="outline" />
        </div>
      </div>
    </Card>

    <!-- With Page Info -->
    <Card title="With Page Information">
      <p class="text-sm text-ui-text-secondary mb-4">
        Display current page and total pages.
      </p>
      <Pagination
        v-model="infoPage"
        :total-pages="15"
        :show-page-info="true"
        :show-first-last="true"
      />
    </Card>

    <!-- With Total Items -->
    <Card title="With Total Items Information">
      <p class="text-sm text-ui-text-secondary mb-4">
        Display item range and total items.
      </p>
      <Pagination
        v-model="itemsPage"
        :total-pages="20"
        :total-items="200"
        :per-page="10"
        :show-total-info="true"
        :show-first-last="true"
      />
    </Card>

    <!-- Text Buttons -->
    <Card title="Text Navigation Buttons">
      <p class="text-sm text-ui-text-secondary mb-4">
        Use text instead of icons for navigation.
      </p>
      <Pagination
        v-model="textPage"
        :total-pages="10"
        :show-first-last="true"
        prev-text="Previous"
        next-text="Next"
        first-text="First"
        last-text="Last"
      />
    </Card>

    <!-- Long Pagination -->
    <Card title="Many Pages">
      <p class="text-sm text-ui-text-secondary mb-4">
        Pagination with many pages uses ellipsis.
      </p>
      <Pagination
        v-model="longPage"
        :total-pages="100"
        :show-first-last="true"
        :show-page-info="true"
        :max-visible-pages="7"
      />
    </Card>

    <!-- Without Rounded -->
    <Card title="Without Rounded Corners">
      <p class="text-sm text-ui-text-secondary mb-4">
        Square buttons without rounded corners.
      </p>
      <Pagination
        v-model="squarePage"
        :total-pages="10"
        :rounded="false"
      />
    </Card>

    <!-- Disabled State -->
    <Card title="Disabled State">
      <p class="text-sm text-ui-text-secondary mb-4">
        Pagination in disabled state.
      </p>
      <Pagination
        v-model="disabledPage"
        :total-pages="10"
        :disabled="true"
        :show-first-last="true"
      />
    </Card>

    <!-- Controlled Pagination -->
    <Card title="Controlled Pagination">
      <p class="text-sm text-ui-text-secondary mb-4">
        Control pagination programmatically with buttons.
      </p>
      <Pagination
        ref="controlledPagination"
        v-model="controlledPage"
        :total-pages="20"
        :show-first-last="true"
        :show-page-info="true"
      />
      <div class="flex gap-2 mt-4">
        <button
          @click="goToFirstPage"
          class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
        >
          First
        </button>
        <button
          @click="goToPreviousPage"
          class="px-4 py-2 text-sm bg-secondary text-white rounded hover:bg-secondary/90"
        >
          Previous
        </button>
        <button
          @click="goToRandomPage"
          class="px-4 py-2 text-sm bg-info text-white rounded hover:bg-info/90"
        >
          Random
        </button>
        <button
          @click="goToNextPage"
          class="px-4 py-2 text-sm bg-secondary text-white rounded hover:bg-secondary/90"
        >
          Next
        </button>
        <button
          @click="goToLastPage"
          class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
        >
          Last
        </button>
      </div>
    </Card>

    <!-- Complete Example -->
    <Card title="Complete Example with Table">
      <p class="text-sm text-ui-text-secondary mb-4">
        Pagination with a data table.
      </p>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm border border-color rounded-lg overflow-hidden">
          <thead class="bg-color-1">
            <tr>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">ID</th>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Name</th>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Email</th>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Role</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color bg-color-2">
            <tr v-for="item in paginatedData" :key="item.id">
              <td class="p-3 text-ui-text-secondary">{{ item.id }}</td>
              <td class="p-3 ui-text-color">{{ item.name }}</td>
              <td class="p-3 text-ui-text-secondary">{{ item.email }}</td>
              <td class="p-3">
                <span class="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  {{ item.role }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-ui-text-secondary">
          Showing {{ startItem }} to {{ endItem }} of {{ tableData.length }} entries
        </div>
        <Pagination
          v-model="tablePage"
          :total-pages="totalTablePages"
          :total-items="tableData.length"
          :per-page="itemsPerPage"
          :show-first-last="true"
        />
      </div>
    </Card>

    <!-- Event Log -->
    <Card title="Event Log">
      <div class="bg-color-1 rounded-md p-4 h-32 overflow-y-auto border border-color scrollbar-thin">
        <div v-if="eventLog.length === 0" class="text-ui-text-secondary text-sm">
          Click pagination buttons to see events...
        </div>
        <div v-for="(log, i) in eventLog" :key="i" class="text-xs text-ui-text-secondary mb-1 font-mono">
          {{ log }}
        </div>
      </div>
      <button
        @click="eventLog = []"
        class="mt-4 px-4 py-2 text-sm bg-slate-500 text-white rounded hover:bg-slate-600"
      >
        Clear Log
      </button>
    </Card>

    <!-- API Reference -->
    <Card title="API Reference">
      <div class="space-y-6">
        <!-- Props Table -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Props:</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs border border-color rounded-lg overflow-hidden">
              <thead class="bg-color-1">
                <tr>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Prop</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Type</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Default</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-color bg-color-2">
                <tr>
                  <td class="p-3 font-mono text-primary">modelValue</td>
                  <td class="p-3 text-ui-text-secondary">Number</td>
                  <td class="p-3 text-ui-text-secondary">1</td>
                  <td class="p-3 text-ui-text-secondary">Current page (v-model)</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">totalPages</td>
                  <td class="p-3 text-ui-text-secondary">Number</td>
                  <td class="p-3 text-ui-text-secondary">required</td>
                  <td class="p-3 text-ui-text-secondary">Total number of pages</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">totalItems</td>
                  <td class="p-3 text-ui-text-secondary">Number</td>
                  <td class="p-3 text-ui-text-secondary">0</td>
                  <td class="p-3 text-ui-text-secondary">Total number of items</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">perPage</td>
                  <td class="p-3 text-ui-text-secondary">Number</td>
                  <td class="p-3 text-ui-text-secondary">10</td>
                  <td class="p-3 text-ui-text-secondary">Items per page</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">size</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'md'</td>
                  <td class="p-3 text-ui-text-secondary">sm | md | lg</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">variant</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'default'</td>
                  <td class="p-3 text-ui-text-secondary">default | primary | outline</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">showPrevNext</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">true</td>
                  <td class="p-3 text-ui-text-secondary">Show prev/next buttons</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">showFirstLast</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Show first/last buttons</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">showPageInfo</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Show page info text</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">showTotalInfo</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Show item range info</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">disabled</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Disable pagination</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Events -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Events:</h3>
          <div class="space-y-2 text-sm">
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">@change</code>
              <p class="text-xs text-ui-text-secondary mt-1">Emitted when page changes</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">@page-change</code>
              <p class="text-xs text-ui-text-secondary mt-1">Alias for @change</p>
            </div>
          </div>
        </div>

        <!-- Methods -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Exposed Methods:</h3>
          <div class="space-y-2 text-sm">
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">goToPage(page)</code>
              <p class="text-xs text-ui-text-secondary mt-1">Navigate to specific page</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">previousPage()</code>
              <p class="text-xs text-ui-text-secondary mt-1">Go to previous page</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">nextPage()</code>
              <p class="text-xs text-ui-text-secondary mt-1">Go to next page</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">firstPage()</code>
              <p class="text-xs text-ui-text-secondary mt-1">Go to first page</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">lastPage()</code>
              <p class="text-xs text-ui-text-secondary mt-1">Go to last page</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Pagination } from '../../'

const eventLog = ref([])

// Basic pagination
const basicPage = ref(1)
const firstLastPage = ref(1)
const sizePage = ref(1)
const variantPage = ref(1)
const infoPage = ref(1)
const itemsPage = ref(1)
const textPage = ref(1)
const longPage = ref(50)
const squarePage = ref(1)
const disabledPage = ref(5)
const controlledPage = ref(1)

// Controlled pagination
const controlledPagination = ref(null)

// Table data
const tablePage = ref(1)
const itemsPerPage = 5

const tableData = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Editor', 'Viewer'][i % 4]
}))

const totalTablePages = computed(() => Math.ceil(tableData.length / itemsPerPage))

const paginatedData = computed(() => {
  const start = (tablePage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return tableData.slice(start, end)
})

const startItem = computed(() => {
  return (tablePage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
  const end = tablePage.value * itemsPerPage
  return end > tableData.length ? tableData.length : end
})

// Event handlers
function handlePageChange(page) {
  addLog(`Page changed to: ${page}`)
}

// Controlled pagination methods
function goToFirstPage() {
  controlledPagination.value?.firstPage()
}

function goToPreviousPage() {
  controlledPagination.value?.previousPage()
}

function goToNextPage() {
  controlledPagination.value?.nextPage()
}

function goToLastPage() {
  controlledPagination.value?.lastPage()
}

function goToRandomPage() {
  const randomPage = Math.floor(Math.random() * 20) + 1
  controlledPagination.value?.goToPage(randomPage)
}

function addLog(message) {
  eventLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  if (eventLog.value.length > 20) {
    eventLog.value.pop()
  }
}
</script>