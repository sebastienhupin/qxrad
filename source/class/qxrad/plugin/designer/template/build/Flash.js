/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.template.build.Flash",
{
  extend : qxrad.plugin.designer.template.build.Default,

  members :
  {
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templateObjectDefinition : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("\\tvar {name} = new {classname}({source});\\n");
      return template.get();
    }
  }
});