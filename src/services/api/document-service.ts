import BaseResponse from "@/interface/IBaseResponse";
import { postMultipart } from "./http";

export function uploadDocument(patientId: string, file: File): Promise<BaseResponse<string>> {
    const form = new FormData();
    form.append('file', file);
    return postMultipart(`/documents/upload?patientId=${patientId}`, form);
}
