// require hogan
var hogan = require("hogan.js");

var fs = require('fs');

var config = require('./pages.json');

var template = {};
var page;

// load all files into memory
for (page in config.meta.template){
  template[page] = fs.readFileSync(config.meta.template[page],  'utf-8');
}



WriteErrorTemplates(template.error, config.pages, config.meta.location.pages);

RenderAndWrite(template.index, config.meta.location.pages + "index.html" , { list : ObjectToArray(config.pages) } );

RenderAndWrite(fs.readFileSync("nginx-test.hjs", "utf-8"), config.meta.location.config + "nginx-error.conf" , config );

function WriteErrorTemplates(template, json, location){
  var code, i, value, html, name;
  for ( i=0; i<json.length; i++ ){
    value = json[i];
    if(isNumber(value.code)){
      name = value.code + "-error.html";
    }else{
      name = value.code + ".html";
    }
   RenderAndWrite(template, location + name, value);
  }
}

function RenderAndWrite(template, location, object){
  console.log('Writing template @ ' + location);
  var html = hogan
        .compile(template)
        .render(object);
  fs.writeFileSync(location, html, 'utf-8');
}

function ObjectToArray(json){
  var key, arr=[];
  for ( key in json ){
    arr.push({
      name : key,
      code : json[key],
      title : json[key].title
    });
  }
  return arr;
}

function isNumber(n){
  var number = parseInt(n);
  if(isNaN(number)){
    return false;
  }else{
    return true;
  }
}
