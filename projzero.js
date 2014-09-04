//projzero.js

var inc = function(x){
	return x+1;
};

var invocations = 0;
var counter = function(){
	invocations++;
	return invocations;
};

var Inc = function(){
	return (function(i){
		return i+1;
	});
};

var anonCounters = 0;
var Counter = function(){
	return (function(){
		anonCounters++;
		return anonCounters;
	});
};

var counterFromInvocations = 0;
var CounterFrom = function(z){
	return (function(){
		counterFromInvocations++;
		return z+counterFromInvocations;
	});
};

var makeArray = function(n,v){
	retArray = []
	for (var i=0;i<n;i++){
		retArray.push(v);
	}
};

function customException(message){
	this.name = "BadSize";
	this.message = message;
}

var checkNaNAndNegative = function(n)
{
	if isNaN(n) 
	{
		throw new customException("Size is not a number");
	}
	else if (n<0)
	{
		throw new customException("Negative size");

	}

};

var carefulMakeArray = function(n,v){
	checkNaNAndNegative(n);
	return makeArray(n,v);
	
};

var incArray = function(n){
	checkNaNAndNegative(n);
	retArray = [];
	for(var i=0;i<n;i++)
	{
		retArray.push(function(x){
			return x+1
		});
	}
	return retArray;
};

var carefulInvocations = 0;
var counterFromArray = function(n){
	checkNaNAndNegative(n);
	retArray = []
	for (var i=0; i<n;i++){
		retArray.push(function(){
			carefulInvocations++;
			return i+carefulInvocations;
		})
	}
};