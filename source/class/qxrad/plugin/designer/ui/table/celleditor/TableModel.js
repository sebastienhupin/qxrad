/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.TableModel",
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
    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createSelectTableModel : function(cellEditor)
    {
      var selectTableModel = cellEditor.__selectTableModel = new qx.ui.form.SelectBox();
      cellEditor.add(selectTableModel);

      var itemSimple = cellEditor.__itemSimple = new qx.ui.form.ListItem("Simple");
      itemSimple.setUserData("table-model", "qx.ui.table.model.Simple");
      selectTableModel.add(itemSimple);

      var itemFiltered = cellEditor.__itemFiltered = new qx.ui.form.ListItem("Filtered");
      itemFiltered.setUserData("table-model", "qx.ui.table.model.Filtered");
      selectTableModel.add(itemFiltered);

      var itemRemote = cellEditor.__itemRemote = new qx.ui.form.ListItem("Remote");
      itemRemote.setUserData("table-model", "qx.ui.table.model.Remote");
      selectTableModel.add(itemRemote);
    },


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createPropertEditorTableModel : function(cellEditor)
    {
      var tableModelPropertyEditor = cellEditor.__tableModelPropertyEditor = new qxrad.plugin.designer.view.inspector.ObjectInspector();
      tableModelPropertyEditor.setHeight(150);
      cellEditor.add(tableModelPropertyEditor);
    },


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createControlPropertyColumnDefinition : function(cellEditor)
    {
      var label = new qx.ui.basic.Label("Column definiton");
      cellEditor.add(label);
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      cellEditor.add(container);
      var btAdd = new qx.ui.form.Button("Add");
      var btDelete = new qx.ui.form.Button("Delete");
      container.add(btAdd);
      container.add(btDelete);

      btAdd.addListener("execute", function(e) {
        cellEditor.__tableColumnDefinition.getTableModel().addRows([ [ "MyName", "MyId" ] ]);
      });

      btDelete.addListener("execute", function(e)
      {
        var tableModel = cellEditor.__tableColumnDefinition.getTableModel();
        var selectionModel = cellEditor.__tableColumnDefinition.getSelectionModel();
        var selection = [];

        selectionModel.iterateSelection(function(index) {
          selection.push(index);
        });

        for (var i=0, l=selection.length; i<l; i++) {
          tableModel.removeRows(i, 1);
        }
      });
    },


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createPropertyColumnDefinition : function(cellEditor)
    {
      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "Name", "Id" ]);
      tableModel.setColumnEditable(0, true);
      tableModel.setColumnEditable(1, true);
      var table = cellEditor.__tableColumnDefinition = new qx.ui.table.Table(tableModel);
      table.setHeight(300);
      tableModel.setData(cellEditor.__columnDefinition);
      cellEditor.add(table);
    },


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createButtons : function(cellEditor)
    {
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
        cellEditor.__isCanceled = true;
        this.close();
      },
      cellEditor);
    },


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __connectListener : function(cellEditor)
    {
      cellEditor.addListener("appear", function(e)
      {
        cellEditor.center();
        var tableModel = cellEditor.__value;

        var selection = null;

        if (tableModel.getClassname() == "qx.ui.table.model.Filtered") {
          selection = cellEditor.__itemFiltered;
        } else if (tableModel.getClassname() == "qx.ui.table.model.Simple") {
          selection = cellEditor.__itemSimple;
        } else if (tableModel.getClassname() == "qx.ui.table.model.Remote") {
          selection = cellEditor.__itemRemote;
        }

        cellEditor.__selectTableModel.setSelection(selection ? [ selection ] : null);
      },

      //this.__setComponent(cellEditor);
      this);

      cellEditor.__selectTableModel.addListener("changeSelection", function(e)
      {
        if (cellEditor.__isCreating) {
          return;
        }

        var item = e.getData()[0];
        var value = item.getUserData("table-model");

        // Now create the new table model component and set it to the table component.
        var component = qxrad.util.Component.createWithSource({ "classname" : value });

        component.setName(cellEditor.__value.getName());

        cellEditor.__tableModelPropertyEditor.setComponent(component);
        cellEditor.__value = component;
      },
      this);
    },

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
      var cellEditor = new qx.ui.window.Window("TableModel Editor");
      cellEditor.setLayout(new qx.ui.layout.VBox(10));

      cellEditor.set(
      {
        padding      : 3,
        modal        : true,
        showClose    : false,
        showMaximize : false,
        showMinimize : false
      });

      cellEditor.__isCreating = true;

      cellEditor.__isCanceled = false;
      cellEditor.__value = cellEditor.__oldValue = value;
      var tableModel = value.getObject();

      var columnDefinition = cellEditor.__columnDefinition = [];

      var nbCols = tableModel.getColumnCount();

      for (var i=0, l=nbCols; i<l; i++)
      {
        var name = tableModel.getColumnName(i) ? tableModel.getColumnName(i) : "";
        var id = tableModel.getColumnId(i) ? tableModel.getColumnId(i) : "";
        columnDefinition.push([ name, id ]);
      }

      this.__createSelectTableModel(cellEditor);
      this.__createPropertEditorTableModel(cellEditor);
      this.__createControlPropertyColumnDefinition(cellEditor);
      this.__createPropertyColumnDefinition(cellEditor);
      this.__createButtons(cellEditor);

      cellEditor.__tableModelPropertyEditor.setComponent(value);

      this.__connectListener(cellEditor);

      cellEditor.__isCreating = false;

      return cellEditor;
    },

    // overridden
    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {var} TODOC
     */
    getCellEditorValue : function(cellEditor)
    {
      if (cellEditor.__isCanceled) {
        return cellEditor.__oldValue;
      }

      var tableModelColumnDefinition = cellEditor.__tableColumnDefinition.getTableModel();
      var columnDefinition = tableModelColumnDefinition.getData();
      var columnDefinitionName = [];
      var columnDefinitionId = [];

      for (var i=0, l=columnDefinition.length; i<l; i++)
      {
        columnDefinitionName.push(columnDefinition[i][0]);
        columnDefinitionId.push(columnDefinition[i][1]);
      }

      var newTableModel = cellEditor.__value;

      // Make this test for setting columns definition to the table model when it have not changed.
      if (cellEditor.__value == cellEditor.__oldValue)
      {
        //newTableModel = newTableModel.clone();
        var oldName = newTableModel.getName();

        newTableModel = qxrad.util.Component.createWithObject(newTableModel.getObject().clone());
        newTableModel.setName(oldName);
      }

      // Make this simple patch because the _loadRowCount method for a remote table is abstract.
      if (newTableModel.getClassname() == "qx.ui.table.model.Remote") {
        newTableModel.getObject()["_loadRowCount"] = function() {};
      }

      if (columnDefinitionName.length > 0) {
        newTableModel.getObject().setColumns(columnDefinitionName, columnDefinitionId);
      }
      else
      {
        // Force the first column to undefined string.
        newTableModel.getObject().setColumns([ "Undefined" ], null);
      }

      return newTableModel;
    }
  }
});