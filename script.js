const submitCalc = (() => {
    const submit = document.querySelector(".submit");
  
    submit.addEventListener("click", () => {
        const values = calcControls.getValues(); 
        calcControls.checkGender(values);
    }); 
  
})();

const calcControls = (()=> {
    const getValues = () => {
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const weight = parseFloat(document.querySelector('[name="weight"]').value);
        const heightFeet = parseFloat(document.getElementById('heightFeet').value);
        const heightInches = parseFloat(document.getElementById('heightInches').value);
        const age = parseFloat(document.getElementById('age').value);
        const activity = document.getElementById('pa').value;
        return { gender, weight, heightFeet, heightInches, age, activity };
    }

    const checkGender = (values) => {
        if (values.gender == "Female"){
            calcCalories.calcFemale(values); 
        }
        else if (values.gender == "Male"){
            calcCalories.calcMale(values); 
        }
    }

    return { getValues, checkGender }
})();

const calcCalories = (()=> {

    const calcFemale = (values) => {
        let calorieCountF;
        const totalHeight = ((values.heightFeet * 12) + values.heightInches)
        const metricHeight = totalHeight / 39.37; 
        const metricWeight = values.weight / 2.205;
        calorieCountF = 387 - 7.31 * values.age + values.activity * (10.9 * metricWeight + 660.7 * metricHeight)
         console.log(calorieCountF)
        return pushResult(calorieCountF)
    }

    const calcMale = (values) => {
        let calorieCountM;
        const totalHeight = ((values.heightFeet * 12) + values.heightInches)
        const metricHeight = totalHeight / 39.37; 
        const metricWeight = values.weight / 2.205;
        calorieCountM = 864 - 9.72 * values.age + values.activity * (14.2 * metricWeight + 503 * metricHeight)
        console.log(calorieCountM)
        return pushResult(calorieCountM)
    }
    return { calcFemale, calcMale };
})();

const pushResult = ((final) => {
    const result = document.querySelector(".result")

    const resultMessage = document.createElement("h2")

    resultMessage.textContent = final;

    result.appendChild(resultMessage)
})