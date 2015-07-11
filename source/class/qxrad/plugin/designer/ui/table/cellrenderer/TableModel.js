/* ************************************************************************

    Copyright:

    License:

    Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.cellrenderer.TableModel",
{
  extend : qx.ui.table.cellrenderer.Default,




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
     * @return {var} TODOC
     */
    _getContentHtml : function(cellInfo)
    {
      var value = cellInfo.value.getName() + "";

      return value;
    }
  }
});