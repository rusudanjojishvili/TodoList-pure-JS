let savedTasks = localStorage.getItem("tasks");
let container = document.getElementById("container");

function formatDate(dateToFormat){
    let d = dateToFormat.getDate();
    let m = dateToFormat.getMonth() + 1;
    let y = dateToFormat.getFullYear();
    return (d<=9 ? '0' + d : d) + '/'+ (m<=9 ? '0' + m : m) + '/'+y ;
    
}

function formatDateTwo(dateToFormat){
    let d = dateToFormat.getDate();
    let m = dateToFormat.getMonth() + 1;
    let y = dateToFormat.getFullYear();
    return  y + "-" + (m<=9 ? '0' + m : m) + "-"+(d<=9 ? '0' + d : d);
}

let dateInput = document.getElementById("date");

const today = formatDateTwo(new Date());

dateInput.setAttribute("min",today);




function createTasks(task,taskStyle){
    let newNote = document.createElement("DIV");
    let nameToShow = document.createElement("H3");
    let descripToShow = document.createElement("DIV");
    let dateToShow = document.createElement("SPAN");
    let timeToShow = document.createElement("SPAN");
    let deletebtn = document.createElement("SPAN");
    
    
    let formatedDate;

    if(task.date){
     formatedDate = formatDate(new Date(task.date));
    }
   
    nameToShow.innerText = task.name;
    descripToShow.innerText = task.description;
    if(formatedDate !== undefined){
    dateToShow.innerText = "Date: " + formatedDate;
    }
    timeToShow.innerText = "Time: " + task.time;
    deletebtn.innerText = "x";
   

    newNote.className = taskStyle;
    nameToShow.className = "taskTitle";
    descripToShow.className = "description";
    dateToShow.className = "date";
    timeToShow.className = "date time";
    deletebtn.className = "delbtn";

    newNote.appendChild(nameToShow);
    newNote.appendChild(descripToShow);
    newNote.appendChild(dateToShow);
    newNote.appendChild(timeToShow);
    newNote.appendChild(deletebtn);

    container.appendChild(newNote);
   
}

if(savedTasks){
    let arrayOfTasks = JSON.parse(savedTasks);
    
    arrayOfTasks.forEach(task=>{
        
    createTasks(task,"note");
    });
}



let name=document.getElementById('name');

let description = document.getElementById('desc')

let date = document.querySelector('#notebook input[type="date"]');

let time = document.querySelector('#notebook input[type="time"]');


let form = document.querySelector('#notebook form');

form.addEventListener('submit', function(e){
    e.preventDefault();

    let task={
        name:name.value,
        description:description.value,
        date:date.value,
        time:time.value
    }

    
    let storagedTasks  = localStorage.getItem("tasks");


    if(!storagedTasks){
    let tasks = [];
    tasks.push(task);
    let taskJsonString = JSON.stringify(tasks);
    localStorage.setItem("tasks",taskJsonString);
    createTasks(task,"note new");
    }else{
    let existingArray = JSON.parse(storagedTasks);
        if(existingArray.some(existTask => existTask.name === task.name && existTask.description === task.description && existTask.date ===
            task.date)){
              alert("The identical task already exists");
        }else{
                existingArray.push(task);
                let taskJsonString = JSON.stringify(existingArray);
                localStorage.setItem("tasks",taskJsonString); 
                createTasks(task,"note new");

 
    }
}


    
    
   
})


let delbtns = document.querySelectorAll(".delbtn");


container.addEventListener('click',function(e){
    if(e.target.className =='delbtn'){
        const note = e.target.parentElement;
        container.removeChild(note);

        let namecontent = note.querySelector('.taskTitle').innerText;
        let descrContent = note.querySelector('.description').innerText;
        let dateContent = note.querySelector('.date').innerText;

        let formatedDate;
       
        let day = dateContent.slice(7,8)
        
        let month = dateContent.slice(10,11)-1;
        
        let year = dateContent.slice(12,16)
        
        if(dateContent){
        formatedDate = formatDateTwo(new Date(year,month,day));
        
        }else{
            formatedDate = null;
        }
       
    


        let storagedTasks = localStorage.getItem("tasks");
        let tasksArray = JSON.parse(storagedTasks);
        const taskToDelete=tasksArray.find(task => task.name ===
             namecontent && task.description === descrContent && task.date === formatedDate);
             
        let index = tasksArray.indexOf(taskToDelete);
        tasksArray.splice(index,1);
          


        if(tasksArray.length == 0){
            localStorage.removeItem("tasks");
        }else{
        let taskJsonString = JSON.stringify(tasksArray);
        localStorage.setItem("tasks",taskJsonString); 
        
    }
}

})




