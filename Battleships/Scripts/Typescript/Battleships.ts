module Battleships {

    export class BattleshipsGame {
        Ships: Array<Ship.Ship>;
        Shots: Array<Shot.Shot>;    

        constructor() {
            var shipGenerator = new Ship.ShipGenerator();
            this.Ships = shipGenerator.Ships;
            this.Shots = new Array<Shot.Shot>();
        }

        TakeShot = (shotCoordinates: string) => {
            if (!Grid.gridStringValid(shotCoordinates)) {
                return "invalid coordinates";
            }

            var gridCell = Grid.parse(shotCoordinates);
            if (gridCell === null) {
                return "cant generate cell";
            }

            if (this.CellAlreadyShotAt(gridCell)) {
                return "already shot at";
            }

            var shipHit = this.ReturnShipHit(gridCell);
            if (shipHit === null) {
                return "miss";
            }

            if (this.WasShotFatalBlow(shipHit)) {
                return "fatality!";
            }

            return "Hit on ship";
        }

        CellAlreadyShotAt = (cell: Grid.GridCell) => {
            var existingShot = this.Shots.filter((s) => Grid.areGridCellsEqual(s.CoordinatesOfShot, cell));
            if (existingShot.length > 0) {
                return true;
            }
            return false;
        }

        ReturnShipHit = (cell: Grid.GridCell) => {
            var shipHit = this.ReturnIndexOfShipWhichHasComponentAtCoordinate(cell);
            if (shipHit === -1) {
                this.RecordShot(cell, false);
                return null;
            }
            this.RecordShot(cell, true);
            return shipHit;
        }

        ReturnIndexOfShipWhichHasComponentAtCoordinate = (cell: Grid.GridCell) => {
            for (var s = 0; s < this.Ships.length; s++) {
                var ship = this.Ships[s];
                var matchingCoordinates = ship.Components.filter((c) => Grid.areGridCellsEqual(c.Coordinates, cell));
                if (matchingCoordinates.length > 0) {
                    return s;
                }            
            }
            return -1;
        }

        RecordShot = (cell: Grid.GridCell, didHit: boolean) => {
            this.Shots.push(new Shot.Shot(cell, didHit));
        }

        SetShipComponentToHit = (shipIndex: number, cell: Grid.GridCell) => {
            var ship = this.Ships[shipIndex];
            for (var s = 0; s < ship.Components.length; s++) {
                if (Grid.areGridCellsEqual(ship.Components[s].Coordinates, cell)) {
                    this.Ships[shipIndex].Components[s].HasBeenHit = true;
                    break;
                }
            }
        }

        WasShotFatalBlow = (shipIndex: number) => {
            var shipHit = this.Ships[shipIndex];
            return shipHit.Components.every((c) => c.HasBeenHit);
        }
    }

}