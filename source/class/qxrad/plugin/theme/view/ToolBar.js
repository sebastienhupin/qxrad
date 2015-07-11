/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.ToolBar",
{
  extend : qx.ui.toolbar.ToolBar,

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

  /*
       properties :
       {

       },
  */

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
    __buttons : null,


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @param label {var} TODOC
     * @return {void}
     */
    __createButton : function(name, label)
    {
      var bt = this.__buttons[name] = new qx.ui.toolbar.Button(label);
      this.add(bt);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function() {
      this.__createButton("save", "Save");
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.__buttons = {};
      this.__createUI();
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getButtons : function() {
      return this.__buttons;
    },


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @return {var} TODOC
     */
    getButtonByName : function(name) {
      return this.__buttons[name] || null;
    }
  },




  /*
         *****************************************************************************
            DESTRUCTOR
         *****************************************************************************
         */

  destruct : function() {}
});