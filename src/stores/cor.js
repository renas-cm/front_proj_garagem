import { ref } from 'vue'
import { defineStore } from 'pinia'

import CorApi from '@/api/cor'

const corApi = new CorApi()

export const useCorStore = defineStore('cor', () => {
    const cores = ref([
        {
            id: 1,
            nome: 'Cor 1'
        },
    ])
    const meta = ref({
        page: 0,
        page_size: 0,
        total_pages: 0
    })

    async function getCores(page = 1, search = '') {
        const data = await corApi.buscarTodasAsCores(page, search)
        cores.value = data.results
        meta.value.page = data.page
        meta.value.page_size = data.page_size
        meta.value.total_pages = data.total_pages
    }

    async function search(text) {
        await getCores(1, text)
    }

    async function excluirCor(id) {
        await corApi.excluirCor(id)
        const index = cores.value.findIndex((cor) => cor.id === id)
        cores.value.splice(index, 1)
    }

    async function salvarCor(cor) {
        if (cor.id) {
            await corApi.atualizarCor(cor)
            const index = cores.value.findIndex((c) => c.id === cor.id)
            cores.value.splice(index, 1, cor)
        } else {
            const data = await corApi.adicionarCor(cor)
            cores.value.splice(0, 0, data)
        }
    }

    async function proximaPagina() {
        await getCores(meta.value.page + 1)
    }

    async function paginaAnterior() {
        await getCores(meta.value.page - 1)
    }

    return {
        cores,
        meta,
        getCores,
        search,
        salvarCor,
        excluirCor,
        proximaPagina,
        paginaAnterior
    }
})
