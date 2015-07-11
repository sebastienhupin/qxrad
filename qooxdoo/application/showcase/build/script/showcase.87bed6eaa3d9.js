qx.$$packageData['8']={"locales":{},"resources":{},"translations":{"cs":{},"de":{},"de_AT":{},"de_DE":{},"en":{},"en_GB":{},"en_US":{},"es":{},"es_ES":{},"es_MX":{},"pt":{},"ro":{},"ro_RO":{},"sv":{},"sv_SE":{}}};
qx.Part.$$notifyLoad("8", function() {
(function(){var a="perspective(600) rotateY(90deg)",b="perspective(600) rotateY(0deg)",c="perspective(600) rotateY(180deg)",d="",f="-webkit-transform 0.3s ease-in",g="#525252",h="perspective(600) rotateY(360deg)",i="WebkitTransition",j="-webkit-transform 0.3s ease-out",k="perspective(600) rotateY(270deg)",l="showcase/theme/affe.png",m="showcase.page.theme.Content",n="Calculator",o="webkitTransitionEnd",p="dbltap";qx.Class.define(m,{extend:showcase.AbstractContent,construct:function(q){showcase.AbstractContent.call(this,q);this.setView(this._createView());},members:{_createView:function(){var t=new qx.ui.window.Desktop(new qx.ui.window.Manager());var s=new showcase.page.theme.calc.view.Calculator(true);t.add(s);s.moveTo(60,40);s.open();var r=new showcase.page.theme.calc.Model();new showcase.page.theme.calc.Presenter(s,r);s=new showcase.page.theme.calc.view.Calculator(false);t.add(s);s.moveTo(340,40);s.open();r=new showcase.page.theme.calc.Model();new showcase.page.theme.calc.Presenter(s,r);this.__uT(s);return t;},__uT:function(v){if(!(i in document.documentElement.style)){return;};var w=true;var u=new qx.ui.basic.Image(l).set({backgroundColor:g,padding:[65,0,0,10]});v.addListener(p,function(e){var x=v.getContentElement().getDomElement();x.style.WebkitTransition=f;if(w){x.style.WebkitTransform=a;}else {x.style.WebkitTransform=k;};x.addEventListener(o,function(){x.removeEventListener(o,arguments.callee,false);if(w){var y=v.getChildrenContainer().getBounds();u.setUserBounds(0,0,y.width,y.height);v.add(u);v.setCaption(d);}else {v.remove(u);v.setCaption(n);};qx.ui.core.queue.Manager.flush();x.style.WebkitTransition=j;if(w){x.style.WebkitTransform=c;}else {x.style.WebkitTransform=h;x.addEventListener(o,function(){x.removeEventListener(o,arguments.callee,false);x.style.WebkitTransition=d;x.style.WebkitTransform=b;},false);};w=!w;},false);});}}});})();(function(){var a="String",b="Boolean",c="showcase.page.theme.calc.view.ICalculator",d="qx.event.type.Data";qx.Interface.define(c,{events:{"buttonPress":d},properties:{display:{},memory:{check:b},operation:{check:a}}});})();(function(){var a="-",b="operation",c="Boolean",d="+",f="C",g="5",h="7",i="keydown",j="M+",k="memory",l="button",m="3",n="qx.event.type.Data",o="MC",p="0",q="modern-calculator",r="showcase.page.theme.calc.view.Calculator",s="2",t="changeOperation",u="execute",v="calculator",w="/",x="MR",y="String",z="&divide;",A="*",B="",C="_buttons",D="6",E="4",F="Calculator",G="1",H="buttonPress",I="keyup",J="changeDisplay",K="M-",L="8",M="keypress",N="Enter",O="=",P="changeMemory",Q="_keyIdentifier",R="&plusmn;",S=".",T="9",U="display";qx.Class.define(r,{extend:qx.ui.window.Window,implement:[showcase.page.theme.calc.view.ICalculator],construct:function(V){qx.ui.window.Window.call(this,F);this._isModern=!!V;if(this._isModern){this.setAppearance(q);};this.set({showMinimize:false,showMaximize:false,allowMaximize:false,showClose:false});this.setLayout(new qx.ui.layout.VBox());this._initButtons();this.add(this.getChildControl(U));this.add(this._createButtonContainer(),{flex:1});this._initKeyIdentifier();this.addListener(i,this._onKeyDown,this);this.addListener(I,this._onKeyUp,this);this.addListener(M,this._onKeyPress,this);},events:{"buttonPress":n},properties:{appearance:{refine:true,init:v},display:{init:p,event:J},memory:{check:c,init:false,event:P},operation:{check:y,init:B,event:t}},members:{_buttons:null,_keyIdentifier:null,_pressedButton:null,_initButtons:function(){this._buttons={"MC":new showcase.page.theme.calc.view.Button(o,0,0),"M+":new showcase.page.theme.calc.view.Button(j,0,1),"M-":new showcase.page.theme.calc.view.Button(K,0,2),"MR":new showcase.page.theme.calc.view.Button(x,0,3),"C":new showcase.page.theme.calc.view.Button(f,1,0),"sign":new showcase.page.theme.calc.view.Button(R,1,1),"/":new showcase.page.theme.calc.view.Button(z,1,2,null,null,w),"*":new showcase.page.theme.calc.view.Button(A,1,3,null,null,A),"7":new showcase.page.theme.calc.view.Button(h,2,0,null,null,h),"8":new showcase.page.theme.calc.view.Button(L,2,1,null,null,L),"9":new showcase.page.theme.calc.view.Button(T,2,2,null,null,T),"-":new showcase.page.theme.calc.view.Button(a,2,3,null,null,a),"4":new showcase.page.theme.calc.view.Button(E,3,0,null,null,E),"5":new showcase.page.theme.calc.view.Button(g,3,1,null,null,g),"6":new showcase.page.theme.calc.view.Button(D,3,2,null,null,D),"+":new showcase.page.theme.calc.view.Button(d,3,3,null,null,d),"1":new showcase.page.theme.calc.view.Button(G,4,0,null,null,G),"2":new showcase.page.theme.calc.view.Button(s,4,1,null,null,s),"3":new showcase.page.theme.calc.view.Button(m,4,2,null,null,m),"=":new showcase.page.theme.calc.view.Button(O,4,3,2,null,N),"0":new showcase.page.theme.calc.view.Button(p,5,0,null,2,p),".":new showcase.page.theme.calc.view.Button(S,5,2,null,null,S)};if(this._isModern){for(var W in this._buttons){this._buttons[W].setAppearance(l);};};},_initKeyIdentifier:function(){this._keyIdentifier=[];for(var name in this._buttons){var X=this._buttons[name];var Y=X.getKeyIdentifier();X.addListener(u,this._onButtonExecute,this);if(Y){this._keyIdentifier[Y]=X;};};},_createChildControlImpl:function(ba){if(ba===U){var bb=new showcase.page.theme.calc.view.Display();this.bind(U,bb,U);this.bind(k,bb,k);this.bind(b,bb,b);return bb;}else {return qx.ui.window.Window.prototype._createChildControlImpl.call(this,ba);};},_createButtonContainer:function(){var be=new qx.ui.container.Composite();var bc=new qx.ui.layout.Grid(5,5);be.setLayout(bc);for(var bd=0;bd<6;bd++ ){bc.setRowFlex(bd,1);};for(var bf=0;bf<6;bf++ ){bc.setColumnFlex(bf,1);};for(var name in this._buttons){be.add(this._buttons[name]);};return be;},_onButtonExecute:function(e){var name=qx.lang.Object.getKeyFromValue(this._buttons,e.getTarget());this.fireDataEvent(H,name);},_onKeyDown:function(e){var bg=this._keyIdentifier[e.getKeyIdentifier()];if(!bg){return;};bg.press();if(this._pressedButton&&this._pressedButton!==bg){this._pressedButton.release();};this._pressedButton=bg;e.stop();},_onKeyUp:function(e){var bh=this._keyIdentifier[e.getKeyIdentifier()];if(!bh){return;};bh.release();e.stop();},_onKeyPress:function(e){var bi=this._keyIdentifier[e.getKeyIdentifier()];if(!bi){return;};bi.execute();e.stop();}},destruct:function(){this._disposeMap(C);this._disposeArray(Q);}});})();(function(){var a="calculator-button",b="showcase.page.theme.calc.view.Button";qx.Class.define(b,{extend:qx.ui.form.Button,construct:function(g,h,e,d,f,c){qx.ui.form.Button.call(this,g);this.set({rich:true,focusable:false,keepActive:true,allowShrinkX:false,allowShrinkY:false});this.setLayoutProperties({row:h,column:e,rowSpan:d||1,colSpan:f||1});this._keyIdentifier=c||null;},properties:{appearance:{refine:true,init:a}},members:{getKeyIdentifier:function(){return this._keyIdentifier;}}});})();(function(){var a="M",b="operation",c="0",d="Boolean",e="",f="showcase.page.theme.calc.view.Display",g="label",h="_applyOperation",i="_applyDisplay",j="_applyMemory",k="memory",l="String",m="display";qx.Class.define(f,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.Canvas());this._add(this.getChildControl(g),{top:0,right:0});this._add(this.getChildControl(k),{bottom:0,left:0});this._add(this.getChildControl(b),{bottom:0,left:0});},properties:{appearance:{refine:true,init:m},display:{init:c,apply:i},memory:{check:d,init:false,apply:j},operation:{check:l,init:e,apply:h}},members:{_createChildControlImpl:function(o){var n;switch(o){case g:n=new qx.ui.basic.Label(this.getDisplay());break;case k:n=new qx.ui.basic.Label(a);n.exclude();break;case b:n=new qx.ui.basic.Label(this.getOperation());n.setRich(true);break;};return n||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,o);},_applyDisplay:function(q,p){this.getChildControl(g).setValue(q.toString());},_applyMemory:function(s,r){if(s){this._showChildControl(k);}else {this._excludeChildControl(k);};},_applyOperation:function(u,t){this.getChildControl(b).setValue(u.toString());}}});})();(function(){var a="-",b="waitForNumber",c="C",d="showcase.page.theme.calc.Model",e="changeValue",f="M+",g="changeInput",h="Integer",i="MC",j="0",k="error",l="sign",m="Division by zero!",n="+",o="_applyState",p="changeState",q="/",r="String",s="*",t="",u="number",v="MR",w="changeOperator",x="M-",y="changeErrorMessage",z="Number",A="=",B="changeMemory",C="changeOperant",D=".";qx.Class.define(d,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.initState();},properties:{state:{check:[u,b,k],event:p,init:u,apply:o},errorMessage:{check:r,init:t,event:y},input:{check:r,nullable:true,event:g},maxInputLength:{check:h,init:20},operator:{check:[n,a,s,q],nullable:true,event:w},operant:{check:z,nullable:true,event:C},value:{check:z,nullable:true,event:e},memory:{check:z,nullable:true,event:B}},members:{readToken:function(E){if(E.match(/^[0123456789]$/)){this.__uW(E);}else if(E.match(/^[\+\-\*\/]$/)){this.__va(E);}else if(E==l){this.__uX();}else if(E==D){this.__uY();}else if(E==A){this.__vb();}else if(E==c){this.__vc();}else if(E==f){this.__vd(E);}else if(E==x){this.__vd(E);}else if(E==i){this.__vf();}else if(E==v){this.__ve();};},__uU:function(){return parseFloat(this.getInput());},__uV:function(G,H,F){switch(F){case n:return G+H;case a:return G-H;case s:return G*H;case q:if(H==0){this.setErrorMessage(m);this.setState(k);return null;}else {return G/H;};};},_applyState:function(J,I){if(J==u){this.setInput(j);}else if(J==k){this.setOperator(null);};},__uW:function(L){this.setState(u);var K=this.getInput();if(K.length>=this.getMaxInputLength()-1){return;};if(L==j){if(K!==j){K+=j;};}else {if(K==j){K=L;}else {K+=L;};};this.setInput(K);},__uX:function(){this.setState(u);var M=this.getInput();if(M==j){return;};var N=M.charAt(0)==a;if(N){M=M.substr(1);}else {M=a+M;};this.setInput(M);},__uY:function(){this.setState(u);var O=this.getInput();if(O.length>=this.getMaxInputLength()-1){return;};var P=O.indexOf(D)!==-1;if(!P){O+=D;};this.setInput(O);},__va:function(Q){var S=this.getState();if(S==k){return;}else if(S==b){this.setOperator(Q);return;};this.setState(b);var R=this.__uU();var T=this.getValue();if(T!==null){this.setValue(this.__uV(T,R,this.getOperator()));}else {this.setValue(R);};this.setOperant(R);this.setOperator(Q);},__vb:function(){var U=this.getOperator();if(!U){return;};var W=this.getValue();if(this.getState()==b){this.setValue(this.__uV(W,this.getOperant(),U));return;};this.setState(b);var V=this.__uU();this.setOperant(V);this.setValue(this.__uV(W,V,U));},__vc:function(){this.setState(u);this.setOperator(null);this.setValue(null);this.setInput(j);},__vd:function(X){var Y=this.getState();var ba;if(Y==k){return;}else if(Y==b){ba=this.getValue();}else {ba=this.__uU();};var bb=this.getMemory()||0;if(X==f){this.setMemory(bb+ba);}else {this.setMemory(bb-ba);};},__ve:function(){var bc=this.getMemory();if(bc==null){return;};this.setState(u);this.setInput(bc.toString());},__vf:function(){this.setMemory(null);}}});})();(function(){var a="operation",b="waitForNumber",c="changeErrorMessage",d="",f="The view and model cannot be changed!",g="number",h="showcase.page.theme.calc.view.ICalculator",i="_applyViewModel",j="changeValue",k="showcase.page.theme.calc.Presenter",l="changeState",m="changeInput",n="buttonPress",o="memory",p="operator",q="error";qx.Class.define(k,{extend:qx.core.Object,construct:function(s,r){qx.core.Object.call(this);this.setView(s);this.setModel(r);},properties:{view:{check:h,apply:i},model:{apply:i,init:null}},members:{MAX_DISPLAY_SIZE:16,_applyViewModel:function(v,u){if(u){throw new Error(f);};var t=this.getModel();var w=this.getView();if(!t||!w){return;};this.__vg();this.__vh();},__vg:function(){this.getView().addListener(n,this._onButtonPress,this);},_onButtonPress:function(e){this.getModel().readToken(e.getData());},__vh:function(){var x=this.getModel();x.setMaxInputLength(this.MAX_DISPLAY_SIZE);var y=this.getView();x.bind(p,y,a,{converter:function(z){return z?z:d;}});x.bind(o,y,o,{converter:function(A){return A===null?false:true;}});x.addListener(l,this._updateDisplay,this);x.addListener(m,this._updateDisplay,this);x.addListener(j,this._updateDisplay,this);x.addListener(c,this._updateDisplay,this);},_updateDisplay:function(e){var B;var C=this.getModel();switch(this.getModel().getState()){case g:B=C.getInput();break;case b:B=C.getValue()+d;if(B.length>this.MAX_DISPLAY_SIZE){B=C.getValue().toExponential(this.MAX_DISPLAY_SIZE-7);};break;case q:B=C.getErrorMessage();break;};this.getView().setDisplay(B||d);}}});})();
});