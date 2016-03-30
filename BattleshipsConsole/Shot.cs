namespace BattleshipsConsole
{
    public class Shot
    {
        public GridCell CoordinatesOfShot { get; private set; }
        public bool DidHit { get; private set; }

        public Shot(GridCell cell, bool result)
        {
            CoordinatesOfShot = cell;
            DidHit = result;
        }
    }
}
