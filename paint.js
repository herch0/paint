
function toRadian(degree) {
  return (degree * Math.PI / 180);
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return this.x + ", " + this.y;
}

function Dimension(w, h) {
  this.w = w;
  this.h = h;
}

function Pencil(context, color, transparency) {
  this.lines = [];
  this.context = context;
  this.color = (color ? color : "#000");
  this.transparency = (transparency ? transparency : 1);
}

Pencil.prototype.addLine = function (line) {
  this.lines.push(line);
};

Pencil.prototype.stroke = function () {
  this.context.beginPath();
  if (this.color) {
    this.context.strokeStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  var that = this;
  this.lines.forEach(function (element, index) {
    that.context.moveTo(element.p1.x, element.p1.y);
    that.context.lineTo(element.p2.x, element.p2.y);
    that.context.stroke();
  })
}

function Line(context, p1, p2, color, transparency) {
  this.p1 = p1;
  this.p2 = p2;
  this.context = context;
  this.color = (color ? color : "#000");
  this.transparency = (transparency ? transparency : 1);
}

Line.prototype.stroke = function () {
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

function Rect(context, basePoint, dimension, filled, color, transparency) {
  this.basePoint = basePoint;
  this.dimension = dimension;
  this.context = context;
  this.color = (color ? color : "#000");
  this.transparency = (transparency ? transparency : 1);
  this.filled = filled;
}

Rect.prototype.stroke = function () {
  this.context.beginPath();
  if (this.color) {
    this.context.strokeStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.strokeRect(this.basePoint.x, this.basePoint.y, this.dimension.w, this.dimension.h);
}

Rect.prototype.fill = function () {
  this.context.beginPath();
  if (this.color) {
    this.context.fillStyle = this.color;
  }
  if (this.transparency) {
    this.context.globalAlpha = this.transparency;
  }
  this.context.fillRect(this.basePoint.x, this.basePoint.y, this.dimension.w, this.dimension.h);
}

function Circle(context, center, r, filled, color, transparency) {
  this.center = center;
  this.context = context;
  this.r = r;
  this.angleStart = 0;
  this.angleEnd = Math.PI * 2;
  this.color = (color ? color : '#000');
  this.transparency = (transparency ? transparency : 1);
  this.filled = filled;
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
  this.PENCIL = 'pencil';
  this.RECT = 'rect';
  this.FILLED_RECT = 'f_rect';
  this.CIRCLE = 'circle';
  this.FILLED_CIRCLE = 'f_circle';
  this.SELECT = 'select';

  this.currentTool = this.SELECT;
  this.currentColor = 'black';
  this.basePoint = new Point(0, 0);
  this.previousPoint = this.basePoint;

  this.isDrawing = false;

  this.content = [];
}

Paint.prototype.clear = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Paint.prototype.repaint = function () {
  this.clear();
  this.content.forEach(function (element, index) {
    if (!element.filled) {
      element.stroke();
    } else {
      element.fill();
    }
  })
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

Paint.prototype.setCurrentTool = function (tool) {
  this.currentTool = tool;
  if (tool == this.CIRCLE || tool == this.FILLED_CIRCLE || tool == this.FILLED_RECT
          || tool == this.LINE || tool == this.RECT || tool == this.PENCIL) {
    this.canvas.style.cursor = 'pointer';
  } else if (tool == this.SELECT) {
    this.canvas.style.cursor = 'grab';
  } else {
    this.canvas.style.cursor = 'default';
  }

}