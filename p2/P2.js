(function (console, $hx_exports) { "use strict";
$hx_exports.openfl = $hx_exports.openfl || {};
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = true;
ApplicationMain.config = null;
ApplicationMain.preloader = null;
ApplicationMain.create = function() {
	var app = new lime_app_Application();
	app.create(ApplicationMain.config);
	openfl_Lib.application = app;
	var stage = new openfl_display_Stage(app.window.__width,app.window.__height,ApplicationMain.config.background);
	stage.window = app.window;
	stage.addChild(openfl_Lib.current);
	app.addModule(stage);
	var display = new NMEPreloader();
	ApplicationMain.preloader = new openfl_display_Preloader(display);
	ApplicationMain.preloader.onComplete = ApplicationMain.init;
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	if(ApplicationMain.config.assetsPrefix != null) {
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(types[i] != "FONT") urls[i] = ApplicationMain.config.assetsPrefix + urls[i];
		}
	}
	ApplicationMain.preloader.load(urls,types);
	var result = app.exec();
};
ApplicationMain.init = function() {
	var loaded = 0;
	var total = 0;
	var library_onLoad = function(__) {
		loaded++;
		if(loaded == total) ApplicationMain.start();
	};
	ApplicationMain.preloader = null;
	if(total == 0) ApplicationMain.start();
};
ApplicationMain.main = function() {
	ApplicationMain.config = { antialiasing : 0, background : 0, borderless : false, company : "echo", depthBuffer : false, file : "P2", fps : 60, fullscreen : false, hardware : true, height : 0, orientation : "", packageName : "P2", resizable : true, stencilBuffer : true, title : "P2", version : "1.0.0", vsync : false, width : 0};
};
ApplicationMain.start = function() {
	var hasMain = false;
	var entryPoint = Type.resolveClass("Main");
	var _g = 0;
	var _g1 = Type.getClassFields(entryPoint);
	while(_g < _g1.length) {
		var methodName = _g1[_g];
		++_g;
		if(methodName == "main") {
			hasMain = true;
			break;
		}
	}
	lime_Assets.initialize();
	if(hasMain) Reflect.callMethod(entryPoint,Reflect.field(entryPoint,"main"),[]); else {
		var instance = Type.createInstance(DocumentClass,[]);
	}
	openfl_Lib.current.stage.dispatchEvent(new openfl_events_Event(openfl_events_Event.RESIZE,false,false));
};
var openfl_events_IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl_events_IEventDispatcher;
openfl_events_IEventDispatcher.__name__ = true;
var openfl_events_EventDispatcher = function(target) {
	if(target != null) this.__targetDispatcher = target;
};
$hxClasses["openfl.events.EventDispatcher"] = openfl_events_EventDispatcher;
openfl_events_EventDispatcher.__name__ = true;
openfl_events_EventDispatcher.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_events_EventDispatcher.__sortByPriority = function(l1,l2) {
	if(l1.priority == l2.priority) return 0; else if(l1.priority > l2.priority) return -1; else return 1;
};
openfl_events_EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) {
			this.__dispatching = new haxe_ds_StringMap();
			this.__eventMap = new haxe_ds_StringMap();
			this.__newEventMap = new haxe_ds_StringMap();
		}
		if(!this.__eventMap.exists(type)) {
			var list = [];
			list.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			this.__eventMap.set(type,list);
		} else {
			var list1;
			if(this.__dispatching.get(type) == true) {
				if(!this.__newEventMap.exists(type)) {
					var _this = this.__eventMap.get(type);
					list1 = _this.slice();
					this.__newEventMap.set(type,list1);
				} else list1 = this.__newEventMap.get(type);
			} else list1 = this.__eventMap.get(type);
			var _g1 = 0;
			var _g = list1.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(Reflect.compareMethods(list1[i].callback,listener)) return;
			}
			list1.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			list1.sort(openfl_events_EventDispatcher.__sortByPriority);
		}
	}
	,dispatchEvent: function(event) {
		if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		return this.__dispatchEvent(event);
	}
	,hasEventListener: function(type) {
		if(this.__eventMap == null) return false;
		return this.__eventMap.exists(type);
	}
	,removeEventListener: function(type,listener,capture) {
		if(capture == null) capture = false;
		if(this.__eventMap == null) return;
		var list = this.__eventMap.get(type);
		if(list == null) return;
		var dispatching = this.__dispatching.get(type) == true;
		if(dispatching) {
			if(!this.__newEventMap.exists(type)) {
				var _this = this.__eventMap.get(type);
				list = _this.slice();
				this.__newEventMap.set(type,list);
			} else list = this.__newEventMap.get(type);
		}
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].match(listener,capture)) {
				list.splice(i,1);
				break;
			}
		}
		if(!dispatching) {
			if(list.length == 0) this.__eventMap.remove(type);
			if(!this.__eventMap.iterator().hasNext()) {
				this.__eventMap = null;
				this.__newEventMap = null;
			}
		}
	}
	,__dispatchEvent: function(event) {
		if(this.__eventMap == null || event == null) return false;
		var type = event.type;
		var list;
		if(this.__dispatching.get(type) == true) {
			list = this.__newEventMap.get(type);
			if(list == null) return false;
			list = list.slice();
		} else {
			list = this.__eventMap.get(type);
			if(list == null) return false;
			this.__dispatching.set(type,true);
		}
		if(event.target == null) {
			if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		}
		event.currentTarget = this;
		var capture = event.eventPhase == openfl_events_EventPhase.CAPTURING_PHASE;
		var index = 0;
		var listener;
		while(index < list.length) {
			listener = list[index];
			if(listener.useCapture == capture) {
				listener.callback(event);
				if(event.__isCancelledNow) break;
			}
			if(listener == list[index]) index++;
		}
		if(this.__newEventMap != null && this.__newEventMap.exists(type)) {
			var list1 = this.__newEventMap.get(type);
			if(list1.length > 0) this.__eventMap.set(type,list1); else this.__eventMap.remove(type);
			if(!this.__eventMap.iterator().hasNext()) {
				this.__eventMap = null;
				this.__newEventMap = null;
			} else this.__newEventMap.remove(type);
		}
		this.__dispatching.set(event.type,false);
		return true;
	}
	,__class__: openfl_events_EventDispatcher
};
var openfl_display_IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl_display_IBitmapDrawable;
openfl_display_IBitmapDrawable.__name__ = true;
var openfl_display_DisplayObject = function() {
	this.__maskCached = false;
	openfl_events_EventDispatcher.call(this);
	this.__alpha = 1;
	this.__rotation = 0;
	this.__scaleX = 1;
	this.__scaleY = 1;
	this.__visible = true;
	this.__x = 0;
	this.__y = 0;
	this.__worldAlpha = 1;
	this.__worldTransform = new openfl_geom_Matrix();
	this.__rotationCache = 0;
	this.__rotationSine = 0;
	this.__rotationCosine = 1;
	this.__worldColorTransform = new openfl_geom_ColorTransform();
	this.set_name("instance" + ++openfl_display_DisplayObject.__instanceCount);
};
$hxClasses["openfl.display.DisplayObject"] = openfl_display_DisplayObject;
openfl_display_DisplayObject.__name__ = true;
openfl_display_DisplayObject.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_DisplayObject.__super__ = openfl_events_EventDispatcher;
openfl_display_DisplayObject.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	globalToLocal: function(pos) {
		this.__getTransform().__transformInversePoint(pos.clone());
		return pos;
	}
	,__broadcast: function(event,notifyChilden) {
		if(this.__eventMap != null && this.hasEventListener(event.type)) {
			var result = openfl_events_EventDispatcher.prototype.__dispatchEvent.call(this,event);
			if(event.__isCancelled) return true;
			return result;
		}
		return false;
	}
	,__dispatchEvent: function(event) {
		var result = openfl_events_EventDispatcher.prototype.__dispatchEvent.call(this,event);
		if(event.__isCancelled) return true;
		if(event.bubbles && this.parent != null && this.parent != this) {
			event.eventPhase = openfl_events_EventPhase.BUBBLING_PHASE;
			if(event.target == null) event.target = this;
			this.parent.__dispatchEvent(event);
		}
		return result;
	}
	,__enterFrame: function() {
	}
	,__getBounds: function(rect,matrix) {
		if(this.__graphics != null) this.__graphics.__getBounds(rect,matrix);
	}
	,__getCursor: function() {
		return null;
	}
	,__getInteractive: function(stack) {
		return false;
	}
	,__getTransform: function() {
		if(this.__transformDirty || openfl_display_DisplayObject.__worldTransformDirty > 0) {
			var list = [];
			var current = this;
			var transformDirty = this.__transformDirty;
			if(this.parent == null) {
				if(transformDirty) this.__update(true,false);
			} else while(current.parent != null) {
				list.push(current);
				current = current.parent;
				if(current.__transformDirty) transformDirty = true;
			}
			if(transformDirty) {
				var i = list.length;
				while(--i >= 0) list[i].__update(true,false);
			}
		}
		return this.__worldTransform;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(this.__graphics != null) {
			if(this.get_visible() && !this.__isMask && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
				if(!interactiveOnly) stack.push(this);
				return true;
			}
		}
		return false;
	}
	,__renderCairo: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoShape.render(this,renderSession);
	}
	,__renderCairoMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoGraphics.renderMask(this.__graphics,renderSession);
	}
	,__renderCanvas: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasShape.render(this,renderSession);
	}
	,__renderCanvasMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasGraphics.renderMask(this.__graphics,renderSession);
	}
	,__renderDOM: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_dom_DOMShape.render(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) {
			if(this.__graphics.__hardware) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render(this,renderSession); else {
				openfl__$internal_renderer_canvas_CanvasGraphics.render(this.__graphics,renderSession);
				openfl__$internal_renderer_opengl_GLRenderer.renderBitmap(this,renderSession);
			}
		}
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
		}
	}
	,__setRenderDirty: function() {
		if(!this.__renderDirty) {
			this.__renderDirty = true;
			openfl_display_DisplayObject.__worldRenderDirty++;
		}
	}
	,__update: function(transformOnly,updateChildren,maskGraphics) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(this.get_rotation() != this.__rotationCache) {
			this.__rotationCache = this.get_rotation();
			var radians = this.get_rotation() * (Math.PI / 180);
			this.__rotationSine = Math.sin(radians);
			this.__rotationCosine = Math.cos(radians);
		}
		var sr = this.get_scrollRect();
		if(this.parent != null) {
			var parentTransform = this.parent.__worldTransform;
			var a00 = this.__rotationCosine * this.get_scaleX();
			var a01 = this.__rotationSine * this.get_scaleX();
			var a10 = -this.__rotationSine * this.get_scaleY();
			var a11 = this.__rotationCosine * this.get_scaleY();
			var b00 = parentTransform.a;
			var b01 = parentTransform.b;
			var b10 = parentTransform.c;
			var b11 = parentTransform.d;
			if(this.__worldTransform == null) this.__worldTransform = new openfl_geom_Matrix();
			this.__worldTransform.a = a00 * b00 + a01 * b10;
			this.__worldTransform.b = a00 * b01 + a01 * b11;
			this.__worldTransform.c = a10 * b00 + a11 * b10;
			this.__worldTransform.d = a10 * b01 + a11 * b11;
			this.__worldTransform.tx = this.get_x() * b00 + this.get_y() * b10 + parentTransform.tx;
			this.__worldTransform.ty = this.get_x() * b01 + this.get_y() * b11 + parentTransform.ty;
			if(sr != null) {
				if(this.__worldTransform.a != 1 || this.__worldTransform.b != 0 || this.__worldTransform.c != 0 || this.__worldTransform.d != 1) sr.__transform(sr,this.__worldTransform);
				this.__worldTransform.tx = (this.get_x() - sr.x) * b00 + (this.get_y() - sr.y) * b10 + parentTransform.tx;
				this.__worldTransform.ty = (this.get_x() - sr.x) * b01 + (this.get_y() - sr.y) * b11 + parentTransform.ty;
			}
			if(this.__isMask) this.__maskCached = false;
		} else {
			this.__worldTransform.a = this.__rotationCosine * this.get_scaleX();
			this.__worldTransform.c = -this.__rotationSine * this.get_scaleY();
			this.__worldTransform.b = this.__rotationSine * this.get_scaleX();
			this.__worldTransform.d = this.__rotationCosine * this.get_scaleY();
			this.__worldTransform.tx = this.get_x();
			this.__worldTransform.ty = this.get_y();
			if(sr != null) {
				if(this.__worldTransform.a != 1 || this.__worldTransform.b != 0 || this.__worldTransform.c != 0 || this.__worldTransform.d != 1) sr.__transform(sr,this.__worldTransform);
				this.__worldTransform.tx = this.get_x() - this.get_scrollRect().x;
				this.__worldTransform.ty = this.get_y() - this.get_scrollRect().y;
			}
		}
		if(updateChildren && this.__transformDirty) {
			this.__transformDirty = false;
			openfl_display_DisplayObject.__worldTransformDirty--;
		}
		if(!transformOnly && this.__mask != null && !this.__mask.__maskCached) {
			if(this.__maskGraphics == null) this.__maskGraphics = new openfl_display_Graphics();
			this.__maskGraphics.clear();
			this.__mask.__update(true,true,this.__maskGraphics);
			this.__mask.__maskCached = true;
		}
		if(maskGraphics != null) this.__updateMask(maskGraphics);
		if(!transformOnly) {
			if(!this.__worldColorTransform.__equals(this.get_transform().get_colorTransform())) this.__worldColorTransform = this.get_transform().get_colorTransform().__clone();
			if(this.parent != null) {
				this.__worldAlpha = this.get_alpha() * this.parent.__worldAlpha;
				this.__worldColorTransform.__combine(this.parent.__worldColorTransform);
				if(this.blendMode == null || this.blendMode == openfl_display_BlendMode.NORMAL) this.__blendMode = this.parent.__blendMode;
			} else this.__worldAlpha = this.get_alpha();
			if(updateChildren && this.__renderDirty) this.__renderDirty = false;
		}
	}
	,__updateChildren: function(transformOnly) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(!this.__renderable && !this.__isMask) return;
		this.__worldAlpha = this.get_alpha();
		if(this.__transformDirty) {
			this.__transformDirty = false;
			openfl_display_DisplayObject.__worldTransformDirty--;
		}
	}
	,__updateMask: function(maskGraphics) {
		if(this.__graphics != null) {
			maskGraphics.__commands.push(openfl_display_DrawCommand.OverrideMatrix(this.__worldTransform));
			maskGraphics.__commands = maskGraphics.__commands.concat(this.__graphics.__commands);
			maskGraphics.set___dirty(true);
			maskGraphics.__visible = true;
			if(maskGraphics.__bounds == null) maskGraphics.__bounds = new openfl_geom_Rectangle();
			this.__graphics.__getBounds(maskGraphics.__bounds,openfl_geom_Matrix.__identity);
		}
	}
	,get_alpha: function() {
		return this.__alpha;
	}
	,set_name: function(value) {
		return this.__name = value;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,get_scaleX: function() {
		return this.__scaleX;
	}
	,set_scaleX: function(value) {
		if(value != this.__scaleX) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleX = value;
	}
	,get_scaleY: function() {
		return this.__scaleY;
	}
	,get_scrollRect: function() {
		if(this.__scrollRect == null) return null;
		return this.__scrollRect.clone();
	}
	,get_transform: function() {
		if(this.__transform == null) this.__transform = new openfl_geom_Transform(this);
		return this.__transform;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,get_x: function() {
		return this.__x;
	}
	,set_x: function(value) {
		if(value != this.__x) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__x = value;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_y: function(value) {
		if(value != this.__y) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__y = value;
	}
	,__class__: openfl_display_DisplayObject
});
var openfl_display_InteractiveObject = function() {
	openfl_display_DisplayObject.call(this);
	this.doubleClickEnabled = false;
	this.mouseEnabled = true;
	this.needsSoftKeyboard = false;
	this.tabEnabled = true;
	this.tabIndex = -1;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl_display_InteractiveObject;
openfl_display_InteractiveObject.__name__ = true;
openfl_display_InteractiveObject.__super__ = openfl_display_DisplayObject;
openfl_display_InteractiveObject.prototype = $extend(openfl_display_DisplayObject.prototype,{
	__getInteractive: function(stack) {
		if(stack != null) {
			stack.push(this);
			if(this.parent != null) this.parent.__getInteractive(stack);
		}
		return true;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || this.__isMask || interactiveOnly && !this.mouseEnabled) return false;
		return openfl_display_DisplayObject.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly);
	}
	,__class__: openfl_display_InteractiveObject
});
var openfl_display_DisplayObjectContainer = function() {
	openfl_display_InteractiveObject.call(this);
	this.mouseChildren = true;
	this.__children = [];
	this.__removedChildren = [];
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl_display_DisplayObjectContainer;
openfl_display_DisplayObjectContainer.__name__ = true;
openfl_display_DisplayObjectContainer.__super__ = openfl_display_InteractiveObject;
openfl_display_DisplayObjectContainer.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	addChild: function(child) {
		if(child != null) {
			if(child.parent != null) child.parent.removeChild(child);
			this.__children.push(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			var event = new openfl_events_Event(openfl_events_Event.ADDED,true);
			event.target = child;
			child.__dispatchEvent(event);
		}
		return child;
	}
	,removeChild: function(child) {
		if(child != null && child.parent == this) {
			if(this.stage != null) child.__setStageReference(null);
			child.parent = null;
			HxOverrides.remove(this.__children,child);
			this.__removedChildren.push(child);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			child.__dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED,true));
		}
		return child;
	}
	,__broadcast: function(event,notifyChilden) {
		if(event.target == null) event.target = this;
		var result = openfl_display_InteractiveObject.prototype.__broadcast.call(this,event,notifyChilden);
		if(!event.__isCancelled && notifyChilden) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__broadcast(event,true);
				if(event.__isCancelled) return true;
			}
		}
		return result;
	}
	,__enterFrame: function() {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__enterFrame();
		}
	}
	,__getBounds: function(rect,matrix) {
		openfl_display_InteractiveObject.prototype.__getBounds.call(this,rect,matrix);
		if(this.__children.length == 0) return;
		var matrixCache = null;
		if(matrix != null) {
			matrixCache = this.__worldTransform;
			this.__worldTransform = matrix;
			this.__updateChildren(true);
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(!child.__renderable) continue;
			child.__getBounds(rect,child.__worldTransform);
		}
		if(matrix != null) {
			this.__worldTransform = matrixCache;
			this.__updateChildren(true);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || this.__isMask || interactiveOnly && !this.mouseEnabled && !this.mouseChildren) return false;
		if(this.get_scrollRect() != null && !this.get_scrollRect().containsPoint(this.globalToLocal(new openfl_geom_Point(x,y)))) return false;
		var i = this.__children.length;
		if(interactiveOnly) {
			if(stack == null || !this.mouseChildren) {
				while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,null,true)) {
					if(stack != null) stack.push(this);
					return true;
				}
			} else if(stack != null) {
				var length = stack.length;
				var interactive = false;
				var hitTest = false;
				while(--i >= 0) {
					interactive = this.__children[i].__getInteractive(null);
					if(interactive || this.mouseEnabled && !hitTest) {
						if(this.__children[i].__hitTest(x,y,shapeFlag,stack,true)) {
							hitTest = true;
							if(interactive) break;
						}
					}
				}
				if(hitTest) {
					stack.splice(length,0,this);
					return true;
				}
			}
		} else while(--i >= 0) this.__children[i].__hitTest(x,y,shapeFlag,stack,false);
		return false;
	}
	,__renderCairo: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		openfl_display_InteractiveObject.prototype.__renderCairo.call(this,renderSession);
		if(this.get_scrollRect() != null) renderSession.maskManager.pushRect(this.get_scrollRect(),this.__worldTransform);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCairo(renderSession);
		}
		if(this.__removedChildren.length > 0) this.__removedChildren.splice(0,this.__removedChildren.length);
		if(this.__mask != null) renderSession.maskManager.popMask();
		if(this.get_scrollRect() != null) renderSession.maskManager.popMask();
	}
	,__renderCairoMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoGraphics.renderMask(this.__graphics,renderSession);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCairoMask(renderSession);
		}
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		openfl_display_InteractiveObject.prototype.__renderCanvas.call(this,renderSession);
		if(this.get_scrollRect() != null) renderSession.maskManager.pushRect(this.get_scrollRect(),this.__worldTransform);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCanvas(renderSession);
		}
		if(this.__removedChildren.length > 0) this.__removedChildren.splice(0,this.__removedChildren.length);
		if(this.__mask != null) renderSession.maskManager.popMask();
		if(this.get_scrollRect() != null) renderSession.maskManager.popMask();
	}
	,__renderCanvasMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasGraphics.renderMask(this.__graphics,renderSession);
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		renderSession.context.rect(0,0,bounds.width,bounds.height);
	}
	,__renderDOM: function(renderSession) {
		openfl_display_InteractiveObject.prototype.__renderDOM.call(this,renderSession);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderDOM(renderSession);
		}
		var _g2 = 0;
		var _g11 = this.__removedChildren;
		while(_g2 < _g11.length) {
			var orphan = _g11[_g2];
			++_g2;
			if(orphan.stage == null) orphan.__renderDOM(renderSession);
		}
		if(this.__removedChildren.length > 0) this.__removedChildren.splice(0,this.__removedChildren.length);
		if(this.__mask != null) renderSession.maskManager.popMask();
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.get_scrollRect() != null) {
			renderSession.spriteBatch.stop();
			var m = this.__worldTransform.clone();
			var clip = openfl_geom_Rectangle.__temp;
			this.get_scrollRect().__transform(clip,m);
			clip.y = renderSession.renderer.height - clip.y - clip.height;
			renderSession.spriteBatch.start(clip);
		}
		var masked = this.__mask != null && this.__maskGraphics != null && this.__maskGraphics.__commands.length > 0;
		if(masked) {
			renderSession.spriteBatch.stop();
			renderSession.maskManager.pushMask(this);
			renderSession.spriteBatch.start();
		}
		openfl_display_InteractiveObject.prototype.__renderGL.call(this,renderSession);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderGL(renderSession);
		}
		if(masked) {
			renderSession.spriteBatch.stop();
			renderSession.maskManager.popMask();
			renderSession.spriteBatch.start();
		}
		if(this.get_scrollRect() != null) {
			renderSession.spriteBatch.stop();
			renderSession.spriteBatch.start();
		}
		if(this.__removedChildren.length > 0) this.__removedChildren.splice(0,this.__removedChildren.length);
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.__dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.__dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
			if(this.__children != null) {
				var _g = 0;
				var _g1 = this.__children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.__setStageReference(stage);
				}
			}
		}
	}
	,__update: function(transformOnly,updateChildren,maskGraphics) {
		openfl_display_InteractiveObject.prototype.__update.call(this,transformOnly,updateChildren,maskGraphics);
		if(!this.__renderable && !this.__isMask) return;
		if(updateChildren) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__update(transformOnly,true,maskGraphics);
			}
		}
	}
	,__updateChildren: function(transformOnly) {
		openfl_display_InteractiveObject.prototype.__updateChildren.call(this,transformOnly);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__update(transformOnly,true);
		}
	}
	,__class__: openfl_display_DisplayObjectContainer
});
var openfl_display_Sprite = function() {
	openfl_display_DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.useHandCursor = true;
	this.loaderInfo = openfl_display_LoaderInfo.create(null);
};
$hxClasses["openfl.display.Sprite"] = openfl_display_Sprite;
openfl_display_Sprite.__name__ = true;
openfl_display_Sprite.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Sprite.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	__getCursor: function() {
		if(this.buttonMode && this.useHandCursor) return lime_ui_MouseCursor.POINTER; else return null;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || this.__isMask || interactiveOnly && !this.mouseEnabled && !this.mouseChildren) return false;
		if(openfl_display_DisplayObjectContainer.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly)) return interactiveOnly; else if((!interactiveOnly || this.mouseEnabled) && this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,get_graphics: function() {
		if(this.__graphics == null) {
			this.__graphics = new openfl_display_Graphics();
			this.__graphics.__owner = this;
		}
		return this.__graphics;
	}
	,__class__: openfl_display_Sprite
});
var Main = function() {
	var _g = this;
	openfl_display_Sprite.call(this);
	console.log("hello");
	var p2p = new az_js_P2p();
	p2p.limitedListConnect(["1","2","3"],function(id) {
		console.log("ready");
		p2p.ping(id);
		p2p.commands.set("mov",function(e) {
			_g.get_graphics().clear();
			_g.get_graphics().beginFill(e.color,1);
			_g.get_graphics().drawCircle(e.x,e.y,10);
			_g.get_graphics().endFill();
		});
	});
	var color = Math.floor(Math.random() * 16777215);
	this.stage.addEventListener(openfl_events_MouseEvent.MOUSE_MOVE,function(_) {
		p2p.sendToAll("mov",{ x : _g.stage.get_mouseX(), y : _g.stage.get_mouseY(), color : color});
	});
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.__super__ = openfl_display_Sprite;
Main.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: Main
});
var DocumentClass = function() {
	openfl_Lib.current.addChild(this);
	Main.call(this);
	this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = true;
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	__class__: DocumentClass
});
var lime_AssetLibrary = function() {
};
$hxClasses["lime.AssetLibrary"] = lime_AssetLibrary;
lime_AssetLibrary.__name__ = true;
lime_AssetLibrary.prototype = {
	unload: function() {
	}
	,__class__: lime_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.path = new haxe_ds_StringMap();
	lime_AssetLibrary.call(this);
	var id;
	var assetsPrefix = ApplicationMain.config.assetsPrefix;
	if(assetsPrefix != null) {
		var $it0 = this.path.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = assetsPrefix + this.path.get(k);
			this.path.set(k,value);
		}
	}
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = true;
DefaultAssetLibrary.__super__ = lime_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime_AssetLibrary.prototype,{
	__class__: DefaultAssetLibrary
});
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Math.__name__ = true;
var NMEPreloader = function() {
	openfl_display_Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 7;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 2;
	this.outline = new openfl_display_Sprite();
	this.outline.get_graphics().beginFill(color,0.07);
	this.outline.get_graphics().drawRect(0,0,width,height);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl_display_Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = true;
NMEPreloader.__super__ = openfl_display_Sprite;
NMEPreloader.prototype = $extend(openfl_display_Sprite.prototype,{
	getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		var height = 0;
		if(height > 0) return height; else return openfl_Lib.current.stage.stageHeight;
	}
	,getWidth: function() {
		var width = 0;
		if(width > 0) return width; else return openfl_Lib.current.stage.stageWidth;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
var az_js_P2p = function() {
	this.commands = new haxe_ds_StringMap();
	this.peerConnectionMap = new haxe_ds_StringMap();
	this.connections = [];
	this.commands.set("ping",$bind(this,this.receivePing));
	this.commands.set("pong",$bind(this,this.receivePong));
};
$hxClasses["az.js.P2p"] = az_js_P2p;
az_js_P2p.__name__ = true;
az_js_P2p.prototype = {
	limitedListConnect: function(ids,onFoundNeighbor) {
		var _g = this;
		var tryConnect;
		var tryConnect1 = null;
		tryConnect1 = function(i) {
			if(i < ids.length) {
				var id = ids[i];
				console.log("try connect with " + id);
				var p = new Peer(id,{ key : "h225oppvxe83q5mi", config : { iceServers : az_js_P2p.ICESERVERS}});
				var onError = function(data) {
					console.log("error " + Std.string(data.type) + " at " + id + ": " + Std.string(data));
					if(data.type == "unavailable-id") {
						p.removeListener("open");
						p.removeListener("error");
						p.destroy();
						tryConnect1(++i);
					}
				};
				var onOpen = function(data1) {
					console.log("success at " + id);
					p.removeListener("open");
					p.removeListener("error");
					_g.peer = _g.addPeerListeners(p);
					var _g1 = 0;
					while(_g1 < ids.length) {
						var n = [ids[_g1]];
						++_g1;
						if(n[0] == _g.peer.id) continue;
						var c = [p.connect(n[0],{ })];
						c[0].on("open",(function(c,n) {
							return function(data2) {
								console.log("found new neighbor " + c[0].peer);
								_g.addConnectionListeners(c[0]);
								_g.connections.push(c[0]);
								_g.peerConnectionMap.set(c[0].peer,c[0]);
								if(onFoundNeighbor != null) onFoundNeighbor(n[0]);
							};
						})(c,n));
					}
				};
				p.on("open",onOpen);
				p.on("error",onError);
			} else return console.log("no moar free id");
		};
		tryConnect = tryConnect1;
		tryConnect(0);
	}
	,addPeerListeners: function(p) {
		var _g = this;
		p.on("close",function(data) {
			console.log("p2p -> p close");
			p.removeListener("close");
			p.removeListener("error");
			p.removeListener("connection");
			p.removeListener("disconnected");
			p.destroy();
		});
		p.on("error",function(data1) {
			console.log("p2p -> p error " + Std.string(data1.type) + " " + Std.string(data1));
		});
		p.on("connection",function(c) {
			console.log("p2p -> p conection");
			console.log("there new neighbor " + c.peer);
			_g.addConnectionListeners(c);
			_g.connections.push(c);
			_g.peerConnectionMap.set(c.peer,c);
		});
		p.on("disconnected",function(data2) {
			console.log("p2p -> p disconnected");
		});
		return p;
	}
	,addConnectionListeners: function(c) {
		var _g = this;
		c.on("data",function(data) {
			console.log("p2p -> c data received");
			_g.receive(data);
		});
		c.on("error",function(data1) {
			console.log("p2p -> c error " + Std.string(data1.type));
		});
		c.on("open",function(data2) {
			console.log("p2p -> c open");
		});
		c.on("close",function() {
			console.log("p2p -> c close");
			HxOverrides.remove(_g.connections,c);
			_g.peerConnectionMap.remove(c.peer);
			c.removeListener("data");
			c.removeListener("error");
			c.removeListener("open");
			c.removeListener("close");
			c.close();
		});
		return c;
	}
	,receive: function(data) {
		if(data.cmd != null && (function($this) {
			var $r;
			var key = data.cmd;
			$r = $this.commands.exists(key);
			return $r;
		}(this))) ((function($this) {
			var $r;
			var key1 = data.cmd;
			$r = $this.commands.get(key1);
			return $r;
		}(this)))(data);
	}
	,sendToAll: function(cmd,data) {
		if(this.peer == null) return;
		data.cmd = cmd;
		data.id = this.peer.id;
		data.seq = ++az_js_P2p._sequence;
		var _g = 0;
		var _g1 = this.connections;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.send(data);
		}
	}
	,send: function(to,cmd,data) {
		if(this.peer == null) return;
		data.cmd = cmd;
		data.id = this.peer.id;
		data.seq = ++az_js_P2p._sequence;
		this.peerConnectionMap.get(to).send(data);
	}
	,ping: function(to) {
		console.log("ping to " + to);
		this.send(to,"ping",{ ping : new Date().getTime()});
	}
	,receivePing: function(data) {
		console.log("" + Std.string(data.id) + ": ping " + (new Date().getTime() - data.ping));
		this.send(data.id,"pong",{ ping : data.ping, pong : new Date().getTime()});
	}
	,receivePong: function(data) {
		console.log("" + Std.string(data.id) + ": ping " + (data.pong - data.ping) + " pong " + (new Date().getTime() - data.pong) + " (" + (new Date().getTime() - data.ping) + ")");
	}
	,__class__: az_js_P2p
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$Vector_Vector_$Impl_$ = {};
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe_ds__$Vector_Vector_$Impl_$;
haxe_ds__$Vector_Vector_$Impl_$.__name__ = true;
haxe_ds__$Vector_Vector_$Impl_$.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
};
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = true;
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Object.prototype.hasOwnProperty.call(val,"name")) this.name = Reflect.field(val,"name"); else this.name = "Error";
	if(Object.prototype.hasOwnProperty.call(val,"message")) this.message = Reflect.field(val,"message"); else this.message = Std.string(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var lime_AssetCache = function() {
	this.audio = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.image = new haxe_ds_StringMap();
};
$hxClasses["lime.AssetCache"] = lime_AssetCache;
lime_AssetCache.__name__ = true;
lime_AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe_ds_StringMap();
			this.font = new haxe_ds_StringMap();
			this.image = new haxe_ds_StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime_AssetCache
};
var lime_Assets = function() { };
$hxClasses["lime.Assets"] = lime_Assets;
lime_Assets.__name__ = true;
lime_Assets.initialize = function() {
	if(!lime_Assets.initialized) {
		lime_Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime_Assets.initialized = true;
	}
};
lime_Assets.registerLibrary = function(name,library) {
	if(lime_Assets.libraries.exists(name)) lime_Assets.unloadLibrary(name);
	if(library != null) library.eventCallback = lime_Assets.library_onEvent;
	lime_Assets.libraries.set(name,library);
};
lime_Assets.unloadLibrary = function(name) {
	lime_Assets.initialize();
	var library = lime_Assets.libraries.get(name);
	if(library != null) {
		lime_Assets.cache.clear(name + ":");
		library.unload();
		library.eventCallback = null;
	}
	lime_Assets.libraries.remove(name);
};
lime_Assets.library_onEvent = function(library,type) {
	if(type == "change") lime_Assets.cache.clear();
};
var lime__$backend_html5_HTML5Application = function(parent) {
	this.parent = parent;
	this.currentUpdate = 0;
	this.lastUpdate = 0;
	this.nextUpdate = 0;
	this.framePeriod = -1;
	lime_audio_AudioManager.init();
};
$hxClasses["lime._backend.html5.HTML5Application"] = lime__$backend_html5_HTML5Application;
lime__$backend_html5_HTML5Application.__name__ = true;
lime__$backend_html5_HTML5Application.prototype = {
	convertKeyCode: function(keyCode) {
		if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
		switch(keyCode) {
		case 16:
			return 1073742049;
		case 17:
			return 1073742048;
		case 18:
			return 1073742050;
		case 20:
			return 1073741881;
		case 144:
			return 1073741907;
		case 37:
			return 1073741904;
		case 38:
			return 1073741906;
		case 39:
			return 1073741903;
		case 40:
			return 1073741905;
		case 45:
			return 1073741897;
		case 46:
			return 127;
		case 36:
			return 1073741898;
		case 35:
			return 1073741901;
		case 33:
			return 1073741899;
		case 34:
			return 1073741902;
		case 112:
			return 1073741882;
		case 113:
			return 1073741883;
		case 114:
			return 1073741884;
		case 115:
			return 1073741885;
		case 116:
			return 1073741886;
		case 117:
			return 1073741887;
		case 118:
			return 1073741888;
		case 119:
			return 1073741889;
		case 120:
			return 1073741890;
		case 121:
			return 1073741891;
		case 122:
			return 1073741892;
		case 123:
			return 1073741893;
		}
		return keyCode;
	}
	,create: function(config) {
		this.parent.config = config;
		if(config != null) {
			this.setFrameRate(config.fps);
			var $window = new lime_ui_Window(config);
			var renderer = new lime_graphics_Renderer($window);
			this.parent.addWindow($window);
			this.parent.addRenderer(renderer);
			this.parent.init(renderer.context);
		}
	}
	,exec: function() {
		window.addEventListener("keydown",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("keyup",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("focus",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("blur",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("resize",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleWindowEvent),false);
		
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
										   || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		this.lastUpdate = new Date().getTime();
		this.handleUpdateEvent();
		return 0;
	}
	,handleKeyEvent: function(event) {
		if(this.parent.window != null) {
			var _g = event.keyCode;
			switch(_g) {
			case 32:case 37:case 38:case 39:case 40:
				event.preventDefault();
				break;
			}
			var keyCode = this.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
			var modifier;
			modifier = (event.shiftKey?3:0) | (event.ctrlKey?192:0) | (event.altKey?768:0) | (event.metaKey?3072:0);
			if(event.type == "keydown") {
				var listeners = this.parent.window.onKeyDown.listeners;
				var repeat = this.parent.window.onKeyDown.repeat;
				var i = 0;
				while(i < listeners.length) {
					listeners[i](keyCode,modifier);
					if(!repeat[i]) this.parent.window.onKeyDown.remove(listeners[i]); else i++;
				}
			} else {
				var listeners1 = this.parent.window.onKeyUp.listeners;
				var repeat1 = this.parent.window.onKeyUp.repeat;
				var i1 = 0;
				while(i1 < listeners1.length) {
					listeners1[i1](keyCode,modifier);
					if(!repeat1[i1]) this.parent.window.onKeyUp.remove(listeners1[i1]); else i1++;
				}
			}
		}
	}
	,handleUpdateEvent: function(__) {
		this.currentUpdate = new Date().getTime();
		if(this.currentUpdate >= this.nextUpdate) {
			this.deltaTime = this.currentUpdate - this.lastUpdate;
			var listeners = this.parent.onUpdate.listeners;
			var repeat = this.parent.onUpdate.repeat;
			var i = 0;
			while(i < listeners.length) {
				listeners[i](this.deltaTime | 0);
				if(!repeat[i]) this.parent.onUpdate.remove(listeners[i]); else i++;
			}
			if(this.parent.renderer != null) {
				var listeners1 = this.parent.renderer.onRender.listeners;
				var repeat1 = this.parent.renderer.onRender.repeat;
				var i1 = 0;
				while(i1 < listeners1.length) {
					listeners1[i1](this.parent.renderer.context);
					if(!repeat1[i1]) this.parent.renderer.onRender.remove(listeners1[i1]); else i1++;
				}
				this.parent.renderer.flip();
			}
			if(this.framePeriod < 0) {
				this.nextUpdate = this.currentUpdate;
				this.nextUpdate = this.currentUpdate;
			} else this.nextUpdate = this.currentUpdate + this.framePeriod;
			this.lastUpdate = this.currentUpdate;
		}
		window.requestAnimationFrame($bind(this,this.handleUpdateEvent));
	}
	,handleWindowEvent: function(event) {
		if(this.parent.window != null) {
			var _g = event.type;
			switch(_g) {
			case "focus":
				var listeners = this.parent.window.onWindowFocusIn.listeners;
				var repeat = this.parent.window.onWindowFocusIn.repeat;
				var i = 0;
				while(i < listeners.length) {
					listeners[i]();
					if(!repeat[i]) this.parent.window.onWindowFocusIn.remove(listeners[i]); else i++;
				}
				var listeners1 = this.parent.window.onWindowActivate.listeners;
				var repeat1 = this.parent.window.onWindowActivate.repeat;
				var i1 = 0;
				while(i1 < listeners1.length) {
					listeners1[i1]();
					if(!repeat1[i1]) this.parent.window.onWindowActivate.remove(listeners1[i1]); else i1++;
				}
				break;
			case "blur":
				var listeners2 = this.parent.window.onWindowFocusOut.listeners;
				var repeat2 = this.parent.window.onWindowFocusOut.repeat;
				var i2 = 0;
				while(i2 < listeners2.length) {
					listeners2[i2]();
					if(!repeat2[i2]) this.parent.window.onWindowFocusOut.remove(listeners2[i2]); else i2++;
				}
				var listeners3 = this.parent.window.onWindowDeactivate.listeners;
				var repeat3 = this.parent.window.onWindowDeactivate.repeat;
				var i3 = 0;
				while(i3 < listeners3.length) {
					listeners3[i3]();
					if(!repeat3[i3]) this.parent.window.onWindowDeactivate.remove(listeners3[i3]); else i3++;
				}
				break;
			case "resize":
				var cacheWidth = this.parent.window.__width;
				var cacheHeight = this.parent.window.__height;
				this.parent.window.backend.handleResize();
				if(this.parent.window.__width != cacheWidth || this.parent.window.__height != cacheHeight) {
					var listeners4 = this.parent.window.onWindowResize.listeners;
					var repeat4 = this.parent.window.onWindowResize.repeat;
					var i4 = 0;
					while(i4 < listeners4.length) {
						listeners4[i4](this.parent.window.__width,this.parent.window.__height);
						if(!repeat4[i4]) this.parent.window.onWindowResize.remove(listeners4[i4]); else i4++;
					}
				}
				break;
			case "beforeunload":
				var listeners5 = this.parent.window.onWindowClose.listeners;
				var repeat5 = this.parent.window.onWindowClose.repeat;
				var i5 = 0;
				while(i5 < listeners5.length) {
					listeners5[i5]();
					if(!repeat5[i5]) this.parent.window.onWindowClose.remove(listeners5[i5]); else i5++;
				}
				break;
			}
		}
	}
	,setFrameRate: function(value) {
		if(value >= 60) this.framePeriod = -1; else if(value > 0) this.framePeriod = 1000 / value; else this.framePeriod = 1000;
		return value;
	}
	,__class__: lime__$backend_html5_HTML5Application
};
var lime__$backend_html5_HTML5Mouse = function() { };
$hxClasses["lime._backend.html5.HTML5Mouse"] = lime__$backend_html5_HTML5Mouse;
lime__$backend_html5_HTML5Mouse.__name__ = true;
lime__$backend_html5_HTML5Mouse.__cursor = null;
lime__$backend_html5_HTML5Mouse.__hidden = null;
lime__$backend_html5_HTML5Mouse.set_cursor = function(value) {
	if(lime__$backend_html5_HTML5Mouse.__cursor != value) {
		if(!lime__$backend_html5_HTML5Mouse.__hidden) {
			var _g = 0;
			var _g1 = lime_app_Application.current.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				switch(value[1]) {
				case 0:
					$window.backend.element.style.cursor = "default";
					break;
				case 1:
					$window.backend.element.style.cursor = "crosshair";
					break;
				case 3:
					$window.backend.element.style.cursor = "move";
					break;
				case 4:
					$window.backend.element.style.cursor = "pointer";
					break;
				case 5:
					$window.backend.element.style.cursor = "nesw-resize";
					break;
				case 6:
					$window.backend.element.style.cursor = "ns-resize";
					break;
				case 7:
					$window.backend.element.style.cursor = "nwse-resize";
					break;
				case 8:
					$window.backend.element.style.cursor = "ew-resize";
					break;
				case 9:
					$window.backend.element.style.cursor = "text";
					break;
				case 10:
					$window.backend.element.style.cursor = "wait";
					break;
				case 11:
					$window.backend.element.style.cursor = "wait";
					break;
				default:
					$window.backend.element.style.cursor = "auto";
				}
			}
		}
		lime__$backend_html5_HTML5Mouse.__cursor = value;
	}
	return lime__$backend_html5_HTML5Mouse.__cursor;
};
var lime__$backend_html5_HTML5Renderer = function(parent) {
	this.parent = parent;
};
$hxClasses["lime._backend.html5.HTML5Renderer"] = lime__$backend_html5_HTML5Renderer;
lime__$backend_html5_HTML5Renderer.__name__ = true;
lime__$backend_html5_HTML5Renderer.prototype = {
	create: function() {
		this.createContext();
		{
			var _g = this.parent.context;
			switch(_g[1]) {
			case 0:
				this.parent.window.backend.canvas.addEventListener("webglcontextlost",$bind(this,this.handleEvent),false);
				this.parent.window.backend.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleEvent),false);
				break;
			default:
			}
		}
	}
	,createContext: function() {
		if(this.parent.window.backend.div != null) this.parent.context = lime_graphics_RenderContext.DOM(this.parent.window.backend.div); else if(this.parent.window.backend.canvas != null) {
			var webgl = null;
			if(webgl == null) this.parent.context = lime_graphics_RenderContext.CANVAS(this.parent.window.backend.canvas.getContext("2d")); else {
				lime_graphics_opengl_GL.context = webgl;
				this.parent.context = lime_graphics_RenderContext.OPENGL(lime_graphics_opengl_GL.context);
			}
		}
	}
	,flip: function() {
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			this.parent.context = null;
			var listeners = this.parent.onRenderContextLost.listeners;
			var repeat = this.parent.onRenderContextLost.repeat;
			var i = 0;
			while(i < listeners.length) {
				listeners[i]();
				if(!repeat[i]) this.parent.onRenderContextLost.remove(listeners[i]); else i++;
			}
			break;
		case "webglcontextrestored":
			this.createContext();
			var listeners1 = this.parent.onRenderContextRestored.listeners;
			var repeat1 = this.parent.onRenderContextRestored.repeat;
			var i1 = 0;
			while(i1 < listeners1.length) {
				listeners1[i1](this.parent.context);
				if(!repeat1[i1]) this.parent.onRenderContextRestored.remove(listeners1[i1]); else i1++;
			}
			break;
		default:
		}
	}
	,__class__: lime__$backend_html5_HTML5Renderer
};
var lime__$backend_html5_HTML5Window = function(parent) {
	this.parent = parent;
	if(parent.config != null && Object.prototype.hasOwnProperty.call(parent.config,"element")) this.element = parent.config.element;
};
$hxClasses["lime._backend.html5.HTML5Window"] = lime__$backend_html5_HTML5Window;
lime__$backend_html5_HTML5Window.__name__ = true;
lime__$backend_html5_HTML5Window.prototype = {
	create: function(application) {
		this.setWidth = this.parent.__width;
		this.setHeight = this.parent.__height;
		if(js_Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.canvas = window.document.createElement("canvas");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.parent.__width == 0 && this.parent.__height == 0) {
			if(this.element != null) {
				this.parent.set_width(this.element.clientWidth);
				this.parent.set_height(this.element.clientHeight);
			} else {
				this.parent.set_width(window.innerWidth);
				this.parent.set_height(window.innerHeight);
			}
			this.parent.set_fullscreen(true);
		}
		if(this.canvas != null) {
			this.canvas.width = this.parent.__width;
			this.canvas.height = this.parent.__height;
		} else {
			this.div.style.width = this.parent.__width + "px";
			this.div.style.height = this.parent.__height + "px";
		}
		this.handleResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
			var events = ["mousedown","mouseenter","mouseleave","mousemove","mouseup","wheel"];
			var _g = 0;
			while(_g < events.length) {
				var event = events[_g];
				++_g;
				this.element.addEventListener(event,$bind(this,this.handleMouseEvent),true);
			}
			window.document.addEventListener("dragstart",function(e) {
				if(e.target.nodeName.toLowerCase() == "img") {
					e.preventDefault();
					return false;
				}
				return true;
			},false);
			this.element.addEventListener("touchstart",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchmove",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchend",$bind(this,this.handleTouchEvent),true);
		}
	}
	,handleMouseEvent: function(event) {
		var x = 0.0;
		var y = 0.0;
		if(event.type != "wheel") {
			if(this.element != null) {
				if(this.canvas != null) {
					var rect = this.canvas.getBoundingClientRect();
					x = (event.clientX - rect.left) * (this.parent.__width / rect.width);
					y = (event.clientY - rect.top) * (this.parent.__height / rect.height);
				} else if(this.div != null) {
					var rect1 = this.div.getBoundingClientRect();
					x = event.clientX - rect1.left;
					y = event.clientY - rect1.top;
				} else {
					var rect2 = this.element.getBoundingClientRect();
					x = (event.clientX - rect2.left) * (this.parent.__width / rect2.width);
					y = (event.clientY - rect2.top) * (this.parent.__height / rect2.height);
				}
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			var _g = event.type;
			switch(_g) {
			case "mousedown":
				var listeners = this.parent.onMouseDown.listeners;
				var repeat = this.parent.onMouseDown.repeat;
				var i = 0;
				while(i < listeners.length) {
					listeners[i](x,y,event.button);
					if(!repeat[i]) this.parent.onMouseDown.remove(listeners[i]); else i++;
				}
				break;
			case "mouseenter":
				var listeners1 = this.parent.onWindowEnter.listeners;
				var repeat1 = this.parent.onWindowEnter.repeat;
				var i1 = 0;
				while(i1 < listeners1.length) {
					listeners1[i1]();
					if(!repeat1[i1]) this.parent.onWindowEnter.remove(listeners1[i1]); else i1++;
				}
				break;
			case "mouseleave":
				var listeners2 = this.parent.onWindowLeave.listeners;
				var repeat2 = this.parent.onWindowLeave.repeat;
				var i2 = 0;
				while(i2 < listeners2.length) {
					listeners2[i2]();
					if(!repeat2[i2]) this.parent.onWindowLeave.remove(listeners2[i2]); else i2++;
				}
				break;
			case "mouseup":
				var listeners3 = this.parent.onMouseUp.listeners;
				var repeat3 = this.parent.onMouseUp.repeat;
				var i3 = 0;
				while(i3 < listeners3.length) {
					listeners3[i3](x,y,event.button);
					if(!repeat3[i3]) this.parent.onMouseUp.remove(listeners3[i3]); else i3++;
				}
				break;
			case "mousemove":
				var listeners4 = this.parent.onMouseMove.listeners;
				var repeat4 = this.parent.onMouseMove.repeat;
				var i4 = 0;
				while(i4 < listeners4.length) {
					listeners4[i4](x,y);
					if(!repeat4[i4]) this.parent.onMouseMove.remove(listeners4[i4]); else i4++;
				}
				break;
			default:
			}
		} else {
			var listeners5 = this.parent.onMouseWheel.listeners;
			var repeat5 = this.parent.onMouseWheel.repeat;
			var i5 = 0;
			while(i5 < listeners5.length) {
				listeners5[i5](event.deltaX,-event.deltaY);
				if(!repeat5[i5]) this.parent.onMouseWheel.remove(listeners5[i5]); else i5++;
			}
		}
	}
	,handleResize: function() {
		var stretch = this.parent.__fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.parent.__width != this.element.clientWidth || this.parent.__height != this.element.clientHeight) {
					this.parent.set_width(this.element.clientWidth);
					this.parent.set_height(this.element.clientHeight);
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX = this.element.clientWidth / this.setWidth;
				var scaleY = this.element.clientHeight / this.setHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = this.setWidth * targetRatio + "px";
						this.canvas.style.height = this.setHeight * targetRatio + "px";
						this.canvas.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
						this.canvas.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.div.style.width = this.setWidth * targetRatio + "px";
					this.div.style.height = this.setHeight * targetRatio + "px";
					this.div.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
					this.div.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,handleTouchEvent: function(event) {
		event.preventDefault();
		var touch = event.changedTouches[0];
		var id = touch.identifier;
		var x = 0.0;
		var y = 0.0;
		if(this.element != null) {
			if(this.canvas != null) {
				var rect = this.canvas.getBoundingClientRect();
				x = (touch.clientX - rect.left) * (this.parent.__width / rect.width);
				y = (touch.clientY - rect.top) * (this.parent.__height / rect.height);
			} else if(this.div != null) {
				var rect1 = this.div.getBoundingClientRect();
				x = touch.clientX - rect1.left;
				y = touch.clientY - rect1.top;
			} else {
				var rect2 = this.element.getBoundingClientRect();
				x = (touch.clientX - rect2.left) * (this.parent.__width / rect2.width);
				y = (touch.clientY - rect2.top) * (this.parent.__height / rect2.height);
			}
		} else {
			x = touch.clientX;
			y = touch.clientY;
		}
		var _g = event.type;
		switch(_g) {
		case "touchstart":
			var listeners = this.parent.onTouchStart.listeners;
			var repeat = this.parent.onTouchStart.repeat;
			var i = 0;
			while(i < listeners.length) {
				listeners[i](x / this.setWidth,y / this.setHeight,id);
				if(!repeat[i]) this.parent.onTouchStart.remove(listeners[i]); else i++;
			}
			var listeners1 = this.parent.onMouseDown.listeners;
			var repeat1 = this.parent.onMouseDown.repeat;
			var i1 = 0;
			while(i1 < listeners1.length) {
				listeners1[i1](x,y,0);
				if(!repeat1[i1]) this.parent.onMouseDown.remove(listeners1[i1]); else i1++;
			}
			break;
		case "touchmove":
			var listeners2 = this.parent.onTouchMove.listeners;
			var repeat2 = this.parent.onTouchMove.repeat;
			var i2 = 0;
			while(i2 < listeners2.length) {
				listeners2[i2](x / this.setWidth,y / this.setHeight,id);
				if(!repeat2[i2]) this.parent.onTouchMove.remove(listeners2[i2]); else i2++;
			}
			var listeners3 = this.parent.onMouseMove.listeners;
			var repeat3 = this.parent.onMouseMove.repeat;
			var i3 = 0;
			while(i3 < listeners3.length) {
				listeners3[i3](x,y);
				if(!repeat3[i3]) this.parent.onMouseMove.remove(listeners3[i3]); else i3++;
			}
			break;
		case "touchend":
			var listeners4 = this.parent.onTouchEnd.listeners;
			var repeat4 = this.parent.onTouchEnd.repeat;
			var i4 = 0;
			while(i4 < listeners4.length) {
				listeners4[i4](x / this.setWidth,y / this.setHeight,id);
				if(!repeat4[i4]) this.parent.onTouchEnd.remove(listeners4[i4]); else i4++;
			}
			var listeners5 = this.parent.onMouseUp.listeners;
			var repeat5 = this.parent.onMouseUp.repeat;
			var i5 = 0;
			while(i5 < listeners5.length) {
				listeners5[i5](x,y,0);
				if(!repeat5[i5]) this.parent.onMouseUp.remove(listeners5[i5]); else i5++;
			}
			break;
		default:
		}
	}
	,resize: function(width,height) {
	}
	,setFullscreen: function(value) {
		return false;
	}
	,__class__: lime__$backend_html5_HTML5Window
};
var lime_app_IModule = function() { };
$hxClasses["lime.app.IModule"] = lime_app_IModule;
lime_app_IModule.__name__ = true;
lime_app_IModule.prototype = {
	__class__: lime_app_IModule
};
var lime_app_Module = function() {
};
$hxClasses["lime.app.Module"] = lime_app_Module;
lime_app_Module.__name__ = true;
lime_app_Module.__interfaces__ = [lime_app_IModule];
lime_app_Module.prototype = {
	init: function(context) {
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
	}
	,onGamepadButtonDown: function(gamepad,button) {
	}
	,onGamepadButtonUp: function(gamepad,button) {
	}
	,onGamepadConnect: function(gamepad) {
	}
	,onGamepadDisconnect: function(gamepad) {
	}
	,onKeyDown: function(keyCode,modifier) {
	}
	,onKeyUp: function(keyCode,modifier) {
	}
	,onMouseDown: function(x,y,button) {
	}
	,onMouseMove: function(x,y) {
	}
	,onMouseMoveRelative: function(x,y) {
	}
	,onMouseUp: function(x,y,button) {
	}
	,onMouseWheel: function(deltaX,deltaY) {
	}
	,onRenderContextLost: function() {
	}
	,onRenderContextRestored: function(context) {
	}
	,onTextEdit: function(text,start,length) {
	}
	,onTextInput: function(text) {
	}
	,onTouchEnd: function(x,y,id) {
	}
	,onTouchMove: function(x,y,id) {
	}
	,onTouchStart: function(x,y,id) {
	}
	,onWindowActivate: function() {
	}
	,onWindowClose: function() {
	}
	,onWindowDeactivate: function() {
	}
	,onWindowEnter: function() {
	}
	,onWindowFocusIn: function() {
	}
	,onWindowFocusOut: function() {
	}
	,onWindowFullscreen: function() {
	}
	,onWindowLeave: function() {
	}
	,onWindowMinimize: function() {
	}
	,onWindowMove: function(x,y) {
	}
	,onWindowResize: function(width,height) {
	}
	,onWindowRestore: function() {
	}
	,render: function(context) {
	}
	,update: function(deltaTime) {
	}
	,__class__: lime_app_Module
};
var lime_app_Application = function() {
	this.onUpdate = new lime_app_Event();
	lime_app_Module.call(this);
	if(lime_app_Application.current == null) lime_app_Application.current = this;
	this.modules = [];
	this.renderers = [];
	this.windows = [];
	this.backend = new lime__$backend_html5_HTML5Application(this);
	this.onUpdate.add($bind(this,this.update));
};
$hxClasses["lime.app.Application"] = lime_app_Application;
lime_app_Application.__name__ = true;
lime_app_Application.current = null;
lime_app_Application.__super__ = lime_app_Module;
lime_app_Application.prototype = $extend(lime_app_Module.prototype,{
	addModule: function(module) {
		this.modules.push(module);
		if(this.initialized && this.renderer != null) module.init(this.renderer.context);
	}
	,addRenderer: function(renderer) {
		renderer.onRender.add($bind(this,this.render));
		renderer.onRenderContextLost.add($bind(this,this.onRenderContextLost));
		renderer.onRenderContextRestored.add($bind(this,this.onRenderContextRestored));
		this.renderers.push(renderer);
		this.renderer = renderer;
	}
	,addWindow: function(window) {
		this.windows.push(window);
		this.window = window;
		window.onGamepadAxisMove.add($bind(this,this.onGamepadAxisMove));
		window.onGamepadButtonDown.add($bind(this,this.onGamepadButtonDown));
		window.onGamepadButtonUp.add($bind(this,this.onGamepadButtonUp));
		window.onGamepadConnect.add($bind(this,this.onGamepadConnect));
		window.onGamepadDisconnect.add($bind(this,this.onGamepadDisconnect));
		window.onKeyDown.add($bind(this,this.onKeyDown));
		window.onKeyUp.add($bind(this,this.onKeyUp));
		window.onMouseDown.add($bind(this,this.onMouseDown));
		window.onMouseMove.add($bind(this,this.onMouseMove));
		window.onMouseMoveRelative.add($bind(this,this.onMouseMoveRelative));
		window.onMouseUp.add($bind(this,this.onMouseUp));
		window.onMouseWheel.add($bind(this,this.onMouseWheel));
		window.onTextEdit.add($bind(this,this.onTextEdit));
		window.onTextInput.add($bind(this,this.onTextInput));
		window.onTouchStart.add($bind(this,this.onTouchStart));
		window.onTouchMove.add($bind(this,this.onTouchMove));
		window.onTouchEnd.add($bind(this,this.onTouchEnd));
		window.onWindowActivate.add($bind(this,this.onWindowActivate));
		window.onWindowClose.add($bind(this,this.onWindowClose));
		window.onWindowDeactivate.add($bind(this,this.onWindowDeactivate));
		window.onWindowEnter.add($bind(this,this.onWindowEnter));
		window.onWindowFocusIn.add($bind(this,this.onWindowFocusIn));
		window.onWindowFocusOut.add($bind(this,this.onWindowFocusOut));
		window.onWindowFullscreen.add($bind(this,this.onWindowFullscreen));
		window.onWindowLeave.add($bind(this,this.onWindowLeave));
		window.onWindowMinimize.add($bind(this,this.onWindowMinimize));
		window.onWindowMove.add($bind(this,this.onWindowMove));
		window.onWindowResize.add($bind(this,this.onWindowResize));
		window.onWindowRestore.add($bind(this,this.onWindowRestore));
		window.create(this);
	}
	,create: function(config) {
		this.backend.create(config);
	}
	,exec: function() {
		lime_app_Application.current = this;
		return this.backend.exec();
	}
	,init: function(context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.init(context);
		}
		this.initialized = true;
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadAxisMove(gamepad,axis,value);
		}
	}
	,onGamepadButtonDown: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonDown(gamepad,button);
		}
	}
	,onGamepadButtonUp: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonUp(gamepad,button);
		}
	}
	,onGamepadConnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadConnect(gamepad);
		}
	}
	,onGamepadDisconnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadDisconnect(gamepad);
		}
	}
	,onKeyDown: function(keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyDown(keyCode,modifier);
		}
	}
	,onKeyUp: function(keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyUp(keyCode,modifier);
		}
	}
	,onMouseDown: function(x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseDown(x,y,button);
		}
	}
	,onMouseMove: function(x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMove(x,y);
		}
	}
	,onMouseMoveRelative: function(x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMoveRelative(x,y);
		}
	}
	,onMouseUp: function(x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseUp(x,y,button);
		}
	}
	,onMouseWheel: function(deltaX,deltaY) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseWheel(deltaX,deltaY);
		}
	}
	,onRenderContextLost: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextLost();
		}
	}
	,onRenderContextRestored: function(context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextRestored(context);
		}
	}
	,onTextEdit: function(text,start,length) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextEdit(text,start,length);
		}
	}
	,onTextInput: function(text) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextInput(text);
		}
	}
	,onTouchEnd: function(x,y,id) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchEnd(x,y,id);
		}
	}
	,onTouchMove: function(x,y,id) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchMove(x,y,id);
		}
	}
	,onTouchStart: function(x,y,id) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchStart(x,y,id);
		}
	}
	,onWindowActivate: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowActivate();
		}
	}
	,onWindowClose: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowClose();
		}
	}
	,onWindowDeactivate: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowDeactivate();
		}
	}
	,onWindowEnter: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowEnter();
		}
	}
	,onWindowFocusIn: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusIn();
		}
	}
	,onWindowFocusOut: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusOut();
		}
	}
	,onWindowFullscreen: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFullscreen();
		}
	}
	,onWindowLeave: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowLeave();
		}
	}
	,onWindowMinimize: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMinimize();
		}
	}
	,onWindowMove: function(x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMove(x,y);
		}
	}
	,onWindowResize: function(width,height) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowResize(width,height);
		}
	}
	,onWindowRestore: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowRestore();
		}
	}
	,render: function(context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.render(context);
		}
	}
	,update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.update(deltaTime);
		}
	}
	,__class__: lime_app_Application
});
var lime_app_Event = function() {
	this.listeners = [];
	this.priorities = [];
	this.repeat = [];
};
$hxClasses["lime.app.Event"] = lime_app_Event;
lime_app_Event.__name__ = true;
lime_app_Event.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.priorities[i]) {
				this.listeners.splice(i,0,listener);
				this.priorities.splice(i,0,priority);
				this.repeat.splice(i,0,!once);
				return;
			}
		}
		this.listeners.push(listener);
		this.priorities.push(priority);
		this.repeat.push(!once);
	}
	,remove: function(listener) {
		var index = HxOverrides.indexOf(this.listeners,listener,0);
		if(index > -1) {
			this.listeners.splice(index,1);
			this.priorities.splice(index,1);
			this.repeat.splice(index,1);
		}
	}
	,__class__: lime_app_Event
};
var lime_app_Preloader = function() {
	this.total = 0;
	this.loaded = 0;
};
$hxClasses["lime.app.Preloader"] = lime_app_Preloader;
lime_app_Preloader.__name__ = true;
lime_app_Preloader.prototype = {
	create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				var image = new Image();
				lime_app_Preloader.images.set(url,image);
				image.onload = $bind(this,this.image_onLoad);
				image.src = url;
				this.total++;
				break;
			case "BINARY":
				var loader = new lime_net_URLLoader();
				loader.set_dataFormat(lime_net_URLLoaderDataFormat.BINARY);
				lime_app_Preloader.loaders.set(url,loader);
				this.total++;
				break;
			case "TEXT":
				var loader1 = new lime_net_URLLoader();
				lime_app_Preloader.loaders.set(url,loader1);
				this.total++;
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime_app_Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime_app_Preloader.loaders.get(url1);
			loader2.onComplete.add($bind(this,this.loader_onComplete));
			loader2.load(new lime_net_URLRequest(url1));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		if(window.document.fonts && ($_=window.document.fonts,$bind($_,$_.load))) window.document.fonts.load("1em '" + font + "'").then(function(_) {
			_g.loaded++;
			_g.update(_g.loaded,_g.total);
			if(_g.loaded == _g.total) _g.start();
		}); else {
			var node = window.document.createElement("span");
			node.innerHTML = "giItT1WQy@!-/#";
			var style = node.style;
			style.position = "absolute";
			style.left = "-10000px";
			style.top = "-10000px";
			style.fontSize = "300px";
			style.fontFamily = "sans-serif";
			style.fontVariant = "normal";
			style.fontStyle = "normal";
			style.fontWeight = "normal";
			style.letterSpacing = "0";
			window.document.body.appendChild(node);
			var width = node.offsetWidth;
			style.fontFamily = "'" + font + "', sans-serif";
			var interval = null;
			var found = false;
			var checkFont = function() {
				if(node.offsetWidth != width) {
					if(!found) {
						found = true;
						return false;
					}
					_g.loaded++;
					if(interval != null) window.clearInterval(interval);
					node.parentNode.removeChild(node);
					node = null;
					_g.update(_g.loaded,_g.total);
					if(_g.loaded == _g.total) _g.start();
					return true;
				}
				return false;
			};
			if(!checkFont()) interval = window.setInterval(checkFont,50);
		}
	}
	,start: function() {
		if(this.onComplete != null) this.onComplete();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(loader) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime_app_Preloader
};
var lime_audio_ALAudioContext = function() { };
$hxClasses["lime.audio.ALAudioContext"] = lime_audio_ALAudioContext;
lime_audio_ALAudioContext.__name__ = true;
var lime_audio_ALCAudioContext = function() { };
$hxClasses["lime.audio.ALCAudioContext"] = lime_audio_ALCAudioContext;
lime_audio_ALCAudioContext.__name__ = true;
var lime_audio_AudioBuffer = function() { };
$hxClasses["lime.audio.AudioBuffer"] = lime_audio_AudioBuffer;
lime_audio_AudioBuffer.__name__ = true;
var lime_audio_AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime_audio_AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
var lime_audio_AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime_audio_AudioManager;
lime_audio_AudioManager.__name__ = true;
lime_audio_AudioManager.context = null;
lime_audio_AudioManager.init = function(context) {
	if(lime_audio_AudioManager.context == null) {
		if(context == null) try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;;
			lime_audio_AudioManager.context = lime_audio_AudioContext.WEB(new AudioContext ());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			lime_audio_AudioManager.context = lime_audio_AudioContext.HTML5(new lime_audio_HTML5AudioContext());
		} else lime_audio_AudioManager.context = context;
	}
};
var lime_audio_FlashAudioContext = function() { };
$hxClasses["lime.audio.FlashAudioContext"] = lime_audio_FlashAudioContext;
lime_audio_FlashAudioContext.__name__ = true;
var lime_audio_HTML5AudioContext = function() {
};
$hxClasses["lime.audio.HTML5AudioContext"] = lime_audio_HTML5AudioContext;
lime_audio_HTML5AudioContext.__name__ = true;
lime_audio_HTML5AudioContext.prototype = {
	__class__: lime_audio_HTML5AudioContext
};
var lime_graphics_ConsoleRenderContext = function() { };
$hxClasses["lime.graphics.ConsoleRenderContext"] = lime_graphics_ConsoleRenderContext;
lime_graphics_ConsoleRenderContext.__name__ = true;
lime_graphics_ConsoleRenderContext.prototype = {
	__class__: lime_graphics_ConsoleRenderContext
};
var lime_graphics_FlashRenderContext = function() { };
$hxClasses["lime.graphics.FlashRenderContext"] = lime_graphics_FlashRenderContext;
lime_graphics_FlashRenderContext.__name__ = true;
var lime_graphics_Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = -1;
	if(width == null) width = -1;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime_app_Application.current != null && lime_app_Application.current.renderer != null) {
			var _g = lime_app_Application.current.renderer.context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime_graphics_ImageType.CANVAS;
				break;
			case 3:
				this.type = lime_graphics_ImageType.FLASH;
				break;
			default:
				this.type = lime_graphics_ImageType.DATA;
			}
		} else this.type = lime_graphics_ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime_graphics_ImageBuffer(null,width,height);
				lime_graphics_utils_ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime_graphics_ImageBuffer((function($this) {
					var $r;
					var elements = width * height * 4;
					var this1;
					if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
					$r = this1;
					return $r;
				}(this)),width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime_graphics_Image;
lime_graphics_Image.__name__ = true;
lime_graphics_Image.fromCanvas = function(canvas) {
	if(canvas == null) return null;
	var buffer = new lime_graphics_ImageBuffer(null,canvas.width,canvas.height);
	buffer.set_src(canvas);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.prototype = {
	clone: function() {
		if(this.buffer != null) {
			if(this.type == lime_graphics_ImageType.CANVAS && this.buffer.__srcImage == null) {
				lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
				lime_graphics_utils_ImageCanvasUtil.sync(this);
				this.buffer.data = null;
				this.buffer.__srcImageData = null;
			}
			var image = new lime_graphics_Image(this.buffer.clone(),this.offsetX,this.offsetY,this.width,this.height,null,this.type);
			image.dirty = this.dirty;
			return image;
		} else return new lime_graphics_Image(null,this.offsetX,this.offsetY,this.width,this.height,null,this.type);
	}
	,fillRect: function(rect,color,format) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.fillRect(this,rect,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.fillRect(this,rect,color,format);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			var argb;
			if(format != null) switch(format) {
			case 1:
				argb = color;
				break;
			case 2:
				{
					var bgra = color;
					var argb1 = 0;
					argb1 = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
					argb = argb1;
				}
				break;
			default:
				{
					var rgba = color;
					var argb2 = 0;
					argb2 = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
					argb = argb2;
				}
			} else {
				var rgba1 = color;
				var argb3 = 0;
				argb3 = (rgba1 & 255 & 255) << 24 | (rgba1 >> 24 & 255 & 255) << 16 | (rgba1 >> 16 & 255 & 255) << 8 | rgba1 >> 8 & 255 & 255;
				argb = argb3;
			}
			this.buffer.__srcBitmapData.fillRect(rect.__toFlashRectangle(),argb);
			break;
		default:
		}
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__fromImageBuffer: function(buffer) {
		this.buffer = buffer;
		if(buffer != null) {
			if(this.width == -1) this.width = buffer.width;
			if(this.height == -1) this.height = buffer.height;
		}
	}
	,get_data: function() {
		if(this.buffer.data == null && this.buffer.width > 0 && this.buffer.height > 0) {
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.sync(this);
			lime_graphics_utils_ImageCanvasUtil.createImageData(this);
		}
		return this.buffer.data;
	}
	,get_format: function() {
		return this.buffer.format;
	}
	,set_format: function(value) {
		if(this.buffer.format != value) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime_graphics_utils_ImageDataUtil.setFormat(this,value);
				break;
			default:
			}
		}
		return this.buffer.format = value;
	}
	,get_powerOfTwo: function() {
		return this.buffer.width != 0 && (this.buffer.width & ~this.buffer.width + 1) == this.buffer.width && (this.buffer.height != 0 && (this.buffer.height & ~this.buffer.height + 1) == this.buffer.height);
	}
	,get_premultiplied: function() {
		return this.buffer.premultiplied;
	}
	,set_premultiplied: function(value) {
		if(value && !this.buffer.premultiplied) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.multiplyAlpha(this);
				break;
			default:
			}
		} else if(!value && this.buffer.premultiplied) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 1:
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.unmultiplyAlpha(this);
				break;
			default:
			}
		}
		return value;
	}
	,get_rect: function() {
		return new lime_math_Rectangle(0,0,this.width,this.height);
	}
	,get_src: function() {
		if(this.buffer.__srcCanvas == null) lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
		return this.buffer.get_src();
	}
	,get_transparent: function() {
		if(this.buffer == null) return false;
		return this.buffer.transparent;
	}
	,set_transparent: function(value) {
		if(this.buffer == null) return false;
		return this.buffer.transparent = value;
	}
	,__class__: lime_graphics_Image
};
var lime_graphics_ImageBuffer = function(data,width,height,bitsPerPixel,format) {
	if(bitsPerPixel == null) bitsPerPixel = 32;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	if(format == null) this.format = 0; else this.format = format;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime_graphics_ImageBuffer;
lime_graphics_ImageBuffer.__name__ = true;
lime_graphics_ImageBuffer.prototype = {
	clone: function() {
		var buffer = new lime_graphics_ImageBuffer(this.data,this.width,this.height,this.bitsPerPixel);
		if(this.data != null) {
			var elements = this.data.byteLength;
			var this1;
			if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
			buffer.data = this1;
			var copy;
			var view = this.data;
			var this2;
			if(view != null) this2 = new Uint8Array(view); else this2 = null;
			copy = this2;
			buffer.data.set(copy);
		} else if(this.__srcImageData != null) {
			buffer.__srcCanvas = window.document.createElement("canvas");
			buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
			buffer.__srcCanvas.width = this.__srcImageData.width;
			buffer.__srcCanvas.height = this.__srcImageData.height;
			buffer.__srcImageData = buffer.__srcContext.createImageData(this.__srcImageData.width,this.__srcImageData.height);
			var copy1 = new Uint8ClampedArray(this.__srcImageData.data);
			buffer.__srcImageData.data.set(copy1);
		} else if(this.__srcCanvas != null) {
			buffer.__srcCanvas = window.document.createElement("canvas");
			buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
			buffer.__srcCanvas.width = this.__srcCanvas.width;
			buffer.__srcCanvas.height = this.__srcCanvas.height;
			buffer.__srcContext.drawImage(this.__srcCanvas,0,0);
		} else buffer.__srcImage = this.__srcImage;
		buffer.bitsPerPixel = this.bitsPerPixel;
		buffer.format = this.format;
		buffer.premultiplied = this.premultiplied;
		buffer.transparent = this.transparent;
		return buffer;
	}
	,get_src: function() {
		if(this.__srcImage != null) return this.__srcImage;
		return this.__srcCanvas;
	}
	,set_src: function(value) {
		if(js_Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js_Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,get_stride: function() {
		return this.width * 4;
	}
	,__class__: lime_graphics_ImageBuffer
};
var lime_graphics_ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : true, __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime_graphics_ImageType.CANVAS = ["CANVAS",0];
lime_graphics_ImageType.CANVAS.toString = $estr;
lime_graphics_ImageType.CANVAS.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.DATA = ["DATA",1];
lime_graphics_ImageType.DATA.toString = $estr;
lime_graphics_ImageType.DATA.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.FLASH = ["FLASH",2];
lime_graphics_ImageType.FLASH.toString = $estr;
lime_graphics_ImageType.FLASH.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.CUSTOM = ["CUSTOM",3];
lime_graphics_ImageType.CUSTOM.toString = $estr;
lime_graphics_ImageType.CUSTOM.__enum__ = lime_graphics_ImageType;
var lime_graphics_RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM","NONE"] };
lime_graphics_RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CAIRO = function(cairo) { var $x = ["CAIRO",4,cairo]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CONSOLE = function(context) { var $x = ["CONSOLE",5,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",6,data]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.NONE = ["NONE",7];
lime_graphics_RenderContext.NONE.toString = $estr;
lime_graphics_RenderContext.NONE.__enum__ = lime_graphics_RenderContext;
var lime_graphics_Renderer = function(window) {
	this.onRender = new lime_app_Event();
	this.onRenderContextRestored = new lime_app_Event();
	this.onRenderContextLost = new lime_app_Event();
	this.window = window;
	this.backend = new lime__$backend_html5_HTML5Renderer(this);
	this.window.currentRenderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime_graphics_Renderer;
lime_graphics_Renderer.__name__ = true;
lime_graphics_Renderer.prototype = {
	create: function() {
		this.backend.create();
	}
	,flip: function() {
		this.backend.flip();
	}
	,__class__: lime_graphics_Renderer
};
var lime_graphics_cairo_Cairo = function() { };
$hxClasses["lime.graphics.cairo.Cairo"] = lime_graphics_cairo_Cairo;
lime_graphics_cairo_Cairo.__name__ = true;
lime_graphics_cairo_Cairo.prototype = {
	arc: function(xc,yc,radius,angle1,angle2) {
	}
	,clip: function() {
	}
	,curveTo: function(x1,y1,x2,y2,x3,y3) {
	}
	,identityMatrix: function() {
	}
	,lineTo: function(x,y) {
	}
	,moveTo: function(x,y) {
	}
	,newPath: function() {
	}
	,paint: function() {
	}
	,rectangle: function(x,y,width,height) {
	}
	,restore: function() {
	}
	,save: function() {
	}
	,setSourceRGB: function(r,g,b) {
	}
	,get_currentPoint: function() {
		return null;
	}
	,get_hasCurrentPoint: function() {
		return false;
	}
	,set_matrix: function(value) {
		return value;
	}
	,__class__: lime_graphics_cairo_Cairo
};
var lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$ = {};
$hxClasses["lime.graphics.cairo._CairoSurface.CairoSurface_Impl_"] = lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$;
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.__name__ = true;
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.flush = function(this1) {
};
var lime_graphics_opengl_GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime_graphics_opengl_GL;
lime_graphics_opengl_GL.__name__ = true;
lime_graphics_opengl_GL.context = null;
var lime_graphics_utils_ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime_graphics_utils_ImageCanvasUtil;
lime_graphics_utils_ImageCanvasUtil.__name__ = true;
lime_graphics_utils_ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	} else if(buffer.data != null && buffer.__srcCanvas == null) {
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.width,buffer.height);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	}
};
lime_graphics_utils_ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
		lime_graphics_utils_ImageCanvasUtil.sync(image);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime_graphics_utils_ImageCanvasUtil.createCanvas = function(image,width,height) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		buffer.__srcCanvas = window.document.createElement("canvas");
		buffer.__srcCanvas.width = width;
		buffer.__srcCanvas.height = height;
		if(!image.get_transparent()) {
			if(!image.get_transparent()) buffer.__srcCanvas.setAttribute("moz-opaque","true");
			buffer.__srcContext = buffer.__srcCanvas.getContext ("2d", { alpha: false });
		} else buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
		buffer.__srcContext.mozImageSmoothingEnabled = false;
		buffer.__srcContext.webkitImageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
	}
};
lime_graphics_utils_ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImageData == null) {
		if(buffer.data == null) buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height); else {
			buffer.__srcImageData = buffer.__srcContext.createImageData(buffer.width,buffer.height);
			buffer.__srcImageData.data.set(buffer.data);
		}
		var elements = buffer.__srcImageData.data.buffer;
		var this1;
		if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
		buffer.data = this1;
	}
};
lime_graphics_utils_ImageCanvasUtil.fillRect = function(image,rect,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.sync(image);
	if(rect.x == 0 && rect.y == 0 && rect.width == image.width && rect.height == image.height) {
		if(image.get_transparent() && (color & 255) == 0) {
			image.buffer.__srcCanvas.width = image.buffer.width;
			return;
		}
	}
	var r;
	var g;
	var b;
	var a;
	if(format == 1) {
		r = color >> 16 & 255;
		g = color >> 8 & 255;
		b = color & 255;
		if(image.get_transparent()) a = color >> 24 & 255; else a = 255;
	} else {
		r = color >> 24 & 255;
		g = color >> 16 & 255;
		b = color >> 8 & 255;
		if(image.get_transparent()) a = color & 255; else a = 255;
	}
	image.buffer.__srcContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
	image.buffer.__srcContext.fillRect(rect.x + image.offsetX,rect.y + image.offsetY,rect.width + image.offsetX,rect.height + image.offsetY);
};
lime_graphics_utils_ImageCanvasUtil.sync = function(image) {
	if(image.dirty && image.buffer.__srcImageData != null && image.type != lime_graphics_ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
};
var lime_graphics_utils_ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime_graphics_utils_ImageDataUtil;
lime_graphics_utils_ImageDataUtil.__name__ = true;
lime_graphics_utils_ImageDataUtil.fillRect = function(image,rect,color,format) {
	var fillColor;
	switch(format) {
	case 1:
		{
			var argb = color;
			var rgba = 0;
			rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
			fillColor = rgba;
		}
		break;
	case 2:
		{
			var bgra = color;
			var rgba1 = 0;
			rgba1 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
			fillColor = rgba1;
		}
		break;
	default:
		fillColor = color;
	}
	if(!image.get_transparent()) {
		fillColor = (fillColor >> 24 & 255 & 255) << 24 | (fillColor >> 16 & 255 & 255) << 16 | (fillColor >> 8 & 255 & 255) << 8 | 255;
		255;
	}
	var data = image.buffer.data;
	if(data == null) return;
	var format1 = image.buffer.format;
	var premultiplied = image.buffer.premultiplied;
	var dataView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,rect);
	var row;
	var _g1 = 0;
	var _g = dataView.height;
	while(_g1 < _g) {
		var y = _g1++;
		row = dataView.offset + dataView.stride * y;
		var _g3 = 0;
		var _g2 = dataView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			var offset = row + x * 4;
			if(premultiplied) {
				if((fillColor & 255) == 0) {
					if(fillColor != 0) fillColor = 0;
				} else if((fillColor & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[fillColor & 255];
					fillColor = ((fillColor >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((fillColor >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((fillColor >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | fillColor & 255 & 255;
				}
			}
			switch(format1) {
			case 2:
				data[offset] = fillColor >> 8 & 255;
				data[offset + 1] = fillColor >> 16 & 255;
				data[offset + 2] = fillColor >> 24 & 255;
				data[offset + 3] = fillColor & 255;
				break;
			case 0:
				data[offset] = fillColor >> 24 & 255;
				data[offset + 1] = fillColor >> 16 & 255;
				data[offset + 2] = fillColor >> 8 & 255;
				data[offset + 3] = fillColor & 255;
				break;
			case 1:
				data[offset] = fillColor & 255;
				data[offset + 1] = fillColor >> 24 & 255;
				data[offset + 2] = fillColor >> 16 & 255;
				data[offset + 3] = fillColor >> 8 & 255;
				break;
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.multiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null || !image.buffer.transparent) return;
	var format = image.buffer.format;
	var length = data.length / 4 | 0;
	var pixel;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var offset = i * 4;
		switch(format) {
		case 2:
			pixel = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 0:
			pixel = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 1:
			pixel = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
			break;
		}
		var offset1 = i * 4;
		if((pixel & 255) == 0) {
			if(pixel != 0) pixel = 0;
		} else if((pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[pixel & 255];
			pixel = ((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | pixel & 255 & 255;
		}
		switch(format) {
		case 2:
			data[offset1] = pixel >> 8 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 24 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 0:
			data[offset1] = pixel >> 24 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 8 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 1:
			data[offset1] = pixel & 255;
			data[offset1 + 1] = pixel >> 24 & 255;
			data[offset1 + 2] = pixel >> 16 & 255;
			data[offset1 + 3] = pixel >> 8 & 255;
			break;
		}
	}
	image.buffer.premultiplied = true;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.setFormat = function(image,format) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var r1;
	var g1;
	var b1;
	var a1;
	var r2;
	var g2;
	var b2;
	var a2;
	var r;
	var g;
	var b;
	var a;
	var _g = image.get_format();
	switch(_g) {
	case 0:
		r1 = 0;
		g1 = 1;
		b1 = 2;
		a1 = 3;
		break;
	case 1:
		r1 = 1;
		g1 = 2;
		b1 = 3;
		a1 = 0;
		break;
	case 2:
		r1 = 2;
		g1 = 1;
		b1 = 0;
		a1 = 3;
		break;
	}
	switch(format) {
	case 0:
		r2 = 0;
		g2 = 1;
		b2 = 2;
		a2 = 3;
		break;
	case 1:
		r2 = 1;
		g2 = 2;
		b2 = 3;
		a2 = 0;
		break;
	case 2:
		r2 = 2;
		g2 = 1;
		b2 = 0;
		a2 = 3;
		break;
	}
	var _g1 = 0;
	while(_g1 < length) {
		var i = _g1++;
		index = i * 4;
		r = data[index + r1];
		g = data[index + g1];
		b = data[index + b1];
		a = data[index + a1];
		data[index + r2] = r;
		data[index + g2] = g;
		data[index + b2] = b;
		data[index + a2] = a;
	}
	image.buffer.format = format;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.unmultiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var format = image.buffer.format;
	var length = data.length / 4 | 0;
	var pixel;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var offset = i * 4;
		switch(format) {
		case 2:
			pixel = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 0:
			pixel = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 1:
			pixel = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
			break;
		}
		if((pixel & 255) != 0 && (pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (pixel & 255);
			var r;
			var idx = Math.round((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.round((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.round((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			pixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | pixel & 255 & 255;
		}
		var offset1 = i * 4;
		switch(format) {
		case 2:
			data[offset1] = pixel >> 8 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 24 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 0:
			data[offset1] = pixel >> 24 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 8 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 1:
			data[offset1] = pixel & 255;
			data[offset1 + 1] = pixel >> 24 & 255;
			data[offset1 + 2] = pixel >> 16 & 255;
			data[offset1 + 3] = pixel >> 8 & 255;
			break;
		}
	}
	image.buffer.premultiplied = false;
	image.dirty = true;
};
var lime_graphics_utils__$ImageDataUtil_ImageDataView = function(image,rect) {
	this.image = image;
	if(rect == null) this.rect = image.get_rect(); else {
		if(rect.x < 0) rect.x = 0;
		if(rect.y < 0) rect.y = 0;
		if(rect.x + rect.width > image.width) rect.width = image.width - rect.x;
		if(rect.y + rect.height > image.height) rect.height = image.height - rect.y;
		if(rect.width < 0) rect.width = 0;
		if(rect.height < 0) rect.height = 0;
		this.rect = rect;
	}
	this.stride = image.buffer.get_stride();
	this.x = Math.ceil(this.rect.x);
	this.y = Math.ceil(this.rect.y);
	this.width = Math.floor(this.rect.width);
	this.height = Math.floor(this.rect.height);
	this.offset = this.stride * (this.y + image.offsetY) + (this.x + image.offsetX) * 4;
};
$hxClasses["lime.graphics.utils._ImageDataUtil.ImageDataView"] = lime_graphics_utils__$ImageDataUtil_ImageDataView;
lime_graphics_utils__$ImageDataUtil_ImageDataView.__name__ = true;
lime_graphics_utils__$ImageDataUtil_ImageDataView.prototype = {
	__class__: lime_graphics_utils__$ImageDataUtil_ImageDataView
};
var lime_math_Matrix3 = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["lime.math.Matrix3"] = lime_math_Matrix3;
lime_math_Matrix3.__name__ = true;
lime_math_Matrix3.prototype = {
	__class__: lime_math_Matrix3
};
var lime_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime_math_Rectangle;
lime_math_Rectangle.__name__ = true;
lime_math_Rectangle.prototype = {
	offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,__toFlashRectangle: function() {
		return null;
	}
	,__class__: lime_math_Rectangle
};
var lime_math_Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.math.Vector2"] = lime_math_Vector2;
lime_math_Vector2.__name__ = true;
lime_math_Vector2.prototype = {
	__class__: lime_math_Vector2
};
var lime_math_Vector4 = function() { };
$hxClasses["lime.math.Vector4"] = lime_math_Vector4;
lime_math_Vector4.__name__ = true;
var lime_math_color__$RGBA_RGBA_$Impl_$ = {};
$hxClasses["lime.math.color._RGBA.RGBA_Impl_"] = lime_math_color__$RGBA_RGBA_$Impl_$;
lime_math_color__$RGBA_RGBA_$Impl_$.__name__ = true;
lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16 = null;
lime_math_color__$RGBA_RGBA_$Impl_$.__clamp = null;
lime_math_color__$RGBA_RGBA_$Impl_$.a16 = null;
lime_math_color__$RGBA_RGBA_$Impl_$.unmult = null;
var lime_net_URLLoader = function(request) {
	this.onSecurityError = new lime_app_Event();
	this.onProgress = new lime_app_Event();
	this.onOpen = new lime_app_Event();
	this.onIOError = new lime_app_Event();
	this.onHTTPStatus = new lime_app_Event();
	this.onComplete = new lime_app_Event();
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(lime_net_URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["lime.net.URLLoader"] = lime_net_URLLoader;
lime_net_URLLoader.__name__ = true;
lime_net_URLLoader.prototype = {
	getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var _g = this;
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.__onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) {
				var listeners = self.onHTTPStatus.listeners;
				var repeat = self.onHTTPStatus.repeat;
				var i = 0;
				while(i < listeners.length) {
					listeners[i](_g,s);
					if(!repeat[i]) self.onHTTPStatus.remove(listeners[i]); else i++;
				}
			}
			if(s != null && s >= 200 && s < 400) self.__onData(subject.response); else if(s == null) {
				var listeners1 = self.onIOError.listeners;
				var repeat1 = self.onIOError.repeat;
				var i1 = 0;
				while(i1 < listeners1.length) {
					listeners1[i1](_g,"Failed to connect or resolve host");
					if(!repeat1[i1]) self.onIOError.remove(listeners1[i1]); else i1++;
				}
			} else if(s == 12029) {
				var listeners2 = self.onIOError.listeners;
				var repeat2 = self.onIOError.repeat;
				var i2 = 0;
				while(i2 < listeners2.length) {
					listeners2[i2](_g,"Failed to connect to host");
					if(!repeat2[i2]) self.onIOError.remove(listeners2[i2]); else i2++;
				}
			} else if(s == 12007) {
				var listeners3 = self.onIOError.listeners;
				var repeat3 = self.onIOError.repeat;
				var i3 = 0;
				while(i3 < listeners3.length) {
					listeners3[i3](_g,"Unknown host");
					if(!repeat3[i3]) self.onIOError.remove(listeners3[i3]); else i3++;
				}
			} else if(s == 0) {
				var listeners4 = self.onIOError.listeners;
				var repeat4 = self.onIOError.repeat;
				var i4 = 0;
				while(i4 < listeners4.length) {
					listeners4[i4](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat4[i4]) self.onIOError.remove(listeners4[i4]); else i4++;
				}
				var listeners5 = self.onSecurityError.listeners;
				var repeat5 = self.onSecurityError.repeat;
				var i5 = 0;
				while(i5 < listeners5.length) {
					listeners5[i5](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat5[i5]) self.onSecurityError.remove(listeners5[i5]); else i5++;
				}
			} else {
				var listeners6 = self.onIOError.listeners;
				var repeat6 = self.onIOError.repeat;
				var i6 = 0;
				while(i6 < listeners6.length) {
					listeners6[i6](_g,"Http Error #" + subject.status);
					if(!repeat6[i6]) self.onIOError.remove(listeners6[i6]); else i6++;
				}
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js_Boot.__instanceof(data,lime_utils_ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js_Boot.__instanceof(data,lime_net_URLVariables)) {
			var data2 = data;
			var _g1 = 0;
			var _g11 = Reflect.fields(data2);
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open("GET",url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(js_Boot.__cast(method , String),url,true);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			var listeners = this.onIOError.listeners;
			var repeat = this.onIOError.repeat;
			var i = 0;
			while(i < listeners.length) {
				listeners[i](this,e.toString());
				if(!repeat[i]) this.onIOError.remove(listeners[i]); else i++;
			}
			return;
		}
		var _g2 = this.dataFormat;
		switch(_g2[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g3 = 0;
		while(_g3 < requestHeaders.length) {
			var header = requestHeaders[_g3];
			++_g3;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		var listeners1 = this.onOpen.listeners;
		var repeat1 = this.onOpen.repeat;
		var i1 = 0;
		while(i1 < listeners1.length) {
			listeners1[i1](this);
			if(!repeat1[i1]) this.onOpen.remove(listeners1[i1]); else i1++;
		}
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,__onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = lime_utils_ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var listeners = this.onComplete.listeners;
		var repeat = this.onComplete.repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](this);
			if(!repeat[i]) this.onComplete.remove(listeners[i]); else i++;
		}
	}
	,__onProgress: function(event) {
		this.bytesLoaded = event.loaded;
		this.bytesTotal = event.total;
		var listeners = this.onProgress.listeners;
		var repeat = this.onProgress.repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](this,this.bytesLoaded,this.bytesTotal);
			if(!repeat[i]) this.onProgress.remove(listeners[i]); else i++;
		}
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == lime_net_URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = lime_net_URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: lime_net_URLLoader
};
var lime_net_URLLoaderDataFormat = $hxClasses["lime.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
lime_net_URLLoaderDataFormat.BINARY = ["BINARY",0];
lime_net_URLLoaderDataFormat.BINARY.toString = $estr;
lime_net_URLLoaderDataFormat.BINARY.__enum__ = lime_net_URLLoaderDataFormat;
lime_net_URLLoaderDataFormat.TEXT = ["TEXT",1];
lime_net_URLLoaderDataFormat.TEXT.toString = $estr;
lime_net_URLLoaderDataFormat.TEXT.__enum__ = lime_net_URLLoaderDataFormat;
lime_net_URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
lime_net_URLLoaderDataFormat.VARIABLES.toString = $estr;
lime_net_URLLoaderDataFormat.VARIABLES.__enum__ = lime_net_URLLoaderDataFormat;
var lime_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["lime.net.URLRequest"] = lime_net_URLRequest;
lime_net_URLRequest.__name__ = true;
lime_net_URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js_Boot.__instanceof(this.data,lime_utils_ByteArray)) {
			res = res.slice();
			res.push(new lime_net_URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: lime_net_URLRequest
};
var lime_net_URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["lime.net.URLRequestHeader"] = lime_net_URLRequestHeader;
lime_net_URLRequestHeader.__name__ = true;
lime_net_URLRequestHeader.prototype = {
	__class__: lime_net_URLRequestHeader
};
var lime_net_URLVariables = function() { };
$hxClasses["lime.net.URLVariables"] = lime_net_URLVariables;
lime_net_URLVariables.__name__ = true;
var lime_system_System = function() { };
$hxClasses["lime.system.System"] = lime_system_System;
lime_system_System.__name__ = true;
lime_system_System.embed = $hx_exports.lime.embed = function(element,width,height,background,assetsPrefix) {
	var htmlElement = null;
	if(typeof(element) == "string") htmlElement = window.document.getElementById(js_Boot.__cast(element , String)); else if(element == null) htmlElement = window.document.createElement("div"); else htmlElement = element;
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.background = color;
	ApplicationMain.config.element = htmlElement;
	ApplicationMain.config.width = width;
	ApplicationMain.config.height = height;
	ApplicationMain.config.assetsPrefix = assetsPrefix;
	ApplicationMain.create();
};
lime_system_System.getTimer = function() {
	return new Date().getTime();
};
var lime_ui_Gamepad = function() { };
$hxClasses["lime.ui.Gamepad"] = lime_ui_Gamepad;
lime_ui_Gamepad.__name__ = true;
lime_ui_Gamepad.prototype = {
	__class__: lime_ui_Gamepad
};
var lime_ui__$KeyModifier_KeyModifier_$Impl_$ = {};
$hxClasses["lime.ui._KeyModifier.KeyModifier_Impl_"] = lime_ui__$KeyModifier_KeyModifier_$Impl_$;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.__name__ = true;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey = function(this1) {
	return (this1 & 256) > 0 || (this1 & 512) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey = function(this1) {
	return (this1 & 64) > 0 || (this1 & 128) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey = function(this1) {
	return (this1 & 1024) > 0 || (this1 & 2048) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey = function(this1) {
	return (this1 & 1) > 0 || (this1 & 2) > 0;
};
var lime_ui_Mouse = function() { };
$hxClasses["lime.ui.Mouse"] = lime_ui_Mouse;
lime_ui_Mouse.__name__ = true;
lime_ui_Mouse.set_cursor = function(value) {
	return lime__$backend_html5_HTML5Mouse.set_cursor(value);
};
var lime_ui_MouseCursor = $hxClasses["lime.ui.MouseCursor"] = { __ename__ : true, __constructs__ : ["ARROW","CROSSHAIR","DEFAULT","MOVE","POINTER","RESIZE_NESW","RESIZE_NS","RESIZE_NWSE","RESIZE_WE","TEXT","WAIT","WAIT_ARROW","CUSTOM"] };
lime_ui_MouseCursor.ARROW = ["ARROW",0];
lime_ui_MouseCursor.ARROW.toString = $estr;
lime_ui_MouseCursor.ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CROSSHAIR = ["CROSSHAIR",1];
lime_ui_MouseCursor.CROSSHAIR.toString = $estr;
lime_ui_MouseCursor.CROSSHAIR.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.DEFAULT = ["DEFAULT",2];
lime_ui_MouseCursor.DEFAULT.toString = $estr;
lime_ui_MouseCursor.DEFAULT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.MOVE = ["MOVE",3];
lime_ui_MouseCursor.MOVE.toString = $estr;
lime_ui_MouseCursor.MOVE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.POINTER = ["POINTER",4];
lime_ui_MouseCursor.POINTER.toString = $estr;
lime_ui_MouseCursor.POINTER.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NESW = ["RESIZE_NESW",5];
lime_ui_MouseCursor.RESIZE_NESW.toString = $estr;
lime_ui_MouseCursor.RESIZE_NESW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NS = ["RESIZE_NS",6];
lime_ui_MouseCursor.RESIZE_NS.toString = $estr;
lime_ui_MouseCursor.RESIZE_NS.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NWSE = ["RESIZE_NWSE",7];
lime_ui_MouseCursor.RESIZE_NWSE.toString = $estr;
lime_ui_MouseCursor.RESIZE_NWSE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_WE = ["RESIZE_WE",8];
lime_ui_MouseCursor.RESIZE_WE.toString = $estr;
lime_ui_MouseCursor.RESIZE_WE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.TEXT = ["TEXT",9];
lime_ui_MouseCursor.TEXT.toString = $estr;
lime_ui_MouseCursor.TEXT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT = ["WAIT",10];
lime_ui_MouseCursor.WAIT.toString = $estr;
lime_ui_MouseCursor.WAIT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT_ARROW = ["WAIT_ARROW",11];
lime_ui_MouseCursor.WAIT_ARROW.toString = $estr;
lime_ui_MouseCursor.WAIT_ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CUSTOM = ["CUSTOM",12];
lime_ui_MouseCursor.CUSTOM.toString = $estr;
lime_ui_MouseCursor.CUSTOM.__enum__ = lime_ui_MouseCursor;
var lime_ui_Window = function(config) {
	this.onWindowRestore = new lime_app_Event();
	this.onWindowResize = new lime_app_Event();
	this.onWindowMove = new lime_app_Event();
	this.onWindowMinimize = new lime_app_Event();
	this.onWindowLeave = new lime_app_Event();
	this.onWindowFullscreen = new lime_app_Event();
	this.onWindowFocusOut = new lime_app_Event();
	this.onWindowFocusIn = new lime_app_Event();
	this.onWindowEnter = new lime_app_Event();
	this.onWindowDeactivate = new lime_app_Event();
	this.onWindowClose = new lime_app_Event();
	this.onWindowActivate = new lime_app_Event();
	this.onTouchStart = new lime_app_Event();
	this.onTouchMove = new lime_app_Event();
	this.onTouchEnd = new lime_app_Event();
	this.onTextInput = new lime_app_Event();
	this.onTextEdit = new lime_app_Event();
	this.onMouseWheel = new lime_app_Event();
	this.onMouseUp = new lime_app_Event();
	this.onMouseMoveRelative = new lime_app_Event();
	this.onMouseMove = new lime_app_Event();
	this.onMouseDown = new lime_app_Event();
	this.onKeyUp = new lime_app_Event();
	this.onKeyDown = new lime_app_Event();
	this.onGamepadDisconnect = new lime_app_Event();
	this.onGamepadConnect = new lime_app_Event();
	this.onGamepadButtonUp = new lime_app_Event();
	this.onGamepadButtonDown = new lime_app_Event();
	this.onGamepadAxisMove = new lime_app_Event();
	this.config = config;
	this.__width = 0;
	this.__height = 0;
	this.__fullscreen = false;
	this.__x = 0;
	this.__y = 0;
	this.__title = "";
	if(config != null) {
		if(Object.prototype.hasOwnProperty.call(config,"width")) this.__width = config.width;
		if(Object.prototype.hasOwnProperty.call(config,"height")) this.__height = config.height;
		if(Object.prototype.hasOwnProperty.call(config,"fullscreen")) this.__fullscreen = config.fullscreen;
		if(Object.prototype.hasOwnProperty.call(config,"title")) this.__title = config.title;
	}
	this.backend = new lime__$backend_html5_HTML5Window(this);
};
$hxClasses["lime.ui.Window"] = lime_ui_Window;
lime_ui_Window.__name__ = true;
lime_ui_Window.prototype = {
	create: function(application) {
		this.application = application;
		this.backend.create(application);
		if(this.currentRenderer != null) this.currentRenderer.create();
	}
	,resize: function(width,height) {
		this.backend.resize(width,height);
		this.__width = width;
		this.__height = height;
	}
	,set_fullscreen: function(value) {
		return this.__fullscreen = this.backend.setFullscreen(value);
	}
	,set_height: function(value) {
		this.resize(this.__width,value);
		return this.__height;
	}
	,set_width: function(value) {
		this.resize(value,this.__height);
		return this.__width;
	}
	,__class__: lime_ui_Window
};
var lime_utils_ByteArray = function(size) {
	if(size == null) size = 0;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	if(size > 0) this.allocated = size;
	this.___resizeBuffer(this.allocated);
	this.set_length(this.allocated);
};
$hxClasses["lime.utils.ByteArray"] = lime_utils_ByteArray;
lime_utils_ByteArray.__name__ = true;
lime_utils_ByteArray.__ofBuffer = function(buffer) {
	var bytes = new lime_utils_ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
lime_utils_ByteArray.prototype = {
	readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c21 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,__get: function(pos) {
		return this.data.getInt8(pos);
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value * 2) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: lime_utils_ByteArray
};
var openfl_display_MovieClip = function() {
	openfl_display_Sprite.call(this);
	this.__currentFrame = 0;
	this.__currentLabels = [];
	this.__totalFrames = 0;
	this.enabled = true;
};
$hxClasses["openfl.display.MovieClip"] = openfl_display_MovieClip;
openfl_display_MovieClip.__name__ = true;
openfl_display_MovieClip.__super__ = openfl_display_Sprite;
openfl_display_MovieClip.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: openfl_display_MovieClip
});
var openfl_display_LoaderInfo = function() {
	openfl_events_EventDispatcher.call(this);
	this.applicationDomain = openfl_system_ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl_display_LoaderInfo;
openfl_display_LoaderInfo.__name__ = true;
openfl_display_LoaderInfo.create = function(loader) {
	var loaderInfo = new openfl_display_LoaderInfo();
	loaderInfo.uncaughtErrorEvents = new openfl_events_UncaughtErrorEvents();
	if(loader != null) loaderInfo.loader = loader; else loaderInfo.url = openfl_display_LoaderInfo.__rootURL;
	return loaderInfo;
};
openfl_display_LoaderInfo.__super__ = openfl_events_EventDispatcher;
openfl_display_LoaderInfo.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_LoaderInfo
});
var openfl_system_ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = openfl_system_ApplicationDomain.currentDomain;
};
$hxClasses["openfl.system.ApplicationDomain"] = openfl_system_ApplicationDomain;
openfl_system_ApplicationDomain.__name__ = true;
openfl_system_ApplicationDomain.prototype = {
	__class__: openfl_system_ApplicationDomain
};
var openfl_events_UncaughtErrorEvents = function(target) {
	openfl_events_EventDispatcher.call(this,target);
};
$hxClasses["openfl.events.UncaughtErrorEvents"] = openfl_events_UncaughtErrorEvents;
openfl_events_UncaughtErrorEvents.__name__ = true;
openfl_events_UncaughtErrorEvents.__super__ = openfl_events_EventDispatcher;
openfl_events_UncaughtErrorEvents.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_events_UncaughtErrorEvents
});
var openfl_geom_Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["openfl.geom.Matrix"] = openfl_geom_Matrix;
openfl_geom_Matrix.__name__ = true;
openfl_geom_Matrix.prototype = {
	clone: function() {
		return new openfl_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyFrom: function(sourceMatrix) {
		this.a = sourceMatrix.a;
		this.b = sourceMatrix.b;
		this.c = sourceMatrix.c;
		this.d = sourceMatrix.d;
		this.tx = sourceMatrix.tx;
		this.ty = sourceMatrix.ty;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,transformPoint: function(pos) {
		return new openfl_geom_Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		this.tx += dx;
		this.ty += dy;
	}
	,toArray: function(transpose) {
		if(transpose == null) transpose = false;
		if(this.__array == null) {
			var this1;
			this1 = new Float32Array(9);
			this.__array = this1;
		}
		if(transpose) {
			this.__array[0] = this.a;
			this.__array[1] = this.b;
			this.__array[2] = 0;
			this.__array[3] = this.c;
			this.__array[4] = this.d;
			this.__array[5] = 0;
			this.__array[6] = this.tx;
			this.__array[7] = this.ty;
			this.__array[8] = 1;
		} else {
			this.__array[0] = this.a;
			this.__array[1] = this.c;
			this.__array[2] = this.tx;
			this.__array[3] = this.b;
			this.__array[4] = this.d;
			this.__array[5] = this.ty;
			this.__array[6] = 0;
			this.__array[7] = 0;
			this.__array[8] = 1;
		}
		return this.__array;
	}
	,__toMatrix3: function() {
		return new lime_math_Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,__transformInversePoint: function(point) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			point.x = -this.tx;
			point.y = -this.ty;
		} else {
			var px = 1.0 / norm * (this.c * (this.ty - point.y) + this.d * (point.x - this.tx));
			point.y = 1.0 / norm * (this.a * (point.y - this.ty) + this.b * (this.tx - point.x));
			point.x = px;
		}
	}
	,__transformInverseX: function(px,py) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) return -this.tx; else return 1.0 / norm * (this.c * (this.ty - py) + this.d * (px - this.tx));
	}
	,__transformInverseY: function(px,py) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) return -this.ty; else return 1.0 / norm * (this.a * (py - this.ty) + this.b * (this.tx - px));
	}
	,__class__: openfl_geom_Matrix
};
var openfl_geom_ColorTransform = function(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset) {
	if(alphaOffset == null) alphaOffset = 0;
	if(blueOffset == null) blueOffset = 0;
	if(greenOffset == null) greenOffset = 0;
	if(redOffset == null) redOffset = 0;
	if(alphaMultiplier == null) alphaMultiplier = 1;
	if(blueMultiplier == null) blueMultiplier = 1;
	if(greenMultiplier == null) greenMultiplier = 1;
	if(redMultiplier == null) redMultiplier = 1;
	this.redMultiplier = redMultiplier;
	this.greenMultiplier = greenMultiplier;
	this.blueMultiplier = blueMultiplier;
	this.alphaMultiplier = alphaMultiplier;
	this.redOffset = redOffset;
	this.greenOffset = greenOffset;
	this.blueOffset = blueOffset;
	this.alphaOffset = alphaOffset;
};
$hxClasses["openfl.geom.ColorTransform"] = openfl_geom_ColorTransform;
openfl_geom_ColorTransform.__name__ = true;
openfl_geom_ColorTransform.prototype = {
	__combine: function(ct) {
		this.redMultiplier *= ct.redMultiplier;
		this.greenMultiplier *= ct.greenMultiplier;
		this.blueMultiplier *= ct.blueMultiplier;
		this.alphaMultiplier *= ct.alphaMultiplier;
		this.redOffset += ct.redOffset;
		this.greenOffset += ct.greenOffset;
		this.blueOffset += ct.blueOffset;
		this.alphaOffset += ct.alphaOffset;
	}
	,__equals: function(ct,skipAlphaMultiplier) {
		if(skipAlphaMultiplier == null) skipAlphaMultiplier = false;
		return ct != null && this.redMultiplier == ct.redMultiplier && this.greenMultiplier == ct.greenMultiplier && this.blueMultiplier == ct.blueMultiplier && (skipAlphaMultiplier || this.alphaMultiplier == ct.alphaMultiplier) && this.redOffset == ct.redOffset && this.greenOffset == ct.greenOffset && this.blueOffset == ct.blueOffset && this.alphaOffset == ct.alphaOffset;
	}
	,__clone: function() {
		return new openfl_geom_ColorTransform(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset);
	}
	,__class__: openfl_geom_ColorTransform
};
var openfl_Lib = function() { };
$hxClasses["openfl.Lib"] = openfl_Lib;
openfl_Lib.__name__ = true;
openfl_Lib.application = null;
openfl_Lib.embed = $hx_exports.openfl.embed = function(elementName,width,height,background,assetsPrefix) {
	lime_system_System.embed(elementName,width,height,background,assetsPrefix);
};
openfl_Lib.getTimer = function() {
	return lime_system_System.getTimer();
};
openfl_Lib.notImplemented = function(api) {
	if(!openfl_Lib.__sentWarnings.exists(api)) {
		openfl_Lib.__sentWarnings.set(api,true);
		console.log("Warning: " + api + " is not implemented");
	}
};
var openfl_VectorData = function() {
	this.length = 0;
};
$hxClasses["openfl.VectorData"] = openfl_VectorData;
openfl_VectorData.__name__ = true;
openfl_VectorData.prototype = {
	__class__: openfl_VectorData
};
var openfl__$internal_renderer_AbstractMaskManager = function(renderSession) {
	this.renderSession = renderSession;
};
$hxClasses["openfl._internal.renderer.AbstractMaskManager"] = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_AbstractMaskManager.__name__ = true;
openfl__$internal_renderer_AbstractMaskManager.prototype = {
	pushMask: function(mask) {
	}
	,pushRect: function(rect,transform) {
	}
	,popMask: function() {
	}
	,__class__: openfl__$internal_renderer_AbstractMaskManager
};
var openfl__$internal_renderer_AbstractRenderer = function(width,height) {
	this.width = width;
	this.height = height;
};
$hxClasses["openfl._internal.renderer.AbstractRenderer"] = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_AbstractRenderer.__name__ = true;
openfl__$internal_renderer_AbstractRenderer.prototype = {
	render: function(stage) {
	}
	,resize: function(width,height) {
	}
	,__class__: openfl__$internal_renderer_AbstractRenderer
};
var openfl__$internal_renderer_RenderSession = function() {
};
$hxClasses["openfl._internal.renderer.RenderSession"] = openfl__$internal_renderer_RenderSession;
openfl__$internal_renderer_RenderSession.__name__ = true;
openfl__$internal_renderer_RenderSession.prototype = {
	__class__: openfl__$internal_renderer_RenderSession
};
var openfl__$internal_renderer_cairo_CairoGraphics = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoGraphics"] = openfl__$internal_renderer_cairo_CairoGraphics;
openfl__$internal_renderer_cairo_CairoGraphics.__name__ = true;
openfl__$internal_renderer_cairo_CairoGraphics.cairo = null;
openfl__$internal_renderer_cairo_CairoGraphics.drawRoundRect = function(x,y,width,height,rx,ry) {
	if(ry == -1) ry = rx;
	rx *= 0.5;
	ry *= 0.5;
	if(rx > width / 2) rx = width / 2;
	if(ry > height / 2) ry = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl__$internal_renderer_cairo_CairoGraphics.SIN45;
	var cx2 = -rx + rx * openfl__$internal_renderer_cairo_CairoGraphics.TAN22;
	var cy1 = -ry + ry * openfl__$internal_renderer_cairo_CairoGraphics.SIN45;
	var cy2 = -ry + ry * openfl__$internal_renderer_cairo_CairoGraphics.TAN22;
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(xe,ye - ry);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe + cx2,ye,xe - rx,ye);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x + rx,ye);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x,ye + cy2,x,ye - ry);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x,y + ry);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x - cx2,y,x + rx,y);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(xe - rx,y);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe,y - cy2,xe,y + ry);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(xe,ye - ry);
};
openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo = function(cx,cy,x,y) {
	var current = null;
	if(!openfl__$internal_renderer_cairo_CairoGraphics.cairo.get_hasCurrentPoint()) {
		openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(cx,cy);
		current = new lime_math_Vector2(cx,cy);
	} else current = openfl__$internal_renderer_cairo_CairoGraphics.cairo.get_currentPoint();
	var cx1 = current.x + 0.66666666666666663 * (cx - current.x);
	var cy1 = current.y + 0.66666666666666663 * (cy - current.y);
	var cx2 = x + 0.66666666666666663 * (cx - x);
	var cy2 = y + 0.66666666666666663 * (cy - y);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(cx1,cy1,cx2,cy2,x,y);
};
openfl__$internal_renderer_cairo_CairoGraphics.renderMask = function(graphics,renderSession) {
	if(graphics.__commands.length != 0) {
		var cairo = renderSession.cairo;
		var positionX = 0.0;
		var positionY = 0.0;
		var offsetX = 0;
		var offsetY = 0;
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 3:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cy1 = command[4];
				var cx2 = command[3];
				var cx1 = command[2];
				cairo.curveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
				positionX = x;
				positionY = y;
				break;
			case 4:
				var y1 = command[5];
				var x1 = command[4];
				var cy = command[3];
				var cx = command[2];
				openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
				positionX = x1;
				positionY = y1;
				break;
			case 5:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				cairo.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2);
				break;
			case 6:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				x3 -= offsetX;
				y3 -= offsetY;
				var kappa = .5522848;
				var ox = width / 2 * kappa;
				var oy = height / 2 * kappa;
				var xe = x3 + width;
				var ye = y3 + height;
				var xm = x3 + width / 2;
				var ym = y3 + height / 2;
				cairo.moveTo(x3,ym);
				cairo.curveTo(x3,ym - oy,xm - ox,y3,xm,y3);
				cairo.curveTo(xm + ox,y3,xe,ym - oy,xe,ym);
				cairo.curveTo(xe,ym + oy,xm + ox,ye,xm,ye);
				cairo.curveTo(xm - ox,ye,x3,ym + oy,x3,ym);
				break;
			case 7:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				cairo.rectangle(x4 - offsetX,y4 - offsetY,width1,height1);
				break;
			case 8:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				openfl__$internal_renderer_cairo_CairoGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
				break;
			case 15:
				var y6 = command[3];
				var x6 = command[2];
				cairo.lineTo(x6 - offsetX,y6 - offsetY);
				positionX = x6;
				positionY = y6;
				break;
			case 16:
				var y7 = command[3];
				var x7 = command[2];
				cairo.moveTo(x7 - offsetX,y7 - offsetY);
				positionX = x7;
				positionY = y7;
				break;
			default:
			}
		}
	}
};
var openfl__$internal_renderer_cairo_CairoMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.cairo.CairoMaskManager"] = openfl__$internal_renderer_cairo_CairoMaskManager;
openfl__$internal_renderer_cairo_CairoMaskManager.__name__ = true;
openfl__$internal_renderer_cairo_CairoMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_cairo_CairoMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		var cairo = this.renderSession.cairo;
		cairo.save();
		var transform = mask.__getTransform();
		cairo.set_matrix(transform.__toMatrix3());
		cairo.newPath();
		mask.__renderCairoMask(this.renderSession);
		cairo.clip();
	}
	,pushRect: function(rect,transform) {
		var cairo = this.renderSession.cairo;
		cairo.save();
		cairo.set_matrix(new lime_math_Matrix3(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty));
		cairo.newPath();
		cairo.rectangle(rect.x,rect.y,rect.width,rect.height);
		cairo.clip();
	}
	,popMask: function() {
		this.renderSession.cairo.restore();
	}
	,__class__: openfl__$internal_renderer_cairo_CairoMaskManager
});
var openfl__$internal_renderer_cairo_CairoRenderer = function(width,height,cairo) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.cairo = cairo;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.cairo = cairo;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl__$internal_renderer_cairo_CairoMaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.cairo.CairoRenderer"] = openfl__$internal_renderer_cairo_CairoRenderer;
openfl__$internal_renderer_cairo_CairoRenderer.__name__ = true;
openfl__$internal_renderer_cairo_CairoRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_cairo_CairoRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.cairo.identityMatrix();
		if(stage.__clearBeforeRender) {
			this.cairo.setSourceRGB(stage.__colorSplit[0],stage.__colorSplit[1],stage.__colorSplit[2]);
			this.cairo.paint();
		}
		stage.__renderCairo(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_cairo_CairoRenderer
});
var openfl__$internal_renderer_cairo_CairoShape = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoShape"] = openfl__$internal_renderer_cairo_CairoShape;
openfl__$internal_renderer_cairo_CairoShape.__name__ = true;
openfl__$internal_renderer_cairo_CairoShape.render = function(shape,renderSession) {
};
var openfl__$internal_renderer_canvas_CanvasGraphics = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasGraphics"] = openfl__$internal_renderer_canvas_CanvasGraphics;
openfl__$internal_renderer_canvas_CanvasGraphics.__name__ = true;
openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = null;
openfl__$internal_renderer_canvas_CanvasGraphics.bounds = null;
openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands = null;
openfl__$internal_renderer_canvas_CanvasGraphics.graphics = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = null;
openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands = null;
openfl__$internal_renderer_canvas_CanvasGraphics.context = null;
openfl__$internal_renderer_canvas_CanvasGraphics.createBitmapFill = function(bitmap,bitmapRepeat) {
	bitmap.__sync();
	return openfl__$internal_renderer_canvas_CanvasGraphics.context.createPattern(bitmap.__image.get_src(),bitmapRepeat?"repeat":"no-repeat");
	return null;
};
openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas = function(bitmap,repeat,width,height) {
	var canvas = window.document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	context.fillStyle = context.createPattern(bitmap.__image.get_src(),repeat?"repeat":"no-repeat");
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,height);
	context.lineTo(width,height);
	context.lineTo(width,0);
	context.lineTo(0,0);
	context.closePath();
	context.fill();
	return canvas;
};
openfl__$internal_renderer_canvas_CanvasGraphics.endFill = function() {
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
	openfl__$internal_renderer_canvas_CanvasGraphics.playCommands(openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands,false);
	openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands = [];
};
openfl__$internal_renderer_canvas_CanvasGraphics.endStroke = function() {
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
	openfl__$internal_renderer_canvas_CanvasGraphics.playCommands(openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands,true);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
	openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands = [];
};
openfl__$internal_renderer_canvas_CanvasGraphics.closePath = function() {
	if(openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle == null) return;
	openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
	openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
};
openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect = function(x,y,width,height,rx,ry) {
	if(ry == -1) ry = rx;
	rx *= 0.5;
	ry *= 0.5;
	if(rx > width / 2) rx = width / 2;
	if(ry > height / 2) ry = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cx2 = -rx + rx * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	var cy1 = -ry + ry * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cy2 = -ry + ry * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(xe,ye - ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,ye,xe - rx,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x + rx,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,ye + cy2,x,ye - ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x,y + ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,y,x + rx,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe - rx,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,y - cy2,xe,y + ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe,ye - ry);
};
openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUVT = function(uvt,skipT) {
	if(skipT == null) skipT = false;
	var max = -Infinity;
	var tmp = -Infinity;
	var len = uvt.length;
	var _g1 = 1;
	var _g = len + 1;
	while(_g1 < _g) {
		var t = _g1++;
		if(skipT && t % 3 == 0) continue;
		tmp = uvt.data[t - 1];
		if(max < tmp) max = tmp;
	}
	var result;
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	result = this1;
	var _g11 = 1;
	var _g2 = len + 1;
	while(_g11 < _g2) {
		var t1 = _g11++;
		if(skipT && t1 % 3 == 0) continue;
		if(!result.fixed) {
			result.length++;
			if(result.data.length < result.length) {
				var data;
				var this3;
				this3 = new Array(result.data.length + 10);
				data = this3;
				haxe_ds__$Vector_Vector_$Impl_$.blit(result.data,0,data,0,result.data.length);
				result.data = data;
			}
			result.data[result.length - 1] = uvt.data[t1 - 1] / max;
		}
		result.length;
	}
	return { max : max, uvt : result};
};
openfl__$internal_renderer_canvas_CanvasGraphics.playCommands = function(commands,stroke) {
	if(stroke == null) stroke = false;
	openfl__$internal_renderer_canvas_CanvasGraphics.bounds = openfl__$internal_renderer_canvas_CanvasGraphics.graphics.__bounds;
	var offsetX = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
	var offsetY = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
	var positionX = 0.0;
	var positionY = 0.0;
	var closeGap = false;
	var startX = 0.0;
	var startY = 0.0;
	var _g = 0;
	while(_g < commands.length) {
		var command = commands[_g];
		++_g;
		switch(command[1]) {
		case 3:
			var y = command[7];
			var x = command[6];
			var cy2 = command[5];
			var cx2 = command[4];
			var cy1 = command[3];
			var cx1 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
			break;
		case 4:
			var y1 = command[5];
			var x1 = command[4];
			var cy = command[3];
			var cx = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
			break;
		case 5:
			var radius = command[4];
			var y2 = command[3];
			var x2 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x2 - offsetX + radius,y2 - offsetY);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
			break;
		case 6:
			var height = command[5];
			var width = command[4];
			var y3 = command[3];
			var x3 = command[2];
			x3 -= offsetX;
			y3 -= offsetY;
			var kappa = .5522848;
			var ox = width / 2 * kappa;
			var oy = height / 2 * kappa;
			var xe = x3 + width;
			var ye = y3 + height;
			var xm = x3 + width / 2;
			var ym = y3 + height / 2;
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x3,ym);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
			break;
		case 8:
			var ry = command[7];
			var rx = command[6];
			var height1 = command[5];
			var width1 = command[4];
			var y4 = command[3];
			var x4 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(x4 - offsetX,y4 - offsetY,width1,height1,rx,ry);
			break;
		case 15:
			var y5 = command[3];
			var x5 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x5 - offsetX,y5 - offsetY);
			positionX = x5;
			positionY = y5;
			break;
		case 16:
			var y6 = command[3];
			var x6 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x6 - offsetX,y6 - offsetY);
			positionX = x6;
			positionY = y6;
			closeGap = true;
			startX = x6;
			startY = y6;
			break;
		case 12:
			var miterLimit = command[9];
			var joints = command[8];
			var caps = command[7];
			var scaleMode = command[6];
			var pixelHinting = command[5];
			var alpha = command[4];
			var color = command[3];
			var thickness = command[2];
			if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(positionX - offsetX,positionY - offsetY);
			if(thickness == null) openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false; else {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.lineWidth = thickness;
				if(joints == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = "round"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = Std.string(joints).toLowerCase();
				if(caps == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "round"; else switch(caps[1]) {
				case 0:
					openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "butt";
					break;
				default:
					openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = Std.string(caps).toLowerCase();
				}
				if(miterLimit == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.miterLimit = 3; else openfl__$internal_renderer_canvas_CanvasGraphics.context.miterLimit = miterLimit;
				if(alpha == 1 || alpha == null) if(color == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#000000"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#" + StringTools.hex(color & 16777215,6); else {
					var r = (color & 16711680) >>> 16;
					var g = (color & 65280) >>> 8;
					var b = color & 255;
					if(color == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#000000"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
			}
			break;
		case 14:
			var focalPointRatio = command[9];
			var interpolationMethod = command[8];
			var spreadMethod = command[7];
			var matrix = command[6];
			var ratios = command[5];
			var alphas = command[4];
			var colors = command[3];
			var type = command[2];
			if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) openfl__$internal_renderer_canvas_CanvasGraphics.closePath();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(positionX - offsetX,positionY - offsetY);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createGradientPattern(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
			openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
			break;
		case 13:
			var smooth = command[5];
			var repeat = command[4];
			var matrix1 = command[3];
			var bitmap = command[2];
			if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) openfl__$internal_renderer_canvas_CanvasGraphics.closePath();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(positionX - offsetX,positionY - offsetY);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createBitmapFill(bitmap,repeat);
			openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
			break;
		case 0:
			var smooth1 = command[5];
			var repeat1 = command[4];
			var matrix2 = command[3];
			var bitmap1 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createBitmapFill(bitmap1,true);
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			if(matrix2 != null) {
				openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = matrix2;
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = new openfl_geom_Matrix(matrix2.a,matrix2.b,matrix2.c,matrix2.d,matrix2.tx,matrix2.ty);
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.invert();
			} else {
				openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
			}
			break;
		case 1:
			var alpha1 = command[3];
			var rgb = command[2];
			if(alpha1 < 0.005) openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false; else {
				if(alpha1 == 1) openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "#" + StringTools.hex(rgb,6); else {
					var r1 = (rgb & 16711680) >>> 16;
					var g1 = (rgb & 65280) >>> 8;
					var b1 = rgb & 255;
					openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "rgba(" + r1 + ", " + g1 + ", " + b1 + ", " + alpha1 + ")";
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
				openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			}
			break;
		case 2:
			var focalPointRatio1 = command[9];
			var interpolationMethod1 = command[8];
			var spreadMethod1 = command[7];
			var matrix3 = command[6];
			var ratios1 = command[5];
			var alphas1 = command[4];
			var colors1 = command[3];
			var type1 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createGradientPattern(type1,colors1,alphas1,ratios1,matrix3,spreadMethod1,interpolationMethod1,focalPointRatio1);
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			break;
		case 7:
			var height2 = command[5];
			var width2 = command[4];
			var y7 = command[3];
			var x7 = command[2];
			var optimizationUsed = false;
			if(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill != null) {
				var st = 0;
				var sr = 0;
				var sb = 0;
				var sl = 0;
				var canOptimizeMatrix = true;
				if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
					if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b != 0 || openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c != 0) canOptimizeMatrix = false; else {
						var stl = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(x7,y7));
						var sbr = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(x7 + width2,y7 + height2));
						st = stl.y;
						sl = stl.x;
						sb = sbr.y;
						sr = sbr.x;
					}
				} else {
					st = y7;
					sl = x7;
					sb = y7 + height2;
					sr = x7 + width2;
				}
				if(canOptimizeMatrix && st >= 0 && sl >= 0 && sr <= openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width && sb <= openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height) {
					optimizationUsed = true;
					openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.__image.get_src(),sl,st,sr - sl,sb - st,x7 - offsetX,y7 - offsetY,width2,height2);
				}
			}
			if(!optimizationUsed) openfl__$internal_renderer_canvas_CanvasGraphics.context.rect(x7 - offsetX,y7 - offsetY,width2,height2);
			break;
		default:
		}
	}
	if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) {
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill && closeGap) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(startX - offsetX,startY - offsetY);
		openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
	}
	if(!stroke) {
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill || openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill != null) {
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
			if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.ty);
				openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.ty);
			} else openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
		}
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.createGradientPattern = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	var gradientFill = null;
	switch(type[1]) {
	case 0:
		if(matrix == null) matrix = new openfl_geom_Matrix();
		var point = matrix.transformPoint(new openfl_geom_Point(1638.4,0));
		gradientFill = openfl__$internal_renderer_canvas_CanvasGraphics.context.createRadialGradient(matrix.tx,matrix.ty,0,matrix.tx,matrix.ty,(point.x - matrix.tx) / 2);
		break;
	case 1:
		var matrix1;
		if(matrix != null) matrix1 = matrix; else matrix1 = new openfl_geom_Matrix();
		var point1 = matrix1.transformPoint(new openfl_geom_Point(-819.2,0));
		var point2 = matrix1.transformPoint(new openfl_geom_Point(819.2,0));
		gradientFill = openfl__$internal_renderer_canvas_CanvasGraphics.context.createLinearGradient(point1.x,point1.y,point2.x,point2.y);
		break;
	}
	var _g1 = 0;
	var _g = colors.length;
	while(_g1 < _g) {
		var i = _g1++;
		var rgb = colors[i];
		var alpha = alphas[i];
		var r = (rgb & 16711680) >>> 16;
		var g = (rgb & 65280) >>> 8;
		var b = rgb & 255;
		var ratio = ratios[i] / 255;
		if(ratio < 0) ratio = 0;
		if(ratio > 1) ratio = 1;
		gradientFill.addColorStop(ratio,"rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")");
	}
	return gradientFill;
};
openfl__$internal_renderer_canvas_CanvasGraphics.render = function(graphics,renderSession) {
	if(graphics.__dirty) {
		openfl__$internal_renderer_canvas_CanvasGraphics.graphics = graphics;
		openfl__$internal_renderer_canvas_CanvasGraphics.bounds = graphics.__bounds;
		if(!graphics.__visible || graphics.__commands.length == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds == null || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height == 0) {
			graphics.__canvas = null;
			graphics.__context = null;
			graphics.__bitmap = null;
		} else {
			if(graphics.__canvas == null) {
				graphics.__canvas = window.document.createElement("canvas");
				graphics.__context = graphics.__canvas.getContext("2d");
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.context = graphics.__context;
			graphics.__canvas.width = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width);
			graphics.__canvas.height = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height);
			var offsetX = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
			var offsetY = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
			openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands = [];
			openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands = [];
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
			openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false;
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = false;
			var _g = 0;
			var _g1 = graphics.__commands;
			try {
				while(_g < _g1.length) {
					var command = _g1[_g];
					++_g;
					switch(command[1]) {
					case 3:case 4:case 15:case 16:
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.push(command);
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 11:
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
						openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
						break;
					case 12:case 14:case 13:
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 0:case 1:case 2:
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.push(command);
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 5:case 6:case 7:case 8:
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.push(command);
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 10:
						var culling = command[5];
						var uvtData = command[4];
						var indices = command[3];
						var vertices = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						var v = vertices;
						var ind = indices;
						var uvt = uvtData;
						var pattern = null;
						var colorFill = openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill == null;
						if(colorFill && uvt != null) throw "__break__";
						if(!colorFill) {
							if(uvtData == null) {
								var this1;
								this1 = new openfl_VectorData();
								var this2;
								this2 = new Array(0);
								this1.data = this2;
								this1.length = 0;
								this1.fixed = false;
								uvtData = this1;
								var _g3 = 0;
								var _g2 = v.length / 2 | 0;
								while(_g3 < _g2) {
									var i1 = _g3++;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data;
											var this3;
											this3 = new Array(uvtData.data.length + 10);
											data = this3;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data,0,uvtData.data.length);
											uvtData.data = data;
										}
										uvtData.data[uvtData.length - 1] = v.data[i1 * 2] / openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width;
									}
									uvtData.length;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data1;
											var this4;
											this4 = new Array(uvtData.data.length + 10);
											data1 = this4;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data1,0,uvtData.data.length);
											uvtData.data = data1;
										}
										uvtData.data[uvtData.length - 1] = v.data[i1 * 2 + 1] / openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height;
									}
									uvtData.length;
								}
							}
							var skipT = uvtData.length != v.length;
							var normalizedUVT = openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUVT(uvtData,skipT);
							var maxUVT = normalizedUVT.max;
							uvt = normalizedUVT.uvt;
							if(maxUVT > 1) pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width | 0,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height | 0); else pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height);
						}
						var i = 0;
						var l = ind.length;
						var a;
						var b;
						var c;
						var iax;
						var iay;
						var ibx;
						var iby;
						var icx;
						var icy;
						var x1;
						var y1;
						var x2;
						var y2;
						var x3;
						var y3;
						var uvx1;
						var uvy1;
						var uvx2;
						var uvy2;
						var uvx3;
						var uvy3;
						var denom;
						var t1;
						var t2;
						var t3;
						var t4;
						var dx;
						var dy;
						while(i < l) {
							a = i;
							b = i + 1;
							c = i + 2;
							iax = ind.data[a] * 2;
							iay = ind.data[a] * 2 + 1;
							ibx = ind.data[b] * 2;
							iby = ind.data[b] * 2 + 1;
							icx = ind.data[c] * 2;
							icy = ind.data[c] * 2 + 1;
							x1 = v.data[iax];
							y1 = v.data[iay];
							x2 = v.data[ibx];
							y2 = v.data[iby];
							x3 = v.data[icx];
							y3 = v.data[icy];
							switch(culling[1]) {
							case 2:
								if(!((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0)) {
									i += 3;
									continue;
								}
								break;
							case 0:
								if((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0) {
									i += 3;
									continue;
								}
								break;
							default:
							}
							if(colorFill) {
								openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x1,y1);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x2,y2);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x3,y3);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
								i += 3;
								continue;
							}
							openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x1,y1);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x2,y2);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x3,y3);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.clip();
							uvx1 = uvt.data[iax] * pattern.width;
							uvx2 = uvt.data[ibx] * pattern.width;
							uvx3 = uvt.data[icx] * pattern.width;
							uvy1 = uvt.data[iay] * pattern.height;
							uvy2 = uvt.data[iby] * pattern.height;
							uvy3 = uvt.data[icy] * pattern.height;
							denom = uvx1 * (uvy3 - uvy2) - uvx2 * uvy3 + uvx3 * uvy2 + (uvx2 - uvx3) * uvy1;
							if(denom == 0) {
								i += 3;
								continue;
							}
							t1 = -(uvy1 * (x3 - x2) - uvy2 * x3 + uvy3 * x2 + (uvy2 - uvy3) * x1) / denom;
							t2 = (uvy2 * y3 + uvy1 * (y2 - y3) - uvy3 * y2 + (uvy3 - uvy2) * y1) / denom;
							t3 = (uvx1 * (x3 - x2) - uvx2 * x3 + uvx3 * x2 + (uvx2 - uvx3) * x1) / denom;
							t4 = -(uvx2 * y3 + uvx1 * (y2 - y3) - uvx3 * y2 + (uvx3 - uvx2) * y1) / denom;
							dx = (uvx1 * (uvy3 * x2 - uvy2 * x3) + uvy1 * (uvx2 * x3 - uvx3 * x2) + (uvx3 * uvy2 - uvx2 * uvy3) * x1) / denom;
							dy = (uvx1 * (uvy3 * y2 - uvy2 * y3) + uvy1 * (uvx2 * y3 - uvx3 * y2) + (uvx3 * uvy2 - uvx2 * uvy3) * y1) / denom;
							openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(t1,t2,t3,t4,dx,dy);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(pattern,0,0);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							i += 3;
						}
						break;
					case 9:
						var count = command[6];
						var flags = command[5];
						var smooth = command[4];
						var tileData = command[3];
						var sheet = command[2];
						var useScale = (flags & 1) > 0;
						var useRotation = (flags & 2) > 0;
						var useTransform = (flags & 16) > 0;
						var useRGB = (flags & 4) > 0;
						var useAlpha = (flags & 8) > 0;
						var useRect = (flags & 32) > 0;
						var useOrigin = (flags & 64) > 0;
						var useBlendAdd = (flags & 65536) > 0;
						if(useTransform) {
							useScale = false;
							useRotation = false;
						}
						var scaleIndex = 0;
						var rotationIndex = 0;
						var rgbIndex = 0;
						var alphaIndex = 0;
						var transformIndex = 0;
						var numValues = 3;
						if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
						if(useScale) {
							scaleIndex = numValues;
							numValues++;
						}
						if(useRotation) {
							rotationIndex = numValues;
							numValues++;
						}
						if(useTransform) {
							transformIndex = numValues;
							numValues += 4;
						}
						if(useRGB) {
							rgbIndex = numValues;
							numValues += 3;
						}
						if(useAlpha) {
							alphaIndex = numValues;
							numValues++;
						}
						var totalCount = tileData.length;
						if(count >= 0 && totalCount > count) totalCount = count;
						var itemCount = totalCount / numValues | 0;
						var index = 0;
						var rect = null;
						var center = null;
						var previousTileID = -1;
						var surface;
						sheet.__bitmap.__sync();
						surface = sheet.__bitmap.__image.get_src();
						if(useBlendAdd) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalCompositeOperation = "lighter";
						while(index < totalCount) {
							var tileID;
							if(!useRect) tileID = tileData[index + 2] | 0; else tileID = -1;
							if(!useRect && tileID != previousTileID) {
								rect = sheet.__tileRects[tileID];
								center = sheet.__centerPoints[tileID];
								previousTileID = tileID;
							} else if(useRect) {
								rect = sheet.__rectTile;
								rect.setTo(tileData[index + 2],tileData[index + 3],tileData[index + 4],tileData[index + 5]);
								center = sheet.__point;
								if(useOrigin) {
									center.x = tileData[index + 6];
									center.y = tileData[index + 7];
								} else {
									center.x = 0;
									center.y = 0;
								}
							}
							if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
								openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(tileData[index],tileData[index + 1]);
								if(useRotation) openfl__$internal_renderer_canvas_CanvasGraphics.context.rotate(tileData[index + rotationIndex]);
								var scale = 1.0;
								if(useScale) scale = tileData[index + scaleIndex];
								if(useTransform) openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
								if(useAlpha) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalAlpha = tileData[index + alphaIndex];
								openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							}
							index += numValues;
						}
						if(useBlendAdd) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalCompositeOperation = "source-over";
						break;
					default:
						openfl_Lib.notImplemented("CanvasGraphics");
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			if(openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.length > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
			if(openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.length > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
			graphics.__bitmap = openfl_display_BitmapData.fromCanvas(graphics.__canvas);
		}
		graphics.set___dirty(false);
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.renderMask = function(graphics,renderSession) {
	if(graphics.__commands.length != 0) {
		var context = renderSession.context;
		var positionX = 0.0;
		var positionY = 0.0;
		var offsetX = 0;
		var offsetY = 0;
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 3:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cy1 = command[4];
				var cx2 = command[3];
				var cx1 = command[2];
				context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
				positionX = x;
				positionY = y;
				break;
			case 4:
				var y1 = command[5];
				var x1 = command[4];
				var cy = command[3];
				var cx = command[2];
				context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
				positionX = x1;
				positionY = y1;
				break;
			case 5:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
				break;
			case 6:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				x3 -= offsetX;
				y3 -= offsetY;
				var kappa = .5522848;
				var ox = width / 2 * kappa;
				var oy = height / 2 * kappa;
				var xe = x3 + width;
				var ye = y3 + height;
				var xm = x3 + width / 2;
				var ym = y3 + height / 2;
				context.moveTo(x3,ym);
				context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
				context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
				context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
				context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
				break;
			case 7:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				context.rect(x4 - offsetX,y4 - offsetY,width1,height1);
				break;
			case 8:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
				break;
			case 15:
				var y6 = command[3];
				var x6 = command[2];
				context.lineTo(x6 - offsetX,y6 - offsetY);
				positionX = x6;
				positionY = y6;
				break;
			case 16:
				var y7 = command[3];
				var x7 = command[2];
				context.moveTo(x7 - offsetX,y7 - offsetY);
				positionX = x7;
				positionY = y7;
				break;
			default:
			}
		}
	}
};
var openfl__$internal_renderer_canvas_CanvasMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasMaskManager"] = openfl__$internal_renderer_canvas_CanvasMaskManager;
openfl__$internal_renderer_canvas_CanvasMaskManager.__name__ = true;
openfl__$internal_renderer_canvas_CanvasMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_canvas_CanvasMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		var context = this.renderSession.context;
		context.save();
		var transform = mask.__getTransform();
		context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		context.beginPath();
		mask.__renderCanvasMask(this.renderSession);
		context.clip();
	}
	,pushRect: function(rect,transform) {
		var context = this.renderSession.context;
		context.save();
		context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		context.beginPath();
		context.rect(rect.x,rect.y,rect.width,rect.height);
		context.clip();
	}
	,popMask: function() {
		this.renderSession.context.restore();
	}
	,__class__: openfl__$internal_renderer_canvas_CanvasMaskManager
});
var openfl__$internal_renderer_canvas_CanvasRenderer = function(width,height,context) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.context = context;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.context = context;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl__$internal_renderer_canvas_CanvasMaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasRenderer"] = openfl__$internal_renderer_canvas_CanvasRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.__name__ = true;
openfl__$internal_renderer_canvas_CanvasRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.context.setTransform(1,0,0,1,0,0);
		this.context.globalAlpha = 1;
		if(!stage.__transparent && stage.__clearBeforeRender) {
			this.context.fillStyle = stage.__colorString;
			this.context.fillRect(0,0,stage.stageWidth,stage.stageHeight);
		} else if(stage.__transparent && stage.__clearBeforeRender) this.context.clearRect(0,0,stage.stageWidth,stage.stageHeight);
		stage.__renderCanvas(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_canvas_CanvasRenderer
});
var openfl__$internal_renderer_canvas_CanvasShape = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasShape"] = openfl__$internal_renderer_canvas_CanvasShape;
openfl__$internal_renderer_canvas_CanvasShape.__name__ = true;
openfl__$internal_renderer_canvas_CanvasShape.render = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	var graphics = shape.__graphics;
	if(graphics != null) {
		openfl__$internal_renderer_canvas_CanvasGraphics.render(graphics,renderSession);
		if(graphics.__canvas != null) {
			if(shape.__mask != null) renderSession.maskManager.pushMask(shape.__mask);
			var context = renderSession.context;
			var scrollRect = shape.get_scrollRect();
			context.globalAlpha = shape.__worldAlpha;
			var transform = shape.__worldTransform;
			if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
			if(scrollRect == null) context.drawImage(graphics.__canvas,graphics.__bounds.x,graphics.__bounds.y); else context.drawImage(graphics.__canvas,Math.ceil(graphics.__bounds.x + scrollRect.x),Math.ceil(graphics.__bounds.y + scrollRect.y),scrollRect.width,scrollRect.height,Math.ceil(graphics.__bounds.x + scrollRect.x),Math.ceil(graphics.__bounds.y + scrollRect.y),scrollRect.width,scrollRect.height);
			if(shape.__mask != null) renderSession.maskManager.popMask();
		}
	}
};
var openfl__$internal_renderer_dom_DOMMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.dom.DOMMaskManager"] = openfl__$internal_renderer_dom_DOMMaskManager;
openfl__$internal_renderer_dom_DOMMaskManager.__name__ = true;
openfl__$internal_renderer_dom_DOMMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_dom_DOMMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
	}
	,pushRect: function(rect,transform) {
	}
	,popMask: function() {
	}
	,__class__: openfl__$internal_renderer_dom_DOMMaskManager
});
var openfl__$internal_renderer_dom_DOMRenderer = function(width,height,element) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.element = element;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.element = element;
	this.renderSession.roundPixels = true;
	var prefix = (function () {
		  var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
			  .call(styles)
			  .join('') 
			  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		  return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		  };
		})();
	this.renderSession.vendorPrefix = prefix.lowercase;
	if(prefix.lowercase == "webkit") this.renderSession.transformProperty = "-webkit-transform"; else this.renderSession.transformProperty = "transform";
	if(prefix.lowercase == "webkit") this.renderSession.transformOriginProperty = "-webkit-transform-origin"; else this.renderSession.transformOriginProperty = "transform-origin";
	this.renderSession.maskManager = new openfl__$internal_renderer_dom_DOMMaskManager(this.renderSession);
	this.renderSession.renderer = this;
};
$hxClasses["openfl._internal.renderer.dom.DOMRenderer"] = openfl__$internal_renderer_dom_DOMRenderer;
openfl__$internal_renderer_dom_DOMRenderer.__name__ = true;
openfl__$internal_renderer_dom_DOMRenderer.applyStyle = function(displayObject,renderSession,setTransform,setAlpha,setClip) {
	var style = displayObject.__style;
	if(setTransform && displayObject.__worldTransformChanged) style.setProperty(renderSession.transformProperty,displayObject.__worldTransform.to3DString(renderSession.roundPixels),null);
	if(displayObject.__worldZ != ++renderSession.z) {
		displayObject.__worldZ = renderSession.z;
		style.setProperty("z-index",displayObject.__worldZ == null?"null":"" + displayObject.__worldZ,null);
	}
	if(setAlpha && displayObject.__worldAlphaChanged) {
		if(displayObject.__worldAlpha < 1) style.setProperty("opacity",displayObject.__worldAlpha == null?"null":"" + displayObject.__worldAlpha,null); else style.removeProperty("opacity");
	}
	if(setClip && displayObject.__worldClipChanged) {
		if(displayObject.__worldClip == null) style.removeProperty("clip"); else {
			var clip = openfl_geom_Rectangle.__temp;
			var matrix = openfl_geom_Matrix.__temp;
			matrix.copyFrom(displayObject.__worldTransform);
			matrix.invert();
			displayObject.__worldClip.__transform(clip,matrix);
			style.setProperty("clip","rect(" + clip.y + "px, " + clip.get_right() + "px, " + clip.get_bottom() + "px, " + clip.x + "px)",null);
		}
	}
};
openfl__$internal_renderer_dom_DOMRenderer.initializeElement = function(displayObject,element,renderSession) {
	var style = displayObject.__style = element.style;
	style.setProperty("position","absolute",null);
	style.setProperty("top","0",null);
	style.setProperty("left","0",null);
	style.setProperty(renderSession.transformOriginProperty,"0 0 0",null);
	renderSession.element.appendChild(element);
	displayObject.__worldAlphaChanged = true;
	displayObject.__worldClipChanged = true;
	displayObject.__worldTransformChanged = true;
	displayObject.__worldVisibleChanged = true;
	displayObject.__worldZ = -1;
};
openfl__$internal_renderer_dom_DOMRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_dom_DOMRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.element.style.background = stage.__colorString;
		this.renderSession.z = 1;
		stage.__renderDOM(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_dom_DOMRenderer
});
var openfl__$internal_renderer_dom_DOMShape = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMShape"] = openfl__$internal_renderer_dom_DOMShape;
openfl__$internal_renderer_dom_DOMShape.__name__ = true;
openfl__$internal_renderer_dom_DOMShape.render = function(shape,renderSession) {
	var graphics = shape.__graphics;
	if(shape.stage != null && shape.__worldVisible && shape.__renderable && graphics != null) {
		if(graphics.__dirty || shape.__worldAlphaChanged || shape.__canvas == null && graphics.__canvas != null) {
			openfl__$internal_renderer_canvas_CanvasGraphics.render(graphics,renderSession);
			if(graphics.__canvas != null) {
				if(shape.__canvas == null) {
					shape.__canvas = window.document.createElement("canvas");
					shape.__context = shape.__canvas.getContext("2d");
					openfl__$internal_renderer_dom_DOMRenderer.initializeElement(shape,shape.__canvas,renderSession);
				}
				shape.__canvas.width = graphics.__canvas.width;
				shape.__canvas.height = graphics.__canvas.height;
				shape.__context.globalAlpha = shape.__worldAlpha;
				shape.__context.drawImage(graphics.__canvas,0,0);
			} else if(shape.__canvas != null) {
				renderSession.element.removeChild(shape.__canvas);
				shape.__canvas = null;
				shape.__style = null;
			}
		}
		if(shape.__canvas != null) {
			if(shape.__worldTransformChanged || graphics.__transformDirty) {
				graphics.__transformDirty = false;
				var transform = openfl_geom_Matrix.__temp;
				transform.identity();
				transform.translate(graphics.__bounds.x,graphics.__bounds.y);
				transform.concat(shape.__worldTransform);
				shape.__style.setProperty(renderSession.transformProperty,renderSession.roundPixels?"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + (transform.tx | 0) + ", " + (transform.ty | 0) + ", 0, 1)":"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + transform.tx + ", " + transform.ty + ", 0, 1)",null);
			}
			openfl__$internal_renderer_dom_DOMRenderer.applyStyle(shape,renderSession,false,false,true);
		}
	} else if(shape.__canvas != null) {
		renderSession.element.removeChild(shape.__canvas);
		shape.__canvas = null;
		shape.__style = null;
	}
};
var openfl__$internal_renderer_opengl_GLRenderer = function(width,height,gl,transparent,antialias,preserveDrawingBuffer) {
	if(preserveDrawingBuffer == null) preserveDrawingBuffer = false;
	if(antialias == null) antialias = false;
	if(transparent == null) transparent = false;
	if(height == null) height = 600;
	if(width == null) width = 800;
	this.vpHeight = 0;
	this.vpWidth = 0;
	this.vpY = 0;
	this.vpX = 0;
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.transparent = transparent;
	this.preserveDrawingBuffer = preserveDrawingBuffer;
	this.width = width;
	this.height = height;
	this.options = { alpha : transparent, antialias : antialias, premultipliedAlpha : transparent, stencil : true, preserveDrawingBuffer : preserveDrawingBuffer};
	this._glContextId = openfl__$internal_renderer_opengl_GLRenderer.glContextId++;
	this.gl = gl;
	this.defaultFramebuffer = null;
	openfl__$internal_renderer_opengl_GLRenderer.glContexts[this._glContextId] = gl;
	this.projectionMatrix = new openfl_geom_Matrix();
	this.projection = new openfl_geom_Point();
	this.projection.x = this.width / 2;
	this.projection.y = -this.height / 2;
	this.offset = new openfl_geom_Point(0,0);
	this.resize(this.width,this.height);
	this.contextLost = false;
	this.shaderManager = new openfl__$internal_renderer_opengl_utils_ShaderManager(gl);
	this.spriteBatch = new openfl__$internal_renderer_opengl_utils_SpriteBatch(gl);
	this.filterManager = new openfl__$internal_renderer_opengl_utils_FilterManager(gl,this.transparent);
	this.stencilManager = new openfl__$internal_renderer_opengl_utils_StencilManager(gl);
	this.blendModeManager = new openfl__$internal_renderer_opengl_utils_BlendModeManager(gl);
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.gl = this.gl;
	this.renderSession.drawCount = 0;
	this.renderSession.shaderManager = this.shaderManager;
	this.renderSession.maskManager = this.maskManager;
	this.renderSession.filterManager = this.filterManager;
	this.renderSession.blendModeManager = this.blendModeManager;
	this.renderSession.spriteBatch = this.spriteBatch;
	this.renderSession.stencilManager = this.stencilManager;
	this.renderSession.renderer = this;
	this.renderSession.defaultFramebuffer = this.defaultFramebuffer;
	this.renderSession.projectionMatrix = this.projectionMatrix;
	this.maskManager = new openfl__$internal_renderer_opengl_utils_GLMaskManager(this.renderSession);
	this.renderSession.maskManager = this.maskManager;
	this.shaderManager.setShader(this.shaderManager.defaultShader);
	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);
	gl.enable(gl.BLEND);
	gl.colorMask(true,true,true,this.transparent);
};
$hxClasses["openfl._internal.renderer.opengl.GLRenderer"] = openfl__$internal_renderer_opengl_GLRenderer;
openfl__$internal_renderer_opengl_GLRenderer.__name__ = true;
openfl__$internal_renderer_opengl_GLRenderer.renderBitmap = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	if(shape.__graphics == null || shape.__graphics.__bitmap == null) return;
	var rect = openfl_geom_Rectangle.__temp;
	var matrix = openfl_geom_Matrix.__temp;
	rect.setEmpty();
	matrix.identity();
	shape.__getBounds(rect,matrix);
	var bitmap = shape.__graphics.__bitmap;
	matrix.translate(shape.__graphics.__bounds.x,shape.__graphics.__bounds.y);
	matrix.concat(shape.__worldTransform);
	renderSession.spriteBatch.renderBitmapData(bitmap,true,matrix,shape.__worldColorTransform,shape.__worldAlpha,shape.__blendMode,openfl_display_PixelSnapping.ALWAYS);
};
openfl__$internal_renderer_opengl_GLRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_opengl_GLRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	setViewport: function(x,y,width,height) {
		if(!(this.vpX == x && this.vpY == y && this.vpWidth == width && this.vpHeight == height)) {
			this.vpX = x;
			this.vpY = y;
			this.vpWidth = width;
			this.vpHeight = height;
			this.gl.viewport(x,y,width,height);
			this.setOrtho(x,y,width,height);
		}
	}
	,setOrtho: function(x,y,width,height) {
		var o = this.projectionMatrix;
		o.identity();
		o.a = 1 / width * 2;
		o.d = -1 / height * 2;
		o.tx = -1 - x * o.a;
		o.ty = 1 - y * o.d;
	}
	,render: function(stage) {
		if(this.contextLost) return;
		var gl = this.gl;
		this.setViewport(0,0,this.width,this.height);
		gl.bindFramebuffer(gl.FRAMEBUFFER,this.defaultFramebuffer);
		if(this.transparent) gl.clearColor(0,0,0,0); else gl.clearColor(stage.__colorSplit[0],stage.__colorSplit[1],stage.__colorSplit[2],1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		this.renderDisplayObject(stage,this.projection);
	}
	,renderDisplayObject: function(displayObject,projection,buffer) {
		this.renderSession.blendModeManager.setBlendMode(openfl_display_BlendMode.NORMAL);
		this.renderSession.drawCount = 0;
		this.renderSession.currentBlendMode = null;
		this.spriteBatch.begin(this.renderSession);
		this.filterManager.begin(this.renderSession,buffer);
		displayObject.__renderGL(this.renderSession);
		this.spriteBatch.finish();
	}
	,resize: function(width,height) {
		this.width = width;
		this.height = height;
		openfl__$internal_renderer_AbstractRenderer.prototype.resize.call(this,width,height);
		this.setViewport(0,0,width,height);
		this.projection.x = width / 2;
		this.projection.y = -height / 2;
	}
	,__class__: openfl__$internal_renderer_opengl_GLRenderer
});
var openfl__$internal_renderer_opengl_shaders2_Shader = function(gl) {
	this.uniforms = new haxe_ds_StringMap();
	this.attributes = new haxe_ds_StringMap();
	this.ID = openfl__$internal_renderer_opengl_shaders2_Shader.UID++;
	this.gl = gl;
	this.program = null;
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.Shader"] = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_Shader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_Shader.compileProgram = function(gl,vertexSrc,fragmentSrc) {
	var vertexShader = openfl__$internal_renderer_opengl_shaders2_Shader.compileShader(gl,vertexSrc,gl.VERTEX_SHADER);
	var fragmentShader = openfl__$internal_renderer_opengl_shaders2_Shader.compileShader(gl,fragmentSrc,gl.FRAGMENT_SHADER);
	var program = gl.createProgram();
	if(vertexShader != null && fragmentShader != null) {
		gl.attachShader(program,vertexShader);
		gl.attachShader(program,fragmentShader);
		gl.linkProgram(program);
		if(gl.getProgramParameter(program,gl.LINK_STATUS) == 0) console.log("Could not initialize shaders");
	}
	return program;
};
openfl__$internal_renderer_opengl_shaders2_Shader.compileShader = function(gl,shaderSrc,type) {
	var src = shaderSrc.join("\n");
	var shader = gl.createShader(type);
	gl.shaderSource(shader,src);
	gl.compileShader(shader);
	if(gl.getShaderParameter(shader,gl.COMPILE_STATUS) == 0) {
		console.log(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
};
openfl__$internal_renderer_opengl_shaders2_Shader.prototype = {
	init: function() {
		this.program = openfl__$internal_renderer_opengl_shaders2_Shader.compileProgram(this.gl,this.vertexSrc,this.fragmentSrc);
		this.gl.useProgram(this.program);
	}
	,getAttribLocation: function(attribute) {
		if(this.program == null) throw new js__$Boot_HaxeError("Shader isn't initialized");
		if(this.attributes.exists(attribute)) return this.attributes.get(attribute); else {
			var location = this.gl.getAttribLocation(this.program,attribute);
			this.attributes.set(attribute,location);
			return location;
		}
	}
	,getUniformLocation: function(uniform) {
		if(this.program == null) throw new js__$Boot_HaxeError("Shader isn't initialized");
		if(this.uniforms.exists(uniform)) return this.uniforms.get(uniform); else {
			var location = this.gl.getUniformLocation(this.program,uniform);
			this.uniforms.set(uniform,location);
			return location;
		}
	}
	,enableVertexAttribute: function(attribute,stride,offset) {
		var location = this.getAttribLocation(attribute.name);
		this.gl.enableVertexAttribArray(location);
		this.gl.vertexAttribPointer(location,attribute.components,attribute.type,attribute.normalized,stride,offset * 4);
	}
	,disableVertexAttribute: function(attribute,setDefault) {
		if(setDefault == null) setDefault = true;
		var location = this.getAttribLocation(attribute.name);
		this.gl.disableVertexAttribArray(location);
		if(setDefault) {
			var _g = attribute.components;
			switch(_g) {
			case 1:
				this.gl.vertexAttrib1fv(location,attribute.defaultValue.subarray(0,1));
				break;
			case 2:
				this.gl.vertexAttrib2fv(location,attribute.defaultValue.subarray(0,2));
				break;
			case 3:
				this.gl.vertexAttrib3fv(location,attribute.defaultValue.subarray(0,3));
				break;
			default:
				this.gl.vertexAttrib4fv(location,attribute.defaultValue.subarray(0,4));
			}
		}
	}
	,bindVertexArray: function(va) {
		var offset = 0;
		var stride = va.get_stride();
		var _g = 0;
		var _g1 = va.attributes;
		while(_g < _g1.length) {
			var attribute = _g1[_g];
			++_g;
			if(attribute.enabled) {
				this.enableVertexAttribute(attribute,stride,offset);
				offset += Math.floor(attribute.components * attribute.getElementsBytes() / 4);
			} else this.disableVertexAttribute(attribute,true);
		}
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_Shader
};
var openfl__$internal_renderer_opengl_shaders2_DefaultShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","attribute vec2 " + "aTexCoord0" + ";","attribute vec4 " + "aColor" + ";","uniform mat3 " + "uProjectionMatrix" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vTexCoord = " + "aTexCoord0" + ";","   vColor = " + "aColor" + ";","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","uniform sampler2D " + "uSampler0" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","vec4 colorTransform(const vec4 color, const vec4 tint, const vec4 multiplier, const vec4 offset) {","   vec4 unmultiply = vec4(color.rgb / color.a, color.a);","   vec4 result = unmultiply * tint * multiplier;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   vec4 tc = texture2D(" + "uSampler0" + ", vTexCoord);","   gl_FragColor = colorTransform(tc, vColor, " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.DefaultShader"] = openfl__$internal_renderer_opengl_shaders2_DefaultShader;
openfl__$internal_renderer_opengl_shaders2_DefaultShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_DefaultShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_DefaultShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getAttribLocation("aTexCoord0");
		this.getAttribLocation("aColor");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uSampler0");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_DefaultShader
});
var openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","attribute vec2 " + "aTexCoord0" + ";","attribute vec4 " + "aColor" + ";","uniform mat3 " + "uProjectionMatrix" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vTexCoord = " + "aTexCoord0" + ";","   vColor = " + "aColor" + ".bgra;","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","uniform sampler2D " + "uSampler0" + ";","uniform vec3 " + "uColor" + ";","uniform bool " + "uUseTexture" + ";","uniform float " + "uAlpha" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","vec4 tmp;","vec4 colorTransform(const vec4 color, const vec4 tint, const vec4 multiplier, const vec4 offset) {","   vec4 unmultiply = vec4(color.rgb / color.a, color.a);","   vec4 result = unmultiply * tint * multiplier;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   if(" + "uUseTexture" + ") {","       tmp = texture2D(" + "uSampler0" + ", vTexCoord);","   } else {","       tmp = vec4(" + "uColor" + ", 1.);","   }","   gl_FragColor = colorTransform(tmp, vColor, " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.DrawTrianglesShader"] = openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader;
openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getAttribLocation("aTexCoord0");
		this.getAttribLocation("aColor");
		this.getUniformLocation("uSampler0");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uColor");
		this.getUniformLocation("uAlpha");
		this.getUniformLocation("uUseTexture");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader
});
var openfl__$internal_renderer_opengl_shaders2_FillShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","uniform mat3 " + "uTranslationMatrix" + ";","uniform mat3 " + "uProjectionMatrix" + ";","uniform vec4 " + "uColor" + ";","uniform float " + "uAlpha" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec4 vColor;","vec4 colorTransform(const vec4 color, const float alpha, const vec4 multiplier, const vec4 offset) {","   vec4 result = color * multiplier;","   result.a *= alpha;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * " + "uTranslationMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vColor = colorTransform(" + "uColor" + ", " + "uAlpha" + ", " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.FillShader"] = openfl__$internal_renderer_opengl_shaders2_FillShader;
openfl__$internal_renderer_opengl_shaders2_FillShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_FillShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_FillShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getUniformLocation("uTranslationMatrix");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uColor");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_FillShader
});
var openfl__$internal_renderer_opengl_shaders2_PatternFillShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","uniform mat3 " + "uTranslationMatrix" + ";","uniform mat3 " + "uProjectionMatrix" + ";","uniform mat3 " + "uPatternMatrix" + ";","varying vec2 vPosition;","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * " + "uTranslationMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vPosition = (" + "uPatternMatrix" + " * vec3(" + "aPosition" + ", 1)).xy;","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","uniform float " + "uAlpha" + ";","uniform vec2 " + "uPatternTL" + ";","uniform vec2 " + "uPatternBR" + ";","uniform sampler2D " + "uSampler0" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec2 vPosition;","vec4 colorTransform(const vec4 color, const float alpha, const vec4 multiplier, const vec4 offset) {","   vec4 unmultiply = vec4(color.rgb / color.a, color.a);","   vec4 result = unmultiply * multiplier;","   result.a *= alpha;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   vec2 pos = mix(" + "uPatternTL" + ", " + "uPatternBR" + ", vPosition);","   vec4 tcol = texture2D(" + "uSampler0" + ", pos);","   gl_FragColor = colorTransform(tcol, " + "uAlpha" + ", " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.PatternFillShader"] = openfl__$internal_renderer_opengl_shaders2_PatternFillShader;
openfl__$internal_renderer_opengl_shaders2_PatternFillShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_PatternFillShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_PatternFillShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getUniformLocation("uTranslationMatrix");
		this.getUniformLocation("uPatternMatrix");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uSampler0");
		this.getUniformLocation("uPatternTL");
		this.getUniformLocation("uPatternBR");
		this.getUniformLocation("uAlpha");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_PatternFillShader
});
var openfl__$internal_renderer_opengl_shaders2_PrimitiveShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","attribute vec4 " + "aColor" + ";","uniform mat3 " + "uTranslationMatrix" + ";","uniform mat3 " + "uProjectionMatrix" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","uniform float " + "uAlpha" + ";","varying vec4 vColor;","vec4 colorTransform(const vec4 color, const float alpha, const vec4 multiplier, const vec4 offset) {","   vec4 result = color * multiplier;","   result.a *= alpha;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * " + "uTranslationMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vColor = colorTransform(" + "aColor" + ", " + "uAlpha" + ", " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.PrimitiveShader"] = openfl__$internal_renderer_opengl_shaders2_PrimitiveShader;
openfl__$internal_renderer_opengl_shaders2_PrimitiveShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_PrimitiveShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_PrimitiveShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getAttribLocation("aColor");
		this.getUniformLocation("uTranslationMatrix");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uAlpha");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_PrimitiveShader
});
var openfl__$internal_renderer_opengl_utils_BlendModeManager = function(gl) {
	this.gl = gl;
	this.currentBlendMode = null;
};
$hxClasses["openfl._internal.renderer.opengl.utils.BlendModeManager"] = openfl__$internal_renderer_opengl_utils_BlendModeManager;
openfl__$internal_renderer_opengl_utils_BlendModeManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_BlendModeManager.prototype = {
	setBlendMode: function(blendMode,force) {
		if(force == null) force = false;
		if(blendMode == null) {
			blendMode = openfl_display_BlendMode.NORMAL;
			force = true;
		}
		if(!force && this.currentBlendMode == blendMode) return false;
		this.currentBlendMode = blendMode;
		switch(blendMode[1]) {
		case 0:
			this.gl.blendEquation(32774);
			this.gl.blendFunc(1,1);
			break;
		case 9:
			this.gl.blendEquation(32774);
			this.gl.blendFunc(774,771);
			break;
		case 12:
			this.gl.blendEquation(32774);
			this.gl.blendFunc(1,769);
			break;
		case 13:
			this.gl.blendEquation(32779);
			this.gl.blendFunc(1,1);
			break;
		default:
			this.gl.blendEquation(32774);
			this.gl.blendFunc(1,771);
		}
		return true;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_BlendModeManager
};
var openfl__$internal_renderer_opengl_utils_DrawPath = function() {
	this.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
	this.points = [];
	this.winding = 0;
	this.isRemovable = true;
	this.fillIndex = 0;
	this.line = new openfl__$internal_renderer_opengl_utils_LineStyle();
	this.fill = openfl__$internal_renderer_opengl_utils_FillType.None;
};
$hxClasses["openfl._internal.renderer.opengl.utils.DrawPath"] = openfl__$internal_renderer_opengl_utils_DrawPath;
openfl__$internal_renderer_opengl_utils_DrawPath.__name__ = true;
openfl__$internal_renderer_opengl_utils_DrawPath.getStack = function(graphics,gl) {
	return openfl__$internal_renderer_opengl_utils_PathBuiler.build(graphics,gl);
};
openfl__$internal_renderer_opengl_utils_DrawPath.prototype = {
	update: function(line,fill,fillIndex,winding) {
		this.updateLine(line);
		this.fill = fill;
		this.fillIndex = fillIndex;
		this.winding = winding;
	}
	,updateLine: function(line) {
		this.line.width = line.width;
		this.line.color = line.color;
		if(line.alpha == null) this.line.alpha = 1; else this.line.alpha = line.alpha;
		if(line.scaleMode == null) this.line.scaleMode = openfl_display_LineScaleMode.NORMAL; else this.line.scaleMode = line.scaleMode;
		if(line.caps == null) this.line.caps = openfl_display_CapsStyle.ROUND; else this.line.caps = line.caps;
		if(line.joints == null) this.line.joints = openfl_display_JointStyle.ROUND; else this.line.joints = line.joints;
		this.line.miterLimit = line.miterLimit;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_DrawPath
};
var openfl__$internal_renderer_opengl_utils_PathBuiler = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PathBuiler"] = openfl__$internal_renderer_opengl_utils_PathBuiler;
openfl__$internal_renderer_opengl_utils_PathBuiler.__name__ = true;
openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__line = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.closePath = function() {
	var l = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length;
	if(l <= 0) return;
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type == openfl__$internal_renderer_opengl_utils_GraphicType.Polygon && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.fill != openfl__$internal_renderer_opengl_utils_FillType.None) {
		var sx = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[0];
		var sy = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[1];
		var ex = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[l - 2];
		var ey = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[l - 1];
		if(!(sx == ex && sy == ey)) openfl__$internal_renderer_opengl_utils_PathBuiler.lineTo(sx,sy);
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.endFill = function() {
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex++;
};
openfl__$internal_renderer_opengl_utils_PathBuiler.lineTo = function(x,y) {
	var points = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points;
	var push_point = true;
	if(points.length > 1) {
		var lastX = points[points.length - 2];
		var lastY = points[points.length - 1];
		if(lastX == x && lastY == y) push_point = false;
	}
	if(push_point == true) {
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(x);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(y);
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.curveTo = function(cx,cy,x,y) {
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
		if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
	}
	var xa = 0;
	var ya = 0;
	var n = 20;
	var points = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points;
	var fromX = points[points.length - 2];
	var fromY = points[points.length - 1];
	var px = 0;
	var py = 0;
	var tmp = 0;
	var _g1 = 1;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		tmp = i / n;
		xa = fromX + (cx - fromX) * tmp;
		ya = fromY + (cy - fromY) * tmp;
		px = xa + (cx + (x - cx) * tmp - xa) * tmp;
		py = ya + (cy + (y - cy) * tmp - ya) * tmp;
		points.push(px);
		points.push(py);
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.cubicCurveTo = function(cx,cy,cx2,cy2,x,y) {
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
		if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
	}
	var n = 20;
	var dt = 0;
	var dt2 = 0;
	var dt3 = 0;
	var t2 = 0;
	var t3 = 0;
	var points = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points;
	var fromX = points[points.length - 2];
	var fromY = points[points.length - 1];
	var px = 0;
	var py = 0;
	var tmp = 0;
	var _g1 = 1;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		tmp = i / n;
		dt = 1 - tmp;
		dt2 = dt * dt;
		dt3 = dt2 * dt;
		t2 = tmp * tmp;
		t3 = t2 * tmp;
		px = dt3 * fromX + 3 * dt2 * tmp * cx + 3 * dt * t2 * cx2 + t3 * x;
		py = dt3 * fromY + 3 * dt2 * tmp * cy + 3 * dt * t2 * cy2 + t3 * y;
		points.push(px);
		points.push(py);
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.build = function(graphics,gl) {
	var glStack = null;
	var bounds = graphics.__bounds;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths = [];
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__line = new openfl__$internal_renderer_opengl_utils_LineStyle();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex = 0;
	glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
	if(glStack == null) glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId] = new openfl__$internal_renderer_opengl_utils_GLStack(gl);
	if(!graphics.__visible || graphics.__commands.length == 0 || bounds == null || bounds.width == 0 || bounds.height == 0) {
	} else {
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 0:
				var smooth = command[5];
				var repeat = command[4];
				var matrix = command[3];
				var bitmap = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				if(bitmap != null) openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.Texture(bitmap,matrix,repeat,smooth); else openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
					if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
					openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				}
				break;
			case 1:
				var alpha = command[3];
				var rgb = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				if(alpha > 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.Color(rgb & 16777215,alpha); else openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
					if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
					openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				}
				break;
			case 3:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cx2 = command[4];
				var cy = command[3];
				var cx = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.cubicCurveTo(cx,cy,cx2,cy2,x,y);
				break;
			case 4:
				var y1 = command[5];
				var x1 = command[4];
				var cy1 = command[3];
				var cx1 = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.curveTo(cx1,cy1,x1,y1);
				break;
			case 5:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Circle;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x2,y2,radius];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 6:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x3,y3,width,height];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 7:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle(false);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x4,y4,width1,height1];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 8:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				if(ry == -1) ry = rx;
				rx *= 0.5;
				ry *= 0.5;
				if(rx > width2 / 2) rx = width2 / 2;
				if(ry > height2 / 2) ry = height2 / 2;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle(true);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x5,y5,width2,height2,rx,ry];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 11:
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				break;
			case 12:
				var miterLimit = command[9];
				var joints = command[8];
				var caps = command[7];
				var scaleMode = command[6];
				var pixelHinting = command[5];
				var alpha1 = command[4];
				var color = command[3];
				var thickness = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line = new openfl__$internal_renderer_opengl_utils_LineStyle();
				if(thickness == null || isNaN(thickness) || thickness < 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = 0; else if(thickness == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = 1; else openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = thickness;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				if(color == null) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.color = 0; else openfl__$internal_renderer_opengl_utils_PathBuiler.__line.color = color;
				if(alpha1 == null) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.alpha = 1; else openfl__$internal_renderer_opengl_utils_PathBuiler.__line.alpha = alpha1;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.scaleMode = scaleMode;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.caps = caps;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.joints = joints;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.miterLimit = miterLimit;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 15:
				var y6 = command[3];
				var x6 = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.lineTo(x6,y6);
				break;
			case 16:
				var y7 = command[3];
				var x7 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(x7);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(y7);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 10:
				var blendMode = command[7];
				var colors = command[6];
				var culling = command[5];
				var uvtData = command[4];
				var indices = command[3];
				var vertices = command[2];
				var isColor;
				{
					var _g2 = openfl__$internal_renderer_opengl_utils_PathBuiler.__fill;
					switch(_g2[1]) {
					case 1:
						isColor = true;
						break;
					default:
						isColor = false;
					}
				}
				if(isColor && uvtData != null) continue;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				if(uvtData == null) {
					var this1;
					this1 = new openfl_VectorData();
					var this2;
					this2 = new Array(0);
					this1.data = this2;
					this1.length = 0;
					this1.fixed = false;
					uvtData = this1;
					{
						var _g21 = openfl__$internal_renderer_opengl_utils_PathBuiler.__fill;
						switch(_g21[1]) {
						case 2:
							var b = _g21[2];
							var _g4 = 0;
							var _g3 = vertices.length / 2 | 0;
							while(_g4 < _g3) {
								var i = _g4++;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data;
										var this3;
										this3 = new Array(uvtData.data.length + 10);
										data = this3;
										haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data,0,uvtData.data.length);
										uvtData.data = data;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i * 2] / b.width;
								}
								uvtData.length;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data1;
										var this4;
										this4 = new Array(uvtData.data.length + 10);
										data1 = this4;
										haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data1,0,uvtData.data.length);
										uvtData.data = data1;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i * 2 + 1] / b.height;
								}
								uvtData.length;
							}
							break;
						default:
						}
					}
				}
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.DrawTriangles(vertices,indices,uvtData,culling,colors,blendMode);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 9:
				var count = command[6];
				var flags = command[5];
				var smooth1 = command[4];
				var tileData = command[3];
				var sheet = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex++;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.DrawTiles(sheet,tileData,smooth1,flags,count);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 17:
				var winding = command[4];
				var data2 = command[3];
				var commands = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				switch(winding) {
				case openfl_display_GraphicsPathWinding.EVEN_ODD:
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
					break;
				case openfl_display_GraphicsPathWinding.NON_ZERO:
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 1;
					break;
				default:
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
				}
				var command1;
				var cx3;
				var cy3;
				var cx21;
				var cy21;
				var ax;
				var ay;
				var idx = 0;
				var _g31 = 0;
				var _g22 = commands.length;
				while(_g31 < _g22) {
					var i1 = _g31++;
					command1 = commands.data[i1];
					switch(command1) {
					case 1:
						ax = data2.data[idx];
						ay = data2.data[idx + 1];
						idx += 2;
						if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ax);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ay);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
						break;
					case 4:
						ax = data2.data[idx + 2];
						ay = data2.data[idx + 3];
						idx += 4;
						if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ax);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ay);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
						break;
					case 2:
						ax = data2.data[idx];
						ay = data2.data[idx + 1];
						idx += 2;
						openfl__$internal_renderer_opengl_utils_PathBuiler.lineTo(ax,ay);
						break;
					case 5:
						ax = data2.data[idx + 2];
						ay = data2.data[idx + 3];
						idx += 4;
						openfl__$internal_renderer_opengl_utils_PathBuiler.lineTo(ax,ay);
						break;
					case 3:
						cx3 = data2.data[idx];
						cy3 = data2.data[idx + 1];
						ax = data2.data[idx + 2];
						ay = data2.data[idx + 3];
						idx += 4;
						openfl__$internal_renderer_opengl_utils_PathBuiler.curveTo(cx3,cy3,ax,ay);
						break;
					case 6:
						cx3 = data2.data[idx];
						cy3 = data2.data[idx + 1];
						cx21 = data2.data[idx + 2];
						cy21 = data2.data[idx + 3];
						ax = data2.data[idx + 4];
						ay = data2.data[idx + 5];
						idx += 6;
						openfl__$internal_renderer_opengl_utils_PathBuiler.cubicCurveTo(cx3,cy3,cx21,cy21,ax,ay);
						break;
					default:
					}
				}
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
				break;
			case 18:
				var m = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.OverrideMatrix(m);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			default:
			}
		}
		openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
	}
	graphics.__drawPaths = openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths;
	return glStack;
};
var openfl__$internal_renderer_opengl_utils_LineStyle = function() {
	this.width = 0;
	this.color = 0;
	this.alpha = 1;
	this.scaleMode = openfl_display_LineScaleMode.NORMAL;
	this.caps = openfl_display_CapsStyle.ROUND;
	this.joints = openfl_display_JointStyle.ROUND;
	this.miterLimit = 3;
};
$hxClasses["openfl._internal.renderer.opengl.utils.LineStyle"] = openfl__$internal_renderer_opengl_utils_LineStyle;
openfl__$internal_renderer_opengl_utils_LineStyle.__name__ = true;
openfl__$internal_renderer_opengl_utils_LineStyle.prototype = {
	__class__: openfl__$internal_renderer_opengl_utils_LineStyle
};
var openfl__$internal_renderer_opengl_utils_FillType = $hxClasses["openfl._internal.renderer.opengl.utils.FillType"] = { __ename__ : true, __constructs__ : ["None","Color","Texture","Gradient"] };
openfl__$internal_renderer_opengl_utils_FillType.None = ["None",0];
openfl__$internal_renderer_opengl_utils_FillType.None.toString = $estr;
openfl__$internal_renderer_opengl_utils_FillType.None.__enum__ = openfl__$internal_renderer_opengl_utils_FillType;
openfl__$internal_renderer_opengl_utils_FillType.Color = function(color,alpha) { var $x = ["Color",1,color,alpha]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_FillType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_FillType.Texture = function(bitmap,matrix,repeat,smooth) { var $x = ["Texture",2,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_FillType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_FillType.Gradient = ["Gradient",3];
openfl__$internal_renderer_opengl_utils_FillType.Gradient.toString = $estr;
openfl__$internal_renderer_opengl_utils_FillType.Gradient.__enum__ = openfl__$internal_renderer_opengl_utils_FillType;
var openfl__$internal_renderer_opengl_utils_FilterManager = function(gl,transparent) {
	this.transparent = transparent;
	this.filterStack = [];
	this.offsetX = 0;
	this.offsetY = 0;
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterManager"] = openfl__$internal_renderer_opengl_utils_FilterManager;
openfl__$internal_renderer_opengl_utils_FilterManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_FilterManager.prototype = {
	begin: function(renderSession,buffer) {
		this.renderSession = renderSession;
		this.defaultShader = renderSession.shaderManager.defaultShader;
		this.width = 0;
		this.height = 0;
		this.buffer = buffer;
	}
	,initShaderBuffers: function() {
		var gl = this.gl;
		this.vertexBuffer = gl.createBuffer();
		this.uvBuffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		this.indexBuffer = gl.createBuffer();
		var array = [0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0];
		var this1;
		if(array != null) this1 = new Float32Array(array); else this1 = null;
		this.vertexArray = this1;
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.vertexArray,gl.STATIC_DRAW);
		var array1 = [0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0];
		var this2;
		if(array1 != null) this2 = new Float32Array(array1); else this2 = null;
		this.uvArray = this2;
		gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.uvArray,gl.STATIC_DRAW);
		var array2 = [1.0,16777215,1.0,16777215,1.0,16777215,1.0,16777215];
		var this3;
		if(array2 != null) this3 = new Float32Array(array2); else this3 = null;
		this.colorArray = this3;
		gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.colorArray,gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,(function($this) {
			var $r;
			var array3 = [0,1,2,1,3,2];
			var this4;
			if(array3 != null) this4 = new Uint16Array(array3); else this4 = null;
			$r = this4;
			return $r;
		}(this)),gl.STATIC_DRAW);
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.texturePool = [];
		this.initShaderBuffers();
	}
	,__class__: openfl__$internal_renderer_opengl_utils_FilterManager
};
var openfl__$internal_renderer_opengl_utils_FilterTexture = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.FilterTexture"] = openfl__$internal_renderer_opengl_utils_FilterTexture;
openfl__$internal_renderer_opengl_utils_FilterTexture.__name__ = true;
openfl__$internal_renderer_opengl_utils_FilterTexture.prototype = {
	__class__: openfl__$internal_renderer_opengl_utils_FilterTexture
};
var openfl__$internal_renderer_opengl_utils_GLMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
	this.setContext(renderSession.gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLMaskManager"] = openfl__$internal_renderer_opengl_utils_GLMaskManager;
openfl__$internal_renderer_opengl_utils_GLMaskManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_opengl_utils_GLMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		this.renderSession.stencilManager.pushMask(mask,this.renderSession);
	}
	,popMask: function() {
		this.renderSession.stencilManager.popMask(null,this.renderSession);
	}
	,setContext: function(gl) {
		if(this.renderSession != null) this.renderSession.gl = gl;
		this.gl = gl;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLMaskManager
});
var openfl__$internal_renderer_opengl_utils_VertexAttribute = function(components,type,normalized,name,defaultValue) {
	if(normalized == null) normalized = false;
	this.enabled = true;
	this.normalized = false;
	this.components = components;
	this.type = type;
	this.normalized = normalized;
	this.name = name;
	if(defaultValue == null) {
		var this1;
		if(components != null) this1 = new Float32Array(components); else this1 = null;
		this.defaultValue = this1;
	} else this.defaultValue = defaultValue;
};
$hxClasses["openfl._internal.renderer.opengl.utils.VertexAttribute"] = openfl__$internal_renderer_opengl_utils_VertexAttribute;
openfl__$internal_renderer_opengl_utils_VertexAttribute.__name__ = true;
openfl__$internal_renderer_opengl_utils_VertexAttribute.prototype = {
	copy: function() {
		return new openfl__$internal_renderer_opengl_utils_VertexAttribute(this.components,this.type,this.normalized,this.name,this.defaultValue);
	}
	,getElementsBytes: function() {
		var _g = this.type;
		switch(_g) {
		case 5120:case 5121:
			return 1;
		case 5122:case 5123:
			return 2;
		default:
			return 4;
		}
	}
	,__class__: openfl__$internal_renderer_opengl_utils_VertexAttribute
};
var openfl_geom_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["openfl.geom.Rectangle"] = openfl_geom_Rectangle;
openfl_geom_Rectangle.__name__ = true;
openfl_geom_Rectangle.prototype = {
	clone: function() {
		return new openfl_geom_Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) {
			this.x = x;
			this.width = cacheRight - x;
		}
		if(this.y > y) {
			this.y = y;
			this.height = cacheBottom - y;
		}
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,__transform: function(rect,m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = ty0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		rect.setTo(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,get_left: function() {
		return this.x;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,get_top: function() {
		return this.y;
	}
	,__class__: openfl_geom_Rectangle
};
var openfl_geom_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["openfl.geom.Point"] = openfl_geom_Point;
openfl_geom_Point.__name__ = true;
openfl_geom_Point.prototype = {
	clone: function() {
		return new openfl_geom_Point(this.x,this.y);
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,__class__: openfl_geom_Point
};
var openfl__$internal_renderer_opengl_utils_GraphicsRenderer = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GraphicsRenderer"] = openfl__$internal_renderer_opengl_utils_GraphicsRenderer;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.__name__ = true;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.overrideMatrix = null;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildCircle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height;
	if(rectData.length == 3) height = width; else height = rectData[3];
	if(path.type == openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse) {
		width /= 2;
		height /= 2;
		x += width;
		y += height;
	}
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var totalSegs = 40;
	var seg = Math.PI * 2 / totalSegs;
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	if(fill != null) {
		var verts = fill.verts;
		var indices = fill.indices;
		var vertPos = verts.length / 2 | 0;
		indices.push(vertPos);
		var _g1 = 0;
		var _g = totalSegs + 1;
		while(_g1 < _g) {
			var i = _g1++;
			verts.push(x);
			verts.push(y);
			verts.push(x + Math.sin(seg * i) * width);
			verts.push(y + Math.cos(seg * i) * height);
			indices.push(vertPos++);
			indices.push(vertPos++);
		}
		indices.push(vertPos - 1);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [];
		var _g11 = 0;
		var _g2 = totalSegs + 1;
		while(_g11 < _g2) {
			var i1 = _g11++;
			path.points.push(x + Math.sin(seg * i1) * width);
			path.points.push(y + Math.cos(seg * i1) * height);
		}
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildComplexPoly = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var bucket = null;
	if(path.points.length >= 6) {
		var points = path.points.slice();
		if(localCoords) {
			var _g1 = 0;
			var _g = points.length / 2 | 0;
			while(_g1 < _g) {
				var i = _g1++;
				points[i * 2] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
				points[i * 2 + 1] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			}
		}
		bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
		var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
		fill.drawMode = glStack.gl.TRIANGLE_FAN;
		fill.verts = points;
		var indices = fill.indices;
		var length = points.length / 2 | 0;
		var _g2 = 0;
		while(_g2 < length) {
			var i1 = _g2++;
			indices.push(i1);
		}
	}
	if(path.line.width > 0) {
		if(bucket == null) bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket,localCoords);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine = function(path,bucket,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points;
	if(points.length == 0) return;
	var line = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Line);
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
		}
	}
	var firstPoint = new openfl_geom_Point(points[0],points[1]);
	var lastPoint = new openfl_geom_Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y) {
		points = points.slice();
		points.pop();
		points.pop();
		lastPoint = new openfl_geom_Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
		var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
		var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
		points.unshift(midPointY);
		points.unshift(midPointX);
		points.push(midPointX);
		points.push(midPointY);
	}
	var verts = line.verts;
	var indices = line.indices;
	var length = points.length / 2 | 0;
	var indexCount = points.length;
	var indexStart = verts.length / 6 | 0;
	var width = path.line.width / 2;
	var color = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgb(path.line.color);
	var alpha = path.line.alpha;
	var r = color[0];
	var g = color[1];
	var b = color[2];
	var px;
	var py;
	var p1x;
	var p1y;
	var p2x;
	var p2y;
	var p3x;
	var p3y;
	var perpx;
	var perpy;
	var perp2x;
	var perp2y;
	var perp3x;
	var perp3y;
	var a1;
	var b1;
	var c1;
	var a2;
	var b2;
	var c2;
	var denom;
	var pdist;
	var dist;
	p1x = points[0];
	p1y = points[1];
	p2x = points[2];
	p2y = points[3];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p1x - perpx);
	verts.push(p1y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p1x + perpx);
	verts.push(p1y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	var _g11 = 1;
	var _g2 = length - 1;
	while(_g11 < _g2) {
		var i1 = _g11++;
		p1x = points[(i1 - 1) * 2];
		p1y = points[(i1 - 1) * 2 + 1];
		p2x = points[i1 * 2];
		p2y = points[i1 * 2 + 1];
		p3x = points[(i1 + 1) * 2];
		p3y = points[(i1 + 1) * 2 + 1];
		perpx = -(p1y - p2y);
		perpy = p1x - p2x;
		dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
		perpx = perpx / dist;
		perpy = perpy / dist;
		perpx = perpx * width;
		perpy = perpy * width;
		perp2x = -(p2y - p3y);
		perp2y = p2x - p3x;
		dist = Math.sqrt(Math.abs(perp2x * perp2x + perp2y * perp2y));
		perp2x = perp2x / dist;
		perp2y = perp2y / dist;
		perp2x = perp2x * width;
		perp2y = perp2y * width;
		a1 = -perpy + p1y - (-perpy + p2y);
		b1 = -perpx + p2x - (-perpx + p1x);
		c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
		a2 = -perp2y + p3y - (-perp2y + p2y);
		b2 = -perp2x + p2x - (-perp2x + p3x);
		c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
		denom = a1 * b2 - a2 * b1;
		if(Math.abs(denom) < 0.1) {
			denom += 10.1;
			verts.push(p2x - perpx);
			verts.push(p2y - perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perpx);
			verts.push(p2y + perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			continue;
		}
		px = (b1 * c2 - b2 * c1) / denom;
		py = (a2 * c1 - a1 * c2) / denom;
		pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
		if(pdist > 19600) {
			perp3x = perpx - perp2x;
			perp3y = perpy - perp2y;
			dist = Math.sqrt(Math.abs(perp3x * perp3x + perp3y * perp3y));
			perp3x = perp3x / dist;
			perp3y = perp3y / dist;
			perp3x = perp3x * width;
			perp3y = perp3y * width;
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perp3x);
			verts.push(p2y + perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			indexCount++;
		} else {
			verts.push(px);
			verts.push(py);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - (px - p2x));
			verts.push(p2y - (py - p2y));
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
		}
	}
	p1x = points[(length - 2) * 2];
	p1y = points[(length - 2) * 2 + 1];
	p2x = points[(length - 1) * 2];
	p2y = points[(length - 1) * 2 + 1];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	if(!isFinite(dist)) console.log(perpx * perpx + perpy * perpy);
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p2x - perpx);
	verts.push(p2y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p2x + perpx);
	verts.push(p2y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	indices.push(indexStart);
	var _g3 = 0;
	while(_g3 < indexCount) {
		var i2 = _g3++;
		indices.push(indexStart++);
	}
	indices.push(indexStart - 1);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	if(fill != null) {
		var verts = fill.verts;
		var indices = fill.indices;
		var vertPos = verts.length / 2 | 0;
		verts.push(x);
		verts.push(y);
		verts.push(x + width);
		verts.push(y);
		verts.push(x);
		verts.push(y + height);
		verts.push(x + width);
		verts.push(y + height);
		indices.push(vertPos);
		indices.push(vertPos);
		indices.push(vertPos + 1);
		indices.push(vertPos + 2);
		indices.push(vertPos + 3);
		indices.push(vertPos + 3);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [x,y,x + width,y,x + width,y + height,x,y + height,x,y];
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRoundedRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points.slice();
	var x = points[0];
	var y = points[1];
	var width = points[2];
	var height = points[3];
	var rx = points[4];
	var ry = points[5];
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.SIN45;
	var cx2 = -rx + rx * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.TAN22;
	var cy1 = -ry + ry * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.SIN45;
	var cy2 = -ry + ry * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.TAN22;
	var recPoints = [];
	recPoints.push(xe);
	recPoints.push(ye - ry);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe + cx2,ye,xe - rx,ye);
	recPoints.push(x + rx);
	recPoints.push(ye);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x,ye + cy2,x,ye - ry);
	recPoints.push(x);
	recPoints.push(y + ry);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x - cx2,y,x + rx,y);
	recPoints.push(xe - rx);
	recPoints.push(y);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe,y - cy2,xe,y + ry);
	recPoints.push(xe);
	recPoints.push(ye - ry);
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	if(fill != null) {
		var verts = fill.verts;
		var indices = fill.indices;
		var vecPos = verts.length / 2;
		var triangles = openfl__$internal_renderer_opengl_utils_PolyK.triangulate(recPoints);
		var i = 0;
		while(i < triangles.length) {
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i + 1] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			i += 3;
		}
		i = 0;
		while(i < recPoints.length) {
			verts.push(recPoints[i]);
			verts.push(recPoints[++i]);
			i++;
		}
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = recPoints;
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildDrawTriangles = function(path,object,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var args = path.type.slice(2);
	var vertices = args[0];
	var indices = args[1];
	var uvtData = args[2];
	var culling = args[3];
	var colors = args[4];
	var blendMode = args[5];
	var a;
	var b;
	var c;
	var d;
	var tx;
	var ty;
	if(localCoords) {
		a = 1.0;
		b = 0.0;
		c = 0.0;
		d = 1.0;
		tx = 0.0;
		ty = 0.0;
	} else {
		a = object.__worldTransform.a;
		b = object.__worldTransform.b;
		c = object.__worldTransform.c;
		d = object.__worldTransform.d;
		tx = object.__worldTransform.tx;
		ty = object.__worldTransform.ty;
	}
	var hasColors = colors != null && colors.length > 0;
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	var colorAttrib = fill.vertexArray.attributes[2];
	colorAttrib.enabled = hasColors;
	var array = [1,1,1,1];
	var this1;
	if(array != null) this1 = new Float32Array(array); else this1 = null;
	colorAttrib.defaultValue = this1;
	fill.rawVerts = true;
	fill.glLength = indices.length;
	fill.stride = Std["int"](fill.vertexArray.get_stride() / 4);
	var vertsLength = fill.glLength * fill.stride;
	var verts;
	if(fill.glVerts == null || fill.glVerts.length < vertsLength) {
		var this2;
		if(vertsLength != null) this2 = new Float32Array(vertsLength); else this2 = null;
		verts = this2;
		fill.glVerts = verts;
	} else verts = fill.glVerts;
	var glColors;
	var buffer = verts.buffer;
	var this3;
	if(buffer != null) this3 = new Uint32Array(buffer,0); else this3 = null;
	glColors = this3;
	var v0 = 0;
	var v1 = 0;
	var v2 = 0;
	var i0 = 0;
	var i1 = 0;
	var i2 = 0;
	var x0 = 0.0;
	var y0 = 0.0;
	var x1 = 0.0;
	var y1 = 0.0;
	var x2 = 0.0;
	var y2 = 0.0;
	var idx = 0;
	var _g1 = 0;
	var _g = indices.length / 3 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		i0 = indices.data[i * 3];
		i1 = indices.data[i * 3 + 1];
		i2 = indices.data[i * 3 + 2];
		v0 = i0 * 2;
		v1 = i1 * 2;
		v2 = i2 * 2;
		x0 = vertices.data[v0];
		y0 = vertices.data[v0 + 1];
		x1 = vertices.data[v1];
		y1 = vertices.data[v1 + 1];
		x2 = vertices.data[v2];
		y2 = vertices.data[v2 + 1];
		if(localCoords) {
			x0 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y0 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			x1 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y1 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			x2 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y2 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
		}
		switch(culling[1]) {
		case 2:
			if(!((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0)) continue;
			break;
		case 0:
			if((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0) continue;
			break;
		default:
		}
		var idx1 = idx++;
		verts[idx1] = a * x0 + c * y0 + tx;
		var idx2 = idx++;
		verts[idx2] = b * x0 + d * y0 + ty;
		var idx3 = idx++;
		verts[idx3] = uvtData.data[v0];
		var idx4 = idx++;
		verts[idx4] = uvtData.data[v0 + 1];
		if(hasColors) {
			var idx5 = idx++;
			glColors[idx5] = colors.data[i0];
		}
		var idx6 = idx++;
		verts[idx6] = a * x1 + c * y1 + tx;
		var idx7 = idx++;
		verts[idx7] = b * x1 + d * y1 + ty;
		var idx8 = idx++;
		verts[idx8] = uvtData.data[v1];
		var idx9 = idx++;
		verts[idx9] = uvtData.data[v1 + 1];
		if(hasColors) {
			var idx10 = idx++;
			glColors[idx10] = colors.data[i1];
		}
		var idx11 = idx++;
		verts[idx11] = a * x2 + c * y2 + tx;
		var idx12 = idx++;
		verts[idx12] = b * x2 + d * y2 + ty;
		var idx13 = idx++;
		verts[idx13] = uvtData.data[v2];
		var idx14 = idx++;
		verts[idx14] = uvtData.data[v2 + 1];
		if(hasColors) {
			var idx15 = idx++;
			glColors[idx15] = colors.data[i2];
		}
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo = function(points,cx,cy,x,y) {
	var xa = 0;
	var ya = 0;
	var n = 20;
	var fromX = points[points.length - 2];
	var fromY = points[points.length - 1];
	var px = 0;
	var py = 0;
	var tmp = 0;
	var _g1 = 1;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		tmp = i / n;
		xa = fromX + (cx - fromX) * tmp;
		ya = fromY + (cy - fromY) * tmp;
		px = xa + (cx + (x - cx) * tmp - xa) * tmp;
		py = ya + (cy + (y - cy) * tmp - ya) * tmp;
		points.push(px);
		points.push(py);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render = function(object,renderSession) {
	var graphics = object.__graphics;
	var spritebatch = renderSession.spriteBatch;
	var dirty = graphics.__dirty;
	if(graphics.__commands.length <= 0) return;
	if(dirty) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics(object,object.__graphics,renderSession.gl,object.cacheAsBitmap);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderGraphics(object,renderSession,false);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderGraphics = function(object,renderSession,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	var gl = renderSession.gl;
	var glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
	var bucket;
	var translationMatrix;
	if(localCoords) translationMatrix = openfl_geom_Matrix.__identity; else translationMatrix = object.__worldTransform;
	var clipRect = renderSession.spriteBatch.clipRect;
	var batchDrawing = renderSession.spriteBatch.drawing;
	batchDrawing = renderSession.spriteBatch.drawing;
	var _g1 = 0;
	var _g = glStack.buckets.length;
	while(_g1 < _g) {
		var i = _g1++;
		batchDrawing = renderSession.spriteBatch.drawing;
		if(batchDrawing && !localCoords) renderSession.spriteBatch.finish();
		renderSession.blendModeManager.setBlendMode(object.__blendMode);
		if(clipRect != null) {
			gl.enable(gl.SCISSOR_TEST);
			gl.scissor(Math.floor(clipRect.x),Math.floor(clipRect.y),Math.floor(clipRect.width),Math.floor(clipRect.height));
		}
		bucket = glStack.buckets[i];
		var _g2 = bucket.mode;
		switch(_g2[1]) {
		case 1:case 2:
			renderSession.stencilManager.pushBucket(bucket,renderSession,translationMatrix.toArray(true));
			var shader = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader(bucket,renderSession,object,translationMatrix.toArray(true));
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderFill(bucket,shader,renderSession);
			renderSession.stencilManager.popBucket(object,bucket,renderSession);
			break;
		case 5:
			var shader1 = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader(bucket,renderSession,object,null);
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTriangles(bucket,shader1,renderSession);
			break;
		case 6:
			if(!batchDrawing) renderSession.spriteBatch.begin(renderSession,clipRect);
			var args = bucket.graphicType.slice(2);
			renderSession.spriteBatch.renderTiles(object,args[0],args[1],args[2],args[3],args[4]);
			renderSession.spriteBatch.finish();
			break;
		default:
		}
		var ct = object.__worldColorTransform;
		var _g21 = 0;
		var _g3 = bucket.lines;
		while(_g21 < _g3.length) {
			var line = _g3[_g21];
			++_g21;
			if(line != null && line.verts.length > 0) {
				var shader2 = renderSession.shaderManager.primitiveShader;
				renderSession.shaderManager.setShader(shader2);
				gl.uniformMatrix3fv(shader2.getUniformLocation("uTranslationMatrix"),false,translationMatrix.toArray(true));
				gl.uniformMatrix3fv(shader2.getUniformLocation("uProjectionMatrix"),false,renderSession.projectionMatrix.toArray(true));
				gl.uniform1f(shader2.getUniformLocation("uAlpha"),1);
				gl.uniform4f(shader2.getUniformLocation("uColorMultiplier"),ct.redMultiplier,ct.greenMultiplier,ct.blueMultiplier,ct.alphaMultiplier);
				gl.uniform4f(shader2.getUniformLocation("uColorOffset"),ct.redOffset / 255,ct.greenOffset / 255,ct.blueOffset / 255,ct.alphaOffset / 255);
				line.vertexArray.bind();
				shader2.bindVertexArray(line.vertexArray);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,line.indexBuffer);
				gl.drawElements(gl.TRIANGLE_STRIP,line.indices.length,gl.UNSIGNED_SHORT,0);
			}
		}
		if(clipRect != null) gl.disable(gl.SCISSOR_TEST);
		batchDrawing = renderSession.spriteBatch.drawing;
		if(!batchDrawing && !localCoords) renderSession.spriteBatch.begin(renderSession,clipRect);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics = function(object,graphics,gl,localCoords) {
	if(localCoords == null) localCoords = false;
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition.setTo(object.get_x(),object.get_y());
	if(graphics.__bounds == null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds = new openfl_geom_Rectangle(); else openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.copyFrom(graphics.__bounds);
	var glStack = null;
	if(graphics.__dirty) glStack = openfl__$internal_renderer_opengl_utils_DrawPath.getStack(graphics,gl);
	graphics.set___dirty(false);
	var _g = 0;
	var _g1 = glStack.buckets;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		data.reset();
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool.push(data);
	}
	glStack.reset();
	var _g11 = glStack.lastIndex;
	var _g2 = graphics.__drawPaths.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var path = graphics.__drawPaths[i];
		{
			var _g21 = path.type;
			switch(_g21[1]) {
			case 0:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildComplexPoly(path,glStack,localCoords);
				break;
			case 1:
				var rounded = _g21[2];
				if(rounded) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRoundedRectangle(path,glStack,localCoords); else openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRectangle(path,glStack,localCoords);
				break;
			case 2:case 3:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildCircle(path,glStack,localCoords);
				break;
			case 4:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildDrawTriangles(path,object,glStack,localCoords);
				break;
			case 5:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
				break;
			case 6:
				var m = _g21[2];
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.overrideMatrix = m;
				break;
			}
		}
		glStack.lastIndex++;
	}
	var _g3 = 0;
	var _g12 = glStack.buckets;
	while(_g3 < _g12.length) {
		var bucket = _g12[_g3];
		++_g3;
		if(bucket.uploadTileBuffer) bucket.uploadTile(Math.ceil(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_left()),Math.ceil(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_top()),Math.floor(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_right()),Math.floor(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_bottom()));
		bucket.optimize();
	}
	glStack.upload();
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket = function(path,glStack) {
	var bucket = null;
	{
		var _g = path.fill;
		switch(_g[1]) {
		case 1:
			var a = _g[3];
			var c = _g[2];
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.Fill);
			if(c == null) bucket.color = [1,1,1]; else bucket.color = [(c >> 16 & 255) / 255,(c >> 8 & 255) / 255,(c & 255) / 255];
			bucket.color[3] = a;
			bucket.uploadTileBuffer = true;
			break;
		case 2:
			var s = _g[5];
			var r = _g[4];
			var m = _g[3];
			var b = _g[2];
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill);
			bucket.bitmap = b;
			bucket.textureRepeat = r;
			bucket.textureSmooth = s;
			bucket.texture = b.getTexture(glStack.gl);
			bucket.uploadTileBuffer = true;
			var pMatrix;
			if(m == null) pMatrix = new openfl_geom_Matrix(); else pMatrix = new openfl_geom_Matrix(m.a,m.b,m.c,m.d,m.tx,m.ty);
			pMatrix.invert();
			pMatrix.scale(1 / b.width,1 / b.height);
			var tx = pMatrix.tx;
			var ty = pMatrix.ty;
			pMatrix.tx = 0;
			pMatrix.ty = 0;
			bucket.textureTL.x = tx;
			bucket.textureTL.y = ty;
			bucket.textureBR.x = tx + 1;
			bucket.textureBR.y = ty + 1;
			bucket.textureMatrix = pMatrix;
			break;
		default:
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.Line);
			bucket.uploadTileBuffer = false;
		}
	}
	{
		var _g1 = path.type;
		switch(_g1[1]) {
		case 4:
			bucket.mode = openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles;
			bucket.uploadTileBuffer = false;
			break;
		case 5:
			bucket.mode = openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles;
			bucket.uploadTileBuffer = false;
			break;
		default:
		}
	}
	bucket.graphicType = path.type;
	bucket.overrideMatrix = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.overrideMatrix;
	return bucket;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.getBucket = function(glStack,mode) {
	var b = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool.pop();
	if(b == null) b = new openfl__$internal_renderer_opengl_utils_GLBucket(glStack.gl);
	b.mode = mode;
	glStack.buckets.push(b);
	return b;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket = function(fillIndex,glStack,mode) {
	var bucket = null;
	var _g = 0;
	var _g1 = glStack.buckets;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		if(b.fillIndex == fillIndex) {
			bucket = b;
			break;
		}
	}
	if(bucket == null) bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.getBucket(glStack,mode);
	bucket.dirty = true;
	bucket.fillIndex = fillIndex;
	return bucket;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader = function(bucket,renderSession,object,translationMatrix) {
	var gl = renderSession.gl;
	var shader = null;
	var _g = bucket.mode;
	switch(_g[1]) {
	case 1:
		shader = renderSession.shaderManager.fillShader;
		break;
	case 2:
		shader = renderSession.shaderManager.patternFillShader;
		break;
	case 5:
		shader = renderSession.shaderManager.drawTrianglesShader;
		break;
	default:
		shader = null;
	}
	if(shader == null) return null;
	var newShader = renderSession.shaderManager.setShader(shader);
	gl.uniform1f(shader.getUniformLocation("uAlpha"),object.__worldAlpha);
	gl.uniformMatrix3fv(shader.getUniformLocation("uProjectionMatrix"),false,renderSession.projectionMatrix.toArray(true));
	var ct = object.__worldColorTransform;
	gl.uniform4f(shader.getUniformLocation("uColorMultiplier"),ct.redMultiplier,ct.greenMultiplier,ct.blueMultiplier,ct.alphaMultiplier);
	gl.uniform4f(shader.getUniformLocation("uColorOffset"),ct.redOffset / 255,ct.greenOffset / 255,ct.blueOffset / 255,ct.alphaOffset / 255);
	var _g1 = bucket.mode;
	switch(_g1[1]) {
	case 1:
		gl.uniformMatrix3fv(shader.getUniformLocation("uTranslationMatrix"),false,translationMatrix);
		gl.uniform4fv(shader.getUniformLocation("uColor"),(function($this) {
			var $r;
			var array = bucket.color;
			var this1;
			if(array != null) this1 = new Float32Array(array); else this1 = null;
			$r = this1;
			return $r;
		}(this)));
		break;
	case 2:
		gl.uniformMatrix3fv(shader.getUniformLocation("uTranslationMatrix"),false,translationMatrix);
		gl.uniform2f(shader.getUniformLocation("uPatternTL"),bucket.textureTL.x,bucket.textureTL.y);
		gl.uniform2f(shader.getUniformLocation("uPatternBR"),bucket.textureBR.x,bucket.textureBR.y);
		gl.uniformMatrix3fv(shader.getUniformLocation("uPatternMatrix"),false,bucket.textureMatrix.toArray(true));
		break;
	case 5:
		if(bucket.texture != null) gl.uniform1i(shader.getUniformLocation("uUseTexture"),1); else {
			gl.uniform1i(shader.getUniformLocation("uUseTexture"),0);
			gl.uniform4fv(shader.getUniformLocation("uColor"),(function($this) {
				var $r;
				var array1 = bucket.color;
				var this2;
				if(array1 != null) this2 = new Float32Array(array1); else this2 = null;
				$r = this2;
				return $r;
			}(this)));
		}
		break;
	default:
	}
	return shader;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderFill = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	if(bucket.mode == openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill && bucket.texture != null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture(gl,bucket);
	gl.bindBuffer(gl.ARRAY_BUFFER,bucket.tileBuffer);
	gl.vertexAttribPointer(shader.getAttribLocation("aPosition"),4,gl.SHORT,false,0,0);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTriangles = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	var _g = 0;
	var _g1 = bucket.fills;
	while(_g < _g1.length) {
		var fill = _g1[_g];
		++_g;
		if(fill.available) continue;
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture(gl,bucket);
		fill.vertexArray.bind();
		shader.bindVertexArray(fill.vertexArray);
		gl.drawArrays(gl.TRIANGLES,fill.glStart,fill.glLength);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture = function(gl,bucket) {
	gl.bindTexture(gl.TEXTURE_2D,bucket.texture);
	if(bucket.textureRepeat && bucket.bitmap.__image.get_powerOfTwo()) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	}
	if(bucket.textureSmooth) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgb = function(hex) {
	if(hex == null) return [1,1,1]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255];
};
var openfl__$internal_renderer_opengl_utils_GLStack = function(gl) {
	this.lastIndex = 0;
	this.gl = gl;
	this.buckets = [];
	this.lastIndex = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLStack"] = openfl__$internal_renderer_opengl_utils_GLStack;
openfl__$internal_renderer_opengl_utils_GLStack.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLStack.prototype = {
	reset: function() {
		this.buckets = [];
		this.lastIndex = 0;
	}
	,upload: function() {
		var _g = 0;
		var _g1 = this.buckets;
		while(_g < _g1.length) {
			var bucket = _g1[_g];
			++_g;
			if(bucket.dirty) bucket.upload();
		}
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLStack
};
var openfl__$internal_renderer_opengl_utils_GLBucket = function(gl) {
	this.uploadTileBuffer = true;
	this.textureSmooth = true;
	this.textureRepeat = false;
	this.lines = [];
	this.fills = [];
	this.fillIndex = -1;
	this.gl = gl;
	this.color = [0,0,0];
	this.lastIndex = 0;
	this.alpha = 1;
	this.dirty = true;
	this.mode = openfl__$internal_renderer_opengl_utils_BucketMode.Fill;
	this.textureMatrix = new openfl_geom_Matrix();
	this.textureTL = new openfl_geom_Point();
	this.textureBR = new openfl_geom_Point(1,1);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucket"] = openfl__$internal_renderer_opengl_utils_GLBucket;
openfl__$internal_renderer_opengl_utils_GLBucket.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLBucket.prototype = {
	getData: function(type) {
		var data;
		switch(type[1]) {
		case 1:
			data = this.fills;
			break;
		default:
			data = this.lines;
		}
		var result = null;
		var remove = false;
		var _g = 0;
		while(_g < data.length) {
			var d = data[_g];
			++_g;
			if(d.available) {
				result = d;
				remove = true;
				break;
			}
		}
		if(result == null) result = new openfl__$internal_renderer_opengl_utils_GLBucketData(this.gl);
		result.available = false;
		result.parent = this;
		result.type = type;
		if(remove) HxOverrides.remove(data,result);
		data.push(result);
		switch(type[1]) {
		case 1:
			var _g1 = this.mode;
			switch(_g1[1]) {
			case 1:case 2:
				result.vertexArray.attributes = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.fillVertexAttributes;
				break;
			case 5:
				result.vertexArray.attributes = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.drawTrianglesVertexAttributes.slice();
				result.vertexArray.attributes[2] = result.vertexArray.attributes[2].copy();
				break;
			default:
			}
			break;
		case 0:
			result.vertexArray.attributes = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.primitiveVertexAttributes;
			break;
		}
		return result;
	}
	,optimize: function() {
		var _g = this;
		var data = this.lines;
		if(data.length > 1) {
			var result = [];
			var tmp = null;
			var last = null;
			var idx = 0;
			var vi = 0;
			var ii = 0;
			var before = data.length;
			var _g1 = 0;
			while(_g1 < data.length) {
				var d = data[_g1];
				++_g1;
				if(d.available || d.rawVerts || d.rawIndices) {
					if(tmp != null) {
						result.push(tmp);
						tmp = null;
					}
					result.push(d);
					last = d;
					continue;
				}
				if(last == null || last.drawMode == d.drawMode) {
					if(tmp == null) tmp = d; else {
						vi = tmp.verts.length;
						ii = tmp.indices.length;
						var _g2 = 0;
						var _g11 = d.verts.length;
						while(_g2 < _g11) {
							var j = _g2++;
							tmp.verts[j + vi] = d.verts[j];
						}
						var _g21 = 0;
						var _g12 = d.indices.length;
						while(_g21 < _g12) {
							var j1 = _g21++;
							tmp.indices[j1 + ii] = d.indices[j1] + idx;
						}
					}
					idx = tmp.indices[tmp.indices.length - 1] + 1;
					last = d;
				} else {
					if(tmp != null) {
						result.push(tmp);
						tmp = null;
					}
					result.push(d);
					last = d;
					continue;
				}
			}
			if(result.length == 0 && tmp != null) result.push(tmp);
			if(result.length > 0) switch(openfl__$internal_renderer_opengl_utils_BucketDataType.Line[1]) {
			case 1:
				_g.fills = result;
				break;
			default:
				_g.lines = result;
			}
		}
	}
	,reset: function() {
		var _g = 0;
		var _g1 = this.fills;
		while(_g < _g1.length) {
			var fill = _g1[_g];
			++_g;
			fill.reset();
		}
		var _g2 = 0;
		var _g11 = this.lines;
		while(_g2 < _g11.length) {
			var line = _g11[_g2];
			++_g2;
			line.reset();
		}
		this.fillIndex = -1;
		this.uploadTileBuffer = true;
		this.graphicType = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
	}
	,uploadTile: function(x,y,w,h) {
		if(this.tileBuffer == null) this.tileBuffer = this.gl.createBuffer();
		this.tile = [x,y,0,0,w,y,1,0,x,h,0,1,w,h,1,1];
		var array = this.tile;
		var this1;
		if(array != null) this1 = new Int16Array(array); else this1 = null;
		this.glTile = this1;
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tileBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,this.glTile,this.gl.STATIC_DRAW);
	}
	,upload: function() {
		if(this.mode != openfl__$internal_renderer_opengl_utils_BucketMode.Line) {
			var _g = 0;
			var _g1 = this.fills;
			while(_g < _g1.length) {
				var fill = _g1[_g];
				++_g;
				if(!fill.available) fill.upload();
			}
		}
		var _g2 = 0;
		var _g11 = this.lines;
		while(_g2 < _g11.length) {
			var line = _g11[_g2];
			++_g2;
			if(!line.available) line.upload();
		}
		this.dirty = false;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLBucket
};
var openfl__$internal_renderer_opengl_utils_GLBucketData = function(gl) {
	this.available = false;
	this.rawIndices = false;
	this.stride = 0;
	this.rawVerts = false;
	this.lastVertsSize = 0;
	this.glStart = 0;
	this.glLength = 0;
	this.gl = gl;
	this.drawMode = gl.TRIANGLE_STRIP;
	this.verts = [];
	this.indices = [];
	this.vertexArray = new openfl__$internal_renderer_opengl_utils_VertexArray([]);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucketData"] = openfl__$internal_renderer_opengl_utils_GLBucketData;
openfl__$internal_renderer_opengl_utils_GLBucketData.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLBucketData.prototype = {
	reset: function() {
		this.available = true;
		this.verts = [];
		this.indices = [];
		this.glLength = 0;
		this.glStart = 0;
		this.stride = 0;
		this.rawVerts = false;
		this.rawIndices = false;
		this.drawMode = this.gl.TRIANGLE_STRIP;
	}
	,upload: function() {
		if(this.rawVerts && this.glVerts != null && this.glVerts.length > 0 || this.verts.length > 0) {
			if(!this.rawVerts) {
				var array = this.verts;
				var this1;
				if(array != null) this1 = new Float32Array(array); else this1 = null;
				this.glVerts = this1;
			}
			this.vertexArray.buffer = this.glVerts.buffer;
			if(this.glVerts.length <= this.lastVertsSize) {
				this.vertexArray.bind();
				var end = this.glLength * 4 * this.stride;
				if(this.glLength > 0 && this.lastVertsSize > end) {
					var view = this.glVerts.subarray(0,end);
					this.vertexArray.upload(view);
				} else this.vertexArray.upload(this.glVerts);
			} else {
				this.vertexArray.setContext(this.gl,this.glVerts);
				this.lastVertsSize = this.glVerts.length;
			}
		}
		if(this.glLength == 0 && (this.rawIndices && this.glIndices != null && this.glIndices.length > 0 || this.indices.length > 0)) {
			if(this.indexBuffer == null) this.indexBuffer = this.gl.createBuffer();
			if(!this.rawIndices) {
				var array1 = this.indices;
				var this2;
				if(array1 != null) this2 = new Uint16Array(array1); else this2 = null;
				this.glIndices = this2;
			}
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
			this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.glIndices,this.gl.STREAM_DRAW);
		}
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLBucketData
};
var openfl__$internal_renderer_opengl_utils_BucketMode = $hxClasses["openfl._internal.renderer.opengl.utils.BucketMode"] = { __ename__ : true, __constructs__ : ["None","Fill","PatternFill","Line","PatternLine","DrawTriangles","DrawTiles"] };
openfl__$internal_renderer_opengl_utils_BucketMode.None = ["None",0];
openfl__$internal_renderer_opengl_utils_BucketMode.None.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.None.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.Fill = ["Fill",1];
openfl__$internal_renderer_opengl_utils_BucketMode.Fill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.Fill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill = ["PatternFill",2];
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.Line = ["Line",3];
openfl__$internal_renderer_opengl_utils_BucketMode.Line.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.Line.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine = ["PatternLine",4];
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles = ["DrawTriangles",5];
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles = ["DrawTiles",6];
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
var openfl__$internal_renderer_opengl_utils_BucketDataType = $hxClasses["openfl._internal.renderer.opengl.utils.BucketDataType"] = { __ename__ : true, __constructs__ : ["Line","Fill"] };
openfl__$internal_renderer_opengl_utils_BucketDataType.Line = ["Line",0];
openfl__$internal_renderer_opengl_utils_BucketDataType.Line.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketDataType.Line.__enum__ = openfl__$internal_renderer_opengl_utils_BucketDataType;
openfl__$internal_renderer_opengl_utils_BucketDataType.Fill = ["Fill",1];
openfl__$internal_renderer_opengl_utils_BucketDataType.Fill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketDataType.Fill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketDataType;
var openfl__$internal_renderer_opengl_utils_GLGraphicsData = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GLGraphicsData"] = openfl__$internal_renderer_opengl_utils_GLGraphicsData;
openfl__$internal_renderer_opengl_utils_GLGraphicsData.__name__ = true;
var openfl__$internal_renderer_opengl_utils_PolyK = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PolyK"] = openfl__$internal_renderer_opengl_utils_PolyK;
openfl__$internal_renderer_opengl_utils_PolyK.__name__ = true;
openfl__$internal_renderer_opengl_utils_PolyK.triangulate = function(p) {
	var sign = true;
	var n = p.length >> 1;
	if(n < 3) return [];
	var tgs = [];
	var avl;
	var _g = [];
	var _g1 = 0;
	while(_g1 < n) {
		var i1 = _g1++;
		_g.push(i1);
	}
	avl = _g;
	var i = 0;
	var al = n;
	var earFound = false;
	while(al > 3) {
		var i0 = avl[i % al];
		var i11 = avl[(i + 1) % al];
		var i2 = avl[(i + 2) % al];
		var ax = p[2 * i0];
		var ay = p[2 * i0 + 1];
		var bx = p[2 * i11];
		var by = p[2 * i11 + 1];
		var cx = p[2 * i2];
		var cy = p[2 * i2 + 1];
		earFound = false;
		if(openfl__$internal_renderer_opengl_utils_PolyK._convex(ax,ay,bx,by,cx,cy,sign)) {
			earFound = true;
			var _g11 = 0;
			while(_g11 < al) {
				var j = _g11++;
				var vi = avl[j];
				if(vi == i0 || vi == i11 || vi == i2) continue;
				if(openfl__$internal_renderer_opengl_utils_PolyK._PointInTriangle(p[2 * vi],p[2 * vi + 1],ax,ay,bx,by,cx,cy)) {
					earFound = false;
					break;
				}
			}
		}
		if(earFound) {
			tgs.push(i0);
			tgs.push(i11);
			tgs.push(i2);
			avl.splice((i + 1) % al,1);
			al--;
			i = 0;
		} else if(i++ > 3 * al) {
			if(sign) {
				tgs = [];
				var _g12 = [];
				var _g2 = 0;
				while(_g2 < n) {
					var k = _g2++;
					_g12.push(k);
				}
				avl = _g12;
				i = 0;
				al = n;
				sign = false;
			} else {
				console.log("Warning: shape too complex to fill");
				return [];
			}
		}
	}
	tgs.push(avl[0]);
	tgs.push(avl[1]);
	tgs.push(avl[2]);
	return tgs;
};
openfl__$internal_renderer_opengl_utils_PolyK._PointInTriangle = function(px,py,ax,ay,bx,by,cx,cy) {
	var v0x = cx - ax | 0;
	var v0y = cy - ay | 0;
	var v1x = bx - ax | 0;
	var v1y = by - ay | 0;
	var v2x = px - ax | 0;
	var v2y = py - ay | 0;
	var dot00 = v0x * v0x + v0y * v0y;
	var dot01 = v0x * v1x + v0y * v1y;
	var dot02 = v0x * v2x + v0y * v2y;
	var dot11 = v1x * v1x + v1y * v1y;
	var dot12 = v1x * v2x + v1y * v2y;
	var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
	return u >= 0 && v >= 0 && u + v < 1;
};
openfl__$internal_renderer_opengl_utils_PolyK._convex = function(ax,ay,bx,by,cx,cy,sign) {
	return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0 == sign;
};
var openfl__$internal_renderer_opengl_utils_GraphicType = $hxClasses["openfl._internal.renderer.opengl.utils.GraphicType"] = { __ename__ : true, __constructs__ : ["Polygon","Rectangle","Circle","Ellipse","DrawTriangles","DrawTiles","OverrideMatrix"] };
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon = ["Polygon",0];
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle = function(rounded) { var $x = ["Rectangle",1,rounded]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.Circle = ["Circle",2];
openfl__$internal_renderer_opengl_utils_GraphicType.Circle.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Circle.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse = ["Ellipse",3];
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",4,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",5,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.OverrideMatrix = function(matrix) { var $x = ["OverrideMatrix",6,matrix]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
var openfl__$internal_renderer_opengl_utils_ShaderManager = function(gl) {
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.ShaderManager"] = openfl__$internal_renderer_opengl_utils_ShaderManager;
openfl__$internal_renderer_opengl_utils_ShaderManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_ShaderManager.prototype = {
	setContext: function(gl) {
		this.gl = gl;
		this.defaultShader = new openfl__$internal_renderer_opengl_shaders2_DefaultShader(gl);
		this.fillShader = new openfl__$internal_renderer_opengl_shaders2_FillShader(gl);
		this.patternFillShader = new openfl__$internal_renderer_opengl_shaders2_PatternFillShader(gl);
		this.drawTrianglesShader = new openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader(gl);
		this.primitiveShader = new openfl__$internal_renderer_opengl_shaders2_PrimitiveShader(gl);
		this.setShader(this.defaultShader,true);
	}
	,setShader: function(shader,force) {
		if(force == null) force = false;
		if(shader == null) {
			this.currentShader = null;
			this.gl.useProgram(null);
			return true;
		}
		if(this.currentShader != null && !force && this.currentShader.ID == shader.ID) return false;
		this.currentShader = shader;
		this.gl.useProgram(shader.program);
		return true;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_ShaderManager
};
var openfl__$internal_renderer_opengl_utils_SpriteBatch = function(gl,maxSprites) {
	if(maxSprites == null) maxSprites = 2000;
	this.lastEnableColor = true;
	this.enableColor = true;
	this.attributes = [];
	this.writtenVertexBytes = 0;
	this.drawing = false;
	this.dirty = true;
	this.states = [];
	this.maxSprites = maxSprites;
	this.attributes.push(new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition"));
	this.attributes.push(new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aTexCoord0"));
	this.attributes.push(new openfl__$internal_renderer_opengl_utils_VertexAttribute(4,5121,true,"aColor"));
	var array = [1,1,1,1];
	var this1;
	if(array != null) this1 = new Float32Array(array); else this1 = null;
	this.attributes[2].defaultValue = this1;
	this.maxElementsPerVertex = 0;
	var _g = 0;
	var _g1 = this.attributes;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		this.maxElementsPerVertex += Math.floor(a.components * a.getElementsBytes() / 4);
	}
	this.vertexArraySize = maxSprites * this.maxElementsPerVertex * 4 * 4;
	this.indexArraySize = maxSprites * 6;
	this.vertexArray = new openfl__$internal_renderer_opengl_utils_VertexArray(this.attributes,this.vertexArraySize,false);
	var buffer = this.vertexArray.buffer;
	var this2;
	if(buffer != null) this2 = new Float32Array(buffer,0); else this2 = null;
	this.positions = this2;
	var buffer1 = this.vertexArray.buffer;
	var this3;
	if(buffer1 != null) this3 = new Uint32Array(buffer1,0); else this3 = null;
	this.colors = this3;
	var elements = this.indexArraySize;
	var this4;
	if(elements != null) this4 = new Uint16Array(elements); else this4 = null;
	this.indices = this4;
	var i = 0;
	var j = 0;
	while(i < this.indexArraySize) {
		this.indices[i] = j;
		this.indices[i + 1] = j + 1;
		this.indices[i + 2] = j + 2;
		this.indices[i + 3] = j;
		this.indices[i + 4] = j + 2;
		this.indices[i + 5] = j + 3;
		i += 6;
		j += 4;
	}
	this.currentState = new openfl__$internal_renderer_opengl_utils__$SpriteBatch_State();
	this.dirty = true;
	this.drawing = false;
	this.batchedSprites = 0;
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.SpriteBatch"] = openfl__$internal_renderer_opengl_utils_SpriteBatch;
openfl__$internal_renderer_opengl_utils_SpriteBatch.__name__ = true;
openfl__$internal_renderer_opengl_utils_SpriteBatch.prototype = {
	begin: function(renderSession,clipRect) {
		this.renderSession = renderSession;
		this.shader = renderSession.shaderManager.defaultShader;
		this.drawing = true;
		this.start(clipRect);
	}
	,finish: function() {
		this.stop();
		this.clipRect = null;
		this.drawing = false;
	}
	,start: function(clipRect) {
		if(!this.drawing) throw new js__$Boot_HaxeError("Call Spritebatch.begin() before start()");
		this.dirty = true;
		this.clipRect = clipRect;
	}
	,stop: function() {
		this.flush();
	}
	,renderBitmapData: function(bitmapData,smoothing,matrix,ct,alpha,blendMode,pixelSnapping,bgra) {
		if(bgra == null) bgra = false;
		if(alpha == null) alpha = 1;
		if(bitmapData == null) return;
		var texture = bitmapData.getTexture(this.gl);
		if(this.batchedSprites >= this.maxSprites) this.flush();
		var uvs = bitmapData.__uvData;
		if(uvs == null) return;
		var color = ((alpha * 255 | 0) & 255) << 24 | 16777215;
		this.enableColor = true;
		if(this.enableColor != this.lastEnableColor) {
			this.flush();
			this.lastEnableColor = this.enableColor;
		}
		this.attributes[2].enabled = this.lastEnableColor;
		this.elementsPerVertex = this.getElementsPerVertex();
		var index = this.batchedSprites * 4 * this.elementsPerVertex;
		this.fillVertices(index,bitmapData.width,bitmapData.height,matrix,uvs,null,color,pixelSnapping);
		this.setState(this.batchedSprites,texture,smoothing,blendMode,ct,true);
		this.batchedSprites++;
	}
	,renderTiles: function(object,sheet,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		var texture = sheet.__bitmap.getTexture(this.gl);
		if(texture == null) return;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		var useRect = (flags & 32) > 0;
		var useOrigin = (flags & 64) > 0;
		var blendMode;
		var _g = flags & 983040;
		switch(_g) {
		case 65536:
			blendMode = openfl_display_BlendMode.ADD;
			break;
		case 131072:
			blendMode = openfl_display_BlendMode.MULTIPLY;
			break;
		case 262144:
			blendMode = openfl_display_BlendMode.SCREEN;
			break;
		case 524288:
			blendMode = openfl_display_BlendMode.SUBTRACT;
			break;
		default:
			blendMode = openfl_display_BlendMode.NORMAL;
		}
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		if(count >= 0 && totalCount > count) totalCount = count;
		var itemCount = totalCount / numValues | 0;
		var iIndex = 0;
		var tileID = -1;
		var rect = sheet.__rectTile;
		var tileUV = sheet.__rectUV;
		var center = sheet.__point;
		var x = 0.0;
		var y = 0.0;
		var alpha = 1.0;
		var tint = 16777215;
		var color = -1;
		var scale = 1.0;
		var rotation = 0.0;
		var cosTheta = 1.0;
		var sinTheta = 0.0;
		var a = 0.0;
		var b = 0.0;
		var c = 0.0;
		var d = 0.0;
		var tx = 0.0;
		var ty = 0.0;
		var ox = 0.0;
		var oy = 0.0;
		var matrix = new openfl_geom_Matrix();
		var oMatrix = object.__worldTransform;
		var uvs = new openfl_display_TextureUvs();
		var bIndex = 0;
		this.enableColor = true;
		if(this.enableColor != this.lastEnableColor) {
			this.flush();
			this.lastEnableColor = this.enableColor;
		}
		this.attributes[2].enabled = this.lastEnableColor;
		this.elementsPerVertex = this.getElementsPerVertex();
		while(iIndex < totalCount) {
			if(this.batchedSprites >= this.maxSprites) this.flush();
			x = tileData[iIndex];
			y = tileData[iIndex + 1];
			if(useRect) {
				tileID = -1;
				rect.x = tileData[iIndex + 2];
				rect.y = tileData[iIndex + 3];
				rect.width = tileData[iIndex + 4];
				rect.height = tileData[iIndex + 5];
				if(useOrigin) {
					center.x = tileData[iIndex + 6];
					center.y = tileData[iIndex + 7];
				} else {
					center.x = 0;
					center.y = 0;
				}
				tileUV.setTo(rect.get_left() / sheet.__bitmap.width,rect.get_top() / sheet.__bitmap.height,rect.get_right() / sheet.__bitmap.width,rect.get_bottom() / sheet.__bitmap.height);
			} else {
				tileID = (tileData[iIndex + 2] == null?0:tileData[iIndex + 2]) | 0;
				rect = sheet.__tileRects[tileID];
				center = sheet.__centerPoints[tileID];
				tileUV = sheet.__tileUVs[tileID];
			}
			if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
				alpha = 1;
				tint = 16777215;
				a = 1;
				b = 0;
				c = 0;
				d = 1;
				tx = 0;
				ty = 0;
				scale = 1.0;
				rotation = 0.0;
				cosTheta = 1.0;
				sinTheta = 0.0;
				matrix.identity();
				if(useAlpha) alpha = tileData[iIndex + alphaIndex] * object.__worldAlpha; else alpha = object.__worldAlpha;
				if(useRGB) tint = (tileData[iIndex + rgbIndex] * 255 | 0) << 16 | (tileData[iIndex + rgbIndex + 1] * 255 | 0) << 8 | (tileData[iIndex + rgbIndex + 2] * 255 | 0);
				if(useScale) scale = tileData[iIndex + scaleIndex];
				if(useRotation) {
					rotation = tileData[iIndex + rotationIndex];
					cosTheta = Math.cos(rotation);
					sinTheta = Math.sin(rotation);
				}
				if(useTransform) {
					a = tileData[iIndex + transformIndex];
					b = tileData[iIndex + transformIndex + 1];
					c = tileData[iIndex + transformIndex + 2];
					d = tileData[iIndex + transformIndex + 3];
				} else {
					a = scale * cosTheta;
					b = scale * sinTheta;
					c = -b;
					d = a;
				}
				ox = center.x * a + center.y * c;
				oy = center.x * b + center.y * d;
				tx = x - ox;
				ty = y - oy;
				matrix.a = a * oMatrix.a + b * oMatrix.c;
				matrix.b = a * oMatrix.b + b * oMatrix.d;
				matrix.c = c * oMatrix.a + d * oMatrix.c;
				matrix.d = c * oMatrix.b + d * oMatrix.d;
				matrix.tx = tx * oMatrix.a + ty * oMatrix.c + oMatrix.tx;
				matrix.ty = tx * oMatrix.b + ty * oMatrix.d + oMatrix.ty;
				uvs.x0 = tileUV.x;
				uvs.y0 = tileUV.y;
				uvs.x1 = tileUV.width;
				uvs.y1 = tileUV.y;
				uvs.x2 = tileUV.width;
				uvs.y2 = tileUV.height;
				uvs.x3 = tileUV.x;
				uvs.y3 = tileUV.height;
				bIndex = this.batchedSprites * 4 * this.elementsPerVertex;
				color = ((alpha * 255 | 0) & 255) << 24 | (tint & 255) << 16 | (tint >> 8 & 255) << 8 | tint >> 16 & 255;
				this.fillVertices(bIndex,rect.width,rect.height,matrix,uvs,null,color,openfl_display_PixelSnapping.NEVER);
				this.setState(this.batchedSprites,texture,smooth,blendMode,object.__worldColorTransform,false);
				this.batchedSprites++;
			}
			iIndex += numValues;
		}
	}
	,fillVertices: function(index,width,height,matrix,uvs,pivot,color,pixelSnapping) {
		if(color == null) color = -1;
		var w0;
		var w1;
		var h0;
		var h1;
		if(pivot == null) {
			w0 = width;
			w1 = 0;
			h0 = height;
			h1 = 0;
		} else {
			w0 = width * (1 - pivot.x);
			w1 = width * -pivot.x;
			h0 = height * (1 - pivot.y);
			h1 = height * -pivot.y;
		}
		if(pixelSnapping == null) pixelSnapping = openfl_display_PixelSnapping.NEVER;
		var snap = pixelSnapping != openfl_display_PixelSnapping.NEVER;
		var a = matrix.a;
		var b = matrix.b;
		var c = matrix.c;
		var d = matrix.d;
		var tx = matrix.tx;
		var ty = matrix.ty;
		var cOffsetIndex = 0;
		if(!snap) {
			var idx = index++;
			this.positions[idx] = a * w1 + c * h1 + tx;
			var idx1 = index++;
			this.positions[idx1] = d * h1 + b * w1 + ty;
		} else {
			var idx2 = index++;
			var val = Math.round(a * w1 + c * h1 + tx);
			this.positions[idx2] = val;
			var idx3 = index++;
			var val1 = Math.round(d * h1 + b * w1 + ty);
			this.positions[idx3] = val1;
		}
		var idx4 = index++;
		this.positions[idx4] = uvs.x0;
		var idx5 = index++;
		this.positions[idx5] = uvs.y0;
		if(this.enableColor) {
			var idx6 = index++;
			this.colors[idx6] = color;
		}
		if(!snap) {
			var idx7 = index++;
			this.positions[idx7] = a * w0 + c * h1 + tx;
			var idx8 = index++;
			this.positions[idx8] = d * h1 + b * w0 + ty;
		} else {
			var idx9 = index++;
			var val2 = Math.round(a * w0 + c * h1 + tx);
			this.positions[idx9] = val2;
			var idx10 = index++;
			var val3 = Math.round(d * h1 + b * w0 + ty);
			this.positions[idx10] = val3;
		}
		var idx11 = index++;
		this.positions[idx11] = uvs.x1;
		var idx12 = index++;
		this.positions[idx12] = uvs.y1;
		if(this.enableColor) {
			var idx13 = index++;
			this.colors[idx13] = color;
		}
		if(!snap) {
			var idx14 = index++;
			this.positions[idx14] = a * w0 + c * h0 + tx;
			var idx15 = index++;
			this.positions[idx15] = d * h0 + b * w0 + ty;
		} else {
			var idx16 = index++;
			var val4 = Math.round(a * w0 + c * h0 + tx);
			this.positions[idx16] = val4;
			var idx17 = index++;
			var val5 = Math.round(d * h0 + b * w0 + ty);
			this.positions[idx17] = val5;
		}
		var idx18 = index++;
		this.positions[idx18] = uvs.x2;
		var idx19 = index++;
		this.positions[idx19] = uvs.y2;
		if(this.enableColor) {
			var idx20 = index++;
			this.colors[idx20] = color;
		}
		if(!snap) {
			var idx21 = index++;
			this.positions[idx21] = a * w1 + c * h0 + tx;
			var idx22 = index++;
			this.positions[idx22] = d * h0 + b * w1 + ty;
		} else {
			var idx23 = index++;
			var val6 = Math.round(a * w1 + c * h0 + tx);
			this.positions[idx23] = val6;
			var idx24 = index++;
			var val7 = Math.round(d * h0 + b * w1 + ty);
			this.positions[idx24] = val7;
		}
		var idx25 = index++;
		this.positions[idx25] = uvs.x3;
		var idx26 = index++;
		this.positions[idx26] = uvs.y3;
		if(this.enableColor) {
			var idx27 = index++;
			this.colors[idx27] = color;
		}
		this.writtenVertexBytes = index;
	}
	,flush: function() {
		if(this.batchedSprites == 0) return;
		if(this.clipRect != null) {
			this.gl.enable(this.gl.SCISSOR_TEST);
			this.gl.scissor(Math.floor(this.clipRect.x),Math.floor(this.clipRect.y),Math.floor(this.clipRect.width),Math.floor(this.clipRect.height));
		}
		if(this.dirty) {
			this.dirty = false;
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.vertexArray.bind();
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		}
		if(this.writtenVertexBytes > this.vertexArraySize * 0.5) this.vertexArray.upload(this.positions); else {
			var view = this.positions.subarray(0,this.writtenVertexBytes);
			this.vertexArray.upload(view);
		}
		var nextState;
		var batchSize = 0;
		var start = 0;
		this.currentState.shader = this.renderSession.shaderManager.defaultShader;
		this.currentState.texture = null;
		this.currentState.textureSmooth = false;
		this.currentState.blendMode = this.renderSession.blendModeManager.currentBlendMode;
		this.currentState.colorTransform = null;
		this.currentState.skipColorTransformAlpha = false;
		var _g1 = 0;
		var _g = this.batchedSprites;
		while(_g1 < _g) {
			var i = _g1++;
			nextState = this.states[i];
			this.currentState.skipColorTransformAlpha = nextState.skipColorTransformAlpha;
			if(!nextState.equals(this.currentState)) {
				this.renderBatch(this.currentState,batchSize,start);
				start = i;
				batchSize = 0;
				this.currentState.shader = nextState.shader;
				this.currentState.texture = nextState.texture;
				this.currentState.textureSmooth = nextState.textureSmooth;
				this.currentState.blendMode = nextState.blendMode;
				this.currentState.colorTransform = nextState.colorTransform;
			}
			batchSize++;
		}
		this.renderBatch(this.currentState,batchSize,start);
		this.batchedSprites = 0;
		this.writtenVertexBytes = 0;
		if(this.clipRect != null) this.gl.disable(this.gl.SCISSOR_TEST);
	}
	,renderBatch: function(state,size,start) {
		if(size == 0 || state.texture == null) return;
		var shader;
		if(state.shader == null) shader = this.renderSession.shaderManager.defaultShader; else shader = state.shader;
		this.renderSession.shaderManager.setShader(shader);
		shader.bindVertexArray(this.vertexArray);
		this.gl.uniformMatrix3fv(shader.getUniformLocation("uProjectionMatrix"),false,this.renderSession.projectionMatrix.toArray(true));
		if(state.colorTransform != null) {
			var ct = state.colorTransform;
			this.gl.uniform4f(shader.getUniformLocation("uColorMultiplier"),ct.redMultiplier,ct.greenMultiplier,ct.blueMultiplier,state.skipColorTransformAlpha?1:ct.alphaMultiplier);
			this.gl.uniform4f(shader.getUniformLocation("uColorOffset"),ct.redOffset / 255.,ct.greenOffset / 255.,ct.blueOffset / 255.,ct.alphaOffset / 255.);
		} else {
			this.gl.uniform4f(shader.getUniformLocation("uColorMultiplier"),1,1,1,1);
			this.gl.uniform4f(shader.getUniformLocation("uColorOffset"),0,0,0,0);
		}
		this.renderSession.blendModeManager.setBlendMode(state.blendMode);
		this.gl.bindTexture(this.gl.TEXTURE_2D,state.texture);
		if(state.textureSmooth) {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR);
		} else {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		}
		this.gl.drawElements(this.gl.TRIANGLES,size * 6,this.gl.UNSIGNED_SHORT,start * 6 * 2);
		this.renderSession.drawCount++;
	}
	,setState: function(index,texture,smooth,blendMode,colorTransform,skipAlpha) {
		if(skipAlpha == null) skipAlpha = false;
		if(smooth == null) smooth = false;
		var state = this.states[index];
		if(state == null) state = this.states[index] = new openfl__$internal_renderer_opengl_utils__$SpriteBatch_State();
		state.texture = texture;
		state.textureSmooth = smooth;
		state.blendMode = blendMode;
		state.colorTransform = colorTransform;
		state.skipColorTransformAlpha = skipAlpha;
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.vertexArray.setContext(gl,this.positions);
		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);
	}
	,getElementsPerVertex: function() {
		var r = 0;
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.enabled) r += Math.floor(a.components * a.getElementsBytes() / 4);
		}
		return r;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_SpriteBatch
};
var openfl__$internal_renderer_opengl_utils__$SpriteBatch_State = function() {
	this.skipColorTransformAlpha = false;
	this.textureSmooth = true;
};
$hxClasses["openfl._internal.renderer.opengl.utils._SpriteBatch.State"] = openfl__$internal_renderer_opengl_utils__$SpriteBatch_State;
openfl__$internal_renderer_opengl_utils__$SpriteBatch_State.__name__ = true;
openfl__$internal_renderer_opengl_utils__$SpriteBatch_State.prototype = {
	equals: function(other) {
		return (this.shader == null || other.shader == null || this.shader.ID == other.shader.ID) && this.texture == other.texture && this.textureSmooth == other.textureSmooth && this.blendMode == other.blendMode && (this.colorTransform != null && this.colorTransform.__equals(other.colorTransform,this.skipColorTransformAlpha));
	}
	,__class__: openfl__$internal_renderer_opengl_utils__$SpriteBatch_State
};
var openfl__$internal_renderer_opengl_utils_StencilManager = function(gl) {
	this.stencilMask = 0;
	this.stencilStack = [];
	this.setContext(gl);
	this.reverse = true;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.StencilManager"] = openfl__$internal_renderer_opengl_utils_StencilManager;
openfl__$internal_renderer_opengl_utils_StencilManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_StencilManager.prototype = {
	prepareGraphics: function(fill,renderSession,translationMatrix) {
		var shader = renderSession.shaderManager.fillShader;
		renderSession.shaderManager.setShader(shader);
		this.gl.uniformMatrix3fv(shader.getUniformLocation("uTranslationMatrix"),false,translationMatrix);
		this.gl.uniformMatrix3fv(shader.getUniformLocation("uProjectionMatrix"),false,renderSession.projectionMatrix.toArray(true));
		fill.vertexArray.bind();
		shader.bindVertexArray(fill.vertexArray);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,fill.indexBuffer);
	}
	,pushBucket: function(bucket,renderSession,translationMatrix,isMask) {
		if(isMask == null) isMask = false;
		if(!isMask) {
			this.gl.enable(this.gl.STENCIL_TEST);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
			this.gl.stencilMask(255);
			this.gl.colorMask(false,false,false,false);
			this.gl.stencilFunc(this.gl.NEVER,1,255);
			this.gl.stencilOp(this.gl.INVERT,this.gl.KEEP,this.gl.KEEP);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
		}
		var _g = 0;
		var _g1 = bucket.fills;
		while(_g < _g1.length) {
			var fill = _g1[_g];
			++_g;
			if(fill.available) continue;
			this.prepareGraphics(fill,renderSession,translationMatrix);
			this.gl.drawElements(fill.drawMode,fill.glIndices.length,this.gl.UNSIGNED_SHORT,0);
		}
		if(!isMask) {
			this.gl.colorMask(true,true,true,renderSession.renderer.transparent);
			this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
			this.gl.stencilFunc(this.gl.EQUAL,255,255);
		}
	}
	,popBucket: function(object,bucket,renderSession) {
		this.gl.disable(this.gl.STENCIL_TEST);
	}
	,pushMask: function(object,renderSession) {
		var maskGraphics = object.__maskGraphics;
		if(maskGraphics == null || maskGraphics.__commands.length <= 0) return;
		if(this.stencilMask == 0) {
			this.gl.enable(this.gl.STENCIL_TEST);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
		}
		this.stencilMask++;
		if(maskGraphics.__dirty) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics(object,maskGraphics,renderSession.gl);
		var func;
		if(this.stencilMask == 1) func = this.gl.NEVER; else func = this.gl.EQUAL;
		var ref = this.stencilMask;
		var mask = 255 - this.stencilMask;
		this.gl.stencilMask(255);
		this.gl.colorMask(false,false,false,false);
		this.gl.stencilFunc(func,ref,mask);
		this.gl.stencilOp(this.gl.REPLACE,this.gl.KEEP,this.gl.KEEP);
		var glStack = maskGraphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
		var bucket;
		var translationMatrix = object.__worldTransform;
		var _g1 = 0;
		var _g = glStack.buckets.length;
		while(_g1 < _g) {
			var i = _g1++;
			bucket = glStack.buckets[i];
			if(bucket.overrideMatrix != null) translationMatrix = bucket.overrideMatrix; else translationMatrix = object.__worldTransform;
			var _g2 = bucket.mode;
			switch(_g2[1]) {
			case 1:case 2:
				this.pushBucket(bucket,renderSession,translationMatrix.toArray(true),true);
				break;
			default:
			}
		}
		this.gl.colorMask(true,true,true,renderSession.renderer.transparent);
		this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
		this.gl.stencilFunc(this.gl.EQUAL,this.stencilMask,255);
	}
	,popMask: function(object,renderSession) {
		this.stencilMask--;
		if(this.stencilMask <= 0) {
			this.gl.disable(this.gl.STENCIL_TEST);
			this.stencilMask = 0;
		}
	}
	,setContext: function(gl) {
		this.gl = gl;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_StencilManager
};
var openfl__$internal_renderer_opengl_utils_VertexArray = function(attributes,size,isStatic) {
	if(isStatic == null) isStatic = false;
	if(size == null) size = 0;
	this.isStatic = false;
	this.size = 0;
	this.attributes = [];
	this.size = size;
	this.attributes = attributes;
	if(size > 0) this.buffer = new ArrayBuffer(size);
	this.isStatic = isStatic;
};
$hxClasses["openfl._internal.renderer.opengl.utils.VertexArray"] = openfl__$internal_renderer_opengl_utils_VertexArray;
openfl__$internal_renderer_opengl_utils_VertexArray.__name__ = true;
openfl__$internal_renderer_opengl_utils_VertexArray.prototype = {
	bind: function() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.glBuffer);
	}
	,upload: function(view) {
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,view);
	}
	,setContext: function(gl,view) {
		this.gl = gl;
		this.glBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,this.glBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,view,this.isStatic?gl.STATIC_DRAW:gl.DYNAMIC_DRAW);
	}
	,get_stride: function() {
		var s = 0;
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.enabled) s += Math.floor(a.components * a.getElementsBytes() / 4) * 4;
		}
		return s;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_VertexArray
};
var openfl_display_BitmapData = function(width,height,transparent,fillColor) {
	if(fillColor == null) fillColor = -1;
	if(transparent == null) transparent = true;
	this.__usingFramebuffer = false;
	this.transparent = transparent;
	if(width == null) width = 0; else width = width;
	if(height == null) height = 0; else height = height;
	if(width < 0) width = 0; else width = width;
	if(height < 0) height = 0; else height = height;
	this.width = width;
	this.height = height;
	this.rect = new openfl_geom_Rectangle(0,0,width,height);
	if(width > 0 && height > 0) {
		if(transparent) {
			if((fillColor & -16777216) == 0) fillColor = 0;
		} else fillColor = -16777216 | fillColor & 16777215;
		fillColor = fillColor << 8 | fillColor >> 24 & 255;
		this.__image = new lime_graphics_Image(null,0,0,width,height,fillColor);
		this.__image.set_transparent(transparent);
		this.__isValid = true;
	}
	this.__createUVs();
	this.__worldTransform = new openfl_geom_Matrix();
	this.__worldColorTransform = new openfl_geom_ColorTransform();
};
$hxClasses["openfl.display.BitmapData"] = openfl_display_BitmapData;
openfl_display_BitmapData.__name__ = true;
openfl_display_BitmapData.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_BitmapData.fromCanvas = function(canvas,transparent) {
	if(transparent == null) transparent = true;
	if(canvas == null) return null;
	var bitmapData = new openfl_display_BitmapData(0,0,transparent);
	bitmapData.__fromImage(lime_graphics_Image.fromCanvas(canvas));
	bitmapData.__image.set_transparent(transparent);
	return bitmapData;
};
openfl_display_BitmapData.prototype = {
	getTexture: function(gl) {
		if(!this.__isValid) return null;
		if(this.__usingFramebuffer && this.__framebuffer != null) return this.__framebuffer.texture;
		if(this.__texture == null) {
			this.__texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
			this.__image.dirty = true;
		}
		if(this.__image != null && this.__image.dirty) {
			var internalFormat;
			var format;
			if(this.__surface != null) lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.flush(this.__surface);
			if(this.__image.buffer.bitsPerPixel == 1) {
				internalFormat = gl.ALPHA;
				format = gl.ALPHA;
			} else {
				internalFormat = gl.RGBA;
				format = gl.RGBA;
			}
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			var textureImage = this.__image;
			if(!textureImage.get_premultiplied() && textureImage.get_transparent() || textureImage.get_format() != 0) {
				textureImage = textureImage.clone();
				textureImage.set_format(0);
				textureImage.set_premultiplied(true);
			}
			gl.texImage2D(gl.TEXTURE_2D,0,internalFormat,this.width,this.height,0,format,gl.UNSIGNED_BYTE,textureImage.get_data());
			gl.bindTexture(gl.TEXTURE_2D,null);
			this.__image.dirty = false;
		}
		return this.__texture;
	}
	,__createUVs: function() {
		if(this.__uvData == null) this.__uvData = new openfl_display_TextureUvs();
		this.__uvData.x0 = 0;
		this.__uvData.y0 = 0;
		this.__uvData.x1 = 1;
		this.__uvData.y1 = 0;
		this.__uvData.x2 = 1;
		this.__uvData.y2 = 1;
		this.__uvData.x3 = 0;
		this.__uvData.y3 = 1;
	}
	,__fromImage: function(image) {
		if(image != null && image.buffer != null) {
			this.__image = image;
			this.width = image.width;
			this.height = image.height;
			this.rect = new openfl_geom_Rectangle(0,0,image.width,image.height);
			this.__isValid = true;
		}
	}
	,__sync: function() {
		lime_graphics_utils_ImageCanvasUtil.sync(this.__image);
	}
	,__class__: openfl_display_BitmapData
};
var openfl_display_TextureUvs = function() {
	this.y3 = 0;
	this.y2 = 0;
	this.y1 = 0;
	this.y0 = 0;
	this.x3 = 0;
	this.x2 = 0;
	this.x1 = 0;
	this.x0 = 0;
};
$hxClasses["openfl.display.TextureUvs"] = openfl_display_TextureUvs;
openfl_display_TextureUvs.__name__ = true;
openfl_display_TextureUvs.prototype = {
	__class__: openfl_display_TextureUvs
};
var openfl_display_BlendMode = $hxClasses["openfl.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] };
openfl_display_BlendMode.ADD = ["ADD",0];
openfl_display_BlendMode.ADD.toString = $estr;
openfl_display_BlendMode.ADD.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.ALPHA = ["ALPHA",1];
openfl_display_BlendMode.ALPHA.toString = $estr;
openfl_display_BlendMode.ALPHA.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.DARKEN = ["DARKEN",2];
openfl_display_BlendMode.DARKEN.toString = $estr;
openfl_display_BlendMode.DARKEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.DIFFERENCE = ["DIFFERENCE",3];
openfl_display_BlendMode.DIFFERENCE.toString = $estr;
openfl_display_BlendMode.DIFFERENCE.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.ERASE = ["ERASE",4];
openfl_display_BlendMode.ERASE.toString = $estr;
openfl_display_BlendMode.ERASE.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.HARDLIGHT = ["HARDLIGHT",5];
openfl_display_BlendMode.HARDLIGHT.toString = $estr;
openfl_display_BlendMode.HARDLIGHT.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.INVERT = ["INVERT",6];
openfl_display_BlendMode.INVERT.toString = $estr;
openfl_display_BlendMode.INVERT.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.LAYER = ["LAYER",7];
openfl_display_BlendMode.LAYER.toString = $estr;
openfl_display_BlendMode.LAYER.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.LIGHTEN = ["LIGHTEN",8];
openfl_display_BlendMode.LIGHTEN.toString = $estr;
openfl_display_BlendMode.LIGHTEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.MULTIPLY = ["MULTIPLY",9];
openfl_display_BlendMode.MULTIPLY.toString = $estr;
openfl_display_BlendMode.MULTIPLY.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.NORMAL = ["NORMAL",10];
openfl_display_BlendMode.NORMAL.toString = $estr;
openfl_display_BlendMode.NORMAL.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.OVERLAY = ["OVERLAY",11];
openfl_display_BlendMode.OVERLAY.toString = $estr;
openfl_display_BlendMode.OVERLAY.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.SCREEN = ["SCREEN",12];
openfl_display_BlendMode.SCREEN.toString = $estr;
openfl_display_BlendMode.SCREEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.SUBTRACT = ["SUBTRACT",13];
openfl_display_BlendMode.SUBTRACT.toString = $estr;
openfl_display_BlendMode.SUBTRACT.__enum__ = openfl_display_BlendMode;
var openfl_display_CapsStyle = $hxClasses["openfl.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] };
openfl_display_CapsStyle.NONE = ["NONE",0];
openfl_display_CapsStyle.NONE.toString = $estr;
openfl_display_CapsStyle.NONE.__enum__ = openfl_display_CapsStyle;
openfl_display_CapsStyle.ROUND = ["ROUND",1];
openfl_display_CapsStyle.ROUND.toString = $estr;
openfl_display_CapsStyle.ROUND.__enum__ = openfl_display_CapsStyle;
openfl_display_CapsStyle.SQUARE = ["SQUARE",2];
openfl_display_CapsStyle.SQUARE.toString = $estr;
openfl_display_CapsStyle.SQUARE.__enum__ = openfl_display_CapsStyle;
var openfl_display_FrameLabel = function() { };
$hxClasses["openfl.display.FrameLabel"] = openfl_display_FrameLabel;
openfl_display_FrameLabel.__name__ = true;
openfl_display_FrameLabel.__super__ = openfl_events_EventDispatcher;
openfl_display_FrameLabel.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_FrameLabel
});
var openfl_display_GradientType = $hxClasses["openfl.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] };
openfl_display_GradientType.RADIAL = ["RADIAL",0];
openfl_display_GradientType.RADIAL.toString = $estr;
openfl_display_GradientType.RADIAL.__enum__ = openfl_display_GradientType;
openfl_display_GradientType.LINEAR = ["LINEAR",1];
openfl_display_GradientType.LINEAR.toString = $estr;
openfl_display_GradientType.LINEAR.__enum__ = openfl_display_GradientType;
var openfl_display_Graphics = function() {
	this.__visible = true;
	this.__glStack = [];
	this.__dirty = true;
	this.__commands = [];
	this.__commands = [];
	this.__halfStrokeWidth = 0;
	this.__positionX = 0;
	this.__positionY = 0;
	this.__hardware = true;
	this.moveTo(0,0);
};
$hxClasses["openfl.display.Graphics"] = openfl_display_Graphics;
openfl_display_Graphics.__name__ = true;
openfl_display_Graphics.prototype = {
	beginFill: function(color,alpha) {
		if(alpha == null) alpha = 1;
		if(color == null) color = 0;
		this.__commands.push(openfl_display_DrawCommand.BeginFill(color & 16777215,alpha));
		if(alpha > 0) this.__visible = true;
	}
	,clear: function() {
		this.__commands = [];
		this.__halfStrokeWidth = 0;
		if(this.__bounds != null) {
			this.set___dirty(true);
			this.__transformDirty = true;
			this.__bounds = null;
		}
		this.__visible = false;
		this.__hardware = true;
		this.moveTo(0,0);
	}
	,drawCircle: function(x,y,radius) {
		if(radius <= 0) return;
		this.__inflateBounds(x - radius - this.__halfStrokeWidth,y - radius - this.__halfStrokeWidth);
		this.__inflateBounds(x + radius + this.__halfStrokeWidth,y + radius + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawCircle(x,y,radius));
		this.__hardware = false;
		this.set___dirty(true);
	}
	,drawRect: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawRect(x,y,width,height));
		this.set___dirty(true);
	}
	,endFill: function() {
		this.__commands.push(openfl_display_DrawCommand.EndFill);
	}
	,moveTo: function(x,y) {
		this.__positionX = x;
		this.__positionY = y;
		this.__commands.push(openfl_display_DrawCommand.MoveTo(x,y));
	}
	,__getBounds: function(rect,matrix) {
		if(this.__bounds == null) return;
		var bounds = openfl_geom_Rectangle.__temp;
		this.__bounds.__transform(bounds,matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__hitTest: function(x,y,shapeFlag,matrix) {
		if(this.__bounds == null) return false;
		var px = matrix.__transformInverseX(x,y);
		var py = matrix.__transformInverseY(x,y);
		if(this.__bounds.contains(px,py)) {
			if(shapeFlag) {
				if(this.__dirty) {
				}
				if(this.__context != null) {
				}
			}
			return true;
		}
		return false;
	}
	,__inflateBounds: function(x,y) {
		if(this.__bounds == null) {
			this.__bounds = new openfl_geom_Rectangle(x,y,0,0);
			this.__transformDirty = true;
			return;
		}
		if(x < this.__bounds.x) {
			this.__bounds.width += this.__bounds.x - x;
			this.__bounds.x = x;
			this.__transformDirty = true;
		}
		if(y < this.__bounds.y) {
			this.__bounds.height += this.__bounds.y - y;
			this.__bounds.y = y;
			this.__transformDirty = true;
		}
		if(x > this.__bounds.x + this.__bounds.width) this.__bounds.width = x - this.__bounds.x;
		if(y > this.__bounds.y + this.__bounds.height) this.__bounds.height = y - this.__bounds.y;
	}
	,set___dirty: function(value) {
		if(value && this.__owner != null) this.__owner.__setRenderDirty();
		return this.__dirty = value;
	}
	,__class__: openfl_display_Graphics
};
var openfl_display_DrawCommand = $hxClasses["openfl.display.DrawCommand"] = { __ename__ : true, __constructs__ : ["BeginBitmapFill","BeginFill","BeginGradientFill","CubicCurveTo","CurveTo","DrawCircle","DrawEllipse","DrawRect","DrawRoundRect","DrawTiles","DrawTriangles","EndFill","LineStyle","LineBitmapStyle","LineGradientStyle","LineTo","MoveTo","DrawPathC","OverrideMatrix"] };
openfl_display_DrawCommand.BeginBitmapFill = function(bitmap,matrix,repeat,smooth) { var $x = ["BeginBitmapFill",0,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.BeginFill = function(color,alpha) { var $x = ["BeginFill",1,color,alpha]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.BeginGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) { var $x = ["BeginGradientFill",2,type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.CubicCurveTo = function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) { var $x = ["CubicCurveTo",3,controlX1,controlY1,controlX2,controlY2,anchorX,anchorY]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.CurveTo = function(controlX,controlY,anchorX,anchorY) { var $x = ["CurveTo",4,controlX,controlY,anchorX,anchorY]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawCircle = function(x,y,radius) { var $x = ["DrawCircle",5,x,y,radius]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawEllipse = function(x,y,width,height) { var $x = ["DrawEllipse",6,x,y,width,height]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawRect = function(x,y,width,height) { var $x = ["DrawRect",7,x,y,width,height]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawRoundRect = function(x,y,width,height,rx,ry) { var $x = ["DrawRoundRect",8,x,y,width,height,rx,ry]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",9,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",10,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.EndFill = ["EndFill",11];
openfl_display_DrawCommand.EndFill.toString = $estr;
openfl_display_DrawCommand.EndFill.__enum__ = openfl_display_DrawCommand;
openfl_display_DrawCommand.LineStyle = function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) { var $x = ["LineStyle",12,thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.LineBitmapStyle = function(bitmap,matrix,repeat,smooth) { var $x = ["LineBitmapStyle",13,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.LineGradientStyle = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) { var $x = ["LineGradientStyle",14,type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.LineTo = function(x,y) { var $x = ["LineTo",15,x,y]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.MoveTo = function(x,y) { var $x = ["MoveTo",16,x,y]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawPathC = function(commands,data,winding) { var $x = ["DrawPathC",17,commands,data,winding]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.OverrideMatrix = function(matrix) { var $x = ["OverrideMatrix",18,matrix]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
var openfl_display_GraphicsPathWinding = $hxClasses["openfl.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] };
openfl_display_GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
openfl_display_GraphicsPathWinding.EVEN_ODD.toString = $estr;
openfl_display_GraphicsPathWinding.EVEN_ODD.__enum__ = openfl_display_GraphicsPathWinding;
openfl_display_GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
openfl_display_GraphicsPathWinding.NON_ZERO.toString = $estr;
openfl_display_GraphicsPathWinding.NON_ZERO.__enum__ = openfl_display_GraphicsPathWinding;
var openfl_display_InterpolationMethod = $hxClasses["openfl.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] };
openfl_display_InterpolationMethod.RGB = ["RGB",0];
openfl_display_InterpolationMethod.RGB.toString = $estr;
openfl_display_InterpolationMethod.RGB.__enum__ = openfl_display_InterpolationMethod;
openfl_display_InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
openfl_display_InterpolationMethod.LINEAR_RGB.toString = $estr;
openfl_display_InterpolationMethod.LINEAR_RGB.__enum__ = openfl_display_InterpolationMethod;
var openfl_display_JointStyle = $hxClasses["openfl.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] };
openfl_display_JointStyle.MITER = ["MITER",0];
openfl_display_JointStyle.MITER.toString = $estr;
openfl_display_JointStyle.MITER.__enum__ = openfl_display_JointStyle;
openfl_display_JointStyle.ROUND = ["ROUND",1];
openfl_display_JointStyle.ROUND.toString = $estr;
openfl_display_JointStyle.ROUND.__enum__ = openfl_display_JointStyle;
openfl_display_JointStyle.BEVEL = ["BEVEL",2];
openfl_display_JointStyle.BEVEL.toString = $estr;
openfl_display_JointStyle.BEVEL.__enum__ = openfl_display_JointStyle;
var openfl_display_LineScaleMode = $hxClasses["openfl.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] };
openfl_display_LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
openfl_display_LineScaleMode.HORIZONTAL.toString = $estr;
openfl_display_LineScaleMode.HORIZONTAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NONE = ["NONE",1];
openfl_display_LineScaleMode.NONE.toString = $estr;
openfl_display_LineScaleMode.NONE.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NORMAL = ["NORMAL",2];
openfl_display_LineScaleMode.NORMAL.toString = $estr;
openfl_display_LineScaleMode.NORMAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.VERTICAL = ["VERTICAL",3];
openfl_display_LineScaleMode.VERTICAL.toString = $estr;
openfl_display_LineScaleMode.VERTICAL.__enum__ = openfl_display_LineScaleMode;
var openfl_display_Loader = function() { };
$hxClasses["openfl.display.Loader"] = openfl_display_Loader;
openfl_display_Loader.__name__ = true;
openfl_display_Loader.__super__ = openfl_display_Sprite;
openfl_display_Loader.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: openfl_display_Loader
});
var openfl_display_PixelSnapping = $hxClasses["openfl.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] };
openfl_display_PixelSnapping.NEVER = ["NEVER",0];
openfl_display_PixelSnapping.NEVER.toString = $estr;
openfl_display_PixelSnapping.NEVER.__enum__ = openfl_display_PixelSnapping;
openfl_display_PixelSnapping.AUTO = ["AUTO",1];
openfl_display_PixelSnapping.AUTO.toString = $estr;
openfl_display_PixelSnapping.AUTO.__enum__ = openfl_display_PixelSnapping;
openfl_display_PixelSnapping.ALWAYS = ["ALWAYS",2];
openfl_display_PixelSnapping.ALWAYS.toString = $estr;
openfl_display_PixelSnapping.ALWAYS.__enum__ = openfl_display_PixelSnapping;
var openfl_display_Preloader = function(display) {
	lime_app_Preloader.call(this);
	if(display != null) {
		this.display = display;
		openfl_Lib.current.addChild(display);
		if(js_Boot.__instanceof(display,NMEPreloader)) (js_Boot.__cast(display , NMEPreloader)).onInit();
	}
};
$hxClasses["openfl.display.Preloader"] = openfl_display_Preloader;
openfl_display_Preloader.__name__ = true;
openfl_display_Preloader.__super__ = lime_app_Preloader;
openfl_display_Preloader.prototype = $extend(lime_app_Preloader.prototype,{
	load: function(urls,types) {
		var sounds = [];
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "MUSIC":case "SOUND":
				var sound = haxe_io_Path.withoutExtension(url);
				if(!HxOverrides.remove(sounds,sound)) this.total++;
				sounds.push(sound);
				break;
			default:
			}
		}
		var _g3 = 0;
		while(_g3 < sounds.length) {
			var soundName = sounds[_g3];
			++_g3;
			var sound1 = new openfl_media_Sound();
			sound1.addEventListener(openfl_events_Event.COMPLETE,$bind(this,this.sound_onComplete));
			sound1.addEventListener(openfl_events_IOErrorEvent.IO_ERROR,$bind(this,this.sound_onIOError));
			sound1.load(new openfl_net_URLRequest(soundName + ".ogg"));
		}
		lime_app_Preloader.prototype.load.call(this,urls,types);
	}
	,start: function() {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) {
			this.display.addEventListener(openfl_events_Event.COMPLETE,$bind(this,this.display_onComplete));
			(js_Boot.__cast(this.display , NMEPreloader)).onLoaded();
		} else lime_app_Preloader.prototype.start.call(this);
	}
	,update: function(loaded,total) {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) (js_Boot.__cast(this.display , NMEPreloader)).onUpdate(loaded,total);
	}
	,display_onComplete: function(event) {
		this.display.removeEventListener(openfl_events_Event.COMPLETE,$bind(this,this.display_onComplete));
		openfl_Lib.current.removeChild(this.display);
		openfl_Lib.current.stage.set_focus(null);
		this.display = null;
		lime_app_Preloader.prototype.start.call(this);
	}
	,sound_onComplete: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,sound_onIOError: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: openfl_display_Preloader
});
var openfl_display_SpreadMethod = $hxClasses["openfl.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] };
openfl_display_SpreadMethod.REPEAT = ["REPEAT",0];
openfl_display_SpreadMethod.REPEAT.toString = $estr;
openfl_display_SpreadMethod.REPEAT.__enum__ = openfl_display_SpreadMethod;
openfl_display_SpreadMethod.REFLECT = ["REFLECT",1];
openfl_display_SpreadMethod.REFLECT.toString = $estr;
openfl_display_SpreadMethod.REFLECT.__enum__ = openfl_display_SpreadMethod;
openfl_display_SpreadMethod.PAD = ["PAD",2];
openfl_display_SpreadMethod.PAD.toString = $estr;
openfl_display_SpreadMethod.PAD.__enum__ = openfl_display_SpreadMethod;
var openfl_display_Stage = function(width,height,color) {
	openfl_display_DisplayObjectContainer.call(this);
	if(color == null) {
		this.__transparent = true;
		this.set_color(0);
	} else this.set_color(color);
	this.set_name(null);
	this.__displayState = openfl_display_StageDisplayState.NORMAL;
	this.__mouseX = 0;
	this.__mouseY = 0;
	this.__lastClickTime = 0;
	this.stageWidth = width;
	this.stageHeight = height;
	this.stage = this;
	this.align = openfl_display_StageAlign.TOP_LEFT;
	this.allowsFullScreen = false;
	this.quality = openfl_display_StageQuality.HIGH;
	this.scaleMode = openfl_display_StageScaleMode.NO_SCALE;
	this.stageFocusRect = true;
	this.__clearBeforeRender = true;
	this.__stack = [];
	this.__mouseOutStack = [];
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	this.stage3Ds = this1;
	var this3 = this.stage3Ds;
	var x = new openfl_display_Stage3D();
	if(!this3.fixed) {
		this3.length++;
		if(this3.data.length < this3.length) {
			var data;
			var this4;
			this4 = new Array(this3.data.length + 10);
			data = this4;
			haxe_ds__$Vector_Vector_$Impl_$.blit(this3.data,0,data,0,this3.data.length);
			this3.data = data;
		}
		this3.data[this3.length - 1] = x;
	}
	this3.length;
};
$hxClasses["openfl.display.Stage"] = openfl_display_Stage;
openfl_display_Stage.__name__ = true;
openfl_display_Stage.__interfaces__ = [lime_app_IModule];
openfl_display_Stage.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Stage.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	globalToLocal: function(pos) {
		return pos.clone();
	}
	,init: function(context) {
		switch(context[1]) {
		case 0:
			var gl = context[2];
			this.__renderer = new openfl__$internal_renderer_opengl_GLRenderer(this.stageWidth,this.stageHeight,gl);
			break;
		case 1:
			var context1 = context[2];
			this.__renderer = new openfl__$internal_renderer_canvas_CanvasRenderer(this.stageWidth,this.stageHeight,context1);
			break;
		case 2:
			var element = context[2];
			this.__renderer = new openfl__$internal_renderer_dom_DOMRenderer(this.stageWidth,this.stageHeight,element);
			break;
		case 4:
			var cairo = context[2];
			this.__renderer = new openfl__$internal_renderer_cairo_CairoRenderer(this.stageWidth,this.stageHeight,cairo);
			break;
		default:
		}
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
		openfl_ui_GameInput.__onGamepadAxisMove(gamepad,axis,value);
	}
	,onGamepadButtonDown: function(gamepad,button) {
		openfl_ui_GameInput.__onGamepadButtonDown(gamepad,button);
	}
	,onGamepadButtonUp: function(gamepad,button) {
		openfl_ui_GameInput.__onGamepadButtonUp(gamepad,button);
	}
	,onGamepadConnect: function(gamepad) {
		openfl_ui_GameInput.__onGamepadConnect(gamepad);
	}
	,onGamepadDisconnect: function(gamepad) {
		openfl_ui_GameInput.__onGamepadDisconnect(gamepad);
	}
	,onKeyDown: function(keyCode,modifier) {
		this.__onKey(openfl_events_KeyboardEvent.KEY_DOWN,keyCode,modifier);
	}
	,onKeyUp: function(keyCode,modifier) {
		this.__onKey(openfl_events_KeyboardEvent.KEY_UP,keyCode,modifier);
	}
	,onMouseDown: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl_events_MouseEvent.MIDDLE_MOUSE_DOWN;
			break;
		case 2:
			type = openfl_events_MouseEvent.RIGHT_MOUSE_DOWN;
			break;
		default:
			type = openfl_events_MouseEvent.MOUSE_DOWN;
		}
		this.__onMouse(type,x,y,button);
	}
	,onMouseMove: function(x,y) {
		this.__onMouse(openfl_events_MouseEvent.MOUSE_MOVE,x,y,0);
	}
	,onMouseMoveRelative: function(x,y) {
	}
	,onMouseUp: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl_events_MouseEvent.MIDDLE_MOUSE_UP;
			break;
		case 2:
			type = openfl_events_MouseEvent.RIGHT_MOUSE_UP;
			break;
		default:
			type = openfl_events_MouseEvent.MOUSE_UP;
		}
		this.__onMouse(type,x,y,button);
	}
	,onMouseWheel: function(deltaX,deltaY) {
		this.__onMouseWheel(deltaX,deltaY);
	}
	,onRenderContextLost: function() {
	}
	,onRenderContextRestored: function(context) {
	}
	,onTextEdit: function(text,start,length) {
	}
	,onTextInput: function(text) {
		var stack = [];
		if(this.__focus == null) this.__getInteractive(stack); else this.__focus.__getInteractive(stack);
		var event = new openfl_events_TextEvent(openfl_events_TextEvent.TEXT_INPUT,true,false,text);
		if(stack.length > 0) {
			stack.reverse();
			this.__fireEvent(event,stack);
		} else this.__broadcast(event,true);
	}
	,onTouchMove: function(x,y,id) {
		this.__onTouch("touchMove",x,y,id);
	}
	,onTouchEnd: function(x,y,id) {
		this.__onTouch("touchEnd",x,y,id);
	}
	,onTouchStart: function(x,y,id) {
		this.__onTouch("touchBegin",x,y,id);
	}
	,onWindowActivate: function() {
		var event = new openfl_events_Event(openfl_events_Event.ACTIVATE);
		this.__broadcast(event,true);
	}
	,onWindowClose: function() {
	}
	,onWindowDeactivate: function() {
		var event = new openfl_events_Event(openfl_events_Event.DEACTIVATE);
		this.__broadcast(event,true);
	}
	,onWindowEnter: function() {
	}
	,onWindowFocusIn: function() {
		var event = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_IN,true,false,null,false,0);
		this.__broadcast(event,true);
	}
	,onWindowFocusOut: function() {
		var event = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_OUT,true,false,null,false,0);
		this.__broadcast(event,true);
	}
	,onWindowFullscreen: function() {
	}
	,onWindowLeave: function() {
		this.__dispatchEvent(new openfl_events_Event(openfl_events_Event.MOUSE_LEAVE));
	}
	,onWindowMinimize: function() {
	}
	,onWindowMove: function(x,y) {
	}
	,onWindowResize: function(width,height) {
		this.stageWidth = width;
		this.stageHeight = height;
		if(this.__renderer != null) this.__renderer.resize(width,height);
		var event = new openfl_events_Event(openfl_events_Event.RESIZE);
		this.__broadcast(event,false);
	}
	,onWindowRestore: function() {
	}
	,render: function(context) {
		if(this.__rendering) return;
		this.__rendering = true;
		this.__broadcast(new openfl_events_Event(openfl_events_Event.ENTER_FRAME),true);
		if(this.__invalidated) {
			this.__invalidated = false;
			this.__broadcast(new openfl_events_Event(openfl_events_Event.RENDER),true);
		}
		this.__renderable = true;
		this.__enterFrame();
		this.__update(false,true);
		if(this.__renderer != null) {
			switch(context[1]) {
			case 4:
				var cairo = context[2];
				(js_Boot.__cast(this.__renderer , openfl__$internal_renderer_cairo_CairoRenderer)).cairo = cairo;
				this.__renderer.renderSession.cairo = cairo;
				break;
			default:
			}
			this.__renderer.render(this);
		}
		this.__rendering = false;
	}
	,update: function(deltaTime) {
	}
	,__drag: function(mouse) {
		var parent = this.__dragObject.parent;
		if(parent != null) mouse = parent.globalToLocal(mouse);
		var x = mouse.x + this.__dragOffsetX;
		var y = mouse.y + this.__dragOffsetY;
		if(this.__dragBounds != null) {
			if(x < this.__dragBounds.x) x = this.__dragBounds.x; else if(x > this.__dragBounds.get_right()) x = this.__dragBounds.get_right();
			if(y < this.__dragBounds.y) y = this.__dragBounds.y; else if(y > this.__dragBounds.get_bottom()) y = this.__dragBounds.get_bottom();
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__fireEvent: function(event,stack) {
		var length = stack.length;
		if(length == 0) {
			event.eventPhase = openfl_events_EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
		} else {
			event.eventPhase = openfl_events_EventPhase.CAPTURING_PHASE;
			event.target = stack[stack.length - 1];
			var _g1 = 0;
			var _g = length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				stack[i].__broadcast(event,false);
				if(event.__isCancelled) return;
			}
			event.eventPhase = openfl_events_EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
			if(event.__isCancelled) return;
			if(event.bubbles) {
				event.eventPhase = openfl_events_EventPhase.BUBBLING_PHASE;
				var i1 = length - 2;
				while(i1 >= 0) {
					stack[i1].__broadcast(event,false);
					if(event.__isCancelled) return;
					i1--;
				}
			}
		}
	}
	,__getInteractive: function(stack) {
		if(stack != null) stack.push(this);
		return true;
	}
	,__onKey: function(type,keyCode,modifier) {
		openfl_events_MouseEvent.__altKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey(modifier);
		openfl_events_MouseEvent.__commandKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey(modifier);
		openfl_events_MouseEvent.__ctrlKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier);
		openfl_events_MouseEvent.__shiftKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier);
		var stack = [];
		if(this.__focus == null) this.__getInteractive(stack); else this.__focus.__getInteractive(stack);
		if(stack.length > 0) {
			var keyLocation;
			switch(keyCode) {
			case 1073742048:case 1073742049:case 1073742050:case 1073742051:
				keyLocation = 1;
				break;
			case 1073742052:case 1073742053:case 1073742054:case 1073742055:
				keyLocation = 2;
				break;
			case 1073741908:case 1073741909:case 1073741910:case 1073741911:case 1073741912:case 1073741913:case 1073741914:case 1073741915:case 1073741916:case 1073741917:case 1073741918:case 1073741919:case 1073741920:case 1073741921:case 1073741922:case 1073741923:case 1073742044:
				keyLocation = 3;
				break;
			default:
				keyLocation = 0;
			}
			var keyCode1;
			switch(keyCode) {
			case 8:
				keyCode1 = 8;
				break;
			case 9:
				keyCode1 = 9;
				break;
			case 13:
				keyCode1 = 13;
				break;
			case 27:
				keyCode1 = 27;
				break;
			case 32:
				keyCode1 = 32;
				break;
			case 33:
				keyCode1 = 49;
				break;
			case 34:
				keyCode1 = 222;
				break;
			case 35:
				keyCode1 = 51;
				break;
			case 36:
				keyCode1 = 52;
				break;
			case 37:
				keyCode1 = 53;
				break;
			case 38:
				keyCode1 = 55;
				break;
			case 39:
				keyCode1 = 222;
				break;
			case 40:
				keyCode1 = 57;
				break;
			case 41:
				keyCode1 = 48;
				break;
			case 42:
				keyCode1 = 56;
				break;
			case 44:
				keyCode1 = 188;
				break;
			case 45:
				keyCode1 = 189;
				break;
			case 46:
				keyCode1 = 190;
				break;
			case 47:
				keyCode1 = 191;
				break;
			case 48:
				keyCode1 = 48;
				break;
			case 49:
				keyCode1 = 49;
				break;
			case 50:
				keyCode1 = 50;
				break;
			case 51:
				keyCode1 = 51;
				break;
			case 52:
				keyCode1 = 52;
				break;
			case 53:
				keyCode1 = 53;
				break;
			case 54:
				keyCode1 = 54;
				break;
			case 55:
				keyCode1 = 55;
				break;
			case 56:
				keyCode1 = 56;
				break;
			case 57:
				keyCode1 = 57;
				break;
			case 58:
				keyCode1 = 186;
				break;
			case 59:
				keyCode1 = 186;
				break;
			case 60:
				keyCode1 = 60;
				break;
			case 61:
				keyCode1 = 187;
				break;
			case 62:
				keyCode1 = 190;
				break;
			case 63:
				keyCode1 = 191;
				break;
			case 64:
				keyCode1 = 50;
				break;
			case 91:
				keyCode1 = 219;
				break;
			case 92:
				keyCode1 = 220;
				break;
			case 93:
				keyCode1 = 221;
				break;
			case 94:
				keyCode1 = 54;
				break;
			case 95:
				keyCode1 = 189;
				break;
			case 96:
				keyCode1 = 192;
				break;
			case 97:
				keyCode1 = 65;
				break;
			case 98:
				keyCode1 = 66;
				break;
			case 99:
				keyCode1 = 67;
				break;
			case 100:
				keyCode1 = 68;
				break;
			case 101:
				keyCode1 = 69;
				break;
			case 102:
				keyCode1 = 70;
				break;
			case 103:
				keyCode1 = 71;
				break;
			case 104:
				keyCode1 = 72;
				break;
			case 105:
				keyCode1 = 73;
				break;
			case 106:
				keyCode1 = 74;
				break;
			case 107:
				keyCode1 = 75;
				break;
			case 108:
				keyCode1 = 76;
				break;
			case 109:
				keyCode1 = 77;
				break;
			case 110:
				keyCode1 = 78;
				break;
			case 111:
				keyCode1 = 79;
				break;
			case 112:
				keyCode1 = 80;
				break;
			case 113:
				keyCode1 = 81;
				break;
			case 114:
				keyCode1 = 82;
				break;
			case 115:
				keyCode1 = 83;
				break;
			case 116:
				keyCode1 = 84;
				break;
			case 117:
				keyCode1 = 85;
				break;
			case 118:
				keyCode1 = 86;
				break;
			case 119:
				keyCode1 = 87;
				break;
			case 120:
				keyCode1 = 88;
				break;
			case 121:
				keyCode1 = 89;
				break;
			case 122:
				keyCode1 = 90;
				break;
			case 127:
				keyCode1 = 46;
				break;
			case 1073741881:
				keyCode1 = 20;
				break;
			case 1073741882:
				keyCode1 = 112;
				break;
			case 1073741883:
				keyCode1 = 113;
				break;
			case 1073741884:
				keyCode1 = 114;
				break;
			case 1073741885:
				keyCode1 = 115;
				break;
			case 1073741886:
				keyCode1 = 116;
				break;
			case 1073741887:
				keyCode1 = 117;
				break;
			case 1073741888:
				keyCode1 = 118;
				break;
			case 1073741889:
				keyCode1 = 119;
				break;
			case 1073741890:
				keyCode1 = 120;
				break;
			case 1073741891:
				keyCode1 = 121;
				break;
			case 1073741892:
				keyCode1 = 122;
				break;
			case 1073741893:
				keyCode1 = 123;
				break;
			case 1073741894:
				keyCode1 = 301;
				break;
			case 1073741895:
				keyCode1 = 145;
				break;
			case 1073741896:
				keyCode1 = 19;
				break;
			case 1073741897:
				keyCode1 = 45;
				break;
			case 1073741898:
				keyCode1 = 36;
				break;
			case 1073741899:
				keyCode1 = 33;
				break;
			case 1073741901:
				keyCode1 = 35;
				break;
			case 1073741902:
				keyCode1 = 34;
				break;
			case 1073741903:
				keyCode1 = 39;
				break;
			case 1073741904:
				keyCode1 = 37;
				break;
			case 1073741905:
				keyCode1 = 40;
				break;
			case 1073741906:
				keyCode1 = 38;
				break;
			case 1073741907:
				keyCode1 = 144;
				break;
			case 1073741908:
				keyCode1 = 111;
				break;
			case 1073741909:
				keyCode1 = 106;
				break;
			case 1073741910:
				keyCode1 = 109;
				break;
			case 1073741911:
				keyCode1 = 107;
				break;
			case 1073741912:
				keyCode1 = 108;
				break;
			case 1073741913:
				keyCode1 = 97;
				break;
			case 1073741914:
				keyCode1 = 98;
				break;
			case 1073741915:
				keyCode1 = 99;
				break;
			case 1073741916:
				keyCode1 = 100;
				break;
			case 1073741917:
				keyCode1 = 101;
				break;
			case 1073741918:
				keyCode1 = 102;
				break;
			case 1073741919:
				keyCode1 = 103;
				break;
			case 1073741920:
				keyCode1 = 104;
				break;
			case 1073741921:
				keyCode1 = 105;
				break;
			case 1073741922:
				keyCode1 = 96;
				break;
			case 1073741923:
				keyCode1 = 110;
				break;
			case 1073741925:
				keyCode1 = 302;
				break;
			case 1073741928:
				keyCode1 = 124;
				break;
			case 1073741929:
				keyCode1 = 125;
				break;
			case 1073741930:
				keyCode1 = 126;
				break;
			case 1073741982:
				keyCode1 = 13;
				break;
			case 1073742044:
				keyCode1 = 110;
				break;
			case 1073742048:
				keyCode1 = 17;
				break;
			case 1073742049:
				keyCode1 = 16;
				break;
			case 1073742050:
				keyCode1 = 18;
				break;
			case 1073742051:
				keyCode1 = 15;
				break;
			case 1073742052:
				keyCode1 = 17;
				break;
			case 1073742053:
				keyCode1 = 16;
				break;
			case 1073742054:
				keyCode1 = 18;
				break;
			case 1073742055:
				keyCode1 = 15;
				break;
			default:
				keyCode1 = keyCode;
			}
			var charCode = openfl_ui_Keyboard.__getCharCode(keyCode1,lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier));
			var event = new openfl_events_KeyboardEvent(type,true,false,charCode,keyCode1,keyLocation,lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey(modifier));
			stack.reverse();
			this.__fireEvent(event,stack);
		}
	}
	,__onMouse: function(type,x,y,button) {
		if(button > 2) return;
		this.__mouseX = x;
		this.__mouseY = y;
		var stack = [];
		var target = null;
		var targetPoint = new openfl_geom_Point(x,y);
		if(this.__hitTest(x,y,true,stack,true)) target = stack[stack.length - 1]; else {
			target = this;
			stack = [this];
		}
		if(type == openfl_events_MouseEvent.MOUSE_DOWN) this.set_focus(target);
		if(target == null) target = this;
		this.__fireEvent(openfl_events_MouseEvent.__create(type,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
		var clickType;
		switch(type) {
		case "mouseUp":
			clickType = openfl_events_MouseEvent.CLICK;
			break;
		case "middleMouseUp":
			clickType = openfl_events_MouseEvent.MIDDLE_CLICK;
			break;
		case "rightMouseUp":
			clickType = openfl_events_MouseEvent.RIGHT_CLICK;
			break;
		default:
			clickType = null;
		}
		if(clickType != null) {
			this.__fireEvent(openfl_events_MouseEvent.__create(clickType,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
			if(type == openfl_events_MouseEvent.MOUSE_UP && (js_Boot.__cast(target , openfl_display_InteractiveObject)).doubleClickEnabled) {
				var currentTime = openfl_Lib.getTimer();
				if(currentTime - this.__lastClickTime < 500) {
					this.__fireEvent(openfl_events_MouseEvent.__create(openfl_events_MouseEvent.DOUBLE_CLICK,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
					this.__lastClickTime = 0;
				} else this.__lastClickTime = currentTime;
			}
		}
		var cursor = null;
		var _g = 0;
		while(_g < stack.length) {
			var target1 = stack[_g];
			++_g;
			cursor = target1.__getCursor();
			if(cursor != null) {
				lime_ui_Mouse.set_cursor(cursor);
				break;
			}
		}
		if(cursor == null) lime_ui_Mouse.set_cursor(lime_ui_MouseCursor.ARROW);
		var _g1 = 0;
		var _g11 = this.__mouseOutStack;
		while(_g1 < _g11.length) {
			var target2 = _g11[_g1];
			++_g1;
			if(HxOverrides.indexOf(stack,target2,0) == -1) {
				HxOverrides.remove(this.__mouseOutStack,target2);
				var localPoint = target2.globalToLocal(targetPoint);
				target2.__dispatchEvent(new openfl_events_MouseEvent(openfl_events_MouseEvent.MOUSE_OUT,false,false,localPoint.x,localPoint.y,target2));
			}
		}
		var _g2 = 0;
		while(_g2 < stack.length) {
			var target3 = stack[_g2];
			++_g2;
			if(HxOverrides.indexOf(this.__mouseOutStack,target3,0) == -1) {
				if(target3.hasEventListener(openfl_events_MouseEvent.MOUSE_OVER)) {
					var localPoint1 = target3.globalToLocal(targetPoint);
					target3.__dispatchEvent(new openfl_events_MouseEvent(openfl_events_MouseEvent.MOUSE_OVER,false,false,localPoint1.x,localPoint1.y,target3));
				}
				if(target3.hasEventListener(openfl_events_MouseEvent.MOUSE_OUT)) this.__mouseOutStack.push(target3);
			}
		}
		if(this.__dragObject != null) this.__drag(targetPoint);
	}
	,__onMouseWheel: function(deltaX,deltaY) {
		var x = this.__mouseX;
		var y = this.__mouseY;
		var stack = [];
		if(!this.__hitTest(x,y,false,stack,true)) stack = [this];
		var target = stack[stack.length - 1];
		var targetPoint = new openfl_geom_Point(x,y);
		var delta = deltaY | 0;
		this.__fireEvent(openfl_events_MouseEvent.__create(openfl_events_MouseEvent.MOUSE_WHEEL,0,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target,delta),stack);
	}
	,__onTouch: function(type,x,y,id) {
		var point = new openfl_geom_Point(x * this.stageWidth,y * this.stageHeight);
		this.__mouseX = point.x;
		this.__mouseY = point.y;
		var __stack = [];
		if(this.__hitTest(x,y,false,__stack,true)) {
			var target = __stack[__stack.length - 1];
			if(target == null) target = this;
			var localPoint = target.globalToLocal(point);
			var touchEvent = openfl_events_TouchEvent.__create(type,null,this.__mouseX,this.__mouseY,localPoint,target);
			touchEvent.touchPointID = id;
			touchEvent.isPrimaryTouchPoint = true;
			this.__fireEvent(touchEvent,__stack);
		} else {
			var touchEvent1 = openfl_events_TouchEvent.__create(type,null,this.__mouseX,this.__mouseY,point,this);
			touchEvent1.touchPointID = id;
			touchEvent1.isPrimaryTouchPoint = true;
			this.__fireEvent(touchEvent1,[this.stage]);
		}
	}
	,__update: function(transformOnly,updateChildren,maskGrahpics) {
		if(transformOnly) {
			if(openfl_display_DisplayObject.__worldTransformDirty > 0) {
				openfl_display_DisplayObjectContainer.prototype.__update.call(this,true,updateChildren,maskGrahpics);
				if(updateChildren) {
					openfl_display_DisplayObject.__worldTransformDirty = 0;
					this.__dirty = true;
				}
			}
		} else if(openfl_display_DisplayObject.__worldTransformDirty > 0 || this.__dirty || openfl_display_DisplayObject.__worldRenderDirty > 0) {
			openfl_display_DisplayObjectContainer.prototype.__update.call(this,false,updateChildren,maskGrahpics);
			if(updateChildren) {
				openfl_display_DisplayObject.__worldTransformDirty = 0;
				openfl_display_DisplayObject.__worldRenderDirty = 0;
				this.__dirty = false;
			}
		}
	}
	,get_mouseX: function() {
		return this.__mouseX;
	}
	,get_mouseY: function() {
		return this.__mouseY;
	}
	,set_color: function(value) {
		var r = (value & 16711680) >>> 16;
		var g = (value & 65280) >>> 8;
		var b = value & 255;
		this.__colorSplit = [r / 255,g / 255,b / 255];
		this.__colorString = "#" + StringTools.hex(value,6);
		return this.__color = value;
	}
	,set_focus: function(value) {
		if(value != this.__focus) {
			if(this.__focus != null) {
				var event = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_OUT,true,false,value,false,0);
				this.__stack = [];
				this.__focus.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event,this.__stack);
			}
			if(value != null) {
				var event1 = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_IN,true,false,this.__focus,false,0);
				this.__stack = [];
				value.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event1,this.__stack);
			}
			this.__focus = value;
		}
		return this.__focus;
	}
	,__class__: openfl_display_Stage
});
var openfl_display_Stage3D = function() {
	openfl_events_EventDispatcher.call(this);
};
$hxClasses["openfl.display.Stage3D"] = openfl_display_Stage3D;
openfl_display_Stage3D.__name__ = true;
openfl_display_Stage3D.__super__ = openfl_events_EventDispatcher;
openfl_display_Stage3D.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_Stage3D
});
var openfl_display_StageAlign = $hxClasses["openfl.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] };
openfl_display_StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
openfl_display_StageAlign.TOP_RIGHT.toString = $estr;
openfl_display_StageAlign.TOP_RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.TOP_LEFT = ["TOP_LEFT",1];
openfl_display_StageAlign.TOP_LEFT.toString = $estr;
openfl_display_StageAlign.TOP_LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.TOP = ["TOP",2];
openfl_display_StageAlign.TOP.toString = $estr;
openfl_display_StageAlign.TOP.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.RIGHT = ["RIGHT",3];
openfl_display_StageAlign.RIGHT.toString = $estr;
openfl_display_StageAlign.RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.LEFT = ["LEFT",4];
openfl_display_StageAlign.LEFT.toString = $estr;
openfl_display_StageAlign.LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
openfl_display_StageAlign.BOTTOM_RIGHT.toString = $estr;
openfl_display_StageAlign.BOTTOM_RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
openfl_display_StageAlign.BOTTOM_LEFT.toString = $estr;
openfl_display_StageAlign.BOTTOM_LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM = ["BOTTOM",7];
openfl_display_StageAlign.BOTTOM.toString = $estr;
openfl_display_StageAlign.BOTTOM.__enum__ = openfl_display_StageAlign;
var openfl_display_StageDisplayState = $hxClasses["openfl.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] };
openfl_display_StageDisplayState.NORMAL = ["NORMAL",0];
openfl_display_StageDisplayState.NORMAL.toString = $estr;
openfl_display_StageDisplayState.NORMAL.__enum__ = openfl_display_StageDisplayState;
openfl_display_StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
openfl_display_StageDisplayState.FULL_SCREEN.toString = $estr;
openfl_display_StageDisplayState.FULL_SCREEN.__enum__ = openfl_display_StageDisplayState;
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = openfl_display_StageDisplayState;
var openfl_display_StageQuality = $hxClasses["openfl.display.StageQuality"] = { __ename__ : true, __constructs__ : ["BEST","HIGH","MEDIUM","LOW"] };
openfl_display_StageQuality.BEST = ["BEST",0];
openfl_display_StageQuality.BEST.toString = $estr;
openfl_display_StageQuality.BEST.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.HIGH = ["HIGH",1];
openfl_display_StageQuality.HIGH.toString = $estr;
openfl_display_StageQuality.HIGH.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.MEDIUM = ["MEDIUM",2];
openfl_display_StageQuality.MEDIUM.toString = $estr;
openfl_display_StageQuality.MEDIUM.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.LOW = ["LOW",3];
openfl_display_StageQuality.LOW.toString = $estr;
openfl_display_StageQuality.LOW.__enum__ = openfl_display_StageQuality;
var openfl_display_StageScaleMode = $hxClasses["openfl.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] };
openfl_display_StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
openfl_display_StageScaleMode.SHOW_ALL.toString = $estr;
openfl_display_StageScaleMode.SHOW_ALL.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.NO_SCALE = ["NO_SCALE",1];
openfl_display_StageScaleMode.NO_SCALE.toString = $estr;
openfl_display_StageScaleMode.NO_SCALE.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.NO_BORDER = ["NO_BORDER",2];
openfl_display_StageScaleMode.NO_BORDER.toString = $estr;
openfl_display_StageScaleMode.NO_BORDER.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
openfl_display_StageScaleMode.EXACT_FIT.toString = $estr;
openfl_display_StageScaleMode.EXACT_FIT.__enum__ = openfl_display_StageScaleMode;
var openfl_display_Tilesheet = function() { };
$hxClasses["openfl.display.Tilesheet"] = openfl_display_Tilesheet;
openfl_display_Tilesheet.__name__ = true;
openfl_display_Tilesheet.prototype = {
	__class__: openfl_display_Tilesheet
};
var openfl_display_TriangleCulling = $hxClasses["openfl.display.TriangleCulling"] = { __ename__ : true, __constructs__ : ["NEGATIVE","NONE","POSITIVE"] };
openfl_display_TriangleCulling.NEGATIVE = ["NEGATIVE",0];
openfl_display_TriangleCulling.NEGATIVE.toString = $estr;
openfl_display_TriangleCulling.NEGATIVE.__enum__ = openfl_display_TriangleCulling;
openfl_display_TriangleCulling.NONE = ["NONE",1];
openfl_display_TriangleCulling.NONE.toString = $estr;
openfl_display_TriangleCulling.NONE.__enum__ = openfl_display_TriangleCulling;
openfl_display_TriangleCulling.POSITIVE = ["POSITIVE",2];
openfl_display_TriangleCulling.POSITIVE.toString = $estr;
openfl_display_TriangleCulling.POSITIVE.__enum__ = openfl_display_TriangleCulling;
var openfl_events_Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.eventPhase = openfl_events_EventPhase.AT_TARGET;
};
$hxClasses["openfl.events.Event"] = openfl_events_Event;
openfl_events_Event.__name__ = true;
openfl_events_Event.prototype = {
	__class__: openfl_events_Event
};
var openfl_events_TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl_events_TextEvent;
openfl_events_TextEvent.__name__ = true;
openfl_events_TextEvent.__super__ = openfl_events_Event;
openfl_events_TextEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_TextEvent
});
var openfl_events_ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_TextEvent.call(this,type,bubbles,cancelable,text);
	this.errorID = id;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl_events_ErrorEvent;
openfl_events_ErrorEvent.__name__ = true;
openfl_events_ErrorEvent.__super__ = openfl_events_TextEvent;
openfl_events_ErrorEvent.prototype = $extend(openfl_events_TextEvent.prototype,{
	__class__: openfl_events_ErrorEvent
});
var openfl_events__$EventDispatcher_Listener = function(callback,useCapture,priority) {
	this.callback = callback;
	this.useCapture = useCapture;
	this.priority = priority;
};
$hxClasses["openfl.events._EventDispatcher.Listener"] = openfl_events__$EventDispatcher_Listener;
openfl_events__$EventDispatcher_Listener.__name__ = true;
openfl_events__$EventDispatcher_Listener.prototype = {
	match: function(callback,useCapture) {
		return Reflect.compareMethods(this.callback,callback) && this.useCapture == useCapture;
	}
	,__class__: openfl_events__$EventDispatcher_Listener
};
var openfl_events_EventPhase = $hxClasses["openfl.events.EventPhase"] = { __ename__ : true, __constructs__ : ["CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE"] };
openfl_events_EventPhase.CAPTURING_PHASE = ["CAPTURING_PHASE",0];
openfl_events_EventPhase.CAPTURING_PHASE.toString = $estr;
openfl_events_EventPhase.CAPTURING_PHASE.__enum__ = openfl_events_EventPhase;
openfl_events_EventPhase.AT_TARGET = ["AT_TARGET",1];
openfl_events_EventPhase.AT_TARGET.toString = $estr;
openfl_events_EventPhase.AT_TARGET.__enum__ = openfl_events_EventPhase;
openfl_events_EventPhase.BUBBLING_PHASE = ["BUBBLING_PHASE",2];
openfl_events_EventPhase.BUBBLING_PHASE.toString = $estr;
openfl_events_EventPhase.BUBBLING_PHASE.__enum__ = openfl_events_EventPhase;
var openfl_events_FocusEvent = function(type,bubbles,cancelable,relatedObject,shiftKey,keyCode) {
	if(keyCode == null) keyCode = 0;
	if(shiftKey == null) shiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCode;
	this.shiftKey = shiftKey;
	this.relatedObject = relatedObject;
};
$hxClasses["openfl.events.FocusEvent"] = openfl_events_FocusEvent;
openfl_events_FocusEvent.__name__ = true;
openfl_events_FocusEvent.__super__ = openfl_events_Event;
openfl_events_FocusEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_FocusEvent
});
var openfl_events_GameInputEvent = function(type,bubbles,cancelable,device) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.device = device;
};
$hxClasses["openfl.events.GameInputEvent"] = openfl_events_GameInputEvent;
openfl_events_GameInputEvent.__name__ = true;
openfl_events_GameInputEvent.__super__ = openfl_events_Event;
openfl_events_GameInputEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_GameInputEvent
});
var openfl_events_IOErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl_events_IOErrorEvent;
openfl_events_IOErrorEvent.__name__ = true;
openfl_events_IOErrorEvent.__super__ = openfl_events_ErrorEvent;
openfl_events_IOErrorEvent.prototype = $extend(openfl_events_ErrorEvent.prototype,{
	__class__: openfl_events_IOErrorEvent
});
var openfl_events_KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(shiftKeyValue == null) shiftKeyValue = false;
	if(altKeyValue == null) altKeyValue = false;
	if(ctrlKeyValue == null) ctrlKeyValue = false;
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.charCode = charCodeValue;
	this.keyCode = keyCodeValue;
	if(keyLocationValue != null) this.keyLocation = keyLocationValue; else this.keyLocation = 0;
	this.ctrlKey = ctrlKeyValue;
	this.altKey = altKeyValue;
	this.shiftKey = shiftKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl_events_KeyboardEvent;
openfl_events_KeyboardEvent.__name__ = true;
openfl_events_KeyboardEvent.__super__ = openfl_events_Event;
openfl_events_KeyboardEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_KeyboardEvent
});
var openfl_events_MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["openfl.events.MouseEvent"] = openfl_events_MouseEvent;
openfl_events_MouseEvent.__name__ = true;
openfl_events_MouseEvent.__altKey = null;
openfl_events_MouseEvent.__buttonDown = null;
openfl_events_MouseEvent.__commandKey = null;
openfl_events_MouseEvent.__ctrlKey = null;
openfl_events_MouseEvent.__shiftKey = null;
openfl_events_MouseEvent.__create = function(type,button,stageX,stageY,local,target,delta) {
	if(delta == null) delta = 0;
	switch(type) {
	case "mouseDown":
		openfl_events_MouseEvent.__buttonDown = true;
		break;
	case "mouseUp":
		openfl_events_MouseEvent.__buttonDown = false;
		break;
	default:
	}
	var event = new openfl_events_MouseEvent(type,true,false,local.x,local.y,null,openfl_events_MouseEvent.__ctrlKey,openfl_events_MouseEvent.__altKey,openfl_events_MouseEvent.__shiftKey,openfl_events_MouseEvent.__buttonDown,delta,openfl_events_MouseEvent.__commandKey);
	event.stageX = stageX;
	event.stageY = stageY;
	event.target = target;
	return event;
};
openfl_events_MouseEvent.__super__ = openfl_events_Event;
openfl_events_MouseEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_MouseEvent
});
var openfl_events_TouchEvent = function(type,bubbles,cancelable,localX,localY,sizeX,sizeY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(sizeY == null) sizeY = 1;
	if(sizeX == null) sizeX = 1;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.pressure = 1;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["openfl.events.TouchEvent"] = openfl_events_TouchEvent;
openfl_events_TouchEvent.__name__ = true;
openfl_events_TouchEvent.__create = function(type,touch,stageX,stageY,local,target) {
	var evt = new openfl_events_TouchEvent(type,true,false,local.x,local.y,1,1,null,false,false,false,false,0,false,0);
	evt.stageX = stageX;
	evt.stageY = stageY;
	evt.target = target;
	return evt;
};
openfl_events_TouchEvent.__super__ = openfl_events_Event;
openfl_events_TouchEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_TouchEvent
});
var openfl_filters_BitmapFilter = function() { };
$hxClasses["openfl.filters.BitmapFilter"] = openfl_filters_BitmapFilter;
openfl_filters_BitmapFilter.__name__ = true;
var openfl_geom_Matrix3D = function() { };
$hxClasses["openfl.geom.Matrix3D"] = openfl_geom_Matrix3D;
openfl_geom_Matrix3D.__name__ = true;
openfl_geom_Matrix3D.prototype = {
	__class__: openfl_geom_Matrix3D
};
var openfl_geom_Transform = function(displayObject) {
	this.__colorTransform = new openfl_geom_ColorTransform();
	this.concatenatedColorTransform = new openfl_geom_ColorTransform();
	this.concatenatedMatrix = new openfl_geom_Matrix();
	this.pixelBounds = new openfl_geom_Rectangle();
	this.__displayObject = displayObject;
	this.__hasMatrix = true;
};
$hxClasses["openfl.geom.Transform"] = openfl_geom_Transform;
openfl_geom_Transform.__name__ = true;
openfl_geom_Transform.prototype = {
	get_colorTransform: function() {
		return this.__colorTransform;
	}
	,__class__: openfl_geom_Transform
};
var openfl_geom_Vector3D = function() { };
$hxClasses["openfl.geom.Vector3D"] = openfl_geom_Vector3D;
openfl_geom_Vector3D.__name__ = true;
var openfl_media_ID3Info = function() { };
$hxClasses["openfl.media.ID3Info"] = openfl_media_ID3Info;
openfl_media_ID3Info.__name__ = true;
var openfl_media_Sound = function(stream,context) {
	openfl_events_EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.url = null;
	if(stream != null) this.load(stream,context);
};
$hxClasses["openfl.media.Sound"] = openfl_media_Sound;
openfl_media_Sound.__name__ = true;
openfl_media_Sound.__super__ = openfl_events_EventDispatcher;
openfl_media_Sound.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	load: function(stream,context) {
		this.url = stream.url;
		this.__soundID = haxe_io_Path.withoutExtension(stream.url);
		if(!openfl_media_Sound.__registeredSounds.exists(this.__soundID)) {
			openfl_media_Sound.__registeredSounds.set(this.__soundID,true);
			createjs.Sound.addEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.addEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			createjs.Sound.registerSound(this.url,this.__soundID);
		} else this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
	}
	,SoundJS_onFileLoad: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
		}
	}
	,SoundJS_onFileError: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl_events_IOErrorEvent(openfl_events_IOErrorEvent.IO_ERROR));
		}
	}
	,__class__: openfl_media_Sound
});
var openfl_media_SoundLoaderContext = function() { };
$hxClasses["openfl.media.SoundLoaderContext"] = openfl_media_SoundLoaderContext;
openfl_media_SoundLoaderContext.__name__ = true;
var openfl_media_SoundTransform = function() { };
$hxClasses["openfl.media.SoundTransform"] = openfl_media_SoundTransform;
openfl_media_SoundTransform.__name__ = true;
var openfl_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl_net_URLRequest;
openfl_net_URLRequest.__name__ = true;
openfl_net_URLRequest.prototype = {
	__class__: openfl_net_URLRequest
};
var openfl_net_URLRequestHeader = function() { };
$hxClasses["openfl.net.URLRequestHeader"] = openfl_net_URLRequestHeader;
openfl_net_URLRequestHeader.__name__ = true;
var openfl_text_AntiAliasType = $hxClasses["openfl.text.AntiAliasType"] = { __ename__ : true, __constructs__ : ["ADVANCED","NORMAL"] };
openfl_text_AntiAliasType.ADVANCED = ["ADVANCED",0];
openfl_text_AntiAliasType.ADVANCED.toString = $estr;
openfl_text_AntiAliasType.ADVANCED.__enum__ = openfl_text_AntiAliasType;
openfl_text_AntiAliasType.NORMAL = ["NORMAL",1];
openfl_text_AntiAliasType.NORMAL.toString = $estr;
openfl_text_AntiAliasType.NORMAL.__enum__ = openfl_text_AntiAliasType;
var openfl_text_GridFitType = $hxClasses["openfl.text.GridFitType"] = { __ename__ : true, __constructs__ : ["NONE","PIXEL","SUBPIXEL"] };
openfl_text_GridFitType.NONE = ["NONE",0];
openfl_text_GridFitType.NONE.toString = $estr;
openfl_text_GridFitType.NONE.__enum__ = openfl_text_GridFitType;
openfl_text_GridFitType.PIXEL = ["PIXEL",1];
openfl_text_GridFitType.PIXEL.toString = $estr;
openfl_text_GridFitType.PIXEL.__enum__ = openfl_text_GridFitType;
openfl_text_GridFitType.SUBPIXEL = ["SUBPIXEL",2];
openfl_text_GridFitType.SUBPIXEL.toString = $estr;
openfl_text_GridFitType.SUBPIXEL.__enum__ = openfl_text_GridFitType;
var openfl_text_TextFieldAutoSize = $hxClasses["openfl.text.TextFieldAutoSize"] = { __ename__ : true, __constructs__ : ["CENTER","LEFT","NONE","RIGHT"] };
openfl_text_TextFieldAutoSize.CENTER = ["CENTER",0];
openfl_text_TextFieldAutoSize.CENTER.toString = $estr;
openfl_text_TextFieldAutoSize.CENTER.__enum__ = openfl_text_TextFieldAutoSize;
openfl_text_TextFieldAutoSize.LEFT = ["LEFT",1];
openfl_text_TextFieldAutoSize.LEFT.toString = $estr;
openfl_text_TextFieldAutoSize.LEFT.__enum__ = openfl_text_TextFieldAutoSize;
openfl_text_TextFieldAutoSize.NONE = ["NONE",2];
openfl_text_TextFieldAutoSize.NONE.toString = $estr;
openfl_text_TextFieldAutoSize.NONE.__enum__ = openfl_text_TextFieldAutoSize;
openfl_text_TextFieldAutoSize.RIGHT = ["RIGHT",3];
openfl_text_TextFieldAutoSize.RIGHT.toString = $estr;
openfl_text_TextFieldAutoSize.RIGHT.__enum__ = openfl_text_TextFieldAutoSize;
var openfl_text_TextFieldType = $hxClasses["openfl.text.TextFieldType"] = { __ename__ : true, __constructs__ : ["DYNAMIC","INPUT"] };
openfl_text_TextFieldType.DYNAMIC = ["DYNAMIC",0];
openfl_text_TextFieldType.DYNAMIC.toString = $estr;
openfl_text_TextFieldType.DYNAMIC.__enum__ = openfl_text_TextFieldType;
openfl_text_TextFieldType.INPUT = ["INPUT",1];
openfl_text_TextFieldType.INPUT.toString = $estr;
openfl_text_TextFieldType.INPUT.__enum__ = openfl_text_TextFieldType;
var openfl_text_TextFormat = function() { };
$hxClasses["openfl.text.TextFormat"] = openfl_text_TextFormat;
openfl_text_TextFormat.__name__ = true;
var openfl_ui_GameInput = function() { };
$hxClasses["openfl.ui.GameInput"] = openfl_ui_GameInput;
openfl_ui_GameInput.__name__ = true;
openfl_ui_GameInput.__getDevice = function(gamepad) {
	if(gamepad == null) return null;
	if(!(openfl_ui_GameInput.__devices.h.__keys__[gamepad.__id__] != null)) {
		var device = new openfl_ui_GameInputDevice(gamepad.id == null?"null":"" + gamepad.id,null);
		openfl_ui_GameInput.__devices.set(gamepad,device);
		openfl_ui_GameInput.numDevices = Lambda.count(openfl_ui_GameInput.__devices);
	}
	return openfl_ui_GameInput.__devices.h[gamepad.__id__];
};
openfl_ui_GameInput.__onGamepadAxisMove = function(gamepad,axis,value) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	if(device.enabled) {
		if(!device.__axis.h.hasOwnProperty(axis)) {
			var control1 = new openfl_ui_GameInputControl(device,"AXIS_" + (function($this) {
				var $r;
				switch(axis) {
				case 0:
					$r = "LEFT_X";
					break;
				case 1:
					$r = "LEFT_Y";
					break;
				case 2:
					$r = "RIGHT_X";
					break;
				case 3:
					$r = "RIGHT_Y";
					break;
				case 4:
					$r = "TRIGGER_LEFT";
					break;
				case 5:
					$r = "TRIGGER_RIGHT";
					break;
				default:
					$r = "UNKNOWN (" + axis + ")";
				}
				return $r;
			}(this)),-1,1);
			device.__axis.h[axis] = control1;
			device.__controls.push(control1);
		}
		var control = device.__axis.h[axis];
		control.value = value;
		control.dispatchEvent(new openfl_events_Event(openfl_events_Event.CHANGE));
	}
};
openfl_ui_GameInput.__onGamepadButtonDown = function(gamepad,button) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	if(device.enabled) {
		if(!device.__button.h.hasOwnProperty(button)) {
			var control1 = new openfl_ui_GameInputControl(device,"BUTTON_" + (function($this) {
				var $r;
				switch(button) {
				case 0:
					$r = "A";
					break;
				case 1:
					$r = "B";
					break;
				case 2:
					$r = "X";
					break;
				case 3:
					$r = "Y";
					break;
				case 4:
					$r = "BACK";
					break;
				case 5:
					$r = "GUIDE";
					break;
				case 6:
					$r = "START";
					break;
				case 7:
					$r = "LEFT_STICK";
					break;
				case 8:
					$r = "RIGHT_STICK";
					break;
				case 9:
					$r = "LEFT_SHOULDER";
					break;
				case 10:
					$r = "RIGHT_SHOULDER";
					break;
				case 11:
					$r = "DPAD_UP";
					break;
				case 12:
					$r = "DPAD_DOWN";
					break;
				case 13:
					$r = "DPAD_LEFT";
					break;
				case 14:
					$r = "DPAD_RIGHT";
					break;
				default:
					$r = "UNKNOWN (" + button + ")";
				}
				return $r;
			}(this)),0,1);
			device.__button.h[button] = control1;
			device.__controls.push(control1);
		}
		var control = device.__button.h[button];
		control.value = 1;
		control.dispatchEvent(new openfl_events_Event(openfl_events_Event.CHANGE));
	}
};
openfl_ui_GameInput.__onGamepadButtonUp = function(gamepad,button) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	if(device.enabled) {
		if(!device.__button.h.hasOwnProperty(button)) {
			var control1 = new openfl_ui_GameInputControl(device,"BUTTON_" + (function($this) {
				var $r;
				switch(button) {
				case 0:
					$r = "A";
					break;
				case 1:
					$r = "B";
					break;
				case 2:
					$r = "X";
					break;
				case 3:
					$r = "Y";
					break;
				case 4:
					$r = "BACK";
					break;
				case 5:
					$r = "GUIDE";
					break;
				case 6:
					$r = "START";
					break;
				case 7:
					$r = "LEFT_STICK";
					break;
				case 8:
					$r = "RIGHT_STICK";
					break;
				case 9:
					$r = "LEFT_SHOULDER";
					break;
				case 10:
					$r = "RIGHT_SHOULDER";
					break;
				case 11:
					$r = "DPAD_UP";
					break;
				case 12:
					$r = "DPAD_DOWN";
					break;
				case 13:
					$r = "DPAD_LEFT";
					break;
				case 14:
					$r = "DPAD_RIGHT";
					break;
				default:
					$r = "UNKNOWN (" + button + ")";
				}
				return $r;
			}(this)),0,1);
			device.__button.h[button] = control1;
			device.__controls.push(control1);
		}
		var control = device.__button.h[button];
		control.value = 0;
		control.dispatchEvent(new openfl_events_Event(openfl_events_Event.CHANGE));
	}
};
openfl_ui_GameInput.__onGamepadConnect = function(gamepad) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	var _g = 0;
	var _g1 = openfl_ui_GameInput.__instances;
	while(_g < _g1.length) {
		var instance = _g1[_g];
		++_g;
		instance.dispatchEvent(new openfl_events_GameInputEvent(openfl_events_GameInputEvent.DEVICE_ADDED,null,null,device));
	}
};
openfl_ui_GameInput.__onGamepadDisconnect = function(gamepad) {
	var device = openfl_ui_GameInput.__devices.h[gamepad.__id__];
	if(device != null) {
		openfl_ui_GameInput.__devices.remove(gamepad);
		openfl_ui_GameInput.numDevices = Lambda.count(openfl_ui_GameInput.__devices);
		var _g = 0;
		var _g1 = openfl_ui_GameInput.__instances;
		while(_g < _g1.length) {
			var instance = _g1[_g];
			++_g;
			instance.dispatchEvent(new openfl_events_GameInputEvent(openfl_events_GameInputEvent.DEVICE_REMOVED,null,null,device));
		}
	}
};
openfl_ui_GameInput.__super__ = openfl_events_EventDispatcher;
openfl_ui_GameInput.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_ui_GameInput
});
var openfl_ui_GameInputControl = function(device,id,minValue,maxValue,value) {
	if(value == null) value = 0;
	openfl_events_EventDispatcher.call(this);
	this.device = device;
	this.id = id;
	this.minValue = minValue;
	this.maxValue = maxValue;
	this.value = value;
};
$hxClasses["openfl.ui.GameInputControl"] = openfl_ui_GameInputControl;
openfl_ui_GameInputControl.__name__ = true;
openfl_ui_GameInputControl.__super__ = openfl_events_EventDispatcher;
openfl_ui_GameInputControl.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_ui_GameInputControl
});
var openfl_ui_GameInputDevice = function(id,name) {
	this.__controls = [];
	this.__button = new haxe_ds_IntMap();
	this.__axis = new haxe_ds_IntMap();
	this.id = id;
	this.name = name;
	var control;
	var _g = 0;
	while(_g < 6) {
		var i = _g++;
		control = new openfl_ui_GameInputControl(this,"AXIS_" + i,-1,1);
		this.__axis.h[i] = control;
		this.__controls.push(control);
	}
	var _g1 = 0;
	while(_g1 < 15) {
		var i1 = _g1++;
		control = new openfl_ui_GameInputControl(this,"BUTTON_" + i1,0,1);
		this.__button.h[i1] = control;
		this.__controls.push(control);
	}
};
$hxClasses["openfl.ui.GameInputDevice"] = openfl_ui_GameInputDevice;
openfl_ui_GameInputDevice.__name__ = true;
openfl_ui_GameInputDevice.prototype = {
	__class__: openfl_ui_GameInputDevice
};
var openfl_ui_Keyboard = function() { };
$hxClasses["openfl.ui.Keyboard"] = openfl_ui_Keyboard;
openfl_ui_Keyboard.__name__ = true;
openfl_ui_Keyboard.__getCharCode = function(key,shift) {
	if(shift == null) shift = false;
	if(!shift) {
		switch(key) {
		case 8:
			return 8;
		case 9:
			return 9;
		case 13:
			return 13;
		case 27:
			return 27;
		case 32:
			return 32;
		case 186:
			return 59;
		case 187:
			return 61;
		case 188:
			return 44;
		case 189:
			return 45;
		case 190:
			return 46;
		case 191:
			return 47;
		case 192:
			return 96;
		case 219:
			return 91;
		case 220:
			return 92;
		case 221:
			return 93;
		case 222:
			return 39;
		}
		if(key >= 48 && key <= 57) return key - 48 + 48;
		if(key >= 65 && key <= 90) return key - 65 + 97;
	} else {
		switch(key) {
		case 48:
			return 41;
		case 49:
			return 33;
		case 50:
			return 64;
		case 51:
			return 35;
		case 52:
			return 36;
		case 53:
			return 37;
		case 54:
			return 94;
		case 55:
			return 38;
		case 56:
			return 42;
		case 57:
			return 40;
		case 186:
			return 58;
		case 187:
			return 43;
		case 188:
			return 60;
		case 189:
			return 95;
		case 190:
			return 62;
		case 191:
			return 63;
		case 192:
			return 126;
		case 219:
			return 123;
		case 220:
			return 124;
		case 221:
			return 125;
		case 222:
			return 34;
		}
		if(key >= 65 && key <= 90) return key - 65 + 65;
	}
	if(key >= 96 && key <= 105) return key - 96 + 48;
	switch(key) {
	case 106:
		return 42;
	case 107:
		return 43;
	case 108:
		return 44;
	case 110:
		return 45;
	case 111:
		return 46;
	case 46:
		return 127;
	case 13:
		return 13;
	case 8:
		return 8;
	}
	return 0;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
var this1;
this1 = new Uint32Array(256);
lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	var val = Math.ceil(i * 257.00392156862745);
	lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[i] = val;
}
var this2;
this2 = new Uint8Array(510);
lime_math_color__$RGBA_RGBA_$Impl_$.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[i2] = 255;
}
if(window.createjs != null) createjs.Sound.alternateExtensions = ["ogg","mp3","wav"];
openfl_display_DisplayObject.__instanceCount = 0;
openfl_display_DisplayObject.__worldRenderDirty = 0;
openfl_display_DisplayObject.__worldTransformDirty = 0;
az_js_P2p.ICESERVERS = [{ url : "stun:stun01.sipphone.com"},{ url : "stun:stun.ekiga.net"},{ url : "stun:stun.fwdnet.net"},{ url : "stun:stun.ideasip.com"},{ url : "stun:stun.iptel.org"},{ url : "stun:stun.rixtelecom.se"},{ url : "stun:stun.schlund.de"},{ url : "stun:stun.l.google.com:19302"},{ url : "stun:stun1.l.google.com:19302"},{ url : "stun:stun2.l.google.com:19302"},{ url : "stun:stun3.l.google.com:19302"},{ url : "stun:stun4.l.google.com:19302"},{ url : "stun:stunserver.org"},{ url : "stun:stun.softjoys.com"},{ url : "stun:stun.voiparound.com"},{ url : "stun:stun.voipbuster.com"},{ url : "stun:stun.voipstunt.com"},{ url : "stun:stun.voxgratia.org"},{ url : "stun:stun.xten.com"},{ url : "turn:numb.viagenie.ca", credential : "muazkh", username : "webrtc@live.com"},{ url : "turn:192.158.29.39:3478?transport=udp", credential : "JZEOEt2V3Qb0y27GRntt2u2PAYA=", username : "28224511:1379330808"},{ url : "turn:192.158.29.39:3478?transport=tcp", credential : "JZEOEt2V3Qb0y27GRntt2u2PAYA=", username : "28224511:1379330808"}];
az_js_P2p._sequence = 0;
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
lime_Assets.cache = new lime_AssetCache();
lime_Assets.libraries = new haxe_ds_StringMap();
lime_Assets.initialized = false;
lime_app_Preloader.images = new haxe_ds_StringMap();
lime_app_Preloader.loaders = new haxe_ds_StringMap();
openfl_display_LoaderInfo.__rootURL = window.document.URL;
openfl_system_ApplicationDomain.currentDomain = new openfl_system_ApplicationDomain(null);
openfl_geom_Matrix.__temp = new openfl_geom_Matrix();
openfl_geom_Matrix.__identity = new openfl_geom_Matrix();
openfl_Lib.current = new openfl_display_MovieClip();
openfl_Lib.__sentWarnings = new haxe_ds_StringMap();
openfl__$internal_renderer_cairo_CairoGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_cairo_CairoGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_canvas_CanvasGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_canvas_CanvasGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_opengl_GLRenderer.glContextId = 0;
openfl__$internal_renderer_opengl_GLRenderer.glContexts = [];
openfl__$internal_renderer_opengl_shaders2_Shader.UID = 0;
openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex = 0;
openfl_geom_Rectangle.__temp = new openfl_geom_Rectangle();
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.fillVertexAttributes = [new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition")];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.drawTrianglesVertexAttributes = [new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition"),new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aTexCoord0"),new openfl__$internal_renderer_opengl_utils_VertexAttribute(4,5121,true,"aColor")];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.primitiveVertexAttributes = [new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition"),new openfl__$internal_renderer_opengl_utils_VertexAttribute(4,5126,false,"aColor")];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool = [];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition = new openfl_geom_Point();
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds = new openfl_geom_Rectangle();
openfl_events_Event.ACTIVATE = "activate";
openfl_events_Event.ADDED = "added";
openfl_events_Event.ADDED_TO_STAGE = "addedToStage";
openfl_events_Event.CHANGE = "change";
openfl_events_Event.COMPLETE = "complete";
openfl_events_Event.DEACTIVATE = "deactivate";
openfl_events_Event.ENTER_FRAME = "enterFrame";
openfl_events_Event.MOUSE_LEAVE = "mouseLeave";
openfl_events_Event.REMOVED = "removed";
openfl_events_Event.REMOVED_FROM_STAGE = "removedFromStage";
openfl_events_Event.RENDER = "render";
openfl_events_Event.RESIZE = "resize";
openfl_events_TextEvent.TEXT_INPUT = "textInput";
openfl_events_FocusEvent.FOCUS_IN = "focusIn";
openfl_events_FocusEvent.FOCUS_OUT = "focusOut";
openfl_events_GameInputEvent.DEVICE_ADDED = "deviceAdded";
openfl_events_GameInputEvent.DEVICE_REMOVED = "deviceRemoved";
openfl_events_IOErrorEvent.IO_ERROR = "ioError";
openfl_events_KeyboardEvent.KEY_DOWN = "keyDown";
openfl_events_KeyboardEvent.KEY_UP = "keyUp";
openfl_events_MouseEvent.CLICK = "click";
openfl_events_MouseEvent.DOUBLE_CLICK = "doubleClick";
openfl_events_MouseEvent.MIDDLE_CLICK = "middleClick";
openfl_events_MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
openfl_events_MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
openfl_events_MouseEvent.MOUSE_DOWN = "mouseDown";
openfl_events_MouseEvent.MOUSE_MOVE = "mouseMove";
openfl_events_MouseEvent.MOUSE_OUT = "mouseOut";
openfl_events_MouseEvent.MOUSE_OVER = "mouseOver";
openfl_events_MouseEvent.MOUSE_UP = "mouseUp";
openfl_events_MouseEvent.MOUSE_WHEEL = "mouseWheel";
openfl_events_MouseEvent.RIGHT_CLICK = "rightClick";
openfl_events_MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
openfl_events_MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
openfl_media_Sound.__registeredSounds = new haxe_ds_StringMap();
openfl_ui_GameInput.numDevices = 0;
openfl_ui_GameInput.__devices = new haxe_ds_ObjectMap();
openfl_ui_GameInput.__instances = [];
ApplicationMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
