/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.PanelComponent",
{
  extend : qx.ui.tree.Tree,




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
    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function() {},

    // Public Members.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function() {
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