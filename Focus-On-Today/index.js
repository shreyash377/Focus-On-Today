const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progresslabel=document.querySelector('.progress-label')

 const allQuatus=[
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {}
let allGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = `${allGoalsCount / 3 * 100}%`
progressValue.firstElementChild.innerText=`${allGoalsCount}/3completed`
progresslabel.innerText=allQuatus[allGoalsCount];



checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const AllGoalsAdd = [...inputFields].every(function (input) {
      return input.value;
    })
    if (AllGoalsAdd) {
      checkbox.parentElement.classList.toggle("completed")
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      allGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
      progressValue.style.width = `${allGoalsCount / 3 * 100}%`
      progressValue.firstElementChild.innerText=`${allGoalsCount}/3completed`
      progresslabel.innerText=allQuatus[allGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    }
    else {
      progressBar.classList.add("show-error")
    }
  })
})
inputFields.forEach((input) => {
  input.value = allGoals[input.id].name

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("Focus", () => {
    progressBar.classList.remove('show-error');
  })
  input.addEventListener("input", (e) => {
    if(allGoals[input.id].completed){
      input.value=allGoals[input.id].name;
      return
    }
    allGoals[input.id] = {
      name: input.value,
      completed: false
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  })
})