#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int main()
{
    int *image;
    int x, y, gx, gy;  /*迷路の大きさとゴールの位置*/
    int hx=1,hy=1; /*主人公の位置*/
    int i, j, flag, command;

    clock_t start,end; /*時間計測用*/
    start = clock();   /*開始時間を記録*/
    srand((unsigned)time(NULL));/*乱数の種*/

    printf("迷路の横幅[1～10]>"); scanf("%d",&x); x=x*2+1; gx=x-2;
    printf("迷路の高さ[1～10]>"); scanf("%d",&y); y=y*2+1; gy=y-2;

    image = (int *) malloc( /*適当な式*/ * sizeof(/*適当な型*/) );
    if (image==NULL){ printf("メモリ不足エラー\n"); return -1; }

    /* 全てを見えない壁(1)にする */
    for (j=0; j<y; j++){ for (i=0; i<x; i++) image[x*j+i]=1; }
    /*奇数番地は床(0)にする*/
    for (j=1; j<y-1; j++){ for (i=1; i<x-1; i++) 
        if ( i%2!=0|| j%2!=0) image[x*j+i]=0;
    }
    /*迷路生成（棒倒し法）*/
    for (j=2; j<y-2; j+=2){ for (i=2; i<x-2; i+=2) 
        if ( rand()%2 ) image[x*(j+1)+i]=1; else image[x*j+i+1]=1;
    }

    printf("迷路ゲームスタート！\n");
    /*ここから無限ループ*/
    while(){
        /*メモリ内にある迷路を表示*/
        for (j=0; j<y; j++){ 
          for (i=0; i<x; i++){
            if (image[x*j+i]==3) printf("#");
            else if (i==hx && j==hy) printf("o");
                 else if (i==gx && j==gy) printf("G");
                    else printf(" ");
            
          }  printf("\n");
        }
        printf("** ゴールマーク[G]マークを目指せ！ **\n");
        printf("Command (2[down],4[left],6[right],8[up])>＞");
        scanf("%d",&command);
        if (command==0){ flag=-1; break;}
        if (command==2 && hy<y && image[x*(hy+1)+hx]%2!=1) hy+=1;
        if (command==8 && hy>0 && image[x*(hy-1)+hx]%2!=1) hy-=1;
        if (command==4 && hx>0 && image[x*hy+(hx-1)]%2!=1) hx-=1;
        if (command==6 && hx<x && image[x*hy+(hx+1)]%2!=1) hx+=1;
        /*自分の周囲だけ見えるようにする（見える壁(3)にする）*/
        if (image[x*(hy+1)+hx]==1) image[x*(hy+1)+hx]=3 ;
        if (image[x*(hy-1)+hx]==1) image[x*(hy-1)+hx]=3;
        if (image[x*hy+(hx-1)]==1) image[x*hy+(hx-1)]=3;
        if (image[x*hy+(hx+1)]==1) image[x*hy+(hx+1)]=3;
        if (hx==gx && hy==gy){flag=1; break;} /*ゴール到着！*/
    }
    /*ここまでが無限ループ*/

    if (flag==1){
        printf("ゴール到着\nおめでとうございます！\n");
        end = clock();
         printf("%.2f秒かかりました\n",
              (double)(end-start)/CLOCKS_PER_SEC);    }
    else printf("ゲームを中断しました．\n");

    /*メモリ内にある迷路をすべて表示する*/
    for (j=0; j<y; j++){ 
        for (i=0; i<x; i++){
            if (image[x*j+i]%2==1) printf("#");
            else if (i==hx && j==hy) printf("o");
                 else if (i==gx && j==gy) printf("G");
                    else printf(" ");
            
          }  printf("\n");
    }
    return 0;
}
