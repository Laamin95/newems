<template>
  <div class="p-6 space-y-10">
    <h2 class="text-xl font-semibold text-center">Timeline</h2>

    <!-- Horizontal -->
    <section>
      <h3 class="mb-2 font-medium text-center">Horizontal</h3>
      <Timeline :items="items" direction="horizontal" align="center" :elevation="1" clickable />
    </section>

    <!-- Vertical, both sides (alternate) -->
    <div class="mb-20">
      <h3 class="mb-2 font-medium text-center">Vertical (Both sides, alternate)</h3>
      <Timeline :items="items" direction="vertical" side="both" :alternate="true" :elevation="0" clickable />
    </div>

    <!-- Custom Card Slot -->
    <section>
      <h3 class="mb-2 font-medium text-center">Custom Card Slot</h3>
      <Timeline :items="items" direction="vertical" side="both" :alternate="true" :elevation="1">
        <template #default="{ item, index }">
          <div>
            <div class="timeline-title">#{{ index + 1 }} — {{ item.title }}</div>
            <div v-if="item.time" class="timeline-time">{{ item.time }}</div>
            <div class="timeline-content">Custom slot content: {{ item.content }}</div>
          </div>
        </template>
      </Timeline>
    </section>

    <!-- Vertical, one side (LTR/RTL aware) -->
    <section>
      <h3 class="mb-2 font-medium">Vertical (One side)</h3>
      <Timeline :items="items" direction="vertical" side="one" :elevation="3" clickable condensed />
    </section>

    <!-- Vertical, one side (LTR/RTL aware) -->
    <section dir="rtl">
      <h3 class="mb-2 font-medium">Vertical (One side)</h3>
      <Timeline class="faruma" :rtl="true" :items="dhivehiItems" direction="vertical" side="one" :elevation="1" clickable condensed />
    </section>
  </div>
</template>
<script setup lang="ts">
  import { type TimelineItem, Timeline } from '../../'
  import { ref } from 'vue'

  const items = ref<TimelineItem[]>([
    { id: 1, title: 'Project Kickoff', time: '2025-01-05', content: 'Initial meeting and scope alignment.', status: 'primary' },
    { id: 2, title: 'Design Phase', time: '2025-01-20', content: 'Wireframes and visual design completed.', status: 'info' },
    { id: 3, title: 'Development', time: '2025-02-10', content: 'Core features implemented and tested.', status: 'success' },
    { id: 4, title: 'UAT', time: '2025-03-01', content: 'User acceptance tests and fixes.', status: 'warning' },
    { id: 5, title: 'Launch', time: '2025-03-15', content: 'Production release and monitoring.', status: 'primary' }
  ])

  const dhivehiItems = ref<TimelineItem[]>([
    { id: 1, title: 'ފުރަތަމަ މަރުހަލާ', time: '2025-01-05', content: 'ފުރަތަމަ މަރުހަލާގެ ހިންގިކަންކަން', status: 'success' },
    { id: 2, title: 'ދެވަނަ މަރުހަލާ', time: '2025-01-20', content: 'ދެވަނަ މަރުހަލާގެ ހިންގިކަންކަން', status: 'success' },
    { id: 3, title: 'ތިންވަނަ މަރުހަލާ', time: '2025-02-10', content: 'ތިންވަނަ މަރުހަލާގެ ހިންގިކަންކަން', status: 'success' },
    { id: 4, title: 'ހަތަރުވަނަ މަރުހަލާ', time: '2025-03-01', content: 'ހަތަރުވަނަ މަރުހަލާގެ ހިންގިކަންކަން', status: 'success' },
    { id: 5, title: 'ފަސްވަނަ މަރުހަލާ', time: '2025-03-15', content: 'ފަސްވަނަ މަރުހަލާގެ ހިންގިކަންކަން', status: 'success' }
  ])
</script>
<style scoped></style>
