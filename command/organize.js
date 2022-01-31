let fs=require('fs');
let path =require('path');
let OBJECT=require('./object');
function OrganizeFn(dirpath)
{  let destpath; 
   if(dirpath==undefined)
   {
       console.log("please enter valid directory");
       return;
   }
   if(check(dirpath))
   {
       destpath=path.join(dirpath,"organized_files");
       if(check(destpath)==false)
       {
           fs.mkdirSync(destpath);
       }
       
   }
   organizeHelper(dirpath,destpath);

}
function check(dirPath)
{
    let doesExist=fs.existsSync(dirPath);
    if(doesExist==true)
    return true;
    else
    return false;
}
function organizeHelper(src,dest)
{
    let childName=fs.readdirSync(src);
    for(let i=0;i<childName.length;i++)
    {
        let childAddress=path.join(src,childName[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        if(isFile==true)
        {
            let fileCatogory=getCatogory(childName[i]);
           // console.log(path.basename(childAddress)+"->"+fileCatogory)
            // copyfile from childAdrees to dest/filecatogory
            sendFiles(childAddress,dest,fileCatogory)
            
        }
    }

}
function  getCatogory(fileName)
{
    let ext=path.extname(fileName).slice(1);
    for(let key in OBJECT.Type)
    {
        let cTypeArr=OBJECT.Type[key];
        for(let i=0;i<cTypeArr.length;i++)
        {
            if(ext==cTypeArr[i])
            return key;
        }
    }
    return "others";
}

function sendFiles(src,dest,fileCatogory)
{
    let catp=path.join(dest,fileCatogory);
    if(fs.existsSync(catp)==false)
    fs.mkdirSync(catp);
    let fname=path.basename(src);
    let des=path.join(catp,fname);
    fs.copyFileSync(src,des);
    fs.unlinkSync(src);
}
module.exports={
    OrganizeView:OrganizeFn
}