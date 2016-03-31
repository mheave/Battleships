var Battleships;
(function (Battleships) {
    var BattleshipsGame = (function () {
        function BattleshipsGame() {
            var _this = this;
            this.takeShot = function (shotCoordinates) {
                if (!Grid.gridStringValid(shotCoordinates)) {
                    return "The coordinates you have entered are invalid. Please enter coordinates in the range [A-J][1-10].";
                }
                var gridCell = Grid.parse(shotCoordinates);
                if (gridCell === null || gridCell === undefined) {
                    return "The coordinates you have entered are invalid. Please enter coordinates in the range [A-J][1-10].";
                }
                if (_this.cellAlreadyShotAt(gridCell)) {
                    return "You have already shot at cell " + gridCell.toString();
                }
                var shipHit = _this.returnShipHit(gridCell);
                if (shipHit === null) {
                    return "Shot at cell " + gridCell.toString() + " missed!";
                }
                if (_this.wasShotFatalBlow(shipHit)) {
                    return "You have destroyed " + _this.ships[shipHit].name + "!";
                }
                return "Direct hit on " + _this.ships[shipHit].name + " at grid position " + gridCell.toString();
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
                return _this.ships.every(function (s) { return s.components.every(function (c) { return c.hasBeenHit; }); });
            };
            var shipGenerator = new ShipGenerators.ShipGenerator();
            this.ships = shipGenerator.ships;
            this.shots = new Array();
        }
        return BattleshipsGame;
    })();
    Battleships.BattleshipsGame = BattleshipsGame;
})(Battleships || (Battleships = {}));
