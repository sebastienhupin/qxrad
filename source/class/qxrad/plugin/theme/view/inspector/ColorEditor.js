/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.inspector.ColorEditor",
{
  extend : qxrad.plugin.theme.view.inspector.AbstractThemeEditor,




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

    this.__themeColor = qx.theme.manager.Meta.getInstance().getTheme().meta.color;
    this._analyse();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  events : { "changeThemeColor" : "qx.event.type.Event" },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __themeColor : null,


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
        var oldValue = data.oldValue;
        var tableModel = this.getTableModel();
        var property = tableModel.getValue(0, row);

        var theme = this.__themeColor;
        var colors = theme.colors;

        if (col == 1) {
          colors[property] = value;
        }

        this.fireEvent("changeThemeColor");
      });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _analyse : function()
    {
      var rowData = [];

      var colors = this.__themeColor.colors;

      for (var key in colors)
      {
        var def =
        {
          "name"  : key,
          "check" : "Color",
          "value" : colors[key]
        };

        this.__propertiesDefinition[key] = def;
        rowData.push([ key, colors[key], false, null ]);
      }

      this._tableModel.setData(rowData);
    }
  },




  /*
         *****************************************************************************
            DESTRUCTOR
         *****************************************************************************
         */

  destruct : function() {}
});