/**
 * @license
 * Copyright (c) 2018 amCharts (Antanas Marcelionis, Martynas Majeris)
 *
 * This sofware is provided under multiple licenses. Please see below for
 * links to appropriate usage.
 *
 * Free amCharts linkware license. Details and conditions:
 * https://github.com/amcharts/amcharts4/blob/master/LICENSE
 *
 * One of the amCharts commercial licenses. Details and pricing:
 * https://www.amcharts.com/online-store/
 * https://www.amcharts.com/online-store/licenses-explained/
 *
 * If in doubt, contact amCharts at contact@amcharts.com
 *
 * PLEASE DO NOT REMOVE THIS COPYRIGHT NOTICE.
 * @hidden
 */
am4internal_webpackJsonp(["e6eb"],{FT2X:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={};i.d(n,"RangeSelector",function(){return m}),i.d(n,"DateAxisRangeSelector",function(){return g});var s=i("m4/l"),a=i("/IEW"),r=i("aCit"),o=i("hD5A"),p=i("P/bD"),l=i("58Sn"),h=new(i("+qIf").a),m=function(e){function t(){var t=e.call(this)||this;return t._language=new o.d,t._classPrefix="amcharts-range-selector",t._defaultStyles=!0,t._elements={},t._position="bottom",t._tabindex=0,t.className="RangeSelector",t._disposers.push(t._language),t.invalidate(),t.applyTheme(),t}return Object(s.c)(t,e),t.prototype.validate=function(){this.draw(),e.prototype.validate.call(this)},t.prototype.draw=function(){this.defaultStyles&&this.loadDefaultCSS(),this._elements.wrapper||(this._elements.wrapper=document.createElement("div"),this._elements.wrapper.className=this.classPrefix+"-wrapper "+this.classPrefix+"-"+this.position,this.container.appendChild(this._elements.wrapper))},t.prototype.dispose=function(){this._disposed||(e.prototype.dispose.call(this),this._element&&this._element.parentNode&&this._element.parentNode.removeChild(this._element),this._elements.wrapper&&this._elements.wrapper.parentNode&&this._elements.wrapper.parentNode.removeChild(this._elements.wrapper))},Object.defineProperty(t.prototype,"container",{get:function(){return this._container},set:function(e){this._container=e,this.invalidate()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"position",{get:function(){return this._position},set:function(e){if(this._position!=e){var t=this._position;this._position=e,this.dispatchImmediately("positionset",{type:"positionset",position:e,prevPosition:t}),this.invalidate()}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"defaultStyles",{get:function(){return this._defaultStyles},set:function(e){this._defaultStyles!=e&&(this._defaultStyles=e,e&&this.loadDefaultCSS()),this.invalidate()},enumerable:!0,configurable:!0}),t.prototype.loadDefaultCSS=function(){this._disposers.push(function(e,t){var i=t||"amstock-dataset-selector";return h.insertKeyIfEmpty(i,function(){var t=new o.c([new l.c(e,"."+i+"-wrapper",{padding:"0.2em 1em 0 0.4em","margin-bottom":"1em"}),new l.c(e,"."+i+"-wrapper *",{"box-sizing":"border-box"}),new l.c(e,"."+i+"-wrapper input",{width:"100%","font-size":"inherit"}),new l.c(e,"."+i+"-top ."+i+"-range-wrapper, ."+i+"-bottom ."+i+"-range-wrapper",{float:"left"}),new l.c(e,"."+i+"-top ."+i+"-period-wrapper, ."+i+"-bottom ."+i+"-period-wrapper",{float:"right"}),new l.c(e,"."+i+"-top input, ."+i+"-bottom input",{margin:"0 1em 0 0.3em","max-width":"100px"}),new l.c(e,"."+i+"-top button, ."+i+"-bottom button",{margin:"0 0 0 0.4em"}),new l.c(e,"."+i+"-left ."+i+"-title, ."+i+"-right ."+i+"-title",{display:"block"}),new l.c(e,"."+i+"-left input, ."+i+"-right input",{width:"100%",margin:"0.2em 0 0.6em 0"}),new l.c(e,"."+i+"-left button, ."+i+"-right button",{width:"25%",margin:"0.2em 0.2em 0.2em 0"})]);return new o.a(function(){h.removeKey(i),t.dispose()})}).increment()}(l.s(this.container),this.classPrefix)),this._element&&(this._element.style.display="")},Object.defineProperty(t.prototype,"tabindex",{get:function(){return this._tabindex},set:function(e){this._tabindex=e,this.invalidate()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"language",{get:function(){var e=this,t=this._language.get();if(null==t){if(t=new p.a,this._axis)return this._axis.language;this._language.set(t,t.events.on("localechanged",function(t){e.invalidate()}))}return t},set:function(e){var t=this;this._language.set(e,e.events.on("localechanged",function(e){t.invalidate()})),this.invalidate()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"classPrefix",{get:function(){return this._classPrefix},set:function(e){this._classPrefix=e,this.invalidate()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"axis",{get:function(){return this._axis},set:function(e){this._axis!=e&&(this._axis=e,this.prepAxis(),this.language=e.language,this.invalidate())},enumerable:!0,configurable:!0}),t.prototype.prepAxis=function(){var e=this;this._axis&&this._disposers.push(this._axis.events.on("beforedisposed",function(t){e.dispose()}))},t}(a.a);r.c.registeredClasses.RangeSelector=m;var u=i("7XB+"),d=i("L91H"),c=i("Mtpk"),f=i("hJ5i"),g=function(e){function t(){var t=e.call(this)||this;return t._elements={periodButtons:[]},t._inputDateFormat="yyyy-MM-dd",t.zoomDelay=500,t.className="DateAxisRangeSelector",t._disposers.push(t._language),t.invalidate(),t.applyTheme(),t}return Object(s.c)(t,e),t.prototype.validate=function(){this.draw(),e.prototype.validate.call(this)},t.prototype.prepAxis=function(){var t=this;e.prototype.prepAxis.call(this),this._disposers.push(this.axis.events.on("selectionextremeschanged",function(e){t.updateRangeInputs()})),this._disposers.push(this.axis.events.on("extremeschanged",function(e){t.updateRangeInputs()}))},t.prototype.draw=function(){var t=this;e.prototype.draw.call(this);var i=this.tabindex;this._elements.rangeWrapper||(this._elements.rangeWrapper=document.createElement("div"),this._elements.rangeWrapper.className=this.classPrefix+"-range-wrapper",this._elements.wrapper.appendChild(this._elements.rangeWrapper)),this._elements.fromTitle||(this._elements.fromTitle=document.createElement("span"),this._elements.fromTitle.className=this.classPrefix+"-title "+this.classPrefix+"-from-title",this._elements.fromTitle.innerHTML=this.language.translateAny("From %1",void 0,""),this._elements.rangeWrapper.appendChild(this._elements.fromTitle)),this._elements.fromInput||(this._elements.fromInput=document.createElement("input"),this._elements.fromInput.type="text",this._elements.fromInput.className=this.classPrefix+"-from-input",i&&this._elements.fromInput.setAttribute("tabindex",i.toString()),this._elements.rangeWrapper.appendChild(this._elements.fromInput),this._elements.fromInput.addEventListener("keyup",function(){t.updateZoom()})),this._elements.toTitle||(this._elements.toTitle=document.createElement("span"),this._elements.toTitle.className=this.classPrefix+"-title "+this.classPrefix+"-to-title",this._elements.toTitle.innerHTML=this.language.translateAny("To %1",void 0,""),this._elements.rangeWrapper.appendChild(this._elements.toTitle)),this._elements.toInput||(this._elements.toInput=document.createElement("input"),this._elements.toInput.type="text",this._elements.toInput.className=this.classPrefix+"-to-input",i&&this._elements.toInput.setAttribute("tabindex",i.toString()),this._elements.rangeWrapper.appendChild(this._elements.toInput),this._elements.toInput.addEventListener("keyup",function(){t.updateZoom()})),this.periods.length&&(this._elements.periodWrapper||(this._elements.periodWrapper=document.createElement("div"),this._elements.periodWrapper.className=this.classPrefix+"-period-wrapper",this._elements.wrapper.appendChild(this._elements.periodWrapper),this._elements.periodTitle||(this._elements.periodTitle=document.createElement("span"),this._elements.periodTitle.className=this.classPrefix+"-title "+this.classPrefix+"-period-title",this._elements.periodTitle.innerHTML=this.language.translateAny("Zoom"),this._elements.periodWrapper.appendChild(this._elements.periodTitle)),f.each(this.periods,function(e){var n=document.createElement("button");n.className=t.classPrefix+"-period-button",n.innerHTML=e.name,i&&n.setAttribute("tabindex",i.toString()),t._elements.periodButtons.push(n),t._elements.periodWrapper.appendChild(n),n.addEventListener("click",function(){t.setPeriodInterval(e.interval)})}))),this.dispatchImmediately("drawn",{type:"drawn"}),this.updateRangeInputs()},t.prototype.updateRangeInputs=function(){if(this._elements.fromInput&&this._elements.toInput&&this.axis){var e=this.axis,t=this.dateFormatter,i=e.minZoomed+.5*d.getDuration(e.mainBaseInterval.timeUnit,e.mainBaseInterval.count);this._elements.fromInput.value=t.format(i,this.inputDateFormat),this._elements.toInput.value=t.format(new Date(e.maxZoomed),this.inputDateFormat)}},t.prototype.updateZoom=function(){var e=this;this._zoomTimeout&&clearTimeout(this._zoomTimeout),this._zoomTimeout=setTimeout(function(){var t=e._elements.fromInput.value,i=e._elements.toInput.value;if(!(t.length<e.inputDateFormat.length||i.length<e.inputDateFormat.length)){var n=e.dateFormatter.parse(t,e.inputDateFormat),s=e.dateFormatter.parse(i,e.inputDateFormat);n&&s&&e.axis.zoomToDates(n,s)}},this.zoomDelay)},t.prototype.setPeriodInterval=function(e,t){var i,n=this;void 0===t&&(t=!1);var s=this.getGroupInterval(this.axis.mainBaseInterval);"max"==e?i=new Date(this.axis.groupMin[s]||this.axis.min):"ytd"==e?(i=new Date(this.axis.groupMax[s]||this.axis.max),d.round(i,"year",1)):c.isObject(e)&&(i=new Date(this.axis.groupMax[s]||this.axis.max),d.add(i,e.timeUnit,-1*e.count)),i&&this.zoomToDates(i);var a=!1,r=!(this.axis.rangeChangeDuration>0);t||(this.axis.events.once("groupperiodchanged",function(t){console.log("grouping",r,a),a=!0,r&&n.setPeriodInterval(e,!0)}),this.axis.events.once("rangechangeended",function(t){console.log("range",r,a),r=!0,a&&n.setPeriodInterval(e,!0)})),this.dispatchImmediately("periodselected",{interval:e,startDate:i})},t.prototype.getGroupInterval=function(e){return e.timeUnit+e.count},t.prototype.zoomToDates=function(e){var t=this.axis,i=this.getGroupInterval(t.baseInterval),n=t.groupMin[i]||t.min,s=t.groupMax[i]||t.max;t.keepSelection=!0,t.zoom({start:(e.getTime()-n)/(s-n),end:1})},Object.defineProperty(t.prototype,"periods",{get:function(){return this._periods||(this._periods=[{name:this.language.translateAny("%1M",void 0,"1"),interval:{timeUnit:"month",count:1}},{name:this.language.translateAny("%1M",void 0,"3"),interval:{timeUnit:"month",count:3}},{name:this.language.translateAny("%1M",void 0,"6"),interval:{timeUnit:"month",count:6}},{name:this.language.translateAny("%1Y",void 0,"1"),interval:{timeUnit:"year",count:1}},{name:this.language.translateAny("YTD"),interval:"ytd"},{name:this.language.translateAny("MAX"),interval:"max"}]),this._periods},set:function(e){this._periods=e,this.invalidate()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dateFormatter",{get:function(){return this._dateFormatter||(this._axis?this._dateFormatter=this._axis.dateFormatter:(this._dateFormatter=new u.a,this._disposers.push(this._dateFormatter))),this._dateFormatter},set:function(e){this._dateFormatter=e,this.invalidate()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inputDateFormat",{get:function(){return this._inputDateFormat?this._inputDateFormat:this.dateFormatter&&c.isString(this.dateFormatter.dateFormat)?this.dateFormatter.dateFormat:"yyyy-MM-dd"},set:function(e){this._inputDateFormat!=e&&(this._inputDateFormat=e,this.invalidate())},enumerable:!0,configurable:!0}),t}(m);r.c.registeredClasses.DateAxisRangeSelector=g,window.am4plugins_rangeSelector=n}},["FT2X"]);
//# sourceMappingURL=rangeSelector.js.map