import { ref } from 'vue'
import { defineStore } from 'pinia'

import ModeloApi from '@/api/modelo'

const modeloApi = new ModeloApi()

export const useModeloStore = defineStore('modelo', () => {
  const modelos = ref([
    {
      id: 1,
      nome: 'Modelo 1'
    },
  ])
  const meta = ref({
    page: 0,
    page_size: 0,
    total_pages: 0
  })

  async function getModelos(page = 1, search = '') {
    const data = await modeloApi.buscarTodosOsModelos(page, search)
    modelos.value = data.results
    meta.value.page = data.page
    meta.value.page_size = data.page_size
    meta.value.total_pages = data.total_pages
  }

  async function search(text) {
    await getModelos(1, text)
  }

  async function excluirModelo(id) {
    await modeloApi.excluirModelo(id)
    const index = modelos.value.findIndex((modelo) => modelo.id === id)
    modelos.value.splice(index, 1)
  }

  async function salvarModelo(modelo) {
    if (modelo.id) {
      await modeloApi.atualizarModelo(modelo)
      const index = modelos.value.findIndex((m) => m.id === modelo.id)
      modelos.value.splice(index, 1, modelo)
    } else {
      const data = await modeloApi.adicionarModelo(modelo)
      modelos.value.splice(0, 0, data)
    }
  }

  async function proximaPagina() {
    await getModelos(meta.value.page + 1)
  }

  async function paginaAnterior() {
    await getModelos(meta.value.page - 1)
  }

  return {
    modelos,
    meta,
    getModelos,
    search,
    salvarModelo,
    excluirModelo,
    proximaPagina,
    paginaAnterior
  }
})
