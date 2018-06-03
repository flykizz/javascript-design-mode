function inhertObject(o){
  var F = function(){};
  F.prototype = o;
  return new F();
}

function inhertProtoType(subClass,superClass){
  var p = inhertObject(superClass.prototype);
  p.constructor = subClass;
  subClass.prototype = p;
}

var News = function(){
  //子容器组件
  this.children = [];
  //当前组件元素
  this.element = null;
}

News.prototype = {
  init: function(){
    throw new Error("请重写init方法");
  },
  add: function(){
    throw new Error("请重写add方法");
  },
  getElement: function(){
    throw new Error("请重写getElement方法");
  }
}

var Container = function(id, parent){
  //构造函数继承父类
  News.call(this);

  this.id = id;
  this.parent = parent;
  this.init();
}

inhertProtoType(Container,News);

Container.prototype.init = function(){
  this.element = document.createElement('ul');
  this.element.id = this.id;
  this.element.className = 'new-container';
}

Container.prototype.add = function(child){
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}

Container.prototype.getElement = function(){
  return this.element;
}

Container.prototype.show = function(){
  this.parent.appendChild(this.element);
}

var Item = function(classname){
  News.call(this);
  this.classname = classname;
  this.init();
}

inhertProtoType(Item, News);

Item.prototype.init = function(){
  this.element = document.createElement('li');
  this.element.className = this.classname;
}

Item.prototype.add = function(child){
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}

Item.prototype.getElement = function(){
  return this.element;
}

var NewsGroup = function(classname){
  News.call(this);
  this.classname = classname || '';
  this.init();
}

inhertProtoType(NewsGroup,News);

NewsGroup.prototype.init = function(){
  this.element = document.createElement('div');
  this.element.className = this.classname;
}

NewsGroup.prototype.add = function(child){
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}

NewsGroup.prototype.getElement = function(child){
  return this.element;
}

var ImageNews = function(url,href,classname){
  News.call(this);
  this.url = url;
  this.href = href;
  this.classname = classname || '';
  this.init();
}

inhertProtoType(ImageNews,News);

ImageNews.prototype.init = function(){
  this.element = document.createElement('a');
  var img = new Image();
  img.src = this.url;
  this.element.appendChild(img);
  this.element.className = 'image-news ' + this.classname;
  this.element.href = this.href;
}

ImageNews.prototype.add = function(){}
ImageNews.prototype.getElement = function(){
  return this.element;
}

var IconNews = function(text,href,classname){
  News.call(this);
  this.text = text;
  this.href = href;
  this.classname = classname || '';
  this.init();
}

inhertProtoType(ImageNews,News);

IconNews.prototype.init = function(){
  this.element = document.createElement('a');
  this.element.innerHTML = this.text;
  this.element.className = 'icon ' + this.classname;
  this.element.href = this.href;
}

IconNews.prototype.add = function(){}
IconNews.prototype.getElement = function(){
  return this.element;
}

var EasyNews = function(text,href){
  News.call(this);
  this.text = text;
  this.href = href;
  this.init();
}

inhertProtoType(ImageNews,News);

EasyNews.prototype.init = function(){
  this.element = document.createElement('a');
  this.element.innerHTML = this.text;
  this.element.href = this.href;
}

EasyNews.prototype.add = function(){}
EasyNews.prototype.getElement = function(){
  return this.element;
}

var news1 = new Container('news', document.body);

news1.add(
  new Item('normal').add(
    new IconNews('梅西不拿金球也伟大','#','video')
  )
).add(
  new Item('normal').add(
    new EasyNews('哈哈哈','#')
  )
).show();



