<script setup>
import { ref } from "vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  search: {
    type: Function,
    required: true,
  },
  itemText: {
    type: String,
    default: "nome",
  },
  placeholder: {
    type: String,
    default: "Digite para pesquisar",
  },
});

const model = defineModel();
const value = ref("");

const searching = ref(false);
const timer = ref(null);

const selectItem = (item) => {
  model.value = item.id;
  value.value = item[props.itemText];
};

const filterItems = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  value.value = searchTerm;
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    props.search(searchTerm);
  }, 500);
};
</script>
<template>
  <div class="autocomplete">
    <input
      @input="filterItems"
      type="text"
      :value="value"
      :placeholder="props.placeholder"
      @focus="searching = true"
    />
    <ul v-show="searching" class="autocomplete-list">
      <li v-for="item in props.items" :key="item.id" @click="selectItem(item)">
        {{ item[itemText] }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.autocomplete {
  position: relative;
  display: inline-block;
}

.autocomplete-list {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  z-index: 1000;
}
.autocomplete-list li {
  padding: 10px;
  cursor: pointer;
  z-index: 1001;
}
.autocomplete-list li:hover {
  background-color: #f0f0f0;
}
</style>
