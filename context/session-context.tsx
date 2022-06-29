import React, { Dispatch, useEffect, useReducer } from "react";
import { ory } from "../pkg";
import { Configuration, V0alpha2Api, Session, Identity } from "@ory/client";
// import { edgeConfig } from "@ory/integrations/next";

// const ory = new V0alpha2Api(new Configuration(edgeConfig));

enum ActionKind {
    UPDATE_SESSION = "UPDATE_SESSION",
}

interface Action {
    type: ActionKind;
    payload: any;
}

interface State {
    session: any;
    updateSession: Function;
    dispatch: Dispatch<Action> | null;
}

export const defaultSessionContext: State = {
    session: undefined,
    updateSession: () => {},
    dispatch: null,
};

const SessionContext = React.createContext(defaultSessionContext);

export default SessionContext;

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case ActionKind.UPDATE_SESSION:
            return { ...state, session: action.payload };
        default:
            return state;
    }
};

interface Props {
    children: any;
}

export const SessionProvider = (props: Props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {
        ...defaultSessionContext,
    });

    useEffect(() => {
        updateSession();
    }, []);

    const updateSession = () => {
        return ory.toSession()
            .then(({ data }) => {
                // User has a session!
                dispatch({ type: ActionKind.UPDATE_SESSION, payload: data });
            })
            .catch((err) => {
                dispatch({ type: ActionKind.UPDATE_SESSION, payload: null });
            });
    };

    return (
        <SessionContext.Provider
            value={{
                ...state,
                updateSession,
                dispatch,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};
