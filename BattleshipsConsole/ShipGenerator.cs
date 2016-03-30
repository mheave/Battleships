using System.Collections.Generic;

namespace BattleshipsConsole
{
    public static class ShipGenerator
    {
        public static List<Ship> GenerateAndReturnShips()
        {
            var ships = new List<Ship>();

            var battleshipComponents = new List<ShipComponent>();
            battleshipComponents.Add(new ShipComponent(new GridCell('A',1)));
            battleshipComponents.Add(new ShipComponent(new GridCell('A', 2)));
            battleshipComponents.Add(new ShipComponent(new GridCell('A', 3)));
            battleshipComponents.Add(new ShipComponent(new GridCell('A', 4)));
            battleshipComponents.Add(new ShipComponent(new GridCell('A', 5)));
            ships.Add(new Ship("Battleship", battleshipComponents));

            var destroyerOneComponents = new List<ShipComponent>();
            destroyerOneComponents.Add(new ShipComponent(new GridCell('C', 1)));
            destroyerOneComponents.Add(new ShipComponent(new GridCell('C', 2)));
            destroyerOneComponents.Add(new ShipComponent(new GridCell('C', 3)));
            destroyerOneComponents.Add(new ShipComponent(new GridCell('C', 4)));
            ships.Add(new Ship("DestroyerOne", destroyerOneComponents));

            var destroyerTwoComponents = new List<ShipComponent>();
            destroyerTwoComponents.Add(new ShipComponent(new GridCell('H', 1)));
            destroyerTwoComponents.Add(new ShipComponent(new GridCell('H', 2)));
            destroyerTwoComponents.Add(new ShipComponent(new GridCell('H', 3)));
            destroyerTwoComponents.Add(new ShipComponent(new GridCell('H', 4)));
            ships.Add(new Ship("DestroyerTwo", destroyerTwoComponents));

            return ships;
        }
    }
}
