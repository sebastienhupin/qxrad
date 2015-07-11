/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.Designer",
{
  extend : qx.core.Object,
  include : [ qxrad.core.MPerspective ],
  statics : { DropDataTypeList : null },


  /**
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
    this.setPerspectiveName("Designer");

    this.init();
  },


  /**
     *****************************************************************************
           MEMBERS
     *****************************************************************************
     */
  members :
  {
    __controller : null,
    __inspector : null,


    /**
     * TODOC
     *
     * @return {void}
     */
    __createInspector : function() {
      this.__inspector = new qxrad.plugin.designer.view.Inspector();
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createToolBar : function() {
      this.setToolBar(new qxrad.plugin.designer.view.ToolBar());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPanelLeft : function() {
      this.setPanelLeft(new qxrad.plugin.designer.view.PanelComponent());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPanelRight : function() {
      this.setPanelRight(new qxrad.plugin.designer.view.PanelHierarchy());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createEditor : function() {
      this.setEditor(new qxrad.plugin.designer.view.Editor());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createPanellog : function() {
      this.setPanelLog(new qxrad.plugin.designer.view.PanelLog());
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
      this.__createInspector();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createMyWidget : function()
    {
      var myWidget = qxrad.util.Component.createWithSource({ "classname" : "qxrad.plugin.designer.template.MyWidget" });
      myWidget._isClassModel = true;

      this.getEditor()._container.add(myWidget.getContainer());
      myWidget._finalize();
      return myWidget;
    },


    /**
     * TODOC
     *
     * @param rootComponent {var} TODOC
     * @return {void}
     */
    __connectController : function(rootComponent)
    {
      var controller = this.__controller = qxrad.plugin.designer.core.Controller.getInstance();

      controller.setTarget(this.getPanelRight());
      controller.setModel(rootComponent);

      controller.bind("selection[0]", this.getInspector(), "component");
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __connectComponent : function()
    {
      var btInspector = this.getToolBar().getButtonByName("inspector");

      if (btInspector) {
        btInspector.addListener("execute", this.__inspector.open, this.__inspector);
      }

      var btDelete = this.getToolBar().getButtonByName("delete");

      if (btDelete)
      {
        btDelete.addListener("execute", function(e)
        {
          var currentComponent = this.getController().getCurrentSelectedComponenent();

          if (!currentComponent) {
            return;
          }

          currentComponent.remove();
        },
        this);
      }

      var btLoad = this.getToolBar().getButtonByName("load");

      if (btLoad)
      {
        btLoad.addListener("execute", function(e)
        {
          var editor = qxrad.core.view.Editor.getInstance();
          editor.setSource(null);

          editor.addListenerOnce("confirm", function(e)
          {
            var source = editor.getSource();
            this._loadSource(source);
          },
          this);

          editor.open();
        },
        this);
      }

      var btSource = this.getToolBar().getButtonByName("source");

      if (btSource)
      {
        btSource.addListener("execute", function(e)
        {
          var controller = qxrad.plugin.designer.core.Controller.getInstance();

          var source = controller.getModel().serialize();

          var editor = qxrad.core.view.Editor.getInstance();
          //qx.util.Json.stringify.CONVERT_DATES = true;
          editor.setSource(qx.lang.Json.stringify(source, true));
          editor.open();
        },
        this);
      }

      var btBuild = this.getToolBar().getButtonByName("build");

      if (btBuild)
      {
        btBuild.addListener("execute", function(e)
        {
          var controller = qxrad.plugin.designer.core.Controller.getInstance();
          var code = controller.getModel().build();

          var editor = qxrad.core.view.Editor.getInstance();
          editor.setSource(code);
          editor.open();
        },
        this);
      }
    },


    /**
     * TODOC
     *
     * @param data {var} TODOC
     * @return {void}
     */
    _loadSource : function(data)
    {
      var source = qx.lang.Json.parse(data);
      this.getEditor()._container.remove(this.__controller.getModel().getObject());
      this.__controller.setModel(null);

      // first create the root component and attach it to the controller.
      // It is really important to set in first the root and the controller,
      // otherwise root children they do not added to the tree hierarchy.
      var classname = source.classname;

      if (!classname)
      {
        this.error("The classname can not be null !!!\nInvalid source file ...");
        return;
      }

      var rootComponent = qxrad.util.Component.createWithSource(source);      
      rootComponent._isClassModel = true;      

      // Add the root component to the editor.
      this.getEditor()._container.add(rootComponent.getObject());
      rootComponent._finalize();

      this.__controller.setModel(rootComponent);
      
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _loadSettings : function()
    {
      var settings = new qxrad.plugin.designer.core.Settings([
      {
        "name" : "componentsList",
        "url"  : "settings/plugin/designer/components.json"
      },
      {
        "name" : "dropDataTypeList",
        "url"  : "settings/plugin/designer/DropDataType.json"
      } ]);

      return settings;
    },

    // Public Members.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this._toolBarName = null;
      this._editorName = "Designer";
      this._panelLeftName = "Components";
      this._panelRightName = "Hierarchy";
      this._panelLogName = "Log";

      this.__createUI();

      var settings = this._loadSettings();

      settings.addListenerOnce("completed", function(e)
      {
        this.getPanelLeft().setModel(e.getData().componentsList);
        qxrad.plugin.Designer.DropDataTypeList = qxrad.plugin.designer.core.DropDataType.define(e.getData().dropDataTypeList);
        this.finalize();
      },
      this);

      settings.load();
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    finalize : function()
    {
      var rootComponent = this.__createMyWidget();
      this.__connectController(rootComponent);
      this.__connectComponent();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getController : function() {
      return this.__controller;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getInspector : function() {
      return this.__inspector;
    }
  }
});