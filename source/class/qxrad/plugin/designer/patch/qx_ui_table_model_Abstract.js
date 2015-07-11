/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_table_model_Abstract",
{
  extend : qxrad.plugin.designer.component.Object,


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    // Patch the setSource function to setting the column definition.
    /**
     * TODOC
     *
     * @param source {var} TODOC
     * @return {void}
     */
    setSource : function(source)
    {
      var columns = null;

      if (source.properties && source.properties.columns)
      {
        columns = source.properties.columns;
        delete source.properties.columns;
      }

      this.base(arguments, source);

      this.getObject().setColumns(columns.name, columns.id);
    },

    // Patch the serialize function to include the column definition.
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    serialize : function()
    {
      var source = this.base(arguments);

      if (!source.properties) {
        source["properties"] = {};
      }

      var tableModel = this.getObject();
      var colName = [];
      var colId = [];
      var nbCols = tableModel.getColumnCount();

      for (var i=0, l=nbCols; i<l; i++)
      {
        colName.push(tableModel.getColumnName(i));
        colId.push(tableModel.getColumnId(i));
      }

      source.properties["columns"] =
      {
        "name" : colName,
        "id"   : colId
      };

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
      var firstPart = this.base(arguments);
      var code = [];
      code.push(firstPart);

      var tableModel = this.getObject();
      var colName = [];
      var colId = [];
      var nbCols = tableModel.getColumnCount();

      for (var i=0, l=nbCols; i<l; i++)
      {
        colName.push(tableModel.getColumnName(i));
        colId.push(tableModel.getColumnId(i));
      }

      code.push("\t" + this.getName() + ".setColumns(" + qx.lang.Json.stringify(colName) + "," + qx.lang.Json.stringify(colId) + ");\n");

      return code.join("");
    }
  }
});