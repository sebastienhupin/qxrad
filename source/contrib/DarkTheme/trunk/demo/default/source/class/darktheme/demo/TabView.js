qx.Class.define("darktheme.demo.TabView",
{
  extend: qx.ui.groupbox.GroupBox,

  construct: function()
  {
    this.base(arguments);

    this._createControls();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members:
  {
    _createControls: function()
    {
      var layout = new qx.ui.layout.Canvas();
      this.set({layout: layout, contentPadding: 10});

      var scroller = new qx.ui.container.Scroll();

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      container.setPadding(20);
      container.setAllowStretchX(false);

      scroller.add(container);

	  this.addListenerOnce("appear", function(e)
      {
        this.add(scroller, {edge : 0});
	  }, this);

      container.add(this.getTabView1());
      container.add(this.getTabView2());
      container.add(this.getTabView3());
    },

    getTabView1 : function()
    {
      var tabView = new qx.ui.tabview.TabView();
      tabView.setWidth(500);


      ////////////////// TEST PAGE 1 ////////////////////
      var page1 = new qx.ui.tabview.Page("Layout", "icon/16/apps/utilities-terminal.png");
      page1.setLayout(new qx.ui.layout.VBox());
      page1.add(new qx.ui.basic.Label("Layout-Settings"));
      tabView.add(page1);



      ////////////////// TEST PAGE 2 ////////////////////
      var page2 = new qx.ui.tabview.Page("Notes", "icon/16/apps/utilities-notes.png");
      page2.setLayout(new qx.ui.layout.VBox());
      page2.add(new qx.ui.basic.Label("Notes..."));
      tabView.add(page2);


      ////////////////// TEST PAGE 3 ////////////////////
      var page3 = new qx.ui.tabview.Page("Calculator", "icon/16/apps/utilities-calculator.png");
      page3.setLayout(new qx.ui.layout.VBox());
      page3.add(new qx.ui.basic.Label("Calculator..."));
      tabView.add(page3);


      ////////////////// TEST PAGE 4 ////////////////////
      var page4 = new qx.ui.tabview.Page("Help", "icon/16/apps/utilities-help.png");
      page4.setLayout(new qx.ui.layout.VBox());
      page4.add(new qx.ui.basic.Label("Help..."));
      tabView.add(page4);


      return tabView;
    },


    getTabView2 : function()
    {
      var tabView = new qx.ui.tabview.TabView();
      tabView.setWidth(500);

      for (var i=1; i<=20; i++)
      {
        var page = new qx.ui.tabview.Page("Page #" + i, "icon/16/apps/utilities-terminal.png");
        page.setLayout(new qx.ui.layout.VBox());
        page.setShowCloseButton(true);
        page.add(new qx.ui.basic.Label("Page #" + i + " with close button."));
        tabView.add(page);
      }
      return tabView;
    },


    getTabView3 : function()
    {
      var tabView = new qx.ui.tabview.TabView();
      tabView.setWidth(500);
      tabView.setHeight(300);

      for (var i=1; i<=3; i++)
      {
        var page = new qx.ui.tabview.Page("Page #" + i, "icon/16/apps/utilities-terminal.png");
        page.setLayout(new qx.ui.layout.VBox(4));
        tabView.add(page);
        page.add(new qx.ui.basic.Label("Page #" + i));
    if (i == 3)
    {
      page.setEnabled(false);
    }
      }

      var firstPage = tabView.getChildren()[0];



      // CONTROL BAR POSITION

      var barLabel = new qx.ui.basic.Label("Bar Position");

      var barTopButton = new qx.ui.form.RadioButton("top");
      var barBottomButton = new qx.ui.form.RadioButton("bottom");
      var barLeftButton = new qx.ui.form.RadioButton("left");
      var barRightButton = new qx.ui.form.RadioButton("right");

      firstPage.add(new qx.ui.core.Spacer(10, 10));
      firstPage.add(barLabel);
      firstPage.add(barTopButton);
      firstPage.add(barBottomButton);
      firstPage.add(barLeftButton);
      firstPage.add(barRightButton);

      var group = new qx.ui.form.RadioGroup(barTopButton, barBottomButton, barLeftButton, barRightButton);
      group.addListener("changeSelection", function(e){
        this.setBarPosition(e.getData()[0].getLabel());
      }, tabView);

      barLeftButton.setValue(true);


      // ADD/REMOVE BUTTONS

      var buttonAdd = new qx.ui.form.Button("Add new page");
      var buttonRemoveFirst = new qx.ui.form.Button("Remove first page");
      var buttonRemoveLast = new qx.ui.form.Button("Remove last page");

      firstPage.add(new qx.ui.core.Spacer(10, 10));
      firstPage.add(buttonAdd);
      firstPage.add(buttonRemoveFirst);
      firstPage.add(buttonRemoveLast);

      buttonAdd.addListener("execute", function(e)
      {
        var count = tabView.getChildren().length+1;
        var page = new qx.ui.tabview.Page("Page #" + count, "icon/16/apps/utilities-terminal.png");
    page.setLayout(new qx.ui.layout.VBox(4));
        page.add(new qx.ui.basic.Label("Page #" + count));
        tabView.add(page);
      });

      buttonRemoveFirst.addListener("execute", function(e)
      {
        var children = tabView.getChildren();
        if (children.length > 0) {
          tabView.remove(children[0]);
        }
      });

      buttonRemoveLast.addListener("execute", function(e)
      {
        var children = tabView.getChildren();
        if (children.length > 0) {
          tabView.remove(children[children.length-1]);
        }
      });

      return tabView;
    }

  }
});

