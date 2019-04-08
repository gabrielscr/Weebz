import { apiService } from '../../common/base/api-service';
import Api from '../../common/base/api.typings';

class MarcaService {
  listar(query?: Api.Marca.Listar.Query): Promise<Api.Marca.Listar.Dto> {
    return apiService.get('api/Marca/Listar', query).then(r => r.json());
  }

  inserir(query: Api.Marca.InserirEditar.Command): Promise<number> {
    return apiService.post('api/Marca/Inserir', query).then(r => r.json());
  }

  obterParaEditar(query: Api.Marca.InserirEditar.Query): Promise<Api.Marca.InserirEditar.Command> {
    return apiService.get('api/Marca/Editar', query).then(r => r.json());
  }

  getNextId(): Promise<number> {
    return apiService.get('api/Marca/GetNextId').then(r => r.json());
  }

  editar(query: Api.Marca.InserirEditar.Command): Promise<number> {
    return apiService.put('api/Marca/Editar', query).then(r => r.json());
  }

  excluir(query: Api.Marca.Excluir.Command) {
    return apiService.delete('api/Marca/Excluir', query);
  }
}

export default new MarcaService();
