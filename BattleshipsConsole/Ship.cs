using System.Collections.Generic;

namespace BattleshipsConsole
{
    public class Ship
    {
        public string Name { get; private set; }
        public List<ShipComponent> Components{ get; private set; }

        public Ship(string name,  List<ShipComponent> components)
        {
            Name = name;
            Components = components;
        }
    }
}