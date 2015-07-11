/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.PanelComponent",
{
  extend : qx.ui.tree.Tree,


  /**
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */
  /**
       * Create a new instance
       */
  construct : function()
  {
    this.base(arguments);

    this.init();
  },


  /**
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */
  properties :
  {
    model :
    {
      check : "Object",
      init  : null,
      apply : "_applyModel"
    }
  },


  /**
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */
  members :
  {
    __model : null,
    __controller : null,


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function() {},


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyModel : function(value, oldValue)
    {
      if (!qx.lang.Type.isArray(value)) {
        return;
      }

      this.__model.setModel(value);
      this.__controller.setModel(this.__model.getModel());
      this.getRoot().setOpen(true);
    },

    // Public Members.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.__createUI();

      var model = new qxrad.plugin.designer.model.PanelComponent();
      this.__model = model;  //model.getModel();

      this.__controller = new qxrad.plugin.designer.controller.PanelComponent(this.__model.getModel(), this, "children", "name");
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getController : function() {
      return this.__controller;
    }
  }
});