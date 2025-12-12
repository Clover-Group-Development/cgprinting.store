import { AuthState } from "@/dto";
import { atou, utoa } from "@/lib/string";

export function parse(state: string): AuthState {
    return JSON.parse(atob(utoa(state)));
}

export function stringify(state: AuthState): string {
    const payload = JSON.stringify(state);
    return atou(btoa(payload));
}
