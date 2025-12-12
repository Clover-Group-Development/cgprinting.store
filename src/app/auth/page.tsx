"use client";

import { useEffect, useState } from "react";
import qstring from "query-string";
import { AuthState } from "@/dto";
import { AuthFlow } from "@/enums";
import { parse, stringify } from "@/lib/auth";

export default function Page() {
    const [state, setState] = useState<AuthState>();
    const [canRedirect, setCanRedirect] = useState(true);

    const parseOrCreateState = (): Partial<AuthState> => {
        const queries = qstring.parse(window.location.search);
        const fragments = qstring.parse(window.location.hash);

        const { state } = { ...queries, ...fragments } as any;
        return state ?? { flow: AuthFlow.SignIn };
    };

    const authenticate = async (token: string, state: AuthState) => {
        console.log(token, state);
    };

    const redirectToAuth = () => {
        const { google } = JSON.parse(process.env.NEXT_PUBLIC_AUTH!);

        const state = stringify({
            flow: AuthFlow.Invite,
            provider: "google",
            inviteToken: "xxxssxsxsx"
        });

        const query = qstring.stringify({
            client_id: google.clientId,
            redirect_uri: window.location.origin + "/auth",
            response_type: "id_token",
            scope: "openid",
            nonce: 'random_nonce',
            state,
        });
        
        window.location.href = `${google.authURI}?${query}`;
    };

    useEffect(() => {
        const state = parseOrCreateState();
        setState(state as AuthState);
    }, []);

    useEffect(() => {
        const { id_token, state } = qstring.parse(window.location.hash) as any;

        if (!id_token) return;

        authenticate(id_token, parse(state));
    }, []);

    useEffect(() => {
        setCanRedirect(!!state);
    }, [state]);

    return (
        <>
            <h1>Auth Page</h1>
            <button onClick={redirectToAuth} disabled={!canRedirect}>Google</button>
        </>
    );
}
