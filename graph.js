function defineGraph(){// create transition structures and define pictures set
	// show "please wait" message

	switch(exp.curMap){//structure
		case(0):
			G.nCol = 6;
			G.nRow = 6;
			G.nNodes=G.nCol*G.nRow; // previously called np
		break;
		case(1):
			G.nCol = 5;
			G.nRow = 5;
			G.nNodes=G.nCol*G.nRow;
		break;
		case(2):
			G.nCol = 4;
			G.nRow = 4;
			G.nNodes=G.nCol*G.nRow;
			/* missing links staff*/
			G.nodesWithMissLink = [1,5,7,11,9,10]; // missing links nodes. Previously called vnmis.
			G.whichLinkIsMiss = [[5],[1],[11],[7],[10],[9]]; // the other nodes on the missing links/edges - corresponds to G.nodesWithMIssLink
		break;
	}
	createTransMat();// create the transition matrix in 'typeAr' structural form
	G.distMat = calDistAdjMat(G.transMat);// calculate distance matrix

	// initialise emission matrix - which nodes correspond to which stimuli
	initEmissionMat()
}


function calDistAdjMat(transMat){
	var iNode,jNode,iNghbr,iNodeNghbrs,nNghbrs,flagNghbr;
	var nNodes = transMat.length;
	var D=[[]];
	var A = [[]];
	var An = [[]];
	// Alon: in the first part of the function numZ counts the number of zeros in A (which is also A^n (An) for n=1).
	// I'm not sure why it is usedd to get ito the while loop at the end of the function, where An is calculated.
	var numZ = 0;
	/*Initilizing D*/
	for (iNode=0;iNode<nNodes;iNode++){//initialization - just neighbours
		var nodeNghbrs = transMat[iNode]; // vector of neighbours of node iNode
			nNghbrs =nodeNghbrs.length;
		D[iNode].push( new Array(nNodes));
		A[iNode].push( new Array(nNodes));
		An[iNode].push( new Array(nNodes));
		for (jNode=0;jNode<nNodes;jNode++){
			flagNghbr = 0;
			for (iNghbr=0;iNghbr<nNghbrs;iNghbr++){
				// check if jNode is a neighbour of iNode
				if (nodeNghbrs[iNghbr]==jNode){
					flagNghbr=1;
					D[iNode][jNode]=1;
					A[iNode][jNode]=1;
					An[iNode][jNode]=1;
					break;
				}
			}
			if (flagNghbr==0){
				D[iNode][jNode]=0;
				A[iNode][jNode]=0;
				An[iNode][jNode]=0;
				numZ = numZ+1;
			}
		}
		// add placeholder for next node
		if(iNode<nNodes-1){
			D.push([]);
			A.push([]);
			An.push([]);
		}
	}

	// to calculate D, we will now calculate A^n for increasing n.
	// An[i,j]==1 means that D[]i,j]==n

	var n=2; // increased steps (this is the n of A^n)
	// Loop over n (increase n  by 1 every while loop). break the loop once numZ==nNodes
	// (note that it's initialized as numZ=nNodes, so the loop will break when there
	// are no more 0s at all in An)
	// Alon & Shirley: I understand how this loop works after you enter it. I don't understand when
	// should you not enter it at all (i.e. if if [number of 0s in A] <= nNodes )
	while (numZ>nNodes){
		// Alon: I think the reason to initialise numZ = nNodes is because there are always 0s on the diagonal of An
		numZ = nNodes;
		// calculate A^n
		An = multiplyMatrices(An,A);
		// add entries to D according to An
		for (iNode=0;iNode<nNodes;iNode++){
			for (jNode=0;jNode<nNodes;jNode++){
				if(iNode!=jNode){ // off-diagonal elements
					if(D[iNode][jNode]==0){
						if(An[iNode][jNode]!=0){ // distance between nodes is n
							D[iNode][jNode]=n;
						}else{ // An[iNode][jNode] is still 0 - distance between iNode and jNode is larger than n.
							numZ = numZ+1;
						}
					}
				}
			}
		}
		n = n+1;
	}
	return D;
}


function createTransMat(){
	/* create transition matrix according to structural form (typeAr)*/
	/* maxCov is the number of pictures in eacah plock of the learning phase*/
	switch(G.arrayType){
		case("recA"):
			G.transMat=createTransMatRect();
		break;
		case("HexA"):
			G.transMat=createHexNonPer();// non periodic Hexagonal structure
		break;
		case("clA"):
			G.transMat=createA2Acluster(G.nNodes,nc);// community structure
		break;
	}
	if(exp.curMap==exp.missLinkMapNum){
		G.transMatMiss = deleteMissLinks(G.transMat,G.nodesWithMissLink,G.whichLinkIsMiss); // Still need to write a function for the missing links questions (whichIsCloser)
		G.distMatMiss = calDistAdjMat(G.transMatMiss);
	}
}


function createTransMatRect() { // previously called createArect
	var transMat=[[]];
	var crNd // crNd current Node, indeces start at 0.
	for (crNd=0;crNd<G.nNodes;crNd++) { // "crNd" runs over all nodes
		var crNd1 = crNd+1; // crNd1 used to be called a1. it's the current node, starts indeces at 1 instead 0.
		var crNdCol1 = rem(crNd1,G.nCol); // current node's column num, indeces start at 1.
		if((crNdCol1>1) && (crNd1>G.nCol) && (crNd1<=G.nNodes-G.nCol)) { //not on any edge
			transMat[crNd].push( new Array(4));
			transMat[crNd][0] = crNd-1;
			transMat[crNd][1] = crNd+1;
			transMat[crNd][2] = crNd+G.nCol;
			transMat[crNd][3] = crNd-G.nCol;
		} else if (crNd1<=G.nCol) { //first row
			if (crNdCol1>1) { // not first or last column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0] = crNd-1;
				transMat[crNd][1] = crNd+1;
				transMat[crNd][2] = crNd+G.nCol;
			} else { // either first or last column
				switch(crNdCol1){
					case 0: // last column
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd-1;
					transMat[crNd][1]=crNd+G.nCol;
					break;
					case 1: // first column
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd+1;
					transMat[crNd][1]=crNd+G.nCol;
					break;
				}
			}
		} else if (crNd1>G.nNodes-G.nCol) { //last row
			if(crNdCol1>1){ // not first/last column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0] = crNd-1;
				transMat[crNd][1] = crNd+1;
				transMat[crNd][2] = crNd-G.nCol;
			} else { // either first or last column
				switch (crNdCol1) {
					case 0: // last column
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd-1;
					transMat[crNd][1]=crNd-G.nCol;
					break;
					case 1: // first coli,m
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd+1;
					transMat[crNd][1]=crNd-G.nCol;
					break;
				}
			}
		} else { // first or last columns, not first/last rows
			switch (crNdCol1) {
				case 0: // last column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0]=crNd-1;
				transMat[crNd][1]=crNd-G.nCol;
				transMat[crNd][2]=crNd+G.nCol;
				break;
				case 1: // first column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0]=crNd+1;
				transMat[crNd][1]=crNd-G.nCol;
				transMat[crNd][2]=crNd+G.nCol;
				break;
			}
		}
		if (crNd<G.nNodes-1) { // add placeholder for next node.
			transMat.push([]);
		}
	}
	return transMat
}


function deleteMissLinks(transMat,nodesWithMissLink,whichLinkIsMiss){// general function to introduce missing link
  var iNode,iMissNode,iOrigNghbr,k,iNghbrNotMiss,flag,flag2;
	var nNghbrs, nNghbrsOrigAr; // number of neighbours of a node, after/before deleteing missing links
  var transMatMiss=[[]];
  for(iNode=0;iNode<G.nNodes;iNode++){ // go over nodes/states
    flag=0;
		for(iMissNode=0;iMissNode<nodesWithMissLink.length;iMissNode++){
			// if current node is a node with missing link, flag and assign to "s" its index in "nodesWithMissLink"
			if(iNode==nodesWithMissLink[iMissNode]){
				flag = 1;
				break;
			}
		}
		nNghbrsOrigAr = transMat[iNode].length;// number of neighbours in the original array
		if (flag==0){// node has no missing link - copy neighbours
			nNghbrs = nNghbrsOrigAr;
			transMatMiss[iNode].push( new Array(nNghbrs));
			for (iOrigNghbr=0;iOrigNghbr<nNghbrs;iOrigNghbr++){
				transMatMiss[iNode][iOrigNghbr] = transMat[iNode][iOrigNghbr];
			}
			// node has missing links
		}else{
			nNghbrs = nNghbrsOrigAr-whichLinkIsMiss[iMissNode].length;
			transMatMiss[iNode].push( new Array(nNghbrs));
			iNghbrNotMiss=0;
			// loop over all neighbors of node (including missing links)
			for (iOrigNghbr=0;iOrigNghbr<nNghbrsOrigAr;iOrigNghbr++){
				// loop over missin links of node (unlikely there will be more than one, but keeping the function general)
				for(k=0;k<whichLinkIsMiss[iMissNode].length;k++){
					// only include neighbors from non-missing links in transMatMiss
					if (transMat[iNode][iOrigNghbr]!=whichLinkIsMiss[iMissNode][k]){
						transMatMiss[iNode][iNghbrNotMiss] = transMat[iNode][iOrigNghbr];
						iNghbrNotMiss = iNghbrNotMiss+1;
					}
				}
			}
		}
		if(iNode<G.nNodes-1){
      transMatMiss.push([]);
    }
  }
  return transMatMiss;
}


// if needed, initialise exp.imgFileNamesArr
function initEmissionMat() {
	var j1,j2;
	var nodeStr, imgFileName, nodeNum; // nodeStr will be the names of the columns in SQL table ("node" + nodeNum), storing the file names of images in their order in he current G. their tags are the indeces of the file names in exp.imgFileNamesArr
	var nImgStillUnassigned,vn=[]; // vn: vector of numbers.
	var randNodeVecTmp=[];
	var randNodesVec=[]; // this will be a vector with the filename numbers of images (e.g. 11 for the image of the file pic11.jpeg), in a random order

	// check if the images array already exists. If it does, return it in an array .
	// If it doesn't, return -1
	exp.pathToImgDir="/MEG/images/set" + exp.curMap.toString() + "/";
	exp.imgFileNamesArr = checkIfSubjectMapExists();
	if (exp.imgFileNamesArr[0]==-1){ // does not exists
		// If images array does not exist, create it (randomely assign images files to G.nodes - i.e. the emissions matrix)
		exp.imgFileNamesArr=[];
		for (j1=1;j1<=exp.nImgsInDir;j1++){
			randNodeVecTmp.push(j1); // randNodeVecTmp is a vector 1:exp.nImgsInDir
		}
		nImgStillUnassigned = exp.nImgsInDir;// exp.nImgsInDir is the number of pictures in the directory
		// sample without replacement indeces for pictures, store in randNodesVec
		for (j1=0;j1<=exp.maxNumNodes;j1++){ // exp.maxNumNodes is the length of the largest map of the experiment
			// get a random index between 1 and exp.nImgsInDir, and populate randNodesVec with it
			np0 = Math.floor(Math.random() * (nImgStillUnassigned));
			randNodesVec.push(randNodeVecTmp[np0]);
			// discard the used random index
			randNodeVecTmp.splice(np0, 1);
			nImgStillUnassigned = nImgStillUnassigned-1;
		}
		// initialise string to build mySQL command
		var sqlStr1 = "INSERT INTO imagesFilesTable (subjectId, map";
		var sqlStr2 = "VALUES " + "('" + exp.subjectId + "', " + exp.curMap.toString();
		// populate exp.imgFileNamesArr with img file names corresponding to randNodesVec
		for (j2=0; j2<exp.maxNumNodes;j2++){
			nodeNum = j2+1;
			nodeStr = "node" + nodeNum; // these will be the names of the columns in the SQL table, where the img files will be filled.
			imgFileName = "pic" + randNodesVec[j2].toString() + ".jpeg"
			exp.imgFileNamesArr.push(imgFileName);
			sqlStr1 = sqlStr1 + ", " + nodeStr;
			sqlStr2 = sqlStr2 + ", '" + imgFileName + "'"
		}
		var sqlStr = sqlStr1 + ") " + sqlStr2 + ")";
		// save to SQL. randNodesVec[j2] is the filenameTag saved in the images folders, e.g. "pic" + filenameTag + ".jpg"
		save2imagesFilesTable(sqlStr); // in ajaxFunctions.js
	}
	//
	preloadImages(exp.imgFileNamesArr)
	preloadImages(["../questionMark.jpeg","../whitePic.jpg"])
}

function checkIfSubjectMapExists(){
	var map=[]; // map is an array mapping image files to node numbers - exp.imgFileNamesArr
	var j;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// if map exists, it is returned in a JSON str. if not, an empty str is returned.
			var data = JSON.parse(this.responseText);
			if(data.length==0){ //if map does not exist
				map[0]=-1;
			}else{ // if exists, build map array
				// loop through images.
				for(j=0;j<exp.maxNumNodes;j++){
					map[j]=data[0][j+2]; // data[0] is a single row of SQL table, j indexes it. Start columns at 2 because the first column in data[0] is subjectId and the second is map
				}
			}
		}
	};
	xhttp.open("GET", "checkIfSubjectMapExists.php?subjectId=" + exp.subjectId + "&&map=" + exp.curMap, false);
	xhttp.send();
	return map;
}
