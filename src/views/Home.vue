<template>
  <div class="w-full p-6 bg-transparent">
    <h1>Home</h1>
    <p>Welcome to your Vue app!</p>
  </div>

    <InputText 
      v-model="inputValue"
      label="Your Label"
      placeholder="Enter text..."
      :disabled="false" 
    />
    <Select
        v-model="selectedValue"
        label="Select an option"
        :items="options"
        item-title="title"
        item-value="value"
        :searchable="true"
        :multiple="true"
        :margin="'mt-4'"
    />

    <DatePicker 
      v-model="dateRange"
      label="Select a date"
      :disabled="false"
      
      :margin="'mt-4'"
    />
    <!-- <VueDatePicker v-model="dateRange" range /> -->
         <Checkbox 
      v-model="agree" 
      label="I agree to the privacy policy"
      :required="true"
      :error="!agree ? 'You must agree to continue' : false"
      margin="mt-4"
    />

    <Radio
        v-model="selectedPlan"
        :items="plans"
        item-label="name"
        item-value="id"
        group-label="Select a plan"
        inline
    />
    <!-- <RadioGroup
        v-model="selectedPlan"
        :items="['Option 1', 'Option 2', 'Option 3']"
        label="Choose an option"
    /> -->

    <!-- <SwitchExample /> -->

    <Tab
        v-model="activeTab10"
        :tabs="tabsData"
        variant="enclosed"
        vertical
    >
        <template #content-0><p>Long Content</p></template>
        <template #content-1><p>Short content.</p></template>
        <template #content-2><p>Different content.</p></template>
    </Tab>

</template>

<script setup>
    import { ref } from 'vue'
    import InputText from '@/components/fields/InputText.vue'
    import Select from '@/components/fields/Select.vue'
    import DatePicker from '@/components/fields/DatePicker.vue'
    import { VueDatePicker } from '@vuepic/vue-datepicker'
    import Checkbox from '@/components/fields/Checkbox.vue'
    import Radio from '@/components/buttons/radio/Radio.vue'
    import SwitchExample from '@/components/examples/SwitchExample.vue'
    import Tab from '@/components/Tab.vue'
    // import RadioGroup from '@/components/buttons/radio/RadioGroup.vue'

    const plans = ref([
      { id: 'basic', name: 'Basic Plan', },
      { id: 'pro', name: 'Pro Plan' },
      { id: 'enterprise', name: 'Enterprise Plan' },
    ])

    const tabsData = [
        { label: 'Dashboard' },
        { label: 'Settings' },
        { label: 'Profile' }
    ]

    const selectedPlan = ref(null)
    const activeTab10 = ref(0)

    const inputValue = ref('');
    const selectedValue = ref([]);
    const dateRange = ref(null);
    const options = ref([
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
      { value: 'option3', title: 'Option 3' },
    ]);
    const agree = ref(false);
</script>
