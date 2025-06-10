import axios from "axios";
export default class CorApi {
  async buscarTodasAsCores(page, search = "") {
    const { data } = await axios.get(`/cores/?page=${page}&search=${search}`);
    return data;
  }
  async adicionarCor(cor) {
    const { data } = await axios.post("/cores/", cor);
    return data;
  }
  async atualizarCor(cor) {
    const { data } = await axios.put(`/cores/${cor.id}/`, cor);
    return data.results;
  }
  async excluirCor(id) {
    await axios.delete(`/cor/${id}/`);
  }
}
