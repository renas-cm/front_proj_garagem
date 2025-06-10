<script setup>
import { reactive, onMounted, ref } from "vue";
import AutoComplete from "@/components/AutoComplete.vue";
import { useVeiculoStore } from "@/stores/veiculo.js";
import { useModeloStore } from "@/stores/modelo.js";

const veiculoStore = useVeiculoStore();
const modeloStore = useModeloStore();

const defaultVeiculo = {
  id: null,
  placa: "",
  modelo: "",
  cor: "",
  ano: "",
  imagem: "",
};
const veiculo = reactive({ ...defaultVeiculo });
const imagePreview = ref(null);

function openSelectImage() {
  const input = document.querySelector("input[type='file']");
  if (input) {
    input.click();
  }
}

function selectImage(evt) {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      veiculo.imagem = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function limpar() {
  Object.assign(veiculo, { ...defaultVeiculo });
  imagePreview.value = null;
}

async function salvar() {
  alert("TODO: salvar");
  if (veiculo.id) {
    // await veiculoStore.atualizarVeiculo(veiculo);
  } else {
    // await veiculoStore.adicionarVeiculo(veiculo);
  }
  // await veiculoStore.buscarTodos();
  limpar();
}

onMounted(() => {
  modeloStore.fetchModelos();
  veiculoStore.fetchVeiculos();
});
</script>

<template>
  <div class="modal">
    <div class="content">
      <div class="row gap-20">
        <div class="col-10">
          <h1>Adicionar Veículo</h1>
          <div class="form">
            <div class="row">
              <input
                class="col-4"
                type="text"
                v-model="veiculo.placa"
                placeholder="Placa"
              />
              <auto-complete
                class="col-4"
                v-model="veiculo.modelo"
                :items="modeloStore.modelos"
                item-text="nome"
                placeholder="Modelo"
              />
              <input
                class="col-4"
                type="text"
                v-model="veiculo.cor"
                placeholder="Cor"
              />
            </div>
            <div class="row">
              <input
                class="col-4"
                type="number"
                v-model="veiculo.ano"
                placeholder="Ano"
              />
            </div>
            <form />
          </div>
        </div>
        <div class="col-2">
          <div @click="openSelectImage">
            <img
              class="image-preview"
              :src="imagePreview || 'https://placehold.co/100x150?text=?'"
              alt="Imagem do Veículo"
            />
          </div>
          <input type="file" hidden @input="selectImage" />
          <div class="button-actions">
            <button @click="salvar">Salvar</button>
            <button @click="limpar">Limpar</button>
            <button @click="$emit('close')">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 60%;
  min-height: 60%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.image-preview {
  width: 100px;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.button-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
