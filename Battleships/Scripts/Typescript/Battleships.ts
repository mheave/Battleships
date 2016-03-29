module Battleships {
    
    export class GridPosition {
        HorizontalPosition: string;
        VerticalPosition: number;

        constructor(x: string, y: number) {
            this.HorizontalPosition = x;
            this.VerticalPosition = y;
        }

        setPosition = (x: string, y: number) => {
            this.HorizontalPosition = x;
            this.VerticalPosition = y;
        }
    }

    export class BattleshipGame {
        GameGrid: Array<GridCell>;


        constructor() {
            this.GameGrid = new Array<GridCell>();
        }

        GenerateBoatPositions = () => {
            //var item = items[Math.floor(Math.random() * items.length)];   

        }
    }

    export class GridCell {
        Coordinates: GridPosition;
        ContainsShip: boolean;

    }

    export class Ship {
        Components: Array<ShipComponent>;
        
    }

    export class ShipComponent {
        Coordinates: GridPosition;
        HasBeenHit: boolean;
        ShipDetails: ShipDetails;

        constructor(coordinates: GridPosition, shipDetail: ShipDetails) {
            this.Coordinates = coordinates;
            this.HasBeenHit = false;
            this.ShipDetails = shipDetail;
        }
    }

    export class ShipDetails {
        Name: string;
        SizeInGridSquares: number;

        constructor(name: string, size: number) {
            this.Name = name;
            this.SizeInGridSquares = size;
        }
    }
}