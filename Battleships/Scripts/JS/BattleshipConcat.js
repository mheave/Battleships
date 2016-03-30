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

var Grid;
(function (Grid) {
    var GridCell = (function () {
        function GridCell(x, y) {
            this.GridStringValid = function (coordinates) {
                var regEx = new RegExp("^[A-Ja-j]10$|^[A-Ja-j][0-9]$");
                var valid = regEx.test(coordinates);
                return valid;
            };
            this.AreGridCellsEqual = function (cellOne, cellTwo) {
                if (cellOne === null || cellOne === undefined || cellTwo === null || cellTwo === undefined) {
                    return false;
                }
                return cellOne.Horizontal === cellTwo.Horizontal && cellOne.Vertical === cellTwo.Vertical;
            };
            this.Horizontal = x;
            this.Vertical = y;
        }
        return GridCell;
    }());
    Grid.GridCell = GridCell;
    function parse(cell) {
        var isValid = this.gridStringValid(cell);
        if (!isValid)
            return null;
        var x = cell.toUpperCase().charAt(0);
        var y = parseInt(cell.substr(1, cell.length - 1));
        return new GridCell(x, y);
    }
    Grid.parse = parse;
    function gridStringValid(coordinates) {
        var regEx = new RegExp("^[A-Ja-j]10$|^[A-Ja-j][0-9]$");
        var valid = regEx.test(coordinates);
        return valid;
    }
    Grid.gridStringValid = gridStringValid;
    function areGridCellsEqual(cellOne, cellTwo) {
        if (cellOne === null || cellOne === undefined || cellTwo === null || cellTwo === undefined) {
            return false;
        }
        return cellOne.Horizontal === cellTwo.Horizontal && cellOne.Vertical === cellTwo.Vertical;
    }
    Grid.areGridCellsEqual = areGridCellsEqual;
})(Grid || (Grid = {}));

var Ship;
(function (Ship_1) {
    var Ship = (function () {
        function Ship(name, components) {
            this.Name = name;
            this.Components = components;
        }
        return Ship;
    }());
    Ship_1.Ship = Ship;
    var ShipGenerator = (function () {
        function ShipGenerator() {
            var _this = this;
            this.GenerateShips = function () {
                var battleshipComponents = new Array();
                battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 1)));
                battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 2)));
                battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 3)));
                battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 4)));
                battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 5)));
                _this.Ships.push(new Ship("Battleship", battleshipComponents));
            };
            this.Ships = new Array();
            this.GenerateShips();
        }
        return ShipGenerator;
    }());
    Ship_1.ShipGenerator = ShipGenerator;
})(Ship || (Ship = {}));

var ShipComponents;
(function (ShipComponents) {
    var ShipComponent = (function () {
        function ShipComponent(coordinates) {
            this.Coordinates = coordinates;
            this.HasBeenHit = false;
        }
        return ShipComponent;
    }());
    ShipComponents.ShipComponent = ShipComponent;
})(ShipComponents || (ShipComponents = {}));

var Shot;
(function (Shot_1) {
    var Shot = (function () {
        function Shot(cell, hit) {
            this.CoordinatesOfShot = cell;
            this.DidHit = hit;
        }
        return Shot;
    }());
    Shot_1.Shot = Shot;
})(Shot || (Shot = {}));
