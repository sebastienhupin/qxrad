/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.PanelInspector",
{
  extend : qx.ui.tabview.TabView,




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

    this.init();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  events : { "changeTheme" : "qx.event.type.Event" },




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
    __pageAppearance : null,
    __pageColor : null,
    __pageDecoration : null,
    __pageFont : null,
    __colorEditor : null,
    __appearanceEditor : null,


    /**
     * TODOC
     *
     * @return {void}
     */
    updateTheme : function()
    {
      qx.Theme.define("MyCustomTheme",
      {
        title  : 'MyCustomTheme',
        extend : qx.theme.manager.Meta.getInstance().getTheme()
      });

      qx.theme.manager.Meta.getInstance().setTheme(MyCustomTheme);
    },


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @return {var} TODOC
     */
    __createPage : function(name)
    {
      var page = new qx.ui.tabview.Page(name);
      return page;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPageAppearance : function()
    {
      var page = this.__pageAppearance = this.__createPage("Appearance");
      page.setLayout(new qx.ui.layout.VBox());
      var editor = this.__appearanceEditor = new qxrad.plugin.theme.view.inspector.AppearanceEditor();

      editor.addListener("changeThemeAppearance", function(e) {
        this.fireEvent("changeTheme");
      }, this);

      page.add(editor, { flex : 1 });
      this.add(page);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPageColor : function()
    {
      var page = this.__pageColor = this.__createPage("Color");
      page.setLayout(new qx.ui.layout.VBox());
      var editor = this.__colorEditor = new qxrad.plugin.theme.view.inspector.ColorEditor();

      editor.addListener("changeThemeColor", function(e) {
        this.fireEvent("changeTheme");
      }, this);

      page.add(editor, { flex : 1 });
      this.add(page);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPageDecoration : function()
    {
      var page = this.__pageDecoration = this.__createPage("Decoration");
      page.setLayout(new qx.ui.layout.VBox());
      var editor = new qxrad.plugin.theme.view.inspector.DecoratorEditor();

      editor.addListener("changeThemeDecorator", function(e) {
        this.fireEvent("changeTheme");
      }, this);

      page.add(editor, { flex : 1 });
      this.add(page);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPageFont : function()
    {
      var page = this.__pageFont = this.__createPage("Font");
      this.add(page);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      this.__createPageAppearance();
      this.__createPageColor();
      this.__createPageDecoration();
      this.__createPageFont();
    },

    /*
              var theme = qx.theme.manager.Meta.getInstance().getTheme();
              //this.debug("Test theme : " + qx.dev.Debug.debugObjectToString(theme));
              //this.debug("Test theme : " + qx.dev.Debug.debugObject(theme.meta.color));
              this.debug("Test theme name : " + theme.meta.color.colors["background-application"]);
              */

    // Public members.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.updateTheme();
      this.__createUI();
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    reset : function()
    {
      this.__appearanceEditor._analyse();
      this.__colorEditor._analyse();
    }
  },




  /*
         *****************************************************************************
            DESTRUCTOR
         *****************************************************************************
         */

  destruct : function() {}
});