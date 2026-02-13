// ================= GLOBAL DATA =================

var data = JSON.parse(localStorage.getItem("apexData")) || [];
var editIndex = null;

function saveData(){
localStorage.setItem("apexData", JSON.stringify(data));
}

// =================================================
// ================= ADMIN SECTION =================
// =================================================

function loadAdminData(){




var tbody = document.getElementById("adminTable");
if(!tbody) return;
tbody.innerHTML="";

// Get filter values
var category = getValue("adminCategoryFilter");
var teacher = getValue("adminTeacherFilter");
var grade = getValue("adminGradeFilter");
var year = getValue("adminYearFilter");
var subject = getValue("adminSubjectFilter");
var medium = getValue("adminMediumFilter");
var type = getValue("adminTypeFilter");
var classid = getValue("adminClassIdFilter");
var search = getValue("adminSearchBox");

for(var i=0; i<data.length; i++){

var row = data[i];

if(
includes(row.category, category) &&
includes(row.teacher, teacher) &&
includes(row.grade, grade) &&
includes(row.year, year) &&
includes(row.subject, subject) &&
includes(row.medium, medium) &&
includes(row.type, type) &&
includes(row.classid, classid) &&
JSON.stringify(row).toLowerCase().includes(search)
){

var tr = document.createElement("tr");

tr.innerHTML =
"<td>"+safe(row.category)+"</td>"+
"<td>"+safe(row.teacher)+"</td>"+
"<td>"+safe(row.grade)+"</td>"+
"<td>"+safe(row.year)+"</td>"+
//"<td>"+safe(row.subject)+"</td>"+
"<td>"+safe(row.subject).replace(/\n/g, "<br>")+"</td>"+
"<td>"+safe(row.medium)+"</td>"+
"<td>"+safe(row.type)+"</td>"+
//"<td>"+safe(row.datetime)+"</td>"+
 "<td>"+safe(row.datetime).replace(/\n/g, "<br>")+"</td>"+
"<td>"+safe(row.classid)+"</td>"+
"<td>"+safe(row.fee)+"</td>"+
"<td>"+
"<button onclick='editRow("+i+")'>Edit</button> "+
"<button onclick='deleteRow("+i+")'>Delete</button>"+
"</td>";

tbody.appendChild(tr);
}

}

}

// ================= ADD / EDIT FORM =================

var form = document.getElementById("classForm");

if(form){
form.addEventListener("submit", function(e){

e.preventDefault();

var newData = {
category:getInput("category"),
teacher:getInput("teacher"),
grade:getInput("grade"),
year:getInput("year"),
subject:getInput("subject"),
medium:getInput("medium"),
type:getInput("type"),
datetime:getInput("datetime"),
classid:getInput("classid"),
fee:getInput("fee")
};

if(editIndex === null){
data.push(newData);
}else{
data[editIndex] = newData;
editIndex = null;
}

saveData();
loadAdminData();
form.reset();

});
}

// ================= EDIT =================

function editRow(index){

var row = data[index];

setInput("category", row.category);
setInput("teacher", row.teacher);
setInput("grade", row.grade);
setInput("year", row.year);
setInput("subject", row.subject);
setInput("medium", row.medium);
setInput("type", row.type);
setInput("datetime", row.datetime);
setInput("classid", row.classid);
setInput("fee", row.fee);

editIndex = index;

}

// ================= DELETE =================

function deleteRow(index){

if(confirm("Delete this class?")){
data.splice(index,1);
saveData();
loadAdminData();
}

}

// =================================================
// ================= STUDENT SECTION ===============
// =================================================

function loadStudentData(){

var studentData = JSON.parse(localStorage.getItem("apexData")) || [];
var tbody = document.getElementById("studentTable");
if(!tbody) return;

tbody.innerHTML="";

var category = getValue("categoryFilter");
var teacher = getValue("teacherFilter");
var grade = getValue("gradeFilter");
var year = getValue("yearFilter");
var subject = getValue("subjectFilter");
var medium = getValue("mediumFilter");
var type = getValue("typeFilter");
var classid = getValue("classIdFilter");
var search = getValue("searchBox");

for(var i=0; i<studentData.length; i++){

var row = studentData[i];

if(
includes(row.category, category) &&
includes(row.teacher, teacher) &&
includes(row.grade, grade) &&
includes(row.year, year) &&
includes(row.subject, subject) &&
includes(row.medium, medium) &&
includes(row.type, type) &&
includes(row.classid, classid) &&
JSON.stringify(row).toLowerCase().includes(search)
){

var tr = document.createElement("tr");

tr.innerHTML =
"<td>"+safe(row.category)+"</td>"+
"<td>"+safe(row.teacher)+"</td>"+
"<td>"+safe(row.grade)+"</td>"+
"<td>"+safe(row.year)+"</td>"+
//"<td>"+safe(row.subject)+"</td>"+
"<td>"+safe(row.subject).replace(/\n/g, "<br>")+"</td>"+
"<td>"+safe(row.medium)+"</td>"+
"<td>"+safe(row.type)+"</td>"+
"<td>"+safe(row.datetime).replace(/\n/g, "<br>")+"</td>"+
"<td>"+safe(row.classid)+"</td>"+
"<td>"+safe(row.fee)+"</td>";

tbody.appendChild(tr);
}

}

}

// =================================================
// ================= HELPER FUNCTIONS ==============
// =================================================

function getValue(id){
var el = document.getElementById(id);
if(!el) return "";
return el.value.toLowerCase();
}

function getInput(id){
var el = document.getElementById(id);
return el ? el.value : "";
}

function setInput(id, value){
var el = document.getElementById(id);
if(el) el.value = value || "";
}

function includes(field, filter){
if(!field) field="";
if(!filter) return true;
return field.toLowerCase().includes(filter);
}

function safe(value){
return value ? value : "";
}


function checkLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Set your admin username and password here
    const adminUser = "admin";
    const adminPass = "Srimal@1994";

    if(username === adminUser && password === adminPass) {
        document.getElementById('loginOverlay').style.display = 'none';
        loadAdminData(); // optionally load your table after login
    } else {
        document.getElementById('loginError').innerText = "Invalid username or password!";
    }
}

// Optional: prevent interaction before login
document.addEventListener('DOMContentLoaded', () => {
    loadAdminData = function() {}; // disable loadAdminData until login
});