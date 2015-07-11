/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.Decorator",
{
  extend : qx.core.Object,
  implement : qx.ui.table.ICellEditorFactory,


  /**
     * Create a new instance
     */
  construct : function(component)
  {
    this.base(arguments);

    this.__decoratorList = [
    {
      "name"  : "Single",
      "value" : "qx.ui.decoration.Single"
    },
    {
      "name"  : "Background",
      "value" : "qx.ui.decoration.Background"
    },
    {
      "name"  : "Beveled",
      "value" : "qx.ui.decoration.Beveled"
    },
    {
      "name"  : "Double",
      "value" : "qx.ui.decoration.Double"
    },
    {
      "name"  : "Grid",
      "value" : "qx.ui.decoration.Grid"
    },
    {
      "name"  : "GridDiv",
      "value" : "qx.ui.decoration.GridDiv"
    },
    {
      "name"  : "HBox",
      "value" : "qx.ui.decoration.HBox"
    },
    {
      "name"  : "Uniform",
      "value" : "qx.ui.decoration.Uniform"
    },
    {
      "name"  : "VBox",
      "value" : "qx.ui.decoration.VBox"
    } ];
  },




  /*
     *****************************************************************************
           MEMBERS
     *****************************************************************************
     */

  members :
  {
    __decoratorList : null,
    __style : null,
    __decorator : null,
    __selectDecorator : null,
    __preview : null,
    __inspector : null,


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createSelectDecorator : function(cellEditor)
    {
      var select = this.__selectDecorator = new qx.ui.form.SelectBox();

      var list = this.__decoratorList;

      for (var i=0, l=list.length; i<l; i++)
      {
        var name = list[i].name;
        var value = list[i].value;
        var item = new qx.ui.form.ListItem(name);
        item.setUserData("value", value);
        select.add(item);
      }

      cellEditor.add(select);
    },


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createInspector : function(cellEditor)
    {
      var inspector = this.__inspector = new qxrad.plugin.theme.view.inspector.PropertyEditor();
      inspector.set({ height : 200 });
      cellEditor.add(inspector);
    },


    /**
     * TODOC
     *
     * @param cellEditor {var} TODOC
     * @return {void}
     */
    __createPreview : function(cellEditor)
    {
      var container = new qx.ui.groupbox.GroupBox("Preview");
      var layout = new qx.ui.layout.VBox();

      layout.set(
      {
        "alignY" : "middle",
        "alignX" : "center"
      });

      container.setLayout(layout);

      container.set(
      {
        width  : 200,
        height : 175
      });

      var widget = this.__preview = new qx.ui.core.Widget();

      widget.set(
      {
        width      : 150,
        height     : 125,
        allowGrowX : false
      });

      var clazz = null;

      if (qx.lang.Type.isString(cellEditor.__decorator)) {
        clazz = qx.Class.getByName(cellEditor.__decorator);
      } else {
        clazz = cellEditor.__decorator;
      }

      this.debug("set decorator " + clazz);
      var style = this.__style || {};
      var decorator = null;

      if (clazz)
      {
        decorator = this.__decorator = (new clazz).set(style);
        this.debug("decorator : " + decorator);
      }

      widget.setDecorator(decorator);
      container.add(widget);
      cellEditor.add(container);
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
      cellEditor.addListener("appear", function(e) {
        cellEditor.center();
      }, this);

      this.__inspector.addListener("changeProperty", function(e)
      {
        var prop = e.getData().name;
        var value = e.getData().value;
        this.__style[prop] = value;
        this.__setPreviewDecorator();
      },
      this);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __setSelectDecorator : function()
    {
      var children = this.__selectDecorator.getChildren();
      var decoratorName = this.__decorator.constructor.basename;

      for (var i=0, l=children.length; i<l; i++)
      {
        var item = children[i];

        if (item.getLabel() == decoratorName) {
          this.__selectDecorator.setSelection([ item ]);
        }
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __setPreviewDecorator : function()
    {
      var widget = this.__preview;
      var clazz = this.__decorator.constructor;

      if (clazz)
      {
        var decorator = this.__decorator = (new clazz).set(this.__style);
        widget.setDecorator(decorator);
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __setDecorator : function()
    {
      var decorator = this.__decorator;
      var component = new qxrad.plugin.designer.core.Component(decorator.toHashCode(), "Decorator_" + decorator.toHashCode(), null);
      this.__inspector.setComponent(component);
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
      var cellEditor = new qx.ui.window.Window("Decorator Editor");
      cellEditor.setLayout(new qx.ui.layout.VBox(10));

      cellEditor.__value = cellEditor.__oldValue = value;
      cellEditor.__decorator = cellEditor.__value.decorator || null;
      this.__style = cellEditor.__value.style || null;

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

      this.__createSelectDecorator(cellEditor);
      this.__createInspector(cellEditor);
      this.__createPreview(cellEditor);
      this.__createButtons(cellEditor);
      this.__setSelectDecorator();
      this.__setDecorator();
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

      var decorator =
      {
        "decorator" : this.__decorator.classname || null,
        "style"     : this.__style || {}
      };

      qx.dev.Debug.debugObject(decorator, "Decorator value");
      return decorator;
    }
  }
});