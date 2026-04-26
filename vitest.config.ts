import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/__tests__/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            include: [
                'src/util/**',
                'src/hooks/**',
                'src/services/**',
            ],
            exclude: [
                'src/util/stageObjectBuilder.ts',
                'src/util/attendanceTypeObjectBuilder.ts',
                'src/services/api/http.ts',
                'src/services/api/http-core.ts',
                'src/services/api/http-server.ts',
            ],
        },
    },
});
