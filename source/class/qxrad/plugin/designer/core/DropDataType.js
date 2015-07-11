qx.Class.define("qxrad.plugin.designer.core.DropDataType",
{
  statics :
  {
    /*
        ---------------------------------------------------------------------------
           PUBLIC API
        ---------------------------------------------------------------------------
        */

    /**
     * TODOC
     *
     * @param config {var} TODOC
     * @return {var} TODOC
     */
    define : function(config)
    {
      if (!config) {
        var config = {};
      }

      var dropDataType = {};

      for (var key in config)
      {
        var value = config[key];

        if (qx.lang.Type.isString(value)) {
          dropDataType[key] = config[value].dropDataType;
        } else {
          dropDataType[key] = value.dropDataType;
        }
      }

      return dropDataType;
    }
  }
});