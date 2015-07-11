/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.inspector.LayoutPropertyEditor",
{
  extend : qxrad.plugin.designer.view.inspector.AbstractPropertyEditor,


  /**
     * Create a new instance
     */
  construct : function(component)
  {
    this.__layoutPropertiesDefinition =
    {
      "qx.ui.layout.Atom" : null,

      "qx.ui.layout.Basic" :
      {
        left :
        {
          check    : "Integer",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        },

        top :
        {
          check    : "Integer",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        }
      },

      "qx.ui.layout.Canvas" :
      {
        top :
        {
          check    : "Mutable",
          mutable  : [ "Integer", "Percent" ],
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        },

        left :
        {
          check    : "Mutable",
          mutable  : [ "Integer", "Percent" ],
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        },

        bottom :
        {
          check    : "Mutable",
          mutable  : [ "Integer", "Percent" ],
          init     : null,
          nullable : true
        },

        right :
        {
          check    : "Mutable",
          mutable  : [ "Integer", "Percent" ],
          init     : null,
          nullable : true
        },

        width :
        {
          check    : "Percent",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        },

        height :
        {
          check    : "Percent",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        }
      },

      "qx.ui.layout.Dock" :
      {
        edge :
        {
          check    : [ "north", "south", "west", "east", "center" ],
          init     : null,
          nullable : true
        },

        flex :
        {
          check    : "Integer",
          init     : null,
          nullable : true
        },

        height :
        {
          check    : "Percent",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        },

        width :
        {
          check    : "Percent",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        }
      },

      "qx.ui.layout.Flow" :
      {
        lineBreak :
        {
          check : "Boolean",
          init  : false
        }
      },

      "qx.ui.layout.Grid" :
      {
        column :
        {
          check : "Integer",
          init  : 0,
          min   : 0
        },

        row :
        {
          check : "Integer",
          init  : 0,
          min   : 0
        },

        colSpan :
        {
          check : "Integer",
          init  : 0,
          min   : 0
        },

        rowSpan :
        {
          check : "Integer",
          init  : 0,
          min   : 0
        }
      },

      "qx.ui.layout.Grow" : null,

      "qx.ui.layout.HBox" :
      {
        flex :
        {
          check    : "Integer",
          init     : null,
          nullable : true
        },

        width :
        {
          check    : "Percent",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        }
      },

      "qx.ui.layout.VBox" :
      {
        flex :
        {
          check    : "Integer",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        },

        height :
        {
          check    : "Percent",
          init     : null,
          nullable : true,
          min      : 0,
          max      : null
        }
      }
    };

    this.base(arguments, component);
  },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __layoutPropertiesDefinition : null,

    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {boolean} TODOC
     */
    __verifyLayoutProperty : function(name, value)
    {
      var component = this.getComponent();
      var parent = component.getParent();
      var layout = parent.getLayout();

      if (layout.getClassname() == "qx.ui.layout.Grid")
      {
        // Check the widget placement before change it.
        var grid = layout.getObject().__grid;
        var props = this.getComponent().getLayoutProperties();
        var row = (name == "row") ? value : props.row;
        var column = (name == "column") ? value : props.column;

        if (grid[row] && grid[row][column])
        {
          this.setAdditionalStatusBarText(" There is already a widget for this row and column !!!!");
          return false;
        }
      }
      else if (value && layout.getClassname() == "qx.ui.layout.Dock")
      {
        // Only one child can be added to the center.
        // Ensure there is not children already setting in the center.
        var children = parent.getChildren();

        for (var i=0, l=children.getLength(); i<l; i++)
        {
          var props = children.getItem(i).getLayoutProperties();

          if (props.edge == "center" && value == "center")
          {
            this.setAdditionalStatusBarText(" There is already a widget in the center !!!!");
            return false;
          }
        }
      }

      this.setAdditionalStatusBarText("");
      return true;
    },


    /**
     * TODOC
     *
     * @param component {var} TODOC
     * @return {void}
     */
    _analyse : function(component)
    {
      var parent = component.getParent();

      if (!parent || !qx.Class.isSubClassOf(parent.constructor, qx.Class.getByName("qxrad.plugin.designer.component.Container")))
      {
        this._tableModel.setData([]);
        return;
      }

      var layout = parent.getLayout();

      var rowData = [];
      var properties = this.__layoutPropertiesDefinition[layout.getClassname()];

      for (var name in properties)
      {
        var value = null;
        var values = component.getLayoutProperties();
        value = values[name] || null;
        
        var propertiesDefinition = this.getPropertiesDefinition();
        propertiesDefinition[name] =  properties[name];
        this.setPropertiesDefinition(propertiesDefinition);

        rowData.push([ name, value, value ? false : true, null ]);
      }

      this._tableModel.setData(rowData);
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
        var layoutProperties = {};

        if (value == oldValue) {
          return;
        }

        // Get the value.
        if (col == 1) {
          layoutProperties[property] = value;
        }

        // Get nullable value.
        else if (col == 2)
        {
          // Nullable is checked.
          if (value) {
            layoutProperties[property] = null;
          }
          else
          {
            // Try to get the oldValue.
            var newValue = tableModel.getValue(1, row);
            layoutProperties[property] = newValue;
          }
        }

        if (this.__verifyLayoutProperty(property, layoutProperties[property])) {
          this.getComponent().setLayoutProperties(layoutProperties);
        }
        else
        {
          // The layout properties are invalid, inform the user about that.
          tableModel.setValue(col, row, oldValue);
        }
      });
    }
  }
});