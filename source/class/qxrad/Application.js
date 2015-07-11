/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(qxrad/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxrad"
 */
qx.Class.define("qxrad.Application",
{
  extend : qx.application.Standalone,




  /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

  members :
  {
    __ide : null,


    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @return {void}
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if ((qx.core.Environment.get("qx.debug")))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;

        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }




      /*
            -------------------------------------------------------------------------
              Below is your actual application code...
            -------------------------------------------------------------------------
            */

      //qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Modern);
      this.init();
    },


    /**
     * TODOC
     *
     * @param plugin {var} TODOC
     * @return {void}
     */
    __loadPlugin : function(plugin)
    {
      var perspective = plugin.getPerspective();
      this.getIDE().addPerspectiveView(perspective, true);
    },


    /**
     * TODOC
     *
     * @param parent {var} TODOC
     * @return {void}
     */
    _createUI : function(parent)
    {
      //
      var ideview = this.__ide = new qxrad.core.view.Ide();
      parent.add(ideview, { edge : 0 });
    },

    // Init part.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this._createUI(this.getRoot());

      var designer = new qxrad.plugin.Designer();
      this.loadPlugin(designer);
    },

    //var theme = new qxrad.plugin.Theme();
    //this.loadPlugin(theme);
    // Public methods.
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getIDE : function() {
      return this.__ide;
    },


    /**
     * TODOC
     *
     * @param plugin {var} TODOC
     * @return {void}
     */
    loadPlugin : function(plugin)
    {
      if (!plugin) {
        return;
      }

      this.__loadPlugin(plugin);
    }
  }
});