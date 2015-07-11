/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * Specific data cell renderer for numbers.
 */
qx.Class.define("qxrad.plugin.designer.ui.table.cellrenderer.Boolean",
{
  extend : qx.ui.table.cellrenderer.Boolean,




  /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */

  construct : function()
  {
    this.base(arguments);

    this.stylesheet = qx.bom.Stylesheet.createElement(".qooxdoo-table-cell-icon {" + "  text-align:left;" + "  padding-top:1px;" + "}");
  }
});