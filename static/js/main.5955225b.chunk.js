(this.webpackJsonpaviasales=this.webpackJsonpaviasales||[]).push([[0],[,,,,,,,,,,,function(e,t,r){e.exports=r.p+"static/media/logo_aviasales.0c089234.svg"},,,function(e,t,r){e.exports=r(25)},,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},,function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(1),a=r(2),s=r(4),i=r(3),c=r(0),o=r.n(c),u=r(10),l=r.n(u),f=(r(19),r(11)),m=r.n(f);r(20);function h(){return o.a.createElement("div",{className:"logo center"},o.a.createElement("p",{className:" timeout__tip"},"\u041e\u0436\u0438\u0434\u0430\u043d\u0438\u0435 \u0432\u0432\u043e\u0434\u0430..."),o.a.createElement("div",{className:"timeout"}),o.a.createElement("img",{src:m.a,alt:"",style:{width:"82px"}}))}var p=r(13),v=(r(21),function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(){var e;Object(n.a)(this,r);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s)))._filterText={all:"\u0412\u0441\u0435",0:"\u0411\u0435\u0437 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a",1:"1 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0430",2:"2 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438",3:"3 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438"},e}return Object(a.a)(r,[{key:"render",value:function(){return o.a.createElement("form",{className:"form filter"},o.a.createElement("h3",{className:"form__header"},"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a"),this.renderFilterItems())}},{key:"handleClick",value:function(e){this.highlightBuffered(e,this.props.timeout),this.props.onChange(e)}},{key:"highlightBuffered",value:function(e,t){var r=e.target;r.classList.add("buffered"),setTimeout((function(){r.classList.remove("buffered")}),t)}},{key:"renderFilterItems",value:function(){for(var e=this,t=Object.entries(this.props.filters).sort((function(e,t){return"all"===e[0]?-1:0})),r=[],n=0;n<t.length;n+=1){var a=Object(p.a)(t[n],2),s=a[0],i=a[1];r.push(o.a.createElement("div",{className:"filter__item",key:n},o.a.createElement("input",{className:"filter__input",type:"checkbox",id:s,checked:i,onChange:function(t){return e.handleClick(t)}}),o.a.createElement("label",{className:"filter__label",htmlFor:s},this._filterText[s])))}return r}}]),r}(c.Component)),d=function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){return o.a.createElement("div",{className:"card row__col-side"},o.a.createElement(v,{filters:this.props.filters,onChange:this.props.onChange,timeout:this.props.timeout}))}}]),r}(c.Component),b=r(12),g=r(5),k=r.n(g),_=r(6),j=(r(23),function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){var e=this;return o.a.createElement("ul",{className:"tabs card",onClick:function(t){return e.handleClick(t)}},o.a.createElement("li",{"data-sorter":"cheapest",className:"tabs__item tabs__item_active"},"\u0421\u0430\u043c\u044b\u0439 \u0434\u0435\u0448\u0435\u0432\u044b\u0439"),o.a.createElement("li",{"data-sorter":"fastest",className:"tabs__item"},"\u0421\u0430\u043c\u044b\u0439 \u0431\u044b\u0441\u0442\u0440\u044b\u0439"))}},{key:"handleClick",value:function(e){this.highlight(e),this.props.onClick(e)}},{key:"highlight",value:function(e){var t="tabs__item_active";e.target.classList.contains(t)||(e.currentTarget.querySelector("."+t).classList.remove(t),e.target.classList.add(t))}}]),r}(c.Component)),y=(r(24),function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e)).state={details:[]},a}return Object(a.a)(r,[{key:"render",value:function(){return this.state.details.map((function(e,t){return o.a.createElement("div",{key:t,className:"flight row"},o.a.createElement("div",{className:"flight__block"},o.a.createElement("span",{className:"text-grey"},"".concat(e.origin," - ").concat(e.destination)),o.a.createElement("span",{className:"fw-bold"},function(e,t){var r=new Date(e),n=new Date(Date.parse(e)+60*t*1e3),a=r.getHours()<10?"0"+r.getHours():r.getHours(),s=r.getMinutes()<10?"0"+r.getMinutes():r.getMinutes(),i=n.getHours()<10?"0"+n.getHours():n.getHours(),c=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes();return"".concat(a,":").concat(s," - ").concat(i,":").concat(c)}(e.date,e.duration))),o.a.createElement("div",{className:"flight__block"},o.a.createElement("span",{className:"text-grey"},"\u0412 \u043f\u0443\u0442\u0438"),o.a.createElement("span",{className:"fw-bold"},function(e){var t=parseInt(e/60),r=Math.round(60*(e/60-t));return"".concat(t,"\u0447 ").concat(r,"\u043c")}(e.duration))),o.a.createElement("div",{className:"flight__block"},o.a.createElement("span",{className:"text-grey"},function(e){switch(e.length){case 1:return"1 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0430";case 2:return"2 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438";case 3:return"3 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438";default:return"\u0411\u0435\u0437 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a"}}(e.stops)),o.a.createElement("span",{className:"fw-bold"},e.stops.map((function(e,t){return t>0?", ".concat(e):e})))))}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.details!==t.details&&void 0!==e.details?{details:e.details}:null}}]),r}(c.Component));var O=function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e)).state={ticketInfo:{}},a}return Object(a.a)(r,[{key:"render",value:function(){return o.a.createElement("div",{className:"card ticket"},o.a.createElement("div",{className:"row row_btwn"},o.a.createElement("span",{className:"price"},"".concat(this.state.ticketInfo.price," \u0420")),o.a.createElement("div",{className:"logo-iata"},o.a.createElement("img",{src:"http://pics.avs.io/99/36/".concat(this.state.ticketInfo.carrier,".png"),alt:this.state.ticketInfo.carrier}))),o.a.createElement(y,{details:this.state.ticketInfo.segments}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.ticketInfo!==t.ticketInfo&&void 0!==e.ticketInfo?{ticketInfo:e.ticketInfo}:null}}]),r}(c.Component),E=function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){if(!this.props.ticketsArray)return o.a.createElement("p",{className:"row"},"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0431\u0438\u043b\u0435\u0442\u043e\u0432");var e=this.props.ticketsArray.map((function(e,t){return o.a.createElement(O,{ticketInfo:e,key:t})}));return o.a.createElement("div",{className:"tickets"},e)}}]),r}(c.Component),w=function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e)).state={allowRender:!1,_buf:null},a}return Object(a.a)(r,[{key:"render",value:function(){return o.a.createElement("div",{className:"main row__col-main"},o.a.createElement(j,{onClick:this.props.onClick}),o.a.createElement(E,{ticketsArray:this.state._buf}))}},{key:"componentDidMount",value:function(){var e=Object(_.a)(k.a.mark((function e(){var t;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.askServer(this.props.sort);case 2:t=e.sent,this.setState((function(e){return{allowRender:!0,_buf:t}}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(_.a)(k.a.mark((function e(t){var r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t===this.props){e.next=6;break}return this.setState((function(){return{allowRender:!1,_buf:null}})),e.next=4,this.askServer(this.props.sort);case 4:r=e.sent,this.setState((function(){return{allowRender:!0,_buf:r}}));case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"askServer",value:function(){var e=Object(_.a)(k.a.mark((function e(){var t,r,n,a,s,i,c,o,u,l,f,m=arguments;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=m.length>0&&void 0!==m[0]?m[0]:this.props.sort,r=m.length>1&&void 0!==m[1]?m[1]:this.props.filters,n=new URL("https://front-test.beta.aviasales.ru"),a=new URL("/search",n),s=new URL("/tickets?searchId=",n),e.next=7,x(a);case 7:return i=e.sent,c=s+i,console.group("\u043f\u043e\u043b\u0443\u0447\u0430\u0435\u043c \u043d\u043e\u0432\u044b\u0435 \u0431\u0438\u043b\u0435\u0442\u044b..."),console.log("search ID: "+i+", URL:",c),e.next=13,C(c);case 13:return o=e.sent,u=[],!0===r.all?u=o:(l=Object.entries(r).filter((function(e){return"all"!==e[0]})).filter((function(e){return!0===e[1]})).map((function(e){return+e[0]})),u=o.filter((function(e){return l.includes(N(e))}))),f="cheapest"===t?D(u):T(u),console.groupEnd(),e.next=20,f;case 20:return e.abrupt("return",e.sent);case 21:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),r}(c.Component);function N(e){return Math.max(e.segments[0].stops.length,e.segments[1].stops.length)}function x(e){return fetch(e).then((function(e){return e.json()})).then((function(e){return e.searchId}))}function C(e){return I.apply(this,arguments)}function I(){return(I=Object(_.a)(k.a.mark((function e(t){var r,n,a,s;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=[],n=!1,a=0;case 2:if(!(!0!==n&&a<100)){e.next=13;break}return 100===a&&console.warn("\u0421\u0427\u0415\u0422\u0427\u0418\u041a",a),e.next=6,S(t);case 6:s=e.sent,n=s.stop,r.push.apply(r,Object(b.a)(s.tickets)),n&&console.warn("searching success! stop:",s.stop,", count of tickets:",r.length);case 10:a+=1,e.next=2;break;case 13:return e.abrupt("return",r);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return L.apply(this,arguments)}function L(){return(L=Object(_.a)(k.a.mark((function e(t){var r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if(500!==(r=e.sent).status){e.next=7;break}return e.next=6,S(t);case 6:return e.abrupt("return",e.sent);case 7:return e.next=9,r.json();case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e){return e.slice().sort((function(e,t){return e.price-t.price})).slice(0,5)}function T(e){return e.slice().sort((function(e,t){return e.segments.reduce((function(e,t){return e.duration+t.duration}))-t.segments.reduce((function(e,t){return e.duration+t.duration}))})).slice(0,5)}var M=function(e){Object(s.a)(r,e);var t=Object(i.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e))._timeoutBeforeSearch=2e3,a.state={sort:"cheapest",filters:{all:!0,0:!1,1:!1,2:!1,3:!1}},a}return Object(a.a)(r,[{key:"render",value:function(){var e=this.bufferingDecorator(this._timeoutBeforeSearch);return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement(h,null)),o.a.createElement("div",{className:"row"},o.a.createElement(d,{filters:this.state.filters,onChange:e,timeout:this._timeoutBeforeSearch}),o.a.createElement(w,{onClick:e,filters:this.state.filters,sort:this.state.sort})))}},{key:"bufferingDecorator",value:function(e){var t,r,n=e,a=this,s=this.state.sort,i=Object.assign({},this.state.filters);return function(e){clearTimeout(t),clearTimeout(r),e.currentTarget.classList.contains("tabs")?s=e.target.dataset.sorter:i=a.getNewFilter(e);var c=document.querySelector(".timeout"),o=document.querySelector(".timeout__tip");o.className="timeout__tip",c.className="timeout",o.classList.add("timeout__tip_run"),c.classList.add("timeout_run"),r=setTimeout((function(){o.classList.remove("timeout__tip_run"),c.classList.remove("timeout_run")}),a._timeoutBeforeSearch),t=setTimeout((function(){a.setState((function(e){var t=Object.assign({},e);return t.sort=s,t.filters=i,t})),clearTimeout(t)}),n)}}},{key:"getNewFilter",value:function(e){var t=e.target.id;if(!0===this.state.filters[t]&&Object.entries(this.state.filters).filter((function(e){return e[0]!==t})).every((function(e){return!1===e[1]})))return Object.assign({},this.state).filters;if(!0===this.state.filters.all&&!1===this.state.filters[t]&&"all"!==t){var r=Object.assign({},this.state);return r.filters.all=!1,r.filters[t]=!r.filters[t],r.filters}if("all"===t&&Object.values(this.state.filters).some((function(e){return!0===e}))){var n=Object.assign({},this.state);for(var a in n.filters)n.filters.hasOwnProperty(a)&&(n.filters[a]=!1);return n.filters.all=!0,n.filters}var s=Object.assign({},this.state);return s.filters[t]=!s.filters[t],s.filters}}]),r}(c.Component);l.a.render(o.a.createElement(M,null),document.getElementById("root"))}],[[14,1,2]]]);
//# sourceMappingURL=main.5955225b.chunk.js.map