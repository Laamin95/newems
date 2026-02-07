<template>
  <component
    :is="IconAsyncComponent"
    v-bind="attrs"
    :class="computedClass"
    :style="computedStyle"
  />
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { computed, useAttrs, defineAsyncComponent } from "vue";

// Props
interface Props {
  name: string;
  type?: "solid" | "outline";
  size?: number | string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "solid",
  size: 24,
  color: "currentColor",
});

const attrs = useAttrs();

// Convert icon names like "academic-cap" to "AcademicCapIcon"
const normalizeName = (str: string) => {
  return (
    str
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase()) // kebab → camel
      .replace(/(?:^|_|\s|-)(\w)/g, (_, c) => c.toUpperCase()) // capitalize
      .replace(/Icon$/, "") + "Icon"
  );
};

const iconName = computed(() => normalizeName(props.name));

// Async loader
const IconAsyncComponent = computed(() =>
  defineAsyncComponent({
    loader: async () => {
      const pack =
        props.type === "solid"
          ? await import("@heroicons/vue/24/solid")
          : await import("@heroicons/vue/24/outline");

      const icon = (pack as any)[iconName.value];

      if (!icon) {
        throw new Error(
          `Icon "${iconName.value}" not found in ${props.type} icons`
        );
      }

      return icon as Component;
    },

    // Loading icon
    loadingComponent: defineAsyncComponent(
      async () => (await import("@heroicons/vue/24/outline")).ArrowPathIcon
    ),

    // Error fallback icon
    errorComponent: defineAsyncComponent(
      async () =>
        (await import("@heroicons/vue/24/solid")).ExclamationTriangleIcon
    ),

    delay: 200,
    timeout: 5000,
  })
);

// Tailwind color detection
const isTailwindColorClass = (value?: string) =>
  value
    ? /(?:^|\s)(?:text-|fill-|stroke-|bg-|ring-|border-)/.test(value)
    : false;

const tailwindColorClass = computed(() =>
  isTailwindColorClass(props.color) ? String(props.color) : ""
);

const computedClass = computed(() => {
  const classes = ["hero-icon"];

  if (attrs.class) classes.push(String(attrs.class));
  if (tailwindColorClass.value) classes.push(tailwindColorClass.value);

  return classes.filter(Boolean).join(" ");
});

const computedStyle = computed(() => {
  const styleObj: Record<string, any> =
    typeof attrs.style === "object" ? { ...attrs.style } : {};

  const sizeCss =
    typeof props.size === "number" ? `${props.size}px` : props.size;

  styleObj.width = sizeCss;
  styleObj.height = sizeCss;

  // Inline CSS color if not a Tailwind class
  if (!isTailwindColorClass(props.color)) {
    styleObj.color = props.color;
  }

  return styleObj;
});
</script>
