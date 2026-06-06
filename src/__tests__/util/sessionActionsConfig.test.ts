import { describe, it, expect } from 'vitest';
import { CLOSED_STAGES, CONFIRM_CONFIG } from '@/util/sessionActionsConfig';
import { PendingAction } from '@/types/session-action.types';

// #region CLOSED_STAGES

describe('CLOSED_STAGES', () => {
    it('deve conter CANCELLED', () => {
        expect(CLOSED_STAGES).toContain('CANCELLED');
    });

    it('deve conter CONCLUDED', () => {
        expect(CLOSED_STAGES).toContain('CONCLUDED');
    });

    it('deve conter ABSENT', () => {
        expect(CLOSED_STAGES).toContain('ABSENT');
    });

    it('deve conter RESCHEDULED', () => {
        expect(CLOSED_STAGES).toContain('RESCHEDULED');
    });

    it('não deve conter OPENED', () => {
        expect(CLOSED_STAGES).not.toContain('OPENED');
    });
});

// #endregion

// #region CONFIRM_CONFIG

describe('CONFIRM_CONFIG', () => {
    const actions: Exclude<PendingAction, null>[] = ['conclude', 'cancel', 'absent'];

    it.each(actions)('deve ter configuração completa para a ação "%s"', (action) => {
        const config = CONFIRM_CONFIG[action];
        expect(config.title).toBeTruthy();
        expect(config.description).toBeTruthy();
        expect(config.confirmLabel).toBeTruthy();
        expect(config.confirmClassName).toBeTruthy();
    });

    it('cada ação deve ter confirmClassName com classes de cor distintas', () => {
        expect(CONFIRM_CONFIG.conclude.confirmClassName).toContain('green');
        expect(CONFIRM_CONFIG.cancel.confirmClassName).toContain('red');
        expect(CONFIRM_CONFIG.absent.confirmClassName).toContain('orange');
    });
});

// #endregion
