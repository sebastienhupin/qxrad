/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */
/* ************************************************************************
#asset(qxrad/images/grid.png)
************************************************************************ */

qx.Class.define("qxrad.plugin.designer.view.Editor",
{
  extend : qx.ui.container.Scroll,




  /**
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

  /**
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
  	_container : null,
    /**
     * TODOC 
     *
     * @return {void}
     */
    __createUI : function()
    {
      this.setWidth(800);
      this.setHeight(600);
      
      this._container = new qx.ui.container.Composite(new qx.ui.layout.Basic);
      this._container.set({
  	  	allowShrinkY : false,
  	  	allowShrinkX : false
      });

      var background = new qx.ui.basic.Image("qxrad/images/grid.png");
      this._container.add(background);
      this.add(this._container);
    },

    // Public Members.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function() {
      this.__createUI();
    }
  }
});