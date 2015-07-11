/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.inspector.DecoratorEditor",
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
    this.__theme = qx.theme.manager.Meta.getInstance().getTheme().meta.decoration;
    this._analyse();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  events : { "changeThemeDecorator" : "qx.event.type.Event" },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __theme : null,


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

        var theme = this.__theme;
        var decorations = theme.decorations;

        if (col == 1) {
          decorations[property] = value;
        }

        this.fireEvent("changeThemeDecorator");
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

      var decorations = this.__theme.decorations;

      for (var key in decorations)
      {
        var check = null;
        var value = decorations[key];

        if (qx.lang.Type.isObject(value)) {
          check = "Decorator";
        }

        var def =
        {
          "name"  : key,
          "check" : check,
          "value" : value
        };

        this.__propertiesDefinition[key] = def;
        rowData.push([ key, decorations[key], false, null ]);
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