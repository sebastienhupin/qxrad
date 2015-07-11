/* ************************************************************************

    Copyright:

    License:

    Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.cellrenderer.Color",
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
      var value = cellInfo.value;

      var color = value;
      var contentString = "";

      if (qx.lang.Type.isString(value))
      {
        color = qx.util.ColorUtil.stringToRgbString(value);
        contentString = value;
      }

      var style = "float: left;width:20px;height:20px;background-color:" + color;
      var content = "<div style=\"" + style + "\"></div>" + contentString;

      return content;
    }
  }
});