
function learnRandomWalkTask(){// learning phase

  document.onkeydown = checkKey_learnWalk; // Alon: moved this from "clearCanvas". not sure why there's no () at the end, but left it as it was.
  document.getElementById("learnRandomWalk").style.display="inline";

  // set up first two images (different from the rest of pairs because the first image is blank)
  lrnWlkObj.nodeNumImgOld = -1;
  lrnWlkObj.nodeNumImgNew = Math.floor(Math.random() * (G.nNodes-1)); //first image index // G.nNodes is size of map (number of states/nodes)
  document.getElementById("lrnWlk_imgNew").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgNew];// first image
  document.getElementById("lrnWlk_imgOld").src = exp.pathToImgDir + '../whitePic.jpg' // first "old" image

  lrnWlkObj.imgPresentTime = new Date();
}

function checkKey_learnWalk(e) {
  // only proceed if subject pressed enter.
  if (e.keyCode == '13'){//enter
    conExp_learnWalk();
  }
}

function conExp_learnWalk(){// continue experiment: check subject response time // Shirey to fix in response function
  var buttonPressTime = new Date();
  var rt = calResponseTime(buttonPressTime,lrnWlkObj.imgPresentTime);// response time
  // save to sql table
  save2learnRandomWalkTable(exp.subjectId,exp.curRun, exp.curMap, lrnWlkObj.trial,lrnWlkObj.nodeNumImgOld,exp.imgFileNamesArr[lrnWlkObj.nodeNumImgOld],lrnWlkObj.nodeNumImgNew,exp.imgFileNamesArr[lrnWlkObj.nodeNumImgNew],rt);// save data into table in sql -  I don't have 'cor' as I have deleted it - can clean more
  //increase trial. increase after saving because we initialised at trial 1
  lrnWlkObj.trial = lrnWlkObj.trial+1;
  lrnWlkObj.nodeNumImgOld = lrnWlkObj.nodeNumImgNew;
  lrnWlkObj.nodeNumImgNew=findRandNghbr(G.transMat,lrnWlkObj.nodeNumImgNew);// next picture index
  document.getElementById("lrnWlk_imgOld").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgOld];// old picture
  document.getElementById("lrnWlk_imgNew").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgNew];// next picture
  lrnWlkObj.imgPresentTime = new Date();
  // end part after lrnWlkObj.maxTrial observations
  if(lrnWlkObj.trial>lrnWlkObj.maxTrial){
    lrnWlkObj.trial=-1;
    endAllTrials_learnRandomWalk();
  }
}

/* end learnRandomWalk task part*/
function endAllTrials_learnRandomWalk(){
  document.getElementById("learnRandomWalk").style.display="none";
  pileObj.trial = 1; // initialise Piles task to trial 1
  initPilesTask();
}
