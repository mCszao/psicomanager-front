import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSessionActions } from '@/hooks/useSessionActions';

// #region Mocks

const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ refresh: mockRefresh }),
}));

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock('@/contexts/ToastContext', () => ({
    useToast: () => ({ success: toastSuccess, error: toastError }),
}));

vi.mock('@/services/api', () => ({
    concludeSession: vi.fn(),
    cancelSession: vi.fn(),
    markAsAbsent: vi.fn(),
    rescheduleSession: vi.fn(),
}));

import * as api from '@/services/api';

// #endregion

// #region Helpers

function renderActions(stage = 'OPENED') {
    return renderHook(() => useSessionActions('schedule-abc', stage));
}

function successResponse() {
    return { success: true, object: 'OK' };
}

function errorResponse(message = 'Erro da API') {
    return { success: false, object: message };
}

// #endregion

// #region Estado inicial

describe('estado inicial', () => {
    it('deve iniciar com loading false, pendingAction null e rescheduleDate null', () => {
        const { result } = renderActions();
        expect(result.current.loading).toBe(false);
        expect(result.current.pendingAction).toBeNull();
        expect(result.current.rescheduleDate).toBeNull();
    });
});

// #endregion

// #region isClosed

describe('isClosed', () => {
    it('deve ser false para stage OPENED', () => {
        const { result } = renderActions('OPENED');
        expect(result.current.isClosed).toBe(false);
    });

    it.each(['CANCELLED', 'CONCLUDED', 'ABSENT', 'RESCHEDULED'])(
        'deve ser true para stage %s',
        (stage) => {
            const { result } = renderActions(stage);
            expect(result.current.isClosed).toBe(true);
        }
    );
});

// #endregion

// #region handleConfirm — sem ação pendente

describe('handleConfirm — sem ação pendente', () => {
    beforeEach(() => vi.clearAllMocks());

    it('não deve chamar nenhum service quando pendingAction é null', async () => {
        const { result } = renderActions();

        await act(() => result.current.handleConfirm());

        expect(api.concludeSession).not.toHaveBeenCalled();
        expect(api.cancelSession).not.toHaveBeenCalled();
        expect(api.markAsAbsent).not.toHaveBeenCalled();
    });
});

// #endregion

// #region handleConfirm — conclude

describe('handleConfirm — conclude', () => {
    beforeEach(() => vi.clearAllMocks());

    it('deve chamar concludeSession com o scheduleId correto', async () => {
        vi.mocked(api.concludeSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(api.concludeSession).toHaveBeenCalledWith('schedule-abc');
    });

    it('deve exibir toast de sucesso quando a API retorna success true', async () => {
        vi.mocked(api.concludeSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(toastSuccess).toHaveBeenCalledWith('Sessão concluída com sucesso!');
    });

    it('deve chamar router.refresh após sucesso', async () => {
        vi.mocked(api.concludeSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(mockRefresh).toHaveBeenCalled();
    });

    it('deve exibir toast de erro com mensagem da API quando success é false', async () => {
        vi.mocked(api.concludeSession).mockResolvedValue(errorResponse('Sessão já concluída.'));
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(toastError).toHaveBeenCalledWith('Sessão já concluída.');
        expect(mockRefresh).not.toHaveBeenCalled();
    });

    it('deve exibir toast de erro genérico quando a API lança exceção', async () => {
        vi.mocked(api.concludeSession).mockRejectedValue(new Error('Network Error'));
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(toastError).toHaveBeenCalledWith('Ocorreu um erro inesperado. Tente novamente.');
    });

    it('deve limpar pendingAction antes de executar', async () => {
        vi.mocked(api.concludeSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(result.current.pendingAction).toBeNull();
    });

    it('deve garantir que loading volta para false após sucesso', async () => {
        vi.mocked(api.concludeSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(result.current.loading).toBe(false);
    });

    it('deve garantir que loading volta para false após erro', async () => {
        vi.mocked(api.concludeSession).mockRejectedValue(new Error('fail'));
        const { result } = renderActions();

        act(() => result.current.setPendingAction('conclude'));
        await act(() => result.current.handleConfirm());

        expect(result.current.loading).toBe(false);
    });
});

// #endregion

// #region handleConfirm — cancel

describe('handleConfirm — cancel', () => {
    beforeEach(() => vi.clearAllMocks());

    it('deve chamar cancelSession com o scheduleId correto', async () => {
        vi.mocked(api.cancelSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('cancel'));
        await act(() => result.current.handleConfirm());

        expect(api.cancelSession).toHaveBeenCalledWith('schedule-abc');
    });

    it('deve exibir toast de sucesso quando a API retorna success true', async () => {
        vi.mocked(api.cancelSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('cancel'));
        await act(() => result.current.handleConfirm());

        expect(toastSuccess).toHaveBeenCalledWith('Sessão cancelada com sucesso!');
    });

    it('deve exibir toast de erro com mensagem da API quando success é false', async () => {
        vi.mocked(api.cancelSession).mockResolvedValue(errorResponse('Sessão já cancelada.'));
        const { result } = renderActions();

        act(() => result.current.setPendingAction('cancel'));
        await act(() => result.current.handleConfirm());

        expect(toastError).toHaveBeenCalledWith('Sessão já cancelada.');
    });

    it('deve exibir toast de erro genérico quando a API lança exceção', async () => {
        vi.mocked(api.cancelSession).mockRejectedValue(new Error('fail'));
        const { result } = renderActions();

        act(() => result.current.setPendingAction('cancel'));
        await act(() => result.current.handleConfirm());

        expect(toastError).toHaveBeenCalledWith('Ocorreu um erro inesperado. Tente novamente.');
    });
});

// #endregion

// #region handleConfirm — absent

describe('handleConfirm — absent', () => {
    beforeEach(() => vi.clearAllMocks());

    it('deve chamar markAsAbsent com o scheduleId correto', async () => {
        vi.mocked(api.markAsAbsent).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('absent'));
        await act(() => result.current.handleConfirm());

        expect(api.markAsAbsent).toHaveBeenCalledWith('schedule-abc');
    });

    it('deve exibir toast de sucesso quando a API retorna success true', async () => {
        vi.mocked(api.markAsAbsent).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setPendingAction('absent'));
        await act(() => result.current.handleConfirm());

        expect(toastSuccess).toHaveBeenCalledWith('Falta registrada com sucesso!');
    });

    it('deve exibir toast de erro com mensagem da API quando success é false', async () => {
        vi.mocked(api.markAsAbsent).mockResolvedValue(errorResponse('Falta já registrada.'));
        const { result } = renderActions();

        act(() => result.current.setPendingAction('absent'));
        await act(() => result.current.handleConfirm());

        expect(toastError).toHaveBeenCalledWith('Falta já registrada.');
    });

    it('deve exibir toast de erro genérico quando a API lança exceção', async () => {
        vi.mocked(api.markAsAbsent).mockRejectedValue(new Error('fail'));
        const { result } = renderActions();

        act(() => result.current.setPendingAction('absent'));
        await act(() => result.current.handleConfirm());

        expect(toastError).toHaveBeenCalledWith('Ocorreu um erro inesperado. Tente novamente.');
    });
});

// #endregion

// #region handleRescheduleConfirm

describe('handleRescheduleConfirm', () => {
    beforeEach(() => vi.clearAllMocks());

    it('deve chamar rescheduleSession com datas formatadas (sem segundos no input)', async () => {
        vi.mocked(api.rescheduleSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30', '2025-04-25T15:30'));

        expect(api.rescheduleSession).toHaveBeenCalledWith(
            'schedule-abc',
            '25-04-2025 14:30:00',
            '25-04-2025 15:30:00'
        );
    });

    it('deve chamar rescheduleSession com datas formatadas (com segundos já presentes no input)', async () => {
        vi.mocked(api.rescheduleSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30:00'));

        expect(api.rescheduleSession).toHaveBeenCalledWith(
            'schedule-abc',
            '25-04-2025 14:30:00',
            undefined
        );
    });

    it('deve omitir dateEnd quando não informado', async () => {
        vi.mocked(api.rescheduleSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30'));

        expect(api.rescheduleSession).toHaveBeenCalledWith(
            'schedule-abc',
            '25-04-2025 14:30:00',
            undefined
        );
    });

    it('deve exibir toast de sucesso quando a API retorna success true', async () => {
        vi.mocked(api.rescheduleSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30'));

        expect(toastSuccess).toHaveBeenCalledWith('Sessão reagendada com sucesso!');
        expect(mockRefresh).toHaveBeenCalled();
    });

    it('deve exibir toast de erro com mensagem da API quando success é false', async () => {
        vi.mocked(api.rescheduleSession).mockResolvedValue(errorResponse('Data inválida.'));
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30'));

        expect(toastError).toHaveBeenCalledWith('Data inválida.');
        expect(mockRefresh).not.toHaveBeenCalled();
    });

    it('deve exibir toast de erro genérico quando a API lança exceção', async () => {
        vi.mocked(api.rescheduleSession).mockRejectedValue(new Error('Network Error'));
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30'));

        expect(toastError).toHaveBeenCalledWith('Ocorreu um erro inesperado. Tente novamente.');
    });

    it('deve limpar rescheduleDate antes de executar', async () => {
        vi.mocked(api.rescheduleSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        act(() => result.current.setRescheduleDate('2025-04-25T14:30'));
        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30'));

        expect(result.current.rescheduleDate).toBeNull();
    });

    it('deve garantir que loading volta para false após sucesso', async () => {
        vi.mocked(api.rescheduleSession).mockResolvedValue(successResponse());
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30'));

        expect(result.current.loading).toBe(false);
    });

    it('deve garantir que loading volta para false após erro', async () => {
        vi.mocked(api.rescheduleSession).mockRejectedValue(new Error('fail'));
        const { result } = renderActions();

        await act(() => result.current.handleRescheduleConfirm('2025-04-25T14:30'));

        expect(result.current.loading).toBe(false);
    });
});

// #endregion
