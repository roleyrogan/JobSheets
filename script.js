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

        //left-side job info
        const jobInfo = document.createElement('div');
        jobInfo.className = 'job-info';

        const company = document.createElement('span');
        company.className = 'company';
        company.textContent = job.company;

        const role = document.createElement('span');
        role.className = 'role';
        role.textContent = job.role;

        const date = document.createElement('span');
        date.className = 'date';
        date.textContent = job.date;

        jobInfo.appendChild(company);
        jobInfo.appendChild(role);
        jobInfo.appendChild(date);

        //right side - status badge and delete button
        const jobActions = document.createElement('div');
        jobActions.className = 'job-actions';

        const statusBadge = document.createElement('div');
        statusBadge.className = 'status-badge ' + job.status.toLowerCase();
        statusBadge.textContent = job.status;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            jobs.splice(index, 1);
            localStorage.setItem('jobs', JSON.stringify(jobs));
            renderJobs();
        });

        jobActions.appendChild(statusBadge);
        jobActions.appendChild(deleteBtn);

        li.appendChild(jobInfo);
        li.appendChild(jobActions);
        jobList.appendChild(li);
    });
   
   updateSummary();
};

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
    updateSummary();
});

//function for getting the summary 
function updateSummary(){
    const total = jobs.length;
    const applied = jobs.filter(function(job) {return job.status === 'Applied';}).length;
    const interview = jobs.filter(function(job) {return job.status === 'Interview';}).length;
    const offer = jobs.filter(function(job) {return job.status === 'Offer';}).length;
    const rejected = jobs.filter(function(job) {return job.status === 'Rejected';}).length;

    document.getElementById('total').textContent = 'Total: ' + total;
    document.querySelector('.applied-summary').textContent = 'Applied: ' + applied;
    document.querySelector('.interview-summary').textContent = 'Interview: ' + interview;
    document.querySelector('.rejected-summary').textContent = 'Rejected: ' + rejected;
    document.querySelector('.offer-summary').textContent = 'Offer: ' + offer;
}

//render the jobs
renderJobs();

