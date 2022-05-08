/* other functions*/

function maxArr(points){//find maximum of array
	points.sort(function(a, b){return a - b});
	return points[points.length-1];
}

// comment from shirley to Alon: the following 2 function do not seem to be recalled but I thing that they are useful so I have left them here 08/04/21
function minArr(points){//find minimum of array
	points.sort(function(a, b){return a - b});
	return points[0];
}

function sumArray(inputAr){
	var j;
	var sumA = 0;
	var len = inputAr.length;
	for(j=0;j<len;j++){
		sumA+=inputAr[j];
	}
	return sumA;
}

function rem(N,di){
	var m,r;
	m = Math.floor(N/di);
	r = N-m*di;
	return r;
}

function rem(N,di){
	// remainder function: same as what % does.

	var m,r;
	m = Math.floor(N/di);
	r = N-m*di;
	return r;
}

/*calculate response time*/
function calResponseTime(thisTimef,lastTime){
	var dMin=thisTimef.getMinutes()-lastTime.getMinutes();
	var dSec=thisTimef.getSeconds()-lastTime.getSeconds();
	var dHr=Math.abs(thisTimef.getHours()-lastTime.getHours());
	var dMs=thisTimef.getMilliseconds()-lastTime.getMilliseconds();
	var rtInSec;
	if (dMin<0){
		dMin = dMin+60;
		dHr = dHr-1;
	}
	if (dSec<0){
		dSec = dSec+60;
		dMin = dMin-1;
	}
	if (dMs<0){
		dMs = dMs+1000;
		dSec = dSec-1;
	}
	rtInSec = dHr*3600+dMin*60+dSec+dMs/1000;
	return rtInSec;
}
function myTimeout(a){
}


function checkKeyT(e) {// subject key choice to functions responses
	if (e.keyCode == '13'&&flagIsM==-1&&flagSp==2&&flagSs==-1&&flagQ==1){//enter
		conQ();
	}
	if (e.keyCode == '49'&&flagIsM==-1&&flagSp==2&&flagSs==-1&&flagQ==0){//1
		conExpQ(1);
	}
	if (e.keyCode == '50'&&flagIsM==-1&&flagSp==2&&flagSs==-1&&flagQ==0){//2
		conExpQ(2);
	}

	if (e.keyCode == '13'&&flagIsM==1&&flagSp==2&&flagSs==-1){//enter
		isItMiddle(0);
	}
	if (e.keyCode == '89'&&flagIsM==0&&flagSp==2&&flagSs==-1&&flagTr==1){//y
		isItMiddleYN(1);
	}
	if (e.keyCode == '78'&&flagIsM==0&&flagSp==2&&flagSs==-1&&flagTr==1){//n
		isItMiddleYN(0);
	}

	if(flagSs==0&&flagIsM==-1&&flagSp==2&&flagT==1&&flagTr==1){// for navigation task

		if (e.keyCode == '13'&&flagSs==0){
			cpic = 0;
			flagTr=0;
			conExpT(cpic);
		}
		if (e.keyCode == '85'&&flagSs==0){//(e.keyCode == '38'&&flagSs==0){//up
			cpic = 1;
			flagTr=0;
			conExpT(cpic);
		}
		if (e.keyCode == '68'&&flagSs==0){//(e.keyCode == '40'&&flagSs==0){//down
			cpic = 2;
			flagTr=0;
			conExpT(cpic);
		}

	}else{
		if (e.keyCode == '13'&&flagIsM==-1&&flagSs==1&&flagSp==2){
			flagSs=0;
			dispPic();
		}
	}
}

function calRem(num,div){// there are 2 functions for calculating reminder - can be cleaned
	m = Math.floor(num/div);
	r = num-m*div;
	return r;
}


function multiplyMatrices(m1, m2) {//Not My Code
	var result = [];
	var i,j,k;
	for (i = 0; i < m1.length; i++) {
		result[i] = [];
		for (j = 0; j < m2[0].length; j++) {
			var sum = 0;
			for (k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result;
}

function preloadImages(imageArray) {
	// counter
	var i = 0;
	// create object
	var images = new Array();

	// preload
	for(i=0; i<imageArray.length; i++)
	{
		images[i] = new Image();
		images[i].src = exp.pathToImgDir + imageArray[i];
	}
	console.log("preloaded images")
}
