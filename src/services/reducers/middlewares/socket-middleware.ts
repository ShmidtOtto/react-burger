import {
    ActionCreatorWithPayload,
    ActionCreatorWithoutPayload,
    Middleware,
} from "@reduxjs/toolkit";

export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';
        const {
            wsConnect,
            wsDisconnect,
            onOpen,
            onClose,
            onError,
            onMessage
        } = wsActions;

        return (next) => (action) => {
            const { dispatch } = store;

            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload);
                url = action.payload;
                isConnected = true;

                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = () => {
                    dispatch(onError("Error"));
                };

                socket.onclose = () => {
                    dispatch(onClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, RECONNECT_PERIOD);
                    }
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch(onMessage(parsedData));
                }
            }

            if (socket && wsDisconnect.match(action)) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                socket.close();
                socket = null;
            }

            next(action);
        };
    };
};