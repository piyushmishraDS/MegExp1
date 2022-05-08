
function learnRandomPairsTask(){

  document.onkeydown = checkKey_learnPairs; // Alon: moved this from "clearCanvas". not sure why there's no () at the end, but left it as it was.
  document.getElementById("learnRandomPairs").style.display="inline";

  lrnPrsObj.imgPresentTime = new Date();
}
function checkKey_learnPairs(e) {
  // only proceed if subject pressed enter.
  if (e.keyCode == '13') {//enter
    conExpPair();
  }
}

function conExpPair(){
  var buttonPressTime = new Date();
  var rt = calResponseTime(buttonPressTime,lrnPrsObj.imgPresentTime);

  lrnPrsObj.nodeNumImg1 = Math.floor(Math.random() * (G.nNodes-1));
  if (exp.curRun<9){
    lrnPrsObj.nodeNumImg2=findRandNghbr(G.transMat,lrnPrsObj.nodeNumImg1);// no missing links
  }else{
    lrnPrsObj.nodeNumImg2=findRandNghbr(G.transMatMiss,lrnPrsObj.nodeNumImg1);// with missing links
  }
  /* the 2 pictures*/
  document.getElementById("lrnPrs_img1").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnPrsObj.nodeNumImg1];
  document.getElementById("lrnPrs_img2").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnPrsObj.nodeNumImg2];

  if (lrnPrsObj.trial>1){
    document.getElementById("lrnPrs_img1").style.display="none"
    document.getElementById("lrnPrs_img2").style.display="none"
    document.getElementById("threeDots_learnRandomPairs").style.display="inline";
    setTimeout(function(){ document.getElementById("threeDots_learnRandomPairs").style.display="none";},500);
    setTimeout(function(){document.getElementById("lrnPrs_img1").style.display="inline"; document.getElementById("lrnPrs_img2").style.display="inline";},500);
  } else{
    document.getElementById("lrnPrs_img1").style.display="inline";
    document.getElementById("lrnPrs_img2").style.display="inline";
  }

  lrnPrsObj.imgPresentTime = new Date();
  if(lrnPrsObj.trial>lrnPrsObj.maxTrial){
    lrnPrsObj.trial=-1;
    endAllTrials_learnRandomPairs();
  }

  // change save2learnRandomPairTable to mirror save2learnRandomWalkTable
  save2learnRandomPairTable(exp.subjectId,exp.curRun,lrnPrsObj.nodeNumImg1,lrnPrsObj.nodeNumImg2,rt,lrnPrsObj.trial,"learnRandomPairsTable");
  lrnPrsObj.trial =lrnPrsObj.trial+1;
}


/* end learnRandomPairs task part*/
function endAllTrials_learnRandomPairs(){

  document.getElementById("learnRandomPairs").style.display="none";
  pileObj.trial = 1; // initialise Piles task to trial 1
  initPilesTask();
}
