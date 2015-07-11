/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */
qx.Class.define("qxrad.plugin.designer.core.Selector",
{
  extend : qx.ui.core.Widget,
  include : [qx.ui.core.MLayoutHandling, qx.ui.core.MChildrenHandling, qxrad.plugin.designer.core.MMoveableResizer],

  /**
     * ****************************************************************************
     * CONSTRUCTOR
     * ****************************************************************************
     */

  /**
     * Create a new instance
     */
  construct : function(component)
  {
    this.base(arguments);
    this.setComponent(component);
    var widget = component.getWidget();

    // Check before whether the widget is not null.
    if (!widget) {
      throw new Error("The widget can not be null");
    }
    this.init();
  },

  /**
     * ****************************************************************************
     * PROPERTIES
     * ****************************************************************************
     */
  properties :
  {
    moveable :
    {
      check : "Boolean",
      init : false,
      event : "changeMoveable",
      apply : "_applyMoveable"
    },
    resizeable :
    {
      check : "Boolean",
      init : false,
      event : "changeResizeable",
      apply : "_applyResizeable"
    },
    component :
    {
      check : "qxrad.plugin.designer.component.Widget",
      init : null,
      apply : "_applyComponent"
    },
    activate :
    {
      check : "Boolean",
      init : false,
      event : "changeActivate",
      apply : "_applyActivate"
    }
  },

  /**
     * ****************************************************************************
     * MEMBERS
     * ****************************************************************************
     */
  members :
  {
    __handlesList : null,
    __handlesDefaultStyle : null,
    __cursorHandles : null,
    __handlesStyle : null,
    __selector : null,

    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyMoveable : function(value, oldValue)
    {
      var elm = this.__handlesList["move"];
      var cursor = value ? this.__cursorHandles["move"].cursor : null;
      elm.setStyle("cursor", cursor, true);
    },

    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyResizeable : function(value, oldValue) {
      for (var key in this.__handlesList)
      {
        if (key == "move") {
          continue;
        }
        var elm = this.__handlesList[key];
        var cursor = value ? this.__cursorHandles[key].cursor : null;
        elm.setStyle("cursor", cursor, true);
      }
    },

    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyComponent : function(value, oldValue) {
      if (oldValue) {
        throw new Error("There is already a component attached to the selector !!!");
      }
    },
    _applyActivate : function(value, oldValue) {
      if (value) {
        this.getSelectorElement().include();
      } else {
        this.getSelectorElement().exclude();
      }
    },

    /**
     * Creates the resizing element.
     *
     * @param style {var} TODOC
     * @return {qx.html.Element} The blocker element
     */
    __createHandle : function(style)
    {
      var handleElm = new qx.html.Element("div", qx.lang.Object.mergeWith(style, this.__handlesDefaultStyle, false));
      return handleElm;
    },

    /**
     * Creates the selector element.
     *
     * @return {qx.html.Element} The blocker element
     */
    __createSelectorElement : function()
    {
      var backgroundColor = backgroundColor ? qx.theme.manager.Color.getInstance().resolve(backgroundColor) : null;
      var styles =
      {
        position : "absolute",
        width : "inherit",
        height : "inherit",
        opacity : 0.1,
        backgroundColor : "red"
      };

      // IE needs some extra love here to convince it to block events.
      if ((qx.core.Environment.get("engine.name") === "mshtml"))
      {
        styles.backgroundImage = "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")";
        styles.backgroundRepeat = "repeat";
      }
      var selectorElm = new qx.html.Element("div", styles);
      this.__handlesList = {

      };
      for (var h in this.__handlesStyle)
      {
        var handle = this.__createHandle(this.__handlesStyle[h]);
        handle.setAttribute("selector-handle", h, true);
        selectorElm.add(handle);
        this.__handlesList[h] = handle;
      }
      selectorElm.addListener("mousedown", this._onMouseDown, this);
      selectorElm.addListener("mouseup", this._onMouseUp, this);
      selectorElm.addListener("mousemove", this._onMouseMove, this);
      return selectorElm;
    },

    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _setCursorMove : function(e)
    {
      var value = e.getData();
      var elm = this.__handlesList["move"];
      var cursor = value ? this.__cursorHandles["move"].cursor : null;
      elm.setStyle("cursor", cursor, true);
    },

    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _setCursorResizeable : function(e)
    {
      var value = e.getData();
      for (var key in this.__handlesList)
      {
        if (key == "move") {
          continue;
        }
        var elm = this.__handlesList[key];
        var cursor = value ? this.__cursorHandles[key].cursor : null;
        elm.setStyle("cursor", cursor, true);
      }
    },

    /**
     * Get/create the selector element
     *
     * @return {qx.html.Element} The selector element
     */
    getSelectorElement : function()
    {
      if (!this.__selector)
      {
        var selector = this.__selector = this.__createSelectorElement();
        this.getComponent().getWidget().getContentElement().add(selector);
        /* @todo : save the overflow before and restore it when the widget loose the selection */
        this.getComponent().getWidget().getContentElement().setStyle("overflow", 'visible', true);
        selector.exclude();
      }
      return this.__selector;
    },
    init : function()
    {
      this.__handlesDefaultStyle =
      {
        position : "absolute",
        width : "5px",
        height : "5px",
        'font-size' : "1px",
        backgroundColor : "#EEE",
        border : "1px solid #333"
      };
      this.__cursorHandles =
      {
        'move' : {
          cursor : "move"
        },
        'tm' : {
          cursor : "n-resize"
        },
        'tr' : {
          cursor : "ne-resize"
        },
        'ml' : {
          cursor : "w-resize"
        },
        'mr' : {
          cursor : "e-resize"
        },
        'bl' : {
          cursor : "sw-resize"
        },
        'bm' : {
          cursor : "s-resize"
        },
        'br' : {
          cursor : "se-resize"
        }
      };
      this.__handlesStyle =
      {
        'move' :
        {
          top : "-8px",
          left : "-8px",
          width : "10px",
          height : "10px",
          backgroundColor : "red"
        },
        'tm' :
        {
          top : "-8px",
          left : "50%",
          'margin-left' : "-4px"
        },
        'tr' :
        {
          top : "-8px",
          right : "-8px"
        },
        'ml' :
        {
          top : "50%",
          'margin-top' : "-4px",
          left : "-8px"
        },
        'mr' :
        {
          top : "50%",
          'margin-top' : "-4px",
          right : "-8px"
        },
        'bl' :
        {
          bottom : "-8px",
          left : "-8px"
        },
        'bm' :
        {
          bottom : "-8px",
          left : "50%",
          'margin-left' : "-4px"
        },
        'br' :
        {
          bottom : "-8px",
          right : "-8px"
        }
      };

      // Ask for the creation of the selector.
      this.getSelectorElement();
    }
  },
  destruct : function()
  {
    this.__selector.removeListener("mousedown", this._onMouseDown, this);
    this.__selector.removeListener("mouseup", this._onMouseUp, this);
    this.__selector.removeListener("mousemove", this._onMouseMove, this);
    this._disposeObjects("__selector");
    this._disposeObjects("__handlesDefaultStyle", "__cursorHandles", "__handlesStyle", "__handlesList", "__state");
  }
});
