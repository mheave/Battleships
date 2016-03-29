module BattleshipInterfaces {

    export interface IShip {
        HasBeenDestroyed: boolean;
    }

    export interface IBattleshipType {
        Name: string;
        SizeInGridSquares: number;
    }

    export interface IGridPosition {
        HorizontalPosition: string;
        VerticalPosition: number;
    }

    export interface IPlayerProfile {
        Ships: Array<IShip>;
    }

    export interface IGameSettings {

    }
}

module BattleshipPlayer {
    export class TestPlayers {
        public PlayerOne: PlayerProfile;
        public PlayerTwo: PlayerProfile;

        constructor() {
            this.SetupPlayers();
        }

        SetupPlayers = () => {
            var playerOne = new PlayerProfile("Human");
            var playerOneBattleshipCoordinates = [  new BattleshipGameObjects.GridPosition("A", 1), 
                                                    new BattleshipGameObjects.GridPosition("A", 2),
                                                    new BattleshipGameObjects.GridPosition("A", 3),
                                                    new BattleshipGameObjects.GridPosition("A", 4),
                                                    new BattleshipGameObjects.GridPosition("A", 5)];
            playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("Battleship",5), playerOneBattleshipCoordinates));
            var playerOneDestroyerOneCoordinates = [new BattleshipGameObjects.GridPosition("C", 2),
                                                    new BattleshipGameObjects.GridPosition("C", 3),
                                                    new BattleshipGameObjects.GridPosition("C", 4),
                                                    new BattleshipGameObjects.GridPosition("C", 5)];
            playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerOne",4), playerOneDestroyerOneCoordinates));
            var playerOneDestroyerTwoCoordinates = [new BattleshipGameObjects.GridPosition("F", 2),
                                                    new BattleshipGameObjects.GridPosition("F", 3),
                                                    new BattleshipGameObjects.GridPosition("F", 4),
                                                    new BattleshipGameObjects.GridPosition("F", 5)];
            playerOne.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerTwo",4), playerOneDestroyerTwoCoordinates));
            this.PlayerOne = playerOne;

            var playerTwo = new PlayerProfile("Computer");
            var playerTwoBattleshipCoordinates = [new BattleshipGameObjects.GridPosition("B", 1),
                new BattleshipGameObjects.GridPosition("B", 2),
                new BattleshipGameObjects.GridPosition("B", 3),
                new BattleshipGameObjects.GridPosition("B", 4),
                new BattleshipGameObjects.GridPosition("B", 5)];
            playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("Battleship",5), playerTwoBattleshipCoordinates));
            var playerTwoDestroyerOneCoordinates = [new BattleshipGameObjects.GridPosition("D", 2),
                new BattleshipGameObjects.GridPosition("D", 3),
                new BattleshipGameObjects.GridPosition("D", 4),
                new BattleshipGameObjects.GridPosition("D", 5)];
            playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerOne",4), playerTwoDestroyerOneCoordinates));
            var playerTwoDestroyerTwoCoordinates = [new BattleshipGameObjects.GridPosition("G", 2),
                new BattleshipGameObjects.GridPosition("G", 3),
                new BattleshipGameObjects.GridPosition("G", 4),
                new BattleshipGameObjects.GridPosition("G", 5)];
            playerTwo.Ships.push(new BattleshipGameObjects.Ship(new BattleshipGameObjects.ShipDetails("DestroyerTwo",4), playerTwoDestroyerTwoCoordinates));
            this.PlayerTwo = playerTwo;

        }


    }

    export class PlayerProfile implements BattleshipInterfaces.IPlayerProfile {
        Name: string;
        Ships: Array<BattleshipGameObjects.Ship>;
        
        constructor(name: string) {
            this.Name = name;
            this.Ships = new Array<BattleshipGameObjects.Ship>();
        }
    }
}

module BattleshipGameObjects
{
    export class GridPosition implements BattleshipInterfaces.IGridPosition {
        HorizontalPosition: string;
        VerticalPosition: number;

        constructor(x: string, y: number) {
            this.HorizontalPosition = x;
            this.VerticalPosition = y;
        }

        setPosition = (x: string, y: number) => {
            this.HorizontalPosition = x;
            this.VerticalPosition = y;
        }
    }

    export class ShipDetails implements BattleshipInterfaces.IBattleshipType {
        Name: string;
        SizeInGridSquares: number;

        constructor(name: string, size: number) {
            this.Name = name;
            this.SizeInGridSquares = size;
        }
    }

    export class ShipComponent {
        Owner: string;
        Coordinates: GridPosition;
        HasBeenHit: boolean;
        ShipDetails: ShipDetails;

        constructor(owner: string, coordinates: GridPosition, shipDetail: ShipDetails) {
            this.Owner = owner;
            this.Coordinates = coordinates;
            this.HasBeenHit = false;
            this.ShipDetails = shipDetail;
        }
    }

    export class Ship implements BattleshipInterfaces.IShip {
        ShipCells: Array<GridPosition>;
        HasBeenDestroyed: boolean;
        ShipDetail: ShipDetails;

        constructor(shipDetail: ShipDetails, coordinates: Array<GridPosition>) {
            this.ShipCells = coordinates;
            this.ShipDetail = shipDetail;
            this.HasBeenDestroyed = false;
        }
    }
}

module BattleshipGameEvents {
    export class ShotEvent {
        TakenBy: string;
        Location: BattleshipGameObjects.GridPosition;
        ShipHit: boolean;

        constructor(coordinates: string, takenBy: string) {
            if (this.shotCoordinatesValid(coordinates)) {
                this.TakenBy = takenBy;
                this.Location = new BattleshipGameObjects.GridPosition(coordinates.substr(0, 1), parseInt(coordinates.substr(1, 2)));
                //todo: already taken?
            }
            else {
                throw new RangeError("The coordinates supplied must be between A-J and 1-10.");
            }
        }

        shotCoordinatesValid = (coordinates: string) => {
            var regEx = new RegExp("^[A-J]10$|^[A-J][0-9]$");
            var valid = regEx.test(coordinates);
            return valid;
        }
    }
}

module BattleshipGame {

    export class BattleshipGameClass {
        Players: Array<BattleshipPlayer.PlayerProfile>;
        Ships: Array<BattleshipGameObjects.ShipComponent>;
        Misses: Array<BattleshipGameEvents.ShotEvent>;
        Hits: Array<BattleshipGameEvents.ShotEvent>;

        constructor(playerOne: BattleshipPlayer.PlayerProfile, playerTwo: BattleshipPlayer.PlayerProfile)
        {
            this.Players = [playerOne, playerTwo];
            this.Ships = new Array<BattleshipGameObjects.ShipComponent>();
            this.Misses = new Array<BattleshipGameEvents.ShotEvent>();
            this.Hits = new Array<BattleshipGameEvents.ShotEvent>();
            this.setupShips();
        }

        setupShips = () => {
            this.Players[0].Ships.forEach((s) => {
                var owner = this.Players[0].Name;
                s.ShipCells.forEach((c) => {this.Ships.push(new BattleshipGameObjects.ShipComponent(owner, c, s.ShipDetail));});
            });
            this.Players[1].Ships.forEach((s) => {
                var owner = this.Players[1].Name;
                s.ShipCells.forEach((c) => { this.Ships.push(new BattleshipGameObjects.ShipComponent(owner, c, s.ShipDetail)); });
            });
        }

        ShotTaken = (coordinates: string, takenBy: string) => {
            try {
                console.log("shot taken");
                var shotEvent = new BattleshipGameEvents.ShotEvent(coordinates, takenBy)
                this.ProcessShot(shotEvent);
                //this.Hits.push(shotEvent);
            }
            catch (e) {
                console.log(e.message);
                return e;
            }
           
        }

        ProcessShot = (shotEvent: BattleshipGameEvents.ShotEvent) => {
            var hitShip = this.GetPositionOfHitShip(shotEvent.TakenBy, shotEvent.Location);
            if (hitShip === -1) {
                shotEvent.ShipHit = false;
                this.Misses.push(shotEvent);
                return;
            }

            this.RecordHit(shotEvent, hitShip);


            //var attackingPlayer = this.GetPlayer(shotEvent.TakenBy, false);
            //var defendingPlayer = this.GetPlayer(shotEvent.TakenBy, true);
            //shotEvent.ShipHit = shotEvent.shotWasOnTarget(attackingPlayer, defendingPlayer);
            //return shotEvent;
        }

        RecordHit = (shotEvent: BattleshipGameEvents.ShotEvent, shipIndex: number) => {
            shotEvent.ShipHit = true;
            this.Hits.push(shotEvent);
            this.Ships[shipIndex].HasBeenHit = true;
            var beenSunk = this.CheckIfSunk(shotEvent, shipIndex);
            console.log("Sunk" + beenSunk);
        }

        CheckIfSunk = (shotEvent: BattleshipGameEvents.ShotEvent, shipIndex: number) => {
            var shipComponent = this.Ships[shipIndex];
            var numberOfHitComponents = this.Ships.filter((s) => {
                return s.Owner != shotEvent.TakenBy &&
                    s.ShipDetails.Name === shipComponent.ShipDetails.Name &&
                    s.HasBeenHit;
            });
            return (numberOfHitComponents.length === shipComponent.ShipDetails.SizeInGridSquares);
        }
        

        GetPositionOfHitShip = (owner: string, coordinates: BattleshipGameObjects.GridPosition) => {
            for (var s = 0; s < this.Ships.length; s++) {
                var ship = this.Ships[s];
                if (ship.Owner === owner)
                    continue;

                if (ship.Coordinates.HorizontalPosition === coordinates.HorizontalPosition &&
                    ship.Coordinates.VerticalPosition === coordinates.VerticalPosition) {
                    return s;
                }                
            }
            return -1;
        }

      

        GetPlayer = (playerName: string, getOpponent: boolean) => {
            if ((!getOpponent && this.Players[0].Name === playerName) || (getOpponent && this.Players[1].Name === playerName)) {
                return this.Players[0];
            }
            return this.Players[1];
        }
    }

}

