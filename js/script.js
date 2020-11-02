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
`showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
list : represents student data that will be passed as an argument when the function is called.
page : represents the page number that will be passed as an argument when the function is called.
Will display "No results found" if list is empty.
*/
function showPage(list, page) {
   var startIndex = (page * 9) - 9, endIndex = page * 9,
   studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = "";

   if (list.length == 0) {
      var noResults = document.createElement('p');
      noResults.className = "no-results";
      noResults.textContent = "No results found";
      studentList.appendChild(noResults);
      return;
   }

   for (i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         var listItem = document.createElement('li'), 
         studentDetails = document.createElement('div'), 
         image = document.createElement('img'),
         nameHeading = document.createElement('h3'),
         emailSpan = document.createElement('span'),
         joinedDetails = document.createElement('div'); 
         dateSpan = document.createElement('span');
         
         listItem.className = "student-item cf";
         studentDetails.className = "student-details";
         image.className = "avatar";
         emailSpan.className = "email";
         joinedDetails.className = "joined-details";
         dateSpan.className = "date";

         image.setAttribute("src", list[i].picture.large);
         image.setAttribute("alt", "Profile Picture");
         nameHeading.textContent = list[i].name.first + ' ' + list[i].name.last;
         emailSpan.textContent = list[i].email;
         dateSpan.textContent = "Joined " + list[i].registered.date;

         studentDetails.appendChild(image); 
         studentDetails.appendChild(nameHeading); 
         studentDetails.appendChild(emailSpan);
         joinedDetails.appendChild(dateSpan);
         listItem.appendChild(studentDetails);
         listItem.appendChild(joinedDetails);
         studentList.appendChild(listItem);
      }
   }
   
}

/*
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
list : represents student data that will be passed as an argument when the function is called.
*/
function addPagination(list) {
   var pages = list.length / 9,
   linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = "";
   if (list.length == 0) return;
   for (i = 0; i < pages; i++) {
      var listItem = document.createElement('li'), 
      pageButton = document.createElement('button');

      pageButton.setAttribute("type", "button");
      pageButton.textContent = (i+1)+"";

      listItem.appendChild(pageButton);
      linkList.appendChild(listItem);
   }
   
   document.querySelector('li button').className = "active";

   linkList.addEventListener("click", function(event) {
      if (event.target.tagName == "BUTTON") {
         document.querySelector(".active").className = "";
         var buttons = document.querySelectorAll("li button");
         for (i = 0; i < buttons.length; i++) {
            if (buttons[i] == event.target) {
               buttons[i].className = "active";
               showPage(list,i+1);
            }
         }
      }
   });
}

/*
`addSearch` function
This function will create and insert/append the elements needed for the search bar.
*/
function addSearch() {
   var header = document.querySelector('header'),
   searchLabel = document.createElement('label'),
   inputField = document.createElement('input'),
   searchButton = document.createElement('button'),
   searchIcon = document.createElement('img');

   searchLabel.className = "student-search";
   searchLabel.setAttribute("for", "search");
   inputField.id = "search";
   inputField.setAttribute("placeholder", "Search by name...");
   inputField.setAttribute("onkeyup", "searchFilter(data)");
   searchButton.setAttribute("type", "button");
   searchButton.setAttribute("onclick", "searchFilter(data)");
   searchIcon.setAttribute("src", "img/icn-search.svg");
   searchIcon.setAttribute("alt", "Search icon");

   searchButton.appendChild(searchIcon);
   searchLabel.appendChild(inputField);
   searchLabel.appendChild(searchButton);
   header.appendChild(searchLabel);
}

/*
`searchFilter` function
This function will filter the student data so that only students whose name matches the search query are shown
list : represents student data that will be passed as an argument when the function is called.
*/
function searchFilter(list) {
   var input = document.getElementById("search"),
   sFilter = input.value.toUpperCase(),
   newList = list.filter(function(item) {
      var itemName = item.name.first + ' ' + item.name.last;
      return itemName.toUpperCase().indexOf(sFilter) !== -1;
   });
   showPage(newList, 1);
   addPagination(newList);
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearch();