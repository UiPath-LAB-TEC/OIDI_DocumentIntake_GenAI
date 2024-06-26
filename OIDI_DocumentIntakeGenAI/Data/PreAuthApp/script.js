const form = document.getElementById('preauth-form');
const message = document.getElementById('message');
const preauthTable = document.getElementById('preauth-table').getElementsByTagName('tbody')[0];

const claimsForm = document.getElementById('claims-form');
const claimsMessage = document.getElementById('claims-message');
const claimsTable = document.getElementById('claims-table').getElementsByTagName('tbody')[0];

let claimsData = [];
let preauthData = []; // Array to store submitted data

const tabs = document.querySelectorAll('.nav-item');

// Add event listener for tab clicks
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    this.classList.add('active');
    
    // Show/Hide corresponding tab content
    const target = this.dataset.target; // Get target content ID
	console.log(target);
    const content = document.getElementById(target);
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    content.classList.add('active');
  });
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Basic validation (can be improved)
  const memberID = document.getElementById('member_id').value;
  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const doctor = document.getElementById('doctor').value;
  const procedure_date = document.getElementById('procedure-date').value;
  const cpt_code = document.getElementById('cpt-code').value;
  const icd10_code = document.getElementById('icd10-code').value;
  const diagnosis = document.getElementById('diagnosis').value;
  const treatment = document.getElementById('treatment').value;
  const hospital = document.getElementById('hospital').value;
  const status = document.getElementById('status').value;
  
  // ... validate other fields ...

  if (name && dob) {
    const newPreauth = {
        id: memberID,
        name: name,
        dob: dob,
		doctor: doctor,
		hospital: hospital,
		procedure_date: procedure_date,
		cpt_code: cpt_code,
		icd10_code: icd10_code,
		diagnosis: diagnosis,
		treatment: treatment,
        status: status
    };

    preauthData.push(newPreauth);
    updateTable();
    message.textContent = "Pre-Authorization request submitted!";
    form.reset(); // Clear form after submission
  } else {
    message.textContent = "Please fill in all required fields.";
  }
});

claimsForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Basic validation (can be improved)
  const memberID = document.getElementById('claim-member-id').value;
  const name = document.getElementById('claim-patient-name').value;
  const cpt_code = document.getElementById('claim-cpt-code').value;
  const charges = document.getElementById('claim-charges').value;
  const status = document.getElementById('claim-status').value;
  
  // ... validate other fields ...

  if (name && memberID) {
    const newClaim = {
        id: memberID,
        name: name,
		cpt_code: cpt_code,
		charges: charges,
        status: status
    };

    claimsData.push(newClaim);
    updateClaimsTable();
    claimsMessage.textContent = "Claims request submitted!";
    form.reset(); // Clear form after submission
  } else {
    claimsMessage.textContent = "Please fill in all required fields.";
  }
});
function updateClaimsTable() {
  claimsTable.innerHTML = ""; // Clear table content before update

  for (const claims of claimsData) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = claims.id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = claims.name;
    row.appendChild(nameCell);
	
	const cptCell = document.createElement('td');
    cptCell.textContent = claims.cpt_code;
    row.appendChild(cptCell);
	
	
	const chargesCell = document.createElement('td');
    chargesCell.textContent = claims.charges;
    row.appendChild(chargesCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = claims.status;
    row.appendChild(statusCell);

    claimsTable.appendChild(row);
  }
}


function updateTable() {
  preauthTable.innerHTML = ""; // Clear table content before update

  for (const preauth of preauthData) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = preauth.id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = preauth.name;
    row.appendChild(nameCell);
	
	const dobCell = document.createElement('td');
    dobCell.textContent = preauth.dob;
    row.appendChild(dobCell);
	
	const doctorCell = document.createElement('td');
    doctorCell.textContent = preauth.doctor;
    row.appendChild(doctorCell);
	
	const hospitalCell = document.createElement('td');
    hospitalCell.textContent = preauth.hospital;
    row.appendChild(hospitalCell);
	
	const procDateCell = document.createElement('td');
    procDateCell.textContent = preauth.procedure_date;
    row.appendChild(procDateCell);
	
	const cptCell = document.createElement('td');
    cptCell.textContent = preauth.cpt_code;
    row.appendChild(cptCell);
	
	const icdCell = document.createElement('td');
    icdCell.textContent = preauth.icd10_code;
    row.appendChild(icdCell);
	
	const diagCell = document.createElement('td');
    diagCell.textContent = preauth.diagnosis;
    row.appendChild(diagCell);
	
	const treatmentCell = document.createElement('td');
    treatmentCell.textContent = preauth.treatment;
    row.appendChild(treatmentCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = preauth.status;
    row.appendChild(statusCell);

    preauthTable.appendChild(row);
  }
}
