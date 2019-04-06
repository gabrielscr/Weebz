import { apiService } from '../../common/base/api-service';
import Api from '../../common/base/api.typings';

class ProdutoService {
  listar(query?: Api.Produto.Listar.Query): Promise<Api.Produto.Listar.Dto> {
    return apiService.get('api/Produto/Listar', query).then(r => r.json());
  }

  inserir(query: Api.Produto.InserirEditar.Command): Promise<number> {
    return apiService.post('api/Produto/Inserir', query).then(r => r.json());
  }

  obterParaEditar(query: Api.Produto.InserirEditar.Query): Promise<Api.Produto.InserirEditar.Command> {
    return apiService.get('api/Produto/Editar', query).then(r => r.json());
  }

  getNextId(): Promise<number> {
    return apiService.get('api/Produto/GetNextId').then(r => r.json());
  }

  editar(query: Api.Produto.InserirEditar.Command): Promise<number> {
    return apiService.put('api/Produto/Editar', query).then(r => r.json());
  }

  excluir(query: Api.Produto.Excluir.Command) {
    return apiService.delete('api/Produto/Excluir', query);
  }
}

export default new ProdutoService();
