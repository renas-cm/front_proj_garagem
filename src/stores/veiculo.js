import { ref } from 'vue'
import { defineStore } from 'pinia'

import VeiculoApi from '../api/veiculo.js'

const veiculoApi = new VeiculoApi()

export const useVeiculoStore = defineStore('veiculo', () => {
  const veiculos = ref([
    {
      id: 1,
      modelo: 'Modelo 1'
    },
  ])
  const meta = ref({
    page: 0,
    page_size: 0,
    total_pages: 0
  })

  async function getVeiculos(page = 1, search = '') {
    const data = await veiculoApi.buscarTodosOsVeiculos(page, search)
    veiculos.value = data.results
    meta.value.page = data.page
    meta.value.page_size = data.page_size
    meta.value.total_pages = data.total_pages
  }

  async function search(text) {
    await getVeiculos(1, text)
  }

  async function excluirVeiculo(id) {
    await veiculoApi.excluirVeiculo(id)
    const index = veiculos.value.findIndex((veiculo) => veiculo.id === id)
    veiculos.value.splice(index, 1)
  }

  async function salvarVeiculo(veiculo) {
    if (veiculo.id) {
      await veiculoApi.atualizarVeiculo(veiculo)
      const index = veiculos.value.findIndex((v) => v.id === veiculo.id)
      veiculos.value.splice(index, 1, veiculo)
    } else {
      const data = await veiculoApi.adicionarVeiculo(veiculo)
      veiculos.value.splice(0, 0, data)
    }
  }

  async function proximaPagina() {
    await getVeiculos(meta.value.page + 1)
  }

  async function paginaAnterior() {
    await getVeiculos(meta.value.page - 1)
  }

  return {
    veiculos,
    meta,
    getVeiculos,
    search,
    salvarVeiculo,
    excluirVeiculo,
    proximaPagina,
    paginaAnterior
  }
})
