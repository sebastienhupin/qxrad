/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.Object",
{
  extend : qx.core.Object,
  implement : qx.ui.table.ICellEditorFactory,

  construct : function(type)
  {
    this.base(arguments);
    this.__type = type;
  },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __type : null,
    __inspector : null,

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
      var cellEditor = new qx.ui.window.Window("Object Editor");
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

      cellEditor.addListener("appear", function(e) {
        cellEditor.center();
      });

      cellEditor.__value = cellEditor.__oldValue = value;

      var labelType = new qx.ui.basic.Label(this.__type);
      cellEditor.add(labelType);

      var inspector = this.__inspector = new qxrad.plugin.designer.view.inspector.ObjectInspector();
      cellEditor.add(inspector);

      var component = value;

      // Whether the value is null we create a object property.
      if (!value) {
        component = qxrad.util.Component.createWithSource({ "classname" : this.__type });
      }

      inspector.setComponent(component);
      cellEditor.__value = component;

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
        cellEditor.__value = cellEditor.__oldValue;
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