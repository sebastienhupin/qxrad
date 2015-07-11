/* ************************************************************************

    Copyright:

    License:

    Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.cellrenderer.Object",
{
  extend : qx.ui.table.cellrenderer.Default,




  /*
         *****************************************************************************
            MEMBERS
         *****************************************************************************
         */

  members :
  {
    __component : null,

    // overridden
    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {var} TODOC
     */
    _getContentHtml : function(cellInfo)
    {
      var value = "";

      if (cellInfo.value)
      {
        //value = cellInfo.value.constructor.basename + "";
        value = cellInfo.value.getName();
      }

      return value;
    }
  }
});