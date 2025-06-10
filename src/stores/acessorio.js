import { ref } from 'vue'
import { defineStore } from 'pinia'
import AcessorioApi from '@/api/acessorio'

const acessorioApi = new AcessorioApi()

export const useAcessorioStore = defineStore('acessorio', () => {
  const acessorios = ref([
    {
      id: 1,
      descricao: 'acessorio 1'
    },
    {
      id: 2,
      descricao: 'acessorio 2'
    },
    {
      id: 3,
      descricao: 'acessorio 3'
    }
  ])
  const meta = ref({
    page: 0,
    page_size: 0,
    total_pages: 0
  })

  async function getAcessorios(page = 1, search = '') {
    const data = await acessorioApi.buscarTodasOsAcessorios(page, search)
    acessorios.value = data.results
    meta.value.page = data.page
    meta.value.page_size = data.page_size
    meta.value.total_pages = data.total_pages
  }

  async function search(text) {
    console.log(text)
    await getAcessorios(1, text)
  }

  async function excluirAcessorio(id) {
    await acessorioApi.excluirAcessorio(id)
    const index = acessorios.value.findIndex((acessorio) => acessorio.id === id)
    acessorios.value.splice(index, 1)
  }

  async function salvarAcessorio(acessorio) {
    if (acessorio.id) {
      await acessorioApi.atualizarAcessorio(acessorio)
      const index = acessorios.value.findIndex((a) => a.id === acessorio.id)
      acessorios.value.splice(index, 1, acessorio)
    } else {
      const data = await acessorioApi.adicionarAcessorio(acessorio)
      acessorios.value.splice(0, 0, data)
    }
  }

  async function proximaPagina() {
    await getAcessorios(meta.value.page + 1)
  }

  async function paginaAnterior() {
    await getAcessorios(meta.value.page - 1)
  }

  return {
    acessorios,
    meta,
    getAcessorios,
    salvarAcessorio,
    excluirAcessorio,
    search,
    proximaPagina,
    paginaAnterior
  }
})
