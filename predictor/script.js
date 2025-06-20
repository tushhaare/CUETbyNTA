import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

const SUPABASE_URL = 'https://bvokjeuarlwbqdquhlps.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2b2tqZXVhcmx3YnFkcXVobHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTAxODMsImV4cCI6MjA2NTgyNjE4M30.yMOEGDU2paNU7tELbZG9ATyyrhnOvzDgmZ7Pb2uTXcI'; // your full key here
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("predictorForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const score = parseFloat(document.getElementById("cuetScore").value);
if (isNaN(score) || score < 0 || score > 1000) {
    alert("❌ Please enter a valid CUET score between 0 and 1000.");
    return;
}

    const name = document.getElementById("name").value.trim();
    const score = parseFloat(document.getElementById("cuetScore").value);
    const course = document.getElementById("course").value.trim();
    const category = document.getElementById("category").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Loading...";

    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDyRT1GXI6Vks97E0Aa-6LEwbMfplDjrmJ-wzYVFZH-WSbOLdUHGajH9CuxVbQiBQanJY8lKiV4nvl/pub?output=csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const data = csvToArray(csvText);
            const courseFiltered = data.filter(row => row.Course && row.Course.trim() === course);

            let eligible = courseFiltered.map(row => {
                const cutoff = parseFloat(row[category]);
                const diff = Math.abs(score - cutoff);
                return { ...row, cutoff, diff };
            }).filter(row =>
                !isNaN(row.cutoff) &&
                row.cutoff >= (score - 10) &&
                row.cutoff <= (score + 10) &&
                !(gender === "Male" && row.College.includes("(W)"))
            );

            eligible.sort((a, b) => a.diff - b.diff);

            if (eligible.length < 3) {
                const fallback = courseFiltered
                    .map(row => {
                        const cutoff = parseFloat(row[category]);
                        return { ...row, cutoff, diff: score - cutoff };
                    })
                    .filter(row =>
                        !isNaN(row.cutoff) &&
                        row.cutoff < score &&
                        !(gender === "Male" && row.College.includes("(W)")) &&
                        !eligible.some(e => e.College === row.College)
                    )
                    .sort((a, b) => b.cutoff - a.cutoff);

                eligible = [...eligible, ...fallback].slice(0, 5);
            }

            if (eligible.length === 0) {
                resultDiv.innerText = "❌ No colleges found. Try changing course or category.";
                return;
            }

            let output = "";
            eligible.forEach((row, i) => {
                output += `${i + 1}. ${row.College} — Cutoff: ${row.cutoff}\n`;
            });

            resultDiv.innerText = output;

            // Show PDF button
            const downloadBtn = document.getElementById("downloadPdf");
            downloadBtn.style.display = "block";

            downloadBtn.onclick = () => {
                const doc = new jsPDF();

const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEuWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA2LTIwPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjQxYTY3OTBkLWYxYmEtNDNiNS1iYzJhLTVlZjAxM2IwM2NjNDwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5VbnRpdGxlZCBkZXNpZ24gLSAxPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlv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"; // full base64 here
  doc.addImage(logoBase64, 'PNG', 150, 10, 40, 20);
                
                doc.setFontSize(16);
                doc.text("CUETbyNTA - College Predictor", 20, 20);

                doc.setFontSize(12);
                doc.text(`Name: ${name}`, 20, 35);
                doc.text(`CUET Score: ${score}`, 20, 43);
                doc.text(`Course: ${course}`, 20, 51);
                doc.text(`Category: ${category}`, 20, 59);
                doc.text(`Gender: ${gender}`, 20, 67);

                doc.setFontSize(13);
                doc.text("Predicted Colleges:", 20, 80);

                eligible.forEach((row, i) => {
                    doc.text(`${i + 1}. ${row.College} — Cutoff: ${row.cutoff}`, 25, 90 + i * 10);
                });

                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text("Disclaimer: Based on past data. Predictions not guaranteed.", 20, 140);

                doc.save(`${name}_CUETbyNTA_College_Prediction.pdf`);
            };

            // Save to Supabase
            supabase
                .from('responses')
                .insert([{ name, score, course, category, gender }])
                .then(({ data, error }) => {
                    if (error) {
                        console.error("❌ Supabase Error:", error);
                        alert("Failed to save your data.");
                    } else {
                        console.log("✅ Supabase Success:", data);
                        alert("Your college predictor worked without errors!");
                    }
                });
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerText = "⚠️ Error loading data. Try again later.";
        });
});

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter).map(h => h.trim());
    const rows = str.slice(str.indexOf("\n") + 1).split("\n").filter(r => r.trim() !== "");

    return rows.map(row => {
        const values = row.split(delimiter);
        return headers.reduce((obj, header, i) => {
            obj[header] = values[i] ? values[i].trim() : "";
            return obj;
        }, {});
    });
}
