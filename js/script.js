/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) =>{
   //The start of the index to indicate when we want to start displaying the students
   let startIndex = (page * 9) - 9;
   //The end of the index to indicate when we want to stop displaying the students 
   let endIndex = page * 9;
   let ul = document.querySelector(".student-list");
   //To delete any previous displayed students
   ul.innerHTML = "";
   //For loop to add the list of students depending on the page number, the startIndex, and endIndex.
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         ul.insertAdjacentHTML("beforeend", `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>`);
      }  
   }
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) =>{
   //To determine the amount of pagination buttons needed
   const numberOfPagination = Math.ceil(list.length / 9);
   const ul = document.querySelector(".link-list");
   //To delete previous display of pagination buttons
   ul.innerHTML =  "";
   //for loop to add the new set of pagination buttons
   for(let i = 1; i <= numberOfPagination; i ++){
      ul.insertAdjacentHTML("beforeend",`<li>
      <button type="button">${i}</button>
    </li>`);
   }
   //Select the first button and apply the active class styling
   const firstPagination = ul.querySelectorAll("button")[0];
   firstPagination.className = "active";
   //Event listener for when any of the pagination buttons are clicked
   ul.addEventListener("click", (e) =>{
      //Gets the current button with the class active
      const active = ul.querySelector(".active");
      active.className = "";
      //Sets the button that was clicked with the class name button;
      e.target.className = "active";
      showPage(list, e.target.textContent);
   });
}

const noResults = () =>{
   const studentList = document.querySelector(".student-list");
   const paginationUL = document.querySelector(".link-list");
   const paginationLI = paginationUL.querySelectorAll("li");
   studentList.innerHTML = "<p>No Results found</p>";

   for(let i = 0; i < paginationLI.length; i++){
      paginationUL.removeChild(paginationLI[i]);
   }
}

const addSearch = (list) =>{
   const header = document.querySelector(".header");
   header.insertAdjacentHTML("beforeend", `
   <label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`);

 const searchInput = document.querySelector("#search");
 const searchButton = searchInput.nextElementSibling;


const searchStudents = () =>{
   let inputValue = searchInput.value.toLowerCase();
   const searchList = [];
   for(let i = 0; i < list.length; i++){
      const firstName = list[i].name.first.toLowerCase();
      const lastName = list[i].name.last.toLowerCase();

     if(firstName.includes(inputValue) || lastName.includes(inputValue)){
        searchList.push(list[i]);
     }
   }
   console.log(searchList.length);
   if(searchList.length > 0){
      showPage(searchList, 1);
      addPagination(searchList);
   }
   else{
      noResults();
   }
}

 searchInput.addEventListener("keyup", searchStudents);
 searchButton.addEventListener("click", searchStudents);
}


// Call functions
showPage(data, 1);
addPagination(data);
addSearch(data);