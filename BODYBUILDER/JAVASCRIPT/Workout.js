
document.getElementById("workout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = +document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const mass = +document.getElementById("mass").value;
  const height = +document.getElementById("height").value;
  const goal = document.getElementById("goal").value;
  const experience = document.getElementById("experience").value;
  const muscleOptions = document.getElementById("muscle");
  const equipment = document.getElementById("equipment").value;
  const days = +document.getElementById("days").value;

//   const muscles = [...muscleOptions.options]
//     .filter(option => option.selected)
//     .map(option => option.value);
//START
let selected = [...muscleOptions.options]
  .filter(option => option.selected)
  .map(option => option.value);

// Expand group selections into individual muscles
let muscles = new Set();

selected.forEach(val => {
  if (val === "upper-body") {
    ["chest", "back", "shoulders", "arms"].forEach(m => muscles.add(m));
  } else if (val === "lower-body") {
    ["legs", "core"].forEach(m => muscles.add(m));
  } else if (val === "full-body") {
    ["chest", "back", "shoulders", "arms", "legs", "core"].forEach(m => muscles.add(m));
  } else {
    muscles.add(val);
  }
});

muscles = Array.from(muscles);
// END

  const output = document.getElementById("output");

  if (!name || !age || !mass || !height || !goal || !experience || !muscles.length || !equipment || !days) {
    output.innerText = "Please fill all fields properly.";
    return;
  }

  // Generate workout plan per muscle
  const baseExercises = {
    chest: ["Push-ups", "Bench Press", "Dumbbell Flyes"],
    back: ["Deadlifts", "Pull-ups", "Lat Pulldown"],
    legs: ["Squats", "Lunges", "Leg Press"],
    shoulders: ["Shoulder Press", "Lateral Raises", "Front Raises"],
    arms: ["Bicep Curls", "Tricep Dips", "Hammer Curls"],
    core: ["Planks", "Crunches", "Russian Twists"]
  };

  const plan = [];

  for (let i = 0; i < days; i++) {
    const dayMuscle = muscles[i % muscles.length];
    const exercises = baseExercises[dayMuscle];

    exercises.forEach(ex => {
      const sets = experience === "beginner" ? 3 : experience === "intermediate" ? 4 : 5;
      const reps = goal === "fat-loss" ? 15 : goal === "muscle-gain" ? 10 : 5;
      const rest = goal === "strength" ? "2–3 mins" : "30–60 sec";
      const weight = equipment === "bodyweight" ? "Body weight" : Math.round(mass * 0.6) + " kg";

      plan.push(`Day ${i + 1} - ${dayMuscle.toUpperCase()}:
  - ${ex}
    Sets: ${sets}, Reps: ${reps}, Rest: ${rest}, Weight: ${weight}`);
    });
  }

  output.innerText = `👤 Client: ${name} (${age} yrs, ${gender})
🏋️ Goal: ${goal.replace("-", " ")} | Experience: ${experience}
📅 Weekly Schedule: ${days} day(s)
📌 Program Summary:\n\n${plan.join('\n\n')}`;
});

