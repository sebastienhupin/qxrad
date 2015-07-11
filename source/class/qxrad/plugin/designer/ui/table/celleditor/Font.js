/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.Font",
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

      
      // Create the cell editor window, since we need to return it
      // immediately.
      var cellEditor = new qx.ui.window.Window("Date Editor");
      cellEditor.setLayout(new qx.ui.layout.VBox(10));
      

      cellEditor.set(
      {
        padding      : 3,
        modal        : true,
        showClose    : false,
        showMaximize : false,
        showMinimize : false,
        width : 600,
        height : 400
      });

      cellEditor.addListener("appear", function(e)
      {
        cellEditor.center();
        
      });
      
      cellEditor.__value = cellEditor.__oldValue = value;
      
      var selector = cellEditor.__selector = new qxrad.plugin.designer.ui.control.FontSelector();
      if (value instanceof qx.bom.Font) {
      	selector.setValue(value);
      }
      else if (qx.lang.Type.isString(value)) {
      	var font = qx.theme.manager.Font.getInstance().resolve(value);
      	if (font) {
      		selector.setValue(font);
      	}
      	else {
      		var font = qx.theme.manager.Font.getInstance().resolve("default");
      	}
      }

      cellEditor.add(selector);
      
      var containerButton = new qx.ui.container.Composite();
      var layout = new qx.ui.layout.HBox(10).set({ alignX : "center" });
      containerButton.setLayout(layout);

      var btOk = new qx.ui.form.Button("OK");
      var btCancel = new qx.ui.form.Button("CANCEL");
      containerButton.add(btOk);
      containerButton.add(btCancel);
      cellEditor.add(containerButton);

      btOk.addListener("execute", function(e) {
      	cellEditor.__value = cellEditor.__selector.getValue();
        this.close();
      }, cellEditor);

      btCancel.addListener("execute", function(e)
      {
      	cellEditor.__value = cellEditor.__oldValue
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
      return cellEditor.__value;
    }
  }
});