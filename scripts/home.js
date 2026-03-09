
const allCardsContainer=document.getElementById('allCardsContainer')

// load all issues
 async function loadIssue(){
const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data=await res.json()
displayAllIssues(data.data)
 }
 loadIssue()



 //display all 
 function displayAllIssues(inputData){

 allCardsContainer.innerHTML=""
 inputData.forEach(element =>{
const div=document.createElement("div")
      div.innerHTML=`
        <div class="card shadow-xl p-5 w-[256px] h-[300px] border-t border-green-400  ">
      <div class=" flex justify-between">
       <img class=" w-6 h-6" src="./assets/Open-Status.png" alt="">
       <p id="changeBg" class="bg-red-300 text-red-500 py-1 px-3 rounded-lg">${element.priority}</p>
     </div>
      <div class="space-y-3">
       <h1 class="font-semibold text-[14px] whitespace- mt-3">${element.title}</h1>
        <p class="line-clamp-2 text-xs text-[#64748B]">${element.description}</p>
      </div>
      <div class="flex justify-between my-3">
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



