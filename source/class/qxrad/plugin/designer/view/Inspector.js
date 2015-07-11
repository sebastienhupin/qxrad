/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.Inspector",
{
  extend : qx.ui.window.Window,




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

    this.addListenerOnce("resize", this.center, this);
  },


  /**
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  properties :
  {
    component :
    {
      check : "qxrad.plugin.designer.component.Abstract",
      init  : null,
      apply : "_applyComponent",
      event : "changeComponent"
    }
  },




  /**
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __inspector : null,


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param old {var} TODOC
     * @return {void}
     */
    _applyComponent : function(value, old)
    {
      if (!value) {
        return;
      }
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createInspector : function()
    {
      var inspector = this.__inspector = new qxrad.plugin.designer.view.inspector.ObjectInspector();
      return inspector;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      this.setCaption("Inspector");

      this.setLayout(new qx.ui.layout.VBox());

      this.add(this.__createInspector(), { flex : 1 });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __connectWidgets : function() {
      this.bind("component", this.__inspector, "component");
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.__createUI();
      this.__connectWidgets();
    }
  }
});