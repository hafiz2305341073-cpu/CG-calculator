const gradeMaps = {
  "10": {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0
  },
  "4": {
    "A": 4,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2,
    "D": 1,
    "F": 0
  }
};

const maxScaleValue = {
  "10": 10,
  "4": 4
};

const courseRows = document.getElementById("courseRows");
const scaleSelect = document.getElementById("scaleSelect");
const addCourseBtn = document.getElementById("addCourse");
const calculateBtn = document.getElementById("calculate");
const resetBtn = document.getElementById("reset");
const previousCreditsInput = document.getElementById("previousCredits");
const previousCgpaInput = document.getElementById("previousCgpa");

const semesterGpaEl = document.getElementById("semesterGpa");
const cumulativeCgpaEl = document.getElementById("cumulativeCgpa");
const semesterCreditsEl = document.getElementById("semesterCredits");
const messageEl = document.getElementById("message");

function createGradeOptions(scaleValue, selected = null) {
  const map = gradeMaps[scaleValue];
  return Object.keys(map)
    .map((grade) => {
      const isSelected = grade === selected ? "selected" : "";
      return `<option value="${grade}" ${isSelected}>${grade} (${map[grade]})</option>`;
    })
    .join("");
}

function createRow(course = "", credits = "", grade = null) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" class="course-name" placeholder="Subject name" value="${course}"></td>
    <td><input type="number" class="course-credits" min="0" step="0.5" placeholder="e.g. 3" value="${credits}"></td>
    <td>
      <select class="course-grade">
        ${createGradeOptions(scaleSelect.value, grade)}
      </select>
    </td>
    <td><button type="button" class="remove-btn">Remove</button></td>
  `;

  row.querySelector(".remove-btn").addEventListener("click", () => {
    row.remove();
    if (!courseRows.children.length) {
      createRow();
    }
  });

  courseRows.appendChild(row);
}

function updateAllGradeOptions() {
  const currentScale = scaleSelect.value;
  courseRows.querySelectorAll(".course-grade").forEach((select) => {
    const existing = select.value;
    select.innerHTML = createGradeOptions(currentScale, existing);
  });
}

function clampCgpaToScale(value, scale) {
  const max = maxScaleValue[scale];
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.min(Math.max(value, 0), max);
}

function calculate() {
  const map = gradeMaps[scaleSelect.value];
  const rows = [...courseRows.querySelectorAll("tr")];

  let totalCredits = 0;
  let weightedPoints = 0;

  for (const row of rows) {
    const creditsInput = row.querySelector(".course-credits");
    const gradeSelect = row.querySelector(".course-grade");

    const credits = Number(creditsInput.value);
    const grade = gradeSelect.value;

    if (Number.isNaN(credits) || credits < 0) {
      messageEl.textContent = "Credits must be 0 or more for every course.";
      return;
    }

    totalCredits += credits;
    weightedPoints += credits * map[grade];
  }

  if (totalCredits <= 0) {
    messageEl.textContent = "Add at least one course with credits greater than 0.";
    return;
  }

  const semesterGpa = weightedPoints / totalCredits;

  const previousCredits = Number(previousCreditsInput.value) || 0;
  const previousCgpa = clampCgpaToScale(Number(previousCgpaInput.value), scaleSelect.value);

  if (previousCredits < 0) {
    messageEl.textContent = "Previous credits cannot be negative.";
    return;
  }

  const totalCgCredits = previousCredits + totalCredits;
  const cumulativeCgpa = ((previousCredits * previousCgpa) + weightedPoints) / totalCgCredits;

  semesterCreditsEl.textContent = totalCredits.toFixed(2);
  semesterGpaEl.textContent = semesterGpa.toFixed(2);
  cumulativeCgpaEl.textContent = cumulativeCgpa.toFixed(2);
  messageEl.textContent = "";
}

function resetCalculator() {
  previousCreditsInput.value = "0";
  previousCgpaInput.value = "0";
  scaleSelect.value = "10";

  courseRows.innerHTML = "";
  createRow();

  semesterCreditsEl.textContent = "0.00";
  semesterGpaEl.textContent = "0.00";
  cumulativeCgpaEl.textContent = "0.00";
  messageEl.textContent = "";
}

addCourseBtn.addEventListener("click", () => createRow());
calculateBtn.addEventListener("click", calculate);
resetBtn.addEventListener("click", resetCalculator);
scaleSelect.addEventListener("change", updateAllGradeOptions);

createRow();
