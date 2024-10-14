/*
    Student Name: Marissa Bell
    File Name: calculateTip.js
    Date: 10/12/2024
*/


function calculateTip( ) {
    const billAmount = document.getElementById("billAmount").value;
    const serviceQuality = document.getElementById("serviceQuality").value;

    //validation check.
    if (isNaN(billAmount), billAmount <= 0){
    alert("Please enter a valid number.");
    return;
    }





//lines below calculate the tip and total bill.
const tipAmount = billAmount * serviceQuality;
const totalAmount = Number(billAmount) + Number(tipAmount);


document.getElementById("tipAmount").innerText =`Tip: $${tipAmount.toFixed(2)}`;
document.getElementById("totalAmount").innerText =`Total: $${totalAmount.toFixed(2)}`;

}

