/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Mixin.define("qxrad.plugin.designer.core.MDroppable",
{
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
    // Check for a sub class of qxrad.plugin.designer.component.Widget.
    if (!qx.Class.isSubClassOf(this.constructor, qx.Class.getByName("qxrad.plugin.designer.component.Widget"))) {
      throw new Error("This Mixin work only with a sub class of qxrad.plugin.designer.component.Widget");
    }
  },


  /**
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */
  properties :
  {
    droppable :
    {
      check : "Boolean",
      init  : false,
      apply : "_applyDroppable"
    }
  },


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    // apply members.
    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param old {var} TODOC
     * @return {void}
     */
    _applyDroppable : function(value, old)
    {
      var widget = this.getWidget();

      // Use this instand of the property droppable.
      // That's using for not setting the property.
      // Sync DOM attribute
      widget.getContentElement().setAttribute("qxDroppable", value ? "on" : "off");

      if (value) {
        this.__addListenerDroppable();
      } else {
        this.__removeListenerDroppable();
      }
    },

    // Private members.
    /**
     * TODOC
     *
     * @return {void}
     */
    __removeListenerDroppable : function()
    {
      var widget = this.getWidget();

      if (!widget) {
        return;
      }

      widget.removeListener("drop", this.__onDrop, this);
      widget.removeListener("dragover", this.__onDragOver, this);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __addListenerDroppable : function()
    {
      var widget = this.getWidget();

      if (!widget) {
        return;
      }

      widget.addListener("drop", this.__onDrop, this);
      widget.addListener("dragover", this.__onDragOver, this);
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    __onDrop : function(e)
    {
      e.stopPropagation();

      // Add items to target
      var item = e.getData("component");
      var widget = this.getWidget();
      var left = e.getDocumentLeft() - widget.getContentLocation().left;
      var top = e.getDocumentTop() - widget.getContentLocation().top;

      var options =
      {
        left : left,
        top  : top
      };

      this.dropComponent(item, options);
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    __onDragOver : function(e)
    {
      var type = e.getRelatedTarget().dropDataType;

      if (!e.supportsType("component") || !this._canBeDroppedChildType(type)) {
        e.preventDefault();
      }

      e.stopPropagation();
    },


    /**
     * TODOC
     *
     * @param type {var} TODOC
     * @return {boolean} TODOC
     */
    _canBeDroppedChildType : function(type)
    {
      var dropDataType = qxrad.plugin.Designer.DropDataTypeList;
      var widget = this.getWidget();
      var componentDropDataType = dropDataType[widget.classname];

      if (componentDropDataType)
      {
        if (qx.lang.Array.contains(componentDropDataType, type)) {
          return true;
        }
      }

      return false;
    },

    // Public members.
    /**
     * TODOC
     *
     * @param item {var} TODOC
     * @param options {var} TODOC
     * @return {void}
     */
    dropComponent : function(item, options)
    {
      // Before create a component for the dropped item.
      if (item == "qx.ui.core.Widget") {
        item = "qxrad.plugin.designer.template.Widget";
      }

      var component = qxrad.util.Component.createWithSource(
      {
        "classname"        : item,
        "layoutproperties" : options
      });

      if (!component || !component.getWidget())
      {
        this.error("Impossible to create the component !!!");
        return;
      }

      this.add(component);
      component.setActivate(true);
    }
  }
});