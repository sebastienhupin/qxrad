/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.template.MyWidget", { 
	extend : qxrad.plugin.designer.template.Widget,
  /**
	 * ****************************************************************************
	 * CONSTRUCTOR
	 * ****************************************************************************
	 */

  /**
	 * Create a new instance
	 */
  construct : function () {
	  this.base(arguments);
	  this.set({
	  	width:800,
	  	height:600,
	  	allowShrinkY : false,
	  	allowShrinkX : false,
	  	allowGrowX : false,
	  	allowGrowY : false
	  });
  }	
});