import { ref } from 'vue'
import { defineStore } from 'pinia'

import CategoriaApi from '@/api/categoria'

const categoriaApi = new CategoriaApi()

export const useCategoriaStore = defineStore('categoria', () => {
  const categorias = ref([])
  const meta = ref({
    "page": 0,
    "page_size": 0,
    "total_pages": 0,
  })

  async function getCategorias(page= 1) {
    const data = await categoriaApi.buscarTodasAsCategorias(page)
    console.log(data)
    console.log('aqui')
    categorias.value = data.results
    meta.value.page = data.page
    meta.value.page_size = data.page_size
    meta.value.total_pages = data.total_pages
  }

  async function proximaPagina() {
    console.log('proximaPagina')
    if (meta.value.page < meta.value.total_pages) {
      await getCategorias(meta.value.page + 1)
    }
  }

  async function paginaAnterior() {
    if (meta.value.page > 1) {
      await getCategorias(meta.value.page - 1)
    }
  }


  return { categorias, meta, getCategorias, proximaPagina, paginaAnterior }
})
