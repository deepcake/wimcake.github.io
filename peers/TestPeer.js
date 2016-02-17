(function (console) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
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
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
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
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,__class__: List
};
var Luxe = function() { };
$hxClasses["Luxe"] = Luxe;
Luxe.__name__ = true;
Luxe.__properties__ = {set_alpha:"set_alpha",get_alpha:"get_alpha",set_cur_frame_start:"set_cur_frame_start",get_cur_frame_start:"get_cur_frame_start",set_current_time:"set_current_time",get_current_time:"get_current_time",set_last_frame_start:"set_last_frame_start",get_last_frame_start:"get_last_frame_start",set_delta_sim:"set_delta_sim",get_delta_sim:"get_delta_sim",set_dt:"set_dt",get_dt:"get_dt",set_max_frame_time:"set_max_frame_time",get_max_frame_time:"get_max_frame_time",set_update_rate:"set_update_rate",get_update_rate:"get_update_rate",set_fixed_delta:"set_fixed_delta",get_fixed_delta:"get_fixed_delta",set_timescale:"set_timescale",get_timescale:"get_timescale",get_screen:"get_screen",get_time:"get_time",get_snow:"get_snow"}
Luxe.on = function(event,handler) {
	Luxe.core.emitter.on(event,handler);
};
Luxe.off = function(event,handler) {
	return Luxe.core.emitter.off(event,handler);
};
Luxe.next = function(func) {
	if(func != null) snow_Snow.next_queue.push(func);
};
Luxe.shutdown = function() {
	Luxe.core.shutdown();
};
Luxe.showConsole = function(_show) {
	Luxe.core.show_console(_show);
};
Luxe.get_snow = function() {
	return Luxe.core.app;
};
Luxe.get_screen = function() {
	return Luxe.core.screen;
};
Luxe.get_time = function() {
	return snow_Snow.core.timestamp();
};
Luxe.get_timescale = function() {
	return Luxe.core.timescale;
};
Luxe.get_fixed_delta = function() {
	return Luxe.core.fixed_delta;
};
Luxe.get_update_rate = function() {
	return Luxe.core.update_rate;
};
Luxe.get_max_frame_time = function() {
	return Luxe.core.max_frame_time;
};
Luxe.get_dt = function() {
	return Luxe.core.delta_time;
};
Luxe.get_delta_sim = function() {
	return Luxe.core.delta_sim;
};
Luxe.get_last_frame_start = function() {
	return Luxe.core.last_frame_start;
};
Luxe.get_current_time = function() {
	return Luxe.core.current_time;
};
Luxe.get_cur_frame_start = function() {
	return Luxe.core.cur_frame_start;
};
Luxe.get_alpha = function() {
	return Luxe.core.alpha;
};
Luxe.set_timescale = function(value) {
	return Luxe.core.timescale = value;
};
Luxe.set_fixed_delta = function(value) {
	return Luxe.core.fixed_delta = value;
};
Luxe.set_update_rate = function(value) {
	return Luxe.core.update_rate = value;
};
Luxe.set_max_frame_time = function(value) {
	return Luxe.core.max_frame_time = value;
};
Luxe.set_dt = function(value) {
	return Luxe.core.delta_time = value;
};
Luxe.set_delta_sim = function(value) {
	return Luxe.core.delta_sim = value;
};
Luxe.set_last_frame_start = function(value) {
	return Luxe.core.last_frame_start = value;
};
Luxe.set_current_time = function(value) {
	return Luxe.core.current_time = value;
};
Luxe.set_cur_frame_start = function(value) {
	return Luxe.core.cur_frame_start = value;
};
Luxe.set_alpha = function(value) {
	return Luxe.core.alpha = value;
};
var LuxeApp = function() { };
$hxClasses["LuxeApp"] = LuxeApp;
LuxeApp.__name__ = true;
LuxeApp.main = function() {
	LuxeApp._conf = { window : { width : 960, height : 640, fullscreen : false, resizable : true, borderless : false, title : "luxe app"}};
	LuxeApp._snow = new snow_Snow();
	LuxeApp._game = new Main();
	LuxeApp._core = new luxe_Core(LuxeApp._game,LuxeApp._conf);
	var _snow_config = { has_loop : true, config_path : "config.json", app_package : "com.octocake1.testpeer"};
	LuxeApp._snow.init(_snow_config,LuxeApp._core);
};
var luxe_Emitter = function() {
	this._checking = false;
	this._to_remove = new List();
	this.connected = new List();
	this.bindings = new haxe_ds_IntMap();
};
$hxClasses["luxe.Emitter"] = luxe_Emitter;
luxe_Emitter.__name__ = true;
luxe_Emitter.prototype = {
	emit: function(event,data) {
		this._check();
		var list = this.bindings.h[event];
		if(list != null && list.length > 0) {
			var _g = 0;
			while(_g < list.length) {
				var handler = list[_g];
				++_g;
				handler(data);
			}
		}
		this._check();
	}
	,on: function(event,handler) {
		this._check();
		if(!this.bindings.h.hasOwnProperty(event)) {
			this.bindings.h[event] = [handler];
			this.connected.push({ handler : handler, event : event});
		} else {
			var list = this.bindings.h[event];
			if(HxOverrides.indexOf(list,handler,0) == -1) {
				list.push(handler);
				this.connected.push({ handler : handler, event : event});
			}
		}
	}
	,off: function(event,handler) {
		this._check();
		var success = false;
		if(this.bindings.h.hasOwnProperty(event)) {
			this._to_remove.push({ event : event, handler : handler});
			var _g_head = this.connected.h;
			var _g_val = null;
			while(_g_head != null) {
				var _info;
				_info = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(_info.event == event && _info.handler == handler) this.connected.remove(_info);
			}
			success = true;
		}
		return success;
	}
	,_check: function() {
		if(this._checking) return;
		this._checking = true;
		if(this._to_remove.length > 0) {
			var _g_head = this._to_remove.h;
			var _g_val = null;
			while(_g_head != null) {
				var _node;
				_node = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				var list = this.bindings.h[_node.event];
				HxOverrides.remove(list,_node.handler);
				if(list.length == 0) this.bindings.remove(_node.event);
			}
			this._to_remove = null;
			this._to_remove = new List();
		}
		this._checking = false;
	}
	,__class__: luxe_Emitter
};
var luxe_Game = function() {
	luxe_Emitter.call(this);
};
$hxClasses["luxe.Game"] = luxe_Game;
luxe_Game.__name__ = true;
luxe_Game.__super__ = luxe_Emitter;
luxe_Game.prototype = $extend(luxe_Emitter.prototype,{
	config: function(_config) {
		return _config;
	}
	,ready: function() {
	}
	,update: function(dt) {
	}
	,onevent: function(event) {
	}
	,ondestroy: function() {
	}
	,onprerender: function() {
	}
	,onrender: function() {
	}
	,onpostrender: function() {
	}
	,oninputdown: function(_name,e) {
	}
	,oninputup: function(_name,e) {
	}
	,onmousedown: function(event) {
	}
	,onmouseup: function(event) {
	}
	,onmousewheel: function(event) {
	}
	,onmousemove: function(event) {
	}
	,onkeydown: function(event) {
	}
	,onkeyup: function(event) {
	}
	,ontextinput: function(event) {
	}
	,ontouchdown: function(event) {
	}
	,ontouchup: function(event) {
	}
	,ontouchmove: function(event) {
	}
	,ongamepadaxis: function(event) {
	}
	,ongamepaddown: function(event) {
	}
	,ongamepadup: function(event) {
	}
	,ongamepaddevice: function(event) {
	}
	,onwindowmoved: function(event) {
	}
	,onwindowresized: function(event) {
	}
	,onwindowsized: function(event) {
	}
	,onwindowminimized: function(event) {
	}
	,onwindowrestored: function(event) {
	}
	,__class__: luxe_Game
});
var Main = function() {
	this.neighbors = new haxe_ds_StringMap();
	this.color = Std.random(16777215);
	this.key = "h225oppvxe83q5mi";
	luxe_Game.call(this);
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.__super__ = luxe_Game;
Main.prototype = $extend(luxe_Game.prototype,{
	config: function(config) {
		config.window.fullscreen = true;
		config.window.title = "Peers";
		return config;
	}
	,onwindowsized: function(e) {
		Luxe.camera.set_viewport(new phoenix_Rectangle(0,0,e.event.x,e.event.y));
	}
	,ready: function() {
		this.mon = new luxe_Text({ pos : new phoenix_Vector(0,0), align : 0, color : new phoenix_Color().rgb(this.color), point_size : 14, text : "Process..."});
		var ids = ["1","2","3","4","5","6","7","8"];
		this.tryId(ids,0);
	}
	,tryId: function(ids,cur) {
		var _g = this;
		if(cur < ids.length) {
			var id = ids[cur];
			this.peers = new roi_js_Peers(this.key).create(id,function(_) {
				_g.mon.set_text("Alone");
				haxe_Log.trace(" -> got this one #" + id + " c:",{ fileName : "Main.hx", lineNumber : 75, className : "Main", methodName : "tryId"});
				_g.peers.addCommand("say",function(t) {
					haxe_Log.trace(" -> #" + t.id + " said " + t.text,{ fileName : "Main.hx", lineNumber : 76, className : "Main", methodName : "tryId"});
				});
				_g.peers.addCommand("mov",$bind(_g,_g.draw));
				_g.neighbors.set(id,{ x : 0, y : 0, color : _g.color});
				_g.peers.onConnect.add(function(neighbor) {
					_g.neighbors.set(neighbor,{ x : 0, y : 0, color : 8421504});
					_g.mon.set_text("Peers:\n");
					var $it0 = _g.neighbors.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						var _g1 = _g.mon;
						_g1.set_text(_g1.get_text() + (" #" + k + "\n"));
					}
					var _g11 = _g.mon;
					_g11.set_text(_g11.get_text() + ("\nLast action: connect by #" + neighbor));
				});
				_g.peers.onDisconnect.add(function(neighbor1) {
					_g.neighbors.remove(neighbor1);
					_g.mon.set_text("Peers:\n");
					var $it1 = _g.neighbors.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						var _g12 = _g.mon;
						_g12.set_text(_g12.get_text() + (" #" + k1 + "\n"));
					}
					var _g13 = _g.mon;
					_g13.set_text(_g13.get_text() + ("\nLast action: disconnect by #" + neighbor1));
				});
				var _g14 = 0;
				while(_g14 < ids.length) {
					var i = ids[_g14];
					++_g14;
					if(i == id) continue;
					_g.peers.connect(i);
				}
			},function(_1) {
				_g.tryId(ids,++cur);
			});
		} else this.mon.set_text("No free id :c");
	}
	,onkeydown: function(event) {
		var _g1 = this;
		var _g = event.keycode;
		switch(_g) {
		case 49:
			this.peers.broadcast("say",{ text : "Hi there!"});
			break;
		case 50:
			Luxe.timer.schedule(5.0,function() {
				_g1.peers.broadcast("ping",{ ping : new Date().getTime()});
			},true);
			break;
		default:
			haxe_Log.trace("no act for this key",{ fileName : "Main.hx", lineNumber : 130, className : "Main", methodName : "onkeydown"});
		}
	}
	,onkeyup: function(e) {
		if(e.keycode == snow_system_input_Keycodes.escape) Luxe.shutdown();
	}
	,onmousemove: function(e) {
		this.act(this.peers.peer.id,e.x,e.y,this.color);
	}
	,ontouchmove: function(e) {
		this.act(this.peers.peer.id,e.x * Luxe.core.screen.get_w(),e.y * Luxe.core.screen.get_h(),this.color);
	}
	,act: function(id,x,y,color) {
		var data = { id : id, x : x, y : y, color : color};
		this.draw(data);
		if(this.peers != null) this.peers.broadcast("mov",data);
	}
	,draw: function(d) {
		if(!this.neighbors.exists(d.id)) this.neighbors.set(d.id,{ x : d.x, y : d.y, color : this.color});
		var n = this.neighbors.get(d.id);
		this.render(n.x,n.y,d.x,d.y,d.color);
		n.x = d.x;
		n.y = d.y;
	}
	,render: function(x1,y1,x2,y2,color) {
		var g = Luxe.draw.line({ p0 : new phoenix_Vector(x1,y1), p1 : new phoenix_Vector(x2,y2), color : new phoenix_Color().rgb(color)});
		luxe_tween_Actuate.tween(g.color,3.0,{ a : .0}).onComplete(function() {
			g.drop();
		});
	}
	,update: function(dt) {
	}
	,__class__: Main
});
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
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
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = s + c;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
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
var _$UInt_UInt_$Impl_$ = {};
$hxClasses["_UInt.UInt_Impl_"] = _$UInt_UInt_$Impl_$;
_$UInt_UInt_$Impl_$.__name__ = true;
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	var $int = this1;
	if($int < 0) return 4294967296.0 + $int; else return $int + 0.0;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = true;
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
haxe_Resource.getBytes = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return haxe_io_Bytes.ofString(x.str);
			return haxe_crypto_Base64.decode(x.data);
		}
	}
	return null;
};
var haxe_Timer = function() { };
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
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
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
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
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) return "";
	return s.ext;
};
haxe_io_Path.join = function(paths) {
	var paths1 = paths.filter(function(s) {
		return s != null && s != "";
	});
	if(paths1.length == 0) return "";
	var path = paths1[0];
	var _g1 = 1;
	var _g = paths1.length;
	while(_g1 < _g) {
		var i = _g1++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths1[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join("/");
	if(path == null || path == slash) return slash;
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join(slash);
	var regex = new EReg("([^:])/+","g");
	var result = regex.replace(tmp,"$1" + slash);
	var acc = new StringBuf();
	var colon = false;
	var slashes = false;
	var _g11 = 0;
	var _g2 = tmp.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var _g21 = HxOverrides.cca(tmp,i);
		var i1 = _g21;
		if(_g21 != null) switch(_g21) {
		case 58:
			acc.b += ":";
			colon = true;
			break;
		case 47:
			if(colon == false) slashes = true; else {
				colon = false;
				if(slashes) {
					acc.b += "/";
					slashes = false;
				}
				acc.add(String.fromCharCode(i1));
			}
			break;
		default:
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		} else {
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		}
	}
	var result1 = acc.b;
	return result1;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe_io_Path.prototype = {
	__class__: haxe_io_Path
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
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
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
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
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = true;
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
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
var luxe_Audio = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.Audio"] = luxe_Audio;
luxe_Audio.__name__ = true;
luxe_Audio.prototype = {
	init: function() {
		null;
	}
	,destroy: function() {
		null;
	}
	,create: function(_id,_name,_streaming) {
		if(_streaming == null) _streaming = false;
		if(_name == null) _name = "";
		return this.core.app.audio.create(_id,_name,_streaming);
	}
	,get: function(_name) {
		return this.core.app.audio.get(_name);
	}
	,exists: function(_name) {
		return this.get(_name) != null;
	}
	,process: function() {
	}
	,__class__: luxe_Audio
};
var luxe_SizeMode = $hxClasses["luxe.SizeMode"] = { __ename__ : true, __constructs__ : ["fit","cover","contain"] };
luxe_SizeMode.fit = ["fit",0];
luxe_SizeMode.fit.toString = $estr;
luxe_SizeMode.fit.__enum__ = luxe_SizeMode;
luxe_SizeMode.cover = ["cover",1];
luxe_SizeMode.cover.toString = $estr;
luxe_SizeMode.cover.__enum__ = luxe_SizeMode;
luxe_SizeMode.contain = ["contain",2];
luxe_SizeMode.contain.toString = $estr;
luxe_SizeMode.contain.__enum__ = luxe_SizeMode;
var luxe_Objects = function(_name,_id) {
	if(_id == null) _id = "";
	if(_name == null) _name = "";
	this.name = "";
	this.id = "";
	luxe_Emitter.call(this);
	this.set_name(_name);
	this.set_id(_id == ""?Luxe.utils.uniqueid():_id);
};
$hxClasses["luxe.Objects"] = luxe_Objects;
luxe_Objects.__name__ = true;
luxe_Objects.__super__ = luxe_Emitter;
luxe_Objects.prototype = $extend(luxe_Emitter.prototype,{
	set_name: function(_name) {
		return this.name = _name;
	}
	,set_id: function(_id) {
		return this.id = _id;
	}
	,get_name: function() {
		return this.name;
	}
	,get_id: function() {
		return this.id;
	}
	,__class__: luxe_Objects
	,__properties__: {set_name:"set_name",get_name:"get_name",set_id:"set_id",get_id:"get_id"}
});
var luxe_Entity = function(_options) {
	this.component_count = 0;
	this.active = true;
	this.fixed_rate = 0;
	this.started = false;
	this.inited = false;
	this.destroyed = false;
	luxe_Objects.call(this,"entity");
	var _g = this;
	_g.set_name(_g.get_name() + ("." + this.get_id()));
	this.options = _options;
	this._components = new luxe_components_Components(this);
	this.children = [];
	this.events = new luxe_Events();
	if(this.options != null && this.options.transform != null) this.set_transform(this.options.transform); else this.set_transform(new phoenix_Transform());
	this.get_transform().listen_pos($bind(this,this.set_pos_from_transform));
	this.get_transform().listen_scale($bind(this,this.set_scale_from_transform));
	this.get_transform().listen_origin($bind(this,this.set_origin_from_transform));
	this.get_transform().listen_parent($bind(this,this.set_parent_from_transform));
	this.get_transform().listen_rotation($bind(this,this.set_rotation_from_transform));
	if(this.options != null) {
		if(this.options.name_unique == null) this.options.name_unique = false;
		this.options.name_unique;
		if(this.options.name != null) {
			this.set_name(this.options.name);
			if(this.options.name_unique) {
				var _g1 = this;
				_g1.set_name(_g1.get_name() + ("." + this.get_id()));
			}
		}
		if(this.options.pos != null) {
			var _op = this.options.pos;
			this.set_pos(new phoenix_Vector(_op.x,_op.y,_op.z,_op.w));
		}
		if(this.options.scale != null) {
			var _os = this.options.scale;
			this.set_scale(new phoenix_Vector(_os.x,_os.y,_os.z,_os.w));
		}
		var _should_add = true;
		if(this.options.no_scene != null) {
			if(this.options.no_scene == true) {
				_should_add = false;
				null;
			}
		}
		if(this.options.parent != null) {
			_should_add = false;
			this.set_parent(this.options.parent);
			null;
		}
		if(_should_add) {
			if(this.options.scene != null) {
				this.set_scene(this.options.scene);
				null;
			} else {
				this.set_scene(Luxe.scene);
				null;
			}
		}
	} else {
		this.set_scene(Luxe.scene);
		null;
	}
	if(this.get_scene() != null) this.get_scene().add(this); else null;
	null;
};
$hxClasses["luxe.Entity"] = luxe_Entity;
luxe_Entity.__name__ = true;
luxe_Entity.__super__ = luxe_Objects;
luxe_Entity.prototype = $extend(luxe_Objects.prototype,{
	init: function() {
	}
	,update: function(dt) {
	}
	,onfixedupdate: function(rate) {
	}
	,onreset: function() {
	}
	,ondestroy: function() {
	}
	,onkeyup: function(event) {
	}
	,onkeydown: function(event) {
	}
	,ontextinput: function(event) {
	}
	,oninputdown: function(name,event) {
	}
	,oninputup: function(name,event) {
	}
	,onmousedown: function(event) {
	}
	,onmouseup: function(event) {
	}
	,onmousemove: function(event) {
	}
	,onmousewheel: function(event) {
	}
	,ontouchdown: function(event) {
	}
	,ontouchup: function(event) {
	}
	,ontouchmove: function(event) {
	}
	,ongamepadup: function(event) {
	}
	,ongamepaddown: function(event) {
	}
	,ongamepadaxis: function(event) {
	}
	,ongamepaddevice: function(event) {
	}
	,onwindowmoved: function(event) {
	}
	,onwindowresized: function(event) {
	}
	,onwindowsized: function(event) {
	}
	,onwindowminimized: function(event) {
	}
	,onwindowrestored: function(event) {
	}
	,_init: function() {
		this.init();
		this.emit(2);
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.init();
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._init();
			}
		}
		this.inited = true;
	}
	,_reset: function(_) {
		this.onreset();
		this.emit(3);
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.onreset();
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._reset(_);
				null;
			}
		}
		this._set_fixed_rate_timer(this.fixed_rate);
		this.started = true;
	}
	,destroy: function(_from_parent) {
		if(_from_parent == null) _from_parent = false;
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child.destroy(true);
			}
		}
		this.children = null;
		this.children = [];
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.onremoved();
				_component.ondestroy();
			}
		}
		this.emit(8);
		this.ondestroy();
		if(this.get_parent() != null && !_from_parent) this.get_parent()._remove_child(this);
		if(this.fixed_rate_timer != null) {
			this.fixed_rate_timer.stop();
			this.fixed_rate_timer = null;
		}
		this.destroyed = true;
		this.inited = false;
		this.started = false;
		if(this.get_scene() != null) this.get_scene().remove(this);
		if(this.events != null) {
			this.events.destroy();
			this.events = null;
		}
	}
	,_update: function(dt) {
		if(this.destroyed) return;
		if(!this.get_active() || !this.inited || !this.started) return;
		this.get_transform().clean_check();
		this.update(dt);
		if(this.events != null) this.events.process();
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.update(dt);
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._update(dt);
			}
		}
	}
	,_fixed_update: function() {
		if(this.destroyed) return;
		if(!this.get_active() || !this.inited || !this.started) return;
		this.emit(7);
		this.onfixedupdate(this.fixed_rate);
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.onfixedupdate(this.fixed_rate);
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._fixed_update();
			}
		}
	}
	,_detach_scene: function() {
		if(this.get_scene() != null) {
			this.get_scene().off(3,$bind(this,this._reset));
			this.get_scene().off(8,$bind(this,this.destroy));
			this.get_scene().off(13,$bind(this,this._keyup));
			this.get_scene().off(12,$bind(this,this._keydown));
			this.get_scene().off(14,$bind(this,this._textinput));
			this.get_scene().off(17,$bind(this,this._mousedown));
			this.get_scene().off(18,$bind(this,this._mouseup));
			this.get_scene().off(19,$bind(this,this._mousemove));
			this.get_scene().off(20,$bind(this,this._mousewheel));
			this.get_scene().off(21,$bind(this,this._touchdown));
			this.get_scene().off(22,$bind(this,this._touchup));
			this.get_scene().off(23,$bind(this,this._touchmove));
			this.get_scene().off(16,$bind(this,this._inputup));
			this.get_scene().off(15,$bind(this,this._inputdown));
			this.get_scene().off(25,$bind(this,this._gamepaddown));
			this.get_scene().off(26,$bind(this,this._gamepadup));
			this.get_scene().off(24,$bind(this,this._gamepadaxis));
			this.get_scene().off(27,$bind(this,this._gamepaddevice));
			this.get_scene().off(29,$bind(this,this._windowmoved));
			this.get_scene().off(30,$bind(this,this._windowresized));
			this.get_scene().off(31,$bind(this,this._windowsized));
			this.get_scene().off(32,$bind(this,this._windowminimized));
			this.get_scene().off(33,$bind(this,this._windowrestored));
		}
	}
	,_attach_scene: function() {
		if(this.get_scene() != null) {
			this.get_scene().on(3,$bind(this,this._reset));
			this.get_scene().on(8,$bind(this,this.destroy));
		}
	}
	,_keyup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onkeyup(_event);
		this.emit(13,_event);
	}
	,_keydown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onkeydown(_event);
		this.emit(12,_event);
	}
	,_textinput: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontextinput(_event);
		this.emit(14,_event);
	}
	,_mousedown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmousedown(_event);
		this.emit(17,_event);
	}
	,_mouseup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmouseup(_event);
		this.emit(18,_event);
	}
	,_mousewheel: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmousewheel(_event);
		this.emit(20,_event);
	}
	,_mousemove: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmousemove(_event);
		this.emit(19,_event);
	}
	,_touchdown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontouchdown(_event);
		this.emit(21,_event);
	}
	,_touchup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontouchup(_event);
		this.emit(22,_event);
	}
	,_touchmove: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontouchmove(_event);
		this.emit(23,_event);
	}
	,_gamepadaxis: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepadaxis(_event);
		this.emit(24,_event);
	}
	,_gamepaddown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepaddown(_event);
		this.emit(25,_event);
	}
	,_gamepadup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepadup(_event);
		this.emit(26,_event);
	}
	,_gamepaddevice: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepaddevice(_event);
		this.emit(27,_event);
	}
	,_windowmoved: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowmoved(_event);
		this.emit(29,_event);
	}
	,_windowresized: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowresized(_event);
		this.emit(30,_event);
	}
	,_windowsized: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowsized(_event);
		this.emit(31,_event);
	}
	,_windowminimized: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowminimized(_event);
		this.emit(32,_event);
	}
	,_windowrestored: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowrestored(_event);
		this.emit(33,_event);
	}
	,_inputdown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.oninputdown(_event.name,_event.event);
		this.emit(15,_event);
	}
	,_inputup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.oninputup(_event.name,_event.event);
		this.emit(16,_event);
	}
	,_set_fixed_rate_timer: function(_rate) {
		if(this.fixed_rate_timer != null) {
			this.fixed_rate_timer.stop();
			this.fixed_rate_timer = null;
		}
		if(_rate != 0 && this.get_parent() == null && !this.destroyed) {
			this.fixed_rate_timer = new snow_api_Timer(_rate);
			this.fixed_rate_timer.run = $bind(this,this._fixed_update);
		}
	}
	,_add_child: function(child) {
		this.children.push(child);
		if(child.get_scene() != null) {
			var removed = child.get_scene().remove(child);
		} else null;
	}
	,_remove_child: function(child) {
		HxOverrides.remove(this.children,child);
	}
	,set_pos_from_transform: function(_pos) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_pos_change(_pos);
			}
		}
	}
	,set_rotation_from_transform: function(_rotation) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_rotation_change(_rotation);
			}
		}
	}
	,set_scale_from_transform: function(_scale) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_scale_change(_scale);
			}
		}
	}
	,set_origin_from_transform: function(_origin) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_origin_change(_origin);
			}
		}
	}
	,set_parent_from_transform: function(_parent) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_parent_change(_parent);
			}
		}
	}
	,set_pos: function(_p) {
		return this.get_transform().set_pos(_p);
	}
	,get_pos: function() {
		return this.get_transform().get_pos();
	}
	,set_rotation: function(_r) {
		return this.get_transform().set_rotation(_r);
	}
	,set_scale: function(_s) {
		return this.get_transform().set_scale(_s);
	}
	,set_origin: function(_origin) {
		return this.get_transform().set_origin(_origin);
	}
	,set_transform: function(_transform) {
		return this.transform = _transform;
	}
	,get_transform: function() {
		return this.transform;
	}
	,set_parent: function(other) {
		if(!(other != this)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("other != this" + (" ( " + "Entity setting itself as parent makes no sense" + " )")));
		if(this.get_parent() != null) this.get_parent()._remove_child(this);
		this.parent = other;
		if(this.get_parent() != null) {
			this.get_parent()._add_child(this);
			this.get_transform().set_parent(this.get_parent().get_transform());
		} else this.get_transform().set_parent(null);
		return this.get_parent();
	}
	,get_parent: function() {
		return this.parent;
	}
	,set_scene: function(_scene) {
		this._detach_scene();
		this.scene = _scene;
		this._attach_scene();
		return this.get_scene();
	}
	,get_scene: function() {
		return this.scene;
	}
	,set_name: function(_name) {
		if(_name == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_name was null" + ""));
		var _scene = this.get_scene();
		if(_scene != null) {
			var key = this.get_name();
			_scene.entities.remove(key);
			if(_scene.entities.exists(_name)) haxe_Log.trace("    i / scene / " + ("" + _scene.get_name() + " / adding a second entity named " + _name + "!\r\n                This will replace the existing one, possibly leaving the previous one in limbo."),{ fileName : "Scene.hx", lineNumber : 91, className : "luxe.Scene", methodName : "handle_duplicate_warning"});
			_scene.entities.set(_name,this);
			_scene._has_changed = true;
		}
		return this.name = _name;
	}
	,get_active: function() {
		return this.active;
	}
	,__class__: luxe_Entity
	,__properties__: $extend(luxe_Objects.prototype.__properties__,{set_origin:"set_origin",set_scale:"set_scale",set_rotation:"set_rotation",set_pos:"set_pos",get_pos:"get_pos",set_transform:"set_transform",get_transform:"get_transform",get_active:"get_active",set_scene:"set_scene",get_scene:"get_scene",set_parent:"set_parent",get_parent:"get_parent"})
});
var luxe_Camera = function(options) {
	this._connected = false;
	this.minimum_shake = 0.1;
	this.shaking = false;
	this._size_factor = new phoenix_Vector();
	this._rotation_radian = new phoenix_Vector();
	this._rotation_cache = new phoenix_Quaternion();
	this.set_size_mode(luxe_SizeMode.fit);
	var _name = "untitled camera";
	if(options != null) {
		if(options.name != null) {
			_name = options.name;
			options.camera_name = "" + _name + ".view";
		}
	} else options = { no_scene : false};
	if(options.view == null) options.view = new phoenix_Camera(options);
	this.view = options.view;
	luxe_Entity.call(this,{ name : _name, no_scene : options.no_scene});
	this._final_pos = this.view.get_pos();
};
$hxClasses["luxe.Camera"] = luxe_Camera;
luxe_Camera.__name__ = true;
luxe_Camera.__super__ = luxe_Entity;
luxe_Camera.prototype = $extend(luxe_Entity.prototype,{
	get_viewport: function() {
		return this.view.get_viewport();
	}
	,set_viewport: function(_v) {
		return this.view.set_viewport(_v);
	}
	,set_center: function(_c) {
		this.set_pos(new phoenix_Vector(_c.x - this.get_viewport().w / 2,_c.y - this.get_viewport().h / 2));
		return this.view.set_center(_c);
	}
	,get_zoom: function() {
		return this.view.zoom;
	}
	,set_zoom: function(_z) {
		this.view.set_zoom(_z);
		if(this.get_size() != null) {
			var _g = this.view.get_scale();
			_g.set_x(_g.x * (1 / this._size_factor.x));
			var _g1 = this.view.get_scale();
			_g1.set_y(_g1.y * (1 / this._size_factor.y));
		}
		return this.view.zoom;
	}
	,get_size: function() {
		return this.size;
	}
	,get_size_mode: function() {
		return this.size_mode;
	}
	,set_size_mode: function(_m) {
		if(this.get_size_mode() != null) {
			this.size_mode = _m;
			if(this.get_size() != null) this.set_size(this.get_size());
		}
		return this.size_mode = _m;
	}
	,_onwindowsized: function(_event) {
		if(this.get_size() != null) {
			this.set_viewport(new phoenix_Rectangle(this.get_viewport().x,this.get_viewport().y,_event.event.x,_event.event.y));
			this.set_size(this.get_size());
		}
	}
	,set_size: function(_size) {
		if(_size == null) {
			this.set_center(new phoenix_Vector(this.get_viewport().w / 2,this.get_viewport().h / 2));
			this.size = _size;
			this._size_factor.set_x(this._size_factor.set_y(1));
			this.set_zoom(this.get_zoom());
			this._connected = false;
			Luxe.off(31,$bind(this,this._onwindowsized));
			return this.get_size();
		}
		if(!this._connected) {
			Luxe.on(31,$bind(this,this._onwindowsized));
			this._connected = true;
		}
		var _ratio_x = this.get_viewport().w / _size.x;
		var _ratio_y = this.get_viewport().h / _size.y;
		var _shortest = Math.max(_ratio_x,_ratio_y);
		var _longest = Math.min(_ratio_x,_ratio_y);
		var _g = this.get_size_mode();
		switch(_g[1]) {
		case 0:
			_ratio_x = _ratio_y = _longest;
			break;
		case 1:
			_ratio_x = _ratio_y = _shortest;
			break;
		case 2:
			break;
		}
		this._size_factor.set_x(_ratio_x);
		this._size_factor.set_y(_ratio_y);
		this.view.get_scale().set_x(1 / (this._size_factor.x * this.get_zoom()));
		this.view.get_scale().set_y(1 / (this._size_factor.y * this.get_zoom()));
		this.set_center(new phoenix_Vector(_size.x / 2,_size.y / 2));
		return this.size = new phoenix_Vector(_size.x,_size.y,_size.z,_size.w);
	}
	,set_pos_from_transform: function(_pos) {
		var vw = this.view.get_viewport().w;
		var vh = this.view.get_viewport().h;
		var hvw = vw / 2;
		var hvh = vh / 2;
		var _px = _pos.x;
		var _py = _pos.y;
		if(this.bounds != null) {
			if(_px < this.bounds.x) _px = this.bounds.x;
			if(_py < this.bounds.y) _py = this.bounds.y;
			if(_px + hvw > this.bounds.w - vw) _px = this.bounds.w - vw - hvw;
			if(_py + hvh > this.bounds.h - vh) _py = this.bounds.h - vh - hvh;
		}
		var prev = _pos.ignore_listeners;
		_pos.ignore_listeners = true;
		_pos.set_xy(_px,_py);
		_pos.ignore_listeners = prev;
		luxe_Entity.prototype.set_pos_from_transform.call(this,_pos);
		this.update_view_pos = _pos;
	}
	,set_rotation_from_transform: function(_rotation) {
		luxe_Entity.prototype.set_rotation_from_transform.call(this,_rotation);
		if(this.view != null) this.view.set_rotation(_rotation);
	}
	,set_scale_from_transform: function(_scale) {
		luxe_Entity.prototype.set_scale_from_transform.call(this,_scale);
		if(this.view != null) this.view.set_scale(_scale);
	}
	,update: function(dt) {
		if(this.shaking) {
			this._final_pos.set_xyz(this.get_transform().get_pos().x,this.get_transform().get_pos().y,this.get_transform().get_pos().z);
			this.shake_vector = Luxe.utils.geometry.random_point_in_unit_circle();
			var _g = this.shake_vector;
			_g.set_x(_g.x * this.shake_amount);
			var _g1 = this.shake_vector;
			_g1.set_y(_g1.y * this.shake_amount);
			var _g2 = this.shake_vector;
			_g2.set_z(_g2.z * this.shake_amount);
			this.shake_amount *= 0.9;
			if(this.shake_amount <= this.minimum_shake) {
				this.shake_amount = 0;
				this.shaking = false;
			}
			this._final_pos.set_xyz(this._final_pos.x + this.shake_vector.x,this._final_pos.y + this.shake_vector.y,this._final_pos.z + this.shake_vector.z);
			this.update_view_pos = this._final_pos;
		}
		if(this.update_view_pos != null && this.view != null) {
			this.view.set_pos(this.update_view_pos.clone());
			this.update_view_pos = null;
		}
	}
	,init: function() {
		luxe_Entity.prototype.init.call(this);
	}
	,ondestroy: function() {
		luxe_Entity.prototype.ondestroy.call(this);
	}
	,__class__: luxe_Camera
	,__properties__: $extend(luxe_Entity.prototype.__properties__,{set_size_mode:"set_size_mode",get_size_mode:"get_size_mode",set_size:"set_size",get_size:"get_size",set_zoom:"set_zoom",get_zoom:"get_zoom",set_center:"set_center",set_viewport:"set_viewport",get_viewport:"get_viewport"})
});
var luxe_ID = function(_name,_id) {
	if(_id == null) _id = "";
	if(_name == null) _name = "";
	this.name = "";
	this.name = _name;
	if(_id == "") this.id = Luxe.utils.uniqueid(); else this.id = _id;
};
$hxClasses["luxe.ID"] = luxe_ID;
luxe_ID.__name__ = true;
luxe_ID.prototype = {
	__class__: luxe_ID
};
var luxe_Component = function() { };
$hxClasses["luxe.Component"] = luxe_Component;
luxe_Component.__name__ = true;
luxe_Component.__super__ = luxe_ID;
luxe_Component.prototype = $extend(luxe_ID.prototype,{
	init: function() {
	}
	,update: function(dt) {
	}
	,onremoved: function() {
	}
	,onfixedupdate: function(rate) {
	}
	,onreset: function() {
	}
	,ondestroy: function() {
	}
	,entity_pos_change: function(_pos) {
	}
	,entity_scale_change: function(_scale) {
	}
	,entity_rotation_change: function(_rotation) {
	}
	,entity_origin_change: function(_origin) {
	}
	,entity_parent_change: function(_parent) {
	}
	,__class__: luxe_Component
});
var snow_App = function() {
	this.next_render = 0;
	this.next_tick = 0;
	this.alpha = 1.0;
	this.cur_frame_start = 0.0;
	this.current_time = 0;
	this.last_frame_start = 0.0;
	this.delta_sim = 0.016666666666666666;
	this.delta_time = 0.016666666666666666;
	this.max_frame_time = 0.25;
	this.update_rate = 0;
	this.render_rate = -1;
	this.fixed_delta = 0;
	this.timescale = 1;
};
$hxClasses["snow.App"] = snow_App;
snow_App.__name__ = true;
snow_App.prototype = {
	config: function(config) {
		return config;
	}
	,ready: function() {
	}
	,update: function(dt) {
	}
	,ondestroy: function() {
	}
	,onevent: function(event) {
	}
	,ontickstart: function() {
	}
	,ontickend: function() {
	}
	,onkeydown: function(keycode,scancode,repeat,mod,timestamp,window_id) {
	}
	,onkeyup: function(keycode,scancode,repeat,mod,timestamp,window_id) {
	}
	,ontextinput: function(text,start,length,type,timestamp,window_id) {
	}
	,onmousedown: function(x,y,button,timestamp,window_id) {
	}
	,onmouseup: function(x,y,button,timestamp,window_id) {
	}
	,onmousewheel: function(x,y,timestamp,window_id) {
	}
	,onmousemove: function(x,y,xrel,yrel,timestamp,window_id) {
	}
	,ontouchdown: function(x,y,touch_id,timestamp) {
	}
	,ontouchup: function(x,y,touch_id,timestamp) {
	}
	,ontouchmove: function(x,y,dx,dy,touch_id,timestamp) {
	}
	,ongamepadaxis: function(gamepad,axis,value,timestamp) {
	}
	,ongamepaddown: function(gamepad,button,value,timestamp) {
	}
	,ongamepadup: function(gamepad,button,value,timestamp) {
	}
	,ongamepaddevice: function(gamepad,id,type,timestamp) {
	}
	,on_internal_init: function() {
		this.cur_frame_start = snow_Snow.core.timestamp();
		this.last_frame_start = this.cur_frame_start;
		this.current_time = 0;
		this.delta_time = 0.016;
	}
	,on_internal_update: function() {
		if(this.update_rate != 0) {
			if(snow_Snow.core.timestamp() < this.next_tick) return;
			this.next_tick = snow_Snow.core.timestamp() + this.update_rate;
		}
		this.cur_frame_start = snow_Snow.core.timestamp();
		this.delta_time = this.cur_frame_start - this.last_frame_start;
		this.last_frame_start = this.cur_frame_start;
		if(this.delta_time > this.max_frame_time) this.delta_time = this.max_frame_time;
		var used_delta;
		if(this.fixed_delta == 0) used_delta = this.delta_time; else used_delta = this.fixed_delta;
		used_delta *= this.timescale;
		this.delta_sim = used_delta;
		this.current_time += used_delta;
		this.app.do_internal_update(used_delta);
	}
	,on_internal_render: function() {
		if(this.render_rate != 0) {
			if(this.render_rate < 0 || this.next_render < snow_Snow.core.timestamp()) {
				this.app.windowing.update();
				this.next_render += this.render_rate;
			}
		}
	}
	,__class__: snow_App
};
var luxe_Core = function(_game,_config) {
	this.inited = false;
	this.has_shutdown = false;
	this.shutting_down = false;
	this.headless = false;
	this.console_visible = false;
	snow_App.call(this);
	this.init_config = _config;
	this.game = _game;
	this.game.app = this;
	this.emitter = new luxe_Emitter();
	Luxe.core = this;
	Luxe.utils = new luxe_utils_Utils(this);
};
$hxClasses["luxe.Core"] = luxe_Core;
luxe_Core.__name__ = true;
luxe_Core.__super__ = snow_App;
luxe_Core.prototype = $extend(snow_App.prototype,{
	ready: function() {
		var _g = this;
		Luxe.version = haxe_Resource.getString("version");
		Luxe.build = Luxe.version + haxe_Resource.getString("build");
		haxe_Log.trace("     i / luxe / " + ("" + Luxe.build + " / debug:" + Std.string(this.app.debug) + " / os:" + this.app.os + " / platform:" + this.app.platform),{ fileName : "Core.hx", lineNumber : 112, className : "luxe.Core", methodName : "ready"});
		this.headless = this.app.window == null;
		if(!this.headless) {
			var _font_name = "default.png";
			var _font_image;
			var bytes = haxe_Resource.getBytes(_font_name);
			_font_image = new Uint8Array(bytes.b.bufferValue);
			var _font_load = snow_system_assets_AssetImage.load_from_bytes(this.app.assets,_font_name,_font_image);
			_font_load.then(function(asset) {
				_g.init(asset);
			}).error(function(error) {
				haxe_Log.trace("     i / luxe / " + "failed to load default font, things will probably not look right... $error",{ fileName : "Core.hx", lineNumber : 133, className : "luxe.Core", methodName : "ready"});
				_g.init(null);
			});
		} else this.init(null);
	}
	,ondestroy: function() {
		this.shutting_down = true;
		haxe_Log.trace("     i / luxe / " + "shutting down...",{ fileName : "Core.hx", lineNumber : 151, className : "luxe.Core", methodName : "ondestroy"});
		this.game.ondestroy();
		this.emitter.emit(8);
		if(this.renderer != null) this.renderer.destroy();
		this.physics.destroy();
		this.input.destroy();
		this.audio.destroy();
		this.timer.destroy();
		this.events.destroy();
		this.debug.destroy();
		this.emitter = null;
		this.input = null;
		this.audio = null;
		this.events = null;
		this.timer = null;
		this.debug = null;
		Luxe.utils = null;
		this.has_shutdown = true;
		haxe_Log.trace("     i / luxe / " + "goodbye.",{ fileName : "Core.hx", lineNumber : 183, className : "luxe.Core", methodName : "ondestroy"});
	}
	,init: function(asset) {
		Luxe.debug = this.debug = new luxe_Debug(this);
		Luxe.io = this.io = new luxe_IO(this);
		this.draw = new luxe_Draw(this);
		this.timer = new luxe_Timer(this);
		this.events = new luxe_Events();
		this.audio = new luxe_Audio(this);
		this.input = new luxe_Input(this);
		this.physics = new luxe_Physics(this);
		this.resources = new luxe_Resources();
		Luxe.resources = this.resources;
		if(!this.headless) {
			this.app.window.onevent = $bind(this,this.window_event);
			this.renderer = new phoenix_Renderer(this,asset);
			Luxe.renderer = this.renderer;
		}
		var _window_w = 0;
		var _window_h = 0;
		if(this.app.window != null) {
			_window_w = this.app.window.width;
			_window_h = this.app.window.height;
		}
		this.screen = new luxe_Screen(this,_window_w,_window_h);
		this.debug.init();
		this.io.init();
		this.timer.init();
		this.audio.init();
		this.input.init();
		if(!this.headless) this.renderer.init();
		this.physics.init();
		Luxe.audio = this.audio;
		Luxe.draw = this.draw;
		Luxe.events = this.events;
		Luxe.timer = this.timer;
		Luxe.input = this.input;
		if(!this.headless) Luxe.camera = new luxe_Camera({ name : "default camera", view : this.renderer.camera});
		Luxe.physics = this.physics;
		this.scene = new luxe_Scene("default scene");
		Luxe.scene = this.scene;
		if(!this.headless) {
			this.scene.add(Luxe.camera);
			this.debug.create_debug_console();
		}
		this.internal_pre_ready();
	}
	,internal_pre_ready: function() {
		if(!this.headless) {
			haxe_Log.trace("     i / luxe / " + ("opengl " + snow_modules_opengl_web_GL.versionString()),{ fileName : "Core.hx", lineNumber : 276, className : "luxe.Core", methodName : "internal_pre_ready"});
			var default_parcel = new luxe_Parcel({ id : "default_parcel", system : this.resources, bytes : this.appconfig.preload.bytes, texts : this.appconfig.preload.texts, jsons : this.appconfig.preload.jsons, textures : this.appconfig.preload.textures, fonts : this.appconfig.preload.fonts, shaders : this.appconfig.preload.shaders, sounds : this.appconfig.preload.sounds, oncomplete : $bind(this,this.internal_ready), onfailed : function(_error) {
				haxe_Log.trace("     i / luxe / " + "config / preload / failed to load",{ fileName : "Core.hx", lineNumber : 293, className : "luxe.Core", methodName : "internal_pre_ready"});
				throw new js__$Boot_HaxeError(snow_types_Error.error(_error));
			}});
			default_parcel.load();
		} else this.internal_ready(null);
	}
	,internal_ready: function(_) {
		if(this.app.window != null && !this.headless) {
			this.app.window.onrender = $bind(this,this.render);
			this.debug.start(luxe_Tag.update,50);
			this.debug.start(luxe_Tag.renderdt,50);
		}
		this.game.ready();
		if(!this.shutting_down) {
			this.emitter.emit(2);
			this.inited = true;
			this.physics.reset();
			if(!this.app.snow_config.has_loop) this.shutdown();
		}
	}
	,shutdown: function() {
		this.shutting_down = true;
		Luxe.next(($_=this.app,$bind($_,$_.shutdown)));
	}
	,on: function(event,handler) {
		this.emitter.on(event,handler);
	}
	,off: function(event,handler) {
		return this.emitter.off(event,handler);
	}
	,emit: function(event,data) {
		this.emitter.emit(event,data);
		return;
	}
	,ontickstart: function() {
		if(!this.has_shutdown) this.emitter.emit(4);
	}
	,ontickend: function() {
		if(!this.has_shutdown) this.emitter.emit(5);
	}
	,onevent: function(event) {
		this.game.onevent(event);
	}
	,update: function(dt) {
		if(this.has_shutdown) return;
		if(!this.inited) return;
		this.debug.end(luxe_Tag.update);
		this.debug.start(luxe_Tag.update);
		this.timer.process();
		this.input.process();
		this.audio.process();
		this.events.process();
		this.physics.process();
		this.debug.start(luxe_Tag.updates);
		this.emitter.emit(6,dt);
		this.debug.end(luxe_Tag.updates);
		this.debug.start(luxe_Tag.game_update);
		this.game.update(dt);
		this.debug.end(luxe_Tag.game_update);
		this.debug.process();
	}
	,window_event: function(_event) {
		if(this.shutting_down) return;
		if(!this.inited) return;
		this.emitter.emit(28,_event);
		var _g = _event.type;
		if(_g != null) switch(_g) {
		case 5:
			this.emitter.emit(29,_event);
			this.game.onwindowmoved(_event);
			break;
		case 6:
			this.screen.internal_resized(_event.event.x,_event.event.y);
			this.renderer.internal_resized(_event.event.x,_event.event.y);
			this.emitter.emit(30,_event);
			this.game.onwindowresized(_event);
			break;
		case 7:
			this.screen.internal_resized(_event.event.x,_event.event.y);
			this.renderer.internal_resized(_event.event.x,_event.event.y);
			this.emitter.emit(31,_event);
			this.game.onwindowsized(_event);
			break;
		case 8:
			this.emitter.emit(32,_event);
			this.game.onwindowminimized(_event);
			break;
		case 10:
			this.emitter.emit(33,_event);
			this.game.onwindowrestored(_event);
			break;
		default:
		} else {
		}
	}
	,render: function(window) {
		if(this.shutting_down) return;
		if(!this.inited) return;
		this.debug.end(luxe_Tag.renderdt);
		this.debug.start(luxe_Tag.renderdt);
		if(!this.headless) {
			this.debug.start(luxe_Tag.render);
			this.emitter.emit(9);
			this.game.onprerender();
			this.emitter.emit(10);
			this.game.onrender();
			this.renderer.process();
			this.emitter.emit(11);
			this.game.onpostrender();
			this.debug.end(luxe_Tag.render);
			var _batch = this.debug.batcher;
			if(_batch.enabled) {
				this.debug.start(luxe_Tag.debug_batch);
				_batch.draw_calls = 0;
				_batch.vert_count = 0;
				_batch.emitter.emit(1,_batch);
				_batch.view.process();
				_batch.renderer.state.viewport(_batch.view.get_viewport().x,_batch.view.get_viewport().y,_batch.view.get_viewport().w,_batch.view.get_viewport().h);
				_batch.batch(false);
				_batch.emitter.emit(2,_batch);
				this.renderer.stats.geometry_count += _batch.geometry.size();
				this.renderer.stats.dynamic_batched_count += _batch.dynamic_batched_count;
				this.renderer.stats.static_batched_count += _batch.static_batched_count;
				this.renderer.stats.visible_count += _batch.visible_count;
				this.renderer.stats.draw_calls += _batch.draw_calls;
				this.renderer.stats.vert_count += _batch.vert_count;
				this.debug.end(luxe_Tag.debug_batch);
			}
		}
	}
	,show_console: function(_show) {
		if(_show == null) _show = true;
		this.console_visible = _show;
		this.debug.show_console(this.console_visible);
	}
	,onkeydown: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		if(!this.inited) return;
		var event = { scancode : scancode, keycode : keycode, state : luxe_InteractState.down, mod : mod, repeat : repeat, timestamp : timestamp, window_id : window_id};
		if(!this.shutting_down) {
			this.input.check_named_keys(event,true);
			this.emitter.emit(12,event);
			this.game.onkeydown(event);
			if(scancode == snow_system_input_Scancodes.grave) this.show_console(!this.console_visible);
		}
	}
	,onkeyup: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		if(!this.inited) return;
		var event = { scancode : scancode, keycode : keycode, state : luxe_InteractState.up, mod : mod, repeat : repeat, timestamp : timestamp, window_id : window_id};
		if(!this.shutting_down) {
			this.input.check_named_keys(event);
			this.emitter.emit(13,event);
			this.game.onkeyup(event);
		}
	}
	,ontextinput: function(text,start,length,type,timestamp,window_id) {
		if(!this.inited) return;
		var _type = luxe_TextEventType.unknown;
		switch(type) {
		case 1:
			_type = luxe_TextEventType.edit;
			break;
		case 2:
			_type = luxe_TextEventType.input;
			break;
		default:
			return;
		}
		var event = { text : text, start : start, length : length, type : _type, timestamp : timestamp, window_id : window_id};
		if(!this.shutting_down) {
			this.emitter.emit(14,event);
			this.game.ontextinput(event);
		}
	}
	,oninputdown: function(name,event) {
		if(!this.inited) return;
		if(!this.shutting_down) {
			this.emitter.emit(15,{ name : name, event : event});
			this.game.oninputdown(name,event);
		}
	}
	,oninputup: function(name,event) {
		if(!this.inited) return;
		if(!this.shutting_down) {
			this.emitter.emit(16,{ name : name, event : event});
			this.game.oninputup(name,event);
		}
	}
	,onmousedown: function(x,y,button,timestamp,window_id) {
		if(!this.inited) return;
		this.screen.cursor.set_internal(new phoenix_Vector(x,y));
		var event = { timestamp : timestamp, window_id : window_id, state : luxe_InteractState.down, button : button, x : x, y : y, xrel : x, yrel : y, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.input.check_named_mouse(event,true);
			this.emitter.emit(17,event);
			this.game.onmousedown(event);
		}
	}
	,onmouseup: function(x,y,button,timestamp,window_id) {
		if(!this.inited) return;
		this.screen.cursor.set_internal(new phoenix_Vector(x,y));
		var event = { timestamp : timestamp, window_id : window_id, state : luxe_InteractState.up, button : button, x : x, y : y, xrel : x, yrel : y, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.input.check_named_mouse(event);
			this.emitter.emit(18,event);
			this.game.onmouseup(event);
		}
	}
	,onmousemove: function(x,y,xrel,yrel,timestamp,window_id) {
		if(!this.inited) return;
		this.screen.cursor.set_internal(new phoenix_Vector(x,y));
		var event = { timestamp : timestamp, window_id : window_id, state : luxe_InteractState.move, button : 0, x : x, y : y, xrel : xrel, yrel : yrel, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.emitter.emit(19,event);
			this.game.onmousemove(event);
		}
	}
	,onmousewheel: function(x,y,timestamp,window_id) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, window_id : window_id, state : luxe_InteractState.wheel, button : 0, x : x, y : y, xrel : x, yrel : y, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.input.check_named_mouse(event,false);
			this.emitter.emit(20,event);
			this.game.onmousewheel(event);
		}
	}
	,ontouchdown: function(x,y,touch_id,timestamp) {
		if(!this.inited) return;
		this._touch_pos = new phoenix_Vector(x,y);
		var event = { state : luxe_InteractState.down, timestamp : timestamp, touch_id : touch_id, x : x, y : y, dx : x, dy : y, pos : this._touch_pos};
		if(!this.shutting_down) {
			this.emitter.emit(21,event);
			this.game.ontouchdown(event);
		}
	}
	,ontouchup: function(x,y,touch_id,timestamp) {
		if(!this.inited) return;
		this._touch_pos = new phoenix_Vector(x,y);
		var event = { state : luxe_InteractState.up, timestamp : timestamp, touch_id : touch_id, x : x, y : y, dx : x, dy : y, pos : this._touch_pos};
		if(!this.shutting_down) {
			this.emitter.emit(22,event);
			this.game.ontouchup(event);
		}
	}
	,ontouchmove: function(x,y,dx,dy,touch_id,timestamp) {
		if(!this.inited) return;
		this._touch_pos = new phoenix_Vector(x,y);
		var event = { state : luxe_InteractState.move, timestamp : timestamp, touch_id : touch_id, x : x, y : y, dx : dx, dy : dy, pos : this._touch_pos};
		if(!this.shutting_down) {
			this.emitter.emit(23,event);
			this.game.ontouchmove(event);
		}
	}
	,ongamepadaxis: function(gamepad,axis,value,timestamp) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, type : luxe_GamepadEventType.axis, state : luxe_InteractState.axis, gamepad : gamepad, button : -1, axis : axis, value : value, id : null};
		if(!this.shutting_down) {
			this.emitter.emit(24,event);
			this.game.ongamepadaxis(event);
		}
	}
	,ongamepaddown: function(gamepad,button,value,timestamp) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, type : luxe_GamepadEventType.button, state : luxe_InteractState.down, gamepad : gamepad, button : button, axis : -1, value : value, id : null};
		if(!this.shutting_down) {
			this.input.check_named_gamepad_buttons(event,true);
			this.emitter.emit(25,event);
			this.game.ongamepaddown(event);
		}
	}
	,ongamepadup: function(gamepad,button,value,timestamp) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, type : luxe_GamepadEventType.button, state : luxe_InteractState.up, gamepad : gamepad, button : button, axis : -1, value : value, id : null};
		if(!this.shutting_down) {
			this.input.check_named_gamepad_buttons(event,false);
			this.emitter.emit(26,event);
			this.game.ongamepadup(event);
		}
	}
	,ongamepaddevice: function(gamepad,id,type,timestamp) {
		if(!this.inited) return;
		var _event_type = luxe_GamepadEventType.unknown;
		switch(type) {
		case 1:
			_event_type = luxe_GamepadEventType.device_added;
			break;
		case 2:
			_event_type = luxe_GamepadEventType.device_removed;
			break;
		case 3:
			_event_type = luxe_GamepadEventType.device_remapped;
			break;
		default:
		}
		var event = { timestamp : timestamp, type : _event_type, state : luxe_InteractState.none, gamepad : gamepad, button : -1, axis : -1, value : 0, id : id};
		if(!this.shutting_down) this.game.ongamepaddevice(event);
	}
	,config: function(config) {
		this.appconfig = config;
		this.appconfig.window.width = this.init_config.window.width;
		this.appconfig.window.height = this.init_config.window.height;
		this.appconfig.window.fullscreen = this.init_config.window.fullscreen;
		this.appconfig.window.borderless = this.init_config.window.borderless;
		this.appconfig.window.resizable = this.init_config.window.resizable;
		this.appconfig.window.title = this.init_config.window.title;
		this.appconfig.preload = { bytes : [], texts : [], jsons : [], textures : [], fonts : [], shaders : [], sounds : []};
		this.appconfig = this.game.config(this.appconfig);
		return this.appconfig;
	}
	,runtime_info: function() {
		return "" + Luxe.build + " / debug:" + Std.string(this.app.debug) + " / os:" + this.app.os + " / platform:" + this.app.platform;
	}
	,__class__: luxe_Core
});
var luxe_Tag = function() { };
$hxClasses["luxe.Tag"] = luxe_Tag;
luxe_Tag.__name__ = true;
var luxe_Debug = function(_core) {
	this.last_cursor_grab = false;
	this.last_cursor_shown = true;
	this.last_view_index = 0;
	this.current_view_index = 0;
	this.dt_average_count = 0;
	this.dt_average_span = 60;
	this.dt_average_accum = 0;
	this.dt_average = 0;
	this.visible = false;
	this.core = _core;
};
$hxClasses["luxe.Debug"] = luxe_Debug;
luxe_Debug.__name__ = true;
luxe_Debug.internal_trace = function(v,inf) {
	var _line = StringTools.rpad(inf.lineNumber == null?"null":"" + inf.lineNumber," ",4);
	console.log("" + inf.fileName + "::" + _line + " " + Std.string(v));
	if(luxe_Debug.shut_down) return;
	var $it0 = luxe_Debug.trace_callbacks.iterator();
	while( $it0.hasNext() ) {
		var _callback = $it0.next();
		_callback(v,inf);
	}
};
luxe_Debug.prototype = {
	init: function() {
		luxe_Debug.trace_callbacks = new haxe_ds_StringMap();
		luxe_Debug.views = [];
		luxe_Debug.views.push(new luxe_debug_TraceDebugView());
		luxe_Debug.views.push(new luxe_debug_StatsDebugView());
		luxe_Debug.views.push(new luxe_debug_ProfilerDebugView());
		luxe_Debug.views.push(new luxe_debug_SceneDebugView());
		this.current_view = luxe_Debug.views[0];
		haxe_Log.trace = luxe_Debug.internal_trace;
		null;
	}
	,get_view: function(_name) {
		var _g = 0;
		var _g1 = luxe_Debug.views;
		while(_g < _g1.length) {
			var view = _g1[_g];
			++_g;
			if(view.get_name() == _name) return view;
		}
		return null;
	}
	,start: function(_name,_max) {
		if(!this.core.headless) luxe_debug_ProfilerDebugView.start(_name,_max);
	}
	,end: function(_name) {
		if(!this.core.headless) luxe_debug_ProfilerDebugView.end(_name);
	}
	,add_trace_listener: function(_name,_callback) {
		luxe_Debug.trace_callbacks.set(_name,_callback);
	}
	,create_debug_console: function() {
		var _g = this;
		this.core.emitter.on(13,$bind(this,this.keyup));
		this.core.emitter.on(12,$bind(this,this.keydown));
		this.core.emitter.on(18,$bind(this,this.mouseup));
		this.core.emitter.on(17,$bind(this,this.mousedown));
		this.core.emitter.on(19,$bind(this,this.mousemove));
		this.core.emitter.on(20,$bind(this,this.mousewheel));
		this.batcher = new phoenix_Batcher(Luxe.renderer,"debug_batcher");
		this.view = new phoenix_Camera({ camera_name : "debug_batcher_camera"});
		this.batcher.view = this.view;
		this.batcher.set_layer(999);
		this.overlay = new phoenix_geometry_QuadGeometry({ id : "debug.overlay", x : 0, y : 0, w : Luxe.core.screen.get_w(), h : Luxe.core.screen.get_h(), color : new phoenix_Color(0,0,0,0.8), depth : 999, visible : false, batcher : this.batcher});
		this.overlay.set_locked(true);
		this.padding = new phoenix_Vector(Luxe.core.screen.get_w() * 0.05,Luxe.core.screen.get_h() * 0.05);
		this.inspector = new luxe_debug_Inspector({ pos : new phoenix_Vector(this.padding.x,this.padding.y), size : new phoenix_Vector(Luxe.core.screen.get_w() - this.padding.x * 2,Luxe.core.screen.get_h() - this.padding.y * 2), batcher : this.batcher});
		this.inspector.onrefresh = $bind(this,this.refresh);
		this.core.emitter.on(31,function(_event) {
			var _w = _event.event.x;
			var _h = _event.event.y;
			_g.padding.set_xy(_w * 0.05,_h * 0.05);
			_g.overlay.resize_xy(_w,_h);
			_g.view.set_viewport(new phoenix_Rectangle(0,0,_w,_h));
			_g.inspector.set_size(new phoenix_Vector(_w - _g.padding.x * 2,_h - _g.padding.y * 2));
			_g.inspector.set_pos(new phoenix_Vector(_g.padding.x,_g.padding.y));
			var _g1 = 0;
			var _g2 = luxe_Debug.views;
			while(_g1 < _g2.length) {
				var view = _g2[_g1];
				++_g1;
				view.onwindowsized(_event);
			}
		});
		this.batcher.enabled = false;
		var _g3 = 0;
		var _g11 = luxe_Debug.views;
		while(_g3 < _g11.length) {
			var view1 = _g11[_g3];
			++_g3;
			view1.create();
		}
	}
	,mouseup: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe_Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmouseup(e);
			}
		}
	}
	,mousedown: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe_Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmousedown(e);
			}
		}
	}
	,mousewheel: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe_Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmousewheel(e);
			}
		}
	}
	,mousemove: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe_Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmousemove(e);
			}
		}
	}
	,keyup: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe_Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onkeyup(e);
			}
		}
	}
	,keydown: function(e) {
		if(this.visible) {
			if(e.keycode == snow_system_input_Keycodes.key_1 && this.core.console_visible) this.switch_view();
			var _g = 0;
			var _g1 = luxe_Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onkeydown(e);
			}
		}
	}
	,refresh: function() {
		if(this.current_view != null) this.current_view.refresh();
	}
	,switch_view: function() {
		this.last_view_index = this.current_view_index;
		this.current_view_index++;
		if(this.current_view_index > luxe_Debug.views.length - 1) this.current_view_index = 0;
		luxe_Debug.views[this.last_view_index].hide();
		this.current_view = luxe_Debug.views[this.current_view_index];
		this.current_view.show();
	}
	,show_console: function(_show) {
		if(_show == null) _show = true;
		if(_show) {
			this.last_cursor_shown = Luxe.core.screen.cursor.get_visible();
			this.last_cursor_grab = Luxe.core.screen.cursor.get_grab();
			Luxe.core.screen.cursor.set_visible(true);
			Luxe.core.screen.cursor.set_grab(false);
		} else {
			if(this.last_cursor_shown != true) Luxe.core.screen.cursor.set_visible(this.last_cursor_shown);
			if(this.last_cursor_grab != false) Luxe.core.screen.cursor.set_grab(this.last_cursor_grab);
		}
		this.visible = _show;
		this.batcher.enabled = _show;
		if(_show) {
			this.current_view.show();
			this.overlay.set_visible(true);
			this.inspector.show();
		} else {
			this.current_view.hide();
			this.inspector.hide();
			this.overlay.set_visible(false);
		}
	}
	,destroy: function() {
		this.core.emitter.off(13,$bind(this,this.keyup));
		this.core.emitter.off(12,$bind(this,this.keydown));
		this.core.emitter.off(18,$bind(this,this.mouseup));
		this.core.emitter.off(17,$bind(this,this.mousedown));
		this.core.emitter.off(19,$bind(this,this.mousemove));
		this.core.emitter.off(20,$bind(this,this.mousewheel));
		luxe_Debug.shut_down = true;
	}
	,process: function() {
		this.dt_average_accum += Luxe.core.delta_time;
		this.dt_average_count++;
		if(this.dt_average_count == this.dt_average_span - 1) {
			this.dt_average = this.dt_average_accum / this.dt_average_span;
			this.dt_average_accum = this.dt_average;
			this.dt_average_count = 0;
		}
		if(!this.visible) return;
		this.inspector.title.set_text("[" + this.current_view.get_name() + "] / " + Math.round(1 / this.dt_average) + " / " + luxe_utils_Maths.fixed(Luxe.core.delta_time,5) + " / " + luxe_utils_Maths.fixed(this.dt_average,5));
		var _g = 0;
		var _g1 = luxe_Debug.views;
		while(_g < _g1.length) {
			var view = _g1[_g];
			++_g;
			view.process();
		}
	}
	,__class__: luxe_Debug
};
var luxe_Draw = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.Draw"] = luxe_Draw;
luxe_Draw.__name__ = true;
luxe_Draw.prototype = {
	line: function(options) {
		if(options.p0 == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("options.p0 was null" + (" ( " + "draw.line requires p0:Vector, and p1:Vector" + " )")));
		if(options.p1 == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("options.p1 was null" + (" ( " + "draw.line requires p0:Vector, and p1:Vector" + " )")));
		if(options.id == null) options.id = "line.geometry";
		options.id;
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		options.batcher;
		return new phoenix_geometry_LineGeometry(options);
	}
	,box: function(options) {
		if(options.id == null) options.id = "quad.geometry";
		options.id;
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		options.batcher;
		return new phoenix_geometry_QuadGeometry(options);
	}
	,__class__: luxe_Draw
};
var luxe_Events = function() {
	this.event_connections = new haxe_ds_StringMap();
	this.event_slots = new haxe_ds_StringMap();
	this.event_filters = new haxe_ds_StringMap();
	this.event_queue = new haxe_ds_StringMap();
	this.event_schedules = new haxe_ds_StringMap();
};
$hxClasses["luxe.Events"] = luxe_Events;
luxe_Events.__name__ = true;
luxe_Events.prototype = {
	destroy: function() {
		this.clear();
	}
	,clear: function() {
		var $it0 = this.event_schedules.iterator();
		while( $it0.hasNext() ) {
			var schedule = $it0.next();
			schedule.stop();
			schedule = null;
		}
		var $it1 = this.event_connections.keys();
		while( $it1.hasNext() ) {
			var connection = $it1.next();
			this.event_connections.remove(connection);
		}
		var $it2 = this.event_filters.keys();
		while( $it2.hasNext() ) {
			var filter = $it2.next();
			this.event_filters.remove(filter);
		}
		var $it3 = this.event_slots.keys();
		while( $it3.hasNext() ) {
			var slot = $it3.next();
			this.event_slots.remove(slot);
		}
		var $it4 = this.event_queue.keys();
		while( $it4.hasNext() ) {
			var event = $it4.next();
			this.event_queue.remove(event);
		}
	}
	,does_filter_event: function(_filter,_event) {
		var _replace_stars = new EReg("\\*","gi");
		var _final_filter = _replace_stars.replace(_filter,".*?");
		var _final_search = new EReg(_final_filter,"gi");
		return _final_search.match(_event);
	}
	,process: function() {
		var $it0 = this.event_queue.iterator();
		while( $it0.hasNext() ) {
			var event = $it0.next();
			this.fire(event.name,event.properties);
		}
		if(this.event_queue.keys().hasNext()) {
			this.event_queue = null;
			this.event_queue = new haxe_ds_StringMap();
		}
	}
	,fire: function(_event_name,_properties,_tag) {
		if(_tag == null) _tag = false;
		var _fired = false;
		var $it0 = this.event_filters.iterator();
		while( $it0.hasNext() ) {
			var _filter = $it0.next();
			if(_filter.length > 0) {
				var _filter_name = _filter[0].event_name;
				if(this.does_filter_event(_filter_name,_event_name)) {
					if(_tag) _properties = this.tag_properties(_properties,_event_name,_filter.length);
					var _g = 0;
					while(_g < _filter.length) {
						var _connection = _filter[_g];
						++_g;
						_connection.listener(_properties);
					}
					_fired = true;
				}
			}
		}
		if(this.event_slots.exists(_event_name)) {
			var connections = this.event_slots.get(_event_name);
			if(_tag) _properties = this.tag_properties(_properties,_event_name,connections.length);
			var _g1 = 0;
			while(_g1 < connections.length) {
				var connection = connections[_g1];
				++_g1;
				connection.listener(_properties);
			}
			_fired = true;
		}
		return _fired;
	}
	,tag_properties: function(_properties,_name,_count) {
		if(_properties == null) _properties = { };
		_properties;
		_properties._event_name_ = _name;
		_properties._event_connection_count_ = _count;
		return _properties;
	}
	,__class__: luxe_Events
};
var luxe__$Events_EventConnection = function() { };
$hxClasses["luxe._Events.EventConnection"] = luxe__$Events_EventConnection;
luxe__$Events_EventConnection.__name__ = true;
luxe__$Events_EventConnection.prototype = {
	__class__: luxe__$Events_EventConnection
};
var luxe__$Events_EventObject = function() { };
$hxClasses["luxe._Events.EventObject"] = luxe__$Events_EventObject;
luxe__$Events_EventObject.__name__ = true;
luxe__$Events_EventObject.prototype = {
	__class__: luxe__$Events_EventObject
};
var luxe_IO = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.IO"] = luxe_IO;
luxe_IO.__name__ = true;
luxe_IO.prototype = {
	init: function() {
	}
	,__class__: luxe_IO
};
var luxe_InteractState = $hxClasses["luxe.InteractState"] = { __ename__ : true, __constructs__ : ["unknown","none","down","up","move","wheel","axis"] };
luxe_InteractState.unknown = ["unknown",0];
luxe_InteractState.unknown.toString = $estr;
luxe_InteractState.unknown.__enum__ = luxe_InteractState;
luxe_InteractState.none = ["none",1];
luxe_InteractState.none.toString = $estr;
luxe_InteractState.none.__enum__ = luxe_InteractState;
luxe_InteractState.down = ["down",2];
luxe_InteractState.down.toString = $estr;
luxe_InteractState.down.__enum__ = luxe_InteractState;
luxe_InteractState.up = ["up",3];
luxe_InteractState.up.toString = $estr;
luxe_InteractState.up.__enum__ = luxe_InteractState;
luxe_InteractState.move = ["move",4];
luxe_InteractState.move.toString = $estr;
luxe_InteractState.move.__enum__ = luxe_InteractState;
luxe_InteractState.wheel = ["wheel",5];
luxe_InteractState.wheel.toString = $estr;
luxe_InteractState.wheel.__enum__ = luxe_InteractState;
luxe_InteractState.axis = ["axis",6];
luxe_InteractState.axis.toString = $estr;
luxe_InteractState.axis.__enum__ = luxe_InteractState;
var luxe_TextEventType = $hxClasses["luxe.TextEventType"] = { __ename__ : true, __constructs__ : ["unknown","edit","input"] };
luxe_TextEventType.unknown = ["unknown",0];
luxe_TextEventType.unknown.toString = $estr;
luxe_TextEventType.unknown.__enum__ = luxe_TextEventType;
luxe_TextEventType.edit = ["edit",1];
luxe_TextEventType.edit.toString = $estr;
luxe_TextEventType.edit.__enum__ = luxe_TextEventType;
luxe_TextEventType.input = ["input",2];
luxe_TextEventType.input.toString = $estr;
luxe_TextEventType.input.__enum__ = luxe_TextEventType;
var luxe_GamepadEventType = $hxClasses["luxe.GamepadEventType"] = { __ename__ : true, __constructs__ : ["unknown","axis","button","device_added","device_removed","device_remapped"] };
luxe_GamepadEventType.unknown = ["unknown",0];
luxe_GamepadEventType.unknown.toString = $estr;
luxe_GamepadEventType.unknown.__enum__ = luxe_GamepadEventType;
luxe_GamepadEventType.axis = ["axis",1];
luxe_GamepadEventType.axis.toString = $estr;
luxe_GamepadEventType.axis.__enum__ = luxe_GamepadEventType;
luxe_GamepadEventType.button = ["button",2];
luxe_GamepadEventType.button.toString = $estr;
luxe_GamepadEventType.button.__enum__ = luxe_GamepadEventType;
luxe_GamepadEventType.device_added = ["device_added",3];
luxe_GamepadEventType.device_added.toString = $estr;
luxe_GamepadEventType.device_added.__enum__ = luxe_GamepadEventType;
luxe_GamepadEventType.device_removed = ["device_removed",4];
luxe_GamepadEventType.device_removed.toString = $estr;
luxe_GamepadEventType.device_removed.__enum__ = luxe_GamepadEventType;
luxe_GamepadEventType.device_remapped = ["device_remapped",5];
luxe_GamepadEventType.device_remapped.toString = $estr;
luxe_GamepadEventType.device_remapped.__enum__ = luxe_GamepadEventType;
var luxe_InputType = $hxClasses["luxe.InputType"] = { __ename__ : true, __constructs__ : ["mouse","touch","keys","gamepad"] };
luxe_InputType.mouse = ["mouse",0];
luxe_InputType.mouse.toString = $estr;
luxe_InputType.mouse.__enum__ = luxe_InputType;
luxe_InputType.touch = ["touch",1];
luxe_InputType.touch.toString = $estr;
luxe_InputType.touch.__enum__ = luxe_InputType;
luxe_InputType.keys = ["keys",2];
luxe_InputType.keys.toString = $estr;
luxe_InputType.keys.__enum__ = luxe_InputType;
luxe_InputType.gamepad = ["gamepad",3];
luxe_InputType.gamepad.toString = $estr;
luxe_InputType.gamepad.__enum__ = luxe_InputType;
var luxe_Input = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.Input"] = luxe_Input;
luxe_Input.__name__ = true;
luxe_Input.prototype = {
	init: function() {
		this.key_bindings = new haxe_ds_StringMap();
		this.mouse_bindings = new haxe_ds_StringMap();
		this.gamepad_bindings = new haxe_ds_StringMap();
		this._named_input_down = new haxe_ds_StringMap();
		this._named_input_pressed = new haxe_ds_StringMap();
		this._named_input_released = new haxe_ds_StringMap();
		null;
	}
	,destroy: function() {
		null;
	}
	,process: function() {
		var $it0 = this._named_input_pressed.keys();
		while( $it0.hasNext() ) {
			var _event = $it0.next();
			if(this._named_input_pressed.get(_event)) this._named_input_pressed.remove(_event); else this._named_input_pressed.set(_event,true);
		}
		var $it1 = this._named_input_released.keys();
		while( $it1.hasNext() ) {
			var _event1 = $it1.next();
			if(this._named_input_released.get(_event1)) this._named_input_released.remove(_event1); else this._named_input_released.set(_event1,true);
		}
	}
	,check_named_keys: function(e,_down) {
		if(_down == null) _down = false;
		var _fired = [];
		var $it0 = this.key_bindings.keys();
		while( $it0.hasNext() ) {
			var _name = $it0.next();
			var _b = this.key_bindings.get(_name);
			var _is_down_repeat = _down && e.repeat;
			if(_b.h.hasOwnProperty(e.keycode) && !_is_down_repeat) {
				if(!Lambda.has(_fired,_name)) _fired.push(_name);
			}
		}
		var _g = 0;
		while(_g < _fired.length) {
			var _f = _fired[_g];
			++_g;
			if(_down) {
				this._named_input_pressed.set(_f,false);
				this._named_input_down.set(_f,true);
				this.core.oninputdown(_f,{ name : _f, type : luxe_InputType.keys, state : luxe_InteractState.down, key_event : e});
			} else {
				this._named_input_released.set(_f,false);
				this._named_input_down.remove(_f);
				this.core.oninputup(_f,{ name : _f, type : luxe_InputType.keys, state : luxe_InteractState.up, key_event : e});
			}
		}
	}
	,check_named_mouse: function(e,_down) {
		if(_down == null) _down = false;
		var _fired = [];
		var $it0 = this.mouse_bindings.keys();
		while( $it0.hasNext() ) {
			var _name = $it0.next();
			var _b = this.mouse_bindings.get(_name);
			if(_b.h.hasOwnProperty(e.button)) {
				if(!Lambda.has(_fired,_name)) _fired.push(_name);
			}
		}
		var _g = 0;
		while(_g < _fired.length) {
			var _f = _fired[_g];
			++_g;
			if(_down) {
				this._named_input_pressed.set(_f,false);
				this._named_input_down.set(_f,true);
				this.core.oninputdown(_f,{ name : _f, type : luxe_InputType.mouse, state : luxe_InteractState.down, mouse_event : e});
			} else {
				this._named_input_released.set(_f,false);
				this._named_input_down.remove(_f);
				this.core.oninputup(_f,{ name : _f, type : luxe_InputType.mouse, state : luxe_InteractState.up, mouse_event : e});
			}
		}
	}
	,check_named_gamepad_buttons: function(e,_down) {
		if(_down == null) _down = false;
		var _fired = [];
		var $it0 = this.gamepad_bindings.keys();
		while( $it0.hasNext() ) {
			var _name = $it0.next();
			var _b = this.gamepad_bindings.get(_name);
			if(_b.h.hasOwnProperty(e.button)) {
				var _kb = _b.h[e.button];
				var _accepted_gamepad = _kb == null || _kb == e.gamepad;
				if(!Lambda.has(_fired,_name) && _accepted_gamepad) _fired.push(_name);
			}
		}
		var _g = 0;
		while(_g < _fired.length) {
			var _f = _fired[_g];
			++_g;
			if(_down) {
				this._named_input_pressed.set(_f,false);
				this._named_input_down.set(_f,true);
				this.core.oninputdown(_f,{ name : _f, type : luxe_InputType.gamepad, state : luxe_InteractState.down, gamepad_event : e});
			} else {
				this._named_input_released.set(_f,false);
				this._named_input_down.remove(_f);
				this.core.oninputup(_f,{ name : _f, type : luxe_InputType.gamepad, state : luxe_InteractState.up, gamepad_event : e});
			}
		}
	}
	,__class__: luxe_Input
};
var luxe_DebugError = $hxClasses["luxe.DebugError"] = { __ename__ : true, __constructs__ : ["assertion","null_assertion"] };
luxe_DebugError.assertion = function(expr) { var $x = ["assertion",0,expr]; $x.__enum__ = luxe_DebugError; $x.toString = $estr; return $x; };
luxe_DebugError.null_assertion = function(expr) { var $x = ["null_assertion",1,expr]; $x.__enum__ = luxe_DebugError; $x.toString = $estr; return $x; };
var luxe_Visual = function(_options) {
	this.ignore_texture_on_geometry_change = false;
	this._creating_geometry = false;
	this._has_custom_origin = false;
	this.radians = 0.0;
	this.depth = 0.0;
	this.visible = true;
	this.locked = false;
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + (" ( " + "Visual requires non-null options" + " )")));
	this._rotation_euler = new phoenix_Vector();
	this._rotation_quat = new phoenix_Quaternion();
	luxe_Entity.call(this,_options);
	this.set_color(new phoenix_Color());
	this.set_size(new phoenix_Vector());
	if(this.options.texture != null) this.set_texture(this.options.texture);
	if(this.options.shader != null) this.set_shader(this.options.shader);
	if(this.options.color != null) this.set_color(this.options.color);
	if(this.options.depth != null) this.set_depth(this.options.depth);
	if(this.options.visible != null) this.set_visible(this.options.visible);
	if(this.options.size != null) {
		this.set_size(this.options.size);
		this._create_geometry();
	} else if(this.texture != null) {
		this.set_size(new phoenix_Vector(this.texture.width,this.texture.height));
		this._create_geometry();
	} else {
		this.set_size(new phoenix_Vector(64,64));
		this._create_geometry();
	}
};
$hxClasses["luxe.Visual"] = luxe_Visual;
luxe_Visual.__name__ = true;
luxe_Visual.__super__ = luxe_Entity;
luxe_Visual.prototype = $extend(luxe_Entity.prototype,{
	_create_geometry: function() {
		if(this.options.geometry == null) {
			if(this.options.no_geometry == null || this.options.no_geometry == false) {
				this._creating_geometry = true;
				var _batcher = null;
				if(this.options.no_batcher_add == null || this.options.no_batcher_add == false) {
					if(this.options.batcher != null) _batcher = this.options.batcher; else _batcher = Luxe.renderer.batcher;
				}
				this.set_geometry(new phoenix_geometry_QuadGeometry({ id : this.get_name() + ".visual", x : 0, y : 0, w : this.size.x, h : this.size.y, scale : new phoenix_Vector(1,1,1), texture : this.texture, color : this.color, shader : this.shader, batcher : _batcher, depth : this.options.depth == null?0:this.options.depth, visible : this.options.visible == null?this.visible:this.options.visible}));
				this._creating_geometry = false;
				this.on_geometry_created();
			}
		} else this.set_geometry(this.options.geometry);
		if(this.geometry != null) {
			this.geometry.id = this.get_name() + ".visual";
			this.geometry.transform.id = this.get_name() + ".visual.transform";
		}
		if(this.options.origin != null) {
			this._has_custom_origin = true;
			this.set_origin(this.options.origin);
		}
		if(this.options.rotation_z != null) this.set_rotation_z(this.options.rotation_z);
	}
	,ondestroy: function() {
		if(this.geometry != null && this.geometry.added) this.geometry.drop(true);
		this.set_geometry(null);
		this.set_texture(null);
	}
	,on_geometry_created: function() {
	}
	,set_visible: function(_v) {
		this.visible = _v;
		if(this.geometry != null) this.geometry.set_visible(this.visible);
		return this.visible;
	}
	,set_depth: function(_v) {
		if(this.geometry != null) this.geometry.set_depth(_v);
		return this.depth = _v;
	}
	,set_color: function(_c) {
		if(this.color != null && this.geometry != null) this.geometry.set_color(_c);
		return this.color = _c;
	}
	,set_texture: function(_t) {
		if(this.geometry != null && this.geometry.state.texture != _t) this.geometry.set_texture(_t);
		return this.texture = _t;
	}
	,set_shader: function(_s) {
		if(this.geometry != null && this.geometry.state.shader != _s) this.geometry.set_shader(_s);
		return this.shader = _s;
	}
	,set_geometry: function(_g) {
		if(this.geometry == _g) return this.geometry;
		if(this.geometry != null) this.geometry.drop();
		this.geometry = _g;
		if(this.geometry != null) {
			this.geometry.transform.set_parent(this.get_transform());
			if(this._creating_geometry == false) {
				this.geometry.set_color(this.color);
				this.geometry.set_depth(this.depth);
				this.geometry.set_visible(this.visible);
				if(!this.ignore_texture_on_geometry_change) {
				}
			}
		}
		return this.geometry;
	}
	,set_parent_from_transform: function(_parent) {
		luxe_Entity.prototype.set_parent_from_transform.call(this,_parent);
		if(this.geometry != null) this.geometry.transform.set_parent(this.get_transform());
	}
	,set_rotation_from_transform: function(_rotation) {
		luxe_Entity.prototype.set_rotation_from_transform.call(this,_rotation);
		this._rotation_euler.setEulerFromQuaternion(_rotation,null);
		this._rotation_quat.copy(_rotation);
	}
	,set_size: function(_v) {
		this.size = _v;
		if(this.size != null) phoenix_Vector.Listen(this.size,$bind(this,this._size_change));
		return this.size;
	}
	,set_rotation_z: function(_degrees) {
		this.set_radians(_degrees * 0.017453292519943278);
		return _degrees;
	}
	,set_radians: function(_r) {
		this._rotation_euler.set_z(_r);
		this._rotation_quat.setFromEuler(this._rotation_euler);
		this.set_rotation(this._rotation_quat.clone());
		return this.radians = _r;
	}
	,set_locked: function(_l) {
		if(this.geometry != null) this.geometry.set_locked(_l);
		return this.locked = _l;
	}
	,set_clip_rect: function(_val) {
		if(this.geometry != null) this.geometry.set_clip_rect(_val);
		return this.clip_rect = _val;
	}
	,_size_change: function(_v) {
		this.set_size(this.size);
	}
	,init: function() {
		luxe_Entity.prototype.init.call(this);
	}
	,__class__: luxe_Visual
	,__properties__: $extend(luxe_Entity.prototype.__properties__,{set_rotation_z:"set_rotation_z",set_radians:"set_radians",set_clip_rect:"set_clip_rect",set_depth:"set_depth",set_visible:"set_visible",set_color:"set_color",set_shader:"set_shader",set_texture:"set_texture",set_locked:"set_locked",set_geometry:"set_geometry",set_size:"set_size"})
});
var luxe_Parcel = function(_options) {
	this.load_start_delay = 0.2;
	this.load_time_spacing = 0.05;
	this.start_load = 0.0;
	this.time_to_load = 0.0;
	if(_options == null) _options = { };
	_options;
	if(_options.system == null) _options.system = Luxe.resources;
	_options.system;
	if(_options.id == null) _options.id = Luxe.utils.uniqueid();
	_options.id;
	if(_options.oncomplete != null) this.oncomplete = _options.oncomplete;
	if(_options.onprogress != null) this.onprogress = _options.onprogress;
	if(_options.onfailed != null) this.onfailed = _options.onfailed;
	if(_options.load_time_spacing != null) this.load_time_spacing = _options.load_time_spacing;
	if(_options.load_start_delay != null) this.load_start_delay = _options.load_start_delay;
	this.state = 0;
	this.loaded = [];
	this.emitter = new luxe_Emitter();
	this.system = _options.system;
	this.id = _options.id;
	this.list = this.empty_list();
	if(_options.bytes != null) this.list.bytes = _options.bytes;
	if(_options.texts != null) this.list.texts = _options.texts;
	if(_options.jsons != null) this.list.jsons = _options.jsons;
	if(_options.textures != null) this.list.textures = _options.textures;
	if(_options.fonts != null) this.list.fonts = _options.fonts;
	if(_options.shaders != null) this.list.shaders = _options.shaders;
	if(_options.sounds != null) this.list.sounds = _options.sounds;
	this.system.track(this);
};
$hxClasses["luxe.Parcel"] = luxe_Parcel;
luxe_Parcel.__name__ = true;
luxe_Parcel.prototype = {
	load: function(_load_id) {
		var _g = this;
		this.state = 1;
		Luxe.timer.schedule(this.load_start_delay,function() {
			_g.start_load = snow_Snow.core.timestamp();
			if(_load_id == null) _load_id = _g.id;
			_load_id;
			if(_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length == 0) {
				_g.state = 2;
				_g.time_to_load = snow_Snow.core.timestamp() - _g.start_load;
				_g.emitter.emit(2,_g);
				if(_g.oncomplete != null) _g.oncomplete(_g);
				return;
			}
			var _index = 0;
			var _g1 = 0;
			var _g2 = _g.list.bytes;
			while(_g1 < _g2.length) {
				var _bytes = [_g2[_g1]];
				++_g1;
				if(!(HxOverrides.indexOf(_g.loaded,_bytes[0].id,0) != -1)) {
					_g.loaded.push(_bytes[0].id);
					Luxe.timer.schedule(_g.load_time_spacing,(function(_bytes) {
						return function() {
							var _item_id = _bytes[0].id;
							var _load = _g.system.load_bytes(_bytes[0].id);
							_load.then((function() {
								return function(_res) {
									_g.one_loaded(_item_id,_load_id,_res,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})(),(function() {
								return function(_err) {
									_g.one_failed(_item_id,_load_id,_err,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})());
						};
					})(_bytes));
				} else {
					haxe_Log.trace("   i / parcel / " + ("" + _g.id + " / already had " + _bytes[0].id + " loaded, skipped"),{ fileName : "Parcel.hx", lineNumber : 195, className : "luxe.Parcel", methodName : "load"});
					_g.one_loaded(_bytes[0].id,_load_id,_g.system.cache.get(_bytes[0].id),++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
				}
			}
			var _g11 = 0;
			var _g21 = _g.list.texts;
			while(_g11 < _g21.length) {
				var _text = [_g21[_g11]];
				++_g11;
				if(!(HxOverrides.indexOf(_g.loaded,_text[0].id,0) != -1)) {
					_g.loaded.push(_text[0].id);
					Luxe.timer.schedule(_g.load_time_spacing * _index,(function(_text) {
						return function() {
							var _item_id1 = _text[0].id;
							var _load1 = _g.system.load_text(_text[0].id);
							_load1.then((function() {
								return function(_res1) {
									_g.one_loaded(_item_id1,_load_id,_res1,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})(),(function() {
								return function(_err1) {
									_g.one_failed(_item_id1,_load_id,_err1,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})());
						};
					})(_text));
				} else {
					haxe_Log.trace("   i / parcel / " + ("" + _g.id + " / already had " + _text[0].id + " loaded, skipped"),{ fileName : "Parcel.hx", lineNumber : 215, className : "luxe.Parcel", methodName : "load"});
					_g.one_loaded(_text[0].id,_load_id,_g.system.cache.get(_text[0].id),++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
				}
			}
			var _g12 = 0;
			var _g22 = _g.list.jsons;
			while(_g12 < _g22.length) {
				var _json = [_g22[_g12]];
				++_g12;
				if(!(HxOverrides.indexOf(_g.loaded,_json[0].id,0) != -1)) {
					_g.loaded.push(_json[0].id);
					Luxe.timer.schedule(_g.load_time_spacing * _index,(function(_json) {
						return function() {
							var _item_id2 = _json[0].id;
							var _load2 = _g.system.load_json(_json[0].id);
							_load2.then((function() {
								return function(_res2) {
									_g.one_loaded(_item_id2,_load_id,_res2,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})(),(function() {
								return function(_err2) {
									_g.one_failed(_item_id2,_load_id,_err2,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})());
						};
					})(_json));
				} else {
					haxe_Log.trace("   i / parcel / " + ("" + _g.id + " / already had " + _json[0].id + " loaded, skipped"),{ fileName : "Parcel.hx", lineNumber : 235, className : "luxe.Parcel", methodName : "load"});
					_g.one_loaded(_json[0].id,_load_id,_g.system.cache.get(_json[0].id),++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
				}
			}
			var _g13 = 0;
			var _g23 = _g.list.textures;
			while(_g13 < _g23.length) {
				var _texture = [_g23[_g13]];
				++_g13;
				if(!(HxOverrides.indexOf(_g.loaded,_texture[0].id,0) != -1)) {
					_g.loaded.push(_texture[0].id);
					Luxe.timer.schedule(_g.load_time_spacing * _index,(function(_texture) {
						return function() {
							var _load3 = _g.system.load_texture(_texture[0].id,{ load_premultiply_alpha : _texture[0].load_premultiply_alpha, filter_min : _texture[0].filter_min, filter_mag : _texture[0].filter_mag, clamp_s : _texture[0].clamp_s, clamp_t : _texture[0].clamp_t});
							var _item_id3 = _texture[0].id;
							_load3.then((function() {
								return function(_res3) {
									_g.one_loaded(_item_id3,_load_id,_res3,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})(),(function() {
								return function(_err3) {
									_g.one_failed(_item_id3,_load_id,_err3,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})());
						};
					})(_texture));
				} else {
					haxe_Log.trace("   i / parcel / " + ("" + _g.id + " / already had " + _texture[0].id + " loaded, skipped"),{ fileName : "Parcel.hx", lineNumber : 263, className : "luxe.Parcel", methodName : "load"});
					_g.one_loaded(_texture[0].id,_load_id,_g.system.cache.get(_texture[0].id),++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
				}
			}
			var _g14 = 0;
			var _g24 = _g.list.fonts;
			while(_g14 < _g24.length) {
				var _font = [_g24[_g14]];
				++_g14;
				if(!(HxOverrides.indexOf(_g.loaded,_font[0].id,0) != -1)) {
					_g.loaded.push(_font[0].id);
					Luxe.timer.schedule(_g.load_time_spacing * _index,(function(_font) {
						return function() {
							var _load4 = _g.system.load_font(_font[0].id,{ texture_path : _font[0].texture_path});
							var _item_id4 = _font[0].id;
							_load4.then((function() {
								return function(_res4) {
									_g.one_loaded(_item_id4,_load_id,_res4,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})(),(function() {
								return function(_err4) {
									_g.one_failed(_item_id4,_load_id,_err4,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})());
						};
					})(_font));
				} else {
					haxe_Log.trace("   i / parcel / " + ("" + _g.id + " / already had " + _font[0].id + " loaded, skipped"),{ fileName : "Parcel.hx", lineNumber : 287, className : "luxe.Parcel", methodName : "load"});
					_g.one_loaded(_font[0].id,_load_id,_g.system.cache.get(_font[0].id),++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
				}
			}
			var _g15 = 0;
			var _g25 = _g.list.shaders;
			while(_g15 < _g25.length) {
				var _shader = [_g25[_g15]];
				++_g15;
				if(!(HxOverrides.indexOf(_g.loaded,_shader[0].id,0) != -1)) {
					_g.loaded.push(_shader[0].id);
					Luxe.timer.schedule(_g.load_time_spacing * _index,(function(_shader) {
						return function() {
							var _load5 = _g.system.load_shader(_shader[0].id,{ frag_id : _shader[0].frag_id, vert_id : _shader[0].vert_id});
							var _item_id5 = _shader[0].id;
							_load5.then((function() {
								return function(_res5) {
									_g.one_loaded(_item_id5,_load_id,_res5,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})(),(function() {
								return function(_err5) {
									_g.one_failed(_item_id5,_load_id,_err5,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
								};
							})());
						};
					})(_shader));
				} else {
					haxe_Log.trace("   i / parcel / " + ("" + _g.id + " / already had " + _shader[0].id + " loaded, skipped"),{ fileName : "Parcel.hx", lineNumber : 312, className : "luxe.Parcel", methodName : "load"});
					_g.one_loaded(_shader[0].id,_load_id,_g.system.cache.get(_shader[0].id),++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
				}
			}
			var _g16 = 0;
			var _g26 = _g.list.sounds;
			while(_g16 < _g26.length) {
				var _sound = [_g26[_g16]];
				++_g16;
				if(!Luxe.audio.exists(_sound[0].name)) Luxe.timer.schedule(_g.load_time_spacing * _index,(function(_sound) {
					return function() {
						var _load6 = Luxe.audio.create(_sound[0].id,_sound[0].name,_sound[0].is_stream);
						_load6.then((function(_sound) {
							return function(_) {
								_g.one_loaded(_sound[0].id,_load_id,null,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
							};
						})(_sound),(function(_sound) {
							return function(_err6) {
								_g.one_failed(_sound[0].id,_load_id,_err6,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
							};
						})(_sound));
					};
				})(_sound)); else {
					haxe_Log.trace("   i / parcel / " + ("" + _g.id + " / already had " + _sound[0].id + " (" + _sound[0].name + ") loaded, skipped"),{ fileName : "Parcel.hx", lineNumber : 342, className : "luxe.Parcel", methodName : "load"});
					_g.one_loaded(_sound[0].id,_load_id,null,++_index,_g.list.bytes.length + _g.list.texts.length + _g.list.jsons.length + _g.list.textures.length + _g.list.shaders.length + _g.list.fonts.length + _g.list.sounds.length);
				}
			}
		});
	}
	,one_loaded: function(_item_id,_load_id,_resource,_index,_total) {
		var _state = { id : _item_id, load_id : _load_id, resource : _resource, index : _index, total : _total};
		this.emitter.emit(1,_state);
		if(this.onprogress != null) this.onprogress(_state);
		if(_index == _total) {
			this.state = 2;
			this.time_to_load = snow_Snow.core.timestamp() - this.start_load;
			this.emitter.emit(2,this);
			if(this.oncomplete != null) this.oncomplete(this);
		}
	}
	,one_failed: function(_item_id,_load_id,_error,_index,_total) {
		var _state = { id : _item_id, load_id : _load_id, error : _error, index : _index, total : _total};
		this.emitter.emit(3,_state);
		if(this.onfailed != null) this.onfailed(_state);
	}
	,empty_list: function() {
		return { bytes : [], texts : [], jsons : [], textures : [], fonts : [], shaders : [], sounds : []};
	}
	,__class__: luxe_Parcel
};
var luxe_Physics = function(_core) {
	this.step_rate = 0.016666666666666666;
	this.core = _core;
};
$hxClasses["luxe.Physics"] = luxe_Physics;
luxe_Physics.__name__ = true;
luxe_Physics.prototype = {
	init: function() {
		this.engines = [];
	}
	,reset: function() {
		if(this.timer != null) {
			this.timer.stop();
			this.timer = null;
		}
		if(this.step_rate != 0) this.timer = Luxe.timer.schedule(this.step_rate,$bind(this,this.fixed_update),true);
	}
	,fixed_update: function() {
		Luxe.debug.start(luxe_Physics.tag_physics);
		this.update();
		Luxe.debug.end(luxe_Physics.tag_physics);
	}
	,update: function() {
		var _g = 0;
		var _g1 = this.engines;
		while(_g < _g1.length) {
			var engine = _g1[_g];
			++_g;
			engine.update();
		}
	}
	,process: function() {
		var _g = 0;
		var _g1 = this.engines;
		while(_g < _g1.length) {
			var engine = _g1[_g];
			++_g;
			engine.process();
		}
	}
	,destroy: function() {
		if(this.timer != null) this.timer.stop();
		this.timer = null;
		var _g = 0;
		var _g1 = this.engines;
		while(_g < _g1.length) {
			var engine = _g1[_g];
			++_g;
			engine.destroy();
		}
	}
	,__class__: luxe_Physics
};
var luxe_PhysicsEngine = function() { };
$hxClasses["luxe.PhysicsEngine"] = luxe_PhysicsEngine;
luxe_PhysicsEngine.__name__ = true;
luxe_PhysicsEngine.prototype = {
	process: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,__class__: luxe_PhysicsEngine
};
var luxe_Resources = function() {
	this.parcels = [];
	this.emitter = new luxe_Emitter();
	this.cache = new haxe_ds_StringMap();
	this.stats = new luxe_ResourceStats();
};
$hxClasses["luxe.Resources"] = luxe_Resources;
luxe_Resources.__name__ = true;
luxe_Resources.prototype = {
	track: function(_cache) {
		if(_cache == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_cache was null" + ""));
		if(!(HxOverrides.indexOf(this.parcels,_cache,0) == -1)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("parcels.indexOf(_cache) == -1" + ""));
		this.parcels.push(_cache);
		this.emit(11,_cache);
	}
	,add: function(resource) {
		if(!(!this.cache.exists(resource.id))) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("!cache.exists(resource.id)" + ""));
		this.cache.set(resource.id,resource);
		this.emit(2,resource);
		this.update_stats(resource,1);
	}
	,remove: function(resource) {
		if(!this.cache.exists(resource.id)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("cache.exists(resource.id)" + ""));
		this.emit(7,resource);
		this.update_stats(resource,-1);
		return this.cache.remove(resource.id);
	}
	,on: function(ev,handler) {
		this.emitter.on(ev,handler);
	}
	,emit: function(ev,data) {
		this.emitter.emit(1,data);
		this.emitter.emit(ev,data);
	}
	,load_bytes: function(_id) {
		if(_id == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_id was null" + ""));
		var _resource = this.cache.get(_id);
		if(_resource != null) {
			var _g = _resource;
			var _g1 = _g.ref;
			_g.set_ref(_g1 + 1);
			_g1;
			return snow_api_Promise.resolve(_resource);
		}
		_resource = new luxe_resource_BytesResource({ id : _id, system : this, asset : null});
		this.add(_resource);
		return _resource.reload();
	}
	,load_text: function(_id) {
		if(_id == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_id was null" + ""));
		var _resource = this.cache.get(_id);
		if(_resource != null) {
			var _g = _resource;
			var _g1 = _g.ref;
			_g.set_ref(_g1 + 1);
			_g1;
			return snow_api_Promise.resolve(_resource);
		}
		_resource = new luxe_resource_TextResource({ id : _id, system : this, asset : null});
		this.add(_resource);
		return _resource.reload();
	}
	,load_json: function(_id) {
		if(_id == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_id was null" + ""));
		var _resource = this.cache.get(_id);
		if(_resource != null) {
			var _g = _resource;
			var _g1 = _g.ref;
			_g.set_ref(_g1 + 1);
			_g1;
			return snow_api_Promise.resolve(_resource);
		}
		_resource = new luxe_resource_JSONResource({ id : _id, system : this, asset : null});
		this.add(_resource);
		return _resource.reload();
	}
	,load_texture: function(_id,_options) {
		if(_id == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_id was null" + ""));
		var _resource = this.cache.get(_id);
		if(_resource != null) {
			var _g = _resource;
			var _g1 = _g.ref;
			_g.set_ref(_g1 + 1);
			_g1;
			return snow_api_Promise.resolve(_resource);
		}
		var _filter_min = null;
		var _filter_mag = null;
		var _clamp_s = null;
		var _clamp_t = null;
		var _premultiply = null;
		if(_options != null) {
			_filter_min = _options.filter_min;
			_filter_mag = _options.filter_mag;
			_clamp_s = _options.clamp_s;
			_clamp_t = _options.clamp_t;
			_premultiply = _options.load_premultiply_alpha;
		}
		_resource = new phoenix_Texture({ id : _id, system : this, filter_min : _filter_min, filter_mag : _filter_mag, clamp_s : _clamp_s, clamp_t : _clamp_t, load_premultiply_alpha : _premultiply});
		this.add(_resource);
		return _resource.reload();
	}
	,load_font: function(_id,_options) {
		if(_id == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_id was null" + ""));
		var _resource = this.cache.get(_id);
		if(_resource != null) {
			var _g = _resource;
			var _g1 = _g.ref;
			_g.set_ref(_g1 + 1);
			_g1;
			return snow_api_Promise.resolve(_resource);
		}
		var _texture_path = null;
		if(_options != null) _texture_path = _options.texture_path;
		_resource = new phoenix_BitmapFont({ id : _id, system : this, texture_path : _texture_path});
		this.add(_resource);
		return _resource.reload();
	}
	,load_shader: function(_id,_options) {
		if(_id == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_id was null" + ""));
		var _resource = this.cache.get(_id);
		if(_resource != null) {
			var _g = _resource;
			var _g1 = _g.ref;
			_g.set_ref(_g1 + 1);
			_g1;
			return snow_api_Promise.resolve(_resource);
		}
		_resource = new phoenix_Shader({ id : _id, system : this, frag_id : _options.frag_id, vert_id : _options.vert_id});
		this.add(_resource);
		return _resource.reload();
	}
	,update_stats: function(_res,_offset) {
		var _g = _res.resource_type;
		switch(_g) {
		case 0:
			this.stats.unknown += _offset;
			break;
		case 3:
			this.stats.bytes += _offset;
			break;
		case 1:
			this.stats.texts += _offset;
			break;
		case 2:
			this.stats.jsons += _offset;
			break;
		case 4:
			this.stats.textures += _offset;
			break;
		case 5:
			this.stats.render_textures += _offset;
			break;
		case 6:
			this.stats.fonts += _offset;
			break;
		case 7:
			this.stats.shaders += _offset;
			break;
		}
		this.stats.total += _offset;
	}
	,__class__: luxe_Resources
};
var luxe_ResourceStats = function() {
	this.unknown = 0;
	this.bytes = 0;
	this.jsons = 0;
	this.texts = 0;
	this.shaders = 0;
	this.render_textures = 0;
	this.textures = 0;
	this.fonts = 0;
	this.total = 0;
};
$hxClasses["luxe.ResourceStats"] = luxe_ResourceStats;
luxe_ResourceStats.__name__ = true;
luxe_ResourceStats.prototype = {
	__class__: luxe_ResourceStats
};
var luxe_Scene = function(_name) {
	if(_name == null) _name = "untitled scene";
	this.entity_count = 0;
	this._has_changed = false;
	this.started = false;
	this.inited = false;
	luxe_Objects.call(this,_name);
	this.entities = new haxe_ds_StringMap();
	this._delayed_init_entities = [];
	this._delayed_reset_entities = [];
	Luxe.core.emitter.on(2,$bind(this,this.init));
	Luxe.core.emitter.on(8,$bind(this,this._destroy));
	Luxe.core.emitter.on(6,$bind(this,this.update));
	Luxe.core.emitter.on(9,$bind(this,this.prerender));
	Luxe.core.emitter.on(11,$bind(this,this.postrender));
	Luxe.core.emitter.on(10,$bind(this,this.render));
	Luxe.core.emitter.on(12,$bind(this,this.keydown));
	Luxe.core.emitter.on(13,$bind(this,this.keyup));
	Luxe.core.emitter.on(14,$bind(this,this.textinput));
	Luxe.core.emitter.on(16,$bind(this,this.inputup));
	Luxe.core.emitter.on(15,$bind(this,this.inputdown));
	Luxe.core.emitter.on(18,$bind(this,this.mouseup));
	Luxe.core.emitter.on(17,$bind(this,this.mousedown));
	Luxe.core.emitter.on(19,$bind(this,this.mousemove));
	Luxe.core.emitter.on(20,$bind(this,this.mousewheel));
	Luxe.core.emitter.on(22,$bind(this,this.touchup));
	Luxe.core.emitter.on(21,$bind(this,this.touchdown));
	Luxe.core.emitter.on(23,$bind(this,this.touchmove));
	Luxe.core.emitter.on(26,$bind(this,this.gamepadup));
	Luxe.core.emitter.on(25,$bind(this,this.gamepaddown));
	Luxe.core.emitter.on(24,$bind(this,this.gamepadaxis));
	Luxe.core.emitter.on(27,$bind(this,this.gamepaddevice));
	Luxe.core.emitter.on(29,$bind(this,this.windowmoved));
	Luxe.core.emitter.on(30,$bind(this,this.windowresized));
	Luxe.core.emitter.on(31,$bind(this,this.windowsized));
	Luxe.core.emitter.on(32,$bind(this,this.windowminimized));
	Luxe.core.emitter.on(33,$bind(this,this.windowrestored));
	if(Luxe.core.inited) this.init(null);
	var _view = Luxe.core.debug.get_view("Scenes");
	if(_view != null) _view.add_scene(this);
};
$hxClasses["luxe.Scene"] = luxe_Scene;
luxe_Scene.__name__ = true;
luxe_Scene.__super__ = luxe_Objects;
luxe_Scene.prototype = $extend(luxe_Objects.prototype,{
	handle_duplicate_warning: function(_name) {
		if(this.entities.exists(_name)) haxe_Log.trace("    i / scene / " + ("" + this.get_name() + " / adding a second entity named " + _name + "!\r\n                This will replace the existing one, possibly leaving the previous one in limbo."),{ fileName : "Scene.hx", lineNumber : 91, className : "luxe.Scene", methodName : "handle_duplicate_warning"});
	}
	,add: function(entity) {
		if(entity == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("entity was null" + (" ( " + "can't put entity in a scene if the entity is null." + " )")));
		this.handle_duplicate_warning(entity.get_name());
		entity.set_scene(this);
		var key = entity.get_name();
		this.entities.set(key,entity);
		this.entity_count++;
		if(this.inited) this._delayed_init_entities.push(entity);
		if(this.started) this._delayed_reset_entities.push(entity);
		this._has_changed = true;
	}
	,remove: function(entity) {
		if(entity == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("entity was null" + (" ( " + "can't remove entity from a scene if the entity is null." + " )")));
		this._has_changed = true;
		if(entity.get_scene() == this) {
			entity.set_scene(null);
			this.entity_count--;
			var key = entity.get_name();
			return this.entities.remove(key);
		} else {
			haxe_Log.trace("    i / scene / " + "can't remove the entity from this scene, it is not mine (entity.scene != this)",{ fileName : "Scene.hx", lineNumber : 140, className : "luxe.Scene", methodName : "remove"});
			return false;
		}
		return false;
	}
	,render: function(_) {
		this.emit(10);
	}
	,prerender: function(_) {
		this.emit(9);
	}
	,postrender: function(_) {
		this.emit(11);
	}
	,keydown: function(e) {
		this.emit(12,e);
	}
	,keyup: function(e) {
		this.emit(13,e);
	}
	,textinput: function(e) {
		this.emit(14,e);
	}
	,mousedown: function(e) {
		this.emit(17,e);
	}
	,mousewheel: function(e) {
		this.emit(20,e);
	}
	,mouseup: function(e) {
		this.emit(18,e);
	}
	,mousemove: function(e) {
		this.emit(19,e);
	}
	,touchdown: function(event) {
		this.emit(21,event);
	}
	,touchup: function(event) {
		this.emit(22,event);
	}
	,touchmove: function(event) {
		this.emit(23,event);
	}
	,gamepadaxis: function(event) {
		this.emit(24,event);
	}
	,gamepadup: function(event) {
		this.emit(26,event);
	}
	,gamepaddown: function(event) {
		this.emit(25,event);
	}
	,gamepaddevice: function(event) {
		this.emit(27,event);
	}
	,windowmoved: function(event) {
		this.emit(29,event);
	}
	,windowresized: function(event) {
		this.emit(30,event);
	}
	,windowsized: function(event) {
		this.emit(31,event);
	}
	,windowminimized: function(event) {
		this.emit(32,event);
	}
	,windowrestored: function(event) {
		this.emit(33,event);
	}
	,inputdown: function(event) {
		this.emit(15,event);
	}
	,inputup: function(event) {
		this.emit(16,event);
	}
	,_destroy: function(_) {
		this.destroy();
	}
	,destroy: function() {
		Luxe.core.emitter.off(2,$bind(this,this.init));
		Luxe.core.emitter.off(8,$bind(this,this._destroy));
		Luxe.core.emitter.off(6,$bind(this,this.update));
		Luxe.core.emitter.off(9,$bind(this,this.prerender));
		Luxe.core.emitter.off(11,$bind(this,this.postrender));
		Luxe.core.emitter.off(10,$bind(this,this.render));
		Luxe.core.emitter.off(12,$bind(this,this.keydown));
		Luxe.core.emitter.off(13,$bind(this,this.keyup));
		Luxe.core.emitter.off(14,$bind(this,this.textinput));
		Luxe.core.emitter.off(16,$bind(this,this.inputup));
		Luxe.core.emitter.off(15,$bind(this,this.inputdown));
		Luxe.core.emitter.off(18,$bind(this,this.mouseup));
		Luxe.core.emitter.off(17,$bind(this,this.mousedown));
		Luxe.core.emitter.off(19,$bind(this,this.mousemove));
		Luxe.core.emitter.off(20,$bind(this,this.mousewheel));
		Luxe.core.emitter.off(22,$bind(this,this.touchup));
		Luxe.core.emitter.off(21,$bind(this,this.touchdown));
		Luxe.core.emitter.off(23,$bind(this,this.touchmove));
		Luxe.core.emitter.off(26,$bind(this,this.gamepadup));
		Luxe.core.emitter.off(25,$bind(this,this.gamepaddown));
		Luxe.core.emitter.off(24,$bind(this,this.gamepadaxis));
		Luxe.core.emitter.off(27,$bind(this,this.gamepaddevice));
		Luxe.core.emitter.off(29,$bind(this,this.windowmoved));
		Luxe.core.emitter.off(30,$bind(this,this.windowresized));
		Luxe.core.emitter.off(31,$bind(this,this.windowsized));
		Luxe.core.emitter.off(32,$bind(this,this.windowminimized));
		Luxe.core.emitter.off(33,$bind(this,this.windowrestored));
		this.emit(8);
		var _view = Luxe.core.debug.get_view("Scenes");
		if(_view != null) _view.remove_scene(this);
	}
	,_do_init: function() {
		var _before_count = this.get_length();
		if(this.entity_count > 0) {
			var $it0 = this.entities.iterator();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				if(entity != null) {
					if(!entity.inited) entity._init();
				}
			}
		}
		var _after_count = this.get_length();
		return _before_count != _after_count;
	}
	,init: function(_) {
		var keep_going = true;
		while(keep_going) keep_going = this._do_init();
		this.inited = true;
		this.emit(2);
		this.reset();
	}
	,reset: function() {
		this.started = false;
		this.emit(3);
		this.started = true;
	}
	,update: function(dt) {
		Luxe.core.debug.start("scene." + this.get_name());
		this.handle_delayed_additions();
		this.emit(6,dt);
		if(this.entity_count > 0) {
			var $it0 = this.entities.iterator();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				if(entity != null) entity._update(dt);
			}
		}
		Luxe.core.debug.end("scene." + this.get_name());
	}
	,handle_delayed_additions: function() {
		if(this._delayed_init_entities.length != 0 || this._delayed_reset_entities.length != 0) null;
		if(this._delayed_init_entities.length > 0) {
			var _g = 0;
			var _g1 = this._delayed_init_entities;
			while(_g < _g1.length) {
				var entity = _g1[_g];
				++_g;
				if(!entity.inited) entity._init(); else null;
			}
			this._delayed_init_entities.splice(0,this._delayed_init_entities.length);
		}
		if(this._delayed_reset_entities.length > 0) {
			var _g2 = 0;
			var _g11 = this._delayed_reset_entities;
			while(_g2 < _g11.length) {
				var entity1 = _g11[_g2];
				++_g2;
				entity1._reset(null);
			}
			this._delayed_reset_entities.splice(0,this._delayed_reset_entities.length);
		}
	}
	,get_length: function() {
		return Lambda.count(this.entities);
	}
	,__class__: luxe_Scene
	,__properties__: $extend(luxe_Objects.prototype.__properties__,{get_length:"get_length"})
});
var luxe_Screen = function(_core,_w,_h) {
	this.core = _core;
	this.cursor = new luxe_Cursor(this);
	this.width = _w;
	this.height = _h;
};
$hxClasses["luxe.Screen"] = luxe_Screen;
luxe_Screen.__name__ = true;
luxe_Screen.prototype = {
	internal_resized: function(_w,_h) {
		this.width = _w;
		this.height = _h;
	}
	,get_w: function() {
		return this.width | 0;
	}
	,get_h: function() {
		return this.height | 0;
	}
	,__class__: luxe_Screen
	,__properties__: {get_h:"get_h",get_w:"get_w"}
};
var luxe_Cursor = function(_screen) {
	this.ignore = false;
	this.grab = false;
	this.visible = true;
	this.screen = _screen;
	this.set_pos(new phoenix_Vector());
};
$hxClasses["luxe.Cursor"] = luxe_Cursor;
luxe_Cursor.__name__ = true;
luxe_Cursor.prototype = {
	set_internal: function(_pos) {
		this.ignore = true;
		this.set_pos(_pos);
		this.ignore = false;
	}
	,get_visible: function() {
		return this.visible;
	}
	,set_visible: function(_visible) {
		this.screen.core.app.windowing.enable_cursor(_visible);
		return this.visible = _visible;
	}
	,get_grab: function() {
		return this.grab;
	}
	,set_grab: function(_grab) {
		this.screen.core.app.window.set_grab(_grab);
		return this.grab = _grab;
	}
	,get_pos: function() {
		return this.pos;
	}
	,set_pos: function(_p) {
		if(this.get_pos() != null && _p != null && !this.ignore) this.screen.core.app.window.set_cursor_position(_p.x | 0,_p.y | 0);
		return this.pos = _p;
	}
	,__class__: luxe_Cursor
	,__properties__: {set_pos:"set_pos",get_pos:"get_pos",set_grab:"set_grab",get_grab:"get_grab",set_visible:"set_visible",get_visible:"get_visible"}
};
var luxe_Sprite = function(options) {
	this.flipy = false;
	this.flipx = false;
	this.centered = true;
	this.set_uv(new phoenix_Rectangle());
	if(options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("options was null" + (" ( " + "Sprite requires non-null options" + " )")));
	if(options.centered != null) this.set_centered(options.centered);
	if(options.flipx != null) this.set_flipx(options.flipx);
	if(options.flipy != null) this.set_flipy(options.flipy);
	luxe_Visual.call(this,options);
};
$hxClasses["luxe.Sprite"] = luxe_Sprite;
luxe_Sprite.__name__ = true;
luxe_Sprite.__super__ = luxe_Visual;
luxe_Sprite.prototype = $extend(luxe_Visual.prototype,{
	on_geometry_created: function() {
		luxe_Visual.prototype.on_geometry_created.call(this);
		if(this.texture != null) {
			this.set_uv((function($this) {
				var $r;
				if($this.options.uv == null) $this.options.uv = new phoenix_Rectangle(0,0,$this.texture.width,$this.texture.height);
				$r = $this.options.uv;
				return $r;
			}(this)));
			if(this.texture.resource_type == 5) this.set_flipy(true);
		}
		this.set_centered(!(!this.centered));
		this.set_flipx(!(!this.flipx));
		this.set_flipy(!(!this.flipy));
	}
	,set_geometry: function(_g) {
		this.geometry_quad = _g;
		return luxe_Visual.prototype.set_geometry.call(this,_g);
	}
	,set_uv: function(_uv) {
		if(this.geometry_quad != null) this.geometry_quad.uv(_uv);
		this.uv = _uv;
		phoenix_Rectangle.listen(this.uv,$bind(this,this._uv_change));
		return this.uv;
	}
	,set_flipy: function(_v) {
		if(_v == this.flipy) return this.flipy;
		if(this.geometry_quad != null) this.geometry_quad.set_flipy(_v);
		return this.flipy = _v;
	}
	,set_flipx: function(_v) {
		if(_v == this.flipx) return this.flipx;
		if(this.geometry_quad != null) this.geometry_quad.set_flipx(_v);
		return this.flipx = _v;
	}
	,set_size: function(_v) {
		if(this.geometry_quad != null) {
			this.geometry_quad.resize(new phoenix_Vector(_v.x,_v.y));
			if(!this._has_custom_origin) {
				if(this.centered) this.set_origin(new phoenix_Vector(_v.x,_v.y,_v.z,_v.w).divideScalar(2));
			}
		}
		return luxe_Visual.prototype.set_size.call(this,_v);
	}
	,set_centered: function(_c) {
		if(this.size != null) {
			if(_c) this.set_origin(new phoenix_Vector(this.size.x / 2,this.size.y / 2)); else this.set_origin(new phoenix_Vector());
		}
		return this.centered = _c;
	}
	,_uv_change: function(_v) {
		this.set_uv(this.uv);
	}
	,init: function() {
		luxe_Visual.prototype.init.call(this);
	}
	,ondestroy: function() {
		luxe_Visual.prototype.ondestroy.call(this);
	}
	,__class__: luxe_Sprite
	,__properties__: $extend(luxe_Visual.prototype.__properties__,{set_uv:"set_uv",set_flipy:"set_flipy",set_flipx:"set_flipx",set_centered:"set_centered"})
});
var luxe_Text = function(_options) {
	this.text_options = _options;
	this.text_bounds = new phoenix_Rectangle();
	var _batcher = null;
	if(_options.no_batcher_add == null || _options.no_batcher_add == false) {
		if(_options.batcher != null) _batcher = _options.batcher; else _batcher = Luxe.renderer.batcher;
	}
	this.geom = new phoenix_geometry_TextGeometry({ batcher : _batcher, depth : _options.depth, visible : _options.visible, immediate : _options.immediate, color : _options.color, shader : _options.shader, texture : _options.texture, text : _options.text, font : _options.font, point_size : _options.point_size, line_spacing : _options.line_spacing, letter_spacing : _options.letter_spacing, bounds : _options.bounds, bounds_wrap : _options.bounds_wrap, align : _options.align, align_vertical : _options.align_vertical, sdf : _options.sdf, smoothness : _options.smoothness, thickness : _options.thickness, outline : _options.outline, outline_color : _options.outline_color, glow_threshold : _options.glow_threshold, glow_amount : _options.glow_amount, glow_color : _options.glow_color});
	this.geom.emitter.on(1,$bind(this,this.on_geom_text_update));
	_options.geometry = this.geom;
	_options.shader = this.geom.state.shader;
	luxe_Visual.call(this,_options);
	this._update_bounds();
};
$hxClasses["luxe.Text"] = luxe_Text;
luxe_Text.__name__ = true;
luxe_Text.__super__ = luxe_Visual;
luxe_Text.prototype = $extend(luxe_Visual.prototype,{
	get_text: function() {
		return this.geom.text;
	}
	,set_text: function(_s) {
		return this.geom.set_text(_s);
	}
	,get_bounds: function() {
		return this.geom.bounds;
	}
	,set_bounds: function(_b) {
		return this.geom.set_bounds(_b);
	}
	,get_align: function() {
		return this.geom.align;
	}
	,get_align_vertical: function() {
		return this.geom.align_vertical;
	}
	,set_pos_from_transform: function(_p) {
		luxe_Visual.prototype.set_pos_from_transform.call(this,_p);
		this._update_bounds();
		this.text_options.pos = this.get_pos();
	}
	,on_geom_text_update: function(_) {
		this._update_bounds();
	}
	,_update_bounds: function() {
		var _x = this.get_pos().x;
		var _y = this.get_pos().y;
		var _tw = this.geom.text_width;
		var _th = this.geom.text_height;
		var _bw = this.geom.text_width;
		var _bh = this.geom.text_height;
		if(this.get_bounds() != null) {
			_bh = this.get_bounds().h;
			_bw = this.get_bounds().w;
			_x = this.get_bounds().x;
			_y = this.get_bounds().y;
			var _g = this.get_align();
			switch(_g) {
			case 2:
				_x += _tw / 2;
				break;
			case 1:
				_x += _tw;
				break;
			default:
				_x += 0.0;
			}
			var _g1 = this.get_align_vertical();
			switch(_g1) {
			case 2:
				_y += _bh / 2 - _th / 2;
				break;
			case 4:
				_y += _bh - _th;
				break;
			default:
				_y += 0.0;
			}
		} else {
			var _g2 = this.get_align();
			switch(_g2) {
			case 2:
				_x -= _tw / 2;
				break;
			case 1:
				_x -= _tw;
				break;
			default:
				_x -= 0.0;
			}
			var _g3 = this.get_align_vertical();
			switch(_g3) {
			case 2:
				_y -= _th / 2;
				break;
			case 4:
				_y -= _th;
				break;
			default:
				_y -= 0.0;
			}
		}
		this.text_bounds.set(_x,_y,_tw,_th);
	}
	,init: function() {
		luxe_Visual.prototype.init.call(this);
	}
	,ondestroy: function() {
		luxe_Visual.prototype.ondestroy.call(this);
	}
	,__class__: luxe_Text
	,__properties__: $extend(luxe_Visual.prototype.__properties__,{get_align_vertical:"get_align_vertical",get_align:"get_align",set_bounds:"set_bounds",get_bounds:"get_bounds",set_text:"set_text",get_text:"get_text"})
});
var luxe_Timer = function(_core) {
	this.core = _core;
	this.timers = [];
};
$hxClasses["luxe.Timer"] = luxe_Timer;
luxe_Timer.__name__ = true;
luxe_Timer.prototype = {
	init: function() {
		null;
	}
	,destroy: function() {
		this.reset();
		null;
	}
	,process: function() {
	}
	,reset: function() {
		var _g = 0;
		var _g1 = this.timers;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.stop();
			t = null;
		}
		this.timers = null;
		this.timers = [];
	}
	,schedule: function(_time_in_seconds,_on_time,repeat) {
		if(repeat == null) repeat = false;
		var _g = this;
		var t = new snow_api_Timer(_time_in_seconds);
		t.run = function() {
			if(!repeat) {
				t.stop();
				HxOverrides.remove(_g.timers,t);
			}
			_on_time();
		};
		this.timers.push(t);
		return t;
	}
	,__class__: luxe_Timer
};
var luxe_components_Components = function(_entity) {
	var _map = new haxe_ds_StringMap();
	this.components = new luxe_structural_OrderedMap(_map);
	this.entity = _entity;
};
$hxClasses["luxe.components.Components"] = luxe_components_Components;
luxe_components_Components.__name__ = true;
luxe_components_Components.prototype = {
	__class__: luxe_components_Components
};
var luxe_debug_DebugView = function() {
	this.visible = false;
	luxe_Objects.call(this);
};
$hxClasses["luxe.debug.DebugView"] = luxe_debug_DebugView;
luxe_debug_DebugView.__name__ = true;
luxe_debug_DebugView.__super__ = luxe_Objects;
luxe_debug_DebugView.prototype = $extend(luxe_Objects.prototype,{
	refresh: function() {
	}
	,process: function() {
	}
	,onmousedown: function(e) {
	}
	,onmousewheel: function(e) {
	}
	,onmouseup: function(e) {
	}
	,onmousemove: function(e) {
	}
	,onkeydown: function(e) {
	}
	,onkeyup: function(e) {
	}
	,onwindowsized: function(e) {
	}
	,create: function() {
	}
	,show: function() {
		this.visible = true;
	}
	,hide: function() {
		this.visible = false;
	}
	,__class__: luxe_debug_DebugView
});
var luxe_debug_Inspector = function(_options) {
	this.set_size(new phoenix_Vector(Std["int"](Luxe.core.screen.get_w() * 0.2),Std["int"](Luxe.core.screen.get_h() * 0.6)));
	this.set_pos(new phoenix_Vector(Luxe.core.screen.get_w() / 2 - this.size.x / 2,Luxe.core.screen.get_h() / 2 - this.size.y / 2));
	this.batcher = Luxe.renderer.batcher;
	if(_options != null) {
		if(_options.batcher != null) this.batcher = _options.batcher;
		if(_options.size != null) this.set_size(_options.size);
		if(_options.pos != null) this.set_pos(_options.pos);
	}
};
$hxClasses["luxe.debug.Inspector"] = luxe_debug_Inspector;
luxe_debug_Inspector.__name__ = true;
luxe_debug_Inspector.prototype = {
	refresh: function() {
		if(this.window == null) this.create_window();
		if(this.onrefresh != null) this.onrefresh();
	}
	,show: function() {
		this.refresh();
		this.window.set_visible(true);
		this.title.set_visible(true);
		this.version.set_visible(true);
	}
	,hide: function() {
		this.window.set_visible(false);
		this.title.set_visible(false);
		this.version.set_visible(false);
	}
	,set_size: function(_size) {
		if(_size != null && this.window != null) {
			this.window.set_size(_size);
			this.window.geometry.set_dirty(true);
		}
		if(this.version != null) this.version.set_pos(new phoenix_Vector(this.pos.x + (_size.x - 14),this.pos.y + 6));
		return this.size = _size;
	}
	,set_pos: function(_pos) {
		if(_pos != null && this.window != null) {
			this.window.set_pos(_pos);
			this.window.geometry.set_dirty(true);
		}
		if(this.title != null) this.title.set_pos(new phoenix_Vector(_pos.x + 14,_pos.y + 6));
		if(this.version != null) this.version.set_pos(new phoenix_Vector(_pos.x + (this.size.x - 14),_pos.y + 6));
		return this.pos = _pos;
	}
	,create_window: function() {
		this.window = new luxe_Sprite({ name : "debug.window", batcher : this.batcher, no_scene : true, depth : 999.1, visible : false, color : new phoenix_Color().rgb(1447449), centered : false, size : this.size, pos : this.pos});
		this.title = new luxe_Text({ name : "debug.title", batcher : this.batcher, no_scene : true, depth : 999.2, visible : false, color : new phoenix_Color().rgb(16121979), pos : new phoenix_Vector(this.pos.x + 14,this.pos.y + 6), text : "Inspector", point_size : 15, align : 0});
		this.version = new luxe_Text({ name : "debug.version", batcher : this.batcher, no_scene : true, depth : 999.2, visible : false, color : new phoenix_Color().rgb(5526617), pos : new phoenix_Vector(this.pos.x + (this.size.x - 14),this.pos.y + 6), text : "" + Luxe.core.runtime_info(), point_size : 13, align : 1});
		this.window.set_locked(true);
		this.window.geometry.id = "debug.Inspector";
		this.title.geometry.id = "debug.title.text";
		this.version.geometry.id = "debug.version.text";
	}
	,__class__: luxe_debug_Inspector
	,__properties__: {set_size:"set_size",set_pos:"set_pos"}
};
var phoenix_Color = function(_r,_g,_b,_a) {
	if(_a == null) _a = 1.0;
	if(_b == null) _b = 1.0;
	if(_g == null) _g = 1.0;
	if(_r == null) _r = 1.0;
	this.refreshing = false;
	this.is_hsv = false;
	this.is_hsl = false;
	this.a = 1.0;
	this.b = 1.0;
	this.g = 1.0;
	this.r = 1.0;
	this.set_r(_r);
	this.set_g(_g);
	this.set_b(_b);
	this.a = _a;
};
$hxClasses["phoenix.Color"] = phoenix_Color;
phoenix_Color.__name__ = true;
phoenix_Color.prototype = {
	set_r: function(_r) {
		this.r = _r;
		if(!this.refreshing) {
			if(this.is_hsl) {
				var colorhsl = this;
				colorhsl.fromColor(this);
			} else if(this.is_hsv) {
				var colorhsv = this;
				colorhsv.fromColor(this);
			}
		}
		return this.r;
	}
	,set_g: function(_g) {
		this.g = _g;
		if(!this.refreshing) {
			if(this.is_hsl) {
				var colorhsl = this;
				colorhsl.fromColor(this);
			} else if(this.is_hsv) {
				var colorhsv = this;
				colorhsv.fromColor(this);
			}
		}
		return this.g;
	}
	,set_b: function(_b) {
		this.b = _b;
		if(!this.refreshing) {
			if(this.is_hsl) {
				var colorhsl = this;
				colorhsl.fromColor(this);
			} else if(this.is_hsv) {
				var colorhsv = this;
				colorhsv.fromColor(this);
			}
		}
		return this.b;
	}
	,maxRGB: function() {
		return Math.max(this.r,Math.max(this.g,this.b));
	}
	,minRGB: function() {
		return Math.min(this.r,Math.min(this.g,this.b));
	}
	,rgb: function(_rgb) {
		if(_rgb == null) _rgb = 16777215;
		this.from_int(_rgb);
		return this;
	}
	,fromColorHSV: function(_color_hsv) {
		var d = _color_hsv.h % 360 / 60;
		if(d < 0) d += 6;
		var hf = Math.floor(d);
		var hi = hf % 6;
		var f = d - hf;
		var v = _color_hsv.v;
		var p = _color_hsv.v * (1 - _color_hsv.s);
		var q = _color_hsv.v * (1 - f * _color_hsv.s);
		var t = _color_hsv.v * (1 - (1 - f) * _color_hsv.s);
		switch(hi) {
		case 0:
			this.set_r(v);
			this.set_g(t);
			this.set_b(p);
			break;
		case 1:
			this.set_r(q);
			this.set_g(v);
			this.set_b(p);
			break;
		case 2:
			this.set_r(p);
			this.set_g(v);
			this.set_b(t);
			break;
		case 3:
			this.set_r(p);
			this.set_g(q);
			this.set_b(v);
			break;
		case 4:
			this.set_r(t);
			this.set_g(p);
			this.set_b(v);
			break;
		case 5:
			this.set_r(v);
			this.set_g(p);
			this.set_b(q);
			break;
		}
		this.a = _color_hsv.a;
	}
	,fromColorHSL: function(_color_hsl) {
		var q = 1;
		if(_color_hsl.l < 0.5) q = _color_hsl.l * (1 + _color_hsl.s); else q = _color_hsl.l + _color_hsl.s - _color_hsl.l * _color_hsl.s;
		var p = 2 * _color_hsl.l - q;
		var hk = _color_hsl.h % 360 / 360;
		var tr = hk + 0.33333333333333331;
		var tg = hk;
		var tb = hk - 0.33333333333333331;
		var tc = [tr,tg,tb];
		var _g1 = 0;
		var _g = tc.length;
		while(_g1 < _g) {
			var n = _g1++;
			var t = tc[n];
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 0.16666666666666666) tc[n] = p + (q - p) * 6 * t; else if(t < 0.5) tc[n] = q; else if(t < 0.66666666666666663) tc[n] = p + (q - p) * 6 * (0.66666666666666663 - t); else tc[n] = p;
		}
		this.set_r(tc[0]);
		this.set_g(tc[1]);
		this.set_b(tc[2]);
		this.a = _color_hsl.a;
		return this;
	}
	,from_int: function(_i) {
		var _r = _i >> 16;
		var _g = _i >> 8 & 255;
		var _b = _i & 255;
		this.set_r(_r / 255);
		this.set_g(_g / 255);
		this.set_b(_b / 255);
	}
	,__class__: phoenix_Color
	,__properties__: {set_b:"set_b",set_g:"set_g",set_r:"set_r"}
};
var luxe_debug_ProfilerDebugView = function() {
	this._setup = false;
	luxe_debug_DebugView.call(this);
	this.set_name("Profiler");
	luxe_debug_ProfilerDebugView.lists = new haxe_ds_StringMap();
};
$hxClasses["luxe.debug.ProfilerDebugView"] = luxe_debug_ProfilerDebugView;
luxe_debug_ProfilerDebugView.__name__ = true;
luxe_debug_ProfilerDebugView.start = function(_id,_max) {
	var _item = luxe_debug_ProfilerDebugView.lists.get(_id);
	if(_item == null) {
		_item = new luxe_debug__$ProfilerDebugView_ProfilerValue(_id,new luxe_debug__$ProfilerDebugView_ProfilerBar(_id,_max,new phoenix_Color().rgb(16121979)));
		_item.bar.set_pos(new phoenix_Vector(Luxe.debug.padding.x * 2,Luxe.debug.padding.y * 3 + Lambda.count(luxe_debug_ProfilerDebugView.lists) * 20));
		luxe_debug_ProfilerDebugView.lists.set(_id,_item);
	}
	_item.start = snow_Snow.core.timestamp();
};
luxe_debug_ProfilerDebugView.end = function(_id) {
	var _item = luxe_debug_ProfilerDebugView.lists.get(_id);
	if(_item != null) _item.set(); else throw new js__$Boot_HaxeError("Debug / profile end called for " + _id + " but no start called");
};
luxe_debug_ProfilerDebugView.__super__ = luxe_debug_DebugView;
luxe_debug_ProfilerDebugView.prototype = $extend(luxe_debug_DebugView.prototype,{
	create: function() {
	}
	,process: function() {
	}
	,show: function() {
		var $it0 = luxe_debug_ProfilerDebugView.lists.iterator();
		while( $it0.hasNext() ) {
			var _item = $it0.next();
			if(!_item.hidden) _item.bar.show();
		}
		if(!this._setup) this._setup = true;
	}
	,hide: function() {
		var $it0 = luxe_debug_ProfilerDebugView.lists.iterator();
		while( $it0.hasNext() ) {
			var _item = $it0.next();
			_item.bar.hide();
		}
	}
	,__class__: luxe_debug_ProfilerDebugView
});
var luxe_debug__$ProfilerDebugView_ProfilerValue = function(_name,_bar) {
	this.accum = 0;
	this.count = 0;
	this.hidden = false;
	this.avg = 10;
	this.start = 0.0;
	this.name = _name;
	this.bar = _bar;
	this.history = [];
	this.offsets = [];
};
$hxClasses["luxe.debug._ProfilerDebugView.ProfilerValue"] = luxe_debug__$ProfilerDebugView_ProfilerValue;
luxe_debug__$ProfilerDebugView_ProfilerValue.__name__ = true;
luxe_debug__$ProfilerDebugView_ProfilerValue.prototype = {
	set: function() {
		var _t = snow_Snow.core.timestamp() - this.start;
		var _g = 0;
		var _g1 = this.offsets;
		while(_g < _g1.length) {
			var _offset = _g1[_g];
			++_g;
			_t -= _offset.history[_offset.history.length - 1];
		}
		this.history.push(_t);
		if(this.history.length > this.avg) this.history.shift();
		this.count++;
		if(this.count == this.avg) {
			var __t = this.accum / this.avg;
			this.bar.set_value(__t);
			this.accum = 0;
			this.count = 0;
		}
		this.accum += _t;
		if(this.bar.visible) this.bar.set_text(Std.string(luxe_utils_Maths.fixed(_t * 1000,4)));
	}
	,__class__: luxe_debug__$ProfilerDebugView_ProfilerValue
};
var luxe_debug__$ProfilerDebugView_ProfilerGraph = function(_name,_bg) {
	if(_bg == null) _bg = true;
	this.visible = false;
	this.history = 33;
	this.height2 = 8;
	this.height = 8;
	this.width = 128;
	this.bg = true;
	this.bg = _bg;
	this.name = _name;
	this.color = new phoenix_Color();
	this.set_max(luxe_utils_Maths.fixed(16.666666666666668,2));
};
$hxClasses["luxe.debug._ProfilerDebugView.ProfilerGraph"] = luxe_debug__$ProfilerDebugView_ProfilerGraph;
luxe_debug__$ProfilerDebugView_ProfilerGraph.__name__ = true;
luxe_debug__$ProfilerDebugView_ProfilerGraph.prototype = {
	create: function() {
		this.segment = this.width / this.history;
		this.height2 = this.height * 2;
		if(this.bg) this.graphbg_geometry = Luxe.draw.box({ color : new phoenix_Color().rgb(1052688), depth : 999.3, batcher : Luxe.debug.batcher, x : 0, y : 0, w : this.width - this.segment, h : this.height2});
		this.graph_geometry = new phoenix_geometry_Geometry({ color : this.color, depth : 999.33, batcher : Luxe.debug.batcher});
		var _g1 = 0;
		var _g = this.history;
		while(_g1 < _g) {
			var i = _g1++;
			var _b = new phoenix_geometry_Vertex(new phoenix_Vector(this.segment * i,this.height2),this.color);
			this.graph_geometry.add(_b);
		}
		this.graph_geometry.set_primitive_type(3);
		this.hide();
	}
	,set_max: function(_v) {
		var oldmax = this.max;
		this.max = _v;
		if(this.graph_geometry != null) {
			var ratio = 1.0;
			if(oldmax != 0) ratio = oldmax / _v;
			var _g = 0;
			var _g1 = this.graph_geometry.vertices;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				if(v != null) {
					var vp = 1.0 - v.pos.y / this.height2;
					var vv = vp * oldmax;
					vp = vv / this.max;
					v.pos.set_y(this.height2 * (1.0 - vp));
				}
			}
		}
		return this.max;
	}
	,set_ping: function(_v) {
		var _vv = luxe_utils_Maths.fixed(_v,4);
		var _p = _vv / this.max;
		var _g1 = 0;
		var _g = this.history;
		while(_g1 < _g) {
			var i = _g1++;
			var v = this.graph_geometry.vertices[i];
			if(i < this.history - 1) {
				var v1 = this.graph_geometry.vertices[i + 1];
				if(v1 != null) {
					v.pos.set_y(Math.floor(v1.pos.y));
					v.color = v1.color;
				}
			}
		}
		if(_p < 0.001) _p = 0.001; else if(_p > 1) _p = 1; else _p = _p;
		if(_p > 1) this.graph_geometry.vertices[this.history - 1].color = luxe_debug_ProfilerDebugView.color_red; else if(_p < 0.2) this.graph_geometry.vertices[this.history - 1].color = luxe_debug_ProfilerDebugView.color_green; else this.graph_geometry.vertices[this.history - 1].color = this.color;
		this.graph_geometry.vertices[this.history - 1].pos.set_y(Math.floor(this.height2 * (1.0 - _p)));
		return this.ping = _v;
	}
	,hide: function() {
		this.visible = false;
		this.graph_geometry.set_visible(false);
		if(this.graphbg_geometry != null) this.graphbg_geometry.set_visible(false);
	}
	,show: function() {
		this.visible = true;
		this.graph_geometry.set_visible(true);
		if(this.graphbg_geometry != null) this.graphbg_geometry.set_visible(true);
	}
	,set_pos: function(_p) {
		if(this.graphbg_geometry != null) this.graphbg_geometry.transform.local.pos.copy_from(_p);
		this.graph_geometry.transform.local.pos.copy_from(_p);
		return this.pos = _p;
	}
	,__class__: luxe_debug__$ProfilerDebugView_ProfilerGraph
	,__properties__: {set_pos:"set_pos",set_ping:"set_ping",set_max:"set_max"}
};
var luxe_debug__$ProfilerDebugView_ProfilerBar = function(_name,_max,_color) {
	this.max = 16.7;
	this.height = 8;
	this.visible = false;
	this.name = _name;
	this.graph = new luxe_debug__$ProfilerDebugView_ProfilerGraph(_name);
	this.graph.create();
	if(_max != null) this.graph.set_max(_max);
	this.text_item = new luxe_Text({ no_scene : true, name : "profiler.text." + _name, pos : new phoenix_Vector(0,0), color : _color, point_size : this.height * 1.8, depth : 999.3, text : "", batcher : Luxe.debug.batcher});
	this.bg_geometry = Luxe.draw.box({ color : new phoenix_Color().rgb(592137), depth : 999.3, batcher : Luxe.debug.batcher, x : 0, y : 0, w : this.graph.width, h : this.graph.height});
	this.bar_geometry = Luxe.draw.box({ color : _color, depth : 999.33, batcher : Luxe.debug.batcher, x : 1, y : 1, w : this.graph.width - 2, h : this.graph.height - 2});
	this.hide();
};
$hxClasses["luxe.debug._ProfilerDebugView.ProfilerBar"] = luxe_debug__$ProfilerDebugView_ProfilerBar;
luxe_debug__$ProfilerDebugView_ProfilerBar.__name__ = true;
luxe_debug__$ProfilerDebugView_ProfilerBar.prototype = {
	hide: function() {
		this.visible = false;
		this.bar_geometry.set_visible(false);
		this.bg_geometry.set_visible(false);
		this.text_item.set_visible(false);
		this.graph.hide();
	}
	,show: function() {
		this.visible = true;
		this.bar_geometry.set_visible(true);
		this.bg_geometry.set_visible(true);
		this.text_item.set_visible(true);
		this.graph.show();
	}
	,set_value: function(_v) {
		this.graph.set_ping(_v * 1000);
		if(!this.visible) return this.value = _v;
		var _vv = luxe_utils_Maths.fixed(_v * 1000,4);
		var _p = _vv / this.max;
		if(_p < 0.005) _p = 0.005; else if(_p > 1) _p = 1; else _p = _p;
		if(_p > 1) this.bar_geometry.set_color(luxe_debug_ProfilerDebugView.color_red); else if(_p < 0.15) this.bar_geometry.set_color(luxe_debug_ProfilerDebugView.color_green); else this.bar_geometry.set_color(luxe_debug_ProfilerDebugView.color_normal);
		var nx = (this.graph.width - 2) * _p;
		this.bar_geometry.resize_xy(nx,this.graph.height - 2);
		return this.value = _v;
	}
	,set_pos: function(_p) {
		this.bg_geometry.transform.local.set_pos(_p);
		this.bar_geometry.transform.local.pos.set_xy(_p.x + 1,_p.y + 1);
		this.text_item.get_pos().set_xy(_p.x + this.graph.width * 2 + 10,_p.y - 6);
		this.graph.set_pos(new phoenix_Vector(_p.x,_p.y,_p.z,_p.w).add_xyz(this.graph.width + 2,-this.graph.height + 4,null));
		return this.pos = _p;
	}
	,set_text: function(_t) {
		this.text_item.set_text("" + this.name + " (" + this.graph.max + "ms) | " + _t + "ms");
		return this.text = _t;
	}
	,__class__: luxe_debug__$ProfilerDebugView_ProfilerBar
	,__properties__: {set_value:"set_value",set_pos:"set_pos",set_text:"set_text"}
};
var luxe_debug_SceneDebugView = function() {
	this.hide_ids = true;
	this.font_size = 15.0;
	this.margin = 32;
	luxe_debug_DebugView.call(this);
	this.set_name("Scenes");
	this.scenes = [];
};
$hxClasses["luxe.debug.SceneDebugView"] = luxe_debug_SceneDebugView;
luxe_debug_SceneDebugView.__name__ = true;
luxe_debug_SceneDebugView.__super__ = luxe_debug_DebugView;
luxe_debug_SceneDebugView.prototype = $extend(luxe_debug_DebugView.prototype,{
	create: function() {
		var debug = Luxe.debug;
		this.items_list = new luxe_Text({ name : "debug.scene.list", depth : 999.3, no_scene : true, color : new phoenix_Color(0,0,0,1).rgb(16121979), pos : new phoenix_Vector(0,0), font : Luxe.renderer.font, text : this.get_list(), point_size : this.font_size, batcher : debug.batcher, visible : false});
		this.items_list.geometry.id = "debug.scene.list.geometry";
		this.resize();
	}
	,add_scene: function(_scene) {
		if(!(HxOverrides.indexOf(this.scenes,_scene,0) == -1)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("scenes.indexOf(_scene) == -1" + ""));
		this.scenes.push(_scene);
	}
	,remove_scene: function(_scene) {
		if(!(HxOverrides.indexOf(this.scenes,_scene,0) != -1)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("scenes.indexOf(_scene) != -1" + ""));
		var _result = HxOverrides.remove(this.scenes,_scene);
		this.refresh();
		return _result;
	}
	,onkeydown: function(e) {
		if(e.keycode == snow_system_input_Keycodes.key_2 && this.visible) this.toggle_ids();
	}
	,toggle_ids: function() {
		this.hide_ids = !this.hide_ids;
		this.refresh();
	}
	,tabs: function(_d) {
		var res = "";
		var _g = 0;
		while(_g < _d) {
			var i = _g++;
			res += "    ";
		}
		return res;
	}
	,list_entity: function(_list,e,_depth) {
		if(_depth == null) _depth = 1;
		var _active;
		if(e.get_active()) _active = ""; else _active = "/ inactive";
		var _pre;
		if(_depth == 1) _pre = this.tabs(_depth); else _pre = this.tabs(_depth) + "> ";
		var _id;
		if(this.hide_ids) _id = ""; else _id = e.get_id();
		var _comp_count = Lambda.count(e._components.components);
		var _comp = "• " + _comp_count;
		var _childs = "> " + e.children.length;
		_list += "" + _pre + _id + " " + e.get_name() + " " + _childs + " " + _comp + " " + _active + "\n";
		var $it0 = HxOverrides.iter(e._components.components._keys);
		while( $it0.hasNext() ) {
			var _name = $it0.next();
			var comp = e._components.components.map.get(_name);
			var _comp_id;
			if(this.hide_ids) _comp_id = ""; else _comp_id = " " + comp.id;
			_list += this.tabs(_depth + 1) + ("•" + _comp_id + " " + comp.name + "\n");
		}
		var _g = 0;
		var _g1 = e.children;
		while(_g < _g1.length) {
			var _child = _g1[_g];
			++_g;
			_list = this.list_entity(_list,_child,_depth + 2);
		}
		return _list;
	}
	,get_list: function() {
		var _result = "";
		var _g = 0;
		var _g1 = this.scenes;
		while(_g < _g1.length) {
			var _scene = _g1[_g];
			++_g;
			var _id;
			if(this.hide_ids) _id = ""; else _id = "" + _scene.get_id() + " ";
			_result += _id;
			_result += "" + _scene.get_name() + " ";
			_result += "( " + _scene.get_length() + " )\n";
			var $it0 = _scene.entities.iterator();
			while( $it0.hasNext() ) {
				var _entity = $it0.next();
				_result = this.list_entity(_result,_entity,null);
			}
		}
		return _result;
	}
	,refresh: function() {
		this.items_list.set_text(this.get_list());
	}
	,process: function() {
		if(!this.visible) return;
		var _has_changed = false;
		var _g = 0;
		var _g1 = this.scenes;
		while(_g < _g1.length) {
			var _scene = _g1[_g];
			++_g;
			if(_scene._has_changed) {
				_has_changed = true;
				_scene._has_changed = false;
			}
		}
		if(_has_changed) this.refresh();
	}
	,onmousewheel: function(e) {
		var h = this.items_list.text_bounds.h;
		var vh = Luxe.debug.inspector.size.y - this.margin;
		var diff = h - vh;
		var new_y = this.items_list.get_pos().y;
		var max_y = Luxe.debug.padding.y + this.margin * 1.5;
		var min_y = max_y;
		if(diff > 0) min_y = max_y - (diff + this.margin * 2);
		new_y -= this.margin / 2 * e.y;
		if(new_y < min_y) new_y = min_y; else if(new_y > max_y) new_y = max_y; else new_y = new_y;
		this.items_list.get_pos().set_y(new_y);
	}
	,show: function() {
		luxe_debug_DebugView.prototype.show.call(this);
		this.refresh();
		this.items_list.set_visible(true);
	}
	,hide: function() {
		luxe_debug_DebugView.prototype.hide.call(this);
		this.items_list.set_visible(false);
	}
	,resize: function() {
		var debug = Luxe.debug;
		var viewrect = new phoenix_Rectangle(debug.inspector.pos.x + this.margin / 2,debug.inspector.pos.y + this.margin * 1.5,debug.inspector.size.x - this.margin,debug.inspector.size.y - this.margin - this.margin * 1.5);
		var left = debug.padding.x + this.margin;
		var top = debug.padding.y + this.margin * 1.5;
		if(this.items_list != null) {
			this.items_list.set_pos(new phoenix_Vector(left,top));
			this.items_list.set_clip_rect(viewrect);
		}
	}
	,onwindowsized: function(e) {
		this.resize();
	}
	,__class__: luxe_debug_SceneDebugView
});
var luxe_debug_StatsDebugView = function() {
	this.hide_debug = true;
	this.margin = 32;
	this.font_size = 15;
	this.debug_geometry_count = 13;
	this.debug_draw_call_count = 3;
	luxe_debug_DebugView.call(this);
	this.set_name("Statistics");
	this._last_render_stats = { batchers : 0, geometry_count : 0, dynamic_batched_count : 0, static_batched_count : 0, visible_count : 0, draw_calls : 0, vert_count : 0};
	this._render_stats = { batchers : 0, geometry_count : 0, dynamic_batched_count : 0, static_batched_count : 0, visible_count : 0, draw_calls : 0, vert_count : 0};
};
$hxClasses["luxe.debug.StatsDebugView"] = luxe_debug_StatsDebugView;
luxe_debug_StatsDebugView.__name__ = true;
luxe_debug_StatsDebugView.__super__ = luxe_debug_DebugView;
luxe_debug_StatsDebugView.prototype = $extend(luxe_debug_DebugView.prototype,{
	get_render_stats_string: function() {
		return "Renderer Statistics\n\n" + "batcher count : " + this._render_stats.batchers + "\n" + "total geometry : " + this._render_stats.geometry_count + "\n" + "visible geometry : " + this._render_stats.visible_count + "\n" + "dynamic batch count : " + this._render_stats.dynamic_batched_count + "\n" + "static batch count : " + this._render_stats.static_batched_count + "\n" + "total draw calls : " + this._render_stats.draw_calls + "\n" + "total vert count : " + this._render_stats.vert_count;
	}
	,create: function() {
		var _g = this;
		var debug = Luxe.debug;
		this.render_stats_text = new luxe_Text({ name : "debug.render.stats", depth : 999.3, no_scene : true, color : new phoenix_Color(0,0,0,1).rgb(16121979), pos : new phoenix_Vector(0,0), font : Luxe.renderer.font, text : this.get_render_stats_string(), point_size : this.font_size, batcher : debug.batcher, visible : false});
		this.resource_list_text = new luxe_Text({ name : "debug.resource.stats", depth : 999.3, no_scene : true, color : new phoenix_Color(0,0,0,1).rgb(16121979), pos : new phoenix_Vector(0,0), font : Luxe.renderer.font, text : "", align : 1, point_size : this.font_size * 0.9, batcher : debug.batcher, visible : false});
		this.render_stats_text.geometry.id = "debug.render.stats.geometry";
		this.render_stats_text.geometry.id = "debug.resource.stats.geometry";
		this.resize();
		Luxe.resources.on(1,function(_) {
			if(_g.visible) _g.refresh();
		});
	}
	,resize: function() {
		if(this.resource_list_text == null || this.render_stats_text == null) return;
		var debug = Luxe.debug;
		var viewrect = new phoenix_Rectangle(debug.inspector.pos.x + this.margin / 2,debug.inspector.pos.y + this.margin * 1.5,debug.inspector.size.x - this.margin,debug.inspector.size.y - this.margin - this.margin * 1.5);
		var left = debug.padding.x + this.margin;
		var right = debug.padding.x + debug.inspector.size.x - this.margin;
		var top = debug.padding.y + this.margin * 1.5;
		var render_w = this.render_stats_text.text_bounds.w;
		var render_h = this.render_stats_text.text_bounds.h;
		if(this.resource_list_text != null) {
			this.resource_list_text.set_pos(new phoenix_Vector(right,top));
			this.resource_list_text.set_clip_rect(viewrect);
		}
		if(this.render_stats_text != null) {
			this.render_stats_text.set_pos(new phoenix_Vector(left,top));
			this.render_stats_text.set_clip_rect(viewrect);
		}
		this.reset_tween();
	}
	,onwindowsized: function(e) {
		this.resize();
	}
	,refresh: function() {
		var bytes_lists = "";
		var text_lists = "";
		var json_lists = "";
		var texture_lists = "";
		var rtt_lists = "";
		var font_lists = "";
		var shader_lists = "";
		var $it0 = Luxe.resources.cache.iterator();
		while( $it0.hasNext() ) {
			var res = $it0.next();
			var _g = res.resource_type;
			switch(_g) {
			case 3:
				bytes_lists += "" + res.id + " • " + res.ref + "\t\n";
				break;
			case 1:
				text_lists += "" + res.id + " • " + res.ref + "\t\n";
				break;
			case 2:
				json_lists += "" + res.id + " • " + res.ref + "\t\n";
				break;
			case 4:
				var tex = res;
				texture_lists += "(" + tex.width_actual + "x" + tex.height_actual + " ~" + Luxe.utils.bytes_to_string(tex.memory_use()) + ")    " + tex.id + " • " + tex.ref + "\t\n";
				break;
			case 5:
				var tex1 = res;
				rtt_lists += "(" + tex1.width_actual + "x" + tex1.height_actual + " ~" + Luxe.utils.bytes_to_string(tex1.memory_use()) + ")    " + tex1.id + " • " + tex1.ref + "\t\n";
				break;
			case 6:
				font_lists += "" + res.id + " • " + res.ref + "\t\n";
				break;
			case 7:
				var res1 = res;
				shader_lists += "(" + res1.vert_id + ", " + res1.frag_id + ")    " + res1.id + " • " + res1.ref + "\t\n";
				break;
			default:
			}
		}
		var lists = "Resource list (" + Luxe.resources.stats.total + ")\n\n";
		lists += "Bytes (" + Luxe.resources.stats.bytes + ")\n";
		if(bytes_lists == "") lists += "-\t\n"; else lists += bytes_lists;
		lists += "\nText (" + Luxe.resources.stats.texts + ")\n";
		if(text_lists == "") lists += "-\t\n"; else lists += text_lists;
		lists += "\nJSON (" + Luxe.resources.stats.jsons + ")\n";
		if(json_lists == "") lists += "-\t\n"; else lists += json_lists;
		lists += "\nTexture (" + Luxe.resources.stats.textures + ")\n";
		if(texture_lists == "") lists += "-\t\n"; else lists += texture_lists;
		lists += "\nRenderTexture (" + Luxe.resources.stats.render_textures + ")\n";
		if(rtt_lists == "") lists += "-\t\n"; else lists += rtt_lists;
		lists += "\nFont (" + Luxe.resources.stats.fonts + ")\n";
		if(font_lists == "") lists += "-\t\n"; else lists += font_lists;
		lists += "\nShader (" + Luxe.resources.stats.shaders + ")\n";
		if(shader_lists == "") lists += "-\t\n"; else lists += shader_lists;
		var sound_list = "";
		var _sounds = [];
		var $it1 = Luxe.core.app.audio.sound_list.iterator();
		while( $it1.hasNext() ) {
			var sound = $it1.next();
			_sounds.push(sound.name);
		}
		_sounds.sort(function(a,b) {
			if(a == b) return 0;
			if(a < b) return -1;
			return 1;
		});
		var _g1 = 0;
		while(_g1 < _sounds.length) {
			var sound1 = _sounds[_g1];
			++_g1;
			sound_list += "" + sound1 + " •\n";
		}
		var _count = Lambda.count(Luxe.core.app.audio.sound_list);
		lists += "\n\n---\nAudio list (" + _count + ")\n\n";
		if(sound_list == "") lists += "-\t\n"; else lists += sound_list;
		this.resource_list_text.set_text(lists);
		if(this.resource_list_text.geometry != null) this.resource_list_text.geometry.set_dirty(true);
		this.reset_tween();
	}
	,process: function() {
		if(!this.visible) return;
		var dirty = false;
		this.update_render_stats();
		if(this._last_render_stats.batchers != this._render_stats.batchers) {
			dirty = true;
			this._last_render_stats.batchers = this._render_stats.batchers;
		}
		if(this._last_render_stats.geometry_count != this._render_stats.geometry_count) {
			dirty = true;
			this._last_render_stats.geometry_count = this._render_stats.geometry_count;
		}
		if(this._last_render_stats.dynamic_batched_count != this._render_stats.dynamic_batched_count) {
			dirty = true;
			this._last_render_stats.dynamic_batched_count = this._render_stats.dynamic_batched_count;
		}
		if(this._last_render_stats.static_batched_count != this._render_stats.static_batched_count) {
			dirty = true;
			this._last_render_stats.static_batched_count = this._render_stats.static_batched_count;
		}
		if(this._last_render_stats.visible_count != this._render_stats.visible_count) {
			dirty = true;
			this._last_render_stats.visible_count = this._render_stats.visible_count;
		}
		if(this._last_render_stats.draw_calls != this._render_stats.draw_calls) {
			dirty = true;
			this._last_render_stats.draw_calls = this._render_stats.draw_calls;
		}
		if(this._last_render_stats.vert_count != this._render_stats.vert_count) {
			dirty = true;
			this._last_render_stats.vert_count = this._render_stats.vert_count;
		}
		if(dirty) this.refresh_render_stats();
	}
	,onmousewheel: function(e) {
		luxe_tween_Actuate.stop(this.resource_list_text.get_pos());
		var h = this.resource_list_text.text_bounds.h;
		var vh = Luxe.debug.inspector.size.y - this.margin;
		var diff = h - vh;
		var new_y = this.resource_list_text.get_pos().y;
		var max_y = Luxe.debug.padding.y + this.margin * 1.5;
		var min_y = max_y;
		if(diff > 0) min_y = max_y - (diff + this.margin * 2);
		new_y -= this.margin / 2 * e.y;
		if(new_y < min_y) new_y = min_y; else if(new_y > max_y) new_y = max_y; else new_y = new_y;
		this.resource_list_text.get_pos().set_y(new_y);
	}
	,onkeydown: function(e) {
		if(e.keycode == snow_system_input_Keycodes.key_2 && this.visible) this.toggle_debug_stats();
	}
	,show: function() {
		luxe_debug_DebugView.prototype.show.call(this);
		this.refresh();
		this.render_stats_text.set_visible(true);
		this.resource_list_text.set_visible(true);
	}
	,hide: function() {
		luxe_debug_DebugView.prototype.hide.call(this);
		this.render_stats_text.set_visible(false);
		this.resource_list_text.set_visible(false);
		luxe_tween_Actuate.stop(this.resource_list_text.get_pos());
	}
	,reset_tween: function() {
		luxe_tween_Actuate.stop(this.resource_list_text.get_pos());
		var h = this.resource_list_text.text_bounds.h;
		var vh = Luxe.debug.inspector.size.y - this.margin;
		var diff = h - vh;
		var start_y = Luxe.debug.padding.y + this.margin * 1.5;
		this.resource_list_text.get_pos().set_y(start_y);
		if(diff > 0) {
			var end_y = start_y - (diff + this.margin * 2);
			luxe_tween_Actuate.tween(this.resource_list_text.get_pos(),8,{ y : end_y}).repeat().delay(4).reflect().ease(luxe_tween_easing_Linear.get_easeNone());
		}
	}
	,refresh_render_stats: function() {
		if(!this.visible) return;
		this.render_stats_text.set_text(this.get_render_stats_string());
		this.render_stats_text.set_locked(true);
		if(this.render_stats_text.geometry != null) this.render_stats_text.geometry.set_dirty(true);
	}
	,toggle_debug_stats: function() {
		this.hide_debug = !this.hide_debug;
	}
	,update_render_stats: function() {
		this.debug_geometry_count = Luxe.debug.batcher.geometry.size();
		this.debug_draw_call_count = Luxe.debug.batcher.draw_calls;
		this._render_stats.batchers = Luxe.renderer.stats.batchers;
		this._render_stats.geometry_count = Luxe.renderer.stats.geometry_count;
		this._render_stats.visible_count = Luxe.renderer.stats.visible_count;
		this._render_stats.dynamic_batched_count = Luxe.renderer.stats.dynamic_batched_count;
		this._render_stats.static_batched_count = Luxe.renderer.stats.static_batched_count;
		this._render_stats.draw_calls = Luxe.renderer.stats.draw_calls;
		this._render_stats.vert_count = Luxe.renderer.stats.vert_count;
		if(this.hide_debug) {
			this._render_stats.geometry_count = this._render_stats.geometry_count - this.debug_geometry_count;
			this._render_stats.visible_count = this._render_stats.visible_count - Luxe.debug.batcher.visible_count;
			this._render_stats.dynamic_batched_count = this._render_stats.dynamic_batched_count - Luxe.debug.batcher.dynamic_batched_count;
			this._render_stats.static_batched_count = this._render_stats.static_batched_count - Luxe.debug.batcher.static_batched_count;
			this._render_stats.draw_calls -= this.debug_draw_call_count;
			this._render_stats.vert_count -= Luxe.debug.batcher.vert_count;
		}
	}
	,__class__: luxe_debug_StatsDebugView
});
var luxe_debug_TraceDebugView = function() {
	this._last_logged_length = 0;
	this.max_lines = 35;
	luxe_debug_DebugView.call(this);
	this.set_name("Log");
	Luxe.debug.add_trace_listener("TraceDebugView",$bind(this,this.on_trace));
	this.logged = [];
	this.add_line("luxe version " + Luxe.build);
};
$hxClasses["luxe.debug.TraceDebugView"] = luxe_debug_TraceDebugView;
luxe_debug_TraceDebugView.__name__ = true;
luxe_debug_TraceDebugView.__super__ = luxe_debug_DebugView;
luxe_debug_TraceDebugView.prototype = $extend(luxe_debug_DebugView.prototype,{
	on_trace: function(v,inf) {
		this.add_line(inf.fileName + ":" + inf.lineNumber + " " + Std.string(v));
	}
	,create: function() {
		var debug = Luxe.debug;
		var text_bounds = new phoenix_Rectangle(debug.padding.x + 20,debug.padding.y + 40,Luxe.core.screen.get_w() - debug.padding.x * 2 - 20,Luxe.core.screen.get_h() - debug.padding.y * 2 - 40);
		this.lines = new luxe_Text({ name : "debug.log.text", no_scene : true, depth : 999.3, color : new phoenix_Color().rgb(8947848), bounds : text_bounds, bounds_wrap : true, font : Luxe.renderer.font, text : "", align_vertical : 4, point_size : 12, batcher : debug.batcher, visible : false});
		if(this.lines.geometry != null) {
			this.lines.geometry.set_clip_rect(text_bounds);
			this.lines.geometry.set_locked(true);
			this.lines.geometry.id = "debug.log.text.geometry";
		}
	}
	,onwindowsized: function(e) {
		var debug = Luxe.debug;
		var text_bounds = new phoenix_Rectangle(debug.padding.x + 20,debug.padding.y + 40,Luxe.core.screen.get_w() - debug.padding.x * 2 - 20,Luxe.core.screen.get_h() - debug.padding.y * 2 - 40);
		this.lines.set_bounds(text_bounds);
		this.lines.set_clip_rect(text_bounds);
		if(this.lines.geometry != null) {
			this.lines.geometry.set_locked(true);
			this.lines.geometry.set_dirty(true);
		}
	}
	,add_line: function(_t) {
		if(this.logged == null) return;
		this.logged.push(_t);
		if(!this.visible) return;
		this.refresh_lines();
	}
	,refresh_lines: function() {
		if(this._last_logged_length == this.logged.length) return;
		var _final = "";
		if(this.logged.length <= this.max_lines) {
			var _g = 0;
			var _g1 = this.logged;
			while(_g < _g1.length) {
				var _line = _g1[_g];
				++_g;
				_final += _line + "\n";
			}
		} else {
			var _start = this.logged.length - this.max_lines;
			var _total = this.logged.length;
			var _g11 = _start;
			var _g2 = this.logged.length;
			while(_g11 < _g2) {
				var i = _g11++;
				var _line1 = this.logged[i];
				_final += _line1 + "\n";
			}
		}
		this.lines.set_text(_final);
		if(this.lines.geometry != null) {
			this.lines.geometry.set_locked(true);
			this.lines.geometry.set_dirty(true);
		}
		this._last_logged_length = this.logged.length;
	}
	,refresh: function() {
	}
	,process: function() {
	}
	,show: function() {
		luxe_debug_DebugView.prototype.show.call(this);
		this.refresh_lines();
		this.lines.set_visible(true);
	}
	,hide: function() {
		luxe_debug_DebugView.prototype.hide.call(this);
		this.lines.set_visible(false);
	}
	,__class__: luxe_debug_TraceDebugView
});
var luxe_importers_bitmapfont_BitmapFontParser = function() { };
$hxClasses["luxe.importers.bitmapfont.BitmapFontParser"] = luxe_importers_bitmapfont_BitmapFontParser;
luxe_importers_bitmapfont_BitmapFontParser.__name__ = true;
luxe_importers_bitmapfont_BitmapFontParser.parse = function(_font_data) {
	if(_font_data.length == 0) throw new js__$Boot_HaxeError("BitmapFont:Parser: _font_data is 0 length");
	var _info = { face : null, chars : new haxe_ds_IntMap(), point_size : 0, base_size : 0, char_count : 0, line_height : 0, pages : [], kernings : new haxe_ds_IntMap()};
	var _lines = _font_data.split("\n");
	if(_lines.length == 0) throw new js__$Boot_HaxeError("BitmapFont; invalid font data specified for parser.");
	var _first = _lines[0];
	if((function($this) {
		var $r;
		var _this = StringTools.ltrim(_first);
		$r = HxOverrides.substr(_this,0,4);
		return $r;
	}(this)) != "info") throw new js__$Boot_HaxeError("BitmapFont; invalid font data specified for parser. Format should be plain ascii text .fnt file only currently.");
	var _g = 0;
	while(_g < _lines.length) {
		var _line = _lines[_g];
		++_g;
		var _tokens = _line.split(" ");
		var _g1 = 0;
		while(_g1 < _tokens.length) {
			var _current = _tokens[_g1];
			++_g1;
			luxe_importers_bitmapfont_BitmapFontParser.parse_token(_current,_tokens,_info);
		}
	}
	return _info;
};
luxe_importers_bitmapfont_BitmapFontParser.parse_token = function(_token,_tokens,_info) {
	_tokens.shift();
	var _items = luxe_importers_bitmapfont_BitmapFontParser.tokenize_line(_tokens);
	switch(_token) {
	case "info":
		_info.face = luxe_importers_bitmapfont_BitmapFontParser.unquote(__map_reserved.face != null?_items.getReserved("face"):_items.h["face"]);
		_info.point_size = Std.parseFloat(__map_reserved.size != null?_items.getReserved("size"):_items.h["size"]);
		break;
	case "common":
		_info.line_height = Std.parseFloat(__map_reserved.lineHeight != null?_items.getReserved("lineHeight"):_items.h["lineHeight"]);
		_info.base_size = Std.parseFloat(__map_reserved.base != null?_items.getReserved("base"):_items.h["base"]);
		break;
	case "page":
		_info.pages.push({ id : Std.parseInt(__map_reserved.id != null?_items.getReserved("id"):_items.h["id"]), file : luxe_importers_bitmapfont_BitmapFontParser.trim(luxe_importers_bitmapfont_BitmapFontParser.unquote(__map_reserved.file != null?_items.getReserved("file"):_items.h["file"]))});
		break;
	case "chars":
		_info.char_count = Std.parseInt(__map_reserved.count != null?_items.getReserved("count"):_items.h["count"]);
		break;
	case "char":
		var _char = { id : Std.parseInt(__map_reserved.id != null?_items.getReserved("id"):_items.h["id"]), x : Std.parseFloat(__map_reserved.x != null?_items.getReserved("x"):_items.h["x"]), y : Std.parseFloat(__map_reserved.y != null?_items.getReserved("y"):_items.h["y"]), width : Std.parseFloat(__map_reserved.width != null?_items.getReserved("width"):_items.h["width"]), height : Std.parseFloat(__map_reserved.height != null?_items.getReserved("height"):_items.h["height"]), xoffset : Std.parseFloat(__map_reserved.xoffset != null?_items.getReserved("xoffset"):_items.h["xoffset"]), yoffset : Std.parseFloat(__map_reserved.yoffset != null?_items.getReserved("yoffset"):_items.h["yoffset"]), xadvance : Std.parseFloat(__map_reserved.xadvance != null?_items.getReserved("xadvance"):_items.h["xadvance"]), page : Std.parseInt(__map_reserved.page != null?_items.getReserved("page"):_items.h["page"])};
		_info.chars.h[_char.id] = _char;
		break;
	case "kerning":
		var _first = Std.parseInt(__map_reserved.first != null?_items.getReserved("first"):_items.h["first"]);
		var _second = Std.parseInt(__map_reserved.second != null?_items.getReserved("second"):_items.h["second"]);
		var _amount = Std.parseFloat(__map_reserved.amount != null?_items.getReserved("amount"):_items.h["amount"]);
		var _map = _info.kernings.h[_first];
		if(_map == null) {
			_map = new haxe_ds_IntMap();
			_info.kernings.h[_first] = _map;
		}
		_map.h[_second] = _amount;
		break;
	default:
	}
};
luxe_importers_bitmapfont_BitmapFontParser.tokenize_line = function(_tokens) {
	var _item_map = new haxe_ds_StringMap();
	var _g = 0;
	while(_g < _tokens.length) {
		var _token = _tokens[_g];
		++_g;
		var _items = _token.split("=");
		_item_map.set(_items[0],_items[1]);
	}
	return _item_map;
};
luxe_importers_bitmapfont_BitmapFontParser.trim = function(_s) {
	return StringTools.trim(_s);
};
luxe_importers_bitmapfont_BitmapFontParser.unquote = function(_s) {
	if(_s.indexOf("\"") != -1) _s = StringTools.replace(_s,"\"","");
	return _s;
};
var luxe_resource_Resource = function(_options) {
	this.ref = 0;
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + ""));
	if(_options.id == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options.id was null" + ""));
	if(_options.system == null) _options.system = Luxe.resources;
	_options.system;
	if(_options.resource_type == null) _options.resource_type = 0;
	_options.resource_type;
	this.id = _options.id;
	this.system = _options.system;
	this.resource_type = _options.resource_type;
	this.set_state(0);
	this.set_ref(1);
};
$hxClasses["luxe.resource.Resource"] = luxe_resource_Resource;
luxe_resource_Resource.__name__ = true;
luxe_resource_Resource.prototype = {
	destroy: function(_force) {
		if(_force == null) _force = false;
		if(!(this.state != 6)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("state != ResourceState.destroyed" + ""));
		if(!_force) {
			if(!(this.ref > 0)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("ref > 0" + ""));
			var _g = this;
			var _g1 = _g.ref;
			_g.set_ref(_g1 - 1);
			_g1;
			if(!(this.ref >= 0)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("ref >= 0" + ""));
		}
		if(this.ref == 0 || _force) {
			this.clear();
			this.set_state(6);
			this.system.remove(this);
			this.system.emit(8,this);
		}
	}
	,set_ref: function(_ref) {
		var pre = this.ref;
		this.ref = _ref;
		if(this.ref > pre) this.system.emit(9,this); else if(this.ref < pre) this.system.emit(10,this);
		return this.ref;
	}
	,set_state: function(_state) {
		this.state = _state;
		var _g = this.state;
		switch(_g) {
		case 2:
			this.system.emit(3,this);
			break;
		case 3:
			this.system.emit(4,this);
			break;
		case 4:
			this.system.emit(5,this);
			break;
		default:
		}
		return this.state;
	}
	,clear: function() {
	}
	,__class__: luxe_resource_Resource
	,__properties__: {set_ref:"set_ref",set_state:"set_state"}
};
var luxe_resource_BytesResource = function(_options) {
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + ""));
	_options.resource_type = 3;
	luxe_resource_Resource.call(this,_options);
	this.asset = _options.asset;
};
$hxClasses["luxe.resource.BytesResource"] = luxe_resource_BytesResource;
luxe_resource_BytesResource.__name__ = true;
luxe_resource_BytesResource.__super__ = luxe_resource_Resource;
luxe_resource_BytesResource.prototype = $extend(luxe_resource_Resource.prototype,{
	reload: function() {
		var _g = this;
		if(!(this.state != 6)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("state != ResourceState.destroyed" + ""));
		this.clear();
		return new snow_api_Promise(function(resolve,reject) {
			_g.set_state(2);
			var get = snow_system_assets_AssetBytes.load(Luxe.core.app.assets,_g.id);
			get.then(function(_asset) {
				_g.asset = _asset;
				_g.set_state(3);
				resolve(_g);
			});
			get.error(function(_error) {
				_g.set_state(4);
				reject(_error);
			});
		});
	}
	,clear: function() {
		if(this.asset != null) {
			this.asset.destroy();
			this.asset = null;
		}
	}
	,__class__: luxe_resource_BytesResource
});
var luxe_resource_TextResource = function(_options) {
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + ""));
	_options.resource_type = 1;
	luxe_resource_Resource.call(this,_options);
	this.asset = _options.asset;
};
$hxClasses["luxe.resource.TextResource"] = luxe_resource_TextResource;
luxe_resource_TextResource.__name__ = true;
luxe_resource_TextResource.__super__ = luxe_resource_Resource;
luxe_resource_TextResource.prototype = $extend(luxe_resource_Resource.prototype,{
	reload: function() {
		var _g = this;
		if(!(this.state != 6)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("state != ResourceState.destroyed" + ""));
		this.clear();
		return new snow_api_Promise(function(resolve,reject) {
			_g.set_state(2);
			var get = snow_system_assets_AssetText.load(Luxe.core.app.assets,_g.id);
			get.then(function(_asset) {
				_g.asset = _asset;
				_g.set_state(3);
				resolve(_g);
			});
			get.error(function(_error) {
				_g.set_state(4);
				reject(_error);
			});
		});
	}
	,clear: function() {
		if(this.asset != null) {
			this.asset.destroy();
			this.asset = null;
		}
	}
	,__class__: luxe_resource_TextResource
});
var luxe_resource_JSONResource = function(_options) {
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + ""));
	_options.resource_type = 2;
	luxe_resource_Resource.call(this,_options);
	this.asset = _options.asset;
};
$hxClasses["luxe.resource.JSONResource"] = luxe_resource_JSONResource;
luxe_resource_JSONResource.__name__ = true;
luxe_resource_JSONResource.__super__ = luxe_resource_Resource;
luxe_resource_JSONResource.prototype = $extend(luxe_resource_Resource.prototype,{
	reload: function() {
		var _g = this;
		if(!(this.state != 6)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("state != ResourceState.destroyed" + ""));
		this.clear();
		return new snow_api_Promise(function(resolve,reject) {
			_g.set_state(2);
			var get = snow_system_assets_AssetJSON.load(Luxe.core.app.assets,_g.id);
			get.then(function(_asset) {
				_g.asset = _asset;
				_g.set_state(3);
				resolve(_g);
			});
			get.error(function(_error) {
				_g.set_state(4);
				reject(_error);
			});
		});
	}
	,clear: function() {
		if(this.asset != null) {
			this.asset.destroy();
			this.asset = null;
		}
	}
	,__class__: luxe_resource_JSONResource
});
var luxe_structural_BalancedBSTIterator_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry = function(_tree) {
	if(_tree == null) return;
	if(_tree.root == null) return;
	this.tree = _tree;
	this.current = this._min(this.tree.root);
	this.rightest = this._max(this.tree.root);
};
$hxClasses["luxe.structural.BalancedBSTIterator_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry"] = luxe_structural_BalancedBSTIterator_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry;
luxe_structural_BalancedBSTIterator_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry.__name__ = true;
luxe_structural_BalancedBSTIterator_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry.prototype = {
	hasNext: function() {
		if(this.current == null || this.rightest == null) return false;
		return this.tree.compare(this.current.key,this.rightest.key) <= 0;
	}
	,next: function() {
		var _temp = this.current;
		this.current = this.update_next();
		return _temp.value;
	}
	,update_next: function() {
		if(!(this.current == null || this.rightest == null?false:this.tree.compare(this.current.key,this.rightest.key) <= 0)) return null;
		if(this.current.right != null) return this._min(this.current.right);
		var _next = null;
		var _temp = this.tree.root;
		while(_temp != null) {
			var _comp = this.tree.compare(this.current.key,_temp.key);
			if(_comp < 0) {
				_next = _temp;
				_temp = _temp.left;
			} else if(_comp > 0) _temp = _temp.right; else {
				this.current = _next;
				break;
			}
		}
		return _next;
	}
	,_min: function(_node) {
		while(_node.left != null) _node = _node.left;
		return _node;
	}
	,_max: function(_node) {
		while(_node.right != null) _node = _node.right;
		return _node;
	}
	,__class__: luxe_structural_BalancedBSTIterator_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry
};
var luxe_structural_BalancedBSTNode_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry = function(_key,_value,_node_count,_color) {
	this.left = null;
	this.right = null;
	this.key = _key;
	this.value = _value;
	this.nodecount = _node_count;
	this.color = _color;
};
$hxClasses["luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry"] = luxe_structural_BalancedBSTNode_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry;
luxe_structural_BalancedBSTNode_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry.__name__ = true;
luxe_structural_BalancedBSTNode_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry.prototype = {
	__class__: luxe_structural_BalancedBSTNode_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry
};
var luxe_structural_BalancedBST_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry = function(compare_function) {
	this.compare = compare_function;
};
$hxClasses["luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry"] = luxe_structural_BalancedBST_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry;
luxe_structural_BalancedBST_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry.__name__ = true;
luxe_structural_BalancedBST_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry.prototype = {
	size: function() {
		return this.node_count(this.root);
	}
	,insert: function(_key,_value) {
		this.root = this.node_insert(this.root,_key,_value);
		this.root.color = false;
	}
	,contains: function(_key) {
		return this.find(_key) != null;
	}
	,find: function(_key) {
		return this.node_find(this.root,_key);
	}
	,remove: function(_key) {
		if(!this.is_red(this.root.left) && !this.is_red(this.root.right)) this.root.color = true;
		if(!this.contains(_key)) return false;
		this.root = this.node_remove(this.root,_key);
		if(this.root != null) this.root.color = false;
		return true;
	}
	,node_count: function(_node) {
		if(_node == null) return 0; else return _node.nodecount;
	}
	,node_insert: function(_node,_key,_value) {
		if(_node == null) return new luxe_structural_BalancedBSTNode_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry(_key,_value,1,true);
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) _node.left = this.node_insert(_node.left,_key,_value); else if(comparison > 0) _node.right = this.node_insert(_node.right,_key,_value); else _node.value = _value;
		if(this.is_red(_node.right) && !this.is_red(_node.left)) _node = this.rotate_left(_node);
		if(this.is_red(_node.left) && this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		if(this.is_red(_node.left) && this.is_red(_node.right)) this.swap_color(_node);
		_node.nodecount = this.node_count(_node.left) + this.node_count(_node.right) + 1;
		_node;
		return _node;
	}
	,node_find: function(_node,_key) {
		if(_node == null) return null;
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) return this.node_find(_node.left,_key); else if(comparison > 0) return this.node_find(_node.right,_key); else return _node.value;
	}
	,node_smallest: function(_node) {
		if(_node.left == null) return _node;
		return this.node_smallest(_node.left);
	}
	,node_remove_smallest: function(_node) {
		if(_node.left == null) return null;
		if(!this.is_red(_node.left) && !this.is_red(_node.left.left)) _node = this.move_red_left(_node);
		_node.left = this.node_remove_smallest(_node.left);
		_node.nodecount = this.node_count(_node.left) + this.node_count(_node.right) + 1;
		_node;
		return this.balance(_node);
	}
	,node_remove: function(_node,_key) {
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) {
			if(!this.is_red(_node.left) && !this.is_red(_node.left.left)) _node = this.move_red_left(_node);
			_node.left = this.node_remove(_node.left,_key);
		} else {
			if(this.is_red(_node.left)) _node = this.rotate_right(_node);
			var comparison1 = this.compare(_key,_node.key);
			if(comparison1 == 0 && _node.right == null) return null;
			if(!this.is_red(_node.right) && !this.is_red(_node.right.left)) _node = this.move_red_right(_node);
			var comparison2 = this.compare(_key,_node.key);
			if(comparison2 == 0) {
				var _n = this.node_smallest(_node.right);
				_node.key = _n.key;
				_node.value = _n.value;
				_node.right = this.node_remove_smallest(_node.right);
			} else _node.right = this.node_remove(_node.right,_key);
		}
		return this.balance(_node);
	}
	,is_red: function(_node) {
		if(_node == null) return false;
		return _node.color == true;
	}
	,rotate_left: function(_node) {
		var _n = _node.right;
		_n.color = _node.color;
		_node.color = true;
		_node.right = _n.left;
		_n.left = _node;
		_n.nodecount = _node.nodecount;
		_node.nodecount = this.node_count(_node.left) + this.node_count(_node.right) + 1;
		_node;
		return _n;
	}
	,rotate_right: function(_node) {
		var _n = _node.left;
		_n.color = _node.color;
		_node.color = true;
		_node.left = _n.right;
		_n.right = _node;
		_n.nodecount = _node.nodecount;
		_node.nodecount = this.node_count(_node.left) + this.node_count(_node.right) + 1;
		_node;
		return _n;
	}
	,swap_color: function(_node) {
		_node.color = !_node.color;
		_node.left.color = !_node.left.color;
		_node.right.color = !_node.right.color;
	}
	,move_red_left: function(_node) {
		this.swap_color(_node);
		if(this.is_red(_node.right.left)) {
			_node.right = this.rotate_right(_node.right);
			_node = this.rotate_left(_node);
		}
		return _node;
	}
	,move_red_right: function(_node) {
		this.swap_color(_node);
		if(this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		return _node;
	}
	,balance: function(_node) {
		if(this.is_red(_node.right)) _node = this.rotate_left(_node);
		if(this.is_red(_node.left) && this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		if(this.is_red(_node.left) && this.is_red(_node.right)) this.swap_color(_node);
		_node.nodecount = this.node_count(_node.left) + this.node_count(_node.right) + 1;
		_node;
		return _node;
	}
	,__class__: luxe_structural_BalancedBST_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry
};
var luxe_structural_OrderedMapIterator = function(omap) {
	this.index = 0;
	this.map = omap;
};
$hxClasses["luxe.structural.OrderedMapIterator"] = luxe_structural_OrderedMapIterator;
luxe_structural_OrderedMapIterator.__name__ = true;
luxe_structural_OrderedMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.map._keys.length;
	}
	,next: function() {
		return this.map.get(this.map._keys[this.index++]);
	}
	,__class__: luxe_structural_OrderedMapIterator
};
var luxe_structural_OrderedMap = function(_map) {
	this._keys = [];
	this.map = _map;
};
$hxClasses["luxe.structural.OrderedMap"] = luxe_structural_OrderedMap;
luxe_structural_OrderedMap.__name__ = true;
luxe_structural_OrderedMap.__interfaces__ = [haxe_IMap];
luxe_structural_OrderedMap.prototype = {
	set: function(key,value) {
		if(!this.map.exists(key)) this._keys.push(key);
		{
			this.map.set(key,value);
			value;
		}
	}
	,iterator: function() {
		return new luxe_structural_OrderedMapIterator(this);
	}
	,remove: function(key) {
		return this.map.remove(key) && HxOverrides.remove(this._keys,key);
	}
	,exists: function(key) {
		return this.map.exists(key);
	}
	,get: function(key) {
		return this.map.get(key);
	}
	,__class__: luxe_structural_OrderedMap
};
var luxe_tween_actuators_IGenericActuator = function() { };
$hxClasses["luxe.tween.actuators.IGenericActuator"] = luxe_tween_actuators_IGenericActuator;
luxe_tween_actuators_IGenericActuator.__name__ = true;
luxe_tween_actuators_IGenericActuator.prototype = {
	__class__: luxe_tween_actuators_IGenericActuator
};
var luxe_tween_actuators_GenericActuator = function(target,duration,properties) {
	this.timescaled = false;
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = luxe_tween_Actuate.defaultEase;
};
$hxClasses["luxe.tween.actuators.GenericActuator"] = luxe_tween_actuators_GenericActuator;
luxe_tween_actuators_GenericActuator.__name__ = true;
luxe_tween_actuators_GenericActuator.__interfaces__ = [luxe_tween_actuators_IGenericActuator];
luxe_tween_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return Reflect.callMethod(method,method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		luxe_tween_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,timescale: function(_value) {
		if(_value == null) _value = true;
		this.timescaled = _value;
		return this;
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,pause: function() {
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: luxe_tween_actuators_GenericActuator
};
var luxe_tween_actuators_SimpleActuator = function(target,duration,properties) {
	this.has_timescaled_starttime = false;
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = snow_Snow.core.timestamp();
	luxe_tween_actuators_GenericActuator.call(this,target,duration,properties);
	if(!luxe_tween_actuators_SimpleActuator.addedEvent) {
		luxe_tween_actuators_SimpleActuator.addedEvent = true;
		Luxe.on(4,luxe_tween_actuators_SimpleActuator.on_internal_update);
	}
};
$hxClasses["luxe.tween.actuators.SimpleActuator"] = luxe_tween_actuators_SimpleActuator;
luxe_tween_actuators_SimpleActuator.__name__ = true;
luxe_tween_actuators_SimpleActuator.on_internal_update = function(_) {
	luxe_tween_actuators_SimpleActuator.update_timer += Luxe.core.delta_time;
	luxe_tween_actuators_SimpleActuator.current_time = snow_Snow.core.timestamp();
	var currentTime = luxe_tween_actuators_SimpleActuator.current_time;
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = luxe_tween_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = luxe_tween_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(actuator.timescaled) currentTime = luxe_tween_actuators_SimpleActuator.update_timer; else currentTime = luxe_tween_actuators_SimpleActuator.current_time;
			if(actuator.timescaled && !actuator.has_timescaled_starttime) {
				actuator.has_timescaled_starttime = true;
				actuator.startTime = luxe_tween_actuators_SimpleActuator.update_timer;
				actuator.timeOffset = actuator.startTime;
			}
			if(currentTime > actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			luxe_tween_actuators_SimpleActuator.actuators.splice(j,1);
			--luxe_tween_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
luxe_tween_actuators_SimpleActuator.__super__ = luxe_tween_actuators_GenericActuator;
luxe_tween_actuators_SimpleActuator.prototype = $extend(luxe_tween_actuators_GenericActuator.prototype,{
	autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i) && (!this.target.__properties__ || !this.target.__properties__["set_" + i])) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				details = new luxe_tween_actuators_PropertyDetails(this.target,i,start,this.getField(this.properties,i) - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		luxe_tween_actuators_SimpleActuator.actuators.push(this);
		++luxe_tween_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		this.paused = true;
		if(this.timescaled) this.pauseTime = luxe_tween_actuators_SimpleActuator.update_timer; else this.pauseTime = luxe_tween_actuators_SimpleActuator.current_time;
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += ((this.timescaled?luxe_tween_actuators_SimpleActuator.update_timer:luxe_tween_actuators_SimpleActuator.current_time) - this.pauseTime) / 1000;
		}
	}
	,setField: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setProperty: function(details,value) {
		if(details.isField) Reflect.setProperty(details.target,details.propertyName,value); else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) Reflect.setProperty(details.target,details.propertyName,endValue); else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: luxe_tween_actuators_SimpleActuator
});
var luxe_tween_easing_Quad = function() { };
$hxClasses["luxe.tween.easing.Quad"] = luxe_tween_easing_Quad;
luxe_tween_easing_Quad.__name__ = true;
luxe_tween_easing_Quad.__properties__ = {get_easeOut:"get_easeOut"}
luxe_tween_easing_Quad.get_easeOut = function() {
	return new luxe_tween_easing_QuadEaseOut();
};
var luxe_tween_easing_IEasing = function() { };
$hxClasses["luxe.tween.easing.IEasing"] = luxe_tween_easing_IEasing;
luxe_tween_easing_IEasing.__name__ = true;
luxe_tween_easing_IEasing.prototype = {
	__class__: luxe_tween_easing_IEasing
};
var luxe_tween_easing_QuadEaseOut = function() {
};
$hxClasses["luxe.tween.easing.QuadEaseOut"] = luxe_tween_easing_QuadEaseOut;
luxe_tween_easing_QuadEaseOut.__name__ = true;
luxe_tween_easing_QuadEaseOut.__interfaces__ = [luxe_tween_easing_IEasing];
luxe_tween_easing_QuadEaseOut.prototype = {
	calculate: function(k) {
		return -k * (k - 2);
	}
	,__class__: luxe_tween_easing_QuadEaseOut
};
var luxe_tween_Actuate = function() { };
$hxClasses["luxe.tween.Actuate"] = luxe_tween_Actuate;
luxe_tween_Actuate.__name__ = true;
luxe_tween_Actuate.apply = function(target,properties,customActuator) {
	luxe_tween_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = luxe_tween_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
luxe_tween_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!luxe_tween_Actuate.targetLibraries.exists(target) && allowCreation) luxe_tween_Actuate.targetLibraries.set(target,[]);
	return luxe_tween_Actuate.targetLibraries.get(target);
};
luxe_tween_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,luxe_tween_actuators_GenericActuator)) (js_Boot.__cast(target , luxe_tween_actuators_GenericActuator)).stop(null,complete,sendEvent); else {
			var library = luxe_tween_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
luxe_tween_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = luxe_tween_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = luxe_tween_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = luxe_tween_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return luxe_tween_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
luxe_tween_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(luxe_tween_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(luxe_tween_Actuate.targetLibraries.h[target.__id__],actuator);
		if(luxe_tween_Actuate.targetLibraries.h[target.__id__].length == 0) luxe_tween_Actuate.targetLibraries.remove(target);
	}
};
var luxe_tween_IComponentPath = function() { };
$hxClasses["luxe.tween.IComponentPath"] = luxe_tween_IComponentPath;
luxe_tween_IComponentPath.__name__ = true;
luxe_tween_IComponentPath.prototype = {
	__class__: luxe_tween_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var luxe_tween_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	luxe_tween_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(null);
	}
};
$hxClasses["luxe.tween.actuators.MethodActuator"] = luxe_tween_actuators_MethodActuator;
luxe_tween_actuators_MethodActuator.__name__ = true;
luxe_tween_actuators_MethodActuator.__super__ = luxe_tween_actuators_SimpleActuator;
luxe_tween_actuators_MethodActuator.prototype = $extend(luxe_tween_actuators_SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		luxe_tween_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new luxe_tween_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		luxe_tween_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: luxe_tween_actuators_MethodActuator
});
var luxe_tween_actuators_MotionPathActuator = function(target,duration,properties) {
	luxe_tween_actuators_SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["luxe.tween.actuators.MotionPathActuator"] = luxe_tween_actuators_MotionPathActuator;
luxe_tween_actuators_MotionPathActuator.__name__ = true;
luxe_tween_actuators_MotionPathActuator.__super__ = luxe_tween_actuators_SimpleActuator;
luxe_tween_actuators_MotionPathActuator.prototype = $extend(luxe_tween_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , luxe_tween_IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , luxe_tween_IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , luxe_tween_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new luxe_tween_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js_Boot.__cast(details1 , luxe_tween_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js_Boot.__cast(details1 , luxe_tween_actuators_PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js_Boot.__cast(details2 , luxe_tween_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js_Boot.__cast(details2 , luxe_tween_actuators_PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , luxe_tween_actuators_PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , luxe_tween_actuators_PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: luxe_tween_actuators_MotionPathActuator
});
var luxe_tween_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["luxe.tween.actuators.PropertyDetails"] = luxe_tween_actuators_PropertyDetails;
luxe_tween_actuators_PropertyDetails.__name__ = true;
luxe_tween_actuators_PropertyDetails.prototype = {
	__class__: luxe_tween_actuators_PropertyDetails
};
var luxe_tween_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	luxe_tween_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["luxe.tween.actuators.PropertyPathDetails"] = luxe_tween_actuators_PropertyPathDetails;
luxe_tween_actuators_PropertyPathDetails.__name__ = true;
luxe_tween_actuators_PropertyPathDetails.__super__ = luxe_tween_actuators_PropertyDetails;
luxe_tween_actuators_PropertyPathDetails.prototype = $extend(luxe_tween_actuators_PropertyDetails.prototype,{
	__class__: luxe_tween_actuators_PropertyPathDetails
});
var luxe_tween_easing_Linear = function() { };
$hxClasses["luxe.tween.easing.Linear"] = luxe_tween_easing_Linear;
luxe_tween_easing_Linear.__name__ = true;
luxe_tween_easing_Linear.__properties__ = {get_easeNone:"get_easeNone"}
luxe_tween_easing_Linear.get_easeNone = function() {
	return new luxe_tween_easing_LinearEaseNone();
};
var luxe_tween_easing_LinearEaseNone = function() {
};
$hxClasses["luxe.tween.easing.LinearEaseNone"] = luxe_tween_easing_LinearEaseNone;
luxe_tween_easing_LinearEaseNone.__name__ = true;
luxe_tween_easing_LinearEaseNone.__interfaces__ = [luxe_tween_easing_IEasing];
luxe_tween_easing_LinearEaseNone.prototype = {
	calculate: function(k) {
		return k;
	}
	,__class__: luxe_tween_easing_LinearEaseNone
};
var luxe_utils_GeometryUtils = function() {
};
$hxClasses["luxe.utils.GeometryUtils"] = luxe_utils_GeometryUtils;
luxe_utils_GeometryUtils.__name__ = true;
luxe_utils_GeometryUtils.prototype = {
	random_point_in_unit_circle: function() {
		var _r = Math.sqrt(Math.random());
		var _t = (-1 + 2 * Math.random()) * 6.283185307179586;
		return new phoenix_Vector(_r * Math.cos(_t),_r * Math.sin(_t));
	}
	,__class__: luxe_utils_GeometryUtils
};
var luxe_utils_Maths = function() { };
$hxClasses["luxe.utils.Maths"] = luxe_utils_Maths;
luxe_utils_Maths.__name__ = true;
luxe_utils_Maths.fixed = function(value,precision) {
	var n = Math.pow(10,precision);
	return (value * n | 0) / n;
};
luxe_utils_Maths.clamp = function(value,a,b) {
	if(value < a) return a; else if(value > b) return b; else return value;
};
var luxe_utils_Random = function(_initial_seed) {
	if(!(_initial_seed > 0)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("_initial_seed > 0" + (" ( " + "initial negative seed will return negative random results, if this was intentional, define luxe_random_allow_negative_seed" + " )")));
	this.initial = this.seed = _initial_seed;
	this.seed = this.initial;
};
$hxClasses["luxe.utils.Random"] = luxe_utils_Random;
luxe_utils_Random.__name__ = true;
luxe_utils_Random.prototype = {
	__class__: luxe_utils_Random
};
var luxe_utils_Utils = function(_luxe) {
	this.core = _luxe;
	this.geometry = new luxe_utils_GeometryUtils();
	this.random = new luxe_utils_Random(Math.random() * 16777215);
	this._byte_levels = ["bytes","Kb","MB","GB","TB"];
};
$hxClasses["luxe.utils.Utils"] = luxe_utils_Utils;
luxe_utils_Utils.__name__ = true;
luxe_utils_Utils.prototype = {
	uniqueid: function(val) {
		if(val == null) val = Std.random(2147483647);
		var to_char = function(value) {
			if(value > 9) {
				var ascii = 65 + (value - 10);
				if(ascii > 90) ascii += 6;
				return String.fromCharCode(ascii);
			} else return (value == null?"null":"" + value).charAt(0);
		};
		var r = val % 62 | 0;
		var q = val / 62 | 0;
		if(q > 0) return this.uniqueid(q) + to_char(r); else return Std.string(to_char(r));
	}
	,bytes_to_string: function(bytes,precision) {
		if(precision == null) precision = 3;
		var index = Math.floor(Math.log(bytes) / Math.log(1024));
		var _byte_value = bytes / Math.pow(1024,index);
		_byte_value = luxe_utils_Maths.fixed(_byte_value,precision);
		return _byte_value + " " + this._byte_levels[index];
	}
	,premultiply_alpha: function(_pixels) {
		var count = _pixels.length;
		var read = _pixels[0];
		var index = 0;
		while(index < count) {
			var r = _pixels[index];
			var g = _pixels[index + 1];
			var b = _pixels[index + 2];
			var a = _$UInt_UInt_$Impl_$.toFloat(_pixels[index + 3]) / 255.0;
			var val = Std["int"](_$UInt_UInt_$Impl_$.toFloat(r) * a);
			_pixels[index] = val;
			var val1 = Std["int"](_$UInt_UInt_$Impl_$.toFloat(g) * a);
			_pixels[index + 1] = val1;
			var val2 = Std["int"](_$UInt_UInt_$Impl_$.toFloat(b) * a);
			_pixels[index + 2] = val2;
			index += 4;
		}
		return _pixels;
	}
	,__class__: luxe_utils_Utils
};
var luxe_utils_unifill_Exception = $hxClasses["luxe.utils.unifill.Exception"] = { __ename__ : true, __constructs__ : ["InvalidCodePoint","InvalidCodeUnitSequence"] };
luxe_utils_unifill_Exception.InvalidCodePoint = function(code) { var $x = ["InvalidCodePoint",0,code]; $x.__enum__ = luxe_utils_unifill_Exception; $x.toString = $estr; return $x; };
luxe_utils_unifill_Exception.InvalidCodeUnitSequence = function(index) { var $x = ["InvalidCodeUnitSequence",1,index]; $x.__enum__ = luxe_utils_unifill_Exception; $x.toString = $estr; return $x; };
var luxe_utils_unifill_InternalEncoding = function() { };
$hxClasses["luxe.utils.unifill.InternalEncoding"] = luxe_utils_unifill_InternalEncoding;
luxe_utils_unifill_InternalEncoding.__name__ = true;
luxe_utils_unifill_InternalEncoding.charAt = function(s,index) {
	var this1;
	var this2 = s;
	var s1;
	var len;
	var c = this2.charCodeAt(index);
	if(!(55296 <= c && c <= 56319)) len = 1; else len = 2;
	var s2 = HxOverrides.substr(this2,index,len);
	s1 = s2;
	this1 = s1;
	return this1;
};
luxe_utils_unifill_InternalEncoding.codePointWidthAt = function(s,index) {
	var c = s.charCodeAt(index);
	if(!(55296 <= c && c <= 56319)) return 1; else return 2;
};
luxe_utils_unifill_InternalEncoding.offsetByCodePoints = function(s,index,codePointOffset) {
	var this1 = s;
	if(codePointOffset >= 0) {
		var index1 = index;
		var len = this1.length;
		var i = 0;
		while(i < codePointOffset && index1 < len) {
			var c = this1.charCodeAt(index1);
			if(!(55296 <= c && c <= 56319)) index1 += 1; else index1 += 2;
			++i;
		}
		return index1;
	} else {
		var index2 = index;
		var count = 0;
		while(count < -codePointOffset && 0 < index2) {
			var this2 = [this1];
			index2 -= luxe_utils_unifill__$Utf16_Utf16Impl.find_prev_code_point((function(this2) {
				return function(i1) {
					return this2[0].charCodeAt(i1);
				};
			})(this2),index2);
			++count;
		}
		return index2;
	}
};
var luxe_utils_unifill_Unifill = function() { };
$hxClasses["luxe.utils.unifill.Unifill"] = luxe_utils_unifill_Unifill;
luxe_utils_unifill_Unifill.__name__ = true;
luxe_utils_unifill_Unifill.uCharCodeAt = function(s,index) {
	var i = luxe_utils_unifill_InternalEncoding.offsetByCodePoints(s,0,index);
	return luxe_utils_unifill__$Utf16_Utf16_$Impl_$.codePointAt(s,i);
};
luxe_utils_unifill_Unifill.uIndexOf = function(s,value,startIndex) {
	if(startIndex == null) startIndex = 0;
	var index = s.indexOf(value,luxe_utils_unifill_InternalEncoding.offsetByCodePoints(s,0,startIndex));
	if(index >= 0) return luxe_utils_unifill__$Utf16_Utf16_$Impl_$.codePointCount(s,0,index); else return -1;
};
luxe_utils_unifill_Unifill.uSplit = function(s,delimiter) {
	if(delimiter.length == 0) {
		var _g = [];
		var _g1_i = 0;
		var _g1_string = s;
		var _g1_index = 0;
		var _g1_endIndex = s.length;
		while(_g1_index < _g1_endIndex) {
			var i;
			_g1_i = _g1_index;
			_g1_index += luxe_utils_unifill_InternalEncoding.codePointWidthAt(_g1_string,_g1_index);
			i = _g1_i;
			_g.push(luxe_utils_unifill_InternalEncoding.charAt(s,i));
		}
		return _g;
	} else return s.split(delimiter);
};
var luxe_utils_unifill__$Utf16_Utf16_$Impl_$ = {};
$hxClasses["luxe.utils.unifill._Utf16.Utf16_Impl_"] = luxe_utils_unifill__$Utf16_Utf16_$Impl_$;
luxe_utils_unifill__$Utf16_Utf16_$Impl_$.__name__ = true;
luxe_utils_unifill__$Utf16_Utf16_$Impl_$.codePointAt = function(this1,index) {
	return luxe_utils_unifill__$Utf16_Utf16Impl.decode_code_point(this1.length,function(i) {
		return this1.charCodeAt(i);
	},index);
};
luxe_utils_unifill__$Utf16_Utf16_$Impl_$.codePointCount = function(this1,beginIndex,endIndex) {
	var index = beginIndex;
	var i = 0;
	while(index < endIndex) {
		var c = this1.charCodeAt(index);
		if(!(55296 <= c && c <= 56319)) index += 1; else index += 2;
		++i;
	}
	return i;
};
var luxe_utils_unifill__$Utf16_Utf16Impl = function() { };
$hxClasses["luxe.utils.unifill._Utf16.Utf16Impl"] = luxe_utils_unifill__$Utf16_Utf16Impl;
luxe_utils_unifill__$Utf16_Utf16Impl.__name__ = true;
luxe_utils_unifill__$Utf16_Utf16Impl.find_prev_code_point = function(accessor,index) {
	var c = accessor(index - 1);
	if(!(56320 <= c && c <= 57343)) return 1; else return 2;
};
luxe_utils_unifill__$Utf16_Utf16Impl.decode_code_point = function(len,accessor,index) {
	if(index < 0 || len <= index) throw new js__$Boot_HaxeError(luxe_utils_unifill_Exception.InvalidCodeUnitSequence(index));
	var hi = accessor(index);
	if(55296 <= hi && hi <= 56319) {
		if(index + 1 < 0 || len <= index + 1) throw new js__$Boot_HaxeError(luxe_utils_unifill_Exception.InvalidCodeUnitSequence(index));
		var lo = accessor(index + 1);
		if(56320 <= lo && lo <= 57343) return hi - 55232 << 10 | lo & 1023; else throw new js__$Boot_HaxeError(luxe_utils_unifill_Exception.InvalidCodeUnitSequence(index));
	} else if(56320 <= hi && hi <= 57343) throw new js__$Boot_HaxeError(luxe_utils_unifill_Exception.InvalidCodeUnitSequence(index)); else return hi;
};
var phoenix_BatchState = function(_r) {
	this.batcher = _r;
	this.geom_state = new phoenix_geometry_GeometryState();
	this.last_geom_state = new phoenix_geometry_GeometryState();
};
$hxClasses["phoenix.BatchState"] = phoenix_BatchState;
phoenix_BatchState.__name__ = true;
phoenix_BatchState.prototype = {
	activate: function(batcher) {
		if(this.geom_state.dirty) {
			if(this.geom_state.texture != null) {
				if(this.last_texture_id != this.geom_state.texture.id) {
					this.last_texture_id = this.geom_state.texture.id;
					if(this.geom_state.texture.texture != null) this.geom_state.texture.bind();
				}
			} else {
				Luxe.renderer.state.bindTexture2D(null);
				this.last_texture_id = null;
			}
			var _shader;
			if(batcher.shader == null) _shader = this.geom_state.shader; else _shader = batcher.shader;
			if(_shader == null) {
				if(this.geom_state.texture != null) _shader = batcher.renderer.shaders.textured.shader; else _shader = batcher.renderer.shaders.plain.shader;
			}
			if(this.last_shader_id != _shader.program) {
				if(!_shader.no_default_uniforms) {
					_shader.uniforms.set_matrix4_arr("projectionMatrix",batcher.view.proj_arr,snow_modules_opengl_web_GL.current_context.getUniformLocation(_shader.program,"projectionMatrix"));
					_shader.uniforms.set_matrix4_arr("modelViewMatrix",batcher.view.view_inverse_arr,snow_modules_opengl_web_GL.current_context.getUniformLocation(_shader.program,"modelViewMatrix"));
				}
				_shader["use"]();
				_shader.uniforms.apply();
				Luxe.renderer.state.activeTexture(33984);
				this.last_shader_id = _shader.program;
			}
		}
		if(this.geom_state.clip) {
			if(!this.is_clipping) {
				snow_modules_opengl_web_GL.current_context.enable(3089);
				this.is_clipping = true;
			}
			if(this.clip_rect != null) {
				if(!this.clip_rect.equal(this.last_clip_rect)) {
					var _y = batcher.view.get_viewport().h - (this.clip_rect.y + this.clip_rect.h);
					snow_modules_opengl_web_GL.current_context.scissor(this.clip_rect.x | 0,_y | 0,this.clip_rect.w | 0,this.clip_rect.h | 0);
				}
			}
		} else if(this.is_clipping) {
			snow_modules_opengl_web_GL.current_context.disable(3089);
			this.is_clipping = false;
		}
		this.geom_state.dirty = false;
	}
	,deactivate: function(batcher) {
		if(this.last_texture_id != null) Luxe.renderer.state.bindTexture2D(null);
		Luxe.renderer.state.useProgram(null);
		if(this.is_clipping) snow_modules_opengl_web_GL.current_context.disable(3089);
	}
	,update: function(geom) {
		this.geom_state.clone_onto(this.last_geom_state);
		this.geom_state.update(geom.state);
		if(this.geom_state.clip) {
			this.last_clip_rect = this.clip_rect;
			this.clip_rect = geom.clip_rect;
		}
		return this.geom_state.dirty || this.last_clip_rect != this.clip_rect;
	}
	,__class__: phoenix_BatchState
};
var phoenix_Batcher = function(_r,_name) {
	if(_name == null) _name = "";
	this.normal_floats = 0;
	this.color_floats = 0;
	this.tcoord_floats = 0;
	this.pos_floats = 0;
	this.sequence = -1;
	this.name = "";
	this.visible_count = 0;
	this.static_batched_count = 0;
	this.dynamic_batched_count = 0;
	this.draw_calls = 0;
	this.vert_count = 0;
	this.max_floats = 0;
	this.max_verts = 0;
	this.tree_changed = false;
	this.layer = 0;
	this.enabled = true;
	this.id = Luxe.utils.uniqueid();
	this.renderer = _r;
	this.sequence = ++phoenix_Batcher._sequence_key;
	this.geometry = new luxe_structural_BalancedBST_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry($bind(this,this.geometry_compare));
	this.emitter = new luxe_Emitter();
	this.max_verts = Std["int"](Math.pow(2,16));
	this.max_floats = this.max_verts * 4;
	var elements = this.max_floats;
	var this1;
	if(elements != null) this1 = new Float32Array(elements); else this1 = null;
	this.pos_list = this1;
	var elements1 = this.max_floats;
	var this2;
	if(elements1 != null) this2 = new Float32Array(elements1); else this2 = null;
	this.tcoord_list = this2;
	var elements2 = this.max_floats;
	var this3;
	if(elements2 != null) this3 = new Float32Array(elements2); else this3 = null;
	this.color_list = this3;
	this.view = this.renderer.camera;
	snow_modules_opengl_web_GL.current_context.enableVertexAttribArray(0);
	snow_modules_opengl_web_GL.current_context.enableVertexAttribArray(1);
	snow_modules_opengl_web_GL.current_context.enableVertexAttribArray(2);
	if(_name.length == 0) this.name = Luxe.utils.uniqueid(); else this.name = _name;
	this._dropped = [];
};
$hxClasses["phoenix.Batcher"] = phoenix_Batcher;
phoenix_Batcher.__name__ = true;
phoenix_Batcher.prototype = {
	add: function(_geom,_force_add) {
		if(_force_add == null) _force_add = false;
		if(this.geometry.find(_geom.key) == null || _force_add) {
			if(!Lambda.has(_geom.batchers,this)) _geom.batchers.push(this);
			this.geometry.insert(_geom.key,_geom);
			_geom.added = true;
			this.tree_changed = true;
		} else {
		}
	}
	,remove: function(_geom,_remove_batcher_from_geometry) {
		if(_remove_batcher_from_geometry == null) _remove_batcher_from_geometry = true;
		if(_remove_batcher_from_geometry) {
			HxOverrides.remove(_geom.batchers,this);
			if(_geom.batchers.length == 0) _geom.added = false;
		}
		var countbefore = this.geometry.size();
		this.geometry.remove(_geom.key);
		var countafter = this.geometry.size();
		if(countbefore == countafter) {
		}
		this.tree_changed = true;
	}
	,batch: function(persist_immediate) {
		if(persist_immediate == null) persist_immediate = false;
		this.dynamic_batched_count = 0;
		this.static_batched_count = 0;
		this.visible_count = 0;
		this.pos_floats = 0;
		this.tcoord_floats = 0;
		this.color_floats = 0;
		this.normal_floats = 0;
		this.state = new phoenix_BatchState(this);
		var geom = null;
		var _g = new luxe_structural_BalancedBSTIterator_$phoenix_$geometry_$GeometryKey_$phoenix_$geometry_$Geometry(this.geometry);
		while(_g.current == null || _g.rightest == null?false:_g.tree.compare(_g.current.key,_g.rightest.key) <= 0) {
			var _geom = _g.next();
			geom = _geom;
			if(geom != null && !geom.dropped) {
				if(this.state.update(geom)) this.submit_current_vertex_list(this.state.last_geom_state.primitive_type);
				this.state.activate(this);
				if(geom.visible) {
					this.visible_count++;
					if(geom.buffer_based) {
						this.visible_count--;
						continue;
					}
					if(geom.locked) {
						this.submit_current_vertex_list(this.state.last_geom_state.primitive_type);
						this.submit_static_geometry(geom);
						this.vert_count += geom.vertices.length;
					} else if(geom.state.primitive_type == 3 || geom.state.primitive_type == 2 || geom.state.primitive_type == 5 || geom.state.primitive_type == 6) {
						this.geometry_batch(geom);
						this.submit_current_vertex_list(geom.state.primitive_type);
						this.vert_count += geom.vertices.length;
					} else {
						this.geometry_batch(geom);
						this.dynamic_batched_count++;
						this.vert_count += geom.vertices.length;
					}
					if(!persist_immediate && geom.immediate) {
						geom.dropped = true;
						this._dropped.push(geom);
					}
				}
			}
		}
		if(this.pos_floats > 0 && geom != null) {
			this.state.update(geom);
			this.state.activate(this);
			this.submit_current_vertex_list(this.state.last_geom_state.primitive_type);
		}
		this.state.deactivate(this);
		this.state = null;
		this.prune();
	}
	,prune: function() {
		if(this._dropped.length > 0) {
			var _g = 0;
			var _g1 = this._dropped;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.drop();
				geom = null;
			}
			this._dropped = null;
			this._dropped = [];
		}
	}
	,submit_buffers: function(type,_pos,_tcoords,_colors,_normals) {
		var pb = snow_modules_opengl_web_GL.current_context.createBuffer();
		var cb = snow_modules_opengl_web_GL.current_context.createBuffer();
		var tb = snow_modules_opengl_web_GL.current_context.createBuffer();
		snow_modules_opengl_web_GL.current_context.bindBuffer(34962,pb);
		snow_modules_opengl_web_GL.current_context.vertexAttribPointer(0,4,5126,false,0,0);
		snow_modules_opengl_web_GL.current_context.bufferData(34962,_pos,35040);
		snow_modules_opengl_web_GL.current_context.bindBuffer(34962,tb);
		snow_modules_opengl_web_GL.current_context.vertexAttribPointer(1,4,5126,false,0,0);
		snow_modules_opengl_web_GL.current_context.bufferData(34962,_tcoords,35040);
		snow_modules_opengl_web_GL.current_context.bindBuffer(34962,cb);
		snow_modules_opengl_web_GL.current_context.vertexAttribPointer(2,4,5126,false,0,0);
		snow_modules_opengl_web_GL.current_context.bufferData(34962,_colors,35040);
		snow_modules_opengl_web_GL.current_context.drawArrays(type,0,_pos.length / 4 | 0);
		snow_modules_opengl_web_GL.current_context.deleteBuffer(pb);
		snow_modules_opengl_web_GL.current_context.deleteBuffer(cb);
		snow_modules_opengl_web_GL.current_context.deleteBuffer(tb);
		this.draw_calls++;
	}
	,submit_static_geometry: function(geom) {
		var _length = geom.vertices.length;
		if(_length == 0) return;
		var _updated = geom.update_buffers();
		if(_updated) {
			snow_modules_opengl_web_GL.current_context.bindBuffer(34962,geom.vb_pos);
			snow_modules_opengl_web_GL.current_context.vertexAttribPointer(0,4,5126,false,0,0);
			snow_modules_opengl_web_GL.current_context.bufferData(34962,geom.buffer_pos,geom.buffer_type);
			snow_modules_opengl_web_GL.current_context.bindBuffer(34962,geom.vb_tcoords);
			snow_modules_opengl_web_GL.current_context.vertexAttribPointer(1,4,5126,false,0,0);
			snow_modules_opengl_web_GL.current_context.bufferData(34962,geom.buffer_tcoords,geom.buffer_type);
			snow_modules_opengl_web_GL.current_context.bindBuffer(34962,geom.vb_colors);
			snow_modules_opengl_web_GL.current_context.vertexAttribPointer(2,4,5126,false,0,0);
			snow_modules_opengl_web_GL.current_context.bufferData(34962,geom.buffer_colors,geom.buffer_type);
		} else {
			snow_modules_opengl_web_GL.current_context.bindBuffer(34962,geom.vb_pos);
			snow_modules_opengl_web_GL.current_context.vertexAttribPointer(0,4,5126,false,0,0);
			snow_modules_opengl_web_GL.current_context.bindBuffer(34962,geom.vb_tcoords);
			snow_modules_opengl_web_GL.current_context.vertexAttribPointer(1,4,5126,false,0,0);
			snow_modules_opengl_web_GL.current_context.bindBuffer(34962,geom.vb_colors);
			snow_modules_opengl_web_GL.current_context.vertexAttribPointer(2,4,5126,false,0,0);
		}
		snow_modules_opengl_web_GL.current_context.drawArrays(geom.state.primitive_type,0,geom.buffer_pos.length / 4 | 0);
		this.static_batched_count++;
		this.draw_calls++;
		geom.set_dirty(false);
	}
	,submit_current_vertex_list: function(type) {
		if(this.pos_floats == 0) return;
		if(this.pos_floats > this.max_floats) throw new js__$Boot_HaxeError("uh oh, somehow too many floats are being submitted (max:$max_floats, attempt:$pos_floats).");
		var _pos;
		var buffer = this.pos_list.buffer;
		var len = this.pos_floats;
		var this1;
		if(buffer != null) {
			if(len == null) this1 = new Float32Array(buffer,0); else this1 = new Float32Array(buffer,0,len);
		} else this1 = null;
		_pos = this1;
		var _tcoords;
		var buffer1 = this.tcoord_list.buffer;
		var len1 = this.tcoord_floats;
		var this2;
		if(buffer1 != null) {
			if(len1 == null) this2 = new Float32Array(buffer1,0); else this2 = new Float32Array(buffer1,0,len1);
		} else this2 = null;
		_tcoords = this2;
		var _colors;
		var buffer2 = this.color_list.buffer;
		var len2 = this.color_floats;
		var this3;
		if(buffer2 != null) {
			if(len2 == null) this3 = new Float32Array(buffer2,0); else this3 = new Float32Array(buffer2,0,len2);
		} else this3 = null;
		_colors = this3;
		var _normals = null;
		this.submit_buffers(type,_pos,_tcoords,_colors,_normals);
		_pos = null;
		_tcoords = null;
		_colors = null;
		_normals = null;
		this.pos_floats = 0;
		this.tcoord_floats = 0;
		this.color_floats = 0;
		this.normal_floats = 0;
	}
	,geometry_batch: function(geom) {
		var _count_after = geom.vertices.length + this.pos_floats / 4;
		if(_count_after > this.max_verts) this.submit_current_vertex_list(geom.state.primitive_type);
		geom.batch(this.pos_floats,this.tcoord_floats,this.color_floats,this.normal_floats,this.pos_list,this.tcoord_list,this.color_list,this.normal_list);
		var _length = geom.vertices.length * 4;
		this.pos_floats += _length;
		this.tcoord_floats += _length;
		this.color_floats += _length;
		this.normal_floats += _length;
	}
	,set_layer: function(_layer) {
		this.layer = _layer;
		this.renderer.batchers.sort(($_=this.renderer,$bind($_,$_.sort_batchers)));
		return this.layer;
	}
	,geometry_compare: function(a,b) {
		if(a.uuid == b.uuid) return 0;
		if(a.depth < b.depth) return -1;
		if(a.depth > b.depth) return 1;
		if(a.shader != null && b.shader != null) {
			if(a.shader.id < b.shader.id) return -1;
			if(a.shader.id > b.shader.id) return 1;
		} else if(a.shader != null && b.shader == null) return 1; else if(a.shader == null && b.shader != null) return -1;
		if(a.texture != null && b.texture != null) {
			if(a.texture.id < b.texture.id) return -1;
			if(a.texture.id > b.texture.id) return 1;
		} else if(a.texture != null && b.texture == null) return 1; else if(a.texture == null && b.texture != null) return -1;
		var a_primitive_index = a.primitive_type;
		var b_primitive_index = b.primitive_type;
		if(a_primitive_index < b_primitive_index) return -1;
		if(a_primitive_index > b_primitive_index) return 1;
		if(a.clip != b.clip) {
			if(a.clip == false && b.clip == true) return 1; else if(a.clip == true && b.clip == false) return -1;
		}
		if(a.timestamp < b.timestamp) return -1;
		if(a.timestamp >= b.timestamp) return 1;
		if(a.sequence < b.sequence) return -1;
		if(a.sequence > b.sequence) return 1;
		return 1;
	}
	,__class__: phoenix_Batcher
	,__properties__: {set_layer:"set_layer"}
};
var phoenix_BitmapFont = function(_options) {
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + ""));
	_options.resource_type = 6;
	luxe_resource_Resource.call(this,_options);
	if(_options.texture_path != null) this.texture_path = _options.texture_path; else this.texture_path = haxe_io_Path.directory(this.id);
	this.pages = new haxe_ds_IntMap();
	if(_options.pages != null) {
		if(_options.font_data == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options.font_data was null" + (" ( " + "BitmapFont create from pages + font_data requires both of those options" + " )")));
	}
	if(_options.font_data != null) {
		if(_options.pages == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options.pages was null" + (" ( " + "BitmapFont create from pages + font_data requires both of those options" + " )")));
		this.set_info(luxe_importers_bitmapfont_BitmapFontParser.parse(_options.font_data));
		this.apply_pages(_options.pages);
	}
};
$hxClasses["phoenix.BitmapFont"] = phoenix_BitmapFont;
phoenix_BitmapFont.__name__ = true;
phoenix_BitmapFont.__super__ = luxe_resource_Resource;
phoenix_BitmapFont.prototype = $extend(luxe_resource_Resource.prototype,{
	kerning: function(_first,_second) {
		var _map = this.info.kernings.h[_first];
		if(_map != null && _map.h.hasOwnProperty(_second)) return _map.h[_second];
		return 0;
	}
	,wrap_string_to_bounds: function(_string,_bounds,_point_size,_letter_spc) {
		if(_letter_spc == null) _letter_spc = 0.0;
		if(_point_size == null) _point_size = 1.0;
		var _g = this;
		if(_bounds == null) return _string;
		var _cur_x = 0.0;
		var _idx = 0;
		var _final_str = "";
		var _spacew = _g.width_of(" ",_point_size,_letter_spc,null);
		var _strings = _string.split(" ");
		var _count = _strings.length;
		var _g1 = 0;
		while(_g1 < _strings.length) {
			var _str = _strings[_g1];
			++_g1;
			if(luxe_utils_unifill_Unifill.uIndexOf(_str,"\n",null) == -1) {
				if(_str == "") _str = " ";
				var _w = _g.width_of(_str,_point_size,_letter_spc,null);
				if(_cur_x + _w > _bounds.w) {
					_cur_x = 0;
					_final_str += "\n";
				}
				_cur_x += _w;
				_final_str += _str;
			} else {
				var _widx = 0;
				var _words = _str.split("\n");
				var _g11 = 0;
				while(_g11 < _words.length) {
					var _word = _words[_g11];
					++_g11;
					if(_word != "") {
						var _w1 = _g.width_of(_word,_point_size,_letter_spc,null);
						if(_cur_x + _w1 > _bounds.w) {
							_cur_x = 0;
							_final_str += "\n";
						}
						_cur_x += _w1;
						_final_str += _word;
					} else _cur_x = 0;
					if(_widx < _words.length - 1) {
						_final_str += "\n";
						_cur_x = 0;
					}
					_widx++;
				}
			}
			if(_idx < _count - 1) {
				_final_str += " ";
				_cur_x += _spacew + _letter_spc;
			}
			_idx++;
		}
		return _final_str;
	}
	,width_of_line: function(_string,_point_size,_letter_spc) {
		if(_letter_spc == null) _letter_spc = 0.0;
		if(_point_size == null) _point_size = 1.0;
		var _cur_x = 0.0;
		var _cur_w = 0.0;
		var _ratio = _point_size / this.info.point_size;
		var i = 0;
		var _len = luxe_utils_unifill__$Utf16_Utf16_$Impl_$.codePointCount(_string,0,_string.length);
		var _g_i = 0;
		var _g_string = _string;
		var _g_index = 0;
		var _g_endIndex = _string.length;
		while(_g_index < _g_endIndex) {
			var _uglyph;
			_g_i = _g_index;
			_g_index += luxe_utils_unifill_InternalEncoding.codePointWidthAt(_g_string,_g_index);
			_uglyph = luxe_utils_unifill__$Utf16_Utf16_$Impl_$.codePointAt(_g_string,_g_i);
			var _index = _uglyph;
			var _char = this.info.chars.h[_index];
			if(_char == null) _char = this.space_char;
			var _cw = (_char.xoffset + Math.max(_char.width,_char.xadvance)) * _ratio;
			var _cx = _cur_x + _char.xoffset * _ratio;
			var _spacing = _char.xadvance;
			if(i < _len - 1) {
				var _next_index = luxe_utils_unifill_Unifill.uCharCodeAt(_string,i + 1);
				_spacing += this.kerning(_index,_next_index);
				if(_next_index >= 32) _spacing += _letter_spc;
			}
			_cur_x += _spacing * _ratio;
			_cur_w = Math.max(_cur_w,_cx + _cw);
			++i;
		}
		return _cur_w;
	}
	,width_of: function(_string,_point_size,_letter_spc,_line_widths) {
		if(_letter_spc == null) _letter_spc = 0.0;
		if(_point_size == null) _point_size = 1.0;
		var _max_w = 0.0;
		var _push_widths = _line_widths != null;
		var _lines = luxe_utils_unifill_Unifill.uSplit(_string,"\n");
		var _g = 0;
		while(_g < _lines.length) {
			var _line = _lines[_g];
			++_g;
			var _cur_w = this.width_of_line(_line,_point_size,_letter_spc);
			_max_w = Math.max(_max_w,_cur_w);
			if(_push_widths) _line_widths.push(_cur_w);
		}
		return _max_w;
	}
	,height_of_lines: function(_lines,_point_size,_line_spc) {
		if(_line_spc == null) _line_spc = 0.0;
		var _ratio = _point_size / this.info.point_size;
		return _lines.length * ((this.info.line_height + _line_spc) * _ratio);
	}
	,clear: function() {
		this.set_info(null);
		var _i = 0;
		var $it0 = this.pages.keys();
		while( $it0.hasNext() ) {
			var _pageid = $it0.next();
			var _page = this.pages.h[_pageid];
			_page.destroy();
			this.pages.remove(_pageid);
			_page = null;
		}
	}
	,reload: function() {
		var _g = this;
		if(!(this.state != 6)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("state != ResourceState.destroyed" + ""));
		this.clear();
		return new snow_api_Promise(function(resolve,reject) {
			_g.set_state(2);
			var _font_get = snow_system_assets_AssetText.load(Luxe.core.app.assets,_g.id);
			_font_get.then(function(_asset) {
				_g.set_info(luxe_importers_bitmapfont_BitmapFontParser.parse(_asset.text));
				if(_g.info == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("info was null" + ""));
				var _tex_get = [];
				var _g1 = 0;
				var _g2 = _g.info.pages;
				while(_g1 < _g2.length) {
					var _page = _g2[_g1];
					++_g1;
					var _path = haxe_io_Path.join([_g.texture_path,_page.file]);
					var _prior = _g.system.cache.get(_path);
					if(_prior != null) _tex_get.push(_prior.reload()); else _tex_get.push(_g.system.load_texture(_path));
				}
				snow_api_Promise.all(_tex_get).then(function(_pages) {
					_g.apply_pages(_pages);
					_g.set_state(3);
					resolve(_g);
				}).error(function(_error) {
					_g.set_state(4);
					reject(_error);
				});
			}).error(function(_error1) {
				_g.set_state(4);
				reject(_error1);
			});
		});
	}
	,apply_pages: function(_pages) {
		var _pageid = 0;
		var _g = 0;
		while(_g < _pages.length) {
			var _page = _pages[_g];
			++_g;
			_page.slot = _pageid;
			this.pages.h[_pageid] = _page;
			++_pageid;
		}
	}
	,set_info: function(_info) {
		this.info = _info;
		if(this.info != null) this.space_char = this.info.chars.h[32];
		return this.info;
	}
	,__class__: phoenix_BitmapFont
	,__properties__: $extend(luxe_resource_Resource.prototype.__properties__,{set_info:"set_info"})
});
var phoenix_ProjectionType = $hxClasses["phoenix.ProjectionType"] = { __ename__ : true, __constructs__ : ["ortho","perspective","custom"] };
phoenix_ProjectionType.ortho = ["ortho",0];
phoenix_ProjectionType.ortho.toString = $estr;
phoenix_ProjectionType.ortho.__enum__ = phoenix_ProjectionType;
phoenix_ProjectionType.perspective = ["perspective",1];
phoenix_ProjectionType.perspective.toString = $estr;
phoenix_ProjectionType.perspective.__enum__ = phoenix_ProjectionType;
phoenix_ProjectionType.custom = ["custom",2];
phoenix_ProjectionType.custom.toString = $estr;
phoenix_ProjectionType.custom.__enum__ = phoenix_ProjectionType;
var phoenix_Camera = function(_options) {
	this._refresh_pos = false;
	this._setup = true;
	this.look_at_dirty = true;
	this.projection_dirty = true;
	this.transform_dirty = true;
	this.minimum_zoom = 0.01;
	this.aspect = 1.5;
	this.fov_type = phoenix_FOVType.horizontal;
	this.fov = 60;
	this.far = -1000;
	this.near = 1000;
	this.zoom = 1.0;
	this.name = "camera";
	this.transform = new phoenix_Transform();
	this.options = _options;
	if(this.options == null) this.options = this.default_camera_options();
	this.options;
	if(this.options.camera_name != null) this.name = this.options.camera_name;
	if(this.options.projection != null) this.projection = this.options.projection; else this.projection = phoenix_ProjectionType.ortho;
	this.set_center(new phoenix_Vector(Luxe.core.screen.get_w() / 2,Luxe.core.screen.get_h() / 2));
	this.set_pos(new phoenix_Vector());
	if(this.options.viewport != null) this.set_viewport(this.options.viewport); else this.set_viewport(new phoenix_Rectangle(0,0,Luxe.core.screen.get_w(),Luxe.core.screen.get_h()));
	this.up = new phoenix_Vector(0,1,0);
	this.projection_matrix = new phoenix_Matrix();
	this.view_matrix = new phoenix_Matrix();
	this.view_matrix_inverse = new phoenix_Matrix();
	this.look_at_matrix = new phoenix_Matrix();
	this.transform.listen($bind(this,this.on_transform_cleaned));
	var _g = this.projection;
	switch(_g[1]) {
	case 0:
		this.set_ortho(this.options);
		break;
	case 1:
		this.set_perspective(this.options);
		break;
	case 2:
		break;
	}
	this.process();
	this._setup = false;
};
$hxClasses["phoenix.Camera"] = phoenix_Camera;
phoenix_Camera.__name__ = true;
phoenix_Camera.prototype = {
	set_ortho: function(_options) {
		this.projection = phoenix_ProjectionType.ortho;
		this._merge_options(_options);
	}
	,set_perspective: function(_options) {
		this.projection = phoenix_ProjectionType.perspective;
		this._merge_options(_options);
		this.transform.origin.set_xyz(0,0,0);
	}
	,process: function() {
		if(this.target != null) this.update_look_at();
		this.update_projection_matrix();
		this.update_view_matrix();
		this.apply_state(2884,this.options.cull_backfaces);
		this.apply_state(2929,this.options.depth_test);
	}
	,on_transform_cleaned: function(t) {
		this.transform_dirty = true;
	}
	,update_look_at: function() {
		if(this.look_at_dirty && this.target != null) {
			this.look_at_matrix.lookAt(this.target,this.get_pos(),this.up);
			this.get_rotation().setFromRotationMatrix(this.look_at_matrix);
		}
	}
	,update_view_matrix: function() {
		this.view_matrix = this.transform.get_world().get_matrix();
		if(!this.transform_dirty) return;
		this.view_matrix_inverse = this.view_matrix.inverse();
		this.view_inverse_arr = this.view_matrix_inverse.float32array();
		this.transform_dirty = false;
	}
	,update_projection_matrix: function() {
		if(!this.projection_dirty) return;
		var _g = this.projection;
		switch(_g[1]) {
		case 1:
			this.projection_matrix.makePerspective(this.fov_y,this.aspect,this.near,this.far);
			break;
		case 0:
			this.projection_matrix.makeOrthographic(0,this.get_viewport().w,0,this.get_viewport().h,this.near,this.far);
			break;
		case 2:
			break;
		}
		this.proj_arr = this.projection_matrix.float32array();
		this.projection_dirty = false;
	}
	,apply_state: function(state,value) {
		if(value) Luxe.renderer.state.enable(state); else Luxe.renderer.state.disable(state);
	}
	,apply_default_camera_options: function() {
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			this.options.cull_backfaces = false;
			this.options.depth_test = false;
			break;
		case 1:
			this.options.cull_backfaces = true;
			this.options.depth_test = true;
			break;
		case 2:
			break;
		}
	}
	,default_camera_options: function() {
		return { projection : phoenix_ProjectionType.ortho, depth_test : false, cull_backfaces : false, near : 1000, far : -1000};
	}
	,set_fov: function(_fov) {
		this.projection_dirty = true;
		this.options.fov = _fov;
		if(this.fov_type == phoenix_FOVType.horizontal) this.fov_y = 180 / Math.PI * (2 * Math.atan(Math.tan(_fov * (Math.PI / 180) / 2) * (1 / this.aspect))); else this.fov_y = _fov;
		return this.fov = _fov;
	}
	,set_fov_type: function(_fov_type) {
		this.options.fov_type = _fov_type;
		this.fov_type = _fov_type;
		this.set_fov(this.fov);
		return this.fov_type;
	}
	,set_aspect: function(_aspect) {
		this.projection_dirty = true;
		this.options.aspect = _aspect;
		return this.aspect = _aspect;
	}
	,set_near: function(_near) {
		this.projection_dirty = true;
		this.options.near = _near;
		return this.near = _near;
	}
	,set_far: function(_far) {
		this.projection_dirty = true;
		this.options.far = _far;
		return this.far = _far;
	}
	,set_zoom: function(_z) {
		var _new_zoom = _z;
		if(_new_zoom < this.minimum_zoom) _new_zoom = this.minimum_zoom;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			this.transform.local.scale.set_x(1 / _new_zoom);
			this.transform.local.scale.set_y(1 / _new_zoom);
			this.transform.local.scale.set_z(1 / _new_zoom);
			break;
		case 1:
			break;
		case 2:
			break;
		}
		return this.zoom = _new_zoom;
	}
	,set_center: function(_p) {
		this.center = _p;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			if(!this._refresh_pos && !this._setup) {
				this.get_pos().ignore_listeners = true;
				this.get_pos().set_x(_p.x - this.get_viewport().w / 2);
				this.get_pos().set_y(_p.y - this.get_viewport().h / 2);
				this.get_pos().ignore_listeners = false;
				this.transform.local.pos.copy_from(_p);
			}
			break;
		case 1:
			break;
		case 2:
			break;
		}
		phoenix_Vector.Listen(this.get_center(),$bind(this,this._center_changed));
		return this.get_center();
	}
	,get_center: function() {
		return this.center;
	}
	,get_pos: function() {
		return this.pos;
	}
	,get_rotation: function() {
		return this.transform.local.rotation;
	}
	,get_scale: function() {
		return this.transform.local.scale;
	}
	,get_viewport: function() {
		return this.viewport;
	}
	,set_viewport: function(_r) {
		this.projection_dirty = true;
		this.viewport = _r;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			this.transform.set_origin(new phoenix_Vector(_r.w / 2,_r.h / 2));
			this.set_pos(this.get_pos());
			break;
		case 1:
			break;
		case 2:
			break;
		}
		return this.get_viewport();
	}
	,set_rotation: function(_q) {
		return this.transform.local.set_rotation(_q);
	}
	,set_scale: function(_s) {
		return this.transform.local.set_scale(_s);
	}
	,set_pos: function(_p) {
		this.pos = _p;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			var _cx = this.get_center().x;
			var _cy = this.get_center().y;
			if(this.get_viewport() != null) {
				_cx = _p.x + this.get_viewport().w / 2;
				_cy = _p.y + this.get_viewport().h / 2;
			}
			this._refresh_pos = true;
			this.get_center().ignore_listeners = true;
			this.get_center().set_x(_cx);
			this.get_center().set_y(_cy);
			this.get_center().ignore_listeners = false;
			this._refresh_pos = false;
			this.transform.local.pos.set_x(_cx);
			this.transform.local.pos.set_y(_cy);
			break;
		case 1:
			this.transform.set_pos(this.get_pos());
			break;
		case 2:
			break;
		}
		phoenix_Vector.Listen(this.get_pos(),$bind(this,this._pos_changed));
		return this.get_pos();
	}
	,_merge_options: function(_options) {
		this.apply_default_camera_options();
		if(_options.aspect != null) {
			this.options.aspect = _options.aspect;
			this.set_aspect(this.options.aspect);
		}
		if(_options.far != null) {
			this.options.far = _options.far;
			this.set_far(this.options.far);
		}
		if(_options.fov != null) {
			this.options.fov = _options.fov;
			this.set_fov(this.options.fov);
		}
		if(_options.fov_type != null) {
			this.options.fov_type = _options.fov_type;
			this.set_fov_type(_options.fov_type);
		} else {
			this.options.fov_type = phoenix_FOVType.horizontal;
			this.set_fov_type(phoenix_FOVType.horizontal);
		}
		if(_options.near != null) {
			this.options.near = _options.near;
			this.set_near(this.options.near);
		}
		if(_options.viewport != null) {
			this.options.viewport = _options.viewport;
			this.set_viewport(this.options.viewport);
		}
		if(_options.cull_backfaces != null) this.options.cull_backfaces = _options.cull_backfaces;
		if(_options.depth_test != null) this.options.depth_test = _options.depth_test;
	}
	,_pos_changed: function(v) {
		this.set_pos(this.get_pos());
	}
	,_center_changed: function(v) {
		this.set_center(this.get_center());
	}
	,__class__: phoenix_Camera
	,__properties__: {set_rotation:"set_rotation",get_rotation:"get_rotation",set_scale:"set_scale",get_scale:"get_scale",set_pos:"set_pos",get_pos:"get_pos",set_aspect:"set_aspect",set_fov_type:"set_fov_type",set_fov:"set_fov",set_far:"set_far",set_near:"set_near",set_zoom:"set_zoom",set_center:"set_center",get_center:"get_center",set_viewport:"set_viewport",get_viewport:"get_viewport"}
};
var phoenix_FOVType = $hxClasses["phoenix.FOVType"] = { __ename__ : true, __constructs__ : ["vertical","horizontal"] };
phoenix_FOVType.vertical = ["vertical",0];
phoenix_FOVType.vertical.toString = $estr;
phoenix_FOVType.vertical.__enum__ = phoenix_FOVType;
phoenix_FOVType.horizontal = ["horizontal",1];
phoenix_FOVType.horizontal.toString = $estr;
phoenix_FOVType.horizontal.__enum__ = phoenix_FOVType;
var phoenix_ColorHSL = function() {
	this.l = 1.0;
	this.s = 1.0;
	this.h = 0.0;
};
$hxClasses["phoenix.ColorHSL"] = phoenix_ColorHSL;
phoenix_ColorHSL.__name__ = true;
phoenix_ColorHSL.__super__ = phoenix_Color;
phoenix_ColorHSL.prototype = $extend(phoenix_Color.prototype,{
	set_h: function(_h) {
		this.h = _h;
		this._refresh();
		return _h;
	}
	,set_s: function(_s) {
		this.s = _s;
		this._refresh();
		return _s;
	}
	,set_l: function(_l) {
		this.l = _l;
		this._refresh();
		return _l;
	}
	,_refresh: function() {
		this.refreshing = true;
		phoenix_Color.prototype.fromColorHSL.call(this,this);
		this.refreshing = false;
		return this;
	}
	,fromColor: function(_color) {
		var max = _color.maxRGB();
		var min = _color.minRGB();
		var add = max + min;
		var sub = max - min;
		var _h = 0;
		if(max == min) _h = 0; else if(max == _color.r) _h = (60 * (_color.g - _color.b) / sub + 360) % 360; else if(max == _color.g) _h = 60 * (_color.b - _color.r) / sub + 120; else if(max == _color.b) _h = 60 * (_color.r - _color.g) / sub + 240;
		var _l = add / 2;
		var _s;
		if(max == min) _s = 0; else if(this.l <= 0.5) _s = sub / add; else _s = sub / (2 - add);
		this.set_h(_h);
		this.set_s(_s);
		this.set_l(_l);
		this.a = _color.a;
		return this;
	}
	,__class__: phoenix_ColorHSL
	,__properties__: $extend(phoenix_Color.prototype.__properties__,{set_l:"set_l",set_s:"set_s",set_h:"set_h"})
});
var phoenix_ColorHSV = function() {
	this.v = 1.0;
	this.s = 0.0;
	this.h = 0.0;
};
$hxClasses["phoenix.ColorHSV"] = phoenix_ColorHSV;
phoenix_ColorHSV.__name__ = true;
phoenix_ColorHSV.__super__ = phoenix_Color;
phoenix_ColorHSV.prototype = $extend(phoenix_Color.prototype,{
	set_h: function(_h) {
		this.h = _h;
		this._refresh();
		return _h;
	}
	,set_s: function(_s) {
		this.s = _s;
		this._refresh();
		return this.s;
	}
	,set_v: function(_v) {
		this.v = _v;
		this._refresh();
		return this.v;
	}
	,_refresh: function() {
		this.refreshing = true;
		phoenix_Color.prototype.fromColorHSV.call(this,this);
		this.refreshing = false;
		return this;
	}
	,fromColorHSL: function(_color_hsl) {
		_color_hsl._refresh();
		return this.fromColor(_color_hsl);
	}
	,fromColor: function(_color) {
		var max = _color.maxRGB();
		var min = _color.minRGB();
		var add = max + min;
		var sub = max - min;
		var _h = 0;
		if(max == min) _h = 0; else if(max == _color.r) _h = (60 * (_color.g - _color.b) / sub + 360) % 360; else if(max == _color.g) _h = 60 * (_color.b - _color.r) / sub + 120; else if(max == _color.b) _h = 60 * (_color.r - _color.g) / sub + 240;
		var _s;
		if(max == 0) _s = 0; else _s = 1 - min / max;
		this.set_h(_h);
		this.set_s(_s);
		this.set_v(max);
		this.a = _color.a;
		return this;
	}
	,__class__: phoenix_ColorHSV
	,__properties__: $extend(phoenix_Color.prototype.__properties__,{set_v:"set_v",set_s:"set_s",set_h:"set_h"})
});
var phoenix_MatrixTransform = function(p,r,s) {
	this.pos = p;
	this.rotation = r;
	this.scale = s;
};
$hxClasses["phoenix.MatrixTransform"] = phoenix_MatrixTransform;
phoenix_MatrixTransform.__name__ = true;
phoenix_MatrixTransform.prototype = {
	__class__: phoenix_MatrixTransform
};
var phoenix_Matrix = function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
	if(n44 == null) n44 = 1;
	if(n43 == null) n43 = 0;
	if(n42 == null) n42 = 0;
	if(n41 == null) n41 = 0;
	if(n34 == null) n34 = 0;
	if(n33 == null) n33 = 1;
	if(n32 == null) n32 = 0;
	if(n31 == null) n31 = 0;
	if(n24 == null) n24 = 0;
	if(n23 == null) n23 = 0;
	if(n22 == null) n22 = 1;
	if(n21 == null) n21 = 0;
	if(n14 == null) n14 = 0;
	if(n13 == null) n13 = 0;
	if(n12 == null) n12 = 0;
	if(n11 == null) n11 = 1;
	this.elements = [];
	var i = 0;
	while(i++ < 16) this.elements.push(0.0);
	this.set(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44);
	var array = this.elements;
	var this1;
	if(array != null) this1 = new Float32Array(array); else this1 = null;
	this._float32array = this1;
};
$hxClasses["phoenix.Matrix"] = phoenix_Matrix;
phoenix_Matrix.__name__ = true;
phoenix_Matrix.prototype = {
	set: function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
		var e = this.elements;
		e[0] = n11;
		e[4] = n12;
		e[8] = n13;
		e[12] = n14;
		e[1] = n21;
		e[5] = n22;
		e[9] = n23;
		e[13] = n24;
		e[2] = n31;
		e[6] = n32;
		e[10] = n33;
		e[14] = n34;
		e[3] = n41;
		e[7] = n42;
		e[11] = n43;
		e[15] = n44;
		return this;
	}
	,float32array: function() {
		var i = 0;
		while(i < 16) {
			this._float32array[i] = this.elements[i];
			++i;
		}
		return this._float32array;
	}
	,makeRotationFromQuaternion: function(q) {
		var te = this.elements;
		var x2 = q.x + q.x;
		var y2 = q.y + q.y;
		var z2 = q.z + q.z;
		var xx = q.x * x2;
		var xy = q.x * y2;
		var xz = q.x * z2;
		var yy = q.y * y2;
		var yz = q.y * z2;
		var zz = q.z * z2;
		var wx = q.w * x2;
		var wy = q.w * y2;
		var wz = q.w * z2;
		te[0] = 1 - (yy + zz);
		te[4] = xy - wz;
		te[8] = xz + wy;
		te[1] = xy + wz;
		te[5] = 1 - (xx + zz);
		te[9] = yz - wx;
		te[2] = xz - wy;
		te[6] = yz + wx;
		te[10] = 1 - (xx + yy);
		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[12] = 0;
		te[13] = 0;
		te[14] = 0;
		te[15] = 1;
		return this;
	}
	,lookAt: function(_eye,_target,_up) {
		var _x = new phoenix_Vector();
		var _y = new phoenix_Vector();
		var _z = new phoenix_Vector();
		var te = this.elements;
		_z = new phoenix_Vector(_target.x - _eye.x,_target.y - _eye.y,_target.z - _eye.z).get_normalized();
		if(Math.sqrt(_z.x * _z.x + _z.y * _z.y + _z.z * _z.z) == 0) {
			_z.z = 1;
			if(_z._construct) _z.z; else {
				if(_z.listen_z != null && !_z.ignore_listeners) _z.listen_z(1);
				_z.z;
			}
		}
		_x = new phoenix_Vector(_up.y * _z.z - _up.z * _z.y,_up.z * _z.x - _up.x * _z.z,_up.x * _z.y - _up.y * _z.x).get_normalized();
		if(Math.sqrt(_x.x * _x.x + _x.y * _x.y + _x.z * _x.z) == 0) {
			var _g = _z;
			_g.set_x(_g.x + 0.0001);
			_x = new phoenix_Vector(_up.y * _z.z - _up.z * _z.y,_up.z * _z.x - _up.x * _z.z,_up.x * _z.y - _up.y * _z.x).get_normalized();
		}
		_y = new phoenix_Vector(_z.y * _x.z - _z.z * _x.y,_z.z * _x.x - _z.x * _x.z,_z.x * _x.y - _z.y * _x.x);
		te[0] = _x.x;
		te[4] = _y.x;
		te[8] = _z.x;
		te[1] = _x.y;
		te[5] = _y.y;
		te[9] = _z.y;
		te[2] = _x.z;
		te[6] = _y.z;
		te[10] = _z.z;
		return this;
	}
	,multiply: function(_m) {
		return this.multiplyMatrices(this,_m);
	}
	,multiplyMatrices: function(_a,_b) {
		var ae = _a.elements;
		var be = _b.elements;
		var te = this.elements;
		var a11 = ae[0];
		var a12 = ae[4];
		var a13 = ae[8];
		var a14 = ae[12];
		var a21 = ae[1];
		var a22 = ae[5];
		var a23 = ae[9];
		var a24 = ae[13];
		var a31 = ae[2];
		var a32 = ae[6];
		var a33 = ae[10];
		var a34 = ae[14];
		var a41 = ae[3];
		var a42 = ae[7];
		var a43 = ae[11];
		var a44 = ae[15];
		var b11 = be[0];
		var b12 = be[4];
		var b13 = be[8];
		var b14 = be[12];
		var b21 = be[1];
		var b22 = be[5];
		var b23 = be[9];
		var b24 = be[13];
		var b31 = be[2];
		var b32 = be[6];
		var b33 = be[10];
		var b34 = be[14];
		var b41 = be[3];
		var b42 = be[7];
		var b43 = be[11];
		var b44 = be[15];
		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
		return this;
	}
	,multiplyScalar: function(_s) {
		var te = this.elements;
		te[0] *= _s;
		te[4] *= _s;
		te[8] *= _s;
		te[12] *= _s;
		te[1] *= _s;
		te[5] *= _s;
		te[9] *= _s;
		te[13] *= _s;
		te[2] *= _s;
		te[6] *= _s;
		te[10] *= _s;
		te[14] *= _s;
		te[3] *= _s;
		te[7] *= _s;
		te[11] *= _s;
		te[15] *= _s;
		return this;
	}
	,setPosition: function(_v) {
		var te = this.elements;
		te[12] = _v.x;
		te[13] = _v.y;
		te[14] = _v.z;
		return this;
	}
	,inverse: function() {
		return this.clone().getInverse(this);
	}
	,getInverse: function(_m) {
		var te = this.elements;
		var me = _m.elements;
		var n11 = me[0];
		var n12 = me[4];
		var n13 = me[8];
		var n14 = me[12];
		var n21 = me[1];
		var n22 = me[5];
		var n23 = me[9];
		var n24 = me[13];
		var n31 = me[2];
		var n32 = me[6];
		var n33 = me[10];
		var n34 = me[14];
		var n41 = me[3];
		var n42 = me[7];
		var n43 = me[11];
		var n44 = me[15];
		te[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
		te[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
		te[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
		te[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
		te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
		te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
		te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
		te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
		te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
		te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
		te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
		te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
		te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
		te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
		te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
		te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
		var det = me[0] * te[0] + me[1] * te[4] + me[2] * te[8] + me[3] * te[12];
		if(det == 0) {
			haxe_Log.trace("Matrix.getInverse: cant invert matrix, determinant is 0",{ fileName : "Matrix.hx", lineNumber : 696, className : "phoenix.Matrix", methodName : "getInverse"});
			this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
			this;
			return this;
		}
		this.multiplyScalar(1 / det);
		return this;
	}
	,scale: function(_v) {
		var te = this.elements;
		var _x = _v.x;
		var _y = _v.y;
		var _z = _v.z;
		te[0] *= _x;
		te[4] *= _y;
		te[8] *= _z;
		te[1] *= _x;
		te[5] *= _y;
		te[9] *= _z;
		te[2] *= _x;
		te[6] *= _y;
		te[10] *= _z;
		te[3] *= _x;
		te[7] *= _y;
		te[11] *= _z;
		return this;
	}
	,makeTranslation: function(_x,_y,_z) {
		this.set(1,0,0,_x,0,1,0,_y,0,0,1,_z,0,0,0,1);
		return this;
	}
	,decompose: function(_position,_quaternion,_scale) {
		var te = this.elements;
		var matrix = new phoenix_Matrix();
		var _ax_x = te[0];
		var _ax_y = te[1];
		var _ax_z = te[2];
		var _ay_x = te[4];
		var _ay_y = te[5];
		var _ay_z = te[6];
		var _az_x = te[8];
		var _az_y = te[9];
		var _az_z = te[10];
		var _ax_length = Math.sqrt(_ax_x * _ax_x + _ax_y * _ax_y + _ax_z * _ax_z);
		var _ay_length = Math.sqrt(_ay_x * _ay_x + _ay_y * _ay_y + _ay_z * _ay_z);
		var _az_length = Math.sqrt(_az_x * _az_x + _az_y * _az_y + _az_z * _az_z);
		if(_quaternion == null) _quaternion = new phoenix_Quaternion();
		if(_position == null) _position = new phoenix_Vector(te[12],te[13],te[14]); else {
			_position.set_x(te[12]);
			_position.set_y(te[13]);
			_position.set_z(te[14]);
		}
		if(_scale == null) _scale = new phoenix_Vector(_ax_length,_ay_length,_az_length); else {
			_scale.x = _ax_length;
			if(_scale._construct) _scale.x; else {
				if(_scale.listen_x != null && !_scale.ignore_listeners) _scale.listen_x(_ax_length);
				_scale.x;
			}
			_scale.y = _ay_length;
			if(_scale._construct) _scale.y; else {
				if(_scale.listen_y != null && !_scale.ignore_listeners) _scale.listen_y(_ay_length);
				_scale.y;
			}
			_scale.z = _az_length;
			if(_scale._construct) _scale.z; else {
				if(_scale.listen_z != null && !_scale.ignore_listeners) _scale.listen_z(_az_length);
				_scale.z;
			}
		}
		matrix.elements = this.elements.concat([]);
		var me = matrix.elements;
		me[0] /= _ax_length;
		me[1] /= _ax_length;
		me[2] /= _ax_length;
		me[4] /= _ay_length;
		me[5] /= _ay_length;
		me[6] /= _ay_length;
		me[8] /= _az_length;
		me[9] /= _az_length;
		me[10] /= _az_length;
		_quaternion.setFromRotationMatrix(matrix);
		if(this._transform == null) this._transform = new phoenix_MatrixTransform(_position,_quaternion,_scale); else {
			this._transform.pos = _position;
			this._transform.rotation = _quaternion;
			this._transform.scale = _scale;
		}
		return this._transform;
	}
	,makeFrustum: function(_left,_right,_bottom,_top,_near,_far) {
		var te = this.elements;
		var tx = 2 * _near / (_right - _left);
		var ty = 2 * _near / (_top - _bottom);
		var a = (_right + _left) / (_right - _left);
		var b = (_top + _bottom) / (_top - _bottom);
		var c = -(_far + _near) / (_far - _near);
		var d = -2 * _far * _near / (_far - _near);
		te[0] = tx;
		te[4] = 0;
		te[8] = a;
		te[12] = 0;
		te[1] = 0;
		te[5] = ty;
		te[9] = b;
		te[13] = 0;
		te[2] = 0;
		te[6] = 0;
		te[10] = c;
		te[14] = d;
		te[3] = 0;
		te[7] = 0;
		te[11] = -1;
		te[15] = 0;
		return this;
	}
	,makePerspective: function(_fov,_aspect,_near,_far) {
		var ymax = _near * Math.tan(_fov * 0.5 * 0.017453292519943278);
		var ymin = -ymax;
		var xmin = ymin * _aspect;
		var xmax = ymax * _aspect;
		return this.makeFrustum(xmin,xmax,ymin,ymax,_near,_far);
	}
	,makeOrthographic: function(_left,_right,_top,_bottom,_near,_far) {
		var te = this.elements;
		var w = _right - _left;
		var h = _top - _bottom;
		var p = _far - _near;
		var tx = (_right + _left) / w;
		var ty = (_top + _bottom) / h;
		var tz = (_far + _near) / p;
		te[0] = 2 / w;
		te[4] = 0;
		te[8] = 0;
		te[12] = -tx;
		te[1] = 0;
		te[5] = 2 / h;
		te[9] = 0;
		te[13] = -ty;
		te[2] = 0;
		te[6] = 0;
		te[10] = -2 / p;
		te[14] = -tz;
		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[15] = 1;
		return this;
	}
	,clone: function() {
		var te = this.elements;
		return new phoenix_Matrix(te[0],te[4],te[8],te[12],te[1],te[5],te[9],te[13],te[2],te[6],te[10],te[14],te[3],te[7],te[11],te[15]);
	}
	,__class__: phoenix_Matrix
};
var phoenix_Quaternion = function(_x,_y,_z,_w) {
	if(_w == null) _w = 1;
	if(_z == null) _z = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.ignore_euler = false;
	this._construct = false;
	this.ignore_listeners = false;
	this.w = 0.0;
	this.z = 0.0;
	this.y = 0.0;
	this.x = 0.0;
	this._construct = true;
	this.x = _x;
	if(this._construct) this.x; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		this.x;
	}
	this.y = _y;
	if(this._construct) this.y; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		this.y;
	}
	this.z = _z;
	if(this._construct) this.z; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		this.z;
	}
	this.w = _w;
	if(this._construct) this.w; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		this.w;
	}
	this.euler = new phoenix_Vector();
	this._construct = false;
};
$hxClasses["phoenix.Quaternion"] = phoenix_Quaternion;
phoenix_Quaternion.__name__ = true;
phoenix_Quaternion.Listen = function(_q,listener) {
	_q.listen_x = listener;
	_q.listen_y = listener;
	_q.listen_z = listener;
	_q.listen_w = listener;
};
phoenix_Quaternion.prototype = {
	copy: function(_quaternion) {
		this.ignore_euler = true;
		this.x = _quaternion.x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _quaternion.y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _quaternion.z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _quaternion.w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,setFromEuler: function(_euler,_order) {
		if(_order == null) _order = 0;
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		var _w = this.w;
		var c1 = Math.cos(_euler.x / 2);
		var c2 = Math.cos(_euler.y / 2);
		var c3 = Math.cos(_euler.z / 2);
		var s1 = Math.sin(_euler.x / 2);
		var s2 = Math.sin(_euler.y / 2);
		var s3 = Math.sin(_euler.z / 2);
		if(_order == 0) {
			_x = s1 * c2 * c3 + c1 * s2 * s3;
			_y = c1 * s2 * c3 - s1 * c2 * s3;
			_z = c1 * c2 * s3 + s1 * s2 * c3;
			_w = c1 * c2 * c3 - s1 * s2 * s3;
		} else if(_order == 1) {
			_x = s1 * c2 * c3 + c1 * s2 * s3;
			_y = c1 * s2 * c3 - s1 * c2 * s3;
			_z = c1 * c2 * s3 - s1 * s2 * c3;
			_w = c1 * c2 * c3 + s1 * s2 * s3;
		} else if(_order == 2) {
			_x = s1 * c2 * c3 - c1 * s2 * s3;
			_y = c1 * s2 * c3 + s1 * c2 * s3;
			_z = c1 * c2 * s3 + s1 * s2 * c3;
			_w = c1 * c2 * c3 - s1 * s2 * s3;
		} else if(_order == 3) {
			_x = s1 * c2 * c3 - c1 * s2 * s3;
			_y = c1 * s2 * c3 + s1 * c2 * s3;
			_z = c1 * c2 * s3 - s1 * s2 * c3;
			_w = c1 * c2 * c3 + s1 * s2 * s3;
		} else if(_order == 4) {
			_x = s1 * c2 * c3 + c1 * s2 * s3;
			_y = c1 * s2 * c3 + s1 * c2 * s3;
			_z = c1 * c2 * s3 - s1 * s2 * c3;
			_w = c1 * c2 * c3 - s1 * s2 * s3;
		} else if(_order == 5) {
			_x = s1 * c2 * c3 - c1 * s2 * s3;
			_y = c1 * s2 * c3 - s1 * c2 * s3;
			_z = c1 * c2 * s3 + s1 * s2 * c3;
			_w = c1 * c2 * c3 + s1 * s2 * s3;
		}
		this.ignore_euler = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,setFromRotationMatrix: function(_m) {
		var te = _m.elements;
		var m11 = te[0];
		var m12 = te[4];
		var m13 = te[8];
		var m21 = te[1];
		var m22 = te[5];
		var m23 = te[9];
		var m31 = te[2];
		var m32 = te[6];
		var m33 = te[10];
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		var _w = this.w;
		var tr = m11 + m22 + m33;
		var s;
		if(tr > 0) {
			s = 0.5 / Math.sqrt(tr + 1.0);
			_w = 0.25 / s;
			_x = (m32 - m23) * s;
			_y = (m13 - m31) * s;
			_z = (m21 - m12) * s;
		} else if(m11 > m22 && m11 > m33) {
			s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
			_w = (m32 - m23) / s;
			_x = 0.25 * s;
			_y = (m12 + m21) / s;
			_z = (m13 + m31) / s;
		} else if(m22 > m33) {
			s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
			_w = (m13 - m31) / s;
			_x = (m12 + m21) / s;
			_y = 0.25 * s;
			_z = (m23 + m32) / s;
		} else {
			s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
			_w = (m21 - m12) / s;
			_x = (m13 + m31) / s;
			_y = (m23 + m32) / s;
			_z = 0.25 * s;
		}
		this.ignore_euler = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,clone: function() {
		return new phoenix_Quaternion(this.x,this.y,this.z,this.w);
	}
	,__class__: phoenix_Quaternion
};
var phoenix_Rectangle = function(_x,_y,_w,_h) {
	if(_h == null) _h = 0;
	if(_w == null) _w = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.ignore_listeners = false;
	this.h = 0;
	this.w = 0;
	this.y = 0;
	this.x = 0;
	this.set_x(_x);
	this.set_y(_y);
	this.set_w(_w);
	this.set_h(_h);
};
$hxClasses["phoenix.Rectangle"] = phoenix_Rectangle;
phoenix_Rectangle.__name__ = true;
phoenix_Rectangle.listen = function(_r,listener) {
	_r.listen_x = listener;
	_r.listen_y = listener;
	_r.listen_w = listener;
	_r.listen_h = listener;
};
phoenix_Rectangle.prototype = {
	equal: function(_other) {
		if(_other == null) return false;
		return this.x == _other.x && this.y == _other.y && this.w == _other.w && this.h == _other.h;
	}
	,set: function(_x,_y,_w,_h) {
		var _setx = this.x;
		var _sety = this.y;
		var _setw = this.w;
		var _seth = this.h;
		if(_x != null) _setx = _x;
		if(_y != null) _sety = _y;
		if(_w != null) _setw = _w;
		if(_h != null) _seth = _h;
		this.set_x(_setx);
		this.set_y(_sety);
		this.set_w(_setw);
		this.set_h(_seth);
		return this;
	}
	,set_x: function(_x) {
		this.x = _x;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
		return this.x;
	}
	,set_y: function(_y) {
		this.y = _y;
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
		return this.y;
	}
	,set_w: function(_w) {
		this.w = _w;
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(_w);
		return this.w;
	}
	,set_h: function(_h) {
		this.h = _h;
		if(this.listen_h != null && !this.ignore_listeners) this.listen_h(_h);
		return this.h;
	}
	,__class__: phoenix_Rectangle
	,__properties__: {set_h:"set_h",set_w:"set_w",set_y:"set_y",set_x:"set_x"}
};
var phoenix_RenderPath = function(_renderer) {
	this.renderer = _renderer;
};
$hxClasses["phoenix.RenderPath"] = phoenix_RenderPath;
phoenix_RenderPath.__name__ = true;
phoenix_RenderPath.prototype = {
	render: function(_batchers,_stats) {
		var _g = 0;
		while(_g < _batchers.length) {
			var batch = _batchers[_g];
			++_g;
			if(batch.enabled) {
				Luxe.debug.start("batch." + batch.name);
				batch.draw_calls = 0;
				batch.vert_count = 0;
				batch.emitter.emit(1,batch);
				batch.view.process();
				batch.renderer.state.viewport(batch.view.get_viewport().x,batch.view.get_viewport().y,batch.view.get_viewport().w,batch.view.get_viewport().h);
				batch.batch(false);
				batch.emitter.emit(2,batch);
				_stats.geometry_count += batch.geometry.size();
				_stats.dynamic_batched_count += batch.dynamic_batched_count;
				_stats.static_batched_count += batch.static_batched_count;
				_stats.visible_count += batch.visible_count;
				_stats.draw_calls += batch.draw_calls;
				_stats.vert_count += batch.vert_count;
				Luxe.debug.end("batch." + batch.name);
			}
		}
	}
	,__class__: phoenix_RenderPath
};
var phoenix_RenderState = function(_renderer) {
	this._active_texture = -1;
	this._used_program = null;
	this.depth_func = -1;
	this.depth_test = false;
	this.cull_face = false;
	this.renderer = _renderer;
	this._viewport = new phoenix_Rectangle(0,0,0,0);
};
$hxClasses["phoenix.RenderState"] = phoenix_RenderState;
phoenix_RenderState.__name__ = true;
phoenix_RenderState.prototype = {
	enable: function(what) {
		switch(what) {
		case 2884:
			if(!this.cull_face) {
				this.cull_face = true;
				snow_modules_opengl_web_GL.current_context.enable(2884);
			}
			break;
		case 2929:
			if(Luxe.core.app.config.render.depth) {
				if(!this.depth_test) {
					this.depth_test = true;
					snow_modules_opengl_web_GL.current_context.enable(2929);
				}
			}
			break;
		}
	}
	,disable: function(what) {
		switch(what) {
		case 2884:
			if(this.cull_face) {
				this.cull_face = false;
				snow_modules_opengl_web_GL.current_context.disable(2884);
			}
			break;
		case 2929:
			if(Luxe.core.app.config.render.depth) {
				if(this.depth_test) {
					this.depth_test = false;
					snow_modules_opengl_web_GL.current_context.disable(2929);
				}
			}
			break;
		}
	}
	,depth_function: function(what) {
		if(this.depth_func != what) {
			snow_modules_opengl_web_GL.current_context.depthFunc(what);
			this.depth_func = what;
		}
	}
	,viewport: function(x,y,w,h) {
		if(this._viewport.x != x || this._viewport.y != y || this._viewport.w != w || this._viewport.h != h) {
			this._viewport.set_x(x);
			this._viewport.set_y(y);
			this._viewport.set_w(w);
			this._viewport.set_h(h);
			var _y = this.renderer.target_size.y - (y + h);
			snow_modules_opengl_web_GL.current_context.viewport(x | 0,_y | 0,w | 0,h | 0);
		}
	}
	,useProgram: function(program) {
		if(this._used_program != program) {
			this._used_program = program;
			snow_modules_opengl_web_GL.current_context.useProgram(program);
		}
	}
	,activeTexture: function(val) {
		if(this._active_texture != val) {
			snow_modules_opengl_web_GL.current_context.activeTexture(val);
			this._active_texture = val;
		}
	}
	,bindTexture: function(type,tex) {
		switch(type) {
		case 3553:
			this.bindTexture2D(tex);
			break;
		case 34067:
			this.bindTextureCube(tex);
			break;
		}
	}
	,bindTexture2D: function(tex) {
		if(phoenix_RenderState.bound_texture_2D != tex) {
			phoenix_RenderState.bound_texture_2D = tex;
			snow_modules_opengl_web_GL.current_context.bindTexture(3553,tex);
		}
	}
	,bindTextureCube: function(tex) {
		if(phoenix_RenderState.bound_texture_cube != tex) {
			phoenix_RenderState.bound_texture_cube = tex;
			snow_modules_opengl_web_GL.current_context.bindTexture(34067,tex);
		}
	}
	,__class__: phoenix_RenderState
};
var phoenix_Texture = function(_options) {
	this.load_premultiply_alpha = false;
	this.height = -1;
	this.width = -1;
	this.height_actual = -1;
	this.width_actual = -1;
	this.compressed = false;
	this.border = 0;
	this.slot = 0;
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + (" ( " + "Texture create requires non-null options" + " )")));
	if(_options.resource_type == null) _options.resource_type = 4;
	_options.resource_type;
	luxe_resource_Resource.call(this,_options);
	if(_options.texture == null) _options.texture = this.create_texture_id();
	_options.texture;
	this.texture = _options.texture;
	this.bind();
	this.apply_default_options(_options);
	if(_options.pixels != null) {
		if(_options.width == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options.width was null" + (" ( " + "Texture create with pixels requires both width and height" + " )")));
		if(_options.height == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options.height was null" + (" ( " + "Texture create with pixels requires both width and height" + " )")));
	}
	if(_options.width != null || _options.height != null) {
		if(_options.height == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options.height was null" + (" ( " + "Texture requires both width and height, only width was given in construct options" + " )")));
		if(_options.width == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options.width was null" + (" ( " + "Texture requires both width and height, only height was given in construct options" + " )")));
		this.width = this.width_actual = _options.width;
		this.height = this.height_actual = _options.height;
		if(_options.pixels != null) this.submit(_options.pixels);
	}
};
$hxClasses["phoenix.Texture"] = phoenix_Texture;
phoenix_Texture.__name__ = true;
phoenix_Texture.max_size = function() {
	return snow_modules_opengl_web_GL.current_context.getParameter(3379);
};
phoenix_Texture.__super__ = luxe_resource_Resource;
phoenix_Texture.prototype = $extend(luxe_resource_Resource.prototype,{
	memory_use: function() {
		return this.width_actual * this.height_actual * 4;
	}
	,submit: function(_pixels,_target,_level) {
		if(_level == null) _level = 0;
		if(!(_level >= 0)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("_level >= 0" + (" ( " + "Texture submit level cannot be negative" + " )")));
		var _max = phoenix_Texture.max_size();
		if(!(this.width_actual <= _max)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("width_actual <= _max" + (" ( " + ("Texture actual width bigger than maximum hardware size (width:" + this.width_actual + ", max:" + _max + ")") + " )")));
		if(!(this.height_actual <= _max)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("height_actual <= _max" + (" ( " + ("Texture actual height bigger than maximum hardware size (height:" + this.height_actual + ", max:" + _max + ")") + " )")));
		this.bind();
		if(this.type == 3553) {
			if(_target == null) _target = 3553;
			_target;
		} else if(_target == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_target was null" + (" ( " + "Texture submit to a non 2D texture requires the _target to be specified" + " )")));
		if(this.compressed) snow_modules_opengl_web_GL.current_context.compressedTexImage2D(_target,_level,this.format,this.width_actual,this.height_actual,this.border,_pixels); else snow_modules_opengl_web_GL.current_context.texImage2D(_target,_level,this.format,this.width_actual,this.height_actual,this.border,this.format,this.data_type,_pixels);
	}
	,bind: function() {
		Luxe.renderer.state.activeTexture(33984 + this.slot);
		Luxe.renderer.state.bindTexture(this.type,this.texture);
	}
	,reload: function() {
		var _g = this;
		if(!(this.state != 6)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("state != ResourceState.destroyed" + (" ( " + "Resource cannot reload when already destroyed" + " )")));
		this.clear();
		return new snow_api_Promise(function(resolve,reject) {
			_g.set_state(2);
			var get = snow_system_assets_AssetImage.load(Luxe.core.app.assets,_g.id);
			get.then(function(_asset) {
				_g.texture = _g.create_texture_id();
				_g.from_asset(_asset);
				_g.set_state(3);
				resolve(_g);
			});
			get.error(function(_error) {
				_g.set_state(4);
				reject(_error);
			});
		});
	}
	,from_asset: function(_asset,_clear_asset) {
		if(_clear_asset == null) _clear_asset = true;
		this.width = _asset.image.width;
		this.height = _asset.image.height;
		this.width_actual = _asset.image.width_actual;
		this.height_actual = _asset.image.height_actual;
		if(this.load_premultiply_alpha) Luxe.utils.premultiply_alpha(_asset.image.pixels);
		this.submit(_asset.image.pixels);
		if(_clear_asset) {
			_asset.image.pixels = null;
			_asset = null;
		}
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10241,this.filter_min);
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10240,this.filter_mag);
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10242,this.clamp_s);
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10243,this.clamp_t);
	}
	,clear: function() {
		if(this.texture != null) snow_modules_opengl_web_GL.current_context.deleteTexture(this.texture);
	}
	,create_texture_id: function() {
		return snow_modules_opengl_web_GL.current_context.createTexture();
	}
	,apply_default_options: function(_options) {
		if(_options.load_premultiply_alpha == null) _options.load_premultiply_alpha = false;
		this.load_premultiply_alpha = _options.load_premultiply_alpha;
		if(_options.compressed == null) _options.compressed = false;
		this.compressed = _options.compressed;
		if(_options.format == null) _options.format = 6408;
		this.format = _options.format;
		if(_options.type == null) _options.type = 3553;
		this.type = _options.type;
		if(_options.data_type == null) _options.data_type = 5121;
		this.data_type = _options.data_type;
		this.set_filter_min((function($this) {
			var $r;
			if(_options.filter_min == null) _options.filter_min = phoenix_Texture.default_filter;
			$r = _options.filter_min;
			return $r;
		}(this)));
		this.set_filter_mag((function($this) {
			var $r;
			if(_options.filter_mag == null) _options.filter_mag = phoenix_Texture.default_filter;
			$r = _options.filter_mag;
			return $r;
		}(this)));
		this.set_clamp_s((function($this) {
			var $r;
			if(_options.clamp_s == null) _options.clamp_s = phoenix_Texture.default_clamp;
			$r = _options.clamp_s;
			return $r;
		}(this)));
		this.set_clamp_t((function($this) {
			var $r;
			if(_options.clamp_t == null) _options.clamp_t = phoenix_Texture.default_clamp;
			$r = _options.clamp_t;
			return $r;
		}(this)));
	}
	,set_clamp_s: function(_clamp) {
		this.bind();
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10242,_clamp);
		return this.clamp_s = _clamp;
	}
	,set_clamp_t: function(_clamp) {
		this.bind();
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10243,_clamp);
		return this.clamp_t = _clamp;
	}
	,set_filter_min: function(_filter) {
		this.bind();
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10241,_filter);
		return this.filter_min = _filter;
	}
	,set_filter_mag: function(_filter) {
		this.bind();
		snow_modules_opengl_web_GL.current_context.texParameteri(this.type,10240,_filter);
		return this.filter_mag = _filter;
	}
	,__class__: phoenix_Texture
	,__properties__: $extend(luxe_resource_Resource.prototype.__properties__,{set_clamp_t:"set_clamp_t",set_clamp_s:"set_clamp_s",set_filter_mag:"set_filter_mag",set_filter_min:"set_filter_min"})
});
var phoenix_RenderTexture = function() { };
$hxClasses["phoenix.RenderTexture"] = phoenix_RenderTexture;
phoenix_RenderTexture.__name__ = true;
phoenix_RenderTexture.__super__ = phoenix_Texture;
phoenix_RenderTexture.prototype = $extend(phoenix_Texture.prototype,{
	clear: function() {
		phoenix_Texture.prototype.clear.call(this);
		if(this.fbo != null) snow_modules_opengl_web_GL.current_context.deleteFramebuffer(this.fbo);
		if(this.renderbuffer != null) snow_modules_opengl_web_GL.current_context.deleteRenderbuffer(this.renderbuffer);
	}
	,__class__: phoenix_RenderTexture
});
var phoenix_Renderer = function(_core,_asset) {
	this.stop = false;
	this.should_clear = true;
	this.core = _core;
	this.font_asset = _asset;
	this.default_fbo = snow_modules_opengl_web_GL.current_context.getParameter(36006);
	this.default_rbo = snow_modules_opengl_web_GL.current_context.getParameter(36007);
	null;
};
$hxClasses["phoenix.Renderer"] = phoenix_Renderer;
phoenix_Renderer.__name__ = true;
phoenix_Renderer.prototype = {
	init: function() {
		this.state = new phoenix_RenderState(this);
		this.clear_color = new phoenix_Color().rgb(1710618);
		this.stats = new phoenix_RendererStats();
		this.batchers = [];
		this.target_size = new phoenix_Vector(Luxe.core.screen.get_w(),Luxe.core.screen.get_h());
		this.camera = new phoenix_Camera();
		this.default_render_path = new phoenix_RenderPath(this);
		this.render_path = this.default_render_path;
		this.create_default_shaders();
		this.batcher = new phoenix_Batcher(this,"default batcher");
		this.batcher.set_layer(1);
		this.add_batch(this.batcher);
		this.create_default_font();
		if(Luxe.core.app.config.render.depth) {
			this.state.enable(2929);
			this.state.depth_function(515);
			snow_modules_opengl_web_GL.current_context.clearDepth(1.0);
		}
		snow_modules_opengl_web_GL.current_context.enable(3042);
		snow_modules_opengl_web_GL.current_context.blendFunc(770,771);
		snow_modules_opengl_web_GL.current_context.pixelStorei(37441,0);
	}
	,destroy: function() {
		this.clear(new phoenix_Color().rgb(16729099));
	}
	,sort_batchers: function(a,b) {
		if(a.layer < b.layer) return -1;
		if(a.layer > b.layer) return 1;
		if(a.sequence < b.sequence) return -1;
		if(a.sequence > b.sequence) return 1;
		return 1;
	}
	,add_batch: function(batch) {
		this.batchers.push(batch);
		this.batchers.sort($bind(this,this.sort_batchers));
	}
	,clear: function(_color) {
		if(_color == null) _color = this.clear_color;
		_color;
		snow_modules_opengl_web_GL.current_context.clearColor(_color.r,_color.g,_color.b,_color.a);
		if(Luxe.core.app.config.render.depth) {
			snow_modules_opengl_web_GL.current_context.clear(16640);
			snow_modules_opengl_web_GL.current_context.clearDepth(1.0);
		} else snow_modules_opengl_web_GL.current_context.clear(16384);
	}
	,internal_resized: function(_w,_h) {
		if(this.get_target() == null) this.target_size.set_xy(_w,_h);
	}
	,process: function() {
		if(this.stop) return;
		if(this.should_clear) this.clear(this.clear_color);
		this.stats.batchers = this.batchers.length;
		this.stats.reset();
		this.render_path.render(this.batchers,this.stats);
	}
	,get_target: function() {
		return this.target;
	}
	,create_default_shaders: function() {
		var vert = haxe_Resource.getString("default.vert.glsl");
		var frag = haxe_Resource.getString("default.frag.glsl");
		var frag_textured = haxe_Resource.getString("default.frag.textured.glsl");
		var frag_bitmapfont = haxe_Resource.getString("default.frag.bitmapfont.glsl");
		var ext = snow_modules_opengl_web_GL.current_context.getExtension("OES_standard_derivatives");
		frag = "precision mediump float;\n" + frag;
		frag_textured = "precision mediump float;\n" + frag_textured;
		frag_bitmapfont = "#extension GL_OES_standard_derivatives : enable\n#extension OES_standard_derivatives : enable\nprecision mediump float;\n" + frag_bitmapfont;
		var _plain = new phoenix_Shader({ id : "luxe.shader", frag_id : "default", vert_id : "default"});
		var _textured = new phoenix_Shader({ id : "luxe.shader_textured", frag_id : "textured", vert_id : "default"});
		var _font = new phoenix_Shader({ id : "luxe.shader_bitmapfont", frag_id : "bitmapfont", vert_id : "default"});
		var _ok = true;
		_ok = _ok && _plain.from_string(vert,frag);
		_ok = _ok && _textured.from_string(vert,frag_textured);
		_ok = _ok && _font.from_string(vert,frag_bitmapfont);
		if(!_ok) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("_ok" + (" ( " + "Default shaders failed to compile or link. See log for errors" + " )")));
		this.shaders = { plain : { shader : _plain, source : { vert : vert, frag : frag}}, textured : { shader : _textured, source : { vert : vert, frag : frag_textured}}, bitmapfont : { shader : _font, source : { vert : vert, frag : frag_bitmapfont}}};
		null;
	}
	,create_default_font: function() {
		if(this.font_asset == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("font_asset was null" + (" ( " + "Renderer / failed to create the default font" + " )")));
		var _font_texture = new phoenix_Texture({ id : "luxe.font.png", width : this.font_asset.image.width_actual, height : this.font_asset.image.height_actual, pixels : this.font_asset.image.pixels});
		if(_font_texture == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_font_texture was null" + (" ( " + "Renderer / failed to create the default font... font_texture was null." + " )")));
		var _font_data = haxe_Resource.getString("default.fnt");
		this.font = new phoenix_BitmapFont({ id : "luxe.font", font_data : _font_data, pages : [_font_texture]});
		null;
	}
	,__class__: phoenix_Renderer
	,__properties__: {get_target:"get_target"}
};
var phoenix_RendererStats = function() {
	this.vert_count = 0;
	this.draw_calls = 0;
	this.visible_count = 0;
	this.static_batched_count = 0;
	this.dynamic_batched_count = 0;
	this.geometry_count = 0;
	this.batchers = 0;
};
$hxClasses["phoenix.RendererStats"] = phoenix_RendererStats;
phoenix_RendererStats.__name__ = true;
phoenix_RendererStats.prototype = {
	reset: function() {
		this.geometry_count = 0;
		this.dynamic_batched_count = 0;
		this.static_batched_count = 0;
		this.visible_count = 0;
		this.draw_calls = 0;
		this.vert_count = 0;
	}
	,__class__: phoenix_RendererStats
};
var phoenix_Uniforms = function() {
	this.clear();
};
$hxClasses["phoenix.Uniforms"] = phoenix_Uniforms;
phoenix_Uniforms.__name__ = true;
phoenix_Uniforms.prototype = {
	destroy: function() {
		this.ints = null;
		this.floats = null;
		this.vector2s = null;
		this.vector3s = null;
		this.vector4s = null;
		this.matrix4s = null;
		this.colors = null;
		this.textures = null;
		this.dirty_ints = null;
		this.dirty_floats = null;
		this.dirty_vector2s = null;
		this.dirty_vector3s = null;
		this.dirty_vector4s = null;
		this.dirty_matrix4s = null;
		this.dirty_matrix4arrs = null;
		this.dirty_colors = null;
		this.dirty_textures = null;
	}
	,clear: function() {
		this.destroy();
		this.ints = new haxe_ds_StringMap();
		this.floats = new haxe_ds_StringMap();
		this.vector2s = new haxe_ds_StringMap();
		this.vector3s = new haxe_ds_StringMap();
		this.vector4s = new haxe_ds_StringMap();
		this.matrix4s = new haxe_ds_StringMap();
		this.matrix4arrs = new haxe_ds_StringMap();
		this.colors = new haxe_ds_StringMap();
		this.textures = new haxe_ds_StringMap();
		this.dirty_ints = [];
		this.dirty_floats = [];
		this.dirty_vector2s = [];
		this.dirty_vector3s = [];
		this.dirty_vector4s = [];
		this.dirty_matrix4s = [];
		this.dirty_matrix4arrs = [];
		this.dirty_colors = [];
		this.dirty_textures = [];
	}
	,set_float: function(_name,_value,_location) {
		var _float = this.floats.get(_name);
		if(_float != null) _float.value = _value; else {
			_float = new phoenix_Uniform(_name,_value,_location);
			this.floats.set(_name,_float);
		}
		this.dirty_floats.push(_float);
	}
	,set_matrix4_arr: function(_name,_value,_location) {
		var _matrix4 = this.matrix4arrs.get(_name);
		if(_matrix4 != null) _matrix4.value = _value; else {
			_matrix4 = new phoenix_Uniform(_name,_value,_location);
			this.matrix4arrs.set(_name,_matrix4);
		}
		this.dirty_matrix4arrs.push(_matrix4);
	}
	,set_color: function(_name,_value,_location) {
		var _color = this.colors.get(_name);
		if(_color != null) _color.value = _value; else {
			_color = new phoenix_Uniform(_name,_value,_location);
			this.colors.set(_name,_color);
		}
		this.dirty_colors.push(_color);
	}
	,apply: function() {
		while(this.dirty_ints.length > 0) {
			var uf = this.dirty_ints.pop();
			snow_modules_opengl_web_GL.current_context.uniform1i(uf.location,uf.value);
		}
		while(this.dirty_floats.length > 0) {
			var uf1 = this.dirty_floats.pop();
			snow_modules_opengl_web_GL.current_context.uniform1f(uf1.location,uf1.value);
		}
		while(this.dirty_vector2s.length > 0) {
			var uf2 = this.dirty_vector2s.pop();
			snow_modules_opengl_web_GL.current_context.uniform2f(uf2.location,uf2.value.x,uf2.value.y);
		}
		while(this.dirty_vector3s.length > 0) {
			var uf3 = this.dirty_vector3s.pop();
			snow_modules_opengl_web_GL.current_context.uniform3f(uf3.location,uf3.value.x,uf3.value.y,uf3.value.z);
		}
		while(this.dirty_vector4s.length > 0) {
			var uf4 = this.dirty_vector4s.pop();
			snow_modules_opengl_web_GL.current_context.uniform4f(uf4.location,uf4.value.x,uf4.value.y,uf4.value.z,uf4.value.w);
		}
		while(this.dirty_colors.length > 0) {
			var uf5 = this.dirty_colors.pop();
			snow_modules_opengl_web_GL.current_context.uniform4f(uf5.location,uf5.value.r,uf5.value.g,uf5.value.b,uf5.value.a);
		}
		while(this.dirty_textures.length > 0) {
			var uf6 = this.dirty_textures.pop();
			snow_modules_opengl_web_GL.current_context.uniform1i(uf6.location,uf6.value.slot);
			uf6.value.bind();
		}
		while(this.dirty_matrix4s.length > 0) {
			var uf7 = this.dirty_matrix4s.pop();
			snow_modules_opengl_web_GL.uniformMatrix4fv(uf7.location,false,uf7.value.float32array());
		}
		while(this.dirty_matrix4arrs.length > 0) {
			var uf8 = this.dirty_matrix4arrs.pop();
			snow_modules_opengl_web_GL.current_context.uniformMatrix4fv(uf8.location,false,uf8.value);
		}
	}
	,__class__: phoenix_Uniforms
};
var phoenix_Shader = function(_options) {
	this.no_default_uniforms = false;
	this.frag_id = "";
	this.vert_id = "";
	this.log = "";
	if(_options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("_options was null" + ""));
	_options.resource_type = 7;
	luxe_resource_Resource.call(this,_options);
	this.frag_id = _options.frag_id;
	this.vert_id = _options.vert_id;
	if(_options.no_default_uniforms == null) _options.no_default_uniforms = false;
	this.no_default_uniforms = _options.no_default_uniforms;
	this.uniforms = new phoenix_Uniforms();
};
$hxClasses["phoenix.Shader"] = phoenix_Shader;
phoenix_Shader.__name__ = true;
phoenix_Shader.__super__ = luxe_resource_Resource;
phoenix_Shader.prototype = $extend(luxe_resource_Resource.prototype,{
	'use': function() {
		if(this.program != null) Luxe.renderer.state.useProgram(this.program);
	}
	,set_float: function(_name,_value) {
		this.uniforms.set_float(_name,_value,snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,_name));
	}
	,set_color: function(_name,_value) {
		this.uniforms.set_color(_name,_value,snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,_name));
	}
	,compile: function(_type,_source) {
		var _shader = snow_modules_opengl_web_GL.current_context.createShader(_type);
		snow_modules_opengl_web_GL.current_context.shaderSource(_shader,_source);
		snow_modules_opengl_web_GL.current_context.compileShader(_shader);
		var _compile_log = snow_modules_opengl_web_GL.current_context.getShaderInfoLog(_shader);
		var _log = "";
		if(_compile_log.length > 0) {
			var _is_frag = _type == 35632;
			var _type_name;
			if(_is_frag) _type_name = "frag"; else _type_name = "vert";
			var _type_id;
			if(_is_frag) _type_id = this.frag_id; else _type_id = this.vert_id;
			_log += "\n\t// start -- (" + _type_name + " / " + _type_id + ") compile log --\n";
			_log += this.format_log(_compile_log);
			_log += "\n\t// end --\n";
		}
		if(snow_modules_opengl_web_GL.current_context.getShaderParameter(_shader,35713) == 0) {
			this.log += "\tFailed to compile shader `" + this.id + "`:\n";
			this.add_log(_log.length == 0?this.format_log(snow_modules_opengl_web_GL.current_context.getShaderInfoLog(_shader)):_log);
			snow_modules_opengl_web_GL.current_context.deleteShader(_shader);
			_shader = null;
			return null;
		}
		return _shader;
	}
	,link: function() {
		this.program = snow_modules_opengl_web_GL.current_context.createProgram();
		snow_modules_opengl_web_GL.current_context.attachShader(this.program,this.vert_shader);
		snow_modules_opengl_web_GL.current_context.attachShader(this.program,this.frag_shader);
		snow_modules_opengl_web_GL.current_context.bindAttribLocation(this.program,0,"vertexPosition");
		snow_modules_opengl_web_GL.current_context.bindAttribLocation(this.program,1,"vertexTCoord");
		snow_modules_opengl_web_GL.current_context.bindAttribLocation(this.program,2,"vertexColor");
		snow_modules_opengl_web_GL.current_context.bindAttribLocation(this.program,3,"vertexNormal");
		snow_modules_opengl_web_GL.current_context.linkProgram(this.program);
		if(snow_modules_opengl_web_GL.current_context.getProgramParameter(this.program,35714) == 0) {
			this.log += "\tFailed to link shader program:";
			this.add_log(this.format_log(snow_modules_opengl_web_GL.current_context.getProgramInfoLog(this.program)));
			snow_modules_opengl_web_GL.current_context.deleteProgram(this.program);
			this.program = null;
			return false;
		}
		this["use"]();
		if(!this.no_default_uniforms) {
			this.proj_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"projectionMatrix");
			this.view_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"modelViewMatrix");
			var _tex0_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex0");
			var _tex1_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex1");
			var _tex2_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex2");
			var _tex3_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex3");
			var _tex4_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex4");
			var _tex5_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex5");
			var _tex6_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex6");
			var _tex7_attribute = snow_modules_opengl_web_GL.current_context.getUniformLocation(this.program,"tex7");
			if(_tex0_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex0_attribute,0);
			if(_tex1_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex1_attribute,1);
			if(_tex2_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex2_attribute,2);
			if(_tex3_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex3_attribute,3);
			if(_tex4_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex4_attribute,4);
			if(_tex5_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex5_attribute,5);
			if(_tex6_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex6_attribute,6);
			if(_tex7_attribute != null) snow_modules_opengl_web_GL.current_context.uniform1i(_tex7_attribute,7);
		}
		return true;
	}
	,clear: function() {
		if(this.vert_shader != null) snow_modules_opengl_web_GL.current_context.deleteShader(this.vert_shader);
		if(this.frag_shader != null) snow_modules_opengl_web_GL.current_context.deleteShader(this.frag_shader);
		if(this.program != null) snow_modules_opengl_web_GL.current_context.deleteProgram(this.program);
		this.vert_source = null;
		this.frag_source = null;
		this.uniforms.clear();
	}
	,reload: function() {
		var _g = this;
		if(!(this.state != 6)) throw new js__$Boot_HaxeError(luxe_DebugError.assertion("state != ResourceState.destroyed" + ""));
		this.clear();
		return new snow_api_Promise(function(resolve,reject) {
			_g.set_state(2);
			var _g1 = _g.frag_id;
			switch(_g1) {
			case "default":
				_g.frag_source = Luxe.renderer.shaders.plain.source.frag;
				break;
			case "textured":
				_g.frag_source = Luxe.renderer.shaders.textured.source.frag;
				break;
			}
			var _g11 = _g.vert_id;
			switch(_g11) {
			case "default":
				_g.vert_source = Luxe.renderer.shaders.plain.source.vert;
				break;
			}
			var _onfail = function(_err) {
				_g.set_state(4);
				reject(_err);
			};
			var _wait = [snow_api_Promise.resolve()];
			if(_g.frag_source == null) {
				var _frag = snow_system_assets_AssetText.load(Luxe.core.app.assets,_g.frag_id);
				_frag.then(function(_asset) {
					_g.frag_source = _asset.text;
				});
				_wait.push(_frag);
			}
			if(_g.vert_source == null) {
				var _vert = snow_system_assets_AssetText.load(Luxe.core.app.assets,_g.vert_id);
				_vert.then(function(_asset1) {
					_g.vert_source = _asset1.text;
				});
				_wait.push(_vert);
			}
			snow_api_Promise.all(_wait).then(function() {
				if(_g.from_string(_g.vert_source,_g.frag_source)) {
					_g.set_state(3);
					resolve(_g);
				} else _onfail(snow_types_Error.error("`" + _g.id + "` failed to create :\n\n" + _g.log));
			}).error(function(err) {
				_onfail(snow_types_Error.error("`" + _g.id + "` failed to create :\n\t\t" + err + "\n"));
			});
		});
	}
	,from_string: function(_vert_source,_fragment_source) {
		var _g = this;
		this.clear();
		this.frag_source = _fragment_source;
		this.vert_source = _vert_source;
		this.vert_shader = this.compile(35633,this.vert_source);
		this.frag_shader = this.compile(35632,this.frag_source);
		if(this.vert_shader == null || this.frag_shader == null) {
			if(_g.log.length > 0) haxe_Log.trace("   i / shader / " + _g.log,{ fileName : "Shader.hx", lineNumber : 589, className : "phoenix.Shader", methodName : "from_string"});
			return false;
		}
		if(!this.link()) {
			if(_g.log.length > 0) haxe_Log.trace("   i / shader / " + _g.log,{ fileName : "Shader.hx", lineNumber : 589, className : "phoenix.Shader", methodName : "from_string"});
			return false;
		}
		return true;
	}
	,add_log: function(_log) {
		this.log += _log;
	}
	,format_log: function(_log) {
		var _items = _log.split("\n");
		_items = _items.filter(function(s) {
			return StringTools.trim(s) != "";
		});
		_items = _items.map(function(s1) {
			return "\t\t" + StringTools.trim(s1);
		});
		return _items.join("\n");
	}
	,__class__: phoenix_Shader
});
var phoenix_Uniform = function(_name,_value,_location) {
	this.name = _name;
	this.value = _value;
	this.location = _location;
};
$hxClasses["phoenix.Uniform"] = phoenix_Uniform;
phoenix_Uniform.__name__ = true;
phoenix_Uniform.prototype = {
	__class__: phoenix_Uniform
};
var phoenix_Transform = function() {
	this._destroying = false;
	this._cleaning = false;
	this._setup = true;
	this.dirty = true;
	luxe_ID.call(this,"transform");
	this.set_local(new phoenix_Spatial());
	this.set_world(new phoenix_Spatial());
	this._origin_undo_matrix = new phoenix_Matrix();
	this._pos_matrix = new phoenix_Matrix();
	this._rotation_matrix = new phoenix_Matrix();
	this.set_origin(new phoenix_Vector());
	this.local.pos_changed = $bind(this,this.on_local_pos_change);
	this.local.rotation_changed = $bind(this,this.on_local_rotation_change);
	this.local.scale_changed = $bind(this,this.on_local_scale_change);
	this._setup = false;
};
$hxClasses["phoenix.Transform"] = phoenix_Transform;
phoenix_Transform.__name__ = true;
phoenix_Transform.__super__ = luxe_ID;
phoenix_Transform.prototype = $extend(luxe_ID.prototype,{
	destroy: function() {
		this._destroying = true;
		if(this.parent != null) this.parent.unlisten($bind(this,this.on_parent_cleaned));
		this._clean_handlers = null;
		this._dirty_handlers = null;
		this._pos_handlers = null;
		this._rotation_handlers = null;
		this._scale_handlers = null;
		this._origin_handlers = null;
		this._parent_handlers = null;
		this.local.destroy();
		((function($this) {
			var $r;
			if(!$this._destroying) {
				if($this.parent != null) {
					if($this.parent.dirty) $this.parent.clean();
				}
				if($this.dirty && !$this._cleaning) $this.clean();
			}
			$r = $this.world;
			return $r;
		}(this))).destroy();
		this.local = null;
		this.world = null;
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		this.origin = null;
		if(this._origin_handlers != null && this._origin_handlers.length > 0) this.propagate_origin(this.origin);
		this.origin;
		this._origin_undo_matrix = null;
		this._pos_matrix = null;
		this._rotation_matrix = null;
	}
	,on_local_pos_change: function(v) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this._pos_handlers != null && this._pos_handlers.length > 0) this.propagate_pos(v);
	}
	,on_local_rotation_change: function(r) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this._rotation_handlers != null && this._rotation_handlers.length > 0) this.propagate_rotation(r);
	}
	,on_local_scale_change: function(s) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this._scale_handlers != null && this._scale_handlers.length > 0) this.propagate_scale(s);
	}
	,on_parent_cleaned: function(p) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
	}
	,set_local: function(l) {
		if(l != null) {
			this.dirty = true;
			if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
			this.dirty;
			l.pos_changed = $bind(this,this.on_local_pos_change);
			l.rotation_changed = $bind(this,this.on_local_rotation_change);
			l.scale_changed = $bind(this,this.on_local_scale_change);
		}
		return this.local = l;
	}
	,get_world: function() {
		if(!this._destroying) {
			if(this.parent != null) {
				if(this.parent.dirty) this.parent.clean();
			}
			if(this.dirty && !this._cleaning) this.clean();
		}
		return this.world;
	}
	,clean_check: function() {
		if(this.parent != null) {
			if(this.parent.dirty) this.parent.clean();
		}
		if(this.dirty && !this._cleaning) this.clean();
	}
	,clean: function() {
		if(!this.dirty) return;
		this._cleaning = true;
		this._pos_matrix.makeTranslation(this.local.pos.x,this.local.pos.y,this.local.pos.z);
		this._rotation_matrix.makeRotationFromQuaternion(this.local.rotation);
		this._origin_undo_matrix.makeTranslation(-this.origin.x,-this.origin.y,-this.origin.z);
		this.local.matrix.makeTranslation(this.origin.x,this.origin.y,this.origin.z);
		this.local.matrix.multiply(this._rotation_matrix);
		this.local.matrix.scale(this.local.scale);
		this.local.matrix.setPosition(this.local.pos);
		this.local.matrix.multiply(this._origin_undo_matrix);
		if(this.parent != null) this.get_world().set_matrix(this.get_world().get_matrix().multiplyMatrices(this.parent.get_world().get_matrix(),this.local.matrix)); else this.get_world().set_matrix(this.local.matrix.clone());
		this.get_world().decompose(false);
		this.dirty = false;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		this._cleaning = false;
		if(this._clean_handlers != null && this._clean_handlers.length > 0) this.propagate_clean();
	}
	,set_origin: function(o) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		this.origin = o;
		if(this._origin_handlers != null && this._origin_handlers.length > 0) this.propagate_origin(this.origin);
		return this.origin;
	}
	,set_world: function(w) {
		if(w == null) return this.world = w;
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		return this.world = w;
	}
	,set_parent: function(_p) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this.parent != null) this.parent.unlisten($bind(this,this.on_parent_cleaned));
		this.parent = _p;
		if(this._parent_handlers != null && this._parent_handlers.length > 0) this.propagate_parent(this.parent);
		if(this.parent != null) this.parent.listen($bind(this,this.on_parent_cleaned));
		return this.parent;
	}
	,get_pos: function() {
		return this.local.pos;
	}
	,set_pos: function(value) {
		return this.local.set_pos(value);
	}
	,set_rotation: function(value) {
		return this.local.set_rotation(value);
	}
	,set_scale: function(value) {
		return this.local.set_scale(value);
	}
	,propagate_clean: function() {
		var _g = 0;
		var _g1 = this._clean_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(this);
		}
	}
	,propagate_dirty: function() {
		var _g = 0;
		var _g1 = this._dirty_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(this);
		}
	}
	,propagate_pos: function(_pos) {
		var _g = 0;
		var _g1 = this._pos_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_pos);
		}
	}
	,propagate_rotation: function(_rotation) {
		var _g = 0;
		var _g1 = this._rotation_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_rotation);
		}
	}
	,propagate_scale: function(_scale) {
		var _g = 0;
		var _g1 = this._scale_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_scale);
		}
	}
	,propagate_origin: function(_origin) {
		var _g = 0;
		var _g1 = this._origin_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_origin);
		}
	}
	,propagate_parent: function(_parent) {
		var _g = 0;
		var _g1 = this._parent_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_parent);
		}
	}
	,listen: function(_handler) {
		if(this._clean_handlers == null) this._clean_handlers = [];
		this._clean_handlers.push(_handler);
	}
	,unlisten: function(_handler) {
		if(this._clean_handlers == null) return false;
		return HxOverrides.remove(this._clean_handlers,_handler);
	}
	,listen_pos: function(_handler) {
		if(this._pos_handlers == null) this._pos_handlers = [];
		this._pos_handlers.push(_handler);
	}
	,listen_scale: function(_handler) {
		if(this._scale_handlers == null) this._scale_handlers = [];
		this._scale_handlers.push(_handler);
	}
	,listen_rotation: function(_handler) {
		if(this._rotation_handlers == null) this._rotation_handlers = [];
		this._rotation_handlers.push(_handler);
	}
	,listen_origin: function(_handler) {
		if(this._origin_handlers == null) this._origin_handlers = [];
		this._origin_handlers.push(_handler);
	}
	,listen_parent: function(_handler) {
		if(this._parent_handlers == null) this._parent_handlers = [];
		this._parent_handlers.push(_handler);
	}
	,__class__: phoenix_Transform
	,__properties__: {set_scale:"set_scale",set_rotation:"set_rotation",set_pos:"set_pos",get_pos:"get_pos",set_origin:"set_origin",set_world:"set_world",get_world:"get_world",set_local:"set_local",set_parent:"set_parent"}
});
var phoenix_Spatial = function() {
	this._setup = true;
	this.auto_decompose = false;
	this.ignore_listeners = false;
	this.set_matrix(new phoenix_Matrix());
	this.floats = this.matrix.float32array();
	this.set_pos(new phoenix_Vector());
	this.set_rotation(new phoenix_Quaternion());
	this.set_scale(new phoenix_Vector(1,1,1));
	this._setup = false;
};
$hxClasses["phoenix.Spatial"] = phoenix_Spatial;
phoenix_Spatial.__name__ = true;
phoenix_Spatial.prototype = {
	destroy: function() {
		this.matrix = null;
		this.matrix;
		this.floats = null;
		this.pos = null;
		this.pos;
		this.rotation = null;
		this.rotation;
		this.scale = null;
		this.scale;
	}
	,decompose: function(_force) {
		if(_force == null) _force = true;
		if(this.auto_decompose || _force) {
			var _transform = this.matrix.decompose(null,null,null);
			this.set_pos(_transform.pos);
			this.set_rotation(_transform.rotation);
			this.set_scale(_transform.scale);
		}
		return this;
	}
	,get_matrix: function() {
		return this.matrix;
	}
	,set_matrix: function(_m) {
		this.matrix = _m;
		if(_m != null) this.floats = this.matrix.float32array();
		return this.matrix;
	}
	,set_pos: function(_p) {
		this.pos = _p;
		if(_p != null) {
			phoenix_Vector.Listen(this.pos,$bind(this,this._pos_change));
			if(this.pos_changed != null && !this.ignore_listeners) this.pos_changed(this.pos);
		}
		return this.pos;
	}
	,set_rotation: function(_r) {
		this.rotation = _r;
		if(_r != null) {
			phoenix_Quaternion.Listen(this.rotation,$bind(this,this._rotation_change));
			if(this.rotation_changed != null && !this.ignore_listeners) this.rotation_changed(this.rotation);
		}
		return this.rotation;
	}
	,set_scale: function(_s) {
		this.scale = _s;
		if(_s != null) {
			phoenix_Vector.Listen(this.scale,$bind(this,this._scale_change));
			if(this.scale_changed != null && !this.ignore_listeners) this.scale_changed(this.scale);
		}
		return this.scale;
	}
	,_pos_change: function(_v) {
		this.set_pos(this.pos);
	}
	,_scale_change: function(_v) {
		this.set_scale(this.scale);
	}
	,_rotation_change: function(_v) {
		this.set_rotation(this.rotation);
	}
	,__class__: phoenix_Spatial
	,__properties__: {set_matrix:"set_matrix",get_matrix:"get_matrix",set_scale:"set_scale",set_rotation:"set_rotation",set_pos:"set_pos"}
};
var phoenix_Vector = function(_x,_y,_z,_w) {
	if(_w == null) _w = 0;
	if(_z == null) _z = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this._construct = false;
	this.ignore_listeners = false;
	this.w = 0;
	this.z = 0;
	this.y = 0;
	this.x = 0;
	this._construct = true;
	this.x = _x;
	if(this._construct) this.x; else {
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
		this.x;
	}
	this.y = _y;
	if(this._construct) this.y; else {
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
		this.y;
	}
	this.z = _z;
	if(this._construct) this.z; else {
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
		this.z;
	}
	this.w = _w;
	this._construct = false;
};
$hxClasses["phoenix.Vector"] = phoenix_Vector;
phoenix_Vector.__name__ = true;
phoenix_Vector.Divide = function(a,b) {
	return new phoenix_Vector(a.x / b,a.y / b,a.z / b);
};
phoenix_Vector.Listen = function(_v,listener) {
	_v.listen_x = listener;
	_v.listen_y = listener;
	_v.listen_z = listener;
};
phoenix_Vector.prototype = {
	copy_from: function(_other) {
		this.set(_other.x,_other.y,_other.z,_other.w);
		return this;
	}
	,set: function(_x,_y,_z,_w) {
		var prev = this.ignore_listeners;
		this.ignore_listeners = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
			this.z;
		}
		this.w = _w;
		this.ignore_listeners = prev;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		return this;
	}
	,set_xy: function(_x,_y) {
		var prev = this.ignore_listeners;
		this.ignore_listeners = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
			this.y;
		}
		this.ignore_listeners = prev;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		return this;
	}
	,set_xyz: function(_x,_y,_z) {
		var prev = this.ignore_listeners;
		this.ignore_listeners = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
			this.z;
		}
		this.ignore_listeners = prev;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		return this;
	}
	,clone: function() {
		return new phoenix_Vector(this.x,this.y,this.z,this.w);
	}
	,add_xyz: function(_x,_y,_z) {
		if(_z == null) _z = 0;
		if(_y == null) _y = 0;
		if(_x == null) _x = 0;
		this.set_xyz(this.x + _x,this.y + _y,this.z + _z);
		return this;
	}
	,divideScalar: function(v) {
		if(v != 0) this.set_xyz(this.x / v,this.y / v,this.z / v); else this.set_xyz(0,0,0);
		return this;
	}
	,get_normalized: function() {
		return phoenix_Vector.Divide(this,Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
	}
	,set_x: function(_x) {
		this.x = _x;
		if(this._construct) return this.x;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
		return this.x;
	}
	,set_y: function(_y) {
		this.y = _y;
		if(this._construct) return this.y;
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
		return this.y;
	}
	,set_z: function(_z) {
		this.z = _z;
		if(this._construct) return this.z;
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
		return this.z;
	}
	,transform: function(_m) {
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		var e = _m.elements;
		this.set_xyz(e[0] * _x + e[4] * _y + e[8] * _z + e[12],e[1] * _x + e[5] * _y + e[9] * _z + e[13],e[2] * _x + e[6] * _y + e[10] * _z + e[14]);
		return this;
	}
	,setEulerFromQuaternion: function(q,order) {
		if(order == null) order = 0;
		var sqx = q.x * q.x;
		var sqy = q.y * q.y;
		var sqz = q.z * q.z;
		var sqw = q.w * q.w;
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		if(order == 0) {
			_x = Math.atan2(2 * (q.x * q.w - q.y * q.z),sqw - sqx - sqy + sqz);
			_y = Math.asin(luxe_utils_Maths.clamp(2 * (q.x * q.z + q.y * q.w),-1,1));
			_z = Math.atan2(2 * (q.z * q.w - q.x * q.y),sqw + sqx - sqy - sqz);
		} else if(order == 1) {
			_x = Math.asin(luxe_utils_Maths.clamp(2 * (q.x * q.w - q.y * q.z),-1,1));
			_y = Math.atan2(2 * (q.x * q.z + q.y * q.w),sqw - sqx - sqy + sqz);
			_z = Math.atan2(2 * (q.x * q.y + q.z * q.w),sqw - sqx + sqy - sqz);
		} else if(order == 2) {
			_x = Math.asin(luxe_utils_Maths.clamp(2 * (q.x * q.w + q.y * q.z),-1,1));
			_y = Math.atan2(2 * (q.y * q.w - q.z * q.x),sqw - sqx - sqy + sqz);
			_z = Math.atan2(2 * (q.z * q.w - q.x * q.y),sqw - sqx + sqy - sqz);
		} else if(order == 3) {
			_x = Math.atan2(2 * (q.x * q.w + q.z * q.y),sqw - sqx - sqy + sqz);
			_y = Math.asin(luxe_utils_Maths.clamp(2 * (q.y * q.w - q.x * q.z),-1,1));
			_z = Math.atan2(2 * (q.x * q.y + q.z * q.w),sqw + sqx - sqy - sqz);
		} else if(order == 4) {
			_x = Math.atan2(2 * (q.x * q.w - q.z * q.y),sqw - sqx + sqy - sqz);
			_y = Math.atan2(2 * (q.y * q.w - q.x * q.z),sqw + sqx - sqy - sqz);
			_z = Math.asin(luxe_utils_Maths.clamp(2 * (q.x * q.y + q.z * q.w),-1,1));
		} else if(order == 5) {
			_x = Math.atan2(2 * (q.x * q.w + q.y * q.z),sqw - sqx + sqy - sqz);
			_y = Math.atan2(2 * (q.x * q.z + q.y * q.w),sqw + sqx - sqy - sqz);
			_z = Math.asin(luxe_utils_Maths.clamp(2 * (q.z * q.w - q.x * q.y),-1,1));
		}
		this.set_xyz(_x,_y,_z);
		return this;
	}
	,__class__: phoenix_Vector
	,__properties__: {get_normalized:"get_normalized",set_z:"set_z",set_y:"set_y",set_x:"set_x"}
};
var phoenix_geometry_Geometry = function(options) {
	this._prev_count = 0;
	this.dirty = false;
	this.locked = false;
	this.immediate = false;
	this.visible = true;
	this.dirty_clip = false;
	this.dirty_depth = false;
	this.dirty_shader = false;
	this.dirty_texture = false;
	this.dirty_primitive_type = false;
	this.shadow_clip = false;
	this.shadow_depth = 0.0;
	this.id = "";
	this.uuid = "";
	this.dropped = false;
	this.added = false;
	this.buffer_type = 35048;
	this.buffer_based = false;
	this.object_space = false;
	this.uuid = Luxe.utils.uniqueid();
	this.id = this.uuid;
	this.state = new phoenix_geometry_GeometryState();
	this.vertices = [];
	this.batchers = [];
	this.transform = new phoenix_Transform();
	this._final_vert_position = new phoenix_Vector();
	this.set_clip_rect(null);
	this.set_clip(false);
	var _do_add = true;
	if(options != null) {
		if(options.id == null) options.id = this.uuid;
		this.id = options.id;
		this.set_color((function($this) {
			var $r;
			if(options.color == null) options.color = new phoenix_Color();
			$r = options.color;
			return $r;
		}(this)));
		this.set_visible((function($this) {
			var $r;
			if(options.visible == null) options.visible = true;
			$r = options.visible;
			return $r;
		}(this)));
		if(options.immediate == null) options.immediate = false;
		this.immediate = options.immediate;
		if(options.buffer_based == null) options.buffer_based = false;
		this.buffer_based = options.buffer_based;
		if(options.object_space == null) options.object_space = false;
		this.object_space = options.object_space;
		this.state.set_depth((function($this) {
			var $r;
			if(options.depth == null) options.depth = $this.state.depth;
			$r = options.depth;
			return $r;
		}(this)));
		this.state.set_texture((function($this) {
			var $r;
			if(options.texture == null) options.texture = $this.state.texture;
			$r = options.texture;
			return $r;
		}(this)));
		this.state.set_primitive_type((function($this) {
			var $r;
			if(options.primitive_type == null) options.primitive_type = $this.state.primitive_type;
			$r = options.primitive_type;
			return $r;
		}(this)));
		this.state.set_shader((function($this) {
			var $r;
			if(options.shader == null) options.shader = $this.state.shader;
			$r = options.shader;
			return $r;
		}(this)));
		if(options.clip_rect != null) {
			var _r = options.clip_rect;
			this.state.set_clip_x(_r.x);
			this.state.set_clip_y(_r.y);
			this.state.set_clip_w(_r.w);
			this.state.set_clip_h(_r.h);
		}
		this.transform.set_pos((function($this) {
			var $r;
			if(options.pos == null) options.pos = $this.transform.local.pos;
			$r = options.pos;
			return $r;
		}(this)));
		this.transform.set_rotation((function($this) {
			var $r;
			if(options.rotation == null) options.rotation = $this.transform.local.rotation;
			$r = options.rotation;
			return $r;
		}(this)));
		this.transform.set_scale((function($this) {
			var $r;
			if(options.scale == null) options.scale = $this.transform.local.scale;
			$r = options.scale;
			return $r;
		}(this)));
		this.transform.set_origin((function($this) {
			var $r;
			if(options.origin == null) options.origin = $this.transform.origin;
			$r = options.origin;
			return $r;
		}(this)));
		if(options.no_batcher_add != null && options.no_batcher_add == true) _do_add = false;
	} else this.set_color(new phoenix_Color());
	phoenix_geometry_Geometry._sequence_key++;
	this.key = new phoenix_geometry_GeometryKey();
	this.key.uuid = this.uuid;
	this.key.timestamp = snow_Snow.core.timestamp();
	this.key.sequence = phoenix_geometry_Geometry._sequence_key;
	this.key.primitive_type = this.state.primitive_type;
	this.key.texture = this.state.texture;
	this.key.shader = this.state.shader;
	this.key.depth = this.state.depth;
	this.key.clip = this.state.clip;
	this.transform.id = this.uuid;
	this.transform.name = this.id;
	if(options != null && options.batcher != null && _do_add) options.batcher.add(this);
	if(this.buffer_based) {
		if(this.vb_pos != null) null; else {
			this.vb_pos = snow_modules_opengl_web_GL.current_context.createBuffer();
			this.vb_tcoords = snow_modules_opengl_web_GL.current_context.createBuffer();
			this.vb_colors = snow_modules_opengl_web_GL.current_context.createBuffer();
			this.set_dirty(true);
		}
	}
	this.uniforms = new phoenix_Uniforms();
};
$hxClasses["phoenix.geometry.Geometry"] = phoenix_geometry_Geometry;
phoenix_geometry_Geometry.__name__ = true;
phoenix_geometry_Geometry.prototype = {
	refresh_key: function() {
		this.key.uuid = this.uuid;
		this.key.timestamp = snow_Snow.core.timestamp();
		this.key.sequence = phoenix_geometry_Geometry._sequence_key;
		this.key.primitive_type = this.state.primitive_type;
		this.key.texture = this.state.texture;
		this.key.shader = this.state.shader;
		this.key.depth = this.state.depth;
		this.key.clip = this.state.clip;
	}
	,drop: function(remove) {
		if(remove == null) remove = true;
		if(remove && this.added) {
			var _g = 0;
			var _g1 = this.batchers;
			while(_g < _g1.length) {
				var b = _g1[_g];
				++_g;
				b.remove(this,true);
			}
		}
		this.key = null;
		this.set_color(null);
		this.state = null;
		this._final_vert_position = null;
		this.batchers = null;
		this.uuid = null;
		this.id = null;
		this.shadow_texture = null;
		this.shadow_shader = null;
		this.vertices = null;
		if(this.transform != null) {
			this.transform.destroy();
			this.transform = null;
		}
		this.destroy_vbos();
		if(this.buffer_pos != null) {
			this.buffer_pos = null;
			this.buffer_tcoords = null;
			this.buffer_colors = null;
			this.buffer_normals = null;
		}
		this.dropped = true;
	}
	,add: function(v) {
		this.vertices.push(v);
		if(this.vertices.length > Luxe.renderer.batcher.max_verts) throw new js__$Boot_HaxeError("" + this.id + " / Currently a single geometry cannot exceed the maximum vert count of " + Luxe.renderer.batcher.max_verts);
	}
	,batch: function(vert_index,tcoord_index,color_index,normal_index,vertlist,tcoordlist,colorlist,normallist) {
		var _g = 0;
		var _g1 = this.vertices;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this._final_vert_position.set(v.pos.x,v.pos.y,v.pos.z,v.pos.w);
			this._final_vert_position.transform(this.transform.get_world().get_matrix());
			vertlist[vert_index] = this._final_vert_position.x;
			vertlist[vert_index + 1] = this._final_vert_position.y;
			vertlist[vert_index + 2] = this._final_vert_position.z;
			vertlist[vert_index + 3] = this._final_vert_position.w;
			vert_index += 4;
			var _vuv = v.uv.uv0;
			tcoordlist[tcoord_index] = _vuv.u;
			tcoordlist[tcoord_index + 1] = _vuv.v;
			tcoordlist[tcoord_index + 2] = _vuv.w;
			tcoordlist[tcoord_index + 3] = _vuv.t;
			tcoord_index += 4;
			colorlist[color_index] = v.color.r;
			colorlist[color_index + 1] = v.color.g;
			colorlist[color_index + 2] = v.color.b;
			colorlist[color_index + 3] = v.color.a;
			color_index += 4;
			normal_index += 4;
		}
	}
	,batch_object_space: function(vert_index,tcoord_index,color_index,normal_index,vertlist,tcoordlist,colorlist,normallist) {
		var _g = 0;
		var _g1 = this.vertices;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			var _vpos = v.pos;
			var _vuv = v.uv.uv0;
			var _vcol = v.color;
			vertlist[vert_index] = _vpos.x;
			vertlist[vert_index + 1] = _vpos.y;
			vertlist[vert_index + 2] = _vpos.z;
			vertlist[vert_index + 3] = _vpos.w;
			vert_index += 4;
			tcoordlist[tcoord_index] = _vuv.u;
			tcoordlist[tcoord_index + 1] = _vuv.v;
			tcoordlist[tcoord_index + 2] = _vuv.w;
			tcoordlist[tcoord_index + 3] = _vuv.t;
			tcoord_index += 4;
			colorlist[color_index] = _vcol.r;
			colorlist[color_index + 1] = _vcol.g;
			colorlist[color_index + 2] = _vcol.b;
			colorlist[color_index + 3] = _vcol.a;
			color_index += 4;
			normal_index += 4;
		}
	}
	,destroy_vbos: function() {
		if(this.vb_pos == null) return;
		snow_modules_opengl_web_GL.current_context.deleteBuffer(this.vb_pos);
		snow_modules_opengl_web_GL.current_context.deleteBuffer(this.vb_tcoords);
		snow_modules_opengl_web_GL.current_context.deleteBuffer(this.vb_colors);
	}
	,update_buffers: function() {
		if(!this.dirty) return false;
		var _verts = this.vertices.length;
		if(_verts != this._prev_count || this.buffer_pos == null) {
			var _length = this.vertices.length * 4;
			this.buffer_pos = null;
			this.buffer_normals = null;
			this.buffer_colors = null;
			this.buffer_tcoords = null;
			var this1;
			if(_length != null) this1 = new Float32Array(_length); else this1 = null;
			this.buffer_pos = this1;
			var this2;
			if(_length != null) this2 = new Float32Array(_length); else this2 = null;
			this.buffer_tcoords = this2;
			var this3;
			if(_length != null) this3 = new Float32Array(_length); else this3 = null;
			this.buffer_colors = this3;
		}
		if(this.object_space) this.batch_object_space(0,0,0,0,this.buffer_pos,this.buffer_tcoords,this.buffer_colors,this.buffer_normals); else this.batch(0,0,0,0,this.buffer_pos,this.buffer_tcoords,this.buffer_colors,this.buffer_normals);
		this.set_dirty(false);
		return true;
	}
	,set_locked: function(_locked) {
		if(_locked) this.buffer_type = 35044; else this.buffer_type = 35048;
		if(_locked && this.vb_pos == null) {
			if(this.vb_pos != null) null; else {
				this.vb_pos = snow_modules_opengl_web_GL.current_context.createBuffer();
				this.vb_tcoords = snow_modules_opengl_web_GL.current_context.createBuffer();
				this.vb_colors = snow_modules_opengl_web_GL.current_context.createBuffer();
				this.set_dirty(true);
			}
		}
		if(!_locked && this.vb_pos != null) this.destroy_vbos();
		return this.locked = _locked;
	}
	,set_dirty: function(_dirty) {
		return this.dirty = _dirty;
	}
	,refresh: function() {
		var _g = 0;
		var _g1 = this.batchers;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			b.remove(this,false);
		}
		if(this.dirty_primitive_type) {
			this.dirty_primitive_type = false;
			this.state.set_primitive_type(this.shadow_primitive_type);
		}
		if(this.dirty_texture) {
			this.dirty_texture = false;
			this.state.set_texture(this.shadow_texture);
		}
		if(this.dirty_shader) {
			this.dirty_shader = false;
			this.state.set_shader(this.shadow_shader);
		}
		if(this.dirty_depth) {
			this.dirty_depth = false;
			this.state.depth = this.shadow_depth;
		}
		if(this.dirty_clip) {
			this.dirty_clip = false;
			this.state.set_clip(this.shadow_clip);
		}
		this.refresh_key();
		var _g2 = 0;
		var _g11 = this.batchers;
		while(_g2 < _g11.length) {
			var b1 = _g11[_g2];
			++_g2;
			b1.add(this,false);
		}
	}
	,set_primitive_type: function(val) {
		if(this.state.primitive_type != val) {
			this.shadow_primitive_type = val;
			this.dirty_primitive_type = true;
			this.refresh();
		}
		return this.primitive_type = val;
	}
	,set_texture: function(val) {
		if(this.state.texture != val) {
			this.shadow_texture = val;
			this.dirty_texture = true;
			this.refresh();
		}
		return this.texture = val;
	}
	,set_visible: function(val) {
		return this.visible = val;
	}
	,set_color: function(val) {
		if(this.vertices != null && this.vertices.length > 0) {
			var _g = 0;
			var _g1 = this.vertices;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				v.color = val;
			}
		}
		return this.color = val;
	}
	,set_shader: function(val) {
		if(this.state.shader != val) {
			this.shadow_shader = val;
			this.dirty_shader = true;
			this.refresh();
		}
		return this.shader = val;
	}
	,set_depth: function(val) {
		if(this.state.depth != val) {
			this.shadow_depth = val;
			this.dirty_depth = true;
			this.refresh();
		}
		return this.depth = val;
	}
	,set_clip: function(val) {
		if(this.state.clip != val) {
			this.shadow_clip = val;
			this.dirty_clip = true;
			this.refresh();
		}
		return this.clip = val;
	}
	,set_clip_rect: function(val) {
		if(val == null) this.set_clip(false); else {
			this.set_clip(true);
			this.state.set_clip_x(val.x);
			this.state.set_clip_y(val.y);
			this.state.set_clip_w(val.w);
			this.state.set_clip_h(val.h);
		}
		return this.clip_rect = val;
	}
	,__class__: phoenix_geometry_Geometry
	,__properties__: {set_clip:"set_clip",set_color:"set_color",set_dirty:"set_dirty",set_locked:"set_locked",set_visible:"set_visible",set_clip_rect:"set_clip_rect",set_depth:"set_depth",set_shader:"set_shader",set_texture:"set_texture",set_primitive_type:"set_primitive_type"}
};
var phoenix_geometry_GeometryKey = function() {
	this.clip = false;
	this.depth = 0;
	this.uuid = "";
	this.sequence = 0;
	this.timestamp = 0;
};
$hxClasses["phoenix.geometry.GeometryKey"] = phoenix_geometry_GeometryKey;
phoenix_geometry_GeometryKey.__name__ = true;
phoenix_geometry_GeometryKey.prototype = {
	__class__: phoenix_geometry_GeometryKey
};
var phoenix_geometry_GeometryState = function() {
	this.dirty = true;
	this.clip = false;
	this.dirty = true;
	this.clip_x = 0.0;
	this.dirty = true;
	this.clip_y = 0.0;
	this.dirty = true;
	this.clip_w = 0.0;
	this.dirty = true;
	this.clip_h = 0.0;
	this.dirty = true;
	this.texture = null;
	this.dirty = true;
	this.shader = null;
	this.depth = 0.0;
	this.dirty = true;
	this.primitive_type = 0;
	this.dirty = false;
};
$hxClasses["phoenix.geometry.GeometryState"] = phoenix_geometry_GeometryState;
phoenix_geometry_GeometryState.__name__ = true;
phoenix_geometry_GeometryState.prototype = {
	clone_onto: function(_other) {
		_other.dirty = this.dirty;
		_other.dirty = true;
		_other.texture = this.texture;
		_other.dirty = true;
		_other.shader = this.shader;
		_other.depth = this.depth;
		_other.dirty = true;
		_other.primitive_type = this.primitive_type;
		_other.dirty = true;
		_other.clip = this.clip;
		_other.dirty = true;
		_other.clip_x = this.clip_x;
		_other.dirty = true;
		_other.clip_y = this.clip_y;
		_other.dirty = true;
		_other.clip_w = this.clip_w;
		_other.dirty = true;
		_other.clip_h = this.clip_h;
	}
	,update: function(other) {
		if(this.depth != other.depth) this.depth = other.depth;
		if(this.texture != other.texture) {
			this.dirty = true;
			this.texture = other.texture;
		}
		if(this.shader != other.shader) {
			this.dirty = true;
			this.shader = other.shader;
		}
		if(this.primitive_type != other.primitive_type) {
			this.dirty = true;
			this.primitive_type = other.primitive_type;
		}
		if(this.clip != other.clip) {
			this.dirty = true;
			this.clip = other.clip;
		}
		if(this.clip_x != other.clip_x) {
			this.dirty = true;
			this.clip_x = other.clip_x;
		}
		if(this.clip_y != other.clip_y) {
			this.dirty = true;
			this.clip_y = other.clip_y;
		}
		if(this.clip_w != other.clip_w) {
			this.dirty = true;
			this.clip_w = other.clip_w;
		}
		if(this.clip_h != other.clip_h) {
			this.dirty = true;
			this.clip_h = other.clip_h;
		}
	}
	,set_primitive_type: function(val) {
		this.dirty = true;
		return this.primitive_type = val;
	}
	,set_texture: function(val) {
		this.dirty = true;
		return this.texture = val;
	}
	,set_shader: function(val) {
		this.dirty = true;
		return this.shader = val;
	}
	,set_depth: function(val) {
		return this.depth = val;
	}
	,set_clip: function(val) {
		this.dirty = true;
		return this.clip = val;
	}
	,set_clip_x: function(val) {
		this.dirty = true;
		return this.clip_x = val;
	}
	,set_clip_y: function(val) {
		this.dirty = true;
		return this.clip_y = val;
	}
	,set_clip_w: function(val) {
		this.dirty = true;
		return this.clip_w = val;
	}
	,set_clip_h: function(val) {
		this.dirty = true;
		return this.clip_h = val;
	}
	,__class__: phoenix_geometry_GeometryState
	,__properties__: {set_clip_h:"set_clip_h",set_clip_w:"set_clip_w",set_clip_y:"set_clip_y",set_clip_x:"set_clip_x",set_clip:"set_clip",set_depth:"set_depth",set_texture:"set_texture",set_shader:"set_shader",set_primitive_type:"set_primitive_type"}
};
var phoenix_geometry_LineGeometry = function(options) {
	if(options != null) options.primitive_type = 1;
	phoenix_geometry_Geometry.call(this,options);
	if(options == null) return;
	if(options.color == null) options.color = new phoenix_Color();
	options.color;
	if(options.color0 == null) options.color0 = options.color;
	options.color0;
	if(options.color1 == null) options.color1 = options.color;
	options.color1;
	this.set_p0((function($this) {
		var $r;
		if(options.p0 == null) options.p0 = new phoenix_Vector();
		$r = options.p0;
		return $r;
	}(this)));
	this.set_p1((function($this) {
		var $r;
		if(options.p1 == null) options.p1 = new phoenix_Vector(64,64);
		$r = options.p1;
		return $r;
	}(this)));
	this.add(new phoenix_geometry_Vertex(this.p0,options.color0));
	this.add(new phoenix_geometry_Vertex(this.p1,options.color1));
};
$hxClasses["phoenix.geometry.LineGeometry"] = phoenix_geometry_LineGeometry;
phoenix_geometry_LineGeometry.__name__ = true;
phoenix_geometry_LineGeometry.__super__ = phoenix_geometry_Geometry;
phoenix_geometry_LineGeometry.prototype = $extend(phoenix_geometry_Geometry.prototype,{
	set_p0: function(_p) {
		this.p0 = _p;
		if(this.vertices.length == 0) return this.p0;
		this.vertices[0].pos = this.p0;
		return this.p0 = _p;
	}
	,set_p1: function(_p) {
		this.p1 = _p;
		if(this.vertices.length == 0) return this.p1;
		this.vertices[1].pos = this.p1;
		return this.p1 = _p;
	}
	,__class__: phoenix_geometry_LineGeometry
	,__properties__: $extend(phoenix_geometry_Geometry.prototype.__properties__,{set_p1:"set_p1",set_p0:"set_p0"})
});
var phoenix_geometry_QuadGeometry = function(options) {
	this._uv_h = 1;
	this._uv_w = 1;
	this._uv_y = 0;
	this._uv_x = 0;
	this.uv_angle = 0;
	this.flipy = false;
	this.flipx = false;
	options.primitive_type = 4;
	phoenix_geometry_Geometry.call(this,options);
	if(options == null) return;
	if(options.flipx != null) this.set_flipx(options.flipx);
	if(options.flipy != null) this.set_flipy(options.flipy);
	var _x = options.x;
	var _y = options.y;
	var _w = options.w;
	var _h = options.h;
	if(options.rect != null) {
		_x = options.rect.x;
		_y = options.rect.y;
		_w = options.rect.w;
		_h = options.rect.h;
	}
	this.add(new phoenix_geometry_Vertex(new phoenix_Vector(0,0),this.color));
	this.add(new phoenix_geometry_Vertex(new phoenix_Vector(_w,0),this.color));
	this.add(new phoenix_geometry_Vertex(new phoenix_Vector(_w,_h),this.color));
	this.add(new phoenix_geometry_Vertex(new phoenix_Vector(0,_h),this.color));
	this.add(new phoenix_geometry_Vertex(new phoenix_Vector(0,0),this.color));
	this.add(new phoenix_geometry_Vertex(new phoenix_Vector(_w,_h),this.color));
	this.transform.set_pos(this.transform.local.pos.set_xy(_x,_y));
	if(options.uv != null) this.uv(options.uv); else this.uv_space(0,0,1,1);
	if(options.visible != null) this.set_visible(options.visible);
	if(options.immediate != null) this.immediate = options.immediate;
};
$hxClasses["phoenix.geometry.QuadGeometry"] = phoenix_geometry_QuadGeometry;
phoenix_geometry_QuadGeometry.__name__ = true;
phoenix_geometry_QuadGeometry.__super__ = phoenix_geometry_Geometry;
phoenix_geometry_QuadGeometry.prototype = $extend(phoenix_geometry_Geometry.prototype,{
	uv: function(_rect) {
		if(this.state.texture == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("texture was null" + (" ( " + "QuadGeometry; Calling UV on a geometry with null texture." + " )")));
		var tlx = _rect.x / this.state.texture.width_actual;
		var tly = _rect.y / this.state.texture.height_actual;
		var szx = _rect.w / this.state.texture.width_actual;
		var szy = _rect.h / this.state.texture.height_actual;
		this.uv_space(tlx,tly,szx,szy);
	}
	,uv_space: function(_rect_x,_rect_y,_rect_w,_rect_h) {
		if(this.vertices.length == 0) return;
		var sz_x = _rect_w;
		var sz_y = _rect_h;
		var tl_x = _rect_x;
		var tl_y = _rect_y;
		this._uv_x = tl_x;
		this._uv_y = tl_y;
		this._uv_w = sz_x;
		this._uv_h = sz_y;
		var tr_x = tl_x + sz_x;
		var tr_y = tl_y;
		var br_x = tl_x + sz_x;
		var br_y = tl_y + sz_y;
		var bl_x = tl_x;
		var bl_y = tl_y + sz_y;
		var tmp_x = 0.0;
		var tmp_y = 0.0;
		var rotations = this.uv_angle / 90 | 0;
		rotations = rotations - 4 * Math.floor(rotations / 4);
		var _g = 0;
		while(_g < rotations) {
			var r = _g++;
			tmp_x = tl_x;
			tl_x = bl_x;
			bl_x = br_x;
			br_x = tr_x;
			tr_x = tmp_x;
			tmp_y = tl_y;
			tl_y = bl_y;
			bl_y = br_y;
			br_y = tr_y;
			tr_y = tmp_y;
		}
		if(this.flipy) {
			tmp_y = bl_y;
			bl_y = tl_y;
			tl_y = tmp_y;
			tmp_x = bl_x;
			bl_x = tl_x;
			tl_x = tmp_x;
			tmp_y = br_y;
			br_y = tr_y;
			tr_y = tmp_y;
			tmp_x = br_x;
			br_x = tr_x;
			tr_x = tmp_x;
		}
		if(this.flipx) {
			tmp_x = tr_x;
			tr_x = tl_x;
			tl_x = tmp_x;
			tmp_y = tr_y;
			tr_y = tl_y;
			tl_y = tmp_y;
			tmp_x = br_x;
			br_x = bl_x;
			bl_x = tmp_x;
			tmp_y = br_y;
			br_y = bl_y;
			bl_y = tmp_y;
		}
		this.vertices[0].uv.uv0.set_uv(tl_x,tl_y);
		this.vertices[1].uv.uv0.set_uv(tr_x,tr_y);
		this.vertices[2].uv.uv0.set_uv(br_x,br_y);
		this.vertices[3].uv.uv0.set_uv(bl_x,bl_y);
		this.vertices[4].uv.uv0.set_uv(tl_x,tl_y);
		this.vertices[5].uv.uv0.set_uv(br_x,br_y);
		this.set_dirty(true);
	}
	,resize_xy: function(_x,_y) {
		if(this.vertices.length == 0) return;
		this.vertices[0].pos.set_xy(0,0);
		this.vertices[1].pos.set_xy(_x,0);
		this.vertices[2].pos.set_xy(_x,_y);
		this.vertices[3].pos.set_xy(0,_y);
		this.vertices[4].pos.set_xy(0,0);
		this.vertices[5].pos.set_xy(_x,_y);
	}
	,resize: function(quad) {
		this.resize_xy(quad.x,quad.y);
	}
	,set_flipx: function(_val) {
		this.flipx = _val;
		this.uv_space(this._uv_x,this._uv_y,this._uv_w,this._uv_h);
		return this.flipx;
	}
	,set_flipy: function(_val) {
		this.flipy = _val;
		this.uv_space(this._uv_x,this._uv_y,this._uv_w,this._uv_h);
		return this.flipy;
	}
	,__class__: phoenix_geometry_QuadGeometry
	,__properties__: $extend(phoenix_geometry_Geometry.prototype.__properties__,{set_flipy:"set_flipy",set_flipx:"set_flipx"})
});
var phoenix_geometry_TextGeometry = function(_options) {
	this.dirty_align = true;
	this.dirty_sizing = true;
	this.point_ratio = 1;
	this.text_h_h = 0;
	this.text_h_w = 0;
	this.text_height = 0;
	this.text_width = 0;
	this.glow_amount = 0;
	this.glow_threshold = 0;
	this.outline = 0;
	this.thickness = 0.5;
	this.smoothness = 0.75;
	this.unique = false;
	this.sdf = false;
	this.bounds_wrap = false;
	this.letter_spacing = 0.0;
	this.line_spacing = 0.0;
	this.point_size = 32.0;
	this.text = "";
	this.options = _options;
	this.emitter = new luxe_Emitter();
	if(this.options == null) throw new js__$Boot_HaxeError(luxe_DebugError.null_assertion("options was null" + (" ( " + "TextGeometry requires non-null options" + " )")));
	if(this.options.sdf != null) this.sdf = this.options.sdf;
	if(this.options.font == null) this.options.font = Luxe.renderer.font;
	this.font = this.options.font;
	if(this.font == Luxe.renderer.font) this.sdf = true;
	if(this.options.shader == null) {
		if(this.sdf) this.options.shader = Luxe.renderer.shaders.bitmapfont.shader; else this.options.shader = Luxe.renderer.shaders.textured.shader;
	} else if(this.options.shader != Luxe.renderer.shaders.bitmapfont.shader) this.unique = true;
	this.options.primitive_type = 4;
	phoenix_geometry_Geometry.call(this,this.options);
	this.cache = [];
	this.line_widths = [];
	this.line_offsets = [[],[]];
	this.lines = [];
	this.set_outline_color(new phoenix_Color());
	this.set_glow_color(new phoenix_Color());
	this.default_options();
};
$hxClasses["phoenix.geometry.TextGeometry"] = phoenix_geometry_TextGeometry;
phoenix_geometry_TextGeometry.__name__ = true;
phoenix_geometry_TextGeometry.__super__ = phoenix_geometry_Geometry;
phoenix_geometry_TextGeometry.prototype = $extend(phoenix_geometry_Geometry.prototype,{
	default_options: function() {
		this.set_texture(this.font.pages.h[0]);
		if(this.options.letter_spacing != null) this.set_letter_spacing(this.options.letter_spacing);
		if(this.options.line_spacing != null) this.set_line_spacing(this.options.line_spacing);
		if(this.options.point_size != null) this.set_point_size(this.options.point_size);
		if(this.options.bounds != null) this.set_bounds(this.options.bounds);
		if(this.options.bounds_wrap != null) this.set_bounds_wrap(this.options.bounds_wrap);
		if(this.options.align == null) this.options.align = 0;
		this.options.align;
		if(this.options.align_vertical == null) this.options.align_vertical = 3;
		this.options.align_vertical;
		this.set_align(this.options.align);
		this.set_align_vertical(this.options.align_vertical);
		if(this.options.thickness != null) this.set_thickness(this.options.thickness);
		if(this.options.smoothness != null) this.set_smoothness(this.options.smoothness);
		if(this.options.outline != null) this.set_outline(this.options.outline);
		if(this.options.outline_color != null) this.set_outline_color(this.options.outline_color);
		if(this.options.glow_threshold != null) this.set_glow_threshold(this.options.glow_threshold);
		if(this.options.glow_amount != null) this.set_glow_amount(this.options.glow_amount);
		if(this.options.glow_color != null) this.set_glow_color(this.options.glow_color);
		if(this.sdf) this.flush_uniforms();
		if(this.options.text != null) this.set_text(this.options.text);
	}
	,set_text: function(_text) {
		if(_text == null) {
			haxe_Log.trace("i / textgeometry / " + "null text passed into TextGeometry!",{ fileName : "TextGeometry.hx", lineNumber : 240, className : "phoenix.geometry.TextGeometry", methodName : "set_text"});
			_text = "";
		}
		if(this.text != _text) {
			this.text = _text;
			if(this.text != "") {
				this.set_dirty_sizing(true);
				this.update_text();
			} else this.vertices.splice(0,this.vertices.length);
		}
		return this.text;
	}
	,update_sizes: function() {
		if(!this.dirty_sizing) return false;
		var drawn_text = phoenix_geometry_TextGeometry.tab_regex.replace(this.text,"    ");
		if(this.bounds_wrap && this.bounds != null) drawn_text = this.font.wrap_string_to_bounds(drawn_text,this.bounds,this.point_size,this.letter_spacing);
		this.lines.splice(0,this.lines.length);
		this.lines = drawn_text.split("\n");
		this.line_widths.splice(0,this.line_widths.length);
		this.text_width = this.font.width_of(drawn_text,this.point_size,this.letter_spacing,this.line_widths);
		this.text_height = this.font.height_of_lines(this.lines,this.point_size,this.line_spacing);
		this.text_h_w = this.text_width / 2;
		this.text_h_h = this.text_height / 2;
		this.point_ratio = this.point_size / this.font.info.point_size;
		this.set_dirty_sizing(false);
		return true;
	}
	,update_text: function() {
		var _g = this;
		var _pos_x = 0.0;
		var _pos_y = 0.0;
		var _bounds_based = this.bounds != null;
		if(_bounds_based) {
			this.transform.local.pos.set_x(_pos_x = this.bounds.x);
			this.transform.local.pos.set_y(_pos_y = this.bounds.y);
		}
		var _cur_x = 0.0;
		var _cur_y = 0.0;
		var _line_idx = 0;
		var _total_idx = 0;
		var _is_char = true;
		var _was_dirty = this.update_sizes();
		var _g1 = 0;
		var _g11 = this.lines;
		while(_g1 < _g11.length) {
			var _line = _g11[_g1];
			++_g1;
			var _line_x_offset = 0.0;
			var _line_y_offset = 0.0;
			if(this.dirty_align) {
				if(!_bounds_based) {
					var _g2 = this.align;
					switch(_g2) {
					case 2:
						_line_x_offset = -(this.line_widths[_line_idx] / 2.0);
						break;
					case 1:
						_line_x_offset = -this.line_widths[_line_idx];
						break;
					default:
						_line_x_offset = 0.0;
					}
					var _g21 = this.align_vertical;
					switch(_g21) {
					case 2:
						_line_y_offset = -this.text_h_h;
						break;
					case 4:
						_line_y_offset = -this.text_height;
						break;
					default:
						_line_y_offset = 0.0;
					}
				} else {
					var _g22 = this.align;
					switch(_g22) {
					case 2:
						_line_x_offset = -(this.line_widths[_line_idx] / 2.0) + this.bounds.w / 2;
						break;
					case 1:
						_line_x_offset = -this.line_widths[_line_idx] + this.bounds.w;
						break;
					default:
						_line_x_offset = 0.0;
					}
					var _g23 = this.align_vertical;
					switch(_g23) {
					case 2:
						_line_y_offset = this.bounds.h / 2 - this.text_h_h;
						break;
					case 4:
						_line_y_offset = this.bounds.h - this.text_height;
						break;
					default:
						_line_y_offset = 0.0;
					}
				}
				this.line_offsets[0][_line_idx] = _line_x_offset;
				this.line_offsets[1][_line_idx] = _line_y_offset;
			} else {
				_line_x_offset = this.line_offsets[0][_line_idx];
				_line_y_offset = this.line_offsets[1][_line_idx];
			}
			if(_line_idx != 0) {
				_cur_y += (_g.font.info.line_height + _g.line_spacing) * _g.point_ratio;
				_cur_x = 0;
			}
			var _idx = 0;
			var _g2_i = 0;
			var _g2_string = _line;
			var _g2_index = 0;
			var _g2_endIndex = _line.length;
			while(_g2_index < _g2_endIndex) {
				var _uglyph;
				_g2_i = _g2_index;
				_g2_index += luxe_utils_unifill_InternalEncoding.codePointWidthAt(_g2_string,_g2_index);
				_uglyph = luxe_utils_unifill__$Utf16_Utf16_$Impl_$.codePointAt(_g2_string,_g2_i);
				var _index = _uglyph;
				var _char = this.font.info.chars.h[_index];
				_is_char = _char != null && _index > 32;
				if(!_is_char) _char = this.font.space_char;
				if(_is_char) {
					var _quad_x = _line_x_offset + _cur_x + _char.xoffset * this.point_ratio;
					var _quad_y = _line_y_offset + _cur_y + _char.yoffset * this.point_ratio;
					var _page = this.font.pages.h[_char.page];
					var _u1 = _char.x / _page.width_actual;
					var _v1 = _char.y / _page.height_actual;
					var _u2 = (_char.x + _char.width) / _page.width_actual;
					var _v2 = (_char.y + _char.height) / _page.height_actual;
					this.update_char(_total_idx,_quad_x,_quad_y,_char.width * this.point_ratio,_char.height * this.point_ratio,_u1,_v1,_u2,_v2,this.color);
					_total_idx++;
				}
				var _x_inc = _char.xadvance;
				if(_idx < _line.length - 1) {
					_x_inc += this.font.kerning(_index,luxe_utils_unifill_Unifill.uCharCodeAt(_line,_idx + 1));
					if(_index >= 32) _x_inc += this.letter_spacing;
				}
				_x_inc *= this.point_ratio;
				_cur_x += _x_inc;
				_idx++;
			}
			_line_idx++;
		}
		var _vertidx = this.vertices.length / 6 | 0;
		var _diff = _vertidx - _total_idx;
		if(_diff > 0) this.vertices.splice(_total_idx * 6,_diff * 6);
		this.dirty_align = false;
		this.emitter.emit(1);
	}
	,update_char: function(_letteridx,_x,_y,_w,_h,_u,_v,_u2,_v2,_color) {
		var vert0;
		var vert1;
		var vert2;
		var vert3;
		var vert4;
		var vert5;
		var quad = this.cache[_letteridx];
		if(quad == null) {
			vert0 = new phoenix_geometry_Vertex(new phoenix_Vector(_x,_y),_color);
			vert1 = new phoenix_geometry_Vertex(new phoenix_Vector(_x + _w,_y),_color);
			vert2 = new phoenix_geometry_Vertex(new phoenix_Vector(_x + _w,_y + _h),_color);
			vert3 = new phoenix_geometry_Vertex(new phoenix_Vector(_x,_y + _h),_color);
			vert4 = new phoenix_geometry_Vertex(new phoenix_Vector(_x,_y),_color);
			vert5 = new phoenix_geometry_Vertex(new phoenix_Vector(_x + _w,_y + _h),_color);
			quad = [vert0,vert1,vert2,vert3,vert4,vert5];
			this.cache[_letteridx] = quad;
		} else {
			vert0 = quad[0];
			vert1 = quad[1];
			vert2 = quad[2];
			vert3 = quad[3];
			vert4 = quad[4];
			vert5 = quad[5];
			vert0.pos.set_xy(_x,_y);
			vert1.pos.set_xy(_x + _w,_y);
			vert2.pos.set_xy(_x + _w,_y + _h);
			vert3.pos.set_xy(_x,_y + _h);
			vert4.pos.set_xy(_x,_y);
			vert5.pos.set_xy(_x + _w,_y + _h);
		}
		vert0.uv.uv0.set_uv(_u,_v);
		vert1.uv.uv0.set_uv(_u2,_v);
		vert2.uv.uv0.set_uv(_u2,_v2);
		vert3.uv.uv0.set_uv(_u,_v2);
		vert4.uv.uv0.set_uv(_u,_v);
		vert5.uv.uv0.set_uv(_u2,_v2);
		var _vertidx = Math.floor(this.vertices.length / 6);
		if(_vertidx <= _letteridx) {
			this.add(vert0);
			this.add(vert1);
			this.add(vert2);
			this.add(vert3);
			this.add(vert4);
			this.add(vert5);
		}
	}
	,set_dirty_sizing: function(_b) {
		this.dirty_align = true;
		return this.dirty_sizing = _b;
	}
	,set_bounds: function(_bounds) {
		this.bounds = _bounds;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.bounds;
	}
	,set_bounds_wrap: function(_wrap) {
		this.bounds_wrap = _wrap;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.bounds_wrap;
	}
	,set_line_spacing: function(_line_spacing) {
		this.line_spacing = _line_spacing;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.line_spacing;
	}
	,set_letter_spacing: function(_letter_spacing) {
		this.letter_spacing = _letter_spacing;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.letter_spacing;
	}
	,set_align: function(_align) {
		this.align = _align;
		this.dirty_align = true;
		this.update_text();
		return this.align;
	}
	,set_align_vertical: function(_align_vertical) {
		this.align_vertical = _align_vertical;
		this.dirty_align = true;
		this.update_text();
		return this.align_vertical;
	}
	,set_point_size: function(s) {
		if(s < 0) s = 0;
		this.point_size = s;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.point_size;
	}
	,set_smoothness: function(s) {
		if(s < 0) s = 0;
		if(this.state.shader != null && this.sdf && this.unique) this.state.shader.set_float("smoothness",s);
		return this.smoothness = s;
	}
	,set_thickness: function(s) {
		if(s < 0) s = 0;
		if(this.state.shader != null && this.sdf && this.unique) this.state.shader.set_float("thickness",s);
		return this.thickness = s;
	}
	,set_outline: function(s) {
		if(s < 0.0) s = 0.0; else if(s > 1.0) s = 1.0; else s = s;
		if(this.state.shader != null && this.sdf && this.unique) this.state.shader.set_float("outline",s);
		return this.outline = s;
	}
	,set_glow_threshold: function(s) {
		if(s < 0) s = 0;
		if(this.state.shader != null && this.sdf && this.unique) this.state.shader.set_float("glow_threshold",s);
		return this.glow_threshold = s;
	}
	,set_glow_amount: function(s) {
		if(s < 0) s = 0;
		if(this.state.shader != null && this.sdf && this.unique) this.state.shader.set_float("glow_amount",s);
		return this.glow_amount = s;
	}
	,set_outline_color: function(c) {
		if(this.state.shader != null && this.sdf && this.unique) this.state.shader.set_color("outline_color",c);
		return this.outline_color = c;
	}
	,set_glow_color: function(c) {
		if(this.state.shader != null && this.sdf && this.unique) this.state.shader.set_color("glow_color",c);
		return this.glow_color = c;
	}
	,flush_uniforms: function() {
		if(this.state.shader != null && this.sdf) {
			this.state.shader.set_float("smoothness",this.smoothness);
			this.state.shader.set_float("thickness",this.thickness);
			this.state.shader.set_float("outline",this.outline);
			this.state.shader.set_float("glow_threshold",this.glow_threshold);
			this.state.shader.set_float("glow_amount",this.glow_amount);
			this.state.shader.set_color("outline_color",this.outline_color);
			this.state.shader.set_color("glow_color",this.glow_color);
		}
	}
	,__class__: phoenix_geometry_TextGeometry
	,__properties__: $extend(phoenix_geometry_Geometry.prototype.__properties__,{set_dirty_sizing:"set_dirty_sizing",set_glow_color:"set_glow_color",set_glow_amount:"set_glow_amount",set_glow_threshold:"set_glow_threshold",set_outline_color:"set_outline_color",set_outline:"set_outline",set_thickness:"set_thickness",set_smoothness:"set_smoothness",set_align_vertical:"set_align_vertical",set_align:"set_align",set_bounds_wrap:"set_bounds_wrap",set_bounds:"set_bounds",set_letter_spacing:"set_letter_spacing",set_line_spacing:"set_line_spacing",set_point_size:"set_point_size",set_text:"set_text"})
});
var phoenix_geometry_TextureCoordSet = function() {
	this.uv0 = new phoenix_geometry_TextureCoord();
	this.uv1 = new phoenix_geometry_TextureCoord();
	this.uv2 = new phoenix_geometry_TextureCoord();
	this.uv3 = new phoenix_geometry_TextureCoord();
	this.uv4 = new phoenix_geometry_TextureCoord();
	this.uv5 = new phoenix_geometry_TextureCoord();
	this.uv6 = new phoenix_geometry_TextureCoord();
	this.uv7 = new phoenix_geometry_TextureCoord();
};
$hxClasses["phoenix.geometry.TextureCoordSet"] = phoenix_geometry_TextureCoordSet;
phoenix_geometry_TextureCoordSet.__name__ = true;
phoenix_geometry_TextureCoordSet.prototype = {
	__class__: phoenix_geometry_TextureCoordSet
};
var phoenix_geometry_TextureCoord = function(_u,_v,_w,_t) {
	if(_t == null) _t = 0.0;
	if(_w == null) _w = 0.0;
	if(_v == null) _v = 0.0;
	if(_u == null) _u = 0.0;
	this.t = 0.0;
	this.w = 0.0;
	this.v = 0.0;
	this.u = 0.0;
	this.u = _u;
	this.v = _v;
	this.w = _w;
	this.t = _t;
};
$hxClasses["phoenix.geometry.TextureCoord"] = phoenix_geometry_TextureCoord;
phoenix_geometry_TextureCoord.__name__ = true;
phoenix_geometry_TextureCoord.prototype = {
	set_uv: function(_u,_v) {
		this.u = _u;
		this.v = _v;
		return this;
	}
	,__class__: phoenix_geometry_TextureCoord
};
var phoenix_geometry_Vertex = function(_pos,_color,_normal) {
	this.uv = new phoenix_geometry_TextureCoordSet();
	this.pos = _pos;
	if(_color == null) this.color = new phoenix_Color(); else this.color = _color;
	if(_normal == null) this.normal = new phoenix_Vector(); else this.normal = _normal;
};
$hxClasses["phoenix.geometry.Vertex"] = phoenix_geometry_Vertex;
phoenix_geometry_Vertex.__name__ = true;
phoenix_geometry_Vertex.prototype = {
	__class__: phoenix_geometry_Vertex
};
var roi_js_Peers = function(key) {
	this.onDisconnect = new roi_signals_Signal1();
	this.onConnect = new roi_signals_Signal1();
	this.commands = new haxe_ds_StringMap();
	this.connections = new haxe_ds_StringMap();
	this.key = key;
	this.addCommand("ping",$bind(this,this.receivePing));
	this.addCommand("pong",$bind(this,this.receivePong));
};
$hxClasses["roi.js.Peers"] = roi_js_Peers;
roi_js_Peers.__name__ = true;
roi_js_Peers.prototype = {
	create: function(id,success,fail) {
		this.peer = new Peer(id,{ key : this.key, config : { iceServers : roi_js_Peers.ICESERVERS}});
		this.addPeer(this.peer,success,fail);
		return this;
	}
	,connect: function(id) {
		var c = this.peer.connect(id,{ });
		this.addCon(c);
	}
	,addPeer: function(p,success,fail) {
		var _g = this;
		p.on("open",function(data) {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> peer opened",{ fileName : "Peers.hx", lineNumber : 88, className : "roi.js.Peers", methodName : "addPeer"});
			if(success != null) success();
		});
		p.on("close",function(data1) {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> peer closed",{ fileName : "Peers.hx", lineNumber : 93, className : "roi.js.Peers", methodName : "addPeer"});
			p.removeListener("close");
			p.removeListener("error");
			p.removeListener("connection");
			p.removeListener("disconnected");
			p.destroy();
			if(fail != null) fail();
		});
		p.on("error",function(err) {
			var _g1 = err.type;
			switch(_g1) {
			case "peer-unavailable":
				haxe_Log.trace("peer#" + _g.peer.id + "  -> peer error " + Std.string(err.type) + " " + Std.string(err),{ fileName : "Peers.hx", lineNumber : 109, className : "roi.js.Peers", methodName : "addPeer"});
				break;
			default:
				haxe_Log.trace("peer#" + _g.peer.id + "  -> peer error " + Std.string(err.type) + " " + Std.string(err),{ fileName : "Peers.hx", lineNumber : 111, className : "roi.js.Peers", methodName : "addPeer"});
			}
		});
		p.on("connection",function(c) {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> peer #" + c.peer + " connected to me",{ fileName : "Peers.hx", lineNumber : 116, className : "roi.js.Peers", methodName : "addPeer"});
			_g.addCon(c);
		});
		p.on("disconnected",function() {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> peer disconnected",{ fileName : "Peers.hx", lineNumber : 121, className : "roi.js.Peers", methodName : "addPeer"});
		});
		return p;
	}
	,addCon: function(c) {
		var _g = this;
		c.on("open",function() {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> con opened with #" + c.peer,{ fileName : "Peers.hx", lineNumber : 132, className : "roi.js.Peers", methodName : "addCon"});
			_g.connections.set(c.peer,c);
			_g.onConnect.execute(c.peer);
		});
		c.on("close",function() {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> con closed with #" + c.peer,{ fileName : "Peers.hx", lineNumber : 138, className : "roi.js.Peers", methodName : "addCon"});
			_g.onDisconnect.execute(c.peer);
			_g.removeCon(c);
		});
		c.on("data",function(data) {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> con data received",{ fileName : "Peers.hx", lineNumber : 144, className : "roi.js.Peers", methodName : "addCon"});
			_g.receive(data);
		});
		c.on("error",function(err) {
			haxe_Log.trace("peer#" + _g.peer.id + "  -> con error " + Std.string(err.type) + " " + Std.string(err),{ fileName : "Peers.hx", lineNumber : 149, className : "roi.js.Peers", methodName : "addCon"});
		});
	}
	,removeCon: function(c) {
		c.removeListener("data");
		c.removeListener("error");
		c.removeListener("open");
		c.removeListener("close");
		c.close();
		this.connections.remove(c.peer);
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
	,addCommand: function(cmd,cb) {
		this.commands.set(cmd,cb);
	}
	,broadcast: function(cmd,data) {
		if(this.peer == null) return;
		data.cmd = cmd;
		data.id = this.peer.id;
		data.seq = ++roi_js_Peers._sequence;
		var $it0 = this.connections.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			c.send(data);
		}
	}
	,send: function(to,cmd,data) {
		if(this.peer == null) return;
		if(!this.connections.exists(to)) {
			haxe_Log.trace("No connection with id #" + to,{ fileName : "Peers.hx", lineNumber : 194, className : "roi.js.Peers", methodName : "send"});
			return;
		}
		data.cmd = cmd;
		data.id = this.peer.id;
		data.seq = ++roi_js_Peers._sequence;
		this.connections.get(to).send(data);
	}
	,receivePing: function(data) {
		haxe_Log.trace("peer#" + this.peer.id + "  -> #" + Std.string(data.id) + ": ping " + (new Date().getTime() - data.ping),{ fileName : "Peers.hx", lineNumber : 216, className : "roi.js.Peers", methodName : "receivePing"});
		this.send(data.id,"pong",{ ping : data.ping, pong : new Date().getTime()});
	}
	,receivePong: function(data) {
		haxe_Log.trace("peer#" + this.peer.id + "  -> #" + Std.string(data.id) + ": ping " + (data.pong - data.ping) + " pong " + (new Date().getTime() - data.pong) + " (" + (new Date().getTime() - data.ping) + ")",{ fileName : "Peers.hx", lineNumber : 223, className : "roi.js.Peers", methodName : "receivePong"});
	}
	,__class__: roi_js_Peers
};
var roi_signals_Listener = function(f,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.f = f;
	this.once = once;
	this.priority = priority;
};
$hxClasses["roi.signals.Listener"] = roi_signals_Listener;
roi_signals_Listener.__name__ = true;
roi_signals_Listener.prototype = {
	__class__: roi_signals_Listener
};
var roi_signals_Signal = function() {
};
$hxClasses["roi.signals.Signal"] = roi_signals_Signal;
roi_signals_Signal.__name__ = true;
roi_signals_Signal.prototype = {
	add: function(f,priority) {
		if(priority == null) priority = 0;
		if(f != null && !this.has(f)) this.addListener(new roi_signals_Listener(f,false,priority));
	}
	,has: function(f) {
		var listener = this.head;
		while(listener != null) if(Reflect.compareMethods(listener.f,f)) return true; else listener = listener.next;
		return false;
	}
	,addListener: function(listener) {
		var prev = this.tail;
		var next = null;
		while(prev != null && listener.priority > prev.priority) {
			next = prev;
			prev = prev.prev;
		}
		if(prev != null) {
			prev.next = listener;
			listener.prev = prev;
		} else this.head = listener;
		if(next != null) {
			next.prev = listener;
			listener.next = next;
		} else this.tail = listener;
	}
	,__class__: roi_signals_Signal
};
var roi_signals_Signal1 = function() {
	roi_signals_Signal.call(this);
};
$hxClasses["roi.signals.Signal1"] = roi_signals_Signal1;
roi_signals_Signal1.__name__ = true;
roi_signals_Signal1.__super__ = roi_signals_Signal;
roi_signals_Signal1.prototype = $extend(roi_signals_Signal.prototype,{
	execute: function(value) {
		var curr = this.head;
		var next = null;
		while(curr != null) {
			next = curr.next;
			curr.f(value);
			if(curr.once) {
				if(curr.prev != null) curr.prev.next = curr.next; else this.head = curr.next;
				if(curr.next != null) curr.next.prev = curr.prev; else this.tail = curr.prev;
				curr.f = null;
				curr.next = null;
				curr.prev = null;
			}
			curr = next;
		}
	}
	,__class__: roi_signals_Signal1
});
var snow_Snow = function() {
	this.is_ready = false;
	this.was_ready = false;
	this.has_shutdown = false;
	this.shutting_down = false;
	this.debug = false;
	this.os = "unknown";
	this.platform = "unknown";
	this.freeze = false;
	this.platform = "web";
	snow_Snow.core = new snow_core_web_Core(this);
	snow_Snow.next_queue = [];
	snow_Snow.defer_queue = [];
};
$hxClasses["snow.Snow"] = snow_Snow;
snow_Snow.__name__ = true;
snow_Snow.next = function(func) {
	if(func != null) snow_Snow.next_queue.push(func);
};
snow_Snow.prototype = {
	shutdown: function() {
		this.shutting_down = true;
		this.host.ondestroy();
		this.io.module.destroy();
		this.audio.destroy();
		this.input.destroy();
		this.windowing.destroy();
		snow_Snow.core.shutdown();
		this.has_shutdown = true;
	}
	,dispatch_system_event: function(_event) {
		this.on_event(_event);
	}
	,init: function(_snow_config,_host) {
		this.snow_config = _snow_config;
		if(this.snow_config.app_package == null) this.snow_config.app_package = "org.snowkit.snow";
		if(this.snow_config.config_path == null) this.snow_config.config_path = "";
		this.config = this.default_config();
		this.host = _host;
		this.host.app = this;
		snow_Snow.core.init($bind(this,this.on_event));
	}
	,on_snow_init: function() {
		this.host.on_internal_init();
	}
	,on_snow_ready: function() {
		var _g = this;
		if(this.was_ready) throw new js__$Boot_HaxeError(snow_types_Error.error("firing ready event more than once is invalid usage"));
		this.io = new snow_system_io_IO(this);
		this.input = new snow_system_input_Input(this);
		this.audio = new snow_system_audio_Audio(this);
		this.assets = new snow_system_assets_Assets(this);
		this.windowing = new snow_system_window_Windowing(this);
		this.was_ready = true;
		this.setup_app_path();
		this.setup_configs().then(function(_) {
			_g.setup_default_window();
			snow_Snow.next($bind(_g,_g.on_ready));
		}).error(function(e) {
			throw new js__$Boot_HaxeError(snow_types_Error.init("snow / cannot recover from error: " + e));
		});
		snow_api_Promises.step();
		while(snow_Snow.next_queue.length > 0) this.cycle_next_queue();
		while(snow_Snow.defer_queue.length > 0) this.cycle_defer_queue();
	}
	,do_internal_update: function(dt) {
		this.io.module.update();
		this.input.update();
		this.audio.update();
		this.host.update(dt);
	}
	,on_ready: function() {
		this.is_ready = true;
		this.host.ready();
	}
	,on_snow_update: function() {
		if(this.freeze) return;
		snow_api_Timer.update();
		snow_api_Promises.step();
		this.cycle_next_queue();
		if(!this.is_ready) return;
		this.host.ontickstart();
		this.host.on_internal_update();
		this.host.on_internal_render();
		this.host.ontickend();
		this.cycle_defer_queue();
	}
	,on_event: function(_event) {
		if(_event.type != 3 && _event.type != 0 && _event.type != 5 && _event.type != 6) null;
		if(_event.type != 3) null;
		if(this.is_ready) {
			this.io.module.on_event(_event);
			this.audio.on_event(_event);
			this.windowing.on_event(_event);
			this.input.on_event(_event);
		}
		this.host.onevent(_event);
		var _g = _event.type;
		if(_g != null) switch(_g) {
		case 1:
			this.on_snow_init();
			break;
		case 2:
			this.on_snow_ready();
			break;
		case 3:
			this.on_snow_update();
			break;
		case 7:case 8:
			this.shutdown();
			break;
		case 4:
			haxe_Log.trace("     i / snow / " + "Goodbye.",{ fileName : "Snow.hx", lineNumber : 351, className : "snow.Snow", methodName : "on_event"});
			break;
		default:
		} else {
		}
	}
	,cycle_next_queue: function() {
		var count = snow_Snow.next_queue.length;
		var i = 0;
		while(i < count) {
			(snow_Snow.next_queue.shift())();
			++i;
		}
	}
	,cycle_defer_queue: function() {
		var count = snow_Snow.defer_queue.length;
		var i = 0;
		while(i < count) {
			(snow_Snow.defer_queue.shift())();
			++i;
		}
	}
	,setup_app_path: function() {
	}
	,setup_configs: function() {
		var _g = this;
		if(this.snow_config.config_path == "") {
			this.setup_host_config();
			return snow_api_Promise.resolve();
		}
		return new snow_api_Promise(function(resolve,reject) {
			_g.default_runtime_config().then(function(_runtime_conf) {
				_g.config.runtime = _runtime_conf;
			}).error(function(error) {
				throw new js__$Boot_HaxeError(snow_types_Error.init("config / failed / default runtime config failed to parse as JSON. cannot recover. " + error));
			}).then(function() {
				_g.setup_host_config();
				resolve();
			});
		});
	}
	,setup_host_config: function() {
		this.config = this.host.config(this.config);
	}
	,setup_default_window: function() {
		if(this.config.has_window == true) {
			this.window = this.windowing.create(this.config.window);
			if(this.window.handle == null) throw new js__$Boot_HaxeError(snow_types_Error.windowing("requested default window cannot be created. cannot continue"));
		} else null;
	}
	,default_config: function() {
		return { has_window : true, runtime : { }, window : this.default_window_config(), render : this.default_render_config(), web : { no_context_menu : true, prevent_default_keys : [snow_system_input_Keycodes.left,snow_system_input_Keycodes.right,snow_system_input_Keycodes.up,snow_system_input_Keycodes.down,snow_system_input_Keycodes.backspace,snow_system_input_Keycodes.tab,snow_system_input_Keycodes["delete"]], prevent_default_mouse_wheel : true, true_fullscreen : false}, 'native' : { audio_buffer_length : 176400, audio_buffer_count : 4}};
	}
	,default_runtime_config: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			var load = _g.io.data_flow(haxe_io_Path.join([_g.assets.root,_g.snow_config.config_path]),snow_system_assets_AssetJSON.processor);
			load.then(resolve).error(function(error) {
				switch(error[1]) {
				case 3:
					var val = error[2];
					reject(error);
					break;
				default:
					resolve();
				}
			});
		});
	}
	,default_render_config: function() {
		return { depth : false, stencil : false, antialiasing : 0, red_bits : 8, green_bits : 8, blue_bits : 8, alpha_bits : 8, depth_bits : 0, stencil_bits : 0, opengl : { minor : 0, major : 0, profile : 0}};
	}
	,default_window_config: function() {
		var conf = { fullscreen_desktop : true, fullscreen : false, borderless : false, resizable : true, x : 536805376, y : 536805376, width : 960, height : 640, title : "snow app"};
		return conf;
	}
	,make_uniqueid: function(val) {
		if(val == null) val = Std.random(2147483647);
		var r = val % 62 | 0;
		var q = val / 62 | 0;
		if(q > 0) return this.make_uniqueid(q) + (r > 9?(function($this) {
			var $r;
			var ascii = 65 + (r - 10);
			if(ascii > 90) ascii += 6;
			$r = String.fromCharCode(ascii);
			return $r;
		}(this)):(r == null?"null":"" + r).charAt(0));
		return Std.string(r > 9?(function($this) {
			var $r;
			var ascii1 = 65 + (r - 10);
			if(ascii1 > 90) ascii1 += 6;
			$r = String.fromCharCode(ascii1);
			return $r;
		}(this)):(r == null?"null":"" + r).charAt(0));
	}
	,__class__: snow_Snow
};
var snow_api_DebugError = $hxClasses["snow.api.DebugError"] = { __ename__ : true, __constructs__ : ["assertion","null_assertion"] };
snow_api_DebugError.assertion = function(expr) { var $x = ["assertion",0,expr]; $x.__enum__ = snow_api_DebugError; $x.toString = $estr; return $x; };
snow_api_DebugError.null_assertion = function(expr) { var $x = ["null_assertion",1,expr]; $x.__enum__ = snow_api_DebugError; $x.toString = $estr; return $x; };
var snow_api_Promise = function(func) {
	this.was_caught = false;
	var _g = this;
	this.state = 0;
	this.reject_reactions = [];
	this.fulfill_reactions = [];
	this.settle_reactions = [];
	snow_api_Promises.queue(function() {
		func($bind(_g,_g.onfulfill),$bind(_g,_g.onreject));
		snow_api_Promises.defer(snow_api_Promises.next);
	});
};
$hxClasses["snow.api.Promise"] = snow_api_Promise;
snow_api_Promise.__name__ = true;
snow_api_Promise.all = function(list) {
	return new snow_api_Promise(function(ok,no) {
		var current = 0;
		var total = list.length;
		var fulfill_result = [];
		var reject_result = null;
		var all_state = 0;
		var single_ok = function(index,val) {
			if(all_state != 0) return;
			current++;
			fulfill_result[index] = val;
			if(total == current) {
				all_state = 1;
				ok(fulfill_result);
			}
		};
		var single_err = function(val1) {
			if(all_state != 0) return;
			all_state = 2;
			reject_result = val1;
			no(reject_result);
		};
		var index1 = 0;
		var _g = 0;
		while(_g < list.length) {
			var promise = list[_g];
			++_g;
			promise.then((function(f,a1) {
				return function(a2) {
					f(a1,a2);
				};
			})(single_ok,index1)).error(single_err);
			index1++;
		}
	});
};
snow_api_Promise.reject = function(reason) {
	return new snow_api_Promise(function(ok,no) {
		no(reason);
	});
};
snow_api_Promise.resolve = function(val) {
	return new snow_api_Promise(function(ok,no) {
		ok(val);
	});
};
snow_api_Promise.prototype = {
	then: function(on_fulfilled,on_rejected) {
		var _g = this.state;
		switch(_g) {
		case 0:
			this.add_fulfill(on_fulfilled);
			this.add_reject(on_rejected);
			return this.new_linked_promise();
		case 1:
			snow_api_Promises.defer(on_fulfilled,this.result);
			return snow_api_Promise.resolve(this.result);
		case 2:
			snow_api_Promises.defer(on_rejected,this.result);
			return snow_api_Promise.reject(this.result);
		}
	}
	,error: function(on_rejected) {
		var _g = this.state;
		switch(_g) {
		case 0:
			this.add_reject(on_rejected);
			return this.new_linked_resolve_empty();
		case 1:
			return snow_api_Promise.resolve(this.result);
		case 2:
			snow_api_Promises.defer(on_rejected,this.result);
			return snow_api_Promise.reject(this.result);
		}
	}
	,add_settle: function(f) {
		if(this.state == 0) this.settle_reactions.push(f); else snow_api_Promises.defer(f,this.result);
	}
	,new_linked_promise: function() {
		var _g = this;
		return new snow_api_Promise(function(f,r) {
			_g.add_settle(function(_) {
				if(_g.state == 1) f(_g.result); else r(_g.result);
			});
		});
	}
	,new_linked_resolve_empty: function() {
		var _g = this;
		return new snow_api_Promise(function(f,r) {
			_g.add_settle(function(_) {
				f();
			});
		});
	}
	,add_fulfill: function(f) {
		if(f != null) this.fulfill_reactions.push(f);
	}
	,add_reject: function(f) {
		if(f != null) {
			this.was_caught = true;
			this.reject_reactions.push(f);
		}
	}
	,onfulfill: function(val) {
		this.state = 1;
		this.result = val;
		while(this.fulfill_reactions.length > 0) {
			var fn = this.fulfill_reactions.shift();
			fn(this.result);
		}
		this.onsettle();
	}
	,onreject: function(reason) {
		this.state = 2;
		this.result = reason;
		while(this.reject_reactions.length > 0) {
			var fn = this.reject_reactions.shift();
			fn(this.result);
		}
		this.onsettle();
	}
	,onsettle: function() {
		while(this.settle_reactions.length > 0) {
			var fn = this.settle_reactions.shift();
			fn(this.result);
		}
	}
	,__class__: snow_api_Promise
};
var snow_api_Promises = function() { };
$hxClasses["snow.api.Promises"] = snow_api_Promises;
snow_api_Promises.__name__ = true;
snow_api_Promises.step = function() {
	snow_api_Promises.next();
	while(snow_api_Promises.defers.length > 0) {
		var defer = snow_api_Promises.defers.shift();
		defer.f(defer.a);
	}
};
snow_api_Promises.next = function() {
	if(snow_api_Promises.calls.length > 0) (snow_api_Promises.calls.shift())();
};
snow_api_Promises.defer = function(f,a) {
	if(f == null) return;
	snow_api_Promises.defers.push({ f : f, a : a});
};
snow_api_Promises.queue = function(f) {
	if(f == null) return;
	snow_api_Promises.calls.push(f);
};
var snow_api_Timer = function(_time) {
	this.time = _time;
	snow_api_Timer.running_timers.push(this);
	this.fire_at = snow_Snow.core.timestamp() + this.time;
	this.running = true;
};
$hxClasses["snow.api.Timer"] = snow_api_Timer;
snow_api_Timer.__name__ = true;
snow_api_Timer.update = function() {
	var now = snow_Snow.core.timestamp();
	var _g = 0;
	var _g1 = snow_api_Timer.running_timers;
	while(_g < _g1.length) {
		var timer = _g1[_g];
		++_g;
		if(timer.running) {
			if(timer.fire_at < now) {
				timer.fire_at += timer.time;
				timer.run();
			}
		}
	}
};
snow_api_Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.running) {
			this.running = false;
			HxOverrides.remove(snow_api_Timer.running_timers,this);
		}
	}
	,__class__: snow_api_Timer
};
var snow_core_web_Core = function(_app) {
	this._time_now = 0.0;
	this._lf_timestamp = 0.016;
	this.start_timestamp = 0.0;
	this.app = _app;
	this.start_timestamp = this.timestamp();
	this.guess_os();
};
$hxClasses["snow.core.web.Core"] = snow_core_web_Core;
snow_core_web_Core.__name__ = true;
snow_core_web_Core.prototype = {
	init: function(_event_handler) {
		this.app.on_event({ type : 1});
		this.app.on_event({ type : 2});
		if(this.app.snow_config.has_loop) this.request_update();
	}
	,shutdown: function() {
	}
	,timestamp: function() {
		var now;
		if(window.performance != null) now = window.performance.now() / 1000.0; else now = haxe_Timer.stamp();
		return now - this.start_timestamp;
	}
	,request_update: function() {
		var _g = this;
		if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) window.requestAnimationFrame($bind(this,this.snow_core_loop)); else {
			haxe_Log.trace("     i / core / " + ("warning : requestAnimationFrame not found, falling back to render_rate! render_rate:" + this.app.host.render_rate),{ fileName : "Core.hx", lineNumber : 80, className : "snow.core.web.Core", methodName : "request_update"});
			window.setTimeout(function() {
				var _now = _g.timestamp();
				_g._time_now += _now - _g._lf_timestamp;
				_g.snow_core_loop(_g._time_now * 1000.0);
				_g._lf_timestamp = _now;
			},this.app.host.render_rate * 1000.0 | 0);
		}
	}
	,snow_core_loop: function(_t) {
		if(_t == null) _t = 0.016;
		this.update();
		this.app.on_event({ type : 3});
		this.request_update();
		return true;
	}
	,update: function() {
	}
	,guess_os: function() {
		var _ver = window.navigator.appVersion;
		var _agent = window.navigator.userAgent;
		if((function($this) {
			var $r;
			var r = new EReg("mac","gi");
			$r = r.match(_ver);
			return $r;
		}(this))) this.app.os = "mac";
		if((function($this) {
			var $r;
			var r1 = new EReg("win","gi");
			$r = r1.match(_ver);
			return $r;
		}(this))) this.app.os = "windows";
		if((function($this) {
			var $r;
			var r2 = new EReg("x11","gi");
			$r = r2.match(_ver);
			return $r;
		}(this))) this.app.os = "linux";
		if((function($this) {
			var $r;
			var r3 = new EReg("linux","gi");
			$r = r3.match(_ver);
			return $r;
		}(this))) this.app.os = "linux";
		if((function($this) {
			var $r;
			var r4 = new EReg("android","gi");
			$r = r4.match(_ver);
			return $r;
		}(this))) this.app.os = "android";
		if((function($this) {
			var $r;
			var r5 = new EReg("ipad","gi");
			$r = r5.match(_agent);
			return $r;
		}(this))) this.app.os = "ios";
		if((function($this) {
			var $r;
			var r6 = new EReg("iphone","gi");
			$r = r6.match(_agent);
			return $r;
		}(this))) this.app.os = "ios";
		if((function($this) {
			var $r;
			var r7 = new EReg("ipod","gi");
			$r = r7.match(_agent);
			return $r;
		}(this))) this.app.os = "ios";
	}
	,__class__: snow_core_web_Core
};
var snow_modules_interfaces_Assets = function() { };
$hxClasses["snow.modules.interfaces.Assets"] = snow_modules_interfaces_Assets;
snow_modules_interfaces_Assets.__name__ = true;
var snow_core_web_assets_Assets = function(_system) {
	this.system = _system;
};
$hxClasses["snow.core.web.assets.Assets"] = snow_core_web_assets_Assets;
snow_core_web_assets_Assets.__name__ = true;
snow_core_web_assets_Assets.__interfaces__ = [snow_modules_interfaces_Assets];
snow_core_web_assets_Assets.prototype = {
	image_load_info: function(_id,_components) {
		if(_components == null) _components = 4;
		return this.system.app.io.data_flow(_id,snow_system_assets_AssetImage.processor);
	}
	,image_info_from_element: function(_id,_elem) {
		var width_pot = this.nearest_power_of_two(_elem.width);
		var height_pot = this.nearest_power_of_two(_elem.height);
		var image_bytes = this.POT_bytes_from_element(_elem.width,_elem.height,width_pot,height_pot,_elem);
		var info = { id : _id, bpp : 4, width : _elem.width, height : _elem.height, width_actual : width_pot, height_actual : height_pot, bpp_source : 4, pixels : image_bytes};
		image_bytes = null;
		return info;
	}
	,image_info_from_bytes: function(_id,_bytes,_components) {
		if(_components == null) _components = 4;
		var _g = this;
		if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id was null"));
		if(_bytes == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_bytes was null"));
		if(!(_bytes.length != 0)) throw new js__$Boot_HaxeError(snow_api_DebugError.assertion("_bytes.length != 0"));
		var ext = haxe_io_Path.extension(_id);
		return new snow_api_Promise(function(resolve,reject) {
			var str = "";
			var i = 0;
			var len = _bytes.length;
			while(i < len) str += String.fromCharCode((function($this) {
				var $r;
				var a;
				{
					var idx = i++;
					a = _bytes[idx];
				}
				$r = a & 255;
				return $r;
			}(this)));
			var b64 = window.btoa(str);
			var src = "data:image/" + ext + ";base64," + b64;
			var _img = new Image();
			_img.onload = function(_) {
				var info = _g.image_info_from_element(_id,_img);
				resolve(info);
			};
			_img.onerror = function(e) {
				reject(snow_types_Error.error("failed to load image from bytes, on error: " + e));
			};
			_img.src = src;
		});
	}
	,POT_bytes_from_element: function(_width,_height,_width_pot,_height_pot,_source) {
		var tmp_canvas;
		var _this = window.document;
		tmp_canvas = _this.createElement("canvas");
		tmp_canvas.width = _width_pot;
		tmp_canvas.height = _height_pot;
		var tmp_context = tmp_canvas.getContext("2d",null);
		tmp_context.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
		tmp_context.drawImage(_source,0,0,_width,_height);
		var image_bytes = null;
		try {
			image_bytes = tmp_context.getImageData(0,0,tmp_canvas.width,tmp_canvas.height);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			var tips = "- textures served from file:/// throw security errors\n";
			tips += "- textures served over http:// work for cross origin byte requests";
			haxe_Log.trace("   i / assets / " + tips,{ fileName : "Assets.hx", lineNumber : 235, className : "snow.core.web.assets.Assets", methodName : "POT_bytes_from_element"});
			throw new js__$Boot_HaxeError(e);
		}
		tmp_canvas = null;
		tmp_context = null;
		var view = image_bytes.data;
		var this1;
		if(view != null) this1 = new Uint8Array(view); else this1 = null;
		return this1;
	}
	,nearest_power_of_two: function(_value) {
		if(!snow_core_web_assets_Assets.POT) return _value;
		_value--;
		_value |= _value >> 1;
		_value |= _value >> 2;
		_value |= _value >> 4;
		_value |= _value >> 8;
		_value |= _value >> 16;
		_value++;
		return _value;
	}
	,__class__: snow_core_web_assets_Assets
};
var snow_core_web_input_DOMKeys = function() { };
$hxClasses["snow.core.web.input.DOMKeys"] = snow_core_web_input_DOMKeys;
snow_core_web_input_DOMKeys.__name__ = true;
snow_core_web_input_DOMKeys.dom_key_to_keycode = function(_keycode) {
	switch(_keycode) {
	case 16:
		return snow_system_input_Keycodes.lshift;
	case 17:
		return snow_system_input_Keycodes.lctrl;
	case 18:
		return snow_system_input_Keycodes.lalt;
	case 20:
		return snow_system_input_Keycodes.capslock;
	case 33:
		return snow_system_input_Keycodes.pageup;
	case 34:
		return snow_system_input_Keycodes.pagedown;
	case 35:
		return snow_system_input_Keycodes.end;
	case 36:
		return snow_system_input_Keycodes.home;
	case 37:
		return snow_system_input_Keycodes.left;
	case 38:
		return snow_system_input_Keycodes.up;
	case 39:
		return snow_system_input_Keycodes.right;
	case 40:
		return snow_system_input_Keycodes.down;
	case 44:
		return snow_system_input_Keycodes.printscreen;
	case 45:
		return snow_system_input_Keycodes.insert;
	case 46:
		return snow_system_input_Keycodes["delete"];
	case 91:
		return snow_system_input_Keycodes.lmeta;
	case 93:
		return snow_system_input_Keycodes.rmeta;
	case 224:
		return snow_system_input_Keycodes.lmeta;
	case 96:
		return snow_system_input_Keycodes.kp_0;
	case 97:
		return snow_system_input_Keycodes.kp_1;
	case 98:
		return snow_system_input_Keycodes.kp_2;
	case 99:
		return snow_system_input_Keycodes.kp_3;
	case 100:
		return snow_system_input_Keycodes.kp_4;
	case 101:
		return snow_system_input_Keycodes.kp_5;
	case 102:
		return snow_system_input_Keycodes.kp_6;
	case 103:
		return snow_system_input_Keycodes.kp_7;
	case 104:
		return snow_system_input_Keycodes.kp_8;
	case 105:
		return snow_system_input_Keycodes.kp_9;
	case 106:
		return snow_system_input_Keycodes.kp_multiply;
	case 107:
		return snow_system_input_Keycodes.kp_plus;
	case 109:
		return snow_system_input_Keycodes.kp_minus;
	case 110:
		return snow_system_input_Keycodes.kp_decimal;
	case 111:
		return snow_system_input_Keycodes.kp_divide;
	case 144:
		return snow_system_input_Keycodes.numlockclear;
	case 112:
		return snow_system_input_Keycodes.f1;
	case 113:
		return snow_system_input_Keycodes.f2;
	case 114:
		return snow_system_input_Keycodes.f3;
	case 115:
		return snow_system_input_Keycodes.f4;
	case 116:
		return snow_system_input_Keycodes.f5;
	case 117:
		return snow_system_input_Keycodes.f6;
	case 118:
		return snow_system_input_Keycodes.f7;
	case 119:
		return snow_system_input_Keycodes.f8;
	case 120:
		return snow_system_input_Keycodes.f9;
	case 121:
		return snow_system_input_Keycodes.f10;
	case 122:
		return snow_system_input_Keycodes.f11;
	case 123:
		return snow_system_input_Keycodes.f12;
	case 124:
		return snow_system_input_Keycodes.f13;
	case 125:
		return snow_system_input_Keycodes.f14;
	case 126:
		return snow_system_input_Keycodes.f15;
	case 127:
		return snow_system_input_Keycodes.f16;
	case 128:
		return snow_system_input_Keycodes.f17;
	case 129:
		return snow_system_input_Keycodes.f18;
	case 130:
		return snow_system_input_Keycodes.f19;
	case 131:
		return snow_system_input_Keycodes.f20;
	case 132:
		return snow_system_input_Keycodes.f21;
	case 133:
		return snow_system_input_Keycodes.f22;
	case 134:
		return snow_system_input_Keycodes.f23;
	case 135:
		return snow_system_input_Keycodes.f24;
	case 160:
		return snow_system_input_Keycodes.caret;
	case 161:
		return snow_system_input_Keycodes.exclaim;
	case 162:
		return snow_system_input_Keycodes.quotedbl;
	case 163:
		return snow_system_input_Keycodes.hash;
	case 164:
		return snow_system_input_Keycodes.dollar;
	case 165:
		return snow_system_input_Keycodes.percent;
	case 166:
		return snow_system_input_Keycodes.ampersand;
	case 167:
		return snow_system_input_Keycodes.underscore;
	case 168:
		return snow_system_input_Keycodes.leftparen;
	case 169:
		return snow_system_input_Keycodes.rightparen;
	case 170:
		return snow_system_input_Keycodes.asterisk;
	case 171:
		return snow_system_input_Keycodes.plus;
	case 172:
		return snow_system_input_Keycodes.backslash;
	case 187:
		return snow_system_input_Keycodes.equals;
	case 189:
		return snow_system_input_Keycodes.minus;
	case 174:
		return snow_system_input_Keycodes.leftbracket;
	case 175:
		return snow_system_input_Keycodes.rightbracket;
	case 176:
		return snow_system_input_Keycodes.backquote;
	case 181:
		return snow_system_input_Keycodes.audiomute;
	case 182:
		return snow_system_input_Keycodes.volumedown;
	case 183:
		return snow_system_input_Keycodes.volumeup;
	case 188:
		return snow_system_input_Keycodes.comma;
	case 190:
		return snow_system_input_Keycodes.period;
	case 191:
		return snow_system_input_Keycodes.slash;
	case 192:
		return snow_system_input_Keycodes.backquote;
	case 219:
		return snow_system_input_Keycodes.leftbracket;
	case 221:
		return snow_system_input_Keycodes.rightbracket;
	case 220:
		return snow_system_input_Keycodes.backslash;
	case 222:
		return snow_system_input_Keycodes.quote;
	}
	return _keycode;
};
var snow_modules_interfaces_Input = function() { };
$hxClasses["snow.modules.interfaces.Input"] = snow_modules_interfaces_Input;
snow_modules_interfaces_Input.__name__ = true;
var snow_system_input_Scancodes = function() { };
$hxClasses["snow.system.input.Scancodes"] = snow_system_input_Scancodes;
snow_system_input_Scancodes.__name__ = true;
var snow_system_input_Keycodes = function() { };
$hxClasses["snow.system.input.Keycodes"] = snow_system_input_Keycodes;
snow_system_input_Keycodes.__name__ = true;
snow_system_input_Keycodes.from_scan = function(scancode) {
	return scancode | snow_system_input_Scancodes.MASK;
};
snow_system_input_Keycodes.to_scan = function(keycode) {
	if((keycode & snow_system_input_Scancodes.MASK) != 0) return keycode & ~snow_system_input_Scancodes.MASK;
	switch(keycode) {
	case 13:
		return snow_system_input_Scancodes.enter;
	case 27:
		return snow_system_input_Scancodes.escape;
	case 8:
		return snow_system_input_Scancodes.backspace;
	case 9:
		return snow_system_input_Scancodes.tab;
	case 32:
		return snow_system_input_Scancodes.space;
	case 47:
		return snow_system_input_Scancodes.slash;
	case 48:
		return snow_system_input_Scancodes.key_0;
	case 49:
		return snow_system_input_Scancodes.key_1;
	case 50:
		return snow_system_input_Scancodes.key_2;
	case 51:
		return snow_system_input_Scancodes.key_3;
	case 52:
		return snow_system_input_Scancodes.key_4;
	case 53:
		return snow_system_input_Scancodes.key_5;
	case 54:
		return snow_system_input_Scancodes.key_6;
	case 55:
		return snow_system_input_Scancodes.key_7;
	case 56:
		return snow_system_input_Scancodes.key_8;
	case 57:
		return snow_system_input_Scancodes.key_9;
	case 59:
		return snow_system_input_Scancodes.semicolon;
	case 61:
		return snow_system_input_Scancodes.equals;
	case 91:
		return snow_system_input_Scancodes.leftbracket;
	case 92:
		return snow_system_input_Scancodes.backslash;
	case 93:
		return snow_system_input_Scancodes.rightbracket;
	case 96:
		return snow_system_input_Scancodes.grave;
	case 97:
		return snow_system_input_Scancodes.key_a;
	case 98:
		return snow_system_input_Scancodes.key_b;
	case 99:
		return snow_system_input_Scancodes.key_c;
	case 100:
		return snow_system_input_Scancodes.key_d;
	case 101:
		return snow_system_input_Scancodes.key_e;
	case 102:
		return snow_system_input_Scancodes.key_f;
	case 103:
		return snow_system_input_Scancodes.key_g;
	case 104:
		return snow_system_input_Scancodes.key_h;
	case 105:
		return snow_system_input_Scancodes.key_i;
	case 106:
		return snow_system_input_Scancodes.key_j;
	case 107:
		return snow_system_input_Scancodes.key_k;
	case 108:
		return snow_system_input_Scancodes.key_l;
	case 109:
		return snow_system_input_Scancodes.key_m;
	case 110:
		return snow_system_input_Scancodes.key_n;
	case 111:
		return snow_system_input_Scancodes.key_o;
	case 112:
		return snow_system_input_Scancodes.key_p;
	case 113:
		return snow_system_input_Scancodes.key_q;
	case 114:
		return snow_system_input_Scancodes.key_r;
	case 115:
		return snow_system_input_Scancodes.key_s;
	case 116:
		return snow_system_input_Scancodes.key_t;
	case 117:
		return snow_system_input_Scancodes.key_u;
	case 118:
		return snow_system_input_Scancodes.key_v;
	case 119:
		return snow_system_input_Scancodes.key_w;
	case 120:
		return snow_system_input_Scancodes.key_x;
	case 121:
		return snow_system_input_Scancodes.key_y;
	case 122:
		return snow_system_input_Scancodes.key_z;
	}
	return snow_system_input_Scancodes.unknown;
};
var snow_core_web_input_Input = function(_system) {
	this.gamepads_supported = false;
	this.system = _system;
};
$hxClasses["snow.core.web.input.Input"] = snow_core_web_input_Input;
snow_core_web_input_Input.__name__ = true;
snow_core_web_input_Input.__interfaces__ = [snow_modules_interfaces_Input];
snow_core_web_input_Input.prototype = {
	init: function() {
		window.document.addEventListener("keypress",$bind(this,this.on_keypress));
		window.document.addEventListener("keydown",$bind(this,this.on_keydown));
		window.document.addEventListener("keyup",$bind(this,this.on_keyup));
		this.active_gamepads = new haxe_ds_IntMap();
		this.gamepads_supported = this.get_gamepad_list() != null;
		if(window.DeviceOrientationEvent) {
			window.addEventListener("deviceorientation",$bind(this,this.on_orientation));
			window.addEventListener("devicemotion",$bind(this,this.on_motion));
		}
		haxe_Log.trace("    i / input / " + ("Gamepads supported: " + Std.string(this.gamepads_supported)),{ fileName : "Input.hx", lineNumber : 51, className : "snow.core.web.input.Input", methodName : "init"});
	}
	,update: function() {
		if(this.gamepads_supported) this.poll_gamepads();
	}
	,destroy: function() {
	}
	,listen: function(window) {
		window.handle.addEventListener("contextmenu",$bind(this,this.on_contextmenu));
		window.handle.addEventListener("mousedown",$bind(this,this.on_mousedown));
		window.handle.addEventListener("mouseup",$bind(this,this.on_mouseup));
		window.handle.addEventListener("mousemove",$bind(this,this.on_mousemove));
		window.handle.addEventListener("mousewheel",$bind(this,this.on_mousewheel));
		window.handle.addEventListener("wheel",$bind(this,this.on_mousewheel));
		window.handle.addEventListener("touchstart",$bind(this,this.on_touchdown));
		window.handle.addEventListener("touchend",$bind(this,this.on_touchup));
		window.handle.addEventListener("touchmove",$bind(this,this.on_touchmove));
	}
	,on_event: function(_event) {
	}
	,on_orientation: function(event) {
		this.system.app.dispatch_system_event({ type : 6, input : { type : 4, timestamp : snow_Snow.core.timestamp(), event : { type : "orientation", alpha : event.alpha, beta : event.beta, gamma : event.gamma}}});
	}
	,on_motion: function(event) {
		this.system.app.dispatch_system_event({ type : 6, input : { type : 4, timestamp : snow_Snow.core.timestamp(), event : { type : "motion", acceleration : event.acceleration, accelerationIncludingGravity : event.accelerationIncludingGravity, rotationRate : event.rotationRate}}});
	}
	,poll_gamepads: function() {
		if(!this.gamepads_supported) return;
		var list = this.get_gamepad_list();
		if(list != null) {
			var _g1 = 0;
			var _g = list.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(list[i] != null) this.handle_gamepad(list[i]); else {
					var _gamepad = this.active_gamepads.h[i];
					if(_gamepad != null) this.system.dispatch_gamepad_device_event(_gamepad.index,_gamepad.id,2,snow_Snow.core.timestamp());
					this.active_gamepads.remove(i);
				}
			}
		}
	}
	,handle_gamepad: function(_gamepad) {
		if(_gamepad == null) return;
		if(!(function($this) {
			var $r;
			var key = _gamepad.index;
			$r = $this.active_gamepads.h.hasOwnProperty(key);
			return $r;
		}(this))) {
			var _new_gamepad = { id : _gamepad.id, index : _gamepad.index, axes : [], buttons : [], timestamp : snow_Snow.core.timestamp()};
			var axes = _gamepad.axes;
			var _g = 0;
			while(_g < axes.length) {
				var value = axes[_g];
				++_g;
				_new_gamepad.axes.push(value);
			}
			var _button_list = _gamepad.buttons;
			var _g1 = 0;
			while(_g1 < _button_list.length) {
				var _button = _button_list[_g1];
				++_g1;
				_new_gamepad.buttons.push({ pressed : false, value : 0});
			}
			this.active_gamepads.h[_new_gamepad.index] = _new_gamepad;
			this.system.dispatch_gamepad_device_event(_new_gamepad.index,_new_gamepad.id,1,_new_gamepad.timestamp);
		} else {
			var gamepad;
			var key1 = _gamepad.index;
			gamepad = this.active_gamepads.h[key1];
			if(gamepad.id != _gamepad.id) gamepad.id = _gamepad.id;
			var axes_changed = [];
			var buttons_changed = [];
			var last_axes = gamepad.axes;
			var last_buttons = gamepad.buttons;
			var new_axes = _gamepad.axes;
			var new_buttons = _gamepad.buttons;
			var axis_index = 0;
			var _g2 = 0;
			while(_g2 < new_axes.length) {
				var axis = new_axes[_g2];
				++_g2;
				if(axis != last_axes[axis_index]) {
					axes_changed.push(axis_index);
					gamepad.axes[axis_index] = axis;
				}
				axis_index++;
			}
			var button_index = 0;
			var _g3 = 0;
			while(_g3 < new_buttons.length) {
				var button = new_buttons[_g3];
				++_g3;
				if(button.value != last_buttons[button_index].value) {
					buttons_changed.push(button_index);
					gamepad.buttons[button_index].pressed = button.pressed;
					gamepad.buttons[button_index].value = button.value;
				}
				button_index++;
			}
			var _g4 = 0;
			while(_g4 < axes_changed.length) {
				var index = axes_changed[_g4];
				++_g4;
				this.system.dispatch_gamepad_axis_event(gamepad.index,index,new_axes[index],gamepad.timestamp);
			}
			var _g5 = 0;
			while(_g5 < buttons_changed.length) {
				var index1 = buttons_changed[_g5];
				++_g5;
				if(new_buttons[index1].pressed == true) this.system.dispatch_gamepad_button_down_event(gamepad.index,index1,new_buttons[index1].value,gamepad.timestamp); else this.system.dispatch_gamepad_button_up_event(gamepad.index,index1,new_buttons[index1].value,gamepad.timestamp);
			}
		}
	}
	,fail_gamepads: function() {
		this.gamepads_supported = false;
		haxe_Log.trace("    i / input / " + "Gamepads are not supported in this browser :(",{ fileName : "Input.hx", lineNumber : 308, className : "snow.core.web.input.Input", methodName : "fail_gamepads"});
	}
	,get_gamepad_list: function() {
		if(($_=window.navigator,$bind($_,$_.getGamepads)) != null) return window.navigator.getGamepads();
		if(window.navigator.webkitGetGamepads != null) return window.navigator.webkitGetGamepads();
		this.fail_gamepads();
		return null;
	}
	,on_mousedown: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		this.system.dispatch_mouse_down_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_mouse_event.button + 1,_mouse_event.timeStamp,_window.id);
	}
	,on_mouseup: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		this.system.dispatch_mouse_up_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_mouse_event.button + 1,_mouse_event.timeStamp,_window.id);
	}
	,on_mousemove: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		var _movement_x = _mouse_event.movementX;
		var _movement_y = _mouse_event.movementY;
		if(_movement_x == null) {
			if(_mouse_event.webkitMovementX != null) {
				_movement_x = _mouse_event.webkitMovementX;
				_movement_y = _mouse_event.webkitMovementY;
			} else if(_mouse_event.mozMovementX != null) {
				_movement_x = _mouse_event.mozMovementX;
				_movement_y = _mouse_event.mozMovementY;
			}
		}
		this.system.dispatch_mouse_move_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_movement_x,_movement_y,_mouse_event.timeStamp,_window.id);
	}
	,on_mousewheel: function(_wheel_event) {
		if(this.system.app.config.web.prevent_default_mouse_wheel) _wheel_event.preventDefault();
		var _window = this.system.app.windowing.window_from_handle(_wheel_event.target);
		var _x = 0;
		var _y = 0;
		if(_wheel_event.deltaY != null) _y = _wheel_event.deltaY; else if(_wheel_event.wheelDeltaY != null) _y = -_wheel_event.wheelDeltaY / 3 | 0;
		if(_wheel_event.deltaX != null) _x = _wheel_event.deltaX; else if(_wheel_event.wheelDeltaX != null) _x = -_wheel_event.wheelDeltaX / 3 | 0;
		this.system.dispatch_mouse_wheel_event(Math.round(_x / 16),Math.round(_y / 16),_wheel_event.timeStamp,_window.id);
	}
	,on_contextmenu: function(_event) {
		if(this.system.app.config.web.no_context_menu) _event.preventDefault();
	}
	,on_keypress: function(_key_event) {
		if(_key_event.which != 0 && HxOverrides.indexOf(snow_core_web_input_Input._keypress_blacklist,_key_event.keyCode,0) == -1) {
			var _text = String.fromCharCode(_key_event.charCode);
			this.system.dispatch_text_event(_text,0,_text.length,2,_key_event.timeStamp,1);
		}
	}
	,on_keydown: function(_key_event) {
		var _keycode = this.convert_keycode(_key_event.keyCode);
		var _scancode = snow_system_input_Keycodes.to_scan(_keycode);
		var _mod_state = this.mod_state_from_event(_key_event);
		if(HxOverrides.indexOf(this.system.app.config.web.prevent_default_keys,_keycode,0) != -1) _key_event.preventDefault();
		this.system.dispatch_key_down_event(_keycode,_scancode,_key_event.repeat,_mod_state,_key_event.timeStamp,1);
	}
	,on_keyup: function(_key_event) {
		var _keycode = this.convert_keycode(_key_event.keyCode);
		var _scancode = snow_system_input_Keycodes.to_scan(_keycode);
		var _mod_state = this.mod_state_from_event(_key_event);
		if(HxOverrides.indexOf(this.system.app.config.web.prevent_default_keys,_keycode,0) != -1) _key_event.preventDefault();
		this.system.dispatch_key_up_event(_keycode,_scancode,_key_event.repeat,_mod_state,_key_event.timeStamp,1);
	}
	,mod_state_from_event: function(_key_event) {
		var _none = !_key_event.altKey && !_key_event.ctrlKey && !_key_event.metaKey && !_key_event.shiftKey;
		return { none : _none, lshift : _key_event.shiftKey, rshift : _key_event.shiftKey, lctrl : _key_event.ctrlKey, rctrl : _key_event.ctrlKey, lalt : _key_event.altKey, ralt : _key_event.altKey, lmeta : _key_event.metaKey, rmeta : _key_event.metaKey, num : false, caps : false, mode : false, ctrl : _key_event.ctrlKey, shift : _key_event.shiftKey, alt : _key_event.altKey, meta : _key_event.metaKey};
	}
	,convert_keycode: function(dom_keycode) {
		if(dom_keycode >= 65 && dom_keycode <= 90) return dom_keycode + 32;
		return snow_core_web_input_DOMKeys.dom_key_to_keycode(dom_keycode);
	}
	,on_touchdown: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_down_event(_x,_y,touch.identifier,snow_Snow.core.timestamp());
		}
	}
	,on_touchup: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_up_event(_x,_y,touch.identifier,snow_Snow.core.timestamp());
		}
	}
	,on_touchmove: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_move_event(_x,_y,0,0,touch.identifier,snow_Snow.core.timestamp());
		}
	}
	,__class__: snow_core_web_input_Input
};
var snow_modules_interfaces_IO = function() { };
$hxClasses["snow.modules.interfaces.IO"] = snow_modules_interfaces_IO;
snow_modules_interfaces_IO.__name__ = true;
var snow_core_web_io_IO = function(_system) {
	this.system = _system;
};
$hxClasses["snow.core.web.io.IO"] = snow_core_web_io_IO;
snow_core_web_io_IO.__name__ = true;
snow_core_web_io_IO.__interfaces__ = [snow_modules_interfaces_IO];
snow_core_web_io_IO.prototype = {
	data_load: function(_path,_options) {
		return new snow_api_Promise(function(resolve,reject) {
			var _async = true;
			var _binary = true;
			if(_options != null) {
				if(_options.binary != null) _binary = _options.binary;
			}
			var request = new XMLHttpRequest();
			request.open("GET",_path,_async);
			if(_binary) request.overrideMimeType("text/plain; charset=x-user-defined"); else request.overrideMimeType("text/plain; charset=UTF-8");
			if(_async) request.responseType = "arraybuffer";
			request.onload = function(data) {
				if(request.status == 200) resolve((function($this) {
					var $r;
					var elements = request.response;
					var this1;
					if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
					$r = this1;
					return $r;
				}(this))); else reject(snow_types_Error.error("request status was " + request.status + " / " + request.statusText));
			};
			request.send();
		});
	}
	,init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(_event) {
	}
	,__class__: snow_core_web_io_IO
};
var snow_modules_interfaces_Windowing = function() { };
$hxClasses["snow.modules.interfaces.Windowing"] = snow_modules_interfaces_Windowing;
snow_modules_interfaces_Windowing.__name__ = true;
var snow_core_web_window_Windowing = function(_system) {
	this._hidden_event_name = "";
	this._hidden_name = "";
	this._cursor_visible = true;
	this._pre_fs_body_margin = "0";
	this._pre_fs_body_overflow = "0";
	this._pre_fs_height = 0;
	this._pre_fs_width = 0;
	this._pre_fs_s_height = "";
	this._pre_fs_s_width = "";
	this._pre_fs_margin = "0";
	this._pre_fs_padding = "0";
	this.seq_window = 1;
	this.system = _system;
	this.fs_windows = [];
	this.gl_contexts = new haxe_ds_IntMap();
};
$hxClasses["snow.core.web.window.Windowing"] = snow_core_web_window_Windowing;
snow_core_web_window_Windowing.__name__ = true;
snow_core_web_window_Windowing.__interfaces__ = [snow_modules_interfaces_Windowing];
snow_core_web_window_Windowing.prototype = {
	init: function() {
		this.listen_for_visibility();
		this.listen_for_resize();
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,_copy_config: function(_config) {
		return { borderless : _config.borderless, fullscreen : _config.fullscreen, fullscreen_desktop : _config.fullscreen_desktop, height : _config.height, no_input : _config.no_input, resizable : _config.resizable, title : _config.title, width : _config.width, x : _config.x, y : _config.y};
	}
	,create: function(render_config,_config,on_created) {
		var _window_id = this.seq_window;
		var _handle;
		var _this = window.document;
		_handle = _this.createElement("canvas");
		var config = this._copy_config(_config);
		_handle.width = config.width;
		_handle.height = config.height;
		_handle.style.display = "block";
		_handle.style.position = "relative";
		_handle.style.background = "#000";
		window.document.body.appendChild(_handle);
		var _gl_context = js_html__$CanvasElement_CanvasUtil.getContextWebGL(_handle,{ alpha : false, premultipliedAlpha : false, antialias : render_config.antialiasing > 0});
		if(_gl_context == null) {
			var msg = "WebGL is required to run this!<br/><br/>";
			msg += "visit http://get.webgl.org/ for help <br/>";
			msg += "and contact the developer of the application";
			this.internal_fallback(msg);
			throw new js__$Boot_HaxeError(snow_types_Error.windowing(msg));
		}
		if(snow_modules_opengl_web_GL.current_context == null) snow_modules_opengl_web_GL.current_context = _gl_context;
		this.gl_contexts.h[_window_id] = _gl_context;
		var _window_pos = this.get_real_window_position(_handle);
		config.x = _window_pos.x;
		config.y = _window_pos.y;
		if(config.title != null && config.title != "") window.document.title = config.title;
		on_created(_handle,_window_id,{ config : config, render_config : render_config});
		_handle.setAttribute("id","window" + _window_id);
		this.seq_window++;
	}
	,internal_resize: function(_window,_w,_h) {
		this.system.app.dispatch_system_event({ type : 5, window : { type : 7, timestamp : snow_Snow.core.timestamp(), window_id : _window.id, event : { x : _w, y : _h}}});
		this.system.app.dispatch_system_event({ type : 5, window : { type : 6, timestamp : snow_Snow.core.timestamp(), window_id : _window.id, event : { x : _w, y : _h}}});
	}
	,update_window: function(_window) {
		var _rect = _window.handle.getBoundingClientRect();
		if(_rect.left != _window.x || _rect.top != _window.y) this.system.app.dispatch_system_event({ type : 5, window : { type : 5, timestamp : snow_Snow.core.timestamp(), window_id : _window.id, event : { x : _rect.left, y : _rect.top}}});
		if(_rect.width != _window.width || _rect.height != _window.height) this.internal_resize(_window,_rect.width,_rect.height);
		_rect = null;
	}
	,render: function(_window) {
		var _window_gl_context = this.gl_contexts.h[_window.id];
		if(snow_modules_opengl_web_GL.current_context != _window_gl_context) snow_modules_opengl_web_GL.current_context = _window_gl_context;
	}
	,swap: function(_window) {
	}
	,set_size: function(_window,w,h) {
		_window.handle.width = w;
		_window.handle.height = h;
		_window.handle.style.width = "" + w + "px";
		_window.handle.style.height = "" + h + "px";
		this.internal_resize(_window,w,h);
	}
	,set_position: function(_window,x,y) {
		_window.handle.style.left = "" + x + "px";
		_window.handle.style.top = "" + y + "px";
	}
	,get_real_window_position: function(handle) {
		var curleft = 0;
		var curtop = 0;
		var _obj = handle;
		var _has_parent = true;
		var _max_count = 0;
		while(_has_parent == true) {
			_max_count++;
			if(_max_count > 100) {
				_has_parent = false;
				break;
			}
			if(_obj.offsetParent != null) {
				curleft += _obj.offsetLeft;
				curtop += _obj.offsetTop;
				_obj = _obj.offsetParent;
			} else _has_parent = false;
		}
		return { x : curleft, y : curtop};
	}
	,set_max_size: function(_window,w,h) {
		_window.handle.style.maxWidth = "" + w + "px";
		_window.handle.style.maxHeight = "" + h + "px";
	}
	,set_min_size: function(_window,w,h) {
		_window.handle.style.minWidth = "" + w + "px";
		_window.handle.style.minHeight = "" + h + "px";
	}
	,internal_fullscreen: function(_window,fullscreen) {
		var _handle = _window.handle;
		if(fullscreen) {
			if(HxOverrides.indexOf(this.fs_windows,_window,0) == -1) this.fs_windows.push(_window);
		} else HxOverrides.remove(this.fs_windows,_window);
		var true_fullscreen = this.system.app.config.web.true_fullscreen;
		if(fullscreen) {
			if(true_fullscreen) {
				if($bind(_handle,_handle.requestFullscreen) == null) {
					if(_handle.requestFullScreen == null) {
						if(_handle.webkitRequestFullscreen == null) {
							if(_handle.mozRequestFullScreen == null) {
							} else _handle.mozRequestFullScreen();
						} else _handle.webkitRequestFullscreen();
					} else _handle.requestFullScreen(null);
				} else _handle.requestFullscreen();
			} else {
				this._pre_fs_padding = _handle.style.padding;
				this._pre_fs_margin = _handle.style.margin;
				this._pre_fs_s_width = _handle.style.width;
				this._pre_fs_s_height = _handle.style.height;
				this._pre_fs_width = _handle.width;
				this._pre_fs_height = _handle.height;
				this._pre_fs_body_margin = window.document.body.style.margin;
				this._pre_fs_body_overflow = window.document.body.style.overflow;
				_handle.style.margin = "0";
				_handle.style.padding = "0";
				_handle.style.width = window.innerWidth + "px";
				_handle.style.height = window.innerHeight + "px";
				_handle.width = window.innerWidth;
				_handle.height = window.innerHeight;
				window.document.body.style.margin = "0";
				window.document.body.style.overflow = "hidden";
			}
		} else if(true_fullscreen) {
		} else {
			_handle.style.padding = this._pre_fs_padding;
			_handle.style.margin = this._pre_fs_margin;
			_handle.style.width = this._pre_fs_s_width;
			_handle.style.height = this._pre_fs_s_height;
			_handle.width = this._pre_fs_width;
			_handle.height = this._pre_fs_height;
			window.document.body.style.margin = this._pre_fs_body_margin;
			window.document.body.style.overflow = this._pre_fs_body_overflow;
		}
	}
	,grab: function(_window,grabbed) {
		if(grabbed) {
			if(($_=_window.handle,$bind($_,$_.requestPointerLock)) == null) {
				if(_window.handle.webkitRequestPointerLock == null) {
					if(_window.handle.mozRequestPointerLock == null) {
					} else _window.handle.mozRequestPointerLock();
				} else _window.handle.webkitRequestPointerLock();
			} else _window.handle.requestPointerLock();
		} else {
		}
	}
	,set_cursor_position: function(_window,x,y) {
	}
	,system_enable_cursor: function(enable) {
		if(this.cursor_style == null) {
			var _this = window.document;
			this.cursor_style = _this.createElement("style");
			this.cursor_style.innerHTML = "* { cursor:none; }";
		}
		if(enable && !this._cursor_visible) {
			this._cursor_visible = true;
			window.document.body.removeChild(this.cursor_style);
		} else if(!enable && this._cursor_visible) {
			this._cursor_visible = false;
			window.document.body.appendChild(this.cursor_style);
		}
	}
	,listen: function(_window) {
		_window.handle.addEventListener("mouseleave",$bind(this,this.on_internal_leave));
		_window.handle.addEventListener("mouseenter",$bind(this,this.on_internal_enter));
		if(_window.config.fullscreen) {
			this.internal_fullscreen(_window,_window.config.fullscreen);
			_window.config.width = _window.handle.width;
			_window.config.height = _window.handle.height;
		}
	}
	,on_internal_leave: function(_mouse_event) {
		var _window = this.system.window_from_handle(_mouse_event.target);
		this.system.app.dispatch_system_event({ type : 5, window : { type : 12, timestamp : _mouse_event.timeStamp, window_id : _window.id, event : _mouse_event}});
	}
	,on_internal_enter: function(_mouse_event) {
		var _window = this.system.window_from_handle(_mouse_event.target);
		this.system.app.dispatch_system_event({ type : 5, window : { type : 11, timestamp : _mouse_event.timeStamp, window_id : _window.id, event : _mouse_event}});
	}
	,listen_for_resize: function() {
		var _g = this;
		window.onresize = function(e) {
			if(!_g.system.app.config.web.true_fullscreen) {
				var _g1 = 0;
				var _g2 = _g.fs_windows;
				while(_g1 < _g2.length) {
					var $window = _g2[_g1];
					++_g1;
					$window.set_size(window.innerWidth,window.innerHeight);
					_g.internal_resize($window,$window.width,$window.height);
				}
			}
		};
	}
	,listen_for_visibility: function() {
		if(typeof document.hidden !== undefined) {
			this._hidden_name = "hidden";
			this._hidden_event_name = "visibilitychange";
		} else if(typeof document.mozHidden !== undefined ) {
			this._hidden_name = "mozHidden";
			this._hidden_name = "mozvisibilitychange";
		} else if(typeof document.msHidden !== "undefined") {
			this._hidden_name = "msHidden";
			this._hidden_event_name = "msvisibilitychange";
		} else if(typeof document.webkitHidden !== "undefined") {
			this._hidden_name = "webkitHidden";
			this._hidden_event_name = "webkitvisibilitychange";
		}
		if(this._hidden_name != "" && this._hidden_event_name != "") window.document.addEventListener(this._hidden_event_name,$bind(this,this.on_visibility_change));
	}
	,on_visibility_change: function(jsevent) {
		var _event = { type : 5, window : { type : 2, timestamp : snow_Snow.core.timestamp(), window_id : 1, event : jsevent}};
		if(document[this._hidden_name]) {
			_event.window.type = 3;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 8;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 14;
			this.system.app.dispatch_system_event(_event);
		} else {
			_event.window.type = 2;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 10;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 13;
			this.system.app.dispatch_system_event(_event);
		}
	}
	,internal_fallback: function(message) {
		var text_el;
		var overlay_el;
		var _this = window.document;
		text_el = _this.createElement("div");
		var _this1 = window.document;
		overlay_el = _this1.createElement("div");
		text_el.style.marginLeft = "auto";
		text_el.style.marginRight = "auto";
		text_el.style.color = "#d3d3d3";
		text_el.style.marginTop = "5em";
		text_el.style.fontSize = "1.4em";
		text_el.style.fontFamily = "helvetica,sans-serif";
		text_el.innerHTML = message;
		overlay_el.style.top = "0";
		overlay_el.style.left = "0";
		overlay_el.style.width = "100%";
		overlay_el.style.height = "100%";
		overlay_el.style.display = "block";
		overlay_el.style.minWidth = "100%";
		overlay_el.style.minHeight = "100%";
		overlay_el.style.textAlign = "center";
		overlay_el.style.position = "absolute";
		overlay_el.style.background = "rgba(1,1,1,0.90)";
		overlay_el.appendChild(text_el);
		window.document.body.appendChild(overlay_el);
	}
	,__class__: snow_core_web_window_Windowing
};
var snow_modules_interfaces_Audio = function() { };
$hxClasses["snow.modules.interfaces.Audio"] = snow_modules_interfaces_Audio;
snow_modules_interfaces_Audio.__name__ = true;
var snow_modules_howlerjs_Audio = function(_system) {
	this.system = _system;
	this.suspended_sounds = [];
	this.handles = new haxe_ds_ObjectMap();
};
$hxClasses["snow.modules.howlerjs.Audio"] = snow_modules_howlerjs_Audio;
snow_modules_howlerjs_Audio.__name__ = true;
snow_modules_howlerjs_Audio.__interfaces__ = [snow_modules_interfaces_Audio];
snow_modules_howlerjs_Audio.prototype = {
	init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(event) {
	}
	,suspend: function() {
		var $it0 = this.handles.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			if(sound.get_playing()) {
				sound.toggle();
				this.suspended_sounds.push(sound);
			}
		}
	}
	,resume: function() {
		while(this.suspended_sounds.length > 0) {
			var sound = this.suspended_sounds.pop();
			sound.toggle();
		}
	}
	,info_from_id: function(_id,_format) {
		if(_format == null) {
			var _ext = haxe_io_Path.extension(_id);
			switch(_ext) {
			case "wav":
				_format = 2;
				break;
			case "ogg":
				_format = 1;
				break;
			case "pcm":
				_format = 3;
				break;
			default:
				_format = 0;
			}
		}
		return { format : _format, id : _id, handle : null, data : null};
	}
	,create_sound: function(_id,_name,_streaming,_format) {
		if(_streaming == null) _streaming = false;
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			var _path = haxe_io_Path.join([_g.system.app.assets.root,_id]);
			var info = _g.info_from_id(_path,_format);
			var sound = new snow_modules_howlerjs_sound_Sound(_g.system,_name,_streaming);
			info.handle = new window.Howl({ urls : [_path], onend : function() {
				_g.system.app.audio.module._on_end(info.handle);
			}, onloaderror : function() {
				reject(snow_types_Error.error("failed to create sound " + _name + " from " + _id));
			}, onload : function() {
				info.handle = this;
				sound.set_info(info);
				var key = info.handle;
				_g.handles.set(key,sound);
				resolve(sound);
			}});
		});
	}
	,_on_end: function(handle) {
		var sound;
		var key = handle;
		sound = this.handles.h[key.__id__];
		if(sound != null) sound.emit("end");
	}
	,__class__: snow_modules_howlerjs_Audio
};
var snow_system_audio_Sound = function(_system,_name,_is_stream) {
	if(_is_stream == null) _is_stream = false;
	this.is_stream = false;
	this.looping = false;
	this.pan = 0.0;
	this.volume = 1.0;
	this.pitch = 1.0;
	this.loaded = false;
	this.playing = false;
	this.name = "";
	this.name = _name;
	this.system = _system;
	this.is_stream = _is_stream;
};
$hxClasses["snow.system.audio.Sound"] = snow_system_audio_Sound;
snow_system_audio_Sound.__name__ = true;
snow_system_audio_Sound.prototype = {
	emit: function(_event) {
		this.system.sound_event(this,_event);
	}
	,play: function() {
		haxe_Log.trace("    i / sound / " + "Sound:play called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 102, className : "snow.system.audio.Sound", methodName : "play"});
	}
	,loop: function() {
		haxe_Log.trace("    i / sound / " + "Sound:loop called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 104, className : "snow.system.audio.Sound", methodName : "loop"});
	}
	,pause: function() {
		haxe_Log.trace("    i / sound / " + "Sound:pause called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 108, className : "snow.system.audio.Sound", methodName : "pause"});
	}
	,destroy: function() {
		haxe_Log.trace("    i / sound / " + "Sound:destroy called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 110, className : "snow.system.audio.Sound", methodName : "destroy"});
	}
	,internal_update: function() {
	}
	,internal_play: function() {
	}
	,internal_pause: function() {
	}
	,toggle: function() {
		this.set_playing(!this.get_playing());
		if(this.get_playing()) {
			if(this.get_looping()) this.loop(); else this.play();
		} else this.pause();
	}
	,get_playing: function() {
		return this.playing;
	}
	,get_info: function() {
		return this.info;
	}
	,get_pan: function() {
		return this.pan;
	}
	,get_pitch: function() {
		return this.pitch;
	}
	,get_volume: function() {
		return this.volume;
	}
	,get_looping: function() {
		return this.looping;
	}
	,set_playing: function(_playing) {
		return this.playing = _playing;
	}
	,set_loaded: function(_loaded) {
		return this.loaded = _loaded;
	}
	,set_looping: function(_looping) {
		return this.looping = _looping;
	}
	,__class__: snow_system_audio_Sound
	,__properties__: {set_looping:"set_looping",get_looping:"get_looping",get_pan:"get_pan",get_volume:"get_volume",get_pitch:"get_pitch",get_info:"get_info",set_loaded:"set_loaded",set_playing:"set_playing",get_playing:"get_playing"}
};
var snow_modules_howlerjs_sound_Sound = function(_system,_name,_is_stream) {
	if(_is_stream == null) _is_stream = false;
	snow_system_audio_Sound.call(this,_system,_name,_is_stream);
};
$hxClasses["snow.modules.howlerjs.sound.Sound"] = snow_modules_howlerjs_sound_Sound;
snow_modules_howlerjs_sound_Sound.__name__ = true;
snow_modules_howlerjs_sound_Sound.__super__ = snow_system_audio_Sound;
snow_modules_howlerjs_sound_Sound.prototype = $extend(snow_system_audio_Sound.prototype,{
	set_info: function(_info) {
		if(this.get_info() != null) this.destroy();
		this.info = null;
		if(_info == null) {
			haxe_Log.trace("    i / sound / " + "not creating sound, info was null",{ fileName : "Sound.hx", lineNumber : 29, className : "snow.modules.howlerjs.sound.Sound", methodName : "set_info"});
			return this.get_info();
		}
		this.info = _info;
		this.set_loaded(true);
		return this.get_info();
	}
	,play: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.set_playing(true);
			this.set_looping(false);
			this.get_info().handle.loop(false);
			this.get_info().handle.play();
			if(this.get_info() != null && this.get_info().handle != null) {
				this.get_info().handle.rate(this.get_pitch());
				this.get_info().handle.volume(this.get_volume());
				this.get_info().handle.pos3d(this.get_pan());
			}
		}
	}
	,loop: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.set_playing(true);
			this.set_looping(true);
			this.get_info().handle.loop(true);
			this.get_info().handle.play();
			if(this.get_info() != null && this.get_info().handle != null) {
				this.get_info().handle.rate(this.get_pitch());
				this.get_info().handle.volume(this.get_volume());
				this.get_info().handle.pos3d(this.get_pan());
			}
		}
	}
	,pause: function() {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.pause();
	}
	,destroy: function() {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.unload();
		this.system.kill(this);
	}
	,__class__: snow_modules_howlerjs_sound_Sound
});
var snow_modules_opengl_web_GL = function() { };
$hxClasses["snow.modules.opengl.web.GL"] = snow_modules_opengl_web_GL;
snow_modules_opengl_web_GL.__name__ = true;
snow_modules_opengl_web_GL.versionString = function() {
	var ver = snow_modules_opengl_web_GL.current_context.getParameter(7938);
	var slver = snow_modules_opengl_web_GL.current_context.getParameter(35724);
	var ren = snow_modules_opengl_web_GL.current_context.getParameter(7937);
	var ven = snow_modules_opengl_web_GL.current_context.getParameter(7936);
	return "/ " + ver + " / " + slver + " / " + ren + " / " + ven + " /";
};
snow_modules_opengl_web_GL.uniformMatrix4fv = function(location,transpose,data) {
	snow_modules_opengl_web_GL.current_context.uniformMatrix4fv(location,transpose,data);
};
var snow_system_assets_Asset = function(_system,_id,_type) {
	if(_type == null) _type = 0;
	this.loaded = false;
	if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id was null"));
	if(_system == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_system was null"));
	this.system = _system;
	this.type = _type;
	this.id = _id;
};
$hxClasses["snow.system.assets.Asset"] = snow_system_assets_Asset;
snow_system_assets_Asset.__name__ = true;
snow_system_assets_Asset.prototype = {
	__class__: snow_system_assets_Asset
};
var snow_system_assets_AssetImage = function(_system,_id,_image) {
	snow_system_assets_Asset.call(this,_system,_id,4);
	this.set_image(_image);
};
$hxClasses["snow.system.assets.AssetImage"] = snow_system_assets_AssetImage;
snow_system_assets_AssetImage.__name__ = true;
snow_system_assets_AssetImage.load = function(_system,_id) {
	if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id was null"));
	if(_system == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_system was null"));
	return new snow_system_assets_AssetImage(_system,_id,null).reload();
};
snow_system_assets_AssetImage.load_from_bytes = function(_system,_id,_bytes) {
	if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id was null"));
	if(_bytes == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_bytes was null"));
	if(_system == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_system was null"));
	return new snow_system_assets_AssetImage(_system,_id,null).reload_from_bytes(_bytes);
};
snow_system_assets_AssetImage.provider = function(_app,_path) {
	return _app.assets.module.image_load_info(_path);
};
snow_system_assets_AssetImage.processor = function(_app,_id,_data) {
	if(_data == null) return snow_api_Promise.reject(snow_types_Error.error("AssetImage processor: data was null"));
	return _app.assets.module.image_info_from_bytes(_id,_data);
};
snow_system_assets_AssetImage.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetImage.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		this.loaded = false;
		return new snow_api_Promise(function(resolve,reject) {
			var _load = _g.system.app.io.data_flow(haxe_io_Path.join([_g.system.root,_g.id]),null,snow_system_assets_AssetImage.provider);
			_load.then(function(_image) {
				_g.set_image(_image);
				resolve(_g);
			}).error(reject);
		});
	}
	,reload_from_bytes: function(_bytes) {
		var _g = this;
		this.loaded = false;
		return new snow_api_Promise(function(resolve,reject) {
			var _load = _g.system.module.image_info_from_bytes(_g.id,_bytes);
			_load.then(function(_image) {
				_g.set_image(_image);
				resolve(_g);
			}).error(reject);
		});
	}
	,set_image: function(_image) {
		this.loaded = _image != null;
		return this.image = _image;
	}
	,__class__: snow_system_assets_AssetImage
	,__properties__: {set_image:"set_image"}
});
var snow_system_assets_AssetBytes = function(_system,_id,_bytes) {
	snow_system_assets_Asset.call(this,_system,_id,1);
	this.set_bytes(_bytes);
};
$hxClasses["snow.system.assets.AssetBytes"] = snow_system_assets_AssetBytes;
snow_system_assets_AssetBytes.__name__ = true;
snow_system_assets_AssetBytes.load = function(_system,_id) {
	return new snow_system_assets_AssetBytes(_system,_id,null).reload();
};
snow_system_assets_AssetBytes.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetBytes.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(haxe_io_Path.join([_g.system.root,_g.id])).then(function(_bytes) {
				_g.set_bytes(_bytes);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_bytes(null);
	}
	,set_bytes: function(_bytes) {
		this.loaded = _bytes != null;
		return this.bytes = _bytes;
	}
	,__class__: snow_system_assets_AssetBytes
	,__properties__: {set_bytes:"set_bytes"}
});
var snow_system_assets_AssetText = function(_system,_id,_text) {
	snow_system_assets_Asset.call(this,_system,_id,2);
	this.set_text(_text);
};
$hxClasses["snow.system.assets.AssetText"] = snow_system_assets_AssetText;
snow_system_assets_AssetText.__name__ = true;
snow_system_assets_AssetText.load = function(_system,_id) {
	return new snow_system_assets_AssetText(_system,_id,null).reload();
};
snow_system_assets_AssetText.processor = function(_app,_id,_data) {
	if(_data == null) return snow_api_Promise.reject(snow_types_Error.error("AssetText processor: data was null"));
	return snow_api_Promise.resolve(new haxe_io_Bytes(new Uint8Array(_data.buffer)).toString());
};
snow_system_assets_AssetText.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetText.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(haxe_io_Path.join([_g.system.root,_g.id]),snow_system_assets_AssetText.processor).then(function(_text) {
				_g.set_text(_text);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_text(null);
	}
	,set_text: function(_text) {
		this.loaded = _text != null;
		return this.text = _text;
	}
	,__class__: snow_system_assets_AssetText
	,__properties__: {set_text:"set_text"}
});
var snow_system_assets_AssetJSON = function(_system,_id,_json) {
	snow_system_assets_Asset.call(this,_system,_id,3);
	this.set_json(_json);
};
$hxClasses["snow.system.assets.AssetJSON"] = snow_system_assets_AssetJSON;
snow_system_assets_AssetJSON.__name__ = true;
snow_system_assets_AssetJSON.load = function(_system,_id) {
	return new snow_system_assets_AssetJSON(_system,_id,null).reload();
};
snow_system_assets_AssetJSON.processor = function(_app,_id,_data) {
	if(_data == null) return snow_api_Promise.reject(snow_types_Error.error("AssetJSON: data was null"));
	return new snow_api_Promise(function(resolve,reject) {
		var _data_json = null;
		try {
			_data_json = JSON.parse(new haxe_io_Bytes(new Uint8Array(_data.buffer)).toString());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return reject(snow_types_Error.parse(e));
		}
		return resolve(_data_json);
	});
};
snow_system_assets_AssetJSON.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetJSON.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(haxe_io_Path.join([_g.system.root,_g.id]),snow_system_assets_AssetJSON.processor).then(function(_json) {
				_g.set_json(_json);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_json(null);
	}
	,set_json: function(_json) {
		this.loaded = _json != null;
		return this.json = _json;
	}
	,__class__: snow_system_assets_AssetJSON
	,__properties__: {set_json:"set_json"}
});
var snow_system_assets_Assets = function(_app) {
	this.root = "";
	this.app = _app;
	this.module = new snow_core_web_assets_Assets(this);
};
$hxClasses["snow.system.assets.Assets"] = snow_system_assets_Assets;
snow_system_assets_Assets.__name__ = true;
snow_system_assets_Assets.prototype = {
	__class__: snow_system_assets_Assets
};
var snow_system_audio_Audio = function(_app) {
	this.active = false;
	this.app = _app;
	this.module = new snow_modules_howlerjs_Audio(this);
	this.module.init();
	this.sound_list = new haxe_ds_StringMap();
	this.stream_list = new haxe_ds_StringMap();
	this.active = true;
};
$hxClasses["snow.system.audio.Audio"] = snow_system_audio_Audio;
snow_system_audio_Audio.__name__ = true;
snow_system_audio_Audio.prototype = {
	create: function(_id,_name,_streaming) {
		if(_streaming == null) _streaming = false;
		if(_name == null) _name = "";
		var _g = this;
		if(_name == "") _name = this.app.make_uniqueid();
		haxe_Log.trace("    i / audio / " + ("creating sound named " + _name + " (stream: " + (_streaming == null?"null":"" + _streaming) + ")"),{ fileName : "Audio.hx", lineNumber : 53, className : "snow.system.audio.Audio", methodName : "create"});
		return new snow_api_Promise(function(resolve,reject) {
			var _create = _g.module.create_sound(_id,_name,_streaming);
			_create.then(function(_sound) {
				_g.sound_list.set(_name,_sound);
				if(_streaming) _g.stream_list.set(_name,_sound);
				resolve(_sound);
				_sound.emit("load");
			}).error(reject);
		});
	}
	,get: function(_name) {
		var _sound = this.sound_list.get(_name);
		return _sound;
	}
	,kill: function(_sound) {
		if(_sound == null) return;
		this.sound_list.remove(_sound.name);
		this.stream_list.remove(_sound.name);
	}
	,suspend: function() {
		if(!this.active) return;
		haxe_Log.trace("    i / audio / " + "suspending sound context",{ fileName : "Audio.hx", lineNumber : 354, className : "snow.system.audio.Audio", methodName : "suspend"});
		this.active = false;
		var $it0 = this.stream_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.internal_pause();
		}
		this.module.suspend();
	}
	,resume: function() {
		if(this.active) return;
		haxe_Log.trace("    i / audio / " + "resuming sound context",{ fileName : "Audio.hx", lineNumber : 372, className : "snow.system.audio.Audio", methodName : "resume"});
		this.active = true;
		this.module.resume();
		var $it0 = this.stream_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.internal_play();
		}
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
		if(_event.type == 10) this.suspend(); else if(_event.type == 12) this.resume();
	}
	,destroy: function() {
		this.active = false;
		var $it0 = this.sound_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.destroy();
		}
		this.module.destroy();
	}
	,update: function() {
		if(!this.active) return;
		var $it0 = this.sound_list.iterator();
		while( $it0.hasNext() ) {
			var _sound = $it0.next();
			if(_sound.get_playing()) _sound.internal_update();
		}
		this.module.update();
	}
	,sound_event: function(_sound,_event) {
		var _event_id = "" + _event + snow_system_audio_Audio.splitter + _sound.name;
		if(this.handlers == null) return;
		var _list = this.handlers.get(_event_id);
		if(_list != null) {
			var _g = 0;
			while(_g < _list.length) {
				var fn = _list[_g];
				++_g;
				fn(_sound);
			}
		}
	}
	,__class__: snow_system_audio_Audio
};
var snow_system_input_Input = function(_app) {
	this.touch_count = 0;
	this.app = _app;
	this.module = new snow_core_web_input_Input(this);
	this.module.init();
	this.key_code_pressed = new haxe_ds_IntMap();
	this.key_code_down = new haxe_ds_IntMap();
	this.key_code_released = new haxe_ds_IntMap();
	this.scan_code_pressed = new haxe_ds_IntMap();
	this.scan_code_down = new haxe_ds_IntMap();
	this.scan_code_released = new haxe_ds_IntMap();
	this.mouse_button_pressed = new haxe_ds_IntMap();
	this.mouse_button_down = new haxe_ds_IntMap();
	this.mouse_button_released = new haxe_ds_IntMap();
	this.gamepad_button_pressed = new haxe_ds_IntMap();
	this.gamepad_button_down = new haxe_ds_IntMap();
	this.gamepad_button_released = new haxe_ds_IntMap();
	this.gamepad_axis_values = new haxe_ds_IntMap();
	this.touches_down = new haxe_ds_IntMap();
};
$hxClasses["snow.system.input.Input"] = snow_system_input_Input;
snow_system_input_Input.__name__ = true;
snow_system_input_Input.prototype = {
	dispatch_key_down_event: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		if(!repeat) {
			this.key_code_pressed.h[keycode] = false;
			this.key_code_down.h[keycode] = true;
			this.scan_code_pressed.h[scancode] = false;
			this.scan_code_down.h[scancode] = true;
		}
		this.app.host.onkeydown(keycode,scancode,repeat,mod,timestamp,window_id);
	}
	,dispatch_key_up_event: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		this.key_code_released.h[keycode] = false;
		this.key_code_down.remove(keycode);
		this.scan_code_released.h[scancode] = false;
		this.scan_code_down.remove(scancode);
		this.app.host.onkeyup(keycode,scancode,repeat,mod,timestamp,window_id);
	}
	,dispatch_text_event: function(text,start,length,type,timestamp,window_id) {
		this.app.host.ontextinput(text,start,length,type,timestamp,window_id);
	}
	,dispatch_mouse_move_event: function(x,y,xrel,yrel,timestamp,window_id) {
		this.app.host.onmousemove(x,y,xrel,yrel,timestamp,window_id);
	}
	,dispatch_mouse_down_event: function(x,y,button,timestamp,window_id) {
		this.mouse_button_pressed.h[button] = false;
		this.mouse_button_down.h[button] = true;
		this.app.host.onmousedown(x,y,button,timestamp,window_id);
	}
	,dispatch_mouse_up_event: function(x,y,button,timestamp,window_id) {
		this.mouse_button_released.h[button] = false;
		this.mouse_button_down.remove(button);
		this.app.host.onmouseup(x,y,button,timestamp,window_id);
	}
	,dispatch_mouse_wheel_event: function(x,y,timestamp,window_id) {
		this.app.host.onmousewheel(x,y,timestamp,window_id);
	}
	,dispatch_touch_down_event: function(x,y,touch_id,timestamp) {
		if(!this.touches_down.h.hasOwnProperty(touch_id)) {
			this.touch_count++;
			this.touches_down.h[touch_id] = true;
		}
		this.app.host.ontouchdown(x,y,touch_id,timestamp);
	}
	,dispatch_touch_up_event: function(x,y,touch_id,timestamp) {
		this.app.host.ontouchup(x,y,touch_id,timestamp);
		if(this.touches_down.remove(touch_id)) this.touch_count--;
	}
	,dispatch_touch_move_event: function(x,y,dx,dy,touch_id,timestamp) {
		this.app.host.ontouchmove(x,y,dx,dy,touch_id,timestamp);
	}
	,dispatch_gamepad_axis_event: function(gamepad,axis,value,timestamp) {
		if(!this.gamepad_axis_values.h.hasOwnProperty(gamepad)) {
			var value1 = new haxe_ds_IntMap();
			this.gamepad_axis_values.h[gamepad] = value1;
		}
		var this1 = this.gamepad_axis_values.h[gamepad];
		this1.set(axis,value);
		this.app.host.ongamepadaxis(gamepad,axis,value,timestamp);
	}
	,dispatch_gamepad_button_down_event: function(gamepad,button,value,timestamp) {
		if(!this.gamepad_button_pressed.h.hasOwnProperty(gamepad)) {
			var value1 = new haxe_ds_IntMap();
			this.gamepad_button_pressed.h[gamepad] = value1;
		}
		if(!this.gamepad_button_down.h.hasOwnProperty(gamepad)) {
			var value2 = new haxe_ds_IntMap();
			this.gamepad_button_down.h[gamepad] = value2;
		}
		var this1 = this.gamepad_button_pressed.h[gamepad];
		this1.set(button,false);
		var this2 = this.gamepad_button_down.h[gamepad];
		this2.set(button,true);
		this.app.host.ongamepaddown(gamepad,button,value,timestamp);
	}
	,dispatch_gamepad_button_up_event: function(gamepad,button,value,timestamp) {
		if(!this.gamepad_button_released.h.hasOwnProperty(gamepad)) {
			var value1 = new haxe_ds_IntMap();
			this.gamepad_button_released.h[gamepad] = value1;
		}
		if(!this.gamepad_button_down.h.hasOwnProperty(gamepad)) {
			var value2 = new haxe_ds_IntMap();
			this.gamepad_button_down.h[gamepad] = value2;
		}
		var this1 = this.gamepad_button_released.h[gamepad];
		this1.set(button,false);
		var this2 = this.gamepad_button_down.h[gamepad];
		this2.remove(button);
		this.app.host.ongamepadup(gamepad,button,value,timestamp);
	}
	,dispatch_gamepad_device_event: function(gamepad,id,type,timestamp) {
		this.app.host.ongamepaddevice(gamepad,id,type,timestamp);
	}
	,listen: function(_window) {
		this.module.listen(_window);
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
	}
	,update: function() {
		this.module.update();
		this._update_keystate();
		this._update_gamepadstate();
		this._update_mousestate();
	}
	,destroy: function() {
		this.module.destroy();
	}
	,_update_mousestate: function() {
		var $it0 = this.mouse_button_pressed.keys();
		while( $it0.hasNext() ) {
			var _code = $it0.next();
			if(this.mouse_button_pressed.h[_code]) this.mouse_button_pressed.remove(_code); else this.mouse_button_pressed.h[_code] = true;
		}
		var $it1 = this.mouse_button_released.keys();
		while( $it1.hasNext() ) {
			var _code1 = $it1.next();
			if(this.mouse_button_released.h[_code1]) this.mouse_button_released.remove(_code1); else this.mouse_button_released.h[_code1] = true;
		}
	}
	,_update_gamepadstate: function() {
		var $it0 = this.gamepad_button_pressed.iterator();
		while( $it0.hasNext() ) {
			var _gamepad_pressed = $it0.next();
			var $it1 = _gamepad_pressed.keys();
			while( $it1.hasNext() ) {
				var _button = $it1.next();
				if(_gamepad_pressed.h[_button]) _gamepad_pressed.remove(_button); else _gamepad_pressed.h[_button] = true;
			}
		}
		var $it2 = this.gamepad_button_released.iterator();
		while( $it2.hasNext() ) {
			var _gamepad_released = $it2.next();
			var $it3 = _gamepad_released.keys();
			while( $it3.hasNext() ) {
				var _button1 = $it3.next();
				if(_gamepad_released.h[_button1]) _gamepad_released.remove(_button1); else _gamepad_released.h[_button1] = true;
			}
		}
	}
	,_update_keystate: function() {
		var $it0 = this.key_code_pressed.keys();
		while( $it0.hasNext() ) {
			var _code = $it0.next();
			if(this.key_code_pressed.h[_code]) this.key_code_pressed.remove(_code); else this.key_code_pressed.h[_code] = true;
		}
		var $it1 = this.key_code_released.keys();
		while( $it1.hasNext() ) {
			var _code1 = $it1.next();
			if(this.key_code_released.h[_code1]) this.key_code_released.remove(_code1); else this.key_code_released.h[_code1] = true;
		}
		var $it2 = this.scan_code_pressed.keys();
		while( $it2.hasNext() ) {
			var _code2 = $it2.next();
			if(this.scan_code_pressed.h[_code2]) this.scan_code_pressed.remove(_code2); else this.scan_code_pressed.h[_code2] = true;
		}
		var $it3 = this.scan_code_released.keys();
		while( $it3.hasNext() ) {
			var _code3 = $it3.next();
			if(this.scan_code_released.h[_code3]) this.scan_code_released.remove(_code3); else this.scan_code_released.h[_code3] = true;
		}
	}
	,__class__: snow_system_input_Input
};
var snow_system_io_IO = function(_app) {
	this.app = _app;
	this.module = new snow_core_web_io_IO(this);
	this.module.init();
};
$hxClasses["snow.system.io.IO"] = snow_system_io_IO;
snow_system_io_IO.__name__ = true;
snow_system_io_IO.prototype = {
	data_flow: function(_id,_processor,_provider) {
		var _g = this;
		if(_provider == null) _provider = $bind(this,this.default_provider);
		return new snow_api_Promise(function(resolve,reject) {
			_provider(_g.app,_id).then(function(data) {
				if(_processor != null) _processor(_g.app,_id,data).then(resolve,reject); else resolve(data);
			}).error(reject);
		});
	}
	,default_provider: function(_app,_id) {
		return this.module.data_load(_id,null);
	}
	,__class__: snow_system_io_IO
};
var snow_system_window_Window = function(_system,_config) {
	this.internal_resize = false;
	this.internal_position = false;
	this.minimized = false;
	this.closed = true;
	this.auto_render = true;
	this.auto_swap = true;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.grab = false;
	this.set_max_size({ x : 0, y : 0});
	this.set_min_size({ x : 0, y : 0});
	this.system = _system;
	this.asked_config = _config;
	this.config = _config;
	if(this.config.x == null) this.config.x = 536805376;
	if(this.config.y == null) this.config.y = 536805376;
	this.system.module.create(this.system.app.config.render,_config,$bind(this,this.on_window_created));
};
$hxClasses["snow.system.window.Window"] = snow_system_window_Window;
snow_system_window_Window.__name__ = true;
snow_system_window_Window.prototype = {
	on_window_created: function(_handle,_id,_configs) {
		this.id = _id;
		this.handle = _handle;
		if(this.handle == null) {
			haxe_Log.trace("   i / window / " + "failed to create window",{ fileName : "Window.hx", lineNumber : 92, className : "snow.system.window.Window", methodName : "on_window_created"});
			return;
		}
		this.closed = false;
		this.config = _configs.config;
		this.system.app.config.render = _configs.render_config;
		this.internal_position = true;
		this.set_x(this.config.x);
		this.set_y(this.config.y);
		this.internal_position = false;
		this.internal_resize = true;
		this.set_width(this.config.width);
		this.set_height(this.config.height);
		this.internal_resize = false;
		this.on_event({ type : 1, window_id : _id, timestamp : snow_Snow.core.timestamp(), event : { }});
		null;
	}
	,on_event: function(_event) {
		var _g = _event.type;
		if(_g != null) switch(_g) {
		case 5:
			this.internal_position = true;
			this.set_position(_event.event.x,_event.event.y);
			this.internal_position = false;
			break;
		case 6:
			this.internal_resize = true;
			this.set_size(_event.event.x,_event.event.y);
			this.internal_resize = false;
			break;
		case 7:
			this.internal_resize = true;
			this.set_size(_event.event.x,_event.event.y);
			this.internal_resize = false;
			break;
		case 8:
			this.minimized = true;
			break;
		case 10:
			this.minimized = false;
			break;
		default:
		} else {
		}
		if(this.onevent != null) this.onevent(_event);
	}
	,update: function() {
		if(this.handle != null && !this.closed) this.system.module.update_window(this);
	}
	,render: function() {
		if(this.minimized || this.closed) return;
		if(this.handle == null) return;
		this.system.module.render(this);
		if(this.onrender != null) {
			this.onrender(this);
			if(this.auto_swap) this.swap();
			return;
		}
		snow_modules_opengl_web_GL.current_context.clearColor(0,0,0,1.0);
		snow_modules_opengl_web_GL.current_context.clear(16384);
		if(this.auto_swap) this.swap();
	}
	,swap: function() {
		if(this.handle == null || this.closed || this.minimized) return;
		this.system.module.swap(this);
	}
	,get_max_size: function() {
		return this.max_size;
	}
	,get_min_size: function() {
		return this.min_size;
	}
	,set_x: function(_x) {
		this.x = _x;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
		return this.x;
	}
	,set_y: function(_y) {
		this.y = _y;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
		return this.y;
	}
	,set_width: function(_width) {
		this.width = _width;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,this.width,this.height);
		return this.width;
	}
	,set_height: function(_height) {
		this.height = _height;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,this.width,this.height);
		return this.height;
	}
	,set_cursor_position: function(_x,_y) {
		if(this.handle != null && !this.closed) this.system.module.set_cursor_position(this,_x,_y);
	}
	,set_position: function(_x,_y) {
		var last_internal_position_flag = this.internal_position;
		this.internal_position = true;
		this.set_x(_x);
		this.set_y(_y);
		this.internal_position = last_internal_position_flag;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
	}
	,set_size: function(_width,_height) {
		var last_internal_resize_flag = this.internal_resize;
		this.internal_resize = true;
		this.set_width(_width);
		this.set_height(_height);
		this.internal_resize = last_internal_resize_flag;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,_width,_height);
	}
	,set_max_size: function(_size) {
		if(this.get_max_size() != null && this.handle != null) this.system.module.set_max_size(this,_size.x,_size.y);
		return this.max_size = _size;
	}
	,set_min_size: function(_size) {
		if(this.get_min_size() != null && this.handle != null) this.system.module.set_min_size(this,_size.x,_size.y);
		return this.min_size = _size;
	}
	,set_grab: function(_grab) {
		if(this.handle != null) this.system.module.grab(this,_grab);
		return this.grab = _grab;
	}
	,__class__: snow_system_window_Window
	,__properties__: {set_min_size:"set_min_size",get_min_size:"get_min_size",set_max_size:"set_max_size",get_max_size:"get_max_size",set_height:"set_height",set_width:"set_width",set_y:"set_y",set_x:"set_x",set_grab:"set_grab"}
};
var snow_system_window_Windowing = function(_app) {
	this.window_count = 0;
	this.app = _app;
	this.window_list = new haxe_ds_IntMap();
	this.window_handles = new haxe_ds_ObjectMap();
	this.module = new snow_core_web_window_Windowing(this);
	this.module.init();
};
$hxClasses["snow.system.window.Windowing"] = snow_system_window_Windowing;
snow_system_window_Windowing.__name__ = true;
snow_system_window_Windowing.prototype = {
	create: function(_config) {
		var _window = new snow_system_window_Window(this,_config);
		this.window_list.h[_window.id] = _window;
		this.window_handles.set(_window.handle,_window.id);
		this.window_count++;
		this.module.listen(_window);
		if(_config.no_input == null || _config.no_input == false) this.app.input.listen(_window);
		return _window;
	}
	,window_from_handle: function(_handle) {
		if(this.window_handles.h.__keys__[_handle.__id__] != null) {
			var _id = this.window_handles.h[_handle.__id__];
			return this.window_list.h[_id];
		}
		return null;
	}
	,enable_cursor: function(_enable) {
		this.module.system_enable_cursor(_enable);
	}
	,on_event: function(_event) {
		if(_event.type == 5) {
			var _window_event = _event.window;
			var _window = this.window_list.h[_window_event.window_id];
			if(_window != null) _window.on_event(_window_event);
		}
	}
	,update: function() {
		this.module.update();
		var $it0 = this.window_list.iterator();
		while( $it0.hasNext() ) {
			var $window = $it0.next();
			$window.update();
		}
		var $it1 = this.window_list.iterator();
		while( $it1.hasNext() ) {
			var window1 = $it1.next();
			if(window1.auto_render) window1.render();
		}
	}
	,destroy: function() {
		this.module.destroy();
	}
	,__class__: snow_system_window_Windowing
};
var snow_types_Error = $hxClasses["snow.types.Error"] = { __ename__ : true, __constructs__ : ["error","init","windowing","parse"] };
snow_types_Error.error = function(value) { var $x = ["error",0,value]; $x.__enum__ = snow_types_Error; $x.toString = $estr; return $x; };
snow_types_Error.init = function(value) { var $x = ["init",1,value]; $x.__enum__ = snow_types_Error; $x.toString = $estr; return $x; };
snow_types_Error.windowing = function(value) { var $x = ["windowing",2,value]; $x.__enum__ = snow_types_Error; $x.toString = $estr; return $x; };
snow_types_Error.parse = function(value) { var $x = ["parse",3,value]; $x.__enum__ = snow_types_Error; $x.toString = $estr; return $x; };
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
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
haxe_Resource.content = [{ name : "version", data : "MS4wLjAtYWxwaGEuMQ"},{ name : "default.vert.glsl", data : "YXR0cmlidXRlIHZlYzMgdmVydGV4UG9zaXRpb247DQphdHRyaWJ1dGUgdmVjMiB2ZXJ0ZXhUQ29vcmQ7DQphdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhDb2xvcjsNCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleE5vcm1hbDsNCg0KdmFyeWluZyB2ZWMyIHRjb29yZDsNCnZhcnlpbmcgdmVjNCBjb2xvcjsNCg0KdW5pZm9ybSBtYXQ0IHByb2plY3Rpb25NYXRyaXg7DQp1bmlmb3JtIG1hdDQgbW9kZWxWaWV3TWF0cml4Ow0KDQp2b2lkIG1haW4odm9pZCkgew0KDQogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsNCiAgICB0Y29vcmQgPSB2ZXJ0ZXhUQ29vcmQ7DQogICAgY29sb3IgPSB2ZXJ0ZXhDb2xvcjsNCiAgICAgICAgLy9obW0hIEkgdGhpbmsgc2hhZGVycyBhcmUgY29tcGlsZWQgb3B0aW1pc2VkLCByZW1vdmluZyB1bnVzZWQgdmFsdWVzIHdoaWNoIG1lYW5zDQogICAgICAgIC8vdGhhdCB0aGUgc2hhZGVycyBnZXRWZXJ0ZXhOb3JtYWwgYXR0cmlidXRlIHJldHVybnMgaW52YWxpZCAoLTEpIHZhbHVlcyENCiAgICB2ZWMzIG4gPSB2ZXJ0ZXhOb3JtYWw7DQogICAgZ2xfUG9pbnRTaXplID0gMS4wOw0KDQp9"},{ name : "build", data : "K2Y0ZTk2MGYxYzA"},{ name : "default.frag.glsl", data : "dmFyeWluZyB2ZWMyIHRjb29yZDsNCnZhcnlpbmcgdmVjNCBjb2xvcjsNCg0Kdm9pZCBtYWluKCkgew0KICAgIGdsX0ZyYWdDb2xvciA9IGNvbG9yOw0KfQ"},{ name : "default.fnt", data : "aW5mbyBmYWNlPWRlZmF1bHQgc2l6ZT0zMiBib2xkPTAgaXRhbGljPTAgY2hhcnNldD0gdW5pY29kZT0gc3RyZXRjaEg9MTAwIHNtb290aD0xIGFhPTEgcGFkZGluZz0yLDIsMiwyIHNwYWNpbmc9MCwwIG91dGxpbmU9MA0KY29tbW9uIGxpbmVIZWlnaHQ9MzguODggYmFzZT0zMSBzY2FsZVc9Mjc1IHNjYWxlSD01MTIgcGFnZXM9MSBwYWNrZWQ9MA0KcGFnZSBpZD0wIGZpbGU9ImRlZmF1bHQucG5nIg0KY2hhcnMgY291bnQ9MjE3DQpjaGFyIGlkPTMyIHg9MiB5PTIgd2lkdGg9MCBoZWlnaHQ9MCB4b2Zmc2V0PTAgeW9mZnNldD0zMC44OCB4YWR2YW5jZT03LjIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzMgeD0yIHk9NCB3aWR0aD03IGhlaWdodD0yNyB4b2Zmc2V0PTEuODkgeW9mZnNldD02Ljg4IHhhZHZhbmNlPTcuNzQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzQgeD0yIHk9MzMgd2lkdGg9MTMgaGVpZ2h0PTEyIHhvZmZzZXQ9MS4yOCB5b2Zmc2V0PTYuODggeGFkdmFuY2U9MTIuODYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzUgeD0xMSB5PTIgd2lkdGg9MjMgaGVpZ2h0PTI1IHhvZmZzZXQ9MS4wNiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MjIuNTMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzYgeD0yIHk9NDcgd2lkdGg9MTcgaGVpZ2h0PTI4IHhvZmZzZXQ9MS4zNCB5b2Zmc2V0PTYuOTQgeGFkdmFuY2U9MTYuNDUgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzcgeD0yIHk9Nzcgd2lkdGg9MjcgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4xMiB5b2Zmc2V0PTguMzIgeGFkdmFuY2U9MjYuODggcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzggeD0yMSB5PTI5IHdpZHRoPTIwIGhlaWdodD0yNiB4b2Zmc2V0PTEuMTUgeW9mZnNldD04LjM4IHhhZHZhbmNlPTE5LjU1IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTM5IHg9MjEgeT01NyB3aWR0aD02IGhlaWdodD0xMiB4b2Zmc2V0PTEuMzEgeW9mZnNldD02Ljg4IHhhZHZhbmNlPTUuODIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NDAgeD0yIHk9MTA1IHdpZHRoPTkgaGVpZ2h0PTMxIHhvZmZzZXQ9MS4zNCB5b2Zmc2V0PTYuODggeGFkdmFuY2U9OC4zNSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD00MSB4PTIgeT0xMzggd2lkdGg9OSBoZWlnaHQ9MzEgeG9mZnNldD0wLjc3IHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT04LjM1IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTQyIHg9MjkgeT01NyB3aWR0aD0xNCBoZWlnaHQ9MTMgeG9mZnNldD0xLjA2IHlvZmZzZXQ9Ni45MSB4YWR2YW5jZT0xMy42MyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD00MyB4PTM2IHk9MiB3aWR0aD0xNCBoZWlnaHQ9MTQgeG9mZnNldD0xLjQ3IHlvZmZzZXQ9MTYuNDIgeGFkdmFuY2U9MTQuODIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NDQgeD0zNiB5PTE4IHdpZHRoPTYgaGVpZ2h0PTkgeG9mZnNldD0xLjgyIHlvZmZzZXQ9MjguMTMgeGFkdmFuY2U9Ni45MSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD00NSB4PTQzIHk9Mjkgd2lkdGg9MTMgaGVpZ2h0PTUgeG9mZnNldD0xLjgyIHlvZmZzZXQ9MjAuNTEgeGFkdmFuY2U9MTMuNTcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NDYgeD00NCB5PTE4IHdpZHRoPTUgaGVpZ2h0PTUgeG9mZnNldD0xLjgyIHlvZmZzZXQ9MjguMTMgeGFkdmFuY2U9Ni41MyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD00NyB4PTIgeT0xNzEgd2lkdGg9MTggaGVpZ2h0PTI4IHhvZmZzZXQ9MC42MSB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTcuMDIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NDggeD0xMyB5PTEwNSB3aWR0aD0yMSBoZWlnaHQ9MjYgeG9mZnNldD0yLjAyIHlvZmZzZXQ9OC4wMyB4YWR2YW5jZT0yMi44NSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD00OSB4PTUyIHk9MiB3aWR0aD0xMCBoZWlnaHQ9MjUgeG9mZnNldD0xLjA5IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xMS4zNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD01MCB4PTMxIHk9NzIgd2lkdGg9MTYgaGVpZ2h0PTI1IHhvZmZzZXQ9MS42IHlvZmZzZXQ9OC4wMyB4YWR2YW5jZT0xNi43NyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD01MSB4PTQ1IHk9MzYgd2lkdGg9MTcgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4yOCB5b2Zmc2V0PTguMDMgeGFkdmFuY2U9MTcuNSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD01MiB4PTEzIHk9MTMzIHdpZHRoPTE4IGhlaWdodD0yNSB4b2Zmc2V0PTAuNDUgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTE3Ljg5IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTUzIHg9MiB5PTIwMSB3aWR0aD0xNyBoZWlnaHQ9MjUgeG9mZnNldD0xLjYzIHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xNy4zMSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD01NCB4PTIgeT0yMjggd2lkdGg9MTcgaGVpZ2h0PTI1IHhvZmZzZXQ9MS45OCB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTguMTggcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NTUgeD0yIHk9MjU1IHdpZHRoPTE3IGhlaWdodD0yNSB4b2Zmc2V0PTEuMjUgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTE2LjA2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTU2IHg9MiB5PTI4MiB3aWR0aD0xOCBoZWlnaHQ9MjYgeG9mZnNldD0xLjg5IHlvZmZzZXQ9OC4wNiB4YWR2YW5jZT0xOS40OSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD01NyB4PTIxIHk9MjAxIHdpZHRoPTE3IGhlaWdodD0yNSB4b2Zmc2V0PTEuNDQgeW9mZnNldD04LjAzIHhhZHZhbmNlPTE4LjI0IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTU4IHg9MjIgeT0xNjAgd2lkdGg9NSBoZWlnaHQ9MTcgeG9mZnNldD0xLjgyIHlvZmZzZXQ9MTYuOCB4YWR2YW5jZT02LjUzIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTU5IHg9MjIgeT0xNzkgd2lkdGg9NiBoZWlnaHQ9MjAgeG9mZnNldD0xLjgyIHlvZmZzZXQ9MTYuOCB4YWR2YW5jZT02LjkxIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTYwIHg9MjkgeT0xNjAgd2lkdGg9MTMgaGVpZ2h0PTE2IHhvZmZzZXQ9MS4wNiB5b2Zmc2V0PTE1LjIgeGFkdmFuY2U9MTIuOTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NjEgeD0zMCB5PTE3OCB3aWR0aD0xNCBoZWlnaHQ9MTAgeG9mZnNldD0yLjExIHlvZmZzZXQ9MTguMjcgeGFkdmFuY2U9MTYuMDYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NjIgeD0zMyB5PTEzMyB3aWR0aD0xMiBoZWlnaHQ9MTYgeG9mZnNldD0xLjkyIHlvZmZzZXQ9MTUuMiB4YWR2YW5jZT0xMi45MyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD02MyB4PTM2IHk9OTkgd2lkdGg9MTQgaGVpZ2h0PTI3IHhvZmZzZXQ9MC45NiB5b2Zmc2V0PTYuODggeGFkdmFuY2U9MTQuMTEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NjQgeD00NCB5PTE1MSB3aWR0aD0yMyBoZWlnaHQ9MjMgeG9mZnNldD0xLjU3IHlvZmZzZXQ9MTMuMTggeGFkdmFuY2U9MjMuMSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD02NSB4PTQ5IHk9NjQgd2lkdGg9MjIgaGVpZ2h0PTI1IHhvZmZzZXQ9MC4yMiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTkuNzEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NjYgeD0yMSB5PTIyOCB3aWR0aD0xOCBoZWlnaHQ9MjUgeG9mZnNldD0yLjU2IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xOS4xIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTY3IHg9NDAgeT0xOTAgd2lkdGg9MjAgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4yNSB5b2Zmc2V0PTguMDMgeGFkdmFuY2U9MTkuNzEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NjggeD0yMSB5PTI1NSB3aWR0aD0yMiBoZWlnaHQ9MjUgeG9mZnNldD0yLjU2IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0yMy4yNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD02OSB4PTQxIHk9MjE4IHdpZHRoPTE3IGhlaWdodD0yNSB4b2Zmc2V0PTIuNTYgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTE3LjczIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTcwIHg9NTIgeT05MSB3aWR0aD0xNiBoZWlnaHQ9MjUgeG9mZnNldD0yLjU2IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xNi43NCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD03MSB4PTUyIHk9MTE4IHdpZHRoPTIxIGhlaWdodD0yNiB4b2Zmc2V0PTEuMjUgeW9mZnNldD04LjAzIHhhZHZhbmNlPTIxLjUgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NzIgeD03MCB5PTkxIHdpZHRoPTIxIGhlaWdodD0yNSB4b2Zmc2V0PTIuNTYgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTIzLjg3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTczIHg9NjQgeT0yIHdpZHRoPTYgaGVpZ2h0PTI1IHhvZmZzZXQ9Mi41NiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9OC4xNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD03NCB4PTY0IHk9Mjkgd2lkdGg9OSBoZWlnaHQ9MzEgeG9mZnNldD0tMC41NCB5b2Zmc2V0PTguNDggeGFkdmFuY2U9OC4xNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD03NSB4PTcyIHk9MiB3aWR0aD0xOCBoZWlnaHQ9MjUgeG9mZnNldD0yLjU2IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xOC40NiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD03NiB4PTczIHk9NjIgd2lkdGg9MTYgaGVpZ2h0PTI1IHhvZmZzZXQ9Mi41NiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTYuMDMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NzcgeD03NSB5PTI5IHdpZHRoPTI2IGhlaWdodD0yNSB4b2Zmc2V0PTEuNTQgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTI1Ljk4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTc4IHg9OTIgeT0yIHdpZHRoPTIwIGhlaWdodD0yNSB4b2Zmc2V0PTIuNTYgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTIyLjUzIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTc5IHg9OTEgeT01NiB3aWR0aD0yNSBoZWlnaHQ9MjYgeG9mZnNldD0xLjI1IHlvZmZzZXQ9OC4wMyB4YWR2YW5jZT0yNC41OCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MCB4PTEwMyB5PTI5IHdpZHRoPTE4IGhlaWdodD0yNSB4b2Zmc2V0PTIuNTYgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTE4LjMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODEgeD0yIHk9MzEwIHdpZHRoPTI1IGhlaWdodD0yNiB4b2Zmc2V0PTEuMjUgeW9mZnNldD04LjAzIHhhZHZhbmNlPTI0LjU4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTgyIHg9MTE0IHk9MiB3aWR0aD0xOSBoZWlnaHQ9MjUgeG9mZnNldD0yLjU2IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xOS4zIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTgzIHg9MjIgeT0yODIgd2lkdGg9MTkgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4yOCB5b2Zmc2V0PTguMDMgeGFkdmFuY2U9MTguNjkgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODQgeD0yIHk9MzM4IHdpZHRoPTE5IGhlaWdodD0yNSB4b2Zmc2V0PTAuNDggeW9mZnNldD04LjQ4IHhhZHZhbmNlPTE3LjA2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTg1IHg9MiB5PTM2NSB3aWR0aD0yMSBoZWlnaHQ9MjUgeG9mZnNldD0yLjMgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTIzLjE3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTg2IHg9MjMgeT0zMzggd2lkdGg9MjMgaGVpZ2h0PTI1IHhvZmZzZXQ9MC4xMyB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MjAuNjEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODcgeD0yOSB5PTMxMCB3aWR0aD0zMyBoZWlnaHQ9MjUgeG9mZnNldD0wLjQ1IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0zMS4wNyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04OCB4PTQzIHk9MjgyIHdpZHRoPTIxIGhlaWdodD0yNSB4b2Zmc2V0PTAuMjkgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTE5LjE3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTg5IHg9NDUgeT0yNDUgd2lkdGg9MjEgaGVpZ2h0PTI1IHhvZmZzZXQ9LTAuMSB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTguMTQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9OTAgeD02MCB5PTIxOCB3aWR0aD0yMCBoZWlnaHQ9MjUgeG9mZnNldD0wLjI5IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xNy41NyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD05MSB4PTYyIHk9MTc2IHdpZHRoPTExIGhlaWdodD0zMSB4b2Zmc2V0PTIuMjQgeW9mZnNldD02Ljg4IHhhZHZhbmNlPTEwLjQ2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTkzIHg9NzUgeT0xMTggd2lkdGg9MTEgaGVpZ2h0PTMxIHhvZmZzZXQ9MC4xOSB5b2Zmc2V0PTYuODggeGFkdmFuY2U9MTAuNjYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9OTQgeD02OSB5PTE1MSB3aWR0aD0xNiBoZWlnaHQ9MTMgeG9mZnNldD0xLjU3IHlvZmZzZXQ9Ni41OSB4YWR2YW5jZT0xNi4zNSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD05NSB4PTkxIHk9ODQgd2lkdGg9MjEgaGVpZ2h0PTUgeG9mZnNldD0wLjEgeW9mZnNldD0zMi4wMyB4YWR2YW5jZT0xOC4xMSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD05NiB4PTMzIHk9MTUxIHdpZHRoPTkgaGVpZ2h0PTcgeG9mZnNldD0xLjg2IHlvZmZzZXQ9Ny40NiB4YWR2YW5jZT05LjcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9OTcgeD03NSB5PTE2NiB3aWR0aD0xNyBoZWlnaHQ9MTkgeG9mZnNldD0wLjc3IHlvZmZzZXQ9MTQuODggeGFkdmFuY2U9MTUuMzYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9OTggeD03NSB5PTE4NyB3aWR0aD0xNyBoZWlnaHQ9MjcgeG9mZnNldD0xLjkyIHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT0xNy43NiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD05OSB4PTg4IHk9MTE4IHdpZHRoPTE1IGhlaWdodD0xOSB4b2Zmc2V0PTEuMDYgeW9mZnNldD0xNC44OCB4YWR2YW5jZT0xNC41MyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xMDAgeD0yIHk9MzkyIHdpZHRoPTE3IGhlaWdodD0yNyB4b2Zmc2V0PTEuMDIgeW9mZnNldD02Ljg4IHhhZHZhbmNlPTE3Ljc2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTEwMSB4PTkzIHk9OTEgd2lkdGg9MTcgaGVpZ2h0PTE5IHhvZmZzZXQ9MC45OSB5b2Zmc2V0PTE0Ljg4IHhhZHZhbmNlPTE2LjM4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTEwMiB4PTIgeT00MjEgd2lkdGg9MTIgaGVpZ2h0PTI3IHhvZmZzZXQ9MC4zMiB5b2Zmc2V0PTYuODggeGFkdmFuY2U9MTAuNTkgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTAzIHg9MiB5PTQ1MCB3aWR0aD0xOCBoZWlnaHQ9MjcgeG9mZnNldD0wLjgzIHlvZmZzZXQ9MTQuODggeGFkdmFuY2U9MTUuOTQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTA0IHg9MTYgeT00MjEgd2lkdGg9MTYgaGVpZ2h0PTI3IHhvZmZzZXQ9MS45MiB5b2Zmc2V0PTYuODggeGFkdmFuY2U9MTcuMzQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTA1IHg9ODggeT0xMzkgd2lkdGg9NSBoZWlnaHQ9MjUgeG9mZnNldD0xLjk1IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT02Ljc4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTEwNiB4PTI1IHk9MzY1IHdpZHRoPTggaGVpZ2h0PTMzIHhvZmZzZXQ9LTAuMzggeW9mZnNldD04LjQ4IHhhZHZhbmNlPTYuNzggcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTA3IHg9MiB5PTQ3OSB3aWR0aD0xNSBoZWlnaHQ9MjcgeG9mZnNldD0xLjkyIHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT0xNC4zNCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xMDggeD0xOSB5PTQ3OSB3aWR0aD04IGhlaWdodD0yNyB4b2Zmc2V0PTEuOTIgeW9mZnNldD02Ljg4IHhhZHZhbmNlPTcuNTUgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTA5IHg9MjEgeT00MDAgd2lkdGg9MjcgaGVpZ2h0PTE5IHhvZmZzZXQ9MS45NSB5b2Zmc2V0PTE0Ljg4IHhhZHZhbmNlPTI4LjA2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTExMCB4PTIyIHk9NDUwIHdpZHRoPTE3IGhlaWdodD0xOSB4b2Zmc2V0PTEuOTUgeW9mZnNldD0xNC44OCB4YWR2YW5jZT0xNy44OSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xMTEgeD0zNCB5PTQyMSB3aWR0aD0xOCBoZWlnaHQ9MTkgeG9mZnNldD0xLjAyIHlvZmZzZXQ9MTQuODggeGFkdmFuY2U9MTcuNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xMTIgeD0zNSB5PTM2NSB3aWR0aD0xNyBoZWlnaHQ9MjYgeG9mZnNldD0xLjk1IHlvZmZzZXQ9MTQuODggeGFkdmFuY2U9MTcuODIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTEzIHg9NTAgeT0zOTMgd2lkdGg9MTcgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4wNiB5b2Zmc2V0PTE0Ljg4IHhhZHZhbmNlPTE3LjgyIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTExNCB4PTQ4IHk9MzM3IHdpZHRoPTExIGhlaWdodD0xOSB4b2Zmc2V0PTEuOTUgeW9mZnNldD0xNC42MiB4YWR2YW5jZT0xMC4yNyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xMTUgeD01NCB5PTM1OCB3aWR0aD0xNCBoZWlnaHQ9MTkgeG9mZnNldD0xLjAyIHlvZmZzZXQ9MTQuODggeGFkdmFuY2U9MTMuMjUgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTE2IHg9MjkgeT00NzEgd2lkdGg9MTIgaGVpZ2h0PTIzIHhvZmZzZXQ9MC41OCB5b2Zmc2V0PTExLjA0IHhhZHZhbmNlPTEwLjc4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTExNyB4PTYxIHk9MzM3IHdpZHRoPTE2IGhlaWdodD0xOSB4b2Zmc2V0PTEuNzkgeW9mZnNldD0xNS4yIHhhZHZhbmNlPTE2Ljc3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTExOCB4PTY0IHk9MzA5IHdpZHRoPTE4IGhlaWdodD0xOCB4b2Zmc2V0PTAuMjkgeW9mZnNldD0xNS4yIHhhZHZhbmNlPTE1Ljc0IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTExOSB4PTQxIHk9NDQyIHdpZHRoPTI1IGhlaWdodD0xOCB4b2Zmc2V0PTAuMzggeW9mZnNldD0xNS4yIHhhZHZhbmNlPTIzLjIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTIwIHg9NTQgeT00MjEgd2lkdGg9MTcgaGVpZ2h0PTE4IHhvZmZzZXQ9MC4zNSB5b2Zmc2V0PTE1LjIgeGFkdmFuY2U9MTUuMTcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTIxIHg9NjYgeT0yNzIgd2lkdGg9MTggaGVpZ2h0PTI2IHhvZmZzZXQ9MC4yMiB5b2Zmc2V0PTE1LjIgeGFkdmFuY2U9MTYuMTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTIyIHg9NjggeT0yNDUgd2lkdGg9MTYgaGVpZ2h0PTE4IHhvZmZzZXQ9MC43IHlvZmZzZXQ9MTUuMiB4YWR2YW5jZT0xNS4wNyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xMjMgeD02OSB5PTM3OSB3aWR0aD0xMSBoZWlnaHQ9MzEgeG9mZnNldD0wLjYxIHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT05LjU3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTEyNCB4PTc5IHk9MzI5IHdpZHRoPTUgaGVpZ2h0PTMzIHhvZmZzZXQ9Mi4yNCB5b2Zmc2V0PTYuODggeGFkdmFuY2U9Ny4zMyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xMjUgeD00MyB5PTQ2MiB3aWR0aD0xMSBoZWlnaHQ9MzEgeG9mZnNldD0wLjA2IHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT05LjU3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTEyNiB4PTQ2IHk9MTc2IHdpZHRoPTE0IGhlaWdodD02IHhvZmZzZXQ9MS43MyB5b2Zmc2V0PTIxLjg2IHhhZHZhbmNlPTE0LjU2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTEyNyB4PTg0IHk9MzAwIHdpZHRoPTE2IGhlaWdodD0yNSB4b2Zmc2V0PTMuMDIgeW9mZnNldD04LjA0IHhhZHZhbmNlPTE5LjIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODM2NCB4PTgyIHk9MjE2IHdpZHRoPTIyIGhlaWdodD0yNCB4b2Zmc2V0PTEuMDYgeW9mZnNldD05LjAyIHhhZHZhbmNlPTIyLjUgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODIxOCB4PTEzIHk9MTYwIHdpZHRoPTYgaGVpZ2h0PTkgeG9mZnNldD0xLjgyIHlvZmZzZXQ9MjguMTMgeGFkdmFuY2U9Ni45MSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD00MDIgeD05NCB5PTE2NiB3aWR0aD0xNiBoZWlnaHQ9MzMgeG9mZnNldD0tMS4wOSB5b2Zmc2V0PTguMDMgeGFkdmFuY2U9MTEuMjMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODIyMiB4PTU0IHk9Mzc5IHdpZHRoPTEzIGhlaWdodD05IHhvZmZzZXQ9MS44MiB5b2Zmc2V0PTI4LjEzIHhhZHZhbmNlPTE0LjI3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTgyMzAgeD02OCB5PTI2NSB3aWR0aD0yMSBoZWlnaHQ9NSB4b2Zmc2V0PTEuODIgeW9mZnNldD0yOC4xMyB4YWR2YW5jZT0yMS42MyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MjI0IHg9OTUgeT0xMzkgd2lkdGg9MTQgaGVpZ2h0PTIyIHhvZmZzZXQ9MS4xMiB5b2Zmc2V0PTExLjQ2IHhhZHZhbmNlPTEzLjU3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTgyMjUgeD0xMDUgeT0xMTIgd2lkdGg9MTQgaGVpZ2h0PTI0IHhvZmZzZXQ9MS43IHlvZmZzZXQ9MTEuNDYgeGFkdmFuY2U9MTQuNzIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9NzEwIHg9NjYgeT0zMDAgd2lkdGg9MTIgaGVpZ2h0PTcgeG9mZnNldD0yLjQzIHlvZmZzZXQ9Ny4wNCB4YWR2YW5jZT0xNC4yNyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MjQwIHg9MTE0IHk9ODQgd2lkdGg9MzkgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4xNSB5b2Zmc2V0PTguMzIgeGFkdmFuY2U9MzguNDMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzUyIHg9NTYgeT00NjIgd2lkdGg9MTkgaGVpZ2h0PTMzIHhvZmZzZXQ9MS4yOCB5b2Zmc2V0PTAuNDggeGFkdmFuY2U9MTguNjkgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODI0OSB4PTY4IHk9NDQxIHdpZHRoPTExIGhlaWdodD0xNiB4b2Zmc2V0PTAuNDUgeW9mZnNldD0xNS4yIHhhZHZhbmNlPTEwLjMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzM4IHg9MTE4IHk9NTYgd2lkdGg9MzQgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4yOCB5b2Zmc2V0PTguMDMgeGFkdmFuY2U9MzQuMjcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzgxIHg9NzcgeT00NTkgd2lkdGg9MjAgaGVpZ2h0PTMzIHhvZmZzZXQ9MC4yOSB5b2Zmc2V0PTAuNDggeGFkdmFuY2U9MTcuNTcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODIxNiB4PTMwIHk9MTkwIHdpZHRoPTYgaGVpZ2h0PTkgeG9mZnNldD0xLjM4IHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT01Ljk1IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTgyMTcgeD03MCB5PTM1OCB3aWR0aD02IGhlaWdodD05IHhvZmZzZXQ9MS4zNCB5b2Zmc2V0PTYuODggeGFkdmFuY2U9NS40MSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MjIwIHg9OTQgeT0yMDEgd2lkdGg9MTMgaGVpZ2h0PTkgeG9mZnNldD0xLjM4IHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT0xMi42NyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MjIxIHg9NzggeT0zNjQgd2lkdGg9MTMgaGVpZ2h0PTkgeG9mZnNldD0xLjM0IHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT0xMi4xMyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MjI2IHg9NDMgeT00OTUgd2lkdGg9MTAgaGVpZ2h0PTEwIHhvZmZzZXQ9MS40MSB5b2Zmc2V0PTE4LjUgeGFkdmFuY2U9OS43OSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MjExIHg9NjkgeT00MTIgd2lkdGg9MTUgaGVpZ2h0PTUgeG9mZnNldD0xLjgyIHlvZmZzZXQ9MjAuNTEgeGFkdmFuY2U9MTYuMDYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9ODIxMiB4PTQ1IHk9MjcyIHdpZHRoPTE4IGhlaWdodD01IHhvZmZzZXQ9MS44MiB5b2Zmc2V0PTIwLjUxIHhhZHZhbmNlPTE5LjAxIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTczMiB4PTU1IHk9NDk3IHdpZHRoPTE0IGhlaWdodD02IHhvZmZzZXQ9Mi45NCB5b2Zmc2V0PTguNDIgeGFkdmFuY2U9MTYuOSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04NDgyIHg9NzcgeT00OTQgd2lkdGg9MjMgaGVpZ2h0PTE0IHhvZmZzZXQ9MC45OSB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MjMuMjYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzUzIHg9ODYgeT0zMjcgd2lkdGg9MTQgaGVpZ2h0PTI3IHhvZmZzZXQ9MS4wMiB5b2Zmc2V0PTcuMiB4YWR2YW5jZT0xMy4yNSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD04MjUwIHg9NzMgeT00MTkgd2lkdGg9MTEgaGVpZ2h0PTE2IHhvZmZzZXQ9MS4zMSB5b2Zmc2V0PTE1LjIgeGFkdmFuY2U9MTAuMzQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzM5IHg9ODEgeT00Mzcgd2lkdGg9MjkgaGVpZ2h0PTE5IHhvZmZzZXQ9MS4wMiB5b2Zmc2V0PTE0Ljg4IHhhZHZhbmNlPTI4Ljg2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTM4MiB4PTExMSB5PTEzOCB3aWR0aD0xNiBoZWlnaHQ9MjYgeG9mZnNldD0wLjcgeW9mZnNldD03LjIgeGFkdmFuY2U9MTUuMDcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9Mzc2IHg9OTkgeT00NTggd2lkdGg9MjEgaGVpZ2h0PTMyIHhvZmZzZXQ9LTAuMSB5b2Zmc2V0PTEuNzYgeGFkdmFuY2U9MTguMTQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTYxIHg9ODIgeT0zNzUgd2lkdGg9NyBoZWlnaHQ9MjcgeG9mZnNldD0xLjYgeW9mZnNldD0xNC44OCB4YWR2YW5jZT03LjE3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE2MiB4PTg2IHk9NDA0IHdpZHRoPTE1IGhlaWdodD0yOCB4b2Zmc2V0PTEuMDkgeW9mZnNldD02Ljk0IHhhZHZhbmNlPTE1LjI2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE2MyB4PTEyMyB5PTI5IHdpZHRoPTE2IGhlaWdodD0yNSB4b2Zmc2V0PTEuMDkgeW9mZnNldD04LjI5IHhhZHZhbmNlPTE2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE2NCB4PTEyMSB5PTExMiB3aWR0aD0xOSBoZWlnaHQ9MjMgeG9mZnNldD0xLjk1IHlvZmZzZXQ9OS41NCB4YWR2YW5jZT0yMC4wMyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xNjUgeD0xMzUgeT0yIHdpZHRoPTIyIGhlaWdodD0yNSB4b2Zmc2V0PTAuOTYgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTIxLjU3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE2NiB4PTkzIHk9MzU2IHdpZHRoPTUgaGVpZ2h0PTMzIHhvZmZzZXQ9Mi4zIHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT03LjQyIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE2NyB4PTEwMCB5PTM1NiB3aWR0aD0xNSBoZWlnaHQ9MjkgeG9mZnNldD0xLjE4IHlvZmZzZXQ9Ni44OCB4YWR2YW5jZT0xNC41OSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xNjggeD02MiB5PTIwOSB3aWR0aD0xMSBoZWlnaHQ9NiB4b2Zmc2V0PTIuNzggeW9mZnNldD04LjQ4IHhhZHZhbmNlPTEzLjUgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTY5IHg9MTQxIHk9Mjkgd2lkdGg9MjIgaGVpZ2h0PTI0IHhvZmZzZXQ9MS41NyB5b2Zmc2V0PTguNyB4YWR2YW5jZT0yMy4wNCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xNzAgeD0yOSB5PTQ5NiB3aWR0aD0xMiBoZWlnaHQ9MTIgeG9mZnNldD0xLjA2IHlvZmZzZXQ9Ny42OCB4YWR2YW5jZT0xMS4xNyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xNzEgeD0xMDIgeT00OTIgd2lkdGg9MTkgaGVpZ2h0PTE2IHhvZmZzZXQ9MC40OCB5b2Zmc2V0PTE1LjIgeGFkdmFuY2U9MTguMDIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTcyIHg9OTEgeT0zOTEgd2lkdGg9MTcgaGVpZ2h0PTExIHhvZmZzZXQ9Mi4xMSB5b2Zmc2V0PTE3Ljg5IHhhZHZhbmNlPTE5LjA3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE3MyB4PTY0IHk9MzI5IHdpZHRoPTEzIGhlaWdodD02IHhvZmZzZXQ9MS44MiB5b2Zmc2V0PTIwLjUxIHhhZHZhbmNlPTEzLjU3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE3NCB4PTE1OSB5PTIgd2lkdGg9MjIgaGVpZ2h0PTI0IHhvZmZzZXQ9MS41NyB5b2Zmc2V0PTguNyB4YWR2YW5jZT0yMy4wNCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xNzUgeD01NSB5PTUwNSB3aWR0aD0xOSBoZWlnaHQ9NSB4b2Zmc2V0PS0wLjA5IHlvZmZzZXQ9NC41OCB4YWR2YW5jZT0xNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xNzYgeD04NiB5PTI0MiB3aWR0aD0xMSBoZWlnaHQ9MTEgeG9mZnNldD0xLjA5IHlvZmZzZXQ9Ni43MiB4YWR2YW5jZT0xMC42NiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xNzcgeD04NiB5PTI3MiB3aWR0aD0xNCBoZWlnaHQ9MTggeG9mZnNldD0yLjA1IHlvZmZzZXQ9MTMuODYgeGFkdmFuY2U9MTUuOTQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTc4IHg9OTEgeT0yNTUgd2lkdGg9MTEgaGVpZ2h0PTE1IHhvZmZzZXQ9MC44IHlvZmZzZXQ9OC4yOSB4YWR2YW5jZT05LjczIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE3OSB4PTE1NCB5PTU1IHdpZHRoPTExIGhlaWdodD0xNSB4b2Zmc2V0PTAuNjEgeW9mZnNldD04LjI5IHhhZHZhbmNlPTkuOTIgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTgwIHg9MTU0IHk9NzIgd2lkdGg9OSBoZWlnaHQ9NyB4b2Zmc2V0PTEuODYgeW9mZnNldD03LjQ2IHhhZHZhbmNlPTkuNyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xODEgeD0xMDMgeT00MDQgd2lkdGg9MTggaGVpZ2h0PTI2IHhvZmZzZXQ9Mi4zNCB5b2Zmc2V0PTE1LjIgeGFkdmFuY2U9MTguOTEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTgyIHg9MTY1IHk9Mjggd2lkdGg9MjAgaGVpZ2h0PTI1IHhvZmZzZXQ9MS4wNiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTkuOSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xODMgeD05OSB5PTI0MiB3aWR0aD03IGhlaWdodD03IHhvZmZzZXQ9MS44MiB5b2Zmc2V0PTE5LjkgeGFkdmFuY2U9Ny42MiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xODQgeD0xMTAgeT0zODcgd2lkdGg9NyBoZWlnaHQ9NyB4b2Zmc2V0PTQuNjEgeW9mZnNldD0zMi42MSB4YWR2YW5jZT05LjcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTg1IHg9MTgzIHk9MiB3aWR0aD03IGhlaWdodD0xNSB4b2Zmc2V0PTAuNzQgeW9mZnNldD04LjU0IHhhZHZhbmNlPTYuOTEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTg2IHg9MTEyIHk9NDMyIHdpZHRoPTEyIGhlaWdodD0xMiB4b2Zmc2V0PTEuMDYgeW9mZnNldD03LjY4IHhhZHZhbmNlPTExLjg0IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE4NyB4PTEwNiB5PTIxMiB3aWR0aD0xOSBoZWlnaHQ9MTYgeG9mZnNldD0xLjMxIHlvZmZzZXQ9MTUuMiB4YWR2YW5jZT0xOC4wMiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xODggeD0xMjIgeT00NDYgd2lkdGg9MjMgaGVpZ2h0PTI4IHhvZmZzZXQ9MS4yNSB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MjIuOTQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTg5IHg9MTIzIHk9NDc2IHdpZHRoPTI0IGhlaWdodD0yOCB4b2Zmc2V0PTEuMTUgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTIzLjMzIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE5MCB4PTExMiB5PTE2NiB3aWR0aD0yOSBoZWlnaHQ9MjggeG9mZnNldD0xLjAyIHlvZmZzZXQ9OC4yOSB4YWR2YW5jZT0yOC4zMiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xOTEgeD0xMjkgeT0xMzcgd2lkdGg9MTQgaGVpZ2h0PTI3IHhvZmZzZXQ9MS45OCB5b2Zmc2V0PTE0Ljg4IHhhZHZhbmNlPTE0LjM3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE5MiB4PTEwMiB5PTI3MiB3aWR0aD0yMiBoZWlnaHQ9MzMgeG9mZnNldD0wLjIyIHlvZmZzZXQ9MC43NCB4YWR2YW5jZT0xOS43MSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xOTMgeD0xMDggeT0yMzAgd2lkdGg9MjIgaGVpZ2h0PTMzIHhvZmZzZXQ9MC4yMiB5b2Zmc2V0PTAuNzQgeGFkdmFuY2U9MTkuNzEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTk0IHg9MTAyIHk9MzA3IHdpZHRoPTIyIGhlaWdodD0zMyB4b2Zmc2V0PTAuMjIgeW9mZnNldD0wLjMyIHhhZHZhbmNlPTE5LjcxIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE5NSB4PTEyNyB5PTE5NiB3aWR0aD0yMiBoZWlnaHQ9MzIgeG9mZnNldD0wLjIyIHlvZmZzZXQ9MS43IHhhZHZhbmNlPTE5LjcxIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTE5NiB4PTExNyB5PTM0MiB3aWR0aD0yMiBoZWlnaHQ9MzIgeG9mZnNldD0wLjIyIHlvZmZzZXQ9MS43NiB4YWR2YW5jZT0xOS43MSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xOTcgeD0xMjMgeT0zNzYgd2lkdGg9MjIgaGVpZ2h0PTMzIHhvZmZzZXQ9MC4yMiB5b2Zmc2V0PTAgeGFkdmFuY2U9MTkuNzEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MTk4IHg9MTQzIHk9MTY2IHdpZHRoPTI5IGhlaWdodD0yNSB4b2Zmc2V0PS0wLjIyIHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0yNy42OCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0xOTkgeD0xMjYgeT00MTEgd2lkdGg9MjAgaGVpZ2h0PTMyIHhvZmZzZXQ9MS4yNSB5b2Zmc2V0PTguMDMgeGFkdmFuY2U9MTkuNzEgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjAwIHg9MTQ1IHk9MTEyIHdpZHRoPTE3IGhlaWdodD0zMyB4b2Zmc2V0PTIuNTYgeW9mZnNldD0wLjc0IHhhZHZhbmNlPTE3LjczIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIwMSB4PTEyNiB5PTI2NSB3aWR0aD0xNyBoZWlnaHQ9MzMgeG9mZnNldD0yLjU2IHlvZmZzZXQ9MC43NCB4YWR2YW5jZT0xNy43MyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMDIgeD0xMzIgeT0yMzAgd2lkdGg9MTcgaGVpZ2h0PTMzIHhvZmZzZXQ9Mi41NiB5b2Zmc2V0PTAuMzIgeGFkdmFuY2U9MTcuNzMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjAzIHg9MTI2IHk9MzAwIHdpZHRoPTE3IGhlaWdodD0zMiB4b2Zmc2V0PTIuNTYgeW9mZnNldD0xLjc2IHhhZHZhbmNlPTE3LjczIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIwNCB4PTE0MSB5PTMzNCB3aWR0aD05IGhlaWdodD0zMyB4b2Zmc2V0PTEuMTIgeW9mZnNldD0wLjc0IHhhZHZhbmNlPTguMTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjA1IHg9MTQ3IHk9MzY5IHdpZHRoPTkgaGVpZ2h0PTMzIHhvZmZzZXQ9MS4xMiB5b2Zmc2V0PTAuNzQgeGFkdmFuY2U9OC4xNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMDYgeD0xNDUgeT0yNjUgd2lkdGg9MTIgaGVpZ2h0PTMzIHhvZmZzZXQ9LTAuNjEgeW9mZnNldD0wLjMyIHhhZHZhbmNlPTguMTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjA3IHg9MTQ1IHk9MzAwIHdpZHRoPTExIGhlaWdodD0zMiB4b2Zmc2V0PTAuMTMgeW9mZnNldD0xLjc2IHhhZHZhbmNlPTguMTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjA4IHg9MTU1IHk9ODEgd2lkdGg9MjUgaGVpZ2h0PTI1IHhvZmZzZXQ9LTAuMjYgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTIzLjM2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIwOSB4PTE1MiB5PTMzNCB3aWR0aD0yMCBoZWlnaHQ9MzIgeG9mZnNldD0yLjU2IHlvZmZzZXQ9MS43IHhhZHZhbmNlPTIyLjUzIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIxMCB4PTE2NCB5PTEwOCB3aWR0aD0yNSBoZWlnaHQ9MzMgeG9mZnNldD0xLjI1IHlvZmZzZXQ9MC43NCB4YWR2YW5jZT0yNC41OCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMTEgeD0xODIgeT01NSB3aWR0aD0yNSBoZWlnaHQ9MzMgeG9mZnNldD0xLjI1IHlvZmZzZXQ9MC43NCB4YWR2YW5jZT0yNC41OCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMTIgeD0xODcgeT0xOSB3aWR0aD0yNSBoZWlnaHQ9MzQgeG9mZnNldD0xLjI1IHlvZmZzZXQ9MC4zMiB4YWR2YW5jZT0yNC41OCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMTMgeD0xNTggeT0zMDAgd2lkdGg9MjUgaGVpZ2h0PTMyIHhvZmZzZXQ9MS4yNSB5b2Zmc2V0PTEuNyB4YWR2YW5jZT0yNC41OCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMTQgeD0xNTEgeT0xOTMgd2lkdGg9MjUgaGVpZ2h0PTMyIHhvZmZzZXQ9MS4yNSB5b2Zmc2V0PTEuNzYgeGFkdmFuY2U9MjQuNTggcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjE1IHg9MTEyIHk9MTk2IHdpZHRoPTEzIGhlaWdodD0xMyB4b2Zmc2V0PTEuOTUgeW9mZnNldD0xNi45NiB4YWR2YW5jZT0xNC4wNSBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMTYgeD0xNDcgeT00NDUgd2lkdGg9MjUgaGVpZ2h0PTI2IHhvZmZzZXQ9MS4yNSB5b2Zmc2V0PTcuOTcgeGFkdmFuY2U9MjQuNTQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjE3IHg9MTUxIHk9MjI3IHdpZHRoPTIxIGhlaWdodD0zMyB4b2Zmc2V0PTIuMzQgeW9mZnNldD0wLjc0IHhhZHZhbmNlPTIzLjIzIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIxOCB4PTE1OSB5PTI2MiB3aWR0aD0yMSBoZWlnaHQ9MzMgeG9mZnNldD0yLjM0IHlvZmZzZXQ9MC43NCB4YWR2YW5jZT0yMy4yMyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMTkgeD0xNDkgeT00NzMgd2lkdGg9MjEgaGVpZ2h0PTM0IHhvZmZzZXQ9Mi4zNCB5b2Zmc2V0PTAuMzIgeGFkdmFuY2U9MjMuMjMgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjIwIHg9MTc0IHk9MjI3IHdpZHRoPTIxIGhlaWdodD0zMiB4b2Zmc2V0PTIuMzQgeW9mZnNldD0xLjc2IHhhZHZhbmNlPTIzLjIzIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIyMSB4PTE4MiB5PTI2MSB3aWR0aD0yMSBoZWlnaHQ9MzMgeG9mZnNldD0tMC4xIHlvZmZzZXQ9MC43NCB4YWR2YW5jZT0xOC4xNCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMjIgeD0xNzIgeT00NzMgd2lkdGg9MTggaGVpZ2h0PTI1IHhvZmZzZXQ9Mi41NiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTguMjQgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjIzIHg9MTQ4IHk9NDA0IHdpZHRoPTE5IGhlaWdodD0zMSB4b2Zmc2V0PTAuNTEgeW9mZnNldD02Ljg4IHhhZHZhbmNlPTE3LjgyIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIyNCB4PTE1OCB5PTM2OCB3aWR0aD0xNyBoZWlnaHQ9MjYgeG9mZnNldD0wLjc3IHlvZmZzZXQ9Ny40NiB4YWR2YW5jZT0xNS4zNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMjUgeD0xNzQgeT0zMzQgd2lkdGg9MTcgaGVpZ2h0PTI2IHhvZmZzZXQ9MC43NyB5b2Zmc2V0PTcuNDYgeGFkdmFuY2U9MTUuMzYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjI2IHg9MTg1IHk9Mjk2IHdpZHRoPTE3IGhlaWdodD0yNyB4b2Zmc2V0PTAuNzcgeW9mZnNldD03LjA0IHhhZHZhbmNlPTE1LjM2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIyNyB4PTE2OSB5PTM5NiB3aWR0aD0xNyBoZWlnaHQ9MjUgeG9mZnNldD0wLjc3IHlvZmZzZXQ9OC40MiB4YWR2YW5jZT0xNS4zNiBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMjggeD0xNzcgeT0zNjIgd2lkdGg9MTcgaGVpZ2h0PTI1IHhvZmZzZXQ9MC43NyB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTUuMzYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjI5IHg9MTkzIHk9MzI1IHdpZHRoPTE3IGhlaWdodD0yNyB4b2Zmc2V0PTAuNzcgeW9mZnNldD02LjcyIHhhZHZhbmNlPTE1LjM2IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIzMCB4PTE2OSB5PTQyMyB3aWR0aD0yNiBoZWlnaHQ9MTkgeG9mZnNldD0wLjcgeW9mZnNldD0xNC44OCB4YWR2YW5jZT0yNS41NCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMzEgeD0yMDQgeT0yOTYgd2lkdGg9MTUgaGVpZ2h0PTI1IHhvZmZzZXQ9MS4wNiB5b2Zmc2V0PTE0Ljg4IHhhZHZhbmNlPTE0LjUzIHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIzMiB4PTE3NCB5PTQ0NCB3aWR0aD0xNyBoZWlnaHQ9MjYgeG9mZnNldD0wLjk5IHlvZmZzZXQ9Ny40NiB4YWR2YW5jZT0xNi4zOCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMzMgeD0xODggeT0zODkgd2lkdGg9MTcgaGVpZ2h0PTI2IHhvZmZzZXQ9MC45OSB5b2Zmc2V0PTcuNDYgeGFkdmFuY2U9MTYuMzggcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjM0IHg9MTk2IHk9MzU0IHdpZHRoPTE3IGhlaWdodD0yNyB4b2Zmc2V0PTAuOTkgeW9mZnNldD03LjA0IHhhZHZhbmNlPTE2LjM4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIzNSB4PTIxMiB5PTMyMyB3aWR0aD0xNyBoZWlnaHQ9MjUgeG9mZnNldD0wLjk5IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xNi4zOCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yMzYgeD0xOTIgeT00NzIgd2lkdGg9OSBoZWlnaHQ9MjYgeG9mZnNldD0wLjQyIHlvZmZzZXQ9Ny40NiB4YWR2YW5jZT02Ljc4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIzNyB4PTE5MyB5PTQ0NCB3aWR0aD05IGhlaWdodD0yNiB4b2Zmc2V0PTAuNDIgeW9mZnNldD03LjQ2IHhhZHZhbmNlPTYuNzggcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjM4IHg9MjAzIHk9NDcyIHdpZHRoPTEyIGhlaWdodD0yNiB4b2Zmc2V0PS0xLjMxIHlvZmZzZXQ9Ny4wNCB4YWR2YW5jZT02Ljc4IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTIzOSB4PTE5NyB5PTQxNyB3aWR0aD0xMSBoZWlnaHQ9MjUgeG9mZnNldD0tMC41OCB5b2Zmc2V0PTguNDggeGFkdmFuY2U9Ni43OCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yNDAgeD0yMDQgeT00NDQgd2lkdGg9MTcgaGVpZ2h0PTI2IHhvZmZzZXQ9MC45IHlvZmZzZXQ9OC4xNiB4YWR2YW5jZT0xNi41NCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yNDEgeD0yMDcgeT0zODMgd2lkdGg9MTcgaGVpZ2h0PTI1IHhvZmZzZXQ9MS45NSB5b2Zmc2V0PTguNDIgeGFkdmFuY2U9MTcuODkgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjQyIHg9MjE1IHk9MzUwIHdpZHRoPTE4IGhlaWdodD0yNiB4b2Zmc2V0PTEuMDIgeW9mZnNldD03LjQ2IHhhZHZhbmNlPTE3LjYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjQzIHg9MjEwIHk9NDEwIHdpZHRoPTE4IGhlaWdodD0yNiB4b2Zmc2V0PTEuMDIgeW9mZnNldD03LjQ2IHhhZHZhbmNlPTE3LjYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjQ0IHg9MjI2IHk9Mzc4IHdpZHRoPTE4IGhlaWdodD0yNyB4b2Zmc2V0PTEuMDIgeW9mZnNldD03LjA0IHhhZHZhbmNlPTE3LjYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjQ1IHg9MjE3IHk9NDcyIHdpZHRoPTE4IGhlaWdodD0yNSB4b2Zmc2V0PTEuMDIgeW9mZnNldD04LjQyIHhhZHZhbmNlPTE3LjYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjQ2IHg9MjIzIHk9NDM4IHdpZHRoPTE4IGhlaWdodD0yNSB4b2Zmc2V0PTEuMDIgeW9mZnNldD04LjQ4IHhhZHZhbmNlPTE3LjYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjQ3IHg9MTY0IHk9MTQzIHdpZHRoPTE3IGhlaWdodD0xOSB4b2Zmc2V0PTIuMTEgeW9mZnNldD0xMy43OSB4YWR2YW5jZT0xOC45NCBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yNDggeD0xNzQgeT0xNjQgd2lkdGg9MTkgaGVpZ2h0PTIxIHhvZmZzZXQ9MS4wNiB5b2Zmc2V0PTEzLjc5IHhhZHZhbmNlPTE4LjI0IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTI0OSB4PTIzMCB5PTQwNyB3aWR0aD0xNiBoZWlnaHQ9MjYgeG9mZnNldD0xLjc5IHlvZmZzZXQ9Ny40NiB4YWR2YW5jZT0xNi43NyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yNTAgeD0xNzggeT0xODcgd2lkdGg9MTYgaGVpZ2h0PTI2IHhvZmZzZXQ9MS43OSB5b2Zmc2V0PTcuNDYgeGFkdmFuY2U9MTYuNzcgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjUxIHg9MjM3IHk9NDY1IHdpZHRoPTE2IGhlaWdodD0yNyB4b2Zmc2V0PTEuNzkgeW9mZnNldD03LjA0IHhhZHZhbmNlPTE2Ljc3IHBhZ2U9MCBjaG5sPTE1DQpjaGFyIGlkPTI1MiB4PTI0MyB5PTQzNSB3aWR0aD0xNiBoZWlnaHQ9MjUgeG9mZnNldD0xLjc5IHlvZmZzZXQ9OC40OCB4YWR2YW5jZT0xNi43NyBwYWdlPTAgY2hubD0xNQ0KY2hhciBpZD0yNTMgeD0yNTUgeT00NjIgd2lkdGg9MTggaGVpZ2h0PTM0IHhvZmZzZXQ9MC4yMiB5b2Zmc2V0PTcuNDYgeGFkdmFuY2U9MTYuMTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjU0IHg9MTkxIHk9OTAgd2lkdGg9MTggaGVpZ2h0PTM0IHhvZmZzZXQ9MS45MiB5b2Zmc2V0PTYuODggeGFkdmFuY2U9MTguNTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MjU1IHg9MjA5IHk9NTUgd2lkdGg9MTggaGVpZ2h0PTMzIHhvZmZzZXQ9MC4yMiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9MTYuMTYgcGFnZT0wIGNobmw9MTUNCmNoYXIgaWQ9MzIgeD0wIHk9MCB3aWR0aD0wIGhlaWdodD0wIHhvZmZzZXQ9MC4yMiB5b2Zmc2V0PTguNDggeGFkdmFuY2U9Ny4yIHBhZ2U9MCBjaG5sPTE1DQprZXJuaW5ncyBjb3VudD0xNzA3DQprZXJuaW5nIGZpcnN0PTM0IHNlY29uZD0zOCBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9MzQgc2Vjb25kPTQ0IGFtb3VudD0tMy41Mg0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9NDUgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9MzQgc2Vjb25kPTQ2IGFtb3VudD0tMy41Mg0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9NDcgYW1vdW50PS0xLjE1DQprZXJuaW5nIGZpcnN0PTM0IHNlY29uZD01MiBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MzQgc2Vjb25kPTU0IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9NjQgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9MzQgc2Vjb25kPTY1IGFtb3VudD0tMS4zOA0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9NzcgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTM0IHNlY29uZD05NyBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MzQgc2Vjb25kPTk5IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9MTAzIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9MTE1IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9MTcxIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0zNCBzZWNvbmQ9MTk4IGFtb3VudD0tMS43DQprZXJuaW5nIGZpcnN0PTM0IHNlY29uZD0yMzggYW1vdW50PTAuOTMNCmtlcm5pbmcgZmlyc3Q9MzQgc2Vjb25kPTI0MCBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MzQgc2Vjb25kPTgyMTggYW1vdW50PS0zLjUyDQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0zNCBhbW91bnQ9LTEuNDcNCmtlcm5pbmcgZmlyc3Q9Mzggc2Vjb25kPTg0IGFtb3VudD0tMS43Mw0Ka2VybmluZyBmaXJzdD0zOCBzZWNvbmQ9ODYgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD04NyBhbW91bnQ9LTAuNzQNCmtlcm5pbmcgZmlyc3Q9Mzggc2Vjb25kPTg5IGFtb3VudD0tMS43DQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0xMDIgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0xMDggYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0xMTYgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0xMTcgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0xMTggYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0xMTkgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0xMjEgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD0yMjMgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTM4IHNlY29uZD04MjE3IGFtb3VudD0tMS40Nw0Ka2VybmluZyBmaXJzdD0zOSBzZWNvbmQ9MjM4IGFtb3VudD0wLjkzDQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD00OCBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9NDAgc2Vjb25kPTUyIGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD01NCBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9NDAgc2Vjb25kPTU2IGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD00MCBzZWNvbmQ9NTcgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD02NiBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9NDAgc2Vjb25kPTY3IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD00MCBzZWNvbmQ9NjkgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD03NCBhbW91bnQ9MC43DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD03NyBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NDAgc2Vjb25kPTgzIGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD00MCBzZWNvbmQ9ODUgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD05NyBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD00MCBzZWNvbmQ9OTkgYW1vdW50PS0xLjAyDQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0xMDIgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0xMDMgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0xMDkgYW1vdW50PS0wLjc0DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0xMTUgYW1vdW50PS0wLjc0DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0xMTYgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9NDAgc2Vjb25kPTExNyBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9NDAgc2Vjb25kPTExOCBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD00MCBzZWNvbmQ9MTE5IGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD00MCBzZWNvbmQ9MTIxIGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0xMjIgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0yMjMgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0yNDAgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTQwIHNlY29uZD0zNTMgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTQyIHNlY29uZD03NyBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9NDIgc2Vjb25kPTg0IGFtb3VudD0wLjM1DQprZXJuaW5nIGZpcnN0PTQyIHNlY29uZD04NiBhbW91bnQ9MC41MQ0Ka2VybmluZyBmaXJzdD00MiBzZWNvbmQ9ODcgYW1vdW50PTAuMjkNCmtlcm5pbmcgZmlyc3Q9NDIgc2Vjb25kPTEwMyBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9NDIgc2Vjb25kPTE5OCBhbW91bnQ9LTEuNw0Ka2VybmluZyBmaXJzdD00MiBzZWNvbmQ9MjM2IGFtb3VudD0wLjUxDQprZXJuaW5nIGZpcnN0PTQyIHNlY29uZD0yMzcgYW1vdW50PTAuMzgNCmtlcm5pbmcgZmlyc3Q9NDIgc2Vjb25kPTIzOCBhbW91bnQ9Mi4wOA0Ka2VybmluZyBmaXJzdD00MiBzZWNvbmQ9MjM5IGFtb3VudD0xLjM4DQprZXJuaW5nIGZpcnN0PTQyIHNlY29uZD0yNDAgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTQzIHNlY29uZD00OSBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9NDMgc2Vjb25kPTUwIGFtb3VudD0tMS4yMg0Ka2VybmluZyBmaXJzdD00MyBzZWNvbmQ9NTEgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTQzIHNlY29uZD01NSBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9NDQgc2Vjb25kPTM0IGFtb3VudD0tMy41Mg0Ka2VybmluZyBmaXJzdD00NCBzZWNvbmQ9NDggYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTQ0IHNlY29uZD00OSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9NDQgc2Vjb25kPTgyMTYgYW1vdW50PS00LjIyDQprZXJuaW5nIGZpcnN0PTQ0IHNlY29uZD04MjE3IGFtb3VudD0tNC4zMg0Ka2VybmluZyBmaXJzdD00NSBzZWNvbmQ9MzQgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9NDUgc2Vjb25kPTgzIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD00NSBzZWNvbmQ9ODQgYW1vdW50PS0xLjI4DQprZXJuaW5nIGZpcnN0PTQ1IHNlY29uZD04NiBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9NDUgc2Vjb25kPTg3IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD00NSBzZWNvbmQ9ODggYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTQ1IHNlY29uZD04OSBhbW91bnQ9LTEuMDkNCmtlcm5pbmcgZmlyc3Q9NDUgc2Vjb25kPTkwIGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD00NSBzZWNvbmQ9MTAyIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD00NSBzZWNvbmQ9MTE2IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD00NSBzZWNvbmQ9MTIwIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD00NSBzZWNvbmQ9MTIyIGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTQ1IHNlY29uZD0yMjMgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTQ1IHNlY29uZD04MjE3IGFtb3VudD0tMi4wMg0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9MzQgYW1vdW50PS0zLjUyDQprZXJuaW5nIGZpcnN0PTQ2IHNlY29uZD00OCBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NDYgc2Vjb25kPTQ5IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9NjcgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTQ2IHNlY29uZD04NCBhbW91bnQ9LTEuMzQNCmtlcm5pbmcgZmlyc3Q9NDYgc2Vjb25kPTg1IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9ODYgYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTQ2IHNlY29uZD04NyBhbW91bnQ9LTAuOTYNCmtlcm5pbmcgZmlyc3Q9NDYgc2Vjb25kPTg5IGFtb3VudD0tMS4zMQ0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9MTAyIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9MTE2IGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9MTE4IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9MTE5IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9MTIxIGFtb3VudD0tMS4wOQ0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9MjIzIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD00NiBzZWNvbmQ9ODIxNiBhbW91bnQ9LTQuMjINCmtlcm5pbmcgZmlyc3Q9NDYgc2Vjb25kPTgyMTcgYW1vdW50PS00LjMyDQprZXJuaW5nIGZpcnN0PTQ3IHNlY29uZD00NyBhbW91bnQ9LTEuODkNCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTQ4IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD00NyBzZWNvbmQ9NTIgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTQ3IHNlY29uZD01NCBhbW91bnQ9LTAuOQ0Ka2VybmluZyBmaXJzdD00NyBzZWNvbmQ9NjUgYW1vdW50PS0xLjU0DQprZXJuaW5nIGZpcnN0PTQ3IHNlY29uZD02NyBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTc3IGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD00NyBzZWNvbmQ9ODkgYW1vdW50PTAuMjINCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTk3IGFtb3VudD0tMS4yMg0Ka2VybmluZyBmaXJzdD00NyBzZWNvbmQ9OTkgYW1vdW50PS0xLjM0DQprZXJuaW5nIGZpcnN0PTQ3IHNlY29uZD0xMDMgYW1vdW50PS0xLjIyDQprZXJuaW5nIGZpcnN0PTQ3IHNlY29uZD0xMDkgYW1vdW50PS0wLjkNCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTExNSBhbW91bnQ9LTEuMTINCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTExNyBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTEyMiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTE5OCBhbW91bnQ9LTEuNzMNCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTIzOCBhbW91bnQ9MC40Mg0Ka2VybmluZyBmaXJzdD00NyBzZWNvbmQ9MjM5IGFtb3VudD0wLjQ1DQprZXJuaW5nIGZpcnN0PTQ3IHNlY29uZD0yNDAgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9NDcgc2Vjb25kPTM1MyBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD00OCBzZWNvbmQ9NDEgYW1vdW50PS0wLjgzDQprZXJuaW5nIGZpcnN0PTQ4IHNlY29uZD00NCBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9NDggc2Vjb25kPTQ2IGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD00OCBzZWNvbmQ9NDcgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTQ4IHNlY29uZD01NSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9NDggc2Vjb25kPTY1IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD00OCBzZWNvbmQ9ODQgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTQ4IHNlY29uZD04NiBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NDggc2Vjb25kPTg4IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD00OCBzZWNvbmQ9ODkgYW1vdW50PS0wLjc0DQprZXJuaW5nIGZpcnN0PTQ4IHNlY29uZD05MCBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9NDggc2Vjb25kPTkzIGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD00OCBzZWNvbmQ9MTI1IGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD00OSBzZWNvbmQ9NDEgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTQ5IHNlY29uZD00MyBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9NTAgc2Vjb25kPTQzIGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD01MCBzZWNvbmQ9MTgzIGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD01MSBzZWNvbmQ9NDEgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTUyIHNlY29uZD0zNCBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9NTIgc2Vjb25kPTQxIGFtb3VudD0tMC42Nw0Ka2VybmluZyBmaXJzdD01MiBzZWNvbmQ9NDQgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTUyIHNlY29uZD00NiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9NTIgc2Vjb25kPTg0IGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD01MiBzZWNvbmQ9ODYgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTUyIHNlY29uZD04NyBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9NTIgc2Vjb25kPTg5IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD01MiBzZWNvbmQ9OTAgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTUyIHNlY29uZD0xMjIgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTUyIHNlY29uZD0xNzYgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTU0IHNlY29uZD00MSBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NTQgc2Vjb25kPTQ5IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD01NCBzZWNvbmQ9NTUgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTU0IHNlY29uZD04NCBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD01NCBzZWNvbmQ9ODYgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTU0IHNlY29uZD04NyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9NTQgc2Vjb25kPTg5IGFtb3VudD0tMC42Nw0Ka2VybmluZyBmaXJzdD01NCBzZWNvbmQ9MTIxIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD01NCBzZWNvbmQ9MTc2IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9MzUgYW1vdW50PS0wLjkNCmtlcm5pbmcgZmlyc3Q9NTUgc2Vjb25kPTQzIGFtb3VudD0tMS4xNQ0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9NDQgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD00NiBhbW91bnQ9LTEuMjUNCmtlcm5pbmcgZmlyc3Q9NTUgc2Vjb25kPTQ3IGFtb3VudD0tMS43OQ0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9NDggYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD01MiBhbW91bnQ9LTEuMTINCmtlcm5pbmcgZmlyc3Q9NTUgc2Vjb25kPTU0IGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9NjUgYW1vdW50PS0xLjQ3DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD02NyBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NTUgc2Vjb25kPTc3IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9ODQgYW1vdW50PTAuNTQNCmtlcm5pbmcgZmlyc3Q9NTUgc2Vjb25kPTg2IGFtb3VudD0wLjk2DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD04NyBhbW91bnQ9MC42MQ0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9ODggYW1vdW50PTAuNw0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9ODkgYW1vdW50PTEuMDYNCmtlcm5pbmcgZmlyc3Q9NTUgc2Vjb25kPTkzIGFtb3VudD0wLjgNCmtlcm5pbmcgZmlyc3Q9NTUgc2Vjb25kPTk3IGFtb3VudD0tMS4wNg0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9OTkgYW1vdW50PS0xLjIyDQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD0xMDMgYW1vdW50PS0xLjA5DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD0xMDkgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD0xMTUgYW1vdW50PS0xLjAyDQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD0xMTcgYW1vdW50PS0wLjc0DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD0xMjIgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTU1IHNlY29uZD0xMjUgYW1vdW50PTAuOQ0Ka2VybmluZyBmaXJzdD01NSBzZWNvbmQ9MTgzIGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD01NiBzZWNvbmQ9NDEgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTU2IHNlY29uZD04NCBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9NTYgc2Vjb25kPTg5IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD01NyBzZWNvbmQ9NDEgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTU3IHNlY29uZD00NCBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD01NyBzZWNvbmQ9NDYgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9NTcgc2Vjb25kPTQ3IGFtb3VudD0tMC45OQ0Ka2VybmluZyBmaXJzdD01NyBzZWNvbmQ9NjUgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTU3IHNlY29uZD03NyBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NTcgc2Vjb25kPTkwIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD02MSBzZWNvbmQ9NTAgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTYxIHNlY29uZD01NSBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9NjQgc2Vjb25kPTM0IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD02NCBzZWNvbmQ9ODQgYW1vdW50PS0xLjcNCmtlcm5pbmcgZmlyc3Q9NjQgc2Vjb25kPTg2IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD02NCBzZWNvbmQ9ODcgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTY0IHNlY29uZD04OCBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9NjQgc2Vjb25kPTg5IGFtb3VudD0tMS40NA0Ka2VybmluZyBmaXJzdD02NCBzZWNvbmQ9OTAgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTY0IHNlY29uZD04MjE3IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MzQgYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD00MiBhbW91bnQ9LTEuNDENCmtlcm5pbmcgZmlyc3Q9NjUgc2Vjb25kPTQ5IGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9NTcgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD02MyBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NjUgc2Vjb25kPTY3IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9ODQgYW1vdW50PS0xLjczDQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD04NSBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9NjUgc2Vjb25kPTg2IGFtb3VudD0tMS41Nw0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9ODcgYW1vdW50PS0xLjE4DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD04OSBhbW91bnQ9LTIuMDUNCmtlcm5pbmcgZmlyc3Q9NjUgc2Vjb25kPTk5IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MTAyIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MTAzIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MTA4IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MTE2IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MTE3IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MTE4IGFtb3VudD0tMS4xMg0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9MTE5IGFtb3VudD0tMC45DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD0xMjEgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD0xMjUgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD0xNzEgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD0xNzQgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD0yMjMgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD0yNDAgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTY1IHNlY29uZD04MjE2IGFtb3VudD0tMS42Mw0Ka2VybmluZyBmaXJzdD02NSBzZWNvbmQ9ODIxNyBhbW91bnQ9LTEuNjYNCmtlcm5pbmcgZmlyc3Q9NjUgc2Vjb25kPTg0ODIgYW1vdW50PS0xLjQxDQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD00MSBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD02NiBzZWNvbmQ9NDIgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD01MCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTU1IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD02NiBzZWNvbmQ9NjMgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD04MyBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTg0IGFtb3VudD0tMC45DQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD04NiBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTg3IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD02NiBzZWNvbmQ9ODggYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD04OSBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTkwIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD02NiBzZWNvbmQ9OTMgYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD05OCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTEwMiBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTEwMyBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTEwNSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTEwOCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTEwOSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTExNSBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTExNiBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTExNyBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTExOCBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTExOSBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9NjYgc2Vjb25kPTEyMCBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD02NiBzZWNvbmQ9MTIxIGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD02NiBzZWNvbmQ9MTIyIGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD02NiBzZWNvbmQ9MTI1IGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD0xOTggYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD0yMjMgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTY2IHNlY29uZD04NDgyIGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD02NyBzZWNvbmQ9NDUgYW1vdW50PS0xLjk1DQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD01MiBhbW91bnQ9LTEuNTcNCmtlcm5pbmcgZmlyc3Q9Njcgc2Vjb25kPTY3IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD02NyBzZWNvbmQ9OTkgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMDIgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMDMgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMDkgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMTYgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMTcgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMTggYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMTkgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xMjEgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0xNzEgYW1vdW50PS0wLjk2DQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0yMjMgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTY3IHNlY29uZD0yMzggYW1vdW50PTAuOTkNCmtlcm5pbmcgZmlyc3Q9Njcgc2Vjb25kPTIzOSBhbW91bnQ9MC4zOA0Ka2VybmluZyBmaXJzdD02NyBzZWNvbmQ9MjQwIGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9NDEgYW1vdW50PS0wLjkNCmtlcm5pbmcgZmlyc3Q9Njggc2Vjb25kPTQ0IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9NDYgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTY4IHNlY29uZD00NyBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9Njggc2Vjb25kPTUxIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9NTUgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTY4IHNlY29uZD02MyBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9Njggc2Vjb25kPTY1IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9NzcgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTY4IHNlY29uZD04NCBhbW91bnQ9LTAuOQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9ODYgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTY4IHNlY29uZD04NyBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9Njggc2Vjb25kPTg4IGFtb3VudD0tMC45OQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9ODkgYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTY4IHNlY29uZD05MCBhbW91bnQ9LTAuNjcNCmtlcm5pbmcgZmlyc3Q9Njggc2Vjb25kPTkzIGFtb3VudD0tMS4wMg0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9OTcgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTY4IHNlY29uZD05OCBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9Njggc2Vjb25kPTk5IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTAzIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTA1IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTA4IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTA5IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTE1IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTE3IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTIwIGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTIyIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTI1IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MTk4IGFtb3VudD0tMC45Ng0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MjIzIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9MjQwIGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD02OCBzZWNvbmQ9ODIxNyBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9Njggc2Vjb25kPTgyMTggYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTY4IHNlY29uZD04NDgyIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD02OSBzZWNvbmQ9NDUgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD01MiBhbW91bnQ9LTEuMTUNCmtlcm5pbmcgZmlyc3Q9Njkgc2Vjb25kPTY3IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD02OSBzZWNvbmQ9OTkgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMDIgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMDMgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMDkgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMTUgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMTYgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMTcgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMTggYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMTkgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xMjEgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xNzEgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0xNzQgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0yMjMgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTY5IHNlY29uZD0yMzggYW1vdW50PTAuNjcNCmtlcm5pbmcgZmlyc3Q9Njkgc2Vjb25kPTI0MCBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTM4IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9NDIgYW1vdW50PTAuMzUNCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTQ0IGFtb3VudD0tMi4yNA0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9NDYgYW1vdW50PS0yLjI0DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD00NyBhbW91bnQ9LTEuODINCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTUyIGFtb3VudD0tMS4wNg0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9NTQgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD01OCBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTU5IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9NjQgYW1vdW50PS0xLjA5DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD02NSBhbW91bnQ9LTEuNw0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9NjcgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD03NyBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTg0IGFtb3VudD0wLjE2DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD05MyBhbW91bnQ9MC41MQ0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9OTcgYW1vdW50PS0xLjgyDQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD05OCBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTk5IGFtb3VudD0tMS40MQ0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTAyIGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTAzIGFtb3VudD0tMS4yOA0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTA1IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTA5IGFtb3VudD0tMS40NA0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTE1IGFtb3VudD0tMS4yNQ0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTE2IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTE3IGFtb3VudD0tMS4yNQ0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTE4IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTE5IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTIwIGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTIxIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTIyIGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MTI1IGFtb3VudD0wLjYxDQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD0xNzEgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD0xODcgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD0xOTggYW1vdW50PS0zLjIzDQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD0yMjMgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD0yMjcgYW1vdW50PS0xLjYNCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTIzOCBhbW91bnQ9MS42Ng0Ka2VybmluZyBmaXJzdD03MCBzZWNvbmQ9MjM5IGFtb3VudD0wLjkNCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTI0MCBhbW91bnQ9LTEuMDkNCmtlcm5pbmcgZmlyc3Q9NzAgc2Vjb25kPTgyMTggYW1vdW50PS0yLjI0DQprZXJuaW5nIGZpcnN0PTcwIHNlY29uZD04NDgyIGFtb3VudD0wLjUxDQprZXJuaW5nIGZpcnN0PTcxIHNlY29uZD00MSBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTg0IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD03MSBzZWNvbmQ9OTggYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTcxIHNlY29uZD05OSBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTEwMiBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTEwMyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTEwNSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTEwOCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTEwOSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTExNiBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTExNyBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTExOCBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTExOSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTEyMSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTEyMiBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9NzEgc2Vjb25kPTIyMyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9NzIgc2Vjb25kPTQxIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD03MiBzZWNvbmQ9NzcgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD05NyBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NzIgc2Vjb25kPTk4IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03MiBzZWNvbmQ9OTkgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMDIgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMDMgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMDUgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMDggYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMDkgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMTUgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMTYgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMTcgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMTggYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMTkgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMjEgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0xMjIgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0yMjMgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTcyIHNlY29uZD0yNDAgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTc0IHNlY29uZD00MSBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NzQgc2Vjb25kPTc3IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9OTcgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTc0IHNlY29uZD05OCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9NzQgc2Vjb25kPTk5IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTAyIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTAzIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTA1IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTA4IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTA5IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTE1IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTE2IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTE3IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTE4IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTE5IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTIxIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MTIyIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MjIzIGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD03NCBzZWNvbmQ9MjQwIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD03NSBzZWNvbmQ9MzggYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD00MiBhbW91bnQ9MC4yOQ0Ka2VybmluZyBmaXJzdD03NSBzZWNvbmQ9NDUgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD02NyBhbW91bnQ9LTAuOQ0Ka2VybmluZyBmaXJzdD03NSBzZWNvbmQ9ODMgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD05MyBhbW91bnQ9MS4wNg0Ka2VybmluZyBmaXJzdD03NSBzZWNvbmQ9OTkgYW1vdW50PS0xLjA5DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMDIgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMDMgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMTYgYW1vdW50PS0wLjg2DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMTcgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMTggYW1vdW50PS0xLjc2DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMTkgYW1vdW50PS0xLjQ0DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMjEgYW1vdW50PS0xLjgyDQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0xMjUgYW1vdW50PTEuMDYNCmtlcm5pbmcgZmlyc3Q9NzUgc2Vjb25kPTE3MSBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9NzUgc2Vjb25kPTE3NCBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9NzUgc2Vjb25kPTIyMyBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9NzUgc2Vjb25kPTIzNiBhbW91bnQ9MC4zMg0Ka2VybmluZyBmaXJzdD03NSBzZWNvbmQ9MjM4IGFtb3VudD0wLjc3DQprZXJuaW5nIGZpcnN0PTc1IHNlY29uZD0yMzkgYW1vdW50PTEuMzENCmtlcm5pbmcgZmlyc3Q9NzUgc2Vjb25kPTI0MCBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9NzUgc2Vjb25kPTg0ODIgYW1vdW50PTAuODYNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTM0IGFtb3VudD0tMi44OA0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9NDIgYW1vdW50PS0yLjg4DQprZXJuaW5nIGZpcnN0PTc2IHNlY29uZD00NSBhbW91bnQ9LTEuOTINCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTQ4IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9NDkgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTc2IHNlY29uZD01MiBhbW91bnQ9LTEuOTgNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTU3IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9NjMgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTY3IGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9ODQgYW1vdW50PS0yLjE0DQprZXJuaW5nIGZpcnN0PTc2IHNlY29uZD04NSBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTg2IGFtb3VudD0tMy4yNg0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9ODcgYW1vdW50PS0xLjcNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTg5IGFtb3VudD0tMy4xNA0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9OTMgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTc2IHNlY29uZD05OSBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTEwMiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTEwMyBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTExNiBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTExNyBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTExOCBhbW91bnQ9LTEuODINCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTExOSBhbW91bnQ9LTEuNDENCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTEyMSBhbW91bnQ9LTIuNA0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9MTI1IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9MTcxIGFtb3VudD0tMS4wOQ0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9MTc0IGFtb3VudD0tMS4xNQ0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9MTgzIGFtb3VudD0tMS44Ng0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9MjIzIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD03NiBzZWNvbmQ9ODIxNiBhbW91bnQ9LTIuODUNCmtlcm5pbmcgZmlyc3Q9NzYgc2Vjb25kPTgyMTcgYW1vdW50PS0yLjg1DQprZXJuaW5nIGZpcnN0PTc2IHNlY29uZD04NDgyIGFtb3VudD0tMi44OA0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MzQgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD00MSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9Nzcgc2Vjb25kPTQyIGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9NDkgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD02MyBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9Nzcgc2Vjb25kPTY2IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9NjcgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD02OSBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9Nzcgc2Vjb25kPTc0IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9ODQgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9Nzcgc2Vjb25kPTg1IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9ODYgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD04NyBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9Nzcgc2Vjb25kPTg5IGFtb3VudD0tMC43NA0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9OTcgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD05OCBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9Nzcgc2Vjb25kPTk5IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTAyIGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTAzIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTA1IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTA4IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTA5IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTE1IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTE2IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTE3IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9MTE4IGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD0xMTkgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD0xMjEgYW1vdW50PS0wLjc0DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD0xMjIgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD0yMjMgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD0yNDAgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTc3IHNlY29uZD04MjE2IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD03NyBzZWNvbmQ9ODIxNyBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9Nzcgc2Vjb25kPTg0ODIgYW1vdW50PS0wLjYxDQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD00MSBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTQ0IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD03OSBzZWNvbmQ9NDYgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD00NyBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTU1IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD03OSBzZWNvbmQ9NjMgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD02NSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTc3IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD03OSBzZWNvbmQ9ODQgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD04NiBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTg3IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD03OSBzZWNvbmQ9ODggYW1vdW50PS0wLjg2DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD04OSBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTkwIGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD03OSBzZWNvbmQ9OTMgYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD05NyBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTk4IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD03OSBzZWNvbmQ9OTkgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMDMgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMDUgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMDggYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMDkgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMTUgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMTcgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMjAgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMjIgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD0xMjUgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTE5OCBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTIyMyBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTI0MCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9Nzkgc2Vjb25kPTgyMTcgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTc5IHNlY29uZD04MjE4IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD03OSBzZWNvbmQ9ODQ4MiBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTM4IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD04MCBzZWNvbmQ9NDEgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTgwIHNlY29uZD00NCBhbW91bnQ9LTIuNTkNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTQ2IGFtb3VudD0tMi41OQ0Ka2VybmluZyBmaXJzdD04MCBzZWNvbmQ9NDcgYW1vdW50PS0xLjQ3DQprZXJuaW5nIGZpcnN0PTgwIHNlY29uZD01MSBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTUyIGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD04MCBzZWNvbmQ9NjQgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTgwIHNlY29uZD02NSBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTc3IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD04MCBzZWNvbmQ9ODggYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTgwIHNlY29uZD05MCBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTk3IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD04MCBzZWNvbmQ9OTggYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTgwIHNlY29uZD05OSBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTEwMyBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTEwNSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTEwOCBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTEwOSBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTExNSBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTExNyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTE5OCBhbW91bnQ9LTIuMjENCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTIzOCBhbW91bnQ9MC44DQprZXJuaW5nIGZpcnN0PTgwIHNlY29uZD0yMzkgYW1vdW50PTAuMTMNCmtlcm5pbmcgZmlyc3Q9ODAgc2Vjb25kPTI0MCBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD04MCBzZWNvbmQ9ODIxOCBhbW91bnQ9LTIuNTkNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTUyIGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTgyIHNlY29uZD04NCBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTg2IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD04MiBzZWNvbmQ9ODkgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTgyIHNlY29uZD05MyBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTk3IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD04MiBzZWNvbmQ9OTggYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTgyIHNlY29uZD05OSBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTEwMiBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTEwMyBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTEwNSBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTEwOCBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTEwOSBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTExNiBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTExNyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTExOCBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTExOSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTEyMSBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTEyNSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTE3MSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTIyMyBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9ODIgc2Vjb25kPTI0MCBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTQxIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD04MyBzZWNvbmQ9ODggYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTgzIHNlY29uZD05OCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEwMiBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEwMyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEwNSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEwOCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEwOSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTExNSBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTExNiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTExNyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTExOCBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTExOSBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEyMCBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEyMSBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTEyMiBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9ODMgc2Vjb25kPTIyMyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTM4IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9NDIgYW1vdW50PTAuMzgNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTQ0IGFtb3VudD0tMS4zOA0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9NDUgYW1vdW50PS0xLjI4DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD00NiBhbW91bnQ9LTEuMzQNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTQ3IGFtb3VudD0tMS42Mw0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9NDggYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD01MiBhbW91bnQ9LTEuNDQNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTU0IGFtb3VudD0tMS4yMg0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9NTYgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD01OCBhbW91bnQ9LTEuMDkNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTU5IGFtb3VudD0tMS4wOQ0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9NjQgYW1vdW50PS0xLjg5DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD02NSBhbW91bnQ9LTEuNzMNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTY3IGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9NzcgYW1vdW50PS0wLjgzDQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD05MyBhbW91bnQ9MC41OA0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9OTcgYW1vdW50PS0xLjk1DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD05OCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTk5IGFtb3VudD0tMi41Mw0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9MTAyIGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMDMgYW1vdW50PS0yLjU5DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMDUgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMDggYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMDkgYW1vdW50PS0yLjgyDQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMTUgYW1vdW50PS0xLjg5DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMTYgYW1vdW50PS0wLjgzDQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMTcgYW1vdW50PS0yLjc4DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMTggYW1vdW50PS0yLjY2DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMTkgYW1vdW50PS0yLjM3DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMjAgYW1vdW50PS0yLjc1DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMjEgYW1vdW50PS0yLjcyDQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMjIgYW1vdW50PS0xLjU0DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0xMjUgYW1vdW50PTAuNjcNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTE3MSBhbW91bnQ9LTEuOTUNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTE3NCBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTE4NyBhbW91bnQ9LTEuODkNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTE5OCBhbW91bnQ9LTIuMzQNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTIyMyBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTIyNyBhbW91bnQ9LTEuNw0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9MjM2IGFtb3VudD0tMC4wNg0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9MjM3IGFtb3VudD0tMC4wNg0Ka2VybmluZyBmaXJzdD04NCBzZWNvbmQ9MjM4IGFtb3VudD0xLjY2DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD0yMzkgYW1vdW50PTAuOTYNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTI0MCBhbW91bnQ9LTEuMzENCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTI1NCBhbW91bnQ9LTEuNTQNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTM1MyBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9ODQgc2Vjb25kPTgyMTggYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTg0IHNlY29uZD04NDgyIGFtb3VudD0wLjUxDQprZXJuaW5nIGZpcnN0PTg1IHNlY29uZD00MSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9ODUgc2Vjb25kPTQ0IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9NDYgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTg1IHNlY29uZD00NyBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9NjUgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTg1IHNlY29uZD03NyBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODUgc2Vjb25kPTkwIGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9OTcgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTg1IHNlY29uZD05OCBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9ODUgc2Vjb25kPTk5IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTAyIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTAzIGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTA1IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTA4IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTA5IGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTE1IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTE2IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTE3IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTE4IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTE5IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTIwIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTIxIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTIyIGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MTk4IGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MjIzIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MjM4IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9MjQwIGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD04NSBzZWNvbmQ9ODIxOCBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTM4IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9NDIgYW1vdW50PTAuNTENCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTQ0IGFtb3VudD0tMS4zOA0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9NDUgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD00NiBhbW91bnQ9LTEuMzgNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTQ3IGFtb3VudD0tMS43Ng0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9NDggYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD01MiBhbW91bnQ9LTEuMTUNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTU0IGFtb3VudD0tMC44Mw0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9NTkgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD02NCBhbW91bnQ9LTEuMzgNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTY1IGFtb3VudD0tMS41Nw0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9NjcgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD03NyBhbW91bnQ9LTAuNjcNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTkzIGFtb3VudD0wLjkzDQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD05NyBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTk5IGFtb3VudD0tMS45Mg0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9MTAyIGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9MTAzIGFtb3VudD0tMS43DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMDkgYW1vdW50PS0xLjE1DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMTUgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMTYgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMTcgYW1vdW50PS0xLjE1DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMTggYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMTkgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMjAgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMjEgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMjIgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0xMjUgYW1vdW50PTAuOTMNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTE3MSBhbW91bnQ9LTEuMTUNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTE3NCBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTE4NyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTE5OCBhbW91bnQ9LTEuOTINCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTIyMyBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTIzNiBhbW91bnQ9MC4yOQ0Ka2VybmluZyBmaXJzdD04NiBzZWNvbmQ9MjM4IGFtb3VudD0xLjQxDQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD0yMzkgYW1vdW50PTEuMjgNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTI0MCBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTM1MyBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9ODYgc2Vjb25kPTgyMTggYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTg2IHNlY29uZD04NDgyIGFtb3VudD0wLjgzDQprZXJuaW5nIGZpcnN0PTg3IHNlY29uZD0zOCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTQyIGFtb3VudD0wLjU0DQprZXJuaW5nIGZpcnN0PTg3IHNlY29uZD00NCBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTQ1IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9NDYgYW1vdW50PS0wLjk2DQprZXJuaW5nIGZpcnN0PTg3IHNlY29uZD00NyBhbW91bnQ9LTEuMzENCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTUyIGFtb3VudD0tMC43NA0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9NTQgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTg3IHNlY29uZD02NCBhbW91bnQ9LTEuMDYNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTY1IGFtb3VudD0tMS4xOA0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9NjcgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTg3IHNlY29uZD03NyBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTkzIGFtb3VudD0wLjgzDQprZXJuaW5nIGZpcnN0PTg3IHNlY29uZD05NyBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTk5IGFtb3VudD0tMS4yNQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTAyIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTAzIGFtb3VudD0tMS4yOA0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTA1IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTA5IGFtb3VudD0tMS4wMg0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTE1IGFtb3VudD0tMS4xOA0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTE2IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTE3IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTE4IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTE5IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTIwIGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTIxIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTIyIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MTI1IGFtb3VudD0wLjkNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTE3MSBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTE5OCBhbW91bnQ9LTEuNQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MjIzIGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MjM2IGFtb3VudD0wLjEzDQprZXJuaW5nIGZpcnN0PTg3IHNlY29uZD0yMzggYW1vdW50PTEuNDENCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTIzOSBhbW91bnQ9MS4xNQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9MjQwIGFtb3VudD0tMS4wOQ0Ka2VybmluZyBmaXJzdD04NyBzZWNvbmQ9ODIxOCBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9ODcgc2Vjb25kPTg0ODIgYW1vdW50PTAuNzQNCmtlcm5pbmcgZmlyc3Q9ODggc2Vjb25kPTM4IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9NDUgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTg4IHNlY29uZD02NyBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9ODggc2Vjb25kPTgzIGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9OTMgYW1vdW50PTAuOTkNCmtlcm5pbmcgZmlyc3Q9ODggc2Vjb25kPTk5IGFtb3VudD0tMS4wNg0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MTAyIGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MTAzIGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MTE2IGFtb3VudD0tMC45DQprZXJuaW5nIGZpcnN0PTg4IHNlY29uZD0xMTcgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTg4IHNlY29uZD0xMTggYW1vdW50PS0xLjU3DQprZXJuaW5nIGZpcnN0PTg4IHNlY29uZD0xMTkgYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTg4IHNlY29uZD0xMjEgYW1vdW50PS0xLjYNCmtlcm5pbmcgZmlyc3Q9ODggc2Vjb25kPTEyNSBhbW91bnQ9MC45OQ0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MTcxIGFtb3VudD0tMC45Ng0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MTc0IGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MjIzIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MjM2IGFtb3VudD0wLjIyDQprZXJuaW5nIGZpcnN0PTg4IHNlY29uZD0yMzggYW1vdW50PTAuNzQNCmtlcm5pbmcgZmlyc3Q9ODggc2Vjb25kPTIzOSBhbW91bnQ9MS4yMg0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9MjQwIGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD04OCBzZWNvbmQ9ODQ4MiBhbW91bnQ9MC43Nw0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MzggYW1vdW50PS0wLjYxDQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD00MiBhbW91bnQ9MC40Mg0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9NDQgYW1vdW50PS0xLjMxDQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD00NSBhbW91bnQ9LTEuMDkNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTQ2IGFtb3VudD0tMS4zMQ0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9NDcgYW1vdW50PS0xLjc2DQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD00OCBhbW91bnQ9LTAuNzQNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTUyIGFtb3VudD0tMS42DQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD01NCBhbW91bnQ9LTEuMjINCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTU2IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9NTggYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD01OSBhbW91bnQ9LTAuNjcNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTYzIGFtb3VudD0wLjQyDQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD02NCBhbW91bnQ9LTEuODYNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTY1IGFtb3VudD0tMi4wNQ0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9NjcgYW1vdW50PS0wLjgzDQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD03NyBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTkzIGFtb3VudD0wLjk5DQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD05NyBhbW91bnQ9LTIuMTQNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTk5IGFtb3VudD0tMi43Mg0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTAyIGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTAzIGFtb3VudD0tMi40Mw0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTA5IGFtb3VudD0tMi4yMQ0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTE1IGFtb3VudD0tMi4yNA0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTE2IGFtb3VudD0tMS4xMg0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTE3IGFtb3VudD0tMi4xMQ0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTE4IGFtb3VudD0tMS4zMQ0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTE5IGFtb3VudD0tMS4yOA0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTIwIGFtb3VudD0tMS4zNA0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTIxIGFtb3VudD0tMS4yNQ0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTIyIGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MTI1IGFtb3VudD0xLjA2DQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD0xNzEgYW1vdW50PS0xLjg2DQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD0xNzQgYW1vdW50PS0wLjgzDQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD0xODcgYW1vdW50PS0wLjk5DQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD0xOTggYW1vdW50PS0yLjQzDQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD0yMjMgYW1vdW50PS0wLjgzDQprZXJuaW5nIGZpcnN0PTg5IHNlY29uZD0yMzYgYW1vdW50PTAuNTENCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTIzOCBhbW91bnQ9MS4yMg0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9MjM5IGFtb3VudD0xLjUNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTI0MCBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTI1NCBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTM1MyBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD04OSBzZWNvbmQ9ODIxOCBhbW91bnQ9LTEuMzENCmtlcm5pbmcgZmlyc3Q9ODkgc2Vjb25kPTg0ODIgYW1vdW50PTEuMDYNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTQ1IGFtb3VudD0tMS4yNQ0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9NDggYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTkwIHNlY29uZD01MiBhbW91bnQ9LTEuODINCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTU0IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9NjcgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTkwIHNlY29uZD05MyBhbW91bnQ9MC43NA0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9OTcgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTkwIHNlY29uZD05OSBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTEwMiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTEwMyBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTEwNSBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTEwOSBhbW91bnQ9LTAuNjcNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTExNSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTExNiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTExNyBhbW91bnQ9LTEuMDINCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTExOCBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTExOSBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTEyMSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTEyMiBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTEyNSBhbW91bnQ9MC43NA0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9MTcxIGFtb3VudD0tMS4zNA0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9MTc0IGFtb3VudD0tMC43NA0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9MjIzIGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9MjM2IGFtb3VudD0wLjE5DQprZXJuaW5nIGZpcnN0PTkwIHNlY29uZD0yMzggYW1vdW50PTAuOTMNCmtlcm5pbmcgZmlyc3Q9OTAgc2Vjb25kPTIzOSBhbW91bnQ9MS4xOA0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9MjQwIGFtb3VudD0tMC42Nw0Ka2VybmluZyBmaXJzdD05MCBzZWNvbmQ9ODQ4MiBhbW91bnQ9MC43Nw0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9NDggYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD01MiBhbW91bnQ9LTAuOQ0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9NTQgYW1vdW50PS0wLjg2DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD01NiBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9OTEgc2Vjb25kPTY1IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9NjcgYW1vdW50PS0wLjk2DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD03NCBhbW91bnQ9MS41Nw0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9NzcgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD04NCBhbW91bnQ9MC43DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD04NiBhbW91bnQ9MC45OQ0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9ODcgYW1vdW50PTAuODYNCmtlcm5pbmcgZmlyc3Q9OTEgc2Vjb25kPTg4IGFtb3VudD0wLjkNCmtlcm5pbmcgZmlyc3Q9OTEgc2Vjb25kPTg5IGFtb3VudD0xLjE1DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD05NyBhbW91bnQ9LTEuMjINCmtlcm5pbmcgZmlyc3Q9OTEgc2Vjb25kPTk5IGFtb3VudD0tMS4zOA0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9MTA2IGFtb3VudD0wLjIyDQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMDkgYW1vdW50PS0xLjM0DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMTIgYW1vdW50PS0xLjA2DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMTUgYW1vdW50PS0xLjIyDQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMTYgYW1vdW50PS0xLjAyDQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMTcgYW1vdW50PS0xLjMxDQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMTggYW1vdW50PS0xLjI4DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMTkgYW1vdW50PS0xLjIyDQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMjAgYW1vdW50PS0wLjk2DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMjEgYW1vdW50PS0xLjI4DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xMjIgYW1vdW50PS0xLjE4DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0xOTggYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0yMjMgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0yMjcgYW1vdW50PS0wLjkNCmtlcm5pbmcgZmlyc3Q9OTEgc2Vjb25kPTIzNiBhbW91bnQ9MC40OA0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9MjM4IGFtb3VudD0xLjA5DQprZXJuaW5nIGZpcnN0PTkxIHNlY29uZD0yMzkgYW1vdW50PTEuNDQNCmtlcm5pbmcgZmlyc3Q9OTEgc2Vjb25kPTI0MCBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9MjU0IGFtb3VudD0tMC4xMw0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9MzUzIGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD05MSBzZWNvbmQ9MzgyIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9MzQgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTM4IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9NDEgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD00MiBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9NDkgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTU3IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9NjMgYW1vdW50PS0wLjg2DQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD02NiBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTY3IGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9NjkgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD03NCBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTc3IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9ODMgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD04NCBhbW91bnQ9LTIuNjYNCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTg1IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9ODYgYW1vdW50PS0yLjAyDQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD04NyBhbW91bnQ9LTEuNDcNCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTg5IGFtb3VudD0tMi45MQ0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9OTMgYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD0xMDIgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD0xMTYgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD0xMTggYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD0xMTkgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD0xMjEgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD0xMjUgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTE3NCBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTIyMyBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9OTcgc2Vjb25kPTgyMTYgYW1vdW50PS0yLjI0DQprZXJuaW5nIGZpcnN0PTk3IHNlY29uZD04MjE3IGFtb3VudD0tMi4zNA0Ka2VybmluZyBmaXJzdD05NyBzZWNvbmQ9ODQ4MiBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTM0IGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0zOCBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTQxIGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9NDIgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD00NCBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTQ2IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9NDkgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD01MCBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTU1IGFtb3VudD0tMC45Ng0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9NjMgYW1vdW50PS0xLjAyDQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD02NSBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTY2IGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9NjcgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD02OSBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTc0IGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9NzcgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD04MyBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTg0IGFtb3VudD0tMi43Mg0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9ODUgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD04NiBhbW91bnQ9LTIuMDINCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTg3IGFtb3VudD0tMS40MQ0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9ODggYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD04OSBhbW91bnQ9LTIuODUNCmtlcm5pbmcgZmlyc3Q9OTggc2Vjb25kPTkwIGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9OTMgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMDIgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMTYgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMTggYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMTkgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMjAgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMjEgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMjIgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xMjUgYW1vdW50PS0wLjk2DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0xODcgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD0yMjMgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD04MjE2IGFtb3VudD0tMi40DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD04MjE3IGFtb3VudD0tMi41DQprZXJuaW5nIGZpcnN0PTk4IHNlY29uZD04MjE4IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD05OCBzZWNvbmQ9ODQ4MiBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9MzggYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTk5IHNlY29uZD00MSBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTQ1IGFtb3VudD0tMS4xOA0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9NTIgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTU1IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9NjMgYW1vdW50PS0wLjkNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTY2IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9NjcgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTk5IHNlY29uZD02OSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTc0IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9NzcgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTk5IHNlY29uZD04MyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTg0IGFtb3VudD0tMi4xMQ0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9ODUgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTk5IHNlY29uZD04NiBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTg3IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9ODkgYW1vdW50PS0xLjIyDQprZXJuaW5nIGZpcnN0PTk5IHNlY29uZD05MyBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTk5IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9MTI1IGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9MTcxIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9MjQwIGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD05OSBzZWNvbmQ9ODIxNiBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9OTkgc2Vjb25kPTgyMTcgYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTk5IHNlY29uZD04NDgyIGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTM4IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTY1IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTY2IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTY3IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTY5IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTc0IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTc3IGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTgzIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTg0IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTg1IGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTg2IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTg3IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTg5IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD0xMDAgc2Vjb25kPTkwIGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTM0IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTM4IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTQxIGFtb3VudD0tMC44Mw0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTQyIGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTQ5IGFtb3VudD0tMC42Nw0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTUwIGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTU1IGFtb3VudD0tMC44Mw0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTYzIGFtb3VudD0tMS4wNg0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTY1IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTY2IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTY3IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTY5IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTc0IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTc3IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTgzIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTg0IGFtb3VudD0tMi4yMQ0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTg1IGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTg2IGFtb3VudD0tMS41DQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9ODcgYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9ODggYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9ODkgYW1vdW50PS0yLjYyDQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9OTAgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9OTMgYW1vdW50PS0xLjE1DQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9MTE4IGFtb3VudD0tMC4xMw0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTEyMCBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9MTAxIHNlY29uZD0xMjEgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9MTI1IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTgyMTYgYW1vdW50PS0yLjE0DQprZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9ODIxNyBhbW91bnQ9LTIuMjQNCmtlcm5pbmcgZmlyc3Q9MTAxIHNlY29uZD04NDgyIGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTM4IGFtb3VudD0tMC42Nw0Ka2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTQ0IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTQ1IGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTQ2IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTQ3IGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9NTIgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9NjQgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9NjUgYW1vdW50PS0xLjQ0DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9NjYgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9NjkgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9NzQgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9NzcgYW1vdW50PS0wLjg2DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9ODUgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9OTAgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9OTcgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9OTkgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9MTAzIGFtb3VudD0tMC4xMw0Ka2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTEyNSBhbW91bnQ9MC4yNg0Ka2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTE3MSBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9MTAyIHNlY29uZD0yNDAgYW1vdW50PS0xLjAyDQprZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9ODIxOCBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD0zOCBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD00MSBhbW91bnQ9MC4xNg0Ka2VybmluZyBmaXJzdD0xMDMgc2Vjb25kPTQ3IGFtb3VudD0wLjQ1DQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9NTUgYW1vdW50PS0wLjk5DQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9NjMgYW1vdW50PS0xLjI1DQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9NjUgYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9NjYgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9NjkgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9NzQgYW1vdW50PTEuNDQNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD03NyBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD04NCBhbW91bnQ9LTEuNTQNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD04NSBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD04NiBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD04NyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD04OCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD04OSBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD05MCBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTAzIHNlY29uZD05MyBhbW91bnQ9MC44DQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9MTA2IGFtb3VudD0wLjYxDQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9MTI1IGFtb3VudD0wLjkzDQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9MjQwIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD0xMDMgc2Vjb25kPTgyMTYgYW1vdW50PS0xLjA2DQprZXJuaW5nIGZpcnN0PTEwMyBzZWNvbmQ9ODIxNyBhbW91bnQ9LTEuMTINCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD0zMyBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD0zNCBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD0zOCBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD00MSBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD00MiBhbW91bnQ9LTAuNjcNCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD00OSBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTU1IGFtb3VudD0tMC43NA0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTYzIGFtb3VudD0tMS4wMg0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTY1IGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTY2IGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTY3IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTY5IGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTc0IGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTc3IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTgzIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTg0IGFtb3VudD0tMy4wMQ0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTg1IGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9ODYgYW1vdW50PS0xLjg2DQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9ODcgYW1vdW50PS0xLjM0DQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9ODggYW1vdW50PS0wLjIyDQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9ODkgYW1vdW50PS0yLjk4DQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9OTAgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9OTMgYW1vdW50PS0xLjI4DQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9MTAyIGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTExNiBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD0xMTggYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9MTE5IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTEyMSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTA0IHNlY29uZD0xMjUgYW1vdW50PS0wLjk5DQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9MjIzIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTgyMTYgYW1vdW50PS0yLjIxDQprZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9ODIxNyBhbW91bnQ9LTIuMw0Ka2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTg0ODIgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9MzggYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9NjUgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9NjYgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9NjcgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9NjkgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9NzQgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9NzcgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9ODMgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9ODQgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9ODUgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9ODYgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9ODcgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9ODkgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTEwNSBzZWNvbmQ9OTAgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9MzggYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9NDUgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9NjMgYW1vdW50PS0wLjYxDQprZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9NjcgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD04NCBhbW91bnQ9LTIuODgNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD04NSBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD04NiBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD04NyBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD04OSBhbW91bnQ9LTEuMjUNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD05MyBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD05NyBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD05OSBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD0xMDcgc2Vjb25kPTEwMyBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD0xNzEgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9MjQwIGFtb3VudD0tMC44Mw0Ka2VybmluZyBmaXJzdD0xMDcgc2Vjb25kPTgyMTYgYW1vdW50PS0wLjg2DQprZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9ODIxNyBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD0zNCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD0zOCBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD00MiBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD02NiBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD02NyBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD02OSBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD03NCBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD03NyBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD04NCBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD0xMDggc2Vjb25kPTg1IGFtb3VudD0tMC45DQprZXJuaW5nIGZpcnN0PTEwOCBzZWNvbmQ9ODYgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTEwOCBzZWNvbmQ9ODcgYW1vdW50PS0wLjYxDQprZXJuaW5nIGZpcnN0PTEwOCBzZWNvbmQ9ODkgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTEwOCBzZWNvbmQ9OTkgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTEwOCBzZWNvbmQ9MTE2IGFtb3VudD0tMC4xNg0Ka2VybmluZyBmaXJzdD0xMDggc2Vjb25kPTExOCBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD0xMTkgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTEwOCBzZWNvbmQ9MTIxIGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD0xMDggc2Vjb25kPTE3MSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTA4IHNlY29uZD04MjE2IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xMDggc2Vjb25kPTgyMTcgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MzQgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MzggYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9NDEgYW1vdW50PS0xLjAyDQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9NDIgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD00OSBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD01MCBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD01NSBhbW91bnQ9LTEuMDYNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD02MyBhbW91bnQ9LTEuMDkNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD02NSBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD02NiBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD02NyBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD02OSBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD03NCBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD03NyBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04MyBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04NCBhbW91bnQ9LTIuNjYNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04NSBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04NiBhbW91bnQ9LTIuMDUNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04NyBhbW91bnQ9LTEuNDENCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04OCBhbW91bnQ9LTEuMjINCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04OSBhbW91bnQ9LTIuODUNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD05MCBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD05MyBhbW91bnQ9LTEuMzgNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD0xMDIgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MTE2IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD0xMTEgc2Vjb25kPTExOCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD0xMTkgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MTIwIGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD0xMTEgc2Vjb25kPTEyMSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD0xMjIgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MTI1IGFtb3VudD0tMS4wOQ0Ka2VybmluZyBmaXJzdD0xMTEgc2Vjb25kPTE4NyBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD0yMjMgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9ODIxNiBhbW91bnQ9LTIuMzcNCmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD04MjE3IGFtb3VudD0tMi40Ng0Ka2VybmluZyBmaXJzdD0xMTEgc2Vjb25kPTg0ODIgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9MzggYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NDEgYW1vdW50PS0wLjc0DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NDIgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NTUgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NjMgYW1vdW50PS0xLjA2DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NjUgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NjYgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NjcgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NjkgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NzQgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9NzcgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODMgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODQgYW1vdW50PS0yLjk0DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODUgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODYgYW1vdW50PS0xLjI4DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODcgYW1vdW50PS0xLjIyDQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODggYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODkgYW1vdW50PS0yLjM0DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9OTAgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9OTMgYW1vdW50PS0xLjMxDQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9MTI1IGFtb3VudD0tMC45Ng0Ka2VybmluZyBmaXJzdD0xMTMgc2Vjb25kPTgyMTYgYW1vdW50PS0xLjQ0DQprZXJuaW5nIGZpcnN0PTExMyBzZWNvbmQ9ODIxNyBhbW91bnQ9LTEuNQ0Ka2VybmluZyBmaXJzdD0xMTMgc2Vjb25kPTg0ODIgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MzggYW1vdW50PS0wLjYxDQprZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9NDEgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9NDQgYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9NDUgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD00NiBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD00NyBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD01MSBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTUyIGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTU1IGFtb3VudD0tMS43OQ0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTYzIGFtb3VudD0tMS43Mw0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTY0IGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTY1IGFtb3VudD0tMS40NA0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTY2IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTY5IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTc0IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTc3IGFtb3VudD0tMC44Mw0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTg0IGFtb3VudD0tMi45OA0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTg1IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTg2IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTg3IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTg4IGFtb3VudD0tMS4zNA0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTg5IGFtb3VudD0tMC45OQ0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTkwIGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTkzIGFtb3VudD0tMS4yNQ0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTk3IGFtb3VudD0tMC4yMg0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTk5IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTEwMyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0xMjUgYW1vdW50PS0wLjkNCmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0xNzEgYW1vdW50PS0wLjYxDQprZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjQwIGFtb3VudD0tMS4yMg0Ka2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTgyMTYgYW1vdW50PS0wLjc0DQprZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9ODIxNyBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD04MjE4IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD0xMTUgc2Vjb25kPTQxIGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTExNSBzZWNvbmQ9NDIgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTExNSBzZWNvbmQ9NTUgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD02MyBhbW91bnQ9LTEuMDINCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD02NiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD02NyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD02OSBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD03NCBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD03NyBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04MyBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04NCBhbW91bnQ9LTEuNzMNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04NSBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04NiBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04NyBhbW91bnQ9LTEuMDINCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04OCBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04OSBhbW91bnQ9LTEuNQ0Ka2VybmluZyBmaXJzdD0xMTUgc2Vjb25kPTkwIGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xMTUgc2Vjb25kPTkzIGFtb3VudD0tMS4xNQ0Ka2VybmluZyBmaXJzdD0xMTUgc2Vjb25kPTEyNSBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04MjE2IGFtb3VudD0tMS43DQprZXJuaW5nIGZpcnN0PTExNSBzZWNvbmQ9ODIxNyBhbW91bnQ9LTEuNzkNCmtlcm5pbmcgZmlyc3Q9MTE1IHNlY29uZD04NDgyIGFtb3VudD0tMC42Nw0Ka2VybmluZyBmaXJzdD0xMTYgc2Vjb25kPTM4IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD0xMTYgc2Vjb25kPTUyIGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9NTUgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9NjMgYW1vdW50PS0wLjg2DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9NjYgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9NjkgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9NzQgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9NzcgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9ODQgYW1vdW50PS0xLjUNCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD04NSBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD04NiBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD04NyBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD04OSBhbW91bnQ9LTEuNDQNCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD05MyBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD05OSBhbW91bnQ9LTAuMTMNCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD0xMjUgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9MTcxIGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD0xMTYgc2Vjb25kPTI0MCBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD04MjE2IGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9ODIxNyBhbW91bnQ9LTAuNzQNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0zOCBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD00MSBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTQ0IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTQ2IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTQ3IGFtb3VudD0tMS4wNg0Ka2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTUxIGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9NTUgYW1vdW50PS0xLjc5DQprZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9NjMgYW1vdW50PS0xLjYNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD02NCBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD02NSBhbW91bnQ9LTEuMjgNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD02NiBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD02OSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD03NCBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD03NyBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD04NCBhbW91bnQ9LTIuNzUNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD04NSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD04NiBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD04NyBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD04OCBhbW91bnQ9LTEuNTQNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD04OSBhbW91bnQ9LTEuNDcNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD05MCBhbW91bnQ9LTEuMDINCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD05MyBhbW91bnQ9LTEuMzQNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD05NyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD05OSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0xMDMgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MTE1IGFtb3VudD0tMC4xMw0Ka2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTEyNSBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0yNDAgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9ODIxNiBhbW91bnQ9LTAuOTYNCmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD04MjE3IGFtb3VudD0tMS4wMg0Ka2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTgyMTggYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9MzggYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9NDEgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9NDQgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9NDYgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9NDcgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD01MSBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD01NSBhbW91bnQ9LTEuNTcNCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD02MyBhbW91bnQ9LTEuNDQNCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD02NCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD02NSBhbW91bnQ9LTEuMDYNCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD02NiBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD02OSBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD03NCBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD03NyBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD04NCBhbW91bnQ9LTIuNQ0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTg1IGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTg2IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTg3IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTg4IGFtb3VudD0tMS4zOA0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTg5IGFtb3VudD0tMS40NA0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTkwIGFtb3VudD0tMC45DQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9OTMgYW1vdW50PS0xLjIyDQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9OTcgYW1vdW50PS0wLjEzDQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9OTkgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9MTI1IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTI0MCBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD04MjE2IGFtb3VudD0tMC45Mw0Ka2VybmluZyBmaXJzdD0xMTkgc2Vjb25kPTgyMTcgYW1vdW50PS0wLjk5DQprZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9ODIxOCBhbW91bnQ9LTAuNjcNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0zOCBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD00NSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD02MyBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD02NiBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD02NyBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD02OSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD03NCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD03NyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD04MyBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD04NCBhbW91bnQ9LTIuODUNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD04NSBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD04NiBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD04NyBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD04OSBhbW91bnQ9LTEuNTQNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD05MyBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD05NyBhbW91bnQ9LTAuMTMNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD05OSBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0xMDMgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTEyMCBzZWNvbmQ9MTI1IGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTE3MSBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0yNDAgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTEyMCBzZWNvbmQ9ODIxNiBhbW91bnQ9LTEuMDINCmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD04MjE3IGFtb3VudD0tMS4wOQ0Ka2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTg0ODIgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MzggYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9NDEgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD00NCBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD00NiBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD00NyBhbW91bnQ9LTEuMTUNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD01MCBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD01MSBhbW91bnQ9LTAuODMNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD01NSBhbW91bnQ9LTEuODYNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD02MyBhbW91bnQ9LTEuNjMNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD02NCBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD02NSBhbW91bnQ9LTEuMzQNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD02NiBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD02OSBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD03NCBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD03NyBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD04NCBhbW91bnQ9LTIuODINCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD04NSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD04NiBhbW91bnQ9LTAuNTgNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD04NyBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD04OCBhbW91bnQ9LTEuNTQNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD04OSBhbW91bnQ9LTEuNDQNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD05MCBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD05MyBhbW91bnQ9LTEuMzQNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD05NyBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD05OSBhbW91bnQ9LTAuMzINCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0xMDMgYW1vdW50PS0wLjE5DQprZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MTE1IGFtb3VudD0tMC4xMw0Ka2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTEyNSBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0yNDAgYW1vdW50PS0wLjY0DQprZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9ODIxNiBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD04MjE3IGFtb3VudD0tMC45OQ0Ka2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTgyMTggYW1vdW50PS0wLjk5DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9MzggYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NDEgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NDUgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NTIgYW1vdW50PS0wLjk5DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NTUgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NjMgYW1vdW50PS0xLjEyDQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NjYgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NjcgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NjkgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NzQgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9NzcgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9ODQgYW1vdW50PS0xLjcNCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD04NSBhbW91bnQ9LTAuNTQNCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD04NiBhbW91bnQ9LTAuNTENCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD04NyBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD04OSBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD05MyBhbW91bnQ9LTEuMDkNCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD05OSBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD0xMDMgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9MTI1IGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD0xMjIgc2Vjb25kPTE3MSBhbW91bnQ9LTAuNzcNCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD0yNDAgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9ODIxNiBhbW91bnQ9LTEuMTgNCmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD04MjE3IGFtb3VudD0tMS4yOA0Ka2VybmluZyBmaXJzdD0xMjIgc2Vjb25kPTg0ODIgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9NDggYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9NTIgYW1vdW50PS0wLjU4DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9NTQgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9NjUgYW1vdW50PS0wLjM4DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9NjcgYW1vdW50PS0wLjgNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD03NCBhbW91bnQ9MS41DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9NzcgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9ODQgYW1vdW50PTAuNjcNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD04NiBhbW91bnQ9MC45Mw0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTg3IGFtb3VudD0wLjgNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD04OCBhbW91bnQ9MC45DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9ODkgYW1vdW50PTEuMDkNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD05NyBhbW91bnQ9LTAuODYNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD05OSBhbW91bnQ9LTEuMDkNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD0xMDkgYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9MTE1IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTExNiBhbW91bnQ9LTAuOA0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTExNyBhbW91bnQ9LTAuOTkNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD0xMTggYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9MTE5IGFtb3VudD0tMC45DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9MTIwIGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTEyMSBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD0xMjIgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9MjIzIGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTIzNiBhbW91bnQ9MC4zOA0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTIzOCBhbW91bnQ9MS4wNg0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTIzOSBhbW91bnQ9MS40MQ0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTI0MCBhbW91bnQ9LTAuNw0Ka2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTI1NCBhbW91bnQ9LTAuMjINCmtlcm5pbmcgZmlyc3Q9MTYxIHNlY29uZD04NCBhbW91bnQ9LTEuNzkNCmtlcm5pbmcgZmlyc3Q9MTYxIHNlY29uZD04NiBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9MTYxIHNlY29uZD04NyBhbW91bnQ9LTAuMzgNCmtlcm5pbmcgZmlyc3Q9MTYxIHNlY29uZD04OSBhbW91bnQ9LTEuMDINCmtlcm5pbmcgZmlyc3Q9MTcxIHNlY29uZD04NCBhbW91bnQ9LTEuODkNCmtlcm5pbmcgZmlyc3Q9MTcxIHNlY29uZD04NiBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MTcxIHNlY29uZD04OSBhbW91bnQ9LTAuOTYNCmtlcm5pbmcgZmlyc3Q9MTcxIHNlY29uZD05OSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTcxIHNlY29uZD04MjE3IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTY1IGFtb3VudD0tMC42MQ0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTc3IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTg0IGFtb3VudD0tMC44Mw0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTg2IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTg3IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTg4IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTg5IGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD0xNzQgc2Vjb25kPTkwIGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTE3NCBzZWNvbmQ9MTk4IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD0xNzYgc2Vjb25kPTUyIGFtb3VudD0tMC44Ng0Ka2VybmluZyBmaXJzdD0xNzYgc2Vjb25kPTU0IGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD0xODMgc2Vjb25kPTQ5IGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD0xODMgc2Vjb25kPTUwIGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD0xODMgc2Vjb25kPTUxIGFtb3VudD0tMC4zMg0Ka2VybmluZyBmaXJzdD0xODMgc2Vjb25kPTU1IGFtb3VudD0tMC42Nw0Ka2VybmluZyBmaXJzdD0xODcgc2Vjb25kPTM0IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xODcgc2Vjb25kPTY1IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD0xODcgc2Vjb25kPTgzIGFtb3VudD0tMC43DQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9ODQgYW1vdW50PS0xLjk1DQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9ODYgYW1vdW50PS0xLjE1DQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9ODcgYW1vdW50PS0wLjgzDQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9ODggYW1vdW50PS0xLjAyDQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9ODkgYW1vdW50PS0xLjg2DQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9OTAgYW1vdW50PS0xLjA2DQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9MTE2IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD0xODcgc2Vjb25kPTEyMCBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9MTg3IHNlY29uZD0xMjEgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9MTIyIGFtb3VudD0tMC43NA0Ka2VybmluZyBmaXJzdD0xODcgc2Vjb25kPTE5OCBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MTg3IHNlY29uZD0yMjMgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTE4NyBzZWNvbmQ9ODIxNyBhbW91bnQ9LTEuNjYNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD02NSBhbW91bnQ9LTAuNzQNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD02NiBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD02OSBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD03NCBhbW91bnQ9MC42MQ0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTc3IGFtb3VudD0tMC41OA0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTg0IGFtb3VudD0tMi4wNQ0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTg1IGFtb3VudD0tMC4zNQ0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTg2IGFtb3VudD0tMC43NA0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTg3IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTg4IGFtb3VudD0tMC44DQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9ODkgYW1vdW50PS0xLjE4DQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9OTAgYW1vdW50PS0xLjE1DQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9OTcgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9OTggYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9OTkgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9MTAzIGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTEwNSBhbW91bnQ9LTAuNDUNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD0xMDYgYW1vdW50PTAuNjQNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD0xMDggYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9MTA5IGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTExNSBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD0xMTcgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9MTIwIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0xOTEgc2Vjb25kPTEyMiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9MTkxIHNlY29uZD0xOTggYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTE5MSBzZWNvbmQ9MjQwIGFtb3VudD0tMC41MQ0Ka2VybmluZyBmaXJzdD0yMjIgc2Vjb25kPTQxIGFtb3VudD0tMC45DQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9NDQgYW1vdW50PS0yLjUzDQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9NDYgYW1vdW50PS0yLjUzDQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9NDcgYW1vdW50PS0xLjEyDQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9NjMgYW1vdW50PS0xLjA2DQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9NjUgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9NzcgYW1vdW50PS0wLjE2DQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9ODQgYW1vdW50PS0xLjczDQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9ODYgYW1vdW50PS0wLjI2DQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9ODggYW1vdW50PS0xLjYzDQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9ODkgYW1vdW50PS0wLjkNCmtlcm5pbmcgZmlyc3Q9MjIyIHNlY29uZD05MCBhbW91bnQ9LTEuNw0Ka2VybmluZyBmaXJzdD0yMjIgc2Vjb25kPTkzIGFtb3VudD0tMS4zNA0Ka2VybmluZyBmaXJzdD0yMjIgc2Vjb25kPTk3IGFtb3VudD0tMC4yOQ0Ka2VybmluZyBmaXJzdD0yMjIgc2Vjb25kPTEyMCBhbW91bnQ9LTAuMTkNCmtlcm5pbmcgZmlyc3Q9MjIyIHNlY29uZD0xMjUgYW1vdW50PS0wLjk2DQprZXJuaW5nIGZpcnN0PTIyMiBzZWNvbmQ9MTk4IGFtb3VudD0tMS43Ng0Ka2VybmluZyBmaXJzdD0yMjIgc2Vjb25kPTgyMTggYW1vdW50PS0yLjUzDQprZXJuaW5nIGZpcnN0PTIyMyBzZWNvbmQ9MzQgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTIyMyBzZWNvbmQ9NDEgYW1vdW50PS0wLjU0DQprZXJuaW5nIGZpcnN0PTIyMyBzZWNvbmQ9NDIgYW1vdW50PS0wLjQ4DQprZXJuaW5nIGZpcnN0PTIyMyBzZWNvbmQ9MTAyIGFtb3VudD0tMC4xOQ0Ka2VybmluZyBmaXJzdD0yMjMgc2Vjb25kPTExNiBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MjIzIHNlY29uZD0xMTggYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTIyMyBzZWNvbmQ9MTE5IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0yMjMgc2Vjb25kPTEyMCBhbW91bnQ9LTAuMTYNCmtlcm5pbmcgZmlyc3Q9MjIzIHNlY29uZD0xMjEgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTIyMyBzZWNvbmQ9ODIxNiBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9MjIzIHNlY29uZD04MjE3IGFtb3VudD0tMC40Mg0Ka2VybmluZyBmaXJzdD0yMjMgc2Vjb25kPTg0ODIgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTIyNiBzZWNvbmQ9OTMgYW1vdW50PS0wLjMyDQprZXJuaW5nIGZpcnN0PTIyNiBzZWNvbmQ9MTI1IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0yMjcgc2Vjb25kPTEyNSBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9MjI3IHNlY29uZD04MjE3IGFtb3VudD0tMS45NQ0Ka2VybmluZyBmaXJzdD0yMjcgc2Vjb25kPTgyMjEgYW1vdW50PS0xLjk1DQprZXJuaW5nIGZpcnN0PTIyOCBzZWNvbmQ9OTMgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTIyOCBzZWNvbmQ9MTI1IGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0yMzYgc2Vjb25kPTQyIGFtb3VudD0wLjk2DQprZXJuaW5nIGZpcnN0PTIzNiBzZWNvbmQ9ODQ4MiBhbW91bnQ9MC45DQprZXJuaW5nIGZpcnN0PTIzNyBzZWNvbmQ9NDIgYW1vdW50PTAuNTgNCmtlcm5pbmcgZmlyc3Q9MjM3IHNlY29uZD05MyBhbW91bnQ9MC4yOQ0Ka2VybmluZyBmaXJzdD0yMzcgc2Vjb25kPTEyNSBhbW91bnQ9MC40NQ0Ka2VybmluZyBmaXJzdD0yMzcgc2Vjb25kPTg0ODIgYW1vdW50PTAuNTgNCmtlcm5pbmcgZmlyc3Q9MjM4IHNlY29uZD0zNCBhbW91bnQ9MC45Mw0Ka2VybmluZyBmaXJzdD0yMzggc2Vjb25kPTM5IGFtb3VudD0wLjkzDQprZXJuaW5nIGZpcnN0PTIzOCBzZWNvbmQ9NDIgYW1vdW50PTIuNDMNCmtlcm5pbmcgZmlyc3Q9MjM4IHNlY29uZD02MyBhbW91bnQ9MS4yNQ0Ka2VybmluZyBmaXJzdD0yMzggc2Vjb25kPTkzIGFtb3VudD0xLjQxDQprZXJuaW5nIGZpcnN0PTIzOCBzZWNvbmQ9MTI1IGFtb3VudD0xLjA2DQprZXJuaW5nIGZpcnN0PTIzOCBzZWNvbmQ9ODIxNiBhbW91bnQ9MS4xOA0Ka2VybmluZyBmaXJzdD0yMzggc2Vjb25kPTgyMTcgYW1vdW50PTAuNzcNCmtlcm5pbmcgZmlyc3Q9MjM4IHNlY29uZD04MjIwIGFtb3VudD0xLjE4DQprZXJuaW5nIGZpcnN0PTIzOCBzZWNvbmQ9ODIyMSBhbW91bnQ9MC43Nw0Ka2VybmluZyBmaXJzdD0yMzggc2Vjb25kPTg0ODIgYW1vdW50PTIuNTkNCmtlcm5pbmcgZmlyc3Q9MjM5IHNlY29uZD00MiBhbW91bnQ9MS4zOA0Ka2VybmluZyBmaXJzdD0yMzkgc2Vjb25kPTYzIGFtb3VudD0wLjg2DQprZXJuaW5nIGZpcnN0PTIzOSBzZWNvbmQ9OTMgYW1vdW50PTEuMjUNCmtlcm5pbmcgZmlyc3Q9MjM5IHNlY29uZD0xMjUgYW1vdW50PTEuNDENCmtlcm5pbmcgZmlyc3Q9MjM5IHNlY29uZD04NDgyIGFtb3VudD0xLjU0DQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9MzQgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9MzggYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9NDEgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9NDIgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9NDQgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9NDYgYW1vdW50PS0wLjI5DQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9NjMgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9OTMgYW1vdW50PS0wLjUxDQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9MTIwIGFtb3VudD0tMC4yNg0Ka2VybmluZyBmaXJzdD0yNDAgc2Vjb25kPTEyNSBhbW91bnQ9LTAuNDINCmtlcm5pbmcgZmlyc3Q9MjQwIHNlY29uZD04MjE2IGFtb3VudD0tMC42NA0Ka2VybmluZyBmaXJzdD0yNDAgc2Vjb25kPTgyMTcgYW1vdW50PS0wLjYxDQprZXJuaW5nIGZpcnN0PTI0MCBzZWNvbmQ9ODIxOCBhbW91bnQ9LTAuMjkNCmtlcm5pbmcgZmlyc3Q9MjQwIHNlY29uZD04NDgyIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD00NCBhbW91bnQ9LTQuMjYNCmtlcm5pbmcgZmlyc3Q9ODIxNiBzZWNvbmQ9NDYgYW1vdW50PS00LjIyDQprZXJuaW5nIGZpcnN0PTgyMTYgc2Vjb25kPTY1IGFtb3VudD0tMS42Mw0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD03NyBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9ODIxNiBzZWNvbmQ9OTcgYW1vdW50PS0xLjk4DQprZXJuaW5nIGZpcnN0PTgyMTYgc2Vjb25kPTk5IGFtb3VudD0tMi4zNw0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD0xMDIgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTgyMTYgc2Vjb25kPTEwMyBhbW91bnQ9LTIuMTQNCmtlcm5pbmcgZmlyc3Q9ODIxNiBzZWNvbmQ9MTA5IGFtb3VudD0tMS40NA0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD0xMTUgYW1vdW50PS0yLjAyDQprZXJuaW5nIGZpcnN0PTgyMTYgc2Vjb25kPTExNiBhbW91bnQ9LTAuMjYNCmtlcm5pbmcgZmlyc3Q9ODIxNiBzZWNvbmQ9MTE3IGFtb3VudD0tMS4zOA0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD0xMTggYW1vdW50PS0wLjk2DQprZXJuaW5nIGZpcnN0PTgyMTYgc2Vjb25kPTExOSBhbW91bnQ9LTAuOTMNCmtlcm5pbmcgZmlyc3Q9ODIxNiBzZWNvbmQ9MTIwIGFtb3VudD0tMC45OQ0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD0xMjEgYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTgyMTYgc2Vjb25kPTEyMiBhbW91bnQ9LTEuMjUNCmtlcm5pbmcgZmlyc3Q9ODIxNiBzZWNvbmQ9MTk4IGFtb3VudD0tMi4xMQ0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD0yMjMgYW1vdW50PS0wLjM1DQprZXJuaW5nIGZpcnN0PTgyMTYgc2Vjb25kPTIzOCBhbW91bnQ9MS4xOA0Ka2VybmluZyBmaXJzdD04MjE2IHNlY29uZD0yNDAgYW1vdW50PS0wLjY3DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTM4IGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD00MiBhbW91bnQ9MC4xNg0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD00NCBhbW91bnQ9LTQuNjcNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9NDUgYW1vdW50PS0yLjQNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9NDYgYW1vdW50PS00LjY3DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTQ3IGFtb3VudD0tMS41DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTY0IGFtb3VudD0tMS40Nw0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD02NSBhbW91bnQ9LTEuNzkNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9NjcgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9NzcgYW1vdW50PS0wLjcNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9ODkgYW1vdW50PTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9OTcgYW1vdW50PS0yLjQ2DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTk5IGFtb3VudD0tMi44NQ0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0xMDIgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTEwMyBhbW91bnQ9LTIuNjINCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MTA5IGFtb3VudD0tMS44Ng0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0xMTUgYW1vdW50PS0yLjUNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MTE2IGFtb3VudD0tMC4zOA0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0xMTcgYW1vdW50PS0xLjc5DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTExOCBhbW91bnQ9LTEuMzQNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MTE5IGFtb3VudD0tMS4zMQ0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0xMjAgYW1vdW50PS0xLjM4DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTEyMSBhbW91bnQ9LTEuMzENCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MTIyIGFtb3VudD0tMS42Ng0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0xNzEgYW1vdW50PS0yLjA1DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTE3NCBhbW91bnQ9LTAuMzUNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MTg3IGFtb3VudD0tMS4xNQ0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0xOTggYW1vdW50PS0yLjMNCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MjIzIGFtb3VudD0tMC40OA0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0yMjYgYW1vdW50PS0yLjIxDQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTIzNCBhbW91bnQ9LTIuNjINCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MjM4IGFtb3VudD0xLjQxDQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTIzOSBhbW91bnQ9MC45DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTI0MCBhbW91bnQ9LTAuNjENCmtlcm5pbmcgZmlyc3Q9ODIxNyBzZWNvbmQ9MjU0IGFtb3VudD0tMS4wMg0Ka2VybmluZyBmaXJzdD04MjE3IHNlY29uZD0zNTMgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTgyMTggYW1vdW50PS00LjY3DQprZXJuaW5nIGZpcnN0PTgyMTcgc2Vjb25kPTg0ODIgYW1vdW50PTAuMjkNCmtlcm5pbmcgZmlyc3Q9ODIxOCBzZWNvbmQ9MzQgYW1vdW50PS0zLjUyDQprZXJuaW5nIGZpcnN0PTgyMTggc2Vjb25kPTY3IGFtb3VudD0tMC40NQ0Ka2VybmluZyBmaXJzdD04MjE4IHNlY29uZD04NCBhbW91bnQ9LTEuMzQNCmtlcm5pbmcgZmlyc3Q9ODIxOCBzZWNvbmQ9ODUgYW1vdW50PS0wLjQyDQprZXJuaW5nIGZpcnN0PTgyMTggc2Vjb25kPTg2IGFtb3VudD0tMS4zOA0Ka2VybmluZyBmaXJzdD04MjE4IHNlY29uZD04NyBhbW91bnQ9LTAuOTYNCmtlcm5pbmcgZmlyc3Q9ODIxOCBzZWNvbmQ9ODkgYW1vdW50PS0xLjMxDQprZXJuaW5nIGZpcnN0PTgyMTggc2Vjb25kPTEwMiBhbW91bnQ9LTAuNDgNCmtlcm5pbmcgZmlyc3Q9ODIxOCBzZWNvbmQ9MTE2IGFtb3VudD0tMC41NA0Ka2VybmluZyBmaXJzdD04MjE4IHNlY29uZD0xMTggYW1vdW50PS0wLjkzDQprZXJuaW5nIGZpcnN0PTgyMTggc2Vjb25kPTExOSBhbW91bnQ9LTAuNjQNCmtlcm5pbmcgZmlyc3Q9ODIxOCBzZWNvbmQ9MTIxIGFtb3VudD0tMS4wOQ0Ka2VybmluZyBmaXJzdD04MjE4IHNlY29uZD0yMjMgYW1vdW50PS0wLjQ1DQprZXJuaW5nIGZpcnN0PTgyMTggc2Vjb25kPTgyMTcgYW1vdW50PS00LjMyDQprZXJuaW5nIGZpcnN0PTgyMjAgc2Vjb25kPTIzOCBhbW91bnQ9MS4xOA0Ka2VybmluZyBmaXJzdD04MjIxIHNlY29uZD0yMjYgYW1vdW50PS0yLjIxDQprZXJuaW5nIGZpcnN0PTgyMjEgc2Vjb25kPTIzNCBhbW91bnQ9LTIuNjINCmtlcm5pbmcgZmlyc3Q9ODIyMSBzZWNvbmQ9MjM4IGFtb3VudD0xLjQxDQprZXJuaW5nIGZpcnN0PTgyMjEgc2Vjb25kPTIzOSBhbW91bnQ9MC45DQprZXJuaW5nIGZpcnN0PTgyMjEgc2Vjb25kPTI1NCBhbW91bnQ9LTEuMDINCmtlcm5pbmcgZmlyc3Q9ODIyMSBzZWNvbmQ9MzUzIGFtb3VudD0tMC43Nw0Ka2VybmluZyBmaXJzdD04MjUwIHNlY29uZD0yMDggYW1vdW50PTAuMTkNCmtlcm5pbmcgZmlyc3Q9ODQ4MiBzZWNvbmQ9NjUgYW1vdW50PS0wLjc3DQprZXJuaW5nIGZpcnN0PTg0ODIgc2Vjb25kPTE5OCBhbW91bnQ9LTAuOQ0Ka2VybmluZyBmaXJzdD04NDgyIHNlY29uZD0yMDggYW1vdW50PTAuMzINCmtlcm5pbmcgZmlyc3Q9ODQ4MiBzZWNvbmQ9MjM4IGFtb3VudD0wLjM1"},{ name : "default.png", data : "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"},{ name : "default.frag.textured.glsl", data : "dW5pZm9ybSBzYW1wbGVyMkQgdGV4MDsNCnZhcnlpbmcgdmVjMiB0Y29vcmQ7DQp2YXJ5aW5nIHZlYzQgY29sb3I7DQoNCnZvaWQgbWFpbigpIHsNCiAgICB2ZWM0IHRleGNvbG9yID0gdGV4dHVyZTJEKHRleDAsIHRjb29yZCk7DQogICAgLy8gZmxvYXQgbHVtaW5vc2l0eSA9ICh0ZXhjb2xvci5yICsgdGV4Y29sb3IuZyArIHRleGNvbG9yLmIpIC8gMy4wOw0KICAgIC8vIHZlYzQgZ3JheSA9IHZlYzQobHVtaW5vc2l0eSxsdW1pbm9zaXR5LGx1bWlub3NpdHksMSk7DQogICAgLy8gdmVjNCBvY29sb3IgPSB2ZWM0KHRleGNvbG9yLnIsIHRleGNvbG9yLmcsIHRleGNvbG9yLmIsIDEpOw0KICAgIC8vIHZlYzQgdXZjb2xvciA9IHZlYzQodGNvb3JkLngsIHRjb29yZC55LCAodGNvb3JkLngrdGNvb3JkLnkpKjIuMCwgMSk7DQogICAgLy8gdmVjNCB3aGl0ZSA9IHZlYzQoMSwgMSwgMSwgMC42KTsNCiAgICAvLyBnbF9GcmFnQ29sb3IgPSBncmF5ICogKCh0Y29vcmQueCt0Y29vcmQueSkvMi4wKTsNCiAgICBnbF9GcmFnQ29sb3IgPSBjb2xvciAqIHRleGNvbG9yOyAvL3ZlYzQoMCwwLjksMC42LDEpOyA7DQogICAgLy8gZ2xfRnJhZ0NvbG9yID0gdmVjNChnbF9Qb2ludENvb3JkLngsIGdsX1BvaW50Q29vcmQueSwgMCwgMSk7DQogICAgLy8gdmVjNCBjYyA9IHV2Y29sb3IgKiBncmF5Ow0KICAgIC8vIGdsX0ZyYWdDb2xvciA9IHRleGNvbG9yOw0KfQ"},{ name : "default.frag.bitmapfont.glsl", data : "I2RlZmluZSBPVVRMSU5FIDENCiNkZWZpbmUgR0xPVyAxDQojZGVmaW5lIFNVUEVSU0FNUExFIDENCg0KdW5pZm9ybSBzYW1wbGVyMkQgdGV4MDsNCnZhcnlpbmcgdmVjMiB0Y29vcmQ7DQp2YXJ5aW5nIHZlYzQgY29sb3I7DQoNCnVuaWZvcm0gZmxvYXQgc21vb3RobmVzczsNCnVuaWZvcm0gZmxvYXQgdGhpY2tuZXNzOw0KDQp1bmlmb3JtIHZlYzQgb3V0bGluZV9jb2xvcjsNCnVuaWZvcm0gZmxvYXQgb3V0bGluZTsNCg0KdW5pZm9ybSB2ZWM0IGdsb3dfY29sb3I7DQp1bmlmb3JtIGZsb2F0IGdsb3dfdGhyZXNob2xkOw0KdW5pZm9ybSBmbG9hdCBnbG93X2Ftb3VudDsNCg0KDQpmbG9hdCBlZGdlKGZsb2F0IHZhbHVlLCBmbG9hdCBhbW91bnQsIGZsb2F0IHQpIHsNCiAgICByZXR1cm4gc21vb3Roc3RlcCh2YWx1ZSAtIGFtb3VudCwgdmFsdWUgKyBhbW91bnQsIHQpOw0KfQ0KDQpmbG9hdCBnZXQodmVjMiB1diwgZmxvYXQgd2lkdGgpIHsNCiAgICBmbG9hdCB0ZXhhID0gdGV4dHVyZTJEKHRleDAsIHV2KS5hOw0KICAgIHJldHVybiBzbW9vdGhzdGVwKDAuNSAtIHdpZHRoLCAwLjUgKyB3aWR0aCwgdGV4YSk7DQp9DQoNCnZvaWQgbWFpbigpIHsNCg0KLy9iYXNpYyBzZGYNCg0KICAgIGZsb2F0IGRpc3QgPSB0ZXh0dXJlMkQodGV4MCwgdGNvb3JkKS5hOw0KICAgICAgICAvL2Z3aWR0aCBrZWVwcyB3aWR0aCBzaW1pbGFyIGRlc3BpdGUgc2NhbGluZywgc2VlIGJlbG93IGZvciBvcHRpb25zDQogICAgZmxvYXQgc21vb3RoYW10ID0gc21vb3RobmVzcyAqIGZ3aWR0aChkaXN0KTsNCiAgICAvLyBmbG9hdCBzbW9vdGhhbXQgPSBzbW9vdGhuZXNzICogbGVuZ3RoKHZlYzIoZEZkeChkaXN0KSwgZEZkeShkaXN0KSkpOw0KDQogICAgICAgIC8vY2FsY3VsYXRlIHRoZSBlZGdlIHNtb290aGluZw0KICAgIGZsb2F0IGFscGhhID0gZWRnZSgxLjAgLSB0aGlja25lc3MsIHNtb290aGFtdCwgZGlzdCk7DQoNCi8vc3VwZXIgc2FtcGxpbmcNCg0KICAgICAgICAjaWYgU1VQRVJTQU1QTEUgPT0gMQ0KDQogICAgICAgICAgICAgICAgLy90aGVzZSB2YWx1ZXMgY2FuIGJlIGV4cG9zZWQgbGF0ZXINCiAgICAgICAgICAgICAgICAvL3RoZSBjdXJyZW50IGJlaW5nIDAuMjUvc3FydCgyKQ0KICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMC4xNzY3NzY2OTUzOw0KICAgICAgICAgICAgZmxvYXQgc2FtcGxlYW10ID0gMC41Ow0KICAgICAgICAgICAgICAgIC8vdGhpcyBpcyBhIHNpbXBsZSBib3ggZmlsdGVyIGFyb3VuZCB0aGUgcG9pbnQsDQogICAgICAgICAgICAgICAgLy93ZSB1c2UgYSBzZXBhcmF0ZSB3aWR0aCBmb3Igbm93DQogICAgICAgICAgICBmbG9hdCBzYW1wbGV3ID0gc2FtcGxlYW10ICogZndpZHRoKGRpc3QpOw0KICAgICAgICAgICAgdmVjMiBzYW1wbGVvZmZzZXQgPSBmYWN0b3IgKiAoZEZkeCh0Y29vcmQpICsgZEZkeSh0Y29vcmQpKTsNCiAgICAgICAgICAgIHZlYzQgZmx0ciA9IHZlYzQodGNvb3JkIC0gc2FtcGxlb2Zmc2V0LCB0Y29vcmQgKyBzYW1wbGVvZmZzZXQpOw0KDQogICAgICAgICAgICBmbG9hdCB0b3RhbCA9IGdldCggZmx0ci54eSwgc2FtcGxldyApICsgZ2V0KCBmbHRyLnp3LCBzYW1wbGV3ICkgKw0KICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQoIGZsdHIueHcsIHNhbXBsZXcgKSArIGdldCggZmx0ci56eSwgc2FtcGxldyApOw0KDQogICAgICAgICAgICBhbHBoYSA9IChhbHBoYSArIDAuNSAqIHRvdGFsKSAvIDMuMDsNCg0KICAgICAgICAjZW5kaWYgLy9TVVBFUlNBTVBMRQ0KDQogICAgICAgIC8vdGhlIGJhc2UgY29sb3IgKyBzY2FsZWQgYnkgdGhlIG5ldyBhbHBoYQ0KICAgIHZlYzQgZmluYWxDb2xvciA9IHZlYzQoY29sb3IucmdiLCBjb2xvci5hICogYWxwaGEpOw0KDQovL291dGxpbmUNCg0KICAgICNpZiBPVVRMSU5FID09IDENCg0KICAgICAgICAgICAgLy93aXANCiAgICAgICAgaWYob3V0bGluZSA+IDAuMCkgew0KDQogICAgICAgICAgICAvL3JhbmdlIG9mIDEuMCB+IDAuMSwgd2UgZ2V0IDAgfiAxDQogICAgICAgICAgICBmbG9hdCBfb3V0bGluZSA9IDAuOSAtIChvdXRsaW5lICogMC45KTsNCiAgICAgICAgICAgIGZsb2F0IF9vdXRsaW5lX2EgPSBlZGdlKF9vdXRsaW5lLCBzbW9vdGhhbXQsIGRpc3QpOw0KICAgICAgICAgICAgdmVjNCBfb3V0bGluZV9jID0gdmVjNChvdXRsaW5lX2NvbG9yLnJnYiwgb3V0bGluZV9jb2xvci5hICogX291dGxpbmVfYSk7DQoNCiAgICAgICAgICAgIGZpbmFsQ29sb3IgPSBtaXgoX291dGxpbmVfYywgZmluYWxDb2xvciwgYWxwaGEpOw0KDQogICAgICAgIH0gLy9vdXRsaW5lID4gMC4wDQoNCiAgICAjZW5kaWYgLy9PVVRMSU5FDQoNCi8vIGdsb3cNCg0KICAgICNpZiBHTE9XID09IDENCg0KICAgICAgICAgICAgLy93aXANCiAgICAgICAgaWYoZ2xvd19hbW91bnQgPiAwLjApIHsNCg0KICAgICAgICAgICAgLy86dG9kbzogZXhwb3NlIG9mZnNldCBmb3IgZGlyZWN0aW9uYWwgc2hhZG93DQogICAgICAgICAgICAvLyB2ZWMyIF9nbG93X29mZnMgPSB2ZWMyKDAsMCk7DQogICAgICAgICAgICAvLyBmbG9hdCBfZ2xvd19kaXN0ID0gdGV4dHVyZTJEKHRleDAsIHRjb29yZCAtIF9nbG93X29mZnNldCkuYTsNCg0KICAgICAgICAgICAgZmxvYXQgX2dsb3dfYW10ID0gMS4wIC0gZ2xvd19hbW91bnQ7DQogICAgICAgICAgICBmbG9hdCBfZ2xvd19saW1pdCA9IChfZ2xvd19hbXQgKiBnbG93X3RocmVzaG9sZCk7DQogICAgICAgICAgICBmbG9hdCBfZ2xvd19hID0gZWRnZShfZ2xvd19hbXQsIF9nbG93X2xpbWl0LCBkaXN0KTsNCiAgICAgICAgICAgIHZlYzQgIF9nbG93X2MgPSB2ZWM0KGdsb3dfY29sb3IucmdiLCBnbG93X2NvbG9yLmEgKiBfZ2xvd19hKTsNCg0KICAgICAgICAgICAgZmluYWxDb2xvciA9IG1peChfZ2xvd19jLCBmaW5hbENvbG9yLCBmaW5hbENvbG9yLmEpOw0KDQogICAgICAgIH0gLy9nbG93X2Ftb3VudCA+IDANCg0KICAgICNlbmRpZiAvL0dMT1cNCg0KLy9kb25lDQoNCiAgICBnbF9GcmFnQ29sb3IgPSBmaW5hbENvbG9yOw0KDQoNCn0gLy9tYWluDQo"}];
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
Luxe.version = "dev";
Luxe.build = "+f4e960f1c0";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
luxe_Tag.update = "update dt";
luxe_Tag.renderdt = "render dt";
luxe_Tag.game_update = "game.update";
luxe_Tag.render = "core.render";
luxe_Tag.updates = "core.updates";
luxe_Tag.debug_batch = "batcher.debug_batcher";
luxe_Debug.shut_down = false;
luxe_Physics.tag_physics = "physics";
luxe_debug_ProfilerDebugView.color_red = new phoenix_Color().rgb(13369344);
luxe_debug_ProfilerDebugView.color_green = new phoenix_Color().rgb(2263108);
luxe_debug_ProfilerDebugView.color_normal = new phoenix_Color().rgb(15790320);
luxe_tween_actuators_SimpleActuator.actuators = [];
luxe_tween_actuators_SimpleActuator.actuatorsLength = 0;
luxe_tween_actuators_SimpleActuator.addedEvent = false;
luxe_tween_actuators_SimpleActuator.update_timer = 0;
luxe_tween_actuators_SimpleActuator.current_time = 0;
luxe_tween_Actuate.defaultActuator = luxe_tween_actuators_SimpleActuator;
luxe_tween_Actuate.defaultEase = luxe_tween_easing_Quad.get_easeOut();
luxe_tween_Actuate.targetLibraries = new haxe_ds_ObjectMap();
phoenix_Batcher._sequence_key = -1;
phoenix_Texture.default_filter = 9729;
phoenix_Texture.default_clamp = 33071;
phoenix_geometry_Geometry._sequence_key = -1;
phoenix_geometry_TextGeometry.tab_regex = new EReg("\t","gim");
roi_js_Peers.ICESERVERS = [{ url : "stun:stun01.sipphone.com"},{ url : "stun:stun.ekiga.net"},{ url : "stun:stun.fwdnet.net"},{ url : "stun:stun.ideasip.com"},{ url : "stun:stun.iptel.org"},{ url : "stun:stun.rixtelecom.se"},{ url : "stun:stun.schlund.de"},{ url : "stun:stun.l.google.com:19302"},{ url : "stun:stun1.l.google.com:19302"},{ url : "stun:stun2.l.google.com:19302"},{ url : "stun:stun3.l.google.com:19302"},{ url : "stun:stun4.l.google.com:19302"},{ url : "stun:stunserver.org"},{ url : "stun:stun.softjoys.com"},{ url : "stun:stun.voiparound.com"},{ url : "stun:stun.voipbuster.com"},{ url : "stun:stun.voipstunt.com"},{ url : "stun:stun.voxgratia.org"},{ url : "stun:stun.xten.com"},{ url : "turn:numb.viagenie.ca", credential : "muazkh", username : "webrtc@live.com"},{ url : "turn:192.158.29.39:3478?transport=udp", credential : "JZEOEt2V3Qb0y27GRntt2u2PAYA=", username : "28224511:1379330808"},{ url : "turn:192.158.29.39:3478?transport=tcp", credential : "JZEOEt2V3Qb0y27GRntt2u2PAYA=", username : "28224511:1379330808"}];
roi_js_Peers._sequence = 0;
snow_api_Promises.calls = [];
snow_api_Promises.defers = [];
snow_api_Timer.running_timers = [];
snow_core_web_assets_Assets.POT = true;
snow_system_input_Scancodes.MASK = 1073741824;
snow_system_input_Scancodes.unknown = 0;
snow_system_input_Scancodes.key_a = 4;
snow_system_input_Scancodes.key_b = 5;
snow_system_input_Scancodes.key_c = 6;
snow_system_input_Scancodes.key_d = 7;
snow_system_input_Scancodes.key_e = 8;
snow_system_input_Scancodes.key_f = 9;
snow_system_input_Scancodes.key_g = 10;
snow_system_input_Scancodes.key_h = 11;
snow_system_input_Scancodes.key_i = 12;
snow_system_input_Scancodes.key_j = 13;
snow_system_input_Scancodes.key_k = 14;
snow_system_input_Scancodes.key_l = 15;
snow_system_input_Scancodes.key_m = 16;
snow_system_input_Scancodes.key_n = 17;
snow_system_input_Scancodes.key_o = 18;
snow_system_input_Scancodes.key_p = 19;
snow_system_input_Scancodes.key_q = 20;
snow_system_input_Scancodes.key_r = 21;
snow_system_input_Scancodes.key_s = 22;
snow_system_input_Scancodes.key_t = 23;
snow_system_input_Scancodes.key_u = 24;
snow_system_input_Scancodes.key_v = 25;
snow_system_input_Scancodes.key_w = 26;
snow_system_input_Scancodes.key_x = 27;
snow_system_input_Scancodes.key_y = 28;
snow_system_input_Scancodes.key_z = 29;
snow_system_input_Scancodes.key_1 = 30;
snow_system_input_Scancodes.key_2 = 31;
snow_system_input_Scancodes.key_3 = 32;
snow_system_input_Scancodes.key_4 = 33;
snow_system_input_Scancodes.key_5 = 34;
snow_system_input_Scancodes.key_6 = 35;
snow_system_input_Scancodes.key_7 = 36;
snow_system_input_Scancodes.key_8 = 37;
snow_system_input_Scancodes.key_9 = 38;
snow_system_input_Scancodes.key_0 = 39;
snow_system_input_Scancodes.enter = 40;
snow_system_input_Scancodes.escape = 41;
snow_system_input_Scancodes.backspace = 42;
snow_system_input_Scancodes.tab = 43;
snow_system_input_Scancodes.space = 44;
snow_system_input_Scancodes.equals = 46;
snow_system_input_Scancodes.leftbracket = 47;
snow_system_input_Scancodes.rightbracket = 48;
snow_system_input_Scancodes.backslash = 49;
snow_system_input_Scancodes.semicolon = 51;
snow_system_input_Scancodes.grave = 53;
snow_system_input_Scancodes.slash = 56;
snow_system_input_Scancodes.capslock = 57;
snow_system_input_Scancodes.f1 = 58;
snow_system_input_Scancodes.f2 = 59;
snow_system_input_Scancodes.f3 = 60;
snow_system_input_Scancodes.f4 = 61;
snow_system_input_Scancodes.f5 = 62;
snow_system_input_Scancodes.f6 = 63;
snow_system_input_Scancodes.f7 = 64;
snow_system_input_Scancodes.f8 = 65;
snow_system_input_Scancodes.f9 = 66;
snow_system_input_Scancodes.f10 = 67;
snow_system_input_Scancodes.f11 = 68;
snow_system_input_Scancodes.f12 = 69;
snow_system_input_Scancodes.printscreen = 70;
snow_system_input_Scancodes.insert = 73;
snow_system_input_Scancodes.home = 74;
snow_system_input_Scancodes.pageup = 75;
snow_system_input_Scancodes.end = 77;
snow_system_input_Scancodes.pagedown = 78;
snow_system_input_Scancodes.right = 79;
snow_system_input_Scancodes.left = 80;
snow_system_input_Scancodes.down = 81;
snow_system_input_Scancodes.up = 82;
snow_system_input_Scancodes.numlockclear = 83;
snow_system_input_Scancodes.kp_divide = 84;
snow_system_input_Scancodes.kp_multiply = 85;
snow_system_input_Scancodes.kp_minus = 86;
snow_system_input_Scancodes.kp_plus = 87;
snow_system_input_Scancodes.kp_1 = 89;
snow_system_input_Scancodes.kp_2 = 90;
snow_system_input_Scancodes.kp_3 = 91;
snow_system_input_Scancodes.kp_4 = 92;
snow_system_input_Scancodes.kp_5 = 93;
snow_system_input_Scancodes.kp_6 = 94;
snow_system_input_Scancodes.kp_7 = 95;
snow_system_input_Scancodes.kp_8 = 96;
snow_system_input_Scancodes.kp_9 = 97;
snow_system_input_Scancodes.kp_0 = 98;
snow_system_input_Scancodes.f13 = 104;
snow_system_input_Scancodes.f14 = 105;
snow_system_input_Scancodes.f15 = 106;
snow_system_input_Scancodes.f16 = 107;
snow_system_input_Scancodes.f17 = 108;
snow_system_input_Scancodes.f18 = 109;
snow_system_input_Scancodes.f19 = 110;
snow_system_input_Scancodes.f20 = 111;
snow_system_input_Scancodes.f21 = 112;
snow_system_input_Scancodes.f22 = 113;
snow_system_input_Scancodes.f23 = 114;
snow_system_input_Scancodes.f24 = 115;
snow_system_input_Scancodes.volumeup = 128;
snow_system_input_Scancodes.volumedown = 129;
snow_system_input_Scancodes.kp_decimal = 220;
snow_system_input_Scancodes.lctrl = 224;
snow_system_input_Scancodes.lshift = 225;
snow_system_input_Scancodes.lalt = 226;
snow_system_input_Scancodes.lmeta = 227;
snow_system_input_Scancodes.rmeta = 231;
snow_system_input_Scancodes.audiomute = 262;
snow_system_input_Keycodes.enter = 13;
snow_system_input_Keycodes.escape = 27;
snow_system_input_Keycodes.backspace = 8;
snow_system_input_Keycodes.tab = 9;
snow_system_input_Keycodes.exclaim = 33;
snow_system_input_Keycodes.quotedbl = 34;
snow_system_input_Keycodes.hash = 35;
snow_system_input_Keycodes.percent = 37;
snow_system_input_Keycodes.dollar = 36;
snow_system_input_Keycodes.ampersand = 38;
snow_system_input_Keycodes.quote = 39;
snow_system_input_Keycodes.leftparen = 40;
snow_system_input_Keycodes.rightparen = 41;
snow_system_input_Keycodes.asterisk = 42;
snow_system_input_Keycodes.plus = 43;
snow_system_input_Keycodes.comma = 44;
snow_system_input_Keycodes.minus = 45;
snow_system_input_Keycodes.period = 46;
snow_system_input_Keycodes.slash = 47;
snow_system_input_Keycodes.key_1 = 49;
snow_system_input_Keycodes.key_2 = 50;
snow_system_input_Keycodes.equals = 61;
snow_system_input_Keycodes.leftbracket = 91;
snow_system_input_Keycodes.backslash = 92;
snow_system_input_Keycodes.rightbracket = 93;
snow_system_input_Keycodes.caret = 94;
snow_system_input_Keycodes.underscore = 95;
snow_system_input_Keycodes.backquote = 96;
snow_system_input_Keycodes.capslock = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.capslock);
snow_system_input_Keycodes.f1 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f1);
snow_system_input_Keycodes.f2 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f2);
snow_system_input_Keycodes.f3 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f3);
snow_system_input_Keycodes.f4 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f4);
snow_system_input_Keycodes.f5 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f5);
snow_system_input_Keycodes.f6 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f6);
snow_system_input_Keycodes.f7 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f7);
snow_system_input_Keycodes.f8 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f8);
snow_system_input_Keycodes.f9 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f9);
snow_system_input_Keycodes.f10 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f10);
snow_system_input_Keycodes.f11 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f11);
snow_system_input_Keycodes.f12 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f12);
snow_system_input_Keycodes.printscreen = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.printscreen);
snow_system_input_Keycodes.insert = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.insert);
snow_system_input_Keycodes.home = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.home);
snow_system_input_Keycodes.pageup = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.pageup);
snow_system_input_Keycodes["delete"] = 127;
snow_system_input_Keycodes.end = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.end);
snow_system_input_Keycodes.pagedown = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.pagedown);
snow_system_input_Keycodes.right = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.right);
snow_system_input_Keycodes.left = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.left);
snow_system_input_Keycodes.down = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.down);
snow_system_input_Keycodes.up = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.up);
snow_system_input_Keycodes.numlockclear = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.numlockclear);
snow_system_input_Keycodes.kp_divide = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_divide);
snow_system_input_Keycodes.kp_multiply = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_multiply);
snow_system_input_Keycodes.kp_minus = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_minus);
snow_system_input_Keycodes.kp_plus = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_plus);
snow_system_input_Keycodes.kp_1 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_1);
snow_system_input_Keycodes.kp_2 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_2);
snow_system_input_Keycodes.kp_3 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_3);
snow_system_input_Keycodes.kp_4 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_4);
snow_system_input_Keycodes.kp_5 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_5);
snow_system_input_Keycodes.kp_6 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_6);
snow_system_input_Keycodes.kp_7 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_7);
snow_system_input_Keycodes.kp_8 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_8);
snow_system_input_Keycodes.kp_9 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_9);
snow_system_input_Keycodes.kp_0 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_0);
snow_system_input_Keycodes.f13 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f13);
snow_system_input_Keycodes.f14 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f14);
snow_system_input_Keycodes.f15 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f15);
snow_system_input_Keycodes.f16 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f16);
snow_system_input_Keycodes.f17 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f17);
snow_system_input_Keycodes.f18 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f18);
snow_system_input_Keycodes.f19 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f19);
snow_system_input_Keycodes.f20 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f20);
snow_system_input_Keycodes.f21 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f21);
snow_system_input_Keycodes.f22 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f22);
snow_system_input_Keycodes.f23 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f23);
snow_system_input_Keycodes.f24 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f24);
snow_system_input_Keycodes.volumeup = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.volumeup);
snow_system_input_Keycodes.volumedown = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.volumedown);
snow_system_input_Keycodes.kp_decimal = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_decimal);
snow_system_input_Keycodes.lctrl = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lctrl);
snow_system_input_Keycodes.lshift = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lshift);
snow_system_input_Keycodes.lalt = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lalt);
snow_system_input_Keycodes.lmeta = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lmeta);
snow_system_input_Keycodes.rmeta = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.rmeta);
snow_system_input_Keycodes.audiomute = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.audiomute);
snow_core_web_input_Input._keypress_blacklist = [snow_system_input_Keycodes.backspace,snow_system_input_Keycodes.enter];
snow_system_audio_Audio.splitter = " • ";
LuxeApp.main();
})(typeof console != "undefined" ? console : {log:function(){}});
