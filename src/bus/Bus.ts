import { BusEvent } from "./events/BusEvent";

export interface Bus {
    subscribe(eventId: string, callback: (event: BusEvent) => void): number
    unsubscribe(eventId: string, subscription: number): void
    raise(eventId: string, event: BusEvent): void
}