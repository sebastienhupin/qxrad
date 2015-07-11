qx.Class.define("qxrad.util.Date", {
  extend : qx.util.format.DateFormat,

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
  },
  
  members : {
  	
  	_transformValue : function (value) {
	  	return this.parse(value);
  	}
  },

  /**
	 * ****************************************************************************
	 * PROPERTIES
	 * ****************************************************************************
	 */
  properties : {
  	value : {
  		check : "Date",
  		init : null,
  		transform : "_transformValue"
  	}
  }
  
});
