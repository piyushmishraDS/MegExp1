
function creatMissArHexPair(Ar){
  G.nodesWithMissLink=[1,2,8,9,13,14,19,20,26,27,31,32];//[2,3,8,9,13,14,20,21,26,27,32,33];
  lnmis  = G.nodesWithMissLink.length;
  G.whichLinkIsMiss = [[2,32],[1],[9,13],[8],[8,14],[13,19],[14,20],[19],[27,31],[26],[26,32],[31,1]];//[[3,33],[2],[9,13],[8],[8,14],[13,20],[14,21],[20],[27,32],[26],[33,26],[2,32]];
  tran24 = [[1,27],[31,27],[0,32],[31,33],[19,9],[13,9],[18,14],[13,15]];//[[2,22],[32,27],[1,33],[32,34],[20,9],[13,15],[13,9],[19,14]];
  tran34 = [[22,31],[30,2],[3,31],[30,27],[18,15],[16,19],[10,19],[7,15]];//[[31,3],[1,33],[4,32],[21,27],[19,15],[16,20],[10,20],[15,7]];
  tran13 = [[1,32],[31,32],[14,19],[13,14]];//[[2,33],[32,33],[14,20],[13,14]];
  tran23 = [[31,2],[1,33],[26,1],[25,27],[0,2],[1,3],[31,21],[13,20],[19,15],[8,19],[8,10],[18,20],[19,21],[13,3]];//[[32,3],[2,34],[26,2],[25,27],[1,3],[2,4],[21,32],[27,20],[15,20],[13,21],[8,20],[2,13],[3,8],[19,21],[19,8]];
  var s=0,nnb,b,a,c,s,k,flag,flag2;
  var Armiss=[[]];
  for(a=0;a<np;a++){
    flag =0;
    for(c=s;c<G.nodesWithMissLink.length;c++){
      if(a==G.nodesWithMissLink[c]){
        flag = 1;
        s = c;
        break;
      }
    }
    if (flag==0){
      nnb = nb;
      Armiss[a].push( new Array(nnb));
      for (j=0;j<nb;j++){
        Armiss[a][j] = Ar[a][j];
      }
    }else{
      nnb = nb-G.whichLinkIsMiss[c].length;
      Armiss[a].push( new Array(nnb));
      b=0;
      //flag2 = 0;
      for (j=0;j<nb;j++){
        flag2 = 0;
        for(k=0;k<G.whichLinkIsMiss[c].length;k++){
          if (Ar[a][j]==G.whichLinkIsMiss[c][k]){
            flag2 = 1;
          }
        }
        if (flag2==0){
          Armiss[a][b] = Ar[a][j];
          b = b+1;
        }
      }

    }
    if(a<np-1){
      Armiss.push([]);
    }
  }
  return Armiss;
}



function creat2MissLinkAr(Ar){
  var missNN = [14,30];
  misInPileA = [[5,0,31,30],[20,21,15,14],[30,29,35,5],[14,8,13,20],[0,30,24,19],[21,14,9,3]];
  var j,nnb,b;
  var MISSnnV = [20,13,5,35];
  var lenMsV = MISSnnV.length;
  var Armiss=[[]];
  for(a=0;a<np;a++){
    flag = -1;
    if (a==missNN[0]){
      flag = missNN[0];
    }else{
      if (a==missNN[1]){
        flag = missNN[1];
      }else{
        for(j=0;j<lenMsV;j++){
          if(a==MISSnnV[j]){
            flag = MISSnnV[j];
          }
        }
      }
    }
    if(flag==-1){
      nnb = nb;
      Armiss[a].push( new Array(nnb));
      for (j=0;j<nb;j++){
        Armiss[a][j] = Ar[a][j];
      }
    }else{
      if(flag!= missNN[0]&&flag!= missNN[1]){
        nnb = nb-1;
        Armiss[a].push( new Array(nnb));
        b = 0;
        for (j=0;j<nb;j++){
          if (Ar[a][j]!=missNN[0]&&Ar[a][j]!= missNN[1]){
            Armiss[a][b] = Ar[a][j];
            b = b+1;
          }
        }
      }else{
        nnb = 4;
        Armiss[a].push( new Array(nnb));
        b=0;
        if(a==missNN[0]){
          for (j=0;j<nb;j++){
            if (Ar[a][j]!=MISSnnV[0]&&Ar[a][j]!= MISSnnV[1]){
              Armiss[a][b] = Ar[a][j];
              b = b+1;
            }
          }
        }else{
          for (j=0;j<nb;j++){
            if (Ar[a][j]!=MISSnnV[3]&&Ar[a][j]!= MISSnnV[2]){
              Armiss[a][b] = Ar[a][j];
              b = b+1;
            }
          }
        }
      }
    }

    if(a<np-1){
      Armiss.push([]);
    }
  }//first for
  return Armiss;
}
function creatMissArCluster(Ar){
  var a,j,b;
  var nMiss = (nc-1)*ninc;
  var ArmissC=[[]];
  for(a=0;a<nMiss;a++){
    if (a==0){
      b=0;
      ArmissC[a].push( new Array(nb-1));
      for(j=0;j<nb-1;j++){
        if (Ar[a][j]<nMiss){
          ArmissC[a][b]=	Ar[a][j];
          b=b+1;
        }
      }
    }else{
      if(a<nMiss-1){
        ArmissC[a].push( new Array(nb));
        for(j=0;j<nb;j++){
          ArmissC[a][j]=	Ar[a][j];
        }
      }else{
        ArmissC[a].push( new Array(nb-1));
        var ab=0;
        for(j=0;j<nb;j++){
          if(Ar[a][j]!=nMiss){
            ArmissC[a][ab]=	Ar[a][j];
            ab=ab+1;
          }
        }
      }
    }
    if(a<nMiss-1){
      ArmissC.push([]);
    }
  }
  return ArmissC;
}

function creatMissArCluster2(Ar){
  var a,j,b;
  var nMiss = (nc-1)*ninc;
  var ArmissC=[[]];
  for(a=0;a<nMiss;a++){
    if (a==0){
      b=0;
      ArmissC[a].push( new Array(nb-1));
      for(j=0;j<nb-1;j++){
        if (Ar[a][j]<nMiss){
          ArmissC[a][b]=	Ar[a][j];
          b=b+1;
        }
      }
    }else{
      if(a<nMiss-1){
        ArmissC[a].push( new Array(nb));
        for(j=0;j<nb;j++){
          ArmissC[a][j]=	Ar[a][j];
        }
      }else{
        ArmissC[a].push( new Array(nb-1));
        var ab=0;
        for(j=0;j<nb;j++){
          if(Ar[a][j]!=nMiss){
            ArmissC[a][ab]=	Ar[a][j];
            ab=ab+1;
          }
        }
      }
    }

    ArmissC.push([]);

  }

  for(a=nMiss;a<nc*ninc;a++){
    if (a==nMiss){
      b=0;
      ArmissC[a].push( new Array(nb-1));
      for(j=0;j<nb-1;j++){
        if (Ar[a][j]>=nMiss){
          ArmissC[a][b]=	Ar[a][j];
          b=b+1;
        }
      }
    }else{
      if(a<nc*ninc-1){
        ArmissC[a].push( new Array(nb));
        for(j=0;j<nb;j++){
          ArmissC[a][j]=	Ar[a][j];
        }
      }else{
        ArmissC[a].push( new Array(nb-1));
        var ab=0;
        for(j=0;j<nb;j++){
          if(Ar[a][j]>=nMiss){//!=0){
            ArmissC[a][ab]=	Ar[a][j];
            ab=ab+1;
          }
        }
      }
    }
    if(a<nc*ninc-1){
      ArmissC.push([]);
    }
  }

  return ArmissC;
}

function createHexNonPer(){
	//This function create hexagonal Adjacency matrix without periodic boundary conditions with rectangular shape
	// I have a bag - it does not work with 5x5
	var a,a1,b,rn1a,isEv,rown,coln;
	var nb0=6;// number of neighbors
	var nb;
	var n0=G.nRow*G.nCol;//G.nCol-how many in each row (number of col), G.nRow- How many in each col (number of rows)
	G.transMat=[[]];
	for(a=0;a<n0;a++){
		b=0;
		a1 = a+1;
		rn1a = rem(a1,G.nCol);
		if(rn1a>0){
			coln =rn1a;
		}else{
			coln = G.nCol;
		}
		rown = Math.ceil(a1/G.nCol);
		isEv = rem(rown,2);
		if (coln<G.nCol&&coln>1&&rown>1&&rown<G.nRow){
			nb = nb0;
		}else{
			if(coln==1){
				if(isEv==0){//even
					if(rown<G.nRow){
						nb = 3;
					}else{
						nb=2;
					}
				}else{
					if(rown==1||rown==G.nRow){
						nb = 3;
					}else{
						nb = 5;
					}
				}
			}else{
				if(coln==G.nCol){
					if(isEv==0){//even
						if(rown<G.nRow){
							nb = 5;
						}else{
							nb = 3;
						}
					}else{//odd
						if(rown==1||G.nRow==rown){
							nb = 2;
						}else{
							nb = 3;
						}
					}
				}else{
					nb = 4;
				}
			}
		}
		G.transMat[a].push( new Array(nb));

		if (coln>1){
			G.transMat[a][b] = a-1;//left
			b = b+1;
		}
		if (coln<G.nCol){
			G.transMat[a][b] = a+1;//right
			b = b+1;
		}

		if(rown<G.nRow){
			G.transMat[a][b] = a+G.nCol;//up
			b=b+1;
			if(isEv!=0){
				if(coln<G.nCol){//up and right
					G.transMat[a][b] = a+G.nCol+1;
					b=b+1;
				}
			}else{
				if(coln>1){//up and left
					G.transMat[a][b] = a+G.nCol-1;
					b=b+1;
				}
			}
		}
		if(rown>1){
			G.transMat[a][b] = a-G.nCol;//down
			b=b+1;
			if(isEv!=0){
				if(coln<G.nCol){
					G.transMat[a][b] = a-G.nCol+1;//down and right
					b=b+1;
				}
			}else{
				if(coln>1){
					G.transMat[a][b] = a-G.nCol-1;//down and left
					b=b+1;
				}
			}
		}
		if(a<n0-1){
			Ar.push([]);
		}
	}
	return Ar;
}


function creatMissArHexPair(Ar){// create hexagonal array with missing links probably periodic need to be checked
	G.nodesWithMissLink=[1,2,8,9,13,14,19,20,26,27,31,32];//[2,3,8,9,13,14,20,21,26,27,32,33];
	lnmis  = G.nodesWithMissLink.length;
	G.whichLinkIsMiss = [[2,32],[1],[9,13],[8],[8,14],[13,19],[14,20],[19],[27,31],[26],[26,32],[31,1]];//[[3,33],[2],[9,13],[8],[8,14],[13,20],[14,21],[20],[27,32],[26],[33,26],[2,32]];
	tran24 = [[1,27],[31,27],[0,32],[31,33],[19,9],[13,9],[18,14],[13,15]];//[[2,22],[32,27],[1,33],[32,34],[20,9],[13,15],[13,9],[19,14]];
	tran34 = [[22,31],[30,2],[3,31],[30,27],[18,15],[16,19],[10,19],[7,15]];//[[31,3],[1,33],[4,32],[21,27],[19,15],[16,20],[10,20],[15,7]];
	tran13 = [[1,32],[31,32],[14,19],[13,14]];//[[2,33],[32,33],[14,20],[13,14]];
	tran23 = [[31,2],[1,33],[26,1],[25,27],[0,2],[1,3],[31,21],[13,20],[19,15],[8,19],[8,10],[18,20],[19,21],[13,3]];//[[32,3],[2,34],[26,2],[25,27],[1,3],[2,4],[21,32],[27,20],[15,20],[13,21],[8,20],[2,13],[3,8],[19,21],[19,8]];
	var s=0,nnb,b,a,c,s,k,flag,flag2;
	var Armiss=[[]];
	for(a=0;a<np;a++){
		flag =0;
		for(c=s;c<G.nodesWithMissLink.length;c++){
			if(a==G.nodesWithMissLink[c]){
				flag = 1;
				s = c;
				break;
			}
		}
		if (flag==0){
			nnb = nb;
			Armiss[a].push( new Array(nnb));
			for (j=0;j<nb;j++){
				Armiss[a][j] = G.transMat[a][j];
			}
		}else{
			nnb = nb-G.whichLinkIsMiss[c].length;
			Armiss[a].push( new Array(nnb));
			b=0;
			//flag2 = 0;
			for (j=0;j<nb;j++){
				flag2 = 0;
				for(k=0;k<G.whichLinkIsMiss[c].length;k++){
					if (G.transMat[a][j]==G.whichLinkIsMiss[c][k]){
						flag2 = 1;
					}
				}
				if (flag2==0){
					Armiss[a][b] = G.transMat[a][j];
					b = b+1;
				}
			}

		}
		if(a<np-1){
			Armiss.push([]);
		}
	}
	return Armiss;
}


/*define borer color*/
function defBorderA(im,tar,nCol,nNodes){
	var crNd1 = tar+1;
	var crNdCol1 = rem(crNd1,nCol);

	if((crNdCol1>1)&&(crNd1>nCol)&&(crNd1<=nNodes-nCol)){//not on the edge
		im.style.borderColor="Gray";
	}else{
		if(crNd1<=nCol){//first raw
			if(crNdCol1>1){
				im.style.borderColor="Red";
			}else{
				switch(crNdCol1){
					case 0://left up corner
					im.style.borderColor="Purple";
					break;
					case 1://right up corner
					im.style.borderColor="orange";
					break;
				}
			}
		}else{
			if(crNd1>nNodes-nCol){//last raw
				if(crNdCol1>1){
					im.style.borderColor="Green";
				}else{
					switch(crNdCol1){
						case 0:
						im.style.borderColor="Cyan";
						break;
						case 1://low right
						im.style.borderColor="GreenYellow";
						break;
					}
				}
			}else{
				switch(crNdCol1){
					case 0://left
					im.style.borderColor="Blue";
					break;
					case 1://right
					im.style.borderColor="Yellow";
					break;
				}
			}
		}
	}
}

function presPic(){
  /*display the pictures array -  for debugging*/
  var disPic = 0;
  var j,picSrc,isLine,leftP,leftP0,rightP=0;
  exp.pathToImgDir = "/MEG/images/set1reg/";
  var imH = 120;
  var dpL = 20;
  var dpR = 20;
  leftP0 = Math.ceil(G.nCol/2)*imH;
  leftP = leftP0;
  document.write("<div class='dispPicArr'>");
  for(j=0;j<exp.maxNumNodes;j++){
    picSrc = exp.pathToImgDir+ exp.imgFileNamesArr[j];
    document.write("<img border ='5px solid gray' height='"+imH+"'px width='"+imH+"px' position='relative' left="+leftP+"px right="+rightP+"px src='"+picSrc+">");
    isLine = Math.ceil((j+1)/G.nCol);
    isLine = (isLine)*G.nCol-j-1;
    leftP = leftP+dpL;
    if(isLine==0){
      document.write("<br>");
      leftP = leftP0;
      rightP = 0;
    }
  }
}
