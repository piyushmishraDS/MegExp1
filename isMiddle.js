function isItMiddle(nn){// is it in the middle task
	flagSs = -1;//signal that it is not task part - important for response key function
	flagSp=2;
	flagCov = 0;//signal that it is not in the cover part
	flagTr=1;//can get an answer
    nrep=0;
	if(nn==1){
		y = y0;
		x = 0;
		clearCanvas(document.getElementById("myCanvas"),300,450);
		ncoinT=0;
		flagC=0;
		if(isNestDis==1){
			document.getElementById("nextIsM").disabled=true;
		}
		nrep=1;
	}else{
		nrep = nrep+1;
	}

	flagIsM=0;
	/*manage display*/
	document.getElementById("pilesTab").style.display="none";
	document.getElementById("navig").style.display="none";
	document.getElementById("isMiddle").style.display="inline";
	ism = Math.floor(Math.random() * (G.nNodes));

	if(exp.curMap>1){
		[ism1p,ism2p ]=findRandTwoNghbrs(G.transMatMiss,ism);
	}else{
		[ism1p,ism2p ]=findRandTwoNghbrs(G.transMat,ism);
	}

	var ismnew=ism;
	var nbism,j,j2,flagNb=0;
	ys=1;
	if(Math.random()<0.5){//make it not in the middle
		ys=0;
		while(ismnew==ism1p||ism2p==ismnew||ism==ismnew||flagNb==1){//fixed for fixed Ar - I want it not to be a neighbour of both of them on the complete graph
			ismnew = Math.floor(Math.random() * (G.nNodes));
			nbism = Ar[ismnew];
			flagNb=0;
			for(j=0;j<nbism.length;j++){
				if(ism1p==nbism[j]){
					for(j2=0;j2<nbism.length;j2++){
						if(ism2p==nbism[j2]){
							flagNb=1;
						}
					}
				}
			}
		}
		ism = ismnew;
	}
	/* the pictures*/
	im1.src = exp.pathToImgDir + exp.imgFileNamesArr[ism1p];
	im2.src = exp.pathToImgDir + exp.imgFileNamesArr[ism2p];
	im3.src = exp.pathToImgDir + exp.imgFileNamesArr[ism];

	/* manage display*/
	document.getElementById("im3").style.display="inline";
	document.getElementById("im3div").style.display="inline";
	document.getElementById("im3cor").style.display="none";
	document.getElementById("im3con").style.display="none";

	thisLast=new Date();
}

function isItMiddleYN(yn){// check if correct and give feedback
	var corA;
	var  thisTime=new Date();
	var RTm = calResponseTime(thisTime,thisLast);
	if(ys==yn){
		ncoin = ncoin+1;
		ncoinT = ncoinT+1;
		corA =1;
		document.getElementById("im3cor").innerHTML = "Correct!";
		flagIsM=1;
		document.getElementById("im3div").style.display="none";
		document.getElementById("im3cor").style.display="inline";
		if(ys==1){
			document.getElementById("im3cor").style.color="green";
		}else{
			document.getElementById("im3cor").style.color="blue";
		}
		document.getElementById("im3con").style.display="inline";
		if (flagC==0){
			plotCircle(document.getElementById("myCanvas"),y,"blue",x);
		}else{
			replotCircle(document.getElementById("myCanvas"),y,x);
		}
		y = y-dy;
	}else{
		if (ncoinT>0){
			y = y+dy;
			ncoinT = ncoinT-1;
		}
		flagIsM=1;
		ncoin = ncoin-1;

		document.getElementById("im3div").style.display="none";
		document.getElementById("im3cor").innerHTML = "NOT Correct!";
		document.getElementById("im3cor").style.display="inline";
		document.getElementById("im3cor").style.color="red";
		document.getElementById("im3con").style.display="inline";
		ncolCrc = ncolCrc-1;
		corA=0;
		clearCircle(document.getElementById("myCanvas"),y,x);
	}
	document.getElementById("ncoinP").style.display="inline";
	document.getElementById("ncoinP").innerHTML=ncoin+" coins";
	if(y<=0){
		x = x+dx;
		y = y0;
	}
	if(y>y0&&ncolCrc>1){
		x = x-dx;
		y = 0;
	}
	save2isMiddleTable(nrep,RTm,corA);// save data into sql table
	if (nrep>maxIsM){// if number of trials exceeded maxIsM start navigation task with intial distance 2 between current picture and target picture
		if(exp.curRun<9){
			startNavigTask(2);
		}else{
			startWhichIsCloser(0);
		}
	}
}

function writeResp(){// go to next task
	if(exp.curRun<9){
		startNavigTask(2);
	}else{
		startWhichIsCloser(0);
	}
}
