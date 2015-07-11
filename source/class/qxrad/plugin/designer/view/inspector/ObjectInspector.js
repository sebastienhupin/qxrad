/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.inspector.ObjectInspector",
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

  properties :
  {
    component :
    {
      check    : "qxrad.plugin.designer.component.Abstract",
      init     : null,
      nullable : true,
      apply    : "_applyComponent",
      event    : "changeComponent"
    }
  },




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
    __tabview : null,
    __componentPropertyEditorPanel : null,
    __propertyEditorPanel : null,
    __themeablePropertyEditorPanel : null,
    __layoutEditorPanel : null,
    __layoutPropertyEditorPanel : null,
    __componentPropertyEditor : null,
    __propertyEditor : null,
    __themeablePropertyEditor : null,
    __layoutEditor : null,
    __layoutPropertyEditor : null,


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param old {var} TODOC
     * @return {void}
     */
    _applyComponent : function(value, old)
    {
      if (!value) {
        return;
      }

      this.__componentPropertyEditorPanel.setEnabled(true);

      this.__propertyEditorPanel.setEnabled(false);
      this.__propertyEditor.setComponent(null);

      this.__themeablePropertyEditorPanel.setEnabled(false);
      this.__themeablePropertyEditor.setComponent(null);

      this.__layoutPropertyEditorPanel.setEnabled(false);
      this.__layoutPropertyEditor.setComponent(null);

      this.__layoutEditorPanel.setEnabled(false);
      this.__layoutEditor.setComponent(null);

      var component = value;

      switch(component.getType())
      {
        case "Container":
          this.__layoutEditorPanel.setEnabled(true);
          this.__layoutEditor.setComponent(component);

        case "Widget":
          this.__themeablePropertyEditorPanel.setEnabled(true);
          this.__themeablePropertyEditor.setComponent(component);

          if (component.getParent() && (component.getParent().getType() == "Container"))
          {
            this.__layoutPropertyEditorPanel.setEnabled(true);
            this.__layoutPropertyEditor.setComponent(component);
          }

        case "Object":
          this.__propertyEditorPanel.setEnabled(true);
          this.__propertyEditor.setComponent(component);
      }
    },

    __infowidget : null,


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createInfoWidget : function()
    {
      var label = this.__infowidget = new qx.ui.basic.Label("Test");
      return label;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelLayoutEditor : function()
    {
      var panel = this.__layoutEditorPanel = new qx.ui.tabview.Page("Layout");
      panel.setLayout(new qx.ui.layout.VBox());
      var editor = this.__layoutEditor = new qxrad.plugin.designer.view.inspector.LayoutEditor();
      panel.add(editor, { flex : 1 });
      return panel;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelLayoutPropertyEditor : function()
    {
      var panel = this.__layoutPropertyEditorPanel = new qx.ui.tabview.Page("Layout properties");
      panel.setLayout(new qx.ui.layout.VBox());
      var editor = this.__layoutPropertyEditor = new qxrad.plugin.designer.view.inspector.LayoutPropertyEditor();
      panel.add(editor, { flex : 1 });
      return panel;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelThemeableProperty : function()
    {
      var panel = this.__themeablePropertyEditorPanel = new qx.ui.tabview.Page("Themeable");
      panel.setLayout(new qx.ui.layout.VBox());
      var editor = this.__themeablePropertyEditor = new qxrad.plugin.designer.view.inspector.ThemeablePropertyEditor();
      panel.add(editor, { flex : 1 });

      return panel;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelProperty : function()
    {
      var panel = this.__propertyEditorPanel = new qx.ui.tabview.Page("Property");
      panel.setLayout(new qx.ui.layout.VBox());
      var editor = this.__propertyEditor = new qxrad.plugin.designer.view.inspector.PropertyEditor();
      panel.add(editor, { flex : 1 });

      return panel;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPanelComponentProperty : function()
    {
      var panel = this.__componentPropertyEditorPanel = new qx.ui.tabview.Page("Component");
      panel.setLayout(new qx.ui.layout.VBox());
      var editor = this.__componentPropertyEditor = new qxrad.plugin.designer.view.inspector.ComponentPropertyEditor();
      panel.add(editor, { flex : 1 });

      return panel;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createContainer : function()
    {
      var container = this.__tabview = new qx.ui.tabview.TabView();
      return container;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      this.setLayout(new qx.ui.layout.VBox(10));

      this.add(this.__createInfoWidget());

      var container = this.__createContainer();

      container.add(this.__createPanelComponentProperty());
      container.add(this.__createPanelProperty());
      container.add(this.__createPanelThemeableProperty());
      container.add(this.__createPanelLayoutPropertyEditor());
      container.add(this.__createPanelLayoutEditor());

      this.__componentPropertyEditorPanel.setEnabled(false);
      this.__propertyEditorPanel.setEnabled(false);
      this.__themeablePropertyEditorPanel.setEnabled(false);
      this.__layoutPropertyEditorPanel.setEnabled(false);
      this.__layoutEditorPanel.setEnabled(false);

      this.add(container, { flex : 1 });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __connectWidgets : function()
    {
      this.bind("component", this.__componentPropertyEditor, "component");

      /*
                this.bind("component",this.__propertyEditor,"component");
                this.bind("component",this.__themeablePropertyEditor,"component");
                this.bind("component",this.__layoutPropertyEditor,"component");
                this.bind("component",this.__layoutEditor,"component");
                */

      this.bind("component", this.__infowidget, "value",
      {
        converter : function(value)
        {
          if (value) {
            return value.getName();
          } else {
            return value;
          }
        }
      });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.__createUI();
      this.__connectWidgets();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getInfoWidget : function() {
      return this.__infowidget;
    }
  }
});