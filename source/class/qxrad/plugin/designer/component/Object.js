/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.component.Object",
{
  extend : qxrad.plugin.designer.component.Abstract,

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

    this.setType("Object");
  },


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    // Overridden
    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyActivate : function(value, oldValue) {},
    //
    // Overridden
    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @return {var} TODOC
     */
    _getProperty : function(name)
    {
      var object = this.getObject();
      var getterName = "get" + qx.lang.String.firstUp(name);
      return object[getterName]();
    },

    // Overridden
    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {void}
     */
    _setProperty : function(name, value)
    {
      var object = this.getObject();
      var setterName = "set" + qx.lang.String.firstUp(name);
      object[setterName](value);
    }
  }
});