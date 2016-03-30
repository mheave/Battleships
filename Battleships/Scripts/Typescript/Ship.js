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
