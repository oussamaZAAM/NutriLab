export default function calculateNutrients(age, sex, height, weight, activity, plan) {
    // Calculate BMR : Harris-Benedict Calculator
    var BMR;
    if (sex === "male") {
      BMR = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
    }
    if (sex === "female") {
      BMR = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }
  
    // Calculate Calories
    var kCalories;
    if (activity === "sedentary") {
      kCalories = 1.2 * BMR;
    }
    if (activity === "lightly_active") {
      kCalories = 1.375 * BMR;
    }
    if (activity === "moderately_active") {
      kCalories = 1.55 * BMR;
    }
    if (activity === "very_active") {
      kCalories = 1.725 * BMR;
    }
    if (activity === "super_active") {
      kCalories = 1.9 * BMR;
    }
  
    if (plan === "lose_weight") {
      kCalories -= 500;
    }
    if (plan === "build_muscle") {
      kCalories += 500;
    }
  
    // Calculate Proteins
    var proteins;
    if (plan === "maintain") {
      if (activity === "sedentary" || activity === "lightly_active") {
        proteins = 0.8 * weight;
      }
      if (activity === "moderately_active") {
        proteins = 0.9 * weight;
      }
      if (activity === "very_active" || activity === "super_active") {
        proteins = 1.0 * weight;
      }
    }
  
    if (plan === "lose_weight") {
      if (activity === "sedentary") {
        proteins = 1.2 * weight;
      }
      if (activity === "lightly_active") {
        proteins = 1.3 * weight;
      }
      if (activity === "moderately_active") {
        proteins = 1.4 * weight;
      }
      if (activity === "very_active") {
        proteins = 1.5 * weight;
      }
      if (activity === "super_active") {
        proteins = 1.6 * weight;
      }
    }
  
    if (plan === "build_muscle") {
      if (activity === "sedentary") {
        proteins = 1.6 * weight;
      }
      if (activity === "lightly_active") {
        proteins = 1.7 * weight;
      }
      if (activity === "moderately_active") {
        proteins = 1.8 * weight;
      }
      if (activity === "very_active") {
        proteins = 1.9 * weight;
      }
      if (activity === "super_active") {
        proteins = 2.0 * weight;
      }
    }
  
    // Calculate Fats
    var fats;
    if (plan === "maintain") {
      fats = (kCalories * 0.275) / 9;
    }
    if (plan === "lose_weight") {
      fats = 0.75 * weight;
    }
    if (plan === "build_muscle") {
      fats = 1.0 * weight;
    }
  
    // Calculate Carbs
    var carbs;
    if (plan === "lose_weight") {
      carbs = (kCalories * 0.45) / 4;
    }
    if (plan === "maintain") {
      carbs = (kCalories * 0.55) / 4;
    }
    if (plan === "build_muscle") {
      carbs = (kCalories * 0.65) / 4;
    }
  
    // Calculate Iron
    var iron;
    if (sex === "female") {
      if (age <= 50) {
        iron = 0.018;
      } else {
        iron = 0.008;
      }
    } else {
      iron = 0.008;
    }
    // Calculate Fiber
    var fiber = (kCalories / 1000) * 14;
    // Calculate Sugar
    var sugar;
    if (sex === "female") {
      sugar = 24;
    } else {
      sugar = 36;
    }
    // Calculate Sugar
    var salt = 6;
  
    return {
      kCalories: Math.round(kCalories),
      proteins: Math.round(proteins),
      fats: Math.round(fats),
      carbs: Math.round(carbs),
      iron: Math.round(iron),
      fiber: Math.round(fiber),
      sugar: Math.round(sugar),
      salt: Math.round(salt),
    };
  }