const startButton = document.getElementById("startButton");
const landingPage = document.getElementById("landingPage");
const formPage = document.getElementById("formPage");
const resumePreviewPage = document.getElementById("resumePreviewPage");

const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const resumePhoto = document.getElementById("resumePhoto");

const nameInput = document.getElementById("name");
const profileDescriptionInput = document.getElementById("profileDescription");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");

const skillsList = document.getElementById("skillsList");
const addSkillButton = document.getElementById("addSkillButton");

const addEducationButton = document.getElementById("addEducationButton");
const educationSection = document.querySelector(".form-group .education-entry");

const addExperienceButton = document.getElementById("addExperienceButton");
const experienceSection = document.querySelector(".form-group .experience-entry");

const addLanguageButton = document.getElementById("addLanguageButton");
const languagesList = document.getElementById("languagesList");

const generateResumeButton = document.getElementById("generateResumeButton");

const resumeName = document.getElementById("resumeName");
const resumeProfileDescription = document.getElementById("resumeProfileDescription");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeLocation = document.getElementById("resumeLocation");
const resumeSkills = document.getElementById("resumeSkills");
const resumeEducation = document.getElementById("resumeEducation");
const resumeExperience = document.getElementById("resumeExperience");
const resumeLanguages = document.getElementById("resumeLanguages");

startButton.addEventListener("click", () => {
  landingPage.style.display = "none";
  formPage.style.display = "block";
});

photoInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = function (e) {
    photoPreview.src = e.target.result;
    resumePhoto.src = e.target.result;
    resumePhoto.style.display = "block";
    photoPreview.style.display = "block";
  };
  reader.readAsDataURL(photoInput.files[0]);
});

addSkillButton.addEventListener("click", () => {
  const skillInput = document.createElement("input");
  skillInput.type = "text";
  skillInput.placeholder = "Enter Skill";
  skillsList.appendChild(skillInput);
});

addEducationButton.addEventListener("click", () => {
  const newEducationEntry = document.createElement("div");
  newEducationEntry.classList.add("education-entry");
  newEducationEntry.innerHTML = `
    <input type="text" placeholder="Institution Name" class="education-input">
    <input type="date" placeholder="Start Date" class="education-input">
    <input type="date" placeholder="End Date" class="education-input">
  `;
  educationSection.appendChild(newEducationEntry);
});

addExperienceButton.addEventListener("click", () => {
  const newExperienceEntry = document.createElement("div");
  newExperienceEntry.classList.add("experience-entry");
  newExperienceEntry.innerHTML = `
    <input type="text" placeholder="Company Name" class="experience-input">
    <input type="text" placeholder="Job Title" class="experience-input">
    <input type="date" placeholder="Start Date" class="experience-input">
    <input type="date" placeholder="End Date" class="experience-input">
    <textarea placeholder="Job Responsibilities" class="experience-input"></textarea>
  `;
  experienceSection.appendChild(newExperienceEntry);
});

addLanguageButton.addEventListener("click", () => {
  const languageInput = document.createElement("input");
  languageInput.type = "text";
  languageInput.placeholder = "Enter Language";
  languagesList.appendChild(languageInput);
});

generateResumeButton.addEventListener("click", () => {
  const name = nameInput.value;
  const profileDescription = profileDescriptionInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const location = locationInput.value;
  const skills = Array.from(skillsList.querySelectorAll("input")).map(input => `<p>${input.value}</p>`);
  const languages = Array.from(languagesList.querySelectorAll("input")).map(input => `<p>${input.value}</p>`);

  const educationEntries = document.querySelectorAll(".education-entry");
  const experienceEntries = document.querySelectorAll(".experience-entry");


      let educationContent = '';
      educationEntries.forEach(entry => {
        const institution = entry.querySelector('input[placeholder="Institution Name"]').value;
        const degree = entry.querySelector('input[placeholder="Degree"]').value;
        const startDate = entry.querySelector('input[placeholder="Start Date"]').value;
        const endDate = entry.querySelector('input[placeholder="End Date"]').value;
        educationContent += `<p><strong>${institution}</strong></p>
        <p><strong>${degree}</strong>          (${startDate} - ${endDate})</p>
        `;
      });
  

  let experienceContent = '';
  experienceEntries.forEach(entry => {
    const company = entry.querySelector('input[type="text"]:nth-child(1)').value;
    const title = entry.querySelector('input[type="text"]:nth-child(2)').value;
    const startDate = entry.querySelector('input[type="date"]:nth-child(3)').value;
    const endDate = entry.querySelector('input[type="date"]:nth-child(4)').value;
    const responsibilities = entry.querySelector('textarea').value;
    experienceContent += `
      <p>${company}          (${startDate} - ${endDate})</p>
      <p>Role: ${title}</p>
      <p>Responsibilities: ${responsibilities}</p>
    `;
  });

  resumeName.innerHTML = name;
  resumeProfileDescription.innerHTML = profileDescription;
  resumeEmail.innerHTML = email;
  resumePhone.innerHTML = phone;
  resumeLocation.innerHTML = location;
  resumeSkills.innerHTML = skills.join("");
  resumeEducation.innerHTML = educationContent;
  resumeExperience.innerHTML = experienceContent;
  resumeLanguages.innerHTML = languages.join("");

  formPage.style.display = "none";
  resumePreviewPage.style.display = "block";
});

// document.getElementById("downloadResumeButton").addEventListener("click", () => {
//   import("html2pdf.js").then(html2pdf => {
//     html2pdf().from(resumePreviewPage).save("Resume.pdf");
//   });
downloadResumeButton.addEventListener("click", () => {
  const resumeElement = document.getElementById("resumePreview");
  const options = {
    margin:       0.5,
    filename:     'Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(options).from(resumeElement).save();
});

