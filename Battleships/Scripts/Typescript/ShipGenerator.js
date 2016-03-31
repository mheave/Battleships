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
