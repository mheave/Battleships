module Shot {
    export class Shot {
        CoordinatesOfShot: Grid.GridCell;
        DidHit: boolean;

        constructor(cell: Grid.GridCell, hit: boolean) {
            this.CoordinatesOfShot = cell;
            this.DidHit = hit;
        }
    }    

}