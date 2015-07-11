/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.inspector.PropertyEditor",
{
  extend : qxrad.plugin.designer.view.inspector.PropertyEditor,




  /*
     *****************************************************************************
        EVENTS
     *****************************************************************************
     */

  events : { "changeProperty" : "qx.event.type.Data" },




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

        if (col == 2)
        {
          if (value) {
            value = null;
          } else {
            value = tableModel.getValue(1, row);
          }
        }

        var data =
        {
          "name"     : property,
          "value"    : value,
          "oldValue" : oldValue
        };

        this.fireDataEvent("changeProperty", data);
      });
    }
  },




  /*
         *****************************************************************************
            DESTRUCTOR
         *****************************************************************************
         */

  destruct : function() {}
});