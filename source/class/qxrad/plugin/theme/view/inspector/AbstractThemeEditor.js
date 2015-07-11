/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.inspector.AbstractThemeEditor",
{
  extend : qx.ui.table.Table,

  /*
    include : [],
  */

  /*
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */

  /**
       * Create a new instance
       */
  construct : function()
  {
    this.base(arguments);

    this.__propertiesDefinition = {};
    this.init();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  /*
      events :
      {

      },
  */

  /*
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  properties : {},




  /*
       *****************************************************************************
          STATICS
       *****************************************************************************
       */

  /*
       statics :
       {

       },
  */

  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    _tableModel : null,
    __gridNotImplemented : null,
    __propertiesDefinition : null,


    /**
     * TODOC
     *
     * @return {void}
     */
    updateTheme : function()
    {
      qx.Theme.define("MyCustomTheme",
      {
        title  : 'MyCustomTheme',
        extend : qx.theme.manager.Meta.getInstance().getTheme()
      });

      qx.theme.manager.Meta.getInstance().setTheme(MyCustomTheme);
    },


    /**
     * TODOC
     *
     * @abstract
     * @param component {var} TODOC
     * @return {void}
     * @throws the abstract function warning.
     */
    _analyse : function(component) {
      throw new Error("Abstract method call!");
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createHeader : function()
    {
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "Name", "Value", "Nullable" ]);
      tableModel.setColumnSortable(3, false);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createCellRender : function()
    {
      var tcm = this.getTableColumnModel();

      tcm.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Dynamic(qx.lang.Function.bind(this.__propertyValueCellRendererFactoryFunc, this)));
      tcm.setCellEditorFactory(1, new qx.ui.table.celleditor.Dynamic(qx.lang.Function.bind(this.__propertyValueCellEditorFactory, this)));
      tcm.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Dynamic(qx.lang.Function.bind(this.__propertyNullableCellRendererFactoryFunc, this)));
      tcm.setCellEditorFactory(2, new qx.ui.table.celleditor.CheckBox());
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      this.setRowHeight(25);
      this.setShowCellFocusIndicator(false);

      this.__createHeader();
      this.setTableModel(this._tableModel);
      this.__createCellRender();
      this.__connectListener();
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
        var oldValue = data.oldValue;
        var tableModel = this.getTableModel();
        var property = tableModel.getValue(0, row);

        if (col == 1) {}

        //this.getComponent().setProperty(property,value);
        else if (col == 2)
        {
          if (value) {}

          //this.getComponent().setProperty(property,null);
          else {
            var newValue = tableModel.getValue(1, row);
          }
        }
      });
    },

    //this.getComponent().setProperty(property,newValue);
    /**
     * TODOC
     *
     * @return {void}
     */
    _connectListenerCellClick : function()
    {
      this.addListener("cellClick", function(e)
      {
        var row = e.getRow();
        var col = e.getColumn();
        var tableModel = this.getTableModel();
        var property = tableModel.getValue(0, row);
        var nullableValue = tableModel.getValue(2, row);

        var def = this.__propertiesDefinition[property];
        var editing = true;

        if (this.__gridNotImplemented[row])
        {
          var c = col;

          if (col == 2) {
            c = 1;
          }

          if (this.__gridNotImplemented[row][c]) {
            return;
          }
        }

        if (col == 1)
        {
          // Check for the property can be nullable.
          // The property can be nullable and the value is null, the cell can not be editing.
          if (def.nullable)
          {
            if (nullableValue) {
              editing = false;
            }
          }
        }
        else if (col == 2)
        {
          if (def.nullable)
          {
            tableModel.setValue(col, row, !nullableValue);

            // Fire an event containing the value change.
            this.fireDataEvent("dataEdited",
            {
              row      : row,
              col      : col,
              oldValue : nullableValue,
              value    : !nullableValue
            });
          }

          return;
        }
        else
        {
          return;
        }

        tableModel.setColumnEditable(col, editing);

        if (editing) {
          this.startEditing();
        } else {
          this.cancelEditing();
        }
      },
      this);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __connectListener : function()
    {
      this._connectListenerDataEdited();
      this._connectListenerCellClick();
    },


    /**
     * TODOC
     *
     * @param type {var} TODOC
     * @return {var} TODOC
     */
    __rendererValueCellEditorFactory : function(type)
    {
      var cellEditor = null;

      switch(type)
      {
        case "String":
          cellEditor = new qx.ui.table.celleditor.TextField();
          break;

        case "Integer":
          cellEditor = new qxrad.plugin.designer.ui.table.celleditor.Spinner();
          break;

        case "Number":
          cellEditor = new qxrad.plugin.designer.ui.table.celleditor.Slider();
          break;

        case "Boolean":
          cellEditor = new qx.ui.table.celleditor.CheckBox();
          break;

        case "Color":
          cellEditor = new qxrad.plugin.designer.ui.table.celleditor.Color();
          break;

        case "qx.ui.table.ITableModel":
          cellEditor = new qxrad.plugin.designer.ui.table.celleditor.TableModel();
          break;

        case "Opacity":
          cellEditor = new qxrad.plugin.designer.ui.table.celleditor.Opacity();
          break;

        case "Decorator":
          cellEditor = new qxrad.plugin.designer.ui.table.celleditor.Decorator();
          break;

        default:
          if (qx.lang.Type.isArray(type))
          {
            cellEditor = new qx.ui.table.celleditor.SelectBox();
            cellEditor.setListData(type);
          }
          else
          {
            cellEditor = new qx.ui.table.celleditor.TextField();
          }
      }

      return cellEditor;
    },


    /**
     * TODOC
     *
     * @param type {var} TODOC
     * @return {var} TODOC
     */
    __rendererValueCellRendererFactory : function(type)
    {
      var cellRender = null;

      switch(type)
      {
        case "String":
          cellRender = new qx.ui.table.cellrenderer.String();
          break;

        case "Integer":
          cellRender = new qx.ui.table.cellrenderer.Number();
          break;

        case "Number":
          cellRender = new qx.ui.table.cellrenderer.Number();
          break;

        case "Boolean":
          cellRender = new qx.ui.table.cellrenderer.Boolean();
          break;

        case "Color":
          cellRender = new qxrad.plugin.designer.ui.table.cellrenderer.Color();
          break;

        case "qx.ui.table.ITableModel":
          cellRender = new qxrad.plugin.designer.ui.table.cellrenderer.TableModel();
          break;

        case "Opacity":
          cellRender = new qx.ui.table.cellrenderer.Default();
          break;

        case "Decorator":
          cellRender = new qxrad.plugin.designer.ui.table.cellrenderer.Button();
          break;

        case "Object":
          cellRender = new qxrad.plugin.designer.ui.table.cellrenderer.Button();
          break;

        default:
          // For group property.
          if (qx.lang.Type.isArray(type)) {
            cellRender = new qx.ui.table.cellrenderer.Default();
          } else {
            cellRender = new qxrad.plugin.designer.ui.table.cellrenderer.NotImplemented();
          }
      }

      return cellRender;
    },


    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {var} TODOC
     */
    __propertyValueCellEditorFactory : function(cellInfo)
    {
      var table = cellInfo.table;
      var tableModel = table.getTableModel();
      var rowData = tableModel.getRowData(cellInfo.row);
      var property = rowData[0];

      var def = this.__propertiesDefinition[property];

      //this.debug (def.check);
      var type = def.check;

      var cellEditor = this.__rendererValueCellEditorFactory(type);

      return cellEditor;
    },


    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {var} TODOC
     */
    __propertyNullableCellRendererFactoryFunc : function(cellInfo)
    {
      var table = cellInfo.table;
      var tableModel = table.getTableModel();
      var rowData = tableModel.getRowData(cellInfo.row);
      var property = rowData[0];
      var cellRender = null;

      var def = this.__propertiesDefinition[property];

      if (def.nullable) {
        cellRender = new qx.ui.table.cellrenderer.Boolean();
      } else {
        cellRender = new qx.ui.table.cellrenderer.Default();
      }

      return cellRender;
    },


    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {var} TODOC
     */
    __propertyValueCellRendererFactoryFunc : function(cellInfo)
    {
      var table = cellInfo.table;
      var tableModel = table.getTableModel();
      var rowData = tableModel.getRowData(cellInfo.row);
      var property = rowData[0];

      var def = this.__propertiesDefinition[property];

      var type = def.check;

      var cellRender = this.__rendererValueCellRendererFactory(type);

      if (cellRender instanceof qxrad.plugin.designer.ui.table.cellrenderer.NotImplemented)
      {
        var row = cellInfo.row;
        var col = cellInfo.col;

        if (!this.__gridNotImplemented[row]) {
          this.__gridNotImplemented[row] = {};
        }

        this.__gridNotImplemented[row][col] = true;
      }

      return cellRender;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.__gridNotImplemented = {};

      //this.updateTheme();
      this.__createUI();
    }
  },




  /*
         *****************************************************************************
            DESTRUCTOR
         *****************************************************************************
         */

  destruct : function() {}
});