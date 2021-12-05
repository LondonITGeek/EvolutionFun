import {
    fromEvent
} from 'rxjs';
import {
    map
} from 'rxjs/operators';

export default class UserInputs {
    constructor() {
        const source = fromEvent(document, "keydown");
        this.direction$ = source.pipe(map(evt => {
            return this.handleKeyDown(evt);
        }));

        this.currentDirection = "RIGHT";
    }

    handleKeyDown(key) {
        if (key.keyCode === 39) {
            // right pressed
            this.currentDirection = "RIGHT";
        } else if (key.keyCode == 38) {
            // up pressed
            this.currentDirection = "UP";
        } else if (key.keyCode == 37) {
            // left pressed
            this.currentDirection = "LEFT";
        } else if (key.keyCode == 40) {
            // down pressed
            this.currentDirection = "DOWN";
        }

        return this.currentDirection;
    }
}