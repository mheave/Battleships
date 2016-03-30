var Battleships;
(function (Battleships) {
    var BattleshipsGame = (function () {
        function BattleshipsGame() {
            var _this = this;
            this.TakeShot = function (shotCoordinates) {
                if (!Grid.gridStringValid(shotCoordinates)) {
                    return "invalid coordinates";
                }
                var gridCell = Grid.parse(shotCoordinates);
                if (gridCell === null) {
                    return "cant generate cell";
                }
                if (_this.CellAlreadyShotAt(gridCell)) {
                    return "already shot at";
                }
                var shipHit = _this.ReturnShipHit(gridCell);
                if (shipHit === null) {
                    return "miss";
                }
                if (_this.WasShotFatalBlow(shipHit)) {
                    return "fatality!";
                }
                return "Hit on ship";
            };
            this.CellAlreadyShotAt = function (cell) {
                var existingShot = _this.Shots.filter(function (s) { return Grid.areGridCellsEqual(s.CoordinatesOfShot, cell); });
                if (existingShot.length > 0) {
                    return true;
                }
                return false;
            };
            this.ReturnShipHit = function (cell) {
                var shipHit = _this.ReturnIndexOfShipWhichHasComponentAtCoordinate(cell);
                if (shipHit === -1) {
                    _this.RecordShot(cell, false);
                    return null;
                }
                _this.RecordShot(cell, true);
                return shipHit;
            };
            this.ReturnIndexOfShipWhichHasComponentAtCoordinate = function (cell) {
                for (var s = 0; s < _this.Ships.length; s++) {
                    var ship = _this.Ships[s];
                    var matchingCoordinates = ship.Components.filter(function (c) { return Grid.areGridCellsEqual(c.Coordinates, cell); });
                    if (matchingCoordinates.length > 0) {
                        return s;
                    }
                }
                return -1;
            };
            this.RecordShot = function (cell, didHit) {
                _this.Shots.push(new Shot.Shot(cell, didHit));
            };
            this.SetShipComponentToHit = function (shipIndex, cell) {
                var ship = _this.Ships[shipIndex];
                for (var s = 0; s < ship.Components.length; s++) {
                    if (Grid.areGridCellsEqual(ship.Components[s].Coordinates, cell)) {
                        _this.Ships[shipIndex].Components[s].HasBeenHit = true;
                        break;
                    }
                }
            };
            this.WasShotFatalBlow = function (shipIndex) {
                var shipHit = _this.Ships[shipIndex];
                return shipHit.Components.every(function (c) { return c.HasBeenHit; });
            };
            var shipGenerator = new Ship.ShipGenerator();
            this.Ships = shipGenerator.Ships;
            this.Shots = new Array();
        }
        return BattleshipsGame;
    }());
    Battleships.BattleshipsGame = BattleshipsGame;
})(Battleships || (Battleships = {}));
