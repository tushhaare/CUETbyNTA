import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const SUPABASE_URL = 'https://bvokjeuarlwbqdquhlps.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2b2tqZXVhcmx3YnFkcXVobHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTAxODMsImV4cCI6MjA2NTgyNjE4M30.yMOEGDU2paNU7tELbZG9ATyyrhnOvzDgmZ7Pb2uTXcI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("predictorForm").addEventListener("submit", function (e) {
    e.preventDefault();

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

            // Submit to Supabase
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
