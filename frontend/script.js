// --- Tab navigation ---
const tabs = document.querySelectorAll(".module-tab");
const panels = document.querySelectorAll(".module-panel");
const indicator = document.querySelector(".tab-indicator");

function setIndicator(tab) {
  indicator.style.left = tab.offsetLeft + "px";
  indicator.style.width = tab.offsetWidth + "px";
}

function activateTab(tab) {
  tabs.forEach((t) => t.classList.remove("active"));
  panels.forEach((p) => p.classList.remove("active"));

  tab.classList.add("active");
  document.getElementById(tab.dataset.target).classList.add("active");
  setIndicator(tab);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));
});

window.addEventListener("load", () => {
  setIndicator(document.querySelector(".module-tab.active"));
});
window.addEventListener("resize", () => {
  setIndicator(document.querySelector(".module-tab.active"));
});

// --- Resume Analyzer ---
const resumeButton = document.getElementById("resumeButton");
const resumeInput = document.getElementById("resumeInput");
const resumeReadout = document.getElementById("resumeReadout");

resumeButton.addEventListener("click", async () => {
  let resumeText = resumeInput.value;

  if (resumeText.trim() === "") {
    resumeReadout.querySelector(".readout-body").innerHTML =
      "Please paste your resume first.";
    return;
  }

  resumeReadout.dataset.state = "loading";
  resumeReadout.querySelector(".readout-body").innerHTML = "Running analysis...";

  try {
    let response = await fetch("https://careerpilot-ai-iwss.onrender.com/analyze-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume_text: resumeText,
      }),
    });

    let result = await response.json();

    resumeReadout.dataset.state = "done";
    resumeReadout.querySelector(".readout-body").innerHTML = `
      <h3>Skills</h3>
      <p>${result.skills.join(", ")}</p>

      <h3>Experience</h3>
      <p>${result.experience}</p>

      <h3>Summary</h3>
      <p>${result.summary}</p>

      <h3>Suggestions</h3>
      <p>${result.suggestions.join(", ")}</p>
    `;
  } catch (error) {
    resumeReadout.dataset.state = "error";
    resumeReadout.querySelector(".readout-body").innerHTML =
      "Error connecting to backend.";
    console.log(error);
  }
});

// --- Interview Coach ---
const interviewButton = document.getElementById("interviewButton");
const roleInput = document.getElementById("roleInput");
const interviewReadout = document.getElementById("interviewReadout");

interviewButton.addEventListener("click", async () => {
  let role = roleInput.value;

  if (role.trim() === "") {
    interviewReadout.querySelector(".readout-body").innerHTML =
      "Please enter a target job role first.";
    return;
  }

  interviewReadout.dataset.state = "loading";
  interviewReadout.querySelector(".readout-body").innerHTML = "Generating prep materials...";
  interviewButton.disabled = true;

  try {
    // FIX: Updated to match your exact backend endpoint
    let response = await fetch("https://careerpilot-ai-iwss.onrender.com/generate-interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    });

    let result = await response.json();

    interviewReadout.dataset.state = "done";
    interviewReadout.querySelector(".readout-body").innerHTML = `
      <h3>Common Questions</h3>
      <ul>${result.questions.map(q => `<li>${q}</li>`).join("")}</ul>
      
      <h3>Sample Answers</h3>
      <ul>${result.answers.map(a => `<li>${a}</li>`).join("")}</ul>
      
      <h3>Pro Tips</h3>
      <ul>${result.tips.map(t => `<li>${t}</li>`).join("")}</ul>
    `;
  } catch (error) {
    interviewReadout.dataset.state = "error";
    interviewReadout.querySelector(".readout-body").innerHTML =
      "Error connecting to backend.";
    console.log(error);
  } finally {
    interviewButton.disabled = false;
  }
});

// --- Learning Roadmap ---
const roadmapButton = document.getElementById("roadmapButton");
const careerInput = document.getElementById("careerInput");
const roadmapReadout = document.getElementById("roadmapReadout");

roadmapButton.addEventListener("click", async () => {
  let career = careerInput.value;

  if (career.trim() === "") {
    roadmapReadout.querySelector(".readout-body").innerHTML =
      "Please enter a desired career role first.";
    return;
  }

  roadmapReadout.dataset.state = "loading";
  roadmapReadout.querySelector(".readout-body").innerHTML = "Generating roadmap...";
  roadmapButton.disabled = true;

  try {
    let response = await fetch("https://careerpilot-ai-iwss.onrender.com/generate-roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        career: career,
      }),
    });

    let result = await response.json();

    roadmapReadout.dataset.state = "done";
    roadmapReadout.querySelector(".readout-body").innerHTML = `
      <h3>Steps</h3>
      <ul>${result.steps.map(s => `<li>${s}</li>`).join("")}</ul>
      
      <h3>Recommended Resources</h3>
      <ul>${result.resources.map(r => `<li>${r}</li>`).join("")}</ul>
      
      <h3>Projects to Build</h3>
      <ul>${result.projects.map(p => `<li>${p}</li>`).join("")}</ul>
    `;
  } catch (error) {
    roadmapReadout.dataset.state = "error";
    roadmapReadout.querySelector(".readout-body").innerHTML =
      "Error connecting to backend.";
    console.log(error);
  } finally {
    roadmapButton.disabled = false;
  }
});