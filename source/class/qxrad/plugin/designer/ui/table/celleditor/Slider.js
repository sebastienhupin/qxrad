/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.Slider",
{
  extend : qx.core.Object,
  implement : qx.ui.table.ICellEditorFactory,




  /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */

  /**
      * Create a new instance
      */
  construct : function(min, value, max)
  {
    this.base(arguments);

    var slider = this._slider = new qx.ui.form.Slider();
    slider.setMinimum(min ? min : this.getMinimum());
    slider.setValue(value ? value : null);
    slider.setMaximum(max ? max : this.getMaximum());
    slider.setToolTip(new qx.ui.tooltip.ToolTip());
  },




  /*
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  properties :
  {

    /** The amount to increment on each event (keypress or mousedown) */
    singleStep :
    {
      check : "Integer",
      apply : "_applySingleStep",
      init  : 1
    },

    /** minimal value of the Range object */
    minimum :
    {
      check : "Number",
      apply : "_applyMinimum",
      init  : 0
    },

    /** maximal value of the Range object */
    maximum :
    {
      check : "Number",
      apply : "_applyMaximum",
      init  : 100
    }
  },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    _slider : null,


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applySingleStep : function(value, oldValue) {
      this._slider.setSingleStep(value);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyMinimum : function(value, oldValue) {
      this._slider.setMinimum(value);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyMaximum : function(value, oldValue) {
      this._slider.setMaximum(value);
    },

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

      var value = cellInfo.value;

      this._slider.addListener("changeValue", function(e)
      {
        var value = e.getData();
        this.getToolTip().setLabel(value + "");
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
      var value = cellEditor.getValue();

      return value;
    }
  }
});