function confirmSubmit() {
  var result = confirm("Are you sure you want to submit this form?");
  if (result == true) {
       document.getElementById("myForm").submit();
  } else {
   }
}

