import axios from "axios";
export default class AcessorioApi {
  async buscarTodasOsAcessorios(page, search = "") {
    const { data } = await axios.get(`/acessorios/?page=${page}&search=${search}`);
    return data;
  }
  async adicionarAcessorio(acessorio) {
    const { data } = await axios.post("/acessorio/", acessorio);
    return data;
  }
  async atualizarAcessorio(acessorio) {
    const { data } = await axios.put(`/acessorios/${acessorio.id}/`, acessorio);
    return data.results;
  }
  async excluirAcessorio(id) {
    await axios.delete(`/acessorios/${id}/`);
  }
}
