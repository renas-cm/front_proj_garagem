import axios from 'axios';

export default class ModeloApi {
    async buscarTodosOsModelos() {
        const { data } = await axios.get("/modelos/");
        return data.results;
    }

    async adicionarModelo(modelo) {
        const { data } = await axios.post("/modelo/", modelo);
        return data.results;
    }

    async atualizarModelo(modelo) {
        const { data } = await axios.put(`/modelo/${modelo.id}`, modelo);
        return data.results;
    }

    async excluirModelo(id) {
        await axios.delete(`/modelo/${id}/`);
        return data.results;
    }
}