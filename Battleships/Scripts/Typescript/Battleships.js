var Battleships;
(function (Battleships) {
    var GridPosition = (function () {
        function GridPosition(x, y) {
            var _this = this;
            this.setPosition = function (x, y) {
                _this.HorizontalPosition = x;
                _this.VerticalPosition = y;
            };
            this.HorizontalPosition = x;
            this.VerticalPosition = y;
        }
        return GridPosition;
    })();
    Battleships.GridPosition = GridPosition;
    var BattleshipGame = (function () {
        function BattleshipGame() {
            this.GenerateBoatPositions = function () {
                //var item = items[Math.floor(Math.random() * items.length)];   
            };
            this.GameGrid = new Array();
        }
        return BattleshipGame;
    })();
    Battleships.BattleshipGame = BattleshipGame;
    var GridCell = (function () {
        function GridCell() {
        }
        return GridCell;
    })();
    Battleships.GridCell = GridCell;
    var Ship = (function () {
        function Ship() {
        }
        return Ship;
    })();
    Battleships.Ship = Ship;
    var ShipComponent = (function () {
        function ShipComponent(coordinates, shipDetail) {
            this.Coordinates = coordinates;
            this.HasBeenHit = false;
            this.ShipDetails = shipDetail;
        }
        return ShipComponent;
    })();
    Battleships.ShipComponent = ShipComponent;
    var ShipDetails = (function () {
        function ShipDetails(name, size) {
            this.Name = name;
            this.SizeInGridSquares = size;
        }
        return ShipDetails;
    })();
    Battleships.ShipDetails = ShipDetails;
})(Battleships || (Battleships = {}));
//# sourceMappingURL=Battleships.js.map