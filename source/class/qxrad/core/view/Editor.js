/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.core.view.Editor",
{
  type : "singleton",
  extend : qx.ui.window.Window,




  /*
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */

  /**
       * Create a new instance
       */
  construct : function()
  {
    this.base(arguments, "Editor");

    this.init();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  events :
  {
    "confirm" : "qx.event.type.Event",
    "cancel"  : "qx.event.type.Event"
  },




  /*
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  properties :
  {
    source :
    {
      check    : "String",
      init     : null,
      nullable : true,
      apply    : "_applySource",
      event    : "changeSource"
    }
  },




  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __contentSource : null,
    __buttonConfirm : null,
    __buttonCancel : null,


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createContentSource : function()
    {
      var contentSource = this.__contentSource = new qx.ui.form.TextArea("");

      contentSource.set(
      {
        width  : 600,
        height : 400
      });

      return contentSource;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __createButtons : function()
    {
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(10).set({ alignX : "center" }));
      var btConfirm = this.__buttonConfirm = new qx.ui.form.Button("Confirm");
      var btCancel = this.__buttonCancel = new qx.ui.form.Button("Cancel");
      container.add(btConfirm);
      container.add(btCancel);

      return container;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      var layout = new qx.ui.layout.VBox(10);
      this.setLayout(layout);

      this.add(this.__createContentSource(), { flex : 1 });
      this.add(this.__createButtons(), { flex : 1 });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __connectListeners : function()
    {
      this.addListenerOnce("resize", this.center, this);

      this.__buttonConfirm.addListener("execute", function(e)
      {
        //var value = this.__contentSource.getValue();
        var value = this.__contentSource.getValue(true);

        this.setSource(value);
        this.fireEvent("confirm");
        this.close();
      },
      this);

      this.__buttonCancel.addListener("execute", function(e)
      {
        this.fireEvent("cancel");
        this.close();
      },
      this);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applySource : function(value, oldValue)
    {
      if (!value)
      {
        this.__contentSource.setValue("");
        return;
      }
      console.log(value);
      //code = code.replace(/\\n/gm, '');
      this.__contentSource.setValue(value);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this.setModal(true);
      this.__createUI();

      this.__connectListeners();
    }
  }
});