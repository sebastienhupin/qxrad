/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.core.view.Ide",
{
  extend : qx.ui.container.Composite,




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
    __perspectiveList : null,
    __parttoolbar : null,
    __partbuttonperspective : null,
    __panelleft : null,
    __panelright : null,
    __editorview : null,
    __panellog : null,
    __apiViewer : null,
    __apiViewerController : null,
    __radiogroupbuttonperspective : null,


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPartButtonPerspective : function()
    {
      var part = this.__partbuttonperspective = new qx.ui.toolbar.Part();

      return part;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPartToolbarPerspective : function()
    {
      var part = this.__parttoolbar = new qx.ui.toolbar.Part();

      return part;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createBtQxTheme : function()
    {
      var menuButton = new qx.ui.toolbar.MenuButton("Theme");

      var menu = new qx.ui.menu.Menu();
      menuButton.setMenu(menu);

      var darkRadioButton = new qx.ui.menu.RadioButton();

      darkRadioButton.set(
      {
        "value" : true,
        "label" : "Dark"
      });

      /*
                darkRadioButton.addListener("execute", function (e) {
                  //qx.theme.manager.Meta.getInstance().setTheme(darktheme.DarkTheme);
                });
       */

      menu.add(darkRadioButton);

      var modernRadioButton = new qx.ui.menu.RadioButton();
      modernRadioButton.set({ "label" : "Modern" });

      /*
                modernRadioButton.addListener("execute", function (e) {
                  //qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Modern);
                });
     */

      menu.add(modernRadioButton);

      var classicRadioButton = new qx.ui.menu.RadioButton();
      classicRadioButton.set({ "label" : "Classic" });

      /*
                classicRadioButton.addListener("execute", function (e) {
                  //qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Classic);

                });
       */

      menu.add(classicRadioButton);

      new qx.ui.form.RadioGroup(darkRadioButton, modernRadioButton, classicRadioButton);

      return menuButton;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createToolbar : function()
    {
      var widget = new qx.ui.toolbar.ToolBar();
      var qxButton = new qx.ui.toolbar.Button("qx");
      widget.add(qxButton);

      widget.add(this.__createBtQxTheme());

      widget.add(this.__createPartToolbarPerspective());
      widget.add(this.__createPartButtonPerspective());

      return widget;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelLeft : function()
    {
      var widget = this.__panelleft = new qx.ui.tabview.TabView();
      var explorer = new qx.ui.tabview.Page(this.tr("Explorer"));
      widget.add(explorer);

      return widget;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelRight : function()
    {
      var widget = this.__panelright = new qx.ui.tabview.TabView();
      var help = new qx.ui.tabview.Page(this.tr("Help"));
      help.setLayout(new qx.ui.layout.VBox());
      var apiViewer = this.__createApiViewer();

      help.add(apiViewer, { flex : 1 });
      widget.add(help);

      return widget;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createEditorView : function()
    {
      var widget = this.__editorview = new qx.ui.tabview.TabView();
      widget.setWidth(800);
      widget.setHeight(600);
      var welcome = new qx.ui.tabview.Page(this.tr("Welcome"));
      welcome.setLayout(new qx.ui.layout.VBox());
      var qxFrame = new qx.ui.embed.Iframe();
      qxFrame.setSource("http://www.qooxdoo.org");
      welcome.add(qxFrame, { flex : 1 });
      widget.add(welcome);

      return widget;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelLog : function()
    {
      var widget = this.__panellog = new qx.ui.tabview.TabView();
      var console = new qx.ui.tabview.Page(this.tr("Console"));
      widget.add(console);

      return widget;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createApiViewer : function()
    {
      var frame = this.__apiViewer = new qx.ui.embed.Iframe();
      frame.setSource("http://demo.qooxdoo.org/current/apiviewer/index.html");

      return frame;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      var layout = new qx.ui.layout.Dock();
      this.setLayout(layout);
      
      this.__radiogroupbuttonperspective = new qx.ui.form.RadioGroup();
      
      this.add(this.__createToolbar(),{edge:"north"});
      
      var mainSplitV = new qx.ui.splitpane.Pane("vertical");

      var splitLeft = new qx.ui.splitpane.Pane("horizontal");
      splitLeft.add(this.__createPanelLeft(),0);

      var splitRight = new qx.ui.splitpane.Pane("horizontal");
      splitRight.add(this.__createEditorView(),1);
      splitRight.add(this.__createPanelRight(),0);

      splitLeft.add(splitRight,1);

      mainSplitV.add(splitLeft,2);
      mainSplitV.add(this.__createPanelLog());

      this.add(mainSplitV, {edge:"center"});

    },


    /**
     * TODOC
     *
     * @return {boolean} TODOC
     * @throws TODOC
     */
    __cleanPerspective : function()
    {
      try
      {
        this.getToolBar().removeAll();

        if (this.getPanelLeft().getChildren().length > 1) {
          this.getPanelLeft().remove(this.getPanelLeft().getChildren()[1]);
        }

        if (this.getPanelRight().getChildren().length > 1) {
          this.getPanelRight().remove(this.getPanelRight().getChildren()[1]);
        }

        if (this.getEditorView().getChildren().length > 1) {
          this.getEditorView().remove(this.getEditorView().getChildren()[1]);
        }

        if (this.getPanelLog().getChildren().length > 1) {
          this.getPanelLog().remove(this.getPanelLog().getChildren()[1]);
        }

        return true;
      }
      catch(e)
      {
        throw new Error("Error cleaning perspective : " + e);
      }

      return false;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.__perspectiveList = {};
      this.__createUI();
    },

    // Public methods.
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getToolBar : function() {
      return this.__parttoolbar;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getToolPerspective : function() {
      return this.__partbuttonperspective;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getPanelLeft : function() {
      return this.__panelleft;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getPanelRight : function() {
      return this.__panelright;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getEditorView : function() {
      return this.__editorview;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getPanelLog : function() {
      return this.__panellog;
    },

    /*
             *  {
             *    "name" : <<String>>,
             *    "toolbar" : null,
             *    "editor"  : null,
             *    "panelleft" : null,
             *    "panelright" : null,
             *    "panellog": null
             *   }
             *
             *
             */

    /**
     * TODOC
     *
     * @param perspective {var} TODOC
     * @param active {var} TODOC
     * @return {boolean} TODOC
     */
    addPerspectiveView : function(perspective, active)
    {
      if (!perspective || !perspective.name || !qx.lang.Type.isString(perspective.name))
      {
        this.error("Error to adding a perspective : " + perspective);
        return false;
      }

      var newPerspective = this.__perspectiveList[perspective.name] = {};
      var tools = perspective.tools || {};

      for (var key in tools)
      {
        var page = new qx.ui.tabview.Page();
        page.setLayout(new qx.ui.layout.VBox());

        switch(key)
        {
          case "editor":
            page.setLabel(tools[key].name || "Undefined");
            page.add(tools[key].view, { flex : 1 });
            newPerspective[key] = page;
            break;

          case "toolbar":
            newPerspective[key] = tools[key].view;
            break;

          case "panelleft":
            page.setLabel(tools[key].name || "Undefined");
            page.add(tools[key].view, { flex : 1 });
            newPerspective[key] = page;
            break;

          case "panelright":
            page.setLabel(tools[key].name || "Undefined");
            page.add(tools[key].view, { flex : 1 });
            newPerspective[key] = page;
            break;

          case "panellog":
            page.setLabel(tools[key].name || "Undefined");
            page.add(tools[key].view, { flex : 1 });
            newPerspective[key] = page;
            break;
        }
      }

      var bt = new qx.ui.toolbar.RadioButton(perspective.name);
      this.__radiogroupbuttonperspective.add(bt);
      this.getToolPerspective().add(bt);

      bt.addListener("execute", function(e) {
        this.switchPerspective(perspective.name);
      }, this);

      if (active) {
        bt.execute();
      }

      return true;
    },


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @return {void}
     */
    switchPerspective : function(name)
    {
      if (!this.__perspectiveList[name]) {
        return;
      }

      var perspective = this.__perspectiveList[name];

      if (!this.__cleanPerspective()) {
        return;
      }

      if (perspective.toolbar) {
        this.getToolBar().add(perspective.toolbar);
      }

      if (perspective.editor)
      {
        this.getEditorView().add(perspective.editor);
        this.getEditorView().setSelection([ perspective.editor ]);
      }

      if (perspective.panelleft)
      {
        this.getPanelLeft().add(perspective.panelleft);
        this.getPanelLeft().setSelection([ perspective.panelleft ]);
      }

      if (perspective.panelright)
      {
        this.getPanelRight().add(perspective.panelright);
        this.getPanelRight().setSelection([ perspective.panelright ]);
      }

      if (perspective.panellog)
      {
        this.getPanelLog().add(perspective.panellog);
        this.getPanelLog().setSelection([ perspective.panellog ]);
      }
    }
  }
});