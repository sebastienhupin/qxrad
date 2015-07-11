/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.inspector.AppearanceEditor",
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
    this.__themeAppearance = qx.theme.manager.Meta.getInstance().getTheme().meta.appearance;
    this._analyse();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  events : { "changeThemeAppearance" : "qx.event.type.Event" },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __themeAppearance : null,


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

        var theme = this.__themeAppearance;
        var appearances = theme.appearances;

        if (col == 1) {
          appearances[property] = value;
        }

        this.fireEvent("changeThemeAppearance");
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

      var appearances = this.__themeAppearance.appearances;

      for (var key in appearances)
      {
        var check = null;
        var value = appearances[key];

        if (qx.lang.Type.isObject(value)) {
          check = "Object";
        } else if (qx.lang.Type.isString(value)) {
          check = "String";
        } else {
          check = "Object";
        }

        var def =
        {
          "name"  : key,
          "check" : check,
          "value" : value
        };

        this.__propertiesDefinition[key] = def;
        rowData.push([ key, appearances[key], false, null ]);
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