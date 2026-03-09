
const allCardsContainer=document.getElementById('allCardsContainer')
const spinner=document.getElementById('spinner')
const closeBtn=document.getElementById('closeBtn')
const openBtn=document.getElementById('openBtn')
const allbtn=document.getElementById('allbtn')

// spinner function
function showSpinner(){

    allCardsContainer.innerHTML=""
}
function hideSpinner(){
    spinner.classList.add("hidden")
   
}
// load all issues
 async function loadIssue(){
   showSpinner()
const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data=await res.json()
hideSpinner()
 displayAllIssues(data.data)
  
 }
//display all 
function displayAllIssues(inputData){

document.getElementById("count")
.textContent=inputData.length

 allCardsContainer.innerHTML=""
 inputData.forEach(element =>{

    let borderColorClass
    
    
    if(element.status.toLowerCase()==="open"){ 
        borderColorClass = "border-green-400"
    }

   else if(element.status.toLowerCase()==="closed"){     
    borderColorClass = "border-purple-400"
    }
let bgStat
if(element.priority.toLowerCase()==="high"){ 
        bgStat = "bg-red-200"
    }
else if(element.priority.toLowerCase()==="medium"){ 
        bgStat = "bg-yellow-200"
    }
else if(element.priority.toLowerCase()==="low"){ 
        bgStat = "bg-gray-200"
    }

const div=document.createElement("div")
       div.innerHTML=`
        <div id="changeBorder" class="card shadow-xl p-5 w-[256px] h-[300px] border-t-4 ${borderColorClass} ">
      <div class=" flex justify-between">
       <img class=" w-6 h-6" src="./assets/Open-Status.png" alt="">
       <p id="" class=" text-red-500 ${bgStat} py-1 px-3 rounded-lg">${element.priority}</p>
     </div>
      <div class="space-y-3">
       <h1 class="font-semibold cursor-pointer text-[14px] whitespace- mt-3 hover:text-orange-700" onclick="issueModal(${element.id})">${element.title}</h1>
       <p class="line-clamp-2 text-xs text-[#64748B]">${element.description}</p>
       </div>
      <div class="flex  gap-3 items-center my-3">
        <p class="bg-[#FEECEC] text-red-500 py-1 px-3 rounded-full">Bug</p>
        <p class="bg-[#FFF8DB] text-red-500 py-1 px-3 rounded-full">Help Wanted</p>
      </div>
     <hr class="">
     <div class="text-[#64748B] mt-3">
        <p class="text-[16px]">${element.author}</p>
        <p class="text-[16px]">${element.createdAt}</p>
      </div>
     </div>
      `
 allCardsContainer.appendChild(div)
  }

   )
  } 
// all details modal
  async function issueModal(issueId) {
    const res =await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)  
    const json=await res.json()
    displayIssuesDetails(json.data)
    
    // document.getElementById('issueDetails').showModal() 
  }
//displaing all detais of ussue on a modal
const displayIssuesDetails=(issue)=>{
    const detailBox=document.getElementById('details-container')
    detailBox.innerHTML=`
     <div >
      <h1 id="title" class="font-bold text-2xl">${issue.title}</h1>
     <div class="flex gap-5 my-4 items-center">
       <p class="bg-green-500 p-2 rounded-xl text-white " class="status">${issue.status}</p>
      <p><span class="open">${issue.status}</span> by <span class="author">${issue.author}</span></p>
      <p>${issue.createdAt}</p>
     </div>
      <div class="flex gap-2 mb-4">
        <p class="bg-[#FEECEC] text-red-500 py-1 px-3 rounded-full">Bug</p>
        <p class="bg-[#FFF8DB] text-red-500 py-1 px-3 rounded-full">Help Wanted</p>
      </div>
      <p id="description">${issue.description}</p>
      <div class="flex justify-between p-8 bg-slate-200 shadow mt-4">
        <div>
          <p id="assign" class="text-gray-400">Assignee:</p>
          <p class="font-bold">${issue.author}</p>
        </div>
        <div>
          <p class="text-gray-400">Priority:</p>
          <p id="priority" class="bg-red-400 rounded p-2 text-white">${issue.priority}</p>
        </div>
      </div>
    </div>
   
    `

    document.getElementById('issueDetails').showModal()
}
//togling
openBtn.addEventListener("click",()=>{
   openBtn.classList.add("btn-primary")
   allbtn.classList.remove("btn-primary")
   closeBtn.classList.remove("btn-primary")

showSpinner()

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((data)=>{

     const allIssues=data.data
     const openIssue=allIssues.filter(issue=>issue.status==="open")
     
      hideSpinner()
// console.log(openIssue)

    displayAllIssues(openIssue)
})

})
closeBtn.addEventListener("click",()=>{
  closeBtn.classList.add("btn-primary")
   allbtn.classList.remove("btn-primary")
   openBtn.classList.remove("btn-primary")

showSpinner()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((data)=>{

     const allIssues=data.data
     const closeIssue=allIssues.filter(issue=>issue.status==="closed")
      hideSpinner()
//  console.log(closeIssue)

    displayAllIssues(closeIssue)
})

})
    
allbtn.addEventListener("click",()=>{
   allbtn.classList.add("btn-primary")
   closeBtn.classList.remove("btn-primary")
   openBtn.classList.remove("btn-primary")
   loadIssue()
})

loadIssue()
// searching data
document.getElementById('newIssueBtn').addEventListener("click",()=>{
    const input=document.getElementById('inputIssues')
    const searchInput=input.value.toLowerCase().trim() 


    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((data)=>{

     const allIssues=data.data
     const filterIssue=allIssues.filter(title=>title.title.toLowerCase().includes(searchInput))
      

       displayAllIssues(filterIssue)

    })

})













