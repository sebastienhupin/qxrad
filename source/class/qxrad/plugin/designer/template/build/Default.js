/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.template.build.Default",
{
  extend : qx.core.Object,


  /**
     *****************************************************************************
       CONSTRUCTOR
     *****************************************************************************
     */
  /**
     * Create a new instance
     */
  construct : function() {
    this.base(arguments);
  },

  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {

_templateClassDefinition : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("qx.Class.define(\"{{namespace}}\",{\n");
      template.add("  extend : {{classname}},\n");
      template.add("  include : [\n");
      template.add("              qx.ui.core.MLayoutHandling,\n");
      template.add("              qx.ui.core.MChildrenHandling\n");
      template.add("            ],\n");
      template.add("  construct : function() {\n");
      template.add("    this.base(arguments);\n");
      template.add("    this.init();\n");
      template.add("  },\n");
      template.add("  members : {\n");
      template.add("    __createUI : function () {\n");
      template.add("{{{code}}}");
      template.add("\n");
      template.add("    },\n");
      template.add("    init : function () {\n");
      template.add("        this.__createUI();\n");
      template.add("    }\n");
      template.add("  }\n");
      template.add("});\n");
      return template.get();
    },



    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templateObjectDefinition : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("\tvar {{name}} = new {{classname}}();\n");
      return template.get();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templatePropertiesDefinition : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("\t{{name}}.set( {{{properties}}} );\n");
      return template.get();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templateLayoutPropertiesDefinition : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("\t{{name}}.setLayoutProperties( {{{properties}}} );\n");
      return template.get();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templateLayoutDefinition : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("\t{{name}}.setLayout({{layoutname}});\n");
      return template.get();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templateParentAdd : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("\t{{name}}.add({{childname}});\n");
      return template.get();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _templateToTryWithPlayground : function()
    {
      var template = new qx.util.StringBuilder();
      template.add("/*\n");
      template.add("**************************************************\n");
      template.add("*     To try your class with the playground.     *\n");
      template.add("**************************************************\n");
      template.add("*/\n");
      template.add("var doc = this.getRoot();\n");
      template.add("var widget = new my.Widget();\n");
      template.add("doc.add(widget);\n");
      return template.get();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getTemplateClassDefinition : function() {
      return this._templateClassDefinition();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getTemplateObjectDefinition : function() {
      return this._templateObjectDefinition();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getTemplatePropertiesDefinition : function() {
      return this._templatePropertiesDefinition();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getTemplateLayoutPropertiesDefinition : function() {
      return this._templateLayoutPropertiesDefinition();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getTemplateLayoutDefinition : function() {
      return this._templateLayoutDefinition();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getTemplateParentAdd : function() {
      return this._templateParentAdd();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getTemplateToTryWithPlayground : function() {
      return this._templateToTryWithPlayground();
    }
  }
});