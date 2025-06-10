<script setup>
import { ref, onMounted } from "vue";
import { useVeiculoStore } from "@/stores/veiculo";
import ModalAdicionarVeiculo from "../components/Veiculos/ModalAdicionarVeiculo.vue";

const veiculoStore = useVeiculoStore();
const showModal = ref(false);

onMounted(async () => {
  await veiculoStore.getVeiculos();
});

async function excluir(id) {
  await veiculoStore.excluirVeiculo(id);
  await veiculoStore.getVeiculos();
}

function editar(veiculoParaEditar) {
  // Implemente a lógica de edição conforme necessário
  // Exemplo: veiculoStore.setVeiculoParaEditar(veiculoParaEditar);
}
</script>

<template>
  <div class="container">
    <button @click="showModal = true">+</button>
    <h1>Gerenciamento de Veículos</h1>
    <ul class="livros-list">
      <li v-for="veiculo in veiculoStore.veiculos" :key="veiculo.id">
        <div class="livro-info" @click="editar(veiculo)">
          <img
            :src="veiculo.imagem || 'https://via.placeholder.com/150'"
            alt="Imagem do Veículo"
            class="livro-capa"
          />
          <div>
            <strong>ID:</strong> {{ veiculo.id }} <br />
            <strong>Modelo:</strong> {{ veiculo.modelo }} <br />
            <strong>Marca:</strong> {{ veiculo.marca }} <br />
            <strong>Ano:</strong> {{ veiculo.ano }} <br />
            <strong>Cor:</strong> {{ veiculo.cor }}
          </div>
        </div>
        <button @click="excluir(veiculo.id)">Excluir</button>
      </li>
    </ul>
  </div>
  <ModalAdicionarVeiculo v-if="showModal" @close="showModal = false" />
</template>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 30px;
  text-align: center;
}

.form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.livros-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.livro-info {
  display: flex;
  gap: 15px;
  cursor: pointer;
}

.livro-info img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.livro-info div {
  font-size: 0.9rem;
}

li button {
  padding: 8px 12px;
  font-size: 0.9rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li button:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .form {
    flex-direction: column;
    gap: 10px;
  }

  input[type="text"] {
    width: 100%;
  }

  ul {
    padding: 0;
  }
}
</style>
