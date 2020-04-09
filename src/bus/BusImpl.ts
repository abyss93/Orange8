import { BusEvent } from "./events/BusEvent";

export class BusImpl {

    private bus: Map<string, Array<(args: BusEvent) => void>>

    constructor() {
        this.bus = new Map()
    }

    public subscribe(eventId: string, callback: (event: BusEvent) => void) {
        if (!this.bus.has(eventId)) {
            this.bus.set(eventId, [])
        }
        this.bus.get(eventId).push(callback)
        return this.bus.get(eventId).length - 1
    }

    public unsubscribe(eventId: string, subscription: number) {
        if (this.bus.has(eventId) && this.bus.get(eventId).length > 0) {
            this.bus.get(eventId).slice(subscription, 1)
        }
    }

    public raise(eventId: string, event: BusEvent) {
        if (this.bus.has(eventId)) {
            this.bus.get(eventId).forEach(callback => callback(event))
        }
    }

}