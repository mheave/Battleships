using System.Collections.Generic;

namespace BattleshipsConsole
{
    public class GridCellComparer : IEqualityComparer<GridCell>
    {
        public bool Equals(GridCell x, GridCell y)
        {
            if (x == null || y == null)
                return false;

            return (x.Horizontal == y.Horizontal && x.Vertical == y.Vertical);
        }

        public int GetHashCode(GridCell obj)
        {
            return obj.GetHashCode();
        }
    }
}