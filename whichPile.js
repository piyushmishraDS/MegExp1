function initPilesTask(){
	var i;

	pileObj.runScore = 0;

	// choose trials where the target will not be connected to either pile.
	pileObj.noRightAnsTrials = [];
	for (i=0;i<pileObj.nNoRightAnsTrials;i++){
		pileObj.noRightAnsTrials.push(Math.floor(Math.random() * pileObj.maxTrial))
	}
	pileObj.missLinkTrials = [];

	// set the (local) transition matrix to work with from the global G obj - either the full or missing links matrix.
	if (exp.mapsVec[exp.curRun]!=exp.missLinkMapNum){ // early runs
		// transition matrix is the full matrix - no missing links
		pileObj.transMat = G.transMat;
	}else{ // late runs - choose trials that will have a missing link
		pileObj.transMat = G.transMatMiss;
		// keep track of which missing link nodes have already been used in missing link
		// trials - to make sure we don'tsample the same missing link twice.
		pileObj.missLinkNodes = G.nodesWithMIssLink;
		pileObj.whichLinkIsMiss = G.whichLinkIsMiss;
		// choose trials to probe missing links
		var tmpMissLinkTrial // variable to store trial number - to check it hasn't been sampled yet
		for (i=0;i<=pileObj.nMissLinkTrials;i++){
			// pick a random trial
			tmpMissLinkTrial = Math.floor(Math.random() * pileObj.maxTrial)
			// check this rtial hasn't yet been picked - either as a missing link
			// trial or a noRightAns trial. If it was already picked, resample.
			while (pileObj.missLinkTrials.includes(tmpMissLinkTrial) || pileObj.noRightAnsTrials.includes(tmpMissLinkTrial)) {
				tmpMissLinkTrial = Math.floor(Math.random() * pileObj.maxTrial)
			}
			pileObj.missLinkTrials.push(tmpMissLinkTrial)
		}

	}
	pilesTrial()
}


function pilesTrial(){// piles task

	// *** *** change so that:
	// 1. have an option of "no pile is correct"
	// 2. feedback only at the end of parts
	// 3. the total score should be on the full, not missing graph.
	// 4. add missing links piles questions: target is connected to one of the piles
	// only if assuming missing links. Subject should choose that pile iof they know
	// the full graph, but ishould choose "no-pile" if they don't know,
	// 5. Get rid of "both piles" option

	// Things to think about when choosing the piles and target images:
	// 1. There are two types of questions:
	// A. no missing link questions are involved - need to check that the target is
	// not in one of the piles and that it is not connected to the other pile on the full graph.
	// This is what find4thNodeOfPile does.
	// B. the target is connected to one of the piles by a missing link.

	// initialise

	pileObj.answerAvailableFlag = false;

	pileObj.targetNode = -1;
	pileObj.pile1Img1 = "";
	pileObj.pile1Img2 = "";
	pileObj.pile1Img3 = "";
	pileObj.pile1Img4 = "";
	pileObj.pile2Img1 = "";
	pileObj.pile2Img2 = "";
	pileObj.pile2Img3 = "";
	pileObj.pile2Img4 = "";


	/* manage display*/
	document.getElementById("pilesTab").style.display="block";
	document.getElementById("pilesButtonsDiv").style.display="none";
	document.getElementById("pilesNextTrialDiv").style.display="none";

	// display empty piles
	document.getElementById("pile1Img1").style.visibility="hidden";
	document.getElementById("pile1Img2").style.visibility="hidden";
	document.getElementById("pile1Img3").style.visibility="hidden";
	document.getElementById("pile1Img4").style.visibility="hidden";
	document.getElementById("pile2Img1").style.visibility="hidden";
	document.getElementById("pile2Img2").style.visibility="hidden";
	document.getElementById("pile2Img3").style.visibility="hidden";
	document.getElementById("pile2Img4").style.visibility="hidden";


	/* build piles (sequences of nodes)*/

	// if we are in trials where we use missing links (only in the late runs)
	if (pileObj.missLinkTrials.includes(pileObj.trial)){
		// choose target - must be a node with a missing links
		var indOfTargetInMissLinkNodes = Math.floor(Math.random() * (pileObj.missLinkNodesToUse.length))
		pileObj.targetNode = pileObj.missLinkNodes[indOfTargetInMissLinkNodes]

		// choose which pile will be correct - which pile will have a node with missing link
		if(Math.random()<0.5){ // pile 1 is correct
			pileObj.correctPile = 1;
			// 3rd image in pile must be the one connected with a missing link to target
			pileObj.pile1Img3 = pileObj.whichLinkIsMiss[indOfTargetInMissLinkNodes][0]
			pileObj.pile1Img2=findRandNghbr(pileObj.transMat,pileObj.pile1Img3);
			pileObj.pile1Img1=findRandNghbrExcept(pileObj.transMat,pileObj.pile1Img2,pileObj.pile1Img3);

			pileObj.pile2Img1 = Math.floor(Math.random() * (G.nNodes));
			// ensure first nodes of both piles are not the same
			while(pileObj.pile1Img1==pileObj.pile2Img1){
				pileObj.pile2Img1 = Math.floor(Math.random() * (G.nNodes));
			}
			pileObj.pile2Img2=findRandNghbr(pileObj.transMat,pileObj.pile2Img1);

			// ensure 3rd image in the non-target pile is not connected on the full graph to the target
			pileObj.pile2Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile2Img2,pileObj.pile2Img1);
			while (G.transmat[pileObj.targetNode].includes(pileObj.pile2Img3)){
				pileObj.pile2Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile2Img2,pileObj.pile2Img1);
			}
		}	else { // all as before except switching pile 1 and pile 2
			pileObj.correctPile = 2;
			// 3rd image in pile must be the one connected with a missing link to target
			pileObj.pile2Img3 = pileObj.whichLinkIsMiss[indOfTargetInMissLinkNodes][0]
			pileObj.pile2Img2=findRandNghbr(pileObj.transMat,pileObj.pile2Img3);
			pileObj.pile2Img1=findRandNghbrExcept(pileObj.transMat,pileObj.pile2Img2,pileObj.pile2Img3);

			pileObj.pile1Img1 = Math.floor(Math.random() * (G.nNodes));
			// ensure first nodes of both piles are not the same
			while(pileObj.pile2Img1==pileObj.pile1Img1){
				pileObj.pile1Img1 = Math.floor(Math.random() * (G.nNodes));
			}
			pileObj.pile1Img2=findRandNghbr(pileObj.transMat,pileObj.pile1Img1);

			// ensure 3rd image in the non-target pile is not connected on the full graph to the target
			pileObj.pile1Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile1Img2,pileObj.pile1Img1);
			while (G.transmat[pileObj.targetNode].includes(pileObj.pile1Img3)){
				pileObj.pile1Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile1Img2,pileObj.pile1Img1);
			}
		}
		// don't use the same target node in the next missing link trials (note that the same link can be used - in the opposite direction)
		pileObj.missLinkNodes.splice(indOfTargetInMissLinkNodes,1)
		pileObj.whichLinkIsMiss.splice(indOfTargetInMissLinkNodes,1)

		displayPiles();

	// all other trials (most trials - no missing links)
	} else {
		// Randomely sample the first node of each pile
		pileObj.pile1Img1 = Math.floor(Math.random() * (G.nNodes));
		pileObj.pile2Img1 = Math.floor(Math.random() * (G.nNodes));
		// ensure first nodes of both piles are not the same
		while(pileObj.pile1Img1==pileObj.pile2Img1){
			pileObj.pile2Img1 = Math.floor(Math.random() * (G.nNodes));
		}

		pileObj.pile1Img2=findRandNghbr(pileObj.transMat,pileObj.pile1Img1);
		pileObj.pile2Img2=findRandNghbr(pileObj.transMat,pileObj.pile2Img1);
		pileObj.pile1Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile1Img2,pileObj.pile1Img1);
		pileObj.pile2Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile2Img2,pileObj.pile2Img1);


		//  this while loop is for checking that the last image in the two piles is
		// not the same. If it is, sample another image from the neighbours of (one of the piles's) second
		// image. if there isn't another neighbour of the second image in both piles, start over to sample new piles.
		while (pileObj.pile2Img3==pileObj.pile1Img3){
			if (pileObj.transMat[pileObj.pile2Img2].length>1){
				pileObj.pile2Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile2Img2,pileObj.pile2Img1);
			}else{
				if (pileObj.transMat[pileObj.pile1Img2].length>1){
					pileObj.pile1Img3=findRandNghbrExcept(pileObj.transMat,pileObj.pile1Img2,pileObj.pile1Img1);

				}else{
					pileObj.trial=pileObj.trial-1;
					pilesTrial();
				}
			}
		}

		var pile1all = [pileObj.pile1Img1,pileObj.pile1Img2,pileObj.pile1Img3];
		var pile2all = [pileObj.pile2Img1,pileObj.pile2Img2,pileObj.pile2Img3];

		// find target (4th node)

		// trials where the correct answer is "neither"
		if (pileObj.noRightAnsTrials.includes(pileObj.trial)){
			pileObj.correctPile = 0;
			pileObj.targetNode=find4thNodeAwayFromPile(pileObj.transMat,pile1all,pile2all)

			// all other trials
		} else {
			// Randomly choose if the correct answer will be pile1 or pile2, and then find a suitable target node for the that pile.
			// a suitable target is a neighbour of the third image of the the pile which is
			// 1. not in any of the piles; 2. not connected on the full graph to the other pile
			if(Math.random()<0.5){
				pileObj.targetNode=find4thNodeOfPile(pileObj.transMat,pile1all,pile2all,G.distMat);
				pileObj.correctPile = 1;
			}else{
				pileObj.targetNode=find4thNodeOfPile(pileObj.transMat,pile2all,pile1all,G.distMat);
				pileObj.correctPile = 2;
			}
		}
		//  if didn't manage to find suitable target node, run again to find new piles and target
		if (pileObj.targetNode==-1){
			pileObj.trial=pileObj.trial-1;
			pilesTrial();
		} else {
			displayPiles();
		}
	}
}

function displayPiles(){
	// display target image
	document.getElementById("pileTarget").src=exp.pathToImgDir + exp.imgFileNamesArr[pileObj.targetNode];
	document.getElementById("pile1Img1").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile1Img1];
	document.getElementById("pile1Img2").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile1Img2];
	document.getElementById("pile1Img3").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile1Img3];
	document.getElementById("pile1Img4").src = "/MEG/images/whitePic.jpg";
	document.getElementById("pile2Img1").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile2Img1];
	document.getElementById("pile2Img2").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile2Img2];
	document.getElementById("pile2Img3").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile2Img3];
	document.getElementById("pile2Img4").src = "/MEG/images/whitePic.jpg";

	/* display images in piles*/
	setTimeout(function(){
		document.getElementById("pile1Img1").style.visibility="visible";},
		1000);
	setTimeout(function(){
		document.getElementById("pile1Img2").style.visibility="visible";},
		1600);
	setTimeout(function(){
		document.getElementById("pile1Img3").style.visibility="visible";},
		2200);
	setTimeout(function(){
		document.getElementById("pile1Img4").style.visibility="visible";},
		2800);
	setTimeout(function(){
		document.getElementById("pile2Img1").style.visibility="visible";},
		3800);
	setTimeout(function(){
		document.getElementById("pile2Img2").style.visibility="visible";},
		4400);
	setTimeout(function(){
		document.getElementById("pile2Img3").style.visibility="visible";},
		5000);
	setTimeout(function(){
		document.getElementById("pile2Img4").style.visibility="visible";
		answerAvailableFlag = true;},5600);

	pileObj.lastImgPresentTime = new Date();

	setTimeout(function(){ document.getElementById("pilesButtonsDiv").style.display="block"},
	7000);
}

function conExp_piles(ans){// check particpants answer
	pileObj.trial = pileObj.trial+1; // count trials
	document.getElementById("pilesButtonsDiv").style.display="none";
	document.getElementById("pilesNextTrialDiv").style.display="inline";
	pileObj.response = ans;
	var  buttonPressTime = new Date();
	pileObj.rt = calResponseTime(buttonPressTime,pileObj.lastImgPresentTime);
	if(ans==pileObj.correctPile){
		pileObj.answeredCorrectly = 1;
		pileObj.runScore = pileObj.runScore+1;
	} else {
		pileObj.answeredCorrectly = 0;
	}

	save2pilesTable(); // save data into the piles table in sql
	if (pileObj.trial>=pileObj.maxTrial){// if the number of trials exceeded the maximum per block move to next part
		endPilesTask()
	}
}


function endPilesTask (){
	exp.totalScore = exp.totalScore + pileObj.runScore;
	document.getElementById("pilesTab").style.display="none";
	document.getElementById("pilesRunScore").innerHTML=pileObj.runScore;
	document.getElementById("totalScore").innerHTML=exp.totalScore;
		document.getElementById("pilesMaxScore").innerHTML=pileObj.maxTrial;
	document.getElementById("pilesScoreTab").style.display="inline";

	// from here participant will press the "Next Game" butotn to move to pilesNextGame
}

function pilesNextGame(){
	document.getElementById("pilesScoreTab").style.display="none";
	isItMiddle()
}
