import { computed } from "vue";
import { globalRtl } from "../rtl/rtl";

export function useRtl(localOverride?: boolean) {
  const isRtl = computed(() =>
    typeof localOverride === "boolean" ? localOverride : globalRtl.value
  );

  const rtlClass = computed(() => (isRtl.value ? "rtl" : "ltr"))

  return { isRtl, rtlClass }
}
