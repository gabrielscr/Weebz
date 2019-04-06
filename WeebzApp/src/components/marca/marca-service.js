import { apiService } from '../../common/base/api-service';
class ProdutoService {
    listar(query) {
        return apiService.get('api/Produto/Listar', query).then(r => r.json());
    }
    inserir(query) {
        return apiService.post('api/Produto/Inserir', query).then(r => r.json());
    }
    obterParaEditar(query) {
        return apiService.get('api/Produto/Editar', query).then(r => r.json());
    }
    getNextId() {
        return apiService.get('api/Produto/GetNextId').then(r => r.json());
    }
    editar(query) {
        return apiService.put('api/Produto/Editar', query).then(r => r.json());
    }
    excluir(query) {
        return apiService.delete('api/Produto/Excluir', query);
    }
}
export default new ProdutoService();
