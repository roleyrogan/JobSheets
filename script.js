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
    jobs.forEach(function(job, index) {
        const li = document.createElement('li');
        li.textContent = job.company + ' - ' + job.role + ' - ' + job.status;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function(){
            jobs.splice(index, 1);
            localStorage.setItem('jobs', JSON.stringify(jobs));
            renderJobs();
        });

        li.appendChild(deleteBtn);
        jobList.appendChild(li);
    });
}

addBtn.addEventListener('click', function() {
    const company = companyInput.value;
    const role = roleInput.value;
    const status = statusInput.value;

    if(company == '' || role == '') {
        alert('Please fill in all fields');
        return;
    }

    const newJob = { company: company, role: role, status: status};
    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    const li = document.createElement('li')
    li.textContent = company + ' - ' + role + ' - ' + status;

    jobList.appendChild(li);

    companyInput.value = '';
    roleInput.value = '';

});

//render the jobs
renderJobs();