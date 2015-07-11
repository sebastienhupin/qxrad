/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.Theme",
{
  extend : qx.core.Object,
  include : [ qxrad.core.MPerspective ],
  statics : {},




  /*
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */

  /**
       * Create a new instance
       */
  construct : function()
  {
    this.base(arguments);
    this.setPerspectiveName("Theme");

    this.init();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  /*
      events :
      {

      },
  */

  /*
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  /*
       properties :
       {

       },
  */

  /*
       *****************************************************************************
          STATICS
       *****************************************************************************
       */

  /*
       statics :
       {

       },
  */

  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    /**
     * TODOC
     *
     * @return {void}
     */
    __createToolBar : function() {
      this.setToolBar(new qxrad.plugin.theme.view.ToolBar());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPanelLeft : function() {
      this.setPanelLeft(new qxrad.plugin.theme.view.PanelComponent());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPanelRight : function()
    {
      var inspector = new qxrad.plugin.theme.view.PanelInspector();

      inspector.addListener("changeTheme", function(e) {
        this.getEditor().reset();
      }, this);

      this.setPanelRight(inspector);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createEditor : function() {
      this.setEditor(new qxrad.plugin.theme.view.Editor());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPanellog : function() {
      this.setPanelLog(new qxrad.plugin.theme.view.PanelLog());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      this.__createToolBar();
      this.__createPanelLeft();
      this.__createPanelRight();
      this.__createEditor();
      this.__createPanellog();
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __connectComponent : function()
    {
      var btSave = this.getToolBar().getButtonByName("save");

      if (btSave)
      {
        btSave.addListener("execute", function(e)
        {
          var editor = qxrad.core.view.Editor.getInstance();
          var source = this.serialize();
          editor.setSource(source);
          editor.open();
        },
        this);
      }
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    serialize : function()
    {
      /*
                  *
      qx.Theme.define("my.theme.Custom",
      {
        title : "Custom",
        extend : qx.theme.Modern,

        meta :
        {
          color : {

          },
          decoration : qx.theme.modern.Decoration,
          font : qx.theme.modern.Font,
          appearance : qx.theme.modern.Appearance,
          icon : qx.theme.icon.Tango
        }
      });
                  */

      var templateDef = new qx.util.StringBuilder();
      templateDef.add("qx.Theme.define(\"my.theme.Custom\",\\n");
      templateDef.add("{\\n");
      templateDef.add("\\ttitle : \"Custom\",\\n");
      templateDef.add("\\textend : qx.theme.Modern,\\n");
      templateDef.add("\\tmeta :\\n");
      templateDef.add("\\t{\\n");
      templateDef.add("\\t\\tcolor : {\\n");
      templateDef.add("\\t\\t\\tcolors :\\n");
      templateDef.add("{colors}\\n");
      templateDef.add("\\t\\t},\\n");
      templateDef.add("\\t\\tdecoration : {\\n");
      templateDef.add("\\t\\t\\tdecorations :\\n");
      templateDef.add("{decorations}\\n");
      templateDef.add("\\t\\t},\\n");
      templateDef.add("\\t\\tfont : qx.theme.modern.Font,\\n");
      templateDef.add("\\t\\tappearance : qx.theme.modern.Appearance,\\n");
      templateDef.add("\\t\\ticon : qx.theme.icon.Tango\\n");
      templateDef.add("\\t\\t}\\n");
      templateDef.add("});\\n");
      var template = new qx.util.Template(templateDef.get());

      var theme = null;
      var decorationTheme = qx.theme.manager.Decoration.getInstance().getTheme();
      var decorations = qx.lang.Json.stringify(decorationTheme.decorations, true);
      decorations = decorations.replace(/\[Class (.*)\]/g, "$1");

      var colorTheme = qx.theme.manager.Color.getInstance().getTheme();
      var colors = qx.lang.Json.stringify(colorTheme.colors, true);

      this.debug(decorations);

      theme = template.run(
      {
        "colors"      : colors,
        "decorations" : decorations
      });

      return theme;
    },

    // Public memebers.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      //this.debug(qx.dev.Debug.debugObject(qx.theme.manager.Meta.getInstance().getTheme().meta));
      this._toolBarName = null;
      this._editorName = "Theme";
      this._panelLeftName = "";
      this._panelRightName = "Inspector";
      this._panelLogName = "Log";

      this.__createUI();
      this.__connectComponent();
    }
  }
});