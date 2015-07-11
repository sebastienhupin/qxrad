qx.Class.define("qxrad.plugin.designer.ui.control.FontSelector", {
  extend : qx.ui.core.Widget,
  include : [ qx.ui.core.MLayoutHandling, qx.ui.core.MChildrenHandling ],
  construct : function () {
	  this.base(arguments);
	  this.init();
  },
  properties : {
  	value : {
  		check : "Font",
  		init : null,
  		event : "changeValue"
  	}
  },
  members : {
  	__font : null,
  	__famillyEntries : null,
  	__boldCheckBox : null,
  	__italicCheckBox : null,
  	__decorationsList : null,
  	__familyList : null,
  	__lineHeightList : null,
  	__lineHeightSlider : null,
  	__sizeList : null,
  	__sizeSlider : null,  	
  	__previewLabel : null,

  	__createUI : function () {
    	var Dock_3334 = new qx.ui.layout.Dock();
    	this.setLayout(Dock_3334);
    	var ToolBar_3459 = new qx.ui.toolbar.ToolBar();
    	ToolBar_3459.setLayoutProperties({"left":60,"top":349,"edge":"north"});
    	var CheckBox_bold = this.__boldCheckBox = new qx.ui.toolbar.CheckBox();
    	CheckBox_bold.set({
    		label:"Bold"
    	});
    	CheckBox_bold.setLayoutProperties({"left":26,"top":30});
    	ToolBar_3459.add(CheckBox_bold);
    	var CheckBox_italic = this.__italicCheckBox = new qx.ui.toolbar.CheckBox();
    	CheckBox_italic.set({
    		label:"Italic"
    	});
    	CheckBox_italic.setLayoutProperties({"left":151,"top":18});
    	ToolBar_3459.add(CheckBox_italic);
    	var SelectBox_decorations = this.__decorationsList = new qx.ui.form.SelectBox();
    	SelectBox_decorations.setLayoutProperties({"left":106,"top":17});
    	
    	ToolBar_3459.add(SelectBox_decorations);
    	this.add(ToolBar_3459);
    	var Label_preview = this.__previewLabel = new qx.ui.basic.Label();
    	Label_preview.set({
    		value:"Preview",
    		allowGrowX:true,
    		textAlign:"center",
    		height:100,
    		paddingTop:23,
    		textColor:"#000000",
    		backgroundColor:"#FFFFFF"
    	});
    	Label_preview.setLayoutProperties({"left":64,"top":442,"edge":"south"});
    	this.add(Label_preview);
      var GroupBox_family = new qx.ui.groupbox.GroupBox("Font name");
      var VBox_7906 = new qx.ui.layout.VBox();
      GroupBox_family.setLayout(VBox_7906);
      GroupBox_family.setLayoutProperties({"left":77,"top":117,"edge":"west","width":"33%"});
      var List_familly = this.__familyList = new qx.ui.form.List();
      List_familly.set({
        allowGrowY:true,
        allowShrinkY:true
      });
      List_familly.setLayoutProperties({"flex":1});
      GroupBox_family.add(List_familly);
      this.add(GroupBox_family);
      var GroupBox_lineheight = new qx.ui.groupbox.GroupBox("Line Height");
      GroupBox_lineheight.set({
      	enabled:false
      });
      var HBox_7560 = new qx.ui.layout.HBox();
      GroupBox_lineheight.setLayout(HBox_7560);
      GroupBox_lineheight.setLayoutProperties({"left":464,"top":191,"edge":"center","width":"33%"});
      var List_lineheight = this.__lineHeightList = new qx.ui.form.List();
      List_lineheight.set({
        allowShrinkX:true,
        allowGrowX:true,
    		scrollbarX:"off",
    		scrollbarY:"off"        
      });
      List_lineheight.setLayoutProperties({"flex":1});
      GroupBox_lineheight.add(List_lineheight);
      var Slider_lineheight = this.__lineHeightSlider = new qx.ui.form.Slider();
      Slider_lineheight.set({
        orientation:"vertical"
      });
      Slider_lineheight.setLayoutProperties({"left":147,"top":204});
      GroupBox_lineheight.add(Slider_lineheight);
      this.add(GroupBox_lineheight);
      var GroupBox_size = new qx.ui.groupbox.GroupBox("Size");
      var HBox_8518 = new qx.ui.layout.HBox();
      GroupBox_size.setLayout(HBox_8518);
      GroupBox_size.setLayoutProperties({"left":287,"top":513,"edge":"east","width":"33%"});
      var List_size = this.__sizeList = new qx.ui.form.List();
      List_size.set({
        allowShrinkX:true,
        allowGrowX:true,
    		scrollbarX:"off",
    		scrollbarY:"off"        
      });      
      List_size.setLayoutProperties({"flex":1});
      GroupBox_size.add(List_size);
      var Slider_size = this.__sizeSlider = new qx.ui.form.Slider();
      Slider_size.set({
        orientation:"vertical"
      });
      Slider_size.setLayoutProperties({"left":142,"top":249});
      GroupBox_size.add(Slider_size);
      this.add(GroupBox_size);


    },
    __loadFamilyList : function () {
      var entries = new qx.data.Array(["Candara","Tahoma","Lucida Grande","Segoe UI", 
                     "Arial","Arial Black",  "Liberation Sans",
                     "sans-serif", "Verdana", "Times New Roman",
                     "Courier", "Courier New", "Georgia", "Monaco",
                     "Impact", "Comic Sans MS", "Lucida Console", 
                     "Consolas", "DejaVu Sans Mono", "monospace", 
                     "Bitstream Vera Sans"]);
      return entries;
      
    },
    __loadLineHeightList : function () {
    	var values = new qx.data.Array();
    	for (var i=1;i<=100;i++) {
    		values.push(i);
    	}    	
    	return values;
    },
    __loadDecorationList : function () {
    	return new qx.data.Array([null,"Underline","Line-through","Overline"])
    },
    __loadSizeList : function () {    	
    	var values = new qx.data.Array();
    	for (var i=1;i<=100;i++) {
    		values.push(i);
    	}    	
    	return values;
    },
    __bindWidget : function () {
    	// Init controllers.
    	var controller1 = new qx.data.controller.List(this.__loadFamilyList(), this.__familyList);
    	var controller2 = new qx.data.controller.List(this.__loadLineHeightList(), this.__lineHeightList);
    	var controller3 = new qx.data.controller.List(this.__loadSizeList(), this.__sizeList);
    	var controller4 = new qx.data.controller.List(this.__loadDecorationList(), this.__decorationsList);    	
    	    	
    	var familylist = this.__familyList.getSelectables(true);
    	for (var i=0,l=familylist.length;i<l;i++) {
    		var item = familylist[i];
    		item.setFont(qx.bom.Font.fromString("12px " + "'" + item.getLabel() + "'"));
    	}
    	
    	// Set the maximum of the slider.
    	this.__sizeSlider.setMaximum(this.__sizeList.getSelectables(true).length-1);    	
    	
    },
    __fontToString : function (font) {
    	var fontString = [];
    	if (font.getSize()) {
    		fontString.push(font.getSize() + "px");
    	}
    	    	
    	if (font.getFamily().length>0) {
    		fontString.push(font.getFamily()[0]);
    	}
    	
    	if (font.getBold()) {
    		fontString.push("bold");
    	}
    	
    	if (font.getItalic()) {
    		fontString.push("italic");
    	}
    	
    	if (font.getDecoration() != "") {
    		fontString.push(font.getDecoration());
    	}
    	return qx.lang.String.clean(fontString.join(" "));
    },    
    __converterFont : function (name,value) {
    	
    	var font = this.getValue().clone();

    	switch(name) {
	    	case "bold" :
	    		font.setBold(value);
	    		break;
	    	case "italic" :
	    		font.setItalic(value);
	    		break;
	    	case "decoration" :
	    		font.setDecoration(value);
	    		break;
	    	case "size" :
	    		font.setSize(value);
	    		break;	    		
	    	case "family" :
	    		font.setFamily([value]);
	    		break;
    	}

    	this.debug("convert font : " + this.__fontToString(font));
    	return font;
    },

    init : function () {
    	this.setValue(qx.theme.manager.Font.getInstance().resolve("default"));
	    this.__createUI();
	    this.__bindWidget();
    }
  }
});
