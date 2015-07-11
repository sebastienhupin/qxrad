/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.inspector.ComponentPropertyEditor",
{
  extend : qxrad.plugin.designer.view.inspector.AbstractPropertyEditor,




  /*
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
      var property = "name";
      var value = component.getName();

      var def =
      {
        check : "String",
        init  : null
      };
      var propertiesDefinition = this.getPropertiesDefinition();
      propertiesDefinition[property] = def;
      this.setPropertiesDefinition(propertiesDefinition);
      
      rowData.push([ "name", value, null, null ]);
      this._tableModel.setData(rowData);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _connectListenerDataEdited : function()
    {
      this.addListener("dataEdited", function(e)
      {
        var data = e.getData();
        var col = data.col;
        var row = data.row;
        var value = data.value;
        var tableModel = this.getTableModel();
        var property = tableModel.getValue(0, row);

        if (col == 1)
        {
          var setterName = "set" + qx.lang.String.firstUp(property);
          this.getComponent()[setterName](value);
        }
      });
    }
  }
});