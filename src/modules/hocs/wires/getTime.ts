import {
    register,
    ValueChangedEvent,
    WireEventTarget,
} from '@lwc/wire-service';
import { formatDate } from 'c/utils';

export default function getTime(): void {
    throw new Error('Imperative use is not supported. Use @wire(adapterId)');
}

register(getTime, (eventTarget: WireEventTarget) => {
    let interval: number | null = null;

    const disconnect = () => {
        interval && window.clearInterval(interval);
    };

    const emit = () =>
        eventTarget.dispatchEvent(
            new ValueChangedEvent(
                formatDate(new Date(), {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                })
            )
        );

    eventTarget.addEventListener('connect', () => {
        disconnect();
        emit();

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        interval = window.setInterval(emit, 1000);
    });

    eventTarget.addEventListener('disconnect', disconnect);
});
