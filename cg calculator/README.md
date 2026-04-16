# CG Calculator for University Students

A simple web-based CGPA calculator to help university students compute:
- Semester GPA from current courses
- Updated cumulative CGPA using previous credits and CGPA

## Features

- Add/remove unlimited course rows
- Enter course credits and choose grades
- Supports:
  - 10-point scale
  - 4-point scale
- Real-time input validation for common errors
- Reset button to clear all values
- Mobile-friendly responsive interface

## Project Structure

- `index.html` - App layout and form structure
- `styles.css` - Visual design and responsive styling
- `script.js` - Grade logic, GPA/CGPA calculations, and interactions

## How It Works

### Semester GPA

Semester GPA is calculated as:

\[
\text{Semester GPA} = \frac{\sum (\text{Course Credits} \times \text{Grade Points})}{\sum (\text{Course Credits})}
\]

### Cumulative CGPA

When previous data is provided:

\[
\text{Cumulative CGPA} = \frac{(\text{Previous Credits} \times \text{Previous CGPA}) + \sum (\text{Current Credits} \times \text{Grade Points})}{\text{Previous Credits} + \sum (\text{Current Credits})}
\]

## Grade Mapping

### 10-Point Scale

- O = 10
- A+ = 9
- A = 8
- B+ = 7
- B = 6
- C = 5
- P = 4
- F = 0

### 4-Point Scale

- A = 4.0
- A- = 3.7
- B+ = 3.3
- B = 3.0
- B- = 2.7
- C+ = 2.3
- C = 2.0
- D = 1.0
- F = 0

## Run Locally

1. Open the project folder.
2. Open `index.html` in any modern browser.

No build step or installation is required.

## Usage

1. Select your grade scale (10-point or 4-point).
2. Add your courses with credits and grades.
3. (Optional) Enter previous total credits and previous CGPA.
4. Click **Calculate**.
5. View:
   - Semester GPA
   - Updated cumulative CGPA
   - Current semester total credits

## Notes

- If you leave previous values as 0, cumulative CGPA will match semester GPA for the entered courses.
- Ensure at least one course has credits greater than 0.

## Future Improvements

- Save calculations in local storage
- Export result summary to PDF/CSV
- Custom university-specific grade mappings
