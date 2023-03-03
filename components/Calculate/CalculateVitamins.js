export default function calculateVitamins(age, sex) {
    //Vitamin A
    var vitaminA;
    if (sex === "female") {
      vitaminA = 0.0007;
    } else {
      vitaminA = 0.0009;
    }
  
    //Vitamin C
    var vitaminC;
    if (sex === "female" && age === 18) {
      vitaminC = 0.065;
    } else {
      vitaminC = 0.075;
    }
  
    //Vitamin D
    var vitaminD;
    if (age >= 70) {
      vitaminD = 0.00002;
    } else {
      vitaminD = 0.000015;
    }
  
    //Vitamin E
    var vitaminE = 0.015;
  
    //Vitamin K
    var vitaminK;
    if (age >= 19) {
      if (sex === "male") {
        vitaminK = 0.00012;
      } else {
        vitaminK = 0.00009;
      }
    } else {
      vitaminK = 0.000075;
    }
  
    return {
      vitaminA: vitaminA,
      vitaminC: vitaminC,
      vitaminD: vitaminD,
      vitaminK: vitaminK,
    };
  }