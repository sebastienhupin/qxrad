/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * Specific data cell renderer for numbers.
 */
qx.Class.define("qxrad.plugin.designer.ui.table.cellrenderer.Number",
{
  extend : qx.ui.table.cellrenderer.Number,




  /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

  members :
  {
    // overridden
    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {string} TODOC
     */
    _getCellClass : function(cellInfo) {
      return "qooxdoo-table-cell qooxdoo-table-cell-left";
    }
  }
});