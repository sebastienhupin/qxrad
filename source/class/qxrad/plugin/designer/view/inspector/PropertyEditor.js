/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.inspector.PropertyEditor",
{
  extend : qxrad.plugin.designer.view.inspector.AbstractPropertyEditor,


  /**
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */
  members :
  {
    /**
     * TODOC
     *
     * @param component {var} TODOC
     * @return {void}
     */
    _analyse : function(component)
    {
      var rowData = [];

      var object = component.getObject();
      var properties = this.getComponent().getProperties();

      for (var i=0, l=properties.length; i<l; i++)
      {
        var property = properties[i];
        var def = qx.Class.getPropertyDefinition(object.constructor, property);
  
        if (!def.themeable && !def.group)
        {
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