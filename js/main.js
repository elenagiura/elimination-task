var labels = document.querySelectorAll('label');
var inputs = document.querySelectorAll('input');
var checkString = document.querySelector('#check');
var password = document.querySelector('#pass');
var checkings = document.querySelectorAll(".checked");
var textOptOne = document.querySelectorAll('input')[3];
var textOptTwo = document.querySelectorAll('input')[4];
var percents = document.querySelector('header div div');

var message = document.createElement('div');
message.classList.add('message');

var strOfPass = document.createElement('div');
strOfPass.classList.add('message');

var number = 0;

//TASK 1
labels.forEach(function () {
	addEventListener('click', function (e) {
		e.stopPropagation();
		e.target.classList.add('moved');
	}, true)
})

inputs.forEach(function (input) {
	input.addEventListener('blur', function(e) {
		if (input.value==="") {
			labels.forEach(function (lab){
				input.getAttribute('id')===lab.getAttribute('for') && lab.classList.contains('moved') ? lab.classList.remove('moved') : null; 
				checkings.forEach(function(checkBX) {
					checkBX.classList.contains(input.getAttribute('id')) && checkBX.childElementCount===1 ? remove(checkBX) : null;
				})
			})
		} else {
			input.classList.add('stay');
			checkings.forEach(function(checkBX) {
				checkBX.classList.contains(input.getAttribute('id')) ? addImg(checkBX) : null;
			})
		}
	})
})

function roundNumb (plus) {
	if (plus) {
		number=number+100/6;
		number = Math.round(number);
		if (number>=100) {
			number=100;
		}
	} else {
		number=number-100/6;
		number = Math.round(number);
		if (number<=0) {
			number=0;
		}
	}

}

function addImg (box) {
	var image = document.createElement('img');
	image.setAttribute('src','./images/check.jpg');
	box.appendChild(image);
	box.childElementCount===1 ? roundNumb(true) : null;
	percents.textContent=number+'%';
}

function remove(box) {
	box.querySelector('img').remove();
	box.childElementCount===0 ? roundNumb(false) : null;
	percents.textContent=number+'%';
}

textOptOne.addEventListener('change', function () {
	labels.forEach(function (lab) {
		lab.getAttribute('id')==='time' ? addImg(checkings[3]) : null;
	})
})

textOptTwo.addEventListener('change', function () {
	labels.forEach(function (lab) {
		lab.getAttribute('id')==='time' ? addImg(checkings[3]) : null;
	})
})


//TASK 2.a
checkString.addEventListener('focus', function () {
	message.textContent="";
})

checkString.addEventListener('change', function (e) {
	var arr = [];
	var parentheses = [];

	for(var i=0; i<e.target.value.length; i++) {
		arr.push(e.target.value.substring(i,i+1));
	}
	for(var i=0; i<arr.length; i++) {
		arr[i]==='(' || arr[i]===')' ? parentheses.push(arr[i]) : null;
	}

	showResult(checkArray(parentheses));
});

function checkArray (arr) {
	if(!arr.length) {
		return true;
	}
	if(arr[0]==="(" && arr[arr.length-1]===")") {
		var opens = 0;
		var closes = 0;
		for (var i=0; i<arr.length; i++) {
			arr[i]==='(' ? opens++ : closes++;
		}
		if (opens/closes===1) {
			return true;
		}
	}
}

function showResult (result) {
	result ? message.textContent= 'Correct writing!' :  message.textContent='Wrong writing. Please try again.';
	checkString.after(message);
}


//TASK 2.b
password.addEventListener('focus', function () {
	strOfPass.textContent="";
	strOfPass.className='message';
})

password.addEventListener('change', function (e) {
	checkingPass(e.target.value);
})

function checkingPass (password) {
	console.log("in check")
	if(password.length>=8 && hasItUpper(password) && hasItLower(password) && specialChar(password) && hasItNumb(password)) {
		content('strong');
	} else if (password.length>=6 && hasItUpper(password) && hasItLower(password) && specialChar(password)) {
		content('medium');
	} else {
		content('weak');
	}
}

function hasItUpper(password) {
	return /[a-z]/. test(password) && /[A-Z]/. test(password);
}

function hasItLower(password) {
	return /[a-z]/. test(password) && /[a-z]/. test(password);
}

function specialChar (password) {
	var format = /[!@#$ %^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
	if (format. test(password)) {
		return true;
	}
}

function hasItNumb(password) {
	return /[0-9]/. test(password);
}

function content(level) {
	if(level==='strong') {
		strOfPass.textContent='Your password is strong!'
		strOfPass.classList.add('strong');
	} else if (level === 'medium' || level=== 'weak') {
		strOfPass.textContent='Your password is '+level+'! Check the rules for improving it.';
		strOfPass.classList.add(level);
	}
	password.after(strOfPass);
}