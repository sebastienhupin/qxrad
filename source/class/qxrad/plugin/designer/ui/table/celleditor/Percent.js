/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.Percent",
{
  extend : qxrad.plugin.designer.ui.table.celleditor.Slider,




  /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */

  /**
      * Create a new instance
      */
  construct : function() {
    this.base(arguments, 0, null, 100);
  },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    // interface implementation
    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {var} TODOC
     */
    createCellEditor : function(cellInfo)
    {
      var cellEditor = this._slider;

      var sValue = cellInfo.value || "0%";

      var value = parseInt(sValue);

      this._slider.addListener("changeValue", function(e)
      {
        var value = e.getData();
        this.getToolTip().setLabel(value + "%");
        this.getToolTip().setVisibility("visible");
      });

      cellEditor.setValue(value);

      return cellEditor;
    },

    // interface iplementations
    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {var} TODOC
     */
    getCellEditorValue : function(cellEditor)
    {
      var value = cellEditor.getValue() + "%";

      return value;
    }
  }
});