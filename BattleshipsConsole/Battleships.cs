using System.Collections.Generic;
using System.Linq;

namespace BattleshipsConsole
{
    public class Battleships
    {
        private const string InvalidGridReference = "The grid reference you entered: {0} is invalid. A-J1-10 only.";
        private const string AlreadyShotMessage = "You have already taken a shot at {0}. Hit a ship: {1}.";
        private const string MissMessage = "Shot taken at {0}....... miss :(";
        private const string HitMessage = "Shot taken at {0}....... Its a direct hit! :D";
        private const string SunkMessage = "BOOM! the last remaining component of {0} has been hit. Status: Sunk! o_O";
        private readonly List<Ship> _ships;
        private readonly List<Shot> _shots;
        private readonly GridCellComparer _gridCellComparer;

        public Battleships()
        {
            var shipGenerator = new ShipGenerator();
            _ships = shipGenerator.Ships;
            _shots = new List<Shot>();
            _gridCellComparer = new GridCellComparer();
        }

        public string TakeShot(string enteredCell)
        {
            GridCell shotCoordinates;
            if (!GridCell.TryParse(enteredCell, out shotCoordinates))
                return string.Format(InvalidGridReference, enteredCell);

            if (CellHasAlreadyBeenShotAt(shotCoordinates))
                return GenerateAndReturnAlreadyShotMessage(shotCoordinates);

            Ship shipHit;
            if (!DidShotHitAShip(shotCoordinates, out shipHit))
                return string.Format(MissMessage, shotCoordinates);

            return WasShotTheFatalBlow(shipHit) ? 
                string.Format(SunkMessage, shipHit.Name) : 
                string.Format(HitMessage, shotCoordinates);
        }

        private bool CellHasAlreadyBeenShotAt(GridCell cellCoordinates)
        {
            return _shots.Any(s => _gridCellComparer.Equals(s.CoordinatesOfShot, cellCoordinates));
        }

        private string GenerateAndReturnAlreadyShotMessage(GridCell cell)
        {
            var shot = _shots.FirstOrDefault(s => _gridCellComparer.Equals(s.CoordinatesOfShot, cell));
            return string.Format(AlreadyShotMessage, cell, shot != null && shot.DidHit);
        }

        private bool DidShotHitAShip(GridCell shotCoordinates, out Ship shipHit)
        {
            shipHit = ReturnShipWhichHasComponentAtCoordinates(shotCoordinates);
            if (shipHit == null)
            {
                RecordShot(shotCoordinates, false);
                return false;
            }
            var componentHit = shipHit.Components.FirstOrDefault(c => _gridCellComparer.Equals(c.Coordinates, shotCoordinates));
            componentHit.HasBeenHit = true;
            RecordShot(shotCoordinates, true);
            return true;
        }

        private static bool WasShotTheFatalBlow(Ship ship)
        {
            return ship.Components.All(c => c.HasBeenHit);
        }

        private Ship ReturnShipWhichHasComponentAtCoordinates(GridCell cellCoordinates)
        {
            return _ships.FirstOrDefault(s => s.Components.Any(c => _gridCellComparer.Equals(c.Coordinates, cellCoordinates)));
        }

        private void RecordShot(GridCell cell, bool wasHit)
        {
            _shots.Add(new Shot(cell, wasHit));
        }

        public bool AllShipsDestroyed
        {
            get { return _ships.All(s => s.Components.All(c => c.HasBeenHit)); }
        }

        public int NoOfShotsTaken => _shots.Count;
    }
}
