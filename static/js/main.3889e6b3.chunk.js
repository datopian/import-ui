(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{127:function(e,t,a){e.exports=a.p+"static/media/datopian-logo.a5f7af6f.png"},129:function(e){e.exports={title:"Dataset",description:"A simple dataset.",type:"object",required:["title"],properties:{title:{type:"string",title:"Title"},license:{type:"string",title:"License",description:"A license for the dataset.",enum:["License 1","License 2"]},description:{type:"string",title:"Description"},created:{type:"string",title:"Created",format:"date-time"},author:{type:"string",title:"Author"}}}},130:function(e){e.exports={dataset:{description:{"ui:widget":"textarea"}}}},134:function(e,t,a){e.exports=a(287)},140:function(e,t,a){},141:function(e,t,a){},142:function(e,t,a){},287:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(126),i=a.n(r),c=(a(139),a(140),a(141),a(142),a(5)),m=a(6),s=a(8),u=a(7),o=a(9),d=a(288),p=a(133),f=a(127),E=a.n(f),h=a(289),b=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return l.a.createElement("header",{className:"navigation",role:"banner"},l.a.createElement("div",{className:"navigation-wrapper"},l.a.createElement("div",{className:"branding"},l.a.createElement(h.a,{className:"logo",to:"/"},l.a.createElement("img",{alt:"logo",src:E.a})))))}}]),t}(l.a.Component),v=a(88),g=a.n(v),j=a(128),O=a(16),y=a(89),N=a.n(y),k=l.a.createContext(),C=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={file:!1,data:null,type:null,metadata:{},step:"home"},e.fileUpload=e.fileUpload.bind(Object(O.a)(Object(O.a)(e))),e.stepChange=e.stepChange.bind(Object(O.a)(Object(O.a)(e))),e.updateMetadata=e.updateMetadata.bind(Object(O.a)(Object(O.a)(e))),e.loadDefault=e.loadDefault.bind(Object(O.a)(Object(O.a)(e))),e.cancelUpload=e.cancelUpload.bind(Object(O.a)(Object(O.a)(e))),e}return Object(o.a)(t,e),Object(m.a)(t,[{key:"fileData",value:function(e){var t=this;return N.a.parse(e,{complete:function(e){e.cols=e.meta.fields.map(function(e){return{Header:e=e||" ",accessor:e}}),t.setState({data:e})},header:!0})}},{key:"cancelUpload",value:function(){this.setState({file:null})}},{key:"updateMetadata",value:function(e){if("edit"in e){var t=e.formData;this.setState({metadata:t})}else{var a=this.state.metadata;a.title=e.target.value,this.setState({metadata:a})}}},{key:"loadDefault",value:function(e){var t=this;N.a.parse("http://demo.getdkan.com/sites/default/files/PropertyCrimesByCity_3.csv",{download:!0,complete:function(e){e.cols=e.meta.fields.map(function(e){return{Header:e=e||" ",accessor:e}});t.setState({data:e,file:{name:"PropertyCrimesByCity.csv"}})},header:!0})}},{key:"fileUpload",value:function(){var e=Object(j.a)(g.a.mark(function e(t){var a;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:"text/csv"===(a=t.target.files[0]).type?(this.fileData(a),this.setState({file:a,type:null})):this.setState({type:"wrong"});case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"stepChange",value:function(e){var t=e.target.attributes.getNamedItem("data").value;this.setState({step:t})}},{key:"render",value:function(){return!("title"in this.state.metadata)&&this.state.file&&"name"in this.state.file&&(this.state.metadata.title=this.state.file.name),l.a.createElement(k.Provider,{value:{file:this.state.file,fileUpload:this.fileUpload,step:this.state.step,data:this.state.data,metadata:this.state.metadata,updateMetadata:this.updateMetadata,loadDefault:this.loadDefault,cancelUpload:this.cancelUpload,type:this.state.type,stepChange:this.stepChange}},this.props.children)}}]),t}(l.a.Component),w=k.Consumer,x=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"step",value:function(e,t,a){var n=l.a.createElement("div",null);return"home"===t&&!1===e?n=l.a.createElement("li",{className:"breadcrumb-item"},"Home"):"home"===t?n=l.a.createElement(l.a.Fragment,null,l.a.createElement("li",{className:"breadcrumb-item"},"Home")):"preview"===t?n=l.a.createElement(l.a.Fragment,null,l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement(h.a,{data:"home",onClick:a,to:"/"},"Home")),l.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Preview")):"publish"===t&&(n=l.a.createElement(l.a.Fragment,null,l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement(h.a,{data:"home",onClick:a,to:"/"},"Home")),l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement(h.a,{data:"preview",onClick:a,to:"/preview"},"Preview")),l.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Publish"))),n}},{key:"render",value:function(){var e=this;return l.a.createElement("nav",{"aria-label":"breadcrumb"},l.a.createElement("ol",{className:"breadcrumb"},l.a.createElement(w,null,function(t){var a=t.file,n=t.stepChange,r=t.step;return l.a.createElement(l.a.Fragment,null,e.step(a,r,n))})))}}]),t}(l.a.Component),F=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"step",value:function(e,t,a){var n=l.a.createElement("div",null);return"home"===t&&!1===e?n=l.a.createElement("div",null):"home"===t?n=l.a.createElement(l.a.Fragment,null,l.a.createElement("li",{className:"page-item"},l.a.createElement(h.a,{data:"preview",onClick:a,to:"/preview",className:"page-link"},"Next"))):"preview"===t?n=l.a.createElement(l.a.Fragment,null,l.a.createElement("li",{className:"page-item"},l.a.createElement(h.a,{data:"home",onClick:a,to:"/",className:"page-link"},"Previous")),l.a.createElement("li",{className:"page-item"},l.a.createElement(h.a,{data:"detail",onClick:a,to:"/detail",className:"page-link"},"Next"))):"detail"===t?n=l.a.createElement(l.a.Fragment,null,l.a.createElement("li",{className:"page-item"},l.a.createElement(h.a,{data:"preview",onClick:a,to:"/preview",className:"page-link"},"Previous")),l.a.createElement("li",{className:"page-item"},l.a.createElement(h.a,{data:"publish",onClick:a,to:"/publish",className:"page-link"},"Next"))):"publish"===t&&(n=l.a.createElement(l.a.Fragment,null,l.a.createElement("li",{className:"page-item"},l.a.createElement(h.a,{data:"detail",onClick:a,to:"/detail",className:"page-link"},"Previous")))),n}},{key:"render",value:function(){var e=this;return l.a.createElement("nav",{"aria-label":"Page navigation example",className:"container-fluid"},l.a.createElement("ul",{className:"pagination"},l.a.createElement(w,null,function(t){var a=t.file,n=t.stepChange,r=t.step;return l.a.createElement(l.a.Fragment,null,a?l.a.createElement(l.a.Fragment,null,e.step(a,r,n)):"")})))}}]),t}(l.a.Component),U=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.upload;return l.a.createElement(w,null,function(t){t.file,t.stepChange,t.step;return l.a.createElement("div",{className:"file-upload"},l.a.createElement("div",{className:"file-upload-wrap"},l.a.createElement("input",{className:"file-upload-input",type:"file",onChange:e,accept:"csv"}),l.a.createElement("div",{className:"drag-text"},l.a.createElement("h3",null,"Drag and drop a file or select add File"))),l.a.createElement("div",{className:"file-upload-content"},l.a.createElement("img",{className:"file-upload-file",src:"#",alt:"your file"}),l.a.createElement("div",{className:"file-title-wrap"},l.a.createElement("button",{type:"button",onClick:e,className:"remove-file"},"Remove ",l.a.createElement("span",{className:"file-title"},"Uploaded File")))))})}}]),t}(l.a.Component),D=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("main",{role:"main",className:"container-fluid"},l.a.createElement("h1",null,"Welcome"),l.a.createElement("p",{className:"lead"},"This is the home page."),l.a.createElement(w,null,function(e){var t=e.file,a=e.fileUpload,n=e.type,r=e.loadDefault,i=e.cancelUpload;return l.a.createElement("div",null,"wrong"===n?l.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Hey there. We only accept CSVs."):l.a.createElement(l.a.Fragment,null),t?l.a.createElement("div",{id:"file-desc"},l.a.createElement("p",null,"You have selected:"),l.a.createElement("div",{id:"file-name"},t.name),l.a.createElement("button",{id:"file-close",type:"button",onClick:i,className:"close btn btn-outline-warning","aria-label":"Close"},l.a.createElement("span",{"aria-hidden":"true"},"\xd7"))):l.a.createElement(l.a.Fragment,null,l.a.createElement(U,{upload:a}),l.a.createElement("p",null,"or"),l.a.createElement("p",null,l.a.createElement("button",{onClick:r},"Click here to use an example file."))))})))}}]),t}(n.Component),P=a(290),S=(a(148),a(132)),H=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("main",{role:"main",className:"container-fluid"},l.a.createElement("h1",null,"Preview"),l.a.createElement("p",{className:"lead"},"This is the preview page."),l.a.createElement(w,null,function(e){var t=e.file,a=e.data,n=e.metadata,r=e.updateMetadata;return l.a.createElement("div",null,t&&a?l.a.createElement("div",null,l.a.createElement("input",{id:"title",onChange:r,value:n.title,type:"text"}),l.a.createElement("p",null,l.a.createElement(S.a,{data:a.data,defaultPageSize:5,columns:a.cols}))):l.a.createElement(P.a,{to:"/"}))})))}}]),t}(n.Component),M=a(129),T=a(130),A=a(131),B=a.n(A),L=function(e){return console.log.bind(console,e)},W=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"fileUpload",value:function(){return l.a.createElement("div",null,"No file")}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("main",{role:"main",className:"container-fluid"},l.a.createElement("h1",null,"Detail"),l.a.createElement("p",{className:"lead"},"Time to add metadata."),l.a.createElement(w,null,function(e){var t=e.file,a=e.updateMetadata,n=e.metadata;return l.a.createElement("div",null,t?l.a.createElement("div",null,l.a.createElement(B.a,{schema:M,formData:n,uiSchema:T.dataset,onChange:a,onSubmit:L("submitted"),onError:L("errors")},l.a.createElement("br",null))):l.a.createElement(P.a,{to:"/"}))})))}}]),t}(n.Component),I=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"fileUpload",value:function(){return l.a.createElement("div",null,"No file")}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("main",{role:"main",className:"container-fluid"},l.a.createElement("h1",null,"Publish"),l.a.createElement("p",{className:"lead"},"This is the publish page."),l.a.createElement(w,null,function(e){var t=e.file;return l.a.createElement("div",null,t?l.a.createElement("div",null,l.a.createElement("p",null,"We still have a file!")):l.a.createElement(P.a,{to:"/"}))})))}}]),t}(n.Component),J=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=l.a.createElement(D,null),t=l.a.createElement(H,null),a=l.a.createElement(W,null),n=l.a.createElement(I,null);return l.a.createElement("div",null,l.a.createElement("div",{className:"App"},l.a.createElement(d.a,{basename:"/import-ui"},l.a.createElement(C,null,l.a.createElement(b,null),l.a.createElement(x,null),l.a.createElement(p.a,{exact:!0,path:"/",render:function(){return e}}),l.a.createElement(p.a,{exact:!0,path:"/preview",render:function(){return t}}),l.a.createElement(p.a,{exact:!0,path:"/detail",render:function(){return a}}),l.a.createElement(p.a,{exact:!0,path:"/publish",render:function(){return n}}),l.a.createElement(F,null)))))}}]),t}(n.Component);i.a.render(l.a.createElement(J,null),document.getElementById("root"))}},[[134,1,2]]]);
//# sourceMappingURL=main.3889e6b3.chunk.js.map