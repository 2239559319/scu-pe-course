import { ApiService } from './apiService';

export async function getTermId(apiService: ApiService) {
  const path = '/api/terms';
  const res = await apiService.get({ path });

  for (const term of res.data.content) {
    if (term.currentTerm === 1) return term.id;
  }
}
