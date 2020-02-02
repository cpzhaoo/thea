

let result = 0;

(function(){
	function buildQuiz(){
		// variable to store the HTML output
	    const output = [];

	    // for each question...
	    myQuestions.forEach( (currentQuestion, questionNumber) => {

		    // variable to store the list of possible answers
		    const answers = [];

		    var a = 1;

		    currentQuestion.answers.forEach((answer) => {
		  //   	answers.push(`<div>
  		// 			<input type="radio"  name="select" value="${answer.value}">
				// 	<label>
				// 	<p>${answer.name}</p>
				// 	</label>
				// </div>`);
				console.log(answer)

				answers.push(`
					<label onClick="getQuizValue()"><input type="radio" value="${answer.value}"   name="select"> ${answer.name} </label>
					`)
				a++;
		    });

		    // and for each available answer...
		    // for(letter in currentQuestion.answers){

		    //     // ...add an HTML radio button
		    //     answers.push(
		    //       `<label>
		    //         <input type="radio" id="rectangle" name="question${questionNumber}" value="${letter}">
		    //         ${currentQuestion.answers[letter]}
		    //       </label>`);
		    // }

		    // add this question and its answers to the output
		    output.push(
			   `<div class="slide">
			    <div id="question" class="question"> ${currentQuestion.question} </div>
			    <section>
			    <div class="answers"> ${answers.join("")} </div>
			    </section>
			   </div>`
		    );
		}
	  );

	   // finally combine our output list into one string of HTML and put it on the page
	   quizContainer.innerHTML = output.join('');
	}

	function getQuizValue(){
		let scoreOfquiz = document.getElementsByName('select');
		console.log(scoreOfquiz)
		for(i=0; i<scoreOfquiz.length; i++){
			if(scoreOfquiz[i].checked){
				result=result+scoreOfquiz[i].value;
				console.log(scoreOfquiz[i].value)
				showSlide(currentSlide + 1);

			}
		}
	}


	function showResults(){
		// gather answer containers from our quiz
	    const answerContainers = quizContainer.querySelectorAll('.answers');

	    // keep track of user's answers
	    let score = 0;

	    // for each question...
	    myQuestions.forEach( (currentQuestion, questionNumber) => {

	    // find selected answer
	    const answerContainer = answerContainers[questionNumber];
	    const selector = `input[name=question${questionNumber}]:checked`;
	    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
	    console.log(answerContainer)
	    console.log(currentQuestion.correctAnswer)
	    // if answer is correct
	    //if(userAnswer == currentQuestion.correctAnswer){
	      // add to the number of correct answers
	      score += userAnswer;
	      console.log(userAnswer)
	      console.log(answerContainer)

	      // color the answers green
	      answerContainers[questionNumber].style.color = 'lightgreen';
	    //} else{ // if answer is wrong or blank
	      // color the answers red
	      answerContainers[questionNumber].style.color = 'red';
	    //}
	  });

	  // show number of correct answers out of total
	  resultsContainer.innerHTML = `${score} out of ${myQuestions.length}`;
	}

	function showSlide(n) {
	  slides[currentSlide].classList.remove('active-slide');
	  slides[n].classList.add('active-slide');
	  currentSlide = n;
	  if(currentSlide === 0){
	    previousButton.style.display = 'none';
	  }
	  else{
	    previousButton.style.display = 'inline-block';
	  }
	  if(currentSlide === slides.length-1){
	    nextButton.style.display = 'none';
	    submitButton.style.display = 'inline-block';
	  }
	  else{
	    nextButton.style.display = 'inline-block';
	    submitButton.style.display = 'none';
  		}
	}

	function showNextSlide() {
  		showSlide(currentSlide + 1);
	}

	function showPreviousSlide() {
  		showSlide(currentSlide - 1);
	}


	const quizContainer = document.getElementById('quiz');
	const resultsContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');

	const myQuestions = [
	  {
	    question: "How often do you exercise?",
	    answers: [
	    	{name: "All the time!", value: 1},
	    	{name: "Literally never", value: 2},
	    	{name: "Few times a month", value: 3},
	    	{name: "Only on january 1st", value: 4}
	    	]
	  },
	  {
	    question: "Which one of these is a JavaScript package manager?",
	    answers: [
	    	{name: "Node.js", value: 1},
	    	{name: "TypeScript", value: 2},
	    	{name: "npm", value: 3}
	    	]
	  },
	  {
	    question: "Which tool can you use to ensure code quality?",
	    answers: [
	    	{name: "Angular", value: 1},
	    	{name: "jQuery", value: 2},
	    	{name: "RequireJS", value: 3},
	    	{name: "ESLint", value: 4}
	    ]
	  }];


	// display quiz right away
	buildQuiz();

	// Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults); // on submit, show results
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
