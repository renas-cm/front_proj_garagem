import axios from "axios";
export default class VeiculoApi {
  async buscarTodosOsVeiculos() {
    const { data } = await axios.get("/Veiculos/");
    return data.results;
  }
  async adicionarVeiculos(veiculo) {
    const { data } = await axios.post("/veiculo/", veiculo);
    return data.results;
  }
  async atualizarVeiculo(veiculo) {
    const { data } = await axios.put(`/veiculos/${veiculo.id}/`, veiculo);
    return data.results;
  }
  async excluirVeiculo(id) {
    const { data } = await axios.delete(`/veiculo/${id}/`);
    return data.results;
  }
}
