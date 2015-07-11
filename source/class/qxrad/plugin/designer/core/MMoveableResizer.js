/* ************************************************************************

Copyright:

License:

Authors:

 ************************************************************************ */

qx.Mixin.define("qxrad.plugin.designer.core.MMoveableResizer",
{
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
    // Check for a sub class of qxrad.plugin.designer.core.Selector.
    if (!qx.Class.isSubClassOf(this.constructor, qx.Class.getByName("qxrad.plugin.designer.core.Selector"))) {
      throw new Error("This Mixin work only with a sub class of qxrad.plugin.designer.core.Selector");
    }
    this.__state =
    {
      resize : false,
      move   : false
    };    
  },


  /**
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
  members :
  {
    RESIZE_TOP : 1,
    RESIZE_BOTTOM : 2,
    RESIZE_LEFT : 4,
    RESIZE_RIGHT : 8,
    __state : null,

    // Resize
    __resizeActive : null,
    __resizeLeft : null,
    __resizeTop : null,
    __resizeStart : null,
    __resizeRange : null,

    // Move
    __dragRange : null,
    __dragLeft : null,
    __dragTop : null,
    __parentLeft : null,
    __parentTop : null,
    __moveActive : false,


    /**
     * TODOC
     *
     * @param handle {var} TODOC
     * @return {void}
     */
    __computeResizeMode : function(handle)
    {
      var resizeActive = 0;
      var moveActive = false;

      // Test to know is an resizing session or a moving session.
      switch(handle)
      {
        case "tl":
          resizeActive += this.RESIZE_TOP;
          resizeActive += this.RESIZE_LEFT;
          break;

        case "tm":
          resizeActive += this.RESIZE_TOP;
          break;

        case "tr":
          resizeActive += this.RESIZE_TOP;
          resizeActive += this.RESIZE_RIGHT;
          break;

        case "ml":
          resizeActive += this.RESIZE_LEFT;
          break;

        case "mr":
          resizeActive += this.RESIZE_RIGHT;
          break;

        case "bl":
          resizeActive += this.RESIZE_BOTTOM;
          resizeActive += this.RESIZE_LEFT;
          break;

        case "bm":
          resizeActive += this.RESIZE_BOTTOM;
          break;

        case "br":
          resizeActive += this.RESIZE_BOTTOM;
          resizeActive += this.RESIZE_RIGHT;
          break;

        case "move":
          moveActive = true;
          break;
      }

      this.__resizeActive = this.isResizeable() ? resizeActive : 0;
      this.__moveActive = this.isMoveable() ? moveActive : false;
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {Map} TODOC
     */
    __computeResizeResult : function(e)
    {
      // Detect mode
      var resizeActive = this.__resizeActive;
      var widget = this.getComponent().getWidget();

      // Read size hint
      var hint = widget.getSizeHint();
      var range = this.__resizeRange;

      // Read original values
      var start = this.__resizeStart;
      var width = start.width;
      var height = start.height;
      var left = start.left;
      var top = start.top;
      var diff;

      if ((resizeActive & this.RESIZE_TOP) || (resizeActive & this.RESIZE_BOTTOM))
      {
        diff = Math.max(range.top, Math.min(range.bottom, e.getDocumentTop())) - this.__resizeTop;

        if (resizeActive & this.RESIZE_TOP) {
          height -= diff;
        } else {
          height += diff;
        }

        if (height < hint.minHeight) {
          height = hint.minHeight;
        } else if (height > hint.maxHeight) {
          height = hint.maxHeight;
        }

        if (resizeActive & this.RESIZE_TOP) {
          top += start.height - height;
        }
      }

      if ((resizeActive & this.RESIZE_LEFT) || (resizeActive & this.RESIZE_RIGHT))
      {
        diff = Math.max(range.left, Math.min(range.right, e.getDocumentLeft())) - this.__resizeLeft;

        if (resizeActive & this.RESIZE_LEFT) {
          width -= diff;
        } else {
          width += diff;
        }

        if (width < hint.minWidth) {
          width = hint.minWidth;
        } else if (width > hint.maxWidth) {
          width = hint.maxWidth;
        }

        if (resizeActive & this.RESIZE_LEFT) {
          left += start.width - width;
        }
      }

      return {
        viewportLeft : left,
        viewportTop  : top,
        parentLeft   : start.bounds.left + left - start.left,
        parentTop    : start.bounds.top + top - start.top,
        width        : width,
        height       : height
      };
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {Map} TODOC
     */
    __computeMoveCoordinates : function(e)
    {
      var range = this.__dragRange;
      var mouseLeft = Math.max(range.left, Math.min(range.right, e.getDocumentLeft()));
      var mouseTop = Math.max(range.top, Math.min(range.bottom, e.getDocumentTop()));

      var viewportLeft = this.__dragLeft + mouseLeft;
      var viewportTop = this.__dragTop + mouseTop;

      return {
        viewportLeft : viewportLeft,
        viewportTop  : viewportTop,
        parentLeft   : viewportLeft - this.__parentLeft,
        parentTop    : viewportTop - this.__parentTop
      };
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onMouseDown : function(e)
    {
      // Check for active resize or active move
      if (!this.__resizeActive && !this.__moveActive) {
        return;
      }

      var widget = this.getComponent().getWidget();

      if (this.__resizeActive)
      {
        // Add resize state
        this.addState("resize");

        // Store the initial location and offset.
        // Store mouse coordinates
        this.__resizeLeft = e.getDocumentLeft();
        this.__resizeTop = e.getDocumentTop();

        // Cache bounds
        var location = widget.getContentLocation();
        var bounds = widget.getBounds();

        this.__resizeStart =
        {
          top    : location.top,
          left   : location.left,
          width  : bounds.width,
          height : bounds.height,
          bounds : qx.lang.Object.clone(bounds)
        };

        // Compute range
        var parent = widget.getLayoutParent();
        var parentLocation = parent.getContentLocation();
        var parentBounds = parent.getBounds();

        this.__resizeRange =
        {
          left   : parentLocation.left,
          top    : parentLocation.top,
          right  : parentLocation.left + parentBounds.width,
          bottom : parentLocation.top + parentBounds.height
        };
      }
      else if (this.__moveActive)
      {
        // Compute drag range
        var parent = widget.getLayoutParent();
        var parentLocation = parent.getContentLocation();
        var parentBounds = parent.getBounds();

        this.__dragRange =
        {
          left   : parentLocation.left,
          top    : parentLocation.top,
          right  : parentLocation.left + parentBounds.width,
          bottom : parentLocation.top + parentBounds.height
        };

        // Compute drag positions
        var widgetLocation = widget.getContentLocation();
        this.__parentLeft = parentLocation.left;
        this.__parentTop = parentLocation.top;

        this.__dragLeft = widgetLocation.left - e.getDocumentLeft();
        this.__dragTop = widgetLocation.top - e.getDocumentTop();

        // Add state
        this.addState("move");
      }

      // Enable capturing
      this.getSelectorElement().capture();

      // Stop event
      e.stop();
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onMouseUp : function(e)
    {

      if (this.hasState("resize"))
      {
        // Compute bounds
        var bounds = this.__computeResizeResult(e);

        this.getComponent().setProperty("width", bounds.width);
        this.getComponent().setProperty("height", bounds.height);

        this.getComponent().setLayoutProperties(
        {
          left : bounds.parentLeft,
          top  : bounds.parentTop
        });

        // Clear mode
        this.__resizeActive = 0;

        // Remove resize state
        this.removeState("resize");
      }
      else if (this.hasState("move"))
      {
        // Remove drag state
        this.removeState("move");

        // Apply them to the layout
        var coords = this.__computeMoveCoordinates(e);

        this.getComponent().setLayoutProperties(
        {
          left : coords.parentLeft,
          top  : coords.parentTop
        });
      }

      // Disable capturing
      this.getSelectorElement().releaseCapture();

      e.stopPropagation();
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onMouseMove : function(e)
    {
      var widget = this.getComponent().getWidget();

      if (this.hasState("resize"))
      {
        var bounds = this.__computeResizeResult(e);

        // Update size
        widget.setWidth(bounds.width);
        widget.setHeight(bounds.height);

        // Update coordinate in canvas
        widget.setLayoutProperties(
        {
          left : bounds.parentLeft,
          top  : bounds.parentTop
        });

        // Full stop for event
        e.stopPropagation();
      }
      else if (this.hasState("move"))
      {
        // Apply new coordinates using DOM
        var coords = this.__computeMoveCoordinates(e);
        widget.setDomPosition(coords.parentLeft, coords.parentTop);
      }
      else
      {
        var elm = e.getTarget();
        var handle = null;

        if (elm && elm.getAttribute) {
          handle = elm.getAttribute("selector-handle");
        }

        if (handle) {
          this.__computeResizeMode(handle);
        }

        e.stopPropagation();
      }
    },

    // Public methods.
    /**
     * TODOC
     *
     * @param state {var} TODOC
     * @return {void}
     */
    addState : function(state) {
      this.__state[state] = true;
    },


    /**
     * TODOC
     *
     * @param state {var} TODOC
     * @return {void}
     */
    removeState : function(state) {
      this.__state[state] = false;
    },


    /**
     * TODOC
     *
     * @param state {var} TODOC
     * @return {var} TODOC
     */
    hasState : function(state) {
      return this.__state[state];
    }
  }
});