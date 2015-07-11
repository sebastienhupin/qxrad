/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.inspector.ThemeablePropertyEditor",
{
  extend : qxrad.plugin.designer.view.inspector.AbstractPropertyEditor,


  /**
     * Create a new instance
     */
  construct : function(component)
  {
    this.base(arguments);

    
    this.__cursor = {
      check : [ "default", "crosshair", "pointer", "move", "n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "nw-resize", "text", "wait", "help " ]
    };

    this.__opacity = {
      check    : "Opacity",
      min      : 0,
      max      : 1,
      nullable : true
    };    
    
    this.__specialProperty =
    {
      "cursor"  : this.__cursor,
      "opacity" : this.__opacity
    };            
  },




  /**
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    // Redefine some specials properties.
    __cursor : null,

    __opacity : null,

    __specialProperty : null,


    /**
     * TODOC
     *
     * @param component {var} TODOC
     * @return {void}
     */
    _analyse : function(component)
    {
      if (!qx.Class.isSubClassOf(component.constructor, qx.Class.getByName("qxrad.plugin.designer.component.Widget"))) {
        return;
      }

      var rowData = [];
      var widget = component.getWidget();
      var properties = qx.Class.getProperties(widget.constructor);

      for (var i=0, l=properties.length; i<l; i++)
      {
        var property = properties[i];
        var def = qx.Class.getPropertyDefinition(widget.constructor, property);

        if (def.themeable && !def.group)
        {
          if (this.__specialProperty[property]) {
            def = this.__specialProperty[property];
          }

          var propertiesDefinition = this.getPropertiesDefinition();
          propertiesDefinition[property] =  def;
          this.setPropertiesDefinition(propertiesDefinition);
          var value = component.getProperty(property);
          rowData.push([ property, value, ("nullable" in def) ? (value ? false : true ) : null, null ]);
        }
      }

      this._tableModel.setData(rowData);
    }
  }
});