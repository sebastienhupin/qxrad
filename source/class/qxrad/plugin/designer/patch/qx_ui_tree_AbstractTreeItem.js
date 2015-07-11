/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_tree_AbstractTreeItem",
{
  extend : qxrad.plugin.designer.patch.qx_ui_basic_Atom,

  members :
  {
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getProperties : function()
    {
      var props = qx.Class.getProperties(this.getObject().constructor);

      // We remove here the parent property, because it can be
      // setting to null and make an exception.
      qx.lang.Array.remove(props, "parent");
      return props;
    }
  }
});