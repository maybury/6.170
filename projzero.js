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

var Counter = function(){
	var anonCounters = 0;
	return (function(){
		anonCounters++;
		return anonCounters;
	});
};


var CounterFrom = function(z){
	var counterFromInvocations = 0;
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
	return retArray;
};

function customException(message){
	this.name = "BadSize";
	this.message = message;
}

var checkNaNAndNegative = function(n){
	if (isNaN(n)) 
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

var carefulInvocations;
var counterFromArray = function(n){
	if (carefulInvocations ==null)
	{
		carefulInvocations = makeArray(n,0);
	}
	checkNaNAndNegative(n);
	var retArray = [];
	for (var i=0; i<n;i++){
		var nextFunction = (function(j){
			var invocations = 0;
			return (function(){
				carefulInvocations[j]++;
				return j+carefulInvocations[j];
			});
		})(i);
		retArray.push(nextFunction);	
	}
	return retArray;
};
/*
var projzeroTests = function(){
	if(inc(2)!==3){
		console.log("inc failed" )
	}
	else
	{
		console.log("inc passed")
	}
	counter();
	counter();
	if(counter()!=3){
		console.log("counter failed")
	}
	else
	{
		console.log("counter passed" )
	}

	if(Inc()(2)!==3){
		console.log("Inc failed" )
	}
	else
	{
		console.log("Inc passed" )
	}
	Counter();
	Counter();
	var counterResult = Counter()();
	if(counterResult!==3){
		console.log("Counter failed"+ counterResult)
	}
	else
	{
		console.log("Counter passed" )
	}

	CounterFrom(0);
	CounterFrom(0);
	var result = CounterFrom(3)();
	if(result!==6){
		console.log("CounterFrom failed"+ result);
	}
	else
	{
		console.log("CounterFrom passed" )
	}


	if(makeArray(3,5)!= 5,5,5){
		console.log("makeArray failed"+ makeArray(3,5))
	}
	else
	{
		console.log("makeArray passed" )
	}
	
	try{carefulMakeArray("s",4)}
	catch(err){
		console.log("carefulMakeArray String input handled" )
	}
	try{carefulMakeArray(-1,4)}
	catch(err){
		console.log("carefulMakeArray negative Input handled" )
	}
	if(carefulMakeArray(1,4)!==[4])
	{
		console.log("carefulMakeArray failed"+ carefulMakeArray(1,4))	
	}
	else
	{
		console.log("carefulMakeArray passed" )
	}
	try{incArray("s")}
	catch(err){
		console.log("incArray handled string input" )
	}
	try{incArray(-1)}
	catch(err)
	{
		console.log("incArray handled negative input" )
	}
}
projzeroTests();
*/
