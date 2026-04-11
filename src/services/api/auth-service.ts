import { SignInDTO, SignUpDTO } from "@/types/auth.dto";
import { parseResponse } from "./http";

const baseUrl = "http://localhost:8080/auth";

export async function signIn(credentials: SignInDTO) {
    const response = await fetch(baseUrl + "/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return parseResponse(response);
}

export async function signUp(data: SignUpDTO) {
    const response = await fetch(baseUrl + "/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return parseResponse(response);
}
