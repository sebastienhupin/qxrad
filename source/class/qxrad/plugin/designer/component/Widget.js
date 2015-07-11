/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */
/**
 *
 * @review : setDecorator
 */
qx.Class.define("qxrad.plugin.designer.component.Widget",
{
  extend : qxrad.plugin.designer.component.Object,
  include : [ qxrad.plugin.designer.core.MDroppable ],


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

    this.setType("Widget");
    this.setChildren(new qx.data.Array());
    qxrad.plugin.designer.core.Controller.getInstance().addComponent(this);
  },


  /**
     * ****************************************************************************
     * PROPERTIES
     * ****************************************************************************
     */
  properties :
  {
    parent :
    {
      check    : "qxrad.plugin.designer.component.Widget",
      init     : null,
      nullable : true,
      event    : "changeParent"
    },

    children :
    {
      check    : "qx.data.Array",
      init     : null,
      nullable : true,
      event    : "changeChildren",
      apply    : "_applyChildren"
    },

    moveable :
    {
      check : "Boolean",
      init  : false,
      event : "changeMoveable"
    },

    resizeable :
    {
      check : "Boolean",
      init  : false,
      event : "changeResizeable"
    }
  },


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    __selector : null,
    
    // Utility to add additional parameters to the child.
    _finalize : function () {
    	this._attachSelector();
      this._connectListenerWidget();    	
    },


    /**
     * After the object has been attached to the component,
     *  the selector is setting.
     *
     * @return {void}
     */
    _attachSelector : function()
    {
      var selector = this.__selector = new qxrad.plugin.designer.core.Selector(this);
      this.bind("moveable", selector, "moveable");
      this.bind("resizeable", selector, "resizeable");
      this.bind("activate", selector, "activate");
    },

    // Overridden
    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyActivate : function(value, oldValue)
    {
      //
      if (value)
      {
        this.getWidget().setDecorator(null);
      }
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyChildren : function(value, oldValue)
    {
      if (oldValue) {
        this._removeListenersChildren();
      }

      if (value) {
        this._addListenersChildren();
      }
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onChildrenChange : function(e)
    {
      console.log(e.getData());
    	if (!e.getData().type) {
    		return;
    	}
      var child = null;//e.getData().item[0];

      switch(e.getData().type)
      {
        case "add":
          var child = e.getData().added[0];
          this._addChildHelper(child);
          break;

        case "remove":
          this._removeChildHelper(child);
          break;

        case "order":
          this._orderChildHelper(child);
          break;
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _removeListenersChildren : function() {
      this.getChildren().removeListener("change", this._onChildrenChange, this);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _addListenersChildren : function() {
      this.getChildren().addListener("change", this._onChildrenChange, this);
    },

    /**
     * TODOC
     *
     * @return {void}
     */
    _connectListenerWidget : function()
    {
      var widget = this.getWidget();

      // Determine whether a widget can be droppable.
      if (qxrad.plugin.Designer.DropDataTypeList[this.getClassname()]) {
        this.setDroppable(true);
      }

      widget.addListener("click", function(e)
      {
        e.stopPropagation();
        this.setActivate(true);
      },
      this);

      widget.addListener("mouseover", function(e)
      {
        e.stopPropagation();

        if (this.getActivate()) {
          return;
        }

        if (e.getTarget()) {
          e.getTarget().setDecorator("main");
        }
      },
      this);

      widget.addListener("mouseout", function(e)
      {
        e.stopPropagation();

        if (e.getTarget()) {
          e.getTarget().setDecorator(null);
        }
      },
      this);
    },

    /**
     * TODOC
     *
     * @param child {var} TODOC
     * @return {void}
     * @throws TODOC
     */
    _addChildHelper : function(child)
    {
      console.log(child);
      var widget = child.getWidget();

      // Check whether the child can be added to its parent.
      // A child can be added to its parent whether the parent include qx.ui.core.MChildrenHandling, qx.ui.core.MRemoteChildrenHandling.
      // or is a sub class of qx.ui.tabview.TabView, qx.ui.tree.AbstractTreeItem
      var clazz = this.getWidget().constructor;

      if (
      		qx.Class.hasMixin(clazz, qx.Mixin.getByName("qx.ui.core.MChildrenHandling")) || 
      		qx.Class.hasMixin(clazz, qx.Mixin.getByName("qx.ui.core.MRemoteChildrenHandling")) || 
      		qx.Class.isSubClassOf(clazz, qx.Class.getByName("qx.ui.tabview.TabView")) || 
      		qx.Class.isSubClassOf(clazz, qx.Class.getByName("qx.ui.tree.AbstractTreeItem")) || 
      		qx.Class.isSubClassOf(clazz, qx.Class.getByName("qx.ui.splitpane.Pane")) || 
      		qx.Class.isSubClassOf(clazz, qx.Class.getByName("qx.ui.form.RadioButtonGroup")) ||
      		qx.Class.isSubClassOf(clazz, qx.Class.getByName("qx.ui.core.scroll.AbstractScrollArea"))
      )
      		
      {

        this.getWidget().add(widget);
        child.setParent(this);
        if (child._finalize) {
        	child._finalize();
        }    	        
      }     
    },


    /**
     * TODOC
     *
     * @param child {var} TODOC
     * @return {void}
     */
    _removeChildHelper : function(child)
    {
      this.getWidget().remove(child.getWidget());
    },


    /**
     * TODOC
     *
     * @param child {var} TODOC
     * @return {void}
     */
    _orderChildHelper : function(child) {
    	
    },

    // Public memebers.
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getLayoutProperties : function()
    {
      var widget = this.getWidget();
      return widget.getLayoutProperties();
    },


    /**
     * TODOC
     *
     * @param properties {var} TODOC
     * @return {void}
     */
    setLayoutProperties : function(properties)
    {
      var widget = this.getWidget();
      widget.setLayoutProperties(properties);
    },


    /**
     * TODOC
     *
     * @param properties {var} TODOC
     * @return {void}
     */
    clearLayoutProperties : function(properties)
    {
      var widget = this.getWidget();
      widget.clearLayoutProperties(properties);
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getWidget : function() {
      return this.getObject();
    },


    /**
     * TODOC
     *
     * @param child {var} TODOC
     * @return {void}
     * @throws TODOC
     */
    add : function(child)
    {
      // Check whether the child is a sub class of qxrad.plugin.designer.component.Widget
      if (!qx.Class.isSubClassOf(child.constructor, qx.Class.getByName("qxrad.plugin.designer.component.Widget"))) {
        throw new Error("Attempt a child of qxrad.plugin.designer.component.Widget but found " + child);
      }

      // Ensure layout properties has been setting correctly.
      var layoutproperties = child.getLayoutProperties();
      child.clearLayoutProperties();
      var props = qxrad.util.Component.verifyLayoutProperties(this, layoutproperties);
      child.setLayoutProperties(props);

      this.getChildren().push(child);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    remove : function()
    {
      var parent = this.getParent();

      if (!parent) {
        return;
      }
      
      parent.getChildren().remove(this);
    },


    /**
     * TODOC
     *
     * @param source {var} TODOC
     * @return {void}
     */
    setSource : function(source)
    {
      this.base(arguments, source);

      if (source.children)
      {
        var children = source.children;

        for (var i=0, l=children.length; i<l; i++)
        {
        	this.debug("add child : " + children[i].name);
        	if (children[i].isObjectProperty) {
        		var child = this._temporaryObjecstProperties[children[i].name];        		
        		this.add(child);
        	}
        	else {
            var child = qxrad.util.Component.createWithSource(children[i]);
            this.add(child);
        	}
        }
      }
      
      // Set the layout properties to the child widget.
      if (source.layoutproperties) {
        this.setLayoutProperties(source.layoutproperties);
      }
    },


    /**
     * TODOC
     *
     * @param source {var} TODOC
     * @return {void}
     */
    load : function(source) {
      this.base(arguments, source);
    },

    // Return the serialization of this component.
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    serialize : function()
    {
      var source = this.base(arguments);

      var layoutProperties = this.getLayoutProperties();

      if (qx.lang.Object.getLength(layoutProperties) > 0) {
        source["layoutproperties"] = layoutProperties;
      }

      if (this.getChildren().getLength() > 0)
      {
        source["children"] = [];

        for (var i=0, l=this.getChildren().getLength(); i<l; i++)
        {
          var child = this.getChildren().getItem(i);
          if (!child._isPropertyObject) {
          	source["children"].push(child.serialize());
          }
          else {
          	source["children"].push({
          		name : child.getName(),
          		isObjectProperty : true
          	});
          }
        }
      }

      return source;
    },


    /**
     * TODOC
     *
     * @param otherCode {var} TODOC
     * @return {var} TODOC
     */
    getCode : function(otherCode)
    {
      var code = [];
      code.push(otherCode);

      var template = this._template ? new this._template : new qxrad.plugin.designer.template.build.Default();

      if (qx.lang.Object.getLength(this.getLayoutProperties()) > 0)
      {

        code.push(qx.module.Template.render(template.getTemplateLayoutPropertiesDefinition(),
        {
          "name"       : this._isClassModel ? "this" : this.getName(),
          "properties" : qx.lang.Json.stringify(this.getLayoutProperties())
        }));
      }

      if (this.getChildren().getLength() > 0)
      {
        for (var i=0, l=this.getChildren().getLength(); i<l; i++)
        {
        	var child = this.getChildren().getItem(i);
        	if (child._isPropertyObject) {
        		continue;
        	}
          
          code.push(child.getCode());

          code.push(qx.module.Template.render(template.getTemplateParentAdd(),
          {
            "name"      : this._isClassModel ? "this" : this.getName(),
            "childname" : child.getName()
          }));
        }
      }

      return this.base(arguments, code.join(""));
    }
  }
});