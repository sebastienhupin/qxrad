/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.Color",
{
  extend : qx.core.Object,
  implement : qx.ui.table.ICellEditorFactory,




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    // overridden
    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {var} TODOC
     */
    createCellEditor : function(cellInfo)
    {
      var value = cellInfo.value;

      //var color = qx.lang.Type.isString(value) ? qx.util.ColorUtil.stringToRgbString(value) : value;
      var color = null;

      if (qx.lang.Type.isString(value))
      {
        var rgb = qx.util.ColorUtil.stringToRgbString(value);
        color = qx.util.ColorUtil.rgbToHexString(rgb);
      }
      else if (qx.util.ColorUtil.isRgbString(value))
      {
        color = qx.util.ColorUtil.rgbToHexString(rgb);
      }
      else
      {
        color = value;
      }

      // Create the cell editor window, since we need to return it
      // immediately.
      var cellEditor = new qx.ui.window.Window("Color Editor");
      cellEditor.setLayout(new qx.ui.layout.VBox(10));

      //cellEditor.setLayout(new qx.ui.layout.HBox(4));
      cellEditor.set(
      {
        padding      : 3,
        modal        : true,
        showClose    : false,
        showMaximize : false,
        showMinimize : false
      });

      cellEditor.addListener("appear", function(e)
      {
        cellEditor.center();
        cellEditor.__colorSelector.setValue(value);
      });

      var colorSelector = cellEditor.__colorSelector = new qx.ui.control.ColorSelector();
      cellEditor.add(colorSelector);

      var containerButton = new qx.ui.container.Composite();
      var layout = new qx.ui.layout.HBox(10).set({ alignX : "center" });
      containerButton.setLayout(layout);

      var btOk = new qx.ui.form.Button("OK");
      var btCancel = new qx.ui.form.Button("CANCEL");
      containerButton.add(btOk);
      containerButton.add(btCancel);
      cellEditor.add(containerButton);

      btOk.addListener("execute", function(e) {
        this.close();
      }, cellEditor);

      btCancel.addListener("execute", function(e)
      {
        cellEditor.__colorSelector.setValue(value);
        this.close();
      },
      cellEditor);

      return cellEditor;
    },

    // overridden
    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {var} TODOC
     */
    getCellEditorValue : function(cellEditor) {
      return cellEditor.__colorSelector.getValue();
    }
  }
});