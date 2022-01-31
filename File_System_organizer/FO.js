let input=process.argv.slice(2);
let command =input[0];
let treeModule=require('../command/tree');
let oragnizeModule=require('../command/organize');
let helpModule=require('../command/help')
switch(command)
{
    case 'tree':
        {
        treeModule.VIEW(input[1]);
          break;

        }
    case 'organize':
        {
        oragnizeModule.OrganizeView(input[1]);
         break;
        }   
    case 'help':
        {
          helpModule.Help()
          break;
    }   
    default:  
    {
        console.log("please enter valid command");
        break;
    }
}


