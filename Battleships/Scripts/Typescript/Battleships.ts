module Battleships {
    export class BattleshipsGame {
        ships: Array<Ships.Ship>;
        shots: Array<Shots.Shot>;    

        constructor() {
            var shipGenerator = new ShipGenerators.ShipGenerator();
            this.ships = shipGenerator.ships;
            this.shots = new Array<Shots.Shot>();
        }

        takeShot = (shotCoordinates: string) => {
            if (!Grid.gridStringValid(shotCoordinates)) {
                return "invalid coordinates";
            }

            var gridCell = Grid.parse(shotCoordinates);
            if (gridCell === null) {
                return "cant generate cell";
            }

            if (this.cellAlreadyShotAt(gridCell)) {
                return "already shot at";
            }

            var shipHit = this.returnShipHit(gridCell);
            if (shipHit === null) {
                return "miss";
            }

            if (this.wasShotFatalBlow(shipHit)) {
                return "fatality!";
            }

            return "Hit on ship";
        }

        cellAlreadyShotAt = (cell: Grid.GridCell) => {
            var existingShot = this.shots.filter((s) => Grid.areGridCellsEqual(s.coordinatesOfShot, cell));
            if (existingShot.length > 0) {
                return true;
            }
            return false;
        }

        returnShipHit = (cell: Grid.GridCell) => {
            var shipHit = this.returnIndexOfShipWhichHasComponentAtCoordinate(cell);
            if (shipHit === -1) {
                this.recordShot(cell, false);
                return null;
            }
            this.recordShot(cell, true);
            this.setShipComponentToHit(shipHit, cell);
            return shipHit;
        }

        returnIndexOfShipWhichHasComponentAtCoordinate = (cell: Grid.GridCell) => {
            for (var s = 0; s < this.ships.length; s++) {
                var ship = this.ships[s];
                var matchingCoordinates = ship.components.filter((c) => Grid.areGridCellsEqual(c.coordinates, cell));
                if (matchingCoordinates.length > 0) {
                    return s;
                }            
            }
            return -1;
        }

        recordShot = (cell: Grid.GridCell, didHit: boolean) => {
            this.shots.push(new Shots.Shot(cell, didHit));
        }

        setShipComponentToHit = (shipIndex: number, cell: Grid.GridCell) => {
            var ship = this.ships[shipIndex];
            for (var s = 0; s < ship.components.length; s++) {
                if (Grid.areGridCellsEqual(ship.components[s].coordinates, cell)) {
                    this.ships[shipIndex].components[s].hasBeenHit = true;
                    break;
                }
            }
        }

        wasShotFatalBlow = (shipIndex: number) => {
            var shipHit = this.ships[shipIndex];
            return shipHit.components.every((c) => c.hasBeenHit);
        }

        allShipsDestroyed = () => {
            var shipsDestroyed = this.ships.every((s) => s.components.every((c) => c.hasBeenHit));
            console.log(shipsDestroyed);
            return shipsDestroyed;
        }
    }
}