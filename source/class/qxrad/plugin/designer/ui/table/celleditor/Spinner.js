/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.Spinner",
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
  construct : function(component)
  {
    this.base(arguments);

    this.__spinner = new qx.ui.form.Spinner(this.getMinimum(), null, this.getMaximum());
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
      check : "Number",
      init  : 1,
      apply : "_applySingleStep"
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
      init  : 1000000
    }
  },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __spinner : null,


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applySingleStep : function(value, oldValue) {
      this.__spinner.setSingleStep(value);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyMinimum : function(value, oldValue) {
      this.__spinner.setMinimum(value);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyMaximum : function(value, oldValue) {
      this.__spinner.setMaximum(value);
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
      var cellEditor = this.__spinner;

      var value = cellInfo.value;
      cellEditor.setValue(value || 0);

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