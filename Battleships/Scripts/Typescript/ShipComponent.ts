module ShipComponents {   
    export class ShipComponent {
        Coordinates: Grid.GridCell;
        HasBeenHit: boolean;

        constructor(coordinates: Grid.GridCell) {
            this.Coordinates = coordinates;
            this.HasBeenHit = false;
        }
    }
}