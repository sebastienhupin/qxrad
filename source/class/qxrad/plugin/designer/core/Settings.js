/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.core.Settings",
{
  extend : qx.core.Object,




  /*
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */

  /**
       * Create a new instance
       */
  construct : function(urls)
  {
    this.base(arguments);

    if (urls) {
      this.setUrls(urls);
    }

    this.init();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  events : { completed : "qx.event.type.Data" },




  /*
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  properties :
  {
    urls :
    {
      check : "Object",
      init  : null,
      apply : "_applyUrls"
    }
  },




  /*
       *****************************************************************************
          STATICS
       *****************************************************************************
       */

  /*
       statics :
       {

       },
  */

  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __isLoading : null,
    __fileLoaded : null,
    __file : null,


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     */
    _applyUrls : function(value, oldValue)
    {
      if (this.__isLoading) {
        return;
      }
    },


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @param url {var} TODOC
     * @return {void}
     */
    __loadFile : function(name, url)
    {

      var request = new qx.io.request.Xhr(url);
      request.setAccept("application/json");
      request.setParser("json");
      
      request.addListenerOnce("success", function(ev)
      {
        var req = ev.getTarget(),
           data = req.getResponse();
 
        this.__file[name] = data;
        this.__fileLoaded--;

        if (this.__fileLoaded == 0) {
          this.fireDataEvent("completed", this.__file);
        }
      },
      this);

      request.send();
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _load : function()
    {
      var urls = this.getUrls();

      for (var i=0, l=urls.length; i<l; i++)
      {
        var name = urls[i].name;
        var url = urls[i].url;
        this.__fileLoaded++;
        this.__loadFile(name, url);
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    load : function()
    {
      if (!this.getUrls() || this.__isLoading) {
        return;
      }

      this.__isLoading = true;
      this.__fileLoaded = 0;
      this._load();
      this.__isLoading = false;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function() {
      this.__file = {};
    }
  }
});