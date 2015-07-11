/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.util.Component",
{
  extend : qx.core.Object,

  statics :
  {
    /**
     * TODOC
     *
     * @param classnameObject {var} TODOC
     * @return {var} TODOC
     */
    create : function(classnameObject)
    {
      var classnameComponent = this.findComponentClassname(classnameObject);
      var clazzComponent = qx.Class.getByName(classnameComponent);
      var component = new clazzComponent();
      return component;
    },


    /**
     * TODOC
     *
     * @param source {var} TODOC
     * @return {var} TODOC
     * @throws TODOC
     */
    createWithSource : function(source)
    {
      var classnameObject = source.classname;

      if (!qx.Class.isDefined(classnameObject)) {
        throw new Error("Unkown classname : " + classnameObject);
      }

      var component = this.create(classnameObject);
      component.setSource(source);

      return component;
    },


    /**
     * TODOC
     *
     * @param object {var} TODOC
     * @return {var} TODOC
     */
    createWithObject : function(object)
    {
      var component = this.create(object.classname);
      component.setObject(object);
      return component;
    },


    /**
     * TODOC
     *
     * @param classnameObject {var} TODOC
     * @return {var} TODOC
     */
    findComponentClassname : function(classnameObject)
    {
      var classnameComponent = null;
      var clazz = qx.Class.getByName(classnameObject);

      // If there is a patch for the object classname or its superclass.
      while (clazz)
      {
        var classname = clazz.classname;

        if (classname)
        {
          var basepatch = classname.split(".").join("_");
          var patchname = "qxrad.plugin.designer.patch." + basepatch;

          if (qx.Class.isDefined(patchname))
          {
            // The clazz is patched.
            return patchname;
          }
        }

        clazz = clazz.superclass;
      }

      clazz = qx.Class.getByName(classnameObject);
      if (qx.Class.isSubClassOf(clazz, qx.Class.getByName("qx.ui.core.Widget")))
      {
        // Determine if the object is a container.
        // Check for the class or the superclass include qx.ui.core.MLayoutHandling or
        // qx.ui.core.MRemoteLayoutHandling.
        if (
        		qx.Class.hasMixin(clazz, qx.Mixin.getByName("qx.ui.core.MLayoutHandling")) || 
        		qx.Class.hasMixin(clazz, qx.Mixin.getByName("qx.ui.core.MRemoteLayoutHandling"))
        )
        {
          // The clazz is a container.
          classnameComponent = "qxrad.plugin.designer.component.Container";
        }
        else
        {
          // The clazz is a widget.
          classnameComponent = "qxrad.plugin.designer.component.Widget";
        }
      }
      else
      {
        // The clazz is an object.
        classnameComponent = "qxrad.plugin.designer.component.Object";
      }

      return classnameComponent;
    },

    // Utility for determining whether the property is an object.
    /**
     * TODOC
     *
     * @param clazz {var} TODOC
     * @param name {var} TODOC
     * @return {var} TODOC
     */
    isPropertyObject : function(clazz, name)
    {
      var propDef = qx.Class.getPropertyDefinition(clazz, name);
      var value = false;

      //qx.log.Logger.debug(this,"prop def " + propDef.check);
      if (propDef.check)
      {
        if (qx.Class.isDefined(propDef.check) || qx.Interface.isDefined(propDef.check)) {
          value = true;
        }
      }

      return value;
    },

    // This function is an utility for container object.
    /**
     * TODOC
     *
     * @param component {var} TODOC
     * @param properties {var} TODOC
     * @return {Map | var} TODOC
     */
    verifyLayoutProperties : function(component, properties)
    {
      // Whether the component is not a container that layout properties must be null.
      if (component.getType() != "Container") {
        return {};
      }

      var props = null;

      var layout = component.getLayout();

      if (layout.getClassname() == "qx.ui.layout.Atom") {
        props = {};
      } else if (layout.getClassname() == "qx.ui.layout.Basic") {
        props = properties;
      } else if (layout.getClassname() == "qx.ui.layout.Canvas") {
        props = properties;
      } else if (layout.getClassname() == "qx.ui.layout.Dock") {
        props = {};
      }
      else if (layout.getClassname() == "qx.ui.layout.Flow")
      {
        //
        props = {};
      }
      else if (layout.getClassname() == "qx.ui.layout.Grid")
      {
      	var objectLayout = layout.getObject();
        // Whether there is already properties row and column defined.
        // Check if the place is free before add it.
        if (properties && properties.row && properties.column)
        {
        	var grid = objectLayout.__grid;
          if (!grid[properties.row] && !grid[properties.row][properties.column]) {
            props = properties;
          }
        }

        if (!props)
        {
          //
          props = {};

          // Search a place in the grid.
          
          var row = objectLayout.getRowCount() - 1;

          if (row == -1) {
            row = 0;
          }

          var col = objectLayout.getColumnCount() - 1;
          col++;

          props =
          {
            "row"    : row,
            "column" : col
          };
        }
      }
      else if (layout.getClassname() == "qx.ui.layout.Grow")
      {
        //
        props = {};
      }
      else if (layout.getClassname() == "qx.ui.layout.HBox")
      {
        //
        props = {};
      }
      else if (layout.getClassname() == "qx.ui.layout.VBox")
      {
        //
        props = {};
      }

      return props;
    }
  }
});