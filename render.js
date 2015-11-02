// require hogan
var hogan = require("hogan.js");

var fs = require('fs');

var config = require('./pages.json');

var colors = require('colors');

var template = {};
var page;

var isWin = /^win/.test(process.platform),
    separator = (isWin) ? '\\' : '/';

// load all files into memory
for (page in config.meta.template){
  template[page] = fs.readFileSync(config.meta.template[page],  'utf-8');
}

var tasks = {
  init : function (){

  },
  error : function (){
    WriteErrorTemplates(template.error, config.pages, config.meta.location.pages.html + '/' );
  },
  index : function (){
    RenderAndWrite(template.index, config.meta.location.pages.html + "/index.html" , config);
  },
  nginx : function (){
    RenderAndWrite(template.nginx, config.meta.location.config + "/nginx-error.conf" , ParseNginxConfig(config) );
  },
  json : function (){
    WriteJson(config, config.meta.location.pages.json);
  },
  all : function (){
    for (var e in this){
      if(e !== "all" && e !== "init"){
        console.log(e);
        this[e]();
      }
    }
  }
};

var cmd = process.argv[2];

if(cmd in tasks){
  var str = "Running task: " + cmd;
  console.log("Running task: ".green, cmd.grey);
  tasks[cmd]();
}else{
  console.error('Not available function'.red);
  console.log("available are : ");
  for (var e in tasks){
    console.log("\t", e.green);
  }
}
function ParseNginxConfig (config){
  var NGINX_CODES = [];
  config.pages.forEach(function (page){
    if (isNumber(page.code)){
     NGINX_CODES.push(page);
    }
  });

  config.pages = NGINX_CODES;
  return config;
}
function softmkdir(dir){
  if(!folderExist(dir)){
    fs.mkdirSync(dir);
  }
}
function folderExist(filePath){
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
  return false;
}
function WriteErrorTemplates(template, json, location){
  softmkdir(location);

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

function WriteJson(config, location){
  softmkdir(location);
  var name, filename;
  config.pages.forEach(function (obj){
    var json = {
      code : obj.code,
      message : obj.description,
      info : obj.info.title.text
    };
    if(isNumber(obj.code)){
      name = obj.code + '-error.json';;
    }else{
      name = obj.code + ".json";
    }
    filename = location +'/'+ name;
    var JsonString = JSON.stringify(json, null, 2);
    fs.writeFileSync(filename, JsonString, 'utf-8');
  });

}

function RenderAndWrite(template, location, object){
  var str = 'Writing template @ ' + location;
  console.log(str.green);
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
