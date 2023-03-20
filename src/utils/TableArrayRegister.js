//全局定义矩阵
let array = []
let tableRow=-1;
let tableCol=-1;


 export const TableArrayRegister=(data) => {
  // 获取列数
   const cols=Object.keys(data[0]).length
   //注册这个矩阵
   arrayInit(data.length,cols)
   //校验需要跨行的行列是否符合要求
   //控制列的形式一定是r开头,
  //循环，对这里边所有数据进行复杂表格解析
  for(let i=0;i<data.length;i++){
  //  检测备注内的占位情况
   let divider=data[i].remark.split('@@')
  //  检测是否存在占位，如果存在，我们要做有效性检测
   if (divider.length > 1) {
    //  此时传入列已经去除了@@的前引导符号，那么我们拿到符号后，只需要进行规则匹配就行
    //  可以知道的是，我们的规则引导，是以r开头、数字结尾的。
    let line=divider[divider.length-1]
    //  规则匹配逻辑
    let match = line.startsWith("r") && isNaN(parseInt(line.substr(length - 1, length)))
    // console.log(match)
    //  规则匹配成功，应该返回对应的解析结果
    if (match) {
     // TODO: 此时应该进行相关的处理
    // 第一步，应该把控制符从元素中直接消去
     data[i].remark=distinctCtrlLab(divider)
    //  第二步，注册相关复杂表格行列式
      arrayRewrite(i,line)
    }
    //  规则匹配失败,直接将行列置为默认值即可.由于一行只进行单次匹配,所以对于这一行,即是所有匹配都失败,全额返回默认数组即可，此操作直接简化到未匹配行进行
   }

  }
  // console.log(array)
  //  console.log(data)
   return array;
 }

/**
 * 控制符注销函数
 * @param diver 控制划分数组
 * @returns {string}
 */
 function distinctCtrlLab(diver) {
   let line=''
   for(let i=0;i<diver.length-1;i++){
     line+=diver[i]
   }
   // console.log(line)
   return line;
 }

/**
 * 默认注册器
 * @param rows
 * @param cols
 */
 function arrayInit(rows, cols) {
   tableRow=rows
   tableCol=cols
  for(let i=0;i<rows;i++){        //一维长度
    array[i] = [];
    for(let j=0;j<cols;j++){    //二维长度
      array[i][j] = [1,1];
    }
  }
  // console.log(array)
 }

/**
 * 重写行列式
 * @param rowIndex 行号
 * @param line 控制符
 */
/*
 每行在未涉及到多行多列操作时仅允许操作一次，称之为单一操作原则
 */
 function arrayRewrite(rowIndex,line){
   //全局定义指令集合
   let ctrlCmd=[]
 //   首先对控制符进行再次划分
  const split = line.split("?")
 //  TODO:对划分数组进行指令集合的语义转换
   for (let i=0;i<split.length;i++){
   //先推断类型为列合并还是行合并
     if (split[i].indexOf('c')!==-1){
       //列合并
       let cell={
                  'row':split[i].substring(split[i].indexOf('r')+1,split[i].indexOf('c')),
                  'strip':split[i].substring(split[i].indexOf('c')+1,split[i].length)+"c"
                }
       // console.log(cell)
       ctrlCmd.push(cell)
     }else {
       let cell={
                  'row':split[i].substring(split[i].indexOf('r')+1,split[i].lastIndexOf('r')),
                  'strip':split[i].substring(split[i].lastIndexOf('r')+1,split[i].length)+"r"
                }
       // console.log(cell)
       ctrlCmd.push(cell)
     }
     // console.log(split[i])
   }
   //测试获取数据
   // console.log(ctrlCmd)
   // for(let i=0;i<ctrlCmd.length;i++){
   //   console.log(ColOrRowGetter(ctrlCmd[i].strip))
   // }
 // TODO:对控制符进行合并检测
  /*
  为什么进行合并检测？我考虑到了以下情况：假设表格中存在一个单元格，其位置为0位置，占用情况为三行二列。
  此时如果不进行合并检测，直接写入控制字符@@r0r3?r0c2,这时候我们如果不进行合并检测，就会使得阵列出现形状错误，导致整个多行多列块出现错误
   */
   //进入过的全部记录下来
   let dec=[]
   // console.log(line)
   for(let i=0;i<ctrlCmd.length-1;i++){
     for (let j=i+1;j<ctrlCmd.length;j++){
       if (ctrlCmd[i].row===ctrlCmd[j].row){
         dec.push(i)
         dec.push(j)
         // console.log(dec)
         // console.log(i+":"+j)
         // console.log(ctrlCmd[i].strip)
         // console.log(ctrlCmd[j].strip)
         //产生碰撞的矩阵业务处理，这里应该从简单的行列变换转化到矩阵的面变换，可以知道，起始位置是当前行的行号
         //这是行.为了避免出现被重复添加的情况，我们在此平滑处理掉这些情况
         let start=[1,1]
         if (ctrlCmd[i].strip.indexOf('r')!==-1){
           start[0]=ColOrRowGetter(ctrlCmd[i].strip)
         }else {
           start[1]=ColOrRowGetter(ctrlCmd[i].strip)
         }
         if (ctrlCmd[j].strip.indexOf('c')!==-1){
           start[1]=ColOrRowGetter(ctrlCmd[j].strip)
         }else {
           start[0]=ColOrRowGetter(ctrlCmd[j].strip)
         }
         // console.log(array[rowIndex])
         //扩散影响其他列
         let now=[rowIndex,parseInt(ctrlCmd[i].row)]
         // console.log(now)
         // console.log(start)
         for (let i=0;i<start[0];i++){
           for (let j=0;j<start[1];j++){
             //越界，返回回去
             if (i>tableRow || j>tableCol){
               continue
             }
               array[now[0]+i][now[1]+j]=[0,0]
             // console.log(array[now[0]+i][now[1]+j])
           }
         }
         array[rowIndex][ctrlCmd[i].row]=start
       }
     }
   }
 //  循环其他读取数据
 //   console.log("数据")
 //   console.log(dec)
   for (let i=0;i<ctrlCmd.length;i++){
     if (!dec.includes(i)){
       // console.log("未被合并的")
       // console.log(ctrlCmd[i])
     //  未合并数据，进行合并操作
       let start=[1,1]
       if (ctrlCmd[i].strip.indexOf('r')!==-1){
         start[0]=ColOrRowGetter(ctrlCmd[i].strip)
       }
       if (ctrlCmd[i].strip.indexOf('c')!==-1){
         start[1]=ColOrRowGetter(ctrlCmd[i].strip)
       }
       // console.log(array[rowIndex])
       //扩散影响其他列
       let now=[rowIndex,parseInt(ctrlCmd[i].row)]
       // console.log(now)
       // console.log(start)
       for (let i=0;i<start[0];i++){
         for (let j=0;j<start[1];j++){
           //越界，返回回去
           if (i>tableRow || j>tableCol){
             continue
           }
           array[now[0]+i][now[1]+j]=[0,0]
           // console.log(array[now[0]+i][now[1]+j])
         }
       }
       array[rowIndex][ctrlCmd[i].row]=start
     }
   }

 }

 function ColOrRowGetter(str){
   // console.log(str)
   return  parseInt( str.substring(0,str.length-1))
 }
