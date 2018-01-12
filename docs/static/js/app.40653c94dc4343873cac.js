webpackJsonp([1],{"83+K":function(t,n){},EHTY:function(t,n){},h2vj:function(t,n){},x35b:function(t,n,e){"use strict";function i(t,n,e){return void 0===e&&(e=1),t.map(function(t){return t.data}).reduce(function(t,n){return n.forEach(function(n){return t[n.team]=[n.value/e].concat(t[n.team])}),t},n.map(function(){return[]}))}function r(t){return y.a.get(t)}function s(t){return t.data}function a(){return r(v).then(function(t){return s(t)}).then(function(t){return t.leagues})}function o(){return r(g).then(function(t){return s(t)}).then(function(t){return t.teams})}function u(){return r(L).then(function(t){return s(t)}).then(function(t){return t.seasons})}function c(){return r(x).then(function(t){return s(t)}).then(function(t){return t.seasons})}function l(t){return Math.log(t)/Math.LN10+1|0}function h(t){e("83+K")}function f(t){e("h2vj")}function p(t){e("EHTY")}Object.defineProperty(n,"__esModule",{value:!0});var d=e("/5sW"),m=(e("SCKt"),e("mtWM")),y=e.n(m),v="./static/npb-leagues.json",g="./static/npb-teams.json",L="./static/npb-number-of-visitors-history.json",x="./static/npb-pennant-race-history.json",_=e("8r4o"),b=e.n(_),C=e("rcfA"),A=e.n(C),P=e("d7WX"),S=e.n(P),H=e("A5qe"),k=0,B=d.a.extend({name:"ChartLine",props:{cid:{type:String,default:"chart-line-"+k++},svgWidth:{type:Number,default:1140},svgHeight:{type:Number,default:640},paddingBottom:{type:Number,default:24},paddingLeft:{type:Number,default:80},paddingRight:{type:Number,default:40},series:{type:Array,required:!0},lines:{type:Array,default:function(){return[]}},xAxisLabels:{type:Array,default:function(){return[]}},yAxisUnit:{type:String,default:""}},data:function(){return{displayMaskWidth:0,displayFillOpacity:0,inAnimate:!1}},computed:{viewBox:function(){return"0 0 "+this.svgWidth+" "+this.svgHeight},chartHeight:function(){return this.svgHeight-this.paddingBottom},allValues:function(){return this.series.reduce(function(t,n){return t.concat(n)},[])},_maxValue:function(){return Math.max.apply(Math,this.allValues)},maxValue:function(){return S()(this._maxValue,-1*(l(this._maxValue)-2))},percentOfSeries:function(){var t=this;return this.series.map(function(n){return n.map(function(n){return n/t.maxValue})})},yAxisLinePropsList:function(){var t="M0,0.5 H"+this.svgWidth;return b()(0,this.chartHeight,this.chartHeight/4).concat([this.chartHeight]).map(function(n){var e=A()(n,2);return{y:e,d:t,transform:"translate(0, "+e+")"}})},yAxisLabelPropsList:function(){var t=this;return[0,.5,1].map(function(n){return{value:t.maxValue*n,transform:"translate(0, "+A()(t.chartHeight*n*-1,2)+")"}})},yAxisLabelTransform:function(){return"translate(0 "+this.chartHeight+")"},chartWidth:function(){return this.svgWidth-(this.paddingLeft+this.paddingRight)},xAxisStep:function(){return this.chartWidth/Math.max.apply(Math,this.series.map(function(t){return t.length-1}))},seriesLineTransform:function(){return"translate("+this.paddingLeft+" "+this.chartHeight+")"},seriesLinePointList:function(){var t=this;return this.percentOfSeries.map(function(n){return n.map(function(n,e){return[A()(t.xAxisStep*e,2),A()(t.chartHeight*n*-1,2)]})})},seriesLinePropsList:function(){var t=this;return this.seriesLinePointList.map(function(n,e){return{color:t.lines[e].color,points:n.map(function(t){return t.join(" ")}).join(" ")}})},seriesDotPropsList:function(){return this.seriesLinePointList.map(function(t){return t.map(function(t){return{transform:"translate("+t[0]+" "+t[1]+")"}})})},xAxisLabelPropsList:function(){var t=this;return this.xAxisLabels.map(function(n,e){return{value:n,transform:"translate("+A()(t.xAxisStep*e,2)+")"}})},maskId:function(){return"mask-"+this.cid},maskRef:function(){return"url(#"+this.maskId+")"},maskTransform:function(){return"translate(0 "+-1*this.chartHeight+")"}},methods:{handleClickRunButton:function(){this.animate()},animate:function(){var t=this;if(!this.inAnimate){Object.assign(this,{displayMaskWidth:0,displayFillOpacity:0,inAnimate:!0});var n={width:0},e={fillOpacity:0},i=H.timeline().add({targets:n,width:this.chartWidth,easing:"linear",duration:500,autoplay:!1,run:function(){t.displayMaskWidth=n.width},complete:function(){t.displayMaskWidth=t.chartWidth}}).add({targets:e,fillOpacity:1,easing:"easeOutQuad",duration:500,autoplay:!1,run:function(){t.displayFillOpacity=e.fillOpacity},complete:function(){t.displayFillOpacity=1}});i.complete=function(){t.inAnimate=!1},i.play()}}},created:function(){console.log("created","ChartLine")},mounted:function(){console.log("mounted","ChartLine")},destroyed:function(){console.log("destroyed","ChartLine")}}),O=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"chart-line"},[e("p",[e("button",{attrs:{type:"button",disabled:t.inAnimate},on:{click:function(n){n.preventDefault(),t.handleClickRunButton(n)}}},[t._v("Run")])]),t._v(" "),e("svg",{attrs:{viewBox:t.viewBox,width:t.svgWidth,height:t.svgHeight}},[e("defs",[e("mask",{attrs:{id:t.maskId}},[e("rect",{attrs:{x:"0",y:"0",width:t.displayMaskWidth,height:t.chartHeight,transform:t.maskTransform,fill:"#fff"}})])]),t._v(" "),e("g",{staticClass:"chart-line__y-step-line"},t._l(t.yAxisLinePropsList,function(t){return e("path",{key:t.y,attrs:{d:t.d,transform:t.transform}})})),t._v(" "),e("g",{staticClass:"chart-line__y-label"},[e("g",{attrs:{transform:t.yAxisLabelTransform}},t._l(t.yAxisLabelPropsList,function(n,i){return e("text",{key:i,attrs:{x:"0",y:"0",transform:n.transform}},[t._v(t._s(n.value))])}))]),t._v(" "),e("g",{attrs:{transform:t.seriesLineTransform}},[e("g",{staticClass:"chart-line__series-line",attrs:{mask:t.maskRef}},t._l(t.seriesLinePropsList,function(t,n){return e("polyline",{key:n,attrs:{points:t.points,stroke:t.color}})})),t._v(" "),e("g",{staticClass:"chart-line__series-dot",attrs:{"fill-opacity":t.displayFillOpacity}},t._l(t.seriesDotPropsList,function(n,i){return e("g",{key:i,attrs:{fill:t.seriesLinePropsList[i].color}},t._l(n,function(t,n){return e("circle",{key:n,attrs:{cx:"0",cy:"0",transform:t.transform}})}))}))]),t._v(" "),e("g",{staticClass:"chart-line__x-label"},[e("g",{attrs:{transform:t.seriesLineTransform}},t._l(t.xAxisLabelPropsList,function(n){return e("text",{key:n.value,attrs:{x:"0",y:"0",transform:n.transform}},[t._v(t._s(n.value))])}))])])])},V=[],W={render:O,staticRenderFns:V},M=W,w=e("VU/8"),R=h,T=w(B,M,!1,R,"data-v-36eaf5a8",null),j=T.exports,N=(e("F2xG"),d.a.extend({name:"ChartBar",props:{svgWidth:{type:Number,default:1140},svgHeight:{type:Number,default:640},paddingBottom:{type:Number,default:24},paddingLeft:{type:Number,default:120},paddingRight:{type:Number,default:90},series:{type:Array,required:!0},forcedMinValue:{type:Number},lines:{type:Array,default:function(){return[]}},yAxisUnit:{type:String,default:""}},data:function(){return{displaySeriesLinePropsList:[],inAnimate:!1}},computed:{viewBox:function(){return"0 0 "+this.svgWidth+" "+this.svgHeight},chartHeight:function(){return this.svgHeight-this.paddingBottom},_maxValue:function(){return Math.max.apply(Math,this.series)},maxValue:function(){return S()(this._maxValue,-1*(l(this._maxValue)-2))},percentOfSeries:function(){var t=this;return this.series.map(function(n){return n/t.maxValue})},yAxisLinePropsList:function(){var t="M0,0.5 H"+this.svgWidth;return b()(0,this.chartHeight,this.chartHeight/4).concat([this.chartHeight]).map(function(n){var e=A()(n,2);return{y:e,d:t,transform:"translate(0, "+e+")"}})},yAxisLabelPropsList:function(){var t=this;return[0,.5,1].map(function(n){return{value:t.maxValue*n,transform:"translate(0, "+A()(t.chartHeight*n*-1,2)+")"}})},yAxisLabelTransform:function(){return"translate(0 "+this.chartHeight+")"},chartWidth:function(){return this.svgWidth-(this.paddingLeft+this.paddingRight)},xAxisStep:function(){return this.chartWidth/(this.series.length-1)},seriesLineTransform:function(){return"translate("+this.paddingLeft+" "+this.chartHeight+")"},seriesLinePointList:function(){var t=this;return this.percentOfSeries.map(function(n,e){return[A()(t.xAxisStep*e,2),A()(t.chartHeight*n*-1,2)]})},seriesLinePropsList:function(){return this.seriesLinePointList.map(this.createSeriesLineProps.bind(this))},xAxisLabelPropsList:function(){var t=this;return this.lines.map(function(n,e){return{value:n.name,transform:"translate("+A()(t.xAxisStep*e,2)+")"}})}},watch:{inAnimate:function(t){this.$emit("in-animate",t)},seriesLinePropsList:function(){this.animate()}},methods:{handleClickRunButton:function(){var t=this;this.initializeDisplaySeriesLinePropsList(),this.$nextTick(function(){t.animate()})},createSeriesLineProps:function(t,n){var e=this.lines[n].color,i=t[0];return{color:e,d:"M 0 0 V "+t[1],transform:"translate("+i+")"}},initializeDisplaySeriesLinePropsList:function(){var t=this;(n=this.displaySeriesLinePropsList).splice.apply(n,[0,this.displaySeriesLinePropsList.length].concat(this.seriesLinePointList.map(function(n,e){var i=n[0];return t.createSeriesLineProps([i,0],e)})));var n},animate:function(){var t=this;if(!this.inAnimate){this.inAnimate=!0;var n=H.timeline();this.displaySeriesLinePropsList.forEach(function(e,i){var r=e.d,s={d:r};n.add({targets:s,d:t.seriesLinePropsList[i].d,easing:"easeOutQuad",duration:500,autoplay:!1,offset:0,run:function(){Object.assign(t.displaySeriesLinePropsList[i],{d:s.d})},complete:function(){Object.assign(t.displaySeriesLinePropsList[i],{d:t.seriesLinePropsList[i].d})}})}),n.complete=function(){t.inAnimate=!1},n.play()}}},created:function(){console.log("created","ChartBar"),this.initializeDisplaySeriesLinePropsList()},mounted:function(){console.log("mounted","ChartBar")},destroyed:function(){console.log("destroyed","ChartBar")}})),D=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"chart-bar"},[e("p",[e("button",{attrs:{type:"button",disabled:t.inAnimate},on:{click:function(n){n.preventDefault(),t.handleClickRunButton(n)}}},[t._v("Run")])]),t._v(" "),e("svg",{attrs:{viewBox:t.viewBox,width:t.svgWidth,height:t.svgHeight}},[e("g",{staticClass:"chart-bar__y-step-line"},t._l(t.yAxisLinePropsList,function(t){return e("path",{key:t.y,attrs:{d:t.d,transform:t.transform}})})),t._v(" "),e("g",{staticClass:"chart-bar__y-label"},[e("g",{attrs:{transform:t.yAxisLabelTransform}},t._l(t.yAxisLabelPropsList,function(n,i){return e("text",{key:i,attrs:{x:"0",y:"0",transform:n.transform}},[t._v(t._s(n.value))])}))]),t._v(" "),e("g",{attrs:{transform:t.seriesLineTransform}},[e("g",{staticClass:"chart-bar__series-bar"},t._l(t.displaySeriesLinePropsList,function(t,n){return e("path",{key:n,attrs:{d:t.d,stroke:t.color,transform:t.transform}})}))]),t._v(" "),e("g",{staticClass:"chart-bar__x-label"},[e("g",{attrs:{transform:t.seriesLineTransform}},t._l(t.xAxisLabelPropsList,function(n){return e("text",{key:n.value,attrs:{x:"0",y:"0",transform:n.transform}},[t._v(t._s(n.value))])}))])])])},F=[],E={render:D,staticRenderFns:F},U=E,$=e("VU/8"),I=f,q=$(N,U,!1,I,"data-v-9996baea",null),z=q.exports,K=d.a.extend({name:"App",components:{ChartLine:j,ChartBar:z},data:function(){return{leagues:[],teams:[],numberOfVisitorsHistory:[],pennantRaceHistory:[],barChartCurrentSeason:0,isBarChartSeasonSelectorDisabled:!1}},computed:{seasonOptionList:function(){return this.numberOfVisitorsHistory.map(function(t){return t.season})},lineChartHistoryList:function(){return i(this.numberOfVisitorsHistory,this.teams,1e3)},lineChartPropsList:function(){return this.teams.map(function(t){return{id:t.id,name:t.name,color:t.color}})},lineChartXAxisLabelList:function(){return this.numberOfVisitorsHistory.map(function(t){return t.season}).reverse()},barChartCurrentSeasonList:function(){var t=this,n=this.numberOfVisitorsHistory.find(function(n){return n.season===t.barChartCurrentSeason});return n?n.data.map(function(t){return t.value/1e3}):[]},barChartPropsList:function(){return this.teams.map(function(t){return{id:t.id,name:t.name,color:t.color}})}},methods:{handleInAnimateChartBar:function(t){this.isBarChartSeasonSelectorDisabled=t},fetchAll:function(){return Promise.all([a(),o(),u(),c()])}},created:function(){var t=this;this.fetchAll().then(function(n){var e=n[0],i=n[1],r=n[2],s=n[3],a=Math.max.apply(Math,r.map(function(t){return t.season}));Object.assign(t,{leagues:e,teams:i,numberOfVisitorsHistory:r,pennantRaceHistory:s,barChartCurrentSeason:a})}).catch(function(t){return console.error(t.message)})}}),X=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[t._m(0),t._v(" "),e("div",{staticClass:"container"},[e("h2",[t._v("Line chart")]),t._v(" "),e("p",[t._v("History of NPB's annual visitors.")]),t._v(" "),e("ChartLine",{attrs:{series:t.lineChartHistoryList,lines:t.lineChartPropsList,xAxisLabels:t.lineChartXAxisLabelList,yAxisUnit:"x 1000"}})],1),t._v(" "),e("div",{staticClass:"container"},[e("h2",[t._v("Bar chart")]),t._v(" "),e("p",[t._v("Annual visitors per team")]),t._v(" "),e("p",[e("span",[t._v("Season: ")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.barChartCurrentSeason,expression:"barChartCurrentSeason"}],attrs:{disabled:t.isBarChartSeasonSelectorDisabled},on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.barChartCurrentSeason=n.target.multiple?e:e[0]}}},t._l(t.seasonOptionList,function(n){return e("option",{key:n,domProps:{value:n}},[t._v(t._s(n))])}))]),t._v(" "),e("ChartBar",{attrs:{series:t.barChartCurrentSeasonList,lines:t.barChartPropsList,yAxisUnit:"x 1000"},on:{"in-animate":t.handleInAnimateChartBar}})],1)])},G=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("header",{staticClass:"container"},[e("h1",[t._v("Vue Animated Graph Demo")]),t._v(" "),e("p",[t._v("Demos of animated graph that render by Vue.js without D3.js.")])])}],Q={render:X,staticRenderFns:G},Y=Q,J=e("VU/8"),Z=p,tt=J(K,Y,!1,Z,null,null),nt=tt.exports;d.a.config.productionTip=!1,new d.a({el:"#app",render:function(t){return t(nt)}})}},["x35b"]);
//# sourceMappingURL=app.40653c94dc4343873cac.js.map