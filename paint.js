
function toRadian(degree) {
  return (degree * Math.PI / 180);
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Dimension(w, h) {
  this.w = w;
  this.h = h;
}

function Line(context, p1, p2, color, transparency) {
  this.p1 = p1;
  this.p2 = p2;
  this.context = context;
  this.color = (color ? color : "#000");
  this.transparency = (transparency ? transparency : 1);
}

Line.prototype.draw = function () {
  this.context.beginPath();
  this.context.moveTo(this.p1.x, this.p1.y);
  this.context.lineTo(this.p2.x, this.p2.y);
  if (this.color) {
    this.context.strokeStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.stroke();
}

function Rect(context, p, d, color, transparency) {
  this.p = p;
  this.d = d;
  this.context = context;
  this.color = (color ? color : "#000");
  this.transparency = (transparency ? transparency : 1);
}

Rect.prototype.stroke = function () {
  this.context.beginPath();
  if (this.color) {
    this.context.strokeStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.strokeRect(this.p.x, this.p.y, this.d.w, this.d.h);
}

Rect.prototype.fill = function () {
  this.context.beginPath();
  if (this.color) {
    this.context.fillStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.fillRect(this.p.x, this.p.y, this.d.w, this.d.h);
}

function Circle(context, p, r, color, transparency) {
  this.center = p;
  this.context = context;
  this.r = r;
  this.angleStart = 0;
  this.angleEnd = Math.PI * 2;
  this.color = (color ? color : '#000');
  this.transparency = (transparency ? transparency : 1);
}

Circle.prototype.stroke = function () {
  this.context.beginPath();
  this.context.arc(this.center.x, this.center.y, this.r, this.angleStart, this.angleEnd);
  if (this.color) {
    this.context.strokeStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.stroke();
}

Circle.prototype.fill = function () {
  this.context.beginPath();
  this.context.arc(this.center.x, this.center.y, this.r, this.angleStart, this.angleEnd);
  if (this.color) {
    this.context.fillStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.fill();
}

////////1.5pi////////
/////////////////////
//1pi////////////0pi/
/////////////////////
////////0.5pi////////

function Arc(context, p, start, end, r, color, transparency) {
  this.center = p;
  this.context = context;
  this.r = r;
  this.angleStart = toRadian(start);
  this.angleEnd = toRadian(end);
  this.color = (color ? color : "#000");
  this.transparency = (transparency ? transparency : 1);
}

Arc.prototype.stroke = function (close) {
  this.context.beginPath();
  if (this.color) {
    this.context.strokeStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.arc(this.center.x, this.center.y, this.r, this.angleStart, this.angleEnd);
  if (close) {
    this.context.closePath();
  }
  this.context.stroke();
}

Arc.prototype.fill = function () {
  this.context.beginPath();
  if (this.color) {
    this.context.fillStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.arc(this.center.x, this.center.y, this.r, this.angleStart, this.angleEnd);
  this.context.fill();
}


function Paint() {
  this.canvas = document.getElementById("drawingboard");
  this.context = this.canvas.getContext('2d');
  this.BUTT = 'butt';
  this.ROUND = 'round';
  this.SQUARE = 'square';
  this.LINE = 'line';
  this.RECT = 'rect';
  this.CIRCLE = 'circle';
  this.SELECT = 'select';
  
  this.currentTool = this.SELECT;
  this.basePoint = new Point(0, 0);
  
  this.isDrawing = false;
}

Paint.prototype.setLineWidth = function (width) {
  this.context.lineWidth = width;
};

//Paint.prototype.setStrokeColor = function (color) {
//  this.context.strokeStyle = color;
//};
//
//Paint.prototype.setFillColor = function (color) {
//  this.context.fillStyle = color;
//};

Paint.prototype.setLineCap = function (lineCap) {
  this.context.lineCap = lineCap;
};