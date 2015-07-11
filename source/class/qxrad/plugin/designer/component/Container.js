/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.component.Container",
{
  extend : qxrad.plugin.designer.component.Widget,


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

    this.setType("Container");
  },


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    // Private members.
    __layout : null,


    /**
     * After the object has been attached to the component,
     *  the selector is setting.
     *
     * @return {void}
     */
    _afterObjectSetting : function()
    {
      var layout = this.getContainer().getLayout();
      this.setLayout(layout);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @return {void}
     */
    _setLayout : function(value)
    {
      var container = this.getContainer();
      container.setLayout(value.getObject());
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _getLayout : function()
    {
      var container = this.getContainer();
      return container.getLayout();
    },


    /**
     * TODOC
     *
     * @return {boolean} TODOC
     */
    _childrenCanBeMoveable : function()
    {
      if ((this.getLayout().getClassname() == "qx.ui.layout.Basic") || (this.getLayout().getClassname() == "qx.ui.layout.Canvas")) {
        return true;
      } else {
        return false;
      }
    },


    /**
     * TODOC
     *
     * @return {boolean} TODOC
     */
    _childrenCanBeResizeable : function()
    {
      if ((this.getLayout().getClassname() == "qx.ui.layout.Basic") || (this.getLayout().getClassname() == "qx.ui.layout.Canvas")) {
        return true;
      } else {
        return false;
      }
    },

    _setChildMoveable : function (child) {
    	var moveable = false;

      // Determine whether a child can be moveable or resizeable.
      if (this._childrenCanBeMoveable()) {
        moveable = true;
      }
      child.setMoveable(moveable);      
    },

    _setChildResizeable : function (child) {
    	var resizeable = false;
      if (this._childrenCanBeResizeable()) {
        resizeable = true;
      }
      child.setResizeable(resizeable);
    },    
    
    /**
     * TODOC
     *
     * @return {void}
     */
    _recomputeChildren : function()
    {

      var children = this.getChildren();

      for (var i=0, l=children.getLength(); i<l; i++)
      {
        var child = children.getItem(i);
        this._setChildMoveable(child);
        this._setChildResizeable(child);
      }
    },

    
    /**
     * TODOC
     *
     * @param child {var} TODOC
     * @return {void}
     */
    _addChildHelper : function(child)
    {
      this.base(arguments, child);
      this._setChildMoveable(child);
      this._setChildResizeable(child);
      
    },

    // Public members.
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getLayout : function()
    {
      if (!this.__layout)
      {
        var layout = this._getLayout();

        if (layout) {
          this.__layout = qxrad.util.Component.createWithObject(layout);
        }
      }

      return this.__layout;
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @return {void}
     */
    setLayout : function(value)
    {
      // Determine whether the value is a class of qxrad.plugin.designer.component.Abstract.
      if (!value || !qx.Class.isSubClassOf(value.constructor, qx.Class.getByName("qxrad.plugin.designer.component.Abstract")))
      {
        // If any layout have been setting to the container object
        // setting one by default.
        if (!value) {
          value = new qx.ui.layout.Basic();
        }

        // Create a component and attach the object to it.
        var component = qxrad.util.Component.createWithObject(value);
        value = component;
      }

      this.__layout = value;
      this._setLayout(value);
      this._recomputeChildren();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getContainer : function() {
      return this.getObject();
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

      if (source.layout)
      {
        var layout = qxrad.util.Component.createWithSource(source.layout);
        this.setLayout(layout);
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

      if (this.getLayout()) {
        source["layout"] = this.getLayout().serialize();
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

      var layout = this.getLayout();

      if (layout)
      {
        code.push(layout.getCode());

        code.push(qx.module.Template.render(template.getTemplateLayoutDefinition(),
        {
          "name"       : this._isClassModel ? "this" : this.getName(),
          "layoutname" : layout.getName()
        }));
      }

      return this.base(arguments, code.join(""));
    }
  }
});