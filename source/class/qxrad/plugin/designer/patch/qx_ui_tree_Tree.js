/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_tree_Tree",
{
  extend : qxrad.plugin.designer.component.Widget,


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    _template : qxrad.plugin.designer.template.build.Tree,

    // Patch for managing the root folder.
    
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

      this.setProperty("root", child);
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
      this.setProperty("root", null);
      this.setDroppable(true);
    }
  }
});