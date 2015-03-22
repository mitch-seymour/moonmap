/*
 * MoonMap - v0.0.1
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Mitch Seymour
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
; MoonMap = function(querySelector, options){
	
	// keep track of the moons we've added
	this.moons = [];
	
	this.lastRotation = 0;
	this.selector = querySelector;
	
	// keep track of the currently active moon
	this.currentlyActive = -1;
	
	if (typeof options !== 'object')
		options = {};
		
	var defaults = {
		active: function(){}, // active event
		activeClass: 'active',
		content: '',
		degrees: 360,
		margin: 0,
		moonClass: 'moon',
		n: 12,
		radius:false,
		removeOriginal: true,
		startAngle: 90
	};
	
	// Define the method for merging options
	this.extend = function( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	// Make sure a querySelector was defined
	if (typeof querySelector == 'undefined'){
		console.error('No query selector was provided to the MoonMap constructor');
		return;
	}
	
	var element  = document.querySelector(querySelector);
	this.options = this.extend(defaults, options);
	this.map = element;
	
	this.makeAbsolute = function(str){
    	
    	return '<div style="position:relative"><div class="_moon_content" style="position:absolute;width:100%;height:100%">' + str + '</div></div>';
       		
    
    }
	
	if (!this.options.radius)
		this.options.radius = element.offsetWidth + this.options.margin;
	
	// Calculate the offsets
	var offsetToParentCenter = parseInt(element.offsetWidth / 2);  //assumes parent is square
	
	// Append the moons
	if (typeof this.options['moonSelector'] !== 'undefined'){
		
		// moons are defined in the DOM
		var moons = document.querySelectorAll(this.options['moonSelector']),
			n = moons.length,
			div = 360 / n,
			angle = 360 - this.options.startAngle;
	
		for (var i = 0; i < n; ++i){
		
        	var moon = document.createElement('div'),
        		node = moons[i].cloneNode(true),
        		y = Math.sin((angle) * (Math.PI / 180)) * this.options.radius,
        		x = Math.cos((angle) * (Math.PI / 180)) * this.options.radius;
        	
        	moon.className = this.options.moonClass;
        	moon.style.position = 'absolute';
        	moon.style.visibility = 'hidden';
       		moon.innerHTML = this.makeAbsolute(node.outerHTML);
       		
        	element.appendChild(moon);
        	
        	var offsetToChildCenter = moon.offsetWidth / 2,
				totalOffset = offsetToParentCenter - offsetToChildCenter;

				
        	moon.style.top = (y + totalOffset).toString() + "px";
       		moon.style.left = (x + totalOffset).toString() + "px";
       		moon.style.visibility = 'visible';
        	
        	
        	if (this.options.removeOriginal)
        		moons[i].parentNode.removeChild(moons[i]);
        		
        	this.moons.push(moon);
        	
        	angle += div;
    	}
	
	
	} else {
		
		// moons are NOT defined in the DOM, and are added programmatically
		var n = this.options.n,
			div = 360 / n,
			angle = 360 - this.options.startAngle;
			
			
		for (var i = 1; i <= this.options.n; ++i){
		    
        	var moon = document.createElement('div'),
        		y = Math.sin((angle) * (Math.PI / 180)) * this.options.radius,
        		x = Math.cos((angle) * (Math.PI / 180)) * this.options.radius;
        	
        	moon.className = this.options.moonClass;
        	moon.style.position = 'absolute';
        	moon.style.visibility = 'hidden';
        	
        	// check to see if a content setter function was passed in the options
        	if (typeof this.options.content == 'function'){
       			
       			moon.innerHTML = this.makeAbsolute(this.options.content(i, moon));
       			
       		} else if (this.options.content){
       		
       			moon.innerHTML = this.makeAbsolute(this.options.content);
       		}
       		
       		element.appendChild(moon);
        	
        	var offsetToChildCenter = moon.offsetWidth / 2,
				totalOffset = offsetToParentCenter - offsetToChildCenter;
        	
        	moon.style.top = (y + totalOffset).toString() + "px";
       		moon.style.left = (x + totalOffset).toString() + "px";
       		moon.style.visibility = 'visible';

        	
        	this.moons.push(moon);
        	
        	angle += div;
        	
    	}
    	
    }
    
    this.moonEvent = function(event, fn){
    	
    	var map = this;
    	
    	for (var i = 0; i < this.moons.length; i++){
    		
    		this.moons[i].addEventListener(event, function(){
    		
    			fn(this, map);
    		});
    	
    	}
    
    }
    
    this.rotateMoons = function(degrees, ms){

		if (typeof degrees == 'undefined')
			degrees = 90;
			
		if (typeof ms == 'undefined')
			ms = 1000;
		
		var seconds = ms / 1000,
			prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', ''],
			newPosition = this.lastRotation + degrees;
			
		this.lastRotation = degrees;
	
    	for (var k = 0; k < prefixes.length; k++){
    			
    		var prefix = prefixes[k];
    			
    		this.map.style[prefix + 'transition'] = 'all ' + seconds + 's ease-in-out';
    		this.map.style[prefix + 'transform'] = 'rotate(' + degrees + 'deg)';
    		
    
    		
    	}
    	
    }
    
    this.current = function(){
    
    	return this.currentlyActive;
    }
    
    this.next = function(){
    
    	var nextActive = this.currentlyActive + 1;
    		
    	if (nextActive > this.moons.length-1)
    		nextActive = 0;
    		
    	return nextActive;
    		
    	
    }
    
    this.previous = function(){
    	
    	prevActive = this.currentlyActive -1;
    	
    	if (typeof this.moons[prevActive] == 'undefined')
    		prevActive = this.moons.length-1;
    		
    	return prevActive;
    		
    
    }
    
    this.startCarousel = function(speed){
    	
    	if (typeof speed == 'undefined')
    		speed = 1200;
    		
    	var obj = this,
    		options = this.options;
    	
    	setInterval(function(){
    	
    		var moons = obj.moons,
    			prevActive = obj.current(),
    			nextActive = obj.next();
    			
    		obj.currentlyActive = nextActive;
    		
    		// Remove the highlighted class
    		if (typeof moons[prevActive] !== 'undefined')
    			moons[prevActive].className = 'moon';
    		
    		// Add the highlighted class to the newly activated element
    		moons[nextActive].className = moons[nextActive].className + ' ' + options.activeClass;
    		
    		if (typeof options.active == 'function')
    			options.active(obj);
    		
    	
    	}, speed);

    
    }
	
}