import { AuthFlow } from "@/enums/auth-flow";

export interface AuthState {
    flow: AuthFlow;
    provider: string;
    inviteToken?: string;
}
