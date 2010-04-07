// (c) 2010 CodePlex Foundation
(function(){var b="ExtendedCascadingDropDown";function a(){var g="populated",f="populating",e="selectionChanged",b="",c=true,d="change",a=null;Type.registerNamespace("Sys.Extended.UI");Sys.Extended.UI.CascadingDropDownSelectionChangedEventArgs=function(b,a){Sys.Extended.UI.CascadingDropDownSelectionChangedEventArgs.initializeBase(this);this._oldValue=b;this._newValue=a};Sys.Extended.UI.CascadingDropDownSelectionChangedEventArgs.prototype={get_oldValue:function(){return this._oldValue},get_newValue:function(){return this._newValue}};Sys.Extended.UI.CascadingDropDownSelectionChangedEventArgs.registerClass("Sys.Extended.UI.CascadingDropDownSelectionChangedEventArgs",Sys.EventArgs);Sys.Extended.UI.CascadingDropDownBehavior=function(c){var b=this;Sys.Extended.UI.CascadingDropDownBehavior.initializeBase(b,[c]);b._parentControlID=a;b._category=a;b._promptText=a;b._loadingText=a;b._promptValue=a;b._emptyValue=a;b._emptyText=a;b._servicePath=location.pathname;b._serviceMethod=a;b._contextKey=a;b._useContextKey=false;b._parentElement=a;b._changeHandler=a;b._parentChangeHandler=a;b._lastParentValues=a;b._selectedValue=a};Sys.Extended.UI.CascadingDropDownBehavior.prototype={initialize:function(){var b=this;Sys.Extended.UI.CascadingDropDownBehavior.callBaseMethod(b,"initialize");$common.prepareHiddenElementForATDeviceUpdate();var e=b.get_element();b._clearItems();e.CascadingDropDownCategory=b._category;b._changeHandler=Function.createDelegate(b,b._onChange);$addHandler(e,d,b._changeHandler);if(b._parentControlID){b._parentElement=$get(b._parentControlID);!b._parentElement&&Sys.Debug.fail(String.format(Sys.Extended.UI.Resources.CascadingDropDown_NoParentElement,b._parentControlID));if(b._parentElement){e.CascadingDropDownParentControlID=b._parentControlID;b._parentChangeHandler=Function.createDelegate(b,b._onParentChange);$addHandler(b._parentElement,d,b._parentChangeHandler);if(!b._parentElement.childDropDown)b._parentElement.childDropDown=[];b._parentElement.childDropDown.push(b)}}b._onParentChange(a,c)},dispose:function(){var b=this,c=b.get_element();if(b._changeHandler){$removeHandler(c,d,b._changeHandler);b._changeHandler=a}if(b._parentChangeHandler){b._parentElement&&$removeHandler(b._parentElement,d,b._parentChangeHandler);b._parentChangeHandler=a}Sys.Extended.UI.CascadingDropDownBehavior.callBaseMethod(b,"dispose")},_clearItems:function(){var a=this.get_element();while(0<a.options.length)a.remove(0)},_isPopulated:function(){var a=this.get_element().options.length;return this._promptText?a>1:a>0},_setOptions:function(g,s,k){var e=this;if(!e.get_isInitialized())return;var f=e.get_element();e._clearItems();var l,n=b;if(k&&e._loadingText){l=e._loadingText;if(e._selectedValue)n=e._selectedValue}else if(!k&&g&&0==g.length&&a!=e._emptyText){l=e._emptyText;if(e._emptyValue)n=e._emptyValue}else if(e._promptText){l=e._promptText;if(e._promptValue)n=e._promptValue}if(l){var m=new Option(l,n);f.options[f.options.length]=m}var h=a,j=-1;if(g){for(i=0;i<g.length;i++){var o=g[i],t=o.name,q=o.value,p=o.optionTitle;if(o.isDefaultValue){j=i;if(e._promptText)j++}var m=new Option(t,q);if(q==e._selectedValue)h=m;p&&m.setAttribute("title",p);f.options[f.options.length]=m}if(h)h.selected=c}if(h)e.set_SelectedValue(f.options[f.selectedIndex].value,f.options[f.selectedIndex].text);else if(!h&&j!=-1){f.options[j].selected=c;e.set_SelectedValue(f.options[j].value,f.options[j].text)}else if(!s&&!h&&!k&&!e._promptText&&f.options.length>0)e.set_SelectedValue(f.options[0].value,f.options[0].text);else!s&&!h&&!k&&e.set_SelectedValue(b,b);if(f.childDropDown&&!k)for(i=0;i<f.childDropDown.length;i++)f.childDropDown[i]._onParentChange();else if(g&&Sys.Browser.agent!==Sys.Browser.Safari&&Sys.Browser.agent!==Sys.Browser.Opera)if(document.createEvent){var r=document.createEvent("HTMLEvents");r.initEvent(d,c,false);e.get_element().dispatchEvent(r)}else document.createEventObject&&e.get_element().fireEvent("onchange");if(e._loadingText||e._promptText||e._emptyText)f.disabled=!g||0==g.length;e.raisePopulated(Sys.EventArgs.Empty)},_onChange:function(){var c=this;if(!c._isPopulated())return;var a=c.get_element();if(-1!=a.selectedIndex&&!(c._promptText&&0==a.selectedIndex))c.set_SelectedValue(a.options[a.selectedIndex].value,a.options[a.selectedIndex].text,a.options[a.selectedIndex].title);else c.set_SelectedValue(b,b)},_onParentChange:function(l,j){var d=this,m=d.get_element(),e=b,g=d._parentControlID;while(g){var f=$get(g);if(f&&-1!=f.selectedIndex){var h=f.options[f.selectedIndex].value;if(h&&h!=b){e=f.CascadingDropDownCategory+":"+h+";"+e;g=f.CascadingDropDownParentControlID;continue}}break}if(e!=b&&d._lastParentValues==e)return;d._lastParentValues=e;if(e==b&&d._parentControlID){d._setOptions(a,j);return}d._setOptions(a,j,c);if(d._servicePath&&d._serviceMethod){var i=new Sys.CancelEventArgs;d.raisePopulating(i);if(i.get_cancel())return;var k={knownCategoryValues:e,category:d._category};if(d._useContextKey)k.contextKey=d._contextKey;Sys.Net.WebServiceProxy.invoke(d._servicePath,d._serviceMethod,false,k,Function.createDelegate(d,d._onMethodComplete),Function.createDelegate(d,d._onMethodError));$common.updateFormToRefreshATDeviceBuffer()}},_onMethodComplete:function(a){this._setOptions(a)},_onMethodError:function(b){var a=this;if(b.get_timedOut())a._setOptions([a._makeNameValueObject(Sys.Extended.UI.Resources.CascadingDropDown_MethodTimeout)]);else a._setOptions([a._makeNameValueObject(String.format(Sys.Extended.UI.Resources.CascadingDropDown_MethodError,b.get_statusCode()))])},_makeNameValueObject:function(a){return{name:a,value:a}},get_ParentControlID:function(){return this._parentControlID},set_ParentControlID:function(a){if(this._parentControlID!=a){this._parentControlID=a;this.raisePropertyChanged("ParentControlID")}},get_Category:function(){return this._category},set_Category:function(a){if(this._category!=a){this._category=a;this.raisePropertyChanged("Category")}},get_PromptText:function(){return this._promptText},set_PromptText:function(a){if(this._promptText!=a){this._promptText=a;this.raisePropertyChanged("PromptText")}},get_PromptValue:function(){return this._promptValue},set_PromptValue:function(a){if(this._promptValue!=a){this._promptValue=a;this.raisePropertyChanged("PromptValue")}},get_EmptyText:function(){return this._emptyText},set_EmptyText:function(a){if(this._emptyText!=a){this._emptyText=a;this.raisePropertyChanged("EmptyText")}},get_EmptyValue:function(){return this._emptyValue},set_EmptyValue:function(a){if(this._emptyValue!=a){this._emptyValue=a;this.raisePropertyChanged("EmptyValue")}},get_LoadingText:function(){return this._loadingText},set_LoadingText:function(a){if(this._loadingText!=a){this._loadingText=a;this.raisePropertyChanged("LoadingText")}},get_SelectedValue:function(){return this._selectedValue},set_SelectedValue:function(d,e,g){var a=":::",c=this;if(c._selectedValue!=d){if(!e){var f=d.indexOf(a);if(-1!=f){e=d.slice(f+3);d=d.slice(0,f);f=e.indexOf(a);if(-1!=f){g=e.slice(f+3);e=e.slice(0,f)}}}var h=c._selectedValue;c._selectedValue=d;c.raisePropertyChanged("SelectedValue");c.raiseSelectionChanged(new Sys.Extended.UI.CascadingDropDownSelectionChangedEventArgs(h,d))}Sys.Extended.UI.CascadingDropDownBehavior.callBaseMethod(c,"set_ClientState",[c._selectedValue+a+e+a+(g?a+g:b)])},get_ServicePath:function(){return this._servicePath},set_ServicePath:function(a){if(this._servicePath!=a){this._servicePath=a;this.raisePropertyChanged("ServicePath")}},get_ServiceMethod:function(){return this._serviceMethod},set_ServiceMethod:function(a){if(this._serviceMethod!=a){this._serviceMethod=a;this.raisePropertyChanged("ServiceMethod")}},get_contextKey:function(){return this._contextKey},set_contextKey:function(b){var a=this;if(a._contextKey!=b){a._contextKey=b;a.set_useContextKey(c);a.raisePropertyChanged("contextKey")}},get_useContextKey:function(){return this._useContextKey},set_useContextKey:function(a){if(this._useContextKey!=a){this._useContextKey=a;this.raisePropertyChanged("useContextKey")}},add_selectionChanged:function(a){this.get_events().addHandler(e,a)},remove_selectionChanged:function(a){this.get_events().removeHandler(e,a)},raiseSelectionChanged:function(b){var a=this.get_events().getHandler(e);a&&a(this,b)},add_populating:function(a){this.get_events().addHandler(f,a)},remove_populating:function(a){this.get_events().removeHandler(f,a)},raisePopulating:function(b){var a=this.get_events().getHandler(f);a&&a(this,b)},add_populated:function(a){this.get_events().addHandler(g,a)},remove_populated:function(a){this.get_events().removeHandler(g,a)},raisePopulated:function(b){var a=this.get_events().getHandler(g);a&&a(this,b)}};Sys.Extended.UI.CascadingDropDownBehavior.registerClass("Sys.Extended.UI.CascadingDropDownBehavior",Sys.Extended.UI.BehaviorBase);Sys.registerComponent(Sys.Extended.UI.CascadingDropDownBehavior,{name:"cascadingDropDown"})}if(window.Sys&&Sys.loader)Sys.loader.registerScript(b,["ExtendedBase","ExtendedCommon","WebServices"],a);else a()})();