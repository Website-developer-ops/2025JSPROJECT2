
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
  const equipmentOptions = [...document.getElementById("equipment").selectedOptions].map(opt => opt.value);
  const days = +document.getElementById("days").value;
  const output = document.getElementById("output");

  // Expand group muscle selection
  let selected = [...muscleOptions.options].filter(opt => opt.selected).map(opt => opt.value);
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

  if (!name || !age || !mass || !height || !goal || !experience || !muscles.length || !equipmentOptions.length || !days) {
    output.innerText = "❌ Please fill all fields properly.";
    return;
  }

  // Define exercises with required equipment
  const baseExercises = {
    chest: [
      { name: "Push-ups", equipment: ["bodyweight"] },
      { name: "Bench Press", equipment: ["barbell", "full-gym"] },
      { name: "Dumbbell Flyes", equipment: ["dumbbells", "full-gym"] }
    ],
    back: [
      { name: "Deadlifts", equipment: ["barbell", "full-gym"] },
      { name: "Pull-ups", equipment: ["bodyweight", "full-gym"] },
      { name: "Lat Pulldown", equipment: ["machines", "full-gym"] }
    ],
    legs: [
      { name: "Squats", equipment: ["bodyweight", "barbell", "full-gym"] },
      { name: "Lunges", equipment: ["bodyweight", "dumbbells"] },
      { name: "Leg Press", equipment: ["machines", "full-gym"] }
    ],
    shoulders: [
      { name: "Shoulder Press", equipment: ["dumbbells", "barbell", "full-gym"] },
      { name: "Lateral Raises", equipment: ["dumbbells", "full-gym"] },
      { name: "Front Raises", equipment: ["dumbbells", "full-gym"] }
    ],
    arms: [
      { name: "Bicep Curls", equipment: ["dumbbells", "barbell"] },
      { name: "Tricep Dips", equipment: ["bodyweight"] },
      { name: "Hammer Curls", equipment: ["dumbbells"] }
    ],
    core: [
      { name: "Planks", equipment: ["bodyweight"] },
      { name: "Crunches", equipment: ["bodyweight"] },
      { name: "Russian Twists", equipment: ["bodyweight", "dumbbells"] }
    ]
  };

  const plan = [];

  for (let i = 0; i < days; i++) {
    const dayMuscle = muscles[i % muscles.length];
    const allExercises = baseExercises[dayMuscle] || [];

    const validExercises = allExercises.filter(ex =>
      ex.equipment.some(eq => equipmentOptions.includes(eq))
    );

    if (validExercises.length === 0) {
      plan.push(`Day ${i + 1} - ${dayMuscle.toUpperCase()}:\n  ⚠ No suitable exercises for your available equipment.`);
      continue;
    }

    validExercises.forEach(ex => {
      const sets = experience === "beginner" ? 3 : experience === "intermediate" ? 4 : 5;
      const reps = goal === "fat-loss" ? 15 : goal === "muscle-gain" ? 10 : 5;
      const rest = goal === "strength" ? "2–3 mins" : "30–60 sec";
      const weight = ex.equipment.includes("bodyweight") ? "Body weight" : (mass * 0.6).toFixed(1) + " kg";

      plan.push(`Day ${i + 1} - ${dayMuscle.toUpperCase()}:
  - ${ex.name}
    Sets: ${sets}, Reps: ${reps}, Rest: ${rest}, Weight: ${weight}`);
    });
  }

  output.innerText = `👤 Client: ${name} (${age} yrs, ${gender})
🏋️ Goal: ${goal.replace("-", " ")} | Experience: ${experience}
📅 Weekly Schedule: ${days} day(s)
📌 Program Summary:\n\n${plan.join('\n\n')}`;
});

