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
        const activity = parseFloat(document.getElementById('pa').value);


        return { gender, weight, heightFeet, heightInches, age, activity };
    }


    const checkGender = (values) => {
        if (values.gender == "Female"){
            calcCalories.changeActivityF(values)
            const calorieCountF = calcCalories.calcFemale(values);
            results.pushResult(calorieCountF);
        }
        else if (values.gender == "Male"){
            const calorieCountM = calcCalories.calcMale(values);
            results.pushResult(calorieCountM);
        }
    }



    return { getValues, checkGender }
})();

const calcCalories = (()=> {

    const changeActivityF = (values) => {
        const activitySelect = document.getElementById('pa');
        const selectedIndex = activitySelect.selectedIndex;
        
        switch (selectedIndex) {
            case 0:
                values.activity = 1;
                break;
            case 1:
                values.activity = 1.14;
                break;
            case 2:
                values.activity = 1.27;
                break;
            case 3:
                values.activity = 1.45;
                break;
        }

        return values; 
    }

    const calcFemale = (values) => {
        let calorieCountF;
        console.log("this is my female pa before calc" + values.activity)
        const totalHeight = ((values.heightFeet * 12) + values.heightInches)
        const metricHeight = totalHeight / 39.37; 
        const metricWeight = values.weight / 2.205;
        calorieCountF = 387 - (7.31 * values.age) + (values.activity * ((10.9 * metricWeight) + (660.7 * metricHeight)))
        
        return Math.round(calorieCountF); 
    }

    const calcMale = (values) => {
        let calorieCountM;
        console.log("this is my female pa before calc" + values.activity)
        const totalHeight = ((values.heightFeet * 12) + values.heightInches)
        const metricHeight = totalHeight / 39.37; 
        const metricWeight = values.weight / 2.205;
        calorieCountM = 864 - 9.72 * values.age + values.activity * (14.2 * metricWeight + 503 * metricHeight)
        
        return Math.round(calorieCountM);
    }
    return { calcFemale, calcMale, changeActivityF };
})();

const results = (() => {

    const pushResult = (final) => {
        const result = document.querySelector(".result");

        const existingResultMessage = document.querySelector(".message");
        if (existingResultMessage) {
            result.removeChild(existingResultMessage);
        }

        const resultMessage = document.createElement("h2");
        resultMessage.classList.add("message");
        resultMessage.textContent = final;
        result.appendChild(resultMessage);
    }

    return { pushResult };
})();

