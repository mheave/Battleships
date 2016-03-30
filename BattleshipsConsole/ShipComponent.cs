namespace BattleshipsConsole
{
    public class ShipComponent
    {
        public bool HasBeenHit { get; set; }
        public GridCell Coordinates { get; private set; }

        public ShipComponent(GridCell coordinates)
        {
            Coordinates = coordinates;
        }
    }
}