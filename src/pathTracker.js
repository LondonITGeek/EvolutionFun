import {
    distinctUntilChanged,
    skip
} from 'rxjs/operators';
import {
    Subject
} from 'rxjs';

export default class PathTracker {
    constructor(userInputs, player) {
        this.allPaths = [];
        this.path = [];
        this.path.push({
            ...player.position
        });
        this.player = player;
        this.player.collide$
            .pipe(distinctUntilChanged(), skip(1))
            .subscribe(playerBlocked => {
                console.log(playerBlocked);
                if (playerBlocked) {         
                    this.allPaths.push([...this.path, {...this.player.position}]);
                }
            });

        userInputs.direction$
            .pipe(distinctUntilChanged(), skip(1))
            .subscribe(direction => {
                this.path.push({
                    ...this.player.position
                });
            });
    }

    updateAndRedrawer(ctx) {
        ctx.beginPath();
        const startingPosition = this.path[0];
        ctx.moveTo(startingPosition.x + (this.player.dimensions.width / 2), startingPosition.y + (this.player.dimensions.height / 2));

        if (this.path.length > 1) {
            this.path.forEach(point => {
                ctx.lineTo(point.x + (this.player.dimensions.width / 2), point.y + (this.player.dimensions.height / 2));
            });
        }

        ctx.lineTo(this.player.position.x + (this.player.dimensions.width / 2), this.player.position.y + (this.player.dimensions.height / 2));
        ctx.stroke();

        this.drawerRectangles(ctx);
    }

    drawerRectangles(ctx) {
        this.allPaths.forEach(currentPath => {
            ctx.fillStyle = "red";
            ctx.beginPath();
            const startingPosition = currentPath[0];
            ctx.moveTo(startingPosition.x + (this.player.dimensions.width / 2), startingPosition.y + (this.player.dimensions.height / 2));
    
            if (currentPath.length > 1) {
                currentPath.forEach(point => {
                    ctx.lineTo(point.x + (this.player.dimensions.width / 2), point.y + (this.player.dimensions.height / 2));
                });
            }
    
            ctx.closePath();            
            ctx.fill();
        });
    }
}