var BattleshipPlayer;
(function (BattleshipPlayer) {
    var TestPlayers = (function () {
        function TestPlayers() {
            var _this = this;
            this.SetupPlayers = function () {
                var playerOne = new PlayerProfile("Human");
                var playerOneBattleshipCoordinates = [new BattleshipGameObjects.GridPosition("A", 1),
                    new BattleshipGameObjects.GridPosition("A", 2),
                    new BattleshipGameObjects.GridPosition("A", 3),
                    new BattleshipGameObjects.GridPosition("A", 4),
                    new BattleshipGameObjects.GridPosition("A", 5)];
                playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("Battleship", 5), playerOneBattleshipCoordinates));
                var playerOneDestroyerOneCoordinates = [new BattleshipGameObjects.GridPosition("C", 2),
                    new BattleshipGameObjects.GridPosition("C", 3),
                    new BattleshipGameObjects.GridPosition("C", 4),
                    new BattleshipGameObjects.GridPosition("C", 5)];
                playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerOne", 4), playerOneDestroyerOneCoordinates));
                var playerOneDestroyerTwoCoordinates = [new BattleshipGameObjects.GridPosition("F", 2),
                    new BattleshipGameObjects.GridPosition("F", 3),
                    new BattleshipGameObjects.GridPosition("F", 4),
                    new BattleshipGameObjects.GridPosition("F", 5)];
                playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerTwo", 4), playerOneDestroyerTwoCoordinates));
                _this.PlayerOne = playerOne;
                var playerTwo = new PlayerProfile("Computer");
                var playerTwoBattleshipCoordinates = [new BattleshipGameObjects.GridPosition("B", 1),
                    new BattleshipGameObjects.GridPosition("B", 2),
                    new BattleshipGameObjects.GridPosition("B", 3),
                    new BattleshipGameObjects.GridPosition("B", 4),
                    new BattleshipGameObjects.GridPosition("B", 5)];
                playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("Battleship", 5), playerTwoBattleshipCoordinates));
                var playerTwoDestroyerOneCoordinates = [new BattleshipGameObjects.GridPosition("D", 2),
                    new BattleshipGameObjects.GridPosition("D", 3),
                    new BattleshipGameObjects.GridPosition("D", 4),
                    new BattleshipGameObjects.GridPosition("D", 5)];
                playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerOne", 4), playerTwoDestroyerOneCoordinates));
                var playerTwoDestroyerTwoCoordinates = [new BattleshipGameObjects.GridPosition("G", 2),
                    new BattleshipGameObjects.GridPosition("G", 3),
                    new BattleshipGameObjects.GridPosition("G", 4),
                    new BattleshipGameObjects.GridPosition("G", 5)];
                playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerTwo", 4), playerTwoDestroyerTwoCoordinates));
                _this.PlayerTwo = playerTwo;
            };
            this.SetupPlayers();
        }
        return TestPlayers;
    }());
    BattleshipPlayer.TestPlayers = TestPlayers;
    var PlayerProfile = (function () {
        function PlayerProfile(name) {
            this.Name = name;
            this.Ships = new Array();
        }
        return PlayerProfile;
    }());
    BattleshipPlayer.PlayerProfile = PlayerProfile;
})(BattleshipPlayer || (BattleshipPlayer = {}));
var BattleshipGameObjects;
(function (BattleshipGameObjects) {
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
    }());
    BattleshipGameObjects.GridPosition = GridPosition;
    var ShipDetails = (function () {
        function ShipDetails(name, size) {
            this.Name = name;
            this.SizeInGridSquares = size;
        }
        return ShipDetails;
    }());
    BattleshipGameObjects.ShipDetails = ShipDetails;
    var ShipComponent = (function () {
        function ShipComponent(owner, coordinates, shipDetail) {
            this.Owner = owner;
            this.Coordinates = coordinates;
            this.HasBeenHit = false;
            this.ShipDetails = shipDetail;
        }
        return ShipComponent;
    }());
    BattleshipGameObjects.ShipComponent = ShipComponent;
    var Ship = (function () {
        function Ship(shipDetail, coordinates) {
            this.ShipCells = coordinates;
            this.ShipDetail = shipDetail;
            this.HasBeenDestroyed = false;
        }
        return Ship;
    }());
    BattleshipGameObjects.Ship = Ship;
})(BattleshipGameObjects || (BattleshipGameObjects = {}));
var BattleshipGameEvents;
(function (BattleshipGameEvents) {
    var ShotEvent = (function () {
        function ShotEvent(coordinates, takenBy) {
            this.shotCoordinatesValid = function (coordinates) {
                var regEx = new RegExp("^[A-J]10$|^[A-J][0-9]$");
                var valid = regEx.test(coordinates);
                return valid;
            };
            if (this.shotCoordinatesValid(coordinates)) {
                this.TakenBy = takenBy;
                this.Location = new BattleshipGameObjects.GridPosition(coordinates.substr(0, 1), parseInt(coordinates.substr(1, 2)));
            }
            else {
                throw new RangeError("The coordinates supplied must be between A-J and 1-10.");
            }
        }
        return ShotEvent;
    }());
    BattleshipGameEvents.ShotEvent = ShotEvent;
})(BattleshipGameEvents || (BattleshipGameEvents = {}));
var BattleshipGame;
(function (BattleshipGame) {
    var BattleshipGameClass = (function () {
        function BattleshipGameClass(playerOne, playerTwo) {
            var _this = this;
            this.setupShips = function () {
                _this.Players[0].Ships.forEach(function (s) {
                    var owner = _this.Players[0].Name;
                    s.ShipCells.forEach(function (c) { _this.Ships.push(new BattleshipGameObjects.ShipComponent(owner, c, s.ShipDetail)); });
                });
                _this.Players[1].Ships.forEach(function (s) {
                    var owner = _this.Players[1].Name;
                    s.ShipCells.forEach(function (c) { _this.Ships.push(new BattleshipGameObjects.ShipComponent(owner, c, s.ShipDetail)); });
                });
            };
            this.ShotTaken = function (coordinates, takenBy) {
                try {
                    console.log("shot taken");
                    var shotEvent = new BattleshipGameEvents.ShotEvent(coordinates, takenBy);
                    _this.ProcessShot(shotEvent);
                }
                catch (e) {
                    console.log(e.message);
                    return e;
                }
            };
            this.ProcessShot = function (shotEvent) {
                var hitShip = _this.GetPositionOfHitShip(shotEvent.TakenBy, shotEvent.Location);
                if (hitShip === -1) {
                    shotEvent.ShipHit = false;
                    _this.Misses.push(shotEvent);
                    return;
                }
                _this.RecordHit(shotEvent, hitShip);
                //var attackingPlayer = this.GetPlayer(shotEvent.TakenBy, false);
                //var defendingPlayer = this.GetPlayer(shotEvent.TakenBy, true);
                //shotEvent.ShipHit = shotEvent.shotWasOnTarget(attackingPlayer, defendingPlayer);
                //return shotEvent;
            };
            this.RecordHit = function (shotEvent, shipIndex) {
                shotEvent.ShipHit = true;
                _this.Hits.push(shotEvent);
                _this.Ships[shipIndex].HasBeenHit = true;
                var beenSunk = _this.CheckIfSunk(shotEvent, shipIndex);
                console.log("Sunk" + beenSunk);
            };
            this.CheckIfSunk = function (shotEvent, shipIndex) {
                var shipComponent = _this.Ships[shipIndex];
                var numberOfHitComponents = _this.Ships.filter(function (s) {
                    return s.Owner != shotEvent.TakenBy &&
                        s.ShipDetails.Name === shipComponent.ShipDetails.Name &&
                        s.HasBeenHit;
                });
                return (numberOfHitComponents.length === shipComponent.ShipDetails.SizeInGridSquares);
            };
            this.GetPositionOfHitShip = function (owner, coordinates) {
                for (var s = 0; s < _this.Ships.length; s++) {
                    var ship = _this.Ships[s];
                    if (ship.Owner === owner)
                        continue;
                    if (ship.Coordinates.HorizontalPosition === coordinates.HorizontalPosition &&
                        ship.Coordinates.VerticalPosition === coordinates.VerticalPosition) {
                        return s;
                    }
                }
                return -1;
            };
            this.GetPlayer = function (playerName, getOpponent) {
                if ((!getOpponent && _this.Players[0].Name === playerName) || (getOpponent && _this.Players[1].Name === playerName)) {
                    return _this.Players[0];
                }
                return _this.Players[1];
            };
            this.Players = [playerOne, playerTwo];
            this.Ships = new Array();
            this.Misses = new Array();
            this.Hits = new Array();
            this.setupShips();
        }
        return BattleshipGameClass;
    }());
    BattleshipGame.BattleshipGameClass = BattleshipGameClass;
})(BattleshipGame || (BattleshipGame = {}));
