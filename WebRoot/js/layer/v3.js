SuperMap.Layer.Google.v3={DEFAULTS:{sphericalMercator:true,projection:"EPSG:900913"},animationEnabled:true,loadMapObject:function(){if(!this.type){this.type=google.maps.MapTypeId.ROADMAP}var d;var c=SuperMap.Layer.Google.cache[this.map.id];if(c){d=c.mapObject;++c.count}else{var b=this.map.viewPortDiv;var e=document.createElement("div");e.id=this.map.id+"_GMapContainer";e.style.position="absolute";e.style.width="100%";e.style.height="100%";b.appendChild(e);var a=this.map.getCenter();d=new google.maps.Map(e,{center:a?new google.maps.LatLng(a.lat,a.lon):new google.maps.LatLng(0,0),zoom:this.map.getZoom()||0,mapTypeId:this.type,disableDefaultUI:true,keyboardShortcuts:false,draggable:false,disableDoubleClickZoom:true,scrollwheel:false,streetViewControl:false});c={mapObject:d,count:1};SuperMap.Layer.Google.cache[this.map.id]=c;this.repositionListener=google.maps.event.addListenerOnce(d,"center_changed",SuperMap.Function.bind(this.repositionMapElements,this))}this.mapObject=d;this.setGMapVisibility(this.visibility)},repositionMapElements:function(){google.maps.event.trigger(this.mapObject,"resize");var f=this.mapObject.getDiv().firstChild;if(!f||f.childNodes.length<3){this.repositionTimer=window.setTimeout(SuperMap.Function.bind(this.repositionMapElements,this),250);return false}var d=SuperMap.Layer.Google.cache[this.map.id];var b=this.map.viewPortDiv;for(var e=f.children.length-1;e>=0;--e){if(f.children[e].style.zIndex==1000001){var c=f.children[e];b.appendChild(c);c.style.zIndex="1100";c.style.bottom="";c.className="olLayerGoogleCopyright olLayerGoogleV3";c.style.display="";d.termsOfUse=c}if(f.children[e].style.zIndex==1000000){var a=f.children[e];b.appendChild(a);a.style.zIndex="1100";a.style.bottom="";a.className="olLayerGooglePoweredBy olLayerGoogleV3 gmnoprint";a.style.display="";d.poweredBy=a}if(f.children[e].style.zIndex==10000002){b.appendChild(f.children[e])}}this.setGMapVisibility(this.visibility)},onMapResize:function(){if(this.visibility){google.maps.event.trigger(this.mapObject,"resize")}else{var a=SuperMap.Layer.Google.cache[this.map.id];if(!a.resized){var b=this;google.maps.event.addListenerOnce(this.mapObject,"tilesloaded",function(){google.maps.event.trigger(b.mapObject,"resize");b.moveTo(b.map.getCenter(),b.map.getZoom());delete a.resized})}a.resized=true}},setGMapVisibility:function(g){var b=SuperMap.Layer.Google.cache[this.map.id];if(b){var e=this.type;var f=this.map.layers;var d;for(var c=f.length-1;c>=0;--c){d=f[c];if(d instanceof SuperMap.Layer.Google&&d.visibility===true&&d.inRange===true){e=d.type;g=true;break}}var a=this.mapObject.getDiv();if(g===true){this.mapObject.setMapTypeId(e);a.style.left="";if(b.termsOfUse&&b.termsOfUse.style){b.termsOfUse.style.left="";b.termsOfUse.style.display="";b.poweredBy.style.display=""}b.displayed=this.id}else{delete b.displayed;a.style.left="-9999px";if(b.termsOfUse&&b.termsOfUse.style){b.termsOfUse.style.display="none";b.termsOfUse.style.left="-9999px";b.poweredBy.style.display="none"}}}},getMapContainer:function(){return this.mapObject.getDiv()},getMapObjectBoundsFromOLBounds:function(c){var b=null;if(c!=null){var a=this.sphericalMercator?this.inverseMercator(c.bottom,c.left):new SuperMap.LonLat(c.bottom,c.left);var d=this.sphericalMercator?this.inverseMercator(c.top,c.right):new SuperMap.LonLat(c.top,c.right);b=new google.maps.LatLngBounds(new google.maps.LatLng(a.lat,a.lon),new google.maps.LatLng(d.lat,d.lon))}return b},getMapObjectLonLatFromMapObjectPixel:function(h){var b=this.map.getSize();var f=this.getLongitudeFromMapObjectLonLat(this.mapObject.center);var d=this.getLatitudeFromMapObjectLonLat(this.mapObject.center);var a=this.map.getResolution();var g=h.x-(b.w/2);var e=h.y-(b.h/2);var c=new SuperMap.LonLat(f+g*a,d-e*a);if(this.wrapDateLine){c=c.wrapDateLine(this.maxExtent)}return this.getMapObjectLonLatFromLonLat(c.lon,c.lat)},getMapObjectPixelFromMapObjectLonLat:function(e){var d=this.getLongitudeFromMapObjectLonLat(e);var c=this.getLatitudeFromMapObjectLonLat(e);var a=this.map.getResolution();var b=this.map.getExtent();return this.getMapObjectPixelFromXY((1/a*(d-b.left)),(1/a*(b.top-c)))},setMapObjectCenter:function(a,c){if(this.animationEnabled===false&&c!=this.mapObject.zoom){var b=this.getMapContainer();google.maps.event.addListenerOnce(this.mapObject,"idle",function(){b.style.visibility=""});b.style.visibility="hidden"}this.mapObject.setOptions({center:a,zoom:c})},getMapObjectZoomFromMapObjectBounds:function(a){return this.mapObject.getBoundsZoomLevel(a)},getMapObjectLonLatFromLonLat:function(d,b){var c;if(this.sphericalMercator){var a=this.inverseMercator(d,b);c=new google.maps.LatLng(a.lat,a.lon)}else{c=new google.maps.LatLng(b,d)}return c},getMapObjectPixelFromXY:function(a,b){return new google.maps.Point(a,b)},destroy:function(){if(this.repositionListener){google.maps.event.removeListener(this.repositionListener)}if(this.repositionTimer){window.clearTimeout(this.repositionTimer)}SuperMap.Layer.Google.prototype.destroy.apply(this,arguments)}};