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
    let response = await fetch("/analyze-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume_text: resumeText,
      }),
    });

    // Clear the loading text before streaming starts
    resumeReadout.querySelector(".readout-body").innerHTML = "";

    // Set up the stream reader
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    // Read chunks as they arrive and append to the UI
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      resumeReadout.querySelector(".readout-body").innerHTML += chunk;
    }

    resumeReadout.dataset.state = "done";
    
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
    let response = await fetch("/generate-interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    });

    // Clear the loading text before streaming starts
    interviewReadout.querySelector(".readout-body").innerHTML = "";

    // Set up the stream reader
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    // Read chunks as they arrive and append to the UI
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      interviewReadout.querySelector(".readout-body").innerHTML += chunk;
    }

    interviewReadout.dataset.state = "done";
    
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
    let response = await fetch("/generate-roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        career: career,
      }),
    });

    // Clear the loading text before streaming starts
    roadmapReadout.querySelector(".readout-body").innerHTML = "";

    // Set up the stream reader
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    // Read chunks as they arrive and append to the UI
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      roadmapReadout.querySelector(".readout-body").innerHTML += chunk;
    }

    roadmapReadout.dataset.state = "done";
    
  } catch (error) {
    roadmapReadout.dataset.state = "error";
    roadmapReadout.querySelector(".readout-body").innerHTML =
      "Error connecting to backend.";
    console.log(error);
  } finally {
    roadmapButton.disabled = false;
  }
});