/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */
/**
 * @asset(qxrad/icon/16/*)
 *
 */
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
     * Apply the model
     *
     * @param model JSON The model tree to apply
     * @param oldModel JSON The old model tree
     */
    _applyModel : function(model, oldModel)
    {
      
      var marshal = new qx.data.marshal.Json();
      marshal.toClass(model, true);
      this.__model = marshal.toModel(model);

      this.__controller.setModel(this.__model);
      
      this.getRoot().setOpen(true);
    },

    // Public Members.
    /**
     * Init the component
     *
     */
    init : function()
    {
      this.__createUI();
      this.__controller = new qxrad.plugin.designer.controller.PanelComponent(null, this, "children", "name", "icon");
    },


    /**
     * Return the controller
     *
     * @return qxrad.plugin.designer.controller.PanelComponent The component controller
     */
    getController : function() {
      return this.__controller;
    }
  }
});