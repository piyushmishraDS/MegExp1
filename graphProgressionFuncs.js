// pick one neighbour randomely
function findRandNghbr(transMat,node){ // previously called detNextPicGenA
	var out=transMat[node][Math.floor(transMat[node].length*Math.random())];
	return out;
}

function findRandNghbrExcept(transMat,n1,n2){ // previously called detNextPicGenAnoP2
	// returns a neighbour of node n1 which is not node n2 */

	var iNghbr,validNghbrs=[];
	for(iNghbr=0;iNghbr<transMat[n1].length;iNghbr++){ // loop over neighbours of n1
		if(transMat[n1][iNghbr]!=n2){
			validNghbrs.push(transMat[n1][iNghbr]);
		}
	}
	var out=validNghbrs[Math.floor((validNghbrs.length)*Math.random())];
	return out;
}


function isAneighbor(transMat,n1,n2){
	/*is n1 n2 neighbors? return 0 - not a neighbor or 1 - is a neibor*/
	var iNghbrN1,isNghbr;
	isNghbr = 0;
	for(iNghbrN1=0;iNghbrN1<transMat[n1].length;iNghbrN1++){
		if(transMat[n1][iNghbrN1]==n2){
			isNghbr=1;
			break;
		}
	}
	return isNghbr;
}

	function findRandNghbrExceptNghbrOf(transMat,n1,n2){ // previously called detNextPicGenAnoP2Gen
	/*This function select a neighbour of n1 which is not n2 or a neighbour of n2.*/
	// note this is using the FULL GRAPH transition matrix (G.transMat)
	var flagCurrentNodeIsNghbrOfN2=0;
	var iNghbrN1,iNghbrN2,validNghbrs=[];
	for(iNghbrN1=0;iNghbrN1<transMat[n1].length;iNghbrN1++){ // loop over node n1 nghbrs
		flagCurrentNodeIsNghbrOfN2=0;
		for(iNghbrN2=0;iNghbrN2<transMat[n2].length;iNghbrN2++){ // loop over node n2 nghbrs
			if(transMat[n1][iNghbrN1]==transMat[n2][iNghbrN2]){
				flagCurrentNodeIsNghbrOfN2=1;
			}
		}
		if(transMat[n1][iNghbrN1]!=n2 && flagCurrentNodeIsNghbrOfN2==0){
			validNghbrs.push(transMat[in1][iNghbrN1]);
		}
	}
	// randomly choose one of the valid nghbrs.
	return validNghbrs[Math.floor(validNghbrs.length*Math.random())];
}

function findRandTwoNghbrs(transMat,n1){ // previously called detNextPicExA2
	var validNghbrs=[];
	// choose one random nghbr of n1
	var out1=transMat[n1][Math.floor(transMat[n1].length*Math.random())];
	// choose another nghbr of n1 that is not out1
	var iNghbrN1;
	for (iNghbrN1=0;iNghbrN1<transMat[n1].length;iNghbrN1++){
		if(transMat[n1][iNghbrN1]!=out1){
			validNghbrs.push(transMat[n1][iNghbrN1]); // all nghbrs of n1 that are not out1
		}
	}
	var out2=validNghbrs[Math.floor(validNghbrs.length*Math.random())];
	return [out1,out2];;
}

function findRandTwoNghbrs_exceptPreviousOptionsIfPossible(transMat,n1,prev1,prev2){ // previously called detNextPicExAnoR
	// used in taskNavig. Find random two neighbours of n1. If there are 4 or more neighbors,
	// make sure not to select the nodes that were available in the previous trial (prev1 and prev2).
	// if there are 3 or less neighbors, just choose randomely (i.e. at least one of the outputs
	// will be either prev1 or prev2).

	var validNghbrs=[]; validNghbrs2 = [];
	var iNghbr; iValidNghbrsN1;
	for(iNghbr=0;iNghbr<transMat[n1].length;iNghbr++){ // loop over nghbrs of n1
		// if there are at least 2 nghbrs that were not used in the last trial, push only these to validNghbrs
		if(transMat[n1].length>3){
			if(transMat[n1][iNghbr]!=prev1 && transMat[n1][iNghbr]!=prev2){
				validNghbrs.push(transMat[n1][iNghbr]);
			}
		// if there are only 2 or 3 neighbors (i.e. there are 0 or 1 nghbrs that were not used in the last trial),
		// push all nghbrs (including the ones from previous trial) to validNghbrs
		}else{
			validNghbrs.push(transMat[n1][iNghbr]);
		}
	}
	// randomly choose one of the valid nghbrs for one of the outputs
	var out1=validNghbrs[Math.floor(validNghbrs.length*Math.random())];
	// make sure the second output is not the same as the first output
	for (iValidNghbrsN1=0;iValidNghbrsN1<validNghbrs.length;iValidNghbrsN1++){
		if(validNghbrs[iValidNghbrsN1]!=out1){
			validNghbrs2.push(validNghbrs[iValidNghbrsN1]);
		}
	}
	var out2=validNghbrs2[Math.floor(validNghbrs2.length*Math.random())];
	return [out1,out2];;
}

function find4thNodeOfPile(transMat,pileA,pileB,distFull){
	// Find a 4th node to match pileA (i.e. which is a neighbour of the third node in pileA
  // according to transmat. Note that transmat is G.transMatMiss for the runs with
	// missing links). Ensure this node is:
	// 1. not in pileA or pileB, and
	// 2. Is not connecrted on the full graph to the last (third) node pileB
	// (i.e. it is also NOT connected to the third node of pileB by a missing link)

	// declare nodes in the piles, for less clumsy notation later
	var nA1 = pileA[0];
	var nA2 = pileA[1];
	var nA3 = pileA[2];
	var nB1 = pileB[0];
	var nB2 = pileB[1];
	var nB3 = pileB[2];

	var j, validNghbrs_nA3=[], x;
	for(j=0;j<transMat[nA3].length;j++){ //loop neighbours of nA3
		x = transMat[nA3][j]; // x is the current candidate neighbour of nA3
		if (x!=nA2 && x!=nA1 && x!=nB1 && x!=nB2 && x!=nB3 // check the current neighbour of nA3 is not in any of the piles
			&& distFull[x][nB3]>1){ // the last inequality makes sure that the current neighbour of nA3 is not connected to the last node of pileB with a missing link
			validNghbrs_nA3.push(x);
		}
	}
	var nA4; // the 4th node of pile A - the desired output of the function.
	// if there are several valid neighbours of nA3, randomely choose one.
	if (validNghbrs_nA3.length>0){
		nA4=validNghbrs_nA3[Math.floor((validNghbrs_nA3.length)*Math.random())];
	// if there are no valid neighbours of n13, return -1.
	}else{
		nA4=-1;
	}
	return nA4;
}

function find4thNodeAwayFromPile(transMat,pileA,pileB){
	var target = Math.floor(Math.random() * (G.nNodes));
	var isNghbrPileANode3 = isAneighbor(transMat,pileA[2],target)
	var isNghbrPileBNode3 = isAneighbor(transMat,pileB[2],target)
	while (target==pileA[0] || target==pileA[1] || target==pileA[2] ||
	target==pileB[0] || target==pileB[1] || target==pileB[2] ||
	isNghbrPileANode3 || isNghbrPileBNode3 ) {
		target = Math.floor(Math.random() * (G.nNodes));
	}
	return target
}



function findTargGen(dS,inP,distMat){
	var Dinp = distMat[inP];
	var DdS =[];
	var j,lenS=0;
	for(j=0;j<G.nNodes;j++){
		if(Dinp[j]==dS){
			DdS.push(j); // all nodes with the wanted distance (dS) from inP
			lenS = lenS+1;
		}
	}
	var tind = Math.floor( lenS * Math.random());
	if(tind==lenS){
		tind=lenS-1;
	}
	var targ = DdS[tind];
	return targ;
}
function findTargGenWithMis(dS,inP,distMat,distMatMiss){
	var Dinp = distMat[inP];
	var DinpMiss = distMatMiss[inP];
	var DdS =[];
	var j,targ,lenS=0;
	for(j=0;j<G.nNodes;j++){
		if(Dinp[j]==dS&&DinpMiss[j]==dS){
			DdS.push(j);
			lenS = lenS+1;
		}
	}
	if(lenS>0){
		var tind = Math.floor( lenS * Math.random());
		if(tind==lenS){
			tind=lenS-1;
		}
		targ = DdS[tind];
	}else{
		targ = -1;
	}
	return targ;
}
