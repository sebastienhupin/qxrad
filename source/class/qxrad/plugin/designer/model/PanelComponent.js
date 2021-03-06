/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.model.PanelComponent",
{
  extend : qx.core.Object,

  /**
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */

  /**
       * Create a new instance
       */
  construct : function() {
    this.base(arguments);
  },


  /**
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  properties :
  {
    model :
    {
      check     : "Object",
      init      : null,
      transform : "_transformModel"
    }
  },

  /**
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @return {null | var} TODOC
     */
    _transformModel : function(value)
    {
//      if (!qx.lang.Type.isArray(value)) {
//        return null;
//      }

      var qxWidgetsList = {};
      for (var key in value)
      {
        var w = value[key];
        console.log(key);
        var split = qx.util.StringSplit.split(key, ".");

        if (split[0] == "qx") {
          qxrad.util.Array.arrayToMapTree(qxWidgetsList, split);
        }
      }

      var model = qx.data.marshal.Json.createModel(qxWidgetsList);

      return model;
    }
  }
});