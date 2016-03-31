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

var Grid;
(function (Grid) {
    var GridCell = (function () {
        function GridCell(x, y) {
            var _this = this;
            this.toString = function () {
                return _this.horizontal + _this.vertical;
            };
            this.horizontal = x;
            this.vertical = y;
        }
        return GridCell;
    })();
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
        return cellOne.horizontal === cellTwo.horizontal && cellOne.vertical === cellTwo.vertical;
    }
    Grid.areGridCellsEqual = areGridCellsEqual;
})(Grid || (Grid = {}));

var Ships;
(function (Ships) {
    var Ship = (function () {
        function Ship(name, components) {
            this.name = name;
            this.components = components;
        }
        return Ship;
    })();
    Ships.Ship = Ship;
})(Ships || (Ships = {}));

var ShipComponents;
(function (ShipComponents) {
    var ShipComponent = (function () {
        function ShipComponent(coordinates) {
            this.coordinates = coordinates;
            this.hasBeenHit = false;
        }
        return ShipComponent;
    })();
    ShipComponents.ShipComponent = ShipComponent;
})(ShipComponents || (ShipComponents = {}));

var ShipGenerators;
(function (ShipGenerators) {
    var ShipGenerator = (function () {
        function ShipGenerator() {
            var _this = this;
            this.generateShips = function () {
                _this.ships = new Array();
                _this.addRandomShip("Battleship", 5);
                _this.addRandomShip("Destroyer One", 4);
                _this.addRandomShip("Destroyer Two", 4);
            };
            this.addRandomShip = function (name, size) {
                var columnToPlaceShip = _this.columns[Math.round(Math.random() * 9)];
                while (_this.columnInUse(columnToPlaceShip)) {
                    columnToPlaceShip = _this.columns[Math.round(Math.random() * 9)];
                }
                var startingVerticalPosition = Math.round(Math.random() * (10 - size));
                var shipCompoents = new Array();
                for (var component = size; component > 0; component--) {
                    var sc = new ShipComponents.ShipComponent(new Grid.GridCell(columnToPlaceShip, startingVerticalPosition + component));
                    shipCompoents.push(sc);
                }
                _this.ships.push(new Ships.Ship(name, shipCompoents));
            };
            this.columnInUse = function (column) {
                var shipsUsingColumn = _this.ships.filter(function (s) { return s.components.filter(function (c) { return c.coordinates.horizontal === column; }).length > 0; });
                return shipsUsingColumn.length > 0;
            };
            this.columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
            this.generateShips();
        }
        return ShipGenerator;
    })();
    ShipGenerators.ShipGenerator = ShipGenerator;
})(ShipGenerators || (ShipGenerators = {}));

var Shots;
(function (Shots) {
    var Shot = (function () {
        function Shot(cell, hit) {
            this.coordinatesOfShot = cell;
            this.didHit = hit;
        }
        return Shot;
    })();
    Shots.Shot = Shot;
})(Shots || (Shots = {}));
