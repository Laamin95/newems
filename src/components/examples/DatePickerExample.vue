<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">DatePicker Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="max-w-md space-y-4">
        <DatePicker v-model="basicDate" placeholder="Select a date" />
        <DatePicker v-model="basicWithLabel" label="Date of Birth" placeholder="Choose your birthday" />
        <DatePicker v-model="basicPreset" label="Pre-selected Date" />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: {{ basicDate }}, {{ basicWithLabel }}, {{ basicPreset }}
      </div>
    </section>

    <!-- Date Formats -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Date Formats</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="formatDefault" 
          label="Default (YYYY-MM-DD)" 
          format="YYYY-MM-DD"
        />
        <DatePicker 
          v-model="formatUS" 
          label="US Format (MM/DD/YYYY)" 
          format="MM/DD/YYYY"
        />
        <DatePicker 
          v-model="formatEU" 
          label="EU Format (DD/MM/YYYY)" 
          format="DD/MM/YYYY"
        />
        <DatePicker 
          v-model="formatLong" 
          label="Long Format" 
          format="MMMM D, YYYY"
        />
        <DatePicker 
          v-model="formatShort" 
          label="Short Format" 
          format="MMM D, YY"
        />
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="max-w-md space-y-4">
        <DatePicker v-model="sizeXs" size="xs" label="Extra Small" placeholder="XS size" />
        <DatePicker v-model="sizeSm" size="sm" label="Small" placeholder="SM size" />
        <DatePicker v-model="sizeMd" size="md" label="Medium (Default)" placeholder="MD size" />
        <DatePicker v-model="sizeLg" size="lg" label="Large" placeholder="LG size" />
        <DatePicker v-model="sizeXl" size="xl" label="Extra Large" placeholder="XL size" />
      </div>
    </section>

    <!-- With Icons -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Icons</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="iconLeft" 
          label="Left Icon (Default)" 
          placeholder="Select date"
          prepend-icon="calendar"
        />
        <DatePicker 
          v-model="iconRight" 
          label="Right Icon" 
          placeholder="Select date"
          append-icon="calendar-days"
        />
        <DatePicker 
          v-model="iconCustom" 
          label="Custom Icon" 
          placeholder="Event date"
          prepend-icon="clock"
        />
      </div>
    </section>

    <!-- Date Range Selection -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Date Range Selection</h2>
      <div class="max-w-lg space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <DatePicker 
            v-model="rangeStart" 
            label="Start Date" 
            placeholder="From"
            :max-date="rangeEnd"
          />
          <DatePicker 
            v-model="rangeEnd" 
            label="End Date" 
            placeholder="To"
            :min-date="rangeStart"
          />
        </div>
        <DatePicker 
          v-model="rangeValue" 
          label="Date Range Picker" 
          placeholder="Select date range"
          range
        />
      </div>
      <div class="text-sm ui-text-secondary">
        Range: {{ rangeStart }} - {{ rangeEnd }}
      </div>
    </section>

    <!-- Min/Max Date Constraints -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Min/Max Date Constraints</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="minDate" 
          label="Future Dates Only" 
          placeholder="Select a future date"
          :min-date="today"
          hint="Cannot select past dates"
        />
        <DatePicker 
          v-model="maxDate" 
          label="Past Dates Only" 
          placeholder="Select a past date"
          :max-date="today"
          hint="Cannot select future dates"
        />
        <DatePicker 
          v-model="constrainedDate" 
          label="Within 30 Days" 
          placeholder="Select within range"
          :min-date="thirtyDaysAgo"
          :max-date="thirtyDaysAhead"
          hint="Only dates within 30 days of today"
        />
      </div>
    </section>

    <!-- Disabled Dates -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Disabled Dates</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="noWeekends" 
          label="No Weekends" 
          placeholder="Weekdays only"
          :disabled-dates="isWeekend"
          hint="Saturdays and Sundays are disabled"
        />
        <DatePicker 
          v-model="noHolidays" 
          label="No Holidays" 
          placeholder="Business days only"
          :disabled-dates="isHoliday"
          hint="Major holidays are disabled"
        />
        <DatePicker 
          v-model="specificDates" 
          label="Specific Dates Disabled" 
          placeholder="Some dates unavailable"
          :disabled-dates="disabledSpecificDates"
        />
      </div>
    </section>

    <!-- Multiple Dates -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Multiple Dates Selection</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="multipleDates" 
          label="Select Multiple Dates" 
          placeholder="Click to add dates"
          multiple
          :max-selections="5"
          hint="Select up to 5 dates"
        />
        <div v-if="multipleDates.length" class="flex flex-wrap gap-2">
          <span 
            v-for="(date, index) in multipleDates" 
            :key="index"
            class="px-2 py-1 bg-primary/10 text-primary rounded text-sm flex items-center gap-1"
          >
            {{ formatDisplayDate(date) }}
            <button 
              class="hover:text-primary/70"
              @click="removeDate(index)"
            >×</button>
          </span>
        </div>
      </div>
    </section>

    <!-- With Description & Hint -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Description & Hint</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="descDate" 
          label="Appointment Date" 
          placeholder="Choose a date"
          description="Select your preferred appointment date"
        />
        <DatePicker 
          v-model="hintDate" 
          label="Delivery Date" 
          placeholder="Expected delivery"
          hint="Usually 3-5 business days"
        />
        <DatePicker 
          v-model="bothDescHint" 
          label="Event Date" 
          placeholder="Select event date"
          description="When should the event take place?"
          hint="Must be at least 2 weeks in advance"
        />
      </div>
    </section>

    <!-- Validation States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Validation States</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="errorDate" 
          label="Required Date" 
          placeholder="This field is required"
          :required="true"
          :error="!errorDate ? 'Please select a date' : ''"
        />
        <DatePicker 
          v-model="successDate" 
          label="Confirmed Date" 
          placeholder="Date confirmed"
          :success="successDate ? 'Date is available!' : ''"
        />
        <DatePicker 
          v-model="warningDate" 
          label="Preferred Date" 
          placeholder="Select date"
          :warning="warningDate ? 'This date may have limited availability' : ''"
        />
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="disabledDate" 
          label="Disabled" 
          placeholder="Cannot select"
          :disabled="true"
        />
        <DatePicker 
          v-model="readonlyDate" 
          label="Readonly" 
          :readonly="true"
        />
        <DatePicker 
          v-model="loadingDate" 
          label="Loading" 
          placeholder="Fetching available dates..."
          :loading="true"
        />
        <DatePicker 
          v-model="clearableDate" 
          label="Clearable" 
          placeholder="Select and clear"
          clearable
        />
      </div>
    </section>

    <!-- Rounded Variants -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rounded Variants</h2>
      <div class="max-w-md space-y-4">
        <DatePicker v-model="roundedNone" label="None" placeholder="No rounding" rounded="none" />
        <DatePicker v-model="roundedSm" label="Small" placeholder="Small rounding" rounded="sm" />
        <DatePicker v-model="roundedMd" label="Medium" placeholder="Medium rounding" rounded="md" />
        <DatePicker v-model="roundedLg" label="Large" placeholder="Large rounding" rounded="lg" />
        <DatePicker v-model="roundedFull" label="Full" placeholder="Full rounding" rounded="full" />
      </div>
    </section>

    <!-- Month/Year Picker -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Month/Year Picker</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="monthOnly" 
          label="Month Picker" 
          placeholder="Select month"
          mode="month"
          format="MMMM YYYY"
        />
        <DatePicker 
          v-model="yearOnly" 
          label="Year Picker" 
          placeholder="Select year"
          mode="year"
          format="YYYY"
        />
        <DatePicker 
          v-model="quarterPicker" 
          label="Quarter Picker" 
          placeholder="Select quarter"
          mode="quarter"
          format="[Q]Q YYYY"
        />
      </div>
    </section>

    <!-- Time Selection -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Date & Time Selection</h2>
      <div class="max-w-md space-y-4">
        <DatePicker 
          v-model="dateTime" 
          label="Date & Time" 
          placeholder="Select date and time"
          enable-time
          format="YYYY-MM-DD HH:mm"
        />
        <DatePicker 
          v-model="dateTime12h" 
          label="12-Hour Format" 
          placeholder="Select date and time"
          enable-time
          :time-24hr="false"
          format="MM/DD/YYYY hh:mm A"
        />
        <DatePicker 
          v-model="timeOnly" 
          label="Time Only" 
          placeholder="Select time"
          mode="time"
          format="HH:mm"
        />
      </div>
    </section>

    <!-- Inline Calendar -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Inline Calendar</h2>
      <div class="max-w-md">
        <DatePicker 
          v-model="inlineDate" 
          label="Inline Mode" 
          inline
        />
        <div class="mt-2 text-sm ui-text-secondary">
          Selected: {{ inlineDate || 'None' }}
        </div>
      </div>
    </section>

    <!-- Booking Form Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Booking Form Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Book Your Stay</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <DatePicker 
              v-model="bookingCheckIn" 
              label="Check-in" 
              placeholder="Arrival date"
              prepend-icon="calendar"
              :min-date="today"
              :max-date="bookingCheckOut"
            />
            <DatePicker 
              v-model="bookingCheckOut" 
              label="Check-out" 
              placeholder="Departure date"
              prepend-icon="calendar"
              :min-date="bookingCheckIn || today"
            />
          </div>
          <div v-if="bookingCheckIn && bookingCheckOut" class="p-3 bg-primary/10 rounded-lg">
            <p class="text-sm ui-text-primary">
              <span class="font-semibold">{{ calculateNights }} nights</span> 
              · {{ formatDisplayDate(bookingCheckIn) }} - {{ formatDisplayDate(bookingCheckOut) }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium ui-text-primary mb-1">Guests</label>
              <select class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium ui-text-primary mb-1">Rooms</label>
              <select class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary">
                <option>1 Room</option>
                <option>2 Rooms</option>
                <option>3 Rooms</option>
              </select>
            </div>
          </div>
          <button class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Search Availability
          </button>
        </div>
      </div>
    </section>

    <!-- Event Scheduler Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Event Scheduler Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Schedule New Event</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium ui-text-primary mb-1">Event Name</label>
            <input 
              type="text" 
              class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary"
              placeholder="Enter event name"
              v-model="eventName"
            />
          </div>
          <DatePicker 
            v-model="eventDate" 
            label="Event Date" 
            placeholder="Select date"
            :min-date="today"
            prepend-icon="calendar"
          />
          <div class="grid grid-cols-2 gap-4">
            <DatePicker 
              v-model="eventStartTime" 
              label="Start Time" 
              placeholder="Start"
              mode="time"
              format="HH:mm"
            />
            <DatePicker 
              v-model="eventEndTime" 
              label="End Time" 
              placeholder="End"
              mode="time"
              format="HH:mm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium ui-text-primary mb-1">Repeat</label>
            <select class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary">
              <option>Does not repeat</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div class="flex gap-3 pt-2">
            <button class="flex-1 py-2 px-4 border border-color-3 rounded-lg ui-text-primary hover:bg-color-3 transition-colors">
              Cancel
            </button>
            <button class="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Flight Search Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Flight Search Example</h2>
      <div class="max-w-2xl bg-color-2 rounded-xl border border-color-3 p-6">
        <div class="flex items-center gap-4 mb-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="tripType" value="roundtrip" v-model="flightType" class="text-primary" />
            <span class="text-sm ui-text-primary">Round Trip</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="tripType" value="oneway" v-model="flightType" class="text-primary" />
            <span class="text-sm ui-text-primary">One Way</span>
          </label>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium ui-text-primary mb-1">From</label>
            <input 
              type="text" 
              class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary"
              placeholder="Departure city"
            />
          </div>
          <div>
            <label class="block text-sm font-medium ui-text-primary mb-1">To</label>
            <input 
              type="text" 
              class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary"
              placeholder="Arrival city"
            />
          </div>
          <DatePicker 
            v-model="flightDeparture" 
            label="Departure" 
            placeholder="Select date"
            :min-date="today"
            size="sm"
          />
          <DatePicker 
            v-model="flightReturn" 
            label="Return" 
            placeholder="Select date"
            :min-date="flightDeparture || today"
            :disabled="flightType === 'oneway'"
            size="sm"
          />
        </div>
        <button class="w-full mt-4 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Search Flights
        </button>
      </div>
    </section>

    <!-- Birthday Picker Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Birthday Picker Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Personal Information</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium ui-text-primary mb-1">Full Name</label>
            <input 
              type="text" 
              class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary"
              placeholder="Enter your name"
            />
          </div>
          <DatePicker 
            v-model="birthday" 
            label="Date of Birth" 
            placeholder="Select your birthday"
            :max-date="eighteenYearsAgo"
            format="MMMM D, YYYY"
            prepend-icon="cake"
            description="You must be at least 18 years old"
          />
          <div v-if="birthday" class="p-3 bg-color-3/50 rounded-lg">
            <p class="text-sm ui-text-secondary">
              Age: <span class="font-semibold ui-text-primary">{{ calculateAge }} years old</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Appointment Scheduler Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Appointment Scheduler Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">Schedule Appointment</h3>
          <p class="text-sm ui-text-secondary">Select an available date and time</p>
        </div>
        <div class="p-4 space-y-4">
          <DatePicker 
            v-model="appointmentDate" 
            label="Select Date" 
            placeholder="Choose a date"
            :min-date="today"
            :disabled-dates="isWeekend"
            inline
          />
          <div v-if="appointmentDate">
            <label class="block text-sm font-medium ui-text-primary mb-2">Available Times</label>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="time in availableTimes" 
                :key="time"
                :class="[
                  'py-2 px-3 rounded-lg text-sm transition-colors',
                  appointmentTime === time 
                    ? 'bg-primary text-white' 
                    : 'border border-color-3 ui-text-primary hover:bg-color-3'
                ]"
                @click="appointmentTime = time"
              >
                {{ time }}
              </button>
            </div>
          </div>
        </div>
        <div v-if="appointmentDate && appointmentTime" class="p-4 border-t border-color-3 bg-color-3/30">
          <p class="text-sm ui-text-primary">
            <span class="font-semibold">Confirmed:</span> 
            {{ formatDisplayDate(appointmentDate) }} at {{ appointmentTime }}
          </p>
        </div>
      </div>
    </section>

    <!-- Report Date Range Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Report Date Range Example</h2>
      <div class="max-w-2xl bg-color-2 rounded-xl border border-color-3 p-6">
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[200px]">
            <DatePicker 
              v-model="reportStart" 
              label="Start Date" 
              placeholder="From"
              :max-date="reportEnd || today"
              size="sm"
            />
          </div>
          <div class="flex-1 min-w-[200px]">
            <DatePicker 
              v-model="reportEnd" 
              label="End Date" 
              placeholder="To"
              :min-date="reportStart"
              :max-date="today"
              size="sm"
            />
          </div>
          <div class="flex gap-2">
            <button 
              v-for="preset in datePresets" 
              :key="preset.label"
              class="px-3 py-2 text-sm border border-color-3 rounded-lg ui-text-secondary hover:bg-color-3 transition-colors"
              @click="applyPreset(preset)"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
        <div v-if="reportStart && reportEnd" class="mt-4 p-3 bg-color-3/50 rounded-lg">
          <p class="text-sm ui-text-primary">
            Showing data from <span class="font-semibold">{{ formatDisplayDate(reportStart) }}</span> 
            to <span class="font-semibold">{{ formatDisplayDate(reportEnd) }}</span>
            ({{ calculateDays }} days)
          </p>
        </div>
      </div>
    </section>

    <!-- All Props Reference -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Props Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Prop</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Type</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Default</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="prop in propsReference" :key="prop.name">
              <td class="p-3 font-mono text-primary">{{ prop.name }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.type }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.default }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events Reference -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Events Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Event</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Payload</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="event in eventsReference" :key="event.name">
              <td class="p-3 font-mono text-primary">{{ event.name }}</td>
              <td class="p-3 ui-text-secondary">{{ event.payload }}</td>
              <td class="p-3 ui-text-secondary">{{ event.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Slots Reference -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Slots Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Slot</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="slot in slotsReference" :key="slot.name">
              <td class="p-3 font-mono text-primary">{{ slot.name }}</td>
              <td class="p-3 ui-text-secondary">{{ slot.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Datepicker } from '../../'

// Helper dates
const today = new Date()
const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
const thirtyDaysAhead = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

// Basic usage
const basicDate = ref(null)
const basicWithLabel = ref(null)
const basicPreset = ref(new Date())

// Date formats
const formatDefault = ref(null)
const formatUS = ref(null)
const formatEU = ref(null)
const formatLong = ref(null)
const formatShort = ref(null)

// Sizes
const sizeXs = ref(null)
const sizeSm = ref(null)
const sizeMd = ref(null)
const sizeLg = ref(null)
const sizeXl = ref(null)

// Icons
const iconLeft = ref(null)
const iconRight = ref(null)
const iconCustom = ref(null)

// Date range
const rangeStart = ref(null)
const rangeEnd = ref(null)
const rangeValue = ref(null)

// Constraints
const minDate = ref(null)
const maxDate = ref(null)
const constrainedDate = ref(null)

// Disabled dates
const noWeekends = ref(null)
const noHolidays = ref(null)
const specificDates = ref(null)

const isWeekend = (date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

const isHoliday = (date) => {
  const holidays = [
    '01-01', // New Year
    '07-04', // Independence Day
    '12-25', // Christmas
    '12-31', // New Year's Eve
  ]
  const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return holidays.includes(monthDay)
}

const disabledSpecificDates = [
  new Date(2026, 0, 15),
  new Date(2026, 0, 20),
  new Date(2026, 0, 25),
]

// Multiple dates
const multipleDates = ref([])

const removeDate = (index) => {
  multipleDates.value.splice(index, 1)
}

// Description & Hint
const descDate = ref(null)
const hintDate = ref(null)
const bothDescHint = ref(null)

// Validation
const errorDate = ref(null)
const successDate = ref(new Date())
const warningDate = ref(new Date())

// States
const disabledDate = ref(new Date())
const readonlyDate = ref(new Date())
const loadingDate = ref(null)
const clearableDate = ref(new Date())

// Rounded
const roundedNone = ref(null)
const roundedSm = ref(null)
const roundedMd = ref(null)
const roundedLg = ref(null)
const roundedFull = ref(null)

// Month/Year picker
const monthOnly = ref(null)
const yearOnly = ref(null)
const quarterPicker = ref(null)

// Time selection
const dateTime = ref(null)
const dateTime12h = ref(null)
const timeOnly = ref(null)

// Inline
const inlineDate = ref(null)

// Booking form
const bookingCheckIn = ref(null)
const bookingCheckOut = ref(null)

const calculateNights = computed(() => {
  if (!bookingCheckIn.value || !bookingCheckOut.value) return 0
  const diff = new Date(bookingCheckOut.value) - new Date(bookingCheckIn.value)
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

// Event scheduler
const eventName = ref('')
const eventDate = ref(null)
const eventStartTime = ref(null)
const eventEndTime = ref(null)

// Flight search
const flightType = ref('roundtrip')
const flightDeparture = ref(null)
const flightReturn = ref(null)

// Birthday
const birthday = ref(null)

const calculateAge = computed(() => {
  if (!birthday.value) return 0
  const birthDate = new Date(birthday.value)
  const ageDiff = Date.now() - birthDate.getTime()
  const ageDate = new Date(ageDiff)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
})

// Appointment
const appointmentDate = ref(null)
const appointmentTime = ref(null)
const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

// Report range
const reportStart = ref(null)
const reportEnd = ref(null)

const datePresets = [
  { label: 'Today', days: 0 },
  { label: '7 Days', days: 7 },
  { label: '30 Days', days: 30 },
  { label: '90 Days', days: 90 },
]

const applyPreset = (preset) => {
  reportEnd.value = new Date()
  reportStart.value = new Date(today.getTime() - preset.days * 24 * 60 * 60 * 1000)
}

const calculateDays = computed(() => {
  if (!reportStart.value || !reportEnd.value) return 0
  const diff = new Date(reportEnd.value) - new Date(reportStart.value)
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1
})

// Helper function
const formatDisplayDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

// Props reference
const propsReference = [
  { name: 'modelValue', type: 'Date | String | Array', default: 'null', description: 'v-model binding value' },
  { name: 'label', type: 'String', default: "''", description: 'Label text' },
  { name: 'placeholder', type: 'String', default: "''", description: 'Placeholder text' },
  { name: 'description', type: 'String', default: "''", description: 'Description text below label' },
  { name: 'hint', type: 'String', default: "''", description: 'Hint text below input' },
  { name: 'format', type: 'String', default: "'YYYY-MM-DD'", description: 'Display format for the date' },
  { name: 'mode', type: "'date' | 'month' | 'year' | 'time' | 'quarter'", default: "'date'", description: 'Picker mode' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Input size' },
  { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Border radius' },
  { name: 'minDate', type: 'Date | String', default: 'null', description: 'Minimum selectable date' },
  { name: 'maxDate', type: 'Date | String', default: 'null', description: 'Maximum selectable date' },
  { name: 'disabledDates', type: 'Array | Function', default: '[]', description: 'Dates to disable' },
  { name: 'range', type: 'Boolean', default: 'false', description: 'Enable date range selection' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple date selection' },
  { name: 'maxSelections', type: 'Number', default: 'undefined', description: 'Max dates for multiple selection' },
  { name: 'enableTime', type: 'Boolean', default: 'false', description: 'Show time picker' },
  { name: 'time24hr', type: 'Boolean', default: 'true', description: 'Use 24-hour time format' },
  { name: 'inline', type: 'Boolean', default: 'false', description: 'Show calendar inline' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the picker' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'Make picker readonly' },
  { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading state' },
  { name: 'clearable', type: 'Boolean', default: 'false', description: 'Show clear button' },
  { name: 'required', type: 'Boolean', default: 'false', description: 'Mark as required' },
  { name: 'error', type: 'String | Boolean', default: 'false', description: 'Error message' },
  { name: 'success', type: 'String | Boolean', default: 'false', description: 'Success message' },
  { name: 'warning', type: 'String | Boolean', default: 'false', description: 'Warning message' },
  { name: 'prependIcon', type: 'String', default: "'calendar'", description: 'Icon before input' },
  { name: 'appendIcon', type: 'String', default: "''", description: 'Icon after input' }
]

// Events reference
const eventsReference = [
  { name: 'update:modelValue', payload: 'Date | Array', description: 'Emitted when value changes' },
  { name: 'change', payload: 'Date | Array', description: 'Emitted when selection is confirmed' },
  { name: 'open', payload: 'void', description: 'Emitted when calendar opens' },
  { name: 'close', payload: 'void', description: 'Emitted when calendar closes' },
  { name: 'clear', payload: 'void', description: 'Emitted when value is cleared' },
  { name: 'month-change', payload: '{ month, year }', description: 'Emitted when month changes' },
  { name: 'year-change', payload: 'Number', description: 'Emitted when year changes' }
]

// Slots reference
const slotsReference = [
  { name: 'prepend', description: 'Content before the input' },
  { name: 'append', description: 'Content after the input' },
  { name: 'label', description: 'Custom label content' },
  { name: 'day', description: 'Custom day cell content' },
  { name: 'header', description: 'Custom calendar header' },
  { name: 'footer', description: 'Custom calendar footer' }
]
</script>