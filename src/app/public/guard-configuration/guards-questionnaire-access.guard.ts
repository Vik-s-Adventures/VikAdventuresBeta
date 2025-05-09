import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guardsQuestionnaireAccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const access = sessionStorage.getItem('allowQuestionnaireAccess');

  if (access === 'true') {
    console.log('[GUARD ✅] Acceso permitido a:', state.url);
    return true;
  } else {
    console.warn('[GUARD ❌] Acceso denegado a:', state.url);
    router.navigate(['/menu']);
    return false;
  }
};
