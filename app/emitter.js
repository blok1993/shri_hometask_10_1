const emitter = {
    events: {},

    /**
     * Сложность метода emitter.on составляет O(1).
     */
    on: function(event, handler) {
        // Если события еще нет в events, инициализируем для него массив.
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }

        // У метода push амортизированная сложность составляет O(1).
        this.events[event].push(handler);
    },

    /**
     * Сложность метода emitter.off составляет O(N). В худшем случае O(2N).
     */
    off: function(event, handler) {
        // Сложность у indexOf линейная — O(N).
        const index = this.events[event].indexOf(handler);
        let handlers = this.events[event];

        if (index !== -1) {
            // У splice также в худшем случае сложность O(N).
            handlers.splice(index, 1);
            this.events[event] = handlers;
        }
    },

    /**
     * Сложность метода emitter.emit составляет O(N), где N - кол-во хендлеров для конкретного event.
     */
    emit: function(event, ...args) {
        const eventHandlers = this.events[event];
        const length = eventHandlers.length;

        if (length > 0) {
            for (let i = 0; i < length; i++) {
                eventHandlers[i](...args);
            }
        }
    }
};

const handler = () => {
    let a = 1;
    a *= 2;

    return a;
};

/**
 * Замеряем время выполнения цепочки вызовов on -> emit -> off.
 */
const testEmitter = (loopsNumber) => {
    let time = performance.now();

    for (let i = 0; i < loopsNumber; i++) {
        // подписали
        emitter.on('event', handler);

        // обработали событие
        emitter.emit('event');

        // отписали
        emitter.off('event', handler);
    }

    time = performance.now() - time;
    console.log('Время выполнения составило: ', time.toFixed(2) + ' ms');
};

document.querySelector('.start-count').addEventListener('click', () => {
    const loopsNumber = document.querySelector('.loops-number').value;

    testEmitter(loopsNumber);
});