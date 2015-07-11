/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qxide_plugin_designer_template_Widget",
{
  extend : qxrad.plugin.designer.component.Container,


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
     * @return {string} TODOC
     */
    _transformClassname : function() {
      return "qx.ui.core.Widget";
    }
  }
});