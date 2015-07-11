/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_basic_Atom",
{
  extend : qxrad.plugin.designer.component.Widget,


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    /**
     * TODOC
     *
     * @param object {var} TODOC
     * @return {void}
     */
    setObject : function(object)
    {
      this.base(arguments, object);
      this.setProperty("label", this.getObject().basename);
    }
  }
});