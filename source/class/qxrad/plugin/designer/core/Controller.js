/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.core.Controller",
{
  type : "singleton",
  extend : qx.data.controller.Tree,


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

    this.setChildPath("children");
    this.setLabelPath("name");

    this.addListener("changeSelection", this.__onChangeSelection, this);

    this.addListener("changeModel", function(e)
    {
    	var model = e.getData();
    	if (model) {
    		this.getTarget().getRoot().setOpen(true);
    	}      
    });
  },


  /**
     *****************************************************************************
           MEMBERS
     *****************************************************************************
     */
  members :
  {
    __currentSelectedComponenent : null,
    __isChangeActivate : false,

    // Listener for activate a component when the selection change.
    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    __onChangeSelection : function(e)
    {
      if (this.__isChangeActivate) {
        return;
      }
     
      var component = e.getData().getItem(0);
      this.manageSelection(component);
      
    },

    manageSelection : function (component) {
    	this.__isChangeActivate = true;
      if (this.__currentSelectedComponenent) {
        this.__currentSelectedComponenent.setActivate(false);
      }

      if (component)
      {
        this.__currentSelectedComponenent = component;
        component.setActivate(true);
      }
      else
      {
        this.__currentSelectedComponenent = null;
      }
      this.__isChangeActivate = false;
    },
    
    getCurrentSelectedComponenent : function () {
    	return this.__currentSelectedComponenent;
    },
    
    /**
     * TODOC
     *
     * @param component {var} TODOC
     * @return {void}
     */
    addComponent : function(component) {
      component.addListener("changeActivate", this.__onComponentChangeActivate, this);
    },


    /**
     * TODOC
     *
     * @param component {var} TODOC
     * @return {void}
     */
    removeComponent : function(component) {
      component.removeListener("changeActivate", this.__onComponentChangeActivate, this);
    },

    // Listener for selected the component in the tree hierarchy.
    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    __onComponentChangeActivate : function(e)
    {
      if (this.__isChangeActivate) {
        return;
      }    	
      var component = e.getTarget();

      if (e.getData()) {
      	this.getSelection().setItem(0,component);
      	this.manageSelection(component);
      }
    }
  }
});