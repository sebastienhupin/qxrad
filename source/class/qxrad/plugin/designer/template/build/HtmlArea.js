/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.template.build.HtmlArea",
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
      template.add("\\tvar {name} = new {classname}({content},null,{source});\\n");
      return template.get();
    }
  }
});