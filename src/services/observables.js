import { Subject } from 'rxjs';

const tempSubject = new Subject();
const pressureSubject = new Subject();
const humiditysubject = new Subject();

const randomNumber = (min=0, max) =>  Math.random() * (max-min) + min;

const randomInterval = (callback, min, max) => {
    let targetTime = randomNumber(min, max)

    const tick = () => {
        setTimeout(() => {
            callback(targetTime > 1000 ? true : false)
            tick()
        }, targetTime)
    }

    tick()
}

export const observable = {
    emitTemp: () => {
        randomInterval((condition) => {
            tempSubject.next({
                unit: "°C",
                lastInvoke: Date.now(),
                degree: condition ? 'N/A' : 25.6
            })
        }, 100, 2000);
    },
    getTemperature: () => tempSubject.asObservable(),
    emitPressure: () => {
        randomInterval((condition) => {
            pressureSubject.next({
                unit: "inches",
                lastInvoke: Date.now(),
                degree: condition ? 'N/A' : randomNumber(29.92, 31.0)
            })
        }, 100, 2000);
    },
    getPressure: () => pressureSubject.asObservable(),
    emitHumidity: () => {
        randomInterval((condition) => {
            humiditysubject.next({
                unit: "%",
                lastInvoke: Date.now(),
                degree: condition ? 'N/A' : randomNumber(30, 32)
            })
        }, 100, 2000);
    },
    getHumidity: () => humiditysubject.asObservable()
}