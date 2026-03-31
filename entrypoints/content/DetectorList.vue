<template>
  <div id="detector-config">
    <div class="config-heading">Detection Priority</div>
    <ul id="detector-list">
      <li
        v-for="(detector, index) in detectors"
        :key="detector.name"
        class="detector-item"
        draggable="true"
        :data-detector="detector.name"
        @dragstart="onDragStart(index)"
        @dragover.prevent="onDragOver(index)"
        @drop="onDrop(index)"
        @dragend="onDragEnd"
      >
        <span class="drag-handle">⠿</span>
        <label>
          <input type="checkbox" v-model="detector.enabled" />
          {{ detector.description }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Detectors, type Detector } from "./detectors/index";

interface DetectorItem {
  name: string;
  description: string;
  enabled: boolean;
}

const detectors = ref<DetectorItem[]>([]);
let dragIndex: number | null = null;

onMounted(() => {
  detectors.value = new Detectors().getAll().map((d) => ({
    name: d.name,
    description: d.description,
    enabled: true,
  }));
});

function onDragStart(index: number) {
  dragIndex = index;
}

function onDragOver(index: number) {
  if (dragIndex === null || dragIndex === index) return;
  const items = [...detectors.value];
  const [moved] = items.splice(dragIndex, 1);
  items.splice(index, 0, moved);
  detectors.value = items;
  dragIndex = index;
}

function onDrop(_index: number) {
  dragIndex = null;
}

function onDragEnd() {
  dragIndex = null;
}

function getActiveDetectors(): Detector[] {
  const factory = new Detectors();
  return detectors.value
    .filter((d) => d.enabled)
    .map((d) => factory.getByName(d.name).perform);
}

defineExpose({ getActiveDetectors });
</script>
