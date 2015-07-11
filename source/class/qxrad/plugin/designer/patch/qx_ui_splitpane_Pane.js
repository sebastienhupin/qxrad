/* ************************************************************************

Copyright:

License:

Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_splitpane_Pane", {
  extend : qxrad.plugin.designer.component.Widget,

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
    this._firstWidget = new qx.ui.core.Widget();
    this._secondWidget = new qx.ui.core.Widget();
    
    this._firstWidget.addListener("dragover", function (e) {
    	this._currentWidget = 1;
    }, this);
    
    this._firstWidget.setDroppable(true);
    
    this._secondWidget.addListener("dragover", function (e) {
    	this._currentWidget = 2;
    }, this);
    
    this._secondWidget.setDroppable(true);
    
  },

  /**
	 * ****************************************************************************
	 * MEMBERS
	 * ****************************************************************************
	 */
  members : {

  	_firstWidget : null,
  	_secondWidget : null,
  	_currentWidget : null,
  	_nbChild : 0,
  	
    /**
		 * TODOC
		 * 
		 * @param object
		 *          {var} TODOC
		 * @return {void}
		 */
    setObject : function ( object ) {
	    this.base(arguments, object);	    
	    
	    // Utility to help the user at dragging components onto the splitpane.
	    this.getWidget().add(this._firstWidget, 1);
	    this.getWidget().add(this._secondWidget, 1);
    },

    /**
		 * TODOC
		 * 
		 * @param child
		 *          {var} TODOC
		 * @return {void}
		 */
    _addChildHelper : function ( child ) {    	
    	//this.base(arguments, child);

    	var widget = child.getWidget();

    	if (this._currentWidget == 1) {
    		this.getWidget()._removeAt(2);
    		this.getWidget()._addAt(widget,2);
    		qx.lang.Array.insertAt(this.getWidget().getChildren(),widget,0);
    		this._nbChild++;

    	}
    	else if (this._currentWidget == 2) {
    		this.getWidget()._removeAt(3);
    		this.getWidget()._addAt(widget,3);
    		qx.lang.Array.insertAt(this.getWidget().getChildren(),widget,1);
    		this._nbChild++;
    	}
   	
    	this._currentWidget = null;
    	
	    if (this._nbChild == 2)
	    {
		    this.setDroppable(false);
		    // Ensure the tree hierarchy is correctly ordered.   
		    var splitpane = this.getWidget(); 
      	this.getChildren().sort(function(a, b) {
      		var first = a.getObject();
      		var second = b.getObject();      		
          return splitpane._indexOf(first) - splitpane._indexOf(second);
      	});		    
	    }    	

	    child.setParent(this);
	    if (child._finalize)
	    {
		    child._finalize();
	    }
    },

    /**
		 * TODOC
		 * 
		 * @param child
		 *          {var} TODOC
		 * @return {void}
		 */
    _removeChildHelper : function ( child ) {
    	// First find the index of the child and replace it by a widget helper.
    	var index = this.getWidget()._indexOf(child.getObject());
    	
	    this.base(arguments, child);
	    // Replace the component by a widget helper.
	    if (index == 2) {
	  		this.getWidget()._addAt(this._firstWidget,2);
	  		qx.lang.Array.insertAt(this.getWidget().getChildren(),this._firstWidget,0);	    	
	    }
	    else if (index == 3) {
	  		this.getWidget()._addAt(this._secondWidget,3);
	  		qx.lang.Array.insertAt(this.getWidget().getChildren(),this._secondWidget,1);	    	
	    }
	    
	    this._nbChild--;
	    this.setDroppable(true);
    }
  }
});
