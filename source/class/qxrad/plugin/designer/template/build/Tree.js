/* ************************************************************************

Copyright:

License:

Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.template.build.Tree",
{
  extend : qxrad.plugin.designer.template.build.Default,

  members :
  {
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templateParentAdd : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("\\t{name}.setRoot({childname});\\n");
      return template.get();
    }
  }
});