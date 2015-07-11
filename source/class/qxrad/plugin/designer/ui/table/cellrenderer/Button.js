/* ************************************************************************

    Copyright:

    License:

    Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.cellrenderer.Button",
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
      var content = "<button></button>";

      return content;
    }
  }
});