module Shots {
    export class Shot {
        coordinatesOfShot: Grid.GridCell;
        didHit: boolean;

        constructor(cell: Grid.GridCell, hit: boolean) {
            this.coordinatesOfShot = cell;
            this.didHit = hit;
        }
    }    
}