import { SignInDTO, SignUpDTO } from "@/types/auth.dto";
import { post } from "./http";

export function signIn(credentials: SignInDTO) {
    return post('/auth/signIn', credentials);
}

export function signUp(data: SignUpDTO) {
    return post('/auth/signUp', data);
}

export function signOut() {
    return post('/auth/signOut', {});
}
