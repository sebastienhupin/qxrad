/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.inspector.LayoutEditor",
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
  construct : function(component)
  {
    this.base(arguments);

    this.__layoutList = [
    {
      "name"  : "Atom",
      "value" : "qx.ui.layout.Atom"
    },
    {
      "name"  : "Basic",
      "value" : "qx.ui.layout.Basic"
    },
    {
      "name"  : "Canvas",
      "value" : "qx.ui.layout.Canvas"
    },
    {
      "name"  : "Dock",
      "value" : "qx.ui.layout.Dock"
    },
    {
      "name"  : "Flow",
      "value" : "qx.ui.layout.Flow"
    },
    {
      "name"  : "Grid",
      "value" : "qx.ui.layout.Grid"
    },
    {
      "name"  : "Grow",
      "value" : "qx.ui.layout.Grow"
    },
    {
      "name"  : "HBox",
      "value" : "qx.ui.layout.HBox"
    },
    {
      "name"  : "VBox",
      "value" : "qx.ui.layout.VBox"
    } ];

    this.init();

    if (component) {
      this.setComponent(component);
    }
  },




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


  /**
       *****************************************************************************
           MEMBERS
       *****************************************************************************
       */
  members :
  {
    __layoutList : null,
    __isAnalysing : null,
    __selectLayout : null,
    __propertyEditor : null,


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createSelectLayout : function()
    {
      var select = this.__selectLayout = new qx.ui.form.SelectBox();
      select.setEnabled(false);
      var list = this.__layoutList;

      for (var i=0, l=list.length; i<l; i++)
      {
        var name = list[i].name;
        var value = list[i].value;
        var item = new qx.ui.form.ListItem(name);
        item.setUserData("value", value);
        select.add(item);
      }

      return select;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createPropertyEditor : function()
    {
      var propertyEditor = this.__propertyEditor = new qxrad.plugin.designer.view.inspector.PropertyEditor();
      return propertyEditor;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      var layout = new qx.ui.layout.VBox(10);
      this.setLayout(layout);

      this.add(this.__createSelectLayout());
      this.add(this.__createPropertyEditor());
      this.__conectListener();
    },


    /**
     * TODOC
     *
     * @param layout {var} TODOC
     * @return {void}
     */
    __setLayoutComponent : function(layout) {
      this.__propertyEditor.setComponent(layout);
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    __onSelectLayoutChange : function(e)
    {
      if (this.__isAnalysing) {
        return;
      }

      var item = e.getData()[0];
      var layoutClassname = item.getUserData("value");
      this._relayout(layoutClassname);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __conectListener : function() {
      this.__selectLayout.addListener("changeSelection", this.__onSelectLayoutChange, this);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyComponent : function(value, oldValue)
    {
      if (!value || !qx.Class.isSubClassOf(value.constructor, qx.Class.getByName("qxrad.plugin.designer.component.Container"))) {
        return;
      }

      if (value)
      {
        this._analyse(value);
        this.__setLayoutComponent(value.getLayout());
      }
      else
      {
        this.__selectLayout.setEnabled(false);
        this.__propertyEditor.setComponent(null);
      }
    },


    /**
     * TODOC
     *
     * @param component {var} TODOC
     * @return {void}
     */
    _analyse : function(component)
    {
      this.__isAnalysing = true;

      var layout = component.getLayout();

      var children = this.__selectLayout.getChildren();

      for (var i=0, l=children.length; i<l; i++)
      {
        var item = children[i];

        if (item.getUserData("value") == layout.getClassname())
        {
          this.__selectLayout.setEnabled(true);
          this.__selectLayout.setSelection([ item ]);
        }
      }

      this.__isAnalysing = false;
    },


    /**
     * TODOC
     *
     * @param layoutClassname {var} TODOC
     * @return {void}
     */
    _relayout : function(layoutClassname)
    {
      // Clear All children layout properties before change the layout.
      var children = this.getComponent().getChildren();

      for (var i=0, l=children.getLength(); i<l; i++)
      {
        var child = children.getItem(i);
        child.clearLayoutProperties();

        // With a grid layout, all children must be excluded, before setting the layout.
        // otherwise we have an exception for setting child without a row and column.
        if (layoutClassname == "qx.ui.layout.Grid")
        {
          // Set directly here the widget.
          child.getWidget().setVisibility("excluded");
        }
      }

      // Now create the new layout component and set it to the container component.
      var layout = qxrad.util.Component.createWithSource({ "classname" : layoutClassname });
      this.getComponent().setLayout(layout);

      // Set layout properties to all children.
      children = this.getComponent().getChildren();

      for (var i=0, l=children.getLength(); i<l; i++)
      {
        var child = children.getItem(i);
        var props = qxrad.util.Component.verifyLayoutProperties(this.getComponent(), null);
        child.setLayoutProperties(props);

        if (layoutClassname == "qx.ui.layout.Grid")
        {
          // Set directly here the widget.
          child.getWidget().setVisibility("visible");
        }
      }

      this.__setLayoutComponent(layout);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function() {
      this.__createUI();
    }
  }
});