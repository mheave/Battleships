var Battleships;
(function (Battleships) {
    var BattleshipsGame = (function () {
        function BattleshipsGame() {
            var _this = this;
            this.takeShot = function (shotCoordinates) {
                if (!Grid.gridStringValid(shotCoordinates)) {
                    return "invalid coordinates";
                }
                var gridCell = Grid.parse(shotCoordinates);
                if (gridCell === null) {
                    return "cant generate cell";
                }
                if (_this.cellAlreadyShotAt(gridCell)) {
                    return "already shot at";
                }
                var shipHit = _this.returnShipHit(gridCell);
                if (shipHit === null) {
                    return "miss";
                }
                if (_this.wasShotFatalBlow(shipHit)) {
                    return "fatality!";
                }
                return "Hit on ship";
            };
            this.cellAlreadyShotAt = function (cell) {
                var existingShot = _this.shots.filter(function (s) { return Grid.areGridCellsEqual(s.coordinatesOfShot, cell); });
                if (existingShot.length > 0) {
                    return true;
                }
                return false;
            };
            this.returnShipHit = function (cell) {
                var shipHit = _this.returnIndexOfShipWhichHasComponentAtCoordinate(cell);
                if (shipHit === -1) {
                    _this.recordShot(cell, false);
                    return null;
                }
                _this.recordShot(cell, true);
                _this.setShipComponentToHit(shipHit, cell);
                return shipHit;
            };
            this.returnIndexOfShipWhichHasComponentAtCoordinate = function (cell) {
                for (var s = 0; s < _this.ships.length; s++) {
                    var ship = _this.ships[s];
                    var matchingCoordinates = ship.components.filter(function (c) { return Grid.areGridCellsEqual(c.coordinates, cell); });
                    if (matchingCoordinates.length > 0) {
                        return s;
                    }
                }
                return -1;
            };
            this.recordShot = function (cell, didHit) {
                _this.shots.push(new Shots.Shot(cell, didHit));
            };
            this.setShipComponentToHit = function (shipIndex, cell) {
                var ship = _this.ships[shipIndex];
                for (var s = 0; s < ship.components.length; s++) {
                    if (Grid.areGridCellsEqual(ship.components[s].coordinates, cell)) {
                        _this.ships[shipIndex].components[s].hasBeenHit = true;
                        break;
                    }
                }
            };
            this.wasShotFatalBlow = function (shipIndex) {
                var shipHit = _this.ships[shipIndex];
                return shipHit.components.every(function (c) { return c.hasBeenHit; });
            };
            this.allShipsDestroyed = function () {
                var shipsDestroyed = _this.ships.every(function (s) { return s.components.every(function (c) { return c.hasBeenHit; }); });
                console.log(shipsDestroyed);
                return shipsDestroyed;
            };
            var shipGenerator = new ShipGenerators.ShipGenerator();
            this.ships = shipGenerator.ships;
            this.shots = new Array();
        }
        return BattleshipsGame;
    })();
    Battleships.BattleshipsGame = BattleshipsGame;
})(Battleships || (Battleships = {}));
