let fs=require('fs');
let path =require('path');
function fntree(dirpath)
{
   
    if(dirpath==undefined)
    {
        console.log("enter valid path");
        return;
    }
    let doesExist=fs.existsSync(dirpath);
    if(doesExist==true)
    treeHelper(dirpath," ");

}
function treeHelper(targetPath,indent)
{
    let isFile=fs.lstatSync(targetPath).isFile();
    if(isFile==true)
    {
        let fileName=path.basename(targetPath);
        console.log(indent+"*|------"+fileName);
    }
    else{
        let children=fs.readdirSync(targetPath);
        for(let i=0;i<children.length;i++)
        {
            let childAddress=path.join(targetPath,children[i]);
            if(fs.lstatSync(childAddress).isFile()==false){
            let subfoledr=path.basename(childAddress);
            console.log(indent+"@[--------"+subfoledr)
            }
            treeHelper(childAddress,indent+"\t");
        }
    }
}
module.exports={
    VIEW:fntree
}