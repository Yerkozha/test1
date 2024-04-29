interface IEventEmitter {

    on: (eventNmae: string, cb: (...args: unknown[]) => void) => void
    off: (eventNmae: string) => void
    emit: (eventNmae: string, data: unknown) => void

}

type Nullable<T> = T | null

abstract class BaseEventEmitter {

    

}

class EventEmitter extends BaseEventEmitter implements IEventEmitter {
    handlers = new Map()
    protected static collection: Nullable<EventEmitter> = null;
    
    static _getInstance() { // 15 && 16

        if(!EventEmitter.collection) {
            EventEmitter.collection = new EventEmitter()
        }
        return EventEmitter.collection
    }


    on( eventName: string, cb: (...args: unknown[]) => void ) {

        if( !this.handlers.has(eventName) ) {
            this.handlers.set(eventName, new Set())
        }

        this.handlers.get(eventName).add(cb)

    }

    off( eventName: string ){
        this.handlers.get(eventName).clear();
    }

    emit(eventName: string, data: unknown) {
        const event = this.handlers.get(eventName);
        if ( event ) {
            
            event.forEach( ( fn: (...arg: unknown[]) => void) => {
                fn.call(null, data)
            } )
        }
    }

}

export default EventEmitter