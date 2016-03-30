//module BattleshipInterfaces {
//    export interface IShip {
//        HasBeenDestroyed: boolean;
//    }
//    export interface IBattleshipType {
//        Name: string;
//        SizeInGridSquares: number;
//    }
//    export interface IGridPosition {
//        HorizontalPosition: string;
//        VerticalPosition: number;
//    }
//    export interface IPlayerProfile {
//        Ships: Array<IShip>;
//    }
//    export interface IGameSettings {
//    }
//}
//module BattleshipPlayer {
//    export class TestPlayers {
//        public PlayerOne: PlayerProfile;
//        public PlayerTwo: PlayerProfile;
//        constructor() {
//            this.SetupPlayers();
//        }
//        SetupPlayers = () => {
//            var playerOne = new PlayerProfile("Human");
//            var playerOneBattleshipCoordinates = [  new BattleshipGameObjects.GridPosition("A", 1), 
//                                                    new BattleshipGameObjects.GridPosition("A", 2),
//                                                    new BattleshipGameObjects.GridPosition("A", 3),
//                                                    new BattleshipGameObjects.GridPosition("A", 4),
//                                                    new BattleshipGameObjects.GridPosition("A", 5)];
//            playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("Battleship",5), playerOneBattleshipCoordinates));
//            var playerOneDestroyerOneCoordinates = [new BattleshipGameObjects.GridPosition("C", 2),
//                                                    new BattleshipGameObjects.GridPosition("C", 3),
//                                                    new BattleshipGameObjects.GridPosition("C", 4),
//                                                    new BattleshipGameObjects.GridPosition("C", 5)];
//            playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerOne",4), playerOneDestroyerOneCoordinates));
//            var playerOneDestroyerTwoCoordinates = [new BattleshipGameObjects.GridPosition("F", 2),
//                                                    new BattleshipGameObjects.GridPosition("F", 3),
//                                                    new BattleshipGameObjects.GridPosition("F", 4),
//                                                    new BattleshipGameObjects.GridPosition("F", 5)];
//            playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerTwo",4), playerOneDestroyerTwoCoordinates));
//            this.PlayerOne = playerOne;
//            var playerTwo = new PlayerProfile("Computer");
//            var playerTwoBattleshipCoordinates = [new BattleshipGameObjects.GridPosition("B", 1),
//                new BattleshipGameObjects.GridPosition("B", 2),
//                new BattleshipGameObjects.GridPosition("B", 3),
//                new BattleshipGameObjects.GridPosition("B", 4),
//                new BattleshipGameObjects.GridPosition("B", 5)];
//            playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("Battleship",5), playerTwoBattleshipCoordinates));
//            var playerTwoDestroyerOneCoordinates = [new BattleshipGameObjects.GridPosition("D", 2),
//                new BattleshipGameObjects.GridPosition("D", 3),
//                new BattleshipGameObjects.GridPosition("D", 4),
//                new BattleshipGameObjects.GridPosition("D", 5)];
//            playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerOne",4), playerTwoDestroyerOneCoordinates));
//            var playerTwoDestroyerTwoCoordinates = [new BattleshipGameObjects.GridPosition("G", 2),
//                new BattleshipGameObjects.GridPosition("G", 3),
//                new BattleshipGameObjects.GridPosition("G", 4),
//                new BattleshipGameObjects.GridPosition("G", 5)];
//            playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerTwo",4), playerTwoDestroyerTwoCoordinates));
//            this.PlayerTwo = playerTwo;
//        }
//    }
//    export class PlayerProfile implements BattleshipInterfaces.IPlayerProfile {
//        Name: string;
//        Ships: Array<BattleshipGameObjects.Ship>;
//        constructor(name: string) {
//            this.Name = name;
//            this.Ships = new Array<BattleshipGameObjects.Ship>();
//        }
//    }
//}
//module BattleshipGameObjects
//{
//    export class GridPosition implements BattleshipInterfaces.IGridPosition {
//        HorizontalPosition: string;
//        VerticalPosition: number;
//        constructor(x: string, y: number) {
//            this.HorizontalPosition = x;
//            this.VerticalPosition = y;
//        }
//        setPosition = (x: string, y: number) => {
//            this.HorizontalPosition = x;
//            this.VerticalPosition = y;
//        }
//    }
//    export class ShipDetails implements BattleshipInterfaces.IBattleshipType {
//        Name: string;
//        SizeInGridSquares: number;
//        constructor(name: string, size: number) {
//            this.Name = name;
//            this.SizeInGridSquares = size;
//        }
//    }
//    export class ShipComponent {
//        Owner: string;
//        Coordinates: GridPosition;
//        HasBeenHit: boolean;
//        ShipDetails: ShipDetails;
//        constructor(owner: string, coordinates: GridPosition, shipDetail: ShipDetails) {
//            this.Owner = owner;
//            this.Coordinates = coordinates;
//            this.HasBeenHit = false;
//            this.ShipDetails = shipDetail;
//        }
//    }
//    export class Ship implements BattleshipInterfaces.IShip {
//        ShipCells: Array<GridPosition>;
//        HasBeenDestroyed: boolean;
//        ShipDetail: ShipDetails;
//        constructor(shipDetail: ShipDetails, coordinates: Array<GridPosition>) {
//            this.ShipCells = coordinates;
//            this.ShipDetail = shipDetail;
//            this.HasBeenDestroyed = false;
//        }
//    }
//}
//module BattleshipGameEvents {
//    export class ShotEvent {
//        TakenBy: string;
//        Location: BattleshipGameObjects.GridPosition;
//        ShipHit: boolean;
//        constructor(coordinates: string, takenBy: string) {
//            if (this.shotCoordinatesValid(coordinates)) {
//                this.TakenBy = takenBy;
//                this.Location = new BattleshipGameObjects.GridPosition(coordinates.substr(0, 1), parseInt(coordinates.substr(1, 2)));
//                //todo: already taken?
//            }
//            else {
//                throw new RangeError("The coordinates supplied must be between A-J and 1-10.");
//            }
//        }
//        shotCoordinatesValid = (coordinates: string) => {
//            var regEx = new RegExp("^[A-J]10$|^[A-J][0-9]$");
//            var valid = regEx.test(coordinates);
//            return valid;
//        }
//    }
//}
//module BattleshipGame {
//    export class BattleshipGameClass {
//        Players: Array<BattleshipPlayer.PlayerProfile>;
//        Ships: Array<BattleshipGameObjects.ShipComponent>;
//        Misses: Array<BattleshipGameEvents.ShotEvent>;
//        Hits: Array<BattleshipGameEvents.ShotEvent>;
//        constructor(playerOne: BattleshipPlayer.PlayerProfile, playerTwo: BattleshipPlayer.PlayerProfile)
//        {
//            this.Players = [playerOne, playerTwo];
//            this.Ships = new Array<BattleshipGameObjects.ShipComponent>();
//            this.Misses = new Array<BattleshipGameEvents.ShotEvent>();
//            this.Hits = new Array<BattleshipGameEvents.ShotEvent>();
//            this.setupShips();
//        }
//        setupShips = () => {
//            this.Players[0].Ships.forEach((s) => {
//                var owner = this.Players[0].Name;
//                s.ShipCells.forEach((c) => {this.Ships.push(new BattleshipGameObjects.ShipComponent(owner, c, s.ShipDetail));});
//            });
//            this.Players[1].Ships.forEach((s) => {
//                var owner = this.Players[1].Name;
//                s.ShipCells.forEach((c) => { this.Ships.push(new BattleshipGameObjects.ShipComponent(owner, c, s.ShipDetail)); });
//            });
//        }
//        ShotTaken = (coordinates: string, takenBy: string) => {
//            try {
//                console.log("shot taken");
//                var shotEvent = new BattleshipGameEvents.ShotEvent(coordinates, takenBy)
//                this.ProcessShot(shotEvent);
//                //this.Hits.push(shotEvent);
//            }
//            catch (e) {
//                console.log(e.message);
//                return e;
//            }
//        }
//        ProcessShot = (shotEvent: BattleshipGameEvents.ShotEvent) => {
//            var hitShip = this.GetPositionOfHitShip(shotEvent.TakenBy, shotEvent.Location);
//            if (hitShip === -1) {
//                shotEvent.ShipHit = false;
//                this.Misses.push(shotEvent);
//                return;
//            }
//            this.RecordHit(shotEvent, hitShip);
//            //var attackingPlayer = this.GetPlayer(shotEvent.TakenBy, false);
//            //var defendingPlayer = this.GetPlayer(shotEvent.TakenBy, true);
//            //shotEvent.ShipHit = shotEvent.shotWasOnTarget(attackingPlayer, defendingPlayer);
//            //return shotEvent;
//        }
//        RecordHit = (shotEvent: BattleshipGameEvents.ShotEvent, shipIndex: number) => {
//            shotEvent.ShipHit = true;
//            this.Hits.push(shotEvent);
//            this.Ships[shipIndex].HasBeenHit = true;
//            var beenSunk = this.CheckIfSunk(shotEvent, shipIndex);
//            console.log("Sunk" + beenSunk);
//        }
//        CheckIfSunk = (shotEvent: BattleshipGameEvents.ShotEvent, shipIndex: number) => {
//            var shipComponent = this.Ships[shipIndex];
//            var numberOfHitComponents = this.Ships.filter((s) => {
//                return s.Owner != shotEvent.TakenBy &&
//                    s.ShipDetails.Name === shipComponent.ShipDetails.Name &&
//                    s.HasBeenHit;
//            });
//            return (numberOfHitComponents.length === shipComponent.ShipDetails.SizeInGridSquares);
//        }
//        GetPositionOfHitShip = (owner: string, coordinates: BattleshipGameObjects.GridPosition) => {
//            for (var s = 0; s < this.Ships.length; s++) {
//                var ship = this.Ships[s];
//                if (ship.Owner === owner)
//                    continue;
//                if (ship.Coordinates.HorizontalPosition === coordinates.HorizontalPosition &&
//                    ship.Coordinates.VerticalPosition === coordinates.VerticalPosition) {
//                    return s;
//                }                
//            }
//            return -1;
//        }
//        GetPlayer = (playerName: string, getOpponent: boolean) => {
//            if ((!getOpponent && this.Players[0].Name === playerName) || (getOpponent && this.Players[1].Name === playerName)) {
//                return this.Players[0];
//            }
//            return this.Players[1];
//        }
//    }
//}
//# sourceMappingURL=BattleshipInterfaces.js.map
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
//# sourceMappingURL=Battleships.js.map
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
        var isValid = this.GridStringValid(cell);
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
//# sourceMappingURL=GridCell.js.map
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
//# sourceMappingURL=Ship.js.map
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
//# sourceMappingURL=ShipComponent.js.map
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
//# sourceMappingURL=Shot.js.map