/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_form_SplitButton",
{
  extend : qxrad.plugin.designer.patch.qx_ui_menu_AbstractButton,


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

      // Removing this listener because it make a stop propagation.
      this.getObject().removeListener("mouseover", this.getObject()._onMouseOver, this.getObject(), true);
    }
  }
});