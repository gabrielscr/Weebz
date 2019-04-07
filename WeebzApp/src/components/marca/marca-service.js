import { apiService } from '../../common/base/api-service';
class MarcaService {
    listar(query) {
        return apiService.get('api/Marca/Listar', query).then(r => r.json());
    }
    inserir(query) {
        return apiService.post('api/Marca/Inserir', query).then(r => r.json());
    }
    obterParaEditar(query) {
        return apiService.get('api/Marca/Editar', query).then(r => r.json());
    }
    getNextId() {
        return apiService.get('api/Marca/GetNextId').then(r => r.json());
    }
    editar(query) {
        return apiService.put('api/Marca/Editar', query).then(r => r.json());
    }
    excluir(query) {
        return apiService.delete('api/Marca/Excluir', query);
    }
}
export default new MarcaService();
