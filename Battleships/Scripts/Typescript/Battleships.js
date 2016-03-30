var Battleships;
(function (Battleships) {
    var BattleshipsGame = (function () {
        function BattleshipsGame() {
            this.TakeShot = function (shotCoordinates) {
                if (!Grid.gridStringValid(shotCoordinates)) {
                    return "invalid coordinates";
                }
                var gridCell = Grid.parse(shotCoordinates);
                if (gridCell === null) {
                    return "cant generate cell";
                }
            };
            var shipGenerator = new Ship.ShipGenerator();
            this.Ships = shipGenerator.Ships;
            this.Shots = new Array();
        }
        return BattleshipsGame;
    })();
    Battleships.BattleshipsGame = BattleshipsGame;
})(Battleships || (Battleships = {}));
