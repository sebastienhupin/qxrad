/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Mixin.define("qxrad.core.MPerspective",
{
  properties :
  {
    perspectiveName :
    {
      check    : "String",
      nullable : false
    },

    toolBar : { init : null },
    panelLeft : { init : null },
    panelRight : { init : null },
    editor : { init : null },
    panelLog : { init : null }
  },

  members :
  {
    _toolBarName : null,
    _editorName : null,
    _panelLeftName : null,
    _panelRightName : null,
    _panelLogName : null,


    /**
     * TODOC
     *
     * @return {Map} TODOC
     */
    getPerspective : function()
    {
      return {
        "name" : this.getPerspectiveName(),

        "tools" :
        {
          "toolbar" :
          {
            "name" : this._toolBarName,
            "view" : this.getToolBar()
          },

          "editor" :
          {
            "name" : this._editorName,
            "view" : this.getEditor()
          },

          "panelleft" :
          {
            "name" : this._panelLeftName,
            "view" : this.getPanelLeft()
          },

          "panelright" :
          {
            "name" : this._panelRightName,
            "view" : this.getPanelRight()
          },

          "panellog" :
          {
            "name" : this._panelLogName,
            "view" : this.getPanelLog()
          }
        }
      };
    }
  }
});