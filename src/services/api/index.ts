/**
 * Client-side API exports only.
 * Server-side fetches must import directly from "@/services/api/http-server"
 * inside page.tsx files — never through this barrel.
 */
export * from "./patient-service";
export * from "./schedule-service";
export * from "./auth-service";
export * from "./document-service";
