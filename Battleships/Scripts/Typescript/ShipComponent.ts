module ShipComponents {   
    export class ShipComponent {
        coordinates: Grid.GridCell;
        hasBeenHit: boolean;

        constructor(coordinates: Grid.GridCell) {
            this.coordinates = coordinates;
            this.hasBeenHit = false;
        }
    }
}