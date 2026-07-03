const companyInput = document.getElementById('company');
const roleInput = document.getElementById('role');
const statusInput = document.getElementById('status');
const addBtn = document.getElementById('add-btn');
const jobList = document.getElementById('job-list');


//basically gets the jobs from storage
//if there isn't it just creates an emptry orray
let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

//function to render the jobs from storage
function renderJobs() {
    jobList.innerHTML = '';
    //go through every job item in the jobs array and run this function
    jobs.forEach(function(job, index) {
        //list item
        const li = document.createElement('li');
        //adds text to the list, and adds a delete button with the delete function
        li.textContent = job.company + ' - ' + job.role + ' - ' + job.status + ' - ' + job.date;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        //whenever you click on the delete button, it goes to the current index in the 
        //jobs array and deletes '1' item
        deleteBtn.addEventListener('click', function(){
            jobs.splice(index, 1);
            localStorage.setItem('jobs', JSON.stringify(jobs));
            renderJobs();
        });
        //adds the delete button
        li.appendChild(deleteBtn);
        //adds the list item to the joblist array 
        jobList.appendChild(li);
    });
}

addBtn.addEventListener('click', function() {
    const company = companyInput.value;
    const role = roleInput.value;
    const status = statusInput.value;
    const date = new Date().toLocaleDateString();

    if(company == '' || role == '') {
        alert('Please fill in all fields');
        return;
    }

    const newJob = { company: company, role: role, status: status, date: date};
    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    const li = document.createElement('li')
    li.textContent = company + ' - ' + role + ' - ' + status + ' - ' + date;

    jobList.appendChild(li);

    companyInput.value = '';
    roleInput.value = '';
    renderJobs();
});

//render the jobs
renderJobs();