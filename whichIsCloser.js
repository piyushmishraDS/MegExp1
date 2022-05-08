  /*task functions*/
// the missing links questions are for recangular only - need to be checked for other structures!!!
function startWhichIsCloser(nQ){//distance estimation, formerly called startQustions
  setTimeout(function(){flagT=1}, 500);
  document.getElementById("iqcor").style.display="none";
  document.getElementById("iqcon").style.display="none";
  document.getElementById("conBot").disabled=true;
  //y = y0;
  //x = 0;
  if(nQ==0){
    whichCloserObj.numCorrect = 0;
  }
  numQ = nQ+1;
  corAs = 0;
  clearCanvas(document.getElementById("myCanvas"),300,450);
  flagC=0;
  flagSs=-1;
  flagSp=2;//signal that it is not pile part - importent for subject response function
  flagIsM=-1;//signal that it is not IsM part
  flagT = 0;
  flagTr = -1;
  flagQ = 0;
  document.getElementsByClassName("isMiddle")[0].style.display="none";
  document.getElementsByClassName("pileDiv")[0].style.display="none";
  document.getElementById("skip").style.display="none";
  document.getElementsByClassName("navig")[0].style.display="none";
  document.getElementById("dispPc").style.display="none";
  document.getElementsByClassName("endTask")[0].style.display="none";
  document.getElementById("endExpReachT").style.display="none";
  document.getElementsByClassName("whichIsCloser")[0].style.display="inline";
  //c=1;

  /*print instructions:"*/
  document.getElementById("instructionsQ").innerHTML="<b><br> The Target Card appears below, choose the card which requires less steps to reach the target card.";
  document.getElementById("targetPicQ").innerHTML="your target card is:<br> ";

  /*initilzation of the random generator:*/
  var d = new Date();
  var mn = d.getMinutes();
  var nr;
  mn = Math.floor(mn/2);
  for (nr=0;nr<mn;nr++){
    Math.random();
  }
  evT = calRem(exp.curRun,2);
  /*stimulus blocks*/
  var j1,j2,wCl,flagTs,dis2;
  imq2=-1;
  corAs = 0;

  if(exp.curRun<9){// no missing links
    tarQ = Math.floor(Math.random() * (G.nNodes));// target index
    ran1 = Math.random();
    if (ran1<0.333){// find the indexes of the pictures to choose from
      imq1 = findTargGen(2,tarQ,G.distMat);
      imq2 = findTargGen(4,tarQ,G.distMat);
    }else{
      if(ran1<0.6667){
        imq1 = findTargGen(2,tarQ,G.distMat);
        imq2 = findTargGen(3,tarQ,G.distMat);
      }else{
        imq1 = findTargGen(3,tarQ,G.distMat);
        imq2 = findTargGen(4,tarQ,G.distMat);
      }
    }

    var nS1 = G.distMat[tarQ][imq1];
    var nS2 = G.distMat[tarQ][imq2];

    if (nS1<nS2){
      corAs=1;
    }else{
      if (nS1==nS2){
        corAs = 0;
      }else{
        corAs = 2;
      }
    }
  }else{// missing links for recangular only - need to be checked for other structures!!!
    var ranD = Math.random();
    var imv;
    corAs = 1;// the missing link connection is defined to be image 1 - I then switch them 50% of the time
    lenMS = G.nodesWithMissLink.length;
    ind = Math.floor(Math.random() * (lenMS));// index for choosing target
    tarQ = G.nodesWithMissLink[ind];// the target index
    lenMS2 = G.whichLinkIsMiss[ind].length;
    ind2 = Math.floor(Math.random() * (lenMS2));// index for choosing the unconnected node (3 away on the missing link G.but 1 away on the complete G.;
    if(ranD<0.75){//change 1->3
      imq1 = G.whichLinkIsMiss[ind][ind2];
      imq2 = findTargGenWithMis(3,tarQ,G.distMat,G.distMatMiss);//find an image with distance 3 both on the omplete and missing link G.
    }else{//change 2->4
      imq0 = G.whichLinkIsMiss[ind][ind2];
      nnbN = G.transMatMiss[imq0].length
      ind3 = Math.floor(Math.random() * (nnbN));
      imq1 = G.transMatMiss[imq0][ind3];// this should be 2 away from the target.
      imq2 = findTargGenWithMis(4,tarQ,G.distMat,G.distMatMiss);//find an image with distance 4 both on the omplete and missing link G.
    }
  }
  /* change between the pictures*/
  /*I don't need to calculate the distance here as I have chosen what is the correct answer*/
  var imv = imq1;
  var ranQ = Math.random();
  if (ranQ <0.5){
    imq1 = imq2;
    imq2 = imv;
    if (corAs==1){
      corAs = 2;
    }else{
      if(corAs==2){
        carAs=1;
      }
    }
  }
  /*the picture*/
  /*the target picture*/
  document.getElementById("tarPQ").src = exp.pathToImgDir + exp.imgFileNamesArr[tarQ];
  document.getElementById("tarPQ").style.display="inline";
  /* the other pictures*/
  document.getElementById("Q1").src = exp.pathToImgDir + exp.imgFileNamesArr[imq1];
  document.getElementById("Q1").style.display="inline";
  document.getElementById("Q2").src = exp.pathToImgDir + exp.imgFileNamesArr[imq2];
  document.getElementById("Q2").style.display="inline";

  timeLast = new Date();
}

function conExpQ(cq){// check subject response

  var  thisTime=new Date();
  var RTq = calResponseTime(thisTime,timeLast);
  flagQ = 1;
  document.getElementById("iqcor").style.display="none";
  /*  correct / non-correct*/
  if(corAs==cq||corAs==0){
    whichCloserObj.numCorrect = whichCloserObj.numCorrect+1;
    corQ = 1;
  }else{
    corQ = 0;
  }

  //Alon & Shirley: need to add something here to display the score
  // document.getElementById("ncoinP").style.display="none";
  document.getElementById("myCanvas").style.display="none"
  // document.getElementById("ncoinP").innerHTML=ncoin+" coins";

  save2whichIsCloserTable(cq,imq1,imq2,corQ,RTq);// save data in sql table

  document.getElementById("iqcon").style.display="inline";
  var tlap = Math.floor((Math.random() * 1000) + 750);
  setTimeout(myTimeout, tlap,3);

}

function conQ(){// next question or next block
  document.getElementById("iqcon").style.display="none";
  document.getElementById("iqcor").style.display="none";
  document.getElementById("Q1").style.display="none";
  document.getElementById("Q2").style.display="none";

  timeLast = new Date();
  if (numQ<qend){
    startWhichIsCloser(numQ);
  }else{
    if(exp.curRun<exp.maxRun){
      numQ = 0;
      flagQ = 2;// so there wont be any response to subject pressing any key (enter/1/2)
      document.getElementsByClassName("whichIsCloser")[0].style.display="none";
      document.getElementsByClassName("whichIsCloser_feedback")[0].style.display="inline";
      document.getElementById("Qfeedback").style.display="inline";
      precntCor = Math.ceil(100*whichCloserObj.numCorrect/qend);
      document.getElementById("Qfeedback").innerHTML = "Thank you, you have done: %" + precntCor + "correct";
    }

  }
}
