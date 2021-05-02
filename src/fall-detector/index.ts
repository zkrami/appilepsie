import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Observable, Subject } from 'rxjs';

export interface FallDetectionData {
    timestamp: any,
    diff: number,
    diffi: number
}
export class FallDetector {



    accelerationSubject: Subject<DeviceMotionAccelerationData> = new Subject<DeviceMotionAccelerationData>();
    sampleSize: number = 1000 / 200; // 10HZ
    samples: number[] = [];
    fallSubject: Subject<FallDetectionData> = new Subject<FallDetectionData>();
    THRESHOLD = 11;

    MIN_THRESHOLD = 2;
    constructor() {
    }

    lastFall: any = null;

    start(test = false) {
        this.subscribeAcceleration(this.onAcceleration.bind(this));

        if (test) {
            setInterval(() => {

                var x = Math.sqrt(Math.random() * 100);
                this.accelerationSubject.next({
                    x: x,
                    y: x,
                    z: x,
                    timestamp: 123
                });
            }, 200);

        }


        DeviceMotion.watchAcceleration({ frequency: 200 }).subscribe((event: any) => {
            this.accelerationSubject.next(event);
        })
    }
    public isFull() {
        return this.samples.length >= this.sampleSize;
    }
    public getDiff() {


        let max = Math.max(...this.samples);
        let min = Math.min(...this.samples);
        let diff = max - min;
        return diff;
    }
    public getMaxIndex() {
        let idx = 0, v = -1;
        for (let i = 0; i < this.samples.length; i++) {
            let cur = this.samples[i];
            if (cur >= v) {
                v = cur;
                idx = i;
            }
        }
        return idx;
    }
    public getMinIndex() {
        let idx = 0, v = 1e9;
        for (let i = 0; i < this.samples.length; i++) {
            let cur = this.samples[i];
            if (cur <= v) {
                v = cur;
                idx = i;
            }
        }
        return idx;
    }
    public isFallDetected() {
        let diff = this.getDiff();
        if (diff < this.THRESHOLD) return false;

        let maxi = this.getMaxIndex();
        let mini = this.getMinIndex();
        let min = this.samples[mini];

        if (min > this.MIN_THRESHOLD) return false;

        var isFall = mini < maxi;

        return isFall;
    }

    public appendWindow(magnitude: number) {

        if (this.isFull())
            this.samples.splice(0, 1);
        this.samples.push(magnitude);
    }
    public calcMagnitude = ({ x, y, z }: { x: number, y: number, z: number }) => Math.sqrt(x * x + y * y + z * z);

    clear() {
        this.samples = [];
    }
    onAcceleration(event: DeviceMotionAccelerationData) {

        const magnitude = this.calcMagnitude(event);
        this.appendWindow(magnitude);
        if (this.isFallDetected()) {

            if (this.lastFall !== null && event.timestamp - this.lastFall < 60) { // ignore falls in the same minutes 
                this.clear();
                return;
            }
            this.fallSubject.next({ timestamp: event.timestamp, diff: this.getDiff(), diffi: Math.abs(this.getMaxIndex() - this.getMinIndex()) });
            this.clear();
            this.lastFall = event.timestamp;
        }
    }

    subscribeAcceleration(observer: any) {
        this.accelerationSubject.subscribe(observer);
    }
    subscribeFall(observer: any) {
        this.fallSubject.subscribe(observer);
    }
}