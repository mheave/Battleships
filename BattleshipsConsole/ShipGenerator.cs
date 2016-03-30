using System;
using System.Collections.Generic;
using System.Linq;

namespace BattleshipsConsole
{
    public class ShipGenerator
    {
        public List<Ship> Ships { get; private set; }

        private readonly char[] _availableColumns = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'};

        public ShipGenerator()
        {
            GenerateRandomShips();
        }

        private void GenerateRandomShips()
        {
            Ships = new List<Ship>();
            AddRandomShip("Battleship", 5);
            AddRandomShip("DestroyerOne", 4);
            AddRandomShip("DestroyerTwo", 4);
        }

        private void AddRandomShip(string name, int size)
        {
            var rnd = new Random();
            var columnToUse = _availableColumns[rnd.Next(_availableColumns.Length)];
            while (ColumnInUse(columnToUse))
            {
                columnToUse = _availableColumns[rnd.Next(_availableColumns.Length)];
            }

            var startingVerticalPosition = rnd.Next(10 - size);
            var components = new List<ShipComponent>();
            for (var component = size; component > 0; component--)
            {
                var sc = new ShipComponent(new GridCell(columnToUse, startingVerticalPosition+component));
                components.Add(sc);
            }
            Ships.Add(new Ship(name, components));
        }

        private bool ColumnInUse(char column)
        {
            return Ships.Any(s => s.Components.Any(c => c.Coordinates.Horizontal == column));
        }

    }
}
