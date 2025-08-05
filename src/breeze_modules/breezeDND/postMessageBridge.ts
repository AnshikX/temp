type Role = "HOST" | "CLIENT";

interface PostMessageRequest {
    source: Role;
    type: "request";
    request: {
        type: string;
        requestId: string;
        [key: string]: unknown;
    };
    channel: string;

}

interface PostMessageResponse {
    source: Role;
    type: "response";
    response: {
        requestId: string;
        result?: unknown;
        error?: string;
    };
    channel: string;

}

interface PostMessageEvent {
    source: Role;
    type: "event";
    event: {
        eventName: string;
        payload: any;
    };
    channel: string;
}

type PostMessageHandler = (extras: Record<string, unknown>) => unknown | Promise<unknown>;
type EventCallback = (payload: any) => void;


class PostMessageBridge {
    private handlers: Record<string, PostMessageHandler> = {};
    private eventListeners: Record<string, Set<EventCallback>> = {};
    private pendingRequests: Map<string, {
        resolve: (value: unknown) => void;
        reject: (reason?: any) => void;
        timeoutId: ReturnType<typeof setTimeout>;
    }> = new Map();

    private role: Role;
    private targetRole: Role;
    private targetWindow: Window | null;
    private targetOrigin: string;
    private channel: string;


    constructor(role: Role, targetOrigin: string, channel: string) {
        this.role = role;
        this.targetRole = role === "HOST" ? "CLIENT" : "HOST";
        if (this.role === "CLIENT") { this.targetWindow = parent; } else {
            this.targetWindow = null;
        }
        this.targetOrigin = targetOrigin;
        this.channel = channel;

        window.addEventListener("message", this.onMessage);
    }
    setTargetWindow(targetWindow: Window) {
        this.targetWindow = targetWindow;
    }
    removeTargetWindow() {
        this.targetWindow = null;
    }

    /** Request-Response bridge */
    sendRequest(type: string, extras: Record<string, unknown> = {}): Promise<unknown> {
        const requestId = crypto.randomUUID();
        const msg: PostMessageRequest = {
            source: this.role,
            type: "request",
            request: {
                ...extras,
                type,
                requestId,
            },
            channel: this.channel,
        };
        
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                this.pendingRequests.delete(requestId);
                reject(new Error(`Timeout waiting for response to '${type}'`));
            }, 500);

            this.pendingRequests.set(requestId, { resolve, reject, timeoutId });

            if (!this.targetWindow) {
                throw new Error("iFrame not loaded or target window not set");
            }
            this.targetWindow.postMessage(msg, this.targetOrigin);
        });
    }

    /** Fire-and-forget broadcast event */
    sendEvent(eventName: string, payload: any) {
        const event: PostMessageEvent = {
            source: this.role,
            type: "event",
            event: {
                eventName,
                payload,
            },
            channel: this.channel,

        };
        if (!this.targetWindow) {
            throw new Error("iFrame not loaded or target window not set");
        }
        this.targetWindow.postMessage(event, this.targetOrigin);
    }

    /** Handle incoming requests */
    registerHandler(type: string, handler: PostMessageHandler) {
        this.handlers[type] = handler;
    }

    removeHandler(type: string) {
        delete this.handlers[type];
    }

    /** Subscribe to custom events (fire-and-forget) */
    on(eventName: string, callback: EventCallback) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = new Set();
        }
        this.eventListeners[eventName].add(callback);
    }

    /** Remove event subscription */
    off(eventName: string, callback: EventCallback) {
        this.eventListeners[eventName]?.delete(callback);
    }

    /** Internal message router */
    private onMessage = async (event: MessageEvent) => {
        const data = event.data;
        if (event.origin !== this.targetOrigin && this.targetOrigin !== "*" || data?.source !== this.targetRole) return;
   
        // Response handler
        if (data?.type === "response" && data?.channel === this.channel) {
            const { requestId, result, error } = data.response;
            const pending = this.pendingRequests.get(requestId);
            if (pending) {
                clearTimeout(pending.timeoutId);
                this.pendingRequests.delete(requestId);
                error ? pending.reject(new Error(error)) : pending.resolve(result);
            }
        }

        // Request handler
        if (data?.type === "request" && data?.channel === this.channel) {
            const { type, requestId, ...extras } = data.request;
            const handler = this.handlers[type];
            if (!handler) {
                try{
                    throw new Error()
                }catch (err) {
                    console.error("Error handling request:", err.stack);
                }
                console.log(`No handler registered for request type '${type}' in role '${this.role}' channel '${this.channel}'` );
                return;
            }


            try {
                const result = await handler(extras);
                const response: PostMessageResponse = {
                    source: this.role,
                    type: "response",
                    response: { requestId, result },
                    channel: this.channel,
                };
                if (!event.source) {
                    throw new Error("Event source is not available");
                }
                event.source.postMessage(response, {
                    targetOrigin: "*"
                });
            } catch (err) {
                const response: PostMessageResponse = {
                    source: this.role,
                    type: "response",
                    response: {
                        requestId,
                        error: err instanceof Error ? err.message : String(err),

                    },
                    channel: this.channel,
                };
                if (!event.source) {
                    throw new Error("Event source is not available");
                }
                event.source.postMessage(response, {
                    targetOrigin: "*"
                });
            }
        }

        // Event handler
        if (data?.type === "event" && data?.channel === this.channel) {
            const { eventName, payload } = data.event;
            this.eventListeners[eventName]?.forEach(cb => cb(payload));
        }
    };

    destroy() {
        window.removeEventListener("message", this.onMessage);
        this.pendingRequests.forEach(({ reject, timeoutId }) => {
            clearTimeout(timeoutId);
            reject(new Error("Bridge destroyed before response received"));
        });
        this.pendingRequests.clear();
        this.eventListeners = {};
    }
}

export const asClient = new PostMessageBridge("CLIENT", "*","BREEZE_TO_FRAME");
export const asFrameHost = new PostMessageBridge("HOST", "*","FRAME_TO_FRAME");
export const asFrameClient = new PostMessageBridge("CLIENT", "*","FRAME_TO_FRAME");

