

        document.addEventListener('DOMContentLoaded', function () {
            document.getElementById('income').addEventListener('input', validateInput);
            document.getElementById('extraIncome').addEventListener('input', validateInput);
            document.getElementById('deductions').addEventListener('input', validateInput);
            
            
            document.getElementById("tax").addEventListener('click', () => {
                let grossIncome = parseFloat(document.getElementById('income').value);
                let extraIncome = parseFloat(document.getElementById('extraIncome').value);
                let deductions = parseFloat(document.getElementById('deductions').value);    
        
                let age = parseInt(document.getElementById('age').value);
        
                let ageGroup;
                if (age < 40) {
                    ageGroup = "<40";
                } else if (age >= 40 && age < 60) {
                    ageGroup = ">=40&<60";
                } else {
                    ageGroup = ">=60";
                }
        
                let tax = calculateTax(grossIncome, extraIncome, deductions, ageGroup);
                displayTaxModal(tax); 
            });
        
        });
        
        function validateInput(event) {
            let inputElement = event.target;
            let inputValue = parseFloat(inputElement.value);
            // Check if input is valid (e.g., check for negative values)
            if (isNaN(inputValue) || inputValue < 0) {
                // Show error message
                showError(inputElement);
            } else {
                // Hide error message
                resetError(inputElement);
            }
        }
        
        function showError(inputElement) {
            let errorIcon = inputElement.parentElement.querySelector('.bi-exclamation-circle');
            errorIcon.style.color = 'red'; 
        }
        
        function resetError(inputElement) {
            let errorIcon = inputElement.parentElement.querySelector('.bi-exclamation-circle');
            errorIcon.style.color = ''; 
        }
        
        function calculateTax(grossIncome, extraIncome, deductions, ageGroup) {
            let taxableIncome = grossIncome + extraIncome - deductions;
            let tax = 0;
            if (taxableIncome > 800000) {
                if (ageGroup === "<40") {
                    tax = 0.3 * (taxableIncome - 800000);
                } else if (ageGroup === ">=40&<60") {
                    tax = 0.4 * (taxableIncome - 800000);
                } else if (ageGroup === ">=60") {
                    tax = 0.1 * (taxableIncome - 800000);
                }
            }
            return tax;
        }
        
        function displayTaxModal(tax) {
            console.log('Tax:', tax); 
        
            let formattedTax = formatNumberWithCommas(tax);
        
            let modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `<div class="tax-amount">${formattedTax}</div>`;
            $('#taxModal').modal('show');
        }
        
        function formatNumberWithCommas(inputNumber) {
            let strNumber = inputNumber.toString(); 
            let formattedNumber = ''; 
            let count = 0; 
        
            for (let i = strNumber.length - 1; i >= 0; i--) {
                formattedNumber = strNumber[i] + formattedNumber;
                // Increment the count
                count++;
                
                if (count === 2 && i !== 0) {
                    formattedNumber = ',' + formattedNumber;
                    count = 0; 
                }
            }
            return formattedNumber;
        }
        