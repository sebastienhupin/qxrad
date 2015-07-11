/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_menu_AbstractButton",
{
  extend : qxrad.plugin.designer.patch.qx_ui_basic_Atom,


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    // Patch for managing the menu.
    /**
     * TODOC
     *
     * @param object {var} TODOC
     * @return {void}
     */
    setObject : function(object)
    {
      this.base(arguments, object);

      this.getObject().addListener("mouseover", function(e)
      {
        var menu = this.getMenu();

        if (menu) {
          menu.open();
        }
      });
    },

    _template : qxrad.plugin.designer.template.build.AbstractButton,


    /**
     * TODOC
     *
     * @param child {var} TODOC
     * @return {void}
     * @throws TODOC
     */
    _addChildHelper : function(child)
    {
      if (!child.getWidget()) {
        throw new Error("Attach a widget to the component before add it.");
      }

      this.setProperty("menu", child);
      this.setDroppable(false);
      child.setParent(this);
      if (child._finalize) {
      	child._finalize();
      }      
    },

    /**
     * TODOC
     *
     * @param child {var} TODOC
     * @return {void}
     */
    _removeChildHelper : function(child)
    {
      this.setProperty("menu", null);
      this.setDroppable(true);
    }
  }
});