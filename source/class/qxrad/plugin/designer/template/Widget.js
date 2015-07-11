/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.template.Widget", {
  extend : qx.ui.core.Widget,
  include : [ qx.ui.core.MLayoutHandling, qx.ui.core.MChildrenHandling ],

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
	  this.setLayout(new qx.ui.layout.Basic());
  }
});
