/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.controller.PanelComponent",
{
  extend : qx.data.controller.Tree,


  /**
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */

  /**
       * Create a new instance
       */
  construct : function(model, target, childPath, labelPath, iconPath)
  {
    this.base(arguments, model, target, childPath, labelPath);
    
    if (iconPath !== null) {
      this.setIconPath(iconPath);
    }
    
    target.setDraggable(true);

    this.__connectListener();
  },


  /**
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    dropDataType : null,


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    __onDragStart : function(e)
    {
      var item = this.getTarget().getSelection()[0];

      if (item.getChildren().length > 0) {
        e.preventDefault();
      }

      e.addType("component");

      // Register supported actions
      e.addAction("copy");

      var item = this.getTarget().getSelection()[0];
      var sClassname = [];

      while (item.getParent())
      {
        sClassname.push(item.getLabel());
        item = item.getParent();
      }

      sClassname.push(item.getLabel());
      var classname = sClassname.reverse().join(".");

      // Add data to manager
      this.getTarget()["dropDataType"] = this.dropDataType = classname;
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    __onDropRequest : function(e)
    {

      var type = e.getCurrentType();

      // Add data to manager
      e.addData(type, this.dropDataType);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __connectListener : function()
    {
      this.getTarget().addListener("dragstart", this.__onDragStart, this);
      this.getTarget().addListener("droprequest", this.__onDropRequest, this);
    }
  }
});